async function renderSettlementGate() {
  const root = document.getElementById('settlement-root');
  if (!root) return;

  try {
    const response = await fetch('settlement_gate_white_paper.html', { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not load the Settlement Gate source document.');
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    const originalHero = doc.querySelector('.hero');
    const originalPaper = doc.querySelector('.paper');
    const title = originalHero?.querySelector('h1')?.textContent?.trim() || 'Settlement Gate';
    const subtitle = originalHero?.querySelector('.subtitle')?.textContent?.trim() || 'A protocol for making sentence completion observable.';
    const meta = [...(originalHero?.querySelectorAll('.hero-meta span') || [])].map(span => span.textContent.trim()).filter(Boolean);

    document.title = `${title} — The First Fixed Opening`;

    root.innerHTML = `
      <section class="hero">
        <div class="hero-inner">
          <div class="eyebrow">White paper</div>
          <h1>${title}</h1>
          <p class="subtitle">${subtitle}</p>
          <div class="hero-meta">
            ${(meta.length ? meta : ['Shared project edition', 'Source-bound language audit', 'Settlement receipts']).map(item => `<span>${item}</span>`).join('')}
          </div>
        </div>
      </section>
      <main class="layout">
        <article class="paper" id="document-content">
          ${originalPaper ? originalPaper.innerHTML : '<p>The Settlement Gate source document could not be parsed.</p>'}
        </article>
      </main>
      <footer class="document-footer">Settlement Gate is part of The First Fixed Opening project: construction, bridge, settlement.</footer>
    `;

    root.querySelectorAll('style, script, link[rel="stylesheet"]').forEach(node => node.remove());
  } catch (error) {
    root.innerHTML = `
      <section class="hero">
        <div class="hero-inner">
          <div class="eyebrow">White paper</div>
          <h1>Settlement Gate could not be loaded</h1>
          <p class="subtitle">${error.message}</p>
        </div>
      </section>
    `;
  }
}

renderSettlementGate();
