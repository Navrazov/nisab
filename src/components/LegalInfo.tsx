import { Container } from './ui/Container'
import { Star8 } from './ui/Star8'

const LEGAL_POINTS = [
  {
    title: 'Рассрочка, а не кредит',
    text: 'Услуга оформляется как рассрочка платежа по договору купли-продажи товара (ст. 489 Гражданского кодекса РФ), а не как заём или потребительский кредит. Действие Федерального закона от 21.12.2013 № 353-ФЗ «О потребительском кредите (займе)» на такие договоры не распространяется.',
  },
  {
    title: 'Наценка вместо процента',
    text: 'В основе расчёта — фиксированная торговая наценка на стоимость товара, а не ссудный процент. Такой подход соответствует принципам исламских финансов (отказ от риба) и заранее известен клиенту до подписания договора.',
  },
  {
    title: 'Персональные данные',
    text: 'Обработка персональных данных клиентов осуществляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных». Согласие на обработку данных запрашивается при подаче заявки.',
  },
]

export function LegalInfo() {
  return (
    <section id="legal" className="scroll-mt-20 bg-paper-raised py-16 transition-colors duration-300 sm:py-24">
      <Container>
        <div className="mb-10 flex items-baseline justify-between border-b border-line pb-3">
          <span className="text-xs tracking-[0.16em] text-ink-faint uppercase">Услуга № 01 — 06</span>
          <span className="text-xs tracking-[0.16em] text-ink-faint uppercase">Важно знать</span>
        </div>

        <h2 className="mb-12 font-serif text-3xl font-bold text-ink sm:text-4xl">Правовая информация</h2>

        <div className="divide-y divide-line border-t border-line">
          {LEGAL_POINTS.map((point) => (
            <div key={point.title} className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-6">
              <div className="flex items-baseline gap-3 sm:col-span-4">
                <Star8 className="h-2.5 w-2.5 shrink-0 translate-y-[-2px] text-accent" />
                <h3 className="font-serif text-lg font-bold text-ink">{point.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-ink-soft sm:col-span-8">{point.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
