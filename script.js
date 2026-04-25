// ===========================
//  PROPERTY BAAP — script.js
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Hamburger / Mobile Menu ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ── Mobile accordion sub-menus ── */
  const mobileNavTitles = document.querySelectorAll('.mobile-nav-title');

  mobileNavTitles.forEach(title => {
    title.addEventListener('click', () => {
      const targetId = title.getAttribute('data-target');
      const sub = document.getElementById(targetId);
      const isOpen = sub.classList.contains('open');

      // Close all
      document.querySelectorAll('.mobile-nav-sub').forEach(s => s.classList.remove('open'));
      document.querySelectorAll('.mobile-nav-title').forEach(t => t.classList.remove('active'));

      if (!isOpen) {
        sub.classList.add('open');
        title.classList.add('active');
      }
    });
  });

  /* ── Hero Particles ── */
  const particleContainer = document.getElementById('particles');
  const NUM_PARTICLES = 28;

  for (let i = 0; i < NUM_PARTICLES; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');

    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 10 + 8;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -${size}px;
      opacity: 0;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    particleContainer.appendChild(p);
  }

  /* ── Intersection Observer for service cards ── */
  const cards = document.querySelectorAll('.service-card');

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.getAttribute('data-delay') || 0);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach(card => cardObserver.observe(card));

  /* ── Logo image: show fallback if upload not found ── */
  const logoImg = document.getElementById('logoImg');
  const logoFallback = document.getElementById('logoFallback');

  if (logoImg) {
    // If already broken (cached error)
    if (!logoImg.complete || logoImg.naturalWidth === 0) {
      logoImg.style.display = 'none';
      logoFallback.style.display = 'flex';
    }

    logoImg.addEventListener('error', () => {
      logoImg.style.display = 'none';
      logoFallback.style.display = 'flex';
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });

        // Close mobile menu if open
        if (mobileMenu.classList.contains('open')) {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    });
  });

  /* ── Subtle navbar logo pulse on page load ── */
  const logoWrapper = document.querySelector('.logo-wrapper');
  if (logoWrapper) {
    logoWrapper.animate(
      [
        { filter: 'drop-shadow(0 0 0px rgba(201,168,76,0))' },
        { filter: 'drop-shadow(0 0 14px rgba(201,168,76,0.6))' },
        { filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.3))' },
      ],
      { duration: 1800, delay: 600, fill: 'forwards', easing: 'ease-out' }
    );
  }

});
