interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  description?: string
  inverse?: boolean
}

export function SectionHeading({ index, eyebrow, title, description, inverse = false }: SectionHeadingProps) {
  return (
    <div className="grid gap-6 border-t border-current/20 pt-5 md:grid-cols-[180px_1fr]">
      <div className="flex items-start gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-60">
        <span className="text-signal">{index}</span>
        {eyebrow}
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_380px] lg:items-end">
        <h2 className={`max-w-5xl text-[clamp(2.5rem,6vw,7rem)] font-semibold leading-[0.88] tracking-[-0.065em] ${inverse ? 'text-white' : 'text-ink'}`}>
          {title}
        </h2>
        {description && <p className="max-w-md text-sm leading-7 opacity-65 md:text-base">{description}</p>}
      </div>
    </div>
  )
}
