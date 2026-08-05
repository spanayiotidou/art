(function () {
  "use strict";

  const grid = document.getElementById("gallery-grid");
  const countEl = document.getElementById("gallery-count");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxLabel = document.getElementById("lightbox-label");
  const btnClose = document.getElementById("lightbox-close");
  const zoomSlider = document.getElementById("lightbox-zoom-slider");
  const zoomValue = document.getElementById("lightbox-zoom-value");
  const btnZoomOut = document.getElementById("lightbox-zoom-out");
  const btnZoomIn = document.getElementById("lightbox-zoom-in");
  const btnPrev = document.getElementById("lightbox-prev");
  const btnNext = document.getElementById("lightbox-next");

  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");
  const navScrim = document.getElementById("nav-scrim");

  let currentIndex = 0;
  let baseWidth = 0;
  let baseHeight = 0;

  const STATUS_LABEL = {
    available: "Available",
    sold: "Sold",
    inquire: "Inquire"
  };

  function getSdImage(path) {
    if (!path) return "";
    const lastDot = path.lastIndexOf(".");
    if (lastDot === -1) return path;
    return path.substring(0, lastDot) + "-SD" + path.substring(lastDot);
  }

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
      const showPrice = (statusKey === "available" || statusKey === "sold") && p.price;

      card.innerHTML =
        '<div class="painting-frame">' +
          '<img src="' + getSdImage(p.image) + '" alt="' + escapeAttr(p.title) + ', ' + escapeAttr(paintingMeta(p)) + '" onerror="this.onerror=null;this.src=\'' + escapeAttr(p.image) + '\';">' +
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

  function captureBaseDimensions() {
    lightboxImage.style.width = "";
    lightboxImage.style.height = "";
    lightboxImage.style.maxWidth = "";
    lightboxImage.style.maxHeight = "";

    const rect = lightboxImage.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      baseWidth = rect.width;
      baseHeight = rect.height;
    }
  }

  function setZoom(scale) {
    let val = parseFloat(scale);
    val = Math.max(1, Math.min(5, val));

    if (val > 1) {
      if (!baseWidth || !baseHeight) {
        captureBaseDimensions();
      }
      if (baseWidth && baseHeight) {
        lightboxImage.style.width = (baseWidth * val) + "px";
        lightboxImage.style.height = (baseHeight * val) + "px";
        lightboxImage.style.maxWidth = "none";
        lightboxImage.style.maxHeight = "none";
      }
    } else {
      lightboxImage.style.width = "";
      lightboxImage.style.height = "";
      lightboxImage.style.maxWidth = "";
      lightboxImage.style.maxHeight = "";
    }

    if (zoomSlider) zoomSlider.value = val;
    if (zoomValue) zoomValue.textContent = Math.round(val * 100) + "%";
    lightboxImage.style.cursor = val > 1 ? "zoom-out" : "zoom-in";
  }

  function toggleZoom() {
    const currentScale = parseFloat(zoomSlider ? zoomSlider.value : 1);
    setZoom(currentScale > 1 ? 1 : 2);
  }

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setZoom(1);
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function updateLightbox() {
    baseWidth = 0;
    baseHeight = 0;
    setZoom(1);

    const p = PAINTINGS[currentIndex];
    if (!p) return;

    const statusKey = (p.status || "").toLowerCase();
    const statusLabel = STATUS_LABEL[statusKey] || p.status || "";
    const showPrice = (statusKey === "available" || statusKey === "sold") && p.price;

    lightboxImage.onload = function () {
      captureBaseDimensions();
    };

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

  // Lightbox event listeners
  btnClose.addEventListener("click", closeLightbox);
  lightboxImage.addEventListener("click", toggleZoom);
  btnPrev.addEventListener("click", showPrev);
  btnNext.addEventListener("click", showNext);

  if (zoomSlider) {
    zoomSlider.addEventListener("input", function (e) {
      setZoom(e.target.value);
    });
  }

  if (btnZoomOut) {
    btnZoomOut.addEventListener("click", function () {
      const currentScale = parseFloat(zoomSlider ? zoomSlider.value : 1);
      setZoom(currentScale - 0.25);
    });
  }

  if (btnZoomIn) {
    btnZoomIn.addEventListener("click", function () {
      const currentScale = parseFloat(zoomSlider ? zoomSlider.value : 1);
      setZoom(currentScale + 0.25);
    });
  }

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

  siteNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && siteNav.classList.contains("is-open")) closeNav();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 720 && siteNav.classList.contains("is-open")) closeNav();
    if (lightbox.classList.contains("is-open")) {
      captureBaseDimensions();
      setZoom(zoomSlider ? zoomSlider.value : 1);
    }
  });

  function getColumnCount(containerWidth) {
    if (containerWidth < 640) return 2;
    if (containerWidth < 1000) return 3;
    if (containerWidth < 1400) return 4;
    return 5;
  }

  function layoutMasonry() {
    const rawContainerWidth = grid.clientWidth;
    if (!rawContainerWidth) return;

    const isMobile = window.innerWidth <= 720;
    const computedStyle = getComputedStyle(grid);

    const paddingLeft = isMobile ? (parseFloat(computedStyle.paddingLeft) || 0) : 0;
    const paddingRight = isMobile ? (parseFloat(computedStyle.paddingRight) || 0) : 0;

    const containerWidth = rawContainerWidth - paddingLeft - paddingRight;
    if (containerWidth <= 0) return;

    const gap = parseFloat(computedStyle.getPropertyValue("--grid-gap")) || 24;
    const cols = getColumnCount(containerWidth);
    const colWidth = (containerWidth - gap * (cols - 1)) / cols;

    const cards = Array.from(grid.querySelectorAll(".painting-card"));
    if (cards.length === 0) return;

    const spans = cards.map((card) => (card.classList.contains("is-large") ? Math.min(2, cols) : 1));

    const heroWidth = !isMobile ? containerWidth * 0.8 : containerWidth;
    const heroLeft = paddingLeft + (containerWidth - heroWidth) / 2;

    cards.forEach((card, i) => {
      card.style.position = "static";
      if (i === 0) {
        card.style.width = heroWidth + "px";
      } else {
        card.style.width = colWidth * spans[i] + gap * (spans[i] - 1) + "px";
      }
    });

    const heights = cards.map((card) => card.getBoundingClientRect().height);
    const colHeights = new Array(cols).fill(0);

    const heroCard = cards[0];
    heroCard.style.position = "absolute";
    heroCard.style.left = heroLeft + "px";
    heroCard.style.top = "0px";

    const heroBottom = heights[0] + gap;
    colHeights.fill(heroBottom);

    const restIndices = [];
    for (let i = 1; i < cards.length; i++) {
      restIndices.push(i);
    }
    const placementOrder = restIndices.sort((a, b) => spans[b] - spans[a]);

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
      card.style.left = paddingLeft + (bestStart * (colWidth + gap)) + "px";
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
        return new Promise((resolve) => {
          if (img.complete && img.naturalWidth !== 0) return resolve();

          const onLoad = () => resolve();
          const onError = () => {
            img.removeEventListener("error", onError);
            img.addEventListener("load", onLoad, { once: true });
            img.addEventListener("error", onLoad, { once: true });
          };

          img.addEventListener("load", onLoad, { once: true });
          img.addEventListener("error", onError, { once: true });
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
