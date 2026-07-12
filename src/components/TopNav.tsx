import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'INDEX 首页', href: '#index' },
  { label: 'WORK 案例', href: '#work' },
  { label: 'EXPERIENCE 经历', href: '#experience' },
  { label: 'WORDS 内容', href: '#words' },
  { label: 'NOW 现在', href: '#now' },
  { label: 'CONTACT 联系', href: '#contact' },
]

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
      <a href="#index" className="flex items-center gap-3" aria-label="返回首页">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" fill="none" aria-hidden="true">
          <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" fill="#111111" />
        </svg>
        <span className="hidden text-[11px] font-semibold tracking-[0.16em] text-ink sm:block">AI PM · PORTFOLIO</span>
      </a>

      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full bg-gray-900 px-2 py-1.5 md:flex">
        {navItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className={index === 0
              ? 'rounded-full bg-white px-4 py-1.5 text-xs font-medium text-gray-900'
              : 'rounded-full px-4 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:text-white'}
          >
            {item.label}
          </a>
        ))}
      </div>

      <a href="#contact" className="hidden items-center gap-2 rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 md:flex">
        <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
        OPEN TO WORK
      </a>

      <button
        type="button"
        className="p-1 text-gray-900 md:hidden"
        aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {menuOpen && (
        <div className="fixed inset-x-0 top-0 z-[-1] flex flex-col gap-1 bg-white px-5 pb-6 pt-16 shadow-lg md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-gray-100 py-3 text-left text-base font-medium text-gray-800 transition-colors hover:text-gray-500"
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-4 flex items-center justify-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white">
            <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
            OPEN TO WORK
          </a>
        </div>
      )}
    </nav>
  )
}
