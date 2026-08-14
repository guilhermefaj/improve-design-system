import { useState } from 'react';

const css = `:root{font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#4f4f51;background:#faf9f8}*{box-sizing:border-box}body{margin:0}.app{width:min(calc(100% - 32px),840px);margin:auto;padding:56px 0}.eyebrow{color:#483c8f;font-size:12px;font-weight:800;letter-spacing:.1em}.title{max-width:12ch;margin:10px 0 28px;font-family:'Clash Display','Space Grotesk',Inter,sans-serif;font-size:clamp(42px,8vw,76px);line-height:.98;letter-spacing:-.03em}.card{padding:24px;border:1px solid #e7e3e0;border-radius:16px;background:#fff}.options{display:grid;gap:10px;margin:20px 0}.option{display:flex;gap:12px;padding:14px;border:1px solid #e7e3e0;border-radius:12px;background:#fff}.button{min-height:46px;padding:0 22px;border:0;border-radius:999px;background:#f2703e;color:#fff;font-weight:700}.result{margin-top:16px;padding:16px;border-radius:12px;background:#ece9f8;color:#483c8f;font-weight:700}`;

export default function ImproveArtifact() {
  const [choice, setChoice] = useState('Eficiência');
  const [done, setDone] = useState(false);
  return (
    <>
      <style>{css}</style>
      <main className="app">
        <p className="eyebrow">IMPROVE · PROTÓTIPO PORTÁTIL</p>
        <h1 className="title">Comece pela dor real do negócio.</h1>
        <section className="card">
          <strong>Qual impacto deve vir primeiro?</strong>
          <div className="options">
            {['Eficiência', 'Crescimento', 'Experiência'].map((item) => (
              <label className="option" key={item}>
                <input type="radio" checked={choice === item} onChange={() => setChoice(item)} />
                {item}
              </label>
            ))}
          </div>
          <button className="button" onClick={() => setDone(true)}>
            Gerar direção
          </button>
          {done && (
            <div className="result" role="status">
              Direção priorizada: {choice}. Próximo passo: validar evidências e responsáveis.
            </div>
          )}
        </section>
      </main>
    </>
  );
}
