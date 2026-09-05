(function() {
  'use strict';

  var loaded = false;
  var root = typeof window !== 'undefined' ? window : null;

  // Parses a section's body: strips frontmatter + boilerplate, extracts
  // ```json diagram blocks (## Pipeline Diagram / ## Tree Data / KV) into
  // section.pipeline/.tree/.kv, and leaves the remaining prose as .content.
  function parseSectionBody(raw) {
    var body = raw.replace(/^---\n[\s\S]*?\n---\n?/, '');
    body = body.replace(/^\s*#\s[^\n]+\n?/, '');
    body = body.replace(/^\s*\*\*Icon:\*\*[^\n]*\n?/, '');

    var section = {};
    var diagramRe = /##\s*([^\n]+?)\s*(?:Diagram|Data)\s*\n+```json\s*\n([\s\S]*?)```\s*\n?/g;
    body = body.replace(diagramRe, function(match, label, jsonText) {
      try {
        var data = JSON.parse(jsonText);
        if (/pipeline/i.test(label)) section.pipeline = data;
        else if (/tree/i.test(label)) section.tree = data;
        else section.kv = data;
      } catch (e) {
        console.warn('OKF: unparseable diagram JSON:', e.message);
      }
      return '';
    });

    body = body.replace(/\n{3,}/g, '\n\n').trim();
    if (body) section.content = body;
    return section;
  }

  function loadSections(data, bust) {
    var sections = [];
    (data.phases || []).forEach(function(p) {
      (p.guides || []).forEach(function(g) {
        (g.sections || []).forEach(function(s) { sections.push(s); });
      });
    });
    return Promise.all(sections.map(function(s) {
      return fetch(s.file + '?v=' + bust)
        .then(function(res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.text();
        })
        .then(function(md) {
          var sec = parseSectionBody(md);
          if (sec.content) s.content = sec.content;
          if (sec.tree) s.tree = sec.tree;
          if (sec.pipeline) s.pipeline = sec.pipeline;
          if (sec.kv) s.kv = sec.kv;
        })
        .catch(function(err) {
          console.warn('OKF loader: skipped ' + s.file + ' - ' + err.message);
        });
    }));
  }

  function apply(data) {
    var total = 0;
    (data.phases || []).forEach(function(p) { total += (p.guides || []).length; });
    var out = {
      site: data.site || {},
      stats: { guides: total, phases: (data.phases || []).length },
      phases: data.phases || []
    };
    if (!root) return;
    root.QUICK_BYTES = out;
    loaded = true;
    console.log('OKF content loaded: %d guides across %d phases', out.stats.guides, out.stats.phases);
    root.dispatchEvent(new Event('okf-ready'));
    root.dispatchEvent(new Event('okf-reload'));
  }

  function initLoader() {
    var bust = Date.now();
    fetch('okf/index.json?v=' + bust)
      .then(function(res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function(data) {
        return loadSections(data, bust).then(function() { return data; });
      })
      .then(apply)
      .catch(function(err) {
        console.error('OKF loader failed:', err.message);
        document.documentElement.innerHTML = '<body style="font-family:sans-serif;padding:2rem;background:#fef2f2;color:#991b1b"><h1>Failed to load content</h1><p>Could not load <code>okf/index.json</code>. Please refresh the page.</p></body>';
      });
  }

  if (root) {
    root.OkfLoader = {
      isLoaded: function() { return loaded; },
      getData: function() { return root.QUICK_BYTES; }
    };
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { parseSectionBody: parseSectionBody };
  if (root && typeof document !== 'undefined') initLoader();
})();