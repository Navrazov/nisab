import { useRef, type ChangeEvent } from 'react'

export function extractNumeric(raw: string): { digits: string; cleanText: string; hasPendingDecimal: boolean } {
  const collapsed = raw.replace(/[\s   ]/g, '')
  let intPart = ''
  let fracPart = ''
  let cleanText = ''
  let seenSeparator = false

  for (const char of collapsed) {
    if (char >= '0' && char <= '9') {
      if (seenSeparator) fracPart += char
      else intPart += char
      cleanText += char
      continue
    }
    if ((char === '.' || char === ',') && !seenSeparator) {
      seenSeparator = true
      cleanText += char
      continue
    }
    break
  }

  const digits = seenSeparator ? String(Math.round(Number(`${intPart || '0'}.${fracPart || '0'}`))) : intPart
  return { digits, cleanText, hasPendingDecimal: seenSeparator }
}

export function useCursorSafeDigitInput() {
  const ref = useRef<HTMLInputElement>(null)

  function parseWithCursor(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target
    const raw = input.value
    const cursorPos = input.selectionStart ?? raw.length
    const textBeforeCursor = raw.slice(0, cursorPos)
    const digitsBeforeCursor = textBeforeCursor.replace(/[^\d]/g, '').length
    const cursorTrailsSeparator = /[.,]$/.test(textBeforeCursor)
    const { digits, cleanText, hasPendingDecimal } = extractNumeric(raw)

    function restoreCursor(formatted: string) {
      requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        let seen = 0
        let nextPos = formatted.length
        for (let i = 0; i < formatted.length; i += 1) {
          if (/\d/.test(formatted[i])) seen += 1
          if (seen === digitsBeforeCursor) {
            nextPos = cursorTrailsSeparator && /[.,]/.test(formatted[i + 1] ?? '') ? i + 2 : i + 1
            break
          }
        }
        el.setSelectionRange(nextPos, nextPos)
      })
    }

    return { digits, cleanText, hasPendingDecimal, restoreCursor }
  }

  return { ref, parseWithCursor }
}
