import heroPortraitCutout from '../assets/hero-portrait-cutout.png'

const portraitComposition = 'bg-contain bg-center'

export function Hero() {
  return (
    <section
      id="index"
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-paper sm:min-h-[720px] md:h-screen"
    >
      <div
        data-testid="hero-portrait"
        className={`absolute inset-0 z-10 bg-no-repeat md:bg-[position:68%_center] ${portraitComposition}`}
        style={{ backgroundImage: `url('${heroPortraitCutout}')` }}
        aria-hidden="true"
      />

      <div className="absolute bottom-8 left-5 z-50 max-w-[calc(100%-2.5rem)] sm:bottom-12 sm:left-8 sm:max-w-[760px] md:bottom-20 md:left-12 lg:bottom-16 lg:left-[max(3rem,calc((100vw-1700px)/2+3rem))]">
        <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-[11px]">
          <span className="h-2 w-2 rounded-full bg-signal" />
          AI PRODUCT · EXPERIENCE · DELIVERY
        </div>
        <h1 className="max-w-[7ch] text-[clamp(4.2rem,18vw,5.6rem)] font-black uppercase leading-[0.8] tracking-[-0.09em] text-ink sm:text-[clamp(5.6rem,10.5vw,10.5rem)]">
          AI<br />Product<br />Mgr<span className="text-signal">.</span>
        </h1>
        <div className="mt-5 max-w-[20rem] sm:mt-8 sm:max-w-[34rem]">
          <p className="text-sm font-medium leading-relaxed text-ink sm:text-base">
            你好，我是张楠，一个画过图、懂交互、有审美，写 PROMPT 比写 PRD 多的 AI 产品经理。
          </p>
          <p className="mt-3 text-sm font-medium leading-relaxed text-ink sm:text-base">
            我相信好工具优雅、好用，并经得起反复打磨；也坚持通过规划、协调、推进与落实，让想法最终被完美实现。
          </p>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 z-50 hidden text-right text-[10px] font-medium uppercase tracking-[0.18em] text-muted sm:block md:right-8">
        Shenzhen · China<br />6+ years in enterprise products
      </div>
    </section>
  )
}
