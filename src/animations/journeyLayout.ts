// The tools/skills column's height must exactly match the experience
// accordion's rendered height, split 50/50 between the two marquees.
// CSS grid "stretch" + height:100% doesn't reliably resolve to a pixel
// value here, so it's pinned with JS instead. A ResizeObserver (rather
// than a handful of fixed-delay retries) keeps it correct permanently —
// whenever the accordion's real size changes for any reason (a slow
// font swap, a resize, anything), the sync re-fires automatically.
export function initJourneyLayout() {
  const stack = document.querySelector<HTMLElement>(".journey__stack");
  const right = document.querySelector<HTMLElement>(".journey__right");
  if (!stack || !right) return;

  const sync = () => {
    // Below the breakpoint the two columns stop sitting side by side
    // (see the 880px media query), so matching heights no longer
    // applies — let the mobile CSS heights take over instead.
    if (window.innerWidth <= 880) {
      stack.style.height = "";
      return;
    }
    const height = right.getBoundingClientRect().height;
    if (height > 0) stack.style.height = `${height}px`;
  };

  sync();

  if (typeof ResizeObserver !== "undefined") {
    const observer = new ResizeObserver(() => sync());
    observer.observe(right);
  } else {
    // Fallback for browsers without ResizeObserver.
    requestAnimationFrame(sync);
    setTimeout(sync, 400);
    document.fonts?.ready?.then(sync).catch(() => {});
  }

  window.addEventListener("resize", sync);
}
