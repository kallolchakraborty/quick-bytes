// ---- Module-level state ----

var _scrollSpyCleanup = null;
var _mdCache = {};
var _searchIndex = null;
var _kvData = {};
var _pipeData = {};
var _pendingScrollId = null;

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
      var shown = {};
      index.forEach(function(entry) {
        var guide = entry.guide;
        var section = entry.section;
        var key = section ? section.id : guide.id;
        if (shown[key]) return;
        var guideMatch = guide.title.toLowerCase().includes(query) ||
          (guide.description || '').toLowerCase().includes(query) ||
          entry.phase.title.toLowerCase().includes(query);
        if (section) {
          if (guideMatch) return;
          var secMatch = section.title.toLowerCase().includes(query) ||
            (section.content && section.content.toLowerCase().includes(query));
          if (!secMatch) return;
        } else if (!guideMatch) {
          return;
        }
        shown[key] = true;
        matches.push(entry);
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

function readProgress() {
  try { return JSON.parse(localStorage.getItem('qb-progress') || '{}'); } catch(e) { return {}; }
}

function renderProgressBar(progressData) {
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
  function resolveHashToGuide(hash) {
    if (!hash) return null;
    var phases = QUICK_BYTES && QUICK_BYTES.phases ? QUICK_BYTES.phases : [];
    var guideId = null;
    var sectionId = null;
    phases.forEach(function(p) {
      (p.guides || []).forEach(function(g) {
        if (g.id === hash) guideId = g.id;
        (g.sections || []).forEach(function(s) {
          if (s.id === hash) { guideId = g.id; sectionId = s.id; }
        });
      });
    });
    if (!guideId) return null;
    return sectionId ? { guideId: guideId, sectionId: sectionId } : { guideId: guideId };
  }

function initDocs() {
  var currentGuide = null;
  var sidebarLinks = document.querySelectorAll('.sidebar-link');

  function updateProgress() {
    renderProgressBar(readProgress());
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
    html += '<div class="content-section" id="' + found.guide.id + '" data-guide-id="' + found.guide.id + '">';
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

    var kvSeq = 0;
    var pipeSeq = 0;
    if (found.guide.sections && found.guide.sections.length) {
      found.guide.sections.forEach(function(s) {
        html += '<h2 id="' + s.id + '"><span class="material-symbols-outlined section-icon" aria-hidden="true">' + (s.icon || 'article') + '</span>' + s.title + '</h2>';
        if (s.pipeline) {
          var pid = 'pipe' + (pipeSeq++);
          _pipeData[pid] = s.pipeline;
          html += '<div class="markdown-content"><div class="pipe-diagram" data-pid="' + pid + '">' + renderPipeline() + '</div></div>';
        } else if (s.kv) {
          var kid = 'kv' + (kvSeq++);
          _kvData[kid] = s.kv;
          html += '<div class="markdown-content"><div class="kv-diagram" data-kvid="' + kid + '">' + renderKV() + '</div></div>';
        } else if (s.tree) {
          html += '<div class="markdown-content ai-tree-wrap">' + renderTree(s.tree) + '</div>';
        } else if (s.content) {
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
    html += '<input type="checkbox" id="progress-check" ' + (readProgress()[found.guide.id] ? 'checked' : '') +
      ' class="w-4 h-4 rounded border-2 theme-border text-brand-500 focus:ring-brand-500 cursor-pointer">';
    html += '<label for="progress-check" class="text-sm theme-text-muted cursor-pointer select-none">Mark as completed</label>';
    html += '</div>';

    html += '</div>';
    content.innerHTML = html;

    // Highlight code blocks in the freshly rendered guide (content is injected
    // after Prism's initial DOMContentLoaded pass, so highlight it manually)
    if (window.Prism) Prism.highlightAllUnder(content);

    content.querySelectorAll('.kv-diagram').forEach(function(d) {
      var id = d.getAttribute('data-kvid');
      if (id && _kvData[id]) initKVStep(d, _kvData[id]);
    });
    content.querySelectorAll('.pipe-diagram').forEach(function(d) {
      var id = d.getAttribute('data-pid');
      if (id && _pipeData[id]) initPipeline(d, _pipeData[id]);
    });

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
    addHeadingAnchors();
    buildOutline();
    initScrollSpy();

    // Add code block header (language label + traffic lights) and copy button
    document.querySelectorAll('.content-section pre').forEach(function(pre) {
      var code = pre.querySelector('code');
      var header = document.createElement('div');
      header.className = 'code-block-header';
      var lang = code && (code.className.match(/language-(\w+)/) || [])[1];
      header.innerHTML = '<span class="code-block-dots"><span></span><span></span><span></span></span>' +
        '<span class="code-block-lang">' + (lang ? lang.toUpperCase() : 'CODE') + '</span>';
      pre.insertBefore(header, pre.firstChild);
      pre.classList.add('has-header');

      var btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.innerHTML = '<span class="material-symbols-outlined text-[14px]">content_copy</span> Copy';
      btn.addEventListener('click', function() {
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
    if (_pendingScrollId) {
      var pendingEl = document.getElementById(_pendingScrollId);
      if (pendingEl) {
        setTimeout(function() { pendingEl.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150);
        _pendingScrollId = null;
        return;
      }
      _pendingScrollId = null;
    }
    scrollToHash();
  }

  function renderMarkdown(text) {
    if (typeof marked === 'undefined') return text;
    if (_mdCache[text]) return _mdCache[text];
    try {
      var html = marked.parse(text);
      html = sanitizeHtml(html);
      _mdCache[text] = html;
      return html;
    } catch(e) {
      console.error('Markdown render error:', e);
      return '<div class="p-4 border border-red-300 dark:border-red-700 rounded-lg text-red-500 text-sm">Content rendering error. Please try refreshing.</div>';
    }
  }

  function renderTree(treeData) {
    if (!treeData) return '';
    var html = '<ul class="ai-tree" role="tree">';
    html += renderTreeNode(treeData, 0, 0);
    html += '</ul>';
    return html;
  }

  function renderTreeNode(node, depth, index) {
    if (!node) return '';
    var hasChildren = node.children && node.children.length > 0;
    var iconHtml = node.icon ? '<span class="material-symbols-outlined ai-tree-icon">' + node.icon + '</span>' : '';
    var html = '<li class="ai-tree-node" style="--depth:' + depth + ';--delay:' + (depth * 0.12 + index * 0.05).toFixed(2) + 's">';
    html += '<div class="ai-tree-card">';
    html += iconHtml;
    html += '<div class="ai-tree-text">';
    html += '<span class="ai-tree-label">' + node.label + '</span>';
    if (node.note) html += '<span class="ai-tree-note">' + node.note + '</span>';
    html += '</div>';
    html += '</div>';
    if (hasChildren) {
      html += '<ul class="ai-tree-children">';
      node.children.forEach(function(child, i) {
        html += renderTreeNode(child, depth + 1, i);
      });
      html += '</ul>';
    }
    html += '</li>';
    return html;
  }

  function renderKV() {
    var html = '<div class="kv-stage">';
    html += '<div class="kv-col"><div class="kv-col-label">Input sequence</div><div class="kv-tokens"></div></div>';
    html += '<div class="kv-col"><div class="kv-col-label">KV Cache</div><div class="kv-cache"></div></div>';
    html += '</div>';
    html += '<div class="kv-note"></div>';
    html += '<div class="kv-step-controls">';
    html += '<button class="kv-step-btn" data-act="prev"><span class="material-symbols-outlined">chevron_left</span> Prev</button>';
    html += '<span class="kv-step-indicator"></span>';
    html += '<button class="kv-step-btn" data-act="next">Next <span class="material-symbols-outlined">chevron_right</span></button>';
    html += '<button class="kv-step-btn kv-step-reset" data-act="reset"><span class="material-symbols-outlined">restart_alt</span> Reset</button>';
    html += '</div>';
    return html;
  }

  function initKVStep(wrapper, kv) {
    var prompt = kv.prompt || [];
    var frames = kv.frames || [];
    var genTotal = frames.length ? frames[frames.length - 1].gen.length : 0;
    var total = prompt.length + genTotal;
    var totalSteps = Math.max(0, frames.length - 1);
    var tokensEl = wrapper.querySelector('.kv-tokens');
    var cacheEl = wrapper.querySelector('.kv-cache');
    var noteEl = wrapper.querySelector('.kv-note');
    var indicatorEl = wrapper.querySelector('.kv-step-indicator');

    var tokenHtml = '';
    prompt.forEach(function(t, i) {
      tokenHtml += '<div class="kv-token kv-token-prompt" data-idx="' + i + '"><span class="kv-token-idx">' + i + '</span><span class="kv-token-text">' + t + '</span></div>';
    });
    for (var g = 0; g < genTotal; g++) {
      var idx = prompt.length + g;
      tokenHtml += '<div class="kv-token kv-token-gen" data-idx="' + idx + '"><span class="kv-token-idx">' + idx + '</span><span class="kv-token-text">' + (frames.length ? frames[frames.length - 1].gen[g] : '') + '</span></div>';
    }
    tokensEl.innerHTML = tokenHtml;

    var slotHtml = '';
    for (var c = 0; c < total; c++) {
      slotHtml += '<div class="kv-slot" data-slot="' + c + '"><span>K<sub>' + c + '</sub></span><span>V<sub>' + c + '</sub></span></div>';
    }
    cacheEl.innerHTML = slotHtml;

    var tokens = tokensEl.querySelectorAll('.kv-token');
    var slots = cacheEl.querySelectorAll('.kv-slot');
    var step = 0;

    function update(s) {
      step = Math.max(0, Math.min(totalSteps, s));
      var filled = prompt.length + step;
      var newIdx = filled - 1;
      tokens.forEach(function(tok) {
        var i = parseInt(tok.getAttribute('data-idx'), 10);
        var shown = i < filled;
        tok.style.display = shown ? '' : 'none';
        tok.classList.toggle('idx-new', shown && step > 0 && i === newIdx);
      });
      slots.forEach(function(sl) {
        var i = parseInt(sl.getAttribute('data-slot'), 10);
        var filledSlot = i < filled;
        sl.classList.toggle('filled', filledSlot);
        sl.classList.toggle('slot-new', filledSlot && step > 0 && i === newIdx);
      });
      if (noteEl) noteEl.textContent = (step === 0 ? (frames[0] ? frames[0].note : '') : (frames[step - 1] ? frames[step - 1].note : ''));
      if (indicatorEl) indicatorEl.textContent = 'Step ' + step + ' / ' + totalSteps;
    }

    wrapper.querySelectorAll('.kv-step-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var act = btn.getAttribute('data-act');
        if (act === 'prev') update(step - 1);
        else if (act === 'next') update(step + 1);
        else if (act === 'reset') update(0);
      });
    });

    update(0);
  }

  function renderPipeline() {
    var html = '<div class="pipe-stages"></div>';
    html += '<div class="kv-note pipe-note"></div>';
    html += '<div class="kv-step-controls">';
    html += '<button class="kv-step-btn" data-act="prev"><span class="material-symbols-outlined">chevron_left</span> Prev</button>';
    html += '<span class="kv-step-indicator"></span>';
    html += '<button class="kv-step-btn" data-act="next">Next <span class="material-symbols-outlined">chevron_right</span></button>';
    html += '<button class="kv-step-btn kv-step-reset" data-act="reset"><span class="material-symbols-outlined">restart_alt</span> Reset</button>';
    html += '</div>';
    return html;
  }

  function initPipeline(wrapper, data) {
    var stages = data.stages || [];
    var stagesEl = wrapper.querySelector('.pipe-stages');
    var noteEl = wrapper.querySelector('.pipe-note');
    var indicatorEl = wrapper.querySelector('.kv-step-indicator');
    var html = '';
    stages.forEach(function(st, i) {
      html += '<div class="pipe-stage" data-stage="' + i + '" style="--delay:' + (i * 0.08).toFixed(2) + 's">'
        + '<span class="material-symbols-outlined pipe-stage-icon">' + (st.icon || 'circle') + '</span>'
        + '<span class="pipe-stage-label">' + st.label + '</span></div>';
      if (i < stages.length - 1) {
        html += '<div class="pipe-arrow-wrap"><span class="material-symbols-outlined pipe-arrow">arrow_downward</span></div>';
      }
    });
    stagesEl.innerHTML = html;
    var stageEls = stagesEl.querySelectorAll('.pipe-stage');
    var active = 0;
    function update(a) {
      active = Math.max(0, Math.min(stages.length - 1, a));
      stageEls.forEach(function(el) {
        var i = parseInt(el.getAttribute('data-stage'), 10);
        el.classList.toggle('active', i === active);
      });
      if (noteEl) noteEl.textContent = stages[active] ? stages[active].note : '';
      if (indicatorEl) indicatorEl.textContent = 'Stage ' + (active + 1) + ' / ' + stages.length;
    }
    wrapper.querySelectorAll('.kv-step-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var act = btn.getAttribute('data-act');
        if (act === 'prev') update(active - 1);
        else if (act === 'next') update(active + 1);
        else if (act === 'reset') update(0);
      });
    });
    update(0);
  }

  function addHeadingAnchors() {
    var container = document.getElementById('docs-dynamic-content');
    if (!container) return;
    var slugCounts = {};
    container.querySelectorAll('h2, h3, h4').forEach(function(h) {
      if (!h.id) {
        var base = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        h.id = slugCounts[base] ? base + '-' + slugCounts[base] : base;
        slugCounts[base] = (slugCounts[base] || 0) + 1;
      }
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
      var clone = h.cloneNode(true);
      var ic = clone.querySelector('.section-icon'); if (ic) ic.remove();
      var an = clone.querySelector('.heading-anchor'); if (an) an.remove();
      var label = clone.textContent.trim();
      var tag = h.tagName.toLowerCase();
      var indent = tag === 'h3' ? ' style="padding-left:1.25rem"' : tag === 'h4' ? ' style="padding-left:2.25rem;font-size:0.75rem"' : '';
      html += '<a href="#' + h.id + '" data-heading="' + h.id + '"' + indent + '>' + label + '</a>';
    });
    html += '</div>';
    outline.innerHTML = html;
    outline.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        var id = a.getAttribute('data-heading');
        var el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (history.replaceState) history.replaceState(null, '', '#' + id);
        }
      });
    });
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
          _pendingScrollId = null;
          loadGuide(href.substring(1));
        }
      });
    });

  // popstate handler for browser back/forward
  window.addEventListener('popstate', function() {
    var hash = window.location.hash.substring(1);
    var resolved = resolveHashToGuide(hash);
    if (resolved) {
      if (resolved.sectionId) _pendingScrollId = resolved.sectionId;
      if (resolved.guideId !== currentGuide) {
        loadGuide(resolved.guideId);
      } else {
        scrollToHash();
      }
    }
  });

  // Load initial guide from hash or first available
  var initialHash = window.location.hash.substring(1);
  var resolved = resolveHashToGuide(initialHash);
  if (resolved) {
    if (resolved.sectionId) _pendingScrollId = resolved.sectionId;
    loadGuide(resolved.guideId);
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
  var progressData = readProgress();
  if (progressData[guideId]) {
    delete progressData[guideId];
  } else {
    progressData[guideId] = true;
  }
  localStorage.setItem('qb-progress', JSON.stringify(progressData));
  renderProgressBar(progressData);
}
