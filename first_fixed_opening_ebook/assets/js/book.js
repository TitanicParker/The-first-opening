const readerFlowStyles = document.createElement('style');
readerFlowStyles.textContent = `
@media screen and (min-width: 981px) {
  .book-sidebar {
    width: 430px !important;
    padding: clamp(1rem, 2vw, 1.6rem) !important;
    overflow: hidden !important;
    display: flex !important;
    align-items: center !important;
    border-right: 1px solid rgba(100, 255, 210, 0.18) !important;
    background:
      radial-gradient(circle at 50% 45%, rgba(100,255,210,.10), transparent 19rem),
      radial-gradient(circle at 50% 58%, rgba(255,211,110,.075), transparent 18rem),
      rgba(5,8,13,.82) !important;
  }
  .book-shell {
    margin-left: 430px !important;
    padding-left: clamp(2.8rem, 6vw, 7.5rem) !important;
    padding-right: clamp(1.4rem, 4vw, 5rem) !important;
  }
}
.book-sidebar nav,
.toc-page,
.runtime-viewer,
.title-actions { display: none !important; }
.pattern-panel { width: 100%; display: grid; gap: 1rem; }
.pattern-panel .brand-mark { margin: 0; background: linear-gradient(135deg, rgba(8,19,30,.72), rgba(5,8,13,.86)); }
.pattern-title { display: grid; gap: .25rem; padding: 0 .3rem; }
.pattern-title strong { color: var(--white-green); font-size: .95rem; letter-spacing: .14em; text-transform: uppercase; }
.pattern-title span { color: var(--muted); font-size: .9rem; line-height: 1.45; }
.pattern-window {
  position: relative;
  width: min(100%, 380px);
  margin-inline: auto;
  aspect-ratio: 1 / 1;
  border: 1px solid rgba(100,255,210,.26);
  border-radius: 30px;
  overflow: hidden;
  background: radial-gradient(circle at 50% 50%, rgba(22,45,60,.62), rgba(5,8,13,1) 70%), #05080d;
  box-shadow: 0 0 46px rgba(100,255,210,.18), 0 0 90px rgba(143,185,255,.08), inset 0 0 42px rgba(100,255,210,.075);
}
.pattern-window iframe { width: 100%; height: 100%; display: block; border: 0; }
.pattern-note { color: var(--faint); font-size: .82rem; line-height: 1.5; padding: 0 .35rem; }
.book-content { max-width: 820px; background: linear-gradient(180deg, rgba(8,19,30,.36), rgba(5,8,13,.14)); }
.book-content > h1:first-child { margin-top: 0; }
.book-content > h1, .book-content > h2 { scroll-margin-top: 4rem; }
@media screen and (max-width: 980px) {
  .book-sidebar {
    position: sticky !important;
    top: 0 !important;
    z-index: 5 !important;
    width: auto !important;
    max-height: none !important;
    padding: .8rem !important;
    overflow: visible !important;
    border-right: 0 !important;
    border-bottom: 1px solid rgba(100,255,210,.18) !important;
    background: rgba(5,8,13,.9) !important;
  }
  .pattern-panel { grid-template-columns: 1fr min(34vw, 132px); align-items: center; gap: .8rem; }
  .pattern-panel .brand-mark, .pattern-note { display: none; }
  .pattern-title strong, .pattern-title span { font-size: .78rem; }
  .pattern-window { width: min(34vw, 132px); border-radius: 18px; }
}
`;
document.head.appendChild(readerFlowStyles);

const sidebar = document.querySelector('.book-sidebar');
if (sidebar) {
  sidebar.innerHTML = `
    <div class="pattern-panel" aria-label="Original Pattern viewer">
      <div class="brand-mark"><span></span><strong>The First Fixed Opening</strong><small>Look first. Name later.</small></div>
      <div class="pattern-title"><strong>Original Pattern</strong><span>The source construction stays beside the reading.</span></div>
      <div class="pattern-window"><iframe src="assets/runtime/theorem_zero_runtime.html" title="Original Pattern" loading="eager"></iframe></div>
      <p class="pattern-note">This moving pattern is a companion, not a menu. The book flows on the right; the construction keeps playing here.</p>
    </div>`;
}

const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(node) {
    const parent = node.parentElement;
    if (!parent || ['SCRIPT', 'STYLE', 'IFRAME'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
    return /runtime|Runtime/.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  }
});
const replacements = [];
while (walker.nextNode()) replacements.push(walker.currentNode);
replacements.forEach(node => {
  node.nodeValue = node.nodeValue
    .replace(/Runtime Viewer/g, 'Original Pattern')
    .replace(/Show the Runtime/g, 'Show the Original Pattern')
    .replace(/runtime still target/g, 'pattern still target')
    .replace(/Runtime still target/g, 'Pattern still target')
    .replace(/runtime/g, 'original pattern')
    .replace(/Runtime/g, 'Original Pattern');
});

const topButton = document.querySelector('.top-button');
window.addEventListener('scroll', () => {
  if (topButton) topButton.classList.toggle('visible', window.scrollY > 800);
});
if (topButton) topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
