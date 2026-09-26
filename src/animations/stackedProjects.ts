import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
  { slug: "advertisements", title: "Advertisements", desc: "Campaign concepts and creative that stop the scroll." },
  { slug: "video-editing", title: "Video Editing", desc: "Edits and motion pieces built for retention." },
  { slug: "merch-designs", title: "Merch Designs", desc: "Apparel and merch that people actually want to wear." },
  { slug: "brand-identity", title: "Brand Identity Design", desc: "Full visual identity systems, start to finish." },
  { slug: "graphics", title: "Graphics", desc: "Social, print and digital graphics with a point of view." },
  { slug: "website-design", title: "Website Design", desc: "Websites designed to convert, not just look nice." },
];

function rowMarkup(p: (typeof PROJECTS)[number], i: number) {
  return `
    <div class="projects__row" data-index="${i}">
      <div class="projects__row-top">
        <span class="projects__index">0${i + 1}.</span>
        <h3 class="projects__title">
          ${p.title}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </h3>
      </div>
      <p class="projects__desc">${p.desc}</p>
    </div>
  `;
}

function imgMarkup(p: (typeof PROJECTS)[number], i: number) {
  return `<img data-index="${i}" src="/src/assets/img/placeholder-project-${p.slug}.svg" alt="${p.title} placeholder" class="${i === 0 ? "is-active" : ""}" />`;
}

export function initStackedProjects() {
  const list = document.getElementById("projectsList");
  const media = document.getElementById("projectsMedia");
  if (!list || !media) return;

  list.innerHTML = PROJECTS.map(rowMarkup).join("");
  media.innerHTML = PROJECTS.map(imgMarkup).join("");

  const rows = Array.from(list.querySelectorAll<HTMLElement>(".projects__row"));
  const images = Array.from(media.querySelectorAll<HTMLImageElement>("img"));

  rows[0]?.classList.add("is-active");

  const setActive = (index: number) => {
    rows.forEach((row) => row.classList.toggle("is-active", Number(row.dataset.index) === index));
    images.forEach((img) => img.classList.toggle("is-active", Number(img.dataset.index) === index));
  };

  rows.forEach((row) => {
    ScrollTrigger.create({
      trigger: row,
      start: "top center",
      end: "bottom center",
      onEnter: () => setActive(Number(row.dataset.index)),
      onEnterBack: () => setActive(Number(row.dataset.index)),
    });

    row.addEventListener("click", () => setActive(Number(row.dataset.index)));
  });
}
