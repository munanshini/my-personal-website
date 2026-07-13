import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import wechatQr from '../assets/wechat-qr.jpg'
import { CopyButton } from './CopyButton'
import { GooeyNav } from './GooeyNav'
import { MusicToggle } from './MusicToggle'
import { SpotlightCard } from './SpotlightCard'

const navItems = [
  { label: 'INDEX 首页', href: '#index' },
  { label: 'WORK 工作', href: '#work' },
  { label: 'WORDS 内容', href: '#words' },
  { label: 'NOW 现在', href: '#now' },
  { label: 'CONTACT 联系', href: '#contact' },
]

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#index')
  const [utilityOpen, setUtilityOpen] = useState(false)
  const closeTimer = useRef<number | null>(null)
  const navigationLock = useRef(false)
  const navigationSettleTimer = useRef<number | null>(null)
  const syncActiveSection = useRef<() => void>(() => {})

  const scheduleNavigationUnlock = () => {
    if (navigationSettleTimer.current) window.clearTimeout(navigationSettleTimer.current)
    navigationSettleTimer.current = window.setTimeout(() => {
      navigationLock.current = false
      navigationSettleTimer.current = null
      syncActiveSection.current()
    }, 160)
  }

  const openUtility = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setUtilityOpen(true)
  }

  const closeUtilitySoon = () => {
    closeTimer.current = window.setTimeout(() => setUtilityOpen(false), 700)
  }

  useEffect(() => () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    if (navigationSettleTimer.current) window.clearTimeout(navigationSettleTimer.current)
  }, [])

  const isDarkContext = activeHref === '#now' || activeHref === '#contact'

  useEffect(() => {
    document.documentElement.dataset.darkContext = String(isDarkContext)
    return () => {
      delete document.documentElement.dataset.darkContext
    }
  }, [isDarkContext])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null)

    if (!sections.length) return

    syncActiveSection.current = () => {
      const referenceY = 112
      const passed = sections.filter((section) => section.getBoundingClientRect().top <= referenceY)
      setActiveHref(`#${(passed[passed.length - 1] ?? sections[0]).id}`)
    }

    const updateActiveFromScroll = () => {
      if (navigationLock.current) {
        scheduleNavigationUnlock()
        return
      }

      syncActiveSection.current()
    }

    window.addEventListener('scroll', updateActiveFromScroll, { passive: true })
    updateActiveFromScroll()
    return () => {
      window.removeEventListener('scroll', updateActiveFromScroll)
      syncActiveSection.current = () => {}
    }
  }, [])

  const selectNavigation = (index: number) => {
    const item = navItems[index]
    if (!item) return

    setActiveHref(item.href)
    navigationLock.current = true
    scheduleNavigationUnlock()
    document.querySelector(item.href)?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', item.href)
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
      <a href="#index" className={`flex items-center gap-3 ${isDarkContext ? 'text-white' : 'text-ink'}`} aria-label="返回首页">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" fill="none" aria-hidden="true">
          <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" fill="currentColor" />
        </svg>
        <span className="hidden text-sm font-semibold tracking-[0.16em] sm:block">张楠 · Nan Zhang</span>
      </a>

      <SpotlightCard className="spotlight-card--nav spotlight-card--glass absolute left-1/2 hidden -translate-x-1/2 md:block" spotlightColor="rgba(125, 211, 252, .38)">
        <GooeyNav items={navItems} activeIndex={Math.max(0, navItems.findIndex((item) => item.href === activeHref))} onSelect={selectNavigation} />
      </SpotlightCard>

      <div className="hidden items-center gap-3 md:flex">
        <div className="relative" onMouseEnter={openUtility} onMouseLeave={closeUtilitySoon}>
          <SpotlightCard className="spotlight-card--cta spotlight-card--glass" spotlightColor="rgba(74, 222, 128, .44)"><button type="button" onClick={() => setUtilityOpen((open) => !open)} aria-expanded={utilityOpen} className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
              OPEN TO WORK
            </button></SpotlightCard>
          {utilityOpen && (
            <div className="absolute right-0 top-full mt-3 w-[360px] rounded-3xl border border-black/10 bg-white p-5 text-ink shadow-2xl">
              <a href="/张楠-AI产品经理2026简历初版.pdf" download className="flex items-center justify-between rounded-2xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-700">
                简历 PDF 下载 <span aria-hidden="true">↓</span>
              </a>
              <div className="mt-5 divide-y divide-black/10 border-y border-black/10 text-sm">
                <div className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-3 py-3"><span className="text-gray-500">电话</span><div className="flex min-w-0 items-center gap-2"><strong className="min-w-0 flex-1 truncate">15767978588</strong><CopyButton value="15767978588" label="电话" /></div></div>
                <div className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-3 py-3"><span className="text-gray-500">邮箱</span><div className="flex min-w-0 items-center gap-2"><strong className="min-w-0 flex-1 truncate text-[13px]">zn525347603@gmail.com</strong><CopyButton value="zn525347603@gmail.com" label="邮箱" /></div></div>
                <div className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-3 py-3"><span className="text-gray-500">微信</span><div className="flex min-w-0 items-center gap-2"><strong className="min-w-0 flex-1 truncate">15767978588</strong><CopyButton value="15767978588" label="微信" /></div></div>
              </div>
              <img src={wechatQr} alt="张楠的微信二维码" className="mx-auto mt-5 h-32 w-32 rounded-xl object-cover" />
            </div>
          )}
        </div>
        <MusicToggle />
      </div>

      <div className="flex items-center gap-3 md:hidden">
        <MusicToggle />
        <button
          type="button"
          className="p-1 text-gray-900"
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-x-4 top-16 z-[-1] rounded-3xl border border-white/70 bg-white/80 p-4 shadow-2xl backdrop-blur-xl md:hidden">
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
          <a href="/张楠-AI产品经理2026简历初版.pdf" download onClick={() => setMenuOpen(false)} className="mt-4 flex items-center justify-between rounded-2xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white">
            简历 PDF 下载 <span aria-hidden="true">↓</span>
          </a>
          <div className="mt-4 space-y-2 border-t border-black/10 pt-4 text-xs text-gray-600">
            <p>电话 · 15767978588</p>
            <p>邮箱 · zn525347603@gmail.com</p>
            <p>微信 · 15767978588</p>
          </div>
        </div>
      )}
    </nav>
  )
}
