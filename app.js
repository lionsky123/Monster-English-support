/* Static support page. No third-party scripts or network requests. */
(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const state = { language: 'zh', category: 'all', step: 0 };
  const t = (zh, en) => state.language === 'zh' ? zh : en;
  const faqData = [
    {
      id: 'vocabulary', category: 'start', keywords: '词库 高中 四六级 CET IELTS dictionary difficulty',
      zh: ['我应该选择哪一种词库？', '首页提供高中词汇、四六级和雅思词汇。你可以根据当前的学习目标选择：巩固基础可从高中词汇开始，准备对应考试则选择四六级或雅思词汇。先从熟悉的难度出发，找到适合自己的节奏。'],
      en: ['Which vocabulary set should I choose?', 'Choose from high school, CET-4/6, and IELTS vocabulary on the home screen. Start with high school words to work on the basics, or choose the set for your exam. A familiar level is a good place to find your rhythm.']
    },
    {
      id: 'how-to-play', category: 'start', keywords: '玩法 操作 入门 新手 关卡 play controls tutorial start',
      zh: ['怎样开启探险？基本玩法是什么？', '在首页选择词库，再点击「开启探险」。游戏将英文单词学习与怪兽冒险结合：认出英文，击退怪兽，边玩边听。已有冒险进度时，可以从首页的「继续探险」入口接着出发。'],
      en: ['How do I start, and how does the game work?', 'Choose a vocabulary set on the home screen, then select Start Adventure. The game combines English practice with monster encounters: recognize words, take on monsters, and listen as you play. If you already have progress, use Continue Adventure on the home screen.']
    },
    {
      id: 'memory-book', category: 'progress', keywords: '复习 错词 已掌握 统计 records review stats',
      zh: ['「记忆之书」在哪里？可以用来做什么？', '「记忆之书」入口位于冒险首页右下方。你可以从这里回顾学习途中遇见的单词。首页还会展示已遇见单词、已掌握单词、最深秘境和匹配正确率等记录，帮助你了解自己的冒险足迹。'],
      en: ['Where is the Memory Book, and what is it for?', 'Find the Memory Book at the bottom right of the adventure home screen. Use it to revisit words you have encountered. Your home screen also shows words encountered, words mastered, deepest area reached, and matching accuracy, helping you look back on your journey.']
    },
    {
      id: 'missing-progress', category: 'progress', keywords: '存档 保存 记录 丢失 恢复 save lost recovery data',
      zh: ['之前的进度没有显示，应该怎么办？', '先确认你使用的是上次的设备与游戏入口，再回到首页查看「继续探险」。排查时请先保留现有数据，避免卸载游戏或清理网站数据。如果仍然没有显示，请在反馈中说明设备、此前使用的入口、最近一次正常游玩的时间，以及是否进行过更新或数据清理。'],
      en: ['My previous progress is missing. What should I do?', 'First check that you are using the same device and game entry point as before, then look for Continue Adventure on the home screen. Preserve existing data while investigating; avoid uninstalling the game or clearing website data. If the issue persists, tell support your device, previous entry point, when you last played successfully, and whether you recently updated or cleared data.']
    },
    {
      id: 'offline', category: 'start', keywords: '网络 断网 联网 加载 网络连接 internet network connection',
      zh: ['可以离线冒险吗？', '游戏首页提供离线冒险。如果离线时无法正常进入，请先检查此前是否已经成功打开并加载过游戏，再尝试在网络可用时重新进入。如仍有问题，请记录无法进入的页面和提示内容，提交问题反馈。'],
      en: ['Can I play offline?', 'The game offers offline adventures. If you cannot enter while offline, check whether you have previously opened and loaded the game successfully, then try opening it with a working connection. If the problem continues, note the affected screen and any error message, and report the issue.']
    },
    {
      id: 'sound', category: 'technical', keywords: '声音 发音 听不到 静音 音量 sound audio volume mute pronunciation',
      zh: ['听不到声音或单词发音怎么办？', '先检查设备音量、静音状态，以及声音是否输出到了耳机或其他设备。如果使用浏览器，请同时检查页面是否被静音，并在与页面交互后重试。随后重新进入游戏；若只有某些单词没有声音，请在反馈中写明具体单词、词库和发生位置。'],
      en: ['What if I cannot hear audio or word pronunciation?', 'Check device volume, silent mode, and whether audio is going to headphones or another device. If you are using a browser, also check whether the page is muted, then interact with the page and try again. Reopen the game. If only certain words are affected, include the words, vocabulary set, and location in your report.']
    },
    {
      id: 'display', category: 'technical', keywords: '闪退 黑屏 白屏 卡顿 画面 按钮 crash freeze blank screen performance button',
      zh: ['页面卡住、按钮点不动或显示不完整怎么办？', '可以先关闭其他占用资源的应用，再退出并重新打开游戏。如果使用浏览器，请尝试更新浏览器并将页面缩放恢复到默认比例。请先不要清理数据；如果问题能够重复出现，记录每一步操作，并附上已遮盖个人信息的截图。'],
      en: ['What if the game freezes, buttons do not respond, or the screen looks wrong?', 'Try closing other resource-intensive apps, then close and reopen the game. If you are using a browser, try updating it and returning page zoom to its default setting. Do not clear data as a first step. If you can reproduce the problem, write down each step and attach a screenshot with personal information hidden.']
    },
    {
      id: 'word-error', category: 'progress', keywords: '错误 纠错 单词词义 翻译 bug typo translation definition',
      zh: ['发现单词释义、拼写或发音有疑问，如何反馈？', '请使用下方的「提交问题反馈」，写明具体单词、所选词库、出现位置，以及你认为需要核实的内容。如果方便，也可以提供不含个人信息的截图。越具体的线索，越有助于核对和改进。'],
      en: ['How do I report a possible spelling, meaning, or pronunciation issue?', 'Use Report an issue below. Include the exact word, selected vocabulary set, where it appeared, and what you think needs checking. A screenshot without personal information is also helpful. Specific examples make review and improvements easier.']
    }
  ];
  const guideTips = [
    ['选择与你的学习目标相符的词库。不必着急，适合自己的节奏，就是好节奏。', 'Choose the words that fit your goals. There’s no rush: your own pace is a good pace.'],
    ['第一次进入，点击「开启探险」；想接着玩，就选择首页的「继续探险」。', 'Starting fresh? Select Start Adventure. Returning for more? Choose Continue Adventure on the home screen.'],
    ['用「记忆之书」回顾遇见过的单词。偶尔回头看看，也是冒险的一部分。', 'Use your Memory Book to revisit the words you’ve met. Looking back is part of the adventure, too.']
  ];

  function repositoryUrl() {
    // Can also be configured for custom domains, without changing application code.
    const configured = document.querySelector('meta[name="support-repository"]')?.content.trim();
    if (configured) {
      try {
        const url = new URL(configured);
        if (url.protocol === 'https:' && url.hostname === 'github.com' && /^\/[\w.-]+\/[\w.-]+\/?$/.test(url.pathname)) return url.href.replace(/\/$/, '');
      } catch (_) { /* Leave preview mode active for invalid configuration. */ }
    }
    const match = location.hostname.match(/^([a-z\d-]+)\.github\.io$/i);
    if (!match) return null;
    const firstPart = location.pathname.split('/').filter(Boolean)[0];
    const repo = firstPart && !firstPart.includes('.') ? firstPart : `${match[1]}.github.io`;
    return `https://github.com/${match[1]}/${repo}`;
  }
  const repo = repositoryUrl();

  function renderFaq() {
    const query = $('#faqSearch').value.trim().toLocaleLowerCase();
    const openIds = new Set($$('#faqList details[open]').map(el => el.id));
    const results = faqData.filter(item => (state.category === 'all' || item.category === state.category) && (!query || [...item.zh, ...item.en, item.keywords].join(' ').toLocaleLowerCase().includes(query)));
    const fragment = document.createDocumentFragment();
    for (const item of results) {
      const details = document.createElement('details');
      details.id = `question-${item.id}`;
      details.open = openIds.has(details.id);
      const summary = document.createElement('summary');
      const label = document.createElement('span');
      label.textContent = item[state.language][0];
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('class', 'icon');
      icon.setAttribute('aria-hidden', 'true');
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttribute('href', '#plus');
      icon.append(use);
      summary.append(label, icon);
      const answer = document.createElement('div');
      answer.className = 'faq-answer';
      answer.textContent = item[state.language][1];
      details.append(summary, answer);
      fragment.append(details);
    }
    $('#faqList').replaceChildren(fragment);
    $('#emptyState').hidden = results.length !== 0;
    $('#searchResult').textContent = t(`找到 ${results.length} 个问题`, `${results.length} questions found`);
  }
  function chooseCategory(category) {
    state.category = category;
    $$('.filter').forEach(button => {
      const active = button.dataset.category === category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    renderFaq();
  }
  function setGuideStep(index) {
    state.step = index;
    $$('.guide-step').forEach((button, i) => {
      button.classList.toggle('active', i === index);
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
    });
    $('#guidePanel').setAttribute('aria-labelledby', `step${index + 1}`);
    $('#guideTip').textContent = guideTips[index][state.language === 'zh' ? 0 : 1];
    $('#screenshotMarker').className = `screenshot-marker ${['marker-vocabulary', 'marker-adventure', 'marker-memory'][index]}`;
  }
  function setLanguage(language) {
    state.language = language;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = t('怪兽英语大冒险 · 技术支持', 'Monster English · Technical Support');
    $$('[data-zh][data-en]').forEach(el => { el.textContent = el.dataset[language].replace(/\\n/g, '\n'); });
    $$('[data-placeholder-zh]').forEach(el => { el.placeholder = el.dataset[language === 'zh' ? 'placeholderZh' : 'placeholderEn'].replace(/\\n/g, '\n'); });
    $$('[data-aria-zh]').forEach(el => { el.setAttribute(el.tagName === 'IMG' ? 'alt' : 'aria-label', el.dataset[language === 'zh' ? 'ariaZh' : 'ariaEn']); });
    $('.brand').setAttribute('aria-label', t('怪兽英语大冒险 · 支持首页', 'Monster English · Support home'));
    $('#languageLabel').textContent = t('EN', '中文');
    $('#languageButton').setAttribute('aria-label', t('Switch to English', '切换为中文'));
    $('#feedbackIntro').textContent = repo ? t('填写后将打开 GitHub 的新问题页面。你可以检查内容，再决定提交。', 'This opens a new GitHub issue with your report. Review it there before submitting.') : t('填写以下信息，先看看你的问题报告。当前预览不会向 GitHub 提交内容。', 'Fill in the details to preview your report. This preview does not submit anything to GitHub.');
    $('#submitLabel').textContent = repo ? t('前往 GitHub 提交', 'Continue to GitHub') : t('预览问题报告', 'Preview report');
    if (!$('#reportPreview').hidden) $('#reportContent').textContent = buildReport();
    renderFaq();
    setGuideStep(state.step);
    try { localStorage.setItem('monster-support-language', language); } catch (_) { /* Storage is optional. */ }
  }
  function buildReport() {
    const data = new FormData($('#feedbackForm'));
    const title = String(data.get('title') || '').trim();
    const device = String(data.get('device') || '').trim();
    const version = String(data.get('version') || '').trim();
    const description = String(data.get('description') || '').trim();
    return t(
      `# ${title}\n\n项目：怪兽英语大冒险 / Monster English\n设备与系统：${device}\n游戏版本：${version || '未填写'}\n\n## 问题描述与操作步骤\n${description}\n\n## 补充信息\n请在 GitHub 中补充截图（可选），并遮盖个人信息。`,
      `# ${title}\n\nProject: Monster English\nDevice & system: ${device}\nGame version: ${version || 'Not specified'}\n\n## Description & steps to reproduce\n${description}\n\n## Additional information\nOptionally attach a screenshot on GitHub, with personal details hidden.`
    );
  }
  function validateReport() {
    const form = $('#feedbackForm');
    if (!form.reportValidity()) return false;
    for (const field of [form.elements.title, form.elements.device, form.elements.description]) {
      if (!field.value.trim()) {
        field.setCustomValidity(t('请填写有效内容。', 'Please enter a value.'));
        field.reportValidity();
        return false;
      }
    }
    return true;
  }
  function showPreview() {
    $('#reportContent').textContent = buildReport();
    $('#reportPreview').hidden = false;
    $('#reportPreview').scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  let lastFocus;
  const dialog = $('#feedbackDialog');
  function openFeedback() {
    lastFocus = document.activeElement;
    $('#feedbackStatus').textContent = '';
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    lastFocus?.focus({ preventScroll: true });
  });
  $('#closeDialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  $$('[data-open-feedback]').forEach(button => button.addEventListener('click', openFeedback));
  $('#feedbackForm').addEventListener('input', event => {
    if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
    $('#feedbackStatus').textContent = '';
    if (!$('#reportPreview').hidden) $('#reportContent').textContent = buildReport();
  });
  $('#feedbackForm').addEventListener('submit', event => {
    event.preventDefault();
    if (!validateReport()) return;
    if (!repo) { showPreview(); return; }
    const data = new FormData(event.currentTarget);
    const url = new URL(`${repo}/issues/new`);
    url.searchParams.set('title', `[Support] ${String(data.get('title')).trim()}`);
    url.searchParams.set('body', buildReport());
    const opened = window.open(url.href, '_blank', 'noopener,noreferrer');
    // A normal link remains available if the browser blocks popups.
    $('#feedbackStatus').replaceChildren();
    const link = document.createElement('a');
    link.href = url.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = t('点击这里查看 GitHub 问题草稿 →', 'Open your GitHub issue draft →');
    $('#feedbackStatus').append(link);
  });
  $('#copyFeedback').addEventListener('click', async () => {
    if (!validateReport()) return;
    const report = buildReport();
    let copied = false;
    try { await navigator.clipboard.writeText(report); copied = true; } catch (_) {
      const helper = document.createElement('textarea');
      helper.value = report;
      helper.setAttribute('aria-label', t('问题报告', 'Issue report'));
      helper.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      dialog.append(helper); helper.select();
      try { copied = document.execCommand('copy'); } catch (_) { /* Show selectable text instead. */ }
      helper.remove();
      $('#copyFeedback').focus();
    }
    if (copied) {
      $('#feedbackStatus').textContent = t('已复制问题信息。', 'Your report has been copied.');
    } else {
      showPreview();
      $('#feedbackStatus').textContent = t('无法自动复制，请选中下方的问题报告进行复制。', 'Automatic copying is unavailable. Select and copy the report below.');
    }
  });
  $('#languageButton').addEventListener('click', () => setLanguage(state.language === 'zh' ? 'en' : 'zh'));
  $('#faqSearch').addEventListener('input', renderFaq);
  $$('.filter').forEach(button => button.addEventListener('click', () => chooseCategory(button.dataset.category)));
  $$('[data-quick-category]').forEach(link => link.addEventListener('click', () => { $('#faqSearch').value = ''; chooseCategory(link.dataset.quickCategory); }));
  $$('.guide-step').forEach((button, index) => {
    button.addEventListener('click', () => setGuideStep(index));
    button.addEventListener('keydown', event => {
      if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (index + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : 2)) % 3;
      setGuideStep(next);
      $$('.guide-step')[next].focus();
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !dialog.open && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName) && !document.activeElement.isContentEditable) {
      event.preventDefault();
      $('#faqSearch').focus();
      $('#faqSearch').scrollIntoView({ block: 'center' });
    }
  });
  let initialLanguage = 'zh';
  try { if (localStorage.getItem('monster-support-language') === 'en') initialLanguage = 'en'; } catch (_) { /* Chinese is the default. */ }
  setLanguage(initialLanguage);
})();
