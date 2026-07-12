import { ArrowUpRight, Mail } from 'lucide-react'

const platforms = ['视频号', '小红书', 'B 站', '公众号', '知乎', '人人都是产品经理', 'GitHub']

export function Contact() {
  return (
    <footer id="contact" className="relative flex min-h-screen items-end overflow-hidden bg-[#e8e2d8] px-5 pb-10 pt-28 text-ink sm:px-8 md:pb-14">
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" style={{
        backgroundImage: 'linear-gradient(rgba(100,116,139,.38) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,.38) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />
      <div className="relative z-10 mx-auto w-full max-w-canvas">
        <div className="flex items-center justify-between border-t border-black/20 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-600">
          <span><span className="mr-3 text-signal">05</span>CONTACT</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-green-500" />OPEN TO WORK</span>
        </div>

        <p className="mt-14 max-w-3xl text-lg leading-8 text-gray-700">正在寻找 AI 产品经理机会，也欢迎围绕 AI 应用、产品体验与内容创作展开交流。</p>
        <a href="mailto:your-email@example.com" className="group mt-10 flex items-end justify-between border-b border-black pb-6">
          <h2 className="text-[clamp(3.4rem,10vw,11rem)] font-semibold leading-[0.8] tracking-[-0.075em]">LET'S TALK<span className="text-signal">.</span></h2>
          <span className="mb-2 hidden h-16 w-16 items-center justify-center rounded-full border border-black transition-transform group-hover:-translate-y-2 group-hover:translate-x-2 sm:flex"><ArrowUpRight size={26} /></span>
        </a>

        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <a href="mailto:your-email@example.com" className="inline-flex items-center gap-2 text-sm font-medium"><Mail size={15} />your-email@example.com</a>
            <p className="mt-3 text-xs text-gray-500">姓名、学历、电话、微信与真实邮箱将在发布前替换。</p>
          </div>
          <div className="flex max-w-2xl flex-wrap gap-x-5 gap-y-3 md:justify-end">
            {platforms.map((platform) => <span key={platform} className="text-xs font-medium text-gray-600">{platform} ↗</span>)}
          </div>
        </div>
      </div>
    </footer>
  )
}
