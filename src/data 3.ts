export type Lang = 'en' | 'zh' | 'tc'
export type Localized = Record<Lang, string>

export const local = (en: string, zh: string, tc = zh): Localized => ({ en, zh, tc })

// START HERE when editing the About Me section in StackBlitz.
// Only replace the text between quotation marks; keep the surrounding punctuation.
export const aboutMe = {
  headline: local(
    'A maker who carries an idea from research to release.',
    '把一个想法从研究一路带到最终发布。',
    '把一個想法從研究一路帶到最終發布。',
  ),
  introduction: local(
    'Hazel Li works across moving image, production, visual research and branded content. Her practice moves between narrative filmmaking, documentary observation, theatre production and data-informed short-form storytelling.',
    '李瑭（Hazel）的实践横跨影像创作、制片、视觉研究与品牌内容，在剧情片、观察式纪录片、戏剧制作和数据驱动的短视频叙事之间流动。',
    '李瑭（Hazel）的實踐橫跨影像創作、製片、視覺研究與品牌內容，在劇情片、觀察式紀錄片、戲劇製作和數據驅動的短視頻敘事之間流動。',
  ),
  detail: local(
    'Rather than separating research from production, she treats each project as a connected process: finding the question, shaping the visual language, coordinating the work, and following the idea through to its final form.',
    '她不把研究与制作分开，而是把每个项目看作一个连续过程：找到问题、建立视觉语言、协调实际工作，并将想法推进到最终形态。',
    '她不把研究與製作分開，而是把每個項目看作一個連續過程：找到問題、建立視覺語言、協調實際工作，並將想法推進到最終形態。',
  ),
}

export const lichicoAccountNote = local(
  "This project was produced during my internship at JingQiYueDong, where I worked on the marketing and production of Lichico treadmills. After the collaboration ended, the company retained ownership of the official account and later renamed it. During my internship, the account operated as LICHICO OFFICIAL. This case study focuses on my contribution to the creative strategy and production process rather than the account's current operation.",
  '本项目完成于我在竞启跃动实习期间，我负责 Lichico 跑步机的营销内容与制作。合作结束后，公司保留了官方账号的所有权并在之后更名；实习期间该账号以 LICHICO OFFICIAL 名义运营。本案例聚焦于我对创意策略与制作流程的贡献，而非账号当前的运营状态。',
  '本項目完成於我在競啟躍動實習期間，我負責 Lichico 跑步機的營銷內容與製作。合作結束後，公司保留了官方帳號的所有權並在之後更名；實習期間該帳號以 LICHICO OFFICIAL 名義營運。本案例聚焦於我對創意策略與製作流程的貢獻，而非帳號當前的營運狀態。',
)

export type ProjectKind = 'film' | 'theatre' | 'commercial'

export interface Project {
  id: string
  kind: ProjectKind
  title: Localized
  englishTitle?: string
  year: string
  role: Localized
  summary: Localized
  responsibilities?: Localized
  reflection?: Localized
  image?: string
  accent: string
  externalUrl?: string
  embedUrl?: string
  videoSrc?: string
  category?: 'short' | 'documentary'
  posterImage?: string
  previewVideo?: string
  videoAspectRatio?: '4:3' | '16:9' | '9:16'
  directorNotePreview?: Localized
  archiveLabel?: Localized
  connections?: Localized[]
  gallery?: Array<{ src: string; alt: Localized; type?: 'still' | 'bts' }>
  inspiration?: Localized
  platform?: string
  metrics?: Array<{ label: Localized; value: string }>
  featured?: boolean
  priority?: 'hero' | 'standard'
}

const waiting = local(
  'Full role description and project notes to be updated.',
  '完整职责说明与项目笔记待补充。',
  '完整職責說明與項目筆記待補充。',
)

const reflectionWaiting = local(
  'Creative reflection to be added.',
  '创作反思待补充。',
  '創作反思待補充。',
)

