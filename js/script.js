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

  let currentIndex = 0;

  const STATUS_LABEL = {
    available: "Available",
    sold: "Sold",
    inquire: "Inquire"
  };

  function paintingMeta(p) {
    return [p.medium, p.dimensions, p.year].filter(Boolean).join(" · ");
  }

  /*
    Reads the leading "W × H in" pair out of a dimensions string like
    '30 × 40 in (76 × 102 cm)' and returns the area (width * height).
    Used only to decide relative tile size in the grid — it doesn't need
    to be exact, just consistent across your entries.
  */
  function parseArea(dimensions) {
    if (!dimensions) return null;
    const match = String(dimensions).match(/([\d.]+)\s*[×x]\s*([\d.]+)/);
    if (!match) return null;
    const w = parseFloat(match[1]);
    const h = parseFloat(match[2]);
    if (isNaN(w) || isNaN(h)) return null;
    return w * h;
  }

  /*
    Picks roughly the largest third of the collection (by parsed area) to
    render as double-width tiles, so bigger paintings actually take up
    more visual space in the grid instead of every tile being identical.
  */
  function getLargeTileIds() {
    const withArea = PAINTINGS
      .map((p) => ({ id: p.id, area: parseArea(p.dimensions) }))
      .filter((p) => p.area !== null)
      .sort((a, b) => b.area - a.area);

    if (withArea.length < 3) return new Set();

    const largeCount = Math.max(1, Math.round(withArea.length / 3));
    return new Set(withArea.slice(0, largeCount).map((p) => p.id));
  }

  function renderGrid() {
    grid.innerHTML = "";
    const largeTileIds = getLargeTileIds();

    PAINTINGS.forEach((p, index) => {
      const card = document.createElement("button");
      card.className = "painting-card" + (largeTileIds.has(p.id) ? " is-large" : "");
      card.type = "button";
      card.setAttribute("aria-label", "View " + p.title + ", " + p.year);

      const statusKey = (p.status || "").toLowerCase();
      const statusLabel = STATUS_LABEL[statusKey] || p.status || "";
      const showPrice = statusKey === "available" && p.price;

      card.innerHTML =
        '<div class="painting-frame">' +
          '<img src="' + p.image + '" alt="' + escapeAttr(p.title) + ', ' + escapeAttr(paintingMeta(p)) + '" loading="lazy">' +
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
    2-column "large-format" tiles) into whichever column-slot is currently
    shortest, so nothing is stranded — no CSS-only "dense grid" heuristic
    can reliably do this part, so it's plain JS math instead.

    Two passes:
      1. Give each card its target width (as a real inline style, while it's
         still a normal in-flow block) so the browser computes its natural
         height at that exact width — image aspect ratio and label text
         both included. Read that height back out.
      2. Walk cards in order, placing each one into the column-window
         (of the right span) that's currently shortest, and absolutely
         position it there.
  */
  function layoutMasonry() {
    const containerWidth = grid.clientWidth;
    if (!containerWidth) return;

    const gap = parseFloat(getComputedStyle(grid).getPropertyValue("--grid-gap")) || 24;
    const cols = getColumnCount(containerWidth);
    const colWidth = (containerWidth - gap * (cols - 1)) / cols;

    const cards = Array.from(grid.querySelectorAll(".painting-card"));

    // Pass 1: assign real widths, measure natural heights at that width.
    grid.classList.remove("masonry-ready");
    const spans = [];
    cards.forEach((card, i) => {
      const span = card.classList.contains("is-large") ? Math.min(2, cols) : 1;
      spans[i] = span;
      card.style.width = colWidth * span + gap * (span - 1) + "px";
    });
    const heights = cards.map((card) => card.getBoundingClientRect().height);

    // Pass 2: bin-pack using those measured heights. Place the 2-column
    // ("large") tiles first, while every column is still roughly level —
    // if two large tiles were placed in original order interleaved with
    // small ones, a large tile can get stuck waiting on whichever of its
    // two columns is currently taller, stranding its other column empty
    // in the meantime. Placing large tiles first avoids that lock, then
    // the 1-column tiles simply drop into whichever column is shortest.
    grid.classList.add("masonry-ready");
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

      card.style.left = bestStart * (colWidth + gap) + "px";
      card.style.top = bestTop + "px";

      const bottom = bestTop + heights[i] + gap;
      for (let c = bestStart; c < bestStart + span; c++) {
        colHeights[c] = bottom;
      }
    });

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
