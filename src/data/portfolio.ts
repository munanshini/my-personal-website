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

export type WordChannelSlug = 'articles' | 'videos' | 'vibe-coding'

export interface WordChannel extends WordItem {
  slug: WordChannelSlug
}

export interface WordChannelEntry {
  slug: string
  type: string
  title: string
  description: string
  date: string
  href: string
}

export interface WordArticleSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export interface WordArticle {
  slug: string
  title: string
  description: string
  lead: string
  date: string
  author: string
  sourceUrl?: string
  mirrorUrl?: string
  sourceLabel: string
  sourceNote?: string
  keyInsight: string
  sections: WordArticleSection[]
  takeaway: string
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
    year: '2019.03–2023.01',
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
    year: '2023.02–2024.04',
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
    year: '2024.05 — 2026.08',
    category: 'AI IDE · DEVELOPER EXPERIENCE',
    summary: '围绕写代码、读代码、查问题与改 Bug，将企业代码库、API 文档和开发规范接入 AI 辅助研发工作流。',
    role: '负责高频任务定义、RAG 与 Agent 产品形态及验收标准、评测用例与 Bad Case 归因，并协同算法、研发与使用团队完成 MVP、灰度和版本迭代。',
    results: ['核心能力进入正式研发工具版本', '覆盖代码生成、解释、问答、编译错误分析与 Bug 修复', '建立生成、解释、修复任务的评测与持续优化闭环'],
    tags: ['AI IDE', 'RAG', 'Agent', '模型评测', '开发者体验'],
    tone: 'dark',
  },
  {
    number: '04',
    title: 'PDMC+ 流程与业务架构管理平台 AI 化改造',
    year: '2024.05 — 2026.08',
    category: 'ENTERPRISE KNOWLEDGE · PROCESS INTELLIGENCE',
    summary: '围绕流程查询、条文理解与流程发布，将公司级管理平台改造成自然语言问答与文档抽取协作入口。',
    role: '负责用户分层、AI 场景拆解、查询与发布链路设计，以及知识库、混合检索、权限过滤和答案溯源等产品策略定义。',
    results: ['查询与发布双链路', '自然语言检索、问答解释与文档抽取协同', '保留权限、溯源、人工复核与既有审核流转'],
    tags: ['企业知识', 'RAG', '流程管理', '文档抽取', '可信 AI'],
    tone: 'blue',
  },
]

export const experiences: ExperienceItem[] = [
  {
    company: '深圳市明源云科技有限公司',
    role: '产品经理',
    period: '2019.03 — 2023.01',
    focus: '不动产数字营销 · 智慧案场 · 客户接待',
  },
  {
    company: '深圳丰链科技有限公司',
    role: '产品经理',
    period: '2023.02 — 2024.04',
    focus: '供应链数字化 · 智能仓储调度',
  },
  {
    company: '华为技术有限公司',
    role: 'AI 产品经理',
    period: '2024.05 — 2026.08',
    focus: '开发者工具 · AI IDE · 流程与业务架构 AI 化',
  },
]

