const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const backToTop = document.querySelector('.back-to-top');

const updateBackToTop = () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
};

window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();

const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('.site-menu');
const menuCloseControls = document.querySelectorAll('[data-menu-close]');

const setMenuOpen = (open) => {
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  siteMenu.setAttribute('aria-hidden', String(!open));

  if (open) {
    siteMenu.querySelector('a').focus();
  } else {
    menuToggle.focus();
  }
};

menuToggle.addEventListener('click', () => setMenuOpen(true));
menuCloseControls.forEach((control) => {
  control.addEventListener('click', () => setMenuOpen(false));
});
siteMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.body.classList.contains('menu-open')) {
    setMenuOpen(false);
  }
});
