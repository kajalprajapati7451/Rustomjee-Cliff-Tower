/* ===================================
   RUSTOMJEE CLIFF TOWER — SCRIPT v2
   =================================== */
'use strict';

/* === NAVBAR SCROLL === */
const navbar = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

/* === SCROLL REVEAL === */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* === SMOOTH SCROLL === */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    const collapse = document.querySelector('.navbar-collapse');
    if (collapse?.classList.contains('show')) bootstrap.Collapse.getInstance(collapse)?.hide();
  });
});

/* === AMENITY SLIDER === */
(function() {
  const slider = document.querySelector('.amenity-slider');
  const slides = document.querySelectorAll('.amenity-slide');
  const dots = document.querySelectorAll('.am-dot');
  if (!slider || !slides.length) return;

  let current = 0;
  let autoTimer;

  function goTo(idx) {
    current = (idx + slides.length) % slides.length;
    slider.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  document.querySelector('.am-next')?.addEventListener('click', () => { next(); resetAuto(); });
  document.querySelector('.am-prev')?.addEventListener('click', () => { prev(); resetAuto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); resetAuto(); }));

  function startAuto() { autoTimer = setInterval(next, 5000); }
  function resetAuto() { clearInterval(autoTimer); startAuto(); }

  // Touch/swipe support
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetAuto(); }
  });

  goTo(0);
  startAuto();
})();

/* === OVERVIEW SLIDER === */
(function() {
  const track = document.querySelector('.overview-slider');
  const slides = document.querySelectorAll('.overview-slide');
  const dots = document.querySelectorAll('.ov-dot');
  const btnNext = document.querySelector('.ov-next');
  const btnPrev = document.querySelector('.ov-prev');
  if (!track || !slides.length) return;

  let current = 0;
  let auto;

  function goTo(i) {
    current = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  btnNext?.addEventListener('click', () => { next(); reset(); });
  btnPrev?.addEventListener('click', () => { prev(); reset(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); reset(); }));

  function start() { auto = setInterval(next, 6000); }
  function reset() { clearInterval(auto); start(); }

  // touch support
  let tx = 0;
  track.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = tx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    reset();
  });

  goTo(0);
  start();
})();

/* === UNIT PLAN TABS === */
document.querySelectorAll('.unit-tab-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.unit-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.unit-tab-pane').forEach(p => p.classList.remove('active'));
    this.classList.add('active');
    const target = document.getElementById(this.dataset.tab);
    if (target) target.classList.add('active');
  });
});

/* === FORM VALIDATION === */
const form = document.getElementById('enquiryForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    const error = document.getElementById('formError');
    success.classList.remove('show');
    error.classList.remove('show');

    const name   = document.getElementById('name').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const email  = document.getElementById('email').value.trim();
    const type   = document.getElementById('resType').value;

    const err = (msg) => { error.textContent = msg; error.classList.add('show'); };

    if (!name || name.length < 2)           return err('Please enter your full name.');
    if (!/^[6-9]\d{9}$/.test(mobile))       return err('Please enter a valid 10-digit mobile number.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err('Please enter a valid email address.');
    if (!type)                               return err('Please select a residence type.');

    const btn = form.querySelector('.btn-submit-luxury');
    btn.textContent = 'Submitting…';
    btn.disabled = true;

    setTimeout(() => {
      success.classList.add('show');
      form.reset();
      btn.textContent = 'Submit Enquiry';
      btn.disabled = false;
    }, 1400);
  });
}

/* === UNIT REQUEST → scroll to form === */
document.querySelectorAll('.btn-unit-request').forEach(btn => {
  btn.addEventListener('click', function() {
    const typeText = this.closest('.unit-tab-pane')?.id || '';
    const sel = document.getElementById('resType');
    if (sel) {
      if (typeText.includes('4bhk'))  sel.value = '4bhk';
      else if (typeText.includes('5bhk')) sel.value = '5bhk';
    }
    const contact = document.getElementById('contact');
    if (contact) window.scrollTo({ top: contact.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  });
});

/* === ACTIVE NAV ON SCROLL === */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const sp = window.pageYOffset + 120;
  sections.forEach(s => {
    if (sp >= s.offsetTop && sp < s.offsetTop + s.offsetHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      document.querySelector(`.nav-link[href="#${s.id}"]`)?.classList.add('active');
    }
  });
}, { passive: true });

/* === HERO PARALLAX (subtle) === */
window.addEventListener('scroll', () => {
  const y = window.pageYOffset;
  if (y < window.innerHeight) {
    document.querySelectorAll('.slide-bg').forEach(b => {
      b.style.transform = `scale(1.18) translateY(${y * 0.12}px)`;
    });
    const active = document.querySelector('.carousel-item.active .slide-bg');
    if (active) active.style.transform = `scale(1) translateY(${y * 0.12}px)`;
  }
}, { passive: true });

/* === SCROLL TO TOP BUTTON === */
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    scrollToTopBtn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}