export const films: Project[] = [
  {
    id: 'lihua', kind: 'film', title: local("Lihua’s Wishes", '丽华的愿望', '麗華的願望'),
    englishTitle: "Lihua’s Wishes", year: '2024', category: 'short', priority: 'hero', featured: true, accent: '#a76742',
    role: local('Director · Director of Photography · Producer', '导演 · 摄影指导 · 制片', '導演 · 攝影指導 · 製片'),
    summary: local(
      'Graduation film · Foshan, China · 6–10 April 2024. Inspired by a close family member who has spent a lifetime caring for others before herself, the film follows a middle-aged mother supporting her family through a small rice-noodle shop while navigating an absent ex-husband, two children and an unexpected illness.',
      '毕业作品 · 中国佛山 · 2024 年 4 月 6—10 日。作品源于一位总把他人放在自己之前的亲近家人：一位中年母亲经营着小小的米粉店维持全家，同时面对缺席的前夫、两个孩子与突如其来的疾病。',
      '畢業作品 · 中國佛山 · 2024 年 4 月 6—10 日。作品源於一位總把他人放在自己之前的親近家人：一位中年母親經營着小小的米粉店維持全家，同時面對缺席的前夫、兩個孩子與突如其來的疾病。',
    ),
    responsibilities: local(
      'My first production leading a 13-member crew while working simultaneously as director, DP and part-time producer. I carried the project across development, casting, scheduling, on-set decision-making and post-production under a tight schedule.',
      '这是我第一次带领 13 人团队，并同时承担导演、摄影指导与部分制片工作。在紧凑排期下，我负责开发、选角、排期、现场创作决策与后期推进。',
      '這是我第一次帶領 13 人團隊，並同時承擔導演、攝影指導與部分製片工作。在緊湊排期下，我負責開發、選角、排期、現場創作決策與後期推進。',
    ),
    inspiration: local(
      'Influenced by Jiang Wenli’s We Are Looking at the Sky (2009) and Michael Haneke’s Amour (2012), the film explores care, ageing and a central question: what remains of a person’s own wishes after a lifetime devoted to everyone else?',
      '影片受到蒋雯丽《我们天上见》（2009）与 Michael Haneke《爱》（2012）的启发，讨论照护、衰老，以及一个核心问题：当一个人把一生都交给他人之后，她自己的愿望还剩下什么？',
      '影片受到蔣雯麗《我們天上見》（2009）與 Michael Haneke《愛》（2012）的啟發，討論照護、衰老，以及一個核心問題：當一個人把一生都交給他人之後，她自己的願望還剩下甚麼？',
    ),
    reflection: local(
      'Balancing directing, cinematography and production taught me to make creative decisions while solving practical problems in real time. Looking back, I would spend more time guiding emotionally nuanced performances and refining visual details instead of allowing efficiency to dominate. The project clarified that filmmaking is a constant negotiation between production reality and creative ambition.',
      '同时平衡导演、摄影与制片，让我学会在不断解决现实问题的同时做出创作决定。回看这次经验，我希望自己当时能把更多时间留给细腻的表演引导与视觉细节，而不是让效率主导一切。它让我更清楚地理解：电影制作始终是在生产现实与创作野心之间进行协商。',
      '同時平衡導演、攝影與製片，讓我學會在不斷解決現實問題的同時作出創作決定。回看這次經驗，我希望自己當時能把更多時間留給細膩的表演引導與視覺細節，而不是讓效率主導一切。它讓我更清楚地理解：電影製作始終是在生產現實與創作野心之間進行協商。',
    ),
    archiveLabel: local('Graduation Film · Foshan', '毕业作品 · 佛山', '畢業作品 · 佛山'),
    directorNotePreview: local('Care, ageing and the wishes left behind after a lifetime devoted to others.', '照护、衰老，以及把一生交给他人之后留下的愿望。', '照護、衰老，以及把一生交給他人之後留下的願望。'),
    connections: [
      local('caregiving', '照护', '照護'),
      local('family memory', '家庭记忆', '家庭記憶'),
      local('production reality', '制作现实', '製作現實'),
      local('creative ambition', '创作野心', '創作野心'),
    ],
    externalUrl: 'https://www.bilibili.com/video/BV1msGXeSEFf/',
    embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1msGXeSEFf&page=1',
  },
  {
    id: 'wind', kind: 'film', title: local('Find the Shape of the Wind', '寻找风的形状', '尋找風的形狀'),
    englishTitle: 'Find the Shape of the Wind', year: '2023', category: 'short', priority: 'hero', featured: true, accent: '#47696e',
    role: local('Director · Writer', '导演 · 编剧', '導演 · 編劇'),
    image: '/media/wind/wind-iconic.png',
    summary: local(
      'Adapted from the director’s own experience, the film follows a university student standing at the edge of the ivory tower. She longs for the “freedom” described by others, yet hesitates before the more complicated world beyond it. Between other people’s freedom and the future imagined by her mother, which road can carry her farther?',
      '作品改编自导演的真实经历，讲述一名即将迈出象牙塔的大学生。她向往他人口中的“自由”，却又对塔外更复杂的世界心存退意。她或许像井底之蛙，只能从别人的描述中想象自由；也或许只是在借犹豫逃避未知。“别人嘴里的自由”和“妈妈嘴里的前程”，究竟哪一条路能把她送得更远？',
      '作品改編自導演的真實經歷，講述一名即將邁出象牙塔的大學生。她嚮往他人口中的「自由」，卻又對塔外更複雜的世界心存退意。她或許像井底之蛙，只能從別人的描述中想像自由；也或許只是在借猶豫逃避未知。「別人嘴裡的自由」和「媽媽嘴裡的前程」，究竟哪一條路能把她送得更遠？',
    ),
    responsibilities: local(
      'Developed the concept from personal experience, wrote the circular narrative, directed performance and shaped the visual language from pre-production through post.',
      '从个人经验发展概念，完成环形叙事剧本，并负责表演指导与从前期到后期的整体视觉语言。',
      '從個人經驗發展概念，完成環形敘事劇本，並負責表演指導與從前期到後期的整體視覺語言。',
    ),
    inspiration: local(
      'The visual rhythm draws on Wes Anderson’s precise compositions, controlled palette and storybook distance. The circular structure returns the protagonist to where she began, leaving departure as a question rather than an answer.',
      '视觉节奏受到 Wes Anderson 精确构图、克制色彩与童话式疏离感的启发。环形叙事让主人公最终回到出发点，使“离开”不再是答案，而成为一个持续追问的问题。',
      '視覺節奏受到 Wes Anderson 精確構圖、克制色彩與童話式疏離感的啟發。環形敘事讓主人公最終回到出發點，使「離開」不再是答案，而成為一個持續追問的問題。',
    ),
    reflection: local(
      'The film is less interested in choosing the correct future than in capturing the suspended moment before a choice—when family expectation, borrowed ideas of freedom and fear of uncertainty all speak at once.',
      '影片无意替主人公选择“正确”的未来，而是希望捕捉选择发生前的悬置时刻：家庭期待、借来的自由想象，以及对未知的恐惧同时发声。',
      '影片無意替主人公選擇「正確」的未來，而是希望捕捉選擇發生前的懸置時刻：家庭期待、借來的自由想像，以及對未知的恐懼同時發聲。',
    ),
    archiveLabel: local('Narrative Short · UCL', '剧情短片 · UCL', '劇情短片 · UCL'),
    directorNotePreview: local('A suspended moment between borrowed freedom, family expectation and fear of the unknown.', '在借来的自由、家庭期待与未知恐惧之间悬停的时刻。', '在借來的自由、家庭期待與未知恐懼之間懸停的時刻。'),
    connections: [
      local('family expectation', '家庭期待', '家庭期待'),
      local('freedom', '自由', '自由'),
      local('circular structure', '环形叙事', '環形敘事'),
      local('directing', '导演', '導演'),
    ],
    gallery: [
      { src: '/media/wind/wind-map.png', type: 'still', alt: local('The protagonist studies a map in the garden.', '主人公在花园中查看地图。', '主人公在花園中查看地圖。') },
      { src: '/media/wind/wind-profile-wide.png', type: 'still', alt: local('A profile portrait under a clear blue sky.', '蓝天下的主人公侧面特写。', '藍天下的主人公側面特寫。') },
      { src: '/media/wind/wind-bts.jpg', type: 'bts', alt: local('Behind the scenes during production.', '拍摄现场幕后花絮。', '拍攝現場幕後花絮。') },
    ],
    externalUrl: 'https://www.bilibili.com/video/BV19M4y1a7M5/',
    embedUrl: 'https://player.bilibili.com/player.html?bvid=BV19M4y1a7M5&page=1',
  },
  {
    id: 'vexations', kind: 'film', title: local('Vexations', 'Vexations', 'Vexations'),
    year: '2024', category: 'short', featured: true, accent: '#8b3329', image: '/media/vexations/vexations-cover.png', role: local('Director', '导演', '導演'),
    summary: local(
      'A dancer who has spent years away from the stage suffers from persistent insomnia, haunted by the uncertainty of whether she will ever perform again. When she finally receives a rare opportunity to return to the stage, exhaustion and anxiety overwhelm her, causing her to miss the entire performance. She appears only at the final curtain call. Yet as she steps into the light, one question remains: did the performance truly happen, or is the stage another reality constructed by her unconscious desire?',
      '一位多年无缘舞台的舞者长期失眠。当难得的演出机会终于出现，疲惫与焦虑却让她错过了整场表演，只在谢幕时走上舞台。面对空荡的舞台，一个疑问仍未消失：这一刻是真实发生，还是潜意识欲望制造的又一个梦？',
      '一位多年無緣舞台的舞者長期失眠。當難得的演出機會終於出現，疲憊與焦慮卻讓她錯過了整場表演，只在謝幕時走上舞台。面對空蕩的舞台，一個疑問仍未消失：這一刻是真實發生，還是潛意識慾望製造的又一個夢？',
    ),
    responsibilities: local(
      'Developed as a film remake / experimental narrative short. I directed the performance and used repetition, temporal fracture and withheld information to let the backstage interval become a psychological space rather than a stable reality.',
      '作为“电影重构／实验叙事短片”开发。我通过表演指导、重复、时间断裂与信息留白，让舞台休息间隙逐渐转化为心理空间，而非稳定现实。',
      '作為「電影重構／實驗敘事短片」開發。我通過表演指導、重複、時間斷裂與資訊留白，讓舞台休息間隙逐漸轉化為心理空間，而非穩定現實。',
    ),
    inspiration: local(
      'The film takes its title and musical structure from Erik Satie’s Vexations, using Igor Levit’s short interpretation as its central score. The restrained, repetitive piano motif becomes an emotional loop of insomnia, longing and self-doubt. The project also draws on dream logic in David Lynch’s cinema and Freud’s The Interpretation of Dreams, particularly the idea that unresolved desires and frustrations are reconstructed in the unconscious.',
      '影片以 Igor Levit 演绎的 Erik Satie《Vexations》短版为结构核心：一个单音钢琴动机不断重复，直至产生心理上的不稳定感。David Lynch 的梦境逻辑与 Freud《梦的解析》启发了影片关于压抑欲望与未解决冲突如何构成另一重现实的想象。',
      '影片以 Igor Levit 演繹的 Erik Satie《Vexations》短版為結構核心：一個單音鋼琴動機不斷重複，直至產生心理上的不穩定感。David Lynch 的夢境邏輯與 Freud《夢的解析》啟發了影片關於壓抑慾望與未解決衝突如何構成另一重現實的想像。',
    ),
    reflection: local(
      'Vexations explores the fragile boundary between reality and dreams through an artist experiencing creative stagnation. The dancer’s imagined return to the stage becomes a projection of her deepest desire, where ambition, failure and memory merge into an alternative reality. Rather than clearly separating dream from reality, the film asks whether dreams are merely an escape, or whether they reveal a truth that waking life cannot articulate.',
      '《Vexations》从一位陷入创作停滞的艺术家出发，探索现实与梦境之间脆弱的边界。她想象中的重返舞台，成为失败、野心与记忆汇合的投射空间。影片不解释哪些画面真实，而是追问：梦究竟是对现实的逃离，还是现实无法表达的真相？',
      '《Vexations》從一位陷入創作停滯的藝術家出發，探索現實與夢境之間脆弱的邊界。她想像中的重返舞台，成為失敗、野心與記憶匯合的投射空間。影片不解釋哪些畫面真實，而是追問：夢究竟是對現實的逃離，還是現實無法表達的真相？',
    ),
    gallery: [
      { src: '/media/vexations/vexations-still-01.png', type: 'still', alt: local('The dancer speaks in a rehearsal room.', '舞者在排练室中。', '舞者在排練室中。') },
      { src: '/media/vexations/vexations-still-02.png', type: 'still', alt: local('A distorted warning sign becomes part of the dream language.', '变形的警示牌进入梦境语言。', '變形的警示牌進入夢境語言。') },
    ],
    videoAspectRatio: '4:3',
    archiveLabel: local('Experimental Narrative Short', '实验叙事短片', '實驗敘事短片'),
    directorNotePreview: local('Insomnia, performance and unconscious desire repeat as one unresolved loop.', '失眠、表演与潜意识欲望，重复成一个未完成的循环。', '失眠、表演與潛意識慾望，重複成一個未完成的循環。'),
    connections: [
      local('performance', '表演', '表演'),
      local('insomnia', '失眠', '失眠'),
      local('unconscious desire', '潜意识欲望', '潛意識慾望'),
      local('theatre / moving image', '戏剧／影像', '戲劇／影像'),
    ],
    externalUrl: 'https://www.bilibili.com/video/BV1wE421G7DL/',
    embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1wE421G7DL&page=1',
  },
  {
    id: 'inner-voice', kind: 'film', title: local('Inner Voice: The Stranger', '内心声音：陌生人', '內心聲音：陌生人'),
    year: 'UCL', category: 'short', accent: '#667064', role: local('Cinematographer', '摄影', '攝影'), summary: local('Short film project.', '短片项目。', '短片項目。'), responsibilities: waiting, reflection: reflectionWaiting,
    externalUrl: 'https://www.bilibili.com/video/BV1qu4y1f716/', embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1qu4y1f716&page=1',
  },
  {
    id: 'fall-in-love', kind: 'film', title: local('I Think I Fall in Love with You', '我想我爱上你了', '我想我愛上你了'),
    year: 'UCL', category: 'short', accent: '#8a745f', role: local('Director', '导演', '導演'), summary: local('Narrative short film project.', '剧情短片项目。', '劇情短片項目。'), responsibilities: waiting, reflection: reflectionWaiting,
    externalUrl: 'https://www.bilibili.com/video/BV17s4y1r7By/', embedUrl: 'https://player.bilibili.com/player.html?bvid=BV17s4y1r7By&page=1',
  },
  {
    id: 'somewhere-safe', kind: 'film', title: local('Somewhere Safe', '安全之地', '安全之地'),
    year: 'UCL', category: 'short', accent: '#495b61', role: local('Producer', '制片', '製片'), summary: local('Independent student short film.', '学生独立短片项目。', '學生獨立短片項目。'), responsibilities: waiting, reflection: reflectionWaiting,
    externalUrl: 'https://www.bilibili.com/video/BV1eg4y157Vy/', embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1eg4y157Vy&page=1',
  },
  {
    id: 'street-art', kind: 'film', title: local('Window to Street Art', '街头艺术之窗', '街頭藝術之窗'),
    year: '2022', category: 'documentary', accent: '#816647', role: local('Cinematographer', '摄影', '攝影'), summary: local('An observational documentary on London street artist Nathan Bowen.', '关于伦敦街头艺术家 Nathan Bowen 的观察式纪录片。', '關於倫敦街頭藝術家 Nathan Bowen 的觀察式紀錄片。'), responsibilities: local('Character research, interview preparation, observational footage and visual storytelling.', '人物研究、访谈准备、观察式拍摄与视觉叙事。', '人物研究、訪談準備、觀察式拍攝與視覺敘事。'), reflection: reflectionWaiting,
    externalUrl: 'https://www.bilibili.com/video/BV1SG4y1w7C6/', embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1SG4y1w7C6&page=1',
  },
  {
    id: 'blossom', kind: 'film', title: local('Blossom in Her Palm', '掌心花开', '掌心花開'),
    year: '2023', category: 'documentary', accent: '#78655d', role: local('Producer', '制片', '製片'), summary: local('A documentary portrait of a Chinese medicine practitioner in London.', '一部关于伦敦中医从业者的纪录片。', '一部關於倫敦中醫從業者的紀錄片。'), responsibilities: local('Project planning, subject coordination, scheduling and documentary structure.', '项目规划、拍摄对象沟通、排期与纪录片结构。', '項目規劃、拍攝對象溝通、排期與紀錄片結構。'), reflection: reflectionWaiting,
    externalUrl: 'https://www.bilibili.com/video/BV1RT421D7Ej/', embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1RT421D7Ej&page=1',
  },
]

