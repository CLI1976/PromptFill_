/**
 * @typedef {Object} TemplateConfig
 * @property {string} id - 唯一标识符，建议使用 'tpl_' 前缀
 * @property {string|Object} name - 模板显示名称，支持双语对象 {cn: string, en: string} 或单语言字符串
 * @property {string|Object} content - 模板内容，支持 markdown 和 {{variable}} 变量，支持双语对象 {cn: string, en: string} 或单语言字符串
 * @property {string} imageUrl - 预览缩略图 URL
 * @property {string[]} [imageUrls] - 多图预览数组
 * @property {Object.<string, string|Object>} selections - 默认选中的变量值 map，支持双语对象或字符串
 * @property {string[]} tags - 模板标签数组，可选值：建筑、人物、摄影、产品、图表、卡通、宠物、游戏、创意
 * @property {string|string[]} language - 模板语言，可选值：
 *   - 'cn' - 仅支持中文
 *   - 'en' - 仅支持英文
 *   - ['cn', 'en'] - 支持双语（默认值）
 * 
 * @example 双语模板
 * {
 *   id: "tpl_example",
 *   name: { cn: "示例模板", en: "Example Template" },
 *   content: { cn: "中文内容...", en: "English content..." },
 *   language: ["cn", "en"]
 * }
 * 
 * @example 单语言模板（仅中文）
 * {
 *   id: "tpl_cn_only",
 *   name: "仅中文模板",
 *   content: "中文内容...",
 *   language: "cn"  // 或 ["cn"]
 * }
 */

/**
 * 模板系统版本号，每次更新 templates.js 或 banks.js 时请更新此版本号
 */
export const SYSTEM_DATA_VERSION = "0.7.1";

export const DEFAULT_TEMPLATE_CONTENT = {
  cn: `### Role (角色设定)
你是一位顶尖的 {{role}}，擅长制作详尽的角色设定图（Character Sheet）。你具备“像素级拆解”的能力，能够透视角色的穿着层级、捕捉微表情变化，并将与其相关的物品进行具象化还原。你特别擅长通过 {{subject}} 的私密物品、随身物件和生活细节来侧面丰满人物性格与背景故事。

### Task (任务目标)
根据用户上传或描述的主体形象，生成一张**“全景式角色深度概念分解图”**。该图片必须包含 {{layout_focus}}，并在其周围环绕展示该人物的服装分层、不同表情、核心道具、材质特写，以及极具生活气息的私密与随身物品展示。

### Visual Guidelines (视觉规范)
**1. 构图布局 (Layout):**
- **中心位 (Center):** 放置角色的 {{layout_focus}}，作为视觉锚点。
- **环绕位 (Surroundings):** 在中心人物四周空白处，有序排列拆解后的元素。
- **视觉引导 (Connectors):** 使用{{connectors}}，将周边的拆解物品与中心人物的对应部位或所属区域连接起来。

**2. 拆解内容 (Deconstruction Details):**
- **服装分层 (Clothing Layers):** 将角色的服装拆分为单品展示
- **私密内着拆解:** 独立展示角色的内层衣物，重点突出设计感与材质。例如： {{underwear_style}} （展示细节与剪裁）。
- **表情集 (Expression Sheet):** 在角落绘制 3-4 个不同的头部特写，展示不同的情绪，如： {{expressions}} 。
- **材质特写 (Texture & Zoom):** 选取关键部位进行放大特写. 例如： {{texture_zoom}} ，增加对小物件材质的描绘。
- **动作:** 绘制特殊的动作和表情，例如：{{action_detail}}，增加动作的深度刻画。
- **特殊视角:** 绘制从某种特殊场景下拍摄的特殊视角，例如：{{special_view}}

- **关联物品 (Related Items):**
 - **随身包袋与内容物:** 绘制 {{bag_content}}，并将其“打开”，展示散落在旁的物品。
 - **美妆与护理:** 展示 {{cosmetics}}。
 - **私密生活物件:** 具象化角色隐藏面的物品。根据角色性格可能包括： {{private_items}}，需以一种设计图的客观视角呈现。

**3.风格与注释 (Style & Annotations):**
- **画风:** {{art_style}}，线条干净利落。
- **背景:** {{background_style}}，营造设计手稿的氛围。
- **文字说明:** 在每个拆解元素旁模拟手写注释，简要说明材质或品牌/型号暗示。

### Workflow (执行逻辑)
1. 分析主体的核心特征、穿着风格及潜在性格。
2. 提取可拆解的一级元素（外套、鞋子、大表情）。
3. 脑补并设计二级深度元素（她内衣穿什么风格？包里装什么？独处时用什么？）。
4. 生成一张包含所有这些元素的组合图，确保透视准确，光影统一，注释清晰。
5. 使用中文，高清输出。`,
  en: `### Role
You are a top-tier {{role}}, specializing in creating detailed Character Sheets. You possess the ability of "pixel-level deconstruction," capable of seeing through the layering of characters' outfits, capturing subtle facial expressions, and restoring related items into concrete visuals. You particularly excel at enriching character personalities and background stories through {{subject}}'s private items, personal belongings, and daily life details.

### Task
Based on the subject image uploaded or described by the user, generate a **"Panoramic Deep Concept Deconstruction Map"**. This image must include the character's {{layout_focus}}, surrounded by displays of their clothing layers, different expressions, core props, material close-ups, and intimate and everyday items that evoke a sense of life.

### Visual Guidelines
**1. Layout:**
- **Center:** Place the character's {{layout_focus}} as the visual anchor.
- **Surroundings:** Arrange the deconstructed elements in an orderly manner in the empty spaces around the central character.
- **Connectors:** Use {{connectors}} to link the peripheral items to the corresponding body parts or areas of the central character.

**2. Deconstruction Details:**
- **Clothing Layers:** Break down the character's clothing into individual items for display.
- **Intimate Underwear Deconstruction:** Independently display the character's inner layers, highlighting design sense and materials. For example: {{underwear_style}} (showcasing details and tailoring).
- **Expression Sheet:** Draw 3-4 different head close-ups in the corner, showing different emotions like: {{expressions}}.
- **Texture & Zoom:** Select key parts for enlarged close-ups. For example: {{texture_zoom}}, adding more depiction of the materials of small items.
- **Action:** Draw special movements and expressions, such as: {{action_detail}}, increasing depth in action portrayal.
- **Special View:** Draw from unique scene perspectives, for example: {{special_view}}.

- **Related Items:**
 - **Bag Content:** Draw {{bag_content}} and "open" it to show the items scattered beside it.
 - **Cosmetics & Care:** Show {{cosmetics}}.
 - **Private Life Items:** Concretize the character's hidden-side items. Depending on the personality, these could include: {{private_items}}, presented from an objective design-sheet perspective.

**3. Style & Annotations:**
- **Art Style:** {{art_style}}, with clean and crisp lines.
- **Background:** {{background_style}}, creating a design manuscript atmosphere.
- **Annotations:** Simulate handwritten notes next to each deconstructed element, briefly explaining the material or suggesting brands/models.

### Workflow
1. Analyze the subject's core features, dressing style, and potential personality.
2. Extract deconstructable primary elements (coat, shoes, main expression).
3. Imagine and design secondary deep elements (What style of underwear does she wear? What's in her bag? What does she use when alone?).
4. Generate a composite image containing all these elements, ensuring accurate perspective, uniform lighting, and clear annotations.
5. Use English, high-definition output.`
};

