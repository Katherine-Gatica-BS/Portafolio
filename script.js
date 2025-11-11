// script.js - Versión corregida y completa (traducción + partículas + UI)
// Reemplaza completamente tu script.js con esto.

// ------------------------------
// Helpers y boot safe
// ------------------------------
(function () {
    "use strict";
  
    // safe query helpers
    const $ = (s) => document.querySelector(s);
    const $$ = (s) => Array.from(document.querySelectorAll(s));
  
    // ------------------------------
    // LOADER: hide on window.load and DOM ready fallback
    // ------------------------------
    function hideLoaderImmediate() {
      try {
        const loader = $("#loader");
        if (loader) {
          loader.style.transition = "opacity 360ms ease";
          loader.style.opacity = "0";
          setTimeout(() => {
            if (loader && loader.parentNode) loader.style.display = "none";
          }, 420);
        }
      } catch (e) { /* noop */ }
    }
    window.addEventListener("load", hideLoaderImmediate);
    document.addEventListener("DOMContentLoaded", () => {
      // safety fallback (in case load never fires)
      setTimeout(hideLoaderImmediate, 1000);
    });
  
    // ------------------------------
    // UI: Menu responsive (safe)
    // ------------------------------
    try {
      const hamburger = $("#hamburger");
      const responsiveMenu = $("#responsive-menu");
      if (hamburger && responsiveMenu) {
        hamburger.addEventListener("click", () => {
          responsiveMenu.classList.toggle("show");
          hamburger.classList.toggle("open");
        });
      }
    } catch (e) { console.warn("hamburger init error", e); }
  
    // ------------------------------
    // UI: Tabs Habilidades
    // ------------------------------
    try {
      $$(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const target = btn.dataset.tab;
          $$(".tab-btn").forEach(b => b.classList.remove("active"));
          $$(".tab-content").forEach(c => c.classList.remove("active"));
          btn.classList.add("active");
          const content = document.getElementById(target);
          if (content) content.classList.add("active");
        });
      });
    } catch (e) { console.warn("tabs init error", e); }
  
    // ------------------------------
    // UI: Popup "Próximamente"
    // ------------------------------
    try {
      const popupOverlay = $(".popup-overlay");
      const popupCloseBtn = $(".popup-close");
      const popupTriggers = $$(".btn-popup");
      if (popupTriggers.length && popupOverlay) {
        popupTriggers.forEach(b => b.addEventListener("click", (ev) => {
          ev.preventDefault();
          popupOverlay.style.display = "flex";
        }));
      }
      if (popupCloseBtn && popupOverlay) {
        popupCloseBtn.addEventListener("click", () => popupOverlay.style.display = "none");
        popupOverlay.addEventListener("click", (ev) => {
          if (ev.target === popupOverlay) popupOverlay.style.display = "none";
        });
      }
    } catch (e) { console.warn("popup init error", e); }
  
    // ------------------------------
    // THEME toggle (safe)
    // ------------------------------
    try {
      const applySavedTheme = () => {
        const saved = localStorage.getItem("site-theme");
        if (saved === "light") {
          document.body.classList.remove("dark");
          document.body.classList.add("light");
        } else { // default dark
          document.body.classList.remove("light");
          document.body.classList.add("dark");
        }
      };
      applySavedTheme();
      const themeButtons = $$("#theme-toggle, #theme-toggle-responsive, .theme-toggle");
      themeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          document.body.classList.toggle("dark");
          document.body.classList.toggle("light");
          localStorage.setItem("site-theme", document.body.classList.contains("dark") ? "dark" : "light");
        });
      });
    } catch (e) { console.warn("theme init error", e); }
  
    // ------------------------------
    // FORM submit (Formspree) - safe async
    // ------------------------------
    try {
      const form = $("#contact-form");
      if (form) {
        form.addEventListener("submit", async (ev) => {
          ev.preventDefault();
          const data = new FormData(form);
          try {
            const resp = await fetch(form.action, {
              method: "POST",
              body: data,
              headers: { Accept: "application/json" }
            });
            if (resp.ok) {
              alert("Mensaje enviado correctamente ✅");
              form.reset();
            } else {
              alert("Error al enviar mensaje ❌");
            }
          } catch (err) {
            alert("Error de conexión al enviar el mensaje.");
          }
        });
      }
    } catch (e) { console.warn("form init error", e); }
  
    // ------------------------------
    // CAROUSEL (optional) - safe guard
    // ------------------------------
    try {
      const track = $(".carousel-track");
      if (track) {
        const slides = Array.from(track.children);
        const prevBtn = $(".carousel-btn.prev");
        const nextBtn = $(".carousel-btn.next");
        const indicatorsWrap = $(".carousel-indicators");
        if (indicatorsWrap && indicatorsWrap.children.length === 0) {
          slides.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.className = "carousel-dot";
            dot.dataset.index = i;
            if (i === 0) dot.classList.add("active");
            indicatorsWrap.appendChild(dot);
          });
        }
        const dots = indicatorsWrap ? Array.from(indicatorsWrap.children) : [];
        let idx = 0;
        const update = () => {
          track.style.transform = `translateX(-${idx * 100}%)`;
          dots.forEach((d, i) => d.classList.toggle("active", i === idx));
        };
        nextBtn && nextBtn.addEventListener("click", () => { idx = (idx + 1) % slides.length; update(); });
        prevBtn && prevBtn.addEventListener("click", () => { idx = (idx - 1 + slides.length) % slides.length; update(); });
        dots.forEach(dot => dot.addEventListener("click", () => { idx = Number(dot.dataset.index) || 0; update(); }));
        update();
      }
    } catch (e) { console.warn("carousel init error", e); }
  
    // ------------------------------
    // PARTICLES - restore interactive behaviour (only if library loaded)
    // Notes: tuned for visible motion and repulse on hover.
    // ------------------------------
    try {
      if (window.particlesJS) {
        // Hero particles (full background)
        try {
          particlesJS("particles-js", {
            particles: {
              number: { value: 120, density: { enable: true, value_area: 800 } },
              color: { value: "#00d4ff" },
              shape: { type: "circle" },
              opacity: { value: 0.7, random: true },
              size: { value: 3, random: true },
              line_linked: { enable: true, distance: 120, color: "#00d4ff", opacity: 0.15, width: 1 },
              move: { enable: true, speed: 2.5, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
              },
              modes: {
                repulse: { distance: 140, duration: 0.6 },
                push: { particles_nb: 4 }
              }
            },
            retina_detect: true
          });
        } catch (err) {
          console.warn("particles hero init error", err);
        }
  
        // Side particles (left + right) — smaller and flowing
        const initSide = (id) => {
          try {
            const el = document.getElementById(id);
            if (!el) return;
            particlesJS(id, {
              particles: {
                number: { value: 60, density: { enable: true, value_area: 300 } },
                color: { value: "#00d4ff" },
                shape: { type: "circle" },
                opacity: { value: 0.6, random: true },
                size: { value: 2.6, random: true },
                line_linked: { enable: false },
                move: { enable: true, speed: 1.6, direction: "none", out_mode: "out" }
              },
              interactivity: {
                detect_on: "canvas",
                events: {
                  onhover: { enable: true, mode: "repulse" },
                  onclick: { enable: true, mode: "push" },
                  resize: true
                },
                modes: { repulse: { distance: 120 }, push: { particles_nb: 3 } }
              },
              retina_detect: true
            });
          } catch (err) {
            console.warn("particles side init error for", id, err);
          }
        };
        initSide("side-particles-left");
        initSide("side-particles-right");
      } else {
        console.info("particlesJS not loaded - skipping particles init.");
      }
    } catch (e) { console.warn("particles master error", e); }
  
    // ------------------------------
    // TRANSLATION: data-i18n + data-i18n-placeholder
    // ------------------------------
    (function initI18n() {
      // map of keys -> translations (complete for all keys used in your HTML)
      const i18n = {
        es: {
          title: "Portafolio - Ingeniera en Informática",
          loading: "Cargando...",
          popupTitle: "¡Gracias por tu interés!",
          popupDesc: "Este mini proyecto aún no está disponible. Pronto estaré subiendo novedades 🌟",
          closeBtn: "Cerrar",
          logo: "Katherine Gatica",
          navHome: "Inicio",
          navAbout: "Sobre mí",
          navProjects: "Proyectos",
          navContact: "Contacto",
          lightMode: "Modo Claro",
          heroTitle: "Ingeniera en Informática",
          heroSub1: "Data Science | Data Analysis | Data Engineering",
          heroSub2: "Transformando datos en decisiones estratégicas.",
          seeMore: "Ver más",
          aboutTitle: "Sobre mí",
          aboutDesc: "Ingeniera en Informática con especialización en Ciencia de Datos, enfocada en convertir información en valor estratégico para la toma de decisiones. Cuento con formación y experiencia práctica en análisis de datos, automatización de procesos y desarrollo de soluciones tecnológicas. Me caracterizo por mi pensamiento analítico, iniciativa y compromiso con los resultados. Busco contribuir en equipos donde la tecnología y la eficiencia impulsen un cambio real.",
          techSkills: "Habilidades Técnicas",
          tabLanguages: "Lenguajes",
          tabBI: "Herramientas BI",
          tabML: "Machine Learning",
          tabCloud: "Cloud & Big Data",
          softSkills: "Soft Skills",
          skill1: "Resolución de problemas",
          skill2: "Trabajo en equipo",
          skill3: "Comunicación",
          skill4: "Aprendizaje continuo",
          projectsTitle: "Proyectos",
          proj1Title: "Análisis de clientes con clustering.",
          proj1Desc1: "Técnicas: exploración, visualización, segmentación K-Means.",
          proj1Desc2: "Tecnologías: Python, Pandas, Seaborn, Scikit-learn.",
          viewProject: "Ver proyecto",
          proj2Title: "Dashboard en Power BI",
          proj2Desc: "Visualización de KPIs.",
          proj3Title: "Pipeline",
          proj3Desc: "ETL para big data.",
          contactTitle: "Contacto",
          inputName: "Nombre",
          inputEmail: "Email",
          inputMessage: "Mensaje",
          sendBtn: "Enviar",
          linkedin: "LinkedIn",
          github: "GitHub",
          footerText: "Creado por Katherine Gatica — 2025"
        },
  
        en: {
          title: "Portfolio - Computer Engineer",
          loading: "Loading...",
          popupTitle: "Thanks for your interest!",
          popupDesc: "This mini project is not available yet. I'll upload updates soon 🌟",
          closeBtn: "Close",
          logo: "Katherine Gatica",
          navHome: "Home",
          navAbout: "About me",
          navProjects: "Projects",
          navContact: "Contact",
          lightMode: "Light Mode",
          heroTitle: "Computer Engineer",
          heroSub1: "Data Science | Data Analysis | Data Engineering",
          heroSub2: "Turning data into strategic decisions.",
          seeMore: "See more",
          aboutTitle: "About me",
          aboutDesc: "Computer engineer specialized in Data Science, focused on transforming information into strategic value for decision-making. I have training and practical experience in data analysis, process automation and the development of technological solutions. I am characterized by analytical thinking, initiative, and commitment to results. I aim to contribute to teams where technology and efficiency drive real impact.",
          techSkills: "Technical Skills",
          tabLanguages: "Languages",
          tabBI: "BI Tools",
          tabML: "Machine Learning",
          tabCloud: "Cloud & Big Data",
          softSkills: "Soft Skills",
          skill1: "Problem solving",
          skill2: "Teamwork",
          skill3: "Communication",
          skill4: "Continuous learning",
          projectsTitle: "Projects",
          proj1Title: "Customer analysis with clustering.",
          proj1Desc1: "Techniques: exploration, visualization, K-Means segmentation.",
          proj1Desc2: "Technologies: Python, Pandas, Seaborn, Scikit-learn.",
          viewProject: "View project",
          proj2Title: "Power BI Dashboard",
          proj2Desc: "KPI visualization.",
          proj3Title: "Pipeline",
          proj3Desc: "ETL for big data.",
          contactTitle: "Contact",
          inputName: "Name",
          inputEmail: "Email",
          inputMessage: "Message",
          sendBtn: "Send",
          linkedin: "LinkedIn",
          github: "GitHub",
          footerText: "Created by Katherine Gatica — 2025"
        },
  
        de: {
          title: "Portfolio - Informatikingenieurin",
          loading: "Lädt...",
          popupTitle: "Danke für Ihr Interesse!",
          popupDesc: "Dieses Mini-Projekt ist noch nicht verfügbar. Ich lade bald Neuigkeiten hoch 🌟",
          closeBtn: "Schließen",
          logo: "Katherine Gatica",
          navHome: "Start",
          navAbout: "Über mich",
          navProjects: "Projekte",
          navContact: "Kontakt",
          lightMode: "Heller Modus",
          heroTitle: "Informatikingenieurin",
          heroSub1: "Data Science | Data Analysis | Data Engineering",
          heroSub2: "Daten in strategische Entscheidungen verwandeln.",
          seeMore: "Mehr sehen",
          aboutTitle: "Über mich",
          aboutDesc: "Informatikingenieurin mit Spezialisierung auf Data Science, fokussiert darauf, Informationen in strategischen Wert für Entscheidungen zu verwandeln. Ausbildung und praktische Erfahrung in Datenanalyse, Prozessautomatisierung und Entwicklung technologischer Lösungen.",
          techSkills: "Technische Fähigkeiten",
          tabLanguages: "Sprachen",
          tabBI: "BI Werkzeuge",
          tabML: "Machine Learning",
          tabCloud: "Cloud & Big Data",
          softSkills: "Soft Skills",
          skill1: "Problemlösung",
          skill2: "Teamarbeit",
          skill3: "Kommunikation",
          skill4: "Kontinuierliches Lernen",
          projectsTitle: "Projekte",
          proj1Title: "Kundenanalyse mit Clustering.",
          proj1Desc1: "Techniken: Exploration, Visualisierung, K-Means-Segmentierung.",
          proj1Desc2: "Technologien: Python, Pandas, Seaborn, Scikit-learn.",
          viewProject: "Projekt ansehen",
          proj2Title: "Power BI Dashboard",
          proj2Desc: "KPI-Visualisierung.",
          proj3Title: "Pipeline",
          proj3Desc: "ETL für Big Data.",
          contactTitle: "Kontakt",
          inputName: "Name",
          inputEmail: "E-Mail",
          inputMessage: "Nachricht",
          sendBtn: "Senden",
          linkedin: "LinkedIn",
          github: "GitHub",
          footerText: "Erstellt von Katherine Gatica — 2025"
        },
  
        pt: {
          title: "Portfólio - Engenheira de Informática",
          loading: "Carregando...",
          popupTitle: "Obrigado pelo seu interesse!",
          popupDesc: "Este mini projeto ainda não está disponível. Em breve publicarei novidades 🌟",
          closeBtn: "Fechar",
          logo: "Katherine Gatica",
          navHome: "Início",
          navAbout: "Sobre mim",
          navProjects: "Projetos",
          navContact: "Contato",
          lightMode: "Modo Claro",
          heroTitle: "Engenheira de Informática",
          heroSub1: "Ciência de Dados | Análise de Dados | Data Engineering",
          heroSub2: "Transformando dados em decisões estratégicas.",
          seeMore: "Ver mais",
          aboutTitle: "Sobre mim",
          aboutDesc: "Engenheira de Informática com especialização em Ciência de Dados, focada em transformar informação em valor estratégico para a tomada de decisões. Tenho formação e experiência prática em análise de dados, automação de processos e desenvolvimento de soluções tecnológicas.",
          techSkills: "Habilidades Técnicas",
          tabLanguages: "Linguagens",
          tabBI: "Ferramentas BI",
          tabML: "Machine Learning",
          tabCloud: "Cloud & Big Data",
          softSkills: "Soft Skills",
          skill1: "Resolução de problemas",
          skill2: "Trabalho em equipe",
          skill3: "Comunicação",
          skill4: "Aprendizagem contínua",
          projectsTitle: "Projetos",
          proj1Title: "Análise de clientes com clustering.",
          proj1Desc1: "Técnicas: exploração, visualização, segmentação K-Means.",
          proj1Desc2: "Tecnologias: Python, Pandas, Seaborn, Scikit-learn.",
          viewProject: "Ver projeto",
          proj2Title: "Painel Power BI",
          proj2Desc: "Visualização de KPIs.",
          proj3Title: "Pipeline",
          proj3Desc: "ETL para big data.",
          contactTitle: "Contato",
          inputName: "Nome",
          inputEmail: "Email",
          inputMessage: "Mensagem",
          sendBtn: "Enviar",
          linkedin: "LinkedIn",
          github: "GitHub",
          footerText: "Criado por Katherine Gatica — 2025"
        }
      };
  
      // function to set textContent for all data-i18n keys
      function applyLang(code) {
        try {
          const map = i18n[code] || i18n["es"];
          // text nodes (data-i18n)
          $$("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (map && map[key] !== undefined) {
              el.textContent = map[key];
            }
          });
  
          // placeholders (data-i18n-placeholder)
          $$("[data-i18n-placeholder]").forEach(el => {
            const key = el.getAttribute("data-i18n-placeholder");
            if (map && map[key] !== undefined) el.placeholder = map[key];
          });
  
          // sync selects values
          $$(`#language-select, #language-select-responsive`).forEach(sel => {
            try { sel.value = code; } catch(e){ }
          });
  
          // persist choice
          localStorage.setItem("lang", code);
        } catch (err) {
          console.warn("applyLang error", err);
        }
      }
  
      // initial language
      const saved = localStorage.getItem("lang") || "es";
      // small delay so DOM elements exist
      document.addEventListener("DOMContentLoaded", () => applyLang(saved));
  
      // listeners on selects (safe)
      $$("[id='language-select'], [id='language-select-responsive']").forEach(sel => {
        sel.addEventListener("change", (e) => {
          applyLang(e.target.value || "es");
        });
      });
    })();
  
    // ------------------------------
    // END self-invoking
    // ------------------------------
  })();
  