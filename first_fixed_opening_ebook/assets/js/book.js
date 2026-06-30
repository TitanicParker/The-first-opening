
const headings = [...document.querySelectorAll('main [id]')];
const links = [...document.querySelectorAll('.book-sidebar a')];
const byId = new Map(links.map(a => [a.getAttribute('href')?.slice(1), a]));
const topButton = document.querySelector('.top-button');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.remove('active'));
      const a = byId.get(entry.target.id);
      if (a) a.classList.add('active');
    }
  });
}, { rootMargin: '-25% 0px -65% 0px', threshold: 0.01 });
headings.forEach(h => io.observe(h));
window.addEventListener('scroll', () => {
  topButton.classList.toggle('visible', window.scrollY > 800);
});
topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
