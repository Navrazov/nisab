import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Container } from './ui/Container'

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
    <section id="faq" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-400 dark:text-brand-300">
            Частые вопросы
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-900 sm:text-4xl dark:text-white">
            Всё о рассрочке NISAB
          </h2>
        </div>

        <div className="mt-10 divide-y divide-brand-100 rounded-2xl border border-brand-100 bg-white transition-colors duration-300 dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-brand-50/60 dark:hover:bg-white/5"
                >
                  <span className="font-medium text-brand-900 dark:text-white">{item.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-brand-400 transition-transform duration-300 dark:text-brand-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`accordion-rows ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-brand-600 dark:text-brand-200">
                      {item.answer}
                    </p>
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
