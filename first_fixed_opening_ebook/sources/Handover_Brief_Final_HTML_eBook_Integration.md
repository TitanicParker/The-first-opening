# Handover Brief — Final HTML eBook Integration

You are being asked to act as an expert HTML eBook architect, visual systems designer, and source-bound editorial integrator.

The project is **The First Fixed Opening**, a learner-facing mathematics textbook built from a fixed compass opening toward boundary, stations, equal steps, sixfold closure, direction families, triangular field, geometry, trigonometry, coordinate geometry, and algebra.

You will receive two core files in GitHub:

1. **The textbook scaffold Markdown**

   * Working scaffold for the full book.
   * Contains project orientation, style guide, chapter structure, diagram policy, main textbook chapters, curriculum map, source ledger appendix, and diagram placeholders.

2. **The native visual runtime HTML**

   * Canonical Theorem Zero / substrate visual runtime.
   * Contains the beautiful animated canvas runtime.
   * Contains a hidden canonical ledger.
   * Contains a hidden display audit.
   * Contains a hidden textbook snapshot plan with recommended JPEG timestamps, captions, and chapter placements.

Your task is to complete as much integration work as possible toward a polished, beautiful, source-bound **HTML eBook**.

## Primary Goal

Transform the scaffold into a finished or near-finished HTML eBook while preserving the project’s source-bound philosophy:

> Look first. Name later.
> The picture carries the memory.
> The words only help the reader notice what the construction has already made.

The final eBook should feel visually governed by the same world as the runtime: dark background, luminous cyan/teal stations, warm gold centres, pale carrier lines, soft glow, spacious geometry, and calm instructional typography.

The colors present in the runtime should dominate the visual brand of the whole book.

## Visual Brand Requirement

Use the runtime as the visual source of truth for the book’s design language.

The eBook should inherit from the runtime:

* deep blue-black / near-black background
* radial atmospheric glow
* cyan / mint construction marks
* warm gold centre marks
* pale blue secondary overlays
* soft white-green carrier lines
* subtle luminous borders
* restrained glow
* quiet, elegant mathematical atmosphere

Do not make the eBook look like a generic textbook page. It should feel like the runtime has expanded into a readable book.

Suggested design tokens:

```css
:root {
  --bg: #05080d;
  --bg-soft: #08131e;
  --panel: rgba(8, 19, 30, 0.82);
  --panel-strong: rgba(5, 8, 13, 0.92);

  --text: rgba(234, 255, 247, 0.94);
  --muted: rgba(190, 222, 218, 0.72);
  --faint: rgba(190, 222, 218, 0.48);

  --cyan: rgb(100, 255, 210);
  --gold: rgb(255, 211, 110);
  --blue: rgb(143, 185, 255);
  --white-green: rgb(234, 255, 247);

  --line: rgba(100, 255, 210, 0.32);
  --line-soft: rgba(143, 185, 255, 0.22);
  --glow-cyan: 0 0 18px rgba(100, 255, 210, 0.26);
  --glow-gold: 0 0 18px rgba(255, 211, 110, 0.24);
}
```

Use the runtime’s colors and glow as the dominant identity, but keep body text highly readable.

## Important Source Discipline

Do not let design changes alter the mathematical meaning.

Respect these distinctions:

* substrate stations
* generated stations
* active centres
* construction overlay marks
* carrier families
* rendering effects
* viewport / camera behavior
* learner-facing diagrams
* appendix / audit material

Do not import a square-grid interpretation.

Do not treat screen coordinates as mathematical substrate.

Do not treat colors, glow, opacity, fades, or camera framing as mathematical authority.

Do not treat circles, radii, chords, or cells as substrate-defining objects unless the runtime or scaffold presents them as construction / overlay marks.

Coordinates come later as records and audits; they do not generate the field.

## Integration Tasks

### 1. Build the HTML eBook Shell

Create a polished HTML eBook from the Markdown scaffold.

Recommended structure:

* `index.html`
* `assets/css/book.css`
* `assets/js/book.js`
* `assets/runtime/theorem_zero_runtime.html`
* `assets/images/diagrams/`
* `assets/data/`
* optional `assets/data/snapshot-plan.json`
* optional `assets/data/display-audit.json`

The eBook should include:

* title page
* table of contents
* project orientation
* introduction
* reader promise
* style guide / optional editorial appendix
* main chapters
* curriculum map
* appendices
* source ledger appendix, possibly collapsible or separately navigable
* diagram index
* runtime / visual field page

### 2. Preserve and Use the Runtime

Keep the native visual runtime intact as a source artifact.

Possible approaches:

* embed it in an iframe on a “Runtime Viewer” page
* include it as a standalone linked page
* extract the hidden snapshot plan JSON and use it to build a diagram capture list
* keep the canonical ledger untouched to avoid verification failure

Do not modify the canonical ledger unless you fully understand the runtime verification behavior.

The hidden JSON blocks in the runtime are there to support integration. Use them as metadata, not as visible clutter.

### 3. Integrate Diagram Commitments

The scaffold contains many `[DIAGRAM PLACEHOLDER: ...]` entries. Replace or enrich as many as possible with diagram cards.

For each diagram placeholder, create a consistent HTML structure such as:

```html
<figure class="diagram-card" id="diagram-8-4">
  <div class="diagram-frame">
    <!-- image, SVG, runtime still, or placeholder -->
  </div>
  <figcaption>
    <strong>Diagram 8.4 — Three Direction Pairs in the Hexagon.</strong>
    Opposite sides of the source-earned hexagon reveal the first three direction families.
  </figcaption>
</figure>
```

