# Allyson Vinícius — Portfólio v4 · "Meia-noite"

Portfólio pessoal em **azul-marinho com viés índigo**, layout editorial com
réguas finas (sem cards de vidro, sem texto em gradiente) e um **vídeo 3D no
hero** dentro de um visor de câmera. Escrito do zero em **HTML5, CSS puro e
JavaScript vanilla** — sem frameworks, sem dependências, sem etapa de build.

Tipografia: **Geist** (texto), **Instrument Serif** itálico (ênfases) e
**Geist Mono** (rótulos, metadados). Um acento só: pervinca `#9aa6ff`.

🔗 **Ao vivo:** <https://xyallysondev.github.io/MEU-PORTFOLIO/>

## ✦ O hero

O vídeo (`assets/videos/allyson-office.{webm,mp4}`) toca em loop, mudo e
inline, com `poster` para o primeiro frame, dentro de um visor com cantos de
enquadramento e um véu marinho que casa a luz do vídeo com o tema. Para
trocar o vídeo basta substituir os três arquivos mantendo os nomes.

- Botão de pausa/play acessível (`aria-pressed`, rótulo dinâmico)
- Um `IntersectionObserver` pausa o vídeo quando sai da tela
- Com `prefers-reduced-motion`, fica parado no poster até o usuário ligar

## ✦ Navegação lateral

No desktop o menu é um trilho de ícones fixo à esquerda. Ele abre ao passar
o mouse (ou ao navegar com Tab), mostra os nomes em cascata e um destaque
desliza até a seção atual. O botão **Fixar menu** deixa aberto e empurra o
conteúdo (a escolha fica no `localStorage`). A borda direita do trilho é a
barra de progresso da leitura. No celular volta a barra no topo com menu de
tela cheia.

## ✦ Idiomas (PT · ES · EN)

O site abre no idioma do navegador do visitante: espanhol vira espanhol,
inglês vira inglês e qualquer outro idioma cai no inglês. O seletor
**PT · ES · EN** (no menu lateral e na barra do celular) troca na hora e
lembra a escolha.

- O português fica escrito no `index.html`; cada texto tem
  `data-i18n="chave"` (ou `data-i18n-attr="alt:chave"` para atributos).
- `assets/js/i18n.js` guarda o espanhol e o inglês dessas chaves e os textos
  montados pelo JavaScript (falas do guia, formulário, botões).
- **Para mudar um texto:** edite o HTML e a mesma chave em ES e EN.
- **Para adicionar um texto novo:** coloque `data-i18n="nova.chave"` no
  elemento e crie `'nova.chave'` nos blocos `es` e `en` do `i18n.js`.
  Sem tradução, o texto continua em português.

## ✦ O guia

O mesmo personagem aparece num card flutuante no canto inferior direito
(`assets/videos/guia.{webm,mp4}`, recorte do vídeo original) assim que o
visitante começa a rolar. A cada seção que entra em foco, o balão troca de
mensagem (mapa em `FALAS`, no `main.js`). Clicar nele volta ao topo.

## ✦ Projetos rodando de verdade

Quatro projetos: Capricche Manutenção, ALTERNATIVA, Nexus RPG e 7 a 0.
Para adicionar outro, copie um `<article class="proj">` em `index.html`,
troque URL/textos/imagem (16:10, em `assets/img/`, PNG + WebP) e atualize o
contador `data-conta` do hero. A ordem alterna imagem à esquerda/direita
sozinha.

Cada card tem o botão **Ver ao vivo**, que troca a captura por um `<iframe>`
com o projeto real carregando ali dentro. Clicar de novo remove o iframe e
devolve memória. Nada disso carrega no início.

## ✦ Estrutura

```
index.html
assets/
  css/style.css      tema, layout, responsivo, reduced-motion
  js/i18n.js         traduções ES/EN e troca de idioma
  js/main.js         vídeo, menu, revelação, contadores, formulário, iframes
  videos/            vídeo do hero (webm + mp4 + poster)
  img/               foto de perfil e capturas dos projetos
  certs/             PDFs dos certificados
design-system/       tokens e regras de estilo
```

## ✦ Rodar localmente

Qualquer servidor estático serve:

```
npx http-server -p 8080 -c-1
```

## ✦ Acessibilidade

Link "pular para o conteúdo", foco visível em tudo, menu móvel com `inert`
e armadilha de Tab, formulário com validação inline (`aria-invalid`,
`aria-describedby`, resumo de erros com `role="status"`), contraste AA em
todo texto e `prefers-reduced-motion` respeitado.
