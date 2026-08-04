# Unused Code Cleanup - Testing Playbook

This playbook defines the rigorous verification steps required after removing unused code.
**Goal**: Ensure no runtime breakages, missing assets, or logic errors were introduced by the cleanup.

## Phase 1: Static & Build Verification (The Compiler)

Before even opening a browser, the code must compile and build.

### 1.1 Type Check

Run the TypeScript compiler to catch deleted types or interfaces that are still referenced.

```bash
npm run typecheck
# OR if no script exists:
npx tsc --noEmit
```

- **Pass Criteria**: Exit code 0, no errors.
- **Failure Action**: If types are missing, restore the type definition or remove the dangling reference.

### 1.2 Lint Check

Verify no broken imports or unused variables were _exposed_ by the cleanup.

```bash
npm run lint
```

- **Pass Criteria**: No "Module not found" or "Variable defined but never used" errors.

### 1.3 Production Build

Simulate a production deploy. This often catches detailed bundling issues that dev mode misses.

```bash
npm run build
```

- **Pass Criteria**: Build completes successfully. `dist/` or `build/` folder is generated.

---

## Phase 2: Runtime Verification (The Browser)

### 2.1 Launch Application

Start the local development server.

```bash
npm run dev
```

- Open your browser (Chrome/Edge/Firefox) to the local URL (e.g., `http://localhost:3000`).
- **Open Developer Tools (F12)** and switch to the **Console** tab. Keep this open at all times.

### 2.2 Home Page Verification

1.  **Action**: Load the Home Page.
2.  **Verify**:
    - Content renders (no blank white screen).
    - Images/Icons load (no broken image placeholders).
    - **Console Check**: Strict check for `Uncaught Error` or `404 Not Found`.
3.  **Fixing Errors**:
    - _If Component Missing_: Revert the deletion of that component.
    - _If Style Missing_: Check if you deleted a Tailwind class or CSS file that was dynamically used.

### 2.3 Authentication Flow

1.  **Action**: Click "Sign In" / "Login".
2.  **Action**: Enter valid credentials and submit.
3.  **Verify**:
    - Successful redirect to the Dashboard/Landing page.
    - Auth state persists (refresh the page and ensure still logged in).

### 2.4 Navigation Walkthrough (Critical Path)

Iterate through the **Top Navigation Bar** links:

1.  **Link 1**: Click the first nav item.
    - _Verify_: Page transition occurs.
    - _Verify_: Content loads correctly.
    - _Verify_: No red errors in Console.
2.  **Link 2**: Click the second nav item.
    - ... (Repeat verification)
3.  **Link 3**: Click the third nav item.
    - ... (Repeat verification)

### 2.5 Console Audit

After clicking through all major links:

1.  Look at the Console one last time.
2.  **Warning vs Error**:
    - _Warnings_ (Yellow): Acceptable for now (e.g., unique key props), unless they were caused by your changes.
    - _Errors_ (Red): **Zero Tolerance**. Any new red error means the cleanup was destructive. Revert and investigate.

---

## Phase 3: Sign-Off

- [ ] Typecheck Passed
- [ ] Build Passed
- [ ] Home Page Loads (No Console Errors)
- [ ] Login Successful
- [ ] All Top Nav Links Clickable & Error-Free
