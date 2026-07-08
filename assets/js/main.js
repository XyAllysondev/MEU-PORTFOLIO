/* ══════════════════════════════════════════════════════════════════════════
   Portfolio interactions
   ══════════════════════════════════════════════════════════════════════════ */

/* ── Preloader ─────────────────────────────────────────────────────────── */
(function () {
  const pre = document.getElementById('preloader');
  if (!pre) return;
  window.addEventListener('load', () => {
    setTimeout(() => pre.classList.add('done'), 900);
  });
  // safety fallback
  setTimeout(() => pre.classList.add('done'), 2600);
})();

/* ── Custom cursor (desktop only) ──────────────────────────────────────── */
(function () {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!fine) return;

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  document.body.classList.add('has-cursor');

  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  const interactive = 'a, button, .project-card, .cert-card, .stat-card, .skill-card, input, textarea, .tag, .social-btn';
  document.querySelectorAll(interactive).forEach(el => {
    el.addEventListener('mouseenter', () => { ring.classList.add('hover'); dot.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { ring.classList.remove('hover'); dot.classList.remove('hover'); });
  });
})();

/* ── Scroll progress bar ───────────────────────────────────────────────── */
(function () {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  function update() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.width = p + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── Typewriter ────────────────────────────────────────────────────────── */
(function () {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const lines = [
    'Construindo interfaces que impressionam.',
    'Código limpo. Design preciso.',
    'Front-End Developer & TI Support.',
    'Transformando ideias em produtos reais.',
  ];
  let li = 0, ci = 0, deleting = false;

  function tick() {
    const line = lines[li];
    if (!deleting) {
      el.textContent = line.slice(0, ++ci);
      if (ci === line.length) { deleting = true; setTimeout(tick, 1800); return; }
    } else {
      el.textContent = line.slice(0, --ci);
      if (ci === 0) { deleting = false; li = (li + 1) % lines.length; setTimeout(tick, 400); return; }
    }
    setTimeout(tick, deleting ? 38 : 72);
  }
  tick();
})();

/* ── Scroll reveal (staggered) ─────────────────────────────────────────── */
(function () {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 90);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

/* ── Skill bars ────────────────────────────────────────────────────────── */
(function () {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .3 });
  document.querySelectorAll('.skill-card').forEach(el => obs.observe(el));
})();

/* ── Stat counters ─────────────────────────────────────────────────────── */
(function () {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const raw = el.textContent.trim();
      const match = raw.match(/^(\d+)(.*)$/);
      obs.unobserve(el);
      if (!match) return;                       // e.g. "∞" — leave as-is
      const target = parseInt(match[1], 10);
      const suffix = match[2];
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 30));
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(t); }
        el.textContent = cur + suffix;
      }, 34);
    });
  }, { threshold: .6 });
  document.querySelectorAll('.stat-number').forEach(el => obs.observe(el));
})();

/* ── Nav scroll state + active link ────────────────────────────────────── */
(function () {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('nav ul a');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`nav ul a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: .4 });
  sections.forEach(s => obs.observe(s));
})();

/* ── Mobile hamburger ──────────────────────────────────────────────────── */
(function () {
  const btn = document.getElementById('nav-hamburger');
  const ul = document.querySelector('nav ul');
  if (!btn || !ul) return;
  btn.addEventListener('click', () => {
    ul.classList.toggle('open');
    btn.classList.toggle('open');
  });
  ul.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    ul.classList.remove('open');
    btn.classList.remove('open');
  }));
})();

/* ── Back to top ───────────────────────────────────────────────────────── */
(function () {
  const btn = document.getElementById('back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── Spotlight follow (cards track cursor for radial glow + subtle tilt) ─── */
(function () {
  const cards = document.querySelectorAll('.project-card, .skill-card, .stat-card, .cert-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      card.style.setProperty('--mx', px + 'px');
      card.style.setProperty('--my', py + 'px');

      if (card.classList.contains('project-card')) {
        const x = px / r.width - .5;
        const y = py / r.height - .5;
        card.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-6px)`;
      }
    });
    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('project-card')) card.style.transform = '';
    });
  });
})();

/* ── Magnetic buttons ──────────────────────────────────────────────────── */
(function () {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!fine) return;
  document.querySelectorAll('.btn, .nav-cta, .social-btn, #back-top').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
})();

/* ── Hero parallax on scroll ───────────────────────────────────────────── */
(function () {
  const inner = document.querySelector('.hero-inner');
  if (!inner) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      inner.style.transform = `translateY(${y * 0.28}px)`;
      inner.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.75)));
    }
  }, { passive: true });
})();

/* ── Contact form ──────────────────────────────────────────────────────── */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    const endpoint = form.getAttribute('data-endpoint');

    // If a Formspree/endpoint is configured, actually send it.
    if (endpoint && endpoint.startsWith('http')) {
      btn.disabled = true;
      btn.textContent = 'Enviando…';
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
      }).then(res => {
        if (res.ok) { showSuccess(); }
        else { showError(); }
      }).catch(showError);

      function showSuccess() {
        btn.textContent = 'Mensagem enviada! ✓';
        btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
        form.reset();
        reset();
      }
      function showError() {
        btn.textContent = 'Erro — tente de novo';
        btn.style.background = 'linear-gradient(135deg,#ef4444,#b91c1c)';
        reset();
      }
      function reset() {
        setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; btn.disabled = false; }, 3200);
      }
      return;
    }

    // Fallback: no endpoint configured yet — simulate.
    btn.textContent = 'Mensagem enviada! ✓';
    btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original; btn.style.background = ''; btn.disabled = false; this.reset();
    }, 3000);
  });
})();
