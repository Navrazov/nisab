import { Container } from './ui/Container'
import { Star8 } from './ui/Star8'

const REQUIREMENTS = [
  { title: 'Паспорт РФ', text: 'Действующий паспорт гражданина России.' },
  { title: 'Возраст 20–60 лет', text: 'На момент оформления заявки.' },
  { title: 'Прописка по ЧР', text: 'Регистрация на территории Чеченской Республики.' },
]

export function Requirements() {
  return (
    <section id="requirements" className="scroll-mt-20 border-b border-line py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <span className="text-xs tracking-[0.16em] text-ink-faint uppercase">Требования</span>
            <h2 className="mt-3 font-serif text-3xl font-medium text-ink sm:text-4xl">Что нужно клиенту</h2>
            <p className="mt-4 max-w-sm text-ink-soft">
              Оформление занимает несколько минут — без справок о доходах, поручителей и визита в банк.
            </p>
          </div>

          <div className="divide-y divide-line border-t border-line lg:border-t-0">
            {REQUIREMENTS.map((req) => (
              <div key={req.title} className="flex items-baseline gap-5 py-5">
                <Star8 className="h-2.5 w-2.5 shrink-0 translate-y-[-2px] text-accent" />
                <div>
                  <h3 className="font-serif text-lg font-medium text-ink">{req.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{req.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
