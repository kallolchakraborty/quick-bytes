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

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var query = this.value.toLowerCase().trim();
      var results = document.getElementById('search-results');
      if (!results) return;
      if (!query) {
        results.innerHTML = '<div class="p-4 text-sm theme-text-muted text-center">Type to search guides...</div>';
        return;
      }
      var matches = [];
      var phases = QUICK_BYTES && QUICK_BYTES.phases ? QUICK_BYTES.phases : [];
      phases.forEach(function(phase) {
        (phase.guides || []).forEach(function(guide) {
          var titleMatch = guide.title.toLowerCase().includes(query);
          var descMatch = (guide.description || '').toLowerCase().includes(query);
          var phaseMatch = phase.title.toLowerCase().includes(query);
          if (titleMatch || descMatch || phaseMatch) {
            matches.push({ phase: phase, guide: guide });
          }
        });
      });
      if (matches.length === 0) {
        results.innerHTML = '<div class="p-4 text-sm theme-text-muted text-center">No guides found for "' + query + '"</div>';
        return;
      }
      var html = '<div class="p-2 space-y-0.5">';
      matches.forEach(function(m) {
        html += '<a href="docs.html#' + m.guide.id + '" class="block px-3 py-2 rounded-lg hover:theme-bg-subtle transition-colors" onclick="closeSearch()">' +
          '<div class="text-sm font-medium theme-text">' + m.guide.title + '</div>' +
          '<div class="text-xs theme-text-muted mt-0.5">' + m.phase.title + ' (' + m.phase.level + ')</div>' +
        '</a>';
      });
      html += '</div>';
      results.innerHTML = html;
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

function updateBookmarksSidebar() {
  var container = document.getElementById('sidebar-bookmarks');
  if (!container) return;
  var list = loadBookmarks();
  if (!list.length) { container.innerHTML = ''; return; }
  var html = '<div class="px-3 py-3 border-b theme-border">';
  html += '<div class="flex items-center justify-between text-xs font-bold theme-text mb-1.5">';
  html += '<span>Bookmarked</span>';
  html += '<span class="text-brand-500 text-[10px]">' + list.length + '</span>';
  html += '</div><div class="space-y-0.5">';
  var phases = QUICK_BYTES && QUICK_BYTES.phases ? QUICK_BYTES.phases : [];
  list.forEach(function(id) {
    var found = null;
    phases.forEach(function(p) {
      (p.guides || []).forEach(function(g) {
        if (g.id === id) found = g;
      });
    });
    if (found) {
      html += '<a href="docs.html#' + id + '" class="block text-xs theme-text-muted hover:text-brand-500 py-0.5 truncate transition-colors">' + found.title + '</a>';
    }
  });
  html += '</div></div>';
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
    var stats = document.getElementById('sidebar-progress-stats');
    if (bar) bar.style.width = pct + '%';
    if (text) text.textContent = pct + '%';
    if (stats) stats.textContent = completed + ' of ' + total + ' topics completed';
  }

  function loadGuide(guideId) {
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

    // Calculate reading time
    var totalWords = 0;
    if (found.guide.sections) {
      found.guide.sections.forEach(function(s) {
        if (s.content) totalWords += s.content.split(/\s+/).filter(Boolean).length;
      });
    }
    var readTime = Math.max(1, Math.round(totalWords / 200));

    // Check bookmark state
    var bookmarks = loadBookmarks();
    var isBookmarked = bookmarks.indexOf(guideId) > -1;

    // Build content HTML
    var html = '';
    html += '<div class="content-section" data-guide-id="' + found.guide.id + '">';
    html += '<h1>' + found.guide.title + '</h1>';
    html += '<div class="flex flex-wrap items-center gap-2 text-xs theme-text-muted mb-6">';
    html += '<span class="px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 font-medium">' + found.phase.title + '</span>';
    html += '<span class="px-2 py-0.5 rounded-full theme-bg-subtle theme-border border font-medium">' + found.phase.level + '</span>';
    html += '<span class="flex items-center gap-1 px-2 py-0.5 rounded-full theme-bg-subtle theme-border border">';
    html += '<span class="material-symbols-outlined text-[12px]">schedule</span> ' + readTime + ' min read</span>';
    html += '<button onclick="toggleBookmark(\'' + guideId + '\')" class="flex items-center gap-1 px-2 py-0.5 rounded-full theme-bg-subtle theme-border border hover:text-brand-500 transition-colors" aria-label="Bookmark this guide">';
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
      ' class="w-4 h-4 rounded border-2 theme-border text-brand-500 focus:ring-brand-500 cursor-pointer" onchange="toggleProgress(\'' + found.guide.id + '\')">';
    html += '<label for="progress-check" class="text-sm theme-text-muted cursor-pointer select-none">Mark as completed</label>';
    html += '</div>';

    html += '</div>';
    content.innerHTML = html;

    // Right outline
    updateOutline(found.guide, found.phase);

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

    updateProgress();
    updateBookmarksSidebar();
    scrollToHash();
  }

  function renderMarkdown(text) {
    if (typeof marked !== 'undefined') {
      return marked.parse(text);
    }
    return text;
  }

  function updateOutline(guide, phase) {
    var outline = document.getElementById('docs-right-outline');
    if (!outline) return;
    var html = '<div class="table-of-contents">';
    if (guide.sections && guide.sections.length) {
      guide.sections.forEach(function(s) {
        html += '<a href="#' + s.id + '">' + s.title + '</a>';
      });
    }
    html += '</div>';
    outline.innerHTML = html;
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

  // Reading progress bar
  var progressBar = document.getElementById('reading-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', function() {
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrollPos = window.scrollY;
      var pct = docHeight ? Math.min(scrollPos / docHeight, 1) : 0;
      progressBar.style.transform = 'scaleX(' + pct + ')';
    });
  }

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
  var icon = document.querySelector('.content-section button[onclick*="' + guideId + '"] .material-symbols-outlined');
  if (icon) icon.textContent = idx > -1 ? 'bookmark_border' : 'bookmark';
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
  var stats = document.getElementById('sidebar-progress-stats');
  if (bar) bar.style.width = pct + '%';
  if (text) text.textContent = pct + '%';
  if (stats) stats.textContent = completed + ' of ' + total + ' topics completed';
}

// Close search function for inline onclick
function closeSearch() {
  var modal = document.getElementById('search-modal');
  var backdrop = document.getElementById('search-backdrop');
  if (modal) modal.classList.add('hidden');
  if (backdrop) backdrop.classList.add('hidden');
  document.body.style.overflow = '';
}
