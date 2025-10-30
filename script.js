// ===================== LOADER =====================
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        gsap.to(loader, {
            duration: 1,
            opacity: 0,
            onComplete: () => {
                loader.style.display = 'none';
            }
        });
    }
}

window.addEventListener('load', hideLoader);
setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader && loader.style.display !== 'none') {
        loader.style.display = 'none';
        alert('Error: la página tardó demasiado en cargar.');
    }
}, 240000);

window.addEventListener('error', e => {
    const loader = document.getElementById('loader');
    if (loader && loader.style.display !== 'none') {
        loader.style.display = 'none';
        alert('Error al cargar la página.');
    }
});

// ===================== PARTICULAS HERO =====================
particlesJS('particles-js', {
    particles: {
        number: { value: 120 },
        color: { value: '#00d4ff' },
        shape: { type: 'circle' },
        opacity: { value: 0.7, random: true },
        size: { value: 3, random: true },
        move: { speed: 2, direction: 'none', out_mode: 'bounce' }
    },
    interactivity: {
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' }
        },
        modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
    }
});

// ===================== PARTICULAS LATERALES =====================
function initSideParticles(id) {
    particlesJS(id, {
        particles: {
            number: { value: 60 },
            color: { value: '#00d4ff' },
            shape: { type: 'circle' },
            opacity: { value: 0.6, random: true },
            size: { value: 3, random: true },
            move: { speed: 1.5, direction: 'none', out_mode: 'out' }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' }
            },
            modes: { repulse: { distance: 100 }, push: { particles_nb: 3 } }
        }
    });
}
initSideParticles('side-particles-left');
initSideParticles('side-particles-right');

// ===================== GSAP ANIMACIONES =====================
gsap.from('.hero h1', { duration: 1.5, opacity: 0, y: -30 });
gsap.from('.hero p', { duration: 1.5, opacity: 0, y: 30, delay: 0.5 });
gsap.from('.btn', { duration: 1.2, opacity: 0, scale: 0.8, delay: 1 });

gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section.querySelector('h2'), {
        scrollTrigger: section,
        duration: 1,
        y: 30,
        opacity: 0
    });
});

// ===================== HAMBURGUESA =====================
const hamburger = document.getElementById('hamburger');
const responsiveMenu = document.getElementById('responsive-menu');
hamburger.addEventListener('click', () => {
    responsiveMenu.classList.toggle('show');
});

// ===================== TABS =====================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(target).classList.add('active');
    });
});

// ===================== MODO OSCURO =====================
const themeToggle = document.getElementById('theme-toggle');
const themeToggleResponsive = document.getElementById('theme-toggle-responsive');

function toggleTheme() {
    document.body.classList.toggle('dark');
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (themeToggleResponsive) themeToggleResponsive.addEventListener('click', toggleTheme);

// ===================== FORMULARIO FORMSPREE =====================
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                alert('Mensaje enviado correctamente ✅');
                form.reset();
            } else {
                alert('Error al enviar mensaje ❌');
            }
        } catch (err) {
            alert('Error de conexión al enviar el mensaje.');
        }
    });
}
