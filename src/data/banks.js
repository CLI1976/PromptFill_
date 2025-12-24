// 詞庫與分類配置，供 App 按需引入

export const INITIAL_CATEGORIES = {
  character: { id: "character", label: { cn: "人物", en: "CHARACTER" }, color: "blue" },
  item: { id: "item", label: { cn: "物品", en: "ITEM" }, color: "amber" },
  action: { id: "action", label: { cn: "動作", en: "ACTION" }, color: "rose" },
  location: { id: "location", label: { cn: "地點", en: "LOCATION" }, color: "emerald" },
  visual: { id: "visual", label: { cn: "畫面", en: "VISUALS" }, color: "violet" },
  other: { id: "other", label: { cn: "其他", en: "OTHER" }, color: "slate" }
};

// --- 初始數據配置 (Updated with new banks for examples) ---
export const INITIAL_BANKS = {
  role: {
    label: { cn: "角色身份", en: "Role" },
    category: "character",
    options: [
      { cn: "遊戲與動漫概念美術設計大師", en: "Master of Game and Anime Concept Art" },
      { cn: "資深影視角色原畫師", en: "Senior Film Character Concept Artist" },
      { cn: "賽博朋克風格設計師", en: "Cyberpunk Style Designer" },
      { cn: "暗黑幻想風格插畫師", en: "Dark Fantasy Style Illustrator" }
    ]
  },
  subject: {
    label: { cn: "主體對象", en: "Subject" },
    category: "character",
    options: [
      { cn: "女性角色", en: "Female Character" },
      { cn: "男性角色", en: "Male Character" },
      { cn: "機甲少女", en: "Mecha Girl" },
      { cn: "怪物擬人化", en: "Monster Anthropomorphism" },
      { cn: "奇幻種族(精靈/惡魔)", en: "Fantasy Race (Elf/Demon)" }
    ]
  },
  character_companion: {
    label: { cn: "合影角色", en: "Companion" },
    category: "character",
    options: [
      { cn: "死侍 (Deadpool)", en: "Deadpool" },
      { cn: "超人 (Superman)", en: "Superman" },
      { cn: "愛因斯坦 (Einstein)", en: "Einstein" },
      { cn: "神力女超人 (Wonder Woman)", en: "Wonder Woman" },
      { cn: "鋼鐵人 (Iron Man)", en: "Iron Man" },
      { cn: "皮卡丘 (Pikachu)", en: "Pikachu" },
      { cn: "哥吉拉 (Godzilla)", en: "Godzilla" },
      { cn: "初音未來 (Hatsune Miku)", en: "Hatsune Miku" }
    ]
  },
  layout_focus: {
    label: { cn: "構圖重心", en: "Layout Focus" },
    category: "visual",
    options: [
      { cn: "全身立繪", en: "Full-body Portrait" },
      { cn: "半身肖像", en: "Half-body Portrait" },
      { cn: "動態戰鬥姿勢", en: "Dynamic Action Pose" },
      { cn: "背影回眸", en: "Back View Looking Back" }
    ]
  },
  grid_pose: { 
    label: { cn: "九宮格動作", en: "Grid Pose" }, 
    category: "action", 
    options: [
      { cn: "前景手指虛化", en: "Out-of-focus fingers in foreground" },
      { cn: "目光鎖定鏡頭", en: "Eyes locked on camera" },
      { cn: "單色下巴托手", en: "Monochrome hand on chin" },
      { cn: "透過模糊肩帶拍攝", en: "Shooting through blurred shoulder straps" },
      { cn: "正面特寫陰影", en: "Frontal close-up with shadows" },
      { cn: "斜角拍攝", en: "Angled shot" },
      { cn: "雙手置於鎖骨", en: "Hands on collarbones" },
      { cn: "坐姿半身側面", en: "Seated half-body profile" },
      { cn: "側面微距水滴", en: "Side macro with water drops" },
      { cn: "閉眼仰頭享受", en: "Eyes closed looking up in enjoyment" },
      { cn: "用手遮擋陽光", en: "Shading eyes from sun with hand" },
      { cn: "回眸一笑", en: "Looking back with a smile" },
      { cn: "吹泡泡糖特寫", en: "Close-up blowing bubble gum" },
      { cn: "正面直視鏡頭，表情平靜，眼神清澈", en: "Staring straight at the camera, calm expression, clear eyes" },
      { cn: "凝視鏡頭，嘴角微微上揚，展現自信", en: "Staring at the camera, slight smile, showing confidence" },
      { cn: "專注地看著鏡頭，表情柔和，眼神溫和", en: "Looking intently at the camera, soft expression, gentle eyes" },
      { cn: "側身回望，眼神溫柔，嘴角上揚", en: "Side view looking back, gentle eyes, smiling" },
      { cn: "轉身回眸，長髮飄逸，笑容自然", en: "Turning back, flowing hair, natural smile" },
      { cn: "手輕撫下巴，表情優雅，眼神柔和", en: "Hand gently on chin, elegant expression, soft eyes" },
      { cn: "單手支撐下巴，表情自然，眼神專注", en: "Supporting chin with one hand, natural expression, focused eyes" },
      { cn: "利用肩帶營造景深，焦點清晰在眼睛", en: "Using shoulder straps for depth of field, focus on eyes" },
      { cn: "正在吹泡泡糖，表情可愛，眼神專注", en: "Blowing bubble gum, cute expression, focused eyes" },
      { cn: "側面微距特寫，突出面部輪廓和細節", en: "Side macro close-up, highlighting facial contours and details" }
    ] 
  },
  
  camera_angle: {
    label: { cn: "拍攝角度", en: "Camera Angle" },
    category: "visual",
    options: [
      { cn: "臉頰和頸部特寫", en: "Cheek and neck close-up" },
      { cn: "目光鎖定鏡頭", en: "Eyes locked on camera" },
      { cn: "單色下巴托手肖像", en: "Monochrome hand on chin portrait" },
      { cn: "透過模糊的肩帶拍攝", en: "Shooting through blurred shoulder straps" },
      { cn: "正面特寫，面部陰影交錯", en: "Frontal close-up, interlocking facial shadows" },
      { cn: "斜角拍攝的原始人像", en: "Raw portrait from an angle" },
      { cn: "雙手置於鎖骨附近的特寫", en: "Close-up with hands near collarbones" },
      { cn: "坐姿半身側面照", en: "Seated half-body profile shot" },
      { cn: "側面微距照", en: "Side macro shot" }
    ]
  },
  connectors: {
    label: { cn: "視覺引導", en: "Connectors" },
    category: "visual",
    options: [
      { cn: "手繪箭頭或引導線", en: "Hand-drawn arrows or guide lines" },
      { cn: "虛線連接", en: "Dashed line connections" },
      { cn: "彩色光束", en: "Colored light beams" },
      { cn: "半透明數據線", en: "Translucent data cables" }
    ]
  },
  underwear_style: {
    label: { cn: "私密內著拆解", en: "Underwear Style" },
    category: "item",
    options: [
      { cn: "成套的蕾絲內衣褲", en: "Matching lace lingerie set" },
      { cn: "運動風格純棉內衣", en: "Athletic style cotton underwear" },
      { cn: "極簡主義絲綢內衣", en: "Minimalist silk lingerie" },
      { cn: "哥德風格綁帶內衣", en: "Gothic style strappy lingerie" }
    ]
  },
  clothing: {
    label: { cn: "人物服飾", en: "Clothing" },
    category: "item",
    options: [
      { cn: "炭灰色無袖連衣裙", en: "Charcoal grey sleeveless dress" },
      { cn: "白色絲綢襯衫", en: "White silk shirt" },
      { cn: "黑色修身西裝", en: "Black slim-fit suit" },
      { cn: "戰術機能風外套", en: "Tactical techwear jacket" },
      { cn: "復古碎花連衣裙", en: "Vintage floral print dress" }
    ]
  },
  clothing_male: {
    label: { cn: "男性服飾", en: "Male Clothing" },
    category: "item",
    options: [
      { cn: "剪裁合體的深藍西裝", en: "Tailored deep blue suit" },
      { cn: "復古棕色皮夾克", en: "Vintage brown leather jacket" },
      { cn: "戰術背心與工裝褲", en: "Tactical vest and cargo pants" },
      { cn: "寬鬆的灰色衛衣", en: "Loose grey hoodie" },
      { cn: "白色亞麻襯衫", en: "White linen shirt" },
      { cn: "黑色高領毛衣", en: "Black turtleneck sweater" }
    ]
  },
  clothing_female: {
    label: { cn: "女性服飾", en: "Female Clothing" },
    category: "item",
    options: [
      { cn: "炭灰色無袖連衣裙", en: "Charcoal grey sleeveless dress" },
      { cn: "絲綢吊帶晚禮服", en: "Silk slip evening gown" },
      { cn: "機車皮衣與短裙", en: "Biker leather jacket and short skirt" },
      { cn: "白色蕾絲襯衫", en: "White lace blouse" },
      { cn: "黑色緊身連體衣", en: "Black tight bodysuit" },
      { cn: "優雅的香奈兒風套裝", en: "Elegant Chanel-style suit" }
    ]
  },
  expressions: {
    label: { cn: "表情集", en: "Expressions" },
    category: "character",
    options: [
      { cn: "瘋狂、病嬌、狂喜", en: "Crazy, Yandere, Ecstatic" },
      { cn: "羞澀、躲閃、紅暈", en: "Shy, Evasive, Blushing" },
      { cn: "冷漠、鄙視、高傲", en: "Indifferent, Contemptuous, Proud" },
      { cn: "痛苦、忍耐、咬唇", en: "Painful, Enduring, Biting lip" }
    ]
  },
  character_originality: {
    label: { cn: "人物原創性", en: "Character Originality" },
    category: "character",
    options: [
      { cn: "創作一個原創人物", en: "Create an original character" },
      { cn: "使用附圖中的人物，確保結果與人物一致性", en: "Use character in attachment, ensure consistency" },
      { cn: "對知名角色再創作", en: "Re-create a well-known character" }
    ]
  },
  character_groups: {
    label: { cn: "人物組合", en: "Character Groups" },
    category: "character",
    options: [
      { cn: "中國古代開國皇帝", en: "Ancient Chinese Founding Emperors" },
      { cn: "漫威人物", en: "Marvel Characters" },
      { cn: "金庸古龍武俠人物", en: "Jin Yong & Gu Long Wuxia Characters" },
      { cn: "三國知名人物", en: "Famous Three Kingdoms Figures" },
      { cn: "知名軍事家（拿破崙、凱撒、曹操等）", en: "Famous Military Strategists (Napoleon, Caesar, Cao Cao, etc.)" },
      { cn: "全球知名運動員", en: "World-famous Athletes" },
      { cn: "中外知名偵探（包青天、狄仁傑、福爾摩斯、柯南等）", en: "Famous Detectives (Bao Zheng, Di Renjie, Sherlock Holmes, Conan, etc.)" },
      { cn: "動漫遊戲角色", en: "Anime & Game Characters" },
      { cn: "歷史名人", en: "Historical Celebrities" },
      { cn: "明星藝人", en: "Stars & Celebrities" }
    ]
  },
  social_media: {
    label: { cn: "社交媒體", en: "Social Media" },
    category: "location",
    options: [
      { cn: "微信朋友圈", en: "WeChat Moments" },
      { cn: "微博", en: "Weibo" },
      { cn: "Twitter(X)", en: "Twitter(X)" },
      { cn: "小紅書", en: "Little Red Book (Xiaohongshu)" },
      { cn: "Instagram", en: "Instagram" },
      { cn: "Facebook", en: "Facebook" },
      { cn: "抖音", en: "Douyin" },
      { cn: "TikTok", en: "TikTok" }
    ]
  },
  texture_zoom: {
    label: { cn: "材質特寫", en: "Texture Zoom" },
    category: "visual",
    options: [
      { cn: "凌亂感與私處汗漬", en: "Messiness and sweat stains in private areas" },
      { cn: "皮膚上的勒痕與紅印", en: "Strangulation marks and red imprints on skin" },
      { cn: "絲襪的抽絲細節", en: "Snagged details on silk stockings" },
      { cn: "皮革的光澤與磨損", en: "Luster and wear on leather" }
    ]
  },
  action_detail: {
    label: { cn: "動作細節", en: "Action Detail" },
    category: "action",
    options: [
      { cn: "帶著項圈的爬行", en: "Crawling with a collar" },
      { cn: "雙手被縛在身後的掙扎", en: "Struggling with hands bound behind back" },
      { cn: "跪姿並展示鞋底", en: "Kneeling and showing soles" },
      { cn: "拉扯領口的誘惑", en: "Temptation of pulling at the neckline" }
    ]
  },
  special_view: {
    label: { cn: "特殊視角", en: "Special View" },
    category: "visual",
    options: [
      { cn: "被踩在腳下的仰視視角", en: "Low-angle view from being stepped on" },
      { cn: "從門縫中偷窺的視角", en: "Perspective of peeking through a door crack" },
      { cn: "鏡子反射的背影", en: "Back view reflected in a mirror" },
      { cn: "監控攝像頭的俯視視角", en: "Top-down view from a security camera" }
    ]
  },
  bag_content: {
    label: { cn: "隨身包袋", en: "Bag Content" },
    category: "item",
    options: [
      { cn: "日常通勤包或手拿包", en: "Daily commuter bag or clutch" },
      { cn: "戰術腿包", en: "Tactical leg bag" },
      { cn: "可愛的毛絨背包", en: "Cute plush backpack" },
      { cn: "透明材質的痛包", en: "Ita-bag made of transparent material" }
    ]
  },
  cosmetics: {
    label: { cn: "美妝與護理", en: "Cosmetics" },
    category: "item",
    options: [
      { cn: "常用的化妝品組合", en: "Commonly used cosmetics combo" },
      { cn: "散落的口紅與粉餅", en: "Scattered lipsticks and compact powder" },
      { cn: "便攜式補妝鏡", en: "Portable makeup mirror" },
      { cn: "香水小樣與護手霜", en: "Perfume samples and hand cream" }
    ]
  },
  private_items: {
    label: { cn: "私密生活物件", en: "Private Items" },
    category: "item",
    options: [
      { cn: "震動棒與項圈", en: "Vibrator and collar" },
      { cn: "手銬與眼罩", en: "Handcuffs and eye mask" },
      { cn: "鞭子與蠟燭", en: "Whip and candle" },
      { cn: "潤滑液與保險套", en: "Lubricant and condom" }
    ]
  },
  art_style: {
    label: { cn: "畫風", en: "Art Style" },
    category: "visual",
    options: [
      { cn: "高質量的 2D 插畫風格", en: "High-quality 2D illustration style" },
      { cn: "寫實厚塗風格", en: "Realistic impasto style" },
      { cn: "賽博朋克霓虹風格", en: "Cyberpunk neon style" },
      { cn: "水彩手繪風格", en: "Watercolor hand-drawn style" }
    ]
  },
  background_style: {
    label: { cn: "背景風格", en: "Background Style" },
    category: "visual",
    options: [
      { cn: "漫畫網格筆記本", en: "Manga grid notebook" },
      { cn: "藍圖設計稿紙", en: "Blueprint design paper" },
      { cn: "工業風金屬背景", en: "Industrial metal background" },
      { cn: "極簡純色背景", en: "Minimalist solid color background" }
    ]
  },
  classic_scene: {
    label: { cn: "經典場景", en: "Classic Scene" },
    category: "location",
    options: [
      { cn: "黑客帝國", en: "The Matrix" },
      { cn: "千與千尋", en: "Spirited Away" },
      { cn: "瘋狂動物城（Zootopia）", en: "Zootopia" },
      { cn: "生活大爆炸", en: "The Big Bang Theory" },
      { cn: "霍格華茲魔法學院", en: "Hogwarts School of Witchcraft and Wizardry" },
      { cn: "侏羅紀公園叢林入口", en: "Jurassic Park Jungle Entrance" },
      { cn: "星際大戰塔圖因集市", en: "Star Wars Tatooine Market" },
      { cn: "魔戒夏爾", en: "The Lord of the Rings - The Shire" },
      { cn: "權力的遊戲君臨城城牆", en: "Game of Thrones - King's Landing Walls" },
      { cn: "全面啟動折疊城市", en: "Inception - Folding City" },
      { cn: "賽博朋克霓虹夜市", en: "Cyberpunk Neon Night Market" },
      { cn: "未來城市空港樞紐", en: "Future City Spaceport Hub" }
    ]
  },
  position: {
    label: { cn: "文字位置", en: "Text Position" },
    category: "location",
    options: [
      { cn: "頂部中央", en: "Top Center" },
      { cn: "底部中央", en: "Bottom Center" },
      { cn: "左上角偏中", en: "Top Left biased center" },
      { cn: "右上角偏中", en: "Top Right biased center" },
      { cn: "畫面中上方懸浮", en: "Floating in top middle" }
    ]
  },
  render_style: {
    label: { cn: "渲染風格", en: "Render Style" },
    category: "visual",
    options: [
      { cn: "Octane Render 和 Cinema 4D", en: "Octane Render and Cinema 4D" },
      { cn: "樂高積木風格", en: "LEGO Block Style" },
      { cn: "Unreal Engine 5 寫實光追", en: "Unreal Engine 5 Realistic Ray Tracing" },
      { cn: "Pixar 卡通渲染", en: "Pixar Cartoon Rendering" },
      { cn: "黏土動畫質感", en: "Claymation Texture" },
      { cn: "手辦級實體渲染", en: "Figurine-level Physical Rendering" },
      { cn: "3D像素風格", en: "3D Pixel Art Style" },
      { cn: "手工毛線針織風格", en: "Hand-knitted Yarn Style" },
      { cn: "毛線針織", en: "Knitted Yarn" },
      { cn: "毛氈與粘土", en: "Felt and Clay" },
      { cn: "紙殼紙板", en: "Cardboard" }
    ]
  },
  show_name: {
    label: { cn: "劇名", en: "Show Name" },
    category: "other",
    options: [
      { cn: "泰坦尼克號", en: "Titanic" },
      { cn: "龍貓", en: "My Neighbor Totoro" },
      { cn: "哈利·波特", en: "Harry Potter" },
      { cn: "星際穿越", en: "Interstellar" },
      { cn: "千與千尋", en: "Spirited Away" },
      { cn: "復仇者聯盟", en: "The Avengers" }
    ]
  },
  character_name: {
    label: { cn: "角色", en: "Character Name" },
    category: "character",
    options: [
      { cn: "Jack and Rose", en: "Jack and Rose" },
      { cn: "龍貓", en: "Totoro" },
      { cn: "哈利·波特", en: "Harry Potter" },
      { cn: "庫珀", en: "Cooper" },
      { cn: "千尋", en: "Chihiro" },
      { cn: "綠巨人", en: "Hulk" },
      { cn: "薩諾斯", en: "Thanos" },
      { cn: "鋼鐵人", en: "Iron Man" }
    ]
  },
  art_type: {
    label: { cn: "藝術門類", en: "Art Type" },
    category: "other",
    options: [
      { cn: "美術學", en: "Fine Arts" },
      { cn: "時尚學", en: "Fashion Studies" },
      { cn: "建築學", en: "Architecture" },
      { cn: "攝影學", en: "Photography" },
      { cn: "雕塑藝術", en: "Sculpture Art" },
      { cn: "工業設計", en: "Industrial Design" }
    ]
  },
  company: {
    label: { cn: "公司", en: "Company" },
    category: "location",
    options: [
      { cn: "Apple", en: "Apple" },
      { cn: "任天堂（Nintendo）", en: "Nintendo" },
      { cn: "SONY", en: "SONY" },
      { cn: "宜家（IKEA）", en: "IKEA" }
    ]
  },
  ratio: {
    label: { cn: "畫幅比例", en: "Aspect Ratio" },
    category: "visual",
    options: [
      { cn: "3:4豎構圖", en: "3:4 Vertical" },
      { cn: "9:16豎構圖", en: "9:16 Vertical" },
      { cn: "1:1", en: "1:1 Square" },
      { cn: "4:3橫構圖", en: "4:3 Horizontal" },
      { cn: "16:9橫構圖", en: "16:9 Horizontal" },
      { cn: "圓形畫幅", en: "Circular Aspect Ratio" }
    ]
  },
  // Fashion Template additions
  fashion_deconstruct: {
    label: { cn: "穿搭解構", en: "Fashion Deconstruct" },
    category: "item",
    options: [
      { cn: "整齊折疊的外套和精緻的高跟鞋", en: "Neatly folded coat and exquisite high heels" },
      { cn: "散落的配飾與包包", en: "Scattered accessories and bags" },
      { cn: "懸掛的襯衫與百褶裙", en: "Hanging shirt and pleated skirt" },
      { cn: "堆疊的金屬配飾與皮帶", en: "Stacked metal accessories and belts" }
    ]
  },
  toy_companion: {
    label: { cn: "互動公仔", en: "Toy Companion" },
    category: "item",
    options: [
      { cn: "Labubu藝術公仔", en: "Labubu Art Toy" },
      { cn: "暴力熊積木熊", en: "Bearbrick" },
      { cn: "泡泡瑪特Molly", en: "Pop Mart Molly" },
      { cn: "復古泰迪熊", en: "Vintage Teddy Bear" },
      { cn: "賽博朋克機械狗", en: "Cyberpunk Robo-Dog" }
    ]
  },
  
  // Old ones preserved for compatibility or other templates
  lens_param: {
    label: { cn: "九宮格鏡頭", en: "Lens Parameter" },
    category: "visual",
    options: [
      { cn: "85mm, f/1.8", en: "85mm, f/1.8" },
      { cn: "85mm, f/2.0", en: "85mm, f/2.0" },
      { cn: "50mm, f/2.2", en: "50mm, f/2.2" },
      { cn: "50mm, f/2.5", en: "50mm, f/2.5" },
      { cn: "50mm, f/3.2", en: "50mm, f/3.2" },
      { cn: "35mm, f/4.5", en: "35mm, f/4.5" },
      { cn: "85mm, f/1.9", en: "85mm, f/1.9" },
      { cn: "50mm, f/1.8", en: "50mm, f/1.8" },
      { cn: "85mm, f/2.2", en: "85mm, f/2.2" },
      { cn: "50mm, f/2.0", en: "50mm, f/2.0" }
    ]
  },
  lighting: {
    label: { cn: "燈光佈置", en: "Lighting" },
    category: "visual",
    options: [
      { cn: "大型頂置柔光箱，輕微側向反射光", en: "Large overhead softbox, slight side reflection" },
      { cn: "自然窗光", en: "Natural window light" },
      { cn: "倫勃朗光", en: "Rembrandt lighting" },
      { cn: "賽博朋克霓虹光", en: "Cyberpunk neon lighting" },
      { cn: "影棚硬光", en: "Studio hard light" }
    ]
  },
  sticker_core: {
    label: { cn: "核心貼紙", en: "Sticker Core" },
    category: "item",
    options: [
      { cn: "用戶穿著甜美約會裝的照片", en: "Photo of user in a sweet date outfit" },
      { cn: "復古搖滾樂隊T恤穿搭", en: "Vintage rock band T-shirt outfit" },
      { cn: "日系JK制服穿搭", en: "Japanese JK uniform outfit" },
      { cn: "極簡職場通勤裝", en: "Minimalist office commuter outfit" }
    ]
  },
  sticker_decor: {
    label: { cn: "裝飾元素", en: "Sticker Decor" },
    category: "item",
    options: [
      { cn: "手繪愛心、閃光符號", en: "Hand-drawn hearts, sparkle symbols" },
      { cn: "星星、月亮貼紙", en: "Star and moon stickers" },
      { cn: "復古郵票與票據", en: "Vintage stamps and bills" },
      { cn: "賽博故障風Glitch元素", en: "Cyberpunk glitch elements" }
    ]
  },
  action_pose: {
    label: { cn: "互動姿勢", en: "Action Pose" },
    category: "action",
    options: [
      { cn: "用手指在男人腦後比劃'兔耳朵'", en: "Using fingers to make 'bunny ears' behind the man's head" },
      { cn: "勾肩搭背比V字手勢", en: "Arm around shoulder making V sign" },
      { cn: "互相指著對方大笑", en: "Pointing at each other and laughing" },
      { cn: "背靠背酷炫站姿", en: "Cool back-to-back standing pose" }
    ]
  },
  background_scene: {
    label: { cn: "背景場景", en: "Background Scene" },
    category: "location",
    options: [
      { cn: "俯瞰紐約市的復仇者大廈樓頂", en: "Rooftop of Avengers Tower overlooking New York City" },
      { cn: "廢棄的工業倉庫", en: "Abandoned industrial warehouse" },
      { cn: "熙熙攘攘的時代廣場", en: "Bustling Times Square" },
      { cn: "外太空飛船內部", en: "Inside a space-age spaceship" }
    ]
  },

  // Fish Eye Urban Template additions
  lens_type: {
    label: { cn: "鏡頭類型", en: "Lens Type" },
    category: "visual",
    options: [
      { cn: "標準鏡頭", en: "Standard Lens" },
      { cn: "廣角鏡頭", en: "Wide-angle Lens" },
      { cn: "長焦鏡頭", en: "Telephoto Lens" },
      { cn: "極端魚眼鏡頭", en: "Extreme Fisheye Lens" },
      { cn: "移軸鏡頭", en: "Tilt-shift Lens" },
      { cn: "微距鏡頭", en: "Macro Lens" }
    ]
  },
  school_uniform: {
    label: { cn: "校服樣式", en: "School Uniform" },
    category: "item",
    options: [
      { cn: "傳統水手服校服", en: "Traditional Sailor Uniform" },
      { cn: "灰色開衫和格子裙校服", en: "Grey cardigan and plaid skirt uniform" },
      { cn: "英倫風百褶裙校服", en: "British style pleated skirt uniform" },
      { cn: "日系JK制服", en: "Japanese JK Uniform" },
      { cn: "運動校服", en: "Tracksuit School Uniform" },
      { cn: "冬季大衣校服", en: "Winter coat school uniform" }
    ]
  },
  urban_location: {
    label: { cn: "城市地點", en: "Urban Location" },
    category: "location",
    options: [
      { cn: "澀谷十字路口", en: "Shibuya Crossing" },
      { cn: "東京塔下", en: "Under Tokyo Tower" },
      { cn: "時代廣場", en: "Times Square" },
      { cn: "艾菲爾鐵塔旁", en: "By the Eiffel Tower" },
      { cn: "中央公園", en: "Central Park" },
      { cn: "北京王府井", en: "Beijing Wangfujing" },
      { cn: "上海外灘", en: "Shanghai Bund" },
      { cn: "香港維多利亞港", en: "Hong Kong Victoria Harbour" }
    ]
  },
  dynamic_action: {
    label: { cn: "動態動作", en: "Dynamic Action" },
    category: "action",
    options: [
      { cn: "一隻手誇張地伸向鏡頭前景", en: "One hand exaggeratedly reaching towards the foreground" },
      { cn: "雙臂張開擁抱天空", en: "Arms open wide embracing the sky" },
      { cn: "旋轉跳躍", en: "Spinning and jumping" },
      { cn: "奔跑前進", en: "Running forward" },
      { cn: "蹲下撿拾", en: "Squatting down to pick up" },
      { cn: "揮手致意", en: "Waving greeting" },
      { cn: "舞蹈姿勢", en: "Dance pose" },
      { cn: "比心手勢", en: "Heart gesture" }
    ]
  },
  fingernail_detail: {
    label: { cn: "手指甲細節", en: "Fingernail Detail" },
    category: "visual",
    options: [
      { cn: "手指甲清晰可見", en: "Fingernails clearly visible" },
      { cn: "塗有鮮豔指甲油", en: "Coated with bright nail polish" },
      { cn: "自然裸色指甲", en: "Natural nude nails" },
      { cn: "裝飾有鑽石指甲", en: "Decorated with diamond nails" },
      { cn: "漸變色指甲", en: "Gradient nails" },
      { cn: "藝術圖案指甲", en: "Artistic pattern nails" }
    ]
  },
  building_cluster: {
    label: { cn: "建築群", en: "Building Cluster" },
    category: "location",
    options: [
      { cn: "扭曲的澀谷109大樓和其他建築林立", en: "Distorted Shibuya 109 building and other forest of buildings" },
      { cn: "紐約摩天大樓群", en: "New York skyscraper cluster" },
      { cn: "巴黎古典建築", en: "Parisian classical architecture" },
      { cn: "上海現代高層建築", en: "Shanghai modern high-rise buildings" },
      { cn: "東京傳統寺廟與現代建築混合", en: "Mix of traditional Tokyo temples and modern architecture" },
      { cn: "倫敦金融城高樓", en: "City of London high-rises" }
    ]
  },
  monster_element: {
    label: { cn: "怪獸元素", en: "Monster Element" },
    category: "character",
    options: [
      { cn: "巨大的粉色和藍色漸變卡通怪獸", en: "Giant pink and blue gradient cartoon monster" },
      { cn: "機械機器人怪獸", en: "Mecha robot monster" },
      { cn: "神話傳說中的龍", en: "Legendary dragon" },
      { cn: "外星生物", en: "Alien creature" },
      { cn: "海洋深淵巨獸", en: "Deep sea behemoth" },
      { cn: "森林精靈", en: "Forest elf" }
    ]
  },
  monster_feature: {
    label: { cn: "怪獸特徵", en: "Monster Feature" },
    category: "character",
    options: [
      { cn: "巨大的觸手和角", en: "Giant tentacles and horns" },
      { cn: "鋒利的爪子和牙齒", en: "Sharp claws and teeth" },
      { cn: "多彩的翅膀", en: "Colorful wings" },
      { cn: "發光的眼睛", en: "Glowing eyes" },
      { cn: "金屬外殼", en: "Metal shell" },
      { cn: "藤蔓植物", en: "Vining plants" }
    ]
  },
  distorted_city: {
    label: { cn: "扭曲城市", en: "Distorted City" },
    category: "location",
    options: [
      { cn: "扭曲的城市景觀", en: "Distorted urban landscape" },
      { cn: "鏡面反射的城市", en: "Specularly reflected city" },
      { cn: "夢幻泡泡中的城市", en: "City inside dream bubbles" },
      { cn: "像素化的城市", en: "Pixelated city" },
      { cn: "水墨畫風格的城市", en: "Ink-wash style city" },
      { cn: "未來科幻城市", en: "Future sci-fi city" }
    ]
  },
  lighting_atmosphere: {
    label: { cn: "燈光氛圍", en: "Lighting Atmosphere" },
    category: "visual",
    options: [
      { cn: "陽光明媚", en: "Sunny" },
      { cn: "月光皎潔", en: "Bright moonlight" },
      { cn: "霓虹燈閃爍", en: "Flickering neon lights" },
      { cn: "燭光搖曳", en: "Flickering candlelight" },
      { cn: "舞台聚光燈", en: "Stage spotlights" },
      { cn: "自然晨光", en: "Natural morning light" },
      { cn: "夕陽餘暉", en: "Sunset afterglow" },
      { cn: "室內暖光", en: "Indoor warm light" }
    ]
  },
  shadow_contrast: {
    label: { cn: "陰影對比", en: "Shadow Contrast" },
    category: "visual",
    options: [
      { cn: "光影對比強烈", en: "Strong light-shadow contrast" },
      { cn: "柔和的陰影", en: "Soft shadows" },
      { cn: "戲劇性陰影", en: "Dramatic shadows" },
      { cn: "無陰影平光", en: "No-shadow flat lighting" },
      { cn: "輪廓光", en: "Rim lighting" },
      { cn: "背光剪影", en: "Backlit silhouette" }
    ]
  },
  travel_location: {
    label: { cn: "旅遊地點", en: "Travel Location" },
    category: "location",
    options: [
      { cn: "西藏拉薩布達拉宮", en: "Potala Palace, Lhasa, Tibet" },
      { cn: "湖南林中小寨", en: "Forest Village in Hunan" },
      { cn: "東北雪鄉", en: "Snow Village in Northeast China" },
      { cn: "老北京胡同", en: "Old Beijing Hutongs" },
      { cn: "雲南大理洱海", en: "Erhai Lake, Dali, Yunnan" },
      { cn: "新疆喀納斯湖", en: "Kanas Lake, Xinjiang" },
      { cn: "四川九寨溝", en: "Jiuzhaigou, Sichuan" },
      { cn: "桂林漓江", en: "Li River, Guilin" },
      { cn: "張家界天門山", en: "Tianmen Mountain, Zhangjiajie" },
      { cn: "敦煌莫高窟", en: "Mogao Grottoes, Dunhuang" },
      { cn: "內蒙古呼倫貝爾草原", en: "Hulunbuir Grassland, Inner Mongolia" },
      { cn: "台灣日月潭", en: "Sun Moon Lake, Taiwan" }
    ]
  },
  comic_scene: {
    label: { cn: "漫畫場景", en: "Comic Scene" },
    category: "location",
    options: [
      { cn: "唯美的臥室", en: "Beautiful bedroom" },
      { cn: "繁華的街頭", en: "Busy street" },
      { cn: "溫馨的教室", en: "Cozy classroom" },
      { cn: "現代咖啡廳", en: "Modern cafe" },
      { cn: "公園長椅", en: "Park bench" },
      { cn: "圖書館角落", en: "Library corner" },
      { cn: "藝術工作室", en: "Art studio" },
      { cn: "屋頂天台", en: "Rooftop" },
      { cn: "火車站月台", en: "Railway platform" },
      { cn: "書店一角", en: "Bookstore corner" }
    ]
  },
  designer: {
    label: { cn: "設計師", en: "Designer" },
    category: "character",
    options: [
      { cn: "安東尼·高迪 (Antoni Gaudí)", en: "Antoni Gaudí" },
      { cn: "Jonathan Ive (Jony Ive)", en: "Jonathan Ive" },
      { cn: "Gio Ponti", en: "Gio Ponti" },
      { cn: "迪特·拉姆斯 (Dieter Rams)", en: "Dieter Rams" },
      { cn: "菲利普·斯塔克 (Philippe Starck)", en: "Philippe Starck" },
      { cn: "原研哉 (Kenya Hara)", en: "Kenya Hara" },
      { cn: "深澤直人 (Naoto Fukasawa)", en: "Naoto Fukasawa" },
      { cn: "扎哈·哈迪德 (Zaha Hadid)", en: "Zaha Hadid" },
      { cn: "馬克·紐森 (Marc Newson)", en: "Marc Newson" },
      { cn: "湯姆·迪克森 (Tom Dixon)", en: "Tom Dixon" },
      { cn: "賈斯珀·莫里森 (Jasper Morrison)", en: "Jasper Morrison" },
      { cn: "康斯坦丁·葛切奇 (Konstantin Grcic)", en: "Konstantin Grcic" }
    ]
  },
  design_item: {
    label: { cn: "設計物品", en: "Design Item" },
    category: "item",
    options: [
      { cn: "無人機", en: "Drone" },
      { cn: "撞球桌", en: "Pool table" },
      { cn: "拖拉機", en: "Tractor" },
      { cn: "機械鍵盤", en: "Mechanical keyboard" },
      { cn: "復古打字機", en: "Vintage typewriter" },
      { cn: "單反相機", en: "DSLR camera" },
      { cn: "掃地機器人", en: "Robot vacuum" },
      { cn: "咖啡機", en: "Coffee machine" },
      { cn: "檯燈", en: "Desk lamp" },
      { cn: "椅子", en: "Chair" },
      { cn: "音響系統", en: "Sound system" },
      { cn: "手錶", en: "Watch" },
      { cn: "自行車", en: "Bicycle" },
      { cn: "電動滑板車", en: "Electric scooter" },
      { cn: "藍牙耳機", en: "Bluetooth headphones" },
      { cn: "智能音箱", en: "Smart speaker" },
      { cn: "刮鬍刀", en: "Razor" },
      { cn: "電風扇", en: "Electric fan" },
      { cn: "水壺", en: "Kettle" }
    ]
  },
  rain_shape: {
    label: { cn: "雨水形象", en: "Rain Shape" },
    category: "visual",
    options: [
      { cn: "芭蕾舞者", en: "Ballerina" },
      { cn: "飛舞的蝴蝶", en: "Flying butterfly" },
      { cn: "奔跑的駿馬", en: "Running steed" },
      { cn: "綻放的蓮花", en: "Blooming lotus" },
      { cn: "輕盈的羽毛", en: "Light feather" },
      { cn: "靈動的音符", en: "Lively musical note" }
    ]
  }
};

