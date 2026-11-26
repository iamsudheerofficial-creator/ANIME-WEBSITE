// Only these anime are shown. Add a name here later to bring another one back.
var SHOW_ANIME = ["Naruto", "One Piece"];
(function () {
  for (var i = CLIPS.length - 1; i >= 0; i--) {
    if (CLIPS[i].section === "Anime" && SHOW_ANIME.indexOf(CLIPS[i].series) === -1) CLIPS.splice(i, 1);
  }
  for (var j = ANIME_META.length - 1; j >= 0; j--) {
    if (SHOW_ANIME.indexOf(ANIME_META[j].name) === -1) ANIME_META.splice(j, 1);
  }
})();

(function () {
  "use strict";

  function $(id) { return document.getElementById(id); }

  var topNav = $("topNav");
  var navSlider = $("navSlider");
  var searchEl = $("search");
  var stageBody = $("stageBody");
  var subStage = $("subStage");
  var welcomeSection = $("welcomeSection");
  var crumbBar = $("crumbBar");
  var backBtn = $("backBtn");
  var crumbPath = $("crumbPath");
  var qualityFilters = $("qualityFilters");

  var spotlightSection = $("spotlightSection");
  var spotArt = $("spotArt");
  var spotEyebrow = $("spotEyebrow");
  var spotTitle = $("spotTitle");
  var spotSubtitle = $("spotSubtitle");
  var dockTabsWrap = $("dockTabsWrap");
  var subTabs = $("subTabs");
  var subSlider = $("subSlider");

  var animeCatalog = $("animeCatalog");
  var animeLibSub = $("animeLibSub");
  var allAnimeCount = $("allAnimeCount");
  var animeSortBar = $("animeSortBar");
  var sortSlider = $("sortSlider");
  var alphaBar = $("alphaBar");
  var alphaSlider = $("alphaSlider");
  var allAnimeGrid = $("allAnimeGrid");
  var animeEmpty = $("animeEmpty");

  var collectionsSection = $("collectionsSection");
  var collectionsCount = $("collectionsCount");
  var movieControls = $("movieControls");
  var movieSortBar = $("movieSortBar");
  var movieSortSlider = $("movieSortSlider");
  var movieAlphaBar = $("movieAlphaBar");
  var movieAlphaSlider = $("movieAlphaSlider");
  var collectionsGrid = $("collectionsGrid");
  var movieEmpty = $("movieEmpty");

  var gridSection = $("gridSection");
  var gridTitle = $("gridTitle");
  var countEl = $("count");
  var grid = $("grid");
  var emptyEl = $("empty");

  var MAIN_SECTIONS = ["Home", "Anime", "Movie", "Others"];
  var ANIME_SUBS = ["Flow Frames", "Vocals", "Manga Panels"];
  var MOVIE_SUBS = ["All", "Scenes", "Cuts"];
  var SORT_OPTIONS = [
    { id: "az", label: "Sort A-Z" },
    { id: "za", label: "Sort Z-A" },
    { id: "pop", label: "Sort by Popularity" }
  ];
  var ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  var state = {
    section: "Home",
    animeSub: "Flow Frames",
    animeSeries: null,
    animeSort: "az",
    animeLetter: "ALL",
    movieId: null,
    movieType: "All",
    movieSort: "az",
    movieLetter: "ALL",
    quality: "All",
    sort: "default",
    query: ""
  };

  var navButtons = {};
  var activeSubKey = "";
  var subButtons = {};
  var animeSortButtons = {};
  var animeAlphaButtons = {};
  var movieSortButtons = {};
  var movieAlphaButtons = {};
  var fadeTimers = { main: null, sub: null, animeGrid: null, movieGrid: null };

  $("siteName").textContent = SITE.name;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function isRealLink(url) { return /^https?:\/\//i.test(url || ""); }

  function linkLabel(url) {
    var u = (url || "").toLowerCase();
    if (u.indexOf("drive.google.com") !== -1 || u.indexOf("docs.google.com") !== -1) return "Drive Link";
    if (u.indexOf("mega.nz") !== -1 || u.indexOf("mega.io") !== -1) return "Mega Link";
    return "Open Link";
  }

  function initials(name) {
    var parts = (name || "AC").trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  function addThumb(parent, src, alt, fallbackChar) {
    parent.textContent = "";
    var ph = el("div", "ph", fallbackChar || "▶");
    parent.appendChild(ph);
    if (src) {
      var img = document.createElement("img");
      img.alt = alt || "";
      img.loading = "lazy";
      img.addEventListener("load", function () { ph.style.display = "none"; });
      img.addEventListener("error", function () { img.remove(); });
      img.src = src;
      parent.appendChild(img);
    }
  }

  function addPosterVisual(frame, src, title, hint) {
    frame.textContent = "";
    var ph = el("div", "poster-ph");
    ph.appendChild(el("div", "poster-ph-mono", initials(title)));
    if (hint) ph.appendChild(el("span", "poster-ph-hint", hint));
    frame.appendChild(ph);
    if (src) {
      var img = document.createElement("img");
      img.alt = title || "";
      img.loading = "lazy";
      img.addEventListener("load", function () { ph.style.display = "none"; });
      img.addEventListener("error", function () { img.remove(); });
      img.src = src;
      frame.appendChild(img);
    }
  }

  function positionSlider(sliderEl, activeBtn) {
    if (!sliderEl || !activeBtn) return;
    requestAnimationFrame(function () {
      sliderEl.style.width = activeBtn.offsetWidth + "px";
      sliderEl.style.transform = "translateX(" + activeBtn.offsetLeft + "px)";
    });
  }

  function position2DSlider(sliderEl, activeBtn) {
    if (!sliderEl || !activeBtn) return;
    requestAnimationFrame(function () {
      sliderEl.style.width = activeBtn.offsetWidth + "px";
      sliderEl.style.height = activeBtn.offsetHeight + "px";
      sliderEl.style.transform = "translate(" + activeBtn.offsetLeft + "px, " + activeBtn.offsetTop + "px)";
    });
  }

  // Smooth 0.5-second downward fade-out & fade-in
  function runFade(targetEl, timerKey, updateFn) {
    if (fadeTimers[timerKey]) {
      clearTimeout(fadeTimers[timerKey]);
      fadeTimers[timerKey] = null;
    }
    targetEl.classList.remove("prep-in");
    targetEl.classList.add("fading-out");
    fadeTimers[timerKey] = setTimeout(function () {
      updateFn();
      targetEl.classList.remove("fading-out");
      targetEl.classList.add("prep-in");
      void targetEl.offsetWidth;
      requestAnimationFrame(function () {
        targetEl.classList.remove("prep-in");
      });
      fadeTimers[timerKey] = null;
    }, 300);
  }

  function fadeMain(updateFn) { updateBackground(state.query.length > 0); runFade(stageBody, "main", updateFn); }
  function fadeSub(updateFn) { runFade(subStage, "sub", updateFn); }
  // Fades only a results grid (used by A-Z letters and Sort tabs) so the controls stay still
  function fadeGrid(gridEl, key, updateFn) {
    gridEl.classList.add("stage-body");
    runFade(gridEl, key, updateFn);
  }

  function initTopNav() {
    MAIN_SECTIONS.forEach(function (sec) {
      var b = el("button", "top-link" + (state.section === sec ? " active" : ""), sec);
      b.type = "button";
      b.addEventListener("click", function () {
        if (state.section === sec && !state.animeSeries && !state.movieId && !state.query) return;
        state.section = sec;
        state.animeSeries = null;
        state.movieId = null;
        state.movieType = "All";
        state.quality = "All";
        state.animeLetter = "ALL";
        state.movieLetter = "ALL";
        if (state.query) {
          searchEl.value = "";
          state.query = "";
        }
        syncTopNav();
        fadeMain(function () { render(); });
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      topNav.appendChild(b);
      navButtons[sec] = b;
    });
    positionSlider(navSlider, navButtons[state.section]);
  }

  function syncTopNav() {
    MAIN_SECTIONS.forEach(function (sec) {
      navButtons[sec].classList.toggle("active", state.section === sec);
    });
    positionSlider(navSlider, navButtons[state.section]);
  }

  function initSortBar(containerEl, btnMap, getActive, onChange) {
    SORT_OPTIONS.forEach(function (opt) {
      var b = el("button", "sort-tab" + (getActive() === opt.id ? " active" : ""), opt.label);
      b.type = "button";
      b.addEventListener("click", function () {
        if (getActive() === opt.id) return;
        onChange(opt.id);
      });
      containerEl.appendChild(b);
      btnMap[opt.id] = b;
    });
  }

  function syncSortBar(sliderEl, btnMap, activeId) {
    SORT_OPTIONS.forEach(function (opt) {
      if (btnMap[opt.id]) btnMap[opt.id].classList.toggle("active", activeId === opt.id);
    });
    positionSlider(sliderEl, btnMap[activeId]);
  }

  function initAlphaBar(containerEl, btnMap, getActive, onChange) {
    var keys = ["ALL"].concat(ALPHABETS);
    keys.forEach(function (key) {
      var label = key === "ALL" ? "All" : key;
      var btn = el("button", "alpha-btn" + (getActive() === key ? " active" : ""), label);
      btn.type = "button";
      btn.addEventListener("click", function () {
        if (getActive() === key) return;
        onChange(key);
      });
      containerEl.appendChild(btn);
      btnMap[key] = btn;
    });
  }

  function syncAlphaBar(sliderEl, btnMap, activeKey, letterHasItems) {
    var keys = ["ALL"].concat(ALPHABETS);
    keys.forEach(function (key) {
      var btn = btnMap[key];
      if (!btn) return;
      btn.classList.toggle("active", activeKey === key);
      if (letterHasItems) {
        var has = key === "ALL" ? true : Boolean(letterHasItems[key]);
        btn.classList.toggle("has-items", has);
        btn.classList.toggle("empty-letter", !has);
      }
    });
    position2DSlider(sliderEl, btnMap[activeKey]);
  }

  // Embedded iOS sliding tabs inside .spot-dock (Anime: Flow Frames | Vocals | Manga Panels, Movie: All | Scenes | Cuts)
  function ensureDockTabs(groupKey, labels, activeLabel, onSelect) {
    dockTabsWrap.hidden = false;
    if (activeSubKey !== groupKey) {
      activeSubKey = groupKey;
      subButtons = {};
      Array.prototype.slice.call(subTabs.children).forEach(function (child) {
        if (child !== subSlider) child.remove();
      });
      labels.forEach(function (lbl) {
        var tb = el("button", "sub-tab", lbl);
        tb.type = "button";
        tb.addEventListener("click", function () { onSelect(lbl); });
        subTabs.appendChild(tb);
        subButtons[lbl] = tb;
      });
    }
    labels.forEach(function (lbl) {
      if (subButtons[lbl]) subButtons[lbl].classList.toggle("active", lbl === activeLabel);
    });
    positionSlider(subSlider, subButtons[activeLabel]);
  }

  function getAllMovieItems(filterType) {
    var list = [];
    MOVIES.forEach(function (m) {
      (m.items || []).forEach(function (it) {
        var t = it.type || "Scenes";
        if (filterType && filterType !== "All" && t !== filterType) return;
        list.push({
          title: it.title,
          section: "Movie",
          sub: t,
          movieId: m.id,
          movieTitle: m.title,
          quality: it.quality || m.quality || "",
          tags: [m.title].concat(it.tags || []),
          thumbnail: it.thumbnail || m.thumbnail || "",
          link: it.link,
          popular: Boolean(it.popular)
        });
      });
    });
    return list;
  }

  function getAllItems() {
    return CLIPS.slice().concat(getAllMovieItems("All"));
  }

  function getAnimeCollections(subName) {
    var metaMap = {};
    (ANIME_META || []).forEach(function (m) {
      metaMap[m.name.toLowerCase()] = m;
    });

    var map = {};
    var list = [];
    CLIPS.forEach(function (c) {
      if (c.section === "Anime" && c.sub === subName && c.series) {
        var key = c.series.toLowerCase();
        if (!map[key]) {
          var meta = metaMap[key] || {};
          map[key] = {
            name: c.series,
            count: 0,
            thumbnail: meta.thumbnail || "",
            popular: Boolean(meta.popular),
            popularityRank: typeof meta.popularityRank === "number" ? meta.popularityRank : 999
          };
          list.push(map[key]);
        }
        map[key].count += 1;
        if (c.popular) map[key].popular = true;
      }
    });
    return list;
  }

  function findMovie(id) {
    for (var i = 0; i < MOVIES.length; i++) {
      if (MOVIES[i].id === id) return MOVIES[i];
    }
    return null;
  }

  function buildCard(item) {
    var card = el("article", "card");
    var thumb = el("div", "thumb");
    addThumb(thumb, item.thumbnail, item.title);
    if (item.quality) thumb.appendChild(el("span", "badge", item.quality));

    var rightLabel = item.sub || item.series || item.section;
    if (rightLabel) {
      var cls = "cat";
      if (rightLabel === "Scenes") cls += " scene-badge";
      else if (rightLabel === "Cuts") cls += " cut-badge";
      thumb.appendChild(el("span", cls, rightLabel));
    }
    card.appendChild(thumb);

    var body = el("div", "body");
    body.appendChild(el("h3", "title", item.title));

    if (item.tags && item.tags.length) {
      var tags = el("div", "tags");
      item.tags.slice(0, 4).forEach(function (t) { tags.appendChild(el("span", "tag", t)); });
      body.appendChild(tags);
    }

    var a = el("a", "btn");
    if (isRealLink(item.link)) {
      a.href = item.link;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = linkLabel(item.link) + " →";
    } else {
      a.className = "btn disabled";
      a.textContent = "Link coming soon";
    }
    body.appendChild(a);
    card.appendChild(body);
    return card;
  }

  function buildCollectionCard(opts) {
    var btn = el("button", "collection-card");
    btn.type = "button";

    var thumb = el("div", "col-thumb");
    addThumb(thumb, opts.thumbnail, opts.title, opts.fallback || "★");
    if (opts.quality) thumb.appendChild(el("span", "badge", opts.quality));

    var logoBadge = el("span", "col-logo-badge");
    logoBadge.appendChild(el("span", "col-logo-dot"));
    logoBadge.appendChild(el("span", "", opts.logoText || opts.title.toUpperCase()));
    thumb.appendChild(logoBadge);
    btn.appendChild(thumb);

    var body = el("div", "body col-body");
    body.appendChild(el("h3", "col-title", opts.title));
    body.appendChild(el("p", "col-meta", opts.meta));

    if (opts.tags && opts.tags.length) {
      var tags = el("div", "tags");
      opts.tags.forEach(function (t) { tags.appendChild(el("span", "tag", t)); });
      body.appendChild(tags);
    }

    var cta = el("div", "col-cta");
    cta.appendChild(el("span", "", opts.ctaText || "Open Collection"));
    cta.appendChild(el("span", "", "→"));
    body.appendChild(cta);

    btn.appendChild(body);
    btn.addEventListener("click", opts.onClick);
    return btn;
  }

  function buildAnimePoster(seriesObj) {
    var btn = el("button", "poster-item");
    btn.type = "button";

    var frame = el("div", "poster-frame");
    addPosterVisual(frame, seriesObj.thumbnail, seriesObj.name, seriesObj.count + (seriesObj.count === 1 ? " character" : " characters"));
    frame.appendChild(el("span", "poster-count-chip", seriesObj.count + " ch"));
    btn.appendChild(frame);

    var cap = el("div", "poster-caption");
    cap.appendChild(el("span", "poster-name", seriesObj.name));
    btn.appendChild(cap);

    btn.addEventListener("click", function () {
      state.animeSeries = seriesObj.name;
      state.quality = "All";
      fadeSub(function () { render(); });
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return btn;
  }

  function renderQualityPills(pool) {
    qualityFilters.textContent = "";
    var quals = ["All"];
    pool.forEach(function (c) {
      if (c.quality && quals.indexOf(c.quality) === -1) quals.push(c.quality);
    });
    if (quals.length <= 1) return;

    quals.forEach(function (q) {
      var b = el("button", "q-pill" + (state.quality === q ? " active" : ""), q === "All" ? "All Quality" : q);
      b.type = "button";
      b.addEventListener("click", function () {
        state.quality = q;
        render();
      });
      qualityFilters.appendChild(b);
    });
  }

  function matchesSearch(item) {
    if (state.quality !== "All" && (item.quality || "") !== state.quality) return false;
    if (!state.query) return true;
    var hay = [
      item.title,
      item.section || "",
      item.sub || "",
      item.series || "",
      item.movieTitle || "",
      item.quality || ""
    ].concat(item.tags || []).join(" ").toLowerCase();
    return hay.indexOf(state.query) !== -1;
  }

  function updateSpotlight(cfg) {
    spotlightSection.hidden = false;
    spotArt.classList.toggle("wiggle", Boolean(cfg.wiggle));
    addThumb(spotArt, cfg.thumbnail, cfg.title, "✦");
    spotEyebrow.textContent = cfg.eyebrow;
    spotTitle.textContent = cfg.title;
    spotSubtitle.textContent = cfg.subtitle;
  }

  function renderAllAnimeGridOnly() {
    var allSeries = getAnimeCollections(state.animeSub);
    var filteredSeries = allSeries.filter(function (s) {
      if (state.animeLetter === "ALL") return true;
      return (s.name || "").trim().charAt(0).toUpperCase() === state.animeLetter;
    });

    if (state.animeSort === "az") {
      filteredSeries.sort(function (a, b) { return a.name.localeCompare(b.name); });
    } else if (state.animeSort === "za") {
      filteredSeries.sort(function (a, b) { return b.name.localeCompare(a.name); });
    } else if (state.animeSort === "pop") {
      filteredSeries.sort(function (a, b) {
        return a.popularityRank - b.popularityRank || b.count - a.count || a.name.localeCompare(b.name);
      });
    }

    allAnimeGrid.textContent = "";
    filteredSeries.forEach(function (s) { allAnimeGrid.appendChild(buildAnimePoster(s)); });
    animeEmpty.hidden = filteredSeries.length > 0;
    allAnimeCount.textContent = filteredSeries.length + (filteredSeries.length === 1 ? " anime" : " animes");
  }

  function renderAnimeCatalogFull() {
    var allSeries = getAnimeCollections(state.animeSub);
    animeLibSub.textContent = "All anime (" + state.animeSub + ")";

    var letterHasItems = {};
    allSeries.forEach(function (s) {
      var first = (s.name || "").trim().charAt(0).toUpperCase();
      if (first) letterHasItems[first] = true;
    });

    syncAlphaBar(alphaSlider, animeAlphaButtons, state.animeLetter, letterHasItems);
    syncSortBar(sortSlider, animeSortButtons, state.animeSort);
    renderAllAnimeGridOnly();
  }

  function renderMoviesGridOnly() {
    var filteredMovies = MOVIES.filter(function (m) {
      if (state.movieLetter === "ALL") return true;
      return (m.title || "").trim().charAt(0).toUpperCase() === state.movieLetter;
    });

    if (state.movieSort === "az") {
      filteredMovies.sort(function (a, b) { return a.title.localeCompare(b.title); });
    } else if (state.movieSort === "za") {
      filteredMovies.sort(function (a, b) { return b.title.localeCompare(a.title); });
    } else if (state.movieSort === "pop") {
      filteredMovies.sort(function (a, b) {
        var ra = typeof a.popularityRank === "number" ? a.popularityRank : 999;
        var rb = typeof b.popularityRank === "number" ? b.popularityRank : 999;
        return ra - rb || a.title.localeCompare(b.title);
      });
    }

    collectionsGrid.textContent = "";
    filteredMovies.forEach(function (m) {
      var scenesCount = (m.items || []).filter(function (x) { return x.type === "Scenes"; }).length;
      var cutsCount = (m.items || []).filter(function (x) { return x.type === "Cuts"; }).length;
      collectionsGrid.appendChild(buildCollectionCard({
        title: m.title,
        logoText: m.logoText || m.title.toUpperCase(),
        thumbnail: m.thumbnail,
        quality: m.quality,
        meta: scenesCount + " Scenes • " + cutsCount + " Cuts",
        tags: [m.year || "Movie", "Scenes", "Cuts"],
        ctaText: "Open Scenes & Cuts",
        fallback: "🎬",
        onClick: function () {
          state.movieId = m.id;
          state.movieType = "All";
          state.quality = "All";
          fadeSub(function () { render(); });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }));
    });

    movieEmpty.hidden = filteredMovies.length > 0;
    collectionsCount.textContent = filteredMovies.length + (filteredMovies.length === 1 ? " movie" : " movies");
  }

  function goToSection(sec) {
    state.section = sec;
    state.animeSeries = null;
    state.movieId = null;
    state.movieType = "All";
    state.quality = "All";
    state.animeLetter = "ALL";
    state.movieLetter = "ALL";
    syncTopNav();
    fadeMain(function () { render(); });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function render() {
    var searching = state.query.length > 0;
    var allItems = getAllItems();
    document.documentElement.classList.toggle("home-view", state.section === "Home" && !searching);
    updateBackground(searching);

    welcomeSection.hidden = true;
    crumbBar.hidden = true;
    backBtn.hidden = true;
    crumbPath.hidden = true;
    spotlightSection.hidden = true;
    dockTabsWrap.hidden = true;
    animeCatalog.hidden = true;
    collectionsSection.hidden = true;
    movieControls.hidden = true;
    movieEmpty.hidden = true;
    gridSection.hidden = true;
    qualityFilters.textContent = "";
    collectionsGrid.textContent = "";
    grid.textContent = "";

    // ========================================================
    // GLOBAL SEARCH MODE
    // ========================================================
    if (searching) {
      var results = allItems.filter(matchesSearch);
      if (state.sort === "az") results.sort(function (a, b) { return a.title.localeCompare(b.title); });

      updateSpotlight({
        eyebrow: "SEARCH RESULTS",
        title: 'Results for "' + searchEl.value.trim() + '"',
        subtitle: "Searching across Anime Flow Frames, Vocals, Manga Panels, Movies, and Others.",
        thumbnail: (results[0] && results[0].thumbnail) || "images/anime.jpg",
        tags: ["Anime", "Movie", "Others"],
        countText: results.length + (results.length === 1 ? " match" : " matches"),
        ctaLabel: "Clear Search",
        onCta: function () {
          searchEl.value = "";
          state.query = "";
          fadeMain(function () { render(); });
        }
      });

      gridSection.hidden = false;
      gridTitle.textContent = "Search Results";
      countEl.textContent = results.length + (results.length === 1 ? " item" : " items");
      results.forEach(function (item) { grid.appendChild(buildCard(item)); });
      emptyEl.hidden = results.length > 0;
      return;
    }

    // ========================================================
    // 1. HOME — CLEAN WELCOME ONLY
    // ========================================================
    if (state.section === "Home") {
      welcomeSection.hidden = false;
      return;
    }

    // ========================================================
    // 2. ANIME (Spotlight Box with Flow Frames | Vocals | Manga Panels inside .spot-dock)
    // ========================================================
    if (state.section === "Anime") {
      var inSub = CLIPS.filter(function (c) { return c.section === "Anime" && c.sub === state.animeSub; });
      var allSeries = getAnimeCollections(state.animeSub);

      var onSelectAnimeSub = function (subName) {
        if (state.animeSub === subName && !state.animeSeries) return;
        state.animeSub = subName;
        state.animeSeries = null;
        state.animeLetter = "ALL";
        state.quality = "All";
        ANIME_SUBS.forEach(function (lbl) {
          if (subButtons[lbl]) subButtons[lbl].classList.toggle("active", lbl === subName);
        });
        positionSlider(subSlider, subButtons[subName]);
        fadeSub(function () { render(); });
      };

      // Nested Characters view inside an Anime
      if (state.animeSeries) {
        crumbBar.hidden = false;
        backBtn.hidden = false;
        crumbPath.hidden = false;
        crumbPath.innerHTML = "Anime &nbsp;/&nbsp; " + state.animeSub + " &nbsp;/&nbsp; <strong>" + state.animeSeries + "</strong>";
        backBtn.onclick = function () {
          state.animeSeries = null;
          state.quality = "All";
          fadeSub(function () { render(); });
        };

        var chars = inSub.filter(function (c) { return c.series === state.animeSeries; });
        renderQualityPills(chars);
        var shownChars = chars.filter(matchesSearch);
        if (state.sort === "az") shownChars.sort(function (a, b) { return a.title.localeCompare(b.title); });

        updateSpotlight({
          eyebrow: "ANIME • " + state.animeSub.toUpperCase(),
          title: state.animeSeries + " Characters",
          subtitle: state.animeSub === "Vocals"
            ? "Clean character dialogue & isolated vocal packs from " + state.animeSeries + "."
            : "All " + state.animeSeries + " character flow frames ready for your edits.",
          thumbnail: (allSeries.filter(function (x) { return x.name === state.animeSeries; })[0] || {}).thumbnail || "images/anime.jpg",
          tags: [state.animeSeries, state.animeSub, "Clean"],
          countText: shownChars.length + (shownChars.length === 1 ? " character" : " characters"),
          ctaLabel: "Browse Characters ↓"
        });
        ensureDockTabs("anime", ANIME_SUBS, state.animeSub, onSelectAnimeSub);

        gridSection.hidden = false;
        gridTitle.textContent = "All " + state.animeSeries + " Characters (" + state.animeSub + ")";
        countEl.textContent = shownChars.length + (shownChars.length === 1 ? " character" : " characters");
        shownChars.forEach(function (c) { grid.appendChild(buildCard(c)); });
        emptyEl.hidden = shownChars.length > 0;
        return;
      }

      // Root of Anime: Spotlight Box + Flow Frames / Vocals / Manga Panels inside .spot-dock
      if (state.animeSub === "Flow Frames" || state.animeSub === "Vocals") {
        updateSpotlight({
          eyebrow: "ANIME LIBRARY",
          title: state.animeSub === "Vocals" ? "Anime - vocals" : "Anime - ff",
          subtitle: state.animeSub === "Vocals"
            ? "Pick any anime below to open clean character vocals inside."
            : "Pick any anime below to open all character flow frames inside.",
          thumbnail: "images/anime.jpg",
          wiggle: true,
          tags: ["4K Clean", "Flow Frames", "Vocals", "No CC"],
          countText: allSeries.length + (allSeries.length === 1 ? " anime" : " animes"),
          hideSort: true,
          ctaLabel: "Browse Anime ↓"
        });
        ensureDockTabs("anime", ANIME_SUBS, state.animeSub, onSelectAnimeSub);

        animeCatalog.hidden = false;
        renderAnimeCatalogFull();
        return;
      }

      // Manga Panels View
      var shownManga = inSub.filter(matchesSearch);
      if (state.sort === "az") shownManga.sort(function (a, b) { return a.title.localeCompare(b.title); });

      updateSpotlight({
        eyebrow: "ANIME LIBRARY",
        title: "Manga Panels",
        subtitle: "Clean, upscaled, and transparent manga panels ready for edits.",
        thumbnail: (inSub[0] && inSub[0].thumbnail) || "images/anime.jpg",
        tags: ["4K Upscaled", "Clean", "Transparent PNG"],
        countText: shownManga.length + (shownManga.length === 1 ? " pack" : " packs"),
        ctaLabel: "Browse Panels ↓"
      });
      ensureDockTabs("anime", ANIME_SUBS, state.animeSub, onSelectAnimeSub);

      gridSection.hidden = false;
      gridTitle.textContent = "Manga Panels";
      countEl.textContent = shownManga.length + (shownManga.length === 1 ? " pack" : " packs");
      shownManga.forEach(function (c) { grid.appendChild(buildCard(c)); });
      emptyEl.hidden = shownManga.length > 0;
      return;
    }

    // ========================================================
    // 3. MOVIE (Spotlight Box with All | Scenes | Cuts inside .spot-dock)
    // ========================================================
    if (state.section === "Movie") {
      var onSelectMovieType = function (tName) {
        if (state.movieType === tName) return;
        state.movieType = tName;
        MOVIE_SUBS.forEach(function (lbl) {
          if (subButtons[lbl]) subButtons[lbl].classList.toggle("active", lbl === tName);
        });
        positionSlider(subSlider, subButtons[tName]);
        fadeSub(function () { render(); });
      };

      // Inside a specific movie
      if (state.movieId) {
        var movie = findMovie(state.movieId);
        if (!movie) { state.movieId = null; render(); return; }

        crumbBar.hidden = false;
        backBtn.hidden = false;
        crumbPath.hidden = false;
        crumbPath.innerHTML = "Movie &nbsp;/&nbsp; <strong>" + movie.title + "</strong>";
        backBtn.onclick = function () {
          state.movieId = null;
          state.movieType = "All";
          state.quality = "All";
          fadeSub(function () { render(); });
        };

        var movieItems = (movie.items || []).map(function (it) {
          return {
            title: it.title,
            section: "Movie",
            sub: it.type || "Scenes",
            quality: it.quality || movie.quality || "",
            tags: it.tags || [],
            thumbnail: it.thumbnail || movie.thumbnail || "",
            link: it.link
          };
        });

        renderQualityPills(movieItems);

        var filtered = movieItems.filter(function (it) {
          if (state.movieType !== "All" && it.sub !== state.movieType) return false;
          return matchesSearch(it);
        });
        if (state.sort === "az") filtered.sort(function (a, b) { return a.title.localeCompare(b.title); });

        updateSpotlight({
          eyebrow: "MOVIE • " + (movie.logoText || movie.title.toUpperCase()),
          title: movie.title,
          subtitle: movie.tagline || "Clean scenes and edit-ready cuts inside this movie.",
          thumbnail: movie.thumbnail,
          tags: [movie.year || "HD", movie.quality || "4K", "Scenes", "Cuts"],
          countText: filtered.length + (filtered.length === 1 ? " clip" : " clips"),
          ctaLabel: "Browse Clips ↓"
        });
        ensureDockTabs("movie", MOVIE_SUBS, state.movieType, onSelectMovieType);

        gridSection.hidden = false;
        gridTitle.textContent = movie.title + " — " + (state.movieType === "All" ? "Scenes & Cuts" : state.movieType);
        countEl.textContent = filtered.length + (filtered.length === 1 ? " clip" : " clips");
        filtered.forEach(function (it) { grid.appendChild(buildCard(it)); });
        emptyEl.hidden = filtered.length > 0;
        return;
      }

      // Root of Movie: Spotlight Box with All | Scenes | Cuts right inside .spot-dock
      if (state.movieType === "All") {
        updateSpotlight({
          eyebrow: "MOVIE LIBRARY",
          title: "All Movies List",
          subtitle: "Pick any movie below to open all Scenes and Cuts inside.",
          thumbnail: (MOVIES[0] && MOVIES[0].thumbnail) || "images/bg.jpg",
          tags: ["4K REMUX", "Scenes", "Cuts", "No CC"],
          countText: MOVIES.length + (MOVIES.length === 1 ? " movie" : " movies"),
          hideSort: true,
          ctaLabel: "Browse Movies ↓"
        });
        ensureDockTabs("movie", MOVIE_SUBS, state.movieType, onSelectMovieType);

        collectionsSection.hidden = false;
        movieControls.hidden = false;

        var movieLetterHas = {};
        MOVIES.forEach(function (m) {
          var first = (m.title || "").trim().charAt(0).toUpperCase();
          if (first) movieLetterHas[first] = true;
        });
        syncSortBar(movieSortSlider, movieSortButtons, state.movieSort);
        syncAlphaBar(movieAlphaSlider, movieAlphaButtons, state.movieLetter, movieLetterHas);
        renderMoviesGridOnly();
        return;
      }

      // Root of Movie filtered to "Scenes" or "Cuts" across all movies
      var typeItems = getAllMovieItems(state.movieType);
      if (state.sort === "az") typeItems.sort(function (a, b) { return a.title.localeCompare(b.title); });

      updateSpotlight({
        eyebrow: "MOVIE LIBRARY • " + state.movieType.toUpperCase(),
        title: "All Movie " + state.movieType,
        subtitle: "Every " + state.movieType.toLowerCase() + " clip across all movies in one place.",
        thumbnail: (MOVIES[0] && MOVIES[0].thumbnail) || "images/bg.jpg",
        tags: ["4K REMUX", state.movieType, "No CC"],
        countText: typeItems.length + (typeItems.length === 1 ? " clip" : " clips"),
        ctaLabel: "Browse " + state.movieType + " ↓"
      });
      ensureDockTabs("movie", MOVIE_SUBS, state.movieType, onSelectMovieType);

      gridSection.hidden = false;
      gridTitle.textContent = "All Movie " + state.movieType;
      countEl.textContent = typeItems.length + (typeItems.length === 1 ? " clip" : " clips");
      typeItems.forEach(function (it) { grid.appendChild(buildCard(it)); });
      emptyEl.hidden = typeItems.length > 0;
      return;
    }

    // ========================================================
    // 4. OTHERS
    // ========================================================
    if (state.section === "Others") {
      var others = CLIPS.filter(function (c) { return c.section === "Others"; });
      crumbBar.hidden = false;
      renderQualityPills(others);
      var shownOthers = others.filter(matchesSearch);
      if (state.sort === "az") shownOthers.sort(function (a, b) { return a.title.localeCompare(b.title); });

      updateSpotlight({
        eyebrow: "EDITING ESSENTIALS",
        title: "Others & Extras",
        subtitle: "Intros, twixtors, sound effects, overlays, and project packs.",
        thumbnail: (others[0] && others[0].thumbnail) || "images/bg.jpg",
        tags: ["Intros", "Twixtors", "SFX", "Overlays"],
        countText: shownOthers.length + (shownOthers.length === 1 ? " pack" : " packs"),
        ctaLabel: "Browse Packs ↓"
      });

      gridSection.hidden = false;
      gridTitle.textContent = "Others";
      countEl.textContent = shownOthers.length + (shownOthers.length === 1 ? " pack" : " packs");
      shownOthers.forEach(function (c) { grid.appendChild(buildCard(c)); });
      emptyEl.hidden = shownOthers.length > 0;
    }
  }

  $("logoBtn").addEventListener("click", function () {
    searchEl.value = "";
    state.query = "";
    goToSection("Home");
  });



  searchEl.addEventListener("input", function () {
    state.query = searchEl.value.trim().toLowerCase();
    render();
  });

  window.addEventListener("resize", function () {
    positionSlider(navSlider, navButtons[state.section]);
    if (!dockTabsWrap.hidden) {
      var activeLbl = state.section === "Anime" ? state.animeSub : state.movieType;
      positionSlider(subSlider, subButtons[activeLbl]);
    }
    if (!animeCatalog.hidden) {
      positionSlider(sortSlider, animeSortButtons[state.animeSort]);
      position2DSlider(alphaSlider, animeAlphaButtons[state.animeLetter]);
    }
    if (!movieControls.hidden) {
      positionSlider(movieSortSlider, movieSortButtons[state.movieSort]);
      position2DSlider(movieAlphaSlider, movieAlphaButtons[state.movieLetter]);
    }
  });

  initTopNav();
  initSortBar(animeSortBar, animeSortButtons, function () { return state.animeSort; }, function (id) {
    state.animeSort = id;
    syncSortBar(sortSlider, animeSortButtons, state.animeSort);
    fadeGrid(allAnimeGrid, "animeGrid", renderAllAnimeGridOnly);
  });
  initAlphaBar(alphaBar, animeAlphaButtons, function () { return state.animeLetter; }, function (key) {
    state.animeLetter = key;
    syncAlphaBar(alphaSlider, animeAlphaButtons, state.animeLetter);
    fadeGrid(allAnimeGrid, "animeGrid", renderAllAnimeGridOnly);
  });
  initSortBar(movieSortBar, movieSortButtons, function () { return state.movieSort; }, function (id) {
    state.movieSort = id;
    syncSortBar(movieSortSlider, movieSortButtons, state.movieSort);
    fadeGrid(collectionsGrid, "movieGrid", renderMoviesGridOnly);
  });
  initAlphaBar(movieAlphaBar, movieAlphaButtons, function () { return state.movieLetter; }, function (key) {
    state.movieLetter = key;
    syncAlphaBar(movieAlphaSlider, movieAlphaButtons, state.movieLetter);
    fadeGrid(collectionsGrid, "movieGrid", renderMoviesGridOnly);
  });
  // ---------- Home hero: slides, floating cards with random bend/drift ----------
  function buildHero() {
    var frame = $("heroFrame");
    if (!frame) return;
    var seen = {}, cand = [];
    function add(src) { if (src && !seen[src]) { seen[src] = 1; cand.push(src); } }
    (ANIME_META || []).forEach(function (m) { add(m.thumbnail); });
    CLIPS.forEach(function (c) { add(c.thumbnail); });
    MOVIES.forEach(function (m) { add(m.thumbnail); });
    ["images/anime.jpg", "images/hiruzen-sarutobi.jpg", "images/bg.jpg"].forEach(add);
    var loaded = {}, left = cand.length;
    function done() { if (--left === 0) start(cand.filter(function (x) { return loaded[x]; }).slice(0, 4)); }
    cand.forEach(function (src) {
      var im = new Image();
      im.onload = function () { loaded[src] = 1; done(); };
      im.onerror = done;
      im.src = src;
    });
    function rnd(r) { return (Math.random() * 2 - 1) * r; }
    function wander() {
      [[frame, 10, 3, 4, 1.2]].forEach(function (a) {
        var e = a[0], st = e.style;
        st.setProperty("--tx", rnd(a[1]).toFixed(1) + "px"); st.setProperty("--ty", rnd(a[1]).toFixed(1) + "px");
        st.setProperty("--rx", rnd(a[2]).toFixed(1) + "deg"); st.setProperty("--ry", rnd(a[3]).toFixed(1) + "deg");
        st.setProperty("--rz", rnd(a[4]).toFixed(1) + "deg");
      });
    }
    function start(list) {
      var n = list.length; if (!n) return;
      var imgs = [], idx = 0, timer = null;
      list.forEach(function (src, k) {
        var im = document.createElement("img"); im.src = src; im.alt = ""; im.draggable = false;
        frame.appendChild(im); imgs.push(im);
      });
      function show(k) {
        idx = k;
        imgs.forEach(function (im, j) { im.classList.toggle("on", j === k); });
      }
      function restart() { clearInterval(timer); timer = setInterval(function () { show((idx + 1) % n); }, 5400); }
      show(0); restart(); wander(); setInterval(wander, 3800);
    }
  }
  welcomeSection.addEventListener("click", function (e) {
    var b = e.target.closest("[data-go]");
    if (b) goToSection(b.getAttribute("data-go"));
  });
  buildHero();

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var line = el("div", "cursor-line");
    document.body.appendChild(line);
    var tx = 0, ty = 0, x = 0, y = 0, ang = 0, len = 10, shown = false;
    document.addEventListener("pointermove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!shown) { x = tx; y = ty; shown = true; line.style.opacity = "1"; }
      var t = e.target.closest && e.target.closest(".card, .poster-item, .collection-card");
      if (t) {
        var r = t.getBoundingClientRect();
        t.style.setProperty("--ry", (((e.clientX - r.left) / r.width - 0.5) * 12).toFixed(2) + "deg");
        t.style.setProperty("--rx", (((e.clientY - r.top) / r.height - 0.5) * -12).toFixed(2) + "deg");
      }
    });
    document.addEventListener("pointerleave", function () { line.style.opacity = "0"; shown = false; });
    (function loop() {
      var dx = tx - x, dy = ty - y, sp = Math.sqrt(dx * dx + dy * dy);
      x += dx * 0.3; y += dy * 0.3;
      if (sp > 0.6) { var a = Math.atan2(dy, dx) * 180 / Math.PI; ang += (((a - ang + 540) % 360) - 180) * 0.25; }
      len += ((8 + Math.min(sp * 1.6, 34)) - len) * 0.25;
      line.style.width = len + "px";
      line.style.transform = "translate(" + x + "px," + y + "px) rotate(" + ang + "deg) translateX(-100%)";
      requestAnimationFrame(loop);
    })();
  }

  // ---------- Home: soft bokeh snow (big blurry glows + tiny sharp flakes) ----------
  (function snowInit() {
    var cv = $("snow");
    if (!cv || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var ctx = cv.getContext("2d"), W = 0, H = 0, dpr = 1, flakes = [], glows = [];
    var mx = -999, my = -999, last = 0, wasHome = true;

    function sprite(size, stops) {
      var c = document.createElement("canvas"); c.width = c.height = size;
      var g = c.getContext("2d"), r = size / 2, gr = g.createRadialGradient(r, r, 0, r, r, r);
      stops.forEach(function (s) { gr.addColorStop(s[0], s[1]); });
      g.fillStyle = gr; g.fillRect(0, 0, size, size);
      return c;
    }
    var glowSpr = sprite(128, [[0, "rgba(236,232,255,0.55)"], [0.72, "rgba(236,232,255,0.5)"], [0.9, "rgba(255,255,255,0.7)"], [1, "rgba(255,255,255,0)"]]);
    var flakeSpr = sprite(32, [[0, "rgba(255,255,255,1)"], [0.35, "rgba(255,255,255,0.85)"], [1, "rgba(255,255,255,0)"]]);

    function rnd(a, b) { return a + Math.random() * (b - a); }
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var area = W * H;
      var nf = Math.max(60, Math.min(220, Math.round(area / 9000)));
      var ng = Math.max(8, Math.min(26, Math.round(area / 90000)));
      flakes = []; glows = [];
      for (var i = 0; i < nf; i++) flakes.push({ x: rnd(0, W), y: rnd(0, H), r: rnd(1.2, 4.2), vy: rnd(18, 60), ph: rnd(0, 6.28), sw: rnd(8, 26), a: rnd(0.5, 0.95), tw: rnd(0.6, 2) });
      for (var j = 0; j < ng; j++) glows.push({ x: rnd(0, W), y: rnd(0, H), r: rnd(16, 58), vy: rnd(6, 22), ph: rnd(0, 6.28), sw: rnd(10, 40), a: rnd(0.07, 0.22) });
    }
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", function (e) { mx = e.clientX; my = e.clientY; });
    resize();

    function frame(t) {
      requestAnimationFrame(frame);
      var home = document.documentElement.classList.contains("home-view");
      if (!home) { if (wasHome) ctx.clearRect(0, 0, W, H); wasHome = false; last = t; return; }
      wasHome = true;
      var dt = Math.min((t - last) / 1000 || 0.016, 0.05); last = t;
      var time = t / 1000;
      ctx.clearRect(0, 0, W, H);
      glows.forEach(function (g) {
        g.y += g.vy * dt; if (g.y - g.r > H) { g.y = -g.r; g.x = rnd(0, W); }
        var x = g.x + Math.sin(time * 0.25 + g.ph) * g.sw;
        ctx.globalAlpha = g.a; ctx.drawImage(glowSpr, x - g.r, g.y - g.r, g.r * 2, g.r * 2);
      });
      flakes.forEach(function (f) {
        f.y += f.vy * dt;
        if (f.y - f.r > H) { f.y = -f.r; f.x = rnd(0, W); }
        var x = f.x + Math.sin(time * 0.7 + f.ph) * f.sw;
        var dx = x - mx, dy = f.y - my, d2 = dx * dx + dy * dy;
        if (d2 < 8100) { var d = Math.sqrt(d2) || 1, push = (90 - d) / 90 * 26; f.x += dx / d * push * dt * 6; f.y += dy / d * push * dt * 3; }
        ctx.globalAlpha = f.a * (0.75 + 0.25 * Math.sin(time * f.tw + f.ph));
        ctx.drawImage(flakeSpr, x - f.r * 2, f.y - f.r * 2, f.r * 4, f.r * 4);
      });
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(frame);
  })();

  // ---------- Per-page backgrounds (smooth crossfade). Files: images/<name>-background.jpg ----------
  var bgLayers = [$("bgA"), $("bgB")], bgActive = -1, bgUrl = null, bgToken = 0;
  function bgSlug(v) { return String(v).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
  function setPageBg(url) {
    if (url === bgUrl) return;
    bgUrl = url;
    var token = ++bgToken;
    function hideAll() { bgLayers.forEach(function (l) { l.classList.remove("on"); }); bgActive = -1; }
    if (!url) { hideAll(); return; }
    var im = new Image();
    im.onload = function () {
      if (token !== bgToken) return;
      var next = bgActive === 0 ? 1 : 0;
      bgLayers[next].style.backgroundImage = "url(" + url + ")";
      bgLayers[next].classList.add("on");
      if (bgActive > -1) bgLayers[bgActive].classList.remove("on");
      bgActive = next;
    };
    im.onerror = function () { if (token === bgToken) hideAll(); };
    im.src = url;
  }
  function updateBackground(searching) {
    if (searching) return;
    var url = "";
    if (state.section === "Anime") url = "images/" + (state.animeSeries ? bgSlug(state.animeSeries) : "anime") + "-background.jpg";
    else if (state.section === "Movie") url = "images/movie-background.jpg";
    else if (state.section === "Others") url = "images/others-background.jpg";
    setPageBg(url);
  }

  // ---------- Header tools: Sort + Search + A-Z live in the top-right of the page header ----------
  var toolsHost = el("div", "spot-tools"), toolsRow = el("div", "tools-row");
  toolsHost.appendChild(toolsRow);
  spotlightSection.appendChild(toolsHost);
  var searchEl = document.querySelector(".nav-right .search"), navRightEl = document.querySelector(".nav-right");
  var toolGroups = Array.prototype.map.call(document.querySelectorAll(".library-controls"), function (lc) {
    return { lc: lc, sort: lc.querySelector(".sort-tabs"), alpha: lc.querySelector(".alpha-bar") };
  });
  function placeTools() {
    var vis = null;
    toolGroups.forEach(function (g) { if (!vis && !spotlightSection.hidden && !g.lc.closest("[hidden]")) vis = g; });
    toolGroups.forEach(function (g) {
      if (g === vis) {
        if (g.sort && g.sort.parentNode !== toolsRow) toolsRow.insertBefore(g.sort, toolsRow.firstChild);
        if (g.alpha && g.alpha.parentNode !== toolsHost) toolsHost.appendChild(g.alpha);
      } else {
        if (g.sort && g.sort.parentNode !== g.lc) g.lc.appendChild(g.sort);
        if (g.alpha && g.alpha.parentNode !== g.lc) g.lc.appendChild(g.alpha);
      }
    });
    if (searchEl && navRightEl) {
      var focused = document.activeElement && searchEl.contains(document.activeElement);
      var wantInHeader = !!vis || focused || (state.query.length > 0 && !spotlightSection.hidden);
      if (wantInHeader && searchEl.parentNode !== toolsRow) toolsRow.appendChild(searchEl);
      else if (!wantInHeader && searchEl.parentNode !== navRightEl) navRightEl.appendChild(searchEl);
    }
    toolsHost.classList.toggle("has", toolsRow.childElementCount > 0);
    if (vis) window.dispatchEvent(new Event("resize"));
  }
  var renderBase = render;
  render = function () { renderBase(); placeTools(); };

  render();
})();
