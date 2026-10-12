(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PHONE = '919038620055';
  var isIndex = /(^|\/)(index\.html)?$/.test(location.pathname);
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function ready(fn) {
    if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var hasGsap = !!(window.gsap && window.ScrollTrigger);
    if (hasGsap) gsap.registerPlugin(ScrollTrigger);

    /* Scroll progress */
    var bar = document.createElement('div');
    bar.id = 'scrollProgress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    var tick = false;
    function setProg() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, window.scrollY / h) : 0) + ')';
      tick = false;
    }
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(setProg); } }, { passive: true });
    setProg();

    /* Floating WhatsApp / Call + mobile sticky bar */
    var waSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5z"/><path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1.5-1.3-2-1-.8.7c-.8-.4-1.5-1.1-1.9-1.9l.7-.8-1-2z"/></svg>';
    var phSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>';
    var bookHref = isIndex ? '#contact' : 'contact.html';
    var fab = document.createElement('div');
    fab.className = 'fab-stack';
    fab.innerHTML = '<a class="fab wa" href="https://wa.me/' + PHONE + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' + waSvg + '</a><a class="fab call" href="tel:+' + PHONE + '" aria-label="Call us">' + phSvg + '</a>';
    document.body.appendChild(fab);
    var sb = document.createElement('div');
    sb.className = 'sticky-bar';
    sb.innerHTML = '<a href="tel:+' + PHONE + '" aria-label="Call us">' + phSvg + 'Call</a><a href="https://wa.me/' + PHONE + '" target="_blank" rel="noopener">' + waSvg + 'WhatsApp</a><a class="book" href="' + bookHref + '">Book Consultation</a>';
    document.body.appendChild(sb);

    /* Page exit transition (exit only, never fades in from blank) */
    window.addEventListener('pageshow', function () { document.body.classList.remove('is-leaving'); });
    if (!reduced) {
      document.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[href]');
        if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
        var href = a.getAttribute('href');
        if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|https?:|javascript:)/i.test(href) || a.hasAttribute('download')) return;
        e.preventDefault();
        document.body.classList.add('is-leaving');
        setTimeout(function () { location.href = a.href; }, 200);
      });
    }

    /* Eyebrow accent line */
    var eyebrows = $$('.section-head .eyebrow, .sticky-title .eyebrow');
    if ('IntersectionObserver' in window) {
      var eo = new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); eo.unobserve(en.target); } });
      }, { threshold: 0.6 });
      eyebrows.forEach(function (el) { eo.observe(el); });
    } else eyebrows.forEach(function (el) { el.classList.add('in'); });

    /* Cursor glow on cards */
    if (window.matchMedia('(hover:hover)').matches) {
      $$('.service, .tax-card, .practice-card, .prod-card, .build-card, .serve-card, .run-card, .step-card, .benefit-card, .city-card').forEach(function (c) {
        c.classList.add('has-glow');
        var g = document.createElement('span');
        g.className = 'glow-layer';
        c.insertBefore(g, c.firstChild);
        c.addEventListener('mousemove', function (e) {
          var r = c.getBoundingClientRect();
          c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
          c.style.setProperty('--my', (e.clientY - r.top) + 'px');
        });
      });
    }

    /* Footer wave divider */
    var footer = $('footer');
    if (footer) {
      var wv = document.createElement('div');
      wv.className = 'wave-divider';
      wv.setAttribute('aria-hidden', 'true');
      wv.innerHTML = '<svg viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0 28C240 62 480 0 720 22s480 40 720 6V60H0z" fill="#e31e24" opacity=".9"/><path d="M0 40C260 12 520 56 780 38s440-26 660-4V60H0z" fill="#040e25"/></svg>';
      footer.parentNode.insertBefore(wv, footer);
    }

    /* Reverse second marquee row */
    var strip = $('.client-strip');
    if (strip) {
      var track = $('.client-track', strip);
      if (track && !$('.client-track.rev', strip)) {
        var rev = track.cloneNode(true);
        rev.classList.add('rev');
        rev.setAttribute('aria-hidden', 'true');
        var items = $$('.client-item', rev);
        items.reverse().forEach(function (it) { rev.appendChild(it); });
        track.parentNode.insertBefore(rev, track.nextSibling);
      }
    }

    /* Count-up helper */
    function countUp(el, to, dec, prefix, suffix, dur) {
      if (reduced || !hasGsap) return;
      var o = { v: 0 };
      gsap.to(o, {
        v: to, duration: dur || 1.6, ease: 'power2.out',
        onUpdate: function () { el.textContent = prefix + o.v.toFixed(dec) + suffix; },
        onComplete: function () { el.textContent = prefix + to.toFixed(dec) + suffix; }
      });
    }
    function parseNum(txt) {
      var m = txt.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/);
      if (!m) return null;
      return { prefix: m[1], num: parseFloat(m[2].replace(/,/g, '')), dec: (m[2].split('.')[1] || '').length, suffix: m[3], comma: m[2].indexOf(',') > -1 };
    }
    $$('.floating-card strong, .mobile-card-pill strong, .hero-floating-pills strong').forEach(function (el) {
      var p = parseNum(el.textContent.trim());
      if (!p || el.dataset.cu) return;
      el.dataset.cu = 1;
      var o = { v: 0 };
      if (reduced || !hasGsap) return;
      gsap.to(o, {
        v: p.num, duration: 1.8, delay: 1.1, ease: 'power2.out',
        onUpdate: function () {
          var s = p.dec ? o.v.toFixed(p.dec) : Math.round(o.v).toString();
          if (p.comma) s = Number(s).toLocaleString('en-IN');
          el.textContent = p.prefix + s + p.suffix;
        }
      });
      el.textContent = p.prefix + '0' + p.suffix;
    });

    if (hasGsap && !reduced) {
      /* Hero / page-hero headline word reveal */
      var h1 = $('.hero h1') || $('.page-hero h1');
      if (h1 && !h1.dataset.split) {
        h1.dataset.split = 1;
        (function split(node) {
          Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
            if (ch.nodeType === 3) {
              var frag = document.createDocumentFragment();
              ch.textContent.split(/(\s+)/).forEach(function (t) {
                if (!t) return;
                if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(' ')); return; }
                var w = document.createElement('span'); w.className = 'w';
                var wi = document.createElement('span'); wi.className = 'wi'; wi.textContent = t;
                w.appendChild(wi); frag.appendChild(w);
              });
              node.replaceChild(frag, ch);
            } else if (ch.nodeType === 1 && ch.tagName !== 'BR') split(ch);
          });
        })(h1);
        var tl = gsap.timeline({ delay: 0.25 });
        tl.from($$('.wi', h1), { yPercent: 110, duration: 0.8, ease: 'power3.out', stagger: 0.07 });
        var ser = $('.serif', h1);
        if (ser) {
          h1.style.setProperty('--ul', 0);
          var u = { v: 0 };
          tl.to(u, { v: 1, duration: 0.7, ease: 'power2.inOut', onUpdate: function () { ser.style.setProperty('--ul', u.v); } }, '-=0.1');
        }
      }

      /* Hero parallax */
      var vbg = $('.hero-video-bg'), hero = $('.hero');
      if (vbg && hero) {
        vbg.style.top = '-14%'; vbg.style.bottom = '-14%'; vbg.style.height = 'auto';
        gsap.fromTo(vbg, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
        var dash = $('.dashboard');
        if (dash && window.innerWidth > 900) {
          gsap.to('.hero-art', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
        }
      }

      /* Dashboard chart draw + value tick */
      var dashEl = $('.dashboard');
      if (dashEl) {
        var paths = $$('svg path', dashEl);
        paths.forEach(function (p) {
          var fillAttr = p.getAttribute('fill');
          if (fillAttr && fillAttr !== 'none') {
            gsap.from(p, { opacity: 0, duration: 1.2, delay: 1.6 });
          } else if (p.getTotalLength) {
            var L = p.getTotalLength();
            gsap.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 1.8, delay: 1.0, ease: 'power2.out' });
          }
        });
        var dv = $('.dash-value', dashEl);
        if (dv) {
          var o2 = { v: 0 };
          dv.textContent = '\u20B9 0.00 Cr';
          gsap.to(o2, { v: 14.85, duration: 1.9, delay: 1.0, ease: 'power2.out', onUpdate: function () { dv.textContent = '\u20B9 ' + o2.v.toFixed(2) + ' Cr'; } });
        }
      }

      /* Services "How an engagement runs" progress */
      var rg = $('.runs-grid');
      if (rg) {
        var cards = $$('.run-card', rg);
        ScrollTrigger.create({
          trigger: rg, start: 'top 75%', end: 'bottom 60%', scrub: true,
          onUpdate: function (s) {
            rg.style.setProperty('--prog', s.progress);
            cards.forEach(function (c, i) { c.classList.toggle('lit', s.progress >= i / cards.length + 0.05); });
          }
        });
      }

      /* Index "How we work" active step */
      var stepEls = $$('.steps .step');
      if (stepEls.length) {
        stepEls.forEach(function (s) {
          ScrollTrigger.create({
            trigger: s, start: 'top 60%', end: 'bottom 40%',
            onToggle: function (self) { if (self.isActive) { stepEls.forEach(function (x) { x.classList.remove('active'); }); s.classList.add('active'); } }
          });
        });
      }
    }

    /* Client stories (index only) */
    var stories = [
      ['QxLFw5pWJ2s', 'Adhiraj Singh & Mandira Singh'],
      ['wRhjTUmKFg4', 'Captain Debmalya Ghosh'],
      ['-bbGgczSTYI', 'Meghdut Roy Chowdhury'],
      ['L2twwZE2KsA', 'Shri. Sumanta Dutta & Smt. Ramona Dutta'],
      ['xvFmJA90-XA', 'Dr. Ejaz Ahmad Bari'],
      ['RNjOaP1l8-k', 'M. K. Singh']
    ];
    var anchor = $('section.final-cta') || $('#contact');
    if (isIndex && anchor && !$('.stories')) {
      var sec = document.createElement('section');
      sec.className = 'stories';
      sec.id = 'stories';
      var cardsHtml = stories.map(function (s) {
        return '<article class="story-card"><button type="button" class="story-media" data-vid="' + s[0] + '" aria-label="Play story: ' + s[1] + '"><img src="images/story-' + s[0] + '.webp" alt="' + s[1] + '" loading="lazy" decoding="async"><span class="story-play"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span></button><div class="story-body"><h4>' + s[1] + '</h4><p>Client story</p></div></article>';
      }).join('');
      sec.innerHTML = '<div class="wrap"><div class="stories-head"><div><span class="eyebrow">Client Stories</span><h2>In Their Own Words</h2></div><div class="stories-nav"><button type="button" data-dir="-1" aria-label="Previous"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 18l-6-6 6-6"/></svg></button><button type="button" data-dir="1" aria-label="Next"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 18l6-6-6-6"/></svg></button></div></div><div class="stories-track">' + cardsHtml + '</div><div class="stories-foot"><a class="btn-red" style="display:inline-block;padding:14px 26px;border-radius:12px;background:#e31e24;color:#fff;font:800 14px Manrope,sans-serif;text-decoration:none" href="https://youtube.com/playlist?list=PLLwDLj_5gqGw&si=alnNhIjy9AAm1LG0" target="_blank" rel="noopener">Read all client stories</a></div></div>';
      anchor.parentNode.insertBefore(sec, anchor);
      var trk = $('.stories-track', sec);
      $$('.stories-nav button', sec).forEach(function (b) {
        b.addEventListener('click', function () { trk.scrollBy({ left: +b.dataset.dir * 400, behavior: 'smooth' }); });
      });
      trk.addEventListener('click', function (e) {
        var m = e.target.closest('.story-media');
        if (!m || !m.dataset.vid) return;
        m.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + m.dataset.vid + '?autoplay=1&rel=0" title="Client story" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
        m.removeAttribute('data-vid');
        m.style.cursor = 'default';
      });
    }

    /* Honest forms: WhatsApp prefill (+ optional endpoint) */
    $$('form[data-lead]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var lines = [];
        $$('input, select, textarea', form).forEach(function (f) {
          var v = (f.value || '').trim();
          if (!v) return;
          var label = f.getAttribute('data-label') || f.getAttribute('placeholder') || 'Field';
          lines.push(label + ': ' + v);
        });
        var text = 'New enquiry from website%0A' + lines.map(encodeURIComponent).join('%0A');
        var status = $('.form-status', form);
        if (!status) { status = document.createElement('div'); status.className = 'form-status'; form.appendChild(status); }
        var ep = form.getAttribute('data-endpoint');
        function viaWa() {
          window.open('https://wa.me/' + PHONE + '?text=' + text, '_blank', 'noopener');
          status.className = 'form-status ok';
          status.textContent = 'WhatsApp has opened with your details. Press send there to reach our team.';
        }
        if (ep) {
          var data = {};
          lines.forEach(function (l) { var i = l.indexOf(': '); data[l.slice(0, i)] = l.slice(i + 2); });
          fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
            .then(function (r) { if (!r.ok) throw 0; status.className = 'form-status ok'; status.textContent = 'Thank you. Your request has been sent.'; form.reset(); })
            .catch(function () { status.className = 'form-status err'; status.textContent = 'Could not send. Opening WhatsApp instead.'; viaWa(); });
        } else viaWa();
      });
    });
  });
})();
