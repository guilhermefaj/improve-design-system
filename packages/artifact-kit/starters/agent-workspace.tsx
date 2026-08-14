import { useState } from 'react';

const css = `:root{font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#4f4f51;background:#faf9f8}*{box-sizing:border-box}body{margin:0}button{font:inherit}.app{width:min(calc(100% - 32px),960px);margin:auto;padding:32px 0 80px}.top{display:flex;justify-content:space-between;align-items:center}.eyebrow{color:#483c8f;font-size:12px;font-weight:750;letter-spacing:.1em;text-transform:uppercase}.title{font-family:'Clash Display','Space Grotesk',Inter,ui-sans-serif,system-ui,sans-serif;margin:8px 0 36px;font-size:clamp(40px,7vw,76px);line-height:.98;letter-spacing:-.06em}.stack{display:grid;gap:16px}.card{padding:20px;border:1px solid #e7e3e0;border-radius:16px;background:#fff}.header{display:flex;align-items:center;justify-content:space-between;gap:16px}.status{display:inline-flex;align-items:center;gap:8px;color:#f2703e;font-size:13px;font-weight:700}.dot{width:9px;height:9px;border-radius:50%;background:currentColor}.tool{border-left:5px solid #f2703e}.approval{border-color:#483c8f;box-shadow:inset 5px 0 #483c8f}.facts{display:grid;grid-template-columns:1fr 1fr;gap:1px;margin:18px 0;background:#e7e3e0}.fact{padding:12px;background:#fff}.fact small{display:block;color:#6f6f72}.actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.button{min-height:44px;padding:0 18px;border:1px solid #a8a29e;border-radius:999px;background:#fff;font-weight:700;cursor:pointer}.primary{border-color:#f2703e;background:#f2703e;color:#fff}.primary:hover{background:#f47f59}.message{line-height:1.6}.result{padding:16px;border-radius:12px;background:#dff6ed;color:#147d57;font-weight:700}@media(max-width:600px){.facts{grid-template-columns:1fr}.actions .button{width:100%}}`;
export default function ImproveAgentWorkspaceArtifact() {
  const [state, setState] = useState<'running' | 'approval' | 'done'>('running');
  return (
    <>
      <style>{css}</style>
      <main className="app">
        <div className="top">
          <p className="eyebrow">Improve AI · Execução rastreável</p>
          <span className="status">
            <span className="dot" />
            {state === 'running' ? 'Executando' : state === 'approval' ? 'Aguardando aprovação' : 'Concluído'}
          </span>
        </div>
        <h1 className="title">Automação com contexto e controle humano.</h1>
        <div className="stack">
          <article className="card message">
            <strong>Objetivo</strong>
            <p>Analisar solicitações recentes, identificar padrões e preparar uma recomendação operacional.</p>
          </article>
          <article className="card tool">
            <div className="header">
              <strong>Ferramenta · Análise de solicitações</strong>
              <span className="status">
                <span className="dot" />
                {state === 'running' ? 'Em andamento' : 'Concluída'}
              </span>
            </div>
            <p>Organizando dados por causa, frequência e impacto.</p>
            {state === 'running' && (
              <button className="button primary" onClick={() => setState('approval')}>
                Concluir análise
              </button>
            )}
          </article>
          {state === 'approval' && (
            <article className="card approval">
              <p className="eyebrow">Aprovação necessária · Risco moderado</p>
              <h2>Enviar recomendação ao time de Operações?</h2>
              <div className="facts">
                <div className="fact">
                  <small>Ação</small>
                  <strong>Enviar relatório</strong>
                </div>
                <div className="fact">
                  <small>Destino</small>
                  <strong>Operações</strong>
                </div>
                <div className="fact">
                  <small>Dados</small>
                  <strong>Resumo agregado</strong>
                </div>
                <div className="fact">
                  <small>Reversível</small>
                  <strong>Não</strong>
                </div>
              </div>
              <p>O relatório ficará visível para todos os membros do canal selecionado.</p>
              <div className="actions">
                <button className="button primary" onClick={() => setState('done')}>
                  Aprovar ação
                </button>
                <button className="button" onClick={() => setState('running')}>
                  Editar
                </button>
                <button className="button" onClick={() => setState('running')}>
                  Rejeitar
                </button>
              </div>
            </article>
          )}
          {state === 'done' && (
            <div className="result" role="status">
              Recomendação enviada com trilha de auditoria.
            </div>
          )}
        </div>
      </main>
    </>
  );
}
