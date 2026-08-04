# skills

Collection of AI Skills, rules, and workflows for use with the AI agents. See the folders under `.agent/` folder for details.

## `skills`

Folder of reusable agent skills. Each skill lives in its own folder with a `SKILL.md` file.

### ask-questions-if-underspecified

Clarify requirements before implementing. Use when serious doubts arise.

[ask-questions-if-underspecified](.agent/skills/ask-questions-if-underspecified/SKILL.md)

### brainstorming

Use when a user presents a vague project or business idea and wants to research, challenge, refine, validate, or turn it into a documented handoff.

[brainstorming](.agent/skills/brainstorming/SKILL.md)

### big-picture

Use when a user wants to see the big picture and focus on high-level overview.

[big-picture](.agent/skills/big-picture/SKILL.md)

### code-steward

Comprehensive codebase stewardship skill that combines import checking, typecheck fixing, and eslint fixing into a single unified workflow.

[code-steward](.agent/skills/code-steward/SKILL.md)

### feature-developer

Develops features systematically, ensuring they are implemented correctly and efficiently.

[feature-developer](.agent/skills/feature-developer/SKILL.md)

### feature-groom

Groom features into detailed implementation plans with tasks, questions, and considerations for frontend/backend development.

[feature-groom](.agent/skills/feature-groom/SKILL.md)

### clear-writing-skill

Write and edit prose in a "clear" style: simple everyday words, complete sentences, no dashes, no jargon, no analogies, no filler, and full clear explanations. Use this whenever you draft or revise any prose for the user, such as documents, summaries, README files, research notes, proposals, slide text, emails, or commit and PR descriptions. Also use it whenever the user asks to simplify, clean up, tighten, reword, or make writing clearer or easier to read. 

[clear-writing-skill](.agent/skills/clear-writing-skill/SKILL.md)

### senior-frontend-builder

Build consistent, accessible UI components with Tailwind CSS, shadcn/ui, and custom design tokens. Apply when styling components, creating design systems, implementing responsive layouts, or optimizing CSS performance.

[senior-frontend-builder](.agent/skills/senior-frontend-builder/SKILL.md)

### tailwind-shadui

Build consistent, accessible UI components with Tailwind CSS, shadcn/ui, and custom design tokens. Apply when styling components, creating design systems, implementing responsive layouts, or optimizing CSS performance.

[tailwind-shadui](.agent/skills/tailwind-shadui/SKILL.md)

### unused-code-cleanup

Specialized agent for identifying and removing unused code, components, hooks, and styles in React applications using TypeScript. Use this when you need to reduce bundle size, clean up technical debt, or audit a codebase for dead code.

[unused-code-cleanup](.agent/skills/unused-code-cleanup/SKILL.md)

### deep-elicitation

Question the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'elicitation' trigger phrases. This skill is inspired by the   [grill me](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) skill from Matt Pocock's skills repository.

[deep-elicitation](.agent/skills/deep-elicitation/SKILL.md)

### teach

Teach the user a new skill or concept.

[teach](.agent/skills/teach/SKILL.md)

### business-analyst

Use PROACTIVELY during requirements gathering and before technical implementation begins. This agent specializes exclusively in business analysis - mapping processes, eliciting requirements, performing gap analysis, and creating detailed specifications. Automatically generates BRDs from stakeholder interviews, creates process flow diagrams, identifies system integration points, and ensures technical solutions align with business objectives.

[business-analyst](.agent/skills/business-analyst/SKILL.md)

### candor

You are my critical thinking partner. Your default mode is constructive disagreement.

[candor](.agent/skills/candor/SKILL.md)

# company-research

Research companies and emit a single source-cited markdown report containing products, leadership, competition, market position, financials, locations, employee ratings, benefits, and company history.

[company-research](.agent/skills/company-research/SKILL.md)

### copywriter

Write copy that converts and doesn't sound like a robot. Two jobs in one skill: a reader-first copywriter for clickbait titles, headlines, short descriptions, microcopy, CTAs, error messages, subject lines, viral LinkedIn posts, and category-defining strategic blog posts, which asks for the ICP, the category, and the story before writing, helps sharpen the story until it is worth telling, names the feeling of the person on the other end, and finds the simplest way to explain the concept; and a humanizer built on Wikipedia's comprehensive Signs of AI writing guide, which detects and fixes inflated symbolism, promotional language, superficial -ing analyses, vague attributions, em dash overuse, rule of three, AI vocabulary words, passive voice, negative parallelisms, and filler phrases. Use when writing or punching up marketing copy, UI text, titles, LinkedIn posts, or strategic blog posts, or when editing text to sound natural and human-written.

