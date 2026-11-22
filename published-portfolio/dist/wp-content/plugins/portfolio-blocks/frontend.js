(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hover = window.matchMedia('(hover: hover) and (pointer: fine)');
  const media = [...document.querySelectorAll('.portfolio-video-link')];
  function stop(link) {
    link.querySelector('iframe')?.removeAttribute('src');
    link.classList.remove('is-previewing');
  }
  function start(link, keyboard = false) {
    if (reducedMotion.matches || navigator.connection?.saveData || (!keyboard && !hover.matches)) return;
    const id = link.dataset.videoId;
    const iframe = link.querySelector('iframe');
    if (!id || !iframe || iframe.hasAttribute('src')) return;
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&mute=1&controls=0&loop=1&playlist=${encodeURIComponent(id)}&playsinline=1&rel=0`;
    link.classList.add('is-previewing');
  }
  media.forEach(link => {
    link.addEventListener('pointerenter', () => start(link));
    link.addEventListener('pointerleave', () => stop(link));
    link.addEventListener('focus', () => start(link, true));
    link.addEventListener('blur', () => stop(link));
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) media.forEach(stop); });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) media.forEach(stop); });
  const compact = window.matchMedia('(max-width: 600px)');
  document.querySelectorAll('.portfolio-spotify').forEach(details => {
    const iframe = details.querySelector('iframe');
    function sync() {
      if (details.open) { if (!iframe.hasAttribute('src')) iframe.src = iframe.dataset.src; }
      else iframe.removeAttribute('src');
    }
    details.addEventListener('toggle', sync);
    details.open = !compact.matches;
    sync();
    compact.addEventListener('change', () => { details.open = !compact.matches; sync(); });
  });
})();
