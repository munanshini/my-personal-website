export interface Project {
  number: string
  title: string
  year: string
  category: string
  summary: string
  role: string
  results: string[]
  tags: string[]
  tone: 'warm' | 'blue' | 'dark'
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  focus: string
}

export const projects: Project[] = [
  {
    number: '01',
    title: 'AI 创意工场',
    year: '2019–2023',
    category: 'AIGC · MARKETING AGENT',
    summary: '面向房企新媒体运营，打造覆盖“灵感—脚本—快剪—分发”的 AIGC 内容生产工具，让一个运营也能跑通拍、剪、发全流程。',
    role: '主导需求洞察、AI 工作流方案、模型调用与 Prompt 模板、生成质量评测、CRM 数据闭环及商业化推进。',
    results: [
      '单人出片效率约提升 200%，内容发布量约提升 100%',
      '落地 10 家房企、100+ 个售楼处',
      '单售楼处客单价约提升 30%',
    ],
    tags: ['AIGC', 'Prompt', '模型评测', 'CRM 闭环', '商业化'],
    tone: 'warm',
  },
  {
    number: '02',
    title: '智能仓储调度',
    year: '2023–2024',
    category: 'SUPPLY CHAIN · INTELLIGENT SCHEDULING',
    summary: '面向 B 端企业供应链数字化，围绕库内任务分派、人员与设备调度、异常处理，构建复杂仓内作业的智能协同。',
    role: '将依赖经验的现场调度转化为可感知、可决策、可干预的产品流程，并协调多角色共同完成作业闭环。',
    results: ['任务分派', '人员 / 设备协同', '异常处理闭环'],
    tags: ['B2B', '供应链', '智能调度', '复杂工作流'],
    tone: 'blue',
  },
  {
    number: '03',
    title: 'AI IDE 研发助手',
    year: '2025–2026',
    category: 'AI IDE · DEVELOPER EXPERIENCE',
    summary: '围绕代码理解、生成、验证与修复，打造服务内部开发者的 AI 原生研发工作流。',
    role: '负责代码生成、代码解释和 Bug 修复的产品定义与落地；主导需求设计、模型效果评估与研发协同，推动 MVP 至正式上线。',
    results: ['能力进入正式研发工具版本', '覆盖生成、解释、问答与编译错误分析', '减少文档查阅、样板代码与问题定位时间'],
    tags: ['AI IDE', '智能编码', '模型效果评估', '开发者体验'],
    tone: 'dark',
  },
]

export const experiences: ExperienceItem[] = [
  {
    company: '深圳市明源云科技有限公司',
    role: 'AI 产品经理',
    period: '2019.03 — 2023.02',
    focus: '不动产数字营销 · 营销智能体 · AIGC 商业化',
  },
  {
    company: '深圳市顺丰丰链科技有限责任公司',
    role: 'AI 产品经理',
    period: '2023.05 — 2024.12',
    focus: 'B 端供应链数字化 · 智能仓储调度',
  },
  {
    company: '华为',
    role: 'AI 产品经理',
    period: '2025.02 — 2026.05',
    focus: '开发者工具 · AI IDE · 智能编码',
  },
]

export const capabilities = [
  ['01', '定义问题', '从真实作业流中识别高频、高价值且适合 AI 介入的切入点。'],
  ['02', '设计人机协作', '明确 AI 自动处理、人工确认和异常兜底的产品边界。'],
  ['03', '评估模型效果', '将主观体验拆成可验证的生成质量与任务成功标准。'],
  ['04', '交付业务价值', '从 MVP 推进到正式版本、业务闭环与商业化结果。'],
] as const
