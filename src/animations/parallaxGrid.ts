import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initParallaxGrid() {
  const lines = document.querySelector<HTMLElement>(".grid-bg__lines");
  if (!lines) return;

  gsap.to(lines, {
    yPercent: 8,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
    },
  });

  const journeyPortrait = document.querySelector<HTMLElement>(".journey__portrait");
  if (journeyPortrait) {
    gsap.to(journeyPortrait, {
      yPercent: -6,
      ease: "none",
      scrollTrigger: {
        trigger: journeyPortrait,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  }

  const heroPhoto = document.querySelector<HTMLElement>(".hero__photo");
  if (heroPhoto) {
    gsap.to(heroPhoto, {
      yPercent: -18,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  }
}