Where a runtime snapshot is appropriate, use the snapshot plan timestamps.

Where no runtime snapshot is appropriate, create a branded placeholder or SVG-style diagram frame that follows the runtime visual language.

### 4. Use the Snapshot Plan

The runtime includes a hidden textbook snapshot plan. Use it to produce or assign JPEG stills from the animation.

Recommended core stills:

```text
1.8s   sweep becomes boundary
2.9s   boundary stations appear
5.6s   fixed reach to six stations
7.4s   boundary chords / step cycle
8.8s   six central cells
9.4s   hexagon as six cells
12.2s  direction families emerging
13.0s  first field as carrier-family structure
18.8s  field extension by repeated centres
25.0s  triangular tessellation / repeated cells
29.0s  medium field direction families
45.2s  full construction overlay / audit
52.0s  resolved 73-station catchment
52.5s  direction-family-dominant final frame
```

Use these stills mainly for Parts II–III and early geometry.

Do not rely on the runtime for later trig, coordinate, and algebra diagrams. Those require separately authored diagrams in the same visual language.

### 5. Suggested Diagram Mapping

Use runtime stills approximately as follows:

* Ch. 2 — Sweep Becomes a Boundary: 1.8s
* Ch. 3 — Boundary Positions Become Stations: 2.9s
* Ch. 5 — Three Equal-Opening Sides: 5.6s
* Ch. 6 — Six Steps Close: 7.4s
* Ch. 7 — Six Triangles Around a Center: 8.8s
* Ch. 8 — Hexagon Inside the Construction: 9.4s
* Ch. 9 — Direction Appears: 12.2s, 13.0s, or 52.5s
* Ch. 10 — Extending the Field: 18.8s, 25.0s, 29.0s
* Appendix / Runtime Audit: 45.2s, 52.0s, 52.5s

For chapters 1, 11–26, create new diagrams or refined placeholders.

### 6. Create a Book-Wide Diagram System

Every diagram should answer:

> What can the reader see here without being asked to trust me?

Diagram cards should support:

* title
* chapter placement
* source / runtime timestamp if applicable
* learner caption
* optional “What this earns” note
* optional “Not yet” note

Possible CSS classes:

```css
.diagram-card {}
.diagram-frame {}
.diagram-runtime-still {}
.diagram-placeholder {}
.diagram-caption {}
.diagram-earns {}
.diagram-not-yet {}
```

### 7. Typography and Layout

The book should be readable for a normal, curious 14-year-old.

Use generous spacing, calm paragraphs, and clear visual rhythm.

Suggested layout:

* sticky or collapsible table of contents on desktop
* single-column reading flow for main text
* wide diagram cards
* short chapter intros
* clear section headings
* callout cards for:

  * Core Permission Earned
  * Not Yet
  * What to Notice
  * Source Reference

Use a readable sans or serif pairing, but do not let typography fight the visual runtime. The page should feel luminous, not academic-gray.

### 8. Convert Scaffold Semantics into Styled Blocks

The scaffold has repeated headings:

* Start Here
* What to Notice
* Chapter Close
* Mathematical Construction
* Core Permission Earned
* Not Yet
* Source Reference

Turn these into styled semantic blocks.

For example:

```html
<section class="look-block">
  <h3>Start Here</h3>
  ...
</section>

<aside class="permission-card">
  <h3>Core Permission Earned</h3>
  ...
</aside>

<aside class="not-yet-card">
  <h3>Not Yet</h3>
  ...
</aside>
```

The “Core Permission Earned” cards should feel like small luminous doors opening.

The “Not Yet” cards should feel protective, not negative.

### 9. Appendix Strategy

The source ledger appendix is long. Do not let it overwhelm the learner path.

Possible solution:

* Main chapters remain primary.
* Appendix A is collapsible by theorem.
* Include search/filter for appendix entries if practical.
* Include source references in chapters that link to appendix anchors.
* Use subdued styling for appendix text.
* Keep the appendix available but visually secondary.

### 10. GitHub Work Expectations

You will have GitHub access. Do as much integration as possible directly in the repository.

Expected workflow:

1. Inspect repository structure.
2. Identify the scaffold Markdown and runtime HTML.
3. Preserve original files.
4. Create a new eBook build structure.
5. Convert Markdown to HTML or build a static page that renders it.
6. Add CSS brand system based on runtime colors.
7. Add runtime viewer.
8. Add diagram system.
9. Extract or mirror snapshot-plan metadata.
10. Map runtime stills to chapters.
11. Add placeholders where images are not yet generated.
12. Commit work in logical steps.
13. Provide a clear completion report.

Suggested commit sequence:

```text
1. preserve source files and add ebook build shell
2. add runtime-inspired visual theme
3. convert scaffold chapters into ebook structure
4. add diagram card system and placeholders
5. integrate runtime viewer and snapshot plan metadata
6. map early diagrams to runtime snapshot plan
7. style appendix and source-reference links
8. final polish pass and documentation
```

### 11. Deliverables

Aim to produce:

* a working `index.html`
* a polished CSS theme
* eBook navigation
* integrated chapter structure
* diagram placeholders/cards
* runtime viewer page or section
* snapshot plan data available in the eBook
* appendix structure
* README or integration notes
* list of remaining manual tasks

### 12. Final Quality Bar

The result should feel like:

* a textbook
* a visual proof path
* a luminous mathematical field
* a source-bound learning object
* an eBook that grew out of the runtime rather than merely linking to it

The final page should not feel like a Markdown dump.

It should feel designed.

The reader should repeatedly experience:

> I can see where that came from.
