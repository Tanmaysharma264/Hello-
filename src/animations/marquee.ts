import gsap from "gsap";

const LOGOS = [
  "Northwind",
  "Halcyon",
  "Vertex Labs",
  "Solace",
  "Ridgeline",
  "Nomad Co.",
];

function logoMarkup(name: string) {
  return `
    <span class="marquee__logo">
      <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      ${name}
    </span>
  `;
}

export function initMarquee() {
  const track = document.getElementById("marqueeTrack");
  if (!track) return;

  const setHtml = LOGOS.map(logoMarkup).join("");
  track.innerHTML = setHtml + setHtml;

  requestAnimationFrame(() => {
    const singleSetWidth = track.scrollWidth / 2;
    const tween = gsap.fromTo(
      track,
      { x: 0 },
      {
        x: -singleSetWidth,
        duration: Math.max(20, singleSetWidth / 40),
        ease: "none",
        repeat: -1,
      }
    );

    track.addEventListener("mouseenter", () => tween.timeScale(0.15));
    track.addEventListener("mouseleave", () => tween.timeScale(1));
  });
}
