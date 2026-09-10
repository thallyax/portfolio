document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------------------------- */
  /* 1. NAVIGATION                                                     */
  /* ---------------------------------------------------------------- */
  const nav = document.querySelector(".nav");
  const burger = document.querySelector(".nav-burger");

  if (nav) {
    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Ferme le menu mobile quand on choisit un lien
    nav.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------------------------------------------------------------- */
  /* 2. SPOTLIGHT DU HERO — signature visuelle du portfolio            */
  /* Un halo lumineux discret suit le curseur, comme une lumière de    */
  /* scène. Désactivé sur mobile (pas de curseur) et en reduced-motion */
  /* ---------------------------------------------------------------- */
  const spotlight = document.querySelector(".hero-spotlight");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;

  if (spotlight && !prefersReducedMotion && isFinePointer) {
    const hero = document.querySelector(".hero");
    hero.addEventListener("pointermove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      spotlight.style.setProperty("--x", x + "%");
      spotlight.style.setProperty("--y", y + "%");
    });
  }

  /* ---------------------------------------------------------------- */
  /* 3. RÉVÉLATION AU SCROLL                                           */
  /* ---------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    "[data-reveal], [data-reveal-stagger]",
  );

  if ("IntersectionObserver" in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    // Pas de support IntersectionObserver : on affiche tout directement
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* Collage "Inspirations" — chaque vignette s'anime individuellement à l'entrée */
  const inspItems = document.querySelectorAll(".insp-item");
  if ("IntersectionObserver" in window && inspItems.length) {
    const inspObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            inspObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
    );

    inspItems.forEach((el) => inspObserver.observe(el));
  } else {
    inspItems.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------------------------------------------------------------- */
  /* 4. FOOTER — année courante                                        */
  /* ---------------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
