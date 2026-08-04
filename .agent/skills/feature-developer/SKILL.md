---
name: Feature Developer
description: Develops features systematically, ensuring they are implemented correctly and efficiently.
---

# Feature Developer Skill

This skill implements features by systematically working through a feature plan, completing tasks one by one, and rigorously verifying each step with type checking, build verification, and testing.

## Overview

The Feature Developer skill takes a feature plan (typically created by the Feature Groom skill) and executes it methodically. For each task, it:

1. **Understands** the task requirements before coding
2. **Implements** the required code changes
3. **Verifies** with multiple checks (typecheck, lint, build, tests)
4. **Reviews** its own changes for correctness
5. **Validates** in the browser when applicable
6. **Documents** all verification evidence
7. **Updates** task status to **DONE** only when ALL checks pass

---

## Execution Process

### Step 0: Initialize Session

1. **Read the feature plan file** at the provided path
2. **Parse and list all tasks** with their current status
3. **Verify dev environment is ready:**
   - Check that dev servers are running (frontend/backend)
   - Verify the codebase builds cleanly before starting
   - Run baseline typecheck and note any pre-existing errors
4. **Create/Update the Plan Progress section** with session start
5. **Log baseline state** (existing errors, test status)

```markdown
## Plan Progress

### Session: [YYYY-MM-DD HH:MM]

**Started:** [Timestamp]
**Baseline State:**

- Typecheck errors before starting: [count]
- Build status: [pass/fail]
- Test status: [X passing, Y failing]
```

---

## Task Execution Loop

For each incomplete task (Status: TODO or IN_PROGRESS), execute these mandatory phases:

### Phase A: Pre-Implementation (REQUIRED)

Before writing any code, complete this checklist:

#### A.1 Understanding Verification

- [ ] Read the COMPLETE task description
- [ ] Identify ALL files listed in "Files Affected"
- [ ] View each affected file to understand current state
- [ ] Identify the specific changes required
- [ ] Check for related tests that may need updating

#### A.2 Context Gathering

- [ ] Find existing patterns in the codebase for similar functionality
- [ ] Identify dependencies this change may affect
- [ ] Note any imports or types that will be needed
- [ ] Review any related documentation

#### A.3 Pre-Implementation Confirmation

Log this in Plan Progress before proceeding:

```markdown
#### Task [X.Y]: Pre-Implementation Review

**Understanding:**

- What I will change: [brief description]
- Files I will modify: [list]
- Files I will create: [list if any]
- Related patterns found in: [file references]

**Potential Risks:**

- [Any identified risks or dependencies]

**Ready to implement:** Yes
```

**DO NOT proceed to implementation until this is logged.**

---

### Phase B: Implementation

Execute the code changes as specified in the task.

#### B.1 Implementation Rules

- Make changes incrementally (one file at a time when possible)
- Follow existing code patterns exactly
- Add appropriate TypeScript types (never use `any`)
- Include proper error handling
- Add comments for complex logic

#### B.2 After Each File Change

Immediately run typecheck:

```bash
cd frontend && npm run typecheck  # For frontend files
cd backend && npm run typecheck   # For backend files
```

**If typecheck fails:**

1. STOP implementing new changes
2. Fix the type error immediately
3. Re-run typecheck until it passes
4. Then continue implementation

---

### Phase C: Verification Gate (MANDATORY)

After implementation is complete, ALL of these checks must pass before marking the task as DONE.

#### C.1 Typecheck Verification

```bash
# Run typecheck for affected packages
cd frontend && npm run typecheck
cd backend && npm run typecheck
```

**Acceptance Criteria:**

- [ ] Zero new typecheck errors introduced
- [ ] Any pre-existing errors are unchanged

#### C.2 Lint Verification

```bash
# Run linter for affected packages
cd frontend && npm run lint
cd backend && npm run lint
```

**Acceptance Criteria:**

- [ ] Zero new lint errors introduced
- [ ] No warnings that indicate problems (unused vars, etc.)

#### C.3 Build Verification

```bash
# Build the affected packages
cd frontend && npm run build
cd backend && npm run build
```

**Acceptance Criteria:**

- [ ] Build completes successfully
- [ ] No build warnings that indicate problems

#### C.4 Test Verification (If Applicable)

```bash
# Run tests for affected packages
cd frontend && npm run test
cd backend && npm run test
```

**Acceptance Criteria:**

- [ ] All existing tests still pass
- [ ] Any new tests added are passing
- [ ] No test regressions

---

### Phase D: Self-Review (MANDATORY)

Before marking complete, perform a self-review of all changes:

#### D.1 Code Review Checklist

