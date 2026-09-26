import gsap from "gsap";

const TOOLS = [
  "Figma",
  "Adobe Illustrator",
  "Adobe Photoshop",
  "Premiere Pro",
  "After Effects",
  "Webflow",
  "Adobe XD",
  "Sketch",
  "Blender",
  "Canva",
  "Notion",
  "Framer",
  "InDesign",
  "Cinema 4D",
  "DaVinci Resolve",
];
const SKILLS = [
  "Brand Strategy",
  "Art Direction",
  "Video Editing",
  "Motion Design",
  "UI / UX Design",
  "Typography",
  "Copywriting",
  "Photography",
  "Illustration",
  "Social Media Design",
  "Packaging Design",
  "Print Design",
  "Color Theory",
  "Storyboarding",
  "Campaign Strategy",
];

function itemMarkup(label: string) {
  return `<div class="marquee-v__item">${label}</div>`;
}

function runVerticalLoop(trackId: string, items: string[], direction: 1 | -1) {
  const track = document.getElementById(trackId);
  if (!track) return;

  const setHtml = items.map(itemMarkup).join("");
  track.innerHTML = setHtml + setHtml;

  requestAnimationFrame(() => {
    const singleSetHeight = track.scrollHeight / 2;
    const from = direction === 1 ? 0 : -singleSetHeight;
    const to = direction === 1 ? -singleSetHeight : 0;

    gsap.fromTo(
      track,
      { y: from },
      {
        y: to,
        duration: Math.max(14, singleSetHeight / 18),
        ease: "none",
        repeat: -1,
      }
    );
  });
}

export function initVerticalMarquees() {
  runVerticalLoop("toolsTrack", TOOLS, 1);
  runVerticalLoop("skillsTrack", SKILLS, -1);
}
