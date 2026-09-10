document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const groups = document.querySelectorAll("[data-category]");

  function applyFilter(filter) {
    groups.forEach((group) => {
      const match = filter === "all" || group.dataset.category === filter;
      group.hidden = !match;
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      applyFilter(btn.dataset.filter);

      const url = new URL(window.location);
      if (btn.dataset.filter === "all") {
        url.searchParams.delete("cat");
      } else {
        url.searchParams.set("cat", btn.dataset.filter);
      }
      window.history.replaceState({}, "", url);
    });
  });

  const initialFilter =
    new URLSearchParams(window.location.search).get("cat") || "all";
  const initialBtn = document.querySelector(
    `.filter-btn[data-filter="${initialFilter}"]`,
  );
  if (initialBtn) {
    filterButtons.forEach((b) => b.classList.remove("is-active"));
    initialBtn.classList.add("is-active");
  }
  applyFilter(initialFilter);

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lightboxImg = lightbox.querySelector("img");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    const bonusItems = document.querySelectorAll(".bonus-item");

    const lightboxVideo = document.createElement("video");
    lightboxVideo.controls = true;
    lightboxVideo.style.maxWidth = "88vw";
    lightboxVideo.style.maxHeight = "84vh";
    lightboxVideo.style.borderRadius = "var(--radius)";
    lightboxVideo.style.border = "2px solid var(--pink)";
    lightboxVideo.style.display = "none";
    lightboxImg.insertAdjacentElement("afterend", lightboxVideo);

    function openLightbox(el) {
      if (el.tagName === "VIDEO") {
        const src = el.querySelector("source")?.src || el.src;
        lightboxVideo.src = src;
        lightboxVideo.style.display = "block";
        lightboxVideo.play();
        lightboxImg.style.display = "none";
      } else {
        lightboxImg.src = el.src;
        lightboxImg.alt = el.alt || "";
        lightboxImg.style.display = "block";
        lightboxVideo.style.display = "none";
        lightboxVideo.pause();
      }
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      lightboxVideo.pause();
    }

    bonusItems.forEach((item) => {
      const media = item.querySelector("img, video");
      if (media) {
        item.addEventListener("click", () => openLightbox(media));
      }
    });

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }
});
