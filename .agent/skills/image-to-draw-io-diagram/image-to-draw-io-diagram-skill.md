---
name: image-to-draw-io-diagram
description: Transform visual images into functional, editable Draw.io diagrams through systematic analysis and XML generation. Use when converting screenshots or diagrams to editable format, recreating architecture diagrams from images, generating Draw.io XML from visual designs, or creating editable versions of static diagrams. Performs visual analysis to identify shapes, hierarchy, and styling, then generates proper Draw.io XML with accurate positioning, colors, and connections.
---

# Skill: Image to Draw.io Diagram Conversion

This document outlines the systematic process, rules, and technical implementation details used to transform a visual image into a functional, editable `.drawio` diagram.

## 1. Visual Analysis Phase

The first step is a comprehensive breakdown of the source image to identify the underlying structural logic.

### Structural Mapping
- **Sections**: Identify logical groupings or regions (e.g., horizontal bands, quadrants, or numbered steps).
- **Hierarchy**: Determine the flow of information (Top-to-Bottom, Left-to-Right, or Hub-and-Spoke).
- **Separators**: Note any explicit lines, dividers, or background changes that define sections.

### Element Identification
- **Shapes**: Map visual elements to standard diagram components:
    - Rectangles/Boxes -> `rounded=0` (sharp) or `rounded=1` (rounded).
    - Circles/Ovals -> `ellipse`.
    - Diamonds -> `rhombus`.
    - Documents -> `shape=note`.
    - Directories -> `rounded=1` with specific height.
- **Styling**: Extract visual attributes:
    - **Color Palette**: Identify primary colors (e.g., Orange #D35400, Blue #2980B9, Teal #1ABC9C).
    - **Line Styles**: Solid, dashed, or dotted lines; arrowheads vs. plain lines.
    - **Typography**: Relative font sizes (Headers vs. Body) and styles (Bold, Italic).

## 2. Technical Implementation (draw.io XML)

Draw.io files are XML-based. The core structure is a nested hierarchy:

```xml
<mxfile ...>
  <diagram id="..." name="...">
    <mxGraphModel ...>
      <root>
        <mxCell id="0" /> <!-- Layer 0 -->
        <mxCell id="1" parent="0" /> <!-- Layer 1 (Parent for all content) -->
        <!-- Content cells go here -->
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

### Cell Definitions (`mxCell`)

Every element (shape or line) is an `mxCell`.

#### Vertices (Shapes/Text)
- `vertex="1"`
- `parent="1"`
- `style`: A semicolon-separated string of CSS-like properties.
- `geometry`: Defines `x`, `y`, `width`, and `height`.

**Example Style for a Rounded Box:**
`rounded=1;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#D35400;strokeWidth=2;fontColor=#FF8C00;`

#### Edges (Connectors/Lines)
- `edge="1"`
- `parent="1"`
- `source`: The ID of the starting cell.
- `target`: The ID of the ending cell.
- `style`: `endArrow=classic;html=1;strokeColor=#D35400;strokeWidth=1;`

## 3. The "Recipe" for Conversion

### Step 1: Initialize the Canvas
- Set the `background` color (e.g., `#0D0D0D` for dark mode).
- Define `pageWidth` and `pageHeight` based on the image aspect ratio (e.g., 1100x1600).

### Step 2: Define the Global Structure
- Create IDs for separators first (e.g., `sep1`, `sep2`).
- Use `dashed=1` for organizational lines to keep them subtle.

### Step 3: Implement Section-by-Section
- **Header/Title**: Start with the main title to establish the scale.
- **Coordinates**: Use a relative grid. If the canvas is 1000px wide, center is 500.
- **Z-Order**: Objects defined later in the XML appear "on top" of earlier objects.
- **Grouping**: Use a prefix for IDs in a section (e.g., `s1_box`, `s1_text`) to keep the XML readable.

### Step 4: Refine the Visuals
- **Text Alignment**: Use `align=left;verticalAlign=top;` for paragraphs and `align=center;verticalAlign=middle;` for labels.
- **Spacing**: Use `spacingLeft` or `spacingTop` to prevent text from touching shape borders.
- **Venn Diagrams**: Use `ellipse` with overlapping coordinates and different `strokeColor` values. Use `fillColor=none` or low opacity to show the overlap.

## 4. Key Rules & Best Practices

1.  **Unique IDs**: Every `mxCell` MUST have a unique ID string.
2.  **Hex Precision**: Use specific hex codes rather than generic "red" or "blue" to match branding.
3.  **Coordinate Consistency**: If three boxes are in a row, their `y` and `height` should be identical.
4.  **Arrow Logic**: Always define `source` and `target` for lines to ensure they "stick" to shapes if moved in the editor.
5.  **Dashed Borders**: Use `dashed=1` for secondary or "optional" elements (like background files in a modular architecture).

## 5. Sample Styles Snippets

| Element Type | Style String |
| :--- | :--- |
| **Header** | `text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontColor=#5DADE2;fontSize=24;fontStyle=1` |
| **Rounded Box** | `rounded=1;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#2980B9;strokeWidth=2;fontColor=#ECF0F1;` |
| **Dashed Line** | `endArrow=none;html=1;strokeWidth=1;dashed=1;strokeColor=#4D4D4D;` |
| **Note/Doc** | `shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;fillColor=none;strokeColor=#F1948A;` |
| **Rhombus** | `rhombus;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#1ABC9C;strokeWidth=3;` |
