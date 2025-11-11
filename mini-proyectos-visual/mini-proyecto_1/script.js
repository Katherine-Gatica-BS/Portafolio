// script.js — versión robusta para tu mini-proyecto
document.addEventListener("DOMContentLoaded", () => {
    try {
      /* -----------------------------
         UTIL: buscar elemento por varios selectores
      ------------------------------*/
      const pick = (...selectors) => {
        for (const s of selectors) {
          if (!s) continue;
          const el = document.querySelector(s);
          if (el) return el;
        }
        return null;
      };
  
      /* -----------------------------
         ELEMENTOS: tema e idioma
      ------------------------------*/
      const themeBtn = pick("#themeBtn", "#themeToggle", ".theme-toggle");
      const langSelect = pick("#language-select", "#langSelect", ".lang-select");
  
      // Inicializar tema (por defecto 'light' si no hay guardado)
      const savedTheme = localStorage.getItem("theme") || "light";
      document.body.classList.remove("light", "dark");
      document.body.classList.add(savedTheme);
  
      // Actualiza texto del botón si existe
      const updateThemeButton = () => {
        if (!themeBtn) return;
        themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
      };
      updateThemeButton();
  
      if (themeBtn) {
        themeBtn.addEventListener("click", () => {
          document.body.classList.toggle("dark");
          document.body.classList.toggle("light");
          const current = document.body.classList.contains("dark") ? "dark" : "light";
          localStorage.setItem("theme", current);
          updateThemeButton();
        });
      }
  
      /* -----------------------------
         IDIOMA: textos básicos (puedes ampliar)
      ------------------------------*/
      const translations = {
        es: {
          title: "Mini Proyecto 1",
          back: "← Volver",
          desc: "Descripción general",
          results: "Resultados visuales",
          notebook: "Explora mis Proyectos",
          btnNotebook: "Abrir Proyecto"
        },
        en: {
          title: "Mini Project 1",
          back: "← Back",
          desc: "General description",
          results: "Visual results",
          notebook: "Explore my projects",
          btnNotebook: "Open project"
        },
        de: {
          title: "Mini Projekt 1",
          back: "← Zurück",
          desc: "Allgemeine Beschreibung",
          results: "Visuelle Ergebnisse",
          notebook: "Entdecken Sie meine Projekte",
          btnNotebook: "Offenes Projekt"
        },
        pt: {
          title: "Mini Projeto 1",
          back: "← Voltar",
          desc: "Descrição geral",
          results: "Resultados visuais",
          notebook: "Explore meus projetos",
          btnNotebook: "Abrir projeto"
        }
      };
  
      const applyLanguage = (lang) => {
        const t = translations[lang] || translations.es;
        const titleEl = document.querySelector(".mp-title");
        const backEl = document.querySelector(".mp-back");
        const h2s = document.querySelectorAll(".mp-section h2");
        const mpBtn = document.querySelector(".mp-btn");
  
        if (titleEl) titleEl.textContent = t.title;
        if (backEl) backEl.textContent = t.back;
        if (h2s && h2s.length >= 3) {
          h2s[0].textContent = t.desc;
          h2s[1].textContent = t.results;
          h2s[2].textContent = t.notebook;
        } else if (h2s && h2s.length > 0) {
          // fallback: set first two if quantity differs
          if (h2s[0]) h2s[0].textContent = t.desc;
          if (h2s[1]) h2s[1].textContent = t.results;
        }
        if (mpBtn) mpBtn.textContent = t.btnNotebook;
      };
  
      // Inicial idioma según select si existe
      if (langSelect) {
        langSelect.addEventListener("change", (e) => applyLanguage(e.target.value));
        applyLanguage(langSelect.value || "es");
      } else {
        applyLanguage("es");
      }
  
      /* -----------------------------
         PARTICULAS: configuración inline (no requiere particles.json)
         Si la librería particles.js está disponible (CDN), la usamos.
      ------------------------------*/
      if (window.particlesJS) {
        try {
          particlesJS("particles-js", {
            particles: {
              number: { value: 70, density: { enable: true, value_area: 800 } },
              color: { value: ["#a45cff", "#c38bff"] },
              shape: { type: "circle" },
              opacity: { value: 0.7 },
              size: { value: 3, random: true },
              line_linked: { enable: true, distance: 130, color: "#c38bff", opacity: 0.12, width: 1 },
              move: { enable: true, speed: 1.4 }
            },
            interactivity: {
              detect_on: "canvas",
              events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: false } },
              modes: { grab: { distance: 140, line_linked: { opacity: 0.18 } } }
            },
            retina_detect: true
          });
        } catch (err) {
          console.warn("particlesJS failed:", err);
        }
      } else {
        console.info("particlesJS not found — si quieres partículas, carga CDN <script src=\"https://cdn.jsdelivr.net/npm/particles.js\"></script>");
      }
  
      /* -----------------------------
         CARRUSEL: funcional y responsive
         HTML esperado:
           .carousel-track  (contenedor flex)
           .carousel-item   (cada slide, min-width:100%)
           .carousel-btn.prev  .carousel-btn.next (botones)
           .carousel-indicators (div donde se crearán dots)
      ------------------------------*/
      const track = document.querySelector(".carousel-track");
      const slides = Array.from(document.querySelectorAll(".carousel-item"));
      const prevBtn = document.querySelector(".carousel-btn.prev");
      const nextBtn = document.querySelector(".carousel-btn.next");
      const indicatorsWrap = document.querySelector(".carousel-indicators");
  
      if (!track || slides.length === 0) {
        console.warn("Carrusel: elementos no encontrados (asegúrate de que .carousel-track y .carousel-item existen).");
      } else {
        // crear indicadores
        indicatorsWrap && (indicatorsWrap.innerHTML = "");
        slides.forEach((s, i) => {
          if (indicatorsWrap) {
            const dot = document.createElement("button");
            dot.className = "carousel-dot";
            dot.type = "button";
            if (i === 0) dot.classList.add("active");
            dot.dataset.index = i;
            indicatorsWrap.appendChild(dot);
          }
        });
  
        const dots = indicatorsWrap ? Array.from(indicatorsWrap.children) : [];
  
        let currentIndex = 0;
  
        const updateCarousel = () => {
          // mover por porcentaje, no por px (estable)
          track.style.transform = `translateX(-${currentIndex * 100}%)`;
  
          // actualizar indicadores
          dots.forEach((d, idx) => d.classList.toggle("active", idx === currentIndex));
        };
  
        // listeners botones
        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
          });
        }
        if (prevBtn) {
          prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
          });
        }
  
        // dots clicables
        dots.forEach((dot) => {
          dot.addEventListener("click", () => {
            const i = Number(dot.dataset.index);
            if (!Number.isNaN(i)) {
              currentIndex = i;
              updateCarousel();
            }
          });
        });
  
        // soporte swipe en móvil
        (function addSwipe() {
          let startX = 0;
          let endX = 0;
          const viewport = track.parentElement; // .carousel-viewport
  
          if (!viewport) return;
          viewport.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
          }, {passive:true});
  
          viewport.addEventListener("touchmove", (e) => {
            endX = e.touches[0].clientX;
          }, {passive:true});
  
          viewport.addEventListener("touchend", () => {
            const dx = endX - startX;
            const threshold = 40; // px
            if (dx > threshold) {
              // swipe right -> prev
              currentIndex = (currentIndex - 1 + slides.length) % slides.length;
              updateCarousel();
            } else if (dx < -threshold) {
              // swipe left -> next
              currentIndex = (currentIndex + 1) % slides.length;
              updateCarousel();
            }
            startX = endX = 0;
          });
        })();
  
        // redimensionar: no hace falta recalcular si usamos %,
        // pero si quieres forzar animación suave tras resize:
        window.addEventListener("resize", () => {
          // pequeña espera para que cambie layout
          setTimeout(updateCarousel, 80);
        });
  
        // inicial
        updateCarousel();
      }
  
      /* -----------------------------
         FOOTER: centrar texto (si hay problema visual)
         (solo asegurar que existe y está centrado por CSS)
      ------------------------------*/
      const footerText = document.querySelector(".mp-footer-text");
      if (footerText) {
        footerText.style.textAlign = "center";
      }
  
      // todo ok
      console.log("script.js: inicializado correctamente");
    } catch (err) {
      console.error("script.js fallo en inicialización:", err);
    }
  });
  