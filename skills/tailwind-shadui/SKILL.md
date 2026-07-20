---
name: "Tailwind & Shadcn UI Integration Rules"
description: "Build consistent, accessible UI components with Tailwind CSS v4, shadcn/ui, and custom design tokens. Apply when styling components, creating design systems, implementing responsive layouts, or optimizing CSS performance."
allowed-tools: Read, Write, Edit
version: 2.0.0
---

# Tailwind & Shadcn UI Integration Rules

This document outlines the coding standards, rules, and best practices for using Tailwind CSS v4 and shadcn/ui in the project.

## 1. Design System & Theming

### CSS variables

With Tailwind v4, design tokens live in the global CSS file (e.g., `globals.css` or `index.css`) as CSS variables and are registered with `@theme inline` so they become utilities. Colors can be HSL, OKLCH, or any CSS-supported format.

**Key theme variables:**

- **Backgrounds**: `--background`, `--card`, `--popover`, `--muted`.
- **Foregrounds**: `--foreground`, `--card-foreground`, `--muted-foreground`.
- **Primary/Accent**: `--primary`, `--primary-foreground`, `--secondary`, `--accent`.
- **Borders/Inputs**: `--border`, `--input`, `--ring`.
- **Sidebar**: `--sidebar-background`, `--sidebar-foreground`, `--sidebar-primary`, etc.

```css
@import "tailwindcss";
@plugin "tailwindcss-animate";

@custom-variant dark (&:is(.dark *));

:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(0 0% 3.9%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(0 0% 3.9%);
  --popover: hsl(0 0% 100%);
  --popover-foreground: hsl(0 0% 3.9%);
  --primary: hsl(222.2 47.4% 11.2%);
  --primary-foreground: hsl(210 40% 98%);
  --secondary: hsl(210 40% 96.1%);
  --secondary-foreground: hsl(222.2 47.4% 11.2%);
  --muted: hsl(210 40% 96.1%);
  --muted-foreground: hsl(215.4 16.3% 46.9%);
  --accent: hsl(210 40% 96.1%);
  --accent-foreground: hsl(222.2 47.4% 11.2%);
  --destructive: hsl(0 84.2% 60.2%);
  --destructive-foreground: hsl(210 40% 98%);
  --border: hsl(214.3 31.8% 91.4%);
  --input: hsl(214.3 31.8% 91.4%);
  --ring: hsl(222.2 84% 4.9%);
  --radius: 0.5rem;
}

.dark {
  --background: hsl(222.2 84% 4.9%);
  --foreground: hsl(210 40% 98%);
  --card: hsl(222.2 84% 4.9%);
  --card-foreground: hsl(210 40% 98%);
  --popover: hsl(222.2 84% 4.9%);
  --popover-foreground: hsl(210 40% 98%);
  --primary: hsl(210 40% 98%);
  --primary-foreground: hsl(222.2 47.4% 11.2%);
  --secondary: hsl(217.2 32.6% 17.5%);
  --secondary-foreground: hsl(210 40% 98%);
  --muted: hsl(217.2 32.6% 17.5%);
  --muted-foreground: hsl(215 20.2% 65.1%);
  --accent: hsl(217.2 32.6% 17.5%);
  --accent-foreground: hsl(210 40% 98%);
  --destructive: hsl(0 62.8% 30.6%);
  --destructive-foreground: hsl(210 40% 98%);
  --border: hsl(217.2 32.6% 17.5%);
  --input: hsl(217.2 32.6% 17.5%);
  --ring: hsl(212.7 26.8% 83.9%);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Theme handling

- **Dark Mode**: Use the `.dark` class on the root element. Add `@custom-variant dark (&:is(.dark *));` to the global CSS so `dark:` utilities toggle with the class.
- **Tailwind Config**: Tailwind v4 is CSS-first. Define design tokens in the global CSS file using `@theme inline` instead of `tailwind.config.ts`.
- **Color Format**: Use HSL or OKLCH. OKLCH is the shadcn/ui v4 default, but HSL still works.

**Rule**: Always use standard semantic utility classes:

- `bg-background`
- `text-foreground`
- `border-border`

---

## 2. Component Usage Rules

### Standard UI Components

All UI elements (inputs, buttons, cards, dialogs) **MUST** use the shadcn/ui components located in `@/components/ui`. Avoid using native HTML elements directly for interactive controls.

**Mappings:**

- `input` -> `<Input />` (from `@/components/ui/input`)
- `textarea` -> `<Textarea />` (from `@/components/ui/textarea`)
- `select` -> `<Select />` (from `@/components/ui/select`)
- `checkbox` -> `<Checkbox />` (from `@/components/ui/checkbox`)
- `button` -> `<Button />` (from `@/components/ui/button`)

### Class Merging

Use the `cn()` utility from `@/lib/utils` when applying conditional classes or merging custom styles with component defaults.

```tsx
import { cn } from "@/lib/utils";
<div className={cn("p-4", isSelected && "bg-primary")} />;
```

---

## 3. Automation & Setup

### Component installation

Install shadcn/ui components with the official CLI. New components are Tailwind v4-ready and use the `@theme inline` tokens.

```bash
npx shadcn@latest add button
```

---

## 4. Rules for Future Development

1. **Do not create custom color aliases**: If you need a color, verify if a standard semantic token (e.g., `muted`, `accent`, `card`) fits. If not, define it in `:root` and register it under `@theme inline` (e.g., `--color-warning: var(--warning);`), but prefer existing tokens.
2. **Use Components First**: Before writing `<input className="...">`, check if a component in `@/components/ui` exists.
3. **Check Dark Mode**: Always verify new UI additions in dark mode. If using standard utilities (`bg-background`, `text-foreground`), it should work automatically.
4. **Keep `globals.css` Clean**: Only add global styles if absolutely necessary. Prefer utility classes.

# Tailwind CSS Design System

Systematic Tailwind CSS v4 usage with component patterns, design tokens, and shadcn/ui integration.

## Overview

This skill enforces:

- CSS-first Tailwind configuration
- Semantic design tokens and `@theme inline`
- Component composition patterns
- shadcn/ui integration
- Responsive design (mobile-first)
- Dark mode support
- Performance optimization

Apply when styling components, building design systems, or implementing responsive layouts.

## Tailwind Configuration

### CSS-first theme configuration

Tailwind v4 uses CSS-based configuration. Define custom design tokens in the global CSS file with `@theme inline`. Content is detected automatically; use `@source` only if the default scan misses files.

```css
@import "tailwindcss";
@plugin "tailwindcss-animate";
@source "../node_modules/@acme/ui/**/*.tsx";

