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

[ask-questions-if-underspecified](skills/ask-questions-if-underspecified/SKILL.md)

### code-steward

Comprehensive codebase stewardship skill that combines import checking, typecheck fixing, and eslint fixing into a single unified workflow.

[code-steward](skills/code-steward/SKILL.md)

### feature-developer

Develops features systematically, ensuring they are implemented correctly and efficiently.

[feature-developer](skills/feature-developer/SKILL.md)

### feature-groom

Groom features into detailed implementation plans with tasks, questions, and considerations for frontend/backend development.

[feature-groom](skills/feature-groom/SKILL.md)

### clear-writing-skill

Write and edit prose in a "clear" style: simple everyday words, complete sentences, no dashes, no jargon, no analogies, no filler, and full clear explanations. Use this whenever you draft or revise any prose for the user, such as documents, summaries, README files, research notes, proposals, slide text, emails, or commit and PR descriptions. Also use it whenever the user asks to simplify, clean up, tighten, reword, or make writing clearer or easier to read. 

[clear-writing-skill](skills/clear-writing-skill/SKILL.md)

### senior-frontend-builder

Build consistent, accessible UI components with Tailwind CSS, shadcn/ui, and custom design tokens. Apply when styling components, creating design systems, implementing responsive layouts, or optimizing CSS performance.

[senior-frontend-builder](skills/senior-frontend-builder/SKILL.md)

### tailwind-shadui

Build consistent, accessible UI components with Tailwind CSS, shadcn/ui, and custom design tokens. Apply when styling components, creating design systems, implementing responsive layouts, or optimizing CSS performance.

[tailwind-shadui](skills/tailwind-shadui/SKILL.md)

### unused-code-cleanup

Specialized agent for identifying and removing unused code, components, hooks, and styles in React applications using TypeScript. Use this when you need to reduce bundle size, clean up technical debt, or audit a codebase for dead code.

[unused-code-cleanup](skills/unused-code-cleanup/SKILL.md)

### deep-elicitation

Question the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'elicitation' trigger phrases.

[deep-elicitation](skills/deep-elicitation/SKILL.md)

### teach

Teach the user a new skill or concept, within this workspace.

[teach](skills/teach/SKILL.md)

## `workflow`

Workflow definitions used by the agent.

- [feature-groom-dev.md](workflow/feature-groom-dev.md)
