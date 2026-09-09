const page = document.body.dataset.page || '';
document.querySelectorAll('[data-page-link]').forEach(link => {
  if (link.dataset.pageLink === page) link.classList.add('active');
});

document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const code = button.closest('.code')?.querySelector('code')?.innerText || '';
    try { await navigator.clipboard.writeText(code); } catch { /* clipboard can be blocked for file:// */ }
    const original = button.textContent;
    button.textContent = 'copied';
    setTimeout(() => button.textContent = original, 1400);
  });
});

const menuButton = document.querySelector('[data-menu]');
const links = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => {
  links?.classList.toggle('mobile-open');
  if (links?.classList.contains('mobile-open')) {
    links.style.display = 'flex'; links.style.position = 'absolute'; links.style.top = '68px'; links.style.left = '16px'; links.style.right = '16px'; links.style.padding = '18px'; links.style.flexDirection = 'column'; links.style.alignItems = 'flex-start'; links.style.background = 'rgba(16,20,33,.98)'; links.style.border = '1px solid var(--line)'; links.style.borderRadius = '10px';
  } else { links.removeAttribute('style'); }
});

document.querySelectorAll('[data-scroll]').forEach(el => {
  el.addEventListener('click', event => {
    const target = document.querySelector(el.getAttribute('href'));
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior:'smooth', block:'start' }); }
  });
});

const navAnchors = [...document.querySelectorAll('.docs-nav a')];
const sections = navAnchors.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if (sections.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`)); } });
  }, { rootMargin: '-18% 0px -68% 0px' });
  sections.forEach(section => observer.observe(section));
}

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
