---
name: Feature Grooming and Development
description: Detailed workflow to groom a feature request into a plan with detailed tasks and then systematically implement it and update the task status as work progresses from TODO to DONE.
author: System
version: 1.0.0
skillType: development
---

1. **Initialize Feature Grooming**
   - Use `view_file` to read the Feature Groom skill at `.agent/skills/feature-groom/SKILL.md`.
   - Adhere strictly to the "Feature Grooming Process".
   - **Goal:** Produce or validate a comprehensive markdown implementation plan (e.g., in `docs/planning/` or as specified by the user).
   - Ensure the plan covers:
     - Current vs. Target state.
     - Database/API/Frontend changes.
     - Atomic, sequential tasks.
     - Verification steps for each task.

2. **Wait for Plan Approval**
   - If a new plan was created, present it to the user.
   - Ensure all "Questions" are answered.
   - **STOP** and ask for user confirmation to proceed to development.

3. **Initialize Feature Development**
   - Use `view_file` to read the Feature Developer skill at `.agent/skills/feature-developer/SKILL.md`.
   - Initialize the "Plan Progress" section in the plan file if missing (as defined in "Step 0: Initialize Session" of the skill).

4. **Execute Development Cycle (Repeat for each task)**
   - Follow the "Task Execution Loop" from the Feature Developer skill for every task:
     - **Phase A (Pre-Implementation):** Read task, understand files, and log "Pre-Implementation Review" in the plan.
     - **Phase B (Implementation):** Write code incrementally. Run typecheck after _every_ file change.
     - **Phase C (Verification):** Run full Typecheck, Lint, and Build. MUST PASS before proceeding.
     - **Phase D (Self-Review):** Verify correctness, types, and logic.
     - **Phase E (Browser Verification):** If UI is involved, verify visually and checks console/network.
     - **Phase F (Completion):** Update task status to **DONE** and log "Verification Evidence".

5. **Final Verification**
   - Once all tasks are DONE, perform the "Final Verification" step from the Feature Developer skill.
   - Run full suite: typecheck, lint, build, test.
   - Verify the entire feature end-to-end.
