---
trigger: always_on
---

# Import Rules

## Always Use Absolute Path Aliases

**ALWAYS use absolute path aliases (`@/`) instead of relative imports (`./` or `../`).**

### ✅ Correct

```typescript
import { Button } from "@/components/ui/button";
```

### ❌ Incorrect

```typescript
import { Button } from "../../components/ui/button";
```

## Benefits

- **Consistency**: All imports follow the same pattern
- **Refactoring**: Moving files doesn't break imports
- **Readability**: Clear where imports come from
- **No deep nesting**: No `../../../` chains

## Path Alias Configuration

The project is configured with the `@/` path alias pointing to `src/`:

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## Finding & Fixing Relative Imports

### Search Commands

Use grep/ripgrep to find all relative import statements:

```bash
# Find imports starting with ./
grep -r "from ['\"]\./" --include="*.ts" --include="*.tsx" src/

# Find imports starting with ../
grep -r "from ['\"]\.\./" --include="*.ts" --include="*.tsx" src/
```

### Categorize Findings

Group the results by:

- **Same-directory imports** (`./Component`)
- **Parent-directory imports** (`../utils/helper`)
- **Deep relative imports** (`../../services/api`) - **Always fix these**

### When Relative Imports Are Acceptable

Some relative imports may be acceptable in rare cases:

- ✅ **Co-located test files** (e.g., `Component.test.tsx` importing `./Component`)
- ❌ **Cross-feature imports** - MUST use path aliases
- ❌ **Service/utility imports** - MUST use path aliases
- ❌ **Model imports** - MUST use path aliases

## No Barrel Imports (index.ts)

**DO NOT use `index.ts` or `index.js` files to aggregate exports (barrel files).**

### ❌ Incorrect (Barrel Pattern)

```typescript
// src/components/ui/index.ts
export * from "./button";
export * from "./card"; // ❌ AVOID THIS

// usage
import { Button, Card } from "@/components/ui"; // ❌ BAD
```

### ✅ Correct (Direct Usage)

```typescript
// usage
import { Button } from "@/components/ui/button"; // ✅ GOOD
import { Card } from "@/components/ui/card"; // ✅ GOOD
```

### Rationale

- **Tree Shaking**: Direct imports facilitate better tree shaking.
- **Circular Dependencies**: Barrel files drastically increase the risk of circular dependency loops.
- **Build Performance**: Direct imports are faster to resolve for build tools.

---

## ESLint Enforcement

Add to `.eslintrc.json` to enforce path aliases:

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          {
            "group": ["../*"],
            "message": "Use path aliases (@/) instead of relative imports"
          }
        ]
      }
    ]
  }
}
```

---

## Import Organization

Organize imports in this order with section comments:

```typescript
// React/state
import React, { useState, useEffect } from "react";

// Navigation
import { useNavigate } from "react-router-dom";

// Icons
import { Plus, Trash2, Edit2 } from "lucide-react";

// Animations
import { motion } from "framer-motion";

// Components
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

// Context
import { useNetwork } from "@/contexts/NetworkContext";

// Services
import { generateNetwork } from "@/services/networkService";

// Models/Types
import type { NetworkNode } from "@/models/network/NetworkNode";

// Utils
import { cn } from "@/lib/utils";
```
