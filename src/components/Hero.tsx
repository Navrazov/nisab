import { ArrowRight, ShieldCheck, Sparkles, Wallet } from 'lucide-react'

const BADGES = [
  { icon: ShieldCheck, label: 'Без банка и скрытых процентов' },
  { icon: Wallet, label: 'На любой товар' },
  { icon: Sparkles, label: 'От 3 до 12 месяцев' },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(38,45,72,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_50%)]"
      />
      <div className="mx-auto w-full max-w-4xl px-5 pb-16 pt-16 text-center sm:px-8 sm:pb-24 sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-700 transition-colors duration-300 dark:border-white/15 dark:bg-white/5 dark:text-brand-200">
          Рассрочка по принципам исламских финансов
        </span>

        <h1 className="mx-auto mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.1] text-brand-900 sm:text-5xl lg:text-6xl dark:text-white">
          Рассрочка без процентов —{' '}
          <span className="text-brand-500 dark:text-brand-300">честная наценка</span>, а не скрытый кредит
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brand-600 dark:text-brand-200">
          NISAB — рассрочка на любой товар без участия банка. Фиксированная торговая наценка
          вместо ссудного процента, прозрачный расчёт и понятный ежемесячный платёж с первого клика.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#calculator"
            className="inline-flex items-center gap-2 rounded-full bg-brand-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-brand-900"
          >
            Рассчитать рассрочку
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 px-6 py-3.5 text-sm font-semibold text-brand-700 transition-colors duration-200 hover:border-brand-400 dark:border-white/20 dark:text-white dark:hover:border-white/40"
          >
            Как это работает
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {BADGES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-200">
              <Icon className="h-4 w-4 text-brand-400 dark:text-brand-300" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
