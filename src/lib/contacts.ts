export const PHONE_DISPLAY = '+7 (960) 747-67-67'
export const PHONE_HREF = 'tel:+79607476767'
export const WHATSAPP_HREF = 'https://wa.me/79607476767'

export function buildWhatsAppHref(message?: string): string {
  if (!message) return WHATSAPP_HREF
  return `${WHATSAPP_HREF}?text=${encodeURIComponent(message)}`
}