[copywriter](.agent/skills/copywriter/SKILL.md)

### data-analyst-gifted

Elite data analyst persona (Gifted Data Analyst) with supernatural precision for analyzing any dataset and delivering actionable insights. Use when performing advanced data analysis, creating predictive models, generating executive-level insights, building intuitive visualizations, or transforming raw data into strategic recommendations. Focuses on actionable insights over observations, predictive analysis over descriptive, and always connects metrics to business outcomes. Responds only in English regardless of input language.

[data-analyst-gifted](.agent/skills/data-analyst-gifted/SKILL.md)

### draw-io

draw.io diagram creation, editing, and review. Use for .drawio XML editing, PNG conversion, layout adjustment, and AWS icon usage.

[draw-io](.agent/skills/draw-io/SKILL.md)

### excalidraw

Use when working with *.excalidraw or *.excalidraw.json files, user mentions diagrams/flowcharts, or requests architecture visualization - delegates all Excalidraw operations to subagents to prevent context exhaustion from verbose JSON (single files: 4k-22k tokens, can exceed read limits)

[excalidraw](.agent/skills/excalidraw/SKILL.md)

### format-as-markdown

Use when the user asks to format a file or content as properly structured, readable Markdown without changing the actual text.

[format-as-markdown](.agent/skills/format-as-markdown/SKILL.md)

### humanizer

Remove signs of AI-generated writing from text. Use when editing or reviewing text to make it sound ore natural and human-written. Based on Wikipedia's comprehensive "Signs of AI writing" guide. Detects and fixes patterns including: inflated symbolism, promotional language, superficial -ing analyses, vague attributions, em dash overuse, rule of three, AI vocabulary words, negative parallelisms, and excessive conjunctive phrases.

[humanizer](.agent/skills/humanizer/SKILL.md)

### image-to-draw-io-diagram

Transform visual images into functional, editable Draw.io diagrams through systematic analysis and XML generation. Use when converting screenshots or diagrams to editable format, recreating architecture diagrams from images, generating Draw.io XML from visual designs, or creating editable versions of static diagrams. Performs visual analysis to identify shapes, hierarchy, and styling, then generates proper Draw.io XML with accurate positioning, colors, and connections.

[image-to-draw-io-diagram](.agent/skills/image-to-draw-io-diagram/image-to-draw-io-diagram-skill.md)

### niche-opportunity-finder

Discover untapped B2B software opportunities by analyzing specific industries for boring business problems, pain points, willingness to pay, competition levels, and where to find these businesses.

[niche-opportunity-finder](.agent/skills/niche-opportunity-finder/SKILL.md)

### niche-research

Deep market analysis that downloads an entire industry into your brain. Searches forums, Reddit, industry sites, events, and platforms to uncover pain points, language, opportunities, and the perfect software solution to sell them.

[niche-research](.agent/skills/niche-research/SKILL.md)

### researcher

Research and investigation specialist for both online sources and local codebases. Use PROACTIVELY for researching documentation, APIs, best practices online AND deep-diving into local code. Invoke when you need comprehensive information from multiple sources.

[researcher](.agent/skills/researcher/SKILL.md)

### skill-creator

Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations.

[skill-creator](.agent/skills/skill-creator/SKILL.md)

### unpolished-truth

Guide a user through a What / So What / Now What debrief to produce clear, actionable status updates.

[unpolished-truth](.agent/skills/unpolished-truth/SKILL.md)

### writing-clearly-and-concisely

Use when writing prose humans will read—documentation, commit messages, error messages, explanations, reports, or UI text. Applies Strunk's timeless rules for clearer, stronger, more professional writing.

[writing-clearly-and-concisely](.agent/skills/writing-clearly-and-concisely/SKILL.md)

## `rules`

Project-wide rules.

- [browser-testing.md](.agent/rules/browser-testing.md)
- [linting-imports.md](.agent/rules/linting-imports.md)

## `workflow`

Workflow definitions used by the agents that compose skills and other information into a coherent plan.

- [feature-groom-dev.md](.agent/workflow/feature-groom-dev.md)