export const TEMPLATE_PHOTO_GRID = {
  cn: `### Photo Grid Composition (九宫格摄影)

**编辑场景:** 3x3网格布局，采用冷灰色无缝背景。人物（面部特征与上传图片完全一致）身穿 {{clothing}}，确保每张照片中人物形象保持一致。

**灯光设置:** {{lighting}}，营造统一而富有层次的光影效果。

**照片细节包括 (Grid Details)：**
1. {{grid_pose}}，画面风格统一，镜头参数为 {{lens_param}}；
2. {{grid_pose}}，镜头参数为 {{lens_param}}，展现不同的拍摄角度和表情；
3. {{grid_pose}}，镜头参数为 {{lens_param}}，捕捉细腻的情感表达；
4. {{grid_pose}}，镜头参数为 {{lens_param}}，利用景深营造层次感；
5. {{grid_pose}}，镜头参数为 {{lens_param}}，突出动态瞬间的生动性；
6. {{grid_pose}}，镜头参数为 {{lens_param}}，通过前景虚化增强视觉焦点；
7. {{grid_pose}}，镜头参数为 {{lens_param}}，展现优雅的姿态和放松的状态；
8. {{grid_pose}}，镜头参数为 {{lens_param}}，捕捉自然光线下的表情变化；
9. {{grid_pose}}，镜头参数为 {{lens_param}}，微距特写展现面部细节和质感。

**后期处理:** 保持原始素材的真实感，平滑对比度，适度应用柔化效果，确保整体色调统一且富有质感。`,
  en: `### Photo Grid Composition

**Scene:** 3x3 grid layout, using a seamless cool grey background. The character (facial features exactly as in the uploaded image) is wearing {{clothing}}, ensuring character consistency across all photos.

**Lighting:** {{lighting}}, creating a unified and layered lighting effect.

**Grid Details:**
1. {{grid_pose}}, unified style, lens parameter: {{lens_param}};
2. {{grid_pose}}, lens parameter: {{lens_param}}, showing different angles and expressions;
3. {{grid_pose}}, lens parameter: {{lens_param}}, capturing subtle emotional expressions;
4. {{grid_pose}}, lens parameter: {{lens_param}}, using depth of field to create layers;
5. {{grid_pose}}, lens parameter: {{lens_param}}, highlighting the vividness of dynamic moments;
6. {{grid_pose}}, lens parameter: {{lens_param}}, enhancing visual focus through foreground blur;
7. {{grid_pose}}, lens parameter: {{lens_param}}, showing elegant posture and relaxed state;
8. {{grid_pose}}, lens parameter: {{lens_param}}, capturing facial changes under natural light;
9. {{grid_pose}}, lens parameter: {{lens_param}}, macro close-up showing facial details and texture.

**Post-processing:** Maintain the realism of the original material, smooth contrast, apply moderate softening effects, ensuring uniform overall tone and high-quality texture.`
};

export const TEMPLATE_PHOTO_GRID_V2 = {
  cn: `### Photo Grid Composition (九宫格摄影出格版)

**编辑场景:** 3x3网格布局，采用冷灰色无缝背景。人物（面部特征与上传图片完全一致）身穿 {{clothing}}，确保每张照片中人物形象保持一致。

**灯光设置:** {{lighting}}，营造统一而富有层次的光影效果。

**照片细节包括 (Grid Details)：**
1. {{grid_pose}}，画面风格统一，镜头参数为 {{lens_param}}；
2. {{grid_pose}}，镜头参数为 {{lens_param}}，展现不同的拍摄角度和表情；
3. {{grid_pose}}，镜头参数为 {{lens_param}}，捕捉细腻的情感表达；
4. {{grid_pose}}，镜头参数为 {{lens_param}}，利用景深营造层次感；
5. {{grid_pose}}，镜头参数为 {{lens_param}}，突出动态瞬间的生动性；
6. {{grid_pose}}，镜头参数为 {{lens_param}}，通过前景虚化增强视觉焦点；
7. {{grid_pose}}，镜头参数为 {{lens_param}}，展现优雅的姿态和放松的状态；
8. {{grid_pose}}，镜头参数为 {{lens_param}}，捕捉自然光线下的表情变化；
9. {{grid_pose}}，镜头参数为 {{lens_param}}，微距特写展现面部细节和质感。

**后期处理:** 保持原始素材的真实感，平滑对比度，适度应用柔化效果，确保整体色调统一且富有质感。

**需要单独处理:**中央宫格的图片不局限在自己的宫格内，形成一种从中央宫格跃出画面的3D立体视觉，中央宫格人物占据图片较大面积且全身出镜，会覆盖到其他宫格，并对其他宫格形成阴影效果，营造一种裸眼3D的视觉张力`,
  en: `### Photo Grid Composition (Out-of-Box Version)

**Scene:** 3x3 grid layout, using a seamless cool grey background. The character (facial features exactly as in the uploaded image) is wearing {{clothing}}, ensuring character consistency across all photos.

**Lighting:** {{lighting}}, creating a unified and layered lighting effect.

**Grid Details:**
1. {{grid_pose}}, unified style, lens parameter: {{lens_param}};
2. {{grid_pose}}, lens parameter: {{lens_param}}, showing different angles and expressions;
3. {{grid_pose}}, lens parameter: {{lens_param}}, capturing subtle emotional expressions;
4. {{grid_pose}}, lens parameter: {{lens_param}}, using depth of field to create layers;
5. {{grid_pose}}, lens parameter: {{lens_param}}, highlighting the vividness of dynamic moments;
6. {{grid_pose}}, lens parameter: {{lens_param}}, enhancing visual focus through foreground blur;
7. {{grid_pose}}, lens parameter: {{lens_param}}, showing elegant posture and relaxed state;
8. {{grid_pose}}, lens parameter: {{lens_param}}, capturing facial changes under natural light;
9. {{grid_pose}}, lens parameter: {{lens_param}}, macro close-up showing facial details and texture.

**Post-processing:** Maintain the realism of the original material, smooth contrast, apply moderate softening effects, ensuring uniform overall tone and high-quality texture.

**Special Instructions:** The central grid image is not confined to its own square, creating a 3D visual effect as if jumping out of the frame. The central character occupies a larger area and is shown in full-body, overlapping other squares and casting shadows on them, creating a naked-eye 3D visual tension.`
};

