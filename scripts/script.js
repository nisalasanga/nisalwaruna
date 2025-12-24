// Small DOM utilities and page behavior extracted from index.html
document.getElementById("year").textContent = new Date().getFullYear();

const header = document.getElementById("siteHeader");
const setHeaderShadow = () => {
  if (!header) return;
  if (window.scrollY > 6) header.classList.add("shadow-lg");
  else header.classList.remove("shadow-lg");
};
window.addEventListener("scroll", setHeaderShadow, { passive: true });
setHeaderShadow();

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}

const activeFilters = new Set();
const filterButtons = Array.from(document.querySelectorAll(".skill-filter"));
const cards = Array.from(document.querySelectorAll(".skill-card"));
const reset = document.getElementById("skillFilterReset");

function applySkillFilters() {
  if (activeFilters.size === 0) {
    cards.forEach((c) => (c.style.display = ""));
    return;
  }
  cards.forEach((c) => {
    const cat = c.getAttribute("data-skill-category");
    c.style.display = activeFilters.has(cat) ? "" : "none";
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-skill-filter");
    if (!key) return;
    if (activeFilters.has(key)) {
      activeFilters.delete(key);
      btn.classList.remove("bg-slate-900", "text-white", "border-slate-900");
      btn.classList.add("bg-white", "text-slate-700", "border-slate-200");
    } else {
      activeFilters.add(key);
      btn.classList.remove("bg-white", "text-slate-700", "border-slate-200");
      btn.classList.add("bg-slate-900", "text-white", "border-slate-900");
    }
    applySkillFilters();
  });
});

reset?.addEventListener("click", () => {
  activeFilters.clear();
  filterButtons.forEach((btn) => {
    btn.classList.remove("bg-slate-900", "text-white", "border-slate-900");
    btn.classList.add("bg-white", "text-slate-700", "border-slate-200");
  });
  applySkillFilters();
});
