/* ============================================================
   AutoFany — interacțiuni site
   ============================================================ */
(function () {
  'use strict';

  /* ---- Header: umbră la scroll ---- */
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Meniu mobil ---- */
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');

  function setMenu(open) {
    navToggle.classList.toggle('open', open);
    mobileNav.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  navToggle.addEventListener('click', function () {
    setMenu(!mobileNav.classList.contains('open'));
  });
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) setMenu(false);
  });

  /* ---- Reveal la scroll ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---- Contoare animate ---- */
  var counters = document.querySelectorAll('[data-count]');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    if (prefersReduced) { el.textContent = prefix + target.toLocaleString('ro-RO') + suffix; return; }
    var dur = 1500, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.floor(eased * target).toLocaleString('ro-RO') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); cObs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cObs.observe(c); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---- Validare formular ---- */
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');

  function showError(field, msg) {
    var input = form.querySelector('#' + field);
    var err = form.querySelector('.error[data-for="' + field + '"]');
    if (input) input.classList.add('invalid');
    if (err) err.textContent = msg;
  }
  function clearError(field) {
    var input = form.querySelector('#' + field);
    var err = form.querySelector('.error[data-for="' + field + '"]');
    if (input) input.classList.remove('invalid');
    if (err) err.textContent = '';
  }

  ['name', 'phone', 'consent'].forEach(function (f) {
    var el = form.querySelector('#' + f);
    if (el) el.addEventListener('input', function () { clearError(f); });
    if (el && el.type === 'checkbox') el.addEventListener('change', function () { clearError(f); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true, firstInvalid = null;

    var name = form.querySelector('#name').value.trim();
    if (name.length < 2) { showError('name', 'Te rugăm să introduci numele tău.'); ok = false; firstInvalid = firstInvalid || 'name'; }
    else clearError('name');

    var phone = form.querySelector('#phone').value.trim();
    var phoneClean = phone.replace(/[\s.\-()]/g, '');
    if (!/^(\+4)?0?7\d{8}$/.test(phoneClean)) { showError('phone', 'Introdu un număr de telefon valid (ex: 07xx xxx xxx).'); ok = false; firstInvalid = firstInvalid || 'phone'; }
    else clearError('phone');

    var consent = form.querySelector('#consent');
    if (!consent.checked) { showError('consent', 'Este necesar acordul pentru a te putea contacta.'); ok = false; firstInvalid = firstInvalid || 'consent'; }
    else clearError('consent');

    if (!ok) {
      var el = form.querySelector('#' + firstInvalid);
      if (el) el.focus();
      return;
    }

    /* Simulare trimitere (fără backend) */
    var btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.textContent = 'Se trimite...';

    setTimeout(function () {
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Trimite solicitarea';
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(function () { success.hidden = true; }, 6000);
    }, 900);
  });

  /* ---- An curent în footer ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    var y = new Date().getFullYear();
    if (!isNaN(y)) yearEl.textContent = y;
  }
})();
