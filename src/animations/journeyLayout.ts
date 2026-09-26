// The tools/skills column's height must exactly match the experience
// accordion's rendered height, split 50/50 between the two marquees.
// CSS grid "stretch" + height:100% doesn't reliably resolve to a pixel
// value here (varies with font load timing), so it's pinned with JS
// instead — the one thing guaranteed to match reality.
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
  requestAnimationFrame(sync);
  window.addEventListener("resize", sync);
  document.fonts?.ready?.then(sync).catch(() => {});
  // Images (portrait, logos) and any late layout shifts can still land
  // after the above; one more pass covers it without a lingering loop.
  setTimeout(sync, 400);
}
