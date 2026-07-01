const BRIDGE_ESSAYS = [
  {
    number: 1,
    file: 'essay_01_the_opening_that_could_move_without_forgetting.html',
    title: 'The Opening That Could Move Without Forgetting Itself',
    subtitle: 'The first preserved relation and the source-law beneath the 54 Completion Project'
  },
  {
    number: 2,
    file: 'essay_02_putting_cartesian_plane_behind_metatrons_cube.html',
    title: 'Putting the Cartesian Plane Behind Metatron’s Cube',
    subtitle: 'Why the field must be source-earned before it is coordinate-recorded'
  },
  {
    number: 3,
    file: 'essay_03_when_proof_had_to_be_read_by_two_minds.html',
    title: 'When Proof Had to Be Read by Two Minds',
    subtitle: 'The interpretive split that made receipts necessary'
  },
  {
    number: 4,
    file: 'essay_04_hundreds_of_theorems_and_the_language_they_forced.html',
    title: 'Hundreds of Theorems and the Language They Forced',
    subtitle: 'How proof pressure produced a completion vocabulary'
  },
  {
    number: 5,
    file: 'essay_05_the_glossary_that_closed_by_measurement.html',
    title: 'The Glossary That Closed by Measurement',
    subtitle: 'Why the vocabulary had to stop because the demand stopped'
  },
  {
    number: 6,
    file: 'essay_06_crystallised_then_nebulised.html',
    title: 'Crystallised, Then Nebulised',
    subtitle: 'How a fixed system becomes usable without becoming loose'
  },
  {
    number: 7,
    file: 'essay_07_invariants_before_sentence_landings.html',
    title: 'Invariants Before Sentence Landings',
    subtitle: 'The invariant discipline beneath Settlement Gate'
  },
  {
    number: 8,
    file: 'essay_08_from_fixed_opening_to_settlement_receipt.html',
    title: 'From Fixed Opening to Settlement Receipt',
    subtitle: 'The explicit bridge from construction receipt to sentence receipt'
  },
  {
    number: 9,
    file: 'essay_09_smallest_public_place_completion_seen.html',
    title: 'The Smallest Public Place Completion Seen',
    subtitle: 'How completion becomes inspectable in public form'
  },
  {
    number: 10,
    file: 'essay_10_language_must_show_its_work.html',
    title: 'Language Must Show Its Work',
    subtitle: 'The governance demand behind Settlement Gate'
  },
  {
    number: 11,
    file: 'essay_11_strength_of_system_that_knows_what_counts_against_it.html',
    title: 'The Strength of a System That Knows What Counts Against It',
    subtitle: 'Why falsifiability and rival pull make the system stronger'
  },
  {
    number: 12,
    file: 'essay_12_reason_learns_to_leave_a_receipt.html',
    title: 'Reason Learns to Leave a Receipt',
    subtitle: 'The collection’s final bridge into accountable continuation'
  }
];

function essayUrl(file) {
  return `reader.html?essay=${encodeURIComponent(file)}`;
}

function findEssay(file) {
  return BRIDGE_ESSAYS.find(essay => essay.file === file) || BRIDGE_ESSAYS[0];
}

function renderIndex() {
  const list = document.querySelector('[data-essay-list]');
  if (!list) return;
  list.innerHTML = BRIDGE_ESSAYS.map(essay => `
    <li>
      <a href="${essayUrl(essay.file)}">
        <strong>${String(essay.number).padStart(2, '0')}. ${essay.title}</strong>
        <span>${essay.subtitle}</span>
      </a>
    </li>
  `).join('');
}

function extractOriginalParts(doc) {
  const header = doc.querySelector('header');
  const main = doc.querySelector('main') || doc.querySelector('article') || doc.body;
  const title = doc.querySelector('title')?.textContent?.trim() || '';
  const h1 = header?.querySelector('h1')?.textContent?.trim() || doc.querySelector('h1')?.textContent?.trim() || title;
  const eyebrow = header?.querySelector('.eyebrow')?.textContent?.trim() || '';
  const subtitle = header?.querySelector('.subtitle')?.textContent?.trim() || '';
  return { h1, eyebrow, subtitle, body: main ? main.innerHTML : '' };
}

async function renderReader() {
  const host = document.querySelector('[data-reader]');
  if (!host) return;

  const params = new URLSearchParams(window.location.search);
  const requestedFile = params.get('essay') || BRIDGE_ESSAYS[0].file;
  const essay = findEssay(requestedFile);
  const prev = BRIDGE_ESSAYS[essay.number - 2];
  const next = BRIDGE_ESSAYS[essay.number];

  document.title = `${essay.title} — Bridge Essays`;

  try {
    const response = await fetch(essay.file, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Could not load ${essay.file}`);
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const original = extractOriginalParts(doc);

    host.innerHTML = `
      <section class="essay-hero">
        <p class="eyebrow">Bridge essay ${String(essay.number).padStart(2, '0')} of 12</p>
        <h1>${original.h1 || essay.title}</h1>
        <p class="subtitle">${original.subtitle || essay.subtitle}</p>
        <div class="essay-meta">
          <span>The First Fixed Opening</span>
          <span>Settlement Gate</span>
          <span>Earned continuation</span>
        </div>
      </section>
      <article class="essay-content">
        ${original.body}
      </article>
      <nav class="essay-actions" aria-label="Essay navigation">
        ${prev ? `<a href="${essayUrl(prev.file)}">← Essay ${String(prev.number).padStart(2, '0')}</a>` : '<span></span>'}
        <a class="primary" href="index.html">All bridge essays</a>
        ${next ? `<a href="${essayUrl(next.file)}">Essay ${String(next.number).padStart(2, '0')} →</a>` : '<span></span>'}
      </nav>
    `;

    host.querySelectorAll('style, script, link[rel="stylesheet"]').forEach(node => node.remove());
    const firstParagraph = host.querySelector('.essay-content p');
    if (firstParagraph && !firstParagraph.classList.contains('first')) firstParagraph.classList.add('first');
  } catch (error) {
    host.innerHTML = `
      <section class="essay-hero">
        <p class="eyebrow">Bridge essays</p>
        <h1>Essay could not be loaded</h1>
        <p class="subtitle">${error.message}</p>
      </section>
      <p><a href="index.html">Return to the bridge essay index.</a></p>
    `;
  }
}

renderIndex();
renderReader();
