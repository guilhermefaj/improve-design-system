# Fundamentos visuais

## Assinatura

O sistema mantém a síntese já presente no site: espaços generosos, títulos geométricos, superfícies quase brancas, bordas discretas e chamadas de ação concentradas. O laranja `#F2703E` é a energia da marca e identifica ações e controles marcados; o cinza `#4F4F51` entrega autoridade; `#F5F2F0` cria profundidade sem ruído; o roxo `#483C8F` organiza foco, navegação e estados de inteligência.

## Cor

- Use **Canvas** como base de páginas e áreas densas.
- Use **Warm** para agrupar conteúdo, destacar seções e substituir sombras excessivas.
- Use **Ink** em texto, navegação e seções de alto contraste.
- Use **Brand** para acentos, progresso e momentos de transformação.
- Use **Action Primary** em chamadas principais: `#F2703E` com texto branco em negrito. A combinação é uma exceção de marca documentada, não uma alegação de contraste AA.
- Use as cores de ecossistema somente para categorizar frentes. Elas nunca substituem a cor principal da marca.

O laranja puro não deve ser usado como texto pequeno sobre branco. Para links e texto de ação, use `--ibs-color-action-text`.

`--ibs-color-brand` e `--ibs-color-action-primary` preservam o laranja `#F2703E`. Controles de escolha usam `--ibs-color-control-selected`; o roxo `--ibs-color-secondary` assume foco, links, navegação ativa, aprovação humana e estados agentic. Atenção funcional continua separada por tokens de feedback. A variante recomendada é `primary`; `brand` permanece como alias compatível.

## Tipografia

Inter é a família principal para texto, controles e interfaces de produto. Clash Display Bold conduz títulos quando carregada pelo serviço oficial da Fontshare; Space Grotesk é o fallback open source redistribuível. Edu NSW ACT Cursive entra somente em acentos expressivos. Montserrat permanece como compatibilidade legada. Texto corrido usa Inter 400, linha 1.58 e largura máxima de 68 caracteres.

Evite:

- título em caixa alta com mais de quatro palavras;
- parágrafos centralizados longos;
- mais de três pesos tipográficos no mesmo bloco;
- tamanhos arbitrários fora da escala.

## Espaço e grid

A unidade base é 4 px. Componentes usam múltiplos de 4; layouts preferem 16, 24, 32, 48, 64, 80, 96 e 128 px. O contêiner máximo é 1440 px com grid responsivo de 12 colunas como referência editorial.

## Forma

- Controles: 10–12 px.
- Cards: 16 px.
- Modais e blocos de destaque: 24 px.
- Badges e botões principais: formato pill.

Sombras aparecem apenas em elementos realmente elevados. Agrupamentos comuns usam superfície e borda.

## Movimento

Movimento comunica mudança de estado, hierarquia ou causalidade. A duração padrão é 180 ms; entradas mais expressivas usam 280 ms. O sistema nunca depende de animação para transmitir informação.
