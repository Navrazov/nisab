import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import { Check, Minus, Plus } from 'lucide-react'
import { Container } from './ui/Container'
import { Slider } from './ui/Slider'
import { buildWhatsAppHref } from '../lib/contacts'
import { useCursorSafeDigitInput } from '../hooks/useCursorSafeDigitInput'
import {
  DEFAULT_DOWN_PAYMENT_PERCENT,
  DEFAULT_MONTHS,
  DEFAULT_PRICE,
  MAX_DOWN_PAYMENT_PERCENT,
  MAX_MONTHS,
  MAX_PRICE,
  MIN_DOWN_PAYMENT_PERCENT,
  MIN_MONTHS,
  MIN_PRICE,
  PREMIUM_MONTHLY_MARKUP_RATE,
  PRICE_STEP,
  STANDARD_MONTHLY_MARKUP_RATE,
  calculate,
  formatNumber,
  formatRub,
  stepPrice,
} from '../lib/calculator'

export function Calculator() {
  const [isPremium, setIsPremium] = useState(false)
  const [price, setPrice] = useState(DEFAULT_PRICE)
  const [priceInput, setPriceInput] = useState(formatNumber(DEFAULT_PRICE))
  const [months, setMonths] = useState(DEFAULT_MONTHS)
  const [downPercent, setDownPercent] = useState<number>(DEFAULT_DOWN_PAYMENT_PERCENT)
  const [downAmountInput, setDownAmountInput] = useState(() =>
    formatNumber(calculate(DEFAULT_PRICE, DEFAULT_MONTHS, DEFAULT_DOWN_PAYMENT_PERCENT).downPaymentAmount),
  )

  const priceCursor = useCursorSafeDigitInput()
  const downAmountCursor = useCursorSafeDigitInput()
  const skipDownAmountSyncRef = useRef(false)

  const monthlyMarkupRate = isPremium ? PREMIUM_MONTHLY_MARKUP_RATE : STANDARD_MONTHLY_MARKUP_RATE

  const rawResult = useMemo(
    () => calculate(price, months, downPercent, monthlyMarkupRate),
    [price, months, downPercent, monthlyMarkupRate],
  )

  // The down-payment slider drags across round ruble amounts (like the
  // price slider), not raw percent — the bounds are the min/max allowed
  // percent converted to rubles and snapped to the nearest step so every
  // reachable position is a round number.
  const downAmountBounds = useMemo(() => {
    const total = rawResult.totalWithMarkup
    const rawMin = total * (MIN_DOWN_PAYMENT_PERCENT / 100)
    const rawMax = total * (MAX_DOWN_PAYMENT_PERCENT / 100)
    const min = Math.ceil(rawMin / PRICE_STEP) * PRICE_STEP
    const max = Math.floor(rawMax / PRICE_STEP) * PRICE_STEP
    return { min, max: Math.max(min, max) }
  }, [rawResult.totalWithMarkup])

  // The down payment itself (not just the slider's visual position) is
  // snapped to a round ruble amount before it feeds monthly payment, the
  // breakdown panel and the slider — otherwise the browser's own range-input
  // sanitization silently rounds the slider for display while every other
  // number on the page keeps showing the raw, unrounded figure, so the
  // thumb and the numbers disagree and appear to jump around as price
  // changes.
  const result = useMemo(() => {
    if (rawResult.totalWithMarkup <= 0) return rawResult
    const total = rawResult.totalWithMarkup
    const roundedAmount = Math.min(
      downAmountBounds.max,
      Math.max(downAmountBounds.min, Math.round(rawResult.downPaymentAmount / PRICE_STEP) * PRICE_STEP),
    )
    return calculate(price, months, (roundedAmount / total) * 100, monthlyMarkupRate)
  }, [rawResult, downAmountBounds, price, months, monthlyMarkupRate])

  const roundedDownPercent = Math.round(result.downPaymentPercent)

  // Keep the amount field in sync whenever price, term or the percent slider
  // change it from elsewhere — but skip it right after the amount field's
  // own handlers already set the input directly (including to an empty
  // string while the user is mid-edit), otherwise this would immediately
  // overwrite a cleared field back to "0".
  useEffect(() => {
    if (skipDownAmountSyncRef.current) {
      skipDownAmountSyncRef.current = false
      return
    }
    setDownAmountInput(formatNumber(result.downPaymentAmount))
  }, [result.downPaymentAmount])

  const requestHref = useMemo(() => {
    const parts = [
      'Здравствуйте! Хочу оформить рассрочку в NISAB.',
      `Товар: ${formatRub(result.price)}, срок ${result.months} мес.`,
      result.downPaymentAmount > 0
        ? `Взнос ${roundedDownPercent}% (${formatRub(result.downPaymentAmount)}).`
        : 'Без первого взноса.',
      `Ежемесячный платёж: ${formatRub(result.monthlyPayment)}.`,
      isPremium ? 'Тариф: Премиум.' : '',
    ].filter(Boolean)
    return buildWhatsAppHref(parts.join(' '))
  }, [result, roundedDownPercent, isPremium])

  function handlePriceChange(event: ChangeEvent<HTMLInputElement>) {
    const { digits, restoreCursor } = priceCursor.parseWithCursor(event)
    const numeric = digits ? Math.min(MAX_PRICE, Number(digits)) : 0
    const formatted = digits ? formatNumber(numeric) : ''

    setPrice(numeric)
    setPriceInput(formatted)
    restoreCursor(formatted)
  }

  function handlePriceBlur() {
    const clamped = Math.min(MAX_PRICE, Math.max(MIN_PRICE, price || DEFAULT_PRICE))
    setPrice(clamped)
    setPriceInput(formatNumber(clamped))
  }

  function handlePriceStep(direction: 1 | -1) {
    const next = stepPrice(price || DEFAULT_PRICE, direction)
    setPrice(next)
    setPriceInput(formatNumber(next))
  }

  function handleDownAmountChange(event: ChangeEvent<HTMLInputElement>) {
    const { digits, restoreCursor } = downAmountCursor.parseWithCursor(event)
    const total = result.totalWithMarkup
    const maxAmount = total * (MAX_DOWN_PAYMENT_PERCENT / 100)
    const numeric = digits ? Math.min(maxAmount, Number(digits)) : 0
    const formatted = digits ? formatNumber(numeric) : ''

    skipDownAmountSyncRef.current = true
    setDownPercent(total > 0 ? (numeric / total) * 100 : DEFAULT_DOWN_PAYMENT_PERCENT)
    setDownAmountInput(formatted)
    restoreCursor(formatted)
  }

  function handleDownAmountStep(direction: 1 | -1) {
    const total = result.totalWithMarkup
    const next = Math.min(
      downAmountBounds.max,
      Math.max(downAmountBounds.min, result.downPaymentAmount + direction * PRICE_STEP),
    )
    setDownPercent(total > 0 ? (next / total) * 100 : DEFAULT_DOWN_PAYMENT_PERCENT)
  }

  function handleDownAmountBlur() {
    // Don't set the display value here — let the sync effect pick up
    // `result.downPaymentPercent`, which is already clamped and rounded to
    // the nearest step, so the field always settles on the same number the
    // slider and the breakdown panel show.
    setDownPercent(result.downPaymentPercent)
  }

  return (
    <section id="calculator" className="scroll-mt-20 border-b border-line pt-10 pb-8 sm:pt-14 sm:pb-24">
      <Container>
        <div className="mb-10 max-w-2xl">
          <h2 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
            Рассчитайте рассрочку за пару секунд
          </h2>
          <p className="mt-3 text-ink-soft">
            Укажите стоимость товара и срок — калькулятор сразу покажет наценку и ежемесячный
            платёж. Взнос можно изменить вручную, платёж пересчитается автоматически.
          </p>
        </div>

        <div className="rounded-md border border-line">
          <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-line">
            <div className="space-y-6 p-6 sm:p-8">
              <label className="flex cursor-pointer items-start gap-3 rounded-md border border-line p-4 transition-colors duration-200 hover:border-ink">
                <input
                  type="checkbox"
                  checked={isPremium}
                  onChange={(event) => setIsPremium(event.target.checked)}
                  className="sr-only"
                />
                <span
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-colors duration-200 ${
                    isPremium ? 'border-accent bg-accent' : 'border-line'
                  }`}
                >
                  {isPremium && <Check className="h-3 w-3 text-paper" />}
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink">Премиум</span>
                  <span className="block text-xs text-ink-soft">Сниженная наценка на рассрочку</span>
                </span>
              </label>

              <div>
                <label htmlFor="price" className="text-xs tracking-[0.1em] text-ink-soft uppercase">
                  Стоимость товара
                </label>
                <div className="mt-3 flex items-stretch gap-2">
                  <button
                    type="button"
                    onClick={() => handlePriceStep(-1)}
                    disabled={price <= MIN_PRICE}
                    aria-label={`Уменьшить на ${PRICE_STEP} ₽`}
                    className="flex w-11 shrink-0 items-center justify-center rounded-md border border-line text-ink transition-colors duration-200 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-ink"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <div className="flex flex-1 items-center gap-2 rounded-md border border-line px-4 py-2 transition-colors duration-200 focus-within:border-ink">
                    <input
                      id="price"
                      ref={priceCursor.ref}
                      inputMode="numeric"
                      value={priceInput}
                      onChange={handlePriceChange}
                      onBlur={handlePriceBlur}
                      className="font-tabular w-full bg-transparent text-xl font-bold text-ink outline-none"
                    />
                    <span className="text-lg text-ink-faint">₽</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePriceStep(1)}
                    disabled={price >= MAX_PRICE}
                    aria-label={`Увеличить на ${PRICE_STEP} ₽`}
                    className="flex w-11 shrink-0 items-center justify-center rounded-md border border-line text-ink transition-colors duration-200 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-ink"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-5">
                  <Slider
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={500}
                    value={price}
                    onChange={(value) => {
                      setPrice(value)
                      setPriceInput(formatNumber(value))
                    }}
                    ariaLabel="Стоимость товара"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs tracking-[0.1em] text-ink-soft uppercase">Срок рассрочки</label>
                  <span className="font-tabular text-sm font-bold text-ink">{months} мес.</span>
                </div>
                <div className="mt-5">
                  <Slider
                    min={MIN_MONTHS}
                    max={MAX_MONTHS}
                    step={1}
                    value={months}
                    onChange={setMonths}
                    ariaLabel="Срок рассрочки в месяцах"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="downAmount" className="text-xs tracking-[0.1em] text-ink-soft uppercase">
                    Первый взнос
                  </label>
                  <span className="font-tabular text-sm font-bold text-ink">{roundedDownPercent}%</span>
                </div>
                <div className="mt-3 flex items-stretch gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownAmountStep(-1)}
                    disabled={result.downPaymentAmount <= downAmountBounds.min}
                    aria-label={`Уменьшить на ${PRICE_STEP} ₽`}
                    className="flex w-11 shrink-0 items-center justify-center rounded-md border border-line text-ink transition-colors duration-200 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-ink"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <div className="flex flex-1 items-center gap-2 rounded-md border border-line px-4 py-2 transition-colors duration-200 focus-within:border-ink">
                    <input
                      id="downAmount"
                      ref={downAmountCursor.ref}
                      inputMode="numeric"
                      value={downAmountInput}
                      onChange={handleDownAmountChange}
                      onBlur={handleDownAmountBlur}
                      className="font-tabular w-full bg-transparent text-xl font-bold text-ink outline-none"
                    />
                    <span className="text-lg text-ink-faint">₽</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownAmountStep(1)}
                    disabled={result.downPaymentAmount >= downAmountBounds.max}
                    aria-label={`Увеличить на ${PRICE_STEP} ₽`}
                    className="flex w-11 shrink-0 items-center justify-center rounded-md border border-line text-ink transition-colors duration-200 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-ink"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-5">
                  <Slider
                    min={downAmountBounds.min}
                    max={downAmountBounds.max}
                    step={PRICE_STEP}
                    value={result.downPaymentAmount}
                    onChange={(amount) => {
                      const total = result.totalWithMarkup
                      setDownPercent(total > 0 ? (amount / total) * 100 : DEFAULT_DOWN_PAYMENT_PERCENT)
                    }}
                    ariaLabel="Первый взнос"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-paper-raised p-6 text-ink transition-colors duration-300 sm:p-8">
              <p className="text-xs tracking-[0.16em] text-ink-faint uppercase">Ежемесячный платёж</p>
              <p className="font-tabular mt-2 text-6xl leading-none font-bold text-accent dark:text-ink">
                {formatRub(result.monthlyPayment)}
              </p>
              <p className="mt-2 text-xs text-ink-faint">в течение {result.months} месяцев</p>

              <div className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
                <Row label="Стоимость товара" value={formatRub(result.price)} />
                <Row label="Наценка" value={`+ ${formatRub(result.markupAmount)}`} />
                <Row label="Итого с наценкой" value={formatRub(result.totalWithMarkup)} strong />
                <Row
                  label={`Первый взнос (${roundedDownPercent}%)`}
                  value={`− ${formatRub(result.downPaymentAmount)}`}
                />
                <Row label="Сумма в рассрочку" value={formatRub(result.financedAmount)} strong />
              </div>

              <p className="mt-6 text-xs leading-relaxed text-ink-faint italic">
                Расчёт носит справочный характер. Итоговые условия фиксируются в договоре
                купли-продажи с рассрочкой платежа и могут уточняться менеджером.
              </p>

              <div className="flex-1" />

              <a
                href={requestHref}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex items-center justify-center rounded-md bg-accent py-3.5 text-xs font-bold tracking-[0.1em] text-paper uppercase transition-opacity duration-200 hover:opacity-85"
              >
                Оставить заявку
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={strong ? 'font-semibold text-ink' : 'text-ink-soft'}>{label}</span>
      <span className={`font-tabular font-semibold ${strong ? 'text-ink' : 'text-ink-soft'}`}>{value}</span>
    </div>
  )
}