// 内容已根据用户提供的《0823-张楠 AI产品经理面试话术 v3.1》整理，
// 并于 2026-09-10 确认先以已有内容开放三个项目详情页。
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
    isReady: true,
  },
  'pdmc-ai': {
    slug: 'pdmc-ai',
    seoTitle: 'PDMC+ 流程与业务架构管理平台 AI 化改造 · 张楠 AI 产品经理',
    seoDescription: '面向公司级流程与业务架构管理平台，以自然语言检索问答、企业知识 RAG 与文档抽取重构查询理解和流程发布，并保留权限过滤、答案溯源与人工复核。',
    heroTagline: '让员工找到并读懂规定，也让流程管理员更快完成发布。',
    background: [
      'PDMC+ 是公司级流程与业务架构管理平台，承载流程文件的建模、发布、维护与查询。普通员工占绝大多数，却经常找不到目标流程或读不懂专业条文；流程管理员则需要按模板逐字段录入内容，发布门槛高。',
      'AI 化改造没有从“增加一个聊天入口”开始，而是先按用户角色拆解问题，收敛为使用侧的检索问答链路与生产侧的文档抽取链路，并让两条链路共用同一套知识与权限底座。',
    ],
    role: {
      scope: '负责用户分层、AI 介入优先级、查询与发布链路设计，以及知识组织、检索可信度和人工责任边界定义；算法与工程实现由研发团队负责。',
      bullets: [
        '将普通员工“找不到、读不懂”和流程管理员“录入门槛高”拆成两条产品链路，先解决覆盖面最大的查询与理解问题。',
        '把首页多卡片分流入口重构为自然语言搜索入口，并设计全局 AI 问答助手支持条文解释与多轮追问。',
        '将流程发布改为“上传文件 → AI 解析抽取 → 自动填表 → 管理员复核 → 提交审核”的协作流程。',
        '定义按流程层级结构组织知识库、关键词与语义向量混合检索、既有角色权限前置过滤和答案来源回溯。',
        '明确 AI 只帮助用户找到并读懂规定，不替用户判断事项能否执行；发布仍保留人工复核与原有审核流转。',
      ],
    },
    decisions: [
      {
        title: '先改入口，再引入问答能力',
        problem: '首页按平台功能拆分的多卡片入口要求用户先理解信息架构，普通员工即使知道要查流程，也常常找不到正确路径。',
        approach: '将首页收敛为自然语言搜索入口，让用户用日常表达描述问题，再由系统返回流程文件、相关条文和可继续追问的解释。',
        tradeoff: '没有保留“让用户自己浏览目录”的熟悉路径作为唯一入口。新入口需要建立搜索与答案可信度，但减少了用户理解平台结构的前置成本。',
      },
      {
        title: '让查询与发布共用一套知识底座',
        problem: '查询问答和文件录入看似是两个需求，如果各自建设知识结构，后续维护、权限和内容一致性都会变得复杂。',
        approach: '沿用平台已有流程层级做结构化切分，查询侧采用关键词与语义向量混合检索，发布侧把解析内容映射到同一套标准字段。',
        tradeoff: '没有按通用文档问答的字数硬切方案快速上线。结构化治理前期工作更多，但能避免上下文断裂，并让查询、发布和后续维护使用同一套内容资产。',
      },
      {
        title: '把合规责任留在原有流程里',
        problem: '流程条文涉及强合规场景，若 AI 直接替用户判断“能不能做”，错误答案会改变责任边界。',
        approach: '答案强制附带原始流程文件出处，检索前置沿用角色与组织权限过滤；发布保留管理员复核和既有审核流转。',
        tradeoff: '没有用自动化程度换取更短的表面链路。人工复核和来源回溯多保留一步，却能让 AI 的责任边界、内容依据和组织责任保持清晰。',
      },
    ],
    outcomes: [
      { metric: '查询与发布双链路', note: '面向员工的自然语言检索问答与面向管理员的文档抽取发布形成两条产品链路，共用同一套知识与权限底座。' },
      { metric: '自然语言直接提问', note: '普通员工无需先理解平台的信息架构，即可定位目标流程并获得条文解释与多轮追问入口。' },
      { metric: '上传文件自动填表', note: '流程管理员从逐字段手工录入转为上传任意格式文件、AI 抽取、人工复核后提交审核。' },
      { metric: '约五成新路径采纳', note: '离职时新查询与发布路径采纳率约 50%；未迁移部分主要来自继续沿用旧版路径的存量用户。' },
    ],
    reflection: '企业知识类 AI 的关键不是让答案看起来流畅，而是把业务结构、权限体系、来源依据与人工责任一起设计进产品。若流程资产没有结构化基础，应先做资产治理，再引入模型能力。',
    confidentialityNote: '基于个人在职经历整理，已省略内部平台细节、组织权限配置和未公开技术实现；数据仅保留可公开说明的产品方法与阶段性口径。',
    isReady: true,
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
    isReady: true,
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
    isReady: true,
  },
}

export const workItems: WorkItem[] = [
  { ...projects[2], number: '01', company: '华为技术有限公司', companyPeriod: '2024.05 — 2026.08', companyFocus: '开发者工具 · AI IDE · 智能编码', slug: 'ai-ide', detail: projectDetails['ai-ide'] },
  { ...projects[3], number: '02', company: '华为技术有限公司', companyPeriod: '2024.05 — 2026.08', companyFocus: '流程管理 · 企业知识 · AI 化改造', slug: 'pdmc-ai', detail: projectDetails['pdmc-ai'] },
  { ...projects[1], number: '03', company: '深圳丰链科技有限公司', companyPeriod: '2023.02 — 2024.04', companyFocus: '供应链数字化 · 智能仓储调度', slug: 'warehouse-scheduling', detail: projectDetails['warehouse-scheduling'] },
  { ...projects[0], number: '04', company: '深圳市明源云科技有限公司', companyPeriod: '2019.03 — 2023.01', companyFocus: '不动产数字营销 · 智慧案场 · 客户接待', slug: 'smart-sales-center', detail: projectDetails['smart-sales-center'] },
]

