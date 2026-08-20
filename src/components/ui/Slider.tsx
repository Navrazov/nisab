interface SliderProps {
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
  ariaLabel: string
}

export function Slider({ min, max, step, value, onChange, ariaLabel }: SliderProps) {
  return (
    <input
      type="range"
      className="nisab-slider w-full"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      aria-label={ariaLabel}
    />
  )
}