export const TEMPLATE_FASHION_MOODBOARD = {
  cn: `### Fashion Illustration Moodboard (时尚插画情绪板)
一张9:16竖屏的高级时尚插画情绪板，模拟平板扫描效果。

**背景:** 纯手绘的奶油色水彩晕染纸张，带有淡淡的粉色网格。
**视觉核心:** 数张具有明显白色模切宽边和柔和投影的亮面乙烯基贴纸。

**贴纸内容:**
- **中央:** {{sticker_core}}，光线明亮。
- **左侧:** {{fashion_deconstruct}}。
- **右下角:** 关键的隐藏层贴纸：一套折叠整齐的内衣，展现细腻纹理。
- **互动元素:** 一只穿着粉色系、与用户服装呼应的 {{toy_companion}} 正趴在一个手绘对话框上。

**装饰细节:** 周围装饰着蜡笔质感的 {{sticker_decor}} 和潦草的中文书法标注OOTD。
**注意:** 画面中绝无任何人手、笔或物理桌面背景，纯粹的平面艺术插画。`,
  en: `### Fashion Illustration Moodboard
A high-end 9:16 vertical fashion illustration moodboard, simulating a tablet scan effect.

**Background:** Hand-painted cream-colored watercolor stained paper with a faint pink grid.
**Visual Core:** Several glossy vinyl stickers with distinct white die-cut borders and soft shadows.

**Sticker Contents:**
- **Center:** {{sticker_core}}, with bright lighting.
- **Left Side:** {{fashion_deconstruct}}.
- **Bottom Right:** Key hidden layer sticker: a set of neatly folded underwear, showing fine texture.
- **Interactive Element:** A {{toy_companion}} wearing pink tones that match the user's outfit is leaning on a hand-drawn speech bubble.

**Decorative Details:** Surrounded by crayon-textured {{sticker_decor}} and scribbled calligraphy OOTD annotations.
**Note:** Absolutely no hands, pens, or physical desk backgrounds in the frame; pure flat art illustration.`
};

export const TEMPLATE_CHARACTER_SELFIE = {
  cn: `### Character Selfie (人物趣味合影)
让 {{character_companion}} 站在男人旁边，{{action_pose}}，同时对着镜头露出调皮的表情。

**背景:** 以 {{background_scene}} 为背景。

**要求:** 保持自拍构图不变，让两个角色自然地融入画面，光影统一，互动自然。`,
  en: `### Character Selfie
Have {{character_companion}} stand next to the man, {{action_pose}}, while making a playful expression at the camera.

**Background:** Set against the backdrop of {{background_scene}}.

**Requirements:** Maintain the selfie composition, integrating both characters naturally into the frame with unified lighting and natural interaction.`
};

export const TEMPLATE_CLASSIC_SCENE = {
  cn: `### 经典场景微缩复刻

展示一个精致的、微缩 3D 卡通风格的{{classic_scene}}场景，采用清晰的 45° 俯视等轴侧视角（Isometric view）。

**核心构图：** 将主体最经典的形象突出地置于中心。自动搭配比例适宜的关键元素图标、象征性物品、迷人的小角色以及能诠释主体故事的道具。整体布局应当充满趣味且紧凑聚集，宛如一套高端的玩具盲盒套装。

**渲染与材质：** 采用{{render_style}}风格进行渲染。建模必须精细、圆润流畅且质感丰富。使用逼真的 PBR 材质：混合用于有机形态的柔和哑光粘土、用于水体/玻璃元素的光泽树脂，以及用于结构组件的光滑 PVC 材质。着重表现具有触感、“看起来手感很好”的纹理细节。

**灯光与氛围：** 采用柔和、逼真的摄影棚布光配合全局光照（Global Illumination）。利用柔和的阴影营造出温暖、舒适且充满魔力的氛围。

**布局：** 保持干净、极简的布局，使用与主体配色相协调的纯色背景。

**文字：** 在{{position}}，使用巨大的、圆润的 3D 字体醒目地展示主体名称，使其轻微悬浮于场景上方。`,
  en: `### Classic Scene Miniature Restoration
Showcase an exquisite, miniature 3D cartoon-style {{classic_scene}} scene, using a clear 45° isometric view.

**Core Composition:** Place the most classic image of the subject prominently in the center. Automatically pair it with appropriately scaled key element icons, symbolic items, charming little characters, and props that interpret the subject's story. The overall layout should be playful and tightly clustered, like a high-end toy blind box set.

**Rendering & Materials:** Render in {{render_style}} style. Modeling must be fine, rounded, smooth, and rich in texture. Use realistic PBR materials: a mix of soft matte clay for organic forms, glossy resin for water/glass elements, and smooth PVC for structural components. Focus on tactile, "looks good to touch" texture details.

**Lighting & Atmosphere:** Use soft, realistic studio lighting with Global Illumination. Utilize soft shadows to create a warm, cozy, and magical atmosphere.

**Layout:** Maintain a clean, minimalist layout with a solid color background that coordinates with the subject's color scheme.

**Text:** At {{position}}, prominently display the subject's name in giant, rounded 3D font, making it slightly float above the scene.`
};

