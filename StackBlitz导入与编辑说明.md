# Hazel Li（李瑭）作品集：StackBlitz 导入与编辑说明

这是一套完整的 React + Vite 网站。StackBlitz 左侧可以修改内容，右侧会实时显示最终网页、滚动动画、TikTok 播放器、电影播放器、图片放大浏览和所有响应式效果。

## 一、导入 StackBlitz

1. 解压 `Hazel-Li-Portfolio-GSAP-Motion.zip`。
2. 打开 [StackBlitz](https://stackblitz.com/)，登录后选择 **New Project → JavaScript Blank**。
3. 打开解压后的文件夹，选中里面的全部文件和文件夹。
4. 把它们拖到 StackBlitz 左侧的文件栏。
5. 等待安装完成。项目会自动运行 `npm run dev`，右侧出现网站预览。

注意：请拖入“文件夹里面的内容”，不要把外层文件夹作为一个子文件夹拖进去。

## 二、最常修改的文件

### 修改 About Me 和项目文字

首屏和 About Me 的最终批准文案位于 `src/App.tsx` 的 `ArchiveHero` 与 `AboutArchive`。电影、戏剧、Lichico 和 TikTok 链接位于 `src/data.ts`。

- `en`：英文
- `zh`：简体中文
- `tc`：繁体中文

只替换标签之间或引号中的文字，不要删除逗号、引号、括号或 HTML 标签。保存后，右侧网页会自动更新。

### 修改 Find the Shape of the Wind

在 `src/data.ts` 搜索：

`id: 'wind'`

这里可以修改标题、年份、职责、影片介绍、视觉灵感、创作注释、Bilibili 链接和三张图片。

### 添加电影封面或幕后图片

1. 把图片拖到 `public/media/`，建议使用英文文件名，例如 `new-film-cover.jpg`。
2. 在相应项目中修改：

`image: '/media/new-film-cover.jpg'`

幕后图片放在该项目的 `gallery` 列表中。照着现有三行复制一行，再更换图片路径即可。

### 添加戏剧播放器

在 `src/data.ts` 搜索剧目名称，在该剧目的 `image` 下一行加入 Bilibili 播放器链接：

`embedUrl: 'https://player.bilibili.com/player.html?bvid=你的BV号&page=1',`

没有链接时，网站会显示“播放器位置已预留”，不会出现损坏页面。

### 修改 TikTok 精选视频

在 `src/data.ts` 搜索：

`lichicoHighlights`

每条内容包含视频编号 `id`、播放量 `views`、封面 `poster`、一句案例描述 `descriptor` 和完整链接 `url`。替换后页面会自动更新，例如：

`views: '80K',`

`poster: '/media/lichico/my-poster.jpg',`

TikTok 官方嵌入播放器不会稳定地把播放量数据交给这个网站，所以播放量需要你根据 TikTok 页面手动填写。留空时，网站只会显示“精选视频”，不会虚构数据。列表出现的先后顺序就是页面中的展示顺序。

### 用自己的 MP4 替换 B 站播放器

网站已经支持“本地视频优先、B 站自动回退”。操作方法：

1. 在 `public/media` 里面新建 `films` 文件夹。
2. 把压缩后的 MP4 拖入，例如 `vexations-web.mp4`。
3. 打开 `src/data.ts`，搜索对应项目，例如 `id: 'vexations'`。
4. 在 `embedUrl` 附近加入：

`videoSrc: '/media/films/vexations-web.mp4',`

如果影片本身是 4:3，可以再加入：

`videoAspectRatio: '4:3',`

保存后，项目会直接使用网页原生播放器；删除这行后，会自动恢复 B 站播放器。

建议先把成片导出为 H.264 MP4 网页版。原始高码率文件不要直接上传：它们会让 StackBlitz、GitHub 和 Vercel 导入缓慢或失败。

## 三、视觉和动画

- 页面结构、按钮交互和 GSAP 动画时间线：`src/App.tsx`
- 颜色、排版、响应式与动画初始样式：`src/styles.css`
- 图片和简历：`public/`

不熟悉代码时，建议优先只修改 `src/data.ts`、`src/App.tsx` 中的批准文案，以及 `public/media/`。

当前动画包括首屏依次进场、第二页固定滚动展开、桌面端档案卡片拖动、滚动显现、卡片分批出现、桌面端轻微视差、导航随滚动收起、详情抽屉、播放器扩展、图片灯箱和最后一页票券切换。电脑或手机开启“减少动态效果”时，网站会自动停用位移与时间线，内容仍会完整显示。

如果只修改文字、图片、链接和项目顺序，不需要碰 GSAP 代码。若要调节速度，请在 `src/App.tsx` 搜索 `duration`；数值越小越快。不要删除 `scope`、`useGSAP`、`matchMedia` 或 `ScrollTrigger` 的清理代码，否则热更新后可能出现动画重复。

## 四、播放器说明

- TikTok 和 Bilibili 是网络嵌入播放器，预览时需要联网。
- 电影详情一开始显示较小的封面，点击后会平滑扩展并加载播放器。
- 播放器左上角的回转图标可以只退出播放，不会关闭整个项目；键盘 `Esc` 也会按“图片 → 播放器 → 项目”的顺序逐层返回。
- 图片接触印样可点击放大，并支持键盘左右方向键切换。
- 戏剧详情采用同一播放器结构；暂时没有视频链接的项目保留播放器位置。
- 如果同时填写 `videoSrc` 与 `embedUrl`，网站优先播放 `videoSrc`，B 站链接作为备用。

## 五、修改顶部栏目名称

顶部五个栏目目前是：

- ABOUT ME
- WORK OUTCOME
- FILM PRODUCTION
- THEATER
- SKILLS

它们在 `src/App.tsx` 顶部的 `labels` 中。修改引号里的文字即可，不需要改变 `#about`、`#outcome` 等链接。

## 六、发布到 GitHub 与 Vercel

1. 在 GitHub 新建一个空仓库，把压缩包解压后的文件上传或用 GitHub Desktop 推送。
2. 打开 Vercel，选择 **Add New → Project**，导入这个 GitHub 仓库。
3. Framework 会自动识别为 **Vite**，直接点击 Deploy。
4. 以后在 StackBlitz 或本地改完后，把改动同步到 GitHub，Vercel 会自动重新发布。

如果影片文件接近或超过 100MB，请不要放进普通 GitHub 仓库。可以把网页版影片放在视频托管服务或对象存储中，再把 `videoSrc` 改为它提供的公开 HTTPS 地址。

## 七、出现错误时

如果右侧突然变成红色错误画面，通常是误删了引号、逗号或括号。立即按 `Command + Z` 撤销，然后只修改引号中的文字。
