---
name: Code Steward
description: Comprehensive codebase stewardship skill that combines import checking, typecheck fixing, and eslint fixing into a single unified workflow.
author: System
version: 1.0.0
skillType: maintenance
---

# Code Steward Skill

## Purpose

The **Code Steward** skill is a unified codebase maintenance workflow. It combines three critical maintenance tasks into a single, systematic process to ensure codebase health:

1.  **File Import Checking**: Enforcing absolute path aliases.
2.  **Typecheck Fixing**: Resolving TypeScript compilation errors.
3.  **ESLint Fixing**: Ensuring code quality and style compliance.

## When to Use

- Before submitting a Pull Request.
- When performing a general codebase cleanup.
- If the codebase feels "brittle" or has accumulated technical debt.
- To enforce project standards systematically.

---

## Stewardship Process

Execute the following phases in order. Do not proceed to the next phase until the current phase is complete (or explicitly skipped for a valid reason).

### Phase 1: Import Structure & Aliases

**Goal**: Ensure all imports use the correct path aliases (e.g., `@/`) instead of relative paths (e.g., `../../`), except where relative imports are acceptable.

1.  **Search for Relative Imports**:
    Use `grep` or `ripgrep` to identify relative imports:

    ```bash
    # Find imports starting with ./ (Acceptable in same directory/index files)
    grep -r "from ['\"]\./" --include="*.ts" --include="*.tsx" src/

    # Find imports starting with ../ (Prefer aliases)
    grep -r "from ['\"]\.\./" --include="*.ts" --include="*.tsx" src/
    ```

2.  **Analyze & Fix**:
    - **Acceptable**: Same-directory imports (`./Component`), co-located test/style files.
    - **Fix Required**:
      - Deep relative imports (`../../services/api`) -> Change to `@/services/api`.
      - Cross-feature imports -> Change to `@/features/...`.
      - Service/Utility imports -> Change to `@/utils/...` or `@/services/...`.

3.  **Validate**: ensure no critical relative import violations remain.

---

### Phase 2: Type System Integrity

**Goal**: Achieve a clean TypeScript compilation with zero errors (`tsc --noEmit`).

1.  **Assessment**:
    Run the typechecker to see the current state:

    ```bash
    # For frontend
    cd frontend && npm run typecheck
    # For backend
    cd backend && npm run typecheck
    ```

2.  **Critical Fixes**:
    - **Missing Types**: Add interfaces or types where implicit `any` is being inferred.
    - **Type Mismatches**: Fix logic errors where incorrect types are passed to functions.
    - **Generic Constraints**: Ensure generic types satisfy their constraints.

3.  **Complex Resolution**:
    - If a type error is due to a design flaw, refactor the code (minimal impact) to satisfy the type system.
    - **Avoid `any`**: Use `unknown` or specific types/unions instead of `any` whenever possible.

4.  **Verification**: Re-run `npm run typecheck` to confirm 0 errors.

---

### Phase 3: Code Quality & Linting

**Goal**: Achieve 0 ESLint/Biome violations.

1.  **Assessment**:
    Catalog current violations:

    ```bash
    bunx turbo lint
    # OR
    cd frontend && npm run lint
    cd backend && npm run lint
    ```

2.  **Auto-Fix**:
    Apply automatic fixes for simple style issues:

    ```bash
    npm run lint -- --fix
    ```

3.  **Manual Remediation**:
    - Address complex rules (e.g., `react-hooks/exhaustive-deps`, `no-unused-vars`).
    - **Rule of Thumb**: Fix the code, do not disable the rule (unless it's a false positive).

4.  **Final Validation**:
    Ensure the linter runs clean.

---

## Output & Reporting

After completing the stewardship cycle, provide a summary:

```markdown
# Code Stewardship Report

## Phase 1: Imports

- [x] Converted X relative imports to aliases.
- [ ] Remaining acceptable relative imports: Y.

## Phase 2: Types

- [x] Fixed X compilation errors.
- [x] Current Status: PASSING (0 errors).

## Phase 3: Linting

- [x] Auto-fixed X violations.
- [x] Manually fixed Y violations.
- [x] Current Status: PASSING (0 errors).
```

## Best Practices

- **Atomic Commits**: If possible, commit changes after _each phase_ to keep the history clean.
- **Run Tests**: After all phases are done, run the full test suite (`npm run test`) to ensure no regressions were introduced.
- **Don't Guess**: If a type error or import path is ambiguous, check the file structure or adjacent files for context.