- [ ] **Correctness**: Does the code do what the task requires?
- [ ] **Completeness**: Are ALL requirements from the task addressed?
- [ ] **Types**: Are all types properly defined (no `any`, no implicit any)?
- [ ] **Error Handling**: Are errors handled appropriately?
- [ ] **Edge Cases**: Are edge cases considered?
- [ ] **Imports**: Are all imports correct and necessary?
- [ ] **No Debug Code**: No console.logs or debug statements left behind?
- [ ] **Naming**: Are variables/functions named clearly?

#### D.2 Regression Check

- [ ] **Related Features**: Does existing related functionality still work?
- [ ] **No Breaking Changes**: Are there any unintended API changes?
- [ ] **Dependencies**: Are all dependencies properly imported?

#### D.3 File Verification

For each modified file, verify:

- [ ] File saved correctly
- [ ] No syntax errors
- [ ] Changes match task requirements

---

### Phase E: Browser Verification (For UI Tasks)

For any task that affects the frontend UI:

#### E.1 Visual Verification

1. Open the browser to the affected page/component
2. Verify the changes are visible
3. Check responsive behavior if applicable

#### E.2 Functional Verification

1. Test the happy path (expected user flow)
2. Test error states (what happens on failure?)
3. Test edge cases (empty states, long text, etc.)

#### E.3 Console Check

1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests

**Acceptance Criteria:**

- [ ] No console errors related to changes
- [ ] No failed network requests
- [ ] UI renders correctly
- [ ] Functionality works as expected

---

### Phase F: Completion

Only after ALL phases pass:

#### F.1 Update Task Status

Change the task status in the plan file:

```markdown
**Status: DONE**
```

#### F.2 Log Verification Evidence

Add verification evidence to Plan Progress:

```markdown
#### Task [X.Y]: Verification Evidence

**Implementation Completed:** [timestamp]

**Verification Results:**

- [x] Typecheck: PASSED (0 errors)
- [x] Lint: PASSED (0 warnings)
- [x] Build: PASSED
- [x] Tests: PASSED (X tests)
- [x] Self-Review: PASSED
- [x] Browser: PASSED (if applicable)

**Files Changed:**

- `path/to/file1.ts` - [brief description of changes]
- `path/to/file2.ts` - [brief description of changes]

**Verification Notes:**

- [Any observations or decisions made during verification]
```

**DO NOT mark a task as DONE without logging verification evidence.**

---

## Failure Handling

### If Any Verification Fails

1. **DO NOT mark the task as DONE**
2. **Log the failure:**

```markdown
#### Task [X.Y]: Verification FAILED

**Failed Check:** [typecheck/lint/build/test/browser]
**Error Details:**
```

[paste error output]

```

**Root Cause:** [analysis of why it failed]
**Fix Applied:** [what you did to fix it]
```

3. **Fix the issue**
4. **Re-run ALL verification checks from Phase C**
5. **Only proceed when all checks pass**

### If Fix Attempts Fail

If you cannot fix the issue after 3 attempts:

1. Mark task status as **BLOCKED**
2. Log detailed error information in Plan Progress
3. Document what was tried
4. Move to the next task (if not dependent)
5. Flag for user attention

```markdown
#### Task [X.Y]: BLOCKED

**Reason:** [description of blocker]
**Attempts Made:**

1. [attempt 1]
2. [attempt 2]
3. [attempt 3]

**Requires:** [what is needed to unblock]
```

---

## Regression Prevention

### Before Each Task

Check that no regressions exist from previous tasks:

```bash
# Quick sanity check
npm run typecheck  # All packages
npm run build      # All packages
```

### After Each Task

Verify the entire system still works:

1. Typecheck passes for all packages
2. Build succeeds for all packages
3. Dev servers still running without errors
4. Previously completed features still work

### If Regression Detected

1. **STOP immediately**
2. **Identify** which previous task caused the regression
3. **Fix** the regression before continuing
4. **Document** the regression and fix in Plan Progress

---

## Final Verification (After All Tasks Complete)

When all tasks are marked DONE, perform comprehensive verification:

### Final Checklist

```markdown
## Final Verification

**Date:** [timestamp]

### Full Verification Suite

- [ ] Full typecheck all packages: `npm run typecheck`
- [ ] Full lint all packages: `npm run lint`
- [ ] Full build all packages: `npm run build`
- [ ] Full test suite: `npm run test`

### Integration Verification

- [ ] Start fresh dev servers (restart both)
- [ ] Verify all new features work end-to-end
- [ ] Verify existing features still work
- [ ] Check browser console for any errors

### Verification Evidence

**Typecheck Output:**
```

[paste output showing 0 errors]

```

**Build Output:**
```

[paste output showing success]

