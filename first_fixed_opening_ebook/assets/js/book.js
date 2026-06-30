const readerFlowStyles = document.createElement('style');
readerFlowStyles.textContent = `
.book-sidebar,
.book-sidebar nav,
.toc-page,
.runtime-viewer,
.title-actions { display: none !important; }
body { padding-top: 86px !important; }
.book-shell {
  margin-left: 0 !important;
  padding: clamp(1.4rem, 4vw, 4rem) !important;
}
.book-content {
  max-width: 900px !important;
  margin-inline: auto !important;
  background: linear-gradient(180deg, rgba(8,19,30,.38), rgba(5,8,13,.16)) !important;
}
.book-content > h1:first-child { margin-top: 0; }
.book-content > h1, .book-content > h2 { scroll-margin-top: 7rem; }
.pattern-banner {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 1000;
  min-height: 78px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  padding: .65rem clamp(1rem, 3vw, 2.4rem);
  border-bottom: 1px solid rgba(100,255,210,.22);
  background:
    radial-gradient(circle at 16% 50%, rgba(100,255,210,.14), transparent 19rem),
    linear-gradient(90deg, rgba(5,8,13,.96), rgba(8,19,30,.92));
  backdrop-filter: blur(18px);
  box-shadow: 0 18px 45px rgba(0,0,0,.38), 0 0 36px rgba(100,255,210,.08);
}
.pattern-banner-main { display: flex; align-items: center; gap: .85rem; min-width: 0; }
.pattern-orb {
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
  border-radius: 999px;
  border: 1px solid rgba(100,255,210,.42);
  overflow: hidden;
  box-shadow: 0 0 24px rgba(100,255,210,.22), inset 0 0 18px rgba(255,211,110,.14);
  background: #05080d;
}
.pattern-orb iframe { width: 100%; height: 100%; border: 0; transform: scale(1.12); transform-origin: center; pointer-events: none; }
.pattern-banner-title { display: grid; gap: .15rem; min-width: 0; }
.pattern-banner-title strong { color: var(--white-green); letter-spacing: .12em; text-transform: uppercase; font-size: .82rem; }
.pattern-banner-title span { color: var(--muted); font-size: .9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.refer-button,
.unrefer-button {
  border: 1px solid rgba(100,255,210,.34);
  border-radius: 999px;
  padding: .68rem 1rem;
  color: var(--white-green);
  background: linear-gradient(135deg, rgba(100,255,210,.14), rgba(255,211,110,.09));
  box-shadow: 0 0 22px rgba(100,255,210,.12);
  font: inherit;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
  cursor: pointer;
}
.pattern-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: none;
  grid-template-rows: auto 1fr;
  background:
    radial-gradient(circle at 50% 42%, rgba(22,45,60,.7), rgba(5,8,13,1) 68%),
    #05080d;
}
.pattern-overlay.open { display: grid; }
.pattern-overlay-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem clamp(1rem, 3vw, 2.4rem);
  border-bottom: 1px solid rgba(100,255,210,.2);
  background: rgba(5,8,13,.78);
}
.pattern-overlay-bar strong { color: var(--white-green); letter-spacing: .12em; text-transform: uppercase; }
.pattern-overlay-stage {
  display: grid;
  place-items: center;
  padding: clamp(1rem, 3vw, 2rem);
}
.pattern-overlay-frame {
  width: min(92vw, 92vh);
  height: min(92vw, 92vh);
  border: 1px solid rgba(100,255,210,.28);
  border-radius: 32px;
  overflow: hidden;
  background: #05080d;
  box-shadow: 0 0 70px rgba(100,255,210,.18), inset 0 0 60px rgba(143,185,255,.08);
}
.pattern-overlay-frame iframe { width: 100%; height: 100%; border: 0; display: block; }
.artifact-hidden { display: none !important; }
.diagram-card.cleaned .diagram-earns,
.diagram-card.cleaned .diagram-source,
.diagram-card.cleaned pre,
.diagram-card.cleaned code { display: none !important; }
@media screen and (max-width: 760px) {
  body { padding-top: 78px !important; }
  .pattern-banner { min-height: 70px; grid-template-columns: 1fr auto; }
  .pattern-banner-title span { display: none; }
  .pattern-orb { width: 42px; height: 42px; }
  .refer-button { padding: .62rem .82rem; font-size: .78rem; }
  .book-shell { padding-inline: 1rem !important; }
}
`;
document.head.appendChild(readerFlowStyles);

