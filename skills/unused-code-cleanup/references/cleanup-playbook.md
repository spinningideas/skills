# Cleanup Playbook

## Protocol 1: Unused Exports

1.  Identify an export that seems unused.
2.  Run `grep_search` for the export name.
3.  If results are only the definition itself:
    - If it's a named export, remove the `export` keyword.
    - If it's a default export of a file, check if the file is imported by side-effect.
4.  If the variable/function is now unused within the file, remove the dead code block.

## Protocol 2: React Component Removal

1.  Identify `Component.tsx`.
2.  Search for `<Component` and `Component` across the codebase.
3.  If no usage found:
    - Delete `Component.tsx`.
    - Check for a generic test file `Component.test.tsx` and delete it too.
    - Check `index.ts` (barrel files) and remove the export line.

## Protocol 3: Tailwind & CSS

1.  **Class Sorting**: Run `prettier` with tailwind plugin if available to normalize classes.
2.  **Duplicate Classes**: Look for `className="p-4 p-4"` or conflicting rules `p-4 p-8`. Remove the overridden one (usually the first one).
3.  **Arbitrary Values**: Identify pervasive use of arbitrary values `w-[325px]` and suggest moving to `tailwind.config.js` theme.

## Protocol 4: The "Zombie" Code

1.  Scan for large commented-out blocks `// ... code ...`.
2.  Read the code. Is it legacy?
3.  Delete it. (Git history preserves it).
4.  Retain comments that explain _why_ something is done, delete comments that _are_ code.
