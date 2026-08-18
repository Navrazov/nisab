import { ArrowRight } from 'lucide-react'
import { Container } from './ui/Container'
import { Star8 } from './ui/Star8'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <Star8
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[30rem] w-[30rem] text-ink opacity-[0.035] sm:-right-16 sm:-top-32 sm:h-[38rem] sm:w-[38rem]"
      />

      <Container className="relative pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div className="flex items-baseline justify-between border-b border-line pb-3">
          <span className="text-xs tracking-[0.16em] text-ink-faint uppercase">Услуга № 01 — Рассрочка</span>
          <span className="hidden text-xs tracking-[0.16em] text-ink-faint uppercase sm:inline">
            Без банка и процента
          </span>
        </div>

        <div className="max-w-3xl pt-10 lg:pt-14">
          <h1 className="font-serif text-[2.75rem] leading-[1.08] font-medium text-ink sm:text-6xl lg:text-[4.5rem]">
            Рассрочка без процента —{' '}
            <span className="italic text-accent">честная наценка</span>, а не скрытый кредит
          </h1>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
            NISAB — рассрочка на любой товар без участия банка. Фиксированная торговая наценка
            вместо ссудного процента и понятный ежемесячный платёж с первого клика.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 rounded-sm border border-ink bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors duration-200 hover:border-accent hover:bg-accent"
            >
              Рассчитать рассрочку
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-sm border border-line px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink"
            >
              Как это работает
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs tracking-[0.1em] text-ink-faint uppercase">
          <span>Без банка и скрытых процентов</span>
          <Star8 className="h-2 w-2 shrink-0 text-ink-faint" />
          <span>На любой товар</span>
          <Star8 className="h-2 w-2 shrink-0 text-ink-faint" />
          <span>От 3 до 12 месяцев</span>
        </div>
      </Container>
    </section>
  )
}