export const theatre: Project[] = [
  {
    id: 'green-snake', kind: 'theatre', title: local('The Green Snake', '青蛇', '青蛇'), englishTitle: 'The Green Snake', year: '2023.03', priority: 'hero', featured: true, accent: '#277a78', image: '/media/the-green-snake.png',
    role: local('Executive Director', '执行导演', '執行導演'), summary: local('A key theatre production developed with London Morning Mist Chinese Drama Society.', '伦敦晨雾中文剧社重点剧目。', '倫敦晨霧中文劇社重點劇目。'),
    responsibilities: local('Supported production delivery, public-facing communication and promotional content across social platforms.', '参与制作执行、对外沟通与社交平台宣传内容。', '參與製作執行、對外溝通與社交平台宣傳內容。'), reflection: reflectionWaiting,
    externalUrl: 'https://www.bilibili.com/video/BV1gg4y1c758/', embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1gg4y1c758&page=1',
  },
  {
    id: 'twenty-four-hours', kind: 'theatre', title: local('24 Hours in the Life of a Woman', '一个女人一生中的24小时', '一個女人一生中的24小時'), year: '2022.11', accent: '#81775e', image: '/media/24-hours.png',
    role: local('Secretary General', '秘书长', '秘書長'), summary: local('Theatre production presented in London.', '于伦敦演出的剧场作品。', '於倫敦演出的劇場作品。'), responsibilities: waiting, reflection: reflectionWaiting,
    externalUrl: 'https://www.bilibili.com/video/BV1ro4y1Y7HR/', embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1ro4y1Y7HR&page=1',
  },
  {
    id: 'secret-502', kind: 'theatre', title: local('502 Secret', '502蜜事', '502蜜事'), year: '2022.03', accent: '#d67855', image: '/media/502-secret.png',
    role: local('Photographer', '摄影师', '攝影師'), summary: local('Theatre production and promotional image project.', '剧场演出与宣传影像项目。', '劇場演出與宣傳影像項目。'), responsibilities: waiting, reflection: reflectionWaiting,
    externalUrl: 'https://mp.weixin.qq.com/s/mDY8II77WdByR7Qtt0KlyQ',
  },
  {
    id: 'pillowman', kind: 'theatre', title: local('The Pillowman', '枕头人', '枕頭人'), year: '2024.03', accent: '#a11f17', image: '/media/the-pillowman.jpg',
    role: local('Secretary General', '秘书长', '秘書長'), summary: local('A London theatre production supported through society operations and coordination.', '通过剧社运营与协调支持的伦敦演出项目。', '通過劇社運營與協調支持的倫敦演出項目。'), responsibilities: waiting, reflection: reflectionWaiting,
    externalUrl: 'https://www.bilibili.com/video/BV1Krb4z3EjM/', embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1Krb4z3EjM&page=1',
  },
]

