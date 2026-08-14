import { useState } from 'react';

const css = `
:root{font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#4f4f51;background:#fff}*{box-sizing:border-box}body{margin:0}button{font:inherit}.app{min-height:100vh;padding:28px;background:#faf9f8}.shell{max-width:1180px;margin:auto}.header{display:flex;align-items:center;justify-content:space-between;margin-bottom:48px}.brand{display:flex;align-items:center;gap:10px;font-weight:800;font-size:18px;letter-spacing:-.04em}.mark{width:34px;height:34px}.eyebrow{color:#483c8f;font-size:12px;font-weight:750;letter-spacing:.1em;text-transform:uppercase}.title{font-family:'Clash Display','Space Grotesk',Inter,ui-sans-serif,system-ui,sans-serif;max-width:740px;margin:8px 0 12px;font-size:clamp(38px,6vw,72px);line-height:.98;letter-spacing:-.06em}.lead{max-width:680px;color:#6f6f72;font-size:18px;line-height:1.55}.button{min-height:44px;padding:0 20px;border:0;border-radius:999px;background:#f2703e;color:#fff;font-weight:700;cursor:pointer}.button:hover{background:#f47f59}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}.card{padding:24px;border:1px solid #e7e3e0;border-radius:16px;background:#fff}.metric{font-size:38px;font-weight:800;letter-spacing:-.05em}.muted{color:#6f6f72}.panel{margin-top:16px;padding:24px;border-radius:16px;background:#f5f2f0}.rows{display:grid;gap:1px;margin-top:16px;overflow:hidden;border:1px solid #e7e3e0;border-radius:12px;background:#e7e3e0}.row{display:grid;grid-template-columns:1fr auto auto;gap:18px;align-items:center;padding:16px;background:#fff}.status{padding:6px 10px;border-radius:999px;background:#dff6ed;color:#147d57;font-size:12px;font-weight:700}@media(max-width:760px){.app{padding:20px}.header{margin-bottom:32px}.grid{grid-template-columns:1fr 1fr}.row{grid-template-columns:1fr}.title{font-size:44px}}@media(max-width:460px){.grid{grid-template-columns:1fr}}
`;

function Mark() {
  return (
    <svg className="mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M4.75 16.25h18.5v18.5H9.75a5 5 0 0 1-5-5v-13.5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15.75 4.75h14a5.5 5.5 0 0 1 5.5 5.5v14h-19.5V4.75Z" stroke="#f2703e" strokeWidth="2.2" />
    </svg>
  );
}

export default function ImproveDashboardArtifact() {
  const [period, setPeriod] = useState('30 dias');
  const metrics = [
    ['12h', 'economizadas por semana'],
    ['34%', 'menos retrabalho'],
    ['2,4×', 'mais velocidade'],
    ['100%', 'decisões rastreáveis'],
  ];
  return (
    <>
      <style>{css}</style>
      <main className="app">
        <div className="shell">
          <header className="header">
            <div className="brand">
              <Mark />
              improve
            </div>
            <button className="button" onClick={() => setPeriod(period === '30 dias' ? '90 dias' : '30 dias')}>
              {period}
            </button>
          </header>
          <p className="eyebrow">Diagnóstico operacional</p>
          <h1 className="title">Decisões claras para melhorar o negócio.</h1>
          <p className="lead">
            Uma visão executiva das oportunidades priorizadas, do impacto esperado e do próximo passo.
          </p>
          <section className="grid" aria-label="Indicadores principais">
            {metrics.map(([value, label]) => (
              <article className="card" key={label}>
                <div className="metric">{value}</div>
                <div className="muted">{label}</div>
              </article>
            ))}
          </section>
          <section className="panel">
            <h2>Oportunidades priorizadas</h2>
            <div className="rows">
              {[
                'Conciliação automática de dados',
                'Agente para políticas internas',
                'Triagem inteligente de solicitações',
              ].map((label, index) => (
                <div className="row" key={label}>
                  <strong>{label}</strong>
                  <span className="muted">{['Alto impacto', 'Médio impacto', 'Alto impacto'][index]}</span>
                  <span className="status">Priorizado</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
