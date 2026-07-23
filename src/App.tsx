import { useEffect, useState } from 'react'
import { abilities, aboutMe, commercials, films, Lang, lichicoAccountNote, lichicoHighlights, Localized, Project, theatre } from './data'

const labels: Record<string, Localized> = {
  films: { en: 'Moving image', zh: '电影与影像', tc: '電影與影像' },
  theatre: { en: 'Theatre', zh: '戏剧与舞台', tc: '戲劇與舞台' },
  commercial: { en: 'Lichico case study', zh: 'Lichico 商业案例', tc: 'Lichico 商業案例' },
  about: { en: 'About me', zh: '关于我', tc: '關於我' },
  method: { en: 'Core skills', zh: '核心技能', tc: '核心技能' },
  contact: { en: 'Contact', zh: '联系', tc: '聯繫' },
  view: { en: 'Open project', zh: '打开项目', tc: '打開項目' },
  close: { en: 'Close project', zh: '关闭项目', tc: '關閉項目' },
  visit: { en: 'Open original link ↗', zh: '打开原始链接 ↗', tc: '打開原始連結 ↗' },
  notes: { en: 'Story & context', zh: '故事与背景', tc: '故事與背景' },
  process: { en: 'My role & process', zh: '我的职责与过程', tc: '我的職責與過程' },
  inspiration: { en: 'Visual inspiration', zh: '视觉灵感', tc: '視覺靈感' },
  reflection: { en: 'Director’s note', zh: '创作注释', tc: '創作註釋' },
  bts: { en: 'Stills & behind the scenes', zh: '影片静帧与幕后', tc: '影片靜幀與幕後' },
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'))
    }, { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function LichicoShowcase({ lang, onOpen }: { lang: Lang; onOpen: (project: Project) => void }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const project = commercials[0]
  const active = lichicoHighlights[activeIndex]

  return (
    <div className="lichico-case reveal">
      <div className="lichico-case-copy">
        <span className="case-number">CASE 01 / 2024—2025</span>
        <h3>{project.title[lang]}</h3>
        <p>{project.summary[lang]}</p>
        <p className="account-note">{lichicoAccountNote[lang]}</p>
        <div className="case-actions">
          <a href={project.externalUrl} target="_blank" rel="noreferrer">@sunnystylemart ↗</a>
          <button onClick={() => onOpen(project)}>{labels.view[lang]} ↗</button>
        </div>
      </div>

      <div className="tiktok-console">
        <div className="tiktok-player">
          <iframe
            key={active.id}
            src={`https://www.tiktok.com/player/v1/${active.id}?controls=1&description=1&music_info=0&rel=0&autoplay=0`}
            title={`Lichico TikTok highlight ${active.label}`}
            allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
            loading="lazy"
          />
        </div>
        <div className="tiktok-selector" aria-label="TikTok highlights">
          {lichicoHighlights.map((video, index) => (
            <button key={video.id} className={index === activeIndex ? 'active' : ''} onClick={() => setActiveIndex(index)}>
              <span>{video.label}</span>
              <b>{lang === 'en' ? 'Highlight video' : '精选视频'}</b>
              <em>{video.views || (lang === 'en' ? 'Views · add in data.ts' : '播放量 · 可在 data.ts 填写')}</em>
            </button>
          ))}
        </div>
        <a className="tiktok-fallback" href={active.url} target="_blank" rel="noreferrer">
          {lang === 'en' ? 'If the player is unavailable, open this post on TikTok ↗' : '播放器无法加载时，在 TikTok 打开此视频 ↗'}
        </a>
      </div>

      <div className="lichico-metrics">
        {project.metrics?.map((metric) => <div key={metric.label.en}><strong>{metric.value}</strong><span>{metric.label[lang]}</span></div>)}
      </div>
    </div>
  )
}

function FilmIndexButton({ project, active, lang, onClick }: { project: Project; active: boolean; lang: Lang; onClick: () => void }) {
  return (
    <button className={active ? 'active film-index-card' : 'film-index-card'} onClick={onClick} aria-pressed={active}>
      <span className="film-index-meta">{project.year}</span>
      <span className="film-index-title">{project.title[lang]}</span>
      <span className="film-index-role">{project.role[lang]}</span>
      {project.image
        ? <img src={project.image} alt="" />
        : <i style={{ background: `radial-gradient(circle at 62% 35%, ${project.accent}, #1a1a17 68%)` }} />}
    </button>
  )
}

function FilmProjector({ lang, onOpen }: { lang: Lang; onOpen: (project: Project) => void }) {
  const [active, setActive] = useState<Project>(films.find((item) => item.id === 'wind') ?? films[0])
  const shortFilms = films.filter((item) => item.category === 'short')
  const documentaries = films.filter((item) => item.category === 'documentary')

  return (
    <div className="projector reveal">
      <div className="project-index project-index--left">
        <span className="project-index-label">{lang === 'en' ? 'Short films' : '剧情与实验短片'}</span>
        {shortFilms.slice(0, 3).map((project) => <FilmIndexButton key={project.id} project={project} active={active.id === project.id} lang={lang} onClick={() => setActive(project)} />)}
      </div>
      <div className="projector-screen is-running" style={{ '--project-accent': active.accent } as React.CSSProperties}>
        <div className="reel reel--left" /><div className="reel reel--right" />
        <button
          className={`screen-content ${active.image ? 'has-cover' : ''}`}
          style={active.image ? { backgroundImage: `linear-gradient(to top, rgba(7,7,6,.96) 4%, rgba(7,7,6,.22) 76%), url(${active.image})` } : undefined}
          onClick={() => onOpen(active)}
          aria-label={`${labels.view[lang]} ${active.title[lang]}`}
        >
          <span className="eyebrow">{active.kind} · {active.year}</span>
          <strong>{active.title[lang]}</strong>
          <span>{active.role[lang]}</span>
          <i>▶ {lang === 'en' ? 'Open film & notes' : '打开影片与创作笔记'}</i>
        </button>
      </div>
      <div className="project-index project-index--right">
        {shortFilms.slice(3).map((project) => <FilmIndexButton key={project.id} project={project} active={active.id === project.id} lang={lang} onClick={() => setActive(project)} />)}
        <span className="project-index-label project-index-label--documentary">{lang === 'en' ? 'Documentaries' : '纪录片'}</span>
        {documentaries.map((project) => <FilmIndexButton key={project.id} project={project} active={active.id === project.id} lang={lang} onClick={() => setActive(project)} />)}
      </div>
      <p className="projector-hint">{lang === 'en' ? 'Each title opens a film player, project notes, visual references and up to three stills or behind-the-scenes images.' : lang === 'zh' ? '每部作品均可打开播放器、项目笔记、视觉灵感，以及最多三张影片静帧或幕后图片。' : '每部作品均可打開播放器、項目筆記、視覺靈感，以及最多三張影片靜幀或幕後圖片。'}</p>
    </div>
  )
}

function TheatreStage({ lang, onOpen }: { lang: Lang; onOpen: (project: Project) => void }) {
  const [active, setActive] = useState<Project | null>(null)
  const [opened, setOpened] = useState(false)
  const choose = (project: Project) => { setActive(project); setOpened(true) }

  return (
    <div className={`stage reveal ${opened ? 'curtain-open' : ''}`}>
      <div className="stage-rail">{theatre.map((project) => <button key={project.id} onClick={() => choose(project)} className={active?.id === project.id ? 'active' : ''}>{project.title[lang]} <span>{project.role[lang]}</span></button>)}</div>
      <div className="stage-window">
        <div className="curtain curtain--left"/><div className="curtain curtain--right"/>
        <div className="stage-void">
          {active
            ? <button className="poster-focus" onClick={() => onOpen(active)}><img src={active.image} alt={`${active.title[lang]} poster`} /><span><b>{active.title[lang]}</b>{active.year} · {active.role[lang]}<i>▶ {lang === 'en' ? 'Open production & player' : '打开剧目与播放器'}</i></span></button>
            : <p>{lang === 'en' ? 'Choose a production. The curtain opens once.' : lang === 'zh' ? '选择剧目，幕布将开启。' : '選擇劇目，幕布將開啟。'}</p>}
        </div>
      </div>
    </div>
  )
}

function ProjectDrawer({ project, lang, onClose }: { project: Project; lang: Lang; onClose: () => void }) {
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [])

  const playUrl = project.embedUrl
    ? `${project.embedUrl}${project.embedUrl.includes('?') ? '&' : '?'}autoplay=1`
    : null

  return (
    <div className="drawer-backdrop" role="dialog" aria-modal="true" aria-label={project.title[lang]} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className={`project-drawer project-drawer--${project.kind}`}>
        <button className="drawer-close" onClick={onClose}>{labels.close[lang]} ×</button>
        <header style={{ '--project-accent': project.accent } as React.CSSProperties}>
          <span className="eyebrow">{project.kind} · {project.year}</span><h2>{project.title[lang]}</h2><p>{project.role[lang]}</p>
        </header>

        <div className={`drawer-media ${playing ? 'is-expanded' : ''}`}>
          {!playing ? (
            <button
              className={`media-preview ${project.image ? 'has-image' : ''}`}
              style={project.image ? { backgroundImage: `linear-gradient(to top, rgba(6,6,5,.88), rgba(6,6,5,.08)), url(${project.image})` } : { background: `radial-gradient(circle at 60% 35%, ${project.accent}, #0b0b09 68%)` }}
              onClick={() => setPlaying(true)}
            >
              <span className="play-badge">▶</span>
              <span>{lang === 'en' ? 'Play / expand' : '播放并展开'}</span>
              <strong>{project.title[lang]}</strong>
            </button>
          ) : project.videoSrc ? (
            <video src={project.videoSrc} poster={project.image} controls autoPlay playsInline />
          ) : playUrl ? (
            <iframe src={playUrl} title={project.title[lang]} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
          ) : (
            <div className="empty-player">
              <span>▶</span>
              <strong>{lang === 'en' ? 'Video player ready' : '播放器位置已预留'}</strong>
              <p>{lang === 'en' ? 'Add this production’s video URL in src/data.ts when it is available.' : '获得该剧目的影片链接后，可在 src/data.ts 中粘贴替换。'}</p>
            </div>
          )}
        </div>

        <div className="drawer-grid">
          <section><span>{labels.notes[lang]}</span><p>{project.summary[lang]}</p></section>
          <section><span>{labels.process[lang]}</span><p>{project.responsibilities?.[lang] ?? '—'}</p></section>
          <section><span>{labels.inspiration[lang]}</span><p>{project.inspiration?.[lang] ?? (lang === 'en' ? 'Visual references to be added.' : '视觉灵感待补充。')}</p></section>
          <section><span>{labels.reflection[lang]}</span><p>{project.reflection?.[lang] ?? '—'}</p></section>
        </div>

        {project.gallery?.length ? (
          <section className="project-gallery">
            <div className="gallery-heading"><span>{labels.bts[lang]}</span><b>IMAGES</b></div>
            <div>{project.gallery.map((item) => <figure key={item.src}><img src={item.src} alt={item.alt[lang]} /><figcaption>{item.type === 'bts' ? labels.bts[lang] : lang === 'en' ? 'Film still' : '影片静帧'}</figcaption></figure>)}</div>
          </section>
        ) : (
          <section className="gallery-placeholder"><span>{labels.bts[lang]}</span><div><i>01</i><i>02</i><i>03</i></div><p>{lang === 'en' ? 'Image slots are ready for future stills and behind-the-scenes material.' : '已预留三个位置，可继续加入影片静帧与幕后图片。'}</p></section>
        )}

        {project.metrics && <div className="drawer-metrics">{project.metrics.map((metric) => <div key={metric.value + metric.label.en}><strong>{metric.value}</strong><span>{metric.label[lang]}</span></div>)}</div>}
        {project.externalUrl && <a className="external-link" href={project.externalUrl} target="_blank" rel="noreferrer">{labels.visit[lang]}</a>}
      </article>
    </div>
  )
}

