const PROJECTS = [
  {
    slug: "advertisements",
    title: "Advertisements",
    desc: "Campaign concepts and creative that stop the scroll and get remembered.",
    list: ["Campaign Concepts", "Media Creatives", "Performance Ads"],
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    desc: "Edits and motion pieces built for retention, from rough cut to final grade.",
    list: ["Reels & Shorts", "Colour Grading", "Sound Design"],
  },
  {
    slug: "merch-designs",
    title: "Merch Designs",
    desc: "Apparel and merch that people actually want to wear, not just receive.",
    list: ["Apparel Graphics", "Packaging Mockups", "Print-Ready Files"],
  },
  {
    slug: "brand-identity",
    title: "Brand Identity Design",
    desc: "Full visual identity systems built to make your brand instantly recognizable.",
    list: ["Logo Design", "Color System", "Brand Guidelines"],
  },
  {
    slug: "graphics",
    title: "Graphics",
    desc: "Social, print and digital graphics with a consistent point of view.",
    list: ["Social Templates", "Print Graphics", "Illustration"],
  },
  {
    slug: "website-design",
    title: "Website Design",
    desc: "Websites designed to convert, not just look good in a portfolio.",
    list: ["UI Design", "Responsive Build", "Conversion Copy"],
  },
];

const BASE_TOP = 96;
const TOP_STEP = 28;

function cardMarkup(p: (typeof PROJECTS)[number], i: number) {
  const top = BASE_TOP + i * TOP_STEP;
  return `
    <div class="projects__card" style="top:${top}px">
      <div class="projects__card-media">
        <img src="assets/img/placeholder-project-${p.slug}.svg" alt="${p.title} placeholder" />
      </div>
      <div class="projects__card-body">
        <p class="projects__card-index">${String(i + 1).padStart(3, "0")}.</p>
        <h3 class="projects__card-title">${p.title}</h3>
        <p class="projects__card-desc">${p.desc}</p>
        <ul class="projects__card-list">
          ${p.list
            .map(
              (item) => `
            <li>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.3 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              ${item}
            </li>`
            )
            .join("")}
        </ul>
        <div class="projects__card-footer">
          <a class="btn btn--dark" href="#contact">
            Start a project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>
    </div>
  `;
}

export function initStackedProjects() {
  const cards = document.getElementById("projectsCards");
  if (!cards) return;

  cards.innerHTML = PROJECTS.map(cardMarkup).join("");
}
