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

  function mergeOkfData(data) {
    if (!data || !data.phases || !data.phases.length) {
      console.warn('OKF bundle missing phases');
      return false;
    }

    var cleanData = stripMeta(data);
    window.QUICK_BYTES = cleanData;
    loaded = true;
    console.log('OKF bundle loaded:', data.stats.guides, 'guides across', data.phases.length, 'phases');
    return true;
  }

  function loadOkfBundle() {
    // If already loaded from content.js, still try to update from OKF
    fetch(OKF_BUNDLE_URL)
      .then(function(res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function(data) {
        if (mergeOkfData(data)) {
          // Notify app.js to re-render if it already initialized
          window.dispatchEvent(new Event('okf-reload'));
        }
      })
      .catch(function(err) {
        console.warn('OKF loader: using content.js fallback (' + err.message + ')');
      });
  }

  window.OkfLoader = {
    load: loadOkfBundle,
    isLoaded: function() { return loaded; },
    getData: function() { return window.QUICK_BYTES; }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadOkfBundle);
  } else {
    loadOkfBundle();
  }
})();
