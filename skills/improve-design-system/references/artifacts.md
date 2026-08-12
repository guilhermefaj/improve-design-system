# Claude Artifacts

## Construção

- Começar por um starter em `packages/artifact-kit/starters/` ou executar `improve-ds artifact --recipe <recipe>`.
- Manter o protótipo em um arquivo React autocontido.
- Usar React e APIs do navegador; não depender de CDN, fonte remota ou fetch externo para a renderização básica.
- Incluir tokens como CSS inline e usar a marca SVG de `assets/improve-mark.svg`.
- Implementar estados vazios, carregamento, erro e recuperação quando aplicáveis.

## Migração

Artifacts são protótipos. Para produção, executar `improve-ds init`, adicionar os componentes necessários e transferir o comportamento para o código source-owned.
