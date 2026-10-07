const search = document.querySelector('#pageSearch');
const sections = [...document.querySelectorAll('[data-search-section]')];
const noResults = document.querySelector('#noResults');
const navLinks = [...document.querySelectorAll('.toc nav a')];

search.addEventListener('input', () => {
  const query = search.value.trim().toLocaleLowerCase('zh-CN');
  let matches = 0;
  sections.forEach((section) => {
    const visible = !query || section.textContent.toLocaleLowerCase('zh-CN').includes(query);
    section.hidden = !visible;
    if (visible) matches += 1;
  });
  noResults.hidden = matches !== 0;
});

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
    copyToast.textContent = '链接已复制';
  } catch {
    copyToast.textContent = '请从地址栏复制链接';
  }
  copyToast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => copyToast.classList.remove('is-visible'), 2200);
});
