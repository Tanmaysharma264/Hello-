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
  const pin = document.getElementById("heroPin");
  const inner = document.getElementById("heroInner");
  const frame = document.getElementById("heroVideoFrame");
  if (!pin || !frame) return;

  gsap.set(frame, { borderRadius: 32, transformOrigin: "50% 50%" });

  // The frame's own natural box (unscaled, un-transformed) relative to
  // the viewport. Captured on refresh since the pin holds this element
  // fixed in place for the whole scroll range, so it's stable to reuse
  // every frame instead of re-measuring a rect that our own transform
  // would otherwise feed back into.
  let natural = { width: 0, height: 0, cx: 0, cy: 0 };
  const measure = () => {
    gsap.set(frame, { clearProps: "transform" });
    const r = frame.getBoundingClientRect();
    natural = { width: r.width, height: r.height, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
  };

  // Growth (scale-up to fullscreen) finishes partway through the total
  // pinned scroll distance; the rest is a held fullscreen beat before
  // the next section takes over, so the cover actually registers as
  // full screen instead of instantly handing off. The hero text fades
  // out early so it's clear of the frame well before it fills the
  // screen.
  const GROW_FRACTION = 0.45;
  const TEXT_FADE_FRACTION = 0.22;
  const MAX_DRIFT = 36;

  ScrollTrigger.create({
    trigger: "#hero",
    start: "top top",
    end: "+=200%",
    pin,
    scrub: 1.2,
    onRefresh: measure,
    onUpdate: (self) => {
      const p = self.progress;
      const growP = Math.min(1, p / GROW_FRACTION);
      const eased = gsap.parseEase("power2.out")(growP);

      // Uniform scale (never independent width/height) keeps the
      // frame's own aspect ratio locked at 16:9 throughout, so
      // object-fit: cover never re-crops the image mid-animation —
      // the whole picture just grows, nothing inside it "zooms."
      const coverScale = Math.max(window.innerWidth / natural.width, window.innerHeight / natural.height);
      const scale = gsap.utils.interpolate(1, coverScale, eased);
      const radius = gsap.utils.interpolate(32, 0, eased) / scale;

      // Recenter the frame onto the viewport center as it grows, plus
      // a small parallax drift that settles back to 0 at full scale.
      const targetX = window.innerWidth / 2 - natural.cx;
      const targetY = window.innerHeight / 2 - natural.cy;
      const drift = MAX_DRIFT * Math.sin(eased * Math.PI);
      const x = targetX * eased;
      const y = targetY * eased + drift;

      gsap.set(frame, { scale, x, y, borderRadius: radius });

      if (inner) {
        const textP = Math.min(1, p / TEXT_FADE_FRACTION);
        gsap.set(inner, { autoAlpha: 1 - textP, y: -30 * textP });
      }
    },
  });
}

export function initHero() {
  initHeroEntrance();
  initHeroVideoZoom();
}
