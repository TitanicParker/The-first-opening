const banner = document.createElement('header');
banner.className = 'site-banner';
banner.innerHTML = `
  <a class="site-mark" href="../../index.html" aria-label="Project landing">
    <span aria-hidden="true"></span>
    <strong>Settlement Gate</strong>
  </a>
  <nav class="site-nav" aria-label="Site navigation">
    <a href="../index.html">The First Fixed Opening</a>
    <a href="../../bridge_essays/">Bridge Essays</a>
    <a class="primary" href="settlement_gate_white_paper.html">Settlement Gate</a>
  </nav>
`;
document.body.prepend(banner);

const footer = document.querySelector('.document-footer');
if (footer) {
  footer.innerHTML = 'Settlement Gate is part of The First Fixed Opening project: construction, bridge, settlement.';
}
