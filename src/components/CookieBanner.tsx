import { useEffect, useRef, useState } from 'react'
import { Container } from './ui/Container'

const STORAGE_KEY = 'nisab-cookie-consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored !== 'accepted' && stored !== 'declined') setVisible(true)
  }, [])

  useEffect(() => {
    if (!visible) return
    const el = ref.current
    if (!el) return

    const updatePadding = () => {
      document.body.style.paddingBottom = `${el.offsetHeight}px`
    }
    updatePadding()

    const observer = new ResizeObserver(updatePadding)
    observer.observe(el)
    return () => {
      observer.disconnect()
      document.body.style.paddingBottom = ''
    }
  }, [visible])

  function respond(choice: 'accepted' | 'declined') {
    window.localStorage.setItem(STORAGE_KEY, choice)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper-raised transition-colors duration-300"
    >
      <Container className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-ink-soft sm:max-w-2xl">
          Сайт использует файлы cookie для своей работы (сохранение темы оформления и вашего выбора в этом
          сообщении), а также сервисами веб-аналитики при их подключении. Подробнее — в{' '}
          <a href="#/privacy-policy" className="underline underline-offset-2 hover:text-accent">
            Политике обработки персональных данных
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => respond('declined')}
            className="rounded-md border border-line px-4 py-2 text-xs font-semibold tracking-[0.06em] text-ink-soft uppercase transition-colors duration-200 hover:border-ink hover:text-ink"
          >
            Отклонить
          </button>
          <button
            type="button"
            onClick={() => respond('accepted')}
            className="rounded-md border border-accent bg-accent px-4 py-2 text-xs font-semibold tracking-[0.06em] text-paper uppercase transition-colors duration-200 hover:opacity-90"
          >
            Принять
          </button>
        </div>
      </Container>
    </div>
  )
}
