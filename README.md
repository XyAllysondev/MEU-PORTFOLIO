# Allyson Vinícius — Portfólio v3

Portfólio pessoal em **tema claro com acento lavanda**, cards de vidro e um
**vídeo 3D no hero** (personagem caminhando por um escritório). Escrito do
zero em **HTML5, CSS puro e JavaScript vanilla** — sem frameworks, sem
dependências, sem etapa de build.

🔗 **Ao vivo:** <https://xyallysondev.github.io/MEU-PORTFOLIO/>

## ✦ O hero

O vídeo (`assets/videos/allyson-office.{webm,mp4}`) toca em loop, mudo e
inline, com `poster` para o primeiro frame. Três cards flutuantes ao redor
(Front-end, Suporte de TI, Eng. Computação) lembram os painéis holográficos
da animação.

- Botão de pausa/play acessível (`aria-pressed`, rótulo dinâmico)
- Um `IntersectionObserver` pausa o vídeo quando sai da tela
- Com `prefers-reduced-motion`, fica parado no poster até o usuário ligar

## ✦ O guia

O mesmo personagem aparece num card flutuante no canto inferior direito
(`assets/videos/guia.{webm,mp4}`, recorte do vídeo original) assim que o
visitante começa a rolar. A cada seção que entra em foco, o balão troca de
mensagem (mapa em `FALAS`, no `main.js`). Clicar nele volta ao topo.

## ✦ Projetos rodando de verdade

Cada card tem o botão **Ver ao vivo**, que troca a captura por um `<iframe>`
com o projeto real carregando ali dentro. Clicar de novo remove o iframe e
devolve memória. Nada disso carrega no início.

## ✦ Estrutura

```
index.html
assets/
  css/style.css      tema, layout, responsivo, reduced-motion
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
