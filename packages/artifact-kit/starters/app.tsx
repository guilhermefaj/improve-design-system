import { useState } from 'react';

const css = `:root{font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#4f4f51;background:#faf9f8}*{box-sizing:border-box}body{margin:0}button,input{font:inherit}.shell{min-height:100vh;display:grid;grid-template-columns:240px 1fr}.side{padding:24px;background:#f5f2f0;border-right:1px solid #e7e3e0}.brand{font-weight:800;font-size:20px}.nav{display:grid;gap:8px;margin-top:36px}.nav button{padding:12px;border:0;border-radius:10px;background:transparent;text-align:left}.nav button[aria-current=page]{background:#ece9f8;color:#483c8f;font-weight:700}.main{padding:32px}.top{display:flex;justify-content:space-between;gap:24px}.title{font-family:'Clash Display','Space Grotesk',Inter,sans-serif;font-size:clamp(40px,6vw,72px);line-height:1;letter-spacing:-.03em;margin:8px 0}.button{min-height:44px;padding:0 20px;border:0;border-radius:999px;background:#f2703e;color:#fff;font-weight:700}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px}.card{padding:20px;border:1px solid #e7e3e0;border-radius:16px;background:#fff}.metric{font-size:34px;font-weight:800}.list{display:grid;gap:1px;margin-top:16px;background:#e7e3e0;border:1px solid #e7e3e0;border-radius:12px;overflow:hidden}.row{display:grid;grid-template-columns:1fr auto;gap:16px;padding:16px;background:#fff}@media(max-width:760px){.shell{grid-template-columns:1fr}.side{border:0}.nav{grid-template-columns:repeat(3,1fr);margin-top:16px}.grid{grid-template-columns:1fr}.main{padding:20px}}`;

export default function ImproveAppArtifact() {
  const [section, setSection] = useState('Visão geral');
  return (
    <>
      <style>{css}</style>
      <div className="shell">
        <aside className="side">
          <div className="brand">improve</div>
          <nav className="nav" aria-label="Produto">
            {['Visão geral', 'Clientes', 'Agentes'].map((item) => (
              <button key={item} aria-current={section === item ? 'page' : undefined} onClick={() => setSection(item)}>
                {item}
              </button>
            ))}
          </nav>
        </aside>
        <main className="main">
          <header className="top">
            <div>
              <small>WORKSPACE IMPROVE</small>
              <h1 className="title">{section}</h1>
              <p>Decisões claras, dados confiáveis e automação com contexto.</p>
            </div>
            <button className="button">Nova iniciativa</button>
          </header>
          <section className="grid" aria-label="Indicadores">
            {[
              ['Projetos ativos', '18'],
              ['Automações', '32'],
              ['Aprovações', '4'],
            ].map(([label, value]) => (
              <article className="card" key={label}>
                <div className="metric">{value}</div>
                <span>{label}</span>
              </article>
            ))}
          </section>
          <section className="card" style={{ marginTop: 16 }}>
            <strong>Atividade recente</strong>
            <div className="list">
              <div className="row">
                <span>Diagnóstico de operações</span>
                <span>Concluído</span>
              </div>
              <div className="row">
                <span>Recomendação executiva</span>
                <span>Em revisão</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
