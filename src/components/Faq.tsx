import { useState } from 'react'
import { Container } from './ui/Container'
import { Star8 } from './ui/Star8'

const FAQ_ITEMS = [
  {
    question: 'Это кредит или заём?',
    answer:
      'Нет. NISAB работает по договору купли-продажи товара с рассрочкой платежа (ст. 489 ГК РФ), а не по кредитному или заёмному договору. Банк в сделке не участвует, ссудный процент не начисляется — вместо него применяется фиксированная торговая наценка на товар.',
  },
  {
    question: 'Какая переплата за рассрочку?',
    answer:
      'Наценка составляет 3,8% от стоимости товара за каждый месяц срока и фиксируется в договоре до подписания. Скрытых комиссий и штрафов за пользование рассрочкой нет.',
  },
  {
    question: 'Нужна справка о доходах или поручители?',
    answer: 'Нет. Для оформления достаточно паспорта гражданина РФ и соответствия требованиям по возрасту и регистрации.',
  },
  {
    question: 'Можно оформить без первого взноса?',
    answer:
      'Да, в калькуляторе есть вкладка «Без взноса» — товар оформляется в рассрочку на полную стоимость с наценкой, без оплаты взноса при получении.',
  },
  {
    question: 'Можно ли изменить размер первого взноса?',
    answer:
      'Да. Стандартный взнос — 25% от суммы с наценкой, но его можно увеличить или уменьшить в калькуляторе — платёж пересчитается автоматически.',
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-20 border-b border-line py-16 sm:py-24">
      <Container>
        <div className="mb-10 flex items-baseline justify-between border-b border-line pb-3">
          <span className="text-xs tracking-[0.16em] text-ink-faint uppercase">Услуга № 01 — 05</span>
          <span className="text-xs tracking-[0.16em] text-ink-faint uppercase">Вопросы</span>
        </div>

        <h2 className="mb-10 font-serif text-3xl font-bold text-ink sm:text-4xl">Всё о рассрочке NISAB</h2>

        <div className="divide-y divide-line border-t border-line">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <Star8 className="h-2.5 w-2.5 shrink-0 text-accent" />
                    <span className="font-serif text-lg font-bold text-ink">{item.question}</span>
                  </span>
                  <span className="shrink-0 text-lg text-ink-faint">{isOpen ? '−' : '+'}</span>
                </button>
                <div
                  className={`accordion-rows ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-5 pl-6 text-sm leading-relaxed text-ink-soft">{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
