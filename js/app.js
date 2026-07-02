// ---- Module-level state ----

var _scrollSpyCleanup = null;
var _mdCache = {};
var _searchIndex = null;

function sanitizeHtml(html) {
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  html = html.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '');
  html = html.replace(/href\s*=\s*(?:"javascript:[^"]*"|'javascript:[^']*')/gi, 'href="#"');
  return html;
}

function buildSearchIndex() {
  if (_searchIndex) return _searchIndex;
  var index = [];
  var phases = QUICK_BYTES && QUICK_BYTES.phases ? QUICK_BYTES.phases : [];
  phases.forEach(function(phase) {
    (phase.guides || []).forEach(function(guide) {
      index.push({ phase: phase, guide: guide, section: null });
      (guide.sections || []).forEach(function(s) {
        index.push({ phase: phase, guide: guide, section: s });
      });
    });
  });
  _searchIndex = index;
  return index;
}

document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle
  var themeToggle = document.querySelector('.theme-toggle-btn');
  if (themeToggle) {
    updateThemeIcon();
    themeToggle.addEventListener('click', function() {
      var isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('qb-theme', isDark ? 'dark' : 'light');
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    if (!themeToggle) return;
    var isDark = document.documentElement.classList.contains('dark');
    themeToggle.innerHTML = '<span class="material-symbols-outlined text-[16px]">' +
      (isDark ? 'dark_mode' : 'light_mode') + '</span>';
  }

  // Search modal
  var searchOpenBtns = document.querySelectorAll('.open-search-btn');
  var searchModal = document.getElementById('search-modal');
  var searchBackdrop = document.getElementById('search-backdrop');
  var searchClose = document.getElementById('search-close');
  var searchInput = document.getElementById('search-input');

  function openSearch() {
    if (!searchModal || !searchBackdrop) return;
    searchModal.classList.remove('hidden');
    searchBackdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(function() {
      if (searchInput) searchInput.focus();
    }, 100);
  }

  function closeSearch() {
    if (!searchModal || !searchBackdrop) return;
    searchModal.classList.add('hidden');
    searchBackdrop.classList.add('hidden');
    document.body.style.overflow = '';
    if (searchInput) searchInput.blur();
  }

  searchOpenBtns.forEach(function(btn) {
    btn.addEventListener('click', openSearch);
  });

  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchBackdrop) searchBackdrop.addEventListener('click', closeSearch);

  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (searchModal && searchModal.classList.contains('hidden')) {
        openSearch();
      } else {
        closeSearch();
      }
    }
    if (e.key === 'Escape') {
      closeSearch();
    }
  });

  // Focus trap in search modal
  if (searchModal) {
    searchModal.addEventListener('keydown', function(e) {
      if (e.key !== 'Tab') return;
      var focusable = searchModal.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // Search functionality (uses pre-built index)
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var query = this.value.toLowerCase().trim();
      var results = document.getElementById('search-results');
      if (!results) return;
      if (!query) {
        results.innerHTML = '<div class="p-4 text-sm theme-text-muted text-center">Type to search guides...</div>';
        return;
      }
      var index = buildSearchIndex();
      var matches = [];
      index.forEach(function(entry) {
        var guide = entry.guide;
        var section = entry.section;
        var match = guide.title.toLowerCase().includes(query) ||
          (guide.description || '').toLowerCase().includes(query) ||
          entry.phase.title.toLowerCase().includes(query);
        if (!match && section) {
          match = section.title.toLowerCase().includes(query) ||
            (section.content && section.content.toLowerCase().includes(query));
        }
        if (match) {
          matches.push(entry);
        }
      });
      if (matches.length === 0) {
        results.innerHTML = '<div class="p-4 text-sm theme-text-muted text-center">No guides found for "' + query + '"</div>';
        return;
      }
      var html = '<div class="p-2 space-y-0.5">';
      matches.forEach(function(m) {
        var href = 'docs.html#' + m.guide.id;
        if (m.section) href = 'docs.html#' + m.section.id;
        html += '<a href="' + href + '" class="search-result-item block px-3 py-2 rounded-lg transition-colors">' +
          '<div class="text-sm font-medium theme-text">' + m.guide.title + '</div>' +
          '<div class="text-xs theme-text-muted mt-0.5">' + m.phase.title +
          (m.section ? ' &middot; ' + m.section.title : '') +
          '</div>' +
        '</a>';
      });
      html += '</div>';
      results.innerHTML = html;
      // Attach click handlers to close search
      results.querySelectorAll('.search-result-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
          closeSearch();
        });
      });
    });
  }

  // Mobile sidebar toggle
  var sidebarToggle = document.getElementById('sidebar-toggle');
  var leftSidebar = document.getElementById('left-sidebar');
  var sidebarBackdrop = document.getElementById('sidebar-backdrop');

  function openSidebar() {
    if (!leftSidebar || !sidebarBackdrop) return;
    leftSidebar.classList.remove('-translate-x-full');
    sidebarBackdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (!leftSidebar || !sidebarBackdrop) return;
    leftSidebar.classList.add('-translate-x-full');
    sidebarBackdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function() {
      if (leftSidebar && leftSidebar.classList.contains('-translate-x-full')) {
        openSidebar();
      } else {
        closeSidebar();
      }
    });
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeSidebar);
  }

  if (leftSidebar) {
    leftSidebar.querySelectorAll('.sidebar-link').forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth < 1024) closeSidebar();
      });
    });
  }

  window.addEventListener('resize', function() {
    if (window.innerWidth >= 1024) {
      if (sidebarBackdrop) sidebarBackdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  // Share modal
  var shareBtns = document.querySelectorAll('.open-share-btn');
  var shareModal = document.getElementById('share-modal');
  var shareBackdrop = document.getElementById('share-backdrop');
  var shareClose = document.getElementById('share-close');

  function openShare() {
    if (!shareModal || !shareBackdrop) return;
    shareModal.classList.remove('hidden');
    shareBackdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeShare() {
    if (!shareModal || !shareBackdrop) return;
    shareModal.classList.add('hidden');
    shareBackdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  shareBtns.forEach(function(btn) {
    btn.addEventListener('click', openShare);
  });

  if (shareClose) shareClose.addEventListener('click', closeShare);
  if (shareBackdrop) shareBackdrop.addEventListener('click', closeShare);

  // Diagram fullscreen modal
  var diagramModal = document.getElementById('diagram-modal');
  var diagramClose = document.getElementById('diagram-modal-close');
  var diagramContent = document.getElementById('diagram-modal-content');

  function openDiagram(src) {
    if (!diagramModal || !diagramContent) return;
    diagramContent.innerHTML = '';
    var obj = document.createElement('object');
    obj.type = 'image/svg+xml';
    obj.data = src;
    obj.setAttribute('aria-label', 'Diagram fullscreen view');
    diagramContent.appendChild(obj);
    diagramModal.classList.remove('hidden');
    diagramModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeDiagram() {
    if (!diagramModal) return;
    diagramModal.classList.add('hidden');
    diagramModal.classList.remove('flex');
    document.body.style.overflow = '';
    setTimeout(function() { if (diagramContent) diagramContent.innerHTML = ''; }, 200);
  }

  if (diagramClose) diagramClose.addEventListener('click', closeDiagram);
  if (diagramModal) {
    diagramModal.addEventListener('click', function(e) {
      if (e.target === diagramModal) closeDiagram();
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && diagramModal && !diagramModal.classList.contains('hidden')) {
      closeDiagram();
    }
  });

  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.diagram-expand-btn');
    if (!btn) return;
    e.preventDefault();
    var wrapper = btn.closest('.diagram-wrapper');
    if (!wrapper) return;
    var obj = wrapper.querySelector('object');
    if (!obj) return;
    var src = obj.getAttribute('data');
    if (src) openDiagram(src);
  });

  var copyLinkBtn = document.getElementById('copy-link-btn');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', function() {
      var url = window.location.href;
      navigator.clipboard.writeText(url).then(function() {
        var orig = copyLinkBtn.textContent;
        copyLinkBtn.textContent = 'Copied!';
        setTimeout(function() { copyLinkBtn.textContent = orig; }, 2000);
      });
    });
  }
});

