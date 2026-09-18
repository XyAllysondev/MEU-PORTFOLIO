/* ═══════════════════════════════════════════════════════════════════
   ALLYSON VINÍCIUS — Portfólio v3
   JavaScript vanilla. Sem bibliotecas, sem etapa de build.
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 01 · VÍDEO DO HERO ────────────────────────────────────────── */

  var video  = $('#video-hero');
  var toggle = $('#video-toggle');

  if (video) {
    // Autoplay silencioso pode ser bloqueado; com movimento reduzido
    // ficamos no poster e deixamos o botão ligar o vídeo sob demanda.
    if (calmo) {
      video.removeAttribute('autoplay');
      video.pause();
    }

    var pintaToggle = function () {
      if (!toggle) return;
      var pausado = video.paused;
      toggle.classList.toggle('pausado', pausado);
      toggle.setAttribute('aria-pressed', String(pausado));
      toggle.setAttribute('aria-label', pausado ? 'Reproduzir vídeo' : 'Pausar vídeo');
    };

    video.addEventListener('play',  pintaToggle);
    video.addEventListener('pause', pintaToggle);
    pintaToggle();

    if (toggle) {
      toggle.addEventListener('click', function () {
        if (video.paused) {
          var p = video.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          video.pause();
        }
      });
    }

    // Não gasta CPU tocando fora da tela.
    if ('IntersectionObserver' in window && !calmo) {
      var pausadoPeloUsuario = false;
      toggle && toggle.addEventListener('click', function () {
        pausadoPeloUsuario = !video.paused ? false : true;
      });

      new IntersectionObserver(function (ents) {
        ents.forEach(function (e) {
          if (e.isIntersecting) {
            if (!pausadoPeloUsuario) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.2 }).observe(video);
    }
  }

  /* ── 02 · CABEÇALHO E ROLAGEM ──────────────────────────────────── */

  var topo    = $('#topo');
  var simbolo = $('#simbolo');

  function aoRolar() {
    var y = window.scrollY || window.pageYOffset;
    if (topo) topo.classList.toggle('rolou', y > 12);
    if (simbolo && !calmo) simbolo.style.setProperty('--par', (y * -0.06) + 'px');
  }

  var agendado = false;
  window.addEventListener('scroll', function () {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(function () { aoRolar(); agendado = false; });
  }, { passive: true });
  aoRolar();

  /* ── 03 · MENU MÓVEL ───────────────────────────────────────────── */

  var burger = $('#burger');
  var menu   = $('#menu-movel');

  $$('#menu-movel nav a').forEach(function (a, i) { a.style.setProperty('--d', i); });

  function fecha(devolveFoco) {
    if (!menu) return;
    menu.classList.remove('aberto');
    menu.setAttribute('aria-hidden', 'true');
    menu.inert = true;
    if (burger) {
      burger.classList.remove('x');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Abrir menu');
      if (devolveFoco) burger.focus();
    }
    document.body.style.overflow = '';
  }

  if (burger && menu) {
    burger.addEventListener('click', function () {
      if (menu.classList.contains('aberto')) return fecha(true);
      menu.classList.add('aberto');
      menu.setAttribute('aria-hidden', 'false');
      menu.inert = false;
      burger.classList.add('x');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Fechar menu');
      document.body.style.overflow = 'hidden';
      var primeiro = $('nav a', menu);
      if (primeiro) primeiro.focus();
    });

    $$('#menu-movel a').forEach(function (a) {
      a.addEventListener('click', function () { fecha(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (!menu.classList.contains('aberto')) return;
      if (e.key === 'Escape') return fecha(true);
      if (e.key !== 'Tab') return;

      var itens = $$('a[href], button', menu);
      if (!itens.length) return;
      var ini = itens[0], fim = itens[itens.length - 1];

      if (e.shiftKey && document.activeElement === ini) { e.preventDefault(); fim.focus(); }
      else if (!e.shiftKey && document.activeElement === fim) { e.preventDefault(); ini.focus(); }
    });
  }

  /* ── 04 · REVELAÇÃO, BARRAS E CONTADORES ───────────────────────── */

  function preencheBarra(el) {
    var b = el.querySelector('.skill-barra i');
    if (b) b.style.width = (el.getAttribute('data-v') || 0) + '%';
  }

  function contaAte(b) {
    var fim = parseInt(b.getAttribute('data-conta'), 10) || 0;
    if (calmo) { b.textContent = fim; return; }
    var ini = null;
    function passo(t) {
      if (ini === null) ini = t;
      var p = Math.min(1, (t - ini) / 1100);
      b.textContent = Math.round(fim * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(passo);
    }
    b.textContent = '0';
    requestAnimationFrame(passo);
  }

  var alvos = $$('.revela');

  if (calmo || !('IntersectionObserver' in window)) {
    alvos.forEach(function (el) { el.classList.add('dentro'); preencheBarra(el); });
    $$('[data-conta]').forEach(function (b) { b.textContent = b.getAttribute('data-conta'); });
  } else {
    var olho = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('dentro');
        preencheBarra(e.target);
        olho.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    alvos.forEach(function (el) { olho.observe(el); });

    var contadores = $$('[data-conta]');
    if (contadores.length) {
      var olhoConta = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) {
          if (!e.isIntersecting) return;
          contaAte(e.target);
          olhoConta.unobserve(e.target);
        });
      }, { threshold: 0.5 });
      contadores.forEach(function (b) { olhoConta.observe(b); });
    }
  }

  /* ── 05 · SEÇÃO ATIVA NO MENU + GUIA ───────────────────────────── */

  var secoes = $$('main section[id]');
  var elos   = $$('.menu a');

  var guia      = $('#guia');
  var guiaBalao = $('#guia-balao');
  var guiaFala  = $('#guia-fala');
  var guiaVideo = $('#guia-video');
  var guiaCorpo = $('#guia-corpo');

  var FALAS = {
    inicio:       'Oi! Eu sou o <b>Allyson</b>. Rola a página que eu te acompanho.',
    sobre:        'Aqui é a minha história: comecei consertando o que quebrava.',
    stack:        'Essas são as ferramentas que eu uso <b>todo dia</b>.',
    projetos:     'Clica em <b>Ver ao vivo</b> — os projetos rodam de verdade aqui dentro.',
    experiencia:  'Por onde já passei: TI, freela e a faculdade de <b>Engenharia</b>.',
    certificados: '<b>11 cursos</b> concluídos. Cada um abre o PDF do certificado.',
    contato:      'Curtiu? Me manda uma mensagem — respondo <b>em horas</b>.'
  };
  var falaAtual = 'inicio';

  function guiaDiz(id) {
    if (!guiaFala || !FALAS[id] || id === falaAtual) return;
    falaAtual = id;
    if (calmo) { guiaFala.innerHTML = FALAS[id]; return; }
    guiaBalao.classList.add('troca');
    window.setTimeout(function () {
      guiaFala.innerHTML = FALAS[id];
      guiaBalao.classList.remove('troca');
      guiaBalao.classList.add('pulo');
      window.setTimeout(function () { guiaBalao.classList.remove('pulo'); }, 520);
    }, 320);
  }

  if (guia) {
    // aparece depois que o visitante começa a rolar
    var mostraGuia = function () {
      if ((window.scrollY || 0) > 160) guia.classList.add('visivel');
    };
    window.addEventListener('scroll', mostraGuia, { passive: true });
    mostraGuia();
    if (calmo) guia.classList.add('visivel');

    if (guiaCorpo) {
      guiaCorpo.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: calmo ? 'auto' : 'smooth' });
      });
    }

    if (guiaVideo) {
      if (calmo) { guiaVideo.removeAttribute('autoplay'); guiaVideo.pause(); }
      document.addEventListener('visibilitychange', function () {
        if (calmo) return;
        if (document.hidden) guiaVideo.pause();
        else { var p = guiaVideo.play(); if (p && p.catch) p.catch(function () {}); }
      });
    }
  }

  if (secoes.length && 'IntersectionObserver' in window) {
    var espia = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.id;
        elos.forEach(function (a) {
          a.classList.toggle('ativo', a.getAttribute('href') === '#' + id);
        });
        guiaDiz(id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    secoes.forEach(function (s) { espia.observe(s); });
  }

  /* ── 06 · FORMULÁRIO ───────────────────────────────────────────── */

  var form    = $('#form');
  var retorno = $('#retorno');
  var resumo  = $('#erro-resumo');

  function diz(txt, tipo) {
    if (!retorno) return;
    retorno.textContent = txt;
    retorno.className = 'retorno' + (tipo ? ' ' + tipo : '');
  }

  if (form) {
    var CAMPOS = [
      { alvo: '#f-nome',  nome: 'nome',  vazio: 'Informe seu nome.' },
      { alvo: '#f-email', nome: 'email', vazio: 'Informe seu e-mail.',
        formato: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, malformado: 'E-mail inválido. Use o formato nome@dominio.com' },
      { alvo: '#f-msg',   nome: 'mensagem', vazio: 'Escreva sua mensagem.' }
    ].filter(function (c) {
      c.el = $(c.alvo, form);
      c.idErro = 'erro-' + c.nome;
      return c.el;
    });

    function problema(c) {
      var v = c.el.value.trim();
      if (!v) return c.vazio;
      if (c.formato && !c.formato.test(v)) return c.malformado;
      return '';
    }

    function pinta(c, msg) {
      var container = c.el.closest('.campo') || c.el.parentNode;
      if (container) container.classList.toggle('invalido', !!msg);

      var span = document.getElementById(c.idErro);
      if (msg) {
        if (!span) {
          span = document.createElement('span');
          span.className = 'erro-campo';
          span.id = c.idErro;
          c.el.insertAdjacentElement('afterend', span);
        }
        span.textContent = msg;
        c.el.setAttribute('aria-invalid', 'true');
        c.el.setAttribute('aria-describedby', c.idErro);
      } else {
        if (span && span.parentNode) span.parentNode.removeChild(span);
        c.el.removeAttribute('aria-invalid');
        c.el.removeAttribute('aria-describedby');
      }
    }

    function escondeResumo() {
      if (!resumo) return;
      resumo.hidden = true;
      resumo.textContent = '';
    }

    function rotuloDe(c) {
      var lbl = form.querySelector('label[for="' + c.el.id + '"]');
      return lbl ? lbl.textContent.trim() : c.nome;
    }

    function mostraResumo(falhos) {
      if (!resumo) return;
      resumo.textContent = falhos.length === 1
        ? '1 campo precisa de correção: ' + falhos[0].rotulo + '.'
        : falhos.length + ' campos precisam de correção: ' + falhos.map(function (f) { return f.rotulo; }).join(', ') + '.';
      resumo.hidden = false;
      resumo.focus();
    }

    CAMPOS.forEach(function (c) {
      c.el.addEventListener('input', function () { pinta(c, ''); });
      c.el.addEventListener('blur',  function () { pinta(c, problema(c)); });
    });

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      var falhos = [];
      CAMPOS.forEach(function (c) {
        var msg = problema(c);
        pinta(c, msg);
        if (msg) falhos.push({ msg: msg, rotulo: rotuloDe(c) });
      });

      if (falhos.length) {
        mostraResumo(falhos);
        return diz(falhos.length === 1 ? falhos[0].msg : falhos.length + ' campos precisam de correção.', 'bad');
      }
      escondeResumo();

      var btn = $('button[type="submit"]', form);
      var rotSpan = btn ? $('span', btn) : null;
      var rot = rotSpan ? rotSpan.textContent : '';
      if (btn) {
        btn.disabled = true;
        btn.setAttribute('aria-busy', 'true');
        if (rotSpan) rotSpan.textContent = 'Enviando…';
      }
      diz('Enviando sua mensagem…');

      fetch(form.getAttribute('data-endpoint'), {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          CAMPOS.forEach(function (c) { pinta(c, ''); });
          diz('Mensagem recebida! Respondo em breve.', 'ok');
        })
        .catch(function () {
          diz('Não consegui enviar. Verifique sua conexão ou escreva para allysonfulldev@gmail.com', 'bad');
        })
        .then(function () {
          if (btn) {
            btn.disabled = false;
            btn.removeAttribute('aria-busy');
            if (rotSpan) rotSpan.textContent = rot;
          }
        });
    });
  }

  /* ── 07 · ROLAGEM COM COMPENSAÇÃO DO CABEÇALHO ─────────────────── */

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
      var y = dest.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: Math.max(0, y), behavior: calmo ? 'auto' : 'smooth' });
      if (history.replaceState) history.replaceState(null, '', alvo);
    });
  });

  /* ── 08 · PROJETOS AO VIVO (iframe sob demanda) ────────────────── */

  $$('.proj-play').forEach(function (botao) {
    var caixa = botao.closest('.proj-img');
    if (!caixa) return;

    var url    = caixa.getAttribute('data-vivo');
    var nome   = caixa.getAttribute('data-nome') || 'projeto';
    var rotulo = $('span', botao);

    botao.addEventListener('click', function () {
      if (caixa.classList.contains('ao-vivo')) {
        var f = $('.proj-quadro', caixa);
        var c = $('.proj-carregando', caixa);
        if (f) f.remove();
        if (c) c.remove();
        caixa.classList.remove('ao-vivo');
        rotulo.textContent = 'Ver ao vivo';
        return;
      }

      var aviso = document.createElement('div');
      aviso.className = 'proj-carregando';
      aviso.textContent = 'Abrindo ' + nome + '…';

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
      rotulo.textContent = 'Fechar';
    });
  });

})();
