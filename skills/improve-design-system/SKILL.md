---
name: improve-design-system
description: Crie, adapte ou revise interfaces React, landing pages, dashboards, apps, experiências agentic, slides e Claude Artifacts com a linguagem da Improve Business. Use quando a tarefa mencionar Improve, Improve Design System, fidelidade à marca, componentes Improve, tokens Improve ou geração de UI reutilizável. Não use para marcas ou sistemas sem relação com a Improve.
---

# Improve Design System

Criar interfaces limpas, consultivas e acessíveis a partir do contrato canônico da Improve.

## Fluxo

1. Localizar `design-system.manifest.json` ou `improve.config.json` no projeto.
2. Identificar a recipe correspondente: landing page, dashboard, app, slides, agent workspace ou Artifact.
3. Ler [references/foundations.md](references/foundations.md) antes de decidir cores, tipografia ou composição.
4. Ler [references/component-selection.md](references/component-selection.md) para escolher componentes e estados. Para experiências agentic, ler também [references/agentic-ui.md](references/agentic-ui.md). Para Claude Artifacts, ler [references/artifacts.md](references/artifacts.md).
5. Consultar o manifesto ou executar `improve-ds list --json` e `improve-ds inspect <id> --json`. Reutilizar componentes existentes antes de criar novos.
6. Implementar com tokens semânticos `--ibs-*`. Não inserir valores arbitrários quando existir token equivalente.
7. Verificar responsividade, foco, teclado, contraste, movimento reduzido, estados vazios, carregamento, erro e recuperação.
8. Executar `improve-ds doctor` e os testes do projeto. Fazer verificação visual em desktop e mobile quando houver navegador disponível.

## Regras críticas

- Usar Inter como fonte principal para texto, controles e UI de produto.
- Usar Clash Display Bold em títulos quando carregada pela Fontshare; usar Space Grotesk como fallback open source.
- Usar Edu NSW ACT Cursive apenas como acento expressivo raro e manter Montserrat somente para compatibilidade legada.
- Usar branco como canvas, `#F5F2F0` para superfícies, `#4F4F51` para texto, `#F2703E` como ação de marca e controles marcados, e `#483C8F` para foco, navegação, aprovação humana e estados de inteligência.
- Usar `#F2703E` com texto branco em negrito em ações primárias, registrando a exceção de contraste no contexto de acessibilidade.
- Consultar `atomicLevel` no manifesto e compor atoms em molecules e organisms antes de criar novos componentes.
- Preferir espaço generoso, hierarquia editorial forte, bordas discretas e elevação restrita.
- Não inventar claims, resultados, clientes ou fontes para preencher uma composição.
- Não expor raciocínio interno bruto em interfaces agentic; mostrar intenção, etapa, ferramenta, consequência e resultado.
- Não sobrescrever código source-owned modificado sem revisar o patch produzido pelo CLI.

## Saída

Entregar código funcional e indicar os componentes, tokens e recipe utilizados. Registrar qualquer desvio deliberado do sistema.
