import { designProjects } from './designProjects'

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

export type WordChannelSlug = 'articles' | 'videos' | 'vibe-coding' | 'interaction-design'

export interface WordChannel extends WordItem {
  slug: WordChannelSlug
}

export interface WordChannelEntry {
  slug: string
  type: string
  title: string
  description: string
  date?: string
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

// 内容依据用户确认的《张楠最终简历版本0928》更新；项目数据保留原始口径。
export const projects: Project[] = [
  {
    "number": "01",
    "title": "Coding Agent · IDE AI 研发助手",
    "year": "2024.05 — 2026.08",
    "category": "CODING AGENT · DEVELOPER EXPERIENCE",
    "summary": "面向企业开发者，将企业代码与接口检索、工具编排、编译验证和人工确认接入 IDE，让编码建议进入真实研发流程。",
    "role": "负责场景与人机边界、上下文和工具接口定义、产品验收与评测归因，协同算法和研发推进 MVP、灰度与版本迭代。",
    "results": [
      "200 例离线评测：编译通过率约 40% → 80%",
      "离职时建议采纳率约 50%",
      "正式版本持续迭代 5 个小版本，扩展至全部门开发者"
    ],
    "tags": [
      "Coding Agent",
      "上下文工程",
      "RAG",
      "工具编排",
      "评测归因"
    ],
    "tone": "dark"
  },
  {
    "number": "02",
    "title": "Design Agent · 设计稿智能生成助手",
    "year": "2025 下半年启动",
    "category": "DESIGN AGENT · AIGC DESIGN",
    "summary": "嵌入 Octo Design 的设计生成插件，通过需求澄清、企业规范检索与出稿前自检，生成可分层编辑、可继续交付的设计稿。",
    "role": "负责需求分析、竞品调研、参与技术选型，设计生成与修改链路，牵头制定上线标准并推动研发落地。",
    "results": [
      "设计稿采纳率约 30% → 60%",
      "单页初稿 1–3 分钟，不含设计师微调",
      "使用范围由内测约 20 人扩展至约 100 人"
    ],
    "tags": [
      "Design Agent",
      "AIGC",
      "需求澄清",
      "设计规范",
      "可编辑交付"
    ],
    "tone": "warm"
  },
  {
    "number": "03",
    "title": "PDMC+ 流程与业务架构管理平台 AI 化改造",
    "year": "2024.05 — 2026.08",
    "category": "ENTERPRISE KNOWLEDGE · PROCESS INTELLIGENCE",
    "summary": "围绕员工“找不到、读不懂”与管理员“录入门槛高”，设计检索问答和文档抽取两条链路，保留原有权限与审核责任。",
    "role": "负责用户分层、改造优先级、查询与发布链路设计，参与定义知识组织、混合检索、权限过滤和答案溯源策略。",
    "results": [
      "查询与发布双链路",
      "离职时新路径采纳率约 50%",
      "保留权限过滤、答案溯源和人工审核"
    ],
    "tags": [
      "企业知识",
      "RAG",
      "混合检索",
      "文档抽取",
      "权限与溯源"
    ],
    "tone": "blue"
  },
  {
    "number": "04",
    "title": "智能仓储调度系统",
    "year": "2023.02 — 2024.04",
    "category": "SUPPLY CHAIN · RULE-BASED SCHEDULING",
    "summary": "将任务优先级、人员设备匹配、冲突识别与动态改派组织成可解释的调度流程，把管理员经验沉淀为规则。",
    "role": "拆解业务问题，与研发和算法团队梳理现场信息和规则，将输出设计为分派建议、推荐依据与冲突提示，并配套人工调整。",
    "results": [
      "分派建议 + 推荐依据 + 冲突提示",
      "支持异常场景动态改派",
      "以人工调整率作为策略质量代理指标"
    ],
    "tags": [
      "规则引擎",
      "智能调度",
      "任务分派",
      "可解释性",
      "人工兜底"
    ],
    "tone": "blue"
  },
  {
    "number": "05",
    "title": "房企智慧案场销讲与客户接待系统",
    "year": "2019.03 — 2023.01",
    "category": "REAL ESTATE SALES TECH · INTERACTIVE EXPERIENCE",
    "summary": "从可视化销讲与结构化接待出发，将客户画像、意愿分级和云客 CRM 跟单连接起来，完成从 0 到 1 的产品交付。",
    "role": "以交互设计师身份加入并负责销讲交互框架，随后主导需求洞察、业务流程、意愿评估与 CRM 数据闭环，配合推进存量客户增购。",
    "results": [
      "10 家房企、100+ 个售楼处",
      "接待 → 客户画像 → 意愿分级 → CRM 跟单闭环",
      "从交互设计到完整业务链路的产品负责"
    ],
    "tags": [
      "0–1 产品",
      "交互设计",
      "客户画像",
      "意愿评估",
      "商业交付"
    ],
    "tone": "warm"
  }
]

export const experiences: ExperienceItem[] = [
  {
    "company": "深圳市明源云科技有限公司",
    "role": "产品经理",
    "period": "2019.03 — 2023.01",
    "focus": "可视化销讲 · 客户接待 · CRM 与商业交付"
  },
  {
    "company": "深圳丰链科技有限公司",
    "role": "产品经理",
    "period": "2023.02 — 2024.04",
    "focus": "规则引擎 · 智能仓储调度 · 人工兜底"
  },
  {
    "company": "华为技术有限公司",
    "role": "AI 产品经理",
    "period": "2024.05 — 2026.08",
    "focus": "Coding Agent · Design Agent · PDMC+ AI 化；对接 3–5 名外包人员，负责任务拆分、进度跟踪、会议组织与跨团队对接"
  }
]

const projectDetails: Record<string, ProjectDetail> = {
  "ai-ide": {
    "slug": "ai-ide",
    "seoTitle": "Coding Agent · IDE AI 研发助手 · 张楠 AI 产品经理",
    "seoDescription": "通过企业上下文检索、工具链编排、编译验证与人工确认设计 Coding Agent，在 200 例离线评测集上将端到端编译通过率由约 40% 提升至约 80%。",
    "heroTagline": "把不可靠的模型输出，变成开发者敢用的研发工具。",
    "background": [
      "面向公司内部开发人员的 IDE 插件，帮助开发者理解陌生代码、编写重复代码、定位编译报错与修复 Bug。MVP 直接调用通用大模型，端到端编译通过率仅约 40%，生成结果常因缺少企业代码、内部接口和开发规范而无法编译或不符合规范。",
      "评测归因显示，企业上下文缺失是主要失败原因。产品优化聚焦模型之外的 harness 层：组织上下文、编排工具、验证产物，并把最终控制权留给开发者。"
    ],
    "role": {
      "scope": "负责 Coding Agent 的场景定义、产品形态与验收标准，以及评测、协同落地和迭代。算法与模型实现、Runtime 执行环境隔离和会话状态管理由算法团队负责。",
      "bullets": [
        "围绕代码生成、代码解释、编译报错分析、Bug 修复四类高频任务，定义触发入口、上下文、输出与人工介入节点。",
        "与算法团队共同定义上下文策略，采用索引式检索（RAG）接入企业代码仓、接口文档与开发规范；在提示词中约束只使用检索到的真实接口。",
        "设计企业语料检索 Tool 的入参 Schema 与返回结构，通过 Function Calling 接入；编译验证复用 Bash 执行能力，以通过或报错作为客观反馈。",
        "采用 diff 分块呈现改动，由开发者逐块确认；牵头将评测集从 50 例扩展至 200 例，定义编译通过、修复成功、采纳与幻觉等维度。",
        "按检索、提示词、工作流、模型四层归因 Bad Case，协同算法、研发和内部使用团队推进 MVP、灰度与正式版本迭代。"
      ]
    },
    "decisions": [
      {
        "title": "用企业上下文检索解决主要失败原因",
        "problem": "直接调用通用模型时，企业代码与接口上下文缺失，导致生成内容无法编译或不符合规范。",
        "approach": "采用 RAG 检索企业语料，并约束模型仅使用检索上下文中存在的接口；通过四层归因确定以检索层为主攻方向。",
        "tradeoff": "采用索引式检索而非让模型自主遍历仓库；优先定向优化上下文，避免盲目更换或微调模型。"
      },
      {
        "title": "让编译反馈和分块确认进入交付链路",
        "problem": "生成的代码需要客观验证；整文件重写还可能误伤原有内容或遗漏代码。",
        "approach": "复用 Bash 执行编译，以编译结果驱动后续流程；将改动以 diff 分块展示，由开发者确认。",
        "tradeoff": "保留验证与人工确认步骤，以增加的交互成本换取可检查的改动和明确的最终控制权。"
      },
      {
        "title": "让评测归因指导每一轮优化",
        "problem": "只看最终结果，难以区分失败来自检索、提示词、工作流还是模型。",
        "approach": "建设 200 例离线评测集，按四层定位 Bad Case；以约两周为一轮，累计完成 4–5 轮定向优化。",
        "tradeoff": "把迭代资源投入已定位的问题，而不是仅凭生成效果主观判断或持续尝试新模型。"
      }
    ],
    "outcomes": [
      {
        "metric": "约 40% → 约 80%",
        "note": "端到端编译通过率，基于 200 例离线评测集；基线为通用大模型直接调用。"
      },
      {
        "metric": "约 50% 建议采纳率",
        "note": "离职时的建议采纳率；核心能力进入正式研发工具版本后持续迭代 5 个小版本。"
      },
      {
        "metric": "约 30 分钟 → 2–3 分钟",
        "note": "开发者定位单个编译错误或 Bug 的耗时；全部 AI 改动仍以 diff 交由开发者逐块确认。"
      },
      {
        "metric": "全部门开发者",
        "note": "由小范围试点扩展至全部门，覆盖代码生成、代码解释、智能问答、报错分析与 Bug 修复五类场景。"
      }
    ],
    "reflection": "企业 Coding Agent 的可用性，取决于模型之外的产品设计：上下文能否补齐、工具能否连接真实环境、反馈能否验证结果，以及开发者能否掌握最终决定权。评测归因让这些改进有据可循。",
    "confidentialityNote": "基于个人项目经历整理，仅呈现项目职责、产品方法与成果口径。",
    "isReady": true
  },
  "design-agent": {
    "slug": "design-agent",
    "seoTitle": "Design Agent · 设计稿智能生成助手 · 张楠 AI 产品经理",
    "seoDescription": "面向内部设计师的 AIGC 设计插件，通过需求澄清、企业设计规范约束和自检，将设计稿采纳率由约 30% 提升至约 60%，支持可编辑设计稿与评审后的前端代码交付。",
    "heroTagline": "先澄清需求，再约束生成，让设计稿进入真实交付。",
    "background": [
      "2025 年下半年启动，面向公司内部 UI 与交互设计师，以插件形态嵌入 Octo Design，产品经理也可使用。用户通过自然语言描述页面需求，生成符合企业规范的设计稿；多页面场景可带交互效果，经评审后转换为前端可用代码。",
      "MVP 内测阶段采纳率约 30%，反馈集中在生成结果不精准、不符合规范、无法直接使用。优化重点是收窄生成范围，减少需求歧义与规范偏差，让结果能够进入评审和后续研发。"
    ],
    "role": {
      "scope": "负责前期需求分析与竞品调研，参与技术选型，牵头制定上线标准并推动研发落地；设计生成、人机协作和交付链路，围绕采纳反馈持续优化。",
      "bullets": [
        "确定以 Octo Design 插件形态落地，让设计师在原有工作环境中完成生成与修改。",
        "设计“需求澄清 → 规范约束生成 → 出稿前自检 → 人工接管”的完整流程，通过选项逐步收敛至最小可执行范围。",
        "生成时检索企业设计规范库，限定使用规范库内组件；预设多种内部 UI 页面风格，并在出稿前由模型检查规范符合情况。",
        "将结果交付为可分层编辑的设计稿，支持对话修改和选中板块后手动编辑；评审确认后转为前端代码，由前端完成最终调整与上线兜底。",
        "针对“不精准、不合规”的核心反馈，推动需求澄清、风格选择、规范库检索与约束三项优化。"
      ]
    },
    "decisions": [
      {
        "title": "在生成前把模糊需求变成可执行范围",
        "problem": "用户的自然语言需求存在歧义，MVP 生成结果与预期不一致，难以直接使用。",
        "approach": "通过选项逐步澄清需求，并提供内部 UI 页面风格选项，将范围收敛后再生成。",
        "tradeoff": "在生成前增加澄清步骤，减少后续偏题与反复修改。"
      },
      {
        "title": "用规范库约束生成，再做出稿前自检",
        "problem": "生成结果不符合企业规范，设计师仍需花时间修正组件和样式。",
        "approach": "模型检索企业设计规范库，仅使用规范内组件，并在出稿前自检是否符合规范要求。",
        "tradeoff": "收窄模型自由发挥的范围，优先保证企业场景中的一致性与可用性；模型自检之后仍保留人工评审。"
      },
      {
        "title": "把可编辑与人工接管设计进交付",
        "problem": "生成设计稿仍需要设计师微调，转换出的代码也需要前端调整。",
        "approach": "提供可分层编辑的设计稿，支持对话和手动两种修改方式；评审后再转换代码交付前端。",
        "tradeoff": "将初稿生成、人工评审和最终上线分开，明确设计师与前端各自负责的交付环节。"
      }
    ],
    "outcomes": [
      {
        "metric": "约 30% → 约 60%",
        "note": "设计稿采纳率；采纳定义为生成稿无需修改或仅少量修改即可进入评审环节。"
      },
      {
        "metric": "30–60 分钟 → 1–3 分钟",
        "note": "单页面初版设计稿的生成耗时，不含设计师微调。"
      },
      {
        "metric": "约 20 人 → 约 100 人",
        "note": "从 MVP 内测约 20 人扩展至正式版约 50 名部门设计交互岗，最终覆盖约 100 人，延伸至业务产品岗。"
      },
      {
        "metric": "可编辑设计稿与代码交付",
        "note": "支持分层编辑和多页面交互；设计稿经评审后转换为前端可用代码，由前端完成最终调整与上线兜底。"
      }
    ],
    "reflection": "AI 生成类产品的可用性需要从生成前开始设计：先澄清需求，再约束生成，最后自检并交给人复核。把范围收敛到可控区间，才能让结果从初稿走向真实交付。",
    "confidentialityNote": "基于个人项目经历整理，仅呈现项目职责、产品方法与成果口径。",
    "isReady": true
  },
  "pdmc-ai": {
    "slug": "pdmc-ai",
    "seoTitle": "PDMC+ 流程与业务架构管理平台 AI 化改造 · 张楠 AI 产品经理",
    "seoDescription": "为公司级流程平台设计自然语言检索问答与文档抽取链路，沿用业务结构、混合检索和既有权限体系，以来源回溯与人工审核明确 AI 责任边界。",
    "heroTagline": "让员工找到并读懂规定，也让流程管理员更快完成发布。",
    "background": [
      "PDMC+ 是公司级流程与业务架构管理平台，承载流程文件的建模、发布、维护与查询。普通员工面对多卡片入口，常常找不到流程或读不懂专业条文；流程管理员则需要照模板逐字段填写，录入门槛较高。",
      "按用户分层确定改造优先级：先解决普通员工查询与理解的问题，再降低管理员内容生产成本。三类需求收敛为检索问答与文档抽取两条链路，其中自然语言搜索和全局问答两个查询入口共用同一套检索问答底座。"
    ],
    "role": {
      "scope": "负责平台 AI 化改造设计，包括用户分层、场景优先级、查询与发布流程；参与定义检索和可信度规则并对接研发落地，算法与工程实现由研发团队完成。",
      "bullets": [
        "将查询、理解、录入三类需求收敛为使用侧检索问答与生产侧文档抽取两条链路。",
        "将首页多卡片分流入口改为自然语言搜索，同步设计全局 AI 问答助手，支持条文解释和多轮追问。",
        "将发布流程改为“上传文件 → AI 解析抽取 → 填充标准表单 → 管理员复核 → 提交审核发布”。",
        "复用流程层级做结构化切分，采用关键词与语义向量混合检索，沿用角色与组织权限做检索前置过滤，并要求答案附来源。",
        "明确 AI 帮助用户找到并读懂规定，事项能否执行仍由人依据原始流程判断；保留复核和既有审核流转。"
      ]
    },
    "decisions": [
      {
        "title": "按用户分层确定 AI 改造顺序",
        "problem": "普通员工的查询理解困难与管理员的录入困难，涉及不同任务和使用频率。",
        "approach": "优先改善覆盖面更广的查询理解，再以文档抽取降低管理员录入成本；两个查询入口共用检索问答底座。",
        "tradeoff": "让改造顺序服务于用户覆盖和业务问题，并保留对存量用户迁移意愿的关注。"
      },
      {
        "title": "沿业务结构组织知识，结合两种检索方式",
        "problem": "按字数切分可能打断流程上下文；用户既会输入流程名称、编号，也会使用日常语言。",
        "approach": "沿用已有流程层级结构化切分，结合关键词精确匹配与语义向量匹配。",
        "tradeoff": "优先利用成熟平台的结构化资产；同类场景迁移若缺少这一基础，需要先进行知识资产治理。"
      },
      {
        "title": "把权限、依据与审核保留在原有责任体系中",
        "problem": "流程知识有权限与合规要求，AI 回答不能替用户直接决定某件事能否执行。",
        "approach": "检索环节前置权限过滤，答案附带原始文件出处；抽取结果由管理员复核，再进入既有审核流。",
        "tradeoff": "保留人工核对与审核步骤，使责任主体和内容依据在 AI 介入后仍然清晰。"
      }
    ],
    "outcomes": [
      {
        "metric": "查询与发布双链路",
        "note": "使用侧通过自然语言搜索和全局问答查询、理解流程；生产侧通过文档抽取辅助填充标准表单。"
      },
      {
        "metric": "约 50% 新路径采纳率",
        "note": "离职时的新路径采纳率；未迁移部分主要为继续沿用旧版路径的存量用户。"
      },
      {
        "metric": "从录入转向审阅修订",
        "note": "管理员上传文件后由 AI 解析填表，经人工复核、提交审核后发布，保留既有审核流转。"
      },
      {
        "metric": "可迁移的知识 AI 化方法",
        "note": "沉淀业务结构组织、混合检索、权限前置过滤、答案溯源和模板化抽取方法；迁移前需具备结构化知识资产基础。"
      }
    ],
    "reflection": "成熟系统的 AI 化需要同时处理业务结构、权限、合规和存量用户迁移。检索问答帮助人找到并读懂规定，文档抽取帮助人审阅修订，最终判断和发布责任仍由原有角色承担。",
    "confidentialityNote": "基于个人项目经历整理，仅呈现项目职责、产品方法与成果口径。",
    "isReady": true
  },
  "warehouse-scheduling": {
    "slug": "warehouse-scheduling",
    "seoTitle": "智能仓储调度系统 · 张楠 AI 产品经理",
    "seoDescription": "采用规则引擎组织仓内任务优先级、资源匹配与动态改派，以可解释建议、人工调整和执行反馈形成调度闭环。",
    "heroTagline": "把管理员经验，沉淀成可解释的调度规则。",
    "background": [
      "仓内每天产生大量入库、出库、拣选与搬运任务。面对紧急插单、人员冲突、设备不可用等情况，调度高度依赖管理员经验，响应慢、资源利用率低。",
      "将效率问题拆成优先级判断、人员设备匹配、冲突识别和动态改派四类子问题，和研发、算法团队梳理现场信息与规则，再将系统建议交给管理者确认或调整。"
    ],
    "role": {
      "scope": "负责调度问题拆解、业务规则与现场信息梳理，以及可解释建议、人工调整和异常兜底的产品设计，与研发、算法团队协同推进。",
      "bullets": [
        "围绕入库、出库、拣选与搬运，梳理任务优先级、人员设备匹配、冲突识别与动态改派。",
        "与研发和算法团队梳理调度所需的现场信息与业务规则。",
        "将系统输出定义为“分派建议 + 推荐依据 + 冲突提示”，帮助管理员理解并调整建议。",
        "建立状态感知、优先级判断、调度建议、人工确认调整与执行反馈闭环，以人工调整率作为策略质量的代理指标。"
      ]
    },
    "decisions": [
      {
        "title": "根据业务约束选择规则引擎",
        "problem": "现场调度已有成熟的最优化解法，管理者需要对结果负责，并要求全链路可解释。",
        "approach": "采用规则引擎，将经验判断沉淀为可复用规则，并展示建议依据与冲突。",
        "tradeoff": "有意选择规则方案而非大模型，使技术选型服务于可解释性和业务责任要求。"
      },
      {
        "title": "让人工调整成为规则改进的反馈",
        "problem": "紧急插单、人员冲突、设备不可用时，需要动态调整任务安排。",
        "approach": "支持人工确认和改派，记录执行反馈，并用人工调整率观察策略质量、持续迭代规则。",
        "tradeoff": "将人工调整率作为代理指标，结合具体异常场景解读，保留管理者对现场结果的最终责任。"
      }
    ],
    "outcomes": [
      {
        "metric": "可解释的调度建议",
        "note": "以分派建议、推荐依据与冲突提示呈现系统输出，配套人工调整和异常兜底。"
      },
      {
        "metric": "动态改派闭环",
        "note": "状态感知 → 优先级判断 → 调度建议 → 人工确认调整 → 执行反馈，支持异常场景动态改派。"
      },
      {
        "metric": "人工调整率",
        "note": "作为策略质量的代理指标，持续迭代规则，将依赖个人经验的调度过程沉淀为可复用规则。"
      }
    ],
    "reflection": "产品选型应从业务约束出发。已有成熟解法、需要可解释并由管理者负责的调度任务，适合以规则引擎、人工确认和反馈迭代建立稳定的工作流程。",
    "confidentialityNote": "基于个人项目经历整理，仅呈现项目职责、产品方法与成果口径。",
    "isReady": true
  },
  "smart-sales-center": {
    "slug": "smart-sales-center",
    "seoTitle": "房企智慧案场销讲与客户接待系统 · 张楠 AI 产品经理",
    "seoDescription": "从交互设计转向产品全流程，主导智慧案场销讲系统从 0 到 1，连接客户接待、意愿分级与云客 CRM，落地 10 家房企、100+ 个售楼处。",
    "heroTagline": "把一线顾问的讲盘经验，变成可复用的接待与跟单链路。",
    "background": [
      "售楼处接待与讲解依赖顾问个人经验和纸质材料，客户信息零散，销售缺乏可靠的意向判断依据。项目目标是将销讲、接待与客户信息沉淀连接为完整业务流程。",
      "我以交互设计师身份进入项目，负责销讲内容的可视化与交互框架，随后主导产品从需求洞察到落地的全过程，工作范围由界面体验扩展到数据沉淀与商业转化。"
    ],
    "role": {
      "scope": "设计阶段负责可视化销讲动线、交互框架与结构化接待；产品阶段主导完整业务链路，协同研发定义意愿评估，推动 CRM 打通，并配合销售和客户成功制定增购方案。",
      "bullets": [
        "将沙盘、户型、区位、价格等信息组织为顾问讲得顺、客户看得懂的可视化销讲动线，沉淀可复用模板。",
        "设计来访登记、话术引导与客户画像采集，逐字段定义系统自动带出或人工填写，降低一线操作负荷。",
        "与研发共同定义购买意愿评估模型，以规则加打分输出意向分级和依据，保留人工修正。",
        "推动接待与销讲数据进入云客 CRM，连接客户画像、意愿分级、线索流转与销售跟单。",
        "配合销售与客户成功团队制定存量客户增购方案，推进对外落地。"
      ]
    },
    "decisions": [
      {
        "title": "从信息展示扩展到完整接待链路",
        "problem": "零散楼盘信息和顾问个人经验难以支撑一致的接待体验，也无法沉淀可靠客户资料。",
        "approach": "组织可视化销讲动线和可复用模板，配套结构化登记、话术引导与客户画像采集。",
        "tradeoff": "把设计范围延伸到顾问实际操作和后续数据用途，逐字段判断自动带出与人工填写的分工。"
      },
      {
        "title": "让意愿分级可解释、可修正",
        "problem": "销售需要意向判断参考，一线顾问也要能结合现场情况调整。",
        "approach": "与研发共同定义规则加打分的评估模型，同时给出分级和判断依据，保留人工修正。",
        "tradeoff": "意愿分级作为销售参考，最终跟进判断仍由顾问结合具体客户信息完成。"
      },
      {
        "title": "把前端交互沉淀为可跟进的客户资产",
        "problem": "如果接待记录停留在展示端，难以支持持续跟单和后续商业转化。",
        "approach": "打通云客 CRM，形成接待、画像、意愿分级、线索流转和跟单闭环，配合销售与客户成功推动增购。",
        "tradeoff": "产品职责扩展到跨系统协作和商业交付，需要同时考虑体验、数据与销售使用方式。"
      }
    ],
    "outcomes": [
      {
        "metric": "10 家房企 · 100+ 售楼处",
        "note": "产品从 0 到 1 落地应用，将依赖个人经验与纸质材料的接待升级为标准化、可沉淀的流程，降低新人上手门槛。"
      },
      {
        "metric": "接待到跟单闭环",
        "note": "形成到访接待、客户画像、意愿分级、线索流转与销售跟单的数据闭环，提供可解释的意向参考。"
      },
      {
        "metric": "支撑存量客户增购",
        "note": "配合销售与客户成功制定增购方案，让销讲与接待数据服务后续商业转化。"
      },
      {
        "metric": "从交互设计到产品",
        "note": "由单点界面体验扩展至完整业务链路，主导需求洞察、产品定义与落地。"
      }
    ],
    "reflection": "这个项目让我从对单点体验负责，转向对体验、数据沉淀与商业转化的完整链路负责。后续 AI 产品同样需要放在真实工作流中判断价值，而不只看模型单次输出。",
    "confidentialityNote": "基于个人项目经历整理，仅呈现项目职责、产品方法与成果口径。",
    "isReady": true
  }
}

export const workItems: WorkItem[] = [
  { ...projects[0], company: "华为技术有限公司", companyPeriod: "2024.05 — 2026.08", companyFocus: "开发者工具 · 上下文工程 · 编码验证", slug: 'ai-ide', detail: projectDetails['ai-ide'] },
  { ...projects[1], company: "华为技术有限公司", companyPeriod: "2025 下半年启动", companyFocus: "AIGC · 设计工具 · 人机协作", slug: 'design-agent', detail: projectDetails['design-agent'] },
  { ...projects[2], company: "华为技术有限公司", companyPeriod: "2024.05 — 2026.08", companyFocus: "流程管理 · 企业知识 RAG · 文档抽取", slug: 'pdmc-ai', detail: projectDetails['pdmc-ai'] },
  { ...projects[3], company: "深圳丰链科技有限公司", companyPeriod: "2023.02 — 2024.04", companyFocus: "供应链数字化 · 规则引擎 · 调度协作", slug: 'warehouse-scheduling', detail: projectDetails['warehouse-scheduling'] },
  { ...projects[4], company: "深圳市明源云科技有限公司", companyPeriod: "2019.03 — 2023.01", companyFocus: "不动产数字营销 · 智慧案场 · CRM", slug: 'smart-sales-center', detail: projectDetails['smart-sales-center'] },
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
  { slug: 'interaction-design', index: '04', type: 'INTERACTION DESIGN', title: '交互设计实验室', description: '从平台工具到移动体验、空间可视化与品牌组件，呈现设计作品与交互细节。', accent: 'bg-[#dce3ef]', href: '/words/interaction-design/' },
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
  'interaction-design': designProjects.map(project => ({ slug: project.slug, type: project.category, title: project.title, description: project.summary, href: `/words/interaction-design/${project.slug}/` })),
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
