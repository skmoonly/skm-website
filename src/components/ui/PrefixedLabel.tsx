import { type CSSProperties } from 'react'
import clsx from 'clsx'

interface PrefixedLabelProps {
  label: string
  /** Dimmer variant for decorative / secondary use */
  dim?: boolean
  className?: string
  style?: CSSProperties
  /** Render as a different element (default: span) */
  as?: 'span' | 'p' | 'div' | 'h2' | 'h3'
}

/**
 * Renders a `// LABEL` in Space Mono — the signature SKM nav/data field style.
 *
 * @example
 * <PrefixedLabel label="LORE" />        → // LORE
 * <PrefixedLabel label="STATUS" dim />   → // STATUS  (dimmer)
 */
export default function PrefixedLabel({
  label,
  dim = false,
  className,
  style,
  as: Tag = 'span',
}: PrefixedLabelProps) {
  return (
    <Tag
      className={clsx(
        'skm-prefix select-none',
        dim && 'opacity-40',
        className
      )}
      style={style}
    >
      <span aria-hidden="true" style={{ marginRight: 2, opacity: 0.6 }}>
        //&nbsp;
      </span>
      {label}
    </Tag>
  )
}
