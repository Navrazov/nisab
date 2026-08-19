import type { ReactNode } from 'react'
import { Container } from '../ui/Container'

export function LegalLayout({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="scroll-mt-20 border-b border-line pt-10 pb-16 sm:pt-14 sm:pb-24">
      <Container maxWidth="max-w-6xl">
        <a
          href="#calculator"
          className="text-xs font-semibold tracking-[0.1em] text-ink-faint uppercase transition-colors duration-200 hover:text-accent"
        >
          ← На главную
        </a>
        <h1 className="mt-6 font-serif text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
        <p className="mt-2 text-xs text-ink-faint">Действует с {updated}</p>
        <div className="mt-10 space-y-8 rounded-md border border-line bg-paper-raised p-6 sm:p-10">{children}</div>
      </Container>
    </section>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-soft">{children}</div>
    </div>
  )
}
