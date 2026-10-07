const search = document.querySelector('#pageSearch');
const sections = [...document.querySelectorAll('[data-search-section]')];
const noResults = document.querySelector('#noResults');
const navLinks = [...document.querySelectorAll('.toc nav a')];

const filterSections = () => {
  const locale = document.documentElement.lang;
  const query = search.value.trim().toLocaleLowerCase(locale);
  let matches = 0;
  sections.forEach((section) => {
    const visible = !query || section.textContent.toLocaleLowerCase(locale).includes(query);
    section.hidden = !visible;
    if (visible) matches += 1;
  });
  noResults.hidden = matches !== 0;
};
search.addEventListener('input', filterSections);
window.addEventListener('languagechange', filterSections);

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
  if (!visible?.target.id) return;
  navLinks.forEach((link) => link.classList.toggle('is-current', link.hash === `#${visible.target.id}`));
}, { rootMargin: '-18% 0px -68% 0px', threshold: 0 });
sections.forEach((section) => observer.observe(section));

const copyButton = document.querySelector('#copyLink');
const copyToast = document.querySelector('#copyToast');
let toastTimer;
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    copyToast.textContent = window.siteCopy?.copied || '链接已复制';
  } catch {
    copyToast.textContent = window.siteCopy?.fallback || '请从地址栏复制链接';
  }
  copyToast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => copyToast.classList.remove('is-visible'), 2200);
});
