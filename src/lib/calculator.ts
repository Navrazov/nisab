export interface MarkupRate {
  basePercent: number
  belowBreakpointQuadraticCoefficient: number
  slopeAtOrAboveBreakpoint: number
}

export const MARKUP_RATE_BREAKPOINT_PERCENT = 25

export const STANDARD_MARKUP_RATE: MarkupRate = {
  basePercent: 5,
  belowBreakpointQuadraticCoefficient: 0.00192,
  slopeAtOrAboveBreakpoint: 0.048,
}
export const PREMIUM_MARKUP_RATE: MarkupRate = {
  basePercent: 4,
  belowBreakpointQuadraticCoefficient: 0.0016,
  slopeAtOrAboveBreakpoint: 0.04,
}

export const MIN_PRICE = 1000
export const MAX_PRICE = 1000000
export const DEFAULT_PRICE = 50000
export const PRICE_STEP = 500

export const MIN_MONTHS = 1
export const MAX_MONTHS = 12
export const DEFAULT_MONTHS = 6

export const DEFAULT_DOWN_PAYMENT_PERCENT = 25
export const MIN_DOWN_PAYMENT_PERCENT = 0
export const MAX_DOWN_PAYMENT_PERCENT = 70

export interface CalculatorResult {
  price: number
  months: number
  markupPercent: number
  markupAmount: number
  totalWithMarkup: number
  downPaymentPercent: number
  downPaymentAmount: number
  financedAmount: number
  monthlyPayment: number
}

export function calculate(
  price: number,
  months: number,
  downPaymentPercent: number,
  markupRate: MarkupRate = STANDARD_MARKUP_RATE,
): CalculatorResult {
  const safePrice = Number.isFinite(price) && price > 0 ? price : 0
  const safeMonths = Math.min(MAX_MONTHS, Math.max(MIN_MONTHS, months))
  const safeDownPercent = Math.min(100, Math.max(0, downPaymentPercent))

  const monthlyMarkupPercent =
    safeDownPercent >= MARKUP_RATE_BREAKPOINT_PERCENT
      ? Math.max(0, markupRate.basePercent - markupRate.slopeAtOrAboveBreakpoint * safeDownPercent)
      : Math.max(
          0,
          markupRate.basePercent - markupRate.belowBreakpointQuadraticCoefficient * safeDownPercent ** 2,
        )
  const markupPercent = monthlyMarkupPercent * safeMonths
  const markupAmount = safePrice * (markupPercent / 100)
  const totalWithMarkup = safePrice + markupAmount
  const downPaymentAmount = totalWithMarkup * (safeDownPercent / 100)
  const financedAmount = totalWithMarkup - downPaymentAmount
  const monthlyPayment = safeMonths > 0 ? financedAmount / safeMonths : 0

  return {
    price: safePrice,
    months: safeMonths,
    markupPercent,
    markupAmount,
    totalWithMarkup,
    downPaymentPercent: safeDownPercent,
    downPaymentAmount,
    financedAmount,
    monthlyPayment,
  }
}

export function resolveDownPaymentForAmount(
  price: number,
  months: number,
  targetAmount: number,
  markupRate: MarkupRate,
  guessPercent: number,
): CalculatorResult {
  let percent = guessPercent
  let result = calculate(price, months, percent, markupRate)

  for (let i = 0; i < 8; i++) {
    if (result.totalWithMarkup <= 0) break
    percent = (targetAmount / result.totalWithMarkup) * 100
    result = calculate(price, months, percent, markupRate)
  }

  return result
}

export function stepPrice(price: number, direction: 1 | -1): number {
  const isRoundStep = price % PRICE_STEP === 0
  const roundedToStep =
    direction === 1
      ? Math.ceil(price / PRICE_STEP) * PRICE_STEP
      : Math.floor(price / PRICE_STEP) * PRICE_STEP
  const next = isRoundStep ? price + direction * PRICE_STEP : roundedToStep
  return Math.min(MAX_PRICE, Math.max(MIN_PRICE, next))
}

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 0,
})

export function formatRub(value: number): string {
  return `${currencyFormatter.format(Math.round(value))} ₽`
}

export function formatNumber(value: number): string {
  return currencyFormatter.format(Math.round(value))
}
