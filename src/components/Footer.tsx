import { Container } from './ui/Container'
import iconNavy from '../assets/icon-navy.png'
import iconWhite from '../assets/icon-white.png'
import { useTheme } from '../context/ThemeContext'
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from '../lib/contacts'

const LINKS = [
  { href: '#calculator', label: 'Калькулятор' },
  { href: '#how-it-works', label: 'Как это работает' },
  { href: '#requirements', label: 'Требования' },
  { href: '#partners', label: 'Партнёрам' },
]

const LEGAL_LINKS = [
  { href: '#/privacy-policy', label: 'Политика обработки персональных данных' },
  { href: '#/terms', label: 'Пользовательское соглашение' },
]

export function Footer() {
  const { theme } = useTheme()

  return (
    <footer id="contacts" className="scroll-mt-20 border-t border-line bg-paper-raised pt-16 text-ink-soft transition-colors duration-300">
      <Container>
        <div className="grid gap-10 border-b border-line pb-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={theme === 'dark' ? iconWhite : iconNavy} alt="NISAB" className="h-8 w-8" />
              <span className="font-serif text-lg italic text-ink">NISAB</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Рассрочка на любой товар без банка и скрытых процентов — прозрачная наценка,
              понятный график платежей.
            </p>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.14em] text-ink-faint uppercase">Навигация</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.14em] text-ink-faint uppercase">Контакты</h3>
            <div className="mt-4 space-y-2.5 text-sm">
              <a href={PHONE_HREF} className="block transition-colors hover:text-accent">
                {PHONE_DISPLAY}
              </a>
              <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer" className="block transition-colors hover:text-accent">
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="py-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-ink-faint underline underline-offset-2 transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-faint">© {new Date().getFullYear()} NISAB. Все права защищены.</p>
        </div>
      </Container>
    </footer>
  )
}
