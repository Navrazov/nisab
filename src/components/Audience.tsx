import { Container } from './ui/Container'
import { WHATSAPP_HREF } from '../lib/contacts'

const AUDIENCE = [
  {
    title: 'Клиентам',
    text: 'Заранее считайте свой ежемесячный платёж перед покупкой и выбирайте комфортный срок и взнос.',
  },
  {
    title: 'Партнёрам-магазинам',
    text: 'Показывайте покупателю точную сумму рассрочки прямо на кассе, без сторонних сервисов.',
  },
  {
    title: 'Менеджерам',
    text: 'Единый инструмент для расчёта условий и оформления заявок по всем каналам продаж.',
  },
]

export function Audience() {
  return (
    <section id="partners" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <h2 className="mb-12 font-serif text-3xl font-bold text-ink sm:text-4xl">Один калькулятор для всех</h2>

        <div className="grid border-t border-line sm:grid-cols-3 sm:divide-x sm:divide-line">
          {AUDIENCE.map((item) => (
            <div key={item.title} className="border-b border-line py-7 pr-6 sm:border-b-0 sm:pl-6 sm:first:pl-0">
              <h3 className="font-serif text-xl font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 bg-ink p-8 transition-colors duration-300 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-serif text-xl italic text-paper">Хотите стать партнёром NISAB?</h3>
            <p className="mt-1.5 text-sm text-paper/60">
              Подключите рассрочку в своей точке продаж — расскажем об условиях.
            </p>
          </div>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-accent px-6 py-3.5 text-xs tracking-[0.1em] text-paper uppercase transition-opacity duration-200 hover:opacity-85"
          >
            Обсудить сотрудничество
          </a>
        </div>
      </Container>
    </section>
  )
}
