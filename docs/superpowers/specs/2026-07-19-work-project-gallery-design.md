# Work Project Gallery Design

## Goal

Refresh the Work section with resume-accurate company and project timelines, while keeping its three-project structure and making each project read like a focused exhibition entry.

## Content Source of Truth

The user-provided `张楠-AI产品经理-0715.pdf` is the source for all company names, periods, project names, responsibilities, and measurable results.

1. 华为技术有限公司, AI 产品经理, 2025.02-2026.06; project: AI IDE 研发助手, 2025.02-2026.05.
2. 深圳丰链科技有限公司, 产品经理, 2023.03-2024.12; project: 智能仓储调度系统, 2023.04-2024.12.
3. 深圳市明源云科技有限公司, 产品经理, 2019.03-2023.02; project: 房企智慧案场销讲与客户接待系统, 2019.03-2023.02.

## Layout

- Preserve the existing Work section title and newest-to-oldest ordering.
- Use a responsive four-part card: project index, company and period, project narrative, and one measurable result with a case-detail visual affordance.
- Keep the existing semantic theme colors. The signal red is the only emphasis color; do not borrow the reference’s fluorescent lime.
- On hover and keyboard focus, elevate the card, strengthen the subtle border, show a signal accent rail, brighten the result block, and nudge the case affordance. No empty detail links are created.

## Content Rules

- Do not invent business metrics.
- Use only the resume’s stated measures: official-tool release / coverage for Huawei, about 30% scheduling-response reduction and 25% dispatch-efficiency increase for Fengchain, and 10 property developers plus 100+ sales offices for Mingyuan.
- Show a concise role statement and preserve project tags for later secondary case-study pages.

## Validation

- Unit tests cover newest-to-oldest order, corrected company/time data, the three stated outcomes, and the hover/focus gallery classes.
- Run focused ProjectGrid tests, all tests, production build, and responsive visual checks at desktop and 390px.
