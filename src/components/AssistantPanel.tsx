import { Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const answers = {
  '你做过哪些 AI 项目？': '我做过 AI 创意工场、智能仓储调度和 AI IDE 研发助手，分别覆盖营销 AIGC、供应链智能协同和开发者智能编码工作流。',
  '你在 AI IDE 中负责什么？': '我负责核心智能编码场景的产品定义与落地，主导需求设计、模型效果评估与研发协同，并推动 MVP 到正式上线。',
  '如何联系你？': '可通过页面底部的联系入口、简历下载和内容平台与我交流。',
} as const

interface AssistantPanelProps {
  open: boolean
  onClose: () => void
}

export function AssistantPanel({ open, onClose }: AssistantPanelProps) {
  const [answer, setAnswer] = useState<string>()

  useEffect(() => {
    if (!open) setAnswer(undefined)
  }, [open])

  if (!open) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex items-end justify-end p-4 sm:p-6" role="dialog" aria-modal="true" aria-label="个人 AI 助手">
      <button type="button" className="pointer-events-auto absolute inset-0 cursor-default" onClick={onClose} aria-label="关闭 AI 助手背景" />
      <aside className="pointer-events-auto relative z-10 flex max-h-[min(58vh,560px)] w-full max-w-[380px] flex-col overflow-hidden rounded-[2rem] bg-[#111417] p-5 text-white shadow-2xl sm:p-6">
        <header className="flex items-center justify-between border-b border-white/15 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black"><Sparkles size={16} /></span>
            <div>
              <p className="text-sm font-semibold">ASK MY AI</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-white/45">Local demo · No external request</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="关闭 AI 助手" className="rounded-full border border-white/20 p-2 hover:bg-white/10"><X size={18} /></button>
        </header>

        <div className="flex flex-1 flex-col justify-between overflow-auto py-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/55">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />在线
            </span>
            <h2 className="mt-6 max-w-sm text-4xl font-semibold leading-[1.05] tracking-[-0.05em]">想了解我的项目、产品思考或合作方向？</h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">1.0 版本使用本地预设回答，后续将接入经过脱敏的案例与内容知识库。</p>

            {answer && (
              <div className="mt-8 rounded-3xl bg-[#dbe7e8] p-6 text-sm leading-7 text-gray-900">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">ANSWER</p>
                {answer}
              </div>
            )}
          </div>

          <div className="mt-8 space-y-2 border-t border-white/15 pt-6">
            {(Object.keys(answers) as Array<keyof typeof answers>).map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => setAnswer(answers[question])}
                className="flex w-full items-center justify-between rounded-2xl border border-white/15 px-4 py-4 text-left text-sm transition-colors hover:bg-white hover:text-black"
              >
                {question}<span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
