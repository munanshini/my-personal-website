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

export interface ProjectDecision {
  /** 这个决策解决的是什么问题 */
  problem: string
  /** 当时怎么判断的 */
  approach: string
  /** 取舍了什么，放弃了哪个方案 */
  tradeoff: string
  title: string
}

export interface ProjectOutcome {
  /** 结果，尽量带数字 */
  metric: string
  /** 这个数字怎么来的、意味着什么 */
  note: string
}

export interface ProjectDetail {
  /** URL 用的英文短标识 */
  slug: string
  seoTitle: string
  seoDescription: string
  heroTagline: string
  background: string[]
  role: {
    scope: string
    bullets: string[]
  }
  decisions: ProjectDecision[]
  outcomes: ProjectOutcome[]
  reflection: string
  confidentialityNote?: string
  /** 最终脱敏文案确认前，不生成详情页或公开链接。 */
  isReady: boolean
}

export interface WorkItem extends Project {
  company: string
  companyPeriod: string
  companyFocus: string
  slug: string
  detail: ProjectDetail
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
    title: '房企智慧案场销讲与客户接待系统',
    year: '2019.03–2023.02',
    category: 'REAL ESTATE SALES TECH · INTERACTIVE EXPERIENCE',
    summary: '面向房企案场，将可视化销讲、来访接待、客户画像与购买意愿评估整合为置业顾问工作台，并打通云客 CRM。',
    role: '主导需求洞察、交互与流程设计，定义可视化销讲、结构化接待和意愿分级的人机协作边界，推动接待数据进入 CRM 跟单闭环。',
    results: [
      '10 家房企、100+ 个售楼处',
      '可视化销讲与结构化接待流程落地',
      '接待 → 客户画像 → 意愿分级 → CRM 跟单闭环',
    ],
    tags: ['地产科技', '交互设计', '客户画像', '意愿评估', 'CRM'],
    tone: 'warm',
  },
  {
    number: '02',
    title: '智能仓储调度系统',
    year: '2023.04–2024.12',
    category: 'SUPPLY CHAIN · INTELLIGENT SCHEDULING',
    summary: '围绕入库、出库、拣选与搬运任务，建立任务优先级、人员与设备匹配、冲突识别和动态改派的一体化调度流程。',
    role: '主导场景与目标定义、规则和现场数据梳理、调度策略产品化及异常兜底；与研发和算法团队共同推进调度能力落地。',
    results: ['调度响应时间缩短约 30%', '任务分派效率提升 25%', '支持紧急插单、设备不可用与人员占用的动态改派'],
    tags: ['供应链', '智能调度', '任务分派', '人机协作', '异常兜底'],
    tone: 'blue',
  },
  {
    number: '03',
    title: 'AI IDE 研发助手',
    year: '2025.02 — 2026.06',
    category: 'AI IDE · DEVELOPER EXPERIENCE',
    summary: '围绕写代码、读代码、查问题与改 Bug，将企业代码库、API 文档和开发规范接入 AI 辅助研发工作流。',
    role: '负责高频任务定义、RAG 与 Agent 产品形态及验收标准、评测用例与 Bad Case 归因，并协同算法、研发与使用团队完成 MVP、灰度和版本迭代。',
    results: ['核心能力进入正式研发工具版本', '覆盖代码生成、解释、问答、编译错误分析与 Bug 修复', '建立生成、解释、修复任务的评测与持续优化闭环'],
    tags: ['AI IDE', 'RAG', 'Agent', '模型评测', '开发者体验'],
    tone: 'dark',
  },
]

export const experiences: ExperienceItem[] = [
  {
    company: '深圳市明源云科技有限公司',
    role: '产品经理',
    period: '2019.03 — 2023.02',
    focus: '不动产数字营销 · 智慧案场 · 客户接待',
  },
  {
    company: '深圳丰链科技有限公司',
    role: '产品经理',
    period: '2023.03 — 2024.12',
    focus: '供应链数字化 · 智能仓储调度',
  },
  {
    company: '华为技术有限公司',
    role: 'AI 产品经理',
    period: '2025.02 — 2026.06',
    focus: '开发者工具 · AI IDE · 智能编码',
  },
]

// TODO: 待替换为最终文案。详情页在 isReady 变为 true 前不会生成、不会写入 sitemap，也不会在列表页开放链接。
function pendingProjectDetail(slug: string, title: string): ProjectDetail {
  return {
    slug,
    seoTitle: `${title} · 张楠 AI 产品经理`,
    seoDescription: `待替换：${title} 的最终脱敏背景、决策过程与结果说明将在文案确认后补齐；确认前该项目不会作为公开详情页生成或被搜索引擎收录。`,
    heroTagline: '待补充最终一句话定位',
    background: ['待补充：项目启动前的用户问题。', '待补充：项目对应的业务约束与目标。'],
    role: {
      scope: '待补充：本人职责范围。',
      bullets: ['待补充：具体工作一。', '待补充：具体工作二。', '待补充：具体工作三。'],
    },
    decisions: [
      {
        title: '待补充：关键决策一',
        problem: '待补充：当时需要解决的问题。',
        approach: '待补充：判断依据与执行方式。',
        tradeoff: '待补充：取舍与放弃的方案。',
      },
      {
        title: '待补充：关键决策二',
        problem: '待补充：当时需要解决的问题。',
        approach: '待补充：判断依据与执行方式。',
        tradeoff: '待补充：取舍与放弃的方案。',
      },
    ],
    outcomes: [{ metric: '待补充：核心结果', note: '待补充：指标口径与业务意义。' }],
    reflection: '待补充：项目复盘。',
    confidentialityNote: '待补充：经确认后展示的脱敏说明。',
    isReady: false,
  }
}

export const workItems: WorkItem[] = [
  { ...projects[2], number: '01', company: '华为技术有限公司', companyPeriod: '2025.02 — 2026.06', companyFocus: '开发者工具 · AI IDE · 智能编码', slug: 'ai-ide', detail: pendingProjectDetail('ai-ide', 'AI IDE 研发助手') },
  { ...projects[1], number: '02', company: '深圳丰链科技有限公司', companyPeriod: '2023.03 — 2024.12', companyFocus: '供应链数字化 · 智能仓储调度', slug: 'warehouse-scheduling', detail: pendingProjectDetail('warehouse-scheduling', '智能仓储调度系统') },
  { ...projects[0], number: '03', company: '深圳市明源云科技有限公司', companyPeriod: '2019.03 — 2023.02', companyFocus: '不动产数字营销 · 智慧案场 · 客户接待', slug: 'smart-sales-center', detail: pendingProjectDetail('smart-sales-center', '房企智慧案场销讲与客户接待系统') },
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
