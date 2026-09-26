import gsap from "gsap";

const EXPERIENCE = [
  { title: "Senior Brand Designer", company: "Northwind Studio", date: "2024 — Present" },
  { title: "Creative Director (Freelance)", company: "Self-employed", date: "2023 — 2024" },
  { title: "Video Editor", company: "Halcyon Media", date: "2022 — 2023" },
  { title: "Graphic Designer", company: "Vertex Labs", date: "2021 — 2022" },
  { title: "Brand Identity Designer", company: "Solace Creative", date: "2020 — 2021" },
  { title: "Merch & Print Designer", company: "Ridgeline Goods", date: "2019 — 2020" },
  { title: "Junior Designer", company: "Nomad Co.", date: "2018 — 2019" },
  { title: "Web Design Intern", company: "Forge Digital", date: "2017 — 2018" },
  { title: "Motion Graphics Freelancer", company: "Self-employed", date: "2016 — 2017" },
  { title: "Design Intern", company: "Studio Verve", date: "2015 — 2016" },
];

const DETAIL = [
  "Led end-to-end design across three concurrent brand launches.",
  "Collaborated with marketing and product teams on go-to-market visuals.",
  "Mentored two junior designers and set up the internal design system.",
];

function itemMarkup(item: (typeof EXPERIENCE)[number], index: number) {
  return `
    <div class="accordion__item" data-index="${index}">
      <button class="accordion__trigger" aria-expanded="false">
        <span class="accordion__lead">
          <span class="accordion__logo" aria-hidden="true"></span>
          <span class="accordion__text">
            <span class="accordion__title">${item.title}</span>
            <span class="accordion__company">${item.company}</span>
          </span>
        </span>
        <span class="accordion__meta">
          <span class="accordion__date">${item.date}</span>
          <svg class="accordion__chevron" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3V15M3 9H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </span>
      </button>
      <div class="accordion__panel">
        <div class="accordion__panel-inner">
          ${DETAIL.map((line) => `<p>${line}</p>`).join("")}
        </div>
      </div>
    </div>
  `;
}

export function initAccordion() {
  const root = document.getElementById("accordion");
  if (!root) return;

  root.innerHTML = EXPERIENCE.map(itemMarkup).join("");

  const items = Array.from(root.querySelectorAll<HTMLElement>(".accordion__item"));

  items.forEach((item) => {
    const trigger = item.querySelector<HTMLButtonElement>(".accordion__trigger");
    const panel = item.querySelector<HTMLElement>(".accordion__panel");
    if (!trigger || !panel) return;

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      items.forEach((other) => {
        if (other === item) return;
        const otherPanel = other.querySelector<HTMLElement>(".accordion__panel");
        const otherTrigger = other.querySelector<HTMLButtonElement>(".accordion__trigger");
        if (other.classList.contains("is-open") && otherPanel) {
          other.classList.remove("is-open");
          otherTrigger?.setAttribute("aria-expanded", "false");
          gsap.to(otherPanel, { height: 0, duration: 0.45, ease: "power2.inOut" });
        }
      });

      if (isOpen) {
        item.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        gsap.to(panel, { height: 0, duration: 0.45, ease: "power2.inOut" });
      } else {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        const inner = panel.querySelector<HTMLElement>(".accordion__panel-inner");
        const target = inner ? inner.offsetHeight : 0;
        gsap.fromTo(panel, { height: 0 }, { height: target, duration: 0.5, ease: "power2.inOut" });
      }
    });
  });
}