export const INITIAL_DEFAULTS = {
  role: { cn: "遊戲與動漫概念美術設計大師", en: "Master of Game and Anime Concept Art" },
  subject: { cn: "女性角色", en: "Female Character" },
  character_companion: { cn: "死侍 (Deadpool)", en: "Deadpool" },
  layout_focus: { cn: "全身立繪", en: "Full-body Portrait" },
  camera_angle: { cn: "臉頰和頸部特寫", en: "Cheek and neck close-up" },
  connectors: { cn: "手繪箭頭或引導線", en: "Hand-drawn arrows or guide lines" },
  underwear_style: { cn: "成套的蕾絲內衣褲", en: "Matching lace lingerie set" },
  clothing: { cn: "炭灰色無袖連衣裙", en: "Charcoal grey sleeveless dress" },
  clothing_male: { cn: "剪裁合體的深藍西裝", en: "Tailored deep blue suit" },
  clothing_female: { cn: "炭灰色無袖連衣裙", en: "Charcoal grey sleeveless dress" },
  expressions: { cn: "瘋狂、病嬌、狂喜", en: "Crazy, Yandere, Ecstatic" },
  character_originality: { cn: "創作一個原創人物", en: "Create an original character" },
  character_groups: { cn: "中外知名偵探（包青天、狄仁杰、福爾摩斯、柯南等）", en: "Famous Detectives (Bao Zheng, Di Renjie, Sherlock Holmes, Conan, etc.)" },
  social_media: { cn: "微信朋友圈", en: "WeChat Moments" },
  texture_zoom: { cn: "凌亂感與私處汗漬", en: "Messiness and sweat stains in private areas" },
  action_detail: { cn: "帶著項圈的爬行", en: "Crawling with a collar" },
  special_view: { cn: "被踩在腳下的仰視視角", en: "Low-angle view from being stepped on" },
  bag_content: { cn: "日常通勤包或手拿包", en: "Daily commuter bag or clutch" },
  cosmetics: { cn: "常用的化妝品組合", en: "Commonly used cosmetics combo" },
  private_items: { cn: "震動棒與項圈", en: "Vibrator and collar" },
  art_style: { cn: "高質量的 2D 插畫風格", en: "High-quality 2D illustration style" },
  background_style: { cn: "漫畫網格筆記本", en: "Manga grid notebook" },
  fashion_deconstruct: { cn: "整齊折疊的外套和精緻的高跟鞋", en: "Neatly folded coat and exquisite high heels" },
  toy_companion: { cn: "Labubu藝術公仔", en: "Labubu Art Toy" },
  classic_scene: { cn: "黑客帝國", en: "The Matrix" },
  render_style: { cn: "Octane Render 和 Cinema 4D", en: "Octane Render and Cinema 4D" },
  position: { cn: "頂部中央", en: "Top Center" },
  company: { cn: "任天堂（Nintendo）", en: "Nintendo" },
  ratio: { cn: "3:4豎構圖", en: "3:4 Vertical" },
  
  // Grid defaults
  grid_pose: { cn: "前景手指虛化", en: "Out-of-focus fingers in foreground" },
  
  // Legacy defaults
  lens_param: { cn: "85mm, f/1.8", en: "85mm, f/1.8" },
  lighting: { cn: "大型頂置柔光箱，輕微側向反射光", en: "Large overhead softbox, slight side reflection" },
  sticker_core: { cn: "用戶穿著甜美約會裝的照片", en: "Photo of user in a sweet date outfit" },
  sticker_decor: { cn: "手繪愛心、閃光符號", en: "Hand-drawn hearts, sparkle symbols" },
  action_pose: { cn: "用手指在男人腦後比劃'兔耳朵'", en: "Using fingers to make 'bunny ears' behind the man's head" },
  background_scene: { cn: "俯瞰紐約市的復仇者大廈樓頂", en: "Rooftop of Avengers Tower overlooking New York City" },
  
  // Fish Eye Urban defaults
  lens_type: { cn: "極端魚眼鏡頭", en: "Extreme Fisheye Lens" },
  school_uniform: { cn: "灰色開衫和格子裙校服", en: "Grey cardigan and plaid skirt uniform" },
  urban_location: { cn: "澀谷十字路口", en: "Shibuya Crossing" },
  dynamic_action: { cn: "一隻手誇張地伸向鏡頭前景", en: "One hand exaggeratedly reaching towards the foreground" },
  fingernail_detail: { cn: "手指甲清晰可見", en: "Fingernails clearly visible" },
  building_cluster: { cn: "扭曲的澀谷109大樓和其他建築林立", en: "Distorted Shibuya 109 building and other forest of buildings" },
  crowd_traffic: { cn: "擠滿行人和車輛", en: "Bustling traffic" },
  monster_element: { cn: "巨大的粉色和藍色漸變卡通怪獸", en: "Giant pink and blue gradient cartoon monster" },
  monster_feature: { cn: "巨大的觸手和角", en: "Giant tentacles and horns" },
  distorted_city: { cn: "扭曲的城市景觀", en: "Distorted urban landscape" },
  lighting_atmosphere: { cn: "陽光明媚", en: "Sunny" },
  shadow_contrast: { cn: "光影對比強烈", en: "Strong light-shadow contrast" },
  travel_location: { cn: "西藏拉薩布達拉宮", en: "Potala Palace, Lhasa, Tibet" },
  comic_scene: { cn: "唯美的臥室", en: "Beautiful bedroom" },
  designer: { cn: "Jonathan Ive (Jony Ive)", en: "Jonathan Ive" },
  design_item: { cn: "無人機", en: "Drone" },
  rain_shape: { cn: "芭蕾舞者", en: "Ballerina" },
  art_type: { cn: "美術學", en: "Fine Arts" },
  show_name: { cn: "龍貓", en: "My Neighbor Totoro" },
  character_name: { cn: "龍貓", en: "Totoro" }
};