export const commercials: Project[] = [
  {
    id: 'lichico', kind: 'commercial', title: local('Lichico Global Content', 'Lichico 品牌出海内容', 'Lichico 品牌出海內容'), year: '2024–2025', featured: true, accent: '#7f5c43', platform: 'TikTok',
    role: local('Creative Content Producer (Intern)', '创意内容制作（实习）', '創意內容製作（實習）'),
    summary: local('A strategy-to-production content system for Lichico foldable treadmills in the US TikTok Shop market.', '为 Lichico 折叠跑步机进入美国 TikTok Shop 市场建立从策略到制作的内容系统。', '為 Lichico 摺疊跑步機進入美國 TikTok Shop 市場建立從策略到製作的內容系統。'),
    responsibilities: local('Research, creative strategy, scripting, filming, editing, publishing copy and performance-led iteration. I scripted 21 creative videos that each surpassed 10K views, compared with the account’s typical 1K–2K baseline.', '研究、创意策略、脚本、拍摄、剪辑、发布文案与基于表现的快速迭代。我为 21 条创意视频编写脚本，每条播放量均超过 10K，而该账号常规内容通常为 1K–2K。', '研究、創意策略、腳本、拍攝、剪輯、發布文案與基於表現的快速迭代。我為 21 條創意視頻編寫腳本，每條播放量均超過 10K，而該帳號常規內容通常為 1K–2K。'),
    reflection: local('Research gave the work direction; production tested it; performance data determined what to refine next. The strongest outcome was a repeatable loop from insight to execution.', '研究为内容确定方向，制作负责验证，数据决定下一轮优化。最重要的成果，是建立了一个可以重复运行的“洞察—执行”闭环。', '研究為內容確定方向，製作負責驗證，數據決定下一輪優化。最重要的成果，是建立了一個可以重複運行的「洞察—執行」閉環。'),
    externalUrl: 'https://www.tiktok.com/@sunnystylemart',
    metrics: [
      { label: local('Videos delivered', '交付视频', '交付視頻'), value: '21' },
      { label: local('Organic exposure', '自然曝光', '自然曝光'), value: '200K+' },
    ],
  },
  {
    id: 'netease', kind: 'commercial', title: local('NetEase Youdao Content', '网易有道内容运营', '網易有道內容運營'), year: '2023', featured: true, accent: '#785247', platform: 'Douyin · RED · WeChat',
    role: local('English Short-form Video Content & Operations Intern', '英语短视频内容与运营实习生', '英語短視頻內容與運營實習生'),
    summary: local('English-learning short-form content across four themes, combining educational topics, platform trends and user feedback.', '围绕四类主题制作英语学习短视频，结合教育内容、平台趋势与用户反馈。', '圍繞四類主題製作英語學習短視頻，結合教育內容、平台趨勢與用戶反饋。'),
    responsibilities: local('Scriptwriting, publishing, engagement analysis, audience segmentation and content iteration.', '脚本撰写、发布、互动数据分析、用户细分与内容迭代。', '腳本撰寫、發布、互動數據分析、用戶細分與內容迭代。'), reflection: local('Selected links and case-study notes to be added.', '精选链接与案例复盘待补充。', '精選連結與案例復盤待補充。'),
    metrics: [
      { label: local('Videos published', '发布视频', '發布視頻'), value: '57' },
      { label: local('Douyin views', '抖音播放', '抖音播放'), value: '3M+' },
      { label: local('RED views', '小红书播放', '小紅書播放'), value: '1M+' },
      { label: local('Follower growth', '粉丝增长', '粉絲增長'), value: '1K+' },
    ],
  },
]

