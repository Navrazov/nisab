import { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import { Info, Minus, Plus } from 'lucide-react'
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
    <section id="calculator" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <div className="mb-12 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-400 dark:text-brand-300">
            Калькулятор
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-900 sm:text-4xl dark:text-white">
            Рассчитайте рассрочку за пару секунд
          </h2>
          <p className="mt-3 text-brand-600 dark:text-brand-200">
            Укажите стоимость товара и срок — калькулятор сразу покажет наценку и ежемесячный
            платёж. Взнос можно изменить вручную, платёж пересчитается автоматически.
          </p>
        </div>

        <div className="rounded-[2rem] border border-brand-100 bg-white p-2 shadow-xl shadow-brand-900/5 transition-colors duration-300 dark:border-white/10 dark:bg-brand-900/40">
          <div className="inline-flex w-full gap-1 rounded-[1.6rem] bg-brand-50 p-1.5 dark:bg-white/5 sm:w-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setMode(tab.id)}
                className={`flex-1 rounded-[1.3rem] px-5 py-2.5 text-sm font-semibold transition-colors duration-200 sm:flex-none ${
                  mode === tab.id
                    ? 'bg-brand-900 text-white shadow-sm dark:bg-white dark:text-brand-900'
                    : 'text-brand-500 hover:text-brand-800 dark:text-brand-300 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-2 lg:gap-14">
            <div className="space-y-9">
              <div>
                <label htmlFor="price" className="text-sm font-semibold text-brand-800 dark:text-white">
                  Стоимость товара
                </label>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePriceStep(-1)}
                    disabled={price <= MIN_PRICE}
                    aria-label={`Уменьшить на ${PRICE_STEP} ₽`}
                    className="flex h-[52px] w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-200 text-brand-700 transition-colors duration-200 hover:border-brand-400 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-brand-200 disabled:hover:bg-transparent dark:border-white/15 dark:text-white dark:hover:bg-white/5 dark:disabled:hover:bg-transparent"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <div className="flex flex-1 items-center gap-2 rounded-2xl border border-brand-200 bg-brand-50/60 px-4 py-3.5 transition-colors duration-200 focus-within:border-brand-500 dark:border-white/15 dark:bg-white/5">
                    <input
                      id="price"
                      ref={priceCursor.ref}
                      inputMode="numeric"
                      value={priceInput}
                      onChange={handlePriceChange}
                      onBlur={handlePriceBlur}
                      className="w-full bg-transparent font-serif text-2xl font-semibold text-brand-900 outline-none dark:text-white"
                    />
                    <span className="text-lg font-medium text-brand-400 dark:text-brand-300">₽</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePriceStep(1)}
                    disabled={price >= MAX_PRICE}
                    aria-label={`Увеличить на ${PRICE_STEP} ₽`}
                    className="flex h-[52px] w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-200 text-brand-700 transition-colors duration-200 hover:border-brand-400 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-brand-200 disabled:hover:bg-transparent dark:border-white/15 dark:text-white dark:hover:bg-white/5 dark:disabled:hover:bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4">
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
                  <label className="text-sm font-semibold text-brand-800 dark:text-white">Срок рассрочки</label>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-800 dark:bg-white/10 dark:text-white">
                    {months} мес.
                  </span>
                </div>
                <Slider
                  min={MIN_MONTHS}
                  max={MAX_MONTHS}
                  step={1}
                  value={months}
                  onChange={setMonths}
                  ariaLabel="Срок рассрочки в месяцах"
                />
                <div className="mt-1.5 flex justify-between text-xs text-brand-400 dark:text-brand-300">
                  <span>3 мес.</span>
                  <span>12 мес.</span>
                </div>
              </div>

              {mode === 'withDown' && (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between">
                    <label htmlFor="downAmount" className="text-sm font-semibold text-brand-800 dark:text-white">
                      Первый взнос
                    </label>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-800 dark:bg-white/10 dark:text-white">
                      {roundedDownPercent}%
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 rounded-2xl border border-brand-200 bg-brand-50/60 px-4 py-3.5 transition-colors duration-200 focus-within:border-brand-500 dark:border-white/15 dark:bg-white/5">
                    <input
                      id="downAmount"
                      ref={downAmountCursor.ref}
                      inputMode="numeric"
                      value={downAmountInput}
                      onChange={handleDownAmountChange}
                      onBlur={handleDownAmountBlur}
                      className="w-full bg-transparent font-serif text-2xl font-semibold text-brand-900 outline-none dark:text-white"
                    />
                    <span className="text-lg font-medium text-brand-400 dark:text-brand-300">₽</span>
                  </div>
                  <div className="mt-4">
                    <Slider
                      min={MIN_DOWN_PAYMENT_PERCENT}
                      max={MAX_DOWN_PAYMENT_PERCENT}
                      step={1}
                      value={downPercent}
                      onChange={setDownPercent}
                      ariaLabel="Первый взнос в процентах"
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between text-xs text-brand-400 dark:text-brand-300">
                    <span>{MIN_DOWN_PAYMENT_PERCENT}%</span>
                    <span>стандартно 25%</span>
                    <span>{MAX_DOWN_PAYMENT_PERCENT}%</span>
                  </div>
                </div>
              )}

              {mode === 'noDown' && (
                <div className="animate-fade-in rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 p-4 text-sm text-brand-600 dark:border-white/15 dark:bg-white/5 dark:text-brand-200">
                  В режиме «без взноса» товар оформляется в рассрочку сразу на полную стоимость
                  с наценкой — оплата первого взноса не требуется.
                </div>
              )}
            </div>

            <div className="flex flex-col rounded-[1.75rem] bg-brand-900 p-7 text-white transition-colors duration-300 sm:p-8 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-300">
                Ежемесячный платёж
              </p>
              <p className="mt-2 font-serif text-5xl font-semibold">{formatRub(result.monthlyPayment)}</p>
              <p className="mt-1 text-sm text-brand-300">в течение {result.months} месяцев</p>

              <div className="mt-7 space-y-3 border-t border-white/10 pt-6 text-sm">
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

              <div className="mt-6 flex items-start gap-2 rounded-xl bg-white/5 p-3.5 text-xs leading-relaxed text-brand-300">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Расчёт носит справочный характер. Итоговые условия фиксируются в договоре
                купли-продажи с рассрочкой платежа и могут уточняться менеджером.
              </div>

              <a
                href={requestHref}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-900 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
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
      <span className="text-brand-300">{label}</span>
      <span className={strong ? 'font-semibold text-white' : 'text-brand-100'}>{value}</span>
    </div>
  )
}
