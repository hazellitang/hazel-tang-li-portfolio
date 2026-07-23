import { CSSProperties, useEffect, useRef, useState } from 'react'
import {
  abilities,
  aboutMe,
  commercials,
  films,
  Lang,
  lichicoAccountNote,
  lichicoHighlights,
  Localized,
  Project,
  theatre,
} from './data'

const labels: Record<string, Localized> = {
  about: { en: 'About me', zh: '关于我', tc: '關於我' },
  outcome: { en: 'Work outcome', zh: '工作成果', tc: '工作成果' },
  film: { en: 'Film production', zh: '电影制作', tc: '電影製作' },
  theatre: { en: 'Theater', zh: '戏剧', tc: '戲劇' },
  skills: { en: 'Skills', zh: '能力', tc: '能力' },
  watch: { en: 'Watch film', zh: '观看影片', tc: '觀看影片' },
  close: { en: 'Return', zh: '返回', tc: '返回' },
  visit: { en: 'Open original link ↗', zh: '打开原始链接 ↗', tc: '打開原始連結 ↗' },
  story: { en: 'Story & context', zh: '故事与背景', tc: '故事與背景' },
  process: { en: 'My role & process', zh: '我的职责与过程', tc: '我的職責與過程' },
  inspiration: { en: 'Visual inspiration', zh: '视觉灵感', tc: '視覺靈感' },
  note: { en: 'Director’s note', zh: '创作注释', tc: '創作註釋' },
  gallery: { en: 'Contact sheet', zh: '影像接触印样', tc: '影像接觸印樣' },
  connected: { en: 'Connected to', zh: '与这些线索相连', tc: '與這些線索相連' },
}

const t = (lang: Lang, en: string, zh: string, tc = zh) => ({ en, zh, tc })[lang]

function useReveal() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll('.archive-reveal')]
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.08 },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

function ReturnIcon({
  label,
  onClick,
  className = '',
}: {
  label: string
  onClick: () => void
  className?: string
}) {
  return (
    <button className={`return-icon ${className}`} onClick={onClick} aria-label={label} title={label}>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="20" />
        <path d="M30.5 14.5h-7.7c-5.6 0-10.2 4.6-10.2 10.2S17.2 35 22.8 35h6.1" />
        <path d="m18.4 10.8 4.8 3.8-4.8 3.8" />
        <path className="return-slash" d="M10 10l28 28" />
      </svg>
    </button>
  )
}

