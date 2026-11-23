# Design — Cariri Sucré

A página é uma bandeja de forminhas vista de cima: cada categoria é uma forminha que abre o seu cardápio num toque, e a sacola acompanha o cliente até o WhatsApp.

## Cor
| Token | Valor | Uso |
|---|---|---|
| `--red` | #B3121F | Campo da marca: nav, hero, faixa de fechamento, rodapé, botões no claro, preços |
| `--red-deep` | #8C0D17 | Hover do botão vermelho, nome-carimbo decorativo |
| `--red-ink` | #FFF6F2 | Texto sobre o vermelho |
| `--red-soft` | #FFE9E5 | Texto secundário sobre o vermelho |
| `--milk` | #FFFFFF | Folhas do cardápio e da sacola, cards |
| `--sugar` | #FBEAE7 | Glacê rosa: fundo da bandeja e da seção "Como pedir", trilhos |
| `--ink` | #2B1410 | Texto (chocolate) |
| `--muted` | #5A3832 | Texto secundário (7:1 sobre o leite) |
| `--gold` | #B8893A | Anel festonado das forminhas, filetes de seção. Nunca em texto pequeno |
| `--line` / `--line-strong` | #F0DAD6 / #E2BDB7 | Divisórias e bordas de campos |

Estratégia: comprometida. O vermelho ocupa hero, fechamento e rodapé; o miolo alterna leite e glacê.

## Tipografia
- Display: **Gloock** 400 (self-host em `assets/fonts`). H1 40–76px, H2 32–54px, altura de linha 1.02–1.1.
- Texto: **Figtree** variável 400–700. Corpo 17/1.55; listas e preços 15–16px com algarismos tabulares.

## Forma
- Raios: 10 (campos), 16 (fotos menores, avisos), 22 (cards, folhas), pílula (botões, chips).
- Selo festonado (`assets/scallop.svg`, recorte do selo da marca) em dourado ao redor de cada foto de forminha (`.seal`).
- Sombra única: `--shadow` (offset e blur suaves, tom vermelho escuro).

## Componentes
- `.btn` pílula sólida: `--milk` sobre vermelho, `--red` sobre claro. Hover sobe 1–2px, clique afunda 1px.
- `.tile` forminha de categoria: selo + nome + "a partir de". Em 390px, grade 3×3 que cabe numa tela.
- `.sheet` (`<dialog>`): painel lateral de 620px no desktop, folha de baixo para cima (94dvh) no celular. Chips de categoria no topo, rodapé com barra de mínimo e total.
- `.stepper` e `.add-btn` para quantidades em passos do mínimo (25, 10 ou 5).
- `.minbar`: progresso até 50 docinhos; fica verde ao atingir.
- `.bagbar`: barra fixa inferior com total quando a sacola tem itens.

## Movimento
- Entrada do hero uma vez: texto sobe, quadros da colagem assentam com blur, selo carimba.
- Um momento: `picture-develops` (filme) na foto principal do ateliê.
- Vídeos tocam só na tela; o mural tem botão de pausar. Com movimento reduzido nada anima e os vídeos ficam parados.

## Dados
`assets/menu.js` é a fonte de preços (transcrita das artes do cardápio). Pedido vai para wa.me/5588999620935. Meta Pixel 9850103268427591: PageView, AddToCart, InitiateCheckout, Schedule, Lead, Purchase.
