import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { initHero } from "./animations/hero";
import { initMarquee } from "./animations/marquee";
import { initAccordion } from "./animations/accordion";
import { initStackedProjects } from "./animations/stackedProjects";
import { initRevealHeadings } from "./animations/revealHeadings";
import { initParallaxGrid } from "./animations/parallaxGrid";

gsap.registerPlugin(ScrollTrigger);

function initNavShadow() {
  const pill = document.querySelector<HTMLElement>(".nav__pill");
  if (!pill) return;
  const onScroll = () => {
    pill.style.boxShadow =
      window.scrollY > 40
        ? "0 14px 34px rgba(20, 22, 26, 0.12)"
        : "0 10px 30px rgba(20, 22, 26, 0.06)";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function init() {
  initNavShadow();
  initHero();
  initMarquee();
  initAccordion();
  initStackedProjects();
  initRevealHeadings();
  initParallaxGrid();

  // Content is injected dynamically by several modules above (accordion, marquee,
  // stacked projects) — refresh ScrollTrigger once layout has settled.
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
