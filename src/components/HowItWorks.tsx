import { Container } from './ui/Container'

const STEPS = [
  {
    title: 'Рассчитайте платёж',
    text: 'Укажите стоимость товара и срок в калькуляторе — сразу увидите наценку и ежемесячный платёж.',
  },
  {
    title: 'Оставьте заявку',
    text: 'Свяжитесь с менеджером по телефону или WhatsApp — он уточнит детали и проверит документы.',
  },
  {
    title: 'Подпишите договор',
    text: 'Заключается договор купли-продажи с рассрочкой платежа. Все условия фиксируются заранее.',
  },
  {
    title: 'Получите товар',
    text: 'Забираете товар сразу и вносите платежи по графику до полного погашения стоимости.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-b border-line py-16 sm:py-24">
      <Container>
        <h2 className="mb-12 font-serif text-3xl font-bold text-ink sm:text-4xl">Как это работает</h2>

        <div className="grid border-t border-line sm:grid-cols-2 sm:divide-x sm:divide-line lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.title} className="border-b border-line py-7 pr-6 sm:border-b-0 sm:pl-6 sm:first:pl-0">
              <span className="font-serif text-2xl text-accent">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 font-serif text-xl font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
