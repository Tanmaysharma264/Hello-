import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initParallaxGrid() {
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
