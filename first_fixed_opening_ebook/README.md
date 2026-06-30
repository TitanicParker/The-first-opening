# The First Fixed Opening — Nested eBook Upload Folder

This folder is the nested location for the full HTML eBook package.

Upload the extracted files from `first_fixed_opening_ebook.zip` into this folder so the repository contains the complete package as one clickable folder.

## Expected structure

```text
first_fixed_opening_ebook/
  README.md
  index.html
  assets/
    css/
      book.css
    js/
      book.js
    runtime/
      theorem_zero_runtime.html
    data/
      canonical-ledger.json
      display-audit.json
      snapshot-plan.json
      diagram-index.json
    images/
      diagrams/
  sources/
    Handover_Brief_Final_HTML_eBook_Integration.md
    The_First_Fixed_Opening_Unified_Textbook_Scaffold.md
```

## Upload order

1. Click `first_fixed_opening_ebook/`.
2. Add or replace `index.html` and this `README.md` from the extracted package.
3. Click `assets/css/` and upload `book.css`.
4. Click `assets/js/` and upload `book.js`.
5. Click `assets/runtime/` and upload `theorem_zero_runtime.html`.
6. Click `assets/data/` and upload the four JSON files.
7. Click `sources/` and upload the source Markdown files.
8. Keep `assets/images/diagrams/` for future still images and exported diagrams.

## Note

The repository root currently contains `README.md` and `index.html`, but the root `index.html` expects `assets/css/book.css` and related assets. Until the asset folders are uploaded at the root or the nested folder, the standalone page will be visually incomplete.