export const TEMPLATE_CORPORATE_GROWTH = {
  cn: `### 可视化企业成长之路

**角色定义**  
你是一位企业演变建筑师 (Corporate Evolution Architect)。你的目标是创建一个超高密度、垂直堆叠的等距轴测（Isometric）3D 渲染可视化图像，展示 {{company}} 公司的技术和产品历史。通过图像展示一个企业的时间线：底部是简陋的创业故事，通过产品迭代垂直向上升起，直到现代或未来的巅峰。

**核心能力 | 关键视觉策略（rameless Tech-Lapse）：**
- **根除容器：** 严禁使用底板、边框或横截面视图。底部边缘是创业基地（车库/实验室/小办公室），无限延伸。
- **垂直时间线：** “之字形上升（Zig-Zag Ascent）”穿越创新历程。  
  - 底部（前景）：创业阶段岁月 + 第一个原型机  
  - 中部（上升中）：快速增长 / 全球扩张 / 标志性的中期产品  
  - 顶部（背景）：当前总部 / 生态系统 / 未来研发
- **集成 3D 标题：** 企业 Logo 必须渲染为巨大的、电影般的 3D 字体，矗立在前景，使用公司标志性字体/材质。

**检索与梳理：**
- 提取企业历史的几个阶段。
- 列出定义每个时代的“经典产品”。
- 劳动力演变：可视化员工与设备的变化。

**构图与光影：**  
无框架、无边界、无横截面。垂直之字形时间线，将产品代际从底部的创业阶段堆叠到未来的顶部。灯光从近现代的暖光（创业初期）过渡到干净的白/蓝 LED 光（现代科技）。环境与公司经典产品随高度演变。公司的多款经典产品以“巨物化”呈现。  
移轴摄影（Tilt-shift）与 {{render_style}}，画幅 {{ratio}}。`,
  en: `### Visualized Corporate Growth Path
**Role Definition**
You are a Corporate Evolution Architect. Your goal is to create an ultra-high-density, vertically stacked isometric 3D rendered visualization showing the technological and product history of {{company}}. Showcase a corporate timeline: the base is the humble startup story, rising vertically through product iterations to the modern or future peak.

**Core Competency | Key Visual Strategy (Frameless Tech-Lapse):**
- **Eradicate Containers:** Strictly forbid base plates, borders, or cross-section views. The bottom edge is the startup base (garage/lab/small office), extending infinitely.
- **Vertical Timeline:** A "Zig-Zag Ascent" through the innovation journey.
  - Bottom (Foreground): Startup years + the first prototype.
  - Middle (Ascending): Rapid growth / global expansion / iconic mid-term products.
  - Top (Background): Current headquarters / ecosystem / future R&D.
- **Integrated 3D Title:** The corporate logo must be rendered as a giant, cinematic 3D font, standing in the foreground, using the company's signature font/material.

**Retrieval & Organization:**
- Extract several stages of corporate history.
- List "classic products" defining each era.
- Workforce Evolution: Visualize changes in employees and equipment.

**Composition & Lighting:**
Frameless, borderless, no cross-sections. A vertical zig-zag timeline stacking product generations from the startup phase at the bottom to the future at the top. Lighting transitions from warm near-modern light (early startup) to clean white/blue LED light (modern tech). The environment and company's classic products evolve with height. Multiple classic products are presented as "megaliths."
Tilt-shift photography with {{render_style}}, aspect ratio {{ratio}}.`
};

export const TEMPLATE_DETECTIVE_SOCIAL = {
  cn: `发挥你的创意帮我一起脑洞，假设{{character_groups}}使用{{social_media}}，包括回复评论点赞，设计一些有趣、有反差的人物使用社交媒体互动朋友圈的场景，结合一些符合人物的大事件，有趣有梗有反差，制作一张{{social_media}}的截图，使用中文，{{ratio}}。`,
  en: `Use your creativity to brainstorm with me. Imagine {{character_groups}} using {{social_media}}, including replying, commenting, and liking. Design some fun, high-contrast scenarios of characters interacting on social media feeds, combining big events that fit the characters with humor, memes, and contrast. Create a screenshot of {{social_media}}, in English, with aspect ratio {{ratio}}.`
};

export const TEMPLATE_MAGAZINE_COVER = {
  cn: `### PROJECT GOAL | 项目目标
生成一张 9:16 旅游杂志封面级照片，以我上传的真人照片为基准，实现 100% 五官还原，呈现专业、精致、具有真实杂志质感的封面画面。

### SUBJECT | 人物设定
根据我上传人物的五官特征进行完整还原；人物置身于 {{travel_location}}，请根据这个地理位置给人物穿着符合当地此刻的实时天气、温度与季节服装逻辑；整体风格自然、优雅、有现场氛围。

### POSE & EXPRESSION | 姿态与表情
人物以杂志封面标准姿态入镜，略带从容质感；面部表情自然放松但具吸引力；
身体姿势根据场景与天气自由适配，呈现"在当地旅行中的真实状态"。

### ENVIRONMENT | 场景要求
背景呈现用户输入的地名代表性视觉线索，请根据用户输入的地理位置呈现符合当地此刻的实时天气、温度与季节场景逻辑；保持高级写实风格，不夸张、不超现实；
光线以真实自然光为主，具有现场环境的时间感。

### CAMERA & AESTHETICS | 拍摄规格
画幅比例: {{ratio}}
构图: 充分利用竖幅空间，打造"封面级"视觉中心；镜头语言: 专业摄影棚级别的清晰度与景深；肤质感可见毛孔与自然纹理（非磨皮）；整体氛围具有高级旅行杂志的真实感与美感。

### MAGAZINE DESIGN | 封面设计
版面风格现代、干净、具有国际旅行杂志氛围；
主标题、副标题、杂志图形元素可自动生成但需与人物与地点匹配；
色彩搭配高级、协调；
最终呈现接近《Vogue》《National Geographic Traveler》级别的封面气质。`,
  en: `### PROJECT GOAL
Generate a 9:16 travel magazine cover-quality photo based on the uploaded real-life photo, achieving 100% facial feature restoration, presenting a professional, exquisite, and authentic magazine-textured cover.

### SUBJECT
Fully restore based on the uploaded person's facial features; the person is located in {{travel_location}}. Please dress the character according to the real-time weather, temperature, and seasonal clothing logic of that location; the overall style should be natural, elegant, and atmospheric.

### POSE & EXPRESSION
The person enters the frame in a standard magazine cover pose, with a touch of composed quality; natural and relaxed facial expressions but with attractiveness.
Body posture adapts freely according to the scene and weather, presenting a "real state of traveling locally."

### ENVIRONMENT
The background shows representative visual cues of the location input by the user. Please present scene logic consistent with the local real-time weather, temperature, and season; maintain a high-end realistic style, not exaggerated or surreal.
Lighting is mainly natural, with a sense of time of the site environment.

### CAMERA & AESTHETICS
Aspect Ratio: {{ratio}}
Composition: Make full use of vertical space to create a "cover-level" visual center. Lens language: Professional studio-level clarity and depth of field; skin texture shows pores and natural grain (no smoothing); overall atmosphere has the realism and beauty of a high-end travel magazine.

### MAGAZINE DESIGN
Modern, clean layout with an international travel magazine vibe.
Main title, subtitle, and magazine graphic elements can be automatically generated but must match the person and location.
High-end, coordinated color palette.
The final result should approach the cover temperament of "Vogue" or "National Geographic Traveler."`
};

