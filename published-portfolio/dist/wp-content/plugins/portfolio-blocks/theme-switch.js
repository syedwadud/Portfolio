(() => {
  const button = document.querySelector('.portfolio-theme-switch');
  if (!button) return;
  const system = matchMedia('(prefers-color-scheme: dark)');
  function sync() {
    const dark = document.documentElement.dataset.portfolioTheme === 'dark';
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    button.querySelector('.portfolio-theme-label').textContent = dark ? 'Light mode' : 'Dark mode';
  }
  button.addEventListener('click', () => {
    const next = document.documentElement.dataset.portfolioTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.portfolioTheme = next;
    try { localStorage.setItem('wadud-color-theme', next); } catch {}
    sync();
  });
  system.addEventListener('change', () => {
    let saved;
    try { saved = localStorage.getItem('wadud-color-theme'); } catch {}
    if (!saved) { document.documentElement.dataset.portfolioTheme = system.matches ? 'dark' : 'light'; sync(); }
  });
  sync();
})();
