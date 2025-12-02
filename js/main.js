//1) 탭 필터링 메뉴

const tabs = document.querySelectorAll(".tablist .tab");
const cards = document.querySelectorAll(".grid-boxs > .flex-box > li");

function applyFilter(target) {
  tabs.forEach((tab) => {
    const active = tab.dataset.filter === target;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  cards.forEach((card) => {
    const match = card.dataset.shop === target;
    card.classList.toggle("is-hidden", !match);
  });
}

const initial =
  document.querySelector(".tab.active")?.dataset.filter || "hanwha";
applyFilter(initial);

tabs.forEach((tab) =>
  tab.addEventListener("click", () => applyFilter(tab.dataset.filter))
);

// 헤더 스크롤 변화
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// reveal 스크롤 트리거
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05 }
);

reveals.forEach((el) => revealObserver.observe(el));

// 햄버거 메뉴
const btn = document.querySelector(".hamburger");
const nav = document.querySelector(".header-nav");

btn.addEventListener("click", () => {
  const open = !nav.classList.contains("active");
  nav.classList.toggle("active", open);
  btn.classList.toggle("active", open);
  btn.setAttribute("aria-expanded", open);
  btn.setAttribute("aria-label", open ? "hidden" : "");
});

// =========================
// 5) 스크롤 점 이동
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const navlinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section");

  navlinks.forEach((linkLi) => {
    linkLi.addEventListener("click", () => {
      navlinks.forEach((i) => i.classList.remove("active"));
      linkLi.classList.add("active");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navlinks.forEach((li) => {
            const a = li.querySelector("a");
            const href = a.getAttribute("href").replace("#", "");
            li.classList.toggle("active", href === id);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));
});
