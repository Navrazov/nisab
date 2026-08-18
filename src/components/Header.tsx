import { useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { Container } from './ui/Container'
import { ThemeToggle } from './ThemeToggle'
import iconNavy from '../assets/icon-navy.png'
import iconWhite from '../assets/icon-white.png'
import { useTheme } from '../context/ThemeContext'
import { PHONE_DISPLAY, PHONE_HREF } from '../lib/contacts'

const NAV_LINKS = [
  { href: '#calculator', label: 'Калькулятор' },
  { href: '#how-it-works', label: 'Как это работает' },
  { href: '#advantages', label: 'Преимущества' },
  { href: '#partners', label: 'Партнёрам' },
  { href: '#faq', label: 'Вопросы' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { theme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/85 backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-[#0f1322]/85">
      <Container className="flex h-18 items-center justify-between py-3">
        <a href="#top" className="flex items-center gap-3">
          <img src={theme === 'dark' ? iconWhite : iconNavy} alt="NISAB" className="h-9 w-9" />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold tracking-wide text-brand-900 dark:text-white">
              NISAB
            </span>
            <span className="text-[9px] font-medium tracking-[0.18em] text-brand-500 dark:text-brand-300">
              РАССРОЧКА · ИНВЕСТИЦИИ
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-600 transition-colors duration-200 hover:text-brand-900 dark:text-brand-200 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-800 dark:bg-white dark:text-brand-900 dark:hover:bg-brand-100"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Открыть меню"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-200 text-brand-700 transition-colors duration-200 dark:border-white/15 dark:text-white"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <div
        className={`accordion-rows border-brand-100 bg-white lg:hidden dark:border-white/10 dark:bg-[#0f1322] ${
          open ? 'grid-rows-[1fr] border-t opacity-100' : 'grid-rows-[0fr] border-t-0 opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pt-2">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-brand-700 transition-colors duration-200 hover:bg-brand-50 dark:text-brand-100 dark:hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href={PHONE_HREF}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand-900 px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 dark:bg-white dark:text-brand-900"
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