@theme inline {
  /* Colors */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-900: #1e3a8a;
  --color-secondary-500: #8b5cf6;
  --color-secondary-600: #7c3aed;

  /* Spacing */
  --spacing-18: 4.5rem;
  --spacing-22: 5.5rem;

  /* Font sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;

  /* Fonts */
  --font-sans: "Inter", "system-ui", "sans-serif";
  --font-mono: "JetBrains Mono", "monospace";

  /* Border radius */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;

  /* Shadows */
  --box-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --box-shadow-glass: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
```

## Component Patterns

### Button Component

```tsx
// components/ui/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-11 px-8 text-lg',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="mr-2">Loading...</span>}
      {children}
    </button>
  );
}

// Usage
<Button variant="default" size="md">Submit</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button variant="danger" loading>Delete</Button>
```

### Card Component

```tsx
// components/ui/Card.tsx
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: CardProps) {
  return (
    <h3 className={cn("text-2xl font-semibold", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

// Usage
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
</Card>;
```

## Responsive Design (Mobile-First)

```tsx
// GOOD: Mobile-first responsive design
<div className="
  flex flex-col       // Mobile: stack vertically
  md:flex-row         // Tablet: horizontal layout
  lg:gap-8            // Desktop: larger spacing
">
  <aside className="
    w-full            // Mobile: full width
    md:w-64           // Tablet: fixed sidebar width
  ">
    Sidebar
  </aside>
  <main className="
    w-full            // Mobile: full width
    md:flex-1         // Tablet+: flexible main content
  ">
    Content
  </main>
</div>

// GOOD: Responsive typography
<h1 className="
  text-2xl          // Mobile: smaller
  md:text-3xl       // Tablet: medium
  lg:text-4xl       // Desktop: larger
  font-bold
">
  Heading
</h1>

// GOOD: Responsive padding
<section className="
  p-4              // Mobile: smaller padding
  md:p-6           // Tablet: medium padding
  lg:p-8           // Desktop: larger padding
">
  Content
</section>
```

## Dark Mode Support

```css
/* globals.css */
@import "tailwindcss";
@plugin "tailwindcss-animate";

@custom-variant dark (&:is(.dark *));
```

```tsx
// Theme toggle
("use client");

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="bg-background text-foreground p-2 rounded-md"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}
```

## Glassmorphism Pattern

```tsx
<div className="
  relative
  rounded-xl
  bg-white/10
  backdrop-blur-lg
  border border-white/20
  shadow-glass
  p-6
">
  Glass card content
</div>
```

```css
@theme inline {
  --box-shadow-glass: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
```

## Form Components

```tsx
// components/ui/Input.tsx
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        className={cn(
          "w-full rounded-md border border-input bg-background px-3 py-2",
          "focus:outline-none focus:ring-2 focus:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus:ring-destructive",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}

// Usage
<Input placeholder="Email" error={errors.email} />;
```

## Layout Patterns

### Container

```tsx
<div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">Content</div>
```

### Grid

```tsx
<div
  className="
  grid
  grid-cols-1         // Mobile: 1 column
  md:grid-cols-2      // Tablet: 2 columns
  lg:grid-cols-3      // Desktop: 3 columns
  gap-4
"
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Flexbox

```tsx
<div className="flex items-center justify-between">
  <span>Left</span>
  <span>Right</span>
</div>
```

## Performance Optimization

### Automatic content detection

Tailwind v4 scans your project automatically for class usage. Add `@source` only if classes are in paths the scanner does not detect.

```css
@import "tailwindcss";
@source "../shared-components/**/*.tsx";
```

### Use `@utility` for custom utilities

```css
/* app/globals.css */
@utility btn-primary {
  @apply bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90;
}
```

## Anti-Patterns

```tsx
// BAD: Inline styles instead of Tailwind
<div style={{ backgroundColor: 'blue', padding: '16px' }}>
  Content
</div>

// GOOD: Use Tailwind classes
<div className="bg-blue-500 p-4">
  Content
</div>

// BAD: Magic numbers
<div className="mt-[23px] w-[347px]">
  Content
</div>

// GOOD: Use spacing scale
<div className="mt-6 w-80">
  Content
</div>

// BAD: Non-responsive
<div className="w-96 p-8">
  Content
</div>

// GOOD: Responsive
<div className="w-full md:w-96 p-4 md:p-8">
  Content
</div>

// BAD: Desktop-first
<div className="lg:flex-row flex-col">
  Content
</div>

// GOOD: Mobile-first
<div className="flex-col lg:flex-row">
  Content
</div>
```

## Utility Function

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage: Merge classes safely
<div className={cn("bg-blue-500", className)}>Content</div>;
```

## Verification Before Production

- [ ] Tailwind configured with `@theme inline` in the global CSS
- [ ] Mobile-first responsive design
- [ ] Component variants defined with CVA
- [ ] Dark mode support implemented
- [ ] Forms accessible with labels
- [ ] Performance optimized (automatic scan enabled; `@source` added only if needed)
- [ ] No inline styles (use Tailwind)
- [ ] Consistent spacing scale used
- [ ] Color contrast meets WCAG AA
- [ ] Custom utilities documented

## Integration with Project Standards

Enforces design consistency:

- U-1: WCAG 2.1 AA compliant (color contrast)
- Responsive design patterns
- Component reusability
- Performance optimization

## Resources

- Tailwind CSS v4 Docs: https://tailwindcss.com/docs
- Tailwind v4 Upgrade Guide: https://tailwindcss.com/docs/upgrade-guide
- shadcn/ui: https://ui.shadcn.com
- shadcn/ui Tailwind v4: https://ui.shadcn.com/docs/tailwind-v4
- CVA (Class Variance Authority): https://cva.style
