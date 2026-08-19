import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Container } from './ui/Container'
import { Star8 } from './ui/Star8'
import { ThemeToggle } from './ThemeToggle'
import iconNavy from '../assets/icon-navy.png'
import iconWhite from '../assets/icon-white.png'
import { useTheme } from '../context/ThemeContext'
import { PHONE_DISPLAY, PHONE_HREF } from '../lib/contacts'

const NAV_LINKS = [
  { href: '#calculator', label: 'Калькулятор' },
  { href: '#how-it-works', label: 'Как это работает' },
  { href: '#partners', label: 'Партнёрам' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { theme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper transition-colors duration-300">
      <Container className="flex h-24 items-center justify-between">
        <a href="#calculator" className="flex items-center gap-3 sm:gap-4">
          <img src={theme === 'dark' ? iconWhite : iconNavy} alt="NISAB" className="h-14 w-14 sm:h-16 sm:w-16" />
          <span className="flex flex-col leading-none">
            <span className="font-sans text-2xl font-bold tracking-wide text-ink sm:text-3xl">NISAB</span>
            <span className="mt-1.5 flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.22em] text-ink-faint uppercase sm:mt-2 sm:text-xs">
              <Star8 className="h-2 w-2 shrink-0 sm:h-2.5 sm:w-2.5" /> Исламская рассрочка
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 xl:flex">
          <nav className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap border-b border-transparent pb-0.5 text-xs font-semibold tracking-[0.06em] text-ink-soft uppercase transition-colors duration-200 hover:border-accent hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-5">
            <ThemeToggle />
            <a
              href={PHONE_HREF}
              className="whitespace-nowrap rounded-md border border-ink px-4 py-2 text-xs font-semibold tracking-[0.06em] text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Открыть меню"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink transition-colors duration-200"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>

      <div
        className={`accordion-rows border-line bg-paper xl:hidden ${
          open ? 'grid-rows-[1fr] border-t opacity-100' : 'grid-rows-[0fr] border-t-0 opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pt-2">
            <nav className="flex flex-col divide-y divide-line">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3.5 text-xs font-semibold tracking-[0.1em] text-ink-soft uppercase transition-colors duration-200 hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href={PHONE_HREF}
              className="mt-4 flex items-center justify-center rounded-md border border-ink py-3 text-xs font-semibold tracking-[0.06em] text-ink"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
