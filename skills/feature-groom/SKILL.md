---
name: Feature Groom
description: Groom features into detailed implementation plans with tasks, questions, and considerations for frontend/backend development
---

# Feature Groom Skill

This skill helps AI agents groom product features into detailed, actionable implementation plans with properly structured tasks, questions for clarification, and considerations for both frontend and backend development.

## Overview

Feature grooming transforms high-level feature requests into detailed technical specifications and task breakdowns. The goal is to produce a comprehensive plan that:

1. Captures all technical requirements
2. Breaks work into atomic, actionable tasks
3. Identifies ambiguities that need clarification
4. Considers both frontend and backend implications
5. Establishes clear implementation order

---

## Feature Grooming Process

### Step 1: Understand the Request

Before creating any plan, thoroughly understand:

1. **Read all referenced files** - View the complete contents of any files mentioned
2. **Understand the current state** - What exists today that will be modified?
3. **Identify the target state** - What should exist after implementation?
4. **Find existing patterns** - How are similar things already implemented in the codebase?
5. **Locate related models/types** - What TypeScript interfaces or types are involved?

### Step 2: Analyze the Scope

Determine the scope of changes needed:

1. **Database changes** - New tables, columns, migrations, seed data?
2. **Backend services** - New services or methods to add?
3. **API endpoints** - New routes or modifications to existing ones?
4. **Frontend components** - New components or updates to existing ones?
5. **Frontend services** - API client functions to add?
6. **Model/Type changes** - New interfaces or updates to existing ones?
7. **Configuration** - Environment variables, constants, or config changes?

### Step 3: Create Task Breakdown

For each piece of work, create a task containing numbered subtasks with the following format:

```markdown
### Task X.Y: [Task Name]

**Status: TODO**

[Description of what needs to be done]

**Implementation Details:**

- Specific code changes
- Method signatures if applicable
- Configuration values

**Files Affected:**

- List of files to create or modify
```

### Step 4: Group Tasks into Phases

Organize tasks into logical phases that can be implemented sequentially:

1. **Database/Schema changes** - Must happen first
2. **Backend services** - Core business logic
3. **API endpoints** - Expose services to frontend
4. **Frontend services** - API client wrappers
5. **Frontend components** - UI implementation
6. **Testing** - Verify everything works
7. **Cleanup** - Remove deprecated code

### Step 5: Identify Questions

Create a **Questions** section for anything that is:

- Ambiguous or unclear
- Requires a design decision
- Could be implemented multiple ways
- Has security or performance implications

Format questions with context:

```markdown
1. **[Topic]**: [Question]?
   - Option A: [Description]
   - Option B: [Description]
```

### Step 6: Document Implementation Order

Create an ordered checklist showing the recommended sequence:

```markdown
## Implementation Order

1. **Phase 1**: [Phase Name]

   - [ ] Task 1.1: [Name]
   - [ ] Task 1.2: [Name]

2. **Phase 2**: [Phase Name]
   - [ ] Task 2.1: [Name]
```

---

## Frontend Considerations

When grooming features that affect the frontend, consider:

### API Communication

- [ ] Does this require new API client functions?
- [ ] Is authentication required for the endpoints?
- [ ] Is streaming (SSE) needed or standard request/response?
- [ ] What error handling is needed?

### State Management

- [ ] Does this affect global state (Context, Redux, Zustand)?
- [ ] Is local component state sufficient?
- [ ] Should data be cached (localStorage, sessionStorage)?
- [ ] Are there loading/error states to handle?

### Component Architecture

- [ ] Can existing components be reused?
- [ ] Should new components be extracted for reusability?
- [ ] What props/interfaces are needed?
- [ ] Are there accessibility considerations?

### Models and Types

- [ ] What TypeScript interfaces are needed?
- [ ] Do frontend models match backend models?
- [ ] Are there request/response types to create?

### Security

- [ ] Are there API keys or secrets that should NOT be in frontend?
- [ ] Is user authentication checked before operations?
- [ ] Is input validation needed?

### Performance

- [ ] Are there expensive operations that should be debounced?
- [ ] Should data be paginated?
- [ ] Are there unnecessary re-renders to prevent?

---

## Backend Considerations

When grooming features that affect the backend, consider:

### Database Design

- [ ] What tables/columns are needed?
- [ ] Are there foreign key relationships?
- [ ] What constraints are needed (unique, not null)?
- [ ] Is seed data required?
- [ ] Are migrations needed?

### Service Layer