function loadBookmarks() {
  try { return JSON.parse(localStorage.getItem('qb-bookmarks') || '[]'); } catch(e) { return []; }
}

function updateBookmarksSidebar() {
  var container = document.getElementById('sidebar-bookmarks');
  if (!container) return;
  var list = loadBookmarks();
  if (!list.length) { container.innerHTML = ''; return; }
  var html = '<div class="sidebar-section-header">Bookmarks</div>';
  html += '<div class="space-y-0.5">';
  var index = buildSearchIndex();
  list.forEach(function(id) {
    var found = null;
    for (var i = 0; i < index.length; i++) {
      if (index[i].guide.id === id && !index[i].section) {
        found = index[i].guide;
        break;
      }
    }
    if (found) {
      html += '<div class="sidebar-bookmark-item">';
      html += '<span class="material-symbols-outlined icon">bookmark</span>';
      html += '<a href="docs.html#' + id + '">' + found.title + '</a>';
      html += '</div>';
    }
  });
  html += '</div>';
  container.innerHTML = html;
}

// Docs-specific logic
function initDocs() {
  var currentGuide = null;
  var sidebarLinks = document.querySelectorAll('.sidebar-link');
  var progressData = loadProgress();

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem('qb-progress') || '{}');
    } catch(e) { return {}; }
  }

  function saveProgress() {
    localStorage.setItem('qb-progress', JSON.stringify(progressData));
  }

  function updateProgress() {
    var total = 0;
    var completed = 0;
    var phases = QUICK_BYTES && QUICK_BYTES.phases ? QUICK_BYTES.phases : [];
    phases.forEach(function(p) {
      (p.guides || []).forEach(function(g) {
        total++;
        if (progressData[g.id]) completed++;
      });
    });
    var pct = total ? Math.round((completed / total) * 100) : 0;
    var bar = document.getElementById('sidebar-progress-bar');
    var text = document.getElementById('sidebar-progress-text');
    if (bar) bar.style.width = pct + '%';
    if (text) text.textContent = completed + '/' + total + ' · ' + pct + '%';
  }

  function loadGuide(guideId) {
    try {
      _loadGuide(guideId);
    } catch(e) {
      console.error('Failed to load guide:', e);
      var content = document.getElementById('docs-dynamic-content');
      if (content) {
        content.innerHTML = '<div class="content-section py-12 text-center"><div class="material-symbols-outlined text-4xl theme-text-muted mb-3">error_outline</div><h2 class="text-xl font-semibold mb-2">Failed to load guide</h2><p class="theme-text-muted mb-4">Something went wrong. Please try again.</p><button onclick="location.reload()" class="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg transition-colors">Reload</button></div>';
      }
    }
  }

  function _loadGuide(guideId) {
    var phases = QUICK_BYTES && QUICK_BYTES.phases ? QUICK_BYTES.phases : [];
    var found = null;
    phases.forEach(function(p) {
      (p.guides || []).forEach(function(g) {
        if (g.id === guideId) {
          found = { phase: p, guide: g };
        }
      });
    });
    if (!found) return;

    currentGuide = found.guide.id;
    var content = document.getElementById('docs-dynamic-content');
    if (!content) return;

    // Update active sidebar link
    sidebarLinks.forEach(function(l) { l.classList.remove('active'); });
    var activeLink = document.querySelector('.sidebar-link[href="#' + guideId + '"]');
    if (activeLink) activeLink.classList.add('active');

    // Update URL hash
    if (window.location.hash !== '#' + guideId) {
      history.pushState(null, '', '#' + guideId);
    }

    // Pre-compute reading time (memoized per guide)
    var readTime = found.guide._readTime;
    if (!readTime) {
      var totalWords = 0;
      if (found.guide.sections) {
        found.guide.sections.forEach(function(s) {
          if (s.content) totalWords += s.content.split(/\s+/).filter(Boolean).length;
        });
      }
      readTime = Math.max(1, Math.round(totalWords / 200));
      found.guide._readTime = readTime;
    }

    // Check bookmark state
    var bookmarks = loadBookmarks();
    var isBookmarked = bookmarks.indexOf(guideId) > -1;

    // Build content HTML
    var html = '';
    html += '<div class="content-section" data-guide-id="' + found.guide.id + '">';
    html += '<h1 tabindex="-1">' + found.guide.title + '</h1>';
    html += '<div class="flex flex-wrap items-center gap-2 text-xs theme-text-muted mb-6">';
    html += '<span class="px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 font-medium">' + found.phase.title + '</span>';
    html += '<span class="px-2 py-0.5 rounded-full theme-bg-subtle theme-border border font-medium">' + found.phase.level + '</span>';
    html += '<span class="flex items-center gap-1 px-2 py-0.5 rounded-full theme-bg-subtle theme-border border">';
    html += '<span class="material-symbols-outlined text-[12px]">schedule</span> ' + readTime + ' min read</span>';
    html += '<button id="bookmark-btn-' + guideId + '" class="flex items-center gap-1 px-2 py-0.5 rounded-full theme-bg-subtle theme-border border hover:text-brand-500 transition-colors" aria-label="Bookmark this guide">';
    html += '<span class="material-symbols-outlined text-[14px]">' + (isBookmarked ? 'bookmark' : 'bookmark_border') + '</span>';
    html += '</button>';
    html += '</div>';

    if (found.guide.description) {
      html += '<p class="text-base theme-text-muted mb-8 leading-relaxed">' + found.guide.description + '</p>';
    }

    if (found.guide.sections && found.guide.sections.length) {
      found.guide.sections.forEach(function(s) {
        html += '<h2 id="' + s.id + '">' + s.title + '</h2>';
        if (s.content) {
          html += '<div class="markdown-content">' + renderMarkdown(s.content) + '</div>';
        }
      });
    } else {
      html += '<div class="py-12 text-center">';
      html += '<div class="material-symbols-outlined text-4xl theme-text-muted mb-3">edit_note</div>';
      html += '<p class="text-base theme-text-muted">Content coming soon. This guide is being drafted.</p>';
      html += '</div>';
    }

    // Progress checkbox
    html += '<div class="mt-8 pt-6 border-t theme-border flex items-center gap-3">';
    html += '<input type="checkbox" id="progress-check" ' + (progressData[found.guide.id] ? 'checked' : '') +
      ' class="w-4 h-4 rounded border-2 theme-border text-brand-500 focus:ring-brand-500 cursor-pointer">';
    html += '<label for="progress-check" class="text-sm theme-text-muted cursor-pointer select-none">Mark as completed</label>';
    html += '</div>';

    html += '</div>';
    content.innerHTML = html;

    // Attach bookmark click handler (no inline onclick)
    var bookmarkBtn = document.getElementById('bookmark-btn-' + guideId);
    if (bookmarkBtn) {
      bookmarkBtn.addEventListener('click', function() {
        toggleBookmark(guideId);
      });
    }

    // Attach progress checkbox handler
    var progressCheck = document.getElementById('progress-check');
    if (progressCheck) {
      progressCheck.addEventListener('change', function() {
        toggleProgress(guideId);
      });
    }

    // Right outline and scrollspy
    buildOutline();
    initScrollSpy();

    // Add heading anchor links
    addHeadingAnchors();

    // Add copy buttons to code blocks
    document.querySelectorAll('.content-section pre').forEach(function(pre) {
      var btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.innerHTML = '<span class="material-symbols-outlined text-[14px]">content_copy</span> Copy';
      btn.addEventListener('click', function() {
        var code = pre.querySelector('code');
        if (!code) return;
        navigator.clipboard.writeText(code.textContent).then(function() {
          btn.innerHTML = '<span class="material-symbols-outlined text-[14px]">check</span> Copied';
          btn.classList.add('copied');
          setTimeout(function() {
            btn.innerHTML = '<span class="material-symbols-outlined text-[14px]">content_copy</span> Copy';
            btn.classList.remove('copied');
          }, 2000);
        });
      });
      pre.appendChild(btn);
      pre.style.position = 'relative';
    });

    // Wrap tables in scrollable container
    document.querySelectorAll('.content-section table').forEach(function(table) {
      var wrapper = document.createElement('div');
      wrapper.className = 'table-wrapper';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    // Focus management: move focus to the heading
    var firstHeading = content.querySelector('h1');
    if (firstHeading) {
      firstHeading.focus({ preventScroll: true });
    }

    updateProgress();
    updateBookmarksSidebar();
    scrollToHash();
  }

  function renderMarkdown(text) {
    if (typeof marked === 'undefined') return text;
    if (_mdCache[text]) return _mdCache[text];
    try {
      var html = marked.parse(text);
      html = sanitizeHtml(html);
      html = html.replace(/<p>\s*(<object\b[\s\S]*?<\/object>)\s*<\/p>/gi, '$1');
      html = html.replace(/<object\b([^>]*)><\/object>/gi, '<div class="diagram-wrapper"><object $1 loading="lazy"></object><button class="diagram-expand-btn" aria-label="View fullscreen"><span class="material-symbols-outlined">fullscreen</span><span>View fullscreen</span></button></div>');
      _mdCache[text] = html;
      return html;
    } catch(e) {
      console.error('Markdown render error:', e);
      return '<div class="p-4 border border-red-300 dark:border-red-700 rounded-lg text-red-500 text-sm">Content rendering error. Please try refreshing.</div>';
    }
  }

  function addHeadingAnchors() {
    var container = document.getElementById('docs-dynamic-content');
    if (!container) return;
    container.querySelectorAll('h2[id], h3[id], h4[id]').forEach(function(h) {
      if (h.querySelector('.heading-anchor')) return;
      var a = document.createElement('a');
      a.className = 'heading-anchor';
      a.href = '#' + h.id;
      a.setAttribute('aria-label', 'Link to ' + h.textContent);
      a.textContent = '#';
      h.appendChild(a);
    });
  }

  function buildOutline() {
    var container = document.getElementById('docs-dynamic-content');
    var outline = document.getElementById('docs-right-outline');
    if (!container || !outline) return;
    var headings = container.querySelectorAll('h2, h3, h4');
    if (!headings.length) { outline.innerHTML = ''; return; }
    var html = '<div class="table-of-contents">';
    headings.forEach(function(h) {
      if (!h.id) return;
      var tag = h.tagName.toLowerCase();
      var indent = tag === 'h3' ? ' style="padding-left:1.25rem"' : tag === 'h4' ? ' style="padding-left:2.25rem;font-size:0.75rem"' : '';
      html += '<a href="#' + h.id + '" data-heading="' + h.id + '"' + indent + '>' + h.textContent + '</a>';
    });
    html += '</div>';
    outline.innerHTML = html;
  }

  function initScrollSpy() {
    var container = document.getElementById('docs-dynamic-content');
    var outline = document.getElementById('docs-right-outline');
    if (!container || !outline) return;
    var headings = container.querySelectorAll('h2, h3, h4');
    var links = outline.querySelectorAll('.table-of-contents a');
    if (!headings.length || !links.length) return;

    // Clean up previous scroll listener
    if (_scrollSpyCleanup) {
      _scrollSpyCleanup();
      _scrollSpyCleanup = null;
    }

    function updateActive() {
      var activeId = null;
      for (var i = 0; i < headings.length; i++) {
        var rect = headings[i].getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          activeId = headings[i].id;
        }
      }
      if (!activeId && headings.length > 0) {
        activeId = headings[0].id;
      }
      links.forEach(function(a) {
        a.classList.toggle('active', a.getAttribute('data-heading') === activeId);
      });
    }

    var scrollEl = document.getElementById('docs-scroll-container') || window;
    var ticking = false;
    var handler = function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          updateActive();
          ticking = false;
        });
        ticking = true;
      }
    };
    scrollEl.addEventListener('scroll', handler);
    _scrollSpyCleanup = function() {
      scrollEl.removeEventListener('scroll', handler);
    };
    updateActive();
  }

  function scrollToHash() {
    if (window.location.hash) {
      var el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(function() { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
      }
    }
  }

  // Handle sidebar link clicks
  sidebarLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        loadGuide(href.substring(1));
      }
    });
  });

  // popstate handler for browser back/forward
  window.addEventListener('popstate', function() {
    var hash = window.location.hash.substring(1);
    if (hash) {
      if (hash !== currentGuide) {
        loadGuide(hash);
      } else {
        scrollToHash();
      }
    }
  });

  // Load initial guide from hash or first available
  var initialHash = window.location.hash.substring(1);
  if (initialHash) {
    loadGuide(initialHash);
  } else {
    var phases = QUICK_BYTES && QUICK_BYTES.phases ? QUICK_BYTES.phases : [];
    var first = null;
    for (var i = 0; i < phases.length; i++) {
      if (phases[i].guides && phases[i].guides.length) {
        first = phases[i].guides[0].id;
        break;
      }
    }
    if (first) {
      loadGuide(first);
    }
  }

  updateProgress();
}