export function workItemBySlug(slug: string) {
  return workItems.find((item) => item.slug === slug)
}

export const wordArticles: WordArticle[] = [
  {
    slug: 'openai-designers-ai-era',
    title: 'OpenAI 设计总监：设计师是科技行业最惨的人',
    description: '把一篇关于 AI 时代设计工作的访谈，整理成一份面向 AI 产品实践者的阅读笔记。',
    lead: '设计师真正需要重新定义的，不是工具熟练度，而是在不确定性里做判断、组织系统并推动结果的方式。',
    date: '2026.09',
    author: '张楠整理',
    sourceUrl: 'https://mp.weixin.qq.com/s/wL7k-NCyeIl6dbrCRbrcsQ',
    mirrorUrl: 'https://www.uisdc.com/designer-hardest-hit',
    sourceLabel: '觉之设计 · 公开访谈整理',
    keyInsight: '角色会变，判断力更重要',
    sections: [
      {
        heading: '设计师的焦虑不是个例',
        paragraphs: [
          '这篇文章整理自 Ian Silber（OpenAI 设计负责人）在 Lenny’s Podcast 中谈 AI 与设计的内容。它讨论的重点不是设计师会不会被 AI 替代，而是工作判断、协作方式和责任如何重新分配。',
          '访谈中提到的焦虑，在设计团队里并不少见：当工程师可以借助 AI 快速扩大产出，设计师会同时面对更高的速度期待、更模糊的角色边界和更强的职业不确定感。',
        ],
      },
      {
        heading: '三层压力叠在一起',
        paragraphs: ['设计师的不安并非单一工具问题，而是三种变化同时发生，彼此放大。'],
        bullets: [
          '产出速度的差距：代码、原型和实现越来越快，设计交付却不只是画面产出，还包含研究、判断和对齐。',
          '角色定义的真空：产品、设计和工程都能直接使用 AI，过去清晰的边界被打散，却还没有新的协作规则。',
          '信心表演的噪音：社交平台上“已经全面掌握 AI”的叙事很多，反而让真实的学习曲线和不确定性无处安放。',
        ],
      },
      {
        heading: '岗位边界会变，但核心职责不会消失',
        paragraphs: [
          'AI 会让产品经理、工程师和设计师更早参与彼此的工作，但角色融合不等于角色消失。产品经理仍需定义问题与成功标准，工程师仍需负责系统质量，设计师仍需理解用户、组织体验并做出可解释的取舍。',
          '真正变化的是协作时点：设计师可以更早把想法变成可运行的东西，工程师和产品经理也能更早参与体验判断。边界变得流动，责任反而需要被说得更清楚。',
        ],
      },
      {
        heading: 'AI 让设计进入更好的时代',
        paragraphs: [
          '当实现一个想法的成本降低，设计师就不必只停留在静态稿和交接文档里。可以更快验证交互、比较方案、观察真实使用，再把时间花在理解用户和建立产品判断上。',
          '这也意味着“会不会使用某个工具”只是起点。越容易实现，越需要有人判断什么值得做、为什么这样做，以及结果是否真的改善了用户任务。',
        ],
      },
      {
        heading: '把焦虑换成探索',
        paragraphs: [
          'AI 的进步会让新人更容易开始，也会让旧的经验更快失效。与其把注意力放在追赶某个工具，不如保持对新能力的好奇，把每次尝试都当成理解产品和工作方式的机会。',
          '探索不等于盲目追新，而是用小成本实验验证假设，再决定是否进入正式流程。',
        ],
      },
      {
        heading: '用“双轨”安排工作',
        paragraphs: [
          '访谈里给出的实用方法，是把工作分成两条轨道。核心、长期和高风险的产品问题，需要深度研究、验证与迭代；探索性的新功能，则可以快速做出可用版本，从真实反馈中学习。',
          '双轨的价值在于把速度和质量放进同一个系统：不是所有事情都用同一套流程，也不是所有事情都可以跳过判断。',
        ],
      },
      {
        heading: '原型变成思考工具',
        paragraphs: [
          '在 AI 工具的帮助下，原型不再只是交付给开发的中间产物，也可以直接成为团队讨论问题的共同对象。一个能运行的实验，往往比一组静态页面更快暴露流程、内容和状态上的矛盾。',
          '这要求设计师把原型当作思考工具：先表达关键假设，再用真实交互观察哪里成立、哪里需要调整。',
        ],
      },
      {
        heading: 'AI 时代需要什么样的设计师',
        paragraphs: ['文章最后归纳的能力，和“熟练掌握更多工具”并不完全相同：'],
        bullets: [
          '保持好奇，持续理解新能力能改变哪一段工作流。',
          '形成自己的观点，能够解释为什么选择一个方向。',
          '具备系统思维，看到界面背后的流程、约束和组织关系。',
          '保持适应力，在工具和边界快速变化时仍能推进工作。',
          '关注结果，把注意力放在用户任务和业务影响，而不是产出数量。',
        ],
      },
      {
        heading: '我的产品经理视角',
        paragraphs: [
          '对 AI 产品经理而言，这份访谈最有价值的提醒是：探索性原型和生产级承诺必须分开管理。前者允许快速试错，后者必须明确成功标准、验证方式、权限边界和责任归属。',
          'AI 能力应该被做得足够可见，让团队知道它能帮什么、不能帮什么；但最终的判断、复核和结果责任，仍然要回到具体的人和流程里。',
        ],
      },
    ],
    takeaway: '设计师不会消失，但工作会更像在不确定性里做判断、组织系统与推动结果。对产品团队来说，真正要升级的是协作方式和责任边界。',
  },
  {
    slug: 'ai-pm-agent-nine-step-design',
    title: 'AI PM 的 Agent 九步设计流程',
    description: '从需求判断到上线评估，定义一份工程可以直接实现的 agent spec。',
    lead: '这是一份设计手册，不是学习脚手架：当需求确认适合用 agent 后，产品经理需要把目标、能力、边界、护栏和评估逐项交付清楚。',
    date: '2026.09',
    author: '张楠整理',
    sourceLabel: '张楠整理 · AI PM Agent 设计手册',
    sourceNote: '这份手册服务于真实交付：它回答 AI 产品经理接到需求、判断要用 agent 之后，具体该定义和交付哪些东西。',
    keyInsight: '先定义边界，再给能力',
    sections: [
      {
        heading: '该不该做成 agent',
        paragraphs: [
          '动手设计前先做减法。这一步是设计的前置闸门：agent 贵、慢、不可预测，只有当任务的执行路径事前无法确定，且必须根据运行中的反馈动态决定下一步时，才值得使用。',
          '如果步骤和分支可以事前写死，就优先做 workflow；如果确实需要动态判断，再继续往下定义 agent，或者采用“决策层 agent + 执行层确定性流程”的组合。',
        ],
        bullets: [
          '先问步骤和分支能不能事前写死，再问是否必须看到中间结果才知道下一步。',
          '步数不定、分支爆炸、需要响应意外反馈，是 workflow 的三堵墙。',
          '产出物是一句话结论，并标出哪一层使用 agent、哪一层使用确定性工具。',
        ],
      },
      {
        heading: '定义目标与边界',
        paragraphs: [
          '把 agent 的唯一任务和明确不做什么钉死。目标越聚焦，agent 越稳；边界越模糊，它越容易乱伸手、乱兜底和乱承诺。',
          '用“它负责 X，不负责 Y”的句式收紧职责。宁可先做窄而可迭代的 agent，也不要一开始就把所有售后、运营或知识问答都塞进同一个职责里。',
        ],
        bullets: [
          '职责陈述：一句话说明 agent 唯一负责的任务。',
          '明确不做清单：列出越权、越界和不承诺的场景。',
          '把灰色地带提前写出来，避免 agent 自由发挥。',
        ],
      },
      {
        heading: '设计工具集（能力）',
        paragraphs: [
          'agent 能干什么，完全由工具决定。工具是 agent 的手，也是它的风险面；没有提供的能力，它无法完成，提供过多的能力则会增加选错工具和传错参数的概率。',
          '从目标倒推完成任务所需的最少能力，一种能力对应一个工具，并把危险工具单独标记给后续护栏设计。',
        ],
        bullets: [
          '每个工具都写清名称、功能、输入和输出。',
          '不可逆、花钱、改变权限的工具必须单独标记。',
          '工具描述要足够明确，让模型知道何时调用、如何传参。',
        ],
      },
      {
        heading: '编写指令与 System Prompt',
        paragraphs: [
          '指令是 agent 的行为准则，负责把目标边界、工具用法、判断优先级、语气和边界处理翻译成可执行的自然语言。',
          '重点写清“如果……就……”的条件分支，例如命中金额阈值转人工、不同状态走不同工具。指令负责引导，但不能替代真正的安全控制。',
        ],
        bullets: [
          '定义角色、判断规则、优先级、语气和边界处理。',
          '明确工具的调用条件、参数要求和结果解释方式。',
          '把危险动作交给代码层护栏，不把安全只寄托在 prompt 上。',
        ],
      },
      {
        heading: '设计记忆',
        paragraphs: [
          '先判断需求是否真的需要跨轮或跨会话记忆。单次任务可以闭环时，不要为了“像 agent”而增加长期记忆；只有需要记住用户身份、上次进度或稳定偏好时，才引入长期记忆。',
          '需要记忆时，继续明确记什么、存在哪里、保留多久，以及如何处理过时信息。长期记忆通常依靠检索实现，本质上会把 RAG 的准确性和新鲜度问题带进来。',
        ],
        bullets: [
          '判断是否需要记忆，以及是短期任务记忆还是长期记忆。',
          '定义记忆内容、存储位置、保留期限和更新规则。',
          '避免把不必要的历史信息带入当前判断，污染任务上下文。',
        ],
      },
      {
        heading: '设定循环控制：停止与步数',
        paragraphs: [
          '产品经理不需要编写执行循环，但要定义“怎么算完成”和“最多转几圈”。这两个参数决定 agent 是停得太早，还是出问题后持续空转。',
          '完成条件从目标倒推，最大步数、超时和预算上限则应根据真实任务的步数分布实测确定，既覆盖正常任务，也能及时兜住异常。',
        ],
        bullets: [
          '完成条件：描述什么状态算任务达成。',
          '循环护栏：定义最大步数、超时和预算上限。',
          '参数要覆盖正常复杂度，不能放任异常任务无限消耗。',
        ],
      },
      {
        heading: '设计护栏与人机确认',
        paragraphs: [
          '把危险的、不可逆的、花钱的动作设成“暂停，等待人工确认，再执行”。agent 会犯错，也可能被诱导，护栏直接决定它能不能进入生产。',
          '先把工具按“禁止、需确认、放行”分级，再为每类动作定义触发阈值。代码层必须强制执行，不能只在 prompt 中提醒。',
        ],
        bullets: [
          '禁止：绝对不能自动执行的动作和红线行为。',
          '需确认：涉及资金、权限、不可逆影响或高影响面的动作。',
          '放行：风险可控、可回滚且不改变外部状态的动作。',
          '产出物是一张动作分级表，以及每类动作的触发阈值。',
        ],
      },
      {
        heading: '设计兜底与转人工',
        paragraphs: [
          '一个能上生产的 agent，必须有一条清晰的“我不行了 → 转人工”的路。工具报错、绕圈、置信度低或命中边界时，应安全退出，而不是硬撑、乱编或卡死。',
          '转人工不是失败，而是产品流程的一部分。交接时要把已经收集的信息、调用结果和失败原因一并带过去，避免用户重复描述问题。',
        ],
        bullets: [
          '触发条件：超最大步数、工具连续报错、低置信度或超出职责边界。',
          '兜底动作：转人工、给出明确话术，或安全退出。',
          '交接内容：用户诉求、已确认信息、工具结果、失败原因和建议下一步。',
        ],
      },
      {
        heading: '定义评估指标与上线红线',
        paragraphs: [
          '上线前必须能回答：这个 agent 是否靠谱地完成任务、成本是否可接受、失败时是否能恢复，以及多少任务需要人工兜底。',
          '评估不能只看最终答案对不对，还要检查是否编造、是否走过危险路径、调用次数是否合理，以及失败是否被正确交接。',
        ],
        bullets: [
          '质量：任务完成率、事实可靠性和关键场景通过率。',
          '可靠性：工具出错率、失败恢复率和异常退出率。',
          '成本：每次任务的调用数、token 和时间成本。',
          '人工介入率：最终需要 escalate 的任务比例。',
          '为每项指标设上线红线，不达标就不进入正式发布。',
        ],
      },
    ],
    takeaway: '九步可以记成一条动作链：①判断该不该做 → ②钉死目标边界 → ③列工具 → ④写指令 → ⑤判断要不要记忆 → ⑥设完成条件与最大步数 → ⑦给危险动作上护栏 → ⑧设计失败兜底与转人工 → ⑨定评估指标与上线红线。②③⑦⑧是 PM 的主战场：工程师实现循环，你负责边界、能力、护栏和兜底。',
  },
]

