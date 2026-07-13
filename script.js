// Smooth scroll para enlaces del navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Navbar sticky al hacer scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('shadow-lg');
    navbar.style.position = 'sticky';
    navbar.style.top = '0';
    navbar.style.zIndex = '1000';
  } else {
    navbar.classList.remove('shadow-lg');
    navbar.style.position = 'relative';
  }
});

// Resaltar enlace activo del navbar según sección visible
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Animación de entrada al hacer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .gallery img, section').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Formulario de contacto con feedback
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = 'Enviando...';
    btn.classList.add('btn-secondary');
    btn.classList.remove('btn-warning');

    setTimeout(() => {
      btn.textContent = '¡Enviado!';
      btn.classList.add('btn-success');
      btn.classList.remove('btn-secondary');

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.remove('btn-success');
        btn.classList.add('btn-warning');
        form.reset();
      }, 2000);
    }, 1500);
  });
}

// Contador animado para estadísticas (si se agregan)
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Efecto parallax suave en el hero
const hero = document.querySelector('#inicio');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
  });
}

// Modal de casas - cargar imágenes dinámicamente
document.querySelectorAll('[data-bs-toggle="modal"]').forEach(btn => {
  btn.addEventListener('click', function () {
    const modalId = this.getAttribute('data-bs-target');
    const modal = document.querySelector(modalId);
    if (modal) {
      const img = modal.querySelector('img');
      if (img) {
        img.style.opacity = '0';
        img.onload = () => {
          img.style.opacity = '1';
          img.style.transition = 'opacity 0.3s ease';
        };
      }
    }
  });
});

console.log('Constructora M&J - Script cargado correctamente');