export const TEMPLATE_MANGA_TO_REALITY = {
  cn: `### SUBJECT | 人物主体
{{character_originality}}，从漫画分镜边框中跨步走出并打破界限。真实版本与漫画版本之间充满动态且无缝的互动。

### SETTING | 场景设定
地点：{{comic_scene}}
地板上摊开一本巨大的漫画书。

### MANGA DETAILS | 漫画细节
- **风格：** 超现实风格的黑白四格漫画
- **技法：** 正宗日式排版，网点纸效果，粗黑墨线，线条清晰利落
- **内容：** 同一个人的漫画版本被困在漫画书里面
- **对比：** 单色漫画世界与鲜艳现实世界的强烈视觉对比

### REAL LIFE VERSION | 真实版本
- **视觉质感：** 生动、色彩丰富、照片级真实感、超逼真 8K 画质
- **互动方式：** 动态地浮现于漫画表面，直接与漫画版本互动
- **情绪氛围：** 元风格 (Meta)，幽默的相遇

### TECHNICAL SPECS | 技术规格
- **画质：** 超逼真，8K 分辨率，高度细节化
- **融合效果：** 漫画线条艺术与现实摄影的无缝融合
- **画幅比例：** {{ratio}}`,
  en: `### SUBJECT
{{character_originality}}, stepping out from the manga panel borders and breaking boundaries. A dynamic and seamless interaction between the real-life version and the manga version.

### SETTING
Location: {{comic_scene}}
A giant manga book is spread open on the floor.

### MANGA DETAILS
- **Style:** Surreal black and white four-panel manga.
- **Technique:** Authentic Japanese layout, screentone effects, thick black ink lines, clean and sharp linework.
- **Content:** The manga version of the same person is trapped inside the manga book.
- **Contrast:** Strong visual contrast between the monochromatic manga world and the vibrant real world.

### REAL LIFE VERSION
- **Visual Texture:** Vivid, colorful, photo-realistic, ultra-realistic 8K quality.
- **Interaction:** Dynamically emerging from the manga surface, interacting directly with the manga version.
- **Atmosphere:** Meta-style, a humorous encounter.

### TECHNICAL SPECS
- **Image Quality:** Ultra-realistic, 8K resolution, highly detailed.
- **Blending:** Seamless fusion of manga line art and real-life photography.
- **Aspect Ratio:** {{ratio}}`
};

export const TEMPLATE_FISHEYE_URBAN = {
  cn: `### 极端鱼眼都市奇观

{{character_originality}}，用{{lens_type}}拍摄的照片，主体是一位穿着{{school_uniform}}的{{subject}}，在{{urban_location}}兴奋地跳起，{{dynamic_action}}。

**视觉焦点：**
- **前景细节：** {{fingernail_detail}}
- **背景景观：** {{building_cluster}}，街道上挤满行人和车辆
- **超现实元素：** {{monster_element}}漂浮在城市上空，{{monster_feature}}环绕着扭曲的城市景观

**整体基调：**
创造一个融合现实与奇幻的都市奇观，鱼眼镜头的畸变效果与卡通怪兽的出现形成强烈对比，营造出梦幻而充满活力的视觉冲击。`,
  en: `### Extreme Fisheye Urban Spectacle
{{character_originality}}, a photo taken with {{lens_type}}, the subject is a {{subject}} wearing {{school_uniform}}, jumping excitedly in {{urban_location}}, {{dynamic_action}}.

**Visual Focus:**
- **Foreground Detail:** {{fingernail_detail}}.
- **Background Landscape:** {{building_cluster}}, streets packed with pedestrians and vehicles.
- **Surreal Elements:** {{monster_element}} floating above the city, with {{monster_feature}} surrounding the distorted urban landscape.

**Overall Tone:**
Create an urban spectacle blending reality and fantasy. The distortion of the fisheye lens contrasted with the appearance of cartoon monsters creates a dreamy and vibrant visual impact.`
};

export const TEMPLATE_INDUSTRIAL_DESIGN = {
  cn: `### 目标
设计一个顶级的工业设计产品介绍页，使用极简的宣传页风格；需要深刻理解该设计师的设计理念、设计风格，并将这种设计理解完全融入到设计产品的工业设计与展示页面中

### 内容
- **设计师：** {{designer}}
- **产品：** {{design_item}}

### 画面
- **设计师介绍：**
约占整个画面非常少的部分，包括设计师的介绍（极具氛围感的头像）与设计师对于这个产品的设计思路与设计理解，以及设计师的签名。
- **画面核心内容：**
占整个画面的80%或更多用于呈现产品本身，一个完全符合设计师自己设计风格与设计方法的顶级产品设计图（一个完整的单张产品效果的呈现），基于工业成品设计成果使用不同的构图。整体配色需要与设计师的风格与产品内容完全相符
- **构图：**
最终构图：{{ratio}} 
整体排版主次分明，规整，极具格调与设计特色`,
  en: `### Goal
Design a top-tier industrial design product introduction page using a minimalist promotional layout. Deeply understand the designer's philosophy and style, and fully integrate this design understanding into the product's industrial design and presentation page.

### Content
- **Designer:** {{designer}}
- **Product:** {{design_item}}

### Visuals
- **Designer Intro:**
Occupies a very small part of the frame, including a bio (with an atmospheric portrait), the designer's thoughts and design philosophy for this product, and their signature.
- **Core Content:**
80% or more of the frame is used to present the product itself—a top-tier product design illustration fully consistent with the designer's own style and methods (a complete single product effect presentation). Use different compositions based on the industrial design results. The overall color scheme must match the designer's style and product content.
- **Composition:**
Final Composition: {{ratio}}.
The overall layout is clear in hierarchy, organized, and highly stylish and characteristic.`
};