export function wordArticleBySlug(slug: string) {
  return wordArticles.find((article) => article.slug === slug)
}

export const wordChannels: WordChannel[] = [
  { slug: 'articles', index: '01', type: 'ARTICLE', title: 'AI 产品文章', description: '记录模型能力如何进入真实场景，以及产品经理在其中如何做判断。', accent: 'bg-[#e7dfcf]', href: '/words/articles/' },
  { slug: 'videos', index: '02', type: 'VIDEO', title: '视频与公开表达', description: '把复杂问题讲清楚，分享 AI 产品、体验设计与职业转型中的真实思考。', accent: 'bg-[#d5e0e1]', href: '/words/videos/' },
  { slug: 'vibe-coding', index: '03', type: 'VIBE CODING', title: 'Vibe Coding 实验室', description: '记录个人网站、原型和工具搭建，把想法快速变成可用的产品体验。', accent: 'bg-[#d9d1c8]', href: '/words/vibe-coding/' },
]

export const wordChannelEntries: Record<WordChannelSlug, WordChannelEntry[]> = {
  articles: [
    { slug: 'openai-designers-ai-era', type: 'ARTICLE', title: wordArticles[0].title, description: wordArticles[0].description, date: wordArticles[0].date, href: '/words/articles/openai-designers-ai-era/' },
    { slug: 'ai-pm-agent-nine-step-design', type: 'ARTICLE', title: wordArticles[1].title, description: wordArticles[1].description, date: wordArticles[1].date, href: '/words/articles/ai-pm-agent-nine-step-design/' },
  ],
  videos: [],
  'vibe-coding': [
    { slug: 'agent-loop', type: 'INTERACTIVE LAB', title: 'Agent Loop 策略地图', description: '跟随 Coding Agent 的决策、执行与反馈循环，点击节点查看数据，逐步观察代码修复、测试与交付。', date: '2026.09', href: '/words/vibe-coding/agent-loop/index.html' },
  ],
}

