import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return <button type="button" onClick={copy} className="ml-2 inline-flex items-center gap-1 rounded-full border border-current/15 px-2 py-1 text-[10px] font-semibold transition-colors hover:bg-signal hover:text-white" aria-label={`复制${label}`}>
    {copied ? <Check size={12} /> : <Copy size={12} />}{copied ? '已复制' : '复制'}
  </button>
}
