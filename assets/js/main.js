/* ═══════════════════════════════════════════════════════════════════
   ALLYSON VINÍCIUS — Portfólio v3
   JavaScript vanilla. Sem bibliotecas, sem etapa de build.
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Traduções vêm do i18n.js; sem ele, cai no texto da chave. */
  var t = function (chave, vars) { return window.I18N ? window.I18N.t(chave, vars) : chave; };
  var aoTrocarIdioma = function (fn) { document.addEventListener('idioma', fn); };

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
      toggle.setAttribute('aria-label', pausado ? t('video.tocar') : t('video.pausar'));
    };

    video.addEventListener('play',  pintaToggle);
    video.addEventListener('pause', pintaToggle);
    aoTrocarIdioma(pintaToggle);
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

  var topo = $('#topo');
  var raiz = document.documentElement;

  function aoRolar() {
    var y = window.scrollY || window.pageYOffset;
    if (topo) topo.classList.toggle('rolou', y > 12);
    // --p alimenta a linha de progresso do trilho lateral e da barra do celular
    var max = raiz.scrollHeight - window.innerHeight;
    raiz.style.setProperty('--p', max > 0 ? Math.min(1, y / max) : 0);
  }

  var agendado = false;
  window.addEventListener('scroll', function () {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(function () { aoRolar(); agendado = false; });
  }, { passive: true });
  aoRolar();

  /* Relógio de Recife no cabeçalho (UTC−3, sem horário de verão). */
  var relogio = $('#relogio');
  if (relogio) {
    var fmt = null;
    try {
      fmt = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Recife' });
    } catch (e) { /* navegador sem suporte a fuso: some com o relógio */ }
    var bate = function () { relogio.textContent = fmt.format(new Date()); };
    if (fmt) { bate(); window.setInterval(bate, 15000); }
    else if (relogio.parentNode) relogio.parentNode.hidden = true;
  }

  /* ── 02b · NAVEGAÇÃO LATERAL ───────────────────────────────────── */
  /* Abre ao passar o mouse ou focar pelo teclado; o botão "fixar" deixa
     aberta e empurra o conteúdo (a escolha fica salva no navegador). */

  var lateral   = $('#lateral');
  var fixar     = $('#lateral-fixar');
  var indicador = $('#lateral-ind');
  var CHAVE_FIXA = 'portfolio-lateral-fixa';
  var fixa = false;

  try { fixa = localStorage.getItem(CHAVE_FIXA) === '1'; } catch (e) { /* sem storage: começa recolhida */ }

  function pintaLateral(aberta) {
    if (!lateral) return;
    lateral.classList.toggle('aberta', aberta || fixa);
    document.body.classList.toggle('lateral-fixa', fixa);
    if (fixar) {
      fixar.setAttribute('aria-pressed', String(fixa));
      fixar.setAttribute('aria-label', fixa ? t('lat.recolher') : t('lat.fixar.a11y'));
      var rot = $('.lateral-txt', fixar);
      if (rot) rot.textContent = fixa ? t('lat.recolher') : t('lat.fixar');
    }
  }

  function moveIndicador() {
    if (!indicador) return;
    var ativo = $('.lateral-nav a.ativo');
    if (!ativo) { indicador.classList.remove('visivel'); return; }
    indicador.style.setProperty('--y', ativo.offsetTop + 'px');
    indicador.classList.add('visivel');
  }

  if (lateral) {
    var podeHover = window.matchMedia('(hover: hover)').matches;
    if (podeHover) {
      lateral.addEventListener('mouseenter', function () { pintaLateral(true); });
      lateral.addEventListener('mouseleave', function () {
        if (!lateral.contains(document.activeElement)) pintaLateral(false);
      });
    }
    lateral.addEventListener('focusin',  function () { pintaLateral(true); });
    lateral.addEventListener('focusout', function (e) {
      if (!lateral.contains(e.relatedTarget) && !(podeHover && lateral.matches(':hover'))) pintaLateral(false);
    });
    // depois de clicar num link, recolhe (a não ser que esteja fixa)
    $$('a', lateral).forEach(function (a) {
      a.addEventListener('click', function () {
        a.blur();
        if (!podeHover || !lateral.matches(':hover')) pintaLateral(false);
      });
    });
    if (fixar) {
      fixar.addEventListener('click', function () {
        fixa = !fixa;
        try { localStorage.setItem(CHAVE_FIXA, fixa ? '1' : '0'); } catch (e) { /* ignora */ }
        pintaLateral(true);
      });
    }
    pintaLateral(false);
    aoTrocarIdioma(function () { pintaLateral(lateral.classList.contains('aberta')); });
  }

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
      burger.setAttribute('aria-label', t('menu.abrir'));
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
      burger.setAttribute('aria-label', t('menu.fechar'));
      document.body.style.overflow = 'hidden';
      var primeiro = $('nav a', menu);
      if (primeiro) primeiro.focus();
    });

    aoTrocarIdioma(function () {
      burger.setAttribute('aria-label', menu.classList.contains('aberto') ? t('menu.fechar') : t('menu.abrir'));
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
  var elos   = $$('.lateral-nav a, .menu-movel nav a');

  var guia      = $('#guia');
  var guiaBalao = $('#guia-balao');
  var guiaFala  = $('#guia-fala');
  var guiaVideo = $('#guia-video');
  var guiaCorpo = $('#guia-corpo');

  /* Falas do guia: textos em i18n.js (chaves fala.<seção>); os números
     de projetos e certificados são contados na própria página. */
  var SECOES_COM_FALA = ['inicio', 'sobre', 'stack', 'projetos', 'experiencia', 'certificados', 'contato'];
  var fala = function (id) {
    return t('fala.' + id, { n: id === 'projetos' ? $$('.proj').length : $$('#certs li').length });
  };
  var falaAtual = 'inicio';
  if (guiaFala) guiaFala.innerHTML = fala('inicio');
  aoTrocarIdioma(function () { if (guiaFala) guiaFala.innerHTML = fala(falaAtual); });

  function guiaDiz(id) {
    if (!guiaFala || SECOES_COM_FALA.indexOf(id) < 0 || id === falaAtual) return;
    falaAtual = id;
    if (calmo) { guiaFala.innerHTML = fala(id); return; }
    guiaBalao.classList.add('troca');
    window.setTimeout(function () {
      guiaFala.innerHTML = fala(id);
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
        moveIndicador();
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
      { alvo: '#f-nome',  nome: 'nome',  vazio: 'form.vazio.nome' },
      { alvo: '#f-email', nome: 'email', vazio: 'form.vazio.email',
        formato: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, malformado: 'form.email.invalido' },
      { alvo: '#f-msg',   nome: 'mensagem', vazio: 'form.vazio.msg' }
    ].filter(function (c) {
      c.el = $(c.alvo, form);
      c.idErro = 'erro-' + c.nome;
      return c.el;
    });

    function problema(c) {
      var v = c.el.value.trim();
      if (!v) return t(c.vazio);
      if (c.formato && !c.formato.test(v)) return t(c.malformado);
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
        ? t('form.um', { campo: falhos[0].rotulo })
        : t('form.varios', { n: falhos.length, campos: falhos.map(function (f) { return f.rotulo; }).join(', ') });
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
        return diz(falhos.length === 1 ? falhos[0].msg : t('form.varios.curto', { n: falhos.length }), 'bad');
      }
      escondeResumo();

      var btn = $('button[type="submit"]', form);
      var rotSpan = btn ? $('span', btn) : null;
      var rot = rotSpan ? rotSpan.textContent : '';
      if (btn) {
        btn.disabled = true;
        btn.setAttribute('aria-busy', 'true');
        if (rotSpan) rotSpan.textContent = t('form.enviando');
      }
      diz(t('form.enviando.msg'));

      fetch(form.getAttribute('data-endpoint'), {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          CAMPOS.forEach(function (c) { pinta(c, ''); });
          diz(t('form.ok'), 'ok');
        })
        .catch(function () {
          diz(t('form.erro'), 'bad');
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

  /* ── 06b · CERTIFICADOS (filtro + mostrar mais) ────────────────── */
  /* Sem JS a lista aparece inteira; com JS mostra só os primeiros e
     calcula sozinho os totais do título e de cada filtro. */

  var listaCerts = $('#certs');
  if (listaCerts) {
    var certs     = $$('li', listaCerts);
    var filtroBox = $('#certs-filtro');
    var botaoMais = $('#certs-mais');
    var LIMITE    = 6;
    var catAtual  = 'todos';
    var expandido = false;

    var totalHoras = certs.reduce(function (s, li) {
      return s + (parseFloat(li.getAttribute('data-h')) || 0);
    }, 0);
    var qtdEl   = $('#certs-qtd');
    var horasEl = $('#certs-horas');
    var pintaTotais = function () {
      if (qtdEl)   qtdEl.textContent   = certs.length;
      if (horasEl) horasEl.textContent = totalHoras.toLocaleString(window.I18N ? window.I18N.tag() : 'pt-BR');
    };
    pintaTotais();

    var daCategoria = function (cat) {
      return certs.filter(function (li) { return cat === 'todos' || li.getAttribute('data-cat') === cat; });
    };

    var pintaCerts = function () {
      var visiveis = daCategoria(catAtual);
      certs.forEach(function (li) { li.classList.add('fora'); });
      visiveis.forEach(function (li, k) {
        if (expandido || k < LIMITE) li.classList.remove('fora');
      });
      if (!botaoMais) return;
      var resto = visiveis.length - LIMITE;
      botaoMais.hidden = resto <= 0;
      botaoMais.setAttribute('aria-expanded', String(expandido));
      $('span', botaoMais).textContent = expandido ? t('certs.menos') : t('certs.mais', { n: resto });
    };

    if (filtroBox) {
      $$('button', filtroBox).forEach(function (b) {
        var n = daCategoria(b.getAttribute('data-f')).length;
        var i = $('i', b);
        if (i) i.textContent = n;
        if (!n) b.hidden = true;

        b.addEventListener('click', function () {
          catAtual  = b.getAttribute('data-f');
          expandido = false;
          $$('button', filtroBox).forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
          pintaCerts();
        });
      });
      filtroBox.hidden = false;
    }

    if (botaoMais) {
      botaoMais.addEventListener('click', function () {
        expandido = !expandido;
        pintaCerts();
        // ao recolher, não deixa o visitante "cair" lá embaixo da página
        if (!expandido) {
          var topoLista = listaCerts.getBoundingClientRect().top;
          if (topoLista < 0) window.scrollBy(0, topoLista - 140);
        }
      });
    }

    pintaCerts();
    aoTrocarIdioma(function () { pintaTotais(); pintaCerts(); });
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
      // no desktop não há barra no topo; no celular desconta a barra fixa
      var folga = topo && topo.offsetHeight ? topo.offsetHeight + 12 : 24;
      var y = dest.getBoundingClientRect().top + window.scrollY - folga;
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
    var pintaRotulo = function () {
      rotulo.textContent = caixa.classList.contains('ao-vivo') ? t('proj.fechar') : t('proj.vivo');
    };
    pintaRotulo();
    aoTrocarIdioma(pintaRotulo);

    botao.addEventListener('click', function () {
      if (caixa.classList.contains('ao-vivo')) {
        var f = $('.proj-quadro', caixa);
        var c = $('.proj-carregando', caixa);
        if (f) f.remove();
        if (c) c.remove();
        caixa.classList.remove('ao-vivo');
        pintaRotulo();
        return;
      }

      var aviso = document.createElement('div');
      aviso.className = 'proj-carregando';
      aviso.textContent = t('proj.abrindo', { nome: nome });

      var frame = document.createElement('iframe');
      frame.className = 'proj-quadro';
      frame.title = t('proj.iframe', { nome: nome });
      frame.loading = 'lazy';
      frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox');
      frame.setAttribute('referrerpolicy', 'no-referrer');
      frame.addEventListener('load', function () { aviso.classList.add('sumiu'); });
      frame.src = url;

      caixa.appendChild(aviso);
      caixa.appendChild(frame);
      caixa.classList.add('ao-vivo');
      pintaRotulo();
    });
  });

})();
