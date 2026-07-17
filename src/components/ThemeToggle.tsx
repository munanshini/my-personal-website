import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme/ThemeProvider'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? '切换到浅色模式' : '切换到深色模式'}
      className={className}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
