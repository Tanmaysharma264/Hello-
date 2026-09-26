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
  const video = document.getElementById("heroVideo") as HTMLVideoElement | null;
  if (!spacer || !frame) return;

  gsap.set(frame, { borderRadius: 32 });

  ScrollTrigger.create({
    trigger: spacer,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.6,
    onUpdate: (self) => {
      const p = self.progress;
      const width = gsap.utils.interpolate("86vw", "100vw", p);
      const height = gsap.utils.interpolate("46vh", "100vh", p);
      const radius = gsap.utils.interpolate(32, 0, p);
      gsap.set(frame, { width, height, borderRadius: radius });

      if (video) {
        if (p > 0.92 && video.paused) {
          video.play().catch(() => {});
        } else if (p <= 0.92 && !video.paused) {
          video.pause();
        }
      }
    },
  });
}

export function initHero() {
  initHeroEntrance();
  initHeroVideoZoom();
}
