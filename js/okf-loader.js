(function() {
  'use strict';

  var OKF_BUNDLE_URL = 'okf/bundle.json?v=' + Date.now();
  var loaded = false;

  function stripMeta(obj) {
    if (Array.isArray(obj)) return obj.map(stripMeta);
    if (obj && typeof obj === 'object') {
      var copy = {};
      Object.keys(obj).forEach(function(k) {
        if (k !== '_okf') copy[k] = stripMeta(obj[k]);
      });
      return copy;
    }
    return obj;
  }

  function applyOkfData(data) {
    if (!data || !data.phases || !data.phases.length) return false;
    window.QUICK_BYTES = stripMeta(data);
    loaded = true;
    console.log('OKF bundle loaded:', data.stats.guides, 'guides across', data.phases.length, 'phases');
    return true;
  }

  function initLoader() {
    fetch(OKF_BUNDLE_URL)
      .then(function(res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function(data) {
        if (applyOkfData(data)) {
          window.dispatchEvent(new Event('okf-ready'));
          window.dispatchEvent(new Event('okf-reload'));
        }
      })
      .catch(function(err) {
        console.error('OKF loader failed:', err.message);
        document.documentElement.innerHTML = '<body style="font-family:sans-serif;padding:2rem;background:#fef2f2;color:#991b1b"><h1>Failed to load content</h1><p>Could not load <code>okf/bundle.json</code>. Please refresh the page.</p></body>';
      });
  }

  window.OkfLoader = {
    isLoaded: function() { return loaded; },
    getData: function() { return window.QUICK_BYTES; }
  };

  initLoader();
})();