import { Calculator as CalculatorIcon, FileSignature, PackageCheck, Send } from 'lucide-react'
import { Container } from './ui/Container'

const STEPS = [
  {
    icon: CalculatorIcon,
    title: 'Рассчитайте платёж',
    text: 'Укажите стоимость товара и срок в калькуляторе — сразу увидите наценку и ежемесячный платёж.',
  },
  {
    icon: Send,
    title: 'Оставьте заявку',
    text: 'Свяжитесь с менеджером по телефону или WhatsApp — он уточнит детали и проверит документы.',
  },
  {
    icon: FileSignature,
    title: 'Подпишите договор',
    text: 'Заключается договор купли-продажи с рассрочкой платежа. Все условия фиксируются заранее.',
  },
  {
    icon: PackageCheck,
    title: 'Получите товар',
    text: 'Забираете товар сразу и вносите платежи по графику до полного погашения стоимости.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-t border-brand-100 py-16 sm:py-24 dark:border-white/10">
      <Container>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-400 dark:text-brand-300">
            Процесс
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-900 sm:text-4xl dark:text-white">
            Как это работает
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-brand-100 bg-white p-6 transition-colors duration-300 dark:border-white/10 dark:bg-white/5"
            >
              <span className="font-serif text-4xl font-semibold text-brand-100 dark:text-white/10">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-900 text-white dark:bg-white dark:text-brand-900">
                <step.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-brand-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-600 dark:text-brand-200">{step.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