export const TEMPLATE_RAINDROP_ART = {
  cn: `### Raindrop Art (雨滴定格艺术)

**核心表现:**
捕捉了雨滴落入水面的瞬间，雨滴打落在水面上，飞溅的水珠在空中形成一个抽象的 {{rain_shape}}。

**艺术视觉:**
水滴构成的结果相对比较概念化，更遵从水滴溅落形成的动态感，但能从动作或神态中感受到其表达的艺术视觉。画面将雨水与自然交互的微妙之美的定格艺术作品，动感与优雅交融，呈现出诗意的视觉表达。

**环境背景:**
背景是朦胧的雨景。

**规格:**
{{ratio}}`,
  en: `### Raindrop Art
**Core Performance:**
Capture the moment a raindrop falls into the water surface, with the splashing droplets forming an abstract {{rain_shape}} in the air.

**Artistic Vision:**
The resulting water droplet form is relatively conceptual, following the dynamic feel of the splash, yet the artistic vision can be felt through the movement or pose. The image is a frozen-in-time artwork of the subtle beauty of rain interacting with nature, blending dynamism and elegance to present a poetic visual expression.

**Environment/Background:**
The background is a hazy rainy scene.

**Specifications:**
{{ratio}}`
};

export const TEMPLATE_ART_GROWTH = {
  cn: `### 可视化艺术成长之路

**角色定义**  
你是一位历史演变建筑师 (History Evolution Architect)。你的目标是创建一个超高密度、垂直堆叠的等距轴测（Isometric）3D 展厅渲染可视化图像，展示 {{art_type}} 的发展历史。通过展厅来展示一个里程发展的时间线：底部是简陋的发展初期，通过历史更迭迭代垂直向上升起，直到现代或未来的巅峰。

**核心能力 | 关键视觉策略（rameless Tech-Lapse）：**
- **展厅模拟：** 使用一个多层的艺术展厅承载所要表达的事物发展，层级代表时间维度的发展，每层可能存在不同的“房间”用于展示同一时代不同风格的作品
- **根除容器：** 严禁使用底板、边框或横截面视图。底部边缘是历史起源（原始社会或古代社会）
- **垂直时间线：** “之字形上升（Zig-Zag Ascent）”穿越创新历程。  
  - 底部（前景）：起源与原型  
  - 中部（上升中）：古代到现代的辉煌发展  
  - 顶部（背景）：当前的发展状态与未来的可能性
- **集成 3D 标题：** 明确的与主题相符合的标题

**检索与梳理：**
- 提取重要发展历史中的的几个阶段。
- 列出定义每个时代的“经典”。
- 工具与媒介的变化

**构图与光影：**  
等距视角的展厅视角。垂直之字形时间线，将事物发展从底部的创业阶段堆叠到未来的顶部，环境与划时代的经典作品随高度演变。多款经典产品以“巨物化”呈现。  
移轴摄影（Tilt-shift）与 {{render_style}}，画幅 {{ratio}}。`,
  en: `### Visualized Artistic Growth Path
**Role Definition**
You are a History Evolution Architect. Your goal is to create an ultra-high-density, vertically stacked isometric 3D gallery render showing the development history of {{art_type}}. Use a gallery to showcase a milestone timeline: the base is the humble early stages, rising vertically through historical changes to the modern or future peak.

**Core Competency | Key Visual Strategy (Frameless Tech-Lapse):**
- **Gallery Simulation:** Use a multi-level art gallery to host the development. Levels represent temporal progression, with different "rooms" potentially showing different styles from the same era.
- **Eradicate Containers:** Strictly forbid base plates, borders, or cross-section views. The bottom edge is the historical origin (primitive or ancient society).
- **Vertical Timeline:** A "Zig-Zag Ascent" through the innovation journey.
  - Bottom (Foreground): Origins and prototypes.
  - Middle (Ascending): Brilliant development from ancient to modern times.
  - Top (Background): Current development status and future possibilities.
- **Integrated 3D Title:** A clear title consistent with the theme.

**Retrieval & Organization:**
- Extract several important historical development stages.
- List "classics" defining each era.
- Changes in tools and media.

**Composition & Lighting:**
Isometric gallery view. A vertical zig-zag timeline stacking development from the base to the future at the top. The environment and era-defining classics evolve with height. Multiple classic products are presented as "megaliths."
Tilt-shift photography with {{render_style}}, aspect ratio {{ratio}}.`
};

export const TEMPLATE_MINIATURE_DESK = {
  cn: `### 窗边书桌微缩场景

展示一个在窗边书桌上的场景。

**核心内容：**
《{{show_name}}》的经典镜头微缩场景展示，采用了{{render_style}}风格，充分体现了微缩摄影的艺术表达。

**环境背景：**
背景是真实的书桌，有一些制作工具，散乱的书本，营造一种刚刚加工完这个场景的凌乱感。书桌上还有编制的图纸和原型手稿。

**窗外互动：**
窗外，真实的{{character_name}}正好奇地向内观察这个桌上的作品。

**画面规格：**
{{ratio}}`,
  en: `### Window-side Desk Miniature Scene
Displays a scene on a desk by a window.

**Core Content:**
A miniature restoration of a classic scene from "{{show_name}}", using the {{render_style}} style, fully embodying the artistic expression of miniature photography.

**Environment/Background:**
The background is a real desk, with some crafting tools and scattered books, creating a sense of messiness as if the scene was just finished. There are also woven plans and prototype manuscripts on the desk.

**Window Interaction:**
Outside the window, a real {{character_name}} is curiously looking inside at the work on the desk.

**Image Specs:**
{{ratio}}`
};

/**
 * 可用的模板标签
 */
export const TEMPLATE_TAGS = [
  "建筑",
  "人物",
  "摄影",
  "产品",
  "图表",
  "卡通",
  "宠物",
  "游戏",
  "创意"
];

/**
 * 系统内置模板列表
 * 
 * 如何添加新模板：
 * 1. 在上方定义模板内容常量 (可选，但推荐)
 * 2. 在数组中添加一个新的配置对象
 * 3. 确保 id 唯一
 * 4. imageUrl 可以是外部链接，也可以是项目内的 import 资源
 * 5. tags 可以从 TEMPLATE_TAGS 中选择
 */
