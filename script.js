const profiles = {
  dragon: {
    index: 'NL-708 · 官方角色资料',
    title: '奶龙',
    intro: '3D 动画《奶龙》的主角。一只拥有 duang~duang 大肚子的异星幼龙，呆萌可爱又带一点小机灵。',
    facts: [['身份', '异星幼龙'], ['搭档', '少年小七'], ['关键词', '好奇 · 乐观 · 大吃货'], ['故事起点', '意外来到地球，开启搞笑冒险']],
    source: '资料来源：奶龙官方网站。角色形象与设定归第七印象文化传媒（深圳）有限公司所有。'
  },
  kangaroo: {
    index: 'MT-365 · 本站创意观察',
    title: '美团袋鼠',
    intro: '以美团“袋鼠图形”为灵感整理的城市搭档档案。页面中的个性、口袋内容与冒险故事均为本站创意设定。',
    facts: [['身份', '城市行动搭档'], ['擅长', '路线规划 · 口袋收纳'], ['关键词', '可靠 · 敏捷 · 热心'], ['行动口号', '把好奇与热乎一起送到家']],
    source: '说明：美团公开资料中可确认“袋鼠图形”为相关品牌标识；本页未把创意描述作为官方人物设定。'
  }
};

const factPool = [
  '奶龙最鲜明的角色符号，是圆滚滚、duang~duang 的大肚子。',
  '官方介绍中，奶龙来到地球后与少年小七成为了好朋友。',
  '本站给袋鼠安排的口袋清单里，藏着一颗专门留给奶龙的小饼干。',
  '两位主角的共同视觉关键词是：黄色、圆润、快乐与行动力。'
];

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.profile-card');
filters.forEach((button) => button.addEventListener('click', () => {
  filters.forEach((item) => { item.classList.remove('is-active'); item.setAttribute('aria-pressed', 'false'); });
  button.classList.add('is-active');
  button.setAttribute('aria-pressed', 'true');
  const filter = button.dataset.filter;
  cards.forEach((card) => { card.hidden = filter !== 'all' && !card.dataset.tags.includes(filter); });
}));

const dialog = document.querySelector('#profileDialog');
document.querySelectorAll('.card-open').forEach((button) => button.addEventListener('click', () => {
  const profile = profiles[button.closest('.profile-card').dataset.profile];
  document.querySelector('#dialogIndex').textContent = profile.index;
  document.querySelector('#dialogTitle').textContent = profile.title;
  document.querySelector('#dialogIntro').textContent = profile.intro;
  document.querySelector('#dialogFacts').innerHTML = profile.facts.map(([term, value]) => `<dt>${term}</dt><dd>${value}</dd>`).join('');
  document.querySelector('#dialogSource').textContent = profile.source;
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

const labels = { dragon: '奶龙档案', kangaroo: '袋鼠档案', yellow: '黄色暗号', pocket: '神秘口袋' };
let saved = new Set(JSON.parse(localStorage.getItem('cute-encyclopedia-saved') || '[]'));
function renderSaved() {
  document.querySelector('#savedCount').textContent = saved.size;
  document.querySelectorAll('[data-save]').forEach((button) => {
    const active = saved.has(button.dataset.save);
    button.setAttribute('aria-pressed', String(active));
    if (button.classList.contains('save-button')) button.textContent = active ? '★' : '☆';
    else button.textContent = `${active ? '★ 已收藏' : '☆ 收进收藏'}`;
  });
  const pocket = document.querySelector('#collectionPocket');
  pocket.innerHTML = saved.size ? [...saved].map((id) => `<span>${labels[id]}</span>`).join('') : '<span>空口袋</span>';
  document.querySelector('#collectionText').textContent = saved.size ? `已经装进 ${saved.size} 条发现。它们会留在这台设备上，等你下次回来。` : '还空着。点击卡片右上角的星星，把喜欢的档案带走。';
  localStorage.setItem('cute-encyclopedia-saved', JSON.stringify([...saved]));
}
document.querySelectorAll('[data-save]').forEach((button) => button.addEventListener('click', () => {
  const id = button.dataset.save;
  saved.has(id) ? saved.delete(id) : saved.add(id);
  renderSaved();
}));
renderSaved();

const toast = document.querySelector('#factToast');
let toastTimer;
document.querySelector('#randomFact').addEventListener('click', () => {
  toast.textContent = factPool[Math.floor(Math.random() * factPool.length)];
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 4500);
});
