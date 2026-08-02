(function() {
  var theme = localStorage.getItem('qb-theme') || 'light';
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
})();
