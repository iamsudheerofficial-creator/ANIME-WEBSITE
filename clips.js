// ============================================================
//  EDIT THIS FILE to update your entire site (Ani - Clips).
//  Top Navigation: Home | Anime | Movie | Others
//  - Anime has:  Flow Frames | Vocals | Manga Panels
//  - Movie has:  All Movies List (with Sort + A-Z) -> Scenes & Cuts inside each movie
//  - Others has: Intros, Twixtors, SFX, Overlays, etc.
// ============================================================

const SITE = {
  name: "Ani - Clips",
  heroTitle: "Ani - Clips",
  tagline: "Curated anime flow frames, vocals, manga panels & movie scenes/cuts for editors.",
  footer: "Ani - Clips • Non-profit personal editing library. Free to use."
};

// ============================================================
//  ANIME POSTER METADATA (Optional: set poster image, popular: true, popularityRank)
// ============================================================
const ANIME_META = [
  { name: "Naruto", thumbnail: "images/hiruzen-sarutobi.jpg", popular: true, popularityRank: 1 },
  { name: "Jujutsu Kaisen", thumbnail: "", popular: true, popularityRank: 2 },
  { name: "Demon Slayer", thumbnail: "", popular: true, popularityRank: 3 },
  { name: "Chainsaw Man", thumbnail: "", popular: true, popularityRank: 4 },
  { name: "One Piece", thumbnail: "", popular: true, popularityRank: 5 },
  { name: "Attack on Titan", thumbnail: "", popular: false, popularityRank: 6 },
  { name: "Bleach", thumbnail: "", popular: false, popularityRank: 7 },
  { name: "Blue Lock", thumbnail: "", popular: false, popularityRank: 8 },
  { name: "My Hero Academia", thumbnail: "", popular: false, popularityRank: 9 }
];

