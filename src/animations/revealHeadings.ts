import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initRevealHeadings() {
  const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");

  targets.forEach((el) => {
    gsap.set(el, {
      opacity: 0.35,
      filter: "blur(6px)",
      clipPath: "inset(0 60% 0 0)",
    });

    gsap.to(el, {
      opacity: 1,
      filter: "blur(0px)",
      clipPath: "inset(0 0% 0 0)",
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        end: "top 45%",
        scrub: 0.6,
      },
    });
  });
}
