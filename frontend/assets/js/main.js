const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const mobileNavigation = window.matchMedia("(max-width: 900px)");
const compactMusic = window.matchMedia("(max-width: 600px)");
const themeToggles = document.querySelectorAll(".theme-toggle");
const themeLabels = document.querySelectorAll(".theme-toggle-label");
const themeColor = document.querySelector('meta[name="theme-color"]');
const topbar = document.querySelector(".topbar");
const menuToggle = document.querySelector(".menu-toggle");
const menuLabel = document.querySelector(".menu-toggle-label");
const primaryNavigation = document.querySelector(".primary-nav");
const navigationLinks = document.querySelectorAll('.primary-nav > a[href^="#"]');
const pageSections = document.querySelectorAll("main > section[id]");
const spotifyToggles = document.querySelectorAll(".spotify-toggle");
const videoLinks = document.querySelectorAll(".video-link[data-video-id], .music-video-link[data-video-id]");
const preciseHover = window.matchMedia("(hover: hover) and (pointer: fine)");
const revealItems = document.querySelectorAll([
  ".section-intro > *",
  ".project-card",
  ".video-intro > *",
  ".video-card",
  ".writing-section > *",
  ".music-intro > *",
  ".music-card",
  ".about-section > .eyebrow",
  ".about-grid > *",
  ".contact-section > *",
  "footer > *",
].join(","));

function updateThemeControl(theme) {
  const isDark = theme === "dark";

  themeToggles.forEach((toggle) => {
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  });

  themeLabels.forEach((label) => {
    label.textContent = isDark ? "Light" : "Dark";
  });

  themeColor?.setAttribute("content", isDark ? "#102625" : "#f7f1e5");
}

function applyTheme(theme, savePreference = true) {
  document.documentElement.dataset.theme = theme;
  updateThemeControl(theme);

  if (savePreference) {
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // The theme still works when local storage is unavailable.
    }
  }
}

updateThemeControl(document.documentElement.dataset.theme ?? "light");

themeToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme ?? "light";
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });
});

systemTheme.addEventListener("change", (event) => {
  try {
    if (localStorage.getItem("portfolio-theme")) return;
  } catch {
    // Follow the system theme when local storage is unavailable.
  }

  applyTheme(event.matches ? "dark" : "light", false);
});

function setMenuState(isOpen) {
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  menuToggle?.setAttribute("aria-label", `${isOpen ? "Close" : "Open"} navigation menu`);
  primaryNavigation?.classList.toggle("is-open", isOpen);
  document.documentElement.classList.toggle("menu-open", isOpen);

  if (menuLabel) menuLabel.textContent = isOpen ? "Close" : "Menu";
}

menuToggle?.addEventListener("click", () => {
  setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuState(false);
});

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  if (menuToggle?.getAttribute("aria-expanded") !== "true") return;
  if (!event.target.closest(".topbar")) setMenuState(false);
});

mobileNavigation.addEventListener("change", (event) => {
  if (!event.matches) setMenuState(false);
});

let navigationFrame;

function updateNavigationState() {
  const marker = window.scrollY + Math.min(window.innerHeight * 0.36, 280);
  let activeId = "";

  pageSections.forEach((section) => {
    if (section.offsetTop <= marker) activeId = section.id;
  });

  navigationLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });

  topbar?.classList.toggle("is-scrolled", window.scrollY > 16);
}

window.addEventListener("scroll", () => {
  if (navigationFrame) return;
  navigationFrame = window.requestAnimationFrame(() => {
    updateNavigationState();
    navigationFrame = undefined;
  });
}, { passive: true });

updateNavigationState();

function spotifyWrapperFor(toggle) {
  const id = toggle.getAttribute("aria-controls");
  return id ? document.getElementById(id) : null;
}

function setSpotifyPlayerState(toggle, isOpen) {
  const wrapper = spotifyWrapperFor(toggle);
  const player = wrapper?.querySelector(".spotify-player");
  const symbol = toggle.querySelector("span");
  if (!wrapper || !player) return;

  wrapper.hidden = !isOpen;
  toggle.setAttribute("aria-expanded", String(isOpen));
  if (symbol) symbol.textContent = isOpen ? "−" : "+";

  if (isOpen && !player.hasAttribute("src")) {
    const source = player.dataset.src;
    if (source) player.setAttribute("src", source);
  } else if (!isOpen) {
    player.removeAttribute("src");
  }
}

function syncSpotifyPlayers() {
  spotifyToggles.forEach((toggle) => {
    setSpotifyPlayerState(toggle, !compactMusic.matches);
  });
}

spotifyToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    setSpotifyPlayerState(toggle, toggle.getAttribute("aria-expanded") !== "true");
  });
});

compactMusic.addEventListener("change", syncSpotifyPlayers);
syncSpotifyPlayers();

function previewsAllowed(requireHover = true) {
  const saveData = navigator.connection?.saveData === true;
  const supportsInteraction = requireHover ? preciseHover.matches : true;
  return supportsInteraction && !reduceMotion.matches && !saveData;
}

function startVideoPreview(link, requireHover = true) {
  if (!previewsAllowed(requireHover)) return;

  const videoId = link.dataset.videoId;
  const preview = link.querySelector(".video-preview");
  if (!videoId || !preview || preview.hasAttribute("src")) return;

  const encodedId = encodeURIComponent(videoId);
  preview.src = `https://www.youtube-nocookie.com/embed/${encodedId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${encodedId}&playsinline=1&rel=0&iv_load_policy=3`;
  link.closest(".video-card, .music-card")?.classList.add("is-previewing");
}

function stopVideoPreview(link) {
  const preview = link.querySelector(".video-preview");
  if (preview) preview.removeAttribute("src");
  link.closest(".video-card, .music-card")?.classList.remove("is-previewing");
}

videoLinks.forEach((link) => {
  link.addEventListener("pointerenter", () => startVideoPreview(link));
  link.addEventListener("pointerleave", () => stopVideoPreview(link));
  link.addEventListener("focus", () => startVideoPreview(link, false));
  link.addEventListener("blur", () => stopVideoPreview(link));
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) videoLinks.forEach(stopVideoPreview);
});

function prepareScrollReveals() {
  if (reduceMotion.matches || !revealItems.length) return;

  revealItems.forEach((item, index) => {
    item.setAttribute("data-reveal", "");
    item.style.setProperty("--reveal-delay", `${(index % 3) * 65}ms`);
  });

  document.documentElement.classList.add("reveal-ready");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -7%",
  });

  revealItems.forEach((item) => observer.observe(item));
}

prepareScrollReveals();
