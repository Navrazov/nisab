import type { ReactNode } from 'react'

export function Container({
  children,
  className = '',
  maxWidth = 'max-w-[1440px]',
}: {
  children: ReactNode
  className?: string
  maxWidth?: string
}) {
  return <div className={`mx-auto w-full ${maxWidth} px-5 sm:px-8 ${className}`}>{children}</div>
}