export const INITIAL_TEMPLATES_CONFIG = [
  {
    id: "tpl_default",
    name: { cn: "角色概念分解图", en: "Character Concept Sheet" },
    content: DEFAULT_TEMPLATE_CONTENT,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/08/ec433cf214faf102.jpg",
    author: "官方",
    selections: {},
    tags: ["人物", "创意", "图表"],
    language: ["cn", "en"]
  },
  {
    id: "tpl_photo_grid",
    name: { cn: "3x3 摄影网格", en: "3x3 Photo Grid" },
    content: TEMPLATE_PHOTO_GRID,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/08/5302794e63fa130b.jpg",
    author: "官方",
    selections: {
      "clothing": { cn: "炭灰色无袖连衣裙", en: "Charcoal grey sleeveless dress" },
      "grid_pose-0": { cn: "前景手指虚化", en: "Out-of-focus fingers in foreground" },
      "grid_pose-1": { cn: "目光锁定镜头", en: "Eyes locked on camera" },
      "grid_pose-2": { cn: "单色下巴托手", en: "Monochrome hand on chin" },
      "grid_pose-3": { cn: "正面特写阴影", en: "Frontal close-up with shadows" },
      "grid_pose-4": { cn: "斜角拍摄", en: "Angled shot" },
      "grid_pose-5": { cn: "双手置于锁骨", en: "Hands on collarbones" },
      "grid_pose-6": { cn: "坐姿半身侧面", en: "Seated half-body profile" },
      "grid_pose-7": { cn: "侧面微距水滴", en: "Side macro with water drops" },
      "grid_pose-8": { cn: "回眸一笑", en: "Looking back with a smile" },
      "lens_param-0": { cn: "85mm, f/1.8", en: "85mm, f/1.8" },
      "lens_param-1": { cn: "85mm, f/2.0", en: "85mm, f/2.0" },
      "lens_param-2": { cn: "50mm, f/2.2", en: "50mm, f/2.2" },
      "lens_param-3": { cn: "50mm, f/2.5", en: "50mm, f/2.5" },
      "lens_param-4": { cn: "50mm, f/3.2", en: "50mm, f/3.2" },
      "lens_param-5": { cn: "35mm, f/4.5", en: "35mm, f/4.5" },
      "lens_param-6": { cn: "85mm, f/1.9", en: "85mm, f/1.9" },
      "lens_param-7": { cn: "50mm, f/1.8", en: "50mm, f/1.8" },
      "lens_param-8": { cn: "85mm, f/2.2", en: "85mm, f/2.2" }
    },
    tags: ["人物", "摄影"],
    language: ["cn", "en"]
  },
  {
    id: "tpl_fashion",
    name: { cn: "时尚情绪板插画", en: "Fashion Moodboard" },
    content: TEMPLATE_FASHION_MOODBOARD,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/08/4d9f92ccb4113fdd.jpg",
    author: "官方",
    selections: {},
    tags: ["人物", "创意", "卡通"],
    language: ["cn", "en"]
  },
  {
    id: "tpl_character_selfie",
    name: { cn: "人物趣味合影", en: "Character Selfie" },
    content: TEMPLATE_CHARACTER_SELFIE,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/08/c2312d24d0f2c38e.jpeg",
    author: "官方",
    selections: {},
    tags: ["人物", "创意"],
    language: ["cn", "en"]
  },
  {
    id: "tpl_classic_scene",
    name: { cn: "经典场景微缩复刻", en: "Classic Scene Miniature" },
    content: TEMPLATE_CLASSIC_SCENE,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/10/1eac697f5a438542.jpg",
    author: "官方",
    selections: {
      "classic_scene": { cn: "千与千寻", en: "Spirited Away" },
      "render_style": { cn: "Octane Render 和 Cinema 4D", en: "Octane Render and Cinema 4D" },
      "position": { cn: "顶部中央", en: "Top Center" }
    },
    tags: ["卡通", "创意", "游戏"],
    language: ["cn", "en"]
  },
  {
    id: "tpl_corporate_growth",
    name: { cn: "可视化企业成长之路", en: "Corporate Evolution Path" },
    content: TEMPLATE_CORPORATE_GROWTH,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/10/a7e87e49c6144fdc.jpg",
    author: "官方",
    selections: {
      "company": { cn: "任天堂（Nintendo）", en: "Nintendo" },
      "render_style": { cn: "3D像素风格", en: "3D Pixel Art Style" },
      "ratio": { cn: "3:4竖构图", en: "3:4 Vertical" }
    },
    tags: ["建筑", "创意", "图表"],
    language: ["cn", "en"]
  },
  {
    id: "tpl_fisheye_urban",
    name: { cn: "极端鱼眼都市奇观", en: "Fisheye Urban Wonder" },
    content: TEMPLATE_FISHEYE_URBAN,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/14/b21165a2afefaf4d.jpg",
    author: "官方",
    selections: {
      "lens_type": { cn: "极端鱼眼镜头", en: "Extreme Fisheye Lens" },
      "role": { cn: "年轻女性", en: "Young woman" },
      "character_originality": { cn: "使用附图中的人物，确保结果与人物一致性", en: "Use character in attachment, ensure consistency" },
      "school_uniform": { cn: "灰色开衫和格子裙校服", en: "Grey cardigan and plaid skirt uniform" },
      "urban_location": { cn: "涩谷十字路口", en: "Shibuya Crossing" },
      "dynamic_action": { cn: "一只手夸张地伸向镜头前景", en: "One hand exaggeratedly reaching towards the foreground" },
      "fingernail_detail": { cn: "手指甲清晰可见", en: "Fingernails clearly visible" },
      "building_cluster": { cn: "扭曲的涩谷109大楼和其他建筑林立", en: "Distorted Shibuya 109 building and other forest of buildings" },
      "crowd_traffic": { cn: "挤满行人和车辆", en: "Bustling traffic" },
      "monster_element": { cn: "巨大的粉色和蓝色渐变卡通怪兽", en: "Giant pink and blue gradient cartoon monster" },
      "monster_feature": { cn: "巨大的触手和角", en: "Giant tentacles and horns" },
      "distorted_city": { cn: "扭曲的城市景观", en: "Distorted urban landscape" },
      "lighting_atmosphere": { cn: "阳光明媚", en: "Sunny" },
      "shadow_contrast": { cn: "光影对比强烈", en: "Strong light-shadow contrast" },
      "ratio": { cn: "圆形画幅", en: "Circular Aspect Ratio" },
      "render_style": { cn: "高质量的 2D 插画风格", en: "High-quality 2D illustration style" }
    },
    tags: ["摄影", "创意", "人物"],
    language: ["cn", "en"]
  },
  {
    id: "tpl_detective_social",
    name: { cn: "历史名人的朋友圈", en: "Historical Figure's Moments" },
    content: TEMPLATE_DETECTIVE_SOCIAL,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/14/6ff892060de55ea9.jpg",
    author: "@dotey(宝玉)",
    selections: {
      "character_groups": { cn: "中国古代开国皇帝", en: "Ancient Chinese Founding Emperors" },
      "social_media": { cn: "微信朋友圈", en: "WeChat Moments" },
      "ratio": { cn: "9:16竖构图", en: "9:16 Vertical" }
    },
    tags: ["创意", "人物", "摄影"],
    language: ["cn", "en"]
  },
  {
    id: "tpl_magazine_cover",
    name: { cn: "杂志大片", en: "Magazine Cover" },
    content: TEMPLATE_MAGAZINE_COVER,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/16/a6106f5cc6e92a74.jpg",
    imageUrls: [
      "https://s3.bmp.ovh/imgs/2025/12/16/a6106f5cc6e92a74.jpg",
      "https://s3.bmp.ovh/imgs/2025/12/16/cf8edb6f54db15bf.jpg"
    ],
    author: "官方",
    selections: {
      "travel_location": { cn: "东北雪乡", en: "Snow Village in Northeast China" },
      "ratio": { cn: "9:16竖构图", en: "9:16 Vertical" }
    },
    tags: ["人物", "摄影", "创意"],
    language: ["cn", "en"]
  },
  {
    id: "tpl_manga_reality",
    name: { cn: "漫画人物成真", en: "Manga to Reality" },
    content: TEMPLATE_MANGA_TO_REALITY,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/16/f5291c56ece88cd9.jpg",
    author: "官方",
    selections: {
      "character_originality": { cn: "使用附图中的人物，确保结果与人物一致性", en: "Use character in attachment, ensure consistency" },
      "comic_scene": { cn: "唯美的卧室", en: "Beautiful bedroom" },
      "ratio": { cn: "9:16竖构图", en: "9:16 Vertical" }
    },
    tags: ["人物", "创意", "卡通"],
    language: ["cn", "en"]
  },
  {
    id: "tpl_industrial_design",
    name: { cn: "设计大师的产品设计", en: "Industrial Design Masterpiece" },
    content: TEMPLATE_INDUSTRIAL_DESIGN,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/17/7dbe43ae66b1a78c.jpg",
    author: "官方",
    selections: {
      "designer": { cn: "Jonathan Ive (Jony Ive)", en: "Jonathan Ive" },
      "design_item": { cn: "无人机", en: "Drone" },
      "ratio": { cn: "3:4竖构图", en: "3:4 Vertical" }
    },
    tags: ["产品", "创意", "图表"],
    language: ["cn", "en"]
  },
  {
    id: "tpl_photo_grid_v2",
    name: { cn: "3x3 摄影网格出格版", en: "3x3 Photo Grid (Out of Box)" },
    content: TEMPLATE_PHOTO_GRID_V2,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/17/77bfd2bf7abc3eac.png",
    author: "官方",
    selections: {
      "clothing": { cn: "炭灰色无袖连衣裙", en: "Charcoal grey sleeveless dress" },
      "grid_pose-0": { cn: "前景手指虚化", en: "Out-of-focus fingers in foreground" },
      "grid_pose-1": { cn: "目光锁定镜头", en: "Eyes locked on camera" },
      "grid_pose-2": { cn: "单色下巴托手", en: "Monochrome hand on chin" },
      "grid_pose-3": { cn: "正面特写阴影", en: "Frontal close-up with shadows" },
      "grid_pose-4": { cn: "斜角拍摄", en: "Angled shot" },
      "grid_pose-5": { cn: "双手置于锁骨", en: "Hands on collarbones" },
      "grid_pose-6": { cn: "坐姿半身侧面", en: "Seated half-body profile" },
      "grid_pose-7": { cn: "侧面微距水滴", en: "Side macro with water drops" },
      "grid_pose-8": { cn: "回眸一笑", en: "Looking back with a smile" },
      "lens_param-0": { cn: "85mm, f/1.8", en: "85mm, f/1.8" },
      "lens_param-1": { cn: "85mm, f/2.0", en: "85mm, f/2.0" },
      "lens_param-2": { cn: "50mm, f/2.2", en: "50mm, f/2.2" },
      "lens_param-3": { cn: "50mm, f/2.5", en: "50mm, f/2.5" },
      "lens_param-4": { cn: "50mm, f/3.2", en: "50mm, f/3.2" },
      "lens_param-5": { cn: "35mm, f/4.5", en: "35mm, f/4.5" },
      "lens_param-6": { cn: "85mm, f/1.9", en: "85mm, f/1.9" },
      "lens_param-7": { cn: "50mm, f/1.8", en: "50mm, f/1.8" },
      "lens_param-8": { cn: "85mm, f/2.2", en: "85mm, f/2.2" }
    },
    tags: ["人物", "摄影"],
    language: ["cn", "en"]
  },
  {
    id: "tpl_raindrop_art",
    name: { cn: "雨滴定格艺术", en: "Raindrop Art" },
    content: TEMPLATE_RAINDROP_ART,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/19/6b6e14845635b168.jpg",
    author: "@tanshilong",
    selections: {
      "rain_shape": { cn: "芭蕾舞者", en: "Ballerina" },
      "ratio": { cn: "3:4竖构图", en: "3:4 Vertical" }
    },
    tags: ["摄影", "创意"],
    language: ["cn", "en"]
  },
  {
    id: "tpl_art_growth",
    name: { cn: "可视化艺术成长之路", en: "Artistic Evolution Path" },
    content: TEMPLATE_ART_GROWTH,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/19/47a2cbfec635a29a.jpg", 
    author: "@sundyme",
    selections: {
      "art_type": { cn: "美术学", en: "Fine Arts" },
      "render_style": { cn: "3D像素风格", en: "3D Pixel Art Style" },
      "ratio": { cn: "3:4竖构图", en: "3:4 Vertical" }
    },
    tags: ["建筑", "创意", "图表"],
    language: ["cn", "en"]
  },
  {
    id: "tpl_miniature_desk",
    name: { cn: "窗边书桌微缩场景", en: "Window Desk Miniature" },
    content: TEMPLATE_MINIATURE_DESK,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/20/8e9c9c28b3d2cf1b.jpg",
    author: "@tanshilong",
    selections: {
      "show_name": { cn: "龙猫", en: "My Neighbor Totoro" },
      "character_name": { cn: "龙猫", en: "Totoro" },
      "render_style": { cn: "毛毡与粘土", en: "Felt and Clay" },
      "ratio": { cn: "4:3横构图", en: "4:3 Horizontal" }
    },
    tags: ["摄影", "创意", "卡通"],
    language: ["cn", "en"]
  }
];
