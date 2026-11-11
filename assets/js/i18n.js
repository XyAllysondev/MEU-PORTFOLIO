/* ═══════════════════════════════════════════════════════════════════
   ALLYSON VINÍCIUS — Portfólio · traduções (PT · ES · EN)

   Como funciona
   - O português está escrito direto no HTML. Cada texto traduzível tem
     data-i18n="chave" (conteúdo) ou data-i18n-attr="atributo:chave"
     (aria-label, alt, placeholder, title…).
   - Este arquivo guarda só o espanhol e o inglês dessas chaves, mais os
     textos que o main.js monta na hora (falas do guia, formulário…).
   - Idioma escolhido: o que o visitante clicou (fica salvo) → o idioma do
     navegador → inglês para qualquer outro idioma. Português é o padrão.

   Para mudar um texto: edite o HTML (português) e a mesma chave em ES/EN.
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var IDIOMAS = ['pt', 'es', 'en'];
  var TAG_HTML = { pt: 'pt-BR', es: 'es', en: 'en' };
  var CHAVE_SALVA = 'portfolio-idioma';

  /* ── textos montados pelo JavaScript (os três idiomas) ───────────── */

  var JS = {
    pt: {
      
      'video.pausar': 'Pausar vídeo', 'video.tocar': 'Reproduzir vídeo',
      'menu.abrir': 'Abrir menu', 'menu.fechar': 'Fechar menu',
      'lat.fixar': 'Fixar menu', 'lat.fixar.a11y': 'Manter menu aberto', 'lat.recolher': 'Recolher menu',
      'proj.vivo': 'Ver ao vivo', 'proj.fechar': 'Fechar', 'proj.abrindo': 'Abrindo {nome}…', 'proj.iframe': '{nome} rodando ao vivo',
      'certs.mais': 'Mostrar mais {n}', 'certs.menos': 'Mostrar menos',
      'form.vazio.nome': 'Informe seu nome.', 'form.vazio.email': 'Informe seu e-mail.',
      'form.email.invalido': 'E-mail inválido. Use o formato nome@dominio.com', 'form.vazio.msg': 'Escreva sua mensagem.',
      'form.um': '1 campo precisa de correção: {campo}.', 'form.varios': '{n} campos precisam de correção: {campos}.',
      'form.varios.curto': '{n} campos precisam de correção.', 'form.enviando': 'Enviando…',
      'form.enviando.msg': 'Enviando sua mensagem…', 'form.ok': 'Mensagem recebida! Respondo em breve.',
      'form.erro': 'Não consegui enviar. Verifique sua conexão ou escreva para allysonfulldev@gmail.com',
      'fala.inicio': 'Oi! Eu sou o <b>Allyson</b>. Rola a página que eu te acompanho.',
      'fala.sobre': 'Aqui é a minha história: comecei consertando o que quebrava.',
      'fala.stack': 'Essas são as ferramentas que eu uso <b>todo dia</b>.',
      'fala.projetos': 'Clica em <b>Ver ao vivo</b> — os {n} projetos rodam de verdade aqui dentro.',
      
      'fala.certificados': '<b>{n} cursos</b> concluídos. Filtra por área ou abre o PDF.',
      'fala.contato': 'Curtiu? Me manda uma mensagem — respondo <b>em horas</b>.',

      /* currículo full-stack */
      'meta.title': 'Allyson Vinícius — Desenvolvedor Full-Stack',
      'meta.desc': 'Allyson Vinícius — desenvolvedor full-stack web e estudante de Engenharia da Computação em Recife. React, PHP, APIs, automação com n8n e IA generativa.',
      'fala.experiencia': 'Por onde já passei: Alternativa, ACBV e a faculdade de <b>Engenharia</b>.'
    },
    es: {
      
      'video.pausar': 'Pausar video', 'video.tocar': 'Reproducir video',
      'menu.abrir': 'Abrir menú', 'menu.fechar': 'Cerrar menú',
      'lat.fixar': 'Fijar menú', 'lat.fixar.a11y': 'Mantener el menú abierto', 'lat.recolher': 'Contraer menú',
      'proj.vivo': 'Ver en vivo', 'proj.fechar': 'Cerrar', 'proj.abrindo': 'Abriendo {nome}…', 'proj.iframe': '{nome} en vivo',
      'certs.mais': 'Mostrar {n} más', 'certs.menos': 'Mostrar menos',
      'form.vazio.nome': 'Escribe tu nombre.', 'form.vazio.email': 'Escribe tu correo.',
      'form.email.invalido': 'Correo no válido. Usa el formato nombre@dominio.com', 'form.vazio.msg': 'Escribe tu mensaje.',
      'form.um': '1 campo necesita corrección: {campo}.', 'form.varios': '{n} campos necesitan corrección: {campos}.',
      'form.varios.curto': '{n} campos necesitan corrección.', 'form.enviando': 'Enviando…',
      'form.enviando.msg': 'Enviando tu mensaje…', 'form.ok': '¡Mensaje recibido! Te respondo pronto.',
      'form.erro': 'No pude enviarlo. Revisa tu conexión o escribe a allysonfulldev@gmail.com',
      'fala.inicio': '¡Hola! Soy <b>Allyson</b>. Desplázate y te acompaño.',
      'fala.sobre': 'Esta es mi historia: empecé arreglando lo que se rompía.',
      'fala.stack': 'Estas son las herramientas que uso <b>todos los días</b>.',
      'fala.projetos': 'Haz clic en <b>Ver en vivo</b> — los {n} proyectos funcionan de verdad aquí dentro.',
      
      'fala.certificados': '<b>{n} cursos</b> completados. Filtra por área o abre el PDF.',
      'fala.contato': '¿Te gustó? Mándame un mensaje — respondo <b>en horas</b>.',

      /* currículo full-stack */
      'meta.title': 'Allyson Vinícius — Desarrollador Full-Stack',
      'meta.desc': 'Allyson Vinícius — desarrollador full-stack web y estudiante de Ingeniería en Computación en Recife, Brasil. React, PHP, APIs, automatización con n8n e IA generativa.',
      'fala.experiencia': 'Dónde he estado: Alternativa, ACBV y la carrera de <b>Ingeniería</b>.'
    },
    en: {
      
      'video.pausar': 'Pause video', 'video.tocar': 'Play video',
      'menu.abrir': 'Open menu', 'menu.fechar': 'Close menu',
      'lat.fixar': 'Pin menu', 'lat.fixar.a11y': 'Keep menu open', 'lat.recolher': 'Collapse menu',
      'proj.vivo': 'See it live', 'proj.fechar': 'Close', 'proj.abrindo': 'Opening {nome}…', 'proj.iframe': '{nome} running live',
      'certs.mais': 'Show {n} more', 'certs.menos': 'Show less',
      'form.vazio.nome': 'Please enter your name.', 'form.vazio.email': 'Please enter your email.',
      'form.email.invalido': 'Invalid email. Use the format name@domain.com', 'form.vazio.msg': 'Please write your message.',
      'form.um': '1 field needs fixing: {campo}.', 'form.varios': '{n} fields need fixing: {campos}.',
      'form.varios.curto': '{n} fields need fixing.', 'form.enviando': 'Sending…',
      'form.enviando.msg': 'Sending your message…', 'form.ok': 'Message received! I’ll get back to you soon.',
      'form.erro': 'Couldn’t send it. Check your connection or write to allysonfulldev@gmail.com',
      'fala.inicio': 'Hi! I’m <b>Allyson</b>. Scroll down and I’ll tag along.',
      'fala.sobre': 'Here’s my story: I started out fixing whatever broke.',
      'fala.stack': 'These are the tools I use <b>every day</b>.',
      'fala.projetos': 'Click <b>See it live</b> — all {n} projects actually run right here.',
      
      'fala.certificados': '<b>{n} courses</b> completed. Filter by area or open the PDF.',
      'fala.contato': 'Like what you see? Send me a message — I reply <b>within hours</b>.',

      /* currículo full-stack */
      'meta.title': 'Allyson Vinícius — Full-Stack Developer',
      'meta.desc': 'Allyson Vinícius — full-stack web developer and Computer Engineering student in Recife, Brazil. React, PHP, APIs, n8n automation and generative AI.',
      'fala.experiencia': 'Where I’ve been: Alternativa, ACBV and my <b>Engineering</b> degree.'
    }
  };

  /* ── textos da página (só ES e EN; o PT vem do HTML) ─────────────── */

  var PAGINA = {
    es: {
      'pular': 'Saltar al contenido',
      
      'nav.inicio': 'Inicio', 'nav.sobre': 'Sobre mí', 'nav.stack': 'Stack', 'nav.projetos': 'Proyectos',
      'nav.experiencia': 'Experiencia', 'nav.certificados': 'Certificados', 'nav.contato': 'Contacto',
      'lat.contato': 'Hablemos', 'idioma.rotulo': 'Idioma',
      'a11y.navprincipal': 'Navegación principal', 'a11y.voltarinicio': 'Allyson Vinícius — volver al inicio',
      'a11y.secoes': 'Secciones', 'a11y.relogio': 'Hora en Recife', 'a11y.inicio': 'Allyson Vinícius — inicio',
      'a11y.filtro': 'Filtrar certificados por área', 'a11y.redes': 'Redes', 'a11y.guia': 'Guía del sitio',
      'a11y.topo': 'Volver arriba', 'a11y.idioma': 'Elegir idioma',
      'a11y.video': 'Animación 3D de Allyson en la oficina con el portátil en la mano',

      'hero.status': 'Disponible para freelance y empleo · Recife, Brasil',
      'hero.h1': 'Interfaces hechas <em>a&nbsp;mano.</em><br />Sistemas que se mantienen <em>en&nbsp;pie.</em>',
      
      'hero.ver': 'Ver proyectos', 'hero.falar': 'Hablemos',
      'hero.exp': 'experiencia', 'hero.anos': 'años', 'hero.proj': 'proyectos', 'hero.certs': 'certificados',
      'hero.fig': 'fig. 01 — la oficina', 

      'sobre.h2': 'Pensar en el sistema <em>antes</em> de pensar en el código.',
      'sobre.alt': 'Foto de perfil de Allyson Vinícius con un anillo de luz azul al fondo',
      'sobre.p1': 'Empecé arreglando lo que se rompía — computadoras colgadas, redes caídas, sistemas fuera de línea. Resolver eso me enseñó a entender el todo antes de tocar las partes.',
      
      'pr.1t': 'Confiable', 'pr.1d': 'Sistemas que siguen funcionando después de que salgo de la sala.',
      'pr.2t': 'Ligero', 'pr.2d': 'Sin build, sin dependencias inútiles. Página ligera, respuesta rápida.',
      'pr.3t': 'Cercano', 'pr.3d': 'Respondo en horas, no en días. Hablar conmigo es fácil.',

      'stack.h2': 'Herramientas que uso <em>de verdad.</em>',
      'stack.sub': 'Sin porcentajes inventados: lo que uso todos los días, lo que uso con frecuencia y lo que estoy profundizando.',
      
      'nv.3': 'diario', 'nv.2': 'frecuente', 'nv.1': 'profundizando',
      'sk.suporte': 'Soporte de TI', 
      'd.html': 'semántica · accesibilidad · SEO', 
      'd.react': 'componentes · estado · hooks',
      'd.ts': 'tipado · contratos · refactorización', 'd.tw': 'utilidades · design system',
      
      'd.git': 'control de versiones · deploy', 'd.py': 'automatización · scripts · OpenCV',
      'd.fb': 'base de datos · auth · hosting', 'd.sql': 'consultas · modelado', 

      'proj.h2': 'Cosas que están <em>en línea.</em>',
      'proj.sub': 'Todos funcionan de verdad. Pulsa <b>ver en vivo</b> y el proyecto se abre dentro del marco.',
      'status.noar': 'en línea', 'status.prod': 'en producción', 'status.ativo': 'activo', 'btn.codigo': 'Código',
      'p1.meta': 'Gestión de mantenimiento · 2026', 'p1.h3': 'Capricche Mantenimiento',
      'p1.desc': 'Gestión del mantenimiento de máquinas de Capricche: registra cada parada, mide <strong>MTTR, MTBF y disponibilidad</strong> y compara el tiempo de atención entre turnos. Funciona directamente en el navegador o sincronizado en la nube con Supabase.',
      'p1.alt': 'Panel de mantenimiento de máquinas de Capricche con disponibilidad, MTTR y MTBF', 'p1.abrir': 'Abrir sistema',
      'p2.meta': 'Sistema de gestión · 2026',
      'p2.desc': 'Gestión de servicios, equipos y resultados. Panel con indicadores en tiempo real, mapas con capa de calor, exportación a Excel y PDF, código QR y persistencia local en IndexedDB — todo en JavaScript puro.',
      'p2.alt': 'Pantalla de inicio de sesión del sistema ALTERNATIVA', 'p2.acessar': 'Acceder',
      'p3.meta': 'App de rol · 2026',
      'p3.desc': 'Mesa virtual multisistema — Ordem Paranormal, D&amp;D 5E y Tormenta 20: fichas en línea, campañas con invitación, tiradas compartidas, mesa táctica con niebla de guerra y asistente del máster. React instalable (PWA), dominio propio, Firebase.',
      'p3.alt': 'Página de inicio de Nexus RPG', 'p3.abrir': 'Abrir mesa',
      'p4.meta': 'Juego web · 2026',
      'p4.desc': 'Arma un equipo con 1.045 personajes de anime y aplica el 7 a 0: modo historia, desafío del día, torneo de 7 rondas, duelo en línea 1v1 y 2v2 y álbum de cromos. JavaScript puro, sincronizado con Firebase.',
      'p4.alt': 'Pantalla de inicio del juego 7 a 0 — Anime Version', 'p4.jogar': 'Jugar',

      'exp.h2': 'Dónde he <em>estado.</em>', 
      
      
      

      'certs.cursos': 'cursos', 'certs.horas': 'horas.', 'certs.sub': 'Cada elemento abre el PDF del certificado.',
      'f.todos': 'Todos', 'f.dev': 'Programación', 'f.gestao': 'Gestión y carrera',
      'c.logica': 'Formación en Lógica de Programación', 'c.espro': 'Gestión, Calidad, Atención y Servicios',
      'c.excel': 'Microsoft Excel 2016 — Avanzado', 'c.word': 'Microsoft Word 2016 — Avanzado',
      'c.ppt': 'Microsoft PowerPoint 2016 — Avanzado', 'c.inclus': 'Inclusividad',

      'contato.h2': '¿Construimos <em>algo juntos?</em>',
      'contato.sub': 'Proyecto, empleo, freelance o solo una idea. Mándame un mensaje — respondo en horas.',
      'form.cab': 'Nuevo mensaje', 'form.nome': 'Nombre', 'form.email': 'Correo', 'form.assunto': 'Asunto',
      'form.msg': 'Mensaje', 'form.enviar': 'Enviar mensaje',
      'ph.nome': 'Tu nombre', 'ph.email': 'tu@dominio.com', 'ph.assunto': 'Propuesta de proyecto', 'ph.msg': 'Cuéntame qué necesitas…',

      'rodape.p': 'HTML, CSS y JavaScript escritos a mano, sin dependencias.<br />Recife, Brasil · © 2026 Allyson Vinícius',
      'rodape.topo': 'Arriba ↑',

      /* currículo full-stack */
      'marca.sub': 'full-stack · web',
      'hero.lede': 'Soy <strong>Allyson</strong> — desarrollador <strong>full-stack web</strong> y estudiante de Ingeniería en Computación. Construyo de React a PHP, automatizo procesos con n8n y uso IA generativa para entregar más rápido — con la mirada de quien ya sostuvo el soporte de TI.',
      'sobre.p2': 'Hoy trabajo como <strong>desarrollador full-stack</strong>: React, JavaScript y CSS en el front, PHP, APIs y bases de datos en el back, y <strong>automatizaciones con n8n</strong> que conectan sistemas que antes dependían de trabajo manual. Mi paso por el soporte de TI me dio una visión práctica de infraestructura, usuarios y operación.',
      'sobre.p3': 'Uso IA generativa — Claude, Gemini, ChatGPT y Codex — para generar, revisar y documentar código más rápido, sin renunciar a entender lo que va a producción. Si está en pantalla, sé explicar por qué.',
      'stack.a': 'Front-end',
      'stack.b': 'Back-end y datos',
      'stack.c': 'Automatización, IA e infra',
      'd.css': 'grid · flexbox · responsivo',
      'd.js': 'DOM · asíncrono · Canvas',
      'd.php': 'back-end · reglas de negocio',
      'd.apis': 'REST · bases de datos · servicios internos',
      'd.c': 'lógica · estructuras de datos',
      'd.ia': 'Claude · Gemini · ChatGPT · Codex',
      'd.n8n': 'flujos · integraciones · rutinas',
      'd.sup': 'hardware · redes · usuarios',
      'd.ageis': 'entregas cortas · mejora continua',
      'sk.apis': 'APIs e integraciones',
      'sk.ia': 'IA generativa',
      'sk.ageis': 'Metodologías ágiles',
      'exp.alt': 'jul 2026 — hoy',
      'exp.acbv': 'feb 2025 — jun 2026',
      'exp.hoje': '2025 — hoy',
      'e1.h3': 'Desarrollador Full-Stack',
      'e1.p': 'Aplicaciones web full-stack con React, JavaScript, HTML5 y CSS3 en el front y PHP en el back. Integración de sistemas y APIs con bases de datos, automatización de rutinas internas, IA generativa en el día a día y mejora continua de los sistemas en producción.',
      'e2.h3': 'Soporte de TI',
      'e2.p': 'Soporte a sistemas académicos (ActiveSoft, Lize, ClickUp y SchoolGuardian), mantenimiento de computadoras, impresoras y periféricos, apoyo a los usuarios y automatizaciones con Python y SQL para optimizar procesos internos de TI.',
      'e3.h3': 'Proyectos propios y freelance',
      'e3.onde': 'Sistemas y juegos web publicados',
      'e3.p': 'De la base de datos a la interfaz: Capricche Mantenimiento, Nexus RPG y 7 a 0 están en línea y los mantengo yo.',
      'e4.h3': 'Licenciatura en Ingeniería en Computación',
      'e4.p': 'Algoritmos, estructuras de datos, sistemas operativos, redes, bases de datos e ingeniería de software.'
    },

    en: {
      'pular': 'Skip to content',
      
      'nav.inicio': 'Home', 'nav.sobre': 'About', 'nav.stack': 'Stack', 'nav.projetos': 'Projects',
      'nav.experiencia': 'Experience', 'nav.certificados': 'Certificates', 'nav.contato': 'Contact',
      'lat.contato': 'Let’s talk', 'idioma.rotulo': 'Language',
      'a11y.navprincipal': 'Main navigation', 'a11y.voltarinicio': 'Allyson Vinícius — back to top',
      'a11y.secoes': 'Sections', 'a11y.relogio': 'Local time in Recife', 'a11y.inicio': 'Allyson Vinícius — home',
      'a11y.filtro': 'Filter certificates by area', 'a11y.redes': 'Social links', 'a11y.guia': 'Site guide',
      'a11y.topo': 'Back to top', 'a11y.idioma': 'Choose language',
      'a11y.video': '3D animation of Allyson in the office holding a laptop',

      'hero.status': 'Open to freelance work and jobs · Recife, Brazil',
      'hero.h1': 'Interfaces built <em>by&nbsp;hand.</em><br />Systems that stay <em>up.</em>',
      
      'hero.ver': 'See projects', 'hero.falar': 'Get in touch',
      'hero.exp': 'experience', 'hero.anos': 'years', 'hero.proj': 'projects', 'hero.certs': 'certificates',
      'hero.fig': 'fig. 01 — the office', 

      'sobre.h2': 'Think about the system <em>before</em> the code.',
      'sobre.alt': 'Profile photo of Allyson Vinícius with a blue ring of light in the background',
      'sobre.p1': 'I started out fixing whatever broke — frozen computers, dropped networks, systems gone offline. Solving that taught me to understand the whole before touching the parts.',
      
      'pr.1t': 'Reliable', 'pr.1d': 'Systems that keep running after I leave the room.',
      'pr.2t': 'Lightweight', 'pr.2d': 'No build step, no useless dependencies. Light page, fast response.',
      'pr.3t': 'Available', 'pr.3d': 'I reply in hours, not days. Reaching me is easy.',

      'stack.h2': 'Tools I <em>actually</em> use.',
      'stack.sub': 'No made-up percentages: what I use every day, what I use often and what I’m digging deeper into.',
      
      'nv.3': 'daily', 'nv.2': 'often', 'nv.1': 'learning',
      'sk.suporte': 'IT support', 
      'd.html': 'semantics · accessibility · SEO', 
      'd.react': 'components · state · hooks',
      'd.ts': 'typing · contracts · refactoring', 'd.tw': 'utilities · design system',
      
      'd.git': 'version control · deploy', 'd.py': 'automation · scripts · OpenCV',
      'd.fb': 'database · auth · hosting', 'd.sql': 'queries · modeling', 

      'proj.h2': 'Things that are <em>live.</em>',
      'proj.sub': 'They all actually run. Hit <b>see it live</b> and the project opens inside the frame.',
      'status.noar': 'live', 'status.prod': 'in production', 'status.ativo': 'active', 'btn.codigo': 'Code',
      'p1.meta': 'Maintenance management · 2026', 'p1.h3': 'Capricche Maintenance',
      'p1.desc': 'Machine maintenance management for Capricche: logs every stoppage, measures <strong>MTTR, MTBF and availability</strong> and compares response times across shifts. Runs right in the browser or synced to the cloud with Supabase.',
      'p1.alt': 'Capricche machine maintenance dashboard with availability, MTTR and MTBF', 'p1.abrir': 'Open app',
      'p2.meta': 'Management system · 2026',
      'p2.desc': 'Service, team and results management. Dashboard with real-time KPIs, heat-map layers, Excel and PDF export, QR codes and local persistence in IndexedDB — all in plain JavaScript.',
      'p2.alt': 'ALTERNATIVA login screen', 'p2.acessar': 'Open app',
      'p3.meta': 'RPG app · 2026',
      'p3.desc': 'Multi-system virtual tabletop — Ordem Paranormal, D&amp;D 5E and Tormenta 20: online character sheets, invite-based campaigns, shared rolls, a tactical map with fog of war and a game-master assistant. Installable React app (PWA), custom domain, Firebase.',
      'p3.alt': 'Nexus RPG home page', 'p3.abrir': 'Open tabletop',
      'p4.meta': 'Web game · 2026',
      'p4.desc': 'Build a team from 1,045 anime characters and pull off the 7–0: story mode, daily challenge, 7-round tournament, 1v1 and 2v2 online duels and a sticker album. Plain JavaScript, synced with Firebase.',
      'p4.alt': 'Home screen of the game 7 a 0 — Anime Version', 'p4.jogar': 'Play',

      'exp.h2': 'Where I’ve <em>been.</em>', 
      
      
      

      'certs.cursos': 'courses', 'certs.horas': 'hours.', 'certs.sub': 'Each item opens the certificate PDF.',
      'f.todos': 'All', 'f.dev': 'Programming', 'f.gestao': 'Management &amp; career',
      'c.logica': 'Programming Logic Track', 'c.espro': 'Management, Quality, Customer Service and Services',
      'c.excel': 'Microsoft Excel 2016 — Advanced', 'c.word': 'Microsoft Word 2016 — Advanced',
      'c.ppt': 'Microsoft PowerPoint 2016 — Advanced', 'c.inclus': 'Inclusiveness',

      'contato.h2': 'Shall we build <em>something together?</em>',
      'contato.sub': 'A project, a job, freelance work or just an idea. Send me a message — I reply within hours.',
      'form.cab': 'New message', 'form.nome': 'Name', 'form.email': 'Email', 'form.assunto': 'Subject',
      'form.msg': 'Message', 'form.enviar': 'Send message',
      'ph.nome': 'Your name', 'ph.email': 'you@domain.com', 'ph.assunto': 'Project proposal', 'ph.msg': 'Tell me what you need…',

      'rodape.p': 'Hand-written HTML, CSS and JavaScript, no dependencies.<br />Recife, Brazil · © 2026 Allyson Vinícius',
      'rodape.topo': 'Top ↑',

      /* currículo full-stack */
      'marca.sub': 'full-stack · web',
      'hero.lede': 'I’m <strong>Allyson</strong> — a <strong>full-stack web developer</strong> and Computer Engineering student. I build from React to PHP, automate processes with n8n and use generative AI to ship faster — with the perspective of someone who has run IT support.',
      'sobre.p2': 'Today I work as a <strong>full-stack developer</strong>: React, JavaScript and CSS on the front end, PHP, APIs and databases on the back end, and <strong>n8n automations</strong> connecting systems that used to depend on manual work. My time in IT support gave me a practical view of infrastructure, users and operations.',
      'sobre.p3': 'I use generative AI — Claude, Gemini, ChatGPT and Codex — to write, review and document code faster, without giving up on understanding what goes to production. If it’s on the screen, I can explain why.',
      'stack.a': 'Front-end',
      'stack.b': 'Back-end &amp; data',
      'stack.c': 'Automation, AI &amp; infra',
      'd.css': 'grid · flexbox · responsive',
      'd.js': 'DOM · async · Canvas',
      'd.php': 'back end · business rules',
      'd.apis': 'REST · databases · internal services',
      'd.c': 'logic · data structures',
      'd.ia': 'Claude · Gemini · ChatGPT · Codex',
      'd.n8n': 'workflows · integrations · routines',
      'd.sup': 'hardware · networks · users',
      'd.ageis': 'short deliveries · continuous improvement',
      'sk.apis': 'APIs &amp; integrations',
      'sk.ia': 'Generative AI',
      'sk.ageis': 'Agile methods',
      'exp.alt': 'Jul 2026 — present',
      'exp.acbv': 'Feb 2025 — Jun 2026',
      'exp.hoje': '2025 — present',
      'e1.h3': 'Full-Stack Developer',
      'e1.p': 'Full-stack web applications with React, JavaScript, HTML5 and CSS3 on the front end and PHP on the back end. System and API integration with databases, automation of internal routines, everyday use of generative AI and continuous improvement of production systems.',
      'e2.h3': 'IT Support',
      'e2.p': 'Support for academic systems (ActiveSoft, Lize, ClickUp and SchoolGuardian), maintenance of computers, printers and peripherals, user support and Python and SQL automations to streamline internal IT processes.',
      'e3.h3': 'Personal projects &amp; freelance',
      'e3.onde': 'Published web systems and games',
      'e3.p': 'From database to interface: Capricche Maintenance, Nexus RPG and 7 a 0 are live and maintained by me.',
      'e4.h3': 'Bachelor’s in Computer Engineering',
      'e4.p': 'Algorithms, data structures, operating systems, networks, databases and software engineering.'
    }
  };

  /* ── motor ───────────────────────────────────────────────────────── */

  var atual = 'pt';
  var originais = [];        // [{ el, html }]  — português do HTML
  var originaisAttr = [];    // [{ el, attr, chave, valor }]

  function detecta() {
    try {
      var salvo = localStorage.getItem(CHAVE_SALVA);
      if (IDIOMAS.indexOf(salvo) > -1) return salvo;
    } catch (e) { /* sem storage */ }
    var lista = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'pt'];
    for (var i = 0; i < lista.length; i++) {
      var codigo = String(lista[i]).toLowerCase().slice(0, 2);
      if (IDIOMAS.indexOf(codigo) > -1) return codigo;
    }
    return 'en'; // qualquer outro idioma: inglês é o mais provável de ser entendido
  }

  function t(chave, vars) {
    var s = (JS[atual] && JS[atual][chave]) || (PAGINA[atual] && PAGINA[atual][chave]) || JS.pt[chave] || chave;
    if (vars) {
      Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
    }
    return s;
  }

  function guardaOriginais() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      originais.push({ el: el, chave: el.getAttribute('data-i18n'), html: el.innerHTML });
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-attr]'), function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (par) {
        var p = par.split(':');
        if (p.length !== 2) return;
        var attr = p[0].trim();
        originaisAttr.push({ el: el, attr: attr, chave: p[1].trim(), valor: el.getAttribute(attr) || '' });
      });
    });
  }

  function aplica(idioma, salvar) {
    if (IDIOMAS.indexOf(idioma) < 0) idioma = 'pt';
    atual = idioma;
    var dic = PAGINA[idioma] || {};

    originais.forEach(function (o) {
      var novo = idioma === 'pt' ? o.html : (dic[o.chave] !== undefined ? dic[o.chave] : o.html);
      if (o.el.innerHTML !== novo) o.el.innerHTML = novo;
    });
    originaisAttr.forEach(function (o) {
      o.el.setAttribute(o.attr, idioma === 'pt' ? o.valor : (dic[o.chave] !== undefined ? dic[o.chave] : o.valor));
    });

    document.documentElement.lang = TAG_HTML[idioma];
    document.title = t('meta.title');
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.desc'));

    Array.prototype.forEach.call(document.querySelectorAll('[data-lang]'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === idioma));
    });

    if (salvar) {
      try { localStorage.setItem(CHAVE_SALVA, idioma); } catch (e) { /* ignora */ }
    }
    document.documentElement.classList.remove('i18n-carregando');
    document.dispatchEvent(new CustomEvent('idioma', { detail: { idioma: idioma } }));
  }

  /* ── início ──────────────────────────────────────────────────────── */

  guardaOriginais();

  Array.prototype.forEach.call(document.querySelectorAll('[data-lang]'), function (b) {
    b.addEventListener('click', function () { aplica(b.getAttribute('data-lang'), true); });
  });

  window.I18N = {
    t: t,
    aplica: aplica,
    idioma: function () { return atual; },
    tag: function () { return TAG_HTML[atual]; }
  };

  aplica(detecta(), false);
})();
