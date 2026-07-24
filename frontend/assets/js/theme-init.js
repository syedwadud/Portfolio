(function setInitialTheme() {
  try {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = savedTheme ?? systemTheme;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