function toggleBookmark(guideId) {
  var list = loadBookmarks();
  var idx = list.indexOf(guideId);
  if (idx > -1) { list.splice(idx, 1); } else { list.push(guideId); }
  localStorage.setItem('qb-bookmarks', JSON.stringify(list));
  var btn = document.getElementById('bookmark-btn-' + guideId);
  var icon = btn && btn.querySelector('.material-symbols-outlined');
  if (icon) {
    icon.textContent = idx > -1 ? 'bookmark_border' : 'bookmark';
    icon.style.transform = 'scale(1.3)';
    icon.style.transition = 'transform 0.15s ease';
    setTimeout(function() { icon.style.transform = 'scale(1)'; }, 150);
  }
  updateBookmarksSidebar();
}

function toggleProgress(guideId) {
  var progressData = JSON.parse(localStorage.getItem('qb-progress') || '{}');
  if (progressData[guideId]) {
    delete progressData[guideId];
  } else {
    progressData[guideId] = true;
  }
  localStorage.setItem('qb-progress', JSON.stringify(progressData));
  var total = 0;
  var completed = 0;
  var phases = QUICK_BYTES && QUICK_BYTES.phases ? QUICK_BYTES.phases : [];
  phases.forEach(function(p) {
    (p.guides || []).forEach(function(g) {
      total++;
      if (progressData[g.id]) completed++;
    });
  });
  var pct = total ? Math.round((completed / total) * 100) : 0;
  var bar = document.getElementById('sidebar-progress-bar');
  var text = document.getElementById('sidebar-progress-text');
  if (bar) bar.style.width = pct + '%';
  if (text) text.textContent = completed + '/' + total + ' · ' + pct + '%';
}

// Close search function for inline onclick (kept for backward compat)
function closeSearch() {
  var modal = document.getElementById('search-modal');
  var backdrop = document.getElementById('search-backdrop');
  if (modal) modal.classList.add('hidden');
  if (backdrop) backdrop.classList.add('hidden');
  document.body.style.overflow = '';
}
