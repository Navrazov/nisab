import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      aria-pressed={isDark}
      className="relative inline-flex h-9 w-16 shrink-0 items-center rounded-full border border-brand-200 bg-brand-50 px-1 transition-colors duration-300 dark:border-white/15 dark:bg-white/5"
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm shadow-brand-900/10 transition-transform duration-300 dark:bg-brand-900 ${
          isDark ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {isDark ? <Moon className="h-3.5 w-3.5 text-white" /> : <Sun className="h-3.5 w-3.5 text-brand-700" />}
      </span>
    </button>
  )
}
