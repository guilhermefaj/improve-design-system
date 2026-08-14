import { useState } from 'react';

const css = `:root{font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#4f4f51;background:#2c2c2e}*{box-sizing:border-box}body{margin:0}.deck{min-height:100vh;display:grid;place-items:center;padding:24px}.slide{position:relative;width:min(100%,1280px);aspect-ratio:16/9;padding:7%;overflow:hidden;background:#fff;border-radius:16px;box-shadow:0 30px 80px #0006}.kicker{color:#483c8f;font-size:1.2vw;font-weight:800;letter-spacing:.1em}.title{max-width:12ch;margin:3% 0 0;font-family:'Clash Display','Space Grotesk',Inter,sans-serif;font-size:6vw;line-height:.96;letter-spacing:-.035em}.metric{margin-top:8%;font-size:8vw;font-weight:850;letter-spacing:-.035em;color:#f2703e}.footer{position:absolute;left:7%;right:7%;bottom:5%;display:flex;justify-content:space-between}.controls{position:fixed;right:24px;bottom:24px;display:flex;gap:8px}.controls button{min-height:44px;padding:0 16px;border:0;border-radius:999px;background:#f2703e;color:#fff;font-weight:700}`;
const slides = [
  {
    kicker: 'IMPROVE BUSINESS',
    title: 'Transformação com IA começa no negócio.',
    metric: '3,2×',
    detail: 'mais velocidade nas decisões',
  },
  {
    kicker: 'IMPACTO',
    title: 'Menos esforço repetitivo. Mais espaço para estratégia.',
    metric: '−28%',
    detail: 'de trabalho operacional',
  },
];

export default function ImproveSlidesArtifact() {
  const [page, setPage] = useState(0);
  const slide = slides[page];
  return (
    <>
      <style>{css}</style>
      <main className="deck">
        <article className="slide" aria-label={`Slide ${page + 1} de ${slides.length}`}>
          <div className="kicker">{slide.kicker}</div>
          <h1 className="title">{slide.title}</h1>
          <div className="metric">{slide.metric}</div>
          <p>{slide.detail}</p>
          <footer className="footer">
            <strong>improve</strong>
            <span>
              {page + 1} / {slides.length}
            </span>
          </footer>
        </article>
      </main>
      <nav className="controls" aria-label="Navegação dos slides">
        <button onClick={() => setPage(Math.max(0, page - 1))}>Anterior</button>
        <button onClick={() => setPage(Math.min(slides.length - 1, page + 1))}>Próximo</button>
      </nav>
    </>
  );
}
