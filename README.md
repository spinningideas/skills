# skills

Collection of AI Skills, rules, and workflows for use with the AI agents.

## `rules`

Project-wide rules for code quality, logging, and imports.

- [browser-testing.md](rules/browser-testing.md)
- [linting-imports.md](rules/linting-imports.md)

## `skills`

Reusable agent skills. Each skill lives in its own folder with a `SKILL.md` file.

### ask-questions-if-underspecified

Clarify requirements before implementing. Use when serious doubts arise.

[SKILL.md](skills/ask-questions-if-underspecified/SKILL.md)

### code-steward

Comprehensive codebase stewardship skill that combines import checking, typecheck fixing, and eslint fixing into a single unified workflow.

[SKILL.md](skills/code-steward/SKILL.md)

### feature-developer

Develops features systematically, ensuring they are implemented correctly and efficiently.

[SKILL.md](skills/feature-developer/SKILL.md)

### feature-groom

Groom features into detailed implementation plans with tasks, questions, and considerations for frontend/backend development.

[SKILL.md](skills/feature-groom/SKILL.md)

### plain-writing-skill

Write and edit prose in the user's plain style: simple everyday words, complete sentences, no dashes, no jargon, no analogies, no filler, and full clear explanations. Use this whenever you draft or revise any prose for the user, such as documents, summaries, README files, research notes, proposals, slide text, emails, or commit and PR descriptions. Also use it whenever the user asks to simplify, clean up, tighten, reword, or make writing clearer or easier to read. 

[SKILL.md](skills/plain-writing-skill/SKILL.md)

### senior-frontend-builder

Build consistent, accessible UI components with Tailwind CSS, shadcn/ui, and custom design tokens. Apply when styling components, creating design systems, implementing responsive layouts, or optimizing CSS performance.

[SKILL.md](skills/senior-frontend-builder/SKILL.md)

### tailwind-shadui

Build consistent, accessible UI components with Tailwind CSS, shadcn/ui, and custom design tokens. Apply when styling components, creating design systems, implementing responsive layouts, or optimizing CSS performance.

[SKILL.md](skills/tailwind-shadui/SKILL.md)

### unused-code-cleanup

Specialized agent for identifying and removing unused code, components, hooks, and styles in React applications using TypeScript. Use this when you need to reduce bundle size, clean up technical debt, or audit a codebase for dead code.

[SKILL.md](skills/unused-code-cleanup/SKILL.md)

## `workflow`

Workflow definitions used by the agent.

- [feature-groom-dev.md](workflow/feature-groom-dev.md)
