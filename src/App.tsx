import { CSSProperties, RefObject, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { useGSAP } from '@gsap/react'
import {
  abilities,
  commercials,
  films,
  Lang,
  lichicoAccountNote,
  lichicoEvidence,
  lichicoHighlights,
  Localized,
  Project,
  theatre,
} from './data'

gsap.registerPlugin(ScrollTrigger, Draggable, useGSAP)

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
              '.archive-hero-linkedin',
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
            ['.archive-enter', '.archive-hero-contact', '.archive-hero-linkedin'],
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
      <a className="archive-identity" href="#top" aria-label="Hazel Li, back to top">
        <span>HAZEL LI</span>
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
        <h1>Hazel Li</h1>
        <h2>{t(lang, 'Moving image / Production / Visual research', '影像／制作／视觉研究', '影像／製作／視覺研究')}</h2>
      </div>
      <div className="archive-hero-note">
        <span>{t(lang, 'Ideas travel through people, images and production realities.', '想法在人、影像与制作现实之间移动。', '想法在人、影像與製作現實之間移動。')}</span>
      </div>
      <a className="archive-enter" href="#about">
        <i />
        {t(lang, 'Enter archive', '进入档案', '進入檔案')}
      </a>
      <div className="archive-hero-links">
        <a className="archive-hero-contact" href="mailto:canlibx@outlook.com">EMAIL ↗</a>
        <a className="archive-hero-linkedin" href="https://www.linkedin.com/in/tang-li-959874263/" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
      </div>
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
              <img src="/media/profile/hazel-profile.jpg" alt={t(lang, 'Hazel Li in front of illuminated lanterns', '李瑭站在点亮的灯笼前', '李瑭站在點亮的燈籠前')} />
              <figcaption>HAZEL LI / FIELD NOTE 01</figcaption>
            </figure>
          </div>

          {isEnglish ? (
            <>
              <div className="personal-card-motion personal-card-motion--about">
                <article className="personal-card personal-card--text personal-card--about">
                  <span>ABOUT</span>
                  <p>I am a creative content producer working across brand storytelling, short-form content, film production and documentary practice, with a BA in Media from UCL.</p>
                  <p>Now studying Media, Culture and Creative Cities at HKU, I combine audience research, visual storytelling and production management to transform ideas into meaningful content.</p>
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
                '我是一位连接研究、策略与制作的创意内容制作人。本科阶段在 UCL 学习影视制作与媒体研究，让我建立了视觉叙事与内容制作能力；随后在港大媒体、文化与创意城市方向的学习中，我进一步通过社会学视角、定性研究和受众分析理解内容背后的文化语境与用户行为逻辑。',
                '在商业内容实践中，我曾参与网易有道短视频运营及易健子品牌 Lichico 的 TikTok 品牌出海内容策略，从用户研究、竞品分析到脚本创作和视频制作，探索如何将洞察转化为具有传播力的内容。',
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

function LichicoOutcome({ lang }: { lang: Lang }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTakeaway, setActiveTakeaway] = useState(0)
  const [videoLoading, setVideoLoading] = useState(true)
  const [activeFile, setActiveFile] = useState<{ src: string; label: string } | null>(null)
  const project = commercials[0]
  const active = lichicoHighlights[activeIndex]

  useEffect(() => {
    if (!activeFile) return
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setActiveFile(null)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activeFile])

  useEffect(() => setVideoLoading(true), [activeIndex])

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    gsap.fromTo('.lichico-local-video', { scale: 1.025, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.65, ease: 'power2.out' })
    gsap.fromTo(
      '.lichico-capability-card.is-active',
      { scale: 0.985, y: 12 },
      { scale: 1, y: 0, duration: 0.55, ease: 'power3.out', overwrite: 'auto' },
    )
    gsap.fromTo(
      '.lichico-bts-card',
      { y: 28, rotate: (index) => index === 0 ? -1.4 : 1.4, autoAlpha: 0 },
      {
        y: 0,
        rotate: 0,
        autoAlpha: 1,
        duration: 0.72,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.lichico-bts', start: 'top 82%', once: true },
      },
    )
    const cleanups: Array<() => void> = []
    gsap.utils.toArray<HTMLElement>('.lichico-local-hover').forEach((card) => {
      const enter = () => gsap.to(card, { y: -7, rotate: -0.25, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
      const leave = () => gsap.to(card, { y: 0, rotate: 0, duration: 0.45, ease: 'power2.out', overwrite: 'auto' })
      card.addEventListener('pointerenter', enter)
      card.addEventListener('pointerleave', leave)
      cleanups.push(() => {
        card.removeEventListener('pointerenter', enter)
        card.removeEventListener('pointerleave', leave)
      })
    })
    return () => cleanups.forEach((cleanup) => cleanup())
  }, { scope: sectionRef, dependencies: [activeIndex, activeTakeaway], revertOnUpdate: true })

  const bts = [
    { src: '/media/lichico/bts/studio-lighting.jpg', label: t(lang, 'Studio lighting', '棚拍灯光', '棚拍燈光') },
    { src: '/media/lichico/bts/black-friday-direction.jpg', label: t(lang, 'Live direction', '现场导演', '現場導演') },
  ]

  return (
    <section className="archive-section outcome-archive" id="outcome" ref={sectionRef}>
      <div className="lichico-screen lichico-screen--overview">
        <div className="archive-section-label">WORK OUTCOME / LICHICO / 2024—2025</div>
        <div className="outcome-heading archive-reveal">
          <div>
            <span>01 / PROJECT OVERVIEW</span>
            <h2>{project.title[lang]}</h2>
          </div>
          <p>{project.summary[lang]}</p>
        </div>

        <div className="lichico-meta archive-reveal">
          <div><span>PRODUCT</span><b>{t(lang, 'Lichico foldable treadmill', 'Lichico 折叠跑步机', 'Lichico 摺疊跑步機')}</b></div>
          <div><span>ROLE</span><b>{t(lang, 'Creative Content Producer (Intern)', '创意内容制作（实习）', '創意內容製作（實習）')}</b></div>
          <div><span>DURATION</span><b>SEP 2024—MAR 2025</b></div>
          <div><span>TEAM SIZE</span><b>{t(lang, 'Lean cross-functional team', '精简跨职能团队', '精簡跨職能團隊')}</b></div>
        </div>

        <div className="outcome-layout archive-reveal">
          <div className="outcome-context">
            <p>{project.responsibilities?.[lang]}</p>
            <div className="outcome-results">
              {project.metrics?.map((metric) => (
                <div key={metric.label.en}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label[lang]}</span>
                </div>
              ))}
            </div>
            <p className="outcome-account-note">{lichicoAccountNote[lang]}</p>
            <a className="lichico-account-link" href={project.externalUrl} target="_blank" rel="noreferrer">LICHICO OFFICIAL ↗</a>
          </div>

          <div className="outcome-player">
            <div className="outcome-player-frame">
              <video
                key={active.id}
                className="lichico-local-video"
                src={active.src}
                poster={active.poster}
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onCanPlay={() => setVideoLoading(false)}
                onPlaying={() => setVideoLoading(false)}
              />
            </div>
            <div className="lichico-video-caption"><span>{active.descriptor[lang]}</span><b>{active.views}</b></div>
            <p className={`lichico-video-loading ${videoLoading ? '' : 'is-ready'}`}>{t(lang, 'Thank you for your patience while the videos load ☺', '感谢耐心等待视频加载 ☺', '感謝耐心等待視頻載入 ☺')}</p>
          </div>

          <div className="outcome-selector" aria-label="Selected Lichico videos">
            {lichicoHighlights.map((video, index) => (
              <button key={video.id} className={index === activeIndex ? 'active' : ''} onClick={() => setActiveIndex(index)}>
                <div><img src={video.poster} alt="" /></div>
                <span>{video.descriptor[lang]}</span>
                <b>PUBLIC VIEW / {video.views}</b>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lichico-screen lichico-screen--files" id="lichico-files">
        <div className="lichico-section-head archive-reveal">
          <span>02 / MAIN TAKEAWAYS</span>
          <h2>{t(lang, 'The Main Takeaways from Lichico', 'Lichico 项目的核心收获', 'Lichico 項目的核心收穫')}</h2>
          <p>{t(lang, 'Select a card to bring its process and evidence forward.', '点击卡片，查看对应的过程与证据。', '點擊卡片，查看對應的過程與證據。')}</p>
        </div>

        <div className="lichico-capability-grid">
          {lichicoEvidence.map((capability, index) => (
            <article
              className={`lichico-capability-card lichico-local-hover archive-reveal ${activeTakeaway === index ? 'is-active' : ''}`}
              key={capability.id}
              role="button"
              tabIndex={0}
              aria-pressed={activeTakeaway === index}
              onClick={() => setActiveTakeaway(index)}
              onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && setActiveTakeaway(index)}
            >
              <div className="lichico-capability-copy">
                <span>0{index + 1}</span>
                <h3>{capability.title[lang]}</h3>
                <b>WHAT I DID</b>
                <p>{capability.whatIDid[lang]}</p>
                <ul>{capability.items.map((item) => <li key={item.en}>{item[lang]}</li>)}</ul>
              </div>
              <button className="lichico-file-thumb" onClick={(event) => { event.stopPropagation(); setActiveFile({ src: capability.id === 'campaign-execution' ? '/media/lichico/evidence/fastmoss-black-friday-full.jpg' : capability.image, label: capability.imageLabel[lang] }) }}>
                <img src={capability.id === 'campaign-execution' ? '/media/lichico/evidence/fastmoss-black-friday-full.jpg' : capability.image} alt={capability.imageLabel[lang]} />
                <span>{capability.imageLabel[lang]} ↗</span>
              </button>
              {capability.id === 'campaign-execution' && (
                <div className="lichico-takeaway-results">
                  <div><strong>TOP 13</strong><span>ALL-CATEGORY GMV</span></div>
                  <div><strong>TOP 3</strong><span>US SPORTS CATEGORY</span></div>
                </div>
              )}
              <div className="lichico-reserved-row">
                {capability.reserved.map((slot) => <i key={slot.en}>{slot[lang]}</i>)}
              </div>
            </article>
          ))}
        </div>

        <div className="lichico-bts archive-reveal">
          <div className="lichico-bts-title"><span>BEHIND THE SCENES</span><b>02 SELECTED IMAGES · OTHER MATERIALS CONFIDENTIAL</b></div>
          <div className="lichico-bts-grid">
            {bts.map((item) => (
              <button className="lichico-bts-card lichico-local-hover" key={item.src} onClick={() => setActiveFile({ src: item.src, label: item.label })}>
                <img src={item.src} alt={item.label} /><span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lichico-screen lichico-screen--outcome" id="lichico-results">
        <div className="lichico-section-head archive-reveal">
          <span>03 / OGR MARKET RESEARCH</span>
          <h2>{t(lang, 'From category research to market-entry direction.', '从品类研究到出海内容方向。', '從品類研究到出海內容方向。')}</h2>
          <p>{t(lang, 'A paper-to-platform launch framework covering category research, positioning, creator references and account direction.', '从品类研究、定位与达人参考出发，搭建从纸面策略到账号方向的 0—1 框架。', '從品類研究、定位與達人參考出發，搭建從紙面策略到帳號方向的 0—1 框架。')}</p>
        </div>

        <div className="lichico-campaign-grid archive-reveal">
          <article className="lichico-campaign-panel lichico-campaign-panel--ogr">
            <span>01 / OGR</span>
            <h3>OVERSEAS MARKET ENTRY</h3>
            <p>{t(lang, 'OGR is a Belle Group sub-brand preparing to enter overseas markets. The work mapped the category, clarified product positioning and translated research into social and creator directions.', 'OGR 是百丽集团旗下准备进入海外市场的子品牌。本阶段梳理品类与价格带、明确产品定位，并把研究转化为社媒与达人内容方向。', 'OGR 是百麗集團旗下準備進入海外市場的子品牌。本階段梳理品類與價格帶、明確產品定位，並把研究轉化為社媒與達人內容方向。')}</p>
            <div className="lichico-ogr-files">
              <button className="lichico-local-hover" onClick={() => setActiveFile({ src: '/media/lichico/evidence/ogr-competitor-comparison.png', label: 'OGR / Competitor comparison' })}><img src="/media/lichico/evidence/ogr-competitor-comparison.png" alt="OGR competitor comparison" /><span>COMPETITOR + PRICE MAP ↗</span></button>
              <button className="lichico-local-hover" onClick={() => setActiveFile({ src: '/media/lichico/evidence/ogr-creator-reference.png', label: 'OGR / Creator reference' })}><img src="/media/lichico/evidence/ogr-creator-reference.png" alt="OGR creator reference board" /><span>CREATOR REFERENCE ↗</span></button>
            </div>
            <div className="lichico-tag-row"><i>POSITIONING</i><i>SOCIAL STRATEGY</i><i>CREATOR REFERENCES</i><i>ACCOUNT PLANNING</i></div>
          </article>
        </div>

      </div>

      {activeFile && (
        <div className="lichico-lightbox" role="dialog" aria-modal="true" aria-label={activeFile.label} onMouseDown={(event) => event.target === event.currentTarget && setActiveFile(null)}>
          <div>
            <ReturnIcon className="lichico-lightbox-close" onClick={() => setActiveFile(null)} label={t(lang, 'Close preview', '关闭预览', '關閉預覽')} />
            <img src={activeFile.src} alt={activeFile.label} />
            <span>{activeFile.label}</span>
          </div>
        </div>
      )}
    </section>
  )
}

function NetEaseOutcome({ lang }: { lang: Lang }) {
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const videos = [
    {
      title: 'Assuage', label: t(lang, 'WORD IN CONTEXT', '语境词汇', '語境詞彙'),
      summary: t(lang, 'A short language story that turns one useful word into an everyday situation.', '用日常情境把一个实用词汇变成可理解、可记忆的短故事。', '用日常情境把一個實用詞彙變成可理解、可記憶的短故事。'),
      src: '/media/netease/videos/assuage.mp4', poster: '/media/netease/posters/assuage.jpg',
    },
    {
      title: 'Dog Days', label: t(lang, 'IDIOM STORYTELLING', '习语故事', '習語故事'),
      summary: t(lang, 'A culturally grounded explanation reshaped for short-form viewing.', '把带有文化背景的习语解释，转化为适合短视频观看的内容。', '把帶有文化背景的習語解釋，轉化為適合短影片觀看的內容。'),
      src: '/media/netease/videos/dog-days.mp4', poster: '/media/netease/posters/dog-days.jpg',
    },
    {
      title: t(lang, 'Business English', '商务殷语', '商務殷語'), label: 'YOUDAO AI BOX / PRODUCT INTEGRATION',
      summary: t(lang, 'A workplace-English story that integrates Youdao AI Box without losing the learning value.', '以商务英语情境承接有道 AI Box 的产品信息，同时保留内容本身的学习价值。', '以商務英語情境承接有道 AI Box 的產品資訊，同時保留內容本身的學習價值。'),
      src: '/media/netease/videos/business-english.mp4', poster: '/media/netease/posters/business-english.jpg', featured: true,
    },
    {
      title: 'Tangle', label: t(lang, 'VOCABULARY IN CONTEXT', '情境词汇', '情境詞彙'),
      summary: t(lang, 'Character-led vocabulary content built around a memorable situation.', '围绕具有记忆点的角色与情境，组织词汇内容。', '圍繞具有記憶點的角色與情境，組織詞彙內容。'),
      src: '/media/netease/videos/tangle.mp4', poster: '/media/netease/posters/tangle.jpg',
    },
  ]
  const echoImages = [1, 2, 3, 4].map((index) => `/media/netease/hiecho/hi-echo-0${index}.png`)

  useEffect(() => {
    if (!activeImage) return
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setActiveImage(null)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [activeImage])

  return (
    <section className="archive-section netease-outcome" id="netease">
      <div className="archive-section-label">COMMERCIAL EXPERIENCE / NETEASE YOUDAO / 2023</div>
      <div className="netease-intro archive-reveal">
        <div>
          <span>CONTENT &amp; OPERATIONS INTERNSHIP</span>
          <h2>{t(lang, 'NetEase Youdao — learning content as a product bridge.', '网易有道——以学习内容连接用户与产品。', '網易有道——以學習內容連接用戶與產品。')}</h2>
        </div>
        <div>
          <p>{t(lang, 'An English-learning content account that earned attention through useful, character-led language stories, then connected that audience interest to Youdao’s AI and English-learning products.', '一个以实用、角色化的英语内容获取注意力，再将学习兴趣自然连接至有道 AI 与英语学习产品的内容账号。', '一個以實用、角色化的英語內容獲取注意力，再將學習興趣自然連接至有道 AI 與英語學習產品的內容帳號。')}</p>
          <p>{t(lang, 'My role covered format research, scripting, publishing and product-led storytelling. After my internship, the account evolved into another matrix channel as the team and content priorities changed; this archive documents the English-learning phase I contributed to.', '我的工作涵盖形式研究、脚本、发布及产品导向的内容表达。实习结束后，随着团队与内容方向调整，该账号逐步演变为其他矩阵账号；本页记录的是我参与的英语学习内容阶段。', '我的工作涵蓋形式研究、腳本、發布及產品導向的內容表達。實習結束後，隨着團隊與內容方向調整，該帳號逐步演變為其他矩陣帳號；本頁記錄的是我參與的英語學習內容階段。')}</p>
        </div>
      </div>

      <div className="netease-video-grid archive-reveal">
        {videos.map((video) => (
          <article className={`netease-video-card${video.featured ? ' is-featured' : ''}`} key={video.src}>
            <div className="netease-video-frame">
              <video src={video.src} poster={video.poster} muted playsInline controls preload="metadata" />
            </div>
            <div className="netease-video-copy">
              <span>{video.label}</span><h3>{video.title}</h3><p>{video.summary}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="netease-hiecho archive-reveal">
        <div className="netease-hiecho-copy">
          <span>HI ECHO / AI SPEAKING PRACTICE</span>
          <h3>{t(lang, 'Writing useful conversations before generative AI became commonplace.', '在生成式 AI 普及之前，写出真正有用的对话。', '在生成式 AI 普及之前，寫出真正有用的對話。')}</h3>
          <p>{t(lang, 'Alongside short-form production, I wrote and adapted dialogue outputs for Hi Echo, a speaking-practice product designed to make high-quality oral practice more accessible. In 2023, before today’s generative systems matured, human editorial judgement was essential: conversations had to sound natural, remain level-appropriate and support repeated practice.', '除短视频内容外，我还为 Hi Echo 编写和改写口语对话输出。产品希望降低优质口语练习的门槛。2023 年生成式 AI 尚未成熟，人工编辑判断尤为重要：对话既要自然、适配学习难度，也要支持反复跟练。', '除短影片內容外，我還為 Hi Echo 編寫和改寫口語對話輸出。產品希望降低優質口語練習的門檻。2023 年生成式 AI 尚未成熟，人工編輯判斷尤為重要：對話既要自然、適配學習難度，也要支持反覆跟練。')}</p>
          <blockquote>{t(lang, 'Main takeaway — Educational content earns attention before promotion asks for it. Product integration works best when the learning value remains clear, and early AI products still depended on careful human writing to create useful practice.', '核心收获——教育内容先提供价值，再承接产品。有效的产品植入应保持学习价值清晰；早期 AI 产品也依赖细致的人工写作，才能形成真正有用的练习。', '核心收穫——教育內容先提供價值，再承接產品。有效的產品植入應保持學習價值清晰；早期 AI 產品也依賴細緻的人工寫作，才能形成真正有用的練習。')}</blockquote>
        </div>
        <div className="netease-hiecho-grid">
          {echoImages.map((src, index) => <button key={src} onClick={() => setActiveImage(src)} aria-label={t(lang, `Open Hi Echo screen ${index + 1}`, `打开 Hi Echo 截图 ${index + 1}`, `打開 Hi Echo 截圖 ${index + 1}`)}><img src={src} alt={`Hi Echo screen ${index + 1}`} /></button>)}
        </div>
      </div>

      {activeImage && (
        <div className="netease-lightbox" role="dialog" aria-modal="true" onMouseDown={(event) => event.target === event.currentTarget && setActiveImage(null)}>
          <figure><button onClick={() => setActiveImage(null)} aria-label={t(lang, 'Close image', '关闭图片', '關閉圖片')}>×</button><img src={activeImage} alt="Hi Echo interface" /></figure>
        </div>
      )}
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
        <h2>{t(lang, 'Every film I made is both a creative record and an attempt to understand questions I have not yet answered.', '我的每一部电影，都是一份创作记录，也是一个我对未解决问题的思考。', '我的每一部電影，都是一份創作記錄，也是一次對尚未解答問題的思考。')}</h2>
        <p>{t(lang, 'Across this archive, I move between directing, screenwriting, cinematography, producing, editing and post-production—taking the role each story needs and carrying work from development to final delivery.', '在这组作品中，我在导演、编剧、摄影、制片、剪辑与后期之间切换，根据每个故事的需要承担角色，并把项目从开发推进到最终交付。', '在這組作品中，我在導演、編劇、攝影、製片、剪輯與後期之間切換，根據每個故事的需要承擔角色，並把項目從開發推進到最終交付。')}</p>
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
  return (
    <footer className="archive-contact">
      <span>CONTACT / AVAILABILITY / 2026</span>
      <h2>{t(lang, 'Available for film, production and visual-content opportunities.', '期待电影、制片与视觉内容方向的合作机会。', '期待電影、製片與視覺內容方向的合作機會。')}</h2>
      <a className="archive-contact-email" href="mailto:canlibx@outlook.com">canlibx@outlook.com ↗</a>
      <div className="archive-contact-links">
        <a href="/Tang_Li_Hazel_CV.docx" download>RÉSUMÉ ↓</a>
        <a className="archive-contact-linkedin" href="https://www.linkedin.com/in/tang-li-959874263/" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
        <a href="#top">{t(lang, 'BACK TO TOP ↑', '返回顶部 ↑', '返回頂部 ↑')}</a>
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
      <LichicoOutcome lang={lang} />
      <NetEaseOutcome lang={lang} />
      <FilmArchive lang={lang} onOpen={setProject} />
      <TheatreArchive lang={lang} onOpen={setProject} />
      <SkillsNetwork lang={lang} />
      <ArchiveFooter lang={lang} />
      {project && <ProjectDrawer key={project.id} project={project} lang={lang} onClose={() => setProject(null)} />}
    </main>
  )
}

export default App