function ArchiveNav({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const [open, setOpen] = useState(false)
  const items = [
    ['about', labels.about[lang]],
    ['outcome', labels.outcome[lang]],
    ['films', labels.film[lang]],
    ['theatre', labels.theatre[lang]],
    ['skills', labels.skills[lang]],
  ]

  return (
    <header className="archive-nav">
      <a className="archive-identity" href="#top" aria-label="Hazel Tang, back to top">
        <span>HAZEL TANG</span>
        <small>MOVING IMAGE ARCHIVE</small>
      </a>
      <button
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="archive-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'CLOSE' : 'INDEX'}
      </button>
      <nav id="archive-navigation" className={open ? 'is-open' : ''}>
        {items.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="archive-language" aria-label="Language switcher">
        {(['en', 'zh', 'tc'] as Lang[]).map((item) => (
          <button key={item} className={lang === item ? 'active' : ''} onClick={() => setLang(item)}>
            {item === 'en' ? 'EN' : item === 'zh' ? '简' : '繁'}
          </button>
        ))}
      </div>
    </header>
  )
}

function ArchiveHero({ lang }: { lang: Lang }) {
  return (
    <section className="archive-hero" id="top">
      <video src="/media/hero/ambient-loop.mp4" autoPlay muted loop playsInline aria-hidden="true" />
      <div className="archive-hero-wash" />
      <div className="archive-hero-topline">
        <span>PORTFOLIO / SELECTED WORK / 2022—2026</span>
        <span>HONG KONG · LONDON · SHENZHEN</span>
      </div>
      <div className="archive-hero-credit">
        <p>{t(lang, 'A moving-image maker and production researcher', '影像创作者与制作研究者', '影像創作者與製作研究者')}</p>
        <h1>Hazel Tang</h1>
        <h2>{t(lang, 'Moving image / Production / Visual research', '影像／制作／视觉研究', '影像／製作／視覺研究')}</h2>
      </div>
      <div className="archive-hero-note">
        <span>{t(lang, 'Ideas travel through people, images and production realities.', '想法在人、影像与制作现实之间移动。', '想法在人、影像與製作現實之間移動。')}</span>
      </div>
      <a className="archive-enter" href="#about">
        <i />
        {t(lang, 'Enter archive', '进入档案', '進入檔案')}
      </a>
      <a className="archive-hero-contact" href="mailto:canlibx@outlook.com">CONTACT ↗</a>
    </section>
  )
}

function AboutArchive({ lang }: { lang: Lang }) {
  return (
    <section className="archive-section about-archive" id="about">
      <div className="archive-section-label">ABOUT / PROFILE / NOTES</div>
      <div className="about-scrapbook archive-reveal">
        <div className="about-paper about-paper--back">
          <span>BA MEDIA · MSOCSC</span>
          <span>LONDON ↔ HONG KONG</span>
        </div>
        <figure className="about-photo">
          <span className="paperclip" aria-hidden="true" />
          <img src="/media/profile/hazel-profile.jpg" alt="Hazel Tang in front of illuminated lanterns" />
          <figcaption>HAZEL / FIELD NOTE 01</figcaption>
        </figure>
        <div className="about-story">
          <span className="about-stamp">PERSONAL ARCHIVE · 2026</span>
          <h2>{aboutMe.headline[lang]}</h2>
          <p>{aboutMe.introduction[lang]}</p>
          <p>{aboutMe.detail[lang]}</p>
          <div className="about-handnote">
            {t(
              lang,
              'I am interested in the moment when a question becomes an image—and in the practical work required to help that image exist.',
              '我关心一个问题如何变成画面，也关心让这个画面真正存在所需要的实际工作。',
              '我關心一個問題如何變成畫面，也關心讓這個畫面真正存在所需要的實際工作。',
            )}
          </div>
        </div>
        <aside className="about-timeline">
          <span>{t(lang, 'Recent route', '近期路径', '近期路徑')}</span>
          <dl>
            <div><dt>2025—26</dt><dd>HKU · Media, Culture & Creative Cities</dd></div>
            <div><dt>2024—25</dt><dd>Lichico · Creative Content Producer</dd></div>
            <div><dt>2021—24</dt><dd>UCL · BA Media</dd></div>
            <div><dt>2023</dt><dd>NetEase Youdao · Content & Operations</dd></div>
          </dl>
          <a href="/Tang_Li_Hazel_CV.docx" download>{t(lang, 'Download résumé ↓', '下载简历 ↓', '下載簡歷 ↓')}</a>
        </aside>
      </div>
    </section>
  )
}

function LichicoOutcome({ lang, onOpen }: { lang: Lang; onOpen: (project: Project) => void }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showPoster, setShowPoster] = useState(true)
  const project = commercials[0]
  const active = lichicoHighlights[activeIndex]

  useEffect(() => {
    setShowPoster(true)
    const timer = window.setTimeout(() => setShowPoster(false), 900)
    return () => window.clearTimeout(timer)
  }, [activeIndex])

  return (
    <section className="archive-section outcome-archive" id="outcome">
      <div className="archive-section-label">WORK OUTCOME / LICHICO / 2024—2025</div>
      <div className="outcome-heading archive-reveal">
        <div>
          <span>CASE STUDY / GLOBAL SHORT-FORM</span>
          <h2>{project.title[lang]}</h2>
        </div>
        <p>{project.summary[lang]}</p>
      </div>
      <div className="outcome-layout archive-reveal">
        <div className="outcome-context">
          <p>{project.responsibilities?.[lang]}</p>
          <p className="outcome-account-note">{lichicoAccountNote[lang]}</p>
          <div className="outcome-results">
            {project.metrics?.map((metric) => (
              <div key={metric.label.en}>
                <strong>{metric.value}</strong>
                <span>{metric.label[lang]}</span>
              </div>
            ))}
          </div>
          <div className="outcome-links">
            <a href={project.externalUrl} target="_blank" rel="noreferrer">@SUNNYSTYLEMART ↗</a>
            <button onClick={() => onOpen(project)}>{t(lang, 'Read case notes ↗', '查看案例笔记 ↗', '查看案例筆記 ↗')}</button>
          </div>
        </div>

        <div className="outcome-player">
          <div className="outcome-player-frame">
            <iframe
              key={active.id}
              src={`https://www.tiktok.com/player/v1/${active.id}?controls=1&description=1&music_info=0&rel=0&autoplay=0`}
              title={`Lichico TikTok: ${active.descriptor.en}`}
              allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
              loading="lazy"
            />
            {showPoster && (
              <button className="outcome-poster" onClick={() => setShowPoster(false)} aria-label={t(lang, 'Reveal video player', '显示视频播放器', '顯示視頻播放器')}>
                {active.poster ? (
                  <img src={active.poster} alt="" />
                ) : (
                  <span style={{ '--poster-tone': `${(activeIndex + 1) * 36}deg` } as CSSProperties}>
                    <i>LICHICO</i>
                    <b>{active.descriptor[lang]}</b>
                  </span>
                )}
                <em>{active.views ? `▶ ${active.views}` : '▶ VIEW POST'}</em>
              </button>
            )}
          </div>
          <a href={active.url} target="_blank" rel="noreferrer">
            {t(lang, 'Open this post on TikTok ↗', '在 TikTok 打开此视频 ↗', '在 TikTok 打開此視頻 ↗')}
          </a>
        </div>

        <div className="outcome-selector" aria-label="Selected Lichico videos">
          {lichicoHighlights.map((video, index) => (
            <button key={video.id} className={index === activeIndex ? 'active' : ''} onClick={() => setActiveIndex(index)}>
              <div>
                {video.poster ? <img src={video.poster} alt="" /> : <i style={{ '--poster-tone': `${(index + 1) * 36}deg` } as CSSProperties} />}
              </div>
              <span>{video.descriptor[lang]}</span>
              <b>{video.views || t(lang, 'Selected post', '精选视频', '精選視頻')}</b>
            </button>
          ))}
        </div>
      </div>
      <div className="netease-note archive-reveal">
        <span>NEXT FILE / NETEASE YOUDAO</span>
        <p>{t(lang, 'Archive space reserved for the next case study.', '下一份商业案例的档案位置已预留。', '下一份商業案例的檔案位置已預留。')}</p>
      </div>
    </section>
  )
}

function FilmCard({ project, lang, onOpen }: { project: Project; lang: Lang; onOpen: (project: Project) => void }) {
  const background = project.image
    ? { backgroundImage: `url(${project.image})` }
    : { background: `linear-gradient(145deg, ${project.accent}, #171713 72%)` }
  return (
    <button className="film-object" onClick={() => onOpen(project)}>
      <div className="film-object-media" style={background}>
        {project.previewVideo && <video src={project.previewVideo} muted loop playsInline />}
        <span>{project.year}</span>
        <div className="film-object-note">
          <b>{project.archiveLabel?.[lang] ?? project.role[lang]}</b>
          <p>{project.directorNotePreview?.[lang] ?? project.summary[lang]}</p>
        </div>
      </div>
      <div className="film-object-caption">
        <strong>{project.title[lang]}</strong>
        <span>{project.role[lang]}</span>
      </div>
    </button>
  )
}

function FilmArchive({ lang, onOpen }: { lang: Lang; onOpen: (project: Project) => void }) {
  const shortFilms = films.filter((project) => project.category === 'short')
  const documentaries = films.filter((project) => project.category === 'documentary')
  return (
    <section className="archive-section film-production" id="films">
      <div className="archive-section-label">FILM PRODUCTION / SELECTED WORK</div>
      <div className="film-archive-heading archive-reveal">
        <h2>{t(lang, 'Films as objects, notes and unfinished questions.', '把电影看作物件、笔记与未完成的问题。', '把電影看作物件、筆記與未完成的問題。')}</h2>
        <p>{t(lang, 'Hover to read a working note. Open a title for the film, process and image archive.', '悬停阅读工作笔记；打开作品可查看影片、制作过程与影像档案。', '懸停閱讀工作筆記；打開作品可查看影片、製作過程與影像檔案。')}</p>
      </div>
      <div className="film-group archive-reveal">
        <div className="film-group-label"><span>SHORT FILMS</span><i>{String(shortFilms.length).padStart(2, '0')} TITLES</i></div>
        <div className="film-object-grid">
          {shortFilms.map((project) => <FilmCard key={project.id} project={project} lang={lang} onOpen={onOpen} />)}
        </div>
      </div>
      <div className="film-group film-group--documentary archive-reveal">
        <div className="film-group-label"><span>DOCUMENTARIES</span><i>{String(documentaries.length).padStart(2, '0')} TITLES</i></div>
        <div className="film-object-grid film-object-grid--documentary">
          {documentaries.map((project) => <FilmCard key={project.id} project={project} lang={lang} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  )
}

function TheatreArchive({ lang, onOpen }: { lang: Lang; onOpen: (project: Project) => void }) {
  return (
    <section className="archive-section theatre-archive" id="theatre">
      <div className="archive-section-label">THEATER / POSTER ARCHIVE / LONDON</div>
      <div className="theatre-heading archive-reveal">
        <h2>{t(lang, 'The production is already in progress.', '演出早已开始，制作持续发生。', '演出早已開始，製作持續發生。')}</h2>
        <p>{t(lang, 'Posters, roles and complete performance records—visible without waiting for a curtain.', '海报、职责与完整演出记录，无需等待幕布开启。', '海報、職責與完整演出記錄，無需等待幕布開啟。')}</p>
      </div>
      <div className="theatre-wall archive-reveal">
        {theatre.map((project, index) => (
          <button key={project.id} className={`theatre-poster theatre-poster--${index + 1}`} onClick={() => onOpen(project)}>
            <img src={project.image} alt={`${project.title[lang]} poster`} loading="lazy" />
            <span>
              <b>{project.title[lang]}</b>
              <i>{project.year} / {project.role[lang]}</i>
              <em>{t(lang, 'Open production record ↗', '打开演出档案 ↗', '打開演出檔案 ↗')}</em>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

function SkillsNetwork({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0)
  return (
    <section className="archive-section skills-network" id="skills">
      <div className="archive-section-label">SKILLS / HOW IDEAS TRAVEL</div>
      <div className="skills-heading archive-reveal">
        <h2>{t(lang, 'One practice, seven connected disciplines.', '同一套实践，七种相互连接的能力。', '同一套實踐，七種相互連接的能力。')}</h2>
        <p>{t(lang, 'Move through the board to see how research becomes a finished work.', '沿着这张研究板，看一个想法如何变成完成的作品。', '沿着這張研究板，看一個想法如何變成完成的作品。')}</p>
      </div>
      <div className="skills-board archive-reveal">
        <svg viewBox="0 0 1000 620" aria-hidden="true">
          <path d="M180 160C320 90 430 130 500 250S690 420 840 330" />
          <path d="M140 470C270 390 330 420 470 340S710 110 850 150" />
          <path d="M260 120C360 260 320 420 510 500S740 530 850 410" />
        </svg>
        <div className="skills-center">
          <span>IDEA</span>
          <b>→</b>
          <span>WORK</span>
        </div>
        {abilities.map((ability, index) => (
          <button
            key={ability.index}
            className={`skill-node skill-node--${index + 1} ${active === index ? 'active' : ''}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <i>{ability.index}</i>
            <strong>{ability.title[lang]}</strong>
            <span>{ability.items[lang]}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function GalleryLightbox({
  project,
  index,
  lang,
  setIndex,
}: {
  project: Project
  index: number
  lang: Lang
  setIndex: (index: number | null) => void
}) {
  const gallery = project.gallery ?? []
  const item = gallery[index]
  const move = (direction: number) => setIndex((index + direction + gallery.length) % gallery.length)

  return (
    <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={item.alt[lang]}>
      <ReturnIcon label={labels.close[lang]} onClick={() => setIndex(null)} />
      <button className="gallery-arrow gallery-arrow--left" onClick={() => move(-1)} aria-label="Previous image">←</button>
      <figure>
        <img src={item.src} alt={item.alt[lang]} />
        <figcaption>{String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')} · {item.alt[lang]}</figcaption>
      </figure>
      <button className="gallery-arrow gallery-arrow--right" onClick={() => move(1)} aria-label="Next image">→</button>
    </div>
  )
}

function ProjectDrawer({ project, lang, onClose }: { project: Project; lang: Lang; onClose: () => void }) {
  const [playing, setPlaying] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [mediaState, setMediaState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const trigger = useRef<HTMLElement | null>(null)

  useEffect(() => {
    trigger.current = document.activeElement as HTMLElement
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
      trigger.current?.focus()
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (lightbox !== null) setLightbox(null)
        else if (playing) setPlaying(false)
        else onClose()
      }
      if (lightbox !== null && event.key === 'ArrowLeft') {
        const length = project.gallery?.length ?? 0
        if (length) setLightbox((lightbox - 1 + length) % length)
      }
      if (lightbox !== null && event.key === 'ArrowRight') {
        const length = project.gallery?.length ?? 0
        if (length) setLightbox((lightbox + 1) % length)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightbox, onClose, playing, project.gallery?.length])

  const playUrl = project.embedUrl
    ? `${project.embedUrl}${project.embedUrl.includes('?') ? '&' : '?'}autoplay=1`
    : null
  const connections = project.connections ?? [
    project.role,
    project.category === 'documentary'
      ? { en: 'documentary observation', zh: '纪录观察', tc: '紀錄觀察' }
      : { en: 'visual storytelling', zh: '视觉叙事', tc: '視覺敘事' },
    { en: 'production practice', zh: '制作实践', tc: '製作實踐' },
  ]
  const mediaStyle = { '--media-ratio': project.videoAspectRatio === '4:3' ? '4 / 3' : project.videoAspectRatio === '9:16' ? '9 / 16' : '16 / 9' } as CSSProperties

  const beginPlayback = () => {
    setPlaying(true)
    setMediaState(project.videoSrc ? 'loading' : 'ready')
  }

  return (
    <div className="archive-drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className={`archive-drawer archive-drawer--${project.kind}`} role="dialog" aria-modal="true" aria-label={project.title[lang]}>
        <ReturnIcon label={`${labels.close[lang]}: ${project.title[lang]}`} onClick={onClose} className="drawer-return" />
        <header className="drawer-hero" style={{ '--project-accent': project.accent } as CSSProperties}>
          <div className="drawer-hero-image" style={project.image ? { backgroundImage: `url(${project.image})` } : undefined} />
          <div>
            <span>{project.archiveLabel?.[lang] ?? `${project.kind} / ${project.year}`}</span>
            <h2>{project.title[lang]}</h2>
            <p>{project.role[lang]}</p>
          </div>
        </header>

        <div className="drawer-metadata">
          <span>YEAR <b>{project.year}</b></span>
          <span>ROLE <b>{project.role[lang]}</b></span>
          <span>FORMAT <b>{project.videoAspectRatio ?? '16:9'}</b></span>
        </div>

        <section className="drawer-story">
          <span>{labels.story[lang]}</span>
          <p>{project.summary[lang]}</p>
        </section>

        <section className="drawer-watch">
          <div className="drawer-section-heading">
            <span>{labels.watch[lang]}</span>
            <b>{playing ? t(lang, 'Now screening', '正在放映', '正在放映') : t(lang, 'Explicit playback', '点击后播放', '點擊後播放')}</b>
          </div>
          <div className={`drawer-player ${playing ? 'is-playing' : ''}`} style={mediaStyle}>
            {!playing ? (
              <button
                className={`drawer-player-poster ${project.image ? 'has-image' : ''}`}
                style={project.image ? { backgroundImage: `linear-gradient(to top, rgba(8,8,7,.88), transparent 70%), url(${project.image})` } : { background: `linear-gradient(145deg, ${project.accent}, #12120f)` }}
                onClick={beginPlayback}
              >
                <i>▶</i>
                <span>{labels.watch[lang]}</span>
              </button>
            ) : (
              <>
                <ReturnIcon label={labels.close[lang]} onClick={() => setPlaying(false)} className="player-return" />
                {mediaState === 'loading' && <div className="media-status">{t(lang, 'Loading film…', '正在加载影片…', '正在載入影片…')}</div>}
                {mediaState === 'error' && <div className="media-status media-status--error">{t(lang, 'The film could not be loaded. Please use the original link below.', '影片无法加载，请使用下方原始链接。', '影片無法載入，請使用下方原始連結。')}</div>}
                {project.videoSrc ? (
                  <video
                    src={project.videoSrc}
                    poster={project.image}
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    onCanPlay={() => setMediaState('ready')}
                    onError={() => setMediaState('error')}
                  />
                ) : playUrl ? (
                  <iframe src={playUrl} title={project.title[lang]} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
                ) : (
                  <div className="media-status">{t(lang, 'Video source is ready to be added.', '视频位置已预留。', '視頻位置已預留。')}</div>
                )}
              </>
            )}
          </div>
        </section>

        <section className="drawer-narrative drawer-narrative--note">
          <span>{labels.note[lang]}</span>
          <p>{project.reflection?.[lang] ?? t(lang, 'Creative reflection to be added.', '创作反思待补充。', '創作反思待補充。')}</p>
        </section>

        <section className="drawer-narrative drawer-narrative--inspiration">
          <span>{labels.inspiration[lang]}</span>
          <p>{project.inspiration?.[lang] ?? t(lang, 'Visual references to be added.', '视觉灵感待补充。', '視覺靈感待補充。')}</p>
        </section>

        <section className="drawer-narrative drawer-narrative--process">
          <span>{labels.process[lang]}</span>
          <p>{project.responsibilities?.[lang] ?? '—'}</p>
        </section>

        {project.gallery?.length ? (
          <section className="drawer-contact-sheet">
            <div className="drawer-section-heading">
              <span>{labels.gallery[lang]}</span>
              <b>{project.gallery.length} IMAGES / CLICK TO EXPAND</b>
            </div>
            <div>
              {project.gallery.map((item, index) => (
                <button key={item.src} onClick={() => setLightbox(index)}>
                  <img src={item.src} alt={item.alt[lang]} loading="lazy" />
                  <span>{String(index + 1).padStart(2, '0')} / {item.type === 'bts' ? 'BTS' : 'STILL'}</span>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <section className="drawer-contact-sheet drawer-contact-sheet--empty">
            <div className="drawer-section-heading"><span>{labels.gallery[lang]}</span><b>ARCHIVE IN PROGRESS</b></div>
            <div><i /><i /><i /></div>
          </section>
        )}

        <section className="drawer-connected">
          <span>{labels.connected[lang]}</span>
          <div>
            {connections.map((connection, index) => (
              <i key={connection.en} style={{ '--connection-index': index } as CSSProperties}>{connection[lang]}</i>
            ))}
          </div>
        </section>

        {project.metrics && (
          <section className="drawer-outcomes">
            {project.metrics.map((metric) => (
              <div key={metric.label.en}><strong>{metric.value}</strong><span>{metric.label[lang]}</span></div>
            ))}
          </section>
        )}

        <footer className="drawer-footer">
          {project.externalUrl && <a href={project.externalUrl} target="_blank" rel="noreferrer">{labels.visit[lang]}</a>}
          <ReturnIcon label={labels.close[lang]} onClick={onClose} />
        </footer>
        {lightbox !== null && <GalleryLightbox project={project} index={lightbox} lang={lang} setIndex={setLightbox} />}
      </article>
    </div>
  )
}

function ArchiveFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="archive-contact">
      <span>CONTACT / AVAILABILITY / 2026</span>
      <h2>{t(lang, 'Available for film, production and visual-content opportunities.', '期待电影、制片与视觉内容方向的合作机会。', '期待電影、製片與視覺內容方向的合作機會。')}</h2>
      <a href="mailto:canlibx@outlook.com">canlibx@outlook.com ↗</a>
      <div>
        <a href="/Tang_Li_Hazel_CV.docx" download>RÉSUMÉ ↓</a>
        <a href="https://www.tiktok.com/@sunnystylemart" target="_blank" rel="noreferrer">TIKTOK ↗</a>
        <a href="#top">{t(lang, 'BACK TO TOP ↑', '返回顶部 ↑', '返回頂部 ↑')}</a>
      </div>
    </footer>
  )
}

function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [project, setProject] = useState<Project | null>(null)
  useReveal()
  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : lang === 'zh' ? 'zh-CN' : 'zh-Hant'
  }, [lang])

  return (
    <main className="archive-page">
      <ArchiveNav lang={lang} setLang={setLang} />
      <ArchiveHero lang={lang} />
      <AboutArchive lang={lang} />
      <LichicoOutcome lang={lang} onOpen={setProject} />
      <FilmArchive lang={lang} onOpen={setProject} />
      <TheatreArchive lang={lang} onOpen={setProject} />
      <SkillsNetwork lang={lang} />
      <ArchiveFooter lang={lang} />
      {project && <ProjectDrawer key={project.id} project={project} lang={lang} onClose={() => setProject(null)} />}
    </main>
  )
}

export default App
