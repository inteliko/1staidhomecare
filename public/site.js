const revealItems = document.querySelectorAll('.reveal');
const siteHeader = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');

if ('IntersectionObserver' in window && revealItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -40px 0px',
  });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

if (siteHeader && navToggle) {
  const closeMenu = () => {
    siteHeader.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const willOpen = !siteHeader.classList.contains('menu-open');
    siteHeader.classList.toggle('menu-open', willOpen);
    navToggle.setAttribute('aria-expanded', String(willOpen));
  });

  siteHeader.querySelectorAll('.site-nav a, .nav-cta').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

const sliders = document.querySelectorAll('[data-slider]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

sliders.forEach((slider) => {
  const slides = Array.from(slider.querySelectorAll('.hero-slide'));
  const dots = Array.from(slider.querySelectorAll('.slider-dot'));
  const interval = Number(slider.dataset.interval || 2000);
  const syncTargetName = slider.dataset.syncTarget;
  const syncedSlides = syncTargetName
    ? Array.from(document.querySelectorAll(`[data-panel-slider="${syncTargetName}"] .panel-slide`))
    : [];

  if (slides.length < 2) return;

  let currentIndex = 0;

  const renderSlide = (index) => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === index);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
    });
    syncedSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === index);
    });
  };

  renderSlide(currentIndex);

  if (!reducedMotion) {
    window.setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      renderSlide(currentIndex);
    }, interval);
  }
});
