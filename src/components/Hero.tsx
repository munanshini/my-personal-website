import heroPortraitCutout from '../assets/hero-portrait-cutout.png'
import { assetPath } from '../lib/publicPath'

const portraitComposition = 'bg-contain bg-center'

export function Hero() {
  return (
    <section
      id="index"
      className="relative w-full overflow-hidden bg-paper px-6 sm:px-8"
    >
      <div className="hero-layout">
      <div>
        <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-[11px]">
          <span className="h-2 w-2 rounded-full bg-signal" />
          AI PRODUCT · EXPERIENCE · DELIVERY
        </div>
        <h1 className="hero-title text-ink">
          AI<br />Product<br />Mgr<span className="text-signal">.</span>
        </h1>
        <div className="mt-8 max-w-[34rem]">
          <p className="reading-copy text-ink">
            你好，我是张楠，一个画过图、懂交互、有审美，写 PROMPT 比写 PRD 多的 AI 产品经理。
          </p>
          <p className="reading-copy mt-4">
            我相信好工具优雅、好用，并经得起反复打磨；也坚持通过规划、协调、推进与落实，让想法最终被完美实现。
          </p>
        </div>
      <p className="mt-8 text-xs leading-6 text-muted">
        Shenzhen · China<br />6+ years in enterprise products
      </p>
      </div>
      <div className="hero-visual">
        <div data-testid="hero-portrait" className={`hero-portrait ${portraitComposition}`} style={{ backgroundImage: `url('${assetPath(heroPortraitCutout)}')` }} aria-hidden="true" />
      </div>
      </div>
    </section>
  )
}