export function wordChannelBySlug(slug: string) {
  return wordChannels.find((channel) => channel.slug === slug)
}

export const words: WordItem[] = [
  ...wordChannels,
]

export const nowItems: NowItem[] = [
  { date: '2026.09', city: '深圳', type: 'MAKING', title: 'AI PM 的 Agent 九步设计流程', description: '把 agent 设计从“会不会用模型”推进到可交付的 spec：先判断是否该用 agent，再定义目标、工具、护栏、兜底与评估。', href: '/words/articles/ai-pm-agent-nine-step-design/' },
  { date: '2026.09', city: '深圳', type: 'READING', title: '整理 OpenAI 设计总监关于 AI 时代设计的访谈', description: '把设计师的焦虑、岗位边界与可执行的工作方法，整理成一篇 AI 产品视角的阅读笔记。', href: '/words/articles/openai-designers-ai-era/' },
  { date: '2026.07', city: '深圳', type: 'THINKING', title: 'AI 产品如何从 Demo 走到真实工作流', description: '关注能力边界、任务成功标准，以及人机协作中的最后一公里。' },
  { date: '2026.07', city: '深圳', type: 'MAKING', title: '个人网站 1.0 与 Vibe Coding', description: '持续打磨自己的作品集，也把搭建过程沉淀成可复用的方法。' },
  { date: '2026.06', city: '深圳', type: 'LIVING', title: '跑步、摄影与保持感受力', description: '在工作之外保持对具体生活的观察，给产品判断留出呼吸。' },
  { date: '2026.06', city: '深圳', type: 'READING', title: '重新理解 AI 产品的评估体系', description: '从主观体验回到任务成功率、质量门槛和可持续运营。' },
  { date: '2026.05', city: '深圳', type: 'WRITING', title: '把项目经验整理成公开表达', description: '将复杂工作流转化为能被读者理解和复用的产品语言。' },
  { date: '2026.05', city: '深圳', type: 'MAKING', title: '为个人网站增加可交互的信息入口', description: '让作品集不只展示结果，也展示持续构建的过程。' },
]

export const capabilities = [
  ['01', '定义 AI 场景', '从真实业务流程识别高频、高价值且适合 AI 介入的切入点。'],
  ['02', '设计可信闭环', '明确 AI 自动处理、人工确认、权限过滤和异常兜底的边界。'],
  ['03', '评测与归因', '用评测集和 Bad Case 分层定位检索、提示词、工作流与模型问题。'],
  ['04', '推进产品落地', '协同算法、研发与业务团队，从 MVP 推进到灰度、正式版本和推广。'],
] as const
