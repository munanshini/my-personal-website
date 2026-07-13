import { ArrowUpRight, BookOpen, Github, Radio, Video } from 'lucide-react'
import { CopyButton } from './CopyButton'
import heroPortrait from '../assets/hero-portrait.png'
import wechatQr from '../assets/wechat-qr.jpg'

const platforms = [
  { label: '视频号', icon: Video },
  { label: '小红书', icon: BookOpen },
  { label: 'B 站', icon: Video },
  { label: '公众号', icon: Radio },
  { label: '知乎', icon: BookOpen },
  { label: '人人都是产品经理', icon: BookOpen },
  { label: 'GitHub', icon: Github, href: 'https://github.com/munanshini' },
]

export function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-black/10 bg-[#e8e2d8] px-5 py-20 text-ink transition-colors duration-700 sm:px-8 md:py-28">
      <div className="relative z-10 mx-auto w-full max-w-canvas">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/20 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-600">
          <span><span className="mr-3 text-signal">05</span>CONTACT</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-green-500" />OPEN TO WORK</span>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] bg-[#111417] p-6 text-white sm:min-h-[420px] sm:p-10">
            <img src={heroPortrait} alt="张楠的肖像" className="absolute inset-0 h-full w-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111417] via-[#111417]/80 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <p className="max-w-xl text-lg leading-8 text-white/80">你好，我是张楠，一名 AI 产品经理。具备交互与产品思维，聚焦 AI 在内容生产、供应链与开发者工具场景的真实落地。</p>
              <a href="mailto:zn525347603@gmail.com" className="group flex flex-col items-start gap-5 border-b border-white/30 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.8] tracking-[-0.075em]">LET'S TALK<span className="text-signal">.</span></h2>
                <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-white/50 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight size={22} /></span>
              </a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-black/15 bg-white/45 p-6 sm:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">CONTACT DETAILS</p>
            <div className="mt-8 divide-y divide-black/10 border-y border-black/10 text-sm">
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-4"><span>电话</span><a href="tel:15767978588" className="min-w-0 text-right font-bold hover:text-signal">15767978588</a><CopyButton value="15767978588" label="电话" /></div>
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-4"><span>邮箱</span><a href="mailto:zn525347603@gmail.com" className="min-w-0 break-all text-right font-bold leading-5 hover:text-signal">zn525347603@gmail.com</a><CopyButton value="zn525347603@gmail.com" label="邮箱" /></div>
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-4"><span>微信</span><strong className="min-w-0 text-right">15767978588</strong><CopyButton value="15767978588" label="微信" /></div>
            </div>
            <img src={wechatQr} alt="添加张楠微信的二维码" className="mt-7 h-32 w-32 rounded-2xl object-cover sm:h-40 sm:w-40" />
            <div className="mt-8 flex flex-wrap gap-2">{platforms.map((platform) => {
              const Icon = platform.icon
              return platform.href ? <a key={platform.label} href={platform.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/15 px-3 py-2 text-xs font-semibold transition-colors hover:bg-black hover:text-white"><Icon size={14} />{platform.label}</a> : <button key={platform.label} type="button" title="链接待补充" className="inline-flex items-center gap-2 rounded-full border border-black/15 px-3 py-2 text-xs font-semibold text-gray-600"><Icon size={14} />{platform.label}</button>
            })}</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
