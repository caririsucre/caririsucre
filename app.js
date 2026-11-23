/* ==========================================================================
   CARIRI SUCRÉ — Motor de Cardápio, Regras (25+25=50), Agendamento 48h & Meta Pixel
   WhatsApp Oficial de Pedidos: +55 (88) 99962-0935
   Meta Pixel Oficial: PIXEL CARIRI SUCRÉ - BRIGADEIRO (ID: 9850103268427591)
   ========================================================================== */

(function () {
  'use strict';

  const WHATSAPP_PHONE = '5588999620935';
  const PIXEL_ID = '9850103268427591';

  // Sabores disponíveis para recheio das flores de "Arte em Açúcar" e Personalizados
  const ALL_SWEET_FLAVORS = [
    'Brigadeiro Tradicional',
    'Ninho',
    'Beijinho',
    'Coco Queimado',
    'Casadinho',
    'Brigadeiro Prestígio',
    'Brigadeiro de Limão',
    'Brigadeiro Doce de Leite',
    'Brigadeiro Moranguinho',
    'Brigadeiro Céu Azul',
    'Brigadeiro Gourmet',
    'Brigadeiro Branco Gourmet',
    'Ninho com Nutella',
    'Parmesão com Goiabada',
    'Brigadeiro Churros',
    'Ferrero Rocher',
    'Brigadeiro de Café',
    'Lua de Mel',
    'Sensação',
    'Brigadeiro Olho de Sogra',
    'Brigadeiro de Paçoca',
    'Brigadeiro Branco Chocoball',
    'Quebra-Queixo',
    'Limão Siciliano',
    'Abacaxi com Hortelã',
    'Tâmara com Gengibre',
    'Damasco',
    'Pão de Mel com Especiarias',
    'Brigadeiro de Oreo',
    'Surpresa de Uva',
    'Damasco Recheado',
    'Brigadeiro de Pistache'
  ];

  const CAKE_FLAVORS_ACETATO = [
    'Ninho',
    'Chocolate',
    'Chocolate Amargo',
    'Brigadeiro Branco',
    'Beijinho',
    'Café',
    'Churros',
    'Maracujá',
    'Coco Queimado',
    'Abacaxi com Coco'
  ];

  const CAKE_FLAVORS_PORTFOLIO = [
    'Ninho',
    'Chocolate',
    'Chocolate Amargo',
    'Brigadeiro Branco',
    'Beijinho',
    'Café',
    'Churros',
    'Maracujá',
    'Coco Queimado'
  ];

  // Catálogo completo fiel às 8 lâminas oficiais de C:\Users\Erina\Music\CARDÁPIO
  const MENU_ITEMS = [
    // 1. OS FAVORITOS DE SEMPRE (Tradicionais — R$ 1,40/unid • Lote mín. 25 doces • Pedido mín. 50 doces combináveis)
    { id: 'fav-brigadeiro', category: 'favoritos', categoryLabel: 'Os Favoritos de Sempre', name: 'Brigadeiro Tradicional', unitPrice: 1.40, step: 25, countsFor50Rule: true, thumb: 'assets/items/fav-brigadeiro.jpg', desc: 'Massa artesanal cremosa de cacau envolta em granulado clássico.' },
    { id: 'fav-ninho', category: 'favoritos', categoryLabel: 'Os Favoritos de Sempre', name: 'Ninho', unitPrice: 1.40, step: 25, countsFor50Rule: true, thumb: 'assets/items/fav-ninho.jpg', desc: 'Brigadeiro aveludado de leite Ninho finalizado com carimbo de coração.' },
    { id: 'fav-beijinho', category: 'favoritos', categoryLabel: 'Os Favoritos de Sempre', name: 'Beijinho', unitPrice: 1.40, step: 25, countsFor50Rule: true, thumb: 'assets/items/fav-beijinho.jpg', desc: 'Coco ralado fresco cozido no ponto perfeito de cremosidade.' },
    { id: 'fav-coco-queimado', category: 'favoritos', categoryLabel: 'Os Favoritos de Sempre', name: 'Coco Queimado', unitPrice: 1.40, step: 25, countsFor50Rule: true, thumb: 'assets/items/fav-coco-queimado.jpg', desc: 'Brigadeiro envolto em lascas douradas de coco queimado artesanal.' },
    { id: 'fav-casadinho', category: 'favoritos', categoryLabel: 'Os Favoritos de Sempre', name: 'Casadinho', unitPrice: 1.40, step: 25, countsFor50Rule: true, thumb: 'assets/items/fav-casadinho.jpg', desc: 'Encontro clássico de brigadeiro de cacau e brigadeiro branco.' },
    { id: 'fav-prestigio', category: 'favoritos', categoryLabel: 'Os Favoritos de Sempre', name: 'Brigadeiro Prestígio', unitPrice: 1.40, step: 25, countsFor50Rule: true, thumb: 'assets/items/fav-prestigio.jpg', desc: 'Massa de chocolate intenso com cobertura de flocos de coco.' },
    { id: 'fav-limao', category: 'favoritos', categoryLabel: 'Os Favoritos de Sempre', name: 'Brigadeiro de Limão', unitPrice: 1.40, step: 25, countsFor50Rule: true, thumb: 'assets/items/fav-limao.jpg', desc: 'Toque cítrico refrescante com raspas finas de limão.' },
    { id: 'fav-doce-de-leite', category: 'favoritos', categoryLabel: 'Os Favoritos de Sempre', name: 'Brigadeiro Doce de Leite', unitPrice: 1.40, step: 25, countsFor50Rule: true, thumb: 'assets/items/fav-doce-de-leite.jpg', desc: 'Cozimento lento de doce de leite com textura macia.' },
    { id: 'fav-moranguinho', category: 'favoritos', categoryLabel: 'Os Favoritos de Sempre', name: 'Brigadeiro Moranguinho', unitPrice: 1.40, step: 25, countsFor50Rule: true, thumb: 'assets/items/fav-moranguinho.jpg', desc: 'Clássico das festas com sabor delicado de morango.' },
    { id: 'fav-ceu-azul', category: 'favoritos', categoryLabel: 'Os Favoritos de Sempre', name: 'Brigadeiro Céu Azul', unitPrice: 1.40, step: 25, countsFor50Rule: true, thumb: 'assets/items/fav-ceu-azul.jpg', desc: 'Sabor nostálgico em tom azul vibrante cristalizado.' },

    // 2. ESPECIAIS DA CASA (Gourmet — R$ 1,60 a R$ 1,80/unid • Lote mín. 25 doces • Pedido mín. 50 doces combináveis)
    { id: 'esp-brigadeiro-gourmet', category: 'especiais', categoryLabel: 'Especiais da Casa (Gourmet)', name: 'Brigadeiro Gourmet', unitPrice: 1.80, step: 25, countsFor50Rule: true, thumb: 'assets/items/esp-brigadeiro-gourmet.jpg', desc: 'Chocolate nobre finalizado em blossoms de chocolate ao leite.' },
    { id: 'esp-branco-gourmet', category: 'especiais', categoryLabel: 'Especiais da Casa (Gourmet)', name: 'Brigadeiro Branco Gourmet', unitPrice: 1.80, step: 25, countsFor50Rule: true, thumb: 'assets/items/esp-branco-gourmet.jpg', desc: 'Massa cremosa de chocolate branco envolta em blossoms nobres.' },
    { id: 'esp-ninho-nutella', category: 'especiais', categoryLabel: 'Especiais da Casa (Gourmet)', name: 'Ninho com Nutella', unitPrice: 1.70, step: 25, countsFor50Rule: true, thumb: 'assets/items/esp-ninho-nutella.jpg', desc: 'Brigadeiro de leite Ninho coroado com roseta generosa de Nutella pura.' },
    { id: 'esp-parmesao-goiabada', category: 'especiais', categoryLabel: 'Especiais da Casa (Gourmet)', name: 'Parmesão com Goiabada', unitPrice: 1.60, step: 25, countsFor50Rule: true, thumb: 'assets/items/esp-parmesao-goiabada.jpg', desc: 'Contraste agridoce de parmesão fino com coração de goiabada.' },
    { id: 'esp-churros', category: 'especiais', categoryLabel: 'Especiais da Casa (Gourmet)', name: 'Brigadeiro Churros', unitPrice: 1.60, step: 25, countsFor50Rule: true, thumb: 'assets/items/esp-churros.jpg', desc: 'Passado no açúcar e canela com pitanga de doce de leite artesanal.' },
    { id: 'esp-ferrero-rocher', category: 'especiais', categoryLabel: 'Especiais da Casa (Gourmet)', name: 'Ferrero Rocher', unitPrice: 1.70, step: 25, countsFor50Rule: true, thumb: 'assets/items/esp-ferrero-rocher.jpg', desc: 'Brigadeiro de cacau em castanhas torradas e roseta de avelã.' },
    { id: 'esp-cafe', category: 'especiais', categoryLabel: 'Especiais da Casa (Gourmet)', name: 'Brigadeiro de Café', unitPrice: 1.60, step: 25, countsFor50Rule: true, thumb: 'assets/items/esp-cafe.jpg', desc: 'Infusão intensa de café torrado finalizada com grão selecionável.' },
    { id: 'esp-lua-de-mel', category: 'especiais', categoryLabel: 'Especiais da Casa (Gourmet)', name: 'Lua de Mel', unitPrice: 1.70, step: 25, countsFor50Rule: true, thumb: 'assets/items/esp-lua-de-mel.jpg', desc: 'Duo gourmet bicolor com roseta aveludada de chocolate.' },
    { id: 'esp-sensacao', category: 'especiais', categoryLabel: 'Especiais da Casa (Gourmet)', name: 'Sensação', unitPrice: 1.70, step: 25, countsFor50Rule: true, thumb: 'assets/items/esp-sensacao.jpg', desc: 'Brigadeiro de morango coroado com ganache/Nutella cremosa.' },
    { id: 'esp-olho-de-sogra', category: 'especiais', categoryLabel: 'Especiais da Casa (Gourmet)', name: 'Brigadeiro Olho de Sogra', unitPrice: 1.70, step: 25, countsFor50Rule: true, thumb: 'assets/items/esp-olho-de-sogra.jpg', desc: 'Cocada cremosa com redução artesanal de ameixa preta.' },
    { id: 'esp-pacoca', category: 'especiais', categoryLabel: 'Especiais da Casa (Gourmet)', name: 'Brigadeiro de Paçoca', unitPrice: 1.60, step: 25, countsFor50Rule: true, thumb: 'assets/items/esp-pacoca.jpg', desc: 'Amendoim torrado crocante com interior super macio.' },
    { id: 'esp-branco-chocoball', category: 'especiais', categoryLabel: 'Especiais da Casa (Gourmet)', name: 'Brigadeiro Branco Chocoball', unitPrice: 1.60, step: 25, countsFor50Rule: true, thumb: 'assets/items/esp-branco-chocoball.jpg', desc: 'Pérolas crocantes de chocolate branco envolvendo massa cremosa.' },

    // 3. NOSSA LINHA EXCLUSIVA (R$ 2,50 a R$ 3,00/unid • Lote mín. 25 doces • Pedido mín. 50 doces combináveis)
    { id: 'exc-quebra-queixo', category: 'exclusiva', categoryLabel: 'Nossa Linha Exclusiva', name: 'Quebra-Queixo', unitPrice: 2.50, step: 25, countsFor50Rule: true, thumb: 'assets/items/exc-quebra-queixo.jpg', desc: 'Base canelada de coco com topo de cocada caramelizada regional.' },
    { id: 'exc-limao-siciliano', category: 'exclusiva', categoryLabel: 'Nossa Linha Exclusiva', name: 'Limão Siciliano', unitPrice: 2.50, step: 25, countsFor50Rule: true, thumb: 'assets/items/exc-limao-siciliano.jpg', desc: 'Acidez elegante do limão siciliano com roseta cítrica e zest fresco.' },
    { id: 'exc-abacaxi-hortela', category: 'exclusiva', categoryLabel: 'Nossa Linha Exclusiva', name: 'Abacaxi com Hortelã', unitPrice: 2.50, step: 25, countsFor50Rule: true, thumb: 'assets/items/exc-abacaxi-hortela.jpg', desc: 'Compota artesanal de abacaxi em cubos com frescor de hortelã.' },
    { id: 'exc-tamara-gengibre', category: 'exclusiva', categoryLabel: 'Nossa Linha Exclusiva', name: 'Tâmara com Gengibre', unitPrice: 2.50, step: 25, countsFor50Rule: true, thumb: 'assets/items/exc-tamara-gengibre.jpg', desc: 'Criação autoral que une a doçura da tâmara ao toque picante do gengibre.' },
    { id: 'exc-damasco', category: 'exclusiva', categoryLabel: 'Nossa Linha Exclusiva', name: 'Damasco', unitPrice: 2.50, step: 25, countsFor50Rule: true, thumb: 'assets/items/exc-damasco.jpg', desc: 'Brigadeiro fino finalizado com redução brilhante de damasco turco.' },
    { id: 'exc-pao-de-mel', category: 'exclusiva', categoryLabel: 'Nossa Linha Exclusiva', name: 'Brigadeiro Pão de Mel com Especiarias', unitPrice: 2.70, step: 25, countsFor50Rule: true, thumb: 'assets/items/exc-pao-de-mel.jpg', desc: 'Blossoms de chocolate, especiarias aromáticas e coroa de doce de leite.' },
    { id: 'exc-oreo', category: 'exclusiva', categoryLabel: 'Nossa Linha Exclusiva', name: 'Brigadeiro de Oreo', unitPrice: 2.50, step: 25, countsFor50Rule: true, thumb: 'assets/items/exc-oreo.jpg', desc: 'Massa cremosa com farofa de cacau e mini Oreo original no topo.' },
    { id: 'exc-surpresa-uva', category: 'exclusiva', categoryLabel: 'Nossa Linha Exclusiva', name: 'Surpresa de Uva', unitPrice: 2.50, step: 25, countsFor50Rule: true, thumb: 'assets/items/exc-surpresa-uva.jpg', desc: 'Uva verde fresca sem semente envolta em fina camada de brigadeiro branco.' },
    { id: 'exc-damasco-recheado', category: 'exclusiva', categoryLabel: 'Nossa Linha Exclusiva', name: 'Damasco Recheado', unitPrice: 3.00, step: 25, countsFor50Rule: true, thumb: 'assets/items/exc-damasco-recheado.jpg', desc: 'Damasco inteiro selecionado recheado manualmente com brigadeiro cremoso.' },
    { id: 'exc-pistache', category: 'exclusiva', categoryLabel: 'Nossa Linha Exclusiva', name: 'Brigadeiro de Pistache', unitPrice: 3.00, step: 25, countsFor50Rule: true, thumb: 'assets/items/exc-pistache.jpg', desc: 'Pasta pura de pistache envolta em pistaches tostados triturados.' },

    // 4. ARTE EM AÇÚCAR (Pedido mín. 25 doces por modelo • O sabor da massa pode ser qualquer sabor do cardápio)
    { id: 'art-anemona', category: 'arte', categoryLabel: 'Arte em Açúcar', name: 'Flor Anêmona', unitPrice: 3.50, step: 25, countsFor50Rule: true, hasFlavorSelect: true, thumb: 'assets/items/art-anemona.jpg', desc: 'Flor modelada à mão em açúcar. Escolha qualquer sabor do cardápio para a base.' },
    { id: 'art-anemona-dupla', category: 'arte', categoryLabel: 'Arte em Açúcar', name: 'Anêmona Dupla', unitPrice: 3.80, step: 25, countsFor50Rule: true, hasFlavorSelect: true, thumb: 'assets/items/art-anemona-dupla.jpg', desc: 'Camada dupla de pétalas com miolo perolado dourado.' },
    { id: 'art-chanana', category: 'arte', categoryLabel: 'Arte em Açúcar', name: 'Flor Chanana', unitPrice: 3.50, step: 25, countsFor50Rule: true, hasFlavorSelect: true, thumb: 'assets/items/art-chanana.jpg', desc: 'Delicadeza regional esculpida pétala por pétala em açúcar.' },
    { id: 'art-flor-babado', category: 'arte', categoryLabel: 'Arte em Açúcar', name: 'Flor de Babado', unitPrice: 3.50, step: 25, countsFor50Rule: true, hasFlavorSelect: true, thumb: 'assets/items/art-flor-babado.jpg', desc: 'Volume escultural com pétalas onduladas para mesas de destaque.' },
    { id: 'art-flor-lotus', category: 'arte', categoryLabel: 'Arte em Açúcar', name: 'Flor de Lótus', unitPrice: 4.00, step: 25, countsFor50Rule: true, hasFlavorSelect: true, thumb: 'assets/items/art-flor-lotus.jpg', desc: 'Acabamento monumental em múltiplas camadas de pétalas.' },
    { id: 'art-rosa', category: 'arte', categoryLabel: 'Arte em Açúcar', name: 'Rosa Esculpida', unitPrice: 4.00, step: 25, countsFor50Rule: true, hasFlavorSelect: true, thumb: 'assets/items/art-rosa.jpg', desc: 'Rosa clássica com folha artesanal para casamentos e bodas.' },
    { id: 'art-girassol', category: 'arte', categoryLabel: 'Arte em Açúcar', name: 'Girassol', unitPrice: 3.50, step: 25, countsFor50Rule: true, hasFlavorSelect: true, thumb: 'assets/items/art-girassol.jpg', desc: 'Pétalas amarelo-ouro vibrantes com centro texturizado à mão.' },
    { id: 'art-margarida', category: 'arte', categoryLabel: 'Arte em Açúcar', name: 'Margarida', unitPrice: 3.50, step: 25, countsFor50Rule: true, hasFlavorSelect: true, thumb: 'assets/items/art-margarida.jpg', desc: 'Flor delicada sobre doce com arabescos rendados.' },
    { id: 'art-flor-cravo', category: 'arte', categoryLabel: 'Arte em Açúcar', name: 'Flor de Cravo', unitPrice: 3.50, step: 25, countsFor50Rule: true, hasFlavorSelect: true, thumb: 'assets/items/art-flor-cravo.jpg', desc: 'Textura franzida delicada ideal para batizados e casamentos.' },
    { id: 'art-amarilis', category: 'arte', categoryLabel: 'Arte em Açúcar', name: 'Amarílis', unitPrice: 3.80, step: 25, countsFor50Rule: true, hasFlavorSelect: true, thumb: 'assets/items/art-amarilis.jpg', desc: 'Pétalas abertas com filete dourado e pérola central.' },
    { id: 'art-orquidea', category: 'arte', categoryLabel: 'Arte em Açúcar', name: 'Orquídea', unitPrice: 4.00, step: 25, countsFor50Rule: true, hasFlavorSelect: true, thumb: 'assets/items/art-orquidea.jpg', desc: 'Alta confeitaria artística com labelo sombreado à mão.' },
    { id: 'art-borboleta', category: 'arte', categoryLabel: 'Arte em Açúcar', name: 'Borboleta em Açúcar', unitPrice: 3.00, step: 25, countsFor50Rule: true, hasFlavorSelect: true, thumb: 'assets/items/art-borboleta.jpg', desc: 'Borboleta 3D em açúcar pousada sobre o doce do sabor escolhido.' },
    { id: 'art-gerbera', category: 'arte', categoryLabel: 'Arte em Açúcar', name: 'Gérbera', unitPrice: 3.50, step: 25, countsFor50Rule: true, hasFlavorSelect: true, thumb: 'assets/items/art-gerbera.jpg', desc: 'Cor intensa e simetria artesanal para compor a mesa de doces.' },

    // 5. LINHA PERSONALIZADA (R$ 1,80/unid • Pedido mínimo 50 doces / lotes de 25 por sabor)
    { id: 'pers-15-anos', category: 'personalizada', categoryLabel: 'Linha Personalizada', name: 'Personalizado 15 Anos & Debutante', unitPrice: 1.80, step: 25, countsFor50Rule: true, hasFlavorSelect: true, hasThemeInput: true, thumb: 'assets/photos/foto-25.jpg', isRectThumb: true, desc: 'Carimbo dourado (15 anos, iniciais, brasão ou ícones) nas cores da festa. Mínimo 50 doces.' },
    { id: 'pers-batizado', category: 'personalizada', categoryLabel: 'Linha Personalizada', name: 'Personalizado Batizado & Eucaristia', unitPrice: 1.80, step: 25, countsFor50Rule: true, hasFlavorSelect: true, hasThemeInput: true, thumb: 'assets/photos/foto-17.jpg', isRectThumb: true, desc: 'Espírito Santo, cálice, terço ou anjo em relevo dourado artesanal. Mínimo 50 doces.' },
    { id: 'pers-casamento', category: 'personalizada', categoryLabel: 'Linha Personalizada', name: 'Personalizado Casamento & Noivado', unitPrice: 1.80, step: 25, countsFor50Rule: true, hasFlavorSelect: true, hasThemeInput: true, thumb: 'assets/photos/foto-12.jpg', isRectThumb: true, desc: 'Monograma dos noivos, alianças, laços ou flores com acabamento perolado.' },
    { id: 'pers-aniversario', category: 'personalizada', categoryLabel: 'Linha Personalizada', name: 'Personalizado Nome & Tema Livre', unitPrice: 1.80, step: 25, countsFor50Rule: true, hasFlavorSelect: true, hasThemeInput: true, thumb: 'assets/cardapio/05-personalizada.jpg', isRectThumb: true, desc: 'Gravação personalizada com nome, idade ou símbolo temático da comemoração.' },

    // 6. OS PREFERIDOS DA COMEMORAÇÃO (Bem-casados mín. 20 unid • Trufas mín. 25 unid • Copinhos mín. 25 unid)
    { id: 'bc-chocolate', category: 'comemoracao', categoryLabel: 'Bem-Casados (Mín. 20 unid)', name: 'Bem-Casado Tradicional • Chocolate', unitPrice: 4.20, step: 20, countsFor50Rule: false, thumb: 'assets/items/pref-bem-casado.jpg', desc: 'Com papel e fita de cetim na cor do seu evento. Pedido mínimo 20 unidades por sabor.' },
    { id: 'bc-doce-leite', category: 'comemoracao', categoryLabel: 'Bem-Casados (Mín. 20 unid)', name: 'Bem-Casado Tradicional • Doce de Leite', unitPrice: 4.20, step: 20, countsFor50Rule: false, thumb: 'assets/items/pref-bem-casado.jpg', desc: 'Massa leve artesanal recheada com doce de leite cremoso, papel e fita.' },
    { id: 'bc-ninho', category: 'comemoracao', categoryLabel: 'Bem-Casados (Mín. 20 unid)', name: 'Bem-Casado Tradicional • Ninho', unitPrice: 4.20, step: 20, countsFor50Rule: false, thumb: 'assets/items/pref-bem-casado.jpg', desc: 'Recheio aveludado de brigadeiro de Ninho com embalagem completa em papel e fita.' },
    { id: 'bc-limao-siciliano', category: 'comemoracao', categoryLabel: 'Bem-Casados Especiais (Mín. 20 unid)', name: 'Bem-Casado Especial • Limão Siciliano', unitPrice: 5.20, step: 20, countsFor50Rule: false, thumb: 'assets/photos/foto-18.jpg', isRectThumb: true, desc: 'Linha Especial com creme cítrico de limão siciliano, papel fino e laço artesanal.' },
    { id: 'bc-doce-leite-nozes', category: 'comemoracao', categoryLabel: 'Bem-Casados Especiais (Mín. 20 unid)', name: 'Bem-Casado Especial • Doce de Leite c/ Nozes', unitPrice: 5.20, step: 20, countsFor50Rule: false, thumb: 'assets/photos/foto-18.jpg', isRectThumb: true, desc: 'Doce de leite nobre com nozes selecionadas, papel e fita personalizada.' },
    { id: 'bc-pistache', category: 'comemoracao', categoryLabel: 'Bem-Casados Especiais (Mín. 20 unid)', name: 'Bem-Casado Especial • Pistache', unitPrice: 5.20, step: 20, countsFor50Rule: false, thumb: 'assets/photos/foto-22.jpg', isRectThumb: true, desc: 'Recheio intenso de pistache com embalagem de gala para casamentos e eventos.' },

    { id: 'trufa-chocolate', category: 'comemoracao', categoryLabel: 'Trufas Artesanais (Mín. 25 unid)', name: 'Trufa Tradicional • Chocolate', unitPrice: 3.00, step: 25, countsFor50Rule: true, thumb: 'assets/items/pref-trufas.jpg', desc: 'Casquinha de chocolate com toque dourado e recheio trufado de chocolate.' },
    { id: 'trufa-ninho', category: 'comemoracao', categoryLabel: 'Trufas Artesanais (Mín. 25 unid)', name: 'Trufa Tradicional • Ninho', unitPrice: 3.00, step: 25, countsFor50Rule: true, thumb: 'assets/items/pref-trufas.jpg', desc: 'Trufa banhada no chocolate com interior super cremoso de leite Ninho.' },
    { id: 'trufa-cafe', category: 'comemoracao', categoryLabel: 'Trufas Artesanais (Mín. 25 unid)', name: 'Trufa Tradicional • Café', unitPrice: 3.00, step: 25, countsFor50Rule: true, thumb: 'assets/items/pref-trufas.jpg', desc: 'Ganache aromática de café envolta em casquinha fina de chocolate.' },
    { id: 'trufa-limao', category: 'comemoracao', categoryLabel: 'Trufas Artesanais (Mín. 25 unid)', name: 'Trufa Tradicional • Limão', unitPrice: 3.00, step: 25, countsFor50Rule: true, thumb: 'assets/items/pref-trufas.jpg', desc: 'Recheio refrescante de limão em casquinha crocante.' },
    { id: 'trufa-beijinho', category: 'comemoracao', categoryLabel: 'Trufas Artesanais (Mín. 25 unid)', name: 'Trufa Tradicional • Beijinho', unitPrice: 3.00, step: 25, countsFor50Rule: true, thumb: 'assets/items/pref-trufas.jpg', desc: 'Interior de coco cremoso coberto por chocolate.' },

    { id: 'cop-ninho-geleia-morango', category: 'comemoracao', categoryLabel: 'Copinhos Sobremesa (Mín. 25 unid)', name: 'Copinho • Ninho com Geleia de Morango', unitPrice: 3.00, step: 25, countsFor50Rule: true, thumb: 'assets/items/pref-copinhos.jpg', desc: 'Camadas de creme Ninho e redução artesanal de morangos frescos (acompanha colher).' },
    { id: 'cop-ninho-choc-morango', category: 'comemoracao', categoryLabel: 'Copinhos Sobremesa (Mín. 25 unid)', name: 'Copinho • Ninho, Chocolate e Morango', unitPrice: 3.00, step: 25, countsFor50Rule: true, thumb: 'assets/items/pref-copinhos.jpg', desc: 'Trio clássico com morango fresco no topo. Pedido mínimo 25 unidades.' },
    { id: 'cop-ninho-chocolate', category: 'comemoracao', categoryLabel: 'Copinhos Sobremesa (Mín. 25 unid)', name: 'Copinho • Ninho com Chocolate', unitPrice: 3.00, step: 25, countsFor50Rule: true, thumb: 'assets/photos/foto-03.jpg', isRectThumb: true, desc: 'Duo cremoso de brigadeiro de Ninho e chocolate finalizado com curls nobres.' },

    // 7. BOLOS EM ACETATO & PORTFÓLIO DE BOLOS
    { id: 'bolo-acetato-15', category: 'bolos', categoryLabel: 'Bolo em Acetato', name: 'Bolo em Acetato • 12 a 15 Fatias (1 Sabor)', unitPrice: 90.00, step: 1, countsFor50Rule: false, cakeFlavorsCount: 1, cakePool: 'acetato', thumb: 'assets/items/bolo-acetato-ninho.jpg', isRectThumb: true, desc: 'Camadas aparentes em acetato com fita, morangos/brigadeiros e decoração simples inclusa.' },
    { id: 'bolo-acetato-24', category: 'bolos', categoryLabel: 'Bolo em Acetato', name: 'Bolo em Acetato • 20 a 24 Fatias (2 Sabores)', unitPrice: 140.00, step: 1, countsFor50Rule: false, cakeFlavorsCount: 2, cakePool: 'acetato', thumb: 'assets/items/bolo-acetato-morango.jpg', isRectThumb: true, desc: 'Ideal para comemorações médias. Escolha até 2 sabores de recheio.' },
    { id: 'bolo-acetato-35', category: 'bolos', categoryLabel: 'Bolo em Acetato', name: 'Bolo em Acetato • 30 a 35 Fatias (2 Sabores)', unitPrice: 180.00, step: 1, countsFor50Rule: false, cakeFlavorsCount: 2, cakePool: 'acetato', thumb: 'assets/items/bolo-acetato-brigadeiro.jpg', isRectThumb: true, desc: 'Tamanho grande para festas. Escolha até 2 sabores de recheio.' },

    { id: 'bolo-festa-15', category: 'bolos', categoryLabel: 'Portfólio de Bolos Confeitados', name: 'Bolo Confeitado • 12 a 15 Fatias (1 Sabor)', unitPrice: 120.00, step: 1, countsFor50Rule: false, cakeFlavorsCount: 1, cakePool: 'portfolio', thumb: 'assets/cardapio/08-portfolio-bolos.jpg', isRectThumb: true, desc: 'Acabamento espatulado artístico (decoração simples inclusa; topo/papelaria à parte).' },
    { id: 'bolo-festa-24', category: 'bolos', categoryLabel: 'Portfólio de Bolos Confeitados', name: 'Bolo Confeitado • 20 a 24 Fatias (2 Sabores)', unitPrice: 170.00, step: 1, countsFor50Rule: false, cakeFlavorsCount: 2, cakePool: 'portfolio', thumb: 'assets/cardapio/08-portfolio-bolos.jpg', isRectThumb: true, desc: 'Bolo confeitado para 20 a 24 fatias com combinação de 2 sabores.' },
    { id: 'bolo-festa-35', category: 'bolos', categoryLabel: 'Portfólio de Bolos Confeitados', name: 'Bolo Confeitado • 30 a 35 Fatias (2 Sabores)', unitPrice: 210.00, step: 1, countsFor50Rule: false, cakeFlavorsCount: 2, cakePool: 'portfolio', thumb: 'assets/cardapio/08-portfolio-bolos.jpg', isRectThumb: true, desc: 'Bolo confeitado para 30 a 35 fatias com 2 sabores à escolha.' },
    { id: 'bolo-festa-55', category: 'bolos', categoryLabel: 'Portfólio de Bolos Confeitados', name: 'Bolo Confeitado • 50 a 55 Fatias (2 Sabores)', unitPrice: 330.00, step: 1, countsFor50Rule: false, cakeFlavorsCount: 2, cakePool: 'portfolio', thumb: 'assets/cardapio/08-portfolio-bolos.jpg', isRectThumb: true, desc: 'Bolo de grande porte para 50 a 55 fatias com 2 sabores.' },
    { id: 'bolo-andar-50', category: 'bolos', categoryLabel: 'Portfólio de Bolos de Andar', name: 'Bolo de 1º Andar • 40 a 50 Fatias (2 Sabores)', unitPrice: 370.00, step: 1, countsFor50Rule: false, cakeFlavorsCount: 2, cakePool: 'portfolio', thumb: 'assets/photos/foto-14.jpg', isRectThumb: true, desc: 'Bolo escultural de 2 níveis (40 a 50 fatias) para casamentos, 15 anos e grandes celebrações.' },
    { id: 'bolo-andar-70', category: 'bolos', categoryLabel: 'Portfólio de Bolos de Andar', name: 'Bolo de 1º Andar • 60 a 70 Fatias (2 Sabores)', unitPrice: 430.00, step: 1, countsFor50Rule: false, cakeFlavorsCount: 2, cakePool: 'portfolio', thumb: 'assets/photos/foto-14.jpg', isRectThumb: true, desc: 'Bolo monumental de 1º andar para 60 a 70 fatias com 2 sabores.' }
  ];

  const CATEGORY_GROUPS = [
    { key: 'favoritos', title: 'Os Favoritos de Sempre (Tradicionais)', badge: 'R$ 1,40/unid • Lotes de 25 • Mínimo 50 Doces (2 Sabores)', note: 'Combine 25 doces desta categoria com +25 de qualquer outra linha (ex.: Gourmet ou Exclusiva) ou escolha 50 todos tradicionais.' },
    { key: 'especiais', title: 'Especiais da Casa (Linha Gourmet)', badge: 'R$ 1,60 a R$ 1,80/unid • Lotes de 25 • Mínimo 50 Doces', note: 'Chocolate nobre, Nutella pura, castanhas e finalizações especiais. Pode misturar 25 Gourmet + 25 Tradicional!' },
    { key: 'exclusiva', title: 'Nossa Linha Exclusiva (Autorais)', badge: 'R$ 2,50 a R$ 3,00/unid • Lotes de 25 • Mínimo 50 Doces', note: 'Sabores autorais de alta confeitaria: Pistache, Damasco Recheado, Quebra-Queixo, Limão Siciliano e Especiarias.' },
    { key: 'arte', title: 'Arte em Açúcar (Flores Modeladas à Mão)', badge: 'R$ 3,00 a R$ 4,00/unid • Mínimo 25 Doces (1 Sabor)', note: 'Após a escolha da flor, selecione abaixo o sabor da massa do doce (pode ser qualquer sabor presente no cardápio!).' },
    { key: 'personalizada', title: 'Linha Personalizada (Batizado, 15 Anos, Casamento)', badge: 'R$ 1,80/unid • Pedido Mínimo 50 Doces (Lotes de 25)', note: 'Doces carimbados em dourado e modelados nas cores do seu evento. Informe o tema/nome e o sabor da massa.' },
    { key: 'comemoracao', title: 'Os Preferidos da Comemoração (Bem-Casados, Trufas & Copinhos)', badge: 'Bem-Casado: Mín. 20 unid • Trufas e Copinhos: Mín. 25 unid', note: 'Bem-casados já incluem papel e fita na cor do seu evento.' },
    { key: 'bolos', title: 'Bolos em Acetato & Portfólio de Bolos Festivos', badge: 'De 12 a 70 Fatias • R$ 90 a R$ 430', note: 'Decoração simples inclusa; papelaria, topo, brilhos e enfeites especiais são calculados à parte no WhatsApp.' }
  ];

  // Estado da Caixa de Encomenda
  // Cada chave no carrinho é única por item + customização (ex.: flor + sabor da massa)
  const state = {
    activeCategory: 'todos',
    searchQuery: '',
    deliveryMode: 'retirada', // 'retirada' | 'entrega'
    cart: {}, // cartKey -> { item, qty, customFlavor1, customFlavor2, customTheme }
    itemConfigs: {}, // item.id -> { flavor1, flavor2, theme }
    pixelEventsCount: 1 // PageView já disparado no head
  };

  // Inicializar configurações padrão de cada item
  MENU_ITEMS.forEach(function (item) {
    if (item.hasFlavorSelect) {
      state.itemConfigs[item.id] = {
        flavor1: 'Ninho',
        flavor2: '',
        theme: ''
      };
    } else if (item.cakeFlavorsCount) {
      const pool = item.cakePool === 'acetato' ? CAKE_FLAVORS_ACETATO : CAKE_FLAVORS_PORTFOLIO;
      state.itemConfigs[item.id] = {
        flavor1: pool[0],
        flavor2: item.cakeFlavorsCount > 1 ? pool[1] : '',
        theme: ''
      };
    }
  });

  // ==========================================================================
  // META PIXEL TRACKING HELPER (ID: 9850103268427591)
  // ==========================================================================
  function trackPixel(eventName, params, isCustom) {
    try {
      if (typeof window.fbq === 'function') {
        if (isCustom) {
          window.fbq('trackCustom', eventName, params || {});
        } else {
          window.fbq('track', eventName, params || {});
        }
        state.pixelEventsCount += 1;
        const badgeEl = document.getElementById('pixel-live-counter');
        if (badgeEl) {
          badgeEl.textContent = 'Pixel Cariri Sucré #' + PIXEL_ID + ' • ' + state.pixelEventsCount + ' eventos enviados (' + eventName + ')';
        }
      }
    } catch (err) {
      console.warn('Meta Pixel notice:', err);
    }
  }

  function formatBRL(val) {
    return 'R$ ' + val.toFixed(2).replace('.', ',');
  }

  // ==========================================================================
  // CÁLCULO E VALIDAÇÃO DAS REGRAS DO CARDÁPIO
  // Regra:
  // - Doces de festa (Favoritos, Especiais, Exclusiva, Personalizada, Arte, Trufas, Copinhos) são adicionados em lotes de 25 unidades por sabor.
  // - Quando o cliente pede doces das linhas de pedido mínimo 50 (Favoritos, Especiais, Exclusiva, Personalizada),
  //   a soma total de doces precisa ser de no mínimo 50 unidades (ex.: 25 de uma categoria + 25 de outra categoria = 50 doces / 2 sabores, ou 50 da mesma categoria).
  // - Linha Personalizada exige no mínimo 50 doces personalizados (ou 2 lotes de 25).
  // ==========================================================================
  function getCartSummary() {
    const entries = Object.values(state.cart);
    let totalValue = 0;
    let totalDoces50Pool = 0; // Soma de doces em lotes de 25
    let totalPersonalizados = 0;
    let totalBemCasados = 0;
    let totalCakes = 0;
    let totalUnitsAll = 0;
    let hasItemsFromStrict50Categories = false;

    entries.forEach(function (entry) {
      const sub = entry.qty * entry.item.unitPrice;
      totalValue += sub;
      totalUnitsAll += entry.qty;

      if (entry.item.countsFor50Rule) {
        totalDoces50Pool += entry.qty;
      }
      if (['favoritos', 'especiais', 'exclusiva', 'personalizada'].indexOf(entry.item.category) !== -1) {
        hasItemsFromStrict50Categories = true;
      }
      if (entry.item.category === 'personalizada') {
        totalPersonalizados += entry.qty;
      }
      if (entry.item.id.indexOf('bc-') === 0) {
        totalBemCasados += entry.qty;
      }
      if (entry.item.category === 'bolos') {
        totalCakes += entry.qty;
      }
    });

    const isEmpty = entries.length === 0;
    let isValidOrder = !isEmpty;
    let validationMessage = '';

    if (isEmpty) {
      isValidOrder = false;
      validationMessage = 'Adicione pelo menos 2 lotes de 25 doces (50 doces no total) ou escolha seu bolo/bem-casado para agendar.';
    } else if (totalPersonalizados > 0 && totalPersonalizados < 50) {
      isValidOrder = false;
      validationMessage = 'A Linha Personalizada possui pedido mínimo de 50 doces (você selecionou ' + totalPersonalizados + '). Adicione mais +25 doces personalizados.';
    } else if (hasItemsFromStrict50Categories && totalDoces50Pool < 50) {
      const faltam = 50 - totalDoces50Pool;
      isValidOrder = false;
      validationMessage = 'Você selecionou ' + totalDoces50Pool + ' doces (1 sabor). O pedido mínimo é de 50 doces (2 lotes de 25) — adicione mais +' + faltam + ' doces de qualquer categoria (Tradicional, Gourmet, Exclusiva ou Flor)!';
    } else {
      isValidOrder = true;
      if (totalDoces50Pool >= 50) {
        const numLotes = Math.floor(totalDoces50Pool / 25);
        validationMessage = '✓ Regra atendida: ' + totalDoces50Pool + ' doces (' + numLotes + ' lotes de 25 unid) prontos para agendamento!';
      } else {
        validationMessage = '✓ Itens selecionados respeitando a quantidade mínima do cardápio. Pronto para agendar!';
      }
    }

    return {
      entries: entries,
      totalValue: totalValue,
      totalDoces50Pool: totalDoces50Pool,
      totalPersonalizados: totalPersonalizados,
      totalBemCasados: totalBemCasados,
      totalCakes: totalCakes,
      totalUnitsAll: totalUnitsAll,
      isEmpty: isEmpty,
      isValidOrder: isValidOrder,
      validationMessage: validationMessage
    };
  }

  function buildCartKey(item, cfg) {
    if (item.hasFlavorSelect) {
      const f1 = (cfg && cfg.flavor1) ? cfg.flavor1 : 'Ninho';
      const th = (cfg && cfg.theme) ? cfg.theme.trim() : '';
      return item.id + '__' + f1 + (th ? '__' + th : '');
    }
    if (item.cakeFlavorsCount) {
      const f1 = (cfg && cfg.flavor1) ? cfg.flavor1 : 'Ninho';
      const f2 = (item.cakeFlavorsCount > 1 && cfg && cfg.flavor2) ? cfg.flavor2 : '';
      return item.id + '__' + f1 + (f2 ? '__' + f2 : '');
    }
    return item.id;
  }

  function getItemTotalQtyInCart(itemId) {
    let sum = 0;
    Object.values(state.cart).forEach(function (entry) {
      if (entry.item.id === itemId) {
        sum += entry.qty;
      }
    });
    return sum;
  }

  // Adicionar lote (+25 doces, +20 bem-casados ou +1 bolo)
  function addBatchToCart(itemId) {
    const item = MENU_ITEMS.find(function (x) { return x.id === itemId; });
    if (!item) return;

    const cfg = state.itemConfigs[item.id] || {};
    const key = buildCartKey(item, cfg);

    if (!state.cart[key]) {
      state.cart[key] = {
        key: key,
        item: item,
        qty: 0,
        customFlavor1: cfg.flavor1 || '',
        customFlavor2: (item.cakeFlavorsCount > 1) ? (cfg.flavor2 || '') : '',
        customTheme: cfg.theme ? cfg.theme.trim() : ''
      };
    }
    state.cart[key].qty += item.step;

    const addedValue = item.step * item.unitPrice;
    trackPixel('AddToCart', {
      content_name: item.name,
      content_category: item.categoryLabel,
      content_ids: [item.id],
      content_type: 'product',
      value: Number(addedValue.toFixed(2)),
      currency: 'BRL',
      num_items: item.step
    });

    renderAll();
  }

  function changeCartEntryQty(cartKey, deltaSteps) {
    const entry = state.cart[cartKey];
    if (!entry) return;
    const nextQty = entry.qty + deltaSteps * entry.item.step;
    if (nextQty <= 0) {
      delete state.cart[cartKey];
    } else {
      entry.qty = nextQty;
      if (deltaSteps > 0) {
        trackPixel('AddToCart', {
          content_name: entry.item.name,
          content_category: entry.item.categoryLabel,
          content_ids: [entry.item.id],
          content_type: 'product',
          value: Number((entry.item.step * entry.item.unitPrice).toFixed(2)),
          currency: 'BRL',
          num_items: entry.item.step
        });
      }
    }
    renderAll();
  }

  function removeOneBatchByItemId(itemId) {
    // Encontra a última entrada desse itemId no carrinho e reduz 1 lote
    const keys = Object.keys(state.cart).filter(function (k) {
      return state.cart[k].item.id === itemId;
    });
    if (keys.length === 0) return;
    const targetKey = keys[keys.length - 1];
    changeCartEntryQty(targetKey, -1);
  }

  // Combos prontos de 1 clique (respeitando 25+25=50 ou 100 doces)
  function applyPresetCombo(comboType) {
    if (comboType === 'misto50') {
      // 25 Tradicional + 25 Gourmet = 50 doces
      addBatchToCart('fav-brigadeiro');
      addBatchToCart('esp-ninho-nutella');
    } else if (comboType === 'tradicional50') {
      // 25 Brigadeiro + 25 Beijinho = 50 todos tradicionais
      addBatchToCart('fav-brigadeiro');
      addBatchToCart('fav-beijinho');
    } else if (comboType === 'festa100') {
      // 100 doces (4 sabores de 25)
      addBatchToCart('fav-brigadeiro');
      addBatchToCart('esp-ninho-nutella');
      addBatchToCart('esp-ferrero-rocher');
      addBatchToCart('exc-quebra-queixo');
    }
    const menuEl = document.getElementById('atelie-encomendas');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ==========================================================================
  // RENDERIZAÇÃO DO CARDÁPIO INTERATIVO E RASTREADOR DE LOTES DE 25
  // ==========================================================================
  function renderBoxTracker(summary) {
    const chipEl = document.getElementById('tracker-status-chip');
    const msgEl = document.getElementById('tracker-status-msg');
    const slotsEl = document.getElementById('tracker-slots-container');

    if (!chipEl || !msgEl || !slotsEl) return;

    const numLotes25 = Math.floor(summary.totalDoces50Pool / 25);

    if (summary.isValidOrder) {
      chipEl.textContent = '✓ Pedido Mínimo Atingido (' + summary.totalUnitsAll + ' unid)';
      chipEl.className = 'box-tracker__status-chip box-tracker__status-chip--ready';
    } else if (summary.totalDoces50Pool === 25) {
      chipEl.textContent = '1 de 2 Lotes (25 / 50 Doces)';
      chipEl.className = 'box-tracker__status-chip';
    } else {
      chipEl.textContent = 'Mínimo: 50 Doces (2 Lotes de 25)';
      chipEl.className = 'box-tracker__status-chip';
    }

    msgEl.textContent = summary.validationMessage;

    // Renderizar slots visuais de 25 doces
    let slotsHtml = '';
    const slotsToShow = Math.max(2, numLotes25 + 1);
    let slotIndex = 0;

    summary.entries.forEach(function (entry) {
      if (entry.item.step === 25) {
        const batches = Math.floor(entry.qty / 25);
        for (let b = 0; b < batches; b++) {
          slotIndex++;
          slotsHtml += '<span class="slot-chip slot-chip--filled">Lote ' + slotIndex + ': 25x ' + escapeHtml(entry.item.name) + '</span>';
        }
      } else {
        slotsHtml += '<span class="slot-chip slot-chip--filled">' + entry.qty + 'x ' + escapeHtml(entry.item.name) + '</span>';
      }
    });

    while (slotIndex < slotsToShow && slotIndex < 4) {
      slotIndex++;
      const label = slotIndex <= 2 ? 'Lote ' + slotIndex + ' (25 unid • Obrigatório p/ 50)' : 'Lote Extra ' + slotIndex + ' (+25 unid)';
      slotsHtml += '<span class="slot-chip">' + label + '</span>';
    }

    slotsEl.innerHTML = slotsHtml;
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderMenuCatalog() {
    const container = document.getElementById('menu-catalog-root');
    if (!container) return;

    const q = state.searchQuery.trim().toLowerCase();
    let html = '';

    CATEGORY_GROUPS.forEach(function (group) {
      if (state.activeCategory !== 'todos' && state.activeCategory !== group.key) {
        return;
      }

      const items = MENU_ITEMS.filter(function (item) {
        if (item.category !== group.key) return false;
        if (!q) return true;
        return (
          item.name.toLowerCase().indexOf(q) !== -1 ||
          item.desc.toLowerCase().indexOf(q) !== -1 ||
          item.categoryLabel.toLowerCase().indexOf(q) !== -1
        );
      });

      if (items.length === 0) return;

      html += '<section class="menu-group" data-group="' + group.key + '">';
      html += '  <div class="menu-group__header">';
      html += '    <div class="menu-group__title-wrap">';
      html += '      <h3 class="menu-group__title">' + escapeHtml(group.title) + '</h3>';
      html += '      <span class="menu-group__rule-badge">' + escapeHtml(group.badge) + '</span>';
      html += '    </div>';
      html += '    <p class="menu-group__note">' + escapeHtml(group.note) + '</p>';
      html += '  </div>';
      html += '  <div class="product-grid">';

      items.forEach(function (item) {
        const qtyInCart = getItemTotalQtyInCart(item.id);
        const batchPrice = item.unitPrice * item.step;
        const cfg = state.itemConfigs[item.id] || {};
        const cardClass = qtyInCart > 0 ? 'product-card product-card--in-cart' : 'product-card';
        const thumbClass = item.isRectThumb ? 'product-card__thumb product-card__thumb--rect' : 'product-card__thumb';

        html += '<article class="' + cardClass + '" data-item-id="' + item.id + '">';
        html += '  <div>';
        html += '    <div class="product-card__top">';
        html += '      <img src="' + escapeHtml(item.thumb) + '" alt="' + escapeHtml(item.name) + '" class="' + thumbClass + '" loading="lazy" />';
        html += '      <div class="product-card__info">';
        html += '        <span class="product-card__cat-label">' + escapeHtml(item.categoryLabel) + '</span>';
        html += '        <h4 class="product-card__name">' + escapeHtml(item.name) + '</h4>';
        html += '        <p class="product-card__desc">' + escapeHtml(item.desc) + '</p>';
        html += '      </div>';
        html += '    </div>';

        // Seletores especiais para Arte em Açúcar, Personalizados e Bolos
        if (item.hasFlavorSelect || item.hasThemeInput || item.cakeFlavorsCount) {
          html += '    <div class="product-card__config">';

          if (item.hasFlavorSelect) {
            html += '      <label class="config-label">Sabor da massa do doce (qualquer sabor do cardápio):';
            html += '        <select class="config-select js-config-flavor1" data-item-id="' + item.id + '">';
            ALL_SWEET_FLAVORS.forEach(function (flv) {
              const sel = cfg.flavor1 === flv ? ' selected' : '';
              html += '<option value="' + escapeHtml(flv) + '"' + sel + '>' + escapeHtml(flv) + '</option>';
            });
            html += '        </select>';
            html += '      </label>';
          }

          if (item.hasThemeInput) {
            html += '      <label class="config-label">Gravação / Nome / Cor desejada:';
            html += '        <input type="text" class="config-input js-config-theme" data-item-id="' + item.id + '" placeholder="Ex.: 15 anos Maria • Lilás e Dourado" value="' + escapeHtml(cfg.theme || '') + '" maxlength="80" />';
            html += '      </label>';
          }

          if (item.cakeFlavorsCount) {
            const pool = item.cakePool === 'acetato' ? CAKE_FLAVORS_ACETATO : CAKE_FLAVORS_PORTFOLIO;
            html += '      <label class="config-label">1º Sabor do Bolo:';
            html += '        <select class="config-select js-config-flavor1" data-item-id="' + item.id + '">';
            pool.forEach(function (flv) {
              const sel = cfg.flavor1 === flv ? ' selected' : '';
              html += '<option value="' + escapeHtml(flv) + '"' + sel + '>' + escapeHtml(flv) + '</option>';
            });
            html += '        </select>';
            html += '      </label>';

            if (item.cakeFlavorsCount > 1) {
              html += '      <label class="config-label">2º Sabor do Bolo (ou repita para sabor único):';
              html += '        <select class="config-select js-config-flavor2" data-item-id="' + item.id + '">';
              pool.forEach(function (flv) {
                const sel = cfg.flavor2 === flv ? ' selected' : '';
                html += '<option value="' + escapeHtml(flv) + '"' + sel + '>' + escapeHtml(flv) + '</option>';
              });
              html += '        </select>';
              html += '      </label>';
            }
          }

          html += '    </div>';
        }

        html += '  </div>';

        // Rodapé de preço e botão de lote (+25, +20 ou +1)
        html += '  <div class="product-card__bottom">';
        html += '    <div class="product-card__pricing">';
        if (item.step > 1) {
          html += '      <span class="product-card__unit-price">' + formatBRL(item.unitPrice) + ' <small style="font-weight:500;font-size:0.74rem;color:var(--ink-muted)">/unid</small></span>';
          html += '      <span class="product-card__batch-price">Lote ' + item.step + ' unid = ' + formatBRL(batchPrice) + '</span>';
        } else {
          html += '      <span class="product-card__unit-price">' + formatBRL(item.unitPrice) + '</span>';
          html += '      <span class="product-card__batch-price">Decoração simples inclusa</span>';
        }
        html += '    </div>';

        html += '    <div class="qty-control">';
        if (qtyInCart > 0) {
          html += '      <div class="qty-stepper">';
          html += '        <button type="button" class="qty-stepper__btn js-sub-item" data-item-id="' + item.id + '" aria-label="Remover ' + item.step + ' unidades">−</button>';
          html += '        <span class="qty-stepper__val">' + qtyInCart + (item.step > 1 ? ' un' : ' bolo') + '</span>';
          html += '        <button type="button" class="qty-stepper__btn js-add-item" data-item-id="' + item.id + '" aria-label="Adicionar mais ' + item.step + ' unidades">+</button>';
          html += '      </div>';
        } else {
          const btnLabel = item.step > 1 ? '+ ' + item.step + ' doces' : '+ Adicionar Bolo';
          html += '      <button type="button" class="btn-add-batch js-add-item" data-item-id="' + item.id + '">' + btnLabel + '</button>';
        }
        html += '    </div>';
        html += '  </div>';
        html += '</article>';
      });

      html += '  </div>';
      html += '</section>';
    });

    if (!html) {
      html = '<div style="padding:36px;text-align:center;background:var(--bg-card);border:1px solid var(--border-strong);border-radius:var(--radius-md);">Nenhum doce ou bolo encontrado para <strong>"' + escapeHtml(state.searchQuery) + '"</strong>. Limpe a busca para ver todas as linhas do cardápio.</div>';
    }

    container.innerHTML = html;
  }

  function renderFloatingAndDrawer(summary) {
    // Header Badge & Floating Bar
    const headerBadge = document.getElementById('header-cart-badge');
    const floatBar = document.querySelector('.floating-order-bar');
    const floatCount = document.getElementById('float-bar-count');
    const floatTotal = document.getElementById('float-bar-total');
    const floatHint = document.getElementById('float-bar-hint');
    const drawerAlert = document.getElementById('drawer-rule-alert');
    const drawerList = document.getElementById('drawer-cart-list');
    const drawerTotal = document.getElementById('drawer-total-val');
    const submitBtn = document.getElementById('btn-submit-whatsapp');

    if (floatBar) {
      floatBar.classList.toggle('floating-order-bar--visible', summary.totalUnitsAll > 0);
    }

    if (headerBadge) {
      headerBadge.textContent = summary.totalUnitsAll + ' un · ' + formatBRL(summary.totalValue);
    }
    if (floatCount) {
      floatCount.textContent = summary.totalUnitsAll + ' itens na caixa';
    }
    if (floatTotal) {
      floatTotal.textContent = formatBRL(summary.totalValue);
    }
    if (floatHint) {
      floatHint.textContent = summary.validationMessage;
    }

    if (drawerAlert) {
      drawerAlert.textContent = summary.validationMessage;
      drawerAlert.className = summary.isValidOrder
        ? 'drawer-alert drawer-alert--ok'
        : 'drawer-alert drawer-alert--warn';
    }

    if (drawerTotal) {
      drawerTotal.textContent = formatBRL(summary.totalValue);
    }

    if (submitBtn) {
      submitBtn.disabled = !summary.isValidOrder;
    }

    if (drawerList) {
      if (summary.entries.length === 0) {
        drawerList.innerHTML = '<div style="padding:20px;text-align:center;color:var(--ink-muted);background:var(--bg-card);border:1px dashed var(--border-strong);border-radius:var(--radius-md);font-size:0.86rem;">Sua caixa ainda está vazia. Escolha lotes de 25 doces (mínimo 50 doces / 2 sabores) ou adicione um bolo no cardápio.</div>';
      } else {
        let listHtml = '';
        summary.entries.forEach(function (entry) {
          const sub = entry.qty * entry.item.unitPrice;
          let details = [];
          if (entry.customFlavor1) {
            if (entry.item.cakeFlavorsCount) {
              details.push('Sabor: ' + entry.customFlavor1 + (entry.customFlavor2 ? ' + ' + entry.customFlavor2 : ''));
            } else {
              details.push('Massa: ' + entry.customFlavor1);
            }
          }
          if (entry.customTheme) {
            details.push('Personalização: ' + entry.customTheme);
          }

          listHtml += '<div class="cart-item-row">';
          listHtml += '  <div class="cart-item-row__info">';
          listHtml += '    <div class="cart-item-row__title">' + entry.qty + 'x ' + escapeHtml(entry.item.name) + '</div>';
          listHtml += '    <div class="cart-item-row__meta">' + escapeHtml(entry.item.categoryLabel) + (details.length ? ' • ' + escapeHtml(details.join(' | ')) : '') + '</div>';
          listHtml += '    <div class="cart-item-row__meta">' + formatBRL(entry.item.unitPrice) + '/unid → <strong>' + formatBRL(sub) + '</strong></div>';
          listHtml += '  </div>';
          listHtml += '  <div class="cart-item-row__right">';
          listHtml += '    <div class="qty-stepper">';
          listHtml += '      <button type="button" class="qty-stepper__btn js-drawer-step" data-cart-key="' + escapeHtml(entry.key) + '" data-delta="-1">−</button>';
          listHtml += '      <span class="qty-stepper__val">' + entry.qty + '</span>';
          listHtml += '      <button type="button" class="qty-stepper__btn js-drawer-step" data-cart-key="' + escapeHtml(entry.key) + '" data-delta="1">+</button>';
          listHtml += '    </div>';
          listHtml += '  </div>';
          listHtml += '</div>';
        });
        drawerList.innerHTML = listHtml;
      }
    }
  }

  function renderAll() {
    const summary = getCartSummary();
    renderBoxTracker(summary);
    renderMenuCatalog();
    renderFloatingAndDrawer(summary);
  }

  // ==========================================================================
  // AGENDAMENTO COM 48 HORAS DE ANTECEDÊNCIA & ENVIO DIRETO PRO WHATSAPP
  // ==========================================================================
  function getMinAllowedDateObj() {
    const now = new Date();
    // 48 horas completas à frente -> mínimo 2 dias a partir de hoje
    const min = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
    return min;
  }

  function toISODateString(d) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return yyyy + '-' + mm + '-' + dd;
  }

  function formatDateBR(isoStr) {
    if (!isoStr) return '';
    const parts = isoStr.split('-');
    if (parts.length !== 3) return isoStr;
    return parts[2] + '/' + parts[1] + '/' + parts[0];
  }

  function initSchedulingControls() {
    const dateInput = document.getElementById('order-date');
    const quickContainer = document.getElementById('quick-dates-root');
    if (!dateInput) return;

    const minDate = getMinAllowedDateObj();
    const minIso = toISODateString(minDate);
    dateInput.min = minIso;
    if (!dateInput.value || dateInput.value < minIso) {
      dateInput.value = minIso;
    }

    if (quickContainer) {
      const d2 = new Date(minDate);
      const d3 = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate() + 1);
      const d5 = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate() + 3);

      const pills = [
        { label: '+48h (' + formatDateBR(toISODateString(d2)).slice(0, 5) + ')', iso: toISODateString(d2) },
        { label: 'Daqui a 3 dias (' + formatDateBR(toISODateString(d3)).slice(0, 5) + ')', iso: toISODateString(d3) },
        { label: 'Daqui a 5 dias (' + formatDateBR(toISODateString(d5)).slice(0, 5) + ')', iso: toISODateString(d5) }
      ];

      quickContainer.innerHTML = pills.map(function (p) {
        return '<button type="button" class="quick-date-pill js-quick-date" data-iso="' + p.iso + '">' + p.label + '</button>';
      }).join('');
    }
  }

  function setDeliveryMode(mode) {
    state.deliveryMode = mode;
    const btnRetirada = document.getElementById('mode-btn-retirada');
    const btnEntrega = document.getElementById('mode-btn-entrega');
    const addressBlock = document.getElementById('delivery-address-fields');

    if (btnRetirada && btnEntrega) {
      btnRetirada.className = mode === 'retirada' ? 'mode-option mode-option--active' : 'mode-option';
      btnEntrega.className = mode === 'entrega' ? 'mode-option mode-option--active' : 'mode-option';
    }
    if (addressBlock) {
      addressBlock.style.display = mode === 'entrega' ? 'flex' : 'none';
    }
  }

  function openCheckoutDrawer() {
    const drawer = document.getElementById('checkout-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer && backdrop) {
      drawer.classList.add('checkout-drawer--open');
      backdrop.classList.add('drawer-backdrop--open');
    }

    const summary = getCartSummary();
    if (!summary.isEmpty) {
      trackPixel('InitiateCheckout', {
        value: Number(summary.totalValue.toFixed(2)),
        currency: 'BRL',
        num_items: summary.totalUnitsAll,
        content_type: 'product',
        contents: summary.entries.map(function (e) {
          return { id: e.item.id, quantity: e.qty, item_price: e.item.unitPrice };
        })
      });
    }
  }

  function closeCheckoutDrawer() {
    const drawer = document.getElementById('checkout-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('checkout-drawer--open');
      backdrop.classList.remove('drawer-backdrop--open');
    }
  }

  function handleSendWhatsAppOrder(e) {
    if (e) e.preventDefault();
    const summary = getCartSummary();
    const errEl = document.getElementById('checkout-form-error');

    function showFormError(msg) {
      if (errEl) {
        errEl.textContent = msg;
        errEl.style.display = 'block';
      }
    }

    if (!summary.isValidOrder) {
      showFormError(summary.validationMessage);
      return;
    }

    const nameVal = (document.getElementById('customer-name').value || '').trim();
    const phoneVal = (document.getElementById('customer-phone').value || '').trim();
    const dateVal = (document.getElementById('order-date').value || '').trim();
    const shiftVal = (document.getElementById('order-shift').value || '').trim();
    const bairroVal = (document.getElementById('customer-bairro').value || '').trim();
    const addrVal = (document.getElementById('customer-address').value || '').trim();
    const notesVal = (document.getElementById('customer-notes').value || '').trim();

    if (!nameVal) {
      showFormError('Por favor, informe o seu nome para identificarmos a encomenda.');
      document.getElementById('customer-name').focus();
      return;
    }

    const minIso = toISODateString(getMinAllowedDateObj());
    if (!dateVal || dateVal < minIso) {
      showFormError('Só aceitamos encomendas com no mínimo 48 horas de antecedência. Selecione uma data a partir de ' + formatDateBR(minIso) + '.');
      document.getElementById('order-date').focus();
      return;
    }

    if (state.deliveryMode === 'entrega' && (!bairroVal || !addrVal)) {
      showFormError('Para Entrega (Delivery), preencha o Bairro e o Endereço completo.');
      document.getElementById('customer-bairro').focus();
      return;
    }

    if (errEl) errEl.style.display = 'none';

    // Disparar eventos automáticos de conversão para otimização de compras no Facebook Ads
    const contentsPayload = summary.entries.map(function (entry) {
      return {
        id: entry.item.id,
        quantity: entry.qty,
        item_price: entry.item.unitPrice
      };
    });

    trackPixel('Schedule', {
      value: Number(summary.totalValue.toFixed(2)),
      currency: 'BRL',
      scheduled_date: dateVal,
      delivery_mode: state.deliveryMode
    });

    trackPixel('Lead', {
      content_name: 'Encomenda Cariri Sucré via Site',
      value: Number(summary.totalValue.toFixed(2)),
      currency: 'BRL'
    });

    trackPixel('Purchase', {
      value: Number(summary.totalValue.toFixed(2)),
      currency: 'BRL',
      content_type: 'product',
      num_items: summary.totalUnitsAll,
      contents: contentsPayload
    });

    // Montar mensagem estruturada para (88) 99962-0935
    const lines = [];
    lines.push('*NOVA ENCOMENDA — CARIRI SUCRÉ*');
    lines.push('----------------------------------');
    lines.push('*Cliente:* ' + nameVal);
    if (phoneVal) lines.push('*WhatsApp:* ' + phoneVal);
    lines.push('*Modalidade:* ' + (state.deliveryMode === 'entrega' ? 'ENTREGA (Delivery)' : 'RETIRADA NO ATELIÊ (Juazeiro do Norte - CE)'));
    if (state.deliveryMode === 'entrega') {
      lines.push('*Bairro:* ' + bairroVal);
      lines.push('*Endereço:* ' + addrVal);
    }
    lines.push('*Data Agendada (>= 48h):* ' + formatDateBR(dateVal));
    lines.push('*Turno Preferencial:* ' + shiftVal + ' _(horário exato a combinar aqui no WhatsApp)_');
    lines.push('----------------------------------');
    lines.push('*ITENS DA ENCOMENDA:*');

    summary.entries.forEach(function (entry, idx) {
      const sub = entry.qty * entry.item.unitPrice;
      let extra = '';
      if (entry.customFlavor1) {
        if (entry.item.cakeFlavorsCount) {
          extra += ' [Sabores: ' + entry.customFlavor1 + (entry.customFlavor2 ? ' + ' + entry.customFlavor2 : '') + ']';
        } else {
          extra += ' [Sabor da massa: ' + entry.customFlavor1 + ']';
        }
      }
      if (entry.customTheme) {
        extra += ' [Personalização: ' + entry.customTheme + ']';
      }
      lines.push((idx + 1) + '. *' + entry.qty + 'x ' + entry.item.name + '*' + extra + ' — ' + formatBRL(sub));
    });

    lines.push('----------------------------------');
    if (summary.totalDoces50Pool > 0) {
      lines.push('*Total de Doces em Lotes de 25:* ' + summary.totalDoces50Pool + ' doces');
    }
    lines.push('*VALOR TOTAL DOS ITENS:* *' + formatBRL(summary.totalValue) + '*');
    if (state.deliveryMode === 'entrega') {
      lines.push('_(+ taxa de entrega a confirmar conforme o bairro)_');
    }
    if (notesVal) {
      lines.push('*Observações / Forminhas:* ' + notesVal);
    }
    lines.push('');
    lines.push('Olá! Montei meu pedido pelo site oficial da *Cariri Sucré* (respeitando o prazo mínimo de 48h) e gostaria de combinar o horário e confirmar o pagamento.');

    const msgText = lines.join('\n');
    const waUrl = 'https://wa.me/' + WHATSAPP_PHONE + '?text=' + encodeURIComponent(msgText);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  // ==========================================================================
  // EVENT DELEGATION & INTERAÇÕES GERAIS
  // ==========================================================================
  function bindEvents() {
    document.addEventListener('click', function (e) {
      const addBtn = e.target.closest('.js-add-item');
      if (addBtn) {
        addBatchToCart(addBtn.getAttribute('data-item-id'));
        return;
      }

      const subBtn = e.target.closest('.js-sub-item');
      if (subBtn) {
        removeOneBatchByItemId(subBtn.getAttribute('data-item-id'));
        return;
      }

      const drawerStepBtn = e.target.closest('.js-drawer-step');
      if (drawerStepBtn) {
        const key = drawerStepBtn.getAttribute('data-cart-key');
        const delta = parseInt(drawerStepBtn.getAttribute('data-delta'), 10);
        changeCartEntryQty(key, delta);
        return;
      }

      const catTab = e.target.closest('.js-cat-tab');
      if (catTab) {
        const cat = catTab.getAttribute('data-cat');
        state.activeCategory = cat;
        document.querySelectorAll('.js-cat-tab').forEach(function (btn) {
          btn.classList.toggle('cat-tab--active', btn.getAttribute('data-cat') === cat);
        });
        trackPixel('ViewContent', {
          content_name: 'Categoria: ' + cat,
          content_category: cat
        });
        renderMenuCatalog();
        return;
      }

      const comboBtn = e.target.closest('.js-apply-combo');
      if (comboBtn) {
        applyPresetCombo(comboBtn.getAttribute('data-combo'));
        return;
      }

      const openDrawerBtn = e.target.closest('.js-open-drawer');
      if (openDrawerBtn) {
        openCheckoutDrawer();
        return;
      }

      const closeDrawerBtn = e.target.closest('.js-close-drawer');
      if (closeDrawerBtn || e.target.id === 'drawer-backdrop') {
        closeCheckoutDrawer();
        return;
      }

      const modeBtn = e.target.closest('.js-delivery-mode');
      if (modeBtn) {
        setDeliveryMode(modeBtn.getAttribute('data-mode'));
        return;
      }

      const quickDateBtn = e.target.closest('.js-quick-date');
      if (quickDateBtn) {
        const iso = quickDateBtn.getAttribute('data-iso');
        const dateInput = document.getElementById('order-date');
        if (dateInput && iso) {
          dateInput.value = iso;
        }
        return;
      }

      // Filtro da galeria "Vida no Ateliê"
      const galBtn = e.target.closest('.js-gal-filter');
      if (galBtn) {
        const filter = galBtn.getAttribute('data-filter');
        document.querySelectorAll('.js-gal-filter').forEach(function (b) {
          b.classList.toggle('gal-btn--active', b.getAttribute('data-filter') === filter);
        });
        document.querySelectorAll('.js-atelier-tile').forEach(function (tile) {
          const tag = tile.getAttribute('data-tag');
          tile.style.display = (filter === 'todos' || tag === filter) ? '' : 'none';
        });
        return;
      }

      // Lightbox de fotos e lâminas do cardápio
      const zoomTrigger = e.target.closest('.js-zoom-image');
      if (zoomTrigger) {
        const src = zoomTrigger.getAttribute('data-full-src');
        const title = zoomTrigger.getAttribute('data-title') || 'Cariri Sucré';
        const lb = document.getElementById('lightbox-modal');
        const lbImg = document.getElementById('lightbox-img');
        if (lb && lbImg && src) {
          lbImg.src = src;
          lbImg.alt = title;
          lb.classList.add('lightbox--open');
          trackPixel('ViewContent', { content_name: title, content_category: 'Galeria / Cardápio' });
        }
        return;
      }

      if (e.target.closest('.js-close-lightbox') || e.target.id === 'lightbox-modal') {
        const lb = document.getElementById('lightbox-modal');
        if (lb) lb.classList.remove('lightbox--open');
      }
    });

    // Mudança de sabor de Arte em Açúcar / Bolo / Personalizado
    document.addEventListener('change', function (e) {
      if (e.target.classList.contains('js-config-flavor1')) {
        const id = e.target.getAttribute('data-item-id');
        if (!state.itemConfigs[id]) state.itemConfigs[id] = {};
        state.itemConfigs[id].flavor1 = e.target.value;
        trackPixel('CustomizeProduct', { content_ids: [id], flavor: e.target.value }, true);
      } else if (e.target.classList.contains('js-config-flavor2')) {
        const id = e.target.getAttribute('data-item-id');
        if (!state.itemConfigs[id]) state.itemConfigs[id] = {};
        state.itemConfigs[id].flavor2 = e.target.value;
      }
    });

    document.addEventListener('input', function (e) {
      if (e.target.classList.contains('js-config-theme')) {
        const id = e.target.getAttribute('data-item-id');
        if (!state.itemConfigs[id]) state.itemConfigs[id] = {};
        state.itemConfigs[id].theme = e.target.value;
      } else if (e.target.id === 'menu-search-input') {
        state.searchQuery = e.target.value;
        renderMenuCatalog();
      }
    });

    const formEl = document.getElementById('checkout-order-form');
    if (formEl) {
      formEl.addEventListener('submit', handleSendWhatsAppOrder);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSchedulingControls();
    bindEvents();
    renderAll();
  });
})();