export interface LichicoVideo {
  id: string
  views: string
  poster: string
  src: string
  descriptor: Localized
}

export const lichicoHighlights: LichicoVideo[] = [
  { id: 'dollar-concept', views: '79.6K', poster: '/media/lichico/posters/dollar-79-6k.png', src: '/media/lichico/videos/lichico-dollar-concept.mp4', descriptor: local('Character hook / product comedy', '人物钩子 / 产品喜剧', '人物鈎子 / 產品喜劇') },
  { id: 'ring-transition', views: '15.7K', poster: '/media/lichico/posters/ring-15-7k.png', src: '/media/lichico/videos/lichico-ring-transition.mp4', descriptor: local('Ring transition / visual reveal', '戒指转场 / 视觉揭示', '戒指轉場 / 視覺揭示') },
  { id: 'watch-your-back', views: '10.4K', poster: '/media/lichico/posters/watch-your-back-10-4k.png', src: '/media/lichico/videos/lichico-watch-your-back.mp4', descriptor: local('Narrative tension / product payoff', '剧情张力 / 产品落点', '劇情張力 / 產品落點') },
  { id: 'product-test', views: '13.2K', poster: '/media/lichico/posters/product-test-13-2k.png', src: '/media/lichico/videos/lichico-product-test.mp4', descriptor: local('Product test / usage demonstration', '产品测试 / 使用演示', '產品測試 / 使用演示') },
  { id: 'home-treadmill', views: '520.3K', poster: '/media/lichico/posters/home-treadmill-520-3k.png', src: '/media/lichico/videos/lichico-home-treadmill.mp4', descriptor: local('Home treadmill / direct benefit', '家庭走步机 / 直接利益点', '家庭走步機 / 直接利益點') },
  { id: 'led-transition', views: 'LOCAL MASTER', poster: '/media/lichico/posters/led-transition-local.png', src: '/media/lichico/videos/lichico-led-transition.mp4', descriptor: local('LED transition / original concept', 'LED 转场 / 原创概念', 'LED 轉場 / 原創概念') },
]

