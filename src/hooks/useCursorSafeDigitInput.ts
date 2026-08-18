import { useRef, type ChangeEvent } from 'react'

export function useCursorSafeDigitInput() {
  const ref = useRef<HTMLInputElement>(null)

  function parseWithCursor(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target
    const raw = input.value
    const cursorPos = input.selectionStart ?? raw.length
    const digitsBeforeCursor = raw.slice(0, cursorPos).replace(/[^\d]/g, '').length
    const digits = raw.replace(/[^\d]/g, '')

    function restoreCursor(formatted: string) {
      requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        let seen = 0
        let nextPos = formatted.length
        for (let i = 0; i < formatted.length; i += 1) {
          if (/\d/.test(formatted[i])) seen += 1
          if (seen === digitsBeforeCursor) {
            nextPos = i + 1
            break
          }
        }
        el.setSelectionRange(nextPos, nextPos)
      })
    }

    return { digits, restoreCursor }
  }

  return { ref, parseWithCursor }
}
