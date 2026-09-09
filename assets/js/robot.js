/* ═══════════════════════════════════════════════════════════════════
   UNIDADE_AV-01 — robô que rastreia o cursor e acompanha a leitura
   No hero: corpo inteiro. Ao rolar: copiloto fixo que comenta o módulo.
   Um único laço de rAF serve os dois, e só roda quem está na tela.
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var svg = document.getElementById('bot');
  var piloto = document.getElementById('piloto');
  if (!svg && !piloto) return;

  var calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── peças do robô grande ────────────────────────────────────── */

  var area    = document.getElementById('bot-area');
  var cabeca  = document.getElementById('bot-cabeca');
  var olhos   = document.getElementById('bot-olhos');
  var boca    = document.getElementById('bot-boca');
  var balao   = document.getElementById('bot-balao');
  var fala    = document.getElementById('bot-fala');
  var coord   = document.getElementById('bot-coord');
  var corpo   = svg ? svg.querySelector('.bot-corpo') : null;
  var pupilas = svg ? [].slice.call(svg.querySelectorAll('.bot-pupila')) : [];

  /* ── peças do copiloto ───────────────────────────────────────── */

  var pCorpo   = document.getElementById('piloto-corpo');
  var pOlhos   = document.getElementById('piloto-olhos');
  var pBoca    = document.getElementById('piloto-boca');
  var pBalao   = document.getElementById('piloto-balao');
  var pFala    = document.getElementById('piloto-fala');
  var pPupilas = piloto ? [].slice.call(piloto.querySelectorAll('.piloto-pupila')) : [];

  var BOCA_RETA  = 'M156 200h48';
  var BOCA_SORRI = 'M154 194q26 22 52 0';
  var PB_RETA    = 'M50 80h20';
  var PB_SORRI   = 'M49 77q11 10 22 0';

  var FALAS = [
    'Opa! Me acompanha aí embaixo.',
    'Rastreando cursor… posição travada.',
    'Sou feito de SVG e JavaScript puro.',
    'Role a página, tem projeto lá.',
    'Precisa de um dev? Fala com o Allyson.',
    'Sistemas nominais. Tudo certo por aqui.',
    'Os certificados estão no módulo 05.'
  ];

  // uma fala por módulo — o copiloto narra onde você está
  var GUIA = {
    perfil:         'SYS.01 — Quem é o Allyson e como ele chegou aqui.',
    stack:          'SYS.02 — As ferramentas do dia a dia, com nível de domínio.',
    projetos:       'SYS.03 — Quatro projetos no ar. O ALTERNATIVA é o mais robusto.',
    registro:       'SYS.04 — Por onde ele passou: trabalho e formação.',
    certificacoes:  'SYS.05 — Onze certificados. Clique em qualquer um para abrir o PDF.',
    contato:        'SYS.06 — Chegou na parte boa: manda a mensagem.'
  };

  /* ── estado compartilhado ────────────────────────────────────── */

  var alvo    = { x: 0, y: 0 };
  var atual   = { x: 0, y: 0 };
  var pAtual  = { x: 0, y: 0 };
  var perto   = false;
  var heroNaTela = true;
  var rodando = false;

  function centro(el) {
    var r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height * 0.42, w: r.width };
  }

  /* ── entrada do mouse ────────────────────────────────────────── */

  function mira(cx, cy) {
    // com movimento reduzido o robô fica parado: sem isto o mousemove
    // ainda leria layout e abriria o balão a cada quadro.
    if (calmo) return;

    // alvo do robô grande (só interessa quando o hero está visível)
    if (svg && heroNaTela) {
      var c = centro(svg);
      var dx = cx - c.x, dy = cy - c.y;
      alvo.x = Math.max(-1, Math.min(1, dx / (window.innerWidth / 2)));
      alvo.y = Math.max(-1, Math.min(1, dy / (window.innerHeight / 2)));

      if (coord) {
        coord.textContent = 'ΔX ' + (dx >= 0 ? '+' : '') + Math.round(dx) +
                            '  ΔY ' + (dy >= 0 ? '+' : '') + Math.round(dy);
      }

      var agoraPerto = Math.hypot(dx, dy) < Math.max(c.w, 300) * 0.85;
      if (agoraPerto !== perto) {
        perto = agoraPerto;
        if (area)  area.classList.toggle('perto', perto);
        if (boca)  boca.setAttribute('d', perto ? BOCA_SORRI : BOCA_RETA);
        if (balao) {
          balao.classList.toggle('visivel', perto);
          if (perto && fala) fala.textContent = FALAS[Math.floor(Math.random() * FALAS.length)];
        }
      }
    } else {
      // fora do hero o olhar do grande volta ao repouso
      alvo.x = 0; alvo.y = 0;
    }

    // alvo do copiloto — normalizado pela tela inteira
    if (piloto && !heroNaTela) {
      var pc = centro(pCorpo);
      alvo.px = Math.max(-1, Math.min(1, (cx - pc.x) / (window.innerWidth / 2)));
      alvo.py = Math.max(-1, Math.min(1, (cy - pc.y) / (window.innerHeight / 2)));
    }

    liga();
  }

  window.addEventListener('mousemove', function (e) { mira(e.clientX, e.clientY); }, { passive: true });

  window.addEventListener('touchmove', function (e) {
    if (e.touches && e.touches[0]) mira(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  window.addEventListener('mouseout', function (e) {
    if (calmo || e.relatedTarget) return;
    alvo.x = alvo.y = alvo.px = alvo.py = 0;
    if (perto) {
      perto = false;
      if (area)  area.classList.remove('perto');
      if (boca)  boca.setAttribute('d', BOCA_RETA);
      if (balao) balao.classList.remove('visivel');
    }
    if (coord) coord.textContent = 'CURSOR FORA DE ALCANCE';
    liga();
  });

  /* ── laço único, com parada automática ───────────────────────── */

  function proximo(a, b, k) { return a + (b - a) * k; }

  function laco() {
    var mexeu = false;

    if (svg && heroNaTela) {
      atual.x = proximo(atual.x, alvo.x, 0.12);
      atual.y = proximo(atual.y, alvo.y, 0.12);

      if (cabeca) {
        cabeca.style.transform = 'translate(' + (atual.x * 10).toFixed(2) + 'px,' +
          (atual.y * 6).toFixed(2) + 'px) rotate(' + (atual.x * 9).toFixed(2) + 'deg)';
      }
      if (corpo) corpo.style.transform = 'translate(' + (atual.x * 4).toFixed(2) + 'px,0)';

      var px = (atual.x * 8).toFixed(2), py = (atual.y * 6.8).toFixed(2);
      for (var i = 0; i < pupilas.length; i++) {
        pupilas[i].style.transform = 'translate(' + px + 'px,' + py + 'px)';
      }
      if (Math.abs(alvo.x - atual.x) > 0.001 || Math.abs(alvo.y - atual.y) > 0.001) mexeu = true;
    }

    if (piloto && !heroNaTela) {
      pAtual.x = proximo(pAtual.x, alvo.px || 0, 0.16);
      pAtual.y = proximo(pAtual.y, alvo.py || 0, 0.16);
      var qx = (pAtual.x * 3.4).toFixed(2), qy = (pAtual.y * 2.6).toFixed(2);
      for (var j = 0; j < pPupilas.length; j++) {
        pPupilas[j].style.transform = 'translate(' + qx + 'px,' + qy + 'px)';
      }
      if (Math.abs((alvo.px || 0) - pAtual.x) > 0.001 ||
          Math.abs((alvo.py || 0) - pAtual.y) > 0.001) mexeu = true;
    }

    // convergiu: dorme até o próximo movimento em vez de queimar quadros
    if (!mexeu) { rodando = false; return; }
    requestAnimationFrame(laco);
  }

  function liga() {
    if (rodando || calmo) return;
    rodando = true;
    requestAnimationFrame(laco);
  }

  /* ── piscada dos dois ────────────────────────────────────────── */

  function pisca() {
    var alvoOlhos = heroNaTela ? olhos : pOlhos;
    if (alvoOlhos) {
      alvoOlhos.classList.add('pisca');
      window.setTimeout(function () { alvoOlhos.classList.remove('pisca'); }, 130);
    }
    window.setTimeout(pisca, 2400 + Math.random() * 4200);
  }

  /* ── embarque do copiloto ao sair do hero ────────────────────── */

  var hero = document.querySelector('.hero');
  if (hero && piloto && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (ents) {
      heroNaTela = ents[0].isIntersecting;
      piloto.classList.toggle('embarcou', !heroNaTela);
      piloto.setAttribute('aria-hidden', heroNaTela ? 'true' : 'false');
      piloto.inert = heroNaTela;
      if (!heroNaTela) liga();
    }, { threshold: 0.18 }).observe(hero);
  }

  /* ── narração por módulo ─────────────────────────────────────── */

  var sumindo = null;
  window.addEventListener('secao', function (e) {
    var texto = GUIA[e.detail];
    if (!texto || !pBalao || !pFala || heroNaTela) return;

    pFala.textContent = texto;
    pBalao.classList.add('visivel');
    if (pBoca) pBoca.setAttribute('d', PB_SORRI);

    window.clearTimeout(sumindo);
    sumindo = window.setTimeout(function () {
      pBalao.classList.remove('visivel');
      if (pBoca) pBoca.setAttribute('d', PB_RETA);
    }, 5200);
  });

  /* ── cliques ─────────────────────────────────────────────────── */

  if (svg) {
    svg.addEventListener('click', function () {
      if (!balao || !fala) return;
      fala.textContent = FALAS[Math.floor(Math.random() * FALAS.length)];
      balao.classList.add('visivel');
    });
  }

  if (pCorpo) {
    pCorpo.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: calmo ? 'auto' : 'smooth' });
    });
  }

  /* ── partida ─────────────────────────────────────────────────── */

  if (!calmo) {
    liga();
    window.setTimeout(pisca, 1800);
  }

})();