export interface LichicoEvidence {
  id: string
  title: Localized
  whatIDid: Localized
  items: Localized[]
  image: string
  imageLabel: Localized
  secondaryImage?: string
  secondaryImageLabel?: Localized
  detail?: Localized
  reserved: Localized[]
}

export const lichicoEvidence: LichicoEvidence[] = [
  {
    id: 'market-research',
    title: local('Market Research', '市场研究', '市場研究'),
    whatIDid: local('Mapped competitors, audience behaviours and product opportunities before any creative production.', '在创意制作前梳理竞品、受众行为与产品机会。', '在創意製作前梳理競品、受眾行為與產品機會。'),
    items: [local('Competitor analysis', '竞品分析', '競品分析'), local('Social listening', '社媒聆听', '社媒聆聽'), local('User pain points', '用户痛点', '用戶痛點'), local('Product positioning', '产品定位', '產品定位')],
    image: '/media/lichico/evidence/ogr-competitor-comparison.png',
    imageLabel: local('OGR competitor and price comparison', 'OGR 竞品与价格对比', 'OGR 競品與價格對比'),
    reserved: [local('Social listening extract', '社媒聆听节选', '社媒聆聽節選'), local('Pricing comparison', '价格带对比', '價格帶對比')],
  },
  {
    id: 'creative-strategy',
    title: local('Creative Strategy', '创意策略', '創意策略'),
    whatIDid: local('Translated product features into platform-native storytelling, creator frameworks and timely remakes of 2024–2025 TikTok trends.', '把产品卖点转化为符合平台语境的叙事、达人框架，并结合 2024–2025 TikTok 热点进行及时翻拍，持续训练平台网感。', '把產品賣點轉化為符合平台語境的敘事、達人框架，並結合 2024–2025 TikTok 熱點進行及時翻拍，持續訓練平台網感。'),
    items: [local('Creator reference board', '达人参考板', '達人參考板'), local('Content framework', '内容框架', '內容框架'), local('Video planning', '视频策划', '視頻策劃'), local('Story structure', '叙事结构', '敘事結構')],
    image: '/media/lichico/evidence/lichico-video-structure.png',
    imageLabel: local('Creative insights of video structure', '视频结构创意洞察', '視頻結構創意洞察'),
    secondaryImage: '/media/lichico/evidence/lichico-trend-structure.png',
    secondaryImageLabel: local('Trend-led structure and reference review', '热点趋势结构与参考复盘', '熱點趨勢結構與參考復盤'),
    reserved: [local('Storyboard', '故事板', '故事板'), local('Content matrix', '内容矩阵', '內容矩陣')],
  },
  {
    id: 'production',
    title: local('Production', '制作执行', '製作執行'),
    whatIDid: local('Planned and produced short-form videos from scripting and publishing copy to the final edit.', '从脚本、发布文案到最终剪辑，规划并制作短视频内容。', '從腳本、發布文案到最終剪輯，規劃並製作短視頻內容。'),
    items: [local('Shot list', '镜头清单', '鏡頭清單'), local('Camera planning', '机位规划', '機位規劃'), local('Filming workflow', '拍摄流程', '拍攝流程'), local('Editing & publishing copy', '剪辑与发布文案', '剪輯與發布文案')],
    image: '/media/lichico/evidence/lichico-shot-list.png',
    imageLabel: local('Product-proof shot list', '卖点证明镜头表', '賣點證明鏡頭表'),
    reserved: [local('Monitor records', '监看记录', '監看記錄'), local('Lighting setup', '灯光方案', '燈光方案')],
  },
  {
    id: 'campaign-execution',
    title: local('Campaign Execution', '活动执行', '活動執行'),
    whatIDid: local('Scaled content production for seasonal campaigns while iterating creatives based on performance.', '为季节性活动扩大量产，并基于表现快速迭代创意。', '為季節性活動擴大量產，並基於表現快速迭代創意。'),
    items: [local('Black Friday campaign', '黑五活动', '黑五活動'), local('High-volume production', '高频内容生产', '高頻內容生產'), local('Rapid creative iteration', '快速创意迭代', '快速創意迭代'), local('Team campaign results', '团队活动成果', '團隊活動成果')],
    image: '/media/lichico/evidence/fastmoss-black-friday-full.jpg',
    imageLabel: local('Original FastMoss Black Friday ranking', 'FastMoss 黑五榜单原图', 'FastMoss 黑五榜單原圖'),
    detail: local('Through continuous A/B testing, we analysed high-performing videos and historical data to identify recurring keywords and creative elements. We repeatedly validated which messages strengthened trust and conversion among international retail consumers, turning consumer insights and trust signals into a repeatable optimisation loop.', '通过持续的 A/B 测试，我们分析高表现视频与历史数据，归纳高频关键词和创意元素，并反复验证哪些信息最能赢得海外零售消费者的信任与青睐、促进转化，从而把消费者洞察与信任信号沉淀为可复用的优化循环。', '通過持續的 A/B 測試，我們分析高表現視頻與歷史數據，歸納高頻關鍵詞和創意元素，並反覆驗證哪些信息最能贏得海外零售消費者的信任與青睞、促進轉化，從而把消費者洞察與信任信號沉澱為可復用的優化循環。'),
    reserved: [local('Publishing workflow', '发布流程', '發布流程'), local('Analytics review', '数据复盘', '數據複盤')],
  },
]

