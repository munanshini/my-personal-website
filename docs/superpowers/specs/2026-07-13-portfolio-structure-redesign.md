# Portfolio 1.0 Structure Redesign

## Goal

Reorganize the AI Product Manager portfolio around a clearer first-screen narrative, a unified Work section, differentiated content formats, richer Now and Contact sections, and a contact utility dropdown while preserving the existing three-card visual language.

## Confirmed content

- Resume PDF is a downloadable attachment only; its contents do not replace website copy.
- WeChat QR image is used in the contact utility and Contact card.
- Intro copy for Hero and Contact:

  > 你好，我是张楠。拥有 6 年产品设计经验，经历过交互设计与产品经理角色的转换，近三年聚焦 AI 产品经理工作。参与过营销 AIGC、智能仓储调度、AI IDE 等产品，熟悉 AI 在内容生产、企业供应链和开发者工具场景中的落地。

- Remove BorderGlow effects from the top-right and bottom-right buttons for this iteration.

## Information architecture

- `INDEX 首页`: oversized three-line AI Application / Product Manager headline, intro copy, portrait hero.
- `WORK 工作`: one section containing three cards. Each card combines company, period, project, role, AI scene, outcomes, and a future detail-page affordance.
- `WORDS 内容`: three differentiated cards for AI product articles, video/public expression, and Vibe Coding/build logs.
- `NOW 现在`: dated and city-tagged short entries for current thinking, making, and living; entries may expose article/link affordances.
- `CONTACT 联系`: compact visual contact card using the portrait as a restrained background, intro copy, contact details, QR code, and link list.

## Header behavior

- Navigation labels: INDEX 首页, WORK 工作, WORDS 内容, NOW 现在, CONTACT 联系.
- Remove the separate EXPERIENCE item.
- `OPEN TO WORK` becomes a hover/click utility trigger and no longer links to Contact.
- Utility panel contains resume download, phone, email, WeChat ID, and QR image.
- No BorderGlow effect in this iteration.

## Assets

- Copy the provided resume PDF into a project-local public attachment path.
- Copy the provided WeChat QR image into project-local assets.
- Reuse the existing stylized portrait in Hero and Contact.

## Responsive and accessibility requirements

- Header utility panel is keyboard reachable, dismissible, and does not block navigation on mobile.
- Work cards remain a three-card sequence on large screens and stack on small screens.
- Contact QR image has useful alt text.
- Resume download uses a real downloadable link.

## Validation

- Add/adjust tests for nav labels, removal of duplicate Hero actions, utility content, Work section company/project pairing, and Contact details.
- Run `npm test` and `npm run build`.
- Verify the local preview at desktop and mobile widths.
