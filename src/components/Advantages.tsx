import { Container } from './ui/Container'
import { Star8 } from './ui/Star8'

const ADVANTAGES = [
  {
    title: 'Без ссудного процента',
    text: 'В основе — торговая наценка на товар, а не заём под процент. Это соответствует принципам исламских финансов.',
  },
  {
    title: 'Фиксированная наценка',
    text: 'Ставка 3,8% в месяц известна заранее и не меняется в течение всего срока рассрочки.',
  },
  {
    title: 'Гибкий срок',
    text: 'От 3 до 12 месяцев — подберите комфортный график платежей под свой бюджет.',
  },
  {
    title: 'Минимум документов',
    text: 'Для оформления нужен только паспорт — без справок о доходах и поручителей.',
  },
]

export function Advantages() {
  return (
    <section id="advantages" className="scroll-mt-20 bg-paper-raised py-16 transition-colors duration-300 sm:py-24">
      <Container>
        <div className="mb-10 flex items-baseline justify-between border-b border-line pb-3">
          <span className="text-xs tracking-[0.16em] text-ink-faint uppercase">Услуга № 01 — 03</span>
          <span className="text-xs tracking-[0.16em] text-ink-faint uppercase">Преимущества</span>
        </div>

        <h2 className="mb-12 max-w-xl font-serif text-3xl font-bold text-ink sm:text-4xl">
          Прозрачная альтернатива банковскому кредиту
        </h2>

        <div className="divide-y divide-line border-t border-line">
          {ADVANTAGES.map((item) => (
            <div key={item.title} className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-6">
              <div className="flex items-baseline gap-3 sm:col-span-4">
                <Star8 className="h-2.5 w-2.5 shrink-0 translate-y-[-2px] text-accent" />
                <h3 className="font-serif text-xl font-bold text-ink">{item.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-ink-soft sm:col-span-8">{item.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
