---
trigger: always_on
---

# Browser Testing Protocols

ALWAYS test your work if you make frontend changes using the chrome browser if the changes may cause breakages.

## 1. Browser Tool Usage

- **Tool**: Always use the chrome browser tool (`browser_subagent`) for front-end testing.
- **Environment**: The primary local testing environment is `http://localhost` and you need to confirm the port number or use 3000 as the default.

## 2. Authentication Workflow (STRICT)

When a test requires a signed-in session, you MUST follow this precise sequence to handle authentication securely:

### Step 1: Navigation and Email Entry

1.  **Navigate** to the sign-in URL: `http://localhost:3000/signin`.
2.  **Enter Email**: Input the test email address:
    - **Email**: `GET THIS FROM USER OR ASK THEM TO PROVIDE IT`

### Step 2: MANDATORY PAUSE

3.  **STOP**: Do **NOT** attempt to enter a password. Do **NOT** submit the form.
4.  **Communication**: Return control to the user and explicitly state that you have entered the email and are waiting for them to enter the password.
    - **Password**: `[LET USER ENTER THIS]`

### Step 3: Resuming

5.  **Wait**: Do NOT proceed until the user confirms they have authenticated.
6.  **Resume**: Once the user confirms they are signed in, you may proceed with the remaining test steps.

## 3. Testing Best Practices

- **Visual Verification**: Always capture screenshots to verify the state of the UI at critical steps (e.g., after navigation, before an interaction, and upon observing a bug).
- **DOM Inspection**: Use DOM inspection to validate the presence of elements when visual evidence is insufficient (e.g., checking `src` attributes, hidden inputs, or specific text content).
- **Console Logs**: Capture console logs when diagnosing functional issues (e.g., blank screens, failed interactions) to identify JavaScript errors or network failures.
