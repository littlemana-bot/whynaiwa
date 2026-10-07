// English is adapted for readers unfamiliar with Chinese meme culture.
// Capture the authored Chinese copy so switching back restores it verbatim.
(() => {
  const translations = [];
  const bind = (selector, english, attribute) => {
    const element = document.querySelector(selector);
    if (!element) return;
    translations.push({ element, attribute, chinese: attribute ? element.getAttribute(attribute) : element.textContent, english });
  };
  const bindFirstText = (element, english) => {
    const node = [...element.childNodes].find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
    if (node) translations.push({ element: node, chinese: node.textContent, english });
  };
  const headings = ['What is this?', 'What is Naiwa?', 'Why people love Naiwa', 'A few final thoughts'];
  const ids = ['intro', 'about', 'love', 'afterword'];
  ids.forEach((id, i) => {
    bind(`#${id} h2`, headings[i]);
    bind(`.toc a[href="#${id}"]`, headings[i]);
  });
  const paragraphs = {
    intro: [
      'Meet Naiwa, a popular character from Chinese meme culture. All the figures here are 3D printed. A big thank-you to the creators who share their models with the community.',
      'New designs and restocks drop from time to time. (I’m still job hunting—how does everyone else have an offer while I’m sitting at zero? Life as a mechanical engineering grad is tough (╥ω╥`))'
    ],
    about: [
      'If you know Nailoong—the yellow cartoon dragon that inspired all this—your first encounter with Naiwa might leave you doing a double take. The yellow body and big belly are still there, but the eyes, expression, and proportions look a little… different.',
      'Naiwa is a family of fan-made remixes of Nailoong. Many share a yellow body, a round belly, and green eyes, but there’s no single rulebook for what one should look like. Some just stand there looking wonderfully vacant. Others double over laughing. They turn up in films, paintings, and everyday scenes—or become little figures you can hold.',
      'The names overlap, and the boundaries between versions are fuzzy. On this site, I use “Naiwa” as an umbrella term for these endlessly reworked characters. It’s a convenient shorthand, not a claim that they all come from one creator or share the same origin.',
      'Part of the fun is that Naiwa never stays the same. You might recognize the starting point, but you can’t predict what it’ll be doing in the next image. Those familiar colors and eyes tie together creations that otherwise have very little in common.',
      'With AI, people can give it a new pose, drop it into a different setting, or cross it with another animal. One image becomes the starting point for the next: someone tweaks it, someone adds a caption, and someone else turns it into something you can pick up and hold.',
      'Over time, Naiwa has become a shared canvas that anyone can add to. You can stop by for a laugh, or make a version of your own. It doesn’t need an elaborate backstory. Sometimes a single expression is enough to capture the mood you’re in.'
    ],
    love: [
      'I can’t speak for everyone who loves Naiwa. Some find it funny. Some are drawn to its awkward little face. Others simply enjoy taking something familiar and remixing it beyond recognition.',
      'For me, the appeal is the feeling of “I could try that, too.”',
      'You don’t need to be a great artist or have a whole fictional universe mapped out. A passing thought can be enough: turn it into a cat, put it by the sea, or give it a slightly strange face. If the result isn’t quite right, try again. That process can be fun in its own right.',
      'AI makes some of those experiments easier. Images that once existed only in your head can now take shape. You still make choices, judge the results, and revise them—but you don’t have to master every technique before you start expressing yourself.',
      'I think of that feeling as the “Naiwa spirit.”',
      'This isn’t an established movement or a definition everyone has agreed on. It’s my own way of putting it: let yourself create simply because you enjoy it, and leave room for other people to enjoy what they enjoy.',
      'I’d like this to be a space where we don’t dismiss each other just because a creation is rough around the edges, a little weird, or made purely for fun. You can put hours into it or try something on a whim. You can polish it or let it stay a little awkward. Every experiment doesn’t have to prove that you’re talented.',
      'Of course we can talk about whether something looks good, and offer suggestions. But when we say “I don’t like it,” maybe we can pause and ask: do I dislike the character, or the way it keeps showing up? Can my taste really account for what makes someone else happy?',
      'Perhaps Naiwa is just a canvas for our ideas. The character gives those ideas a shape; the feelings behind them are what deserve to be seen.'
    ],
    afterword: [
      'Sometimes, what we’re tired of isn’t a thing itself, but the same version of it being put in front of us over and over.',
      'When an image is endlessly repeated, imitated, and turned into an internet shorthand, it’s easy to forget that it began as a character someone simply liked.',
      'Think of children drawing Nailoong again and again. To an adult, those wobbly, similar-looking drawings might seem like “they turn everything into Nailoong.” To the child, it may just be the most direct way of showing affection.',
      'And then I remember: weren’t we much the same?',
      'Think of SpongeBob, My Little Pony, or whichever cartoon character you knew by heart. They filled the margins of school notebooks and the backs of worksheets. We weren’t asking whether our drawings were any good. We liked those characters, so we wanted to draw them.',
      'As we grow up, we develop taste and learn to make judgments. But we also become quicker to define things through our own experience. For someone of a different age or in a different community, what we find overdone, corny, or irritating might be a source of simple joy, imagination, and self-expression.',
      'Often, we think we’re judging a thing when we’re really judging the one side of it we’ve seen. If we can set our first impressions aside for a moment and look through someone else’s eyes, the thing itself may not change—but our understanding of it might.',
      'That’s part of why I made this site: to give these small acts of affection and creativity a little space. Behind an image that seems absurd at first glance, there may be someone who thought carefully, revised it over and over, or finally found a way to bring an idea to life.',
      'Don’t let a first impression become a verdict on something you haven’t yet understood. And don’t let fear make you put down your own creative tools.',
      'Go make something.',
      'Thank you, once again, to AI—and to everyone who has brought a Naiwa of their own into the world.'
    ]
  };
  Object.entries(paragraphs).forEach(([id, copy]) => {
    const nodes = document.querySelectorAll(`#${id} > p`);
    copy.forEach((english, i) => {
      if (nodes[i]) translations.push({ element: nodes[i], chinese: nodes[i].textContent, english });
    });
  });
  bind('.skip-link', 'Skip to content');
  bindFirstText(document.querySelector('.wordmark'), ' Why Naiwa');
  bind('.wordmark', 'Why Naiwa · View the GitHub repository', 'aria-label');
  bind('.search-box .sr-only', 'Search this page');
  bind('#pageSearch', 'Search this article', 'placeholder');
  bind('.toc', 'On this page', 'aria-label');
  bind('.rail-label', 'On this page');
  bind('h1', 'Naiwa');
  bind('#copyLink', 'Copy page link');
  bind('#intro h3', 'Meet the figures');
  const modelNames = ['Peace-sign Naiwa', 'Nai-Shark', 'Nai-Mouse', 'Special guest: the Meituan “Mouse”'];
  const modelCredits = ['By renke233 · View the original model ↗', 'By 奶者战神 · View the original model ↗', 'By 墨肠Dmc · View the original model ↗', 'By 墨肠Dmc · View the original model ↗'];
  document.querySelectorAll('.model-link').forEach((element, i) => {
    bindFirstText(element.querySelector('.model-copy') || element, modelNames[i]);
    const credit = element.querySelector('.model-meta') || element.querySelector('span');
    translations.push({ element: credit, chinese: credit.textContent, english: modelCredits[i] });
  });
  bind('.printed-collection', 'Yellow 3D-printed Naiwa, shark, and kangaroo figures beside a box with a “Feel free to take one” sign.', 'alt');
  bind('img[src="assets/biye-naiwa.jpg"]', 'A 3D-printed peace-sign Naiwa on an outdoor stone ledge.', 'alt');
  bind('img[src="assets/meituan-shushu.jpg"]', 'A yellow 3D-printed Meituan mascot sitting on a wall-mounted switch.', 'alt');
  bind('.follow-account', 'Follow me on Xiaohongshu', 'aria-label');
  bind('.follow-account > p:first-child', 'If you’re interested in these little creations, 3D printing, or what I’m up to, come follow me on Xiaohongshu (RED). I share projects and bits of everyday life whenever I get the chance.');
  bind('.account-details span', 'Xiaohongshu ID: 63655461578');
  bind('.account-image', 'Open the account card and QR code at full size', 'aria-label');
  bind('.account-image img', 'Tony’s Xiaohongshu account card, ID 63655461578, with a QR code.', 'alt');
  bind('.account-hint', 'Scan the QR code or search for the account ID in Xiaohongshu. Click the image to enlarge it.');
  bind('.contact-email > span', 'Email: ');
  bind('#noResults', 'No matches on this page. Try another keyword.');
  bind('footer b', 'Why Naiwa');
  bind('footer > a', 'Back to top ↑');
  const toggle = document.querySelector('#languageToggle');
  const hint = document.querySelector('#languageHint');
  const hintStorageKey = 'whynaiwa-language-hint-dismissed';
  let hintDismissed = false;
  try { hintDismissed = localStorage.getItem(hintStorageKey) === '1'; } catch { /* Still show the hint when storage is unavailable. */ }
  hint.hidden = hintDismissed;
  const dismissHint = () => {
    hint.hidden = true;
    try { localStorage.setItem(hintStorageKey, '1'); } catch { /* Dismiss for this visit when storage is unavailable. */ }
  };
  document.querySelector('#dismissLanguageHint').addEventListener('click', dismissHint);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !hint.hidden) dismissHint();
  });
  const chineseDescription = document.querySelector('meta[name="description"]').content;
  const chineseTitle = document.title;
  let language = 'zh';
  const apply = (next) => {
    language = next === 'en' ? 'en' : 'zh';
    translations.forEach(({ element, attribute, chinese, english }) => {
      const value = language === 'en' ? english : chinese;
      if (attribute) element.setAttribute(attribute, value);
      else element.textContent = value;
    });
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    document.title = language === 'en' ? 'Naiwa · Why Naiwa' : chineseTitle;
    document.querySelector('meta[name="description"]').content = language === 'en' ? 'Meet Naiwa, a Chinese meme turned shared creative canvas, and the makers behind these 3D-printed figures.' : chineseDescription;
    toggle.setAttribute('aria-label', language === 'en' ? '切换为中文' : 'Switch to English');
    window.siteCopy = language === 'en' ? { copied: 'Link copied', fallback: 'Copy the link from your address bar' } : { copied: '链接已复制', fallback: '请从地址栏复制链接' };
    document.querySelector('#copyToast').textContent = window.siteCopy.copied;
    try { localStorage.setItem('whynaiwa-language', language); } catch { /* Storage may be disabled. */ }
    const url = new URL(location.href);
    if (language === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    history.replaceState(null, '', url);
    window.dispatchEvent(new Event('languagechange'));
  };
  const requested = new URL(location.href).searchParams.get('lang');
  let saved;
  try { saved = localStorage.getItem('whynaiwa-language'); } catch { /* Default to Chinese. */ }
  apply(requested || saved || 'zh');
  toggle.addEventListener('click', () => {
    dismissHint();
    apply(language === 'en' ? 'zh' : 'en');
  });
})();
