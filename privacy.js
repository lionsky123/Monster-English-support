(() => {
  'use strict';
  const languageKey = 'monster-support-language';
  const button = document.getElementById('privacyLanguageButton');
  const desktopToc = document.getElementById('desktopPolicyToc');
  const mobileToc = document.getElementById('mobilePolicyToc');
  const mobileDisclosure = document.querySelector('.mobile-policy-toc');
  const sections = [...document.querySelectorAll('.policy-section')];
  mobileToc.innerHTML = desktopToc.innerHTML;
  const tocLinks = [...document.querySelectorAll('.policy-toc a')];
  let language = 'zh';

  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
    document.title = next === 'zh' ? '怪兽英语大冒险 · 隐私政策' : 'Monster English · Privacy Policy';
    document.querySelectorAll('[data-zh][data-en]').forEach(element => {
      element.textContent = element.dataset[next].replace(/\\n/g, '\n');
    });
    document.querySelectorAll('[data-aria-zh][data-aria-en]').forEach(element => {
      element.setAttribute('aria-label', next === 'zh' ? element.dataset.ariaZh : element.dataset.ariaEn);
    });
    document.getElementById('privacyLanguageLabel').textContent = next === 'zh' ? 'EN' : '中文';
    button.setAttribute('aria-label', next === 'zh' ? 'Switch to English' : '切换为中文');
    try { localStorage.setItem(languageKey, next); } catch (_) { /* The policy works without local storage. */ }
    updateActiveSection();
  }

  function updateActiveSection() {
    const threshold = document.querySelector('.site-header').getBoundingClientRect().height + 55;
    let active = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= threshold) active = section.id;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) active = sections[sections.length - 1].id;
    tocLinks.forEach(link => {
      const selected = link.getAttribute('href') === `#${active}`;
      link.classList.toggle('active', selected);
      if (selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  let pending = false;
  function scheduleUpdate() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; updateActiveSection(); });
  }
  mobileToc.addEventListener('click', event => {
    if (event.target.closest('a[href^="#"]')) mobileDisclosure.open = false;
  });
  button.addEventListener('click', () => setLanguage(language === 'zh' ? 'en' : 'zh'));
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  try { if (localStorage.getItem(languageKey) === 'en') language = 'en'; } catch (_) { /* Chinese is the default. */ }
  setLanguage(language);
})();
