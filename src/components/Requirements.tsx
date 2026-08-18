import { CalendarDays, IdCard, MapPin } from 'lucide-react'
import { Container } from './ui/Container'

const REQUIREMENTS = [
  { icon: IdCard, title: 'Паспорт РФ', text: 'Действующий паспорт гражданина России.' },
  { icon: CalendarDays, title: 'Возраст 20–60 лет', text: 'На момент оформления заявки.' },
  { icon: MapPin, title: 'Прописка по ЧР', text: 'Регистрация на территории Чеченской Республики.' },
]

export function Requirements() {
  return (
    <section id="requirements" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-400 dark:text-brand-300">
              Требования
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-900 sm:text-4xl dark:text-white">
              Что нужно клиенту
            </h2>
            <p className="mt-4 text-brand-600 dark:text-brand-200">
              Оформление занимает несколько минут — без справок о доходах, поручителей и визита в банк.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {REQUIREMENTS.map((req) => (
              <div
                key={req.title}
                className="rounded-2xl border border-brand-100 bg-white p-6 text-center transition-colors duration-300 dark:border-white/10 dark:bg-white/5"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-800 dark:bg-white/10 dark:text-white">
                  <req.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-brand-900 dark:text-white">{req.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-brand-500 dark:text-brand-300">{req.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
