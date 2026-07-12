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

export interface WorkItem extends Project {
  company: string
  companyPeriod: string
  companyFocus: string
  detailLabel: string
}

export interface WordItem {
  index: string
  type: string
  title: string
  description: string
  accent: string
  href?: string
}

export interface NowItem {
  date: string
  city: string
  type: string
  title: string
  description: string
  href?: string
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

export const workItems: WorkItem[] = [
  { ...projects[2], number: '01', company: '华为', companyPeriod: '2025.02 — 2026.05', companyFocus: '开发者工具 · AI IDE · 智能编码', detailLabel: '查看项目详情' },
  { ...projects[1], number: '02', company: '深圳市顺丰丰链科技有限责任公司', companyPeriod: '2023.05 — 2024.12', companyFocus: 'B 端供应链数字化 · 智能仓储调度', detailLabel: '查看项目详情' },
  { ...projects[0], number: '03', company: '深圳市明源云科技有限公司', companyPeriod: '2019.03 — 2023.02', companyFocus: '不动产数字营销 · 营销智能体 · AIGC 商业化', detailLabel: '查看项目详情' },
]

export const words: WordItem[] = [
  { index: '01', type: 'ARTICLE', title: 'AI 产品文章', description: '记录模型能力如何进入真实场景，以及产品经理在其中如何做判断。', accent: 'bg-[#e7dfcf]' },
  { index: '02', type: 'VIDEO', title: '视频与公开表达', description: '把复杂问题讲清楚，分享 AI 产品、体验设计与职业转型中的真实思考。', accent: 'bg-[#d5e0e1]' },
  { index: '03', type: 'VIBE CODING', title: 'Vibe Coding 实验室', description: '记录个人网站、原型和工具搭建，把想法快速变成可用的产品体验。', accent: 'bg-[#d9d1c8]' },
]

export const nowItems: NowItem[] = [
  { date: '2026.07', city: '深圳', type: 'THINKING', title: 'AI 产品如何从 Demo 走到真实工作流', description: '关注能力边界、任务成功标准，以及人机协作中的最后一公里。' },
  { date: '2026.07', city: '深圳', type: 'MAKING', title: '个人网站 1.0 与 Vibe Coding', description: '持续打磨自己的作品集，也把搭建过程沉淀成可复用的方法。' },
  { date: '2026.06', city: '深圳', type: 'LIVING', title: '跑步、摄影与保持感受力', description: '在工作之外保持对具体生活的观察，给产品判断留出呼吸。' },
  { date: '2026.06', city: '深圳', type: 'READING', title: '重新理解 AI 产品的评估体系', description: '从主观体验回到任务成功率、质量门槛和可持续运营。' },
  { date: '2026.05', city: '深圳', type: 'WRITING', title: '把项目经验整理成公开表达', description: '将复杂工作流转化为能被读者理解和复用的产品语言。' },
  { date: '2026.05', city: '深圳', type: 'MAKING', title: '为个人网站增加可交互的信息入口', description: '让作品集不只展示结果，也展示持续构建的过程。' },
]

export const capabilities = [
  ['01', '定义问题', '从真实作业流中识别高频、高价值且适合 AI 介入的切入点。'],
  ['02', '设计人机协作', '明确 AI 自动处理、人工确认和异常兜底的产品边界。'],
  ['03', '评估模型效果', '将主观体验拆成可验证的生成质量与任务成功标准。'],
  ['04', '交付业务价值', '从 MVP 推进到正式版本、业务闭环与商业化结果。'],
] as const