export const abilities = [
  { index: '01', title: local('Visual Development', '视觉开发', '視覺開發'), items: local('Visual research · Reference development · Moodboards · Shot design · Visual tone · Image selection', '视觉研究 · 参考开发 · 情绪板 · 镜头设计 · 影调定义 · 图像筛选', '視覺研究 · 參考開發 · 情緒板 · 鏡頭設計 · 影調定義 · 圖像篩選') },
  { index: '02', title: local('Directing & Camera', '导演与摄影', '導演與攝影'), items: local('Performance direction · Composition · Camera operation · Lighting · Continuity · Observation', '表演指导 · 构图 · 摄像 · 灯光 · 连贯性 · 纪录观察', '表演指導 · 構圖 · 攝像 · 燈光 · 連貫性 · 紀錄觀察') },
  { index: '03', title: local('Production', '制作与制片', '製作與製片'), items: local('Concept · Script · Casting · Locations · Production coordination · On-set communication', '概念 · 剧本 · 选角 · 场地 · 制作协调 · 现场沟通', '概念 · 劇本 · 選角 · 場地 · 製作協調 · 現場溝通') },
  { index: '04', title: local('Editing & Post', '剪辑与后期', '剪輯與後期'), items: local('Premiere Pro · Narrative editing · Short-form editing · Sound-image rhythm · Version management', 'Premiere Pro · 叙事剪辑 · 短视频剪辑 · 声画节奏 · 版本管理', 'Premiere Pro · 敘事剪輯 · 短視頻剪輯 · 聲畫節奏 · 版本管理') },
  { index: '05', title: local('Branded Content', '品牌内容', '品牌內容'), items: local('Trend research · Competitors · USP extraction · TikTok planning · Creative testing · Iteration', '趋势研究 · 竞品 · USP 提炼 · TikTok 策划 · 创意测试 · 数据迭代', '趨勢研究 · 競品 · USP 提煉 · TikTok 策劃 · 創意測試 · 數據迭代') },
  { index: '06', title: local('Research & Critical Thinking', '研究与批判思考', '研究與批判思考'), items: local('Media analysis · Sociology · Qualitative research · Cultural analysis · Reflective writing', '媒体分析 · 社会学 · 质性研究 · 文化分析 · 反思写作', '媒體分析 · 社會學 · 質性研究 · 文化分析 · 反思寫作') },
  { index: '07', title: local('Project Coordination', '项目协调', '項目協調'), items: local('Timelines · Cross-functional communication · Scheduling · Problem solving · Deliverables', '时间线 · 跨职能沟通 · 排期 · 问题解决 · 交付管理', '時間線 · 跨職能溝通 · 排期 · 問題解決 · 交付管理') },
]
