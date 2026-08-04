---
name: format-as-markdown
description: Use when the user asks to format a file or content as properly structured, readable Markdown without changing the actual text.
---

## Approach

1. **Preserve all original content** - Do not reword, remove, or add meaning. Only adjust whitespace, headings, and list markers for clarity.

2. **Structure with proper headings**:
   - `#` for the main title
   - `##` for major sections
   - `###` for subsections
   - Add blank lines before and after headings and horizontal rules
   - Use `---` to separate major sections where it improves readability

3. **Convert to bullet lists** - Turn list-like content into `-` bullets with a single space after the marker. Use indentation for nested lists.

4. **Standardize punctuation/characters**:
   - Replace em dashes (`—`) with regular hyphens (`-`) unless the original meaning clearly requires an em dash
   - Remove emojis or replace them with clear text equivalents when they do not add value

5. **Use whitespace consistently**:
   - Add blank lines between paragraphs, headings, and lists
   - Avoid extra trailing spaces
   - Keep line lengths reasonable (≈80–120 characters) for readability, but do not break words or URLs

## Conversion options

Pick the conversion method that fits the source format:

- **Edit / manual reformatting** (preferred for existing `.md` files): Use `edit` or `multi_edit` to restructure in place. This gives full control over heading hierarchy and preserves the exact wording.
- **Pandoc** (for `.docx`, `.html`, `.rtf`, etc.): Run `pandoc -f docx -t markdown --wrap=none -o output.md input.docx` (or `-f html`, etc.), then clean up the generated Markdown.
- **Markdown formatter** (optional): Tools such as `prettier --write file.md` or `markdownlint --fix file.md` can tidy syntax, but always review their changes.
- **Script conversion** (for bulk or structured content): Use a short PowerShell/Python script only when the source is machine-generated and deterministic; verify the result afterward.

#### Script conversion snippets

These snippets apply a basic set of structural formatting rules. The heading and list heuristics are source-specific, so review and adjust them before running, and always verify the output.

```powershell
$nl = [Environment]::NewLine
$text = Get-Content -Raw 'source.txt'

# Normalize line endings and trailing whitespace
$text = $text -replace '\r\n?', $nl -replace '[ \t]+$', ''
$text = $text -replace "(?:$nl){3,}", "$nl$nl"

# Standardize punctuation/characters
$text = $text -replace '—', '-'
$emoji = '(\uD83D[\uDC00-\uDFFF])|(\uD83C[\uDC00-\uDFFF])|(\uD83E[\uDC00-\uDFFF])|[\u2600-\u26FF\u2700-\u27BF]'
$text = [System.Text.RegularExpressions.Regex]::Replace($text, $emoji, '')

# Convert common list markers to Markdown bullets
$text = $text -replace '(?m)^\s*[\*•·–]\s+', '- '
$text = $text -replace '(?m)^\s*\d+[\.)]\s+', '- '

# Convert likely all-caps headings to H2 (tune for your source)
$text = $text -replace '(?m)^([A-Z][A-Z0-9 &]{3,50})$', '## $1'

$text | Set-Content 'output.md' -NoNewline
```

```python
import re
from pathlib import Path

SRC = Path('source.txt')
DST = Path('output.md')
text = SRC.read_text(encoding='utf-8')

# Normalize line endings and trailing whitespace
text = text.replace('\r\n', '\n').replace('\r', '\n')
text = re.sub(r'[ \t]+$', '', text, flags=re.M)
text = re.sub(r'\n{3,}', '\n\n', text)

# Standardize punctuation/characters
text = text.replace('—', '-')
emoji_re = re.compile(r'[\U0001F300-\U0001F9FF\u2600-\u26FF\u2700-\u27BF]+')
text = emoji_re.sub('', text)

# Convert common list markers to Markdown bullets
text = re.sub(r'(?m)^\s*[\*•·–]\s+', '- ', text)
text = re.sub(r'(?m)^\s*\d+[\.)]\s+', '- ', text)

# Convert likely all-caps headings to H2 (tune for your source)
text = re.sub(r'(?m)^([A-Z][A-Z0-9 &]{3,50})$', r'## \1', text)

DST.write_text(text, encoding='utf-8', newline='\n')
```
