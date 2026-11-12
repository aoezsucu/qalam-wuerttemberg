'use strict';

async function loadGuideContent() {
  try {
    const response = await fetch('./neu-im-islam-content.json', { cache: 'no-cache' });
    if (!response.ok) return;
    const content = await response.json();
    if (!content || typeof content !== 'object') return;

    for (const element of document.querySelectorAll('[data-cms-text]')) {
      const [section, field] = element.dataset.cmsText.split('.');
      const value = content[section]?.[field];
      if (typeof value === 'string') element.textContent = value;
    }
  } catch {
    // The published HTML keeps the guide readable when the content file is unavailable.
  }
}

loadGuideContent();
