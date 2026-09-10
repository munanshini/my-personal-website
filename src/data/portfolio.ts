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
    results: ['秒级给出调度建议与推荐依据', '支持紧急插单、设备不可用与人员占用的动态改派', '将管理员经验沉淀为可复用的规则与流程'],
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
    period: '2023.04 — 2024.12',
    focus: '供应链数字化 · 智能仓储调度',
  },
  {
    company: '华为技术有限公司',
    role: 'AI 产品经理',
    period: '2025.02 — 2026.06',
    focus: '开发者工具 · AI IDE · 智能编码',
  },
]

// 内容已根据用户提供的《0823-张楠 AI产品经理面试话术 v3.1》整理。
// 在用户确认公开边界前，isReady 必须保持 false：详情页不会生成、不会写入 sitemap，也不会在列表页开放链接。
const projectDetails: Record<string, ProjectDetail> = {
  'ai-ide': {
    slug: 'ai-ide',
    seoTitle: 'AI IDE 研发助手 · 张楠 AI 产品经理',
    seoDescription: '面向企业内部研发人员的 VS Code 插件，在代码不可出内网的约束下，以 RAG、编译验证和人工确认闭环提升 AI 编码建议的可靠性与开发者采纳。',
    heroTagline: '把不可靠的模型输出，变成开发者敢用的研发工具。',
    background: [
      '项目面向企业内部软件研发流程，服务写代码、读旧代码、查编译报错和修复 Bug 等高频任务。早期产品只是一个直接调用模型的 VS Code demo，生成结果难以进入真实研发环境。',
      '核心障碍不在于模型会不会生成，而在于它不了解企业内部代码库、API 与开发规范；一旦编造接口或违反规范，开发者就需要返工。产品命题因此从“生成更多代码”转为“让开发者敢用、能验证、可控地采用”。',
    ],
    role: {
      scope: '作为产品侧唯一的 AI 产品经理，负责从场景定义、上下文策略与验收口径，到 MVP、灰度、版本迭代和推广的完整产品闭环。',
      bullets: [
        '拆解五类高频研发任务，定义入口、输入上下文、预期输出与人工确认边界。',
        '定义企业代码库、内部 API 文档和开发规范的知识边界、清洗切分规则、权限范围与更新机制。',
        '设计 Prompt 硬约束、Agent 工具调用顺序、自动修复终止条件与失败降级表达。',
        '建立分任务评测集、验收线与检索层／提示词层／工作流层／模型层的 Bad Case 归因机制。',
        '协同算法、研发与内部使用团队，推进从 demo 到部门推广的版本节奏。',
      ],
    },
    decisions: [
      {
        title: '从“直连模型”改为“私有上下文 + 客观验证”闭环',
        problem: '早期模型直接生成的代码经常调用不存在的内部 API，开发者需要额外验证和返工，工具无法进入生产研发流程。',
        approach: '先用 RAG 将代码库、API 文档与开发规范引入上下文；再规定只允许使用检索到的接口；最后接入编译器，将报错回灌到自动修复流程，用非模型的客观信号校验结果。',
        tradeoff: '没有把希望放在更强模型或一次性微调上。内部知识更新快，微调成本高且容易过期；多一层检索和编译会增加响应时间，但换来更高的可验证性与可用性。',
      },
      {
        title: '用可执行的验收口径替代主观判断',
        problem: '产品面向开发者，单靠“看起来像一段好代码”的主观评价既无法稳定验收，也无法指导版本优化。',
        approach: '按生成、补全、检索解释、Bug 定位和编译修复拆分评测；建立真实用例评测集，并以编译通过、单测、采纳率、幻觉率等口径联动灰度反馈。',
        tradeoff: '不追求单一漂亮的总分。严格采纳率只计算未修改直接接受的建议，指标更难看，但能避免把“生成量”误当成用户价值。',
      },
      {
        title: '把“最终决定权”保留给开发者',
        problem: '开发者对 AI 改动天然谨慎；一旦系统自动写入错误代码，信任会迅速归零。',
        approach: '所有变更以 diff 逐块展示，由开发者确认后生效；当上下文不足或重试达到上限时，明确提示边界并提供人工排查建议。',
        tradeoff: '放弃了看似更自动化的“直接落盘”。确认动作会增加一步操作，却让产品能在高风险研发场景中逐步建立使用信任。',
      },
    ],
    outcomes: [
      { metric: '约 40% → 约 80%', note: '代码生成评测中，结果直接送编译器、无 error 计通过；RAG 与编译验证闭环上线后，编译通过率从约四成提升至约八成。' },
      { metric: '五成上下', note: '离职前的严格口径采纳率：仅统计开发者在 diff 面板未修改、直接接受的代码块。' },
      { metric: '约半小时 → 两三分钟', note: '编译报错定位从开发者访谈中的翻文档、反复试错量级，缩短到系统埋点记录的两三分钟量级；两者采集方式不同，因此只表达量级变化。' },
      { metric: 'BTIT 全量推广', note: '产品从 demo 发展为覆盖五类研发场景的 1.0，并在离职前推广至整个部门；评测集由首轮约 50 条扩展至 200 条真实用例。' },
    ],
    reflection: '企业级 AI 的关键不只是让模型“会答”，而是用私有上下文、客观校验和人工确认，把不可靠的生成能力包装成可被信任的工作流。下一阶段会更早把真实使用数据与风险分级纳入版本优先级，而不是只从功能完整度出发。',
    confidentialityNote: '基于个人在职经历整理，已省略内部代码、接口、组织细节与未公开技术实现；数据仅保留可公开说明的口径与量级。',
    isReady: false,
  },
  'warehouse-scheduling': {
    slug: 'warehouse-scheduling',
    seoTitle: '智能仓储调度系统 · 张楠 AI 产品经理',
    seoDescription: '面向仓库管理者与一线作业人员，采用规则引擎和任务资源匹配策略，将隐性的调度经验转化为可解释、可人工确认的秒级调度建议与异常改派流程。',
    heroTagline: '把管理员经验，沉淀成可解释的实时调度规则。',
    background: [
      '仓库每天持续产生入库、出库、拣选与搬运任务。紧急插单、人员占用、设备不可用和前后依赖同时出现时，调度高度依赖管理员个人经验，换人后作业质量和响应速度都会波动。',
      '项目的目标不是简单把排班电子化，而是把管理员的隐性判断转成系统可执行、可追溯的规则，在现场高频、实时和责任明确的约束下提供可信建议。',
    ],
    role: {
      scope: '作为产品经理，负责场景与目标定义、业务规则产品化、可解释性和异常兜底设计，以及效果评估口径；底层算法与工程实现由研发、算法团队负责。',
      bullets: [
        '梳理任务生成、分派、执行与异常改派全流程，拆解任务优先级、人员设备匹配、冲突识别和动态改派能力。',
        '通过驻仓跟班与管理员决策访谈，将“为什么派给他”拆成可结构化的业务因子和优先级。',
        '定义调度建议的推荐依据与冲突提示，让管理者能够理解、确认或调整系统建议。',
        '设计人工确认、改派与异常回滚机制，并以人工调整记录推动规则持续迭代。',
        '制定任务分派时长、资源利用率、异常恢复时长与人工调整率等效果口径。',
      ],
    },
    decisions: [
      {
        title: '选择规则引擎，而不是强行使用大模型',
        problem: '调度同时受任务、人员、设备、位置和时效等多重约束，且现场需要秒级响应与可追责的决策依据。',
        approach: '采用规则引擎与任务—资源匹配策略，把管理员的经验显性化，并让系统输出“建议 + 依据 + 冲突提示”。',
        tradeoff: '没有追求看起来更智能的大模型方案。规则的表达能力和覆盖度需要持续维护，但确定性、延迟、成本和可解释性更符合这个场景。',
      },
      {
        title: '从“自动分派”收敛为“建议 + 人工确认”',
        problem: '现场人员位置和设备状态会滞后或缺失，脏数据一旦导致连续错误分派，管理员会很快放弃系统。',
        approach: '系统给出调度建议和依据，由管理员确认或调整；调整记录成为下一轮定位规则缺口的真实反馈。',
        tradeoff: '放弃了完全自动化带来的表面效率。多出确认动作，却让系统在数据能力尚未完全成熟时，仍能以可信方式进入日常作业。',
      },
      {
        title: '不可信资源不进入推荐池',
        problem: '如果系统基于过期或缺失的状态推荐人员和设备，错误建议会直接影响作业执行。',
        approach: '为任务、人员和设备数据定义更新机制与置信度；状态不可信的资源不参与推荐，并针对人工调整率高的场景补充规则。',
        tradeoff: '选择“宁可少推荐，不可推荐错”。可用候选变少会降低覆盖率，但优先保护推荐质量和现场信任。',
      },
    ],
    outcomes: [
      { metric: '秒级响应', note: '针对日常任务与异常变化，系统可在秒级给出调度建议，并同时展示推荐依据与冲突提示。' },
      { metric: '动态改派闭环', note: '覆盖紧急插单、设备不可用、人员占用等场景：任务状态感知 → 规则判断 → 调度建议 → 人工确认调整 → 执行反馈。' },
      { metric: '从人治到系统化', note: '将依赖个人经验的调度过程沉淀为可复用规则与产品流程，并通过人工调整记录持续识别规则缺口。' },
      { metric: '内外部交付', note: '服务顺丰内部供应链体系，同时面向国家电网、南方电网等外部客户的仓储作业场景。' },
    ],
    reflection: '“是否使用 AI”本身就是产品判断。对于路径清晰、可解释性和实时性优先的场景，先把业务规则、数据质量和人工责任边界做好，比引入更自由的模型能力更有价值。',
    confidentialityNote: '基于个人项目经历整理，已省略客户现场、系统参数、规则细节和未公开业务数据；不展示未经确认的仓库规模或效率百分比。',
    isReady: false,
  },
  'smart-sales-center': {
    slug: 'smart-sales-center',
    seoTitle: '房企智慧案场销讲与客户接待系统 · 张楠 AI 产品经理',
    seoDescription: '面向房企售楼处的一线顾问和案场管理者，整合可视化销讲、客户资料沉淀、意愿评估与 CRM 线索流转，帮助交付从定制项目走向可复用产品能力。',
    heroTagline: '把一线顾问的讲盘经验，变成可复用的接待与跟单链路。',
    background: [
      '房企售楼处的一线接待长期依赖纸质楼书、静态展板和个人话术。新人讲不清楼盘，客户信息依靠手工登记，购买意愿主要凭主观判断，案场之间的接待与转化质量差异明显。',
      '客户最初提出的是“一块能转的大屏”，但通过驻场跟访完整接待流程后，真正的问题被界定为：如何帮助新顾问讲得顺、让客户看得懂，并把接待过程沉淀为后续跟单可用的数据。',
    ],
    role: {
      scope: '以 UI 设计师身份加入项目并主导可视化销讲交互框架；2020 年年中转为产品经理后，负责需求洞察、流程定义、意愿评估、交付产品化与 CRM 数据闭环。',
      bullets: [
        '驻场跟访置业顾问的完整接待流程，区分甲方提出的方案与实际业务问题。',
        '设计楼盘沙盘、户型、区位和价格等内容组成的可视化销讲动线与可复用模板。',
        '将手工接待与客户资料整理为结构化流程，定义购买意愿评估因子、分级依据与人工修正入口。',
        '推动接待销讲数据与云客 CRM 打通，建立从客户画像、意愿分级到线索流转和销售跟单的链路。',
        '将多客户交付中的共性沉淀进产品，把差异控制在配置层，并配合销售、客户成功推进存量增购。',
      ],
    },
    decisions: [
      {
        title: '从“转动的大屏”转向可复用的接待工作流',
        problem: '甲方最初希望用一块展示屏解决问题，但这无法改善新人讲盘不顺、资料遗漏和案场能力不一致的根因。',
        approach: '从现场接待动线出发，定义到访接待、可视化销讲、资料记录、意愿评估和线索流转的一体化工作台，并与标杆顾问共建销讲模板。',
        tradeoff: '没有只做一个视觉展示效果很强的单点大屏。完整流程需要更多跨角色协同，却能把一次接待沉淀为可复用的服务能力与数据资产。',
      },
      {
        title: '做可解释的意愿评分，而非黑盒自动判定',
        problem: '购买意愿涉及预算、关注户型、到访行为与决策关系等多维信息，顾问和销售需要为跟单结果负责。',
        approach: '用规则与打分模型给出分级建议，并展示评分依据；保留人工修正入口，让顾问能够结合现场信息调整判断。',
        tradeoff: '放弃全自动判定带来的“省事”叙事。系统需要解释和人工参与，但能避免黑盒评分削弱一线人员的信任与责任感。',
      },
      {
        title: '将客户定制需求收敛为产品与配置两层',
        problem: '对外交付越多，逐个客户深度定制会迅速拉高实施成本，产品无法复制到下一家。',
        approach: '在复盘中判断行业共性与客户差异：将销讲流程、字段结构和通用模板沉淀为标准产品，把项目差异留在配置层。',
        tradeoff: '不承诺满足每个客户的所有个性化要求。短期可能需要更多沟通与取舍，但保证产品能够规模化交付和持续迭代。',
      },
    ],
    outcomes: [
      { metric: '10 家房企 · 100+ 售楼处', note: '项目从交互设计、产品定义到交付落地，服务外部房企客户并覆盖一百多个售楼处。' },
      { metric: '接待到跟单闭环', note: '可视化销讲和结构化接待数据进入云客 CRM，形成客户画像、意愿分级、线索流转与销售跟单的完整链路。' },
      { metric: '交付可复用', note: '将行业共性沉淀为产品与模板，把客户差异控制在配置层，降低持续交付中的定制比例。' },
      { metric: '从经验到标准', note: '把优秀顾问的隐性讲盘经验转化为新人可直接使用的销讲动线、模板与资料结构。' },
    ],
    reflection: 'B 端产品不能只停留在“使用者觉得方便”。必须把一线动作和数据沉淀，翻译成采购决策人关心的线索、跟单和交付效率；这也是后来我把采纳率、人工调整率作为关键指标的起点。',
    confidentialityNote: '基于个人项目经历整理，已省略客户名称、项目配置、业务数据和未公开交付细节；仅保留可公开验证的项目范围与产品方法。',
    isReady: false,
  },
}

export const workItems: WorkItem[] = [
  { ...projects[2], number: '01', company: '华为技术有限公司', companyPeriod: '2025.02 — 2026.06', companyFocus: '开发者工具 · AI IDE · 智能编码', slug: 'ai-ide', detail: projectDetails['ai-ide'] },
  { ...projects[1], number: '02', company: '深圳丰链科技有限公司', companyPeriod: '2023.04 — 2024.12', companyFocus: '供应链数字化 · 智能仓储调度', slug: 'warehouse-scheduling', detail: projectDetails['warehouse-scheduling'] },
  { ...projects[0], number: '03', company: '深圳市明源云科技有限公司', companyPeriod: '2019.03 — 2023.02', companyFocus: '不动产数字营销 · 智慧案场 · 客户接待', slug: 'smart-sales-center', detail: projectDetails['smart-sales-center'] },
]

export function workItemBySlug(slug: string) {
  return workItems.find((item) => item.slug === slug)
}

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
