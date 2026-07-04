/*
  SCRIPT.JS
  ---------
  Renders the gallery grid from PAINTINGS (see js/paintings.js) and
  runs the lightbox (detail view). You shouldn't need to edit this file
  to add or change paintings — that all happens in paintings.js.
*/

(function () {
  "use strict";

  const grid = document.getElementById("gallery-grid");
  const countEl = document.getElementById("gallery-count");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxLabel = document.getElementById("lightbox-label");
  const btnClose = document.getElementById("lightbox-close");
  const btnPrev = document.getElementById("lightbox-prev");
  const btnNext = document.getElementById("lightbox-next");

  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");
  const navScrim = document.getElementById("nav-scrim");

  let currentIndex = 0;

  const STATUS_LABEL = {
    available: "Available",
    sold: "Sold",
    inquire: "Inquire"
  };

  function paintingMeta(p) {
    return [p.medium, p.dimensions, p.year].filter(Boolean).join(" · ");
  }

  function renderGrid() {
    grid.innerHTML = "";

    PAINTINGS.forEach((p, index) => {
      const card = document.createElement("button");
      const isLarge = (p.size || "").toLowerCase() === "large";
      card.className = "painting-card" + (isLarge ? " is-large" : "");
      card.type = "button";
      card.setAttribute("aria-label", "View " + p.title + ", " + p.year);

      const statusKey = (p.status || "").toLowerCase();
      const statusLabel = STATUS_LABEL[statusKey] || p.status || "";
      const showPrice = statusKey === "available" && p.price;

      card.innerHTML =
        '<div class="painting-frame">' +
          '<img src="' + p.image + '" alt="' + escapeAttr(p.title) + ', ' + escapeAttr(paintingMeta(p)) + '">' +
        '</div>' +
        '<div class="painting-label">' +
          '<div class="painting-label-top">' +
            '<h3 class="painting-title">' + escapeHtml(p.title) + '</h3>' +
            '<span class="painting-accession">No. ' + escapeHtml(p.id) + '</span>' +
          '</div>' +
          '<div class="painting-meta">' + escapeHtml(paintingMeta(p)) + '</div>' +
          '<span class="painting-status status-' + statusKey + '">' +
            escapeHtml(statusLabel) + (showPrice ? " · " + escapeHtml(p.price) : "") +
          '</span>' +
        '</div>';

      card.addEventListener("click", function () {
        openLightbox(index);
      });

      grid.appendChild(card);
    });

    countEl.textContent = PAINTINGS.length + (PAINTINGS.length === 1 ? " work" : " works");
  }

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function updateLightbox() {
    const p = PAINTINGS[currentIndex];
    if (!p) return;

    const statusKey = (p.status || "").toLowerCase();
    const statusLabel = STATUS_LABEL[statusKey] || p.status || "";
    const showPrice = statusKey === "available" && p.price;

    lightboxImage.src = p.image;
    lightboxImage.alt = p.title + ", " + paintingMeta(p);

    lightboxLabel.innerHTML =
      '<div class="lightbox-accession">No. ' + escapeHtml(p.id) + '</div>' +
      '<h3>' + escapeHtml(p.title) + '</h3>' +
      '<p>' + escapeHtml(paintingMeta(p)) + '</p>' +
      '<p>' + escapeHtml(statusLabel) + (showPrice ? " · " + escapeHtml(p.price) : "") + '</p>' +
      '<p class="lightbox-desc">' + escapeHtml(p.description || "") + '</p>';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + PAINTINGS.length) % PAINTINGS.length;
    updateLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % PAINTINGS.length;
    updateLightbox();
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, "&quot;");
  }

  btnClose.addEventListener("click", closeLightbox);
  btnPrev.addEventListener("click", showPrev);
  btnNext.addEventListener("click", showNext);

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });

  /* Mobile hamburger menu */
  function openNav() {
    siteNav.classList.add("is-open");
    navScrim.classList.add("is-visible");
    navToggle.classList.add("is-active");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
  }

  function closeNav() {
    siteNav.classList.remove("is-open");
    navScrim.classList.remove("is-visible");
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  navToggle.addEventListener("click", function () {
    if (siteNav.classList.contains("is-open")) {
      closeNav();
    } else {
      openNav();
    }
  });

  navScrim.addEventListener("click", closeNav);

  // Close the drawer after picking a link, and on Escape
  siteNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && siteNav.classList.contains("is-open")) closeNav();
  });

  // If the window is resized past the mobile breakpoint while the drawer
  // is open, close it so it doesn't get stuck open on desktop.
  window.addEventListener("resize", function () {
    if (window.innerWidth > 720 && siteNav.classList.contains("is-open")) closeNav();
  });

  /*
    How many columns to use at the current container width. Edit these
    breakpoints (and the widths in the media queries this mirrors — search
    style.css for "masonry breakpoints" — are just for the no-JS fallback,
    this is the one that actually matters) to make the grid tighter/looser.
  */
  function getColumnCount(containerWidth) {
    if (containerWidth < 640) return 2;
    if (containerWidth < 1000) return 3;
    if (containerWidth < 1400) return 4;
    return 5;
  }

  /*
    True masonry layout pass: bin-packs cards (some 1-column wide, some
    2-column "large-format" tiles, per the "size" field you set in
    paintings.js) into whichever column-slot is currently shortest, so
    nothing is stranded — no CSS-only "dense grid" heuristic can reliably
    do this part, so it's plain JS math instead.

    Three batched phases (each phase does all its reads or all its writes
    together, so the browser only recalculates layout once per phase
    instead of once per card):
      1. WRITE — give each card its target width and a normal in-flow
         position, so the browser can compute its natural height at that
         width (image aspect ratio + label text both included).
      2. READ — read all those natural heights back in one pass.
      3. WRITE — bin-pack and place every card with absolute left/top.
  */
  function layoutMasonry() {
    const containerWidth = grid.clientWidth;
    if (!containerWidth) return;

    const gap = parseFloat(getComputedStyle(grid).getPropertyValue("--grid-gap")) || 24;
    const cols = getColumnCount(containerWidth);
    const colWidth = (containerWidth - gap * (cols - 1)) / cols;

    const cards = Array.from(grid.querySelectorAll(".painting-card"));
    const spans = cards.map((card) => (card.classList.contains("is-large") ? Math.min(2, cols) : 1));

    // Phase 1 (write): real widths, normal static position.
    cards.forEach((card, i) => {
      card.style.position = "static";
      card.style.width = colWidth * spans[i] + gap * (spans[i] - 1) + "px";
    });

    // Phase 2 (read): natural heights at those widths.
    const heights = cards.map((card) => card.getBoundingClientRect().height);

    // Phase 3 (write): bin-pack and place. Large tiles go first, while
    // columns are still roughly level — placing them in original order
    // interleaved with small tiles can strand a large tile waiting on
    // whichever of its two columns is currently taller, leaving the other
    // column empty in the meantime.
    const colHeights = new Array(cols).fill(0);
    const placementOrder = cards.map((_, i) => i).sort((a, b) => spans[b] - spans[a]);

    placementOrder.forEach((i) => {
      const card = cards[i];
      const span = spans[i];
      let bestStart = 0;
      let bestTop = Infinity;

      for (let start = 0; start <= cols - span; start++) {
        const top = Math.max(...colHeights.slice(start, start + span));
        if (top < bestTop) {
          bestTop = top;
          bestStart = start;
        }
      }

      card.style.position = "absolute";
      card.style.left = bestStart * (colWidth + gap) + "px";
      card.style.top = bestTop + "px";

      const bottom = bestTop + heights[i] + gap;
      for (let c = bestStart; c < bestStart + span; c++) {
        colHeights[c] = bottom;
      }
    });

    grid.classList.add("masonry-ready");
    grid.style.height = Math.max(...colHeights) - gap + "px";
  }

  function waitForImages() {
    const imgs = Array.from(grid.querySelectorAll("img"));
    return Promise.all(
      imgs.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      })
    );
  }

  let resizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layoutMasonry, 120);
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  renderGrid();
  waitForImages().then(layoutMasonry);
})();