function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [project, setProject] = useState<Project | null>(null)
  useReveal()
  useEffect(() => { document.documentElement.lang = lang === 'en' ? 'en' : lang === 'zh' ? 'zh-CN' : 'zh-Hant' }, [lang])

  return (
    <main>
      <header className="site-nav">
        <a href="#top" className="monogram">HT</a>
        <nav><a href="#about">{labels.about[lang]}</a><a href="#commercial">Lichico</a><a href="#films">{labels.films[lang]}</a><a href="#theatre">{labels.theatre[lang]}</a><a href="#method">{labels.method[lang]}</a></nav>
        <div className="language" aria-label="Language switcher">
          {(['en', 'zh', 'tc'] as Lang[]).map((item) => <button key={item} className={lang === item ? 'active' : ''} onClick={() => setLang(item)}>{item === 'en' ? 'EN' : item === 'zh' ? '简' : '繁'}</button>)}
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-ambient" aria-label="Abstract moving-image background"><video src="/media/hero/ambient-loop.mp4" autoPlay muted loop playsInline /><i className="ambient-orbit ambient-orbit--one" /><i className="ambient-orbit ambient-orbit--two" /><i className="ambient-gate" /><span>MOVING IMAGE / PRODUCTION / STORY</span></div>
        <div className="hero-scrim"/>
        <div className="hero-copy"><p>{lang === 'en' ? 'Hong Kong · London · Shenzhen' : '香港 · 伦敦 · 深圳'}</p><h1>Hazel<br/>Tang</h1><h2>{lang === 'en' ? 'Moving Image · Production · Visual Storytelling' : lang === 'zh' ? '影像创作 · 制片 · 视觉叙事' : '影像創作 · 製片 · 視覺敘事'}</h2></div>
        <a className="hero-contact" href="mailto:canlibx@outlook.com">{labels.contact[lang]} ↗</a>
        <a className="scroll-cue" href="#about"><span />{lang === 'en' ? 'Enter portfolio' : lang === 'zh' ? '进入作品集' : '進入作品集'}</a>
      </section>

      <section className="profile section" id="about">
        <div className="section-marker">ABOUT ME</div>
        <div className="profile-intro reveal"><p className="kicker">{labels.about[lang]}</p><h2>{aboutMe.headline[lang]}</h2></div>
        <div className="profile-layout reveal">
          <div className="portrait-slot"><img src="/media/profile/hazel-profile.jpg" alt="Hazel Tang portrait" /></div>
          <div className="bio">
            <p>{aboutMe.introduction[lang]}</p>
            <p>{aboutMe.detail[lang]}</p>
            <dl><div><dt>2025—2026</dt><dd>HKU · MSocSc Media, Culture & Creative Cities</dd></div><div><dt>2021—2024</dt><dd>UCL · BA Media · Upper Second Class Honours</dd></div><div><dt>2024—2025</dt><dd>Lichico · Creative Content Producer</dd></div><div><dt>2023</dt><dd>NetEase Youdao · Content & Operations</dd></div></dl>
            <a href="/Tang_Li_Hazel_CV.docx" download>{lang === 'en' ? 'Download résumé' : lang === 'zh' ? '下载简历' : '下載簡歷'} ↓</a>
          </div>
        </div>
      </section>

      <section className="commercial section" id="commercial">
        <div className="section-marker">COMMERCIAL</div>
        <div className="section-heading reveal"><p className="kicker">{labels.commercial[lang]}</p><h2>{lang === 'en' ? 'Creative decisions, measured in public.' : lang === 'zh' ? '让创意经得起真实数据检验。' : '讓創意經得起真實數據檢驗。'}</h2></div>
        <LichicoShowcase lang={lang} onOpen={setProject} />
        <div className="netease-reserve reveal"><span>CASE 02 / NETEASE YOUDAO</span><p>{lang === 'en' ? 'Section reserved. Selected links and case notes will be added later.' : '内容位置已预留，精选链接与案例复盘稍后补充。'}</p></div>
      </section>

      <section className="films section" id="films">
        <div className="section-marker">SCREENING ROOM</div>
        <div className="section-heading reveal"><p className="kicker">{labels.films[lang]}</p><h2>{lang === 'en' ? 'Choose a title. Start the machine.' : lang === 'zh' ? '选一部作品，启动放映装置。' : '選一部作品，啟動放映裝置。'}</h2></div>
        <FilmProjector lang={lang} onOpen={setProject} />
      </section>

      <section className="theatre-section section" id="theatre">
        <div className="section-marker">STAGE DOOR</div>
        <div className="section-heading reveal"><p className="kicker">{labels.theatre[lang]}</p><h2>{lang === 'en' ? 'Production lives behind the curtain.' : lang === 'zh' ? '幕布之后，是执行、协作与完整的演出记录。' : '幕布之後，是執行、協作與完整的演出記錄。'}</h2></div>
        <TheatreStage lang={lang} onOpen={setProject} />
      </section>

      <section className="method section" id="method">
        <div className="section-marker">CORE SKILLS</div>
        <div className="section-heading reveal"><p className="kicker">{labels.method[lang]}</p><h2>{lang === 'en' ? 'Seven connected working disciplines' : lang === 'zh' ? '七种彼此衔接的工作能力' : '七種彼此銜接的工作能力'}</h2></div>
        <div className="method-table">{abilities.map((ability) => <div className="method-row reveal" key={ability.index}><h3>{ability.title[lang]}</h3><p>{ability.items[lang]}</p></div>)}</div>
      </section>

      <footer className="contact" id="contact">
        <div className="night-road"><i/><i/><i/></div><p>CONTACT</p>
        <h2>{lang === 'en' ? 'Available for film, production and visual content opportunities.' : lang === 'zh' ? '期待电影、制片与视觉内容方向的合作机会。' : '期待電影、製片與視覺內容方向的合作機會。'}</h2>
        <a href="mailto:canlibx@outlook.com">canlibx@outlook.com ↗</a>
        <div className="footer-links"><a href="/Tang_Li_Hazel_CV.docx" download>Résumé ↓</a><a href="https://www.tiktok.com/@sunnystylemart" target="_blank" rel="noreferrer">TikTok ↗</a><a href="#top">{lang === 'en' ? 'Back to top ↑' : lang === 'zh' ? '返回顶部 ↑' : '返回頂部 ↑'}</a></div>
        <span>Hazel Tang · 2026</span>
      </footer>

      {project && <ProjectDrawer key={project.id} project={project} lang={lang} onClose={() => setProject(null)} />}
    </main>
  )
}

export default App
