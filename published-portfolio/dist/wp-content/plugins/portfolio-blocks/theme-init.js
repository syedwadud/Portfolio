(() => {
  let saved;
  try { saved = localStorage.getItem('wadud-color-theme'); } catch {}
  document.documentElement.dataset.portfolioTheme = saved === 'dark' || saved === 'light' ? saved : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
})();
