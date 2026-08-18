import type { CSSProperties } from 'react'

interface SliderProps {
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
  ariaLabel: string
}

export function Slider({ min, max, step, value, onChange, ariaLabel }: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100

  return (
    <input
      type="range"
      className="nisab-slider w-full"
      style={{ '--fill': `${percent}%` } as CSSProperties}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      aria-label={ariaLabel}
    />
  )
}
