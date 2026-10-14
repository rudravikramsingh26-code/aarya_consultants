/**
 * Aarya Consultants — GSAP 3 + ScrollTrigger Animation Engine
 * Covers: hero entrance, scroll reveals, stagger grids, counters,
 *         floating badge ambient motion, magnetic hover, footer entrance.
 */

(function () {
  'use strict';

  /* ── Guard: no GSAP → silent graceful skip ── */
  if (typeof gsap === 'undefined') return;

  /* ── Respect prefers-reduced-motion ── */
  const reducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    /* still run counters — they're informational, not purely decorative */
    initCounters();
    return;
  }

  /* ── Register ScrollTrigger ── */
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ─────────────────────────────────────────────────────────
   * UTIL HELPERS
   * ───────────────────────────────────────────────────────── */
  function q(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qa(sel, ctx) { return [...(ctx || document).querySelectorAll(sel)]; }

  /* ─────────────────────────────────────────────────────────
   * 1. GLOBAL DEFAULTS
   * ───────────────────────────────────────────────────────── */
  gsap.defaults({ ease: 'power3.out' });

  /* ─────────────────────────────────────────────────────────
   * 2. NAV ENTRANCE (every page)
   * ───────────────────────────────────────────────────────── */
  const navEl = q('header nav');
  if (navEl) {
    gsap.from(navEl, {
      y: -20,
      opacity: 0,
      duration: 0.65,
      clearProps: 'transform,opacity'
    });
  }

  /* ─────────────────────────────────────────────────────────
   * 3. PAGE HERO ENTRANCE
   *    Works for both index .hero and inner .page-hero
   * ───────────────────────────────────────────────────────── */
  const heroSection = q('.page-hero') || q('.hero');

  if (heroSection) {
    const tl = gsap.timeline({ delay: 0.1, defaults: { ease: 'power3.out' } });

    const eyebrow   = q('.eyebrow', heroSection);
    const heading   = q('h1', heroSection);
    const subPara   = q('p', heroSection);
    const ctaBtns   = qa('.pill, .btn-default', heroSection);
    const heroArt   = q('.dashboard, .hero-art, .hero-visual', heroSection);
    const floats    = qa('.floating-card', heroSection);

    if (eyebrow)   tl.from(eyebrow,  { y: 20, opacity: 0, duration: 0.55 });
    // heading reveal handled by enhancements.js (word-split)
    if (subPara)   tl.from(subPara,  { y: 22, opacity: 0, duration: 0.70 }, '-=0.52');
    if (ctaBtns.length) {
      tl.from(ctaBtns, {
        y: 18, opacity: 0, stagger: 0.10, duration: 0.60,
        clearProps: 'transform,opacity'
      }, '-=0.50');
    }
    if (heroArt) {
      tl.from(heroArt, {
        y: 42, opacity: 0, scale: 0.96, duration: 0.90,
        ease: 'power2.out',
        clearProps: 'transform'       // lets CSS :hover / tilt work
      }, '-=0.60');
    }
    if (floats.length && window.innerWidth > 768) {
      tl.from(floats, {
        y: 28, scale: 0.82, opacity: 0,
        stagger: 0.13, duration: 0.75,
        ease: 'back.out(1.5)',
        clearProps: 'all'
      }, '-=0.50');
    }

    const mobilePills = qa('.mobile-card-pill', heroSection);
    if (mobilePills.length && window.innerWidth <= 768) {
      tl.from(mobilePills, {
        y: 18, opacity: 0,
        stagger: 0.10, duration: 0.55,
        clearProps: 'all'
      }, '-=0.40');
    }

    /* Ambient float on hero badges — gentle yoyo loops */
    floats.forEach((fc, i) => {
      gsap.to(fc, {
        y:        i % 2 === 0 ? '-=9' : '+=8',
        duration: 2.6 + i * 0.5,
        repeat:   -1,
        yoyo:     true,
        ease:     'sine.inOut',
        delay:    i * 0.4
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
   * 4. SCROLL-TRIGGERED SECTION HEADER REVEALS
   *    Eyebrow → H2 → description on every <section>
   * ───────────────────────────────────────────────────────── */
  if (typeof ScrollTrigger !== 'undefined') {

    qa('section').forEach(sec => {
      /* Look for headers in the first .wrap child only — avoids card text */
      const wrap    = q(':scope > .wrap, :scope > div > .wrap', sec) || sec;
      const eye     = q(':scope > .eyebrow, :scope > .wrap > .eyebrow, :scope > div > .eyebrow', sec);
      const h2      = q(':scope > h2, :scope > .wrap > h2, :scope > .wrap > div > h2', sec);
      const desc    = q(':scope > p:not(.card p):not(.role-card p), :scope > .wrap > p, :scope > .wrap > div > p', sec);

      if (!eye && !h2) return;

      const stTl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      });

      if (eye)  stTl.from(eye,  { opacity: 0, y: 16, duration: 0.50, clearProps: 'all' });
      if (h2)   stTl.from(h2,   { opacity: 0, y: 24, duration: 0.65, clearProps: 'all' }, eye ? '-=0.25' : '0');
      if (desc && desc !== h2) stTl.from(desc, { opacity: 0, y: 16, duration: 0.55, clearProps: 'all' }, '-=0.35');
    });

    /* ─────────────────────────────────────────────────────────
     * 5. STAGGERED GRID / CARD REVEALS
     *    Active ONLY on desktop screens (>992px) to prevent
     *    invisible/stuck opacity on mobile viewports.
     * ───────────────────────────────────────────────────────── */
    const GRID_SELECTORS = [
      '.grid-2',
      '.grid-3',
      '.grid-4',
      '.grid-5',
      '.why-grid',
      '.pillars',
      '.hubs-grid',
      '.contact-grid',
      '.career-grid',
      '.map-grid',
      '.values-grid',
      '.feat-list',
      '.channel-list',
      '.cred-grid',
      '.footer-grid',
    ];

    if (window.innerWidth > 992) {
      GRID_SELECTORS.forEach(sel => {
        qa(sel).forEach(container => {
          /* Skip grids already inside the page hero */
          if (container.closest('.page-hero, .hero')) return;

          const kids = [...container.children];
          if (!kids.length) return;

          gsap.from(kids, {
            scrollTrigger: {
              trigger: container,
              start:   'top 88%',
              toggleActions: 'play none none none',
              once: true
            },
            opacity:  0,
            y:        32,
            duration: 0.65,
            stagger:  0.07,
            ease:     'power2.out',
            clearProps: 'all'   // restores full native styles upon completion
          });
        });
      });
    }

    /* ─────────────────────────────────────────────────────────
     * 6. ROLE CARDS (career page — stagger from left)
     * ───────────────────────────────────────────────────────── */
    if (window.innerWidth > 992) {
      qa('.role-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start:   'top 88%',
            toggleActions: 'play none none none',
            once: true
          },
          opacity:  0,
          x:        -30,
          duration: 0.65,
          delay:    i * 0.06,
          ease:     'power2.out',
          clearProps: 'all'
        });
      });
    }

    /* ─────────────────────────────────────────────────────────
     * 7. PERK CARDS (career page — image scale-up)
     * ───────────────────────────────────────────────────────── */
    qa('.perk-card').forEach(card => {
      const img = q('img', card);
      if (img) {
        gsap.from(img, {
          scrollTrigger: {
            trigger: card,
            start:   'top 88%',
            toggleActions: 'play none none none'
          },
          scale:    1.08,
          duration: 0.85,
          ease:     'power2.out',
          clearProps: 'transform'
        });
      }
    });

    /* ─────────────────────────────────────────────────────────
     * 8. QUOTE BOXES — slide in from left
     * ───────────────────────────────────────────────────────── */
    qa('.quote-box').forEach(box => {
      gsap.from(box, {
        scrollTrigger: {
          trigger: box,
          start:   'top 87%',
          toggleActions: 'play none none none'
        },
        opacity:  0,
        x:        -36,
        duration: 0.85,
        ease:     'power3.out',
        clearProps: 'all'
      });
    });

    /* ─────────────────────────────────────────────────────────
     * 9. CTA BANNERS — rise + slight scale
     * ───────────────────────────────────────────────────────── */
    qa('.cta-banner, .consult-strip').forEach(banner => {
      gsap.from(banner, {
        scrollTrigger: {
          trigger: banner,
          start:   'top 87%',
          toggleActions: 'play none none none'
        },
        opacity:  0,
        y:        44,
        scale:    0.97,
        duration: 0.85,
        ease:     'power3.out',
        clearProps: 'all'
      });
    });

    /* ─────────────────────────────────────────────────────────
     * 10. CONTACT / FORM BOXES — pop up
     * ───────────────────────────────────────────────────────── */
    qa('.form-box').forEach(box => {
      gsap.from(box, {
        scrollTrigger: {
          trigger: box,
          start:   'top 87%',
          toggleActions: 'play none none none'
        },
        opacity:  0,
        y:        36,
        duration: 0.80,
        ease:     'power2.out',
        clearProps: 'all'
      });
    });

    /* ─────────────────────────────────────────────────────────
     * 11. MAP CARDS — fade + scale
     * ───────────────────────────────────────────────────────── */
    qa('.map-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start:   'top 88%',
          toggleActions: 'play none none none'
        },
        opacity:  0,
        scale:    0.95,
        y:        28,
        duration: 0.75,
        delay:    i * 0.10,
        ease:     'power2.out',
        clearProps: 'all'
      });
    });

    /* ─────────────────────────────────────────────────────────
     * 12. CHANNEL CARDS (contact page) — slide from left
     * ───────────────────────────────────────────────────────── */
    qa('.channel-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start:   'top 89%',
          toggleActions: 'play none none none'
        },
        opacity:  0,
        x:        -22,
        duration: 0.60,
        delay:    i * 0.07,
        ease:     'power2.out',
        clearProps: 'transform'
      });
    });

    /* ─────────────────────────────────────────────────────────
     * 13. TICKER / MARQUEE STRIP — fade up
     * ───────────────────────────────────────────────────────── */
    const ticker = q('.ticker');
    if (ticker) {
      gsap.from(ticker, {
        scrollTrigger: {
          trigger: ticker,
          start:   'top 92%',
          toggleActions: 'play none none none'
        },
        opacity:  0,
        y:        18,
        duration: 0.60,
        clearProps: 'all'
      });
    }

    /* Client logo strip */
    const clientStrip = q('.client-strip');
    if (clientStrip) {
      gsap.from(clientStrip, {
        scrollTrigger: {
          trigger: clientStrip,
          start:   'top 90%',
          toggleActions: 'play none none none'
        },
        opacity:  0,
        y:        22,
        duration: 0.65,
        clearProps: 'all'
      });
    }

    /* ─────────────────────────────────────────────────────────
     * 14. FOOTER ENTRANCE
     * ───────────────────────────────────────────────────────── */
    const footer = q('footer');
    if (footer && window.innerWidth > 992) {
      const footGrid = q('.footer-grid', footer);
      if (footGrid) {
        gsap.from([...footGrid.children], {
          scrollTrigger: {
            trigger: footer,
            start:   'top 90%',
            toggleActions: 'play none none none',
            once: true
          },
          opacity:  0,
          y:        28,
          stagger:  0.08,
          duration: 0.65,
          ease:     'power2.out',
          clearProps: 'all'
        });
      }
    }

    /* Refresh ScrollTrigger trigger coordinates when images/fonts finish loading */
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });

  } /* end ScrollTrigger block */

  /* ─────────────────────────────────────────────────────────
   * 15. COUNTERS — GSAP-powered smooth roll-up
   *     Replaces old rAF counter; works with or without ST
   * ───────────────────────────────────────────────────────── */
  initCounters();

  function initCounters() {
    const els = qa('.counter[data-target]');
    if (!els.length) return;

    /* If ScrollTrigger is available, trigger on scroll; else trigger immediately */
    els.forEach(el => {
      const target   = parseFloat(el.getAttribute('data-target')) || 0;
      const isLarge  = target >= 1000;
      const isFloat  = !Number.isInteger(target);
      const obj      = { val: 0 };

      function runCounter() {
        gsap.to(obj, {
          val:      target,
          duration: 1.9,
          ease:     'power2.out',
          onUpdate() {
            if (isLarge) {
              el.textContent = Math.round(obj.val).toLocaleString('en-IN') + '+';
            } else if (isFloat) {
              el.textContent = obj.val.toFixed(1) + '%';
            } else {
              el.textContent = Math.round(obj.val) + '+';
            }
          }
        });
      }

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
          trigger: el,
          start:   'top 88%',
          once:    true,
          onEnter: runCounter
        });
      } else {
        runCounter();
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
   * 16. MAGNETIC CARD HOVER (desktop pointer only)
   *     Cards subtly follow mouse — luxury premium feel
   * ───────────────────────────────────────────────────────── */
  if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {

    const MAGNETIC_SELECTORS = [
      '.card',
      '.why-card',
      '.perk-card',
      '.value-card',
      '.info-card',
      '.reg-card',
      '.leader-card',
    ];

    MAGNETIC_SELECTORS.forEach(sel => {
      qa(sel).forEach(card => {
        card.addEventListener('mousemove', e => {
          const rect  = card.getBoundingClientRect();
          const relX  = (e.clientX - rect.left) / rect.width  - 0.5;
          const relY  = (e.clientY - rect.top)  / rect.height - 0.5;
          gsap.to(card, {
            rotateX: -relY * 5,
            rotateY:  relX * 7,
            duration: 0.35,
            ease:     'power1.out',
            overwrite: 'auto'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.50,
            ease:     'power2.out',
            clearProps: 'rotateX,rotateY',
            overwrite: 'auto'
          });
        });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
   * 17. HEADER SHADOW ON SCROLL (replaces inline version)
   * ───────────────────────────────────────────────────────── */
  const headerEl = q('header');
  if (headerEl && typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
      start:  'top top',
      end:    '+=1',
      onUpdate: self => {
        headerEl.style.boxShadow =
          self.progress > 0 ? '0 12px 35px rgba(8,27,69,.09)' : 'none';
      }
    });
  }

})(); // end IIFE
