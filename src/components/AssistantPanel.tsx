import { Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const answers = {
  '你做过哪些 AI 项目？': '我在华为负责 Coding Agent 智能编码助手、Design Agent 设计稿生成助手与 PDMC+ 流程平台 AI 化，分别服务开发者、设计师和流程平台用户。此前还做过采用规则引擎的仓储调度，以及落地 10 家房企、100+ 售楼处的智慧案场系统。',
  '你在 Coding Agent 中负责什么？': '我负责场景与人机边界、企业上下文检索、工具接口及交付形态的产品设计，牵头评测与 Bad Case 四层归因，并协同算法、研发推进迭代。基于 200 例离线评测集，端到端编译通过率由约 40% 提升至约 80%；算法、模型与 Runtime 工程实现由算法团队负责。',
  '如何联系你？': '可通过页面底部的联系入口和内容平台与我交流；简历下载入口暂未开放。',
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
    <div className="pointer-events-none fixed inset-0 z-[100] flex items-end justify-center p-3 pb-24 sm:p-6 sm:pb-24" role="dialog" aria-modal="true" aria-label="个人 AI 助手">
      <button type="button" className="pointer-events-auto absolute inset-0 cursor-default" onClick={onClose} aria-label="关闭 AI 助手背景" />
      <aside className="pointer-events-auto relative z-10 flex max-h-[min(70svh,560px)] w-full max-w-[380px] flex-col overflow-hidden rounded-[2rem] border border-line/15 bg-surface p-4 text-ink shadow-2xl sm:max-h-[min(58vh,560px)] sm:p-6">
        <header className="flex items-center justify-between border-b border-line/15 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-signal text-white"><Sparkles size={16} /></span>
            <div>
              <p className="text-sm font-semibold">ASK MY AI</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-muted">Local demo · No external request</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="关闭 AI 助手" className="rounded-full border border-line/20 p-2 hover:bg-ink/5"><X size={18} /></button>
        </header>

        <div className="flex flex-1 flex-col justify-between overflow-auto py-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />在线
            </span>
            <h2 className="mt-6 max-w-sm text-4xl font-semibold leading-[1.05] tracking-[-0.05em]">想了解我的项目、产品思考或合作方向？</h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted">1.0 版本使用本地预设回答，后续将接入经过脱敏的案例与内容知识库。</p>

            {answer && (
              <div className="mt-8 rounded-3xl border border-line/10 bg-paper p-6 text-sm leading-7 text-ink">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">ANSWER</p>
                {answer}
              </div>
            )}
          </div>

          <div className="mt-8 space-y-2 border-t border-line/15 pt-6">
            {(Object.keys(answers) as Array<keyof typeof answers>).map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => setAnswer(answers[question])}
                className="flex w-full items-center justify-between rounded-2xl border border-line/15 px-4 py-4 text-left text-sm transition-colors hover:bg-signal hover:text-white"
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