// ============================================================
//  1. ANIME & OTHERS ITEMS
// ============================================================
const CLIPS = [
  // ---- ANIME -> FLOW FRAMES -> NARUTO (All Naruto Characters) ----
  { title: "Hiruzen Sarutobi", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["Lord 3rd", "Third Hokage", "flow frame"], thumbnail: "images/hiruzen-sarutobi.jpg", link: "PASTE-YOUR-LINK-HERE", popular: true, recent: true },
  { title: "Naruto Uzumaki", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["Seventh Hokage", "flow frame"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE", recent: true },
  { title: "Sasuke Uchiha", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["Uchiha", "flow frame"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Itachi Uchiha", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["Akatsuki", "Uchiha"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Kakashi Hatake", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["Sixth Hokage", "Copy Ninja"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Minato Namikaze", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["Fourth Hokage", "Yellow Flash"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Hashirama Senju", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["First Hokage", "Senju"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Tobirama Senju", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["Second Hokage", "Senju"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Tsunade Senju", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["Fifth Hokage", "Sannin"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Madara Uchiha", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["Uchiha", "flow frame"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Obito Uchiha", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["Uchiha", "Akatsuki"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Pain (Nagato)", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["Akatsuki", "Rinnegan"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Jiraiya", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["Toad Sage", "Sannin"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Gaara", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["Kazekage", "Sand"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Rock Lee", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["Taijutsu", "Eight Gates"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Might Guy", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["Eight Gates", "Taijutsu"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Shikamaru Nara", section: "Anime", sub: "Flow Frames", series: "Naruto", quality: "4K", tags: ["Shadow", "Nara"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },

  // ---- ANIME -> FLOW FRAMES -> OTHER POPULAR ANIMES ----
  { title: "Satoru Gojo", section: "Anime", sub: "Flow Frames", series: "Jujutsu Kaisen", quality: "4K", tags: ["Limitless", "flow frame"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE", recent: true },
  { title: "Ryomen Sukuna", section: "Anime", sub: "Flow Frames", series: "Jujutsu Kaisen", quality: "4K", tags: ["King of Curses", "flow frame"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Tanjiro Kamado", section: "Anime", sub: "Flow Frames", series: "Demon Slayer", quality: "4K", tags: ["Sun Breathing", "flow frame"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE", recent: true },
  { title: "Giyu Tomioka", section: "Anime", sub: "Flow Frames", series: "Demon Slayer", quality: "4K", tags: ["Water Hashira", "flow frame"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Makima", section: "Anime", sub: "Flow Frames", series: "Chainsaw Man", quality: "4K", tags: ["Control Devil", "flow frame"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE", recent: true },
  { title: "Monkey D. Luffy", section: "Anime", sub: "Flow Frames", series: "One Piece", quality: "4K", tags: ["Gear 5", "flow frame"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Eren Yeager", section: "Anime", sub: "Flow Frames", series: "Attack on Titan", quality: "4K", tags: ["Rumbling", "flow frame"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Ichigo Kurosaki", section: "Anime", sub: "Flow Frames", series: "Bleach", quality: "4K", tags: ["Bankai", "flow frame"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Seishiro Nagi", section: "Anime", sub: "Flow Frames", series: "Blue Lock", quality: "4K", tags: ["Striker", "flow frame"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Izuku Midoriya", section: "Anime", sub: "Flow Frames", series: "My Hero Academia", quality: "4K", tags: ["Deku", "flow frame"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },

  // ---- ANIME -> VOCALS (Same Structure: Animes -> Characters Inside Each Anime) ----
  { title: "Hiruzen Sarutobi", section: "Anime", sub: "Vocals", series: "Naruto", quality: "WAV", tags: ["Lord 3rd", "Clean Vocals", "No BGM"], thumbnail: "images/hiruzen-sarutobi.jpg", link: "PASTE-YOUR-LINK-HERE", recent: true },
  { title: "Madara Uchiha", section: "Anime", sub: "Vocals", series: "Naruto", quality: "WAV", tags: ["Wake Up to Reality", "Dub & Sub"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE", recent: true },
  { title: "Pain (Nagato)", section: "Anime", sub: "Vocals", series: "Naruto", quality: "FLAC", tags: ["Shinra Tensei", "Isolated"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Itachi Uchiha", section: "Anime", sub: "Vocals", series: "Naruto", quality: "WAV", tags: ["Monologue", "Clean"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Satoru Gojo", section: "Anime", sub: "Vocals", series: "Jujutsu Kaisen", quality: "WAV", tags: ["Domain Expansion", "Isolated"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE", recent: true },
  { title: "Ryomen Sukuna", section: "Anime", sub: "Vocals", series: "Jujutsu Kaisen", quality: "WAV", tags: ["Malevolent Shrine", "No BGM"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Tanjiro Kamado", section: "Anime", sub: "Vocals", series: "Demon Slayer", quality: "WAV", tags: ["Hinokami Kagura", "Japanese"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE", recent: true },
  { title: "Makima", section: "Anime", sub: "Vocals", series: "Chainsaw Man", quality: "WAV", tags: ["Dialogue", "Clean"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE", recent: true },
  { title: "Monkey D. Luffy", section: "Anime", sub: "Vocals", series: "One Piece", quality: "WAV", tags: ["Gear 5 Laugh", "Isolated"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Eren Yeager", section: "Anime", sub: "Vocals", series: "Attack on Titan", quality: "WAV", tags: ["Tatakae", "Speech"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Ichigo Kurosaki", section: "Anime", sub: "Vocals", series: "Bleach", quality: "WAV", tags: ["Bankai", "Clean"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Seishiro Nagi", section: "Anime", sub: "Vocals", series: "Blue Lock", quality: "WAV", tags: ["Dialogue", "Japanese"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },

  // ---- ANIME -> MANGA PANELS ----
  { title: "Naruto Clean Manga Panels Vol. 1", section: "Anime", sub: "Manga Panels", quality: "HD", tags: ["Transparent", "Clean", "PNG"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE", popular: true },
  { title: "Uchiha Clan Manga Panels", section: "Anime", sub: "Manga Panels", quality: "4K", tags: ["Itachi", "Madara", "Upscaled"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },

  // ---- OTHERS ----
  { title: "Clean Intro Templates Pack", section: "Others", sub: "Intro", quality: "4K", tags: ["After Effects", "Intro"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE", popular: true },
  { title: "Anime Twixtor Pack Vol. 1", section: "Others", sub: "Twixtor", quality: "4K", tags: ["60fps", "No CC"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
  { title: "Whoosh & Impact SFX Pack", section: "Others", sub: "SFX", quality: "WAV", tags: ["24-bit", "Uncompressed"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" }
];

// ============================================================
//  2. MOVIES LIST (Click any movie to view Scenes & Cuts inside)
// ============================================================
const MOVIES = [
  {
    id: "baahubali",
    title: "Baahubali: The Beginning",
    logoText: "BAAHUBALI",
    year: "2015",
    quality: "REMUX",
    popularityRank: 1,
    tagline: "Epic battle scenes and clean raw cuts for edits.",
    thumbnail: "",
    items: [
      { title: "Shiva Linga Waterfall Scene", type: "Scenes", quality: "1080p", tags: ["Raw", "No CC"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE", popular: true },
      { title: "Kalakeya War Formation Scene", type: "Scenes", quality: "1080p", tags: ["Battle", "Clean"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
      { title: "Amarendra Baahubali Entry Cuts", type: "Cuts", quality: "1080p", tags: ["Edit Cuts", "60fps"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
      { title: "Bhallaladeva Chariot Cuts", type: "Cuts", quality: "1080p", tags: ["Action", "Raw"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" }
    ]
  },
  {
    id: "interstellar",
    title: "Interstellar",
    logoText: "INTERSTELLAR",
    year: "2014",
    quality: "4K",
    popularityRank: 2,
    tagline: "IMAX space scenes and emotional dialogue cuts.",
    thumbnail: "",
    items: [
      { title: "Docking Scene (No Time for Caution)", type: "Scenes", quality: "4K", tags: ["IMAX", "Clean"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE", popular: true },
      { title: "Miller's Planet Giant Wave", type: "Scenes", quality: "4K", tags: ["IMAX", "Raw"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
      { title: "Gargantua Black Hole Cuts", type: "Cuts", quality: "4K", tags: ["Space", "Twixtor Ready"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" }
    ]
  },
  {
    id: "spiderverse",
    title: "Spider-Man: Across the Spider-Verse",
    logoText: "SPIDER-VERSE",
    year: "2023",
    quality: "4K",
    popularityRank: 3,
    tagline: "Stylized animation scenes and action cuts.",
    thumbnail: "",
    items: [
      { title: "Miguel O'Hara Chase Scene", type: "Scenes", quality: "4K", tags: ["Action", "No CC"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
      { title: "Miles Leap of Faith Cuts", type: "Cuts", quality: "4K", tags: ["Clean Cuts", "HDR"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" }
    ]
  },
  {
    id: "johnwick",
    title: "John Wick: Chapter 4",
    logoText: "JOHN WICK",
    year: "2023",
    quality: "4K",
    popularityRank: 4,
    tagline: "Neon action scenes and choreography cuts.",
    thumbnail: "",
    items: [
      { title: "Osaka Continental Fight Scene", type: "Scenes", quality: "4K", tags: ["Neon", "Action"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" },
      { title: "Paris Top-Down Dragon's Breath Cuts", type: "Cuts", quality: "4K", tags: ["Clean Cuts", "Raw"], thumbnail: "", link: "PASTE-YOUR-LINK-HERE" }
    ]
  }
];
