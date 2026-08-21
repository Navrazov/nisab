import { useRef, type ChangeEvent } from 'react'

// Strips grouping whitespace (regular and non-breaking, so a pasted
// "1 000 000" still concatenates cleanly), then reads a single leading
// numeric token: digits, plus at most one decimal separator. A second
// separator or any other character ends the token, and everything from
// there on is dropped rather than spliced onto the number — so "1,5" rounds
// to 1-2 rubles instead of silently becoming 15, and "1e9" reads as 1, not 19.
//
// `cleanText` keeps the separator in place (e.g. "12,5") for as long as it's
// still pending — callers should display that verbatim while the field is
// focused, so a decimal typed digit-by-digit doesn't get collapsed by a
// reformat before its fractional half lands. `digits` is always the final
// rounded integer, ready to commit to state on every keystroke regardless.
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
    // When the cursor sits right after a decimal separator, digit count alone
    // is ambiguous — it matches both "just before the separator" and "just
    // after" it. Recording that the cursor trails a separator lets
    // restoreCursor break the tie by landing after it too, so a keystroke
    // right after typing "." doesn't get inserted back in front of it.
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