function norm(el) { return (el?.textContent || '').replace(/\s+/g, ' ').trim(); }
function hide(el) { if (el && el !== document.body) el.classList?.add('artifact-hidden'); }
function remove(el) { if (el && el !== document.body) el.remove(); }
function removeUntilNextHeading(h, stopSelector) {
  if (!h) return;
  let node = h;
  while (node) {
    const next = node.nextElementSibling;
    remove(node);
    if (next && next.matches(stopSelector)) break;
    node = next;
  }
}
function removeFromHeadingToEnd(h) {
  if (!h) return;
  let node = h;
  while (node) {
    const next = node.nextElementSibling;
    remove(node);
    node = next;
  }
}

document.querySelector('.book-sidebar')?.remove();
document.querySelector('.toc-page')?.remove();
document.querySelector('.runtime-viewer')?.remove();
document.querySelector('.diagram-index')?.remove();

const banner = document.createElement('div');
banner.className = 'pattern-banner';
banner.innerHTML = `
  <div class="pattern-banner-main">
    <div class="pattern-orb" aria-hidden="true"><iframe src="assets/runtime/theorem_zero_runtime.html" title="Original Pattern miniature" loading="eager"></iframe></div>
    <div class="pattern-banner-title"><strong>Original Pattern</strong><span>The source construction remains available while you read.</span></div>
  </div>
  <button class="refer-button" type="button">Refer</button>
`;
document.body.prepend(banner);

const overlay = document.createElement('div');
overlay.className = 'pattern-overlay';
overlay.setAttribute('aria-hidden', 'true');
overlay.innerHTML = `
  <div class="pattern-overlay-bar"><strong>Original Pattern</strong><button class="unrefer-button" type="button">Unrefer</button></div>
  <div class="pattern-overlay-stage"><div class="pattern-overlay-frame"><iframe src="assets/runtime/theorem_zero_runtime.html" title="Original Pattern full view" loading="eager"></iframe></div></div>
`;
document.body.appendChild(overlay);

const referButton = banner.querySelector('.refer-button');
const unreferButton = overlay.querySelector('.unrefer-button');
referButton?.addEventListener('click', () => {
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.documentElement.style.overflow = 'hidden';
});
unreferButton?.addEventListener('click', () => {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.documentElement.style.overflow = '';
  referButton?.focus();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && overlay.classList.contains('open')) unreferButton?.click();
});

const removeHeadingIds = [
  'project-orientation',
  'style-guide-and-voice-contract',
  'diagram-policy',
  'mathematical-spine',
  'chapter-template-contract',
  'how-to-read-this-book',
  'source-amalgamation-note',
  'part-x-curriculum-map'
];
removeHeadingIds.forEach(id => removeUntilNextHeading(document.getElementById(id), 'h1'));
removeFromHeadingToEnd(document.getElementById('appendix-a-source-ledger'));

const artifactText = /(Working status|unified flat Markdown|BEGIN CLEAN_TOP_MATTER|END CLEAN_TOP_MATTER|Project Orientation|working scaffold|diagram inventory|seed prose|Source Amalgamation|This document unifies|source ledger|Source Reference|Appendix A:|DIAGRAM PLACEHOLDER|placeholder|Snapshot cue|still target|Replace this authored|source-aware captioning|hidden JSON|canonical ledger|display audit|snapshot plan|README|GitHub|C:\\Users|The_First_Fixed_Opening.*\.md)/i;
[...document.querySelectorAll('p, blockquote, li, h1, h2, h3, h4, aside, section, figcaption p')].forEach(el => {
  if (artifactText.test(norm(el))) remove(el);
});

const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(node) {
    const parent = node.parentElement;
    if (!parent || ['SCRIPT', 'STYLE', 'IFRAME'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
    return artifactText.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  }
});
const badTextNodes = [];
while (textWalker.nextNode()) badTextNodes.push(textWalker.currentNode);
badTextNodes.forEach(node => node.remove());

[...document.querySelectorAll('.source-card, .diagram-source, .diagram-earns')].forEach(remove);
[...document.querySelectorAll('pre, code')].forEach(el => remove(el.closest('.diagram-card') || el));
[...document.querySelectorAll('.runtime-badge')].forEach(remove);
[...document.querySelectorAll('figure.diagram-card')].forEach(fig => {
  fig.classList.add('cleaned');
  if (!fig.querySelector('svg,img,canvas,iframe')) remove(fig);
});
[...document.querySelectorAll('p, li, blockquote')].forEach(el => { if (!norm(el)) remove(el); });
[...document.querySelectorAll('aside, section, figure')].forEach(el => {
  if (el.classList.contains('title-page') || el.classList.contains('pattern-overlay')) return;
  if (!norm(el) && !el.querySelector('svg,img,canvas,iframe')) remove(el);
});

const topButton = document.querySelector('.top-button');
window.addEventListener('scroll', () => {
  if (topButton) topButton.classList.toggle('visible', window.scrollY > 800);
});
if (topButton) topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
