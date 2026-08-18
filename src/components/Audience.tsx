import { Handshake, ShoppingBag, Users } from 'lucide-react'
import { Container } from './ui/Container'
import { WHATSAPP_HREF } from '../lib/contacts'

const AUDIENCE = [
  {
    icon: ShoppingBag,
    title: 'Клиентам',
    text: 'Заранее считайте свой ежемесячный платёж перед покупкой и выбирайте комфортный срок и взнос.',
  },
  {
    icon: Handshake,
    title: 'Партнёрам-магазинам',
    text: 'Показывайте покупателю точную сумму рассрочки прямо на кассе, без сторонних сервисов.',
  },
  {
    icon: Users,
    title: 'Менеджерам',
    text: 'Единый инструмент для расчёта условий и оформления заявок по всем каналам продаж.',
  },
]

export function Audience() {
  return (
    <section id="partners" className="scroll-mt-20 bg-brand-50/60 py-16 sm:py-24 dark:bg-white/[0.03]">
      <Container>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-400 dark:text-brand-300">
            Кому подходит
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-900 sm:text-4xl dark:text-white">
            Один калькулятор для всех
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {AUDIENCE.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white p-6 transition-colors duration-300 dark:bg-brand-900/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-900 text-white dark:bg-white dark:text-brand-900">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-brand-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-600 dark:text-brand-200">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-brand-900 p-7 transition-colors duration-300 sm:flex-row sm:items-center dark:bg-white/5">
          <div>
            <h3 className="font-serif text-xl font-semibold text-white">Хотите стать партнёром NISAB?</h3>
            <p className="mt-1 text-sm text-brand-300">Подключите рассрочку в своей точке продаж — расскажем об условиях.</p>
          </div>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-900 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Обсудить сотрудничество
          </a>
        </div>
      </Container>
    </section>
  )
}
