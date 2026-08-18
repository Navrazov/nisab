import { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import { Minus, Plus } from 'lucide-react'
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
  PRICE_STEP,
  calculate,
  formatNumber,
  formatRub,
  stepPrice,
} from '../lib/calculator'

type Mode = 'withDown' | 'noDown'

const TABS: { id: Mode; label: string }[] = [
  { id: 'withDown', label: 'Со взносом' },
  { id: 'noDown', label: 'Без взноса' },
]

export function Calculator() {
  const [mode, setMode] = useState<Mode>('withDown')
  const [price, setPrice] = useState(DEFAULT_PRICE)
  const [priceInput, setPriceInput] = useState(formatNumber(DEFAULT_PRICE))
  const [months, setMonths] = useState(DEFAULT_MONTHS)
  const [downPercent, setDownPercent] = useState<number>(DEFAULT_DOWN_PAYMENT_PERCENT)
  const [downAmountInput, setDownAmountInput] = useState(() =>
    formatNumber(calculate(DEFAULT_PRICE, DEFAULT_MONTHS, DEFAULT_DOWN_PAYMENT_PERCENT).downPaymentAmount),
  )

  const priceCursor = useCursorSafeDigitInput()
  const downAmountCursor = useCursorSafeDigitInput()

  const effectiveDownPercent = mode === 'noDown' ? 0 : downPercent

  const result = useMemo(
    () => calculate(price, months, effectiveDownPercent),
    [price, months, effectiveDownPercent],
  )

  const roundedDownPercent = Math.round(result.downPaymentPercent)

  // Keep the amount field in sync whenever price, term or the percent slider
  // change it from elsewhere — harmless no-op when the edit originated here,
  // since the amount just typed already round-trips to the same value.
  useEffect(() => {
    setDownAmountInput(formatNumber(result.downPaymentAmount))
  }, [result.downPaymentAmount])

  const requestHref = useMemo(() => {
    const parts = [
      'Здравствуйте! Хочу оформить рассрочку в NISAB.',
      `Товар: ${formatRub(result.price)}, срок ${result.months} мес.`,
      mode === 'withDown'
        ? `Взнос ${roundedDownPercent}% (${formatRub(result.downPaymentAmount)}).`
        : 'Без первого взноса.',
      `Ежемесячный платёж: ${formatRub(result.monthlyPayment)}.`,
    ]
    return buildWhatsAppHref(parts.join(' '))
  }, [mode, result, roundedDownPercent])

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

    setDownPercent(total > 0 ? (numeric / total) * 100 : DEFAULT_DOWN_PAYMENT_PERCENT)
    setDownAmountInput(formatted)
    restoreCursor(formatted)
  }

  function handleDownAmountBlur() {
    const total = result.totalWithMarkup
    const minAmount = total * (MIN_DOWN_PAYMENT_PERCENT / 100)
    const maxAmount = total * (MAX_DOWN_PAYMENT_PERCENT / 100)
    const currentAmount = total * (downPercent / 100)
    const clamped = Math.min(maxAmount, Math.max(minAmount, currentAmount || minAmount))

    setDownPercent(total > 0 ? (clamped / total) * 100 : DEFAULT_DOWN_PAYMENT_PERCENT)
    setDownAmountInput(formatNumber(clamped))
  }

  return (
    <section id="calculator" className="scroll-mt-20 border-b border-line py-16 sm:py-24">
      <Container>
        <div className="mb-10 flex items-baseline justify-between border-b border-line pb-3">
          <span className="text-xs tracking-[0.16em] text-ink-faint uppercase">Услуга № 01 — 02</span>
          <span className="text-xs tracking-[0.16em] text-ink-faint uppercase">Калькулятор</span>
        </div>

        <div className="mb-10 max-w-2xl">
          <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
            Рассчитайте рассрочку за пару секунд
          </h2>
          <p className="mt-3 text-ink-soft">
            Укажите стоимость товара и срок — калькулятор сразу покажет наценку и ежемесячный
            платёж. Взнос можно изменить вручную, платёж пересчитается автоматически.
          </p>
        </div>

        <div className="rounded-sm border border-line">
          <div className="flex border-b border-line">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setMode(tab.id)}
                className={`border-b-2 px-6 py-4 text-xs tracking-[0.1em] uppercase transition-colors duration-200 ${
                  mode === tab.id ? 'border-accent text-ink' : 'border-transparent text-ink-faint hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-line">
            <div className="space-y-10 p-6 sm:p-8">
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
                    className="flex w-11 shrink-0 items-center justify-center rounded-sm border border-line text-ink transition-colors duration-200 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-ink"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <div className="flex flex-1 items-center gap-2 rounded-sm border border-line px-4 py-3 transition-colors duration-200 focus-within:border-ink">
                    <input
                      id="price"
                      ref={priceCursor.ref}
                      inputMode="numeric"
                      value={priceInput}
                      onChange={handlePriceChange}
                      onBlur={handlePriceBlur}
                      className="font-tabular w-full bg-transparent text-2xl text-ink outline-none"
                    />
                    <span className="text-lg text-ink-faint">₽</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePriceStep(1)}
                    disabled={price >= MAX_PRICE}
                    aria-label={`Увеличить на ${PRICE_STEP} ₽`}
                    className="flex w-11 shrink-0 items-center justify-center rounded-sm border border-line text-ink transition-colors duration-200 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-ink"
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
                  <span className="font-tabular text-sm text-ink">{months} мес.</span>
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
                <div className="mt-2 flex justify-between text-[11px] text-ink-faint">
                  <span>3 мес.</span>
                  <span>12 мес.</span>
                </div>
              </div>

              {mode === 'withDown' && (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between">
                    <label htmlFor="downAmount" className="text-xs tracking-[0.1em] text-ink-soft uppercase">
                      Первый взнос
                    </label>
                    <span className="font-tabular text-sm text-ink">{roundedDownPercent}%</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 rounded-sm border border-line px-4 py-3 transition-colors duration-200 focus-within:border-ink">
                    <input
                      id="downAmount"
                      ref={downAmountCursor.ref}
                      inputMode="numeric"
                      value={downAmountInput}
                      onChange={handleDownAmountChange}
                      onBlur={handleDownAmountBlur}
                      className="font-tabular w-full bg-transparent text-2xl text-ink outline-none"
                    />
                    <span className="text-lg text-ink-faint">₽</span>
                  </div>
                  <div className="mt-5">
                    <Slider
                      min={MIN_DOWN_PAYMENT_PERCENT}
                      max={MAX_DOWN_PAYMENT_PERCENT}
                      step={1}
                      value={downPercent}
                      onChange={setDownPercent}
                      ariaLabel="Первый взнос в процентах"
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] text-ink-faint">
                    <span>{MIN_DOWN_PAYMENT_PERCENT}%</span>
                    <span>стандартно 25%</span>
                    <span>{MAX_DOWN_PAYMENT_PERCENT}%</span>
                  </div>
                </div>
              )}

              {mode === 'noDown' && (
                <div className="animate-fade-in border-l-2 border-accent py-1 pl-4 text-sm leading-relaxed text-ink-soft">
                  В режиме «без взноса» товар оформляется в рассрочку сразу на полную стоимость с
                  наценкой — оплата первого взноса не требуется.
                </div>
              )}
            </div>

            <div className="flex flex-col bg-ink p-6 text-paper transition-colors duration-300 sm:p-8">
              <p className="text-xs tracking-[0.16em] text-paper/50 uppercase">Ежемесячный платёж</p>
              <p className="font-tabular font-serif mt-2 text-6xl leading-none text-accent-invert">
                {formatRub(result.monthlyPayment)}
              </p>
              <p className="mt-2 text-xs text-paper/50">в течение {result.months} месяцев</p>

              <div className="mt-8 space-y-3 border-t border-paper/15 pt-6 text-sm">
                <Row label="Стоимость товара" value={formatRub(result.price)} />
                <Row label="Наценка" value={`+ ${formatRub(result.markupAmount)}`} />
                <Row label="Итого с наценкой" value={formatRub(result.totalWithMarkup)} strong />
                {mode === 'withDown' && (
                  <div className="animate-fade-in">
                    <Row
                      label={`Первый взнос (${roundedDownPercent}%)`}
                      value={`− ${formatRub(result.downPaymentAmount)}`}
                    />
                  </div>
                )}
                <Row label="Сумма в рассрочку" value={formatRub(result.financedAmount)} strong />
              </div>

              <p className="mt-6 text-xs leading-relaxed text-paper/45 italic">
                Расчёт носит справочный характер. Итоговые условия фиксируются в договоре
                купли-продажи с рассрочкой платежа и могут уточняться менеджером.
              </p>

              <a
                href={requestHref}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex items-center justify-center rounded-sm bg-accent py-3.5 text-xs tracking-[0.1em] text-paper uppercase transition-opacity duration-200 hover:opacity-85"
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
      <span className={strong ? 'text-paper/85' : 'text-paper/55'}>{label}</span>
      <span className={`font-tabular ${strong ? 'font-medium text-paper' : 'text-paper/80'}`}>{value}</span>
    </div>
  )
}