- [ ] What methods does the service need?
- [ ] What is the return type for each method (ApiResponse, ApiResponsePaged)?
- [ ] Is pagination needed for list operations?
- [ ] What validation should happen at the service layer?

### API Endpoints

- [ ] What HTTP methods (GET, POST, PUT, DELETE)?
- [ ] What routes/paths?
- [ ] Is authentication required?
- [ ] What request/response format?
- [ ] Is streaming (SSE) needed?

### Models and Types

- [ ] What TypeScript interfaces are needed?
- [ ] Do they align with database schema?
- [ ] Are there Drizzle ORM types to define?

### Security

- [ ] Is user authentication enforced?
- [ ] Is user authorization checked (can user access this resource)?
- [ ] Are secrets stored safely (environment variables)?
- [ ] Is input sanitized before database operations?

### Error Handling

- [ ] What errors can occur?
- [ ] Are errors logged appropriately?
- [ ] Are user-friendly error messages returned?

### Performance

- [ ] Are database queries efficient?
- [ ] Should queries use indexes?
- [ ] Is caching appropriate?

---

## Plan Document Structure

A complete feature plan document should have:

```markdown
# [Feature Name] Implementation Plan

## Overview

[Brief description of what will be implemented]

### Current State

[What exists today]

### Target State

[What will exist after implementation]

---

## Key Findings

[Analysis of existing code, patterns, dependencies]

---

## Phase 1: [Phase Name]

### Task 1.1: [Task Name]

**Status: TODO**
[Details...]

---

## Implementation Order

[Ordered checklist of all tasks]

---

## Questions

[Numbered list of questions needing clarification]

---

## Files Summary

### Files to Create

| File | Purpose |
| ---- | ------- |

### Files to Modify

| File | Changes |
| ---- | ------- |

### Files to Delete

| File | Reason |
| ---- | ------ |
```

---

## Best Practices

### DO:

- ✅ Read all referenced files before planning
- ✅ Look for existing patterns in the codebase
- ✅ Create atomic, testable tasks
- ✅ Ask questions when requirements are ambiguous
- ✅ Consider security implications
- ✅ Include cleanup tasks for deprecated code
- ✅ Specify exact file paths
- ✅ Include code snippets for complex changes
- ✅ Consider both happy path and error cases

### DON'T:

- ❌ Make assumptions about unclear requirements
- ❌ Create tasks that are too large or vague
- ❌ Forget to check for existing similar implementations
- ❌ Skip the questions section
- ❌ Ignore security or performance considerations
- ❌ Leave deprecated code without cleanup tasks
- ❌ Create plans without understanding current state

---

## Example Task Formats

### Service Method Task

````markdown
### Task 2.1: Add `searchAgents` Method to AgentService

**Status: TODO**

Create a paginated search method in `backend/src/services/agent-skills/AgentService.ts`.

**Method Signature:**

```typescript
search(
  searchTerm: string,
  pageNumber: number,
  pageSize: number,
  userId: string
): Promise<ApiResponsePaged<Agent[]>>
```
````

**Implementation Details:**

- Use `paginatedSelect` utility from `@/db/utils/pagination`
- Filter by `agent_name` or `description` using `ilike`
- Include system agents (where userId = SYSTEM_USER_ID) in results
- Require authentication

**Files Affected:**

- `backend/src/services/agent-skills/AgentService.ts` - Add method

````

### API Endpoint Task
```markdown
### Task 3.1: Add Agent Search Endpoint
**Status: TODO**

Add a new endpoint to `backend/src/index.ts`:

**Endpoint**: `GET /api/agents/search`

**Query Parameters:**
- `q` (required): Search term
- `page` (optional, default: 1): Page number
- `pageSize` (optional, default: 25): Items per page

**Response**: `ApiResponsePaged<Agent[]>`

**Implementation:**
- Require authentication via `ensureUserIsAuthenticated`
- Call `AgentService.search()` with parameters
````

### Frontend Update Task

````markdown
### Task 4.1: Update AgentList to Use Search API

**Status: TODO**

Update `frontend/src/components/AgentList.tsx` to use the new search API.

**Changes:**

1. Import `searchAgents` from `@/services/agentServiceApi`
2. Replace local filtering with API call
3. Add debounce to search input (300ms)
4. Handle loading and error states

**Before:**

```typescript
const filtered = agents.filter((a) => a.name.includes(searchTerm));
```
````

**After:**

```typescript
const { data, pagination } = await searchAgents(searchTerm, page, pageSize);
```

```

```
