import { CSSProperties, RefObject, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { Observer } from 'gsap/Observer'
import { useGSAP } from '@gsap/react'
import {
  abilities,
  commercials,
  films,
  Lang,
  lichicoAccountNote,
  lichicoHighlights,
  Localized,
  Project,
  theatre,
} from './data'

gsap.registerPlugin(ScrollTrigger, Draggable, Observer, useGSAP)

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

function usePortfolioMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const root = scope.current
    if (!root) return

    const mm = gsap.matchMedia()
    mm.add(
      {
        desktop: '(min-width: 761px)',
        mobile: '(max-width: 760px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { desktop, reduceMotion } = context.conditions as { desktop: boolean; mobile: boolean; reduceMotion: boolean }

        if (reduceMotion) {
          gsap.set(
            [
              '.archive-hero-topline',
              '.archive-hero-credit > *',
              '.archive-hero-note',
              '.archive-enter',
              '.archive-hero-contact',
              '.archive-reveal',
              '.archive-section-label',
              '.film-object',
              '.theatre-poster',
              '.skill-node',
            ],
            { clearProps: 'all' },
          )
          return
        }

        const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
        heroTimeline
          .fromTo('.archive-hero > video', { scale: 1.1, autoAlpha: 0 }, { scale: 1.02, autoAlpha: 0.52, duration: 1.8 }, 0)
          .fromTo('.archive-hero-wash', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.1 }, 0)
          .fromTo('.archive-hero-topline', { y: -18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 0.22)
          .fromTo(
            '.archive-hero-credit > *',
            { y: 42, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1 },
            0.34,
          )
          .fromTo('.archive-hero-note', { x: 28, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8 }, 0.7)
          .fromTo(
            ['.archive-enter', '.archive-hero-contact'],
            { y: 16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 },
            0.78,
          )

        gsap.to('.archive-hero > video', {
          yPercent: desktop ? 9 : 4,
          scale: desktop ? 1.08 : 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: '.archive-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })

        gsap.utils.toArray<HTMLElement>('.archive-reveal').forEach((element) => {
          gsap.fromTo(
            element,
            { y: desktop ? 54 : 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: desktop ? 1 : 0.72,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 86%',
                toggleActions: 'play none none none',
                once: true,
              },
            },
          )
        })

        gsap.utils.toArray<HTMLElement>('.archive-section-label').forEach((label) => {
          gsap.fromTo(
            label,
            { x: -22, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.65,
              ease: 'power2.out',
              scrollTrigger: { trigger: label.parentElement, start: 'top 82%', once: true },
            },
          )
        })

        ScrollTrigger.batch('.film-object', {
          start: 'top 88%',
          once: true,
          interval: 0.08,
          batchMax: desktop ? 3 : 1,
          onEnter: (batch) => gsap.fromTo(
            batch,
            { y: desktop ? 48 : 28, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.75, ease: 'power3.out', stagger: 0.09, overwrite: 'auto' },
          ),
        })

        ScrollTrigger.batch('.theatre-poster', {
          start: 'top 90%',
          once: true,
          batchMax: desktop ? 4 : 2,
          onEnter: (batch) => gsap.fromTo(
            batch,
            { y: 70, rotation: (index) => index % 2 === 0 ? -2.2 : 2.2, autoAlpha: 0 },
            { y: 0, rotation: 0, autoAlpha: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', overwrite: 'auto' },
          ),
        })

        ScrollTrigger.batch('.skill-node', {
          start: 'top 92%',
          once: true,
          batchMax: desktop ? 7 : 2,
          onEnter: (batch) => gsap.fromTo(
            batch,
            { scale: 0.94, y: 24, autoAlpha: 0 },
            { scale: 1, y: 0, autoAlpha: 1, duration: 0.62, stagger: 0.07, ease: 'power2.out', overwrite: 'auto' },
          ),
        })

        if (desktop) {
          const hero = root.querySelector<HTMLElement>('.archive-hero')
          const heroCredit = root.querySelector<HTMLElement>('.archive-hero-credit')
          if (hero && heroCredit) {
            const xTo = gsap.quickTo(heroCredit, 'x', { duration: 0.75, ease: 'power3.out' })
            const yTo = gsap.quickTo(heroCredit, 'y', { duration: 0.75, ease: 'power3.out' })
            const onPointerMove = (event: PointerEvent) => {
              const bounds = hero.getBoundingClientRect()
              xTo(((event.clientX - bounds.left) / bounds.width - 0.5) * 18)
              yTo(((event.clientY - bounds.top) / bounds.height - 0.5) * 12)
            }
            const onPointerLeave = () => { xTo(0); yTo(0) }
            hero.addEventListener('pointermove', onPointerMove)
            hero.addEventListener('pointerleave', onPointerLeave)

            const nav = root.querySelector<HTMLElement>('.archive-nav')
            if (nav) {
              const navY = gsap.quickTo(nav, 'yPercent', { duration: 0.38, ease: 'power2.out' })
              ScrollTrigger.create({
                start: 120,
                end: 'max',
                onUpdate: (self) => navY(self.direction === 1 ? -105 : 0),
                onLeaveBack: () => navY(0),
              })
            }

            return () => {
              hero.removeEventListener('pointermove', onPointerMove)
              hero.removeEventListener('pointerleave', onPointerLeave)
            }
          }
        }
      },
      root,
    )

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh, { once: true })
    return () => {
      window.removeEventListener('load', refresh)
      mm.revert()
    }
  }, { scope })
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
      <a
        className="archive-identity"
        href="#top"
        aria-label={t(lang, 'Hazel Li, back to top', '李瑭，返回顶部', '李瑭，返回頂部')}
      >
        <span>{t(lang, 'HAZEL LI', '李瑭', '李瑭')}</span>
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
  const isEnglish = lang === 'en'
  const heroTags = isEnglish
    ? ['Brand Marketing', 'Content Strategy', 'Film Production']
    : ['创意内容策划', '品牌内容策略', '短视频内容制作', '品牌出海与本土化']

  return (
    <section className="archive-hero" id="top">
      <video src="/media/hero/ambient-loop.mp4" autoPlay muted loop playsInline aria-hidden="true" />
      <div className="archive-hero-wash" />
      <div className="archive-hero-topline">
        <span>PERSONAL PORTFOLIO / 2026</span>
        <span>{isEnglish ? 'Hong Kong · Guangdong · London' : 'Base 香港和广东'}</span>
      </div>
      <div className="archive-hero-credit">
        <p>
          {isEnglish
            ? 'Creative Content Producer with experience in brand globalization, short-form content strategy and independent film production.'
            : '用内容故事链接品牌与用户，打通策略洞察到创意落地的全链路。'}
        </p>
        <h1>{isEnglish ? <>Li Tang <span>(Hazel)</span></> : <>李瑭 <span>Hazel</span></>}</h1>
        {isEnglish && <h2>Creative Content Producer</h2>}
        <div className="archive-hero-tags" aria-label={isEnglish ? 'Areas of practice' : '工作方向'}>
          {heroTags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
      <div className="archive-hero-note">
        <span>
          {isEnglish
            ? <>I create stories that connect brands,<br />people and culture.<br /><br />From research and strategy<br />to production and execution.</>
            : '用内容故事链接品牌与用户，打通策略洞察到创意落地的全链路。'}
        </span>
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
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const isEnglish = lang === 'en'

  useGSAP((_, contextSafe) => {
    const section = sectionRef.current
    const pin = pinRef.current
    const stage = stageRef.current
    if (!section || !pin || !stage || !contextSafe) return

    const motionCards = gsap.utils.toArray<HTMLElement>('.personal-card-motion')
    const draggableCards = gsap.utils.toArray<HTMLElement>('.personal-card')
    const draggables: Draggable[] = []
    let layer = 30

    const focusCard = contextSafe((element: HTMLElement) => {
      layer += 1
      element.style.zIndex = String(layer)
      gsap.to(element, { boxShadow: '0 28px 60px rgba(45, 39, 31, .25)', duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
    })
    const releaseCard = contextSafe((element: HTMLElement) => {
      gsap.to(element, { boxShadow: '0 18px 42px rgba(45, 39, 31, .16)', duration: 0.28, ease: 'power2.out', overwrite: 'auto' })
    })

    const mm = gsap.matchMedia()
    mm.add(
      {
        desktop: '(min-width: 901px)',
        mobile: '(max-width: 900px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { desktop, reduceMotion } = context.conditions as { desktop: boolean; mobile: boolean; reduceMotion: boolean }
        if (reduceMotion) {
          gsap.set(motionCards, { clearProps: 'all' })
          return
        }

        if (desktop) {
          draggables.push(...Draggable.create(draggableCards, {
            type: 'x,y',
            dragClickables: true,
            cursor: 'grab',
            activeCursor: 'grabbing',
            onPress: function () { focusCard(this.target as HTMLElement) },
            onRelease: function () { releaseCard(this.target as HTMLElement) },
          }))

          const spread = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: section,
              pin,
              start: 'top top',
              end: `+=${Math.max(1500, motionCards.length * 260)}`,
              scrub: 0.85,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          spread
            .addLabel('archive-in')
            .fromTo(
              '.personal-archive-heading > *',
              { y: 34, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.04 },
              'archive-in',
            )
            .fromTo(
              motionCards,
              {
                x: (index) => (index % 2 === 0 ? 1 : -1) * (120 + index * 16),
                y: (index) => 200 + index * 24,
                rotation: (index) => (index % 2 === 0 ? -1 : 1) * (8 + index * 1.5),
                scale: 0.84,
                autoAlpha: 0,
              },
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 0.62,
                stagger: 0.07,
              },
              'archive-in+=0.08',
            )
            .fromTo(
              '.personal-archive-footer',
              { y: 20, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.25 },
              '>-0.08',
            )
        } else {
          gsap.fromTo(
            motionCards,
            { y: 32, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              stagger: 0.09,
              ease: 'power3.out',
              scrollTrigger: { trigger: stage, start: 'top 84%', once: true },
            },
          )
        }
      },
      section,
    )

    return () => {
      draggables.forEach((instance) => instance.kill())
      mm.revert()
    }
  }, { scope: sectionRef, dependencies: [lang], revertOnUpdate: true })

  return (
    <section className="archive-section about-archive personal-archive" id="about" ref={sectionRef}>
      <div className="archive-section-label">{isEnglish ? 'PERSONAL ARCHIVE / PROFILE / DRAG TO REARRANGE' : 'PERSONAL ARCHIVE / 关于我 / 可拖动卡片'}</div>
      <div className="personal-archive-pin" ref={pinRef}>
        <header className="personal-archive-heading">
          <span>{isEnglish ? 'PERSONAL ARCHIVE · 2026' : '关于我'}</span>
          <h2>
            {isEnglish
              ? <>A Creative Content Producer<br />bridging research,<br />strategy and production.</>
              : '关于我'}
          </h2>
          <p>{isEnglish ? 'SCROLL TO OPEN THE ARCHIVE · DRAG ANY CARD' : '滚动展开档案 · 卡片可自由拖动'}</p>
        </header>

        <div className={`personal-card-stage ${isEnglish ? '' : 'personal-card-stage--zh'}`} ref={stageRef}>
          <div className="personal-card-motion personal-card-motion--portrait">
            <figure className="personal-card personal-card--portrait">
              <span className="personal-paperclip" aria-hidden="true" />
              <img
                src="/media/profile/hazel-profile.jpg"
                alt={t(lang, 'Hazel Li in front of illuminated lanterns', '李瑭站在点亮的灯笼前', '李瑭站在點亮的燈籠前')}
              />
              <figcaption>HAZEL LI / FIELD NOTE 01</figcaption>
            </figure>
          </div>

          {isEnglish ? (
            <>
              <div className="personal-card-motion personal-card-motion--about">
                <article className="personal-card personal-card--text personal-card--about">
                  <span>ABOUT</span>
                  <p>I am a creative content producer working across brand storytelling, short-form content, film production and documentary practice from UCL BA Media</p>
                  <p>With a sociology background in Media, Culture and Creative Cities in HKU, I combine audience research, visual storytelling and production management to transform ideas into meaningful content.</p>
                </article>
              </div>
              <div className="personal-card-motion personal-card-motion--research">
                <article className="personal-card personal-card--text personal-card--blue">
                  <span>WHAT I BRING / 01</span>
                  <h3>Research-driven storytelling</h3>
                  <p>I use audience insights, cultural observation and market research to discover meaningful stories and develop content strategies.</p>
                </article>
              </div>
              <div className="personal-card-motion personal-card-motion--production">
                <article className="personal-card personal-card--text personal-card--yellow">
                  <span>WHAT I BRING / 02</span>
                  <h3>End-to-end production</h3>
                  <p>From concept development and scripting<br />to directing, coordination and final delivery.</p>
                </article>
              </div>
              <div className="personal-card-motion personal-card-motion--culture">
                <article className="personal-card personal-card--text personal-card--green">
                  <span>WHAT I BRING / 03</span>
                  <h3>Cross-cultural communication</h3>
                  <p>Working across Hong Kong, Mainland China and international environments, I communicate across Mandarin, Cantonese and English-speaking contexts.</p>
                </article>
              </div>
              <div className="personal-card-motion personal-card-motion--language">
                <aside className="personal-card personal-card--passport">
                  <span>LANGUAGES</span>
                  <dl>
                    <div><dt>Mandarin</dt><dd>Native</dd></div>
                    <div><dt>Cantonese</dt><dd>Native</dd></div>
                    <div><dt>English</dt><dd>Professional Working Proficiency</dd></div>
                  </dl>
                  <p>Currently based in Hong Kong</p>
                  <p>Experience across Hong Kong, Shenzhen and London</p>
                </aside>
              </div>
              <div className="personal-card-motion personal-card-motion--quote">
                <blockquote className="personal-card personal-card--quote">
                  <p>I work between research and production —<br />finding the question,<br />shaping the story,<br />and bringing ideas into their final form.</p>
                  <cite>HAZEL LI · 2026</cite>
                </blockquote>
              </div>
            </>
          ) : (
            <>
              {[
                '我是一位连接研究、策略与制作的创意内容制作人。本科阶段在UCL学习影视制作与媒体研究，让我建立了视觉叙事与内容制作能力；随后在港大媒体、文化与创意城市方向的学习中，我进一步通过社会学视角、定性研究和受众分析理解内容背后的文化语境与用户行为逻辑。',
                '在商业内容实践中，我曾参与网易有道短视频运营及易健子品牌Lichico的TikTok品牌出海内容策略，从用户研究、竞品分析到脚本创作和视频制作，探索如何将洞察转化为具有传播力的内容。',
                '我认为好内容的前提是理解受众——他们是谁，在什么场景看，什么东西能真正留住他们。学术训练给了我研究能力，制作经验让我能亲手把洞察落地成片。',
              ].map((paragraph, index) => (
                <div className={`personal-card-motion personal-card-motion--zh-${index + 1}`} key={paragraph}>
                  <article className={`personal-card personal-card--text personal-card--zh personal-card--zh-${index + 1}`}>
                    <span>{String(index + 1).padStart(2, '0')} / 03</span>
                    <p>{paragraph}</p>
                  </article>
                </div>
              ))}
            </>
          )}
        </div>

        <footer className="personal-archive-footer">
          {isEnglish ? (
            <>
              <span>CONTENT STRATEGY</span>
              <span>CREATIVE PRODUCTION</span>
              <span>VISUAL STORYTELLING</span>
              <span>AUDIENCE RESEARCH</span>
            </>
          ) : (
            <a href="/Tang_Li_Hazel_CV.docx" download>下载简历 ↓</a>
          )}
        </footer>
      </div>
    </section>
  )
}

function LichicoOutcome({ lang, onOpen }: { lang: Lang; onOpen: (project: Project) => void }) {
  const playerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showPoster, setShowPoster] = useState(true)
  const project = commercials[0]
  const active = lichicoHighlights[activeIndex]

  useEffect(() => {
    setShowPoster(true)
    const timer = window.setTimeout(() => setShowPoster(false), 900)
    return () => window.clearTimeout(timer)
  }, [activeIndex])

  useGSAP(() => {
    if (!showPoster || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      '.outcome-poster',
      { scale: 1.035, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'power2.out', overwrite: 'auto' },
    )
  }, { scope: playerRef, dependencies: [activeIndex, showPoster], revertOnUpdate: true })

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

        <div className="outcome-player" ref={playerRef}>
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
  const lightboxRef = useRef<HTMLDivElement>(null)
  const gallery = project.gallery ?? []
  const item = gallery[index]
  const move = (direction: number) => setIndex((index + direction + gallery.length) % gallery.length)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
    timeline
      .fromTo(lightboxRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.32 })
      .fromTo(
        '.gallery-lightbox figure',
        { scale: 0.965, y: 18, autoAlpha: 0 },
        { scale: 1, y: 0, autoAlpha: 1, duration: 0.58 },
        0.05,
      )
      .fromTo(
        ['.gallery-arrow', '.gallery-lightbox .return-icon'],
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, stagger: 0.05 },
        0.18,
      )
  }, { scope: lightboxRef })

  return (
    <div className="gallery-lightbox" ref={lightboxRef} role="dialog" aria-modal="true" aria-label={item.alt[lang]}>
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
  const drawerRef = useRef<HTMLElement>(null)
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

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
    timeline
      .fromTo(drawerRef.current, { xPercent: 5, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.58 })
      .fromTo('.drawer-hero-image', { scale: 1.08 }, { scale: 1, duration: 1.25 }, 0)
      .fromTo(
        '.drawer-hero > div:last-child > *',
        { y: 34, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.72, stagger: 0.08 },
        0.16,
      )
      .fromTo(
        '.drawer-metadata span',
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.06 },
        0.38,
      )
      .fromTo('.drawer-return', { scale: 0.8, rotation: -18, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.5 }, 0.28)
  }, { scope: drawerRef })

  useGSAP(() => {
    if (!playing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      '.drawer-player',
      { scale: 0.965, autoAlpha: 0.6 },
      { scale: 1, autoAlpha: 1, duration: 0.72, ease: 'power3.out', overwrite: 'auto' },
    )
    gsap.fromTo(
      '.player-return',
      { scale: 0.75, rotation: -16, autoAlpha: 0 },
      { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.45, ease: 'back.out(1.6)' },
    )
  }, { scope: drawerRef, dependencies: [playing], revertOnUpdate: true })

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
      <article ref={drawerRef} className={`archive-drawer archive-drawer--${project.kind}`} role="dialog" aria-modal="true" aria-label={project.title[lang]}>
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
  const footerRef = useRef<HTMLElement>(null)
  const [activeTicket, setActiveTicket] = useState(0)
  const ticketCount = 3

  useGSAP((_, contextSafe) => {
    if (!footerRef.current || !contextSafe) return
    const cycle = contextSafe((direction: number) => {
      setActiveTicket((current) => (current + direction + ticketCount) % ticketCount)
    })
    const observer = Observer.create({
      target: footerRef.current,
      type: 'wheel,touch,pointer',
      tolerance: 28,
      preventDefault: false,
      onUp: () => cycle(1),
      onLeft: () => cycle(1),
      onDown: () => cycle(-1),
      onRight: () => cycle(-1),
    })
    return () => observer.kill()
  }, { scope: footerRef })

  useGSAP(() => {
    const tickets = gsap.utils.toArray<HTMLElement>('.contact-ticket')
    tickets.forEach((ticket, index) => {
      const relative = (index - activeTicket + tickets.length) % tickets.length
      gsap.to(ticket, {
        xPercent: relative === 0 ? 0 : relative === 1 ? 10 : -10,
        y: relative === 0 ? 0 : relative === 1 ? 34 : 66,
        rotation: relative === 0 ? 0 : relative === 1 ? 3.2 : -3.2,
        scale: relative === 0 ? 1 : relative === 1 ? 0.94 : 0.88,
        autoAlpha: relative === 0 ? 1 : relative === 1 ? 0.68 : 0.38,
        zIndex: tickets.length - relative,
        duration: 0.72,
        ease: 'power3.inOut',
        overwrite: 'auto',
      })
    })
  }, { scope: footerRef, dependencies: [activeTicket], revertOnUpdate: false })

  return (
    <footer className="archive-contact ticket-contact" ref={footerRef}>
      <div className="ticket-contact-heading">
        <span>CONTACT / AVAILABILITY / 2026</span>
        <p>{t(lang, 'SCROLL · SWIPE · USE ARROWS', '滚动 · 滑动 · 使用箭头', '滾動 · 滑動 · 使用箭頭')}</p>
      </div>
      <div className="contact-ticket-stage">
        <article className="contact-ticket contact-ticket--blue">
          <div className="ticket-kicker"><span>OPEN FOR COLLABORATION</span><span>01 / 03</span></div>
          <h2>{t(lang, 'Available for film, production and visual-content opportunities.', '期待电影、制片与视觉内容方向的合作机会。', '期待電影、製片與視覺內容方向的合作機會。')}</h2>
          <a href="mailto:canlibx@outlook.com">canlibx@outlook.com ↗</a>
          <div className="ticket-orbit" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        </article>
        <article className="contact-ticket contact-ticket--yellow">
          <div className="ticket-kicker"><span>HAZEL LI / 李瑭</span><span>02 / 03</span></div>
          <h2>{t(lang, 'Creative Content Producer', '创意内容策划', '創意內容策劃')}</h2>
          <div className="ticket-keywords">
            <span>BRAND MARKETING</span>
            <span>CONTENT STRATEGY</span>
            <span>FILM PRODUCTION</span>
            <span>VISUAL STORYTELLING</span>
          </div>
          <a href="mailto:canlibx@outlook.com">START A CONVERSATION ↗</a>
        </article>
        <article className="contact-ticket contact-ticket--paper">
          <div className="ticket-kicker"><span>INDEX / LINKS</span><span>03 / 03</span></div>
          <h2>{t(lang, 'Keep the archive moving.', '让档案继续生长。', '讓檔案繼續生長。')}</h2>
          <nav>
            <a href="/Tang_Li_Hazel_CV.docx" download>RÉSUMÉ ↓</a>
            <a href="https://www.tiktok.com/@sunnystylemart" target="_blank" rel="noreferrer">TIKTOK ↗</a>
            <a href="#top">{t(lang, 'BACK TO TOP ↑', '返回顶部 ↑', '返回頂部 ↑')}</a>
          </nav>
        </article>
      </div>
      <div className="ticket-contact-controls" aria-label={t(lang, 'Contact card controls', '联系卡片切换', '聯絡卡片切換')}>
        <button onClick={() => setActiveTicket((activeTicket - 1 + ticketCount) % ticketCount)} aria-label={t(lang, 'Previous card', '上一张', '上一張')}>←</button>
        <span>{String(activeTicket + 1).padStart(2, '0')} / 03</span>
        <button onClick={() => setActiveTicket((activeTicket + 1) % ticketCount)} aria-label={t(lang, 'Next card', '下一张', '下一張')}>→</button>
      </div>
    </footer>
  )
}

function App() {
  const pageRef = useRef<HTMLElement>(null)
  const [lang, setLang] = useState<Lang>('en')
  const [project, setProject] = useState<Project | null>(null)
  usePortfolioMotion(pageRef)
  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : lang === 'zh' ? 'zh-CN' : 'zh-Hant'
  }, [lang])

  return (
    <main className="archive-page" ref={pageRef}>
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
