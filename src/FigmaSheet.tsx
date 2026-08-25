import { abilities, commercials, films, theatre } from './data'

const filmNotes = [
  'Research-led narratives',
  'Experimental moving image',
  'Documentary observation',
  'Production from concept to release',
]

export default function FigmaSheet() {
  return (
    <main className="figma-sheet">
      <section className="fs-hero">
        <div className="fs-nav"><b>HT</b><span>SELECTED WORK&nbsp;&nbsp;&nbsp; PROFILE&nbsp;&nbsp;&nbsp; CONTACT</span><i>EN · 简 · 繁</i></div>
        <div className="fs-hero-art"><i/><i/><i/></div>
        <p className="fs-overline">HONG KONG · LONDON · SHENZHEN</p>
        <h1>Hazel<br/>Tang</h1>
        <h2>MOVING IMAGE · PRODUCTION · VISUAL STORYTELLING</h2>
        <div className="fs-hero-foot"><span>01 — 08</span><span>PORTFOLIO / 2026</span><span>canlibx@outlook.com ↗</span></div>
      </section>

      <section className="fs-paper fs-profile">
        <div className="fs-section-id">02 / PROFILE</div>
        <header><p>PERSONAL PRACTICE / 个人经历</p><h2>A maker who can carry an idea<br/>from research to release.</h2></header>
        <div className="fs-profile-grid">
          <div className="fs-portrait"><span>PORTRAIT<br/>TO BE ADDED</span></div>
          <div className="fs-bio">
            <p>UCL BA Media graduate and HKU Media, Culture and Creative Cities postgraduate, working across film, documentary, experimental moving image, theatre production and branded short-form content.</p>
            <p>Her practice combines visual sensitivity with production coordination, qualitative research, content strategy and data-informed iteration.</p>
            <dl><div><dt>2025—2026</dt><dd>HKU · MSocSc Media, Culture & Creative Cities</dd></div><div><dt>2021—2024</dt><dd>UCL · BA Media · Upper Second Class Honours</dd></div><div><dt>2024—2025</dt><dd>Lichico · Creative Content Producer</dd></div><div><dt>2023</dt><dd>NetEase Youdao · Content & Operations</dd></div></dl>
          </div>
          <div className="fs-stats"><div><b>78</b><span>Commercial & educational videos</span></div><div><b>4M+</b><span>Recorded cross-platform views</span></div><div><b>07</b><span>Connected working roles</span></div><div><b>03</b><span>Cities of practice</span></div></div>
        </div>
      </section>

      <section className="fs-dark fs-selected">
        <div className="fs-section-id">03 / SELECTED WORK</div>
        <header><p>FILM · THEATRE · COMMERCIAL</p><h2>Windows along<br/>the route</h2></header>
        <div className="fs-window-grid">
          {films.slice(0, 3).map((project, index) => <article key={project.id} className={`fs-window fs-window-${index + 1}`}><div style={{background: `linear-gradient(145deg, ${project.accent}, #121210 72%)`}}><span>0{index + 1}</span></div><p>{project.kind} / {project.year}</p><h3>{project.title.en}</h3><small>{project.role.en}</small></article>)}
          {theatre.slice(0, 3).map((project, index) => <article key={project.id} className={`fs-window fs-window-${index + 4}`}><img src={project.image} alt=""/><p>{project.kind} / {project.year}</p><h3>{project.title.en}</h3><small>{project.role.en}</small></article>)}
        </div>
      </section>

      <section className="fs-dark fs-films">
        <div className="fs-section-id">04 / SCREENING ROOM</div>
        <header><p>MOVING IMAGE / 电影与影像</p><h2>Open a title.<br/>Start the machine.</h2></header>
        <div className="fs-projector">
          <div className="fs-film-list">{films.slice(0, 4).map((p, i) => <div key={p.id}><span>0{i + 1} · {p.year}</span><b>{p.title.en}</b><small>{p.role.en}</small></div>)}</div>
          <div className="fs-screen"><div className="fs-reels"><i/><i/></div><p>SELECTED FILM</p><h3>{films[0].title.en}</h3><span>{films[0].role.en}</span><em>FULL FILM · NOTES · PROCESS ↗</em></div>
          <div className="fs-film-list fs-film-list-right">{films.slice(4).map((p, i) => <div key={p.id}><span>0{i + 5} · {p.year}</span><b>{p.title.en}</b><small>{p.role.en}</small></div>)}</div>
        </div>
        <div className="fs-film-notes">{filmNotes.map((note, i) => <span key={note}>0{i + 1} — {note}</span>)}</div>
      </section>

      <section className="fs-stage">
        <div className="fs-section-id">05 / STAGE DOOR</div>
        <header><p>THEATRE / 戏剧与舞台</p><h2>Production lives<br/>behind the curtain.</h2></header>
        <div className="fs-curtain-title"><span>EXECUTION</span><span>COORDINATION</span><span>PUBLICITY</span></div>
        <div className="fs-poster-grid">{theatre.map((project, index) => <article key={project.id}><span>0{index + 1}</span><img src={project.image} alt={`${project.title.en} poster`}/><div><h3>{project.title.en}</h3><p>{project.year} · {project.role.en}</p></div></article>)}</div>
      </section>

      <section className="fs-paper fs-commercial">
        <div className="fs-section-id">06 / MEDIA ARCHIVE</div>
        <header><p>BRANDED CONTENT / 商业内容</p><h2>Creative decisions,<br/>measured in public.</h2></header>
        {commercials.map((project, index) => <article className="fs-ledger" key={project.id}><b>B0{index + 1}</b><div><span>{project.platform} · {project.year}</span><h3>{project.title.en}</h3><p>{project.summary.en}</p></div><div className="fs-metrics">{project.metrics?.map(metric => <div key={metric.label.en}><strong>{metric.value}</strong><small>{metric.label.en}</small></div>)}</div></article>)}
        <div className="fs-archive-note">ARCHIVE SLOT / NEW CASE STUDIES CAN BE ADDED WITHOUT CHANGING THE SYSTEM.</div>
      </section>

      <section className="fs-paper fs-method">
        <div className="fs-section-id">07 / WORK TABLE</div>
        <header><p>WORKING METHOD / 能力与方法</p><h2>Seven connected<br/>working disciplines</h2></header>
        <div className="fs-method-table">{abilities.map(item => <div key={item.index}><span>{item.index}</span><h3>{item.title.en}</h3><p>{item.items.en}</p></div>)}</div>
      </section>

      <footer className="fs-contact">
        <div className="fs-section-id">08 / END OF ROUTE</div>
        <div className="fs-road"><i/><i/><i/><i/></div>
        <p>AVAILABLE FOR COLLABORATION</p>
        <h2>Available for film production<br/>and visual content opportunities.</h2>
        <a href="mailto:canlibx@outlook.com">canlibx@outlook.com ↗</a>
        <div><span>RÉSUMÉ ↓</span><span>TIKTOK ↗</span><span>HAZEL TANG · 2026</span></div>
      </footer>
    </main>
  )
}
