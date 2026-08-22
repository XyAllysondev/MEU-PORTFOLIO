/* ═══════════════════════════════════════════════════════════════════
   ALLYSON VINÍCIUS — SISTEMA v2.6
   JavaScript vanilla. Sem bibliotecas, sem etapa de build.
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var toque = window.matchMedia('(pointer: coarse)').matches;

  /* ── 01 · BOOT ─────────────────────────────────────────────────── */

  var boot     = $('#boot');
  var bootLog  = $('#boot-log');
  var bootFill = $('#boot-fill');

  var LINHAS = [
    '> inicializando sistema av-2026...',
    '> montando interface .......... OK',
    '> carregando módulos [06/06] .. OK',
    '> unidade robótica av-01 ...... ONLINE',
    '> rastreamento de cursor ...... ATIVO',
    '> pronto.'
  ];

  function encerraBoot() {
    if (!boot) return;
    boot.classList.add('fim');
    document.body.style.overflow = '';
    window.setTimeout(function () {
      if (boot && boot.parentNode) boot.parentNode.removeChild(boot);
    }, 700);
  }

  if (boot && !calmo) {
    document.body.style.overflow = 'hidden';
    var li = 0, prog = 0;

    var escreve = window.setInterval(function () {
      if (li < LINHAS.length) {
        if (bootLog) bootLog.textContent += LINHAS[li] + '\n';
        li++;
        prog = Math.round((li / LINHAS.length) * 100);
        if (bootFill) bootFill.style.width = prog + '%';
      } else {
        window.clearInterval(escreve);
        window.setTimeout(encerraBoot, 380);
      }
    }, 210);
  } else {
    encerraBoot();
  }

  /* ── 02 · RETÍCULA DO MOUSE ────────────────────────────────────── */

  var mira = $('#reticula');

  if (mira && !toque && !calmo) {
    document.body.classList.add('mira-ativa');

    // Escrita direta de transform no mousemove: o browser já entrega no
    // máximo um evento por quadro, então rAF e interpolação só somariam
    // atraso. Sem leitura de layout, sem laço permanente.
    window.addEventListener('mousemove', function (e) {
      mira.style.transform = 'translate3d(' + e.clientX + 'px,' + e.clientY + 'px,0)';
      if (!mira.classList.contains('viva')) mira.classList.add('viva');
    }, { passive: true });

    // troca de estado só quando entra/sai de algo clicável
    var sobre = false;
    document.addEventListener('mouseover', function (e) {
      var alvo = !!e.target.closest('a, button, input, textarea, .cert, .canal');
      if (alvo === sobre) return;
      sobre = alvo;
      mira.classList.toggle('sobre', alvo);
    }, { passive: true });

    document.addEventListener('mouseleave', function () { mira.classList.remove('viva'); });
    document.addEventListener('mouseenter', function () { mira.classList.add('viva'); });
  }

  /* ── 03 · RELÓGIO ──────────────────────────────────────────────── */

  var relogio = $('#relogio');
  if (relogio) {
    var tique = function () {
      var d = new Date(), t;
      try {
        t = d.toLocaleTimeString('pt-BR', {
          timeZone: 'America/Recife', hour12: false,
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
      } catch (e) { t = d.toTimeString().slice(0, 8); }
      relogio.textContent = t;
    };
    tique();
    window.setInterval(tique, 1000);
  }

  /* ── 04 · MÁQUINA DE ESCREVER ──────────────────────────────────── */

  var digita = $('#digita');
  if (digita) {
    var FRASES = [
      'engenharia da computação',
      'desenvolvedor front-end',
      'suporte de ti & redes',
      'javascript, css e html puro'
    ];
    var fi = 0, ci = 0, apagando = false;

    (function roda() {
      var frase = FRASES[fi];
      digita.textContent = frase.slice(0, ci);

      if (!apagando && ci < frase.length) { ci++; window.setTimeout(roda, 62); }
      else if (!apagando)                 { apagando = true; window.setTimeout(roda, 1900); }
      else if (ci > 0)                    { ci--; window.setTimeout(roda, 28); }
      else { apagando = false; fi = (fi + 1) % FRASES.length; window.setTimeout(roda, 320); }
    })();
  }

  /* ── 05 · PROGRESSO + BARRA DE SISTEMA ─────────────────────────── */

  var progresso = $('#progresso');
  var hud       = $('#hud');
  var ultimo    = 0;
  var travado   = false;

  function aoRolar() {
    var y = window.scrollY || window.pageYOffset;
    var t = document.documentElement.scrollHeight - window.innerHeight;

    if (progresso) progresso.style.width = (t > 0 ? (y / t) * 100 : 0) + '%';

    if (hud && !travado) {
      if (y > 240 && y > ultimo) hud.classList.add('recolhido');
      else hud.classList.remove('recolhido');
    }
    ultimo = y;
  }

  var agendado = false;
  window.addEventListener('scroll', function () {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(function () { aoRolar(); agendado = false; });
  }, { passive: true });
  aoRolar();

  /* ── 06 · MENU MÓVEL ───────────────────────────────────────────── */

  var burger = $('#burger');
  var menu   = $('#menu');

  $$('#menu nav a').forEach(function (a, i) { a.style.setProperty('--d', i); });

  function fecha() {
    if (!menu) return;
    menu.classList.remove('aberto');
    menu.setAttribute('aria-hidden', 'true');
    if (burger) {
      burger.classList.remove('x');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Abrir menu');
    }
    document.body.style.overflow = '';
    travado = false;
  }

  if (burger && menu) {
    burger.addEventListener('click', function () {
      if (menu.classList.contains('aberto')) return fecha();
      menu.classList.add('aberto');
      menu.setAttribute('aria-hidden', 'false');
      burger.classList.add('x');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Fechar menu');
      document.body.style.overflow = 'hidden';
      travado = true;
      hud && hud.classList.remove('recolhido');
    });

    $$('#menu a').forEach(function (a) { a.addEventListener('click', fecha); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('aberto')) fecha();
    });
  }

  /* ── 07 · REVELAÇÃO, BARRAS E CONTADORES ───────────────────────── */

  function preencheBarras(el) {
    var b = el.querySelector('.diag-barra i');
    if (b) b.style.width = (el.getAttribute('data-v') || 0) + '%';
  }

  function contaAte(el) {
    var b = el.querySelector('b[data-alvo]');
    if (!b) return;
    var fim = parseInt(b.getAttribute('data-alvo'), 10) || 0;
    var ini = null;
    function passo(t) {
      if (ini === null) ini = t;
      var p = Math.min(1, (t - ini) / 1100);
      b.textContent = Math.round(fim * (1 - Math.pow(1 - p, 3))) + (p === 1 ? '+' : '');
      if (p < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }

  var alvos = $$('.revela');

  if (calmo || !('IntersectionObserver' in window)) {
    alvos.forEach(function (el) {
      el.classList.add('dentro');
      preencheBarras(el);
      contaAte(el);
    });
  } else {
    var olho = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('dentro');
        preencheBarras(e.target);
        contaAte(e.target);
        olho.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });

    alvos.forEach(function (el, i) {
      el.style.transitionDelay = ((i % 5) * 70) + 'ms';
      olho.observe(el);
    });
  }

  /* ── 08 · MÓDULO ATIVO NA BARRA ────────────────────────────────── */

  var secoes = $$('main section[id]');
  var elos   = $$('.hud-nav a');

  if (secoes.length && 'IntersectionObserver' in window) {
    var atualId = null;
    var espia = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.id;
        if (id === atualId) return;
        atualId = id;

        elos.forEach(function (a) {
          a.classList.toggle('ativo', a.getAttribute('href') === '#' + id);
        });

        // o copiloto escuta isto para narrar o módulo
        window.dispatchEvent(new CustomEvent('secao', { detail: id }));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secoes.forEach(function (s) { espia.observe(s); });
  }

  /* ── 09 · FORMULÁRIO ───────────────────────────────────────────── */

  var form    = $('#form');
  var retorno = $('#retorno');

  function diz(txt, tipo) {
    if (!retorno) return;
    retorno.textContent = txt;
    retorno.className = 'retorno' + (tipo ? ' ' + tipo : '');
  }

  if (form) {
    $$('input, textarea', form).forEach(function (c) {
      c.addEventListener('input', function () { c.parentNode.classList.remove('falha'); });
    });

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      var erro = false;
      $$('input[required], textarea[required]', form).forEach(function (c) {
        var vazio = !c.value.trim();
        var mal = c.type === 'email' && c.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.value);
        if (vazio || mal) { c.parentNode.classList.add('falha'); erro = true; }
      });

      if (erro) return diz('> ERRO: campos obrigatórios incompletos.', 'bad');

      var btn = $('button[type="submit"]', form);
      var rot = btn ? $('span', btn).textContent : '';
      if (btn) { btn.disabled = true; $('span', btn).textContent = 'TRANSMITINDO'; }
      diz('> abrindo canal…');

      fetch(form.getAttribute('data-endpoint'), {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          diz('> TRANSMISSÃO RECEBIDA. Respondo em breve.', 'ok');
        })
        .catch(function () {
          diz('> FALHA NO ENVIO. Use allysonfulldev@gmail.com', 'bad');
        })
        .then(function () {
          if (btn) { btn.disabled = false; $('span', btn).textContent = rot; }
        });
    });
  }

  /* ── 10 · ROLAGEM COM COMPENSAÇÃO ──────────────────────────────── */

  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var alvo = a.getAttribute('href');
      if (!alvo) return;

      if (alvo === '#') {
        ev.preventDefault();
        window.scrollTo({ top: 0, behavior: calmo ? 'auto' : 'smooth' });
        return;
      }

      var dest = document.querySelector(alvo);
      if (!dest) return;
      ev.preventDefault();
      var topo = dest.getBoundingClientRect().top + window.scrollY - 66;
      window.scrollTo({ top: Math.max(0, topo), behavior: calmo ? 'auto' : 'smooth' });
      if (history.replaceState) history.replaceState(null, '', alvo);
    });
  });


  /* ── 11 · PROJETOS: PRÉVIA VIVA E EXECUÇÃO EMBUTIDA ────────────── */

  // Pausa a deriva e a varredura dos cards fora da tela. Animação que
  // ninguém vê ainda custa composição — desligar é de graça.
  var quadros = $$('.proj-img');
  if (quadros.length && 'IntersectionObserver' in window) {
    var vigia = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { e.target.classList.toggle('fora', !e.isIntersecting); });
    }, { rootMargin: '120px' });
    quadros.forEach(function (q) { vigia.observe(q); });
  }

  // Carrega o projeto de verdade num iframe, só quando pedido.
  $$('.proj-play').forEach(function (botao) {
    var caixa = botao.closest('.proj-img');
    if (!caixa) return;

    var url  = caixa.getAttribute('data-vivo');
    var nome = caixa.getAttribute('data-nome') || 'projeto';
    var rotulo = $('span', botao);

    botao.addEventListener('click', function () {
      var vivo = caixa.classList.contains('ao-vivo');

      if (vivo) {
        // desliga: remove o iframe para devolver memória e CPU
        var f = $('.proj-quadro', caixa);
        var c = $('.proj-carregando', caixa);
        if (f) f.remove();
        if (c) c.remove();
        caixa.classList.remove('ao-vivo');
        rotulo.textContent = 'RODAR AO VIVO';
        return;
      }

      var aviso = document.createElement('div');
      aviso.className = 'proj-carregando';
      aviso.textContent = 'INICIANDO ' + nome.toUpperCase() + '…';

      var frame = document.createElement('iframe');
      frame.className = 'proj-quadro';
      frame.title = nome + ' rodando ao vivo';
      frame.loading = 'lazy';
      frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox');
      frame.setAttribute('referrerpolicy', 'no-referrer');
      frame.addEventListener('load', function () { aviso.classList.add('sumiu'); });
      frame.src = url;

      caixa.appendChild(aviso);
      caixa.appendChild(frame);
      caixa.classList.add('ao-vivo');
      rotulo.textContent = 'PARAR';
    });
  });

})();
