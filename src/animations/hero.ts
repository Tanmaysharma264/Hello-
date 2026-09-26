import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function initHeroEntrance() {
  const photo = document.getElementById("heroPhoto");
  const tag = document.getElementById("heroTag");
  const headline = document.getElementById("heroHeadline");
  const actions = document.getElementById("heroActions");
  if (!photo || !tag || !headline || !actions) return;

  const lines = Array.from(headline.querySelectorAll<HTMLElement>(".hero__line"));
  lines.forEach((line) => {
    line.innerHTML = `<span>${line.textContent}</span>`;
  });
  const lineInner = lines.map((line) => line.querySelector("span")!);
  const buttons = Array.from(actions.children) as HTMLElement[];

  gsap.set(photo, { autoAlpha: 0, scale: 0.5, rotate: -8, transformOrigin: "50% 50%" });
  gsap.set(tag, { autoAlpha: 0, y: 14 });
  gsap.set(lineInner, { yPercent: 110 });
  gsap.set(buttons, { autoAlpha: 0, y: 18 });

  const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.15 });

  tl.to(photo, { autoAlpha: 1, scale: 1, rotate: 0, duration: 1, ease: "back.out(1.6)" })
    .to(tag, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.55")
    .to(lineInner, { yPercent: 0, duration: 1, stagger: 0.12 }, "-=0.35")
    .to(buttons, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.5");
}

function initHeroVideoZoom() {
  const spacer = document.getElementById("heroVideoSpacer");
  const frame = document.getElementById("heroVideoFrame");
  if (!spacer || !frame) return;

  gsap.set(frame, { borderRadius: 32 });

  const naturalSize = () => {
    const width = Math.min(760, window.innerWidth * 0.84);
    return { width, height: (width * 9) / 16 };
  };

  // Growth (zoom to fullscreen) finishes partway through the scroll
  // distance; the rest is a held fullscreen beat before the next
  // section takes over, so the cover image actually registers as
  // "full screen" instead of instantly handing off.
  const GROW_FRACTION = 0.5;
  const MAX_DRIFT = 48; // px of downward parallax drift while zooming

  ScrollTrigger.create({
    trigger: spacer,
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    onUpdate: (self) => {
      const growP = Math.min(1, self.progress / GROW_FRACTION);
      const eased = gsap.parseEase("power2.out")(growP);
      const start = naturalSize();
      const width = gsap.utils.interpolate(start.width, window.innerWidth, eased);
      const height = gsap.utils.interpolate(start.height, window.innerHeight, eased);
      const radius = gsap.utils.interpolate(32, 0, eased);
      const drift = MAX_DRIFT * Math.sin(eased * Math.PI);
      gsap.set(frame, { width, height, borderRadius: radius, y: drift });
    },
  });
}

export function initHero() {
  initHeroEntrance();
  initHeroVideoZoom();
}
