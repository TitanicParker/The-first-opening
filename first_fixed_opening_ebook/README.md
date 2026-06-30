# The First Fixed Opening — HTML eBook Integration

This package converts the unified Markdown scaffold into a polished, source-bound HTML eBook and preserves the Theorem Zero runtime intact.

## Open

Open `index.html` in a browser.

## Included

- `index.html` — full eBook shell with title page, table of contents, main text, diagram index, and runtime viewer.
- `assets/css/book.css` — runtime-inspired luminous visual theme.
- `assets/js/book.js` — active table-of-contents highlighting and back-to-top affordance.
- `assets/runtime/theorem_zero_runtime.html` — original runtime preserved as a source artifact.
- `assets/data/canonical-ledger.json` — extracted hidden canonical ledger metadata.
- `assets/data/display-audit.json` — extracted hidden display audit metadata.
- `assets/data/snapshot-plan.json` — extracted hidden textbook snapshot plan metadata.
- `sources/` — original handover brief and source Markdown scaffold.

## Integration completed

- Converted the scaffold into navigable HTML.
- Preserved source order and learner-facing prose.
- Installed a runtime-inspired design system with dark field, cyan stations, gold centres, and pale line language.
- Converted all 84 diagram placeholders into diagram cards with captions and metadata.
- Added runtime snapshot cues for early construction chapters according to the handover mapping.
- Embedded the native runtime in a dedicated viewer without modifying the runtime file.
- Added machine-readable snapshot/audit/ledger data files.

## Remaining manual tasks

- Export runtime JPEG stills at the snapshot-plan timestamps and replace the relevant placeholder frames.
- Author custom diagrams for chapters 1 and 11–26, especially rightness, ratio, trigonometry, coordinate audit, and algebra.
- Review Appendix A presentation for whether the full ledger should remain inline, be split into separate pages, or be progressively collapsed by theorem group.
- Run an editorial pass on chapter-level source links after final diagram stills are installed.
