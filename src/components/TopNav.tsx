import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import wechatQr from '../assets/wechat-qr.jpg'
import { siteNavItems, sitePageHash, type SitePage } from '../lib/siteRoute'
import { CopyButton } from './CopyButton'
import { GooeyNav } from './GooeyNav'
import { MusicToggle } from './MusicToggle'
import { SpotlightCard } from './SpotlightCard'

interface TopNavProps {
  currentPage: SitePage
  onNavigate: (page: SitePage) => void
}

export function TopNav({ currentPage, onNavigate }: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [utilityOpen, setUtilityOpen] = useState(false)
  const closeTimer = useRef<number | null>(null)
  const activeIndex = siteNavItems.findIndex((item) => item.page === currentPage)
  const items = siteNavItems.map((item) => ({
    label: item.label,
    href: sitePageHash(item.page),
  }))

  const openUtility = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setUtilityOpen(true)
  }

  const closeUtilitySoon = () => {
    closeTimer.current = window.setTimeout(() => setUtilityOpen(false), 700)
  }

  useEffect(() => () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
  }, [])

  const selectNavigation = (index: number) => {
    const item = siteNavItems[index]
    if (item) onNavigate(item.page)
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
      <a href={sitePageHash('index')} onClick={(event) => { event.preventDefault(); onNavigate('index') }} className="flex items-center gap-3 text-ink" aria-label="返回首页">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" fill="none" aria-hidden="true">
          <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" fill="currentColor" />
        </svg>
        <span className="hidden text-sm font-semibold tracking-[0.16em] sm:block">张楠 · Nan Zhang</span>
      </a>

      <SpotlightCard className="spotlight-card--nav spotlight-card--glass absolute left-1/2 hidden -translate-x-1/2 md:block" spotlightColor="rgba(125, 211, 252, .38)">
        <GooeyNav items={items} activeIndex={activeIndex} onSelect={selectNavigation} />
      </SpotlightCard>

      <div className="hidden items-center gap-3 md:flex">
        <div className="relative" onMouseEnter={openUtility} onMouseLeave={closeUtilitySoon}>
          <SpotlightCard className="spotlight-card--cta spotlight-card--glass" spotlightColor="rgba(74, 222, 128, .44)"><button type="button" onClick={() => setUtilityOpen((open) => !open)} aria-expanded={utilityOpen} className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
              OPEN TO WORK
            </button></SpotlightCard>
          {utilityOpen && (
            <div className="absolute right-0 top-full mt-3 w-[360px] rounded-3xl border border-black/10 bg-white p-5 text-ink shadow-2xl">
              <a href="/张楠-ai产品经理.pdf" download className="flex items-center justify-between rounded-2xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-900/20">
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
        <div className="fixed inset-x-4 top-16 z-[-1] rounded-3xl border border-white/70 bg-white/80 p-4 text-gray-900 shadow-2xl backdrop-blur-xl md:hidden">
          {siteNavItems.map((item) => (
            <a
              key={item.page}
              href={sitePageHash(item.page)}
              onClick={(event) => {
                event.preventDefault()
                onNavigate(item.page)
                setMenuOpen(false)
              }}
              className="block border-b border-black/10 py-4 text-left text-base font-medium text-gray-900 transition-colors last:border-b-0 hover:text-gray-500"
            >
              {item.label}
            </a>
          ))}
          <a href="/张楠-ai产品经理.pdf" download onClick={() => setMenuOpen(false)} className="mt-6 flex items-center justify-between rounded-2xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-900/20">
            简历 PDF 下载 <span aria-hidden="true">↓</span>
          </a>
        </div>
      )}
    </nav>
  )
}
