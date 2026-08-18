import { BadgePercent, CalendarClock, HandCoins, ShieldOff } from 'lucide-react'
import { Container } from './ui/Container'

const ADVANTAGES = [
  {
    icon: ShieldOff,
    title: 'Без ссудного процента',
    text: 'В основе — торговая наценка на товар, а не заём под процент. Это соответствует принципам исламских финансов.',
  },
  {
    icon: BadgePercent,
    title: 'Фиксированная наценка',
    text: 'Ставка 3,8% в месяц известна заранее и не меняется в течение всего срока рассрочки.',
  },
  {
    icon: CalendarClock,
    title: 'Гибкий срок',
    text: 'От 3 до 12 месяцев — подберите комфортный график платежей под свой бюджет.',
  },
  {
    icon: HandCoins,
    title: 'Минимум документов',
    text: 'Для оформления нужен только паспорт — без справок о доходах и поручителей.',
  },
]

export function Advantages() {
  return (
    <section id="advantages" className="scroll-mt-20 bg-brand-50/60 py-16 transition-colors duration-300 sm:py-24 dark:bg-white/[0.03]">
      <Container>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-400 dark:text-brand-300">
            Преимущества
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-900 sm:text-4xl dark:text-white">
            Прозрачная альтернатива банковскому кредиту
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {ADVANTAGES.map((item) => (
            <div key={item.title} className="flex gap-4 rounded-2xl bg-white p-6 transition-colors duration-300 dark:bg-brand-900/40">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-900 text-white dark:bg-white dark:text-brand-900">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-900 dark:text-white">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-600 dark:text-brand-200">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
