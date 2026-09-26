import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initHero() {
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
