interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  description?: string
  inverse?: boolean
  level?: 1 | 2
}

export function SectionHeading({ index, eyebrow, title, description, inverse = false, level = 2 }: SectionHeadingProps) {
  const Heading = level === 1 ? 'h1' : 'h2'
  return (
    <div className={`section-heading ${level === 1 ? 'section-heading--page' : ''} ${inverse ? 'text-white' : 'text-ink'}`}>
      <div className={`flex items-start gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${inverse ? 'text-white/60' : 'text-muted'}`}>
        <span className="text-signal">{index}</span>
        {eyebrow}
      </div>
      <div className="section-heading-copy">
        <Heading className={level === 1 ? 'page-title' : 'section-title'}>
          {title}
        </Heading>
        {description && <p className={`reading-copy ${inverse ? 'text-white/65' : 'text-muted'}`}>{description}</p>}
      </div>
    </div>
  )
}
