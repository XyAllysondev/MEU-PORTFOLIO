# Allyson Vinícius — Sistema v2.6

Portfólio pessoal com interface **HUD tecnológica**: grade técnica, retícula de
mira no cursor, scanlines e um **robô SVG que rastreia o mouse**. Escrito do
zero em **HTML5, CSS puro e JavaScript vanilla** — sem frameworks, sem
dependências, sem etapa de build.

🔗 **Ao vivo:** <https://xyallysondev.github.io/MEU-PORTFOLIO/>

## ✦ A unidade robótica

O robô do topo (`UNIDADE_AV-01`) é SVG desenhado à mão, animado por
`assets/js/robot.js`:

- **Cabeça e pupilas seguem o cursor** por toda a tela, com suavização
  exponencial (converge em ~0,5s a 60fps)
- **Sorri, acena e solta um balão de fala** quando o cursor chega perto
- **Pisca sozinho** em intervalos aleatórios
- **Leitura ΔX / ΔY ao vivo** da posição do cursor em relação a ele
- Clique nele para trocar a fala
- Em telas de toque, acompanha o dedo

## ✦ Projetos rodando de verdade

Cada card de projeto tem duas camadas de vida:

**Prévia animada (sempre ligada, de graça).** A captura faz uma deriva
lenta e uma varredura luminosa passa de tempos em tempos. É só
`transform`, composto pela GPU — e um `IntersectionObserver` **pausa
tudo quando o card sai da tela**, porque animação que ninguém vê ainda
custa composição.

**Execução embutida (sob demanda).** O botão `▶ RODAR AO VIVO` troca a
imagem por um `<iframe>` com o projeto real carregando ali dentro.
Clicar de novo remove o iframe e devolve memória. Nada disso carrega no
início — a página continua leve.

Funciona porque os três destinos não mandam `X-Frame-Options` nem
`frame-ancestors`; verifiquei antes de construir. O ALTERNATIVA e o
Nexus abrem na tela de login (é o app real, só não logado); o **7 a 0 é
jogável dentro do card**.

## ✦ O copiloto

Ao sair do hero, uma versão compacta do robô embarca no canto inferior
direito e **acompanha a leitura**: a cada módulo que entra na tela, ele
narra onde você está (`SYS.03 — Quatro projetos no ar…`). Os olhos
continuam seguindo o cursor, e um clique nele volta ao topo.

## ✦ Mira do mouse

Desenhada para não custar quadros:

- **Um único elemento** de tamanho zero, movido só por `translate3d`
- **Sem laço de animação e sem inércia** — anda 1:1 com o mouse, escrito
  direto no `mousemove` (o browser já entrega no máximo um por quadro)
- O crescimento sobre links anima `transform` e cor, ambos compostos —
  nenhum reflow
- Nada de linhas de tela cheia, contador de coordenadas ou paralaxe de
  fundo: repintavam camadas do tamanho da janela a cada movimento

O laço dos robôs também **dorme sozinho** assim que a suavização
converge, e só volta a rodar no próximo movimento.

## ✦ Recursos

- Sequência de boot com log de terminal
- Máquina de escrever alternando funções no hero
- Franja cromática (glitch) ocasional no título
- Barras de diagnóstico e contadores animados ao entrar na tela
- Formulário funcional via Formspree, com validação inline
- Responsivo, acessível ao teclado, com `prefers-reduced-motion` respeitado
  (sem retícula, sem scanlines, sem rastreamento)

## ✦ Projetos em destaque

| Projeto | O que é | Stack |
|---|---|---|
| [ALTERNATIVA](https://sistemaalternativa.netlify.app/) | Sistema de gestão de serviços, equipes e resultados | JS puro · Bootstrap 5 · Chart.js · Leaflet · IndexedDB |
| [Nexus RPG](https://playnexusrpg.com/) | Mesa virtual de Ordem Paranormal: fichas, mapas e ajudante do mestre | React · PWA · Firebase |
| [7 a 0 — Anime Version](https://a-0-anime-version.web.app/) | Jogo de mesa digital com dado, times e combate | HTML · CSS · JavaScript |
| Este sistema | O portfólio que você está lendo | HTML · CSS · JS · SVG |

## ✦ Peso das imagens

As capturas de projeto são servidas em **WebP com PNG de reserva**, via
`<picture>`. Nenhum PNG foi apagado — o navegador que não suportar
WebP cai no original sem quebrar nada.

| Arquivo | PNG | WebP | |
|---|---|---|---|
| projeto1 | 803 KB | 36 KB | −96% |
| projeto-alternativa | 755 KB | 55 KB | −93% |
| projeto2 | 590 KB | 47 KB | −93% |
| **total** | **2,15 MB** | **137 KB** | **−94%** |

São capturas de interface, com muita área chapada — o formato que o
WebP mais comprime. Comparei lado a lado antes de aplicar: sem perda
visível.

## ✦ Tipografia e cores

| Uso | Fonte |
|---|---|
| Títulos | Chakra Petch |
| Texto corrido | IBM Plex Sans |
| Dados e rótulos | IBM Plex Mono |

Base `#05070c` · ciano `#22e1ff` · lima `#9dff5a` · rubro `#ff4d6d`

## ✦ Estrutura

```
portfolio/
├── index.html
├── README.md
└── assets/
    ├── css/style.css     → 21 seções comentadas
    ├── js/robot.js       → rastreamento do cursor pelo robô
    ├── js/main.js        → boot, retícula, revelação, menu, formulário
    ├── img/              → retrato e capturas dos projetos
    └── certs/            → 11 certificados em PDF
```

## ✦ Rodar localmente

```bash
npx serve -l 5173 .
```

Depois abra <http://localhost:5173>.

## ✦ Contato

- **E-mail:** allysonfulldev@gmail.com
- **WhatsApp:** (81) 98225-3788
- **LinkedIn:** [allyson-nonardo](https://www.linkedin.com/in/allyson-nonardo-5b4b82323/)
- **GitHub:** [@XyAllysondev](https://github.com/XyAllysondev)

---

© 2026 Allyson Vinícius · Recife — PE, Brasil