```

**Browser Console:**
- No errors: [Yes/No]
- No warnings: [Yes/No]

### Final Status: [COMPLETE / ISSUES FOUND]
```

---

## Task Status Reference

| Status          | Meaning                                             |
| --------------- | --------------------------------------------------- |
| **TODO**        | Task not started                                    |
| **IN_PROGRESS** | Task actively being worked on                       |
| **DONE**        | Task complete AND all verifications passed          |
| **BLOCKED**     | Task cannot proceed, requires intervention          |
| **SKIPPED**     | Task intentionally skipped (with documented reason) |

**IMPORTANT:** A task is only DONE when:

1. Implementation is complete
2. Typecheck passes
3. Lint passes
4. Build passes
5. Tests pass (if applicable)
6. Self-review passes
7. Browser verification passes (if UI task)
8. Verification evidence is logged

---

## Verification Commands Reference

### TypeScript Type Checking

```bash
# Check specific package
cd frontend && npm run typecheck
cd backend && npm run typecheck

# Or using tsc directly
npx tsc --noEmit
```

### Linting

```bash
# Check specific package
cd frontend && npm run lint
cd backend && npm run lint

# Auto-fix if available
npm run lint -- --fix
```

### Building

```bash
# Build specific package
cd frontend && npm run build
cd backend && npm run build
```

### Testing

```bash
# Run tests
cd frontend && npm run test
cd backend && npm run test

# Run specific test file
npm run test -- path/to/test.ts
```

---

## Common Issues and Solutions

### Typecheck Errors

| Error Type                             | Solution                                |
| -------------------------------------- | --------------------------------------- |
| Cannot find module                     | Check import path, may need `@/` alias  |
| Type 'X' is not assignable to type 'Y' | Review types, add proper typing         |
| Property does not exist on type        | Add property to interface or fix access |
| Implicit 'any' type                    | Add explicit type annotation            |

### Build Errors

| Error Type       | Solution                              |
| ---------------- | ------------------------------------- |
| Module not found | Check file exists, verify import path |
| Syntax error     | Review code for typos                 |
| Cannot find name | Check imports, may be missing         |

### Browser Errors

| Error Type                 | Solution                         |
| -------------------------- | -------------------------------- |
| 404 Not Found              | Check API endpoint path          |
| CORS error                 | Check backend CORS configuration |
| React error                | Check component props and state  |
| Undefined is not an object | Check for null/undefined values  |

---

## Plan Progress Template

Maintain this section at the bottom of every feature plan file:

```markdown
---

## Plan Progress

### Session: [YYYY-MM-DD HH:MM]

**Started:** [Timestamp]
**Status:** In Progress | Complete

**Baseline State:**
- Pre-existing typecheck errors: [count]
- Pre-existing build issues: [none/description]

---

#### Task 1.1: [Task Name]

**Pre-Implementation Review:**

- Understanding confirmed: [Yes]
- Files to modify: [list]
- Patterns referenced: [list]

**Implementation Started:** [timestamp]
**Implementation Completed:** [timestamp]

**Verification Results:**

- [x] Typecheck: PASSED
- [x] Lint: PASSED
- [x] Build: PASSED
- [ ] Tests: N/A
- [x] Self-Review: PASSED
- [ ] Browser: N/A

**Files Changed:**

- `path/file.ts` - Added X method

**Status: DONE**

---

#### Task 1.2: [Task Name]

[Continue for each task...]

---

### Final Verification

**Completed:** [timestamp]

- [x] Full typecheck: 0 errors
- [x] Full build: Success
- [x] All features verified

### Summary

[Brief summary of what was accomplished]
```

---

## Quick Reference

### Task Execution Flow

```
READ Task → PRE-IMPLEMENTATION → IMPLEMENT → VERIFY → SELF-REVIEW → BROWSER → LOG → DONE
     ↑                                   ↓
     └────────── FIX & RETRY ←───────────┘
```

### Mandatory Checkpoints

1. ✅ Pre-implementation review logged
2. ✅ Typecheck after each file change
3. ✅ All verification checks pass
4. ✅ Self-review completed
5. ✅ Browser verification (if UI)
6. ✅ Evidence logged to Plan Progress
7. ✅ Status updated to DONE

### Red Flags (Stop and Fix)

- 🚫 Typecheck errors
- 🚫 Lint errors
- 🚫 Build failures
- 🚫 Test failures
- 🚫 Console errors in browser
- 🚫 404 or network errors
- 🚫 Previous features broken

---

## Integration with Other Skills

- **Feature Groom**: Creates the plan → Feature Developer executes it
- **TypeScript Typecheck Fix**: Use if typecheck issues are complex
- **ESLint Fix**: Use if many lint issues need resolution
