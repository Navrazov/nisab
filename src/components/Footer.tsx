import { MessageCircle, Phone } from 'lucide-react'
import { Container } from './ui/Container'
import iconWhite from '../assets/icon-white.png'
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from '../lib/contacts'

const LINKS = [
  { href: '#calculator', label: 'Калькулятор' },
  { href: '#how-it-works', label: 'Как это работает' },
  { href: '#advantages', label: 'Преимущества' },
  { href: '#requirements', label: 'Требования' },
  { href: '#partners', label: 'Партнёрам' },
  { href: '#faq', label: 'Вопросы' },
  { href: '#legal', label: 'Правовая информация' },
]

export function Footer() {
  return (
    <footer id="contacts" className="scroll-mt-20 bg-brand-900 pt-16 text-brand-200 transition-colors duration-300 dark:bg-black/40">
      <Container>
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={iconWhite} alt="NISAB" className="h-9 w-9" />
              <span className="font-serif text-lg font-semibold tracking-wide text-white">NISAB</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Рассрочка на любой товар без банка и скрытых процентов — прозрачная наценка,
              понятный график платежей.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Навигация</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Контакты</h3>
            <div className="mt-4 space-y-3 text-sm">
              <a href={PHONE_HREF} className="flex items-center gap-2 transition-colors hover:text-white">
                <Phone className="h-4 w-4" />
                {PHONE_DISPLAY}
              </a>
              <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-white">
                <MessageCircle className="h-4 w-4" />
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <p className="text-xs leading-relaxed text-brand-400">
            NISAB — рассрочка и инвестиции. Не является кредитной или банковской организацией.
            Услуга оказывается на условиях договора купли-продажи товара с рассрочкой платежа.
            Информация на сайте, включая результаты калькулятора, носит справочный характер и
            не является публичной офертой (ст. 437 ГК РФ). Итоговые условия определяются
            договором при оформлении.
          </p>
          <p className="mt-3 text-xs text-brand-500">© {new Date().getFullYear()} NISAB. Все права защищены.</p>
        </div>
      </Container>
    </footer>
  )
}
