const STORAGE_KEY = "checktrail-editor-theme";

const SHAPES = [
  ["rect", "Rect"],
  ["rounded", "Round"],
  ["pill", "Pill"],
  ["circle", "Circle"],
  ["hex", "Hex"],
  ["diamond", "Diamond"],
  ["star", "Star"],
  ["triangle", "Triangle"],
  ["blob", "Blob"],
  ["custom", "Custom"],
];

const SHAPE_ICONS = {
  rect: '<rect x="5" y="8" width="22" height="16" rx="1"/>',
  rounded: '<rect x="5" y="8" width="22" height="16" rx="5"/>',
  pill: '<rect x="3" y="10" width="26" height="12" rx="6"/>',
  circle: '<circle cx="16" cy="16" r="10"/>',
  hex: '<polygon points="16,4 27,10.5 27,21.5 16,28 5,21.5 5,10.5"/>',
  diamond: '<polygon points="16,4 28,16 16,28 4,16"/>',
  star: '<polygon points="16,3 19.4,12.2 29,12.2 21.3,17.8 24.2,27 16,21.8 7.8,27 10.7,17.8 3,12.2 12.6,12.2"/>',
  triangle: '<polygon points="16,5 28,26 4,26"/>',
  blob: '<path d="M11.2 5.4c4.8-2.6 12.2-.8 14.6 4.6 2.6 5.6.4 12.6-4.6 14.8-5.2 2.4-12.4.6-14.8-4.8C4 14.6 6.2 8 11.2 5.4Z"/>',
  custom: '<path d="M7 9 15 5l11 4-3 13L8 26Z"/>',
};

const CLIPS = {
  hex: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)",
  diamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  star: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  blob: "polygon(32% 4%, 70% 8%, 96% 32%, 92% 70%, 64% 96%, 28% 92%, 6% 64%, 8% 28%)",
  triangle: "polygon(50% 0%, 100% 100%, 0% 100%)",
};

const DEFAULT_CLIP = "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0 50%)";
const SHAPE_CLASSES = ["pill", "rounded", "square", "circle", "hex", "diamond", "blob", "star", "triangle", "rect"];
const HANDLES = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
const ALIGNS = [
  ["left", "Left", '<path d="M6 8h20M6 16h14M6 24h20"/>'],
  ["center", "Center", '<path d="M6 8h20M10 16h12M6 24h20"/>'],
  ["right", "Right", '<path d="M6 8h20M12 16h14M6 24h20"/>'],
];

const SCREENS = [
  { id: "hub", group: "Hub", label: "Pick a category", nodes: [
    ["hub.screen", "Phone background", "screen"],
    ["hub.art", "Hero image", "image"],
    ["hub.brand", "Brand", "text"],
    ["hub.title", "Title", "text"],
    ["hub.sub", "Subtitle", "text"],
    ["hub.card1", "Anon Wheel card", "button"],
    ["hub.card1.name", "Anon Wheel name", "text"],
    ["hub.card1.desc", "Anon Wheel description", "text"],
    ["hub.card2", "Mirror Vote card", "button"],
    ["hub.card2.name", "Mirror Vote name", "text"],
    ["hub.card2.desc", "Mirror Vote description", "text"],
  ]},
  { id: "c1-home", group: "Anon Wheel", label: "Home", nodes: [
    ["c1.home.screen", "Phone background", "screen"],
    ["c1.home.art", "Hero image", "image"],
    ["c1.home.badge", "Badge", "text"],
    ["c1.home.brand", "Game name", "text"],
    ["c1.home.title", "Title", "text"],
    ["c1.home.sub", "Subtitle", "text"],
    ["c1.home.name", "Name field", "field"],
    ["c1.home.create", "Create button", "button"],
    ["c1.home.room", "Room code field", "field"],
    ["c1.home.join", "Join button", "button"],
  ]},
  { id: "c1-lobby", group: "Anon Wheel", label: "Lobby", nodes: [
    ["c1.lobby.screen", "Phone background", "screen"],
    ["c1.lobby.brand", "Top brand", "text"],
    ["c1.lobby.title", "Title", "text"],
    ["c1.lobby.sub", "Subtitle", "text"],
    ["c1.lobby.copy", "Copy link button", "button"],
    ["c1.lobby.start", "Start button", "button"],
  ]},
  { id: "c1-questions", group: "Anon Wheel", label: "Questions", nodes: [
    ["c1.questions.screen", "Phone background", "screen"],
    ["c1.questions.title", "Title", "text"],
    ["c1.questions.sub", "Subtitle", "text"],
    ["c1.questions.input", "Question field", "field"],
    ["c1.questions.add", "Add button", "button"],
  ]},
  { id: "c1-game", group: "Anon Wheel", label: "Wheel", nodes: [
    ["c1.game.screen", "Phone background", "screen"],
    ["c1.game.caption", "Caption", "text"],
  ]},
  { id: "c1-finals", group: "Anon Wheel", label: "Finals", nodes: [
    ["c1.finals.screen", "Phone background", "screen"],
    ["c1.finals.tag", "Tag", "text"],
  ]},
  { id: "c1-end", group: "Anon Wheel", label: "End", nodes: [
    ["c1.end.screen", "Phone background", "screen"],
    ["c1.end.brand", "Brand", "text"],
    ["c1.end.title", "Title", "text"],
    ["c1.end.again", "Play again button", "button"],
  ]},
  { id: "c2-home", group: "Mirror Vote", label: "Home", nodes: [
    ["c2.home.screen", "Phone background", "screen"],
    ["c2.home.art", "Hero image", "image"],
    ["c2.home.badge", "Badge", "text"],
    ["c2.home.brand", "Game name", "text"],
    ["c2.home.title", "Title", "text"],
    ["c2.home.sub", "Subtitle", "text"],
    ["c2.home.name", "Name field", "field"],
    ["c2.home.create", "Create button", "button"],
    ["c2.home.room", "Room code field", "field"],
    ["c2.home.join", "Join button", "button"],
  ]},
  { id: "c2-lobby", group: "Mirror Vote", label: "Lobby", nodes: [
    ["c2.lobby.screen", "Phone background", "screen"],
    ["c2.lobby.title", "Title", "text"],
    ["c2.lobby.sub", "Subtitle", "text"],
    ["c2.lobby.copy", "Copy link button", "button"],
    ["c2.lobby.start", "Start button", "button"],
  ]},
  { id: "c2-play", group: "Mirror Vote", label: "Vote", nodes: [
    ["c2.play.screen", "Phone background", "screen"],
    ["c2.play.eyebrow", "Eyebrow", "text"],
    ["c2.play.help", "Help text", "text"],
  ]},
  { id: "c2-wait", group: "Mirror Vote", label: "Waiting", nodes: [
    ["c2.wait.screen", "Phone background", "screen"],
    ["c2.wait.title", "Title", "text"],
    ["c2.wait.copy", "Waiting copy", "text"],
  ]},
  { id: "c2-results", group: "Mirror Vote", label: "Results", nodes: [
    ["c2.results.screen", "Phone background", "screen"],
    ["c2.results.title", "Charts title", "text"],
    ["c2.results.bodyTitle", "Portrait title", "text"],
  ]},
];

const PRESETS = {
  lime: { accent: "#c8f542", accentInk: "#102000", bg: "#071018", text: "#e8f4ff", muted: "#8aa3b5", panel: "#122433", buttonShape: "pill", buttonStyle: "fill" },
  blue: { accent: "#4d7dff", accentInk: "#071018", bg: "#05070b", text: "#eef2f7", muted: "#8b93a7", panel: "#12151c", buttonShape: "pill", buttonStyle: "fill" },
  coral: { accent: "#ff5a4a", accentInk: "#fff8f6", bg: "#14080a", text: "#ffece8", muted: "#c49b96", panel: "#2a1214", buttonShape: "rounded", buttonStyle: "fill" },
  light: { accent: "#111111", accentInk: "#ffffff", bg: "#f4efe6", text: "#171717", muted: "#6b645c", panel: "#ffffff", buttonShape: "square", buttonStyle: "outline" },
};

const DEFAULTS = {
  "hub.brand": "Checktrail",
  "hub.title": "Pick a category",
  "hub.sub": "Hosts choose the game first, then create a room.",
  "hub.card1.name": "Anon Wheel",
  "hub.card1.desc": "Secret questions, spinning wheel, rapid-fire finale",
  "hub.card2.name": "Mirror Vote",
  "hub.card2.desc": "Shuffled most likely votes, charts, and your trait portrait",
  "c1.home.badge": "Category 1",
  "c1.home.brand": "Anon Wheel",
  "c1.home.title": "Shout it out. No names attached.",
  "c1.home.sub": "Add questions in secret. Spin the wheel. Top two face the buzzer.",
  "c1.home.name": "What should we call you?",
  "c1.home.create": "Create room",
  "c1.home.room": "ROOM",
  "c1.home.join": "Join",
  "c1.lobby.brand": "Anon Wheel",
  "c1.lobby.title": "Players in the room",
  "c1.lobby.sub": "Share the link. When everyone’s in, the host starts the clock.",
  "c1.lobby.copy": "Copy link",
  "c1.lobby.start": "Open question pool",
  "c1.questions.title": "Question pool",
  "c1.questions.sub": "One shared pot. Minimum = players × 5.",
  "c1.questions.input": "Add a question…",
  "c1.questions.add": "Add question",
  "c1.game.caption": "Spinning for the next victim…",
  "c1.finals.tag": "Rapid Fire",
  "c1.end.brand": "Anon Wheel",
  "c1.end.title": "Game over",
  "c1.end.again": "Back to home",
  "c2.home.badge": "Category 2",
  "c2.home.brand": "Mirror Vote",
  "c2.home.title": "Who fits the question?",
  "c2.home.sub": "Same questions, different order. Pick anonymously.",
  "c2.home.name": "Your name",
  "c2.home.create": "Create room",
  "c2.home.room": "ROOM",
  "c2.home.join": "Join",
  "c2.lobby.title": "Players",
  "c2.lobby.sub": "When everyone’s in, the host starts.",
  "c2.lobby.copy": "Copy link",
  "c2.lobby.start": "Start voting",
  "c2.play.eyebrow": "Who is most likely…",
  "c2.play.help": "Tap the player who fits best. Your vote stays anonymous.",
  "c2.wait.title": "You’re done",
  "c2.wait.copy": "Waiting for everyone else to finish their shuffled deck…",
  "c2.results.title": "Votes per question",
  "c2.results.bodyTitle": "How the room built you",
};

function defaultTheme() {
  return {
    version: 2,
    global: { ...PRESETS.lime },
    nodes: {},
    overlays: {},
  };
}

let theme = defaultTheme();
let history = [];
let screenId = "hub";
let selectedId = "hub.brand";
let selectedOverlay = null;
let drag = null;
let colorDrag = null;

function textOf(id) {
  const n = theme.nodes[id] || {};
  return n.text || n.placeholder || n.label || DEFAULTS[id] || "";
}

function node(id) {
  return theme.nodes[id] || {};
}

function overlays() {
  return theme.overlays[screenId] || [];
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
}

function commit(next) {
  history.push(JSON.parse(JSON.stringify(theme)));
  if (history.length > 30) history.shift();
  theme = next;
  save();
  render();
}

function patchGlobal(partial) {
  commit({ ...theme, global: { ...theme.global, ...partial } });
}

function patchGlobalLive(partial) {
  theme = { ...theme, global: { ...theme.global, ...partial } };
  save();
  renderPhone();
}

function normalizeHex(value) {
  if (!value) return "";
  let hex = String(value).trim();
  if (hex[0] !== "#") hex = "#" + hex;
  if (/^#[0-9a-fA-F]{3}$/.test(hex)) {
    hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  return /^#[0-9a-fA-F]{6}$/.test(hex) ? hex.toLowerCase() : "";
}

function hexToHsv(hex) {
  hex = normalizeHex(hex) || "#ffffff";
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max ? d / max : 0, v: max };
}

function hsvToHex(h, s, v) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const to = (n) => Math.round((n + m) * 255).toString(16).padStart(2, "0");
  return "#" + to(r) + to(g) + to(b);
}

function colorField(id, label, value, optional) {
  const hex = normalizeHex(value) || (optional ? "" : "#ffffff");
  const swatch = hex || "transparent";
  return `<div class="field"><span>${label}</span>
    <div class="color-wrap" data-color-id="${id}">
      <button type="button" class="color-swatch${hex ? "" : " empty"}" data-color-toggle="${id}" style="background:${swatch}" title="Open color picker"></button>
      <input class="color-hex" id="${id}-hex" value="${hex}" spellcheck="false" placeholder="#RRGGBB">
      ${optional ? `<button type="button" class="color-clear" data-color-clear="${id}">None</button>` : ""}
      <div class="color-pop" id="${id}-pop" hidden>
        <div class="sv" data-sv="${id}"><i class="sv-cursor"></i></div>
        <input type="range" class="hue" data-hue="${id}" min="0" max="360" value="0">
        <p class="hint">This picker stays open while you drag. Click Done when you like the color.</p>
        <button type="button" data-color-done="${id}">Done</button>
      </div>
    </div>
  </div>`;
}

function bindColorField(id, apply, optional) {
  const wrap = document.querySelector('[data-color-id="' + id + '"]');
  if (!wrap) return;
  const swatch = wrap.querySelector(".color-swatch");
  const hexInput = wrap.querySelector(".color-hex");
  const pop = wrap.querySelector(".color-pop");
  const sv = wrap.querySelector(".sv");
  const cursor = wrap.querySelector(".sv-cursor");
  const hue = wrap.querySelector(".hue");
  let hsv = hexToHsv(hexInput.value || "#c8f542");

  function layout() {
    sv.style.background = "linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,hsl(" + hsv.h + ",100%,50%))";
    cursor.style.left = (hsv.s * 100) + "%";
    cursor.style.top = ((1 - hsv.v) * 100) + "%";
    hue.value = String(Math.round(hsv.h));
  }

  function paint(emit) {
    const hex = hsvToHex(hsv.h, hsv.s, hsv.v);
    swatch.style.background = hex;
    swatch.classList.remove("empty");
    hexInput.value = hex;
    layout();
    if (emit) apply(hex);
  }

  function svFromEvent(event) {
    const rect = sv.getBoundingClientRect();
    hsv.s = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    hsv.v = Math.max(0, Math.min(1, 1 - (event.clientY - rect.top) / rect.height));
    paint(true);
  }

  swatch.onclick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    document.querySelectorAll(".color-pop").forEach((item) => {
      if (item !== pop) item.hidden = true;
    });
    pop.hidden = !pop.hidden;
    if (!pop.hidden) {
      if (normalizeHex(hexInput.value)) paint(false);
      else layout();
    }
  };
  hexInput.oninput = () => {
    const hex = normalizeHex(hexInput.value);
    if (!hex) return;
    hsv = hexToHsv(hex);
    paint(true);
  };
  hue.oninput = () => {
    hsv.h = Number(hue.value);
    paint(true);
  };
  sv.onmousedown = (event) => {
    event.preventDefault();
    colorDrag = svFromEvent;
    svFromEvent(event);
  };
  const done = wrap.querySelector("[data-color-done]");
  if (done) done.onclick = () => { pop.hidden = true; };
  const clear = wrap.querySelector("[data-color-clear]");
  if (clear) clear.onclick = () => {
    hexInput.value = "";
    swatch.style.background = "transparent";
    swatch.classList.add("empty");
    pop.hidden = true;
    apply("");
  };
  if (normalizeHex(hexInput.value)) paint(false);
  else layout();
}

function patchNode(partial, refresh) {
  theme = {
    ...theme,
    nodes: { ...theme.nodes, [selectedId]: { ...node(selectedId), ...partial } },
  };
  save();
  if (refresh) render();
  else renderPhone();
}

function patchOverlay(partial, refresh) {
  const list = overlays().map((item) => item.id === selectedOverlay ? { ...item, ...partial } : item);
  theme = { ...theme, overlays: { ...theme.overlays, [screenId]: list } };
  save();
  if (refresh) render();
  else renderPhone();
}

function radiusCss(n, fallback) {
  const shape = n.shape || "";
  if (shape === "pill" || shape === "circle") return "999px";
  if (shape === "square" || shape === "rect") return (n.radius ?? 0) + "px";
  if (n.linkCorners === false) {
    return `${n.tl ?? 16}px ${n.tr ?? 16}px ${n.br ?? 16}px ${n.bl ?? 16}px`;
  }
  if (n.radius != null) return n.radius + "px";
  if (shape === "rounded") return "16px";
  return fallback || "";
}

function clipCss(n) {
  if (!n) return "";
  if (typeof n === "string") return CLIPS[n] || "";
  if (n.shape === "custom" && n.clipPath) return n.clipPath;
  return CLIPS[n.shape] || "";
}

function imageCss(n) {
  if (!n.image && !n.sprite) return "";
  const src = n.image || n.sprite;
  const fit = n.imageFit || "cover";
  const x = n.imageX ?? 50;
  const y = n.imageY ?? 50;
  const scale = n.imageScale ?? 100;
  const size = fit === "tile" ? `${scale}px` : fit === "contain" ? `contain` : fit === "fill" ? "100% 100%" : `${scale}% auto`;
  const repeat = fit === "tile" ? "repeat" : "no-repeat";
  const flipX = n.flipX ? -1 : 1;
  const flipY = n.flipY ? -1 : 1;
  const rot = n.rotate || 0;
  return [
    `background-image:url("${src}")`,
    `background-size:${fit === "cover" ? `${scale}% auto` : size}`,
    `background-position:${x}% ${y}%`,
    `background-repeat:${repeat}`,
    rot || n.flipX || n.flipY ? `transform:rotate(${rot}deg) scale(${flipX}, ${flipY})` : "",
    n.opacity != null ? `opacity:${n.opacity / 100}` : "",
  ].filter(Boolean).join(";");
}

function visualCss(id) {
  const n = node(id);
  const g = theme.global;
  const parts = [];
  const radius = radiusCss(n, g.buttonShape === "pill" ? "999px" : g.buttonShape === "square" || g.buttonShape === "rect" ? "0px" : "16px");
  if (radius) parts.push(`border-radius:${radius}`);
  const clip = clipCss(n);
  if (clip) parts.push(`clip-path:${clip}`);
  else if (n.shape) parts.push("clip-path:none");
  if (n.bg) parts.push(`background-color:${n.bg}`);
  if (n.color) parts.push(`color:${n.color}`);
  if (n.image) parts.push(imageCss(n));
  if (n.shadow) parts.push("box-shadow:0 10px 24px rgba(0,0,0,.35)");
  if (clip) parts.push("overflow:hidden");
  return parts.join(";");
}

function spriteStyle(ov) {
  if (ov.animated === "gif") {
    return `background-image:url("${ov.image}");background-size:cover;background-position:center;`;
  }
  const frames = ov.frames || 4;
  const fps = ov.fps || 8;
  const name = "sp_" + ov.id.replace(/[^a-z0-9]/gi, "");
  return `--frames:${frames};animation:${name} ${(frames / fps).toFixed(2)}s steps(${frames}) infinite;background-image:url("${ov.image}");background-size:${frames * 100}% 100%;background-repeat:no-repeat;image-rendering:pixelated;`;
}

function spriteKeyframes() {
  return overlays()
    .filter((ov) => ov.kind === "sprite" && ov.image && ov.animated !== "gif")
    .map((ov) => {
      const name = "sp_" + ov.id.replace(/[^a-z0-9]/gi, "");
      const frames = ov.frames || 4;
      return `@keyframes ${name}{from{background-position:0 0}to{background-position:-${frames * 100}% 0}}`;
    })
    .join("\n");
}

function art(id) {
  const n = node(id);
  const image = n.image;
  return `<div class="art${image ? " has-image" : ""}" data-ui="${id}" data-ui-type="image">${image ? "" : "Add a cover image"}</div>`;
}

function screenStyle(id) {
  const n = node(id);
  const bg = n.bg || theme.global.bg;
  const image = n.image;
  const background = image
    ? `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.4)), url('${image}') ${n.imageX ?? 50}% ${n.imageY ?? 50}% / ${n.imageFit === "contain" ? "contain" : "cover"} no-repeat, ${bg}`
    : bg;
  return `background:${background};color:${theme.global.text};--bg:${theme.global.bg};--text:${theme.global.text};--muted:${theme.global.muted};--accent:${theme.global.accent};--accent-ink:${theme.global.accentInk};--panel:${theme.global.panel};`;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

function overlayName(ov) {
  if (ov.kind === "text") return "Text · " + (ov.text || "New text").slice(0, 18);
  if (ov.kind === "image") return "Image";
  if (ov.kind === "sprite") return "Sprite";
  return "Shape";
}

function overlayVisualCss(ov) {
  if (ov.kind === "text") {
    const align = ov.align || "left";
    const justify = align === "right" ? "flex-end" : align === "center" ? "center" : "flex-start";
    return `background:${ov.fill || "transparent"};color:${ov.color || theme.global.text};font-size:${ov.fontSize || 24}px;text-align:${align};justify-content:${justify};`;
  }
  if (ov.kind === "image") {
    if (ov.image) return (ov.fill ? `background-color:${ov.fill};` : "") + imageCss(ov);
    if (ov.fill) return `background:${ov.fill}`;
    return "";
  }
  if (ov.kind === "sprite") return spriteStyle(ov);
  if (ov.image) return imageCss(ov);
  return `background:${ov.fill || theme.global.accent}`;
}

function overlayHtml() {
  return overlays().map((ov) => {
    const selected = selectedOverlay === ov.id ? " selected" : "";
    const shape = ov.shape || "rect";
    const clip = clipCss(ov);
    const radius = ov.kind === "text" ? "0px" : shape === "circle" || shape === "pill" ? "999px" : (ov.radius ?? 12) + "px";
    const extra = overlayVisualCss(ov);
    const handles = selectedOverlay === ov.id
      ? HANDLES.map((h) => `<span class="ov-handle" data-handle="${h}"></span>`).join("")
      : "";
    const inner = ov.kind === "text"
      ? escapeHtml(ov.text || "New text")
      : ov.kind === "image" && !ov.image && !ov.fill ? "Image" : "";
    const klass = ov.kind === "text" ? " overlay-text" : ov.kind === "image" && !ov.image && !ov.fill ? " overlay-image-empty" : "";
    return `<div class="overlay-wrap${selected}" data-overlay="${ov.id}" style="left:${ov.x}%;top:${ov.y}%;width:${ov.w}px;height:${ov.h}px;opacity:${(ov.opacity ?? 100) / 100}">
      <div class="overlay-visual${klass}" style="border-radius:${radius};${clip ? `clip-path:${clip};` : ""}${extra}">${inner}</div>
      ${handles}
    </div>`;
  }).join("");
}

function screensHtml() {
  const g = theme.global;
  SHAPE_CLASSES.forEach((name) => document.documentElement.classList.remove("ui-shape-" + name));
  document.documentElement.classList.remove("ui-style-fill", "ui-style-outline", "ui-style-soft");
  document.documentElement.classList.add("ui-shape-" + g.buttonShape, "ui-style-" + g.buttonStyle);

  const html = {
    hub: `
      <div class="phone-ui" data-ui="hub.screen" data-ui-type="screen" style="${screenStyle("hub.screen")}">
        ${art("hub.art")}
        <p class="logo" data-ui="hub.brand" data-ui-type="text">${textOf("hub.brand")}</p>
        <h1 class="title" data-ui="hub.title" data-ui-type="text">${textOf("hub.title")}</h1>
        <p class="sub" data-ui="hub.sub" data-ui-type="text">${textOf("hub.sub")}</p>
        <div class="card" data-ui="hub.card1" data-ui-type="button">
          <span class="eyebrow">Category 1</span>
          <span class="card-name" data-ui="hub.card1.name" data-ui-type="text">${textOf("hub.card1.name")}</span>
          <span class="card-desc" data-ui="hub.card1.desc" data-ui-type="text">${textOf("hub.card1.desc")}</span>
        </div>
        <div class="card" data-ui="hub.card2" data-ui-type="button">
          <span class="eyebrow">Category 2</span>
          <span class="card-name" data-ui="hub.card2.name" data-ui-type="text">${textOf("hub.card2.name")}</span>
          <span class="card-desc" data-ui="hub.card2.desc" data-ui-type="text">${textOf("hub.card2.desc")}</span>
        </div>
        ${overlayHtml()}
      </div>`,
    "c1-home": home("c1"),
    "c1-lobby": lobby("c1", "Players in the room"),
    "c1-questions": `
      <div class="phone-ui" data-ui="c1.questions.screen" data-ui-type="screen" style="${screenStyle("c1.questions.screen")}">
        <div class="topbar"><strong data-ui="c1.lobby.brand">${textOf("c1.lobby.brand")}</strong><span class="chip">12 / 15</span></div>
        <h1 class="title" data-ui="c1.questions.title" data-ui-type="text">${textOf("c1.questions.title")}</h1>
        <p class="sub" data-ui="c1.questions.sub" data-ui-type="text">${textOf("c1.questions.sub")}</p>
        <textarea class="field-box" data-ui="c1.questions.input" data-ui-type="field" placeholder="${textOf("c1.questions.input")}">${textOf("c1.questions.input")}</textarea>
        <button class="btn" data-ui="c1.questions.add" data-ui-type="button">${textOf("c1.questions.add")}</button>
        ${overlayHtml()}
      </div>`,
    "c1-game": `
      <div class="phone-ui" data-ui="c1.game.screen" data-ui-type="screen" style="${screenStyle("c1.game.screen")}">
        <div class="topbar"><strong>Anon Wheel</strong><span class="chip">Alex · 2</span></div>
        <div class="wheel"></div>
        <p class="sub" data-ui="c1.game.caption" data-ui-type="text" style="text-align:center">${textOf("c1.game.caption")}</p>
        <button class="ghost">Skip</button>
        <button class="btn">Answered</button>
        ${overlayHtml()}
      </div>`,
    "c1-finals": `
      <div class="phone-ui" data-ui="c1.finals.screen" data-ui-type="screen" style="${screenStyle("c1.finals.screen")}">
        <div class="topbar"><strong>Anon Wheel</strong><span class="badge" data-ui="c1.finals.tag" data-ui-type="text">${textOf("c1.finals.tag")}</span></div>
        <div class="buzzers"><div class="buzzer">Alex<br/>4</div><div>VS</div><div class="buzzer">Sam<br/>3</div></div>
        <p class="title">Who would eat dessert first?</p>
        <button class="btn">Correct</button>
        <button class="ghost">Wrong</button>
        ${overlayHtml()}
      </div>`,
    "c1-end": `
      <div class="phone-ui" data-ui="c1.end.screen" data-ui-type="screen" style="${screenStyle("c1.end.screen")}">
        ${art("c1.home.art")}
        <p class="logo" data-ui="c1.end.brand" data-ui-type="text">${textOf("c1.end.brand")}</p>
        <h1 class="title" data-ui="c1.end.title" data-ui-type="text">${textOf("c1.end.title")}</h1>
        <ul class="list"><li><span>#1 Alex</span><span>3 picks</span></li><li><span>#2 Sam</span><span>2 picks</span></li></ul>
        <button class="btn" data-ui="c1.end.again" data-ui-type="button">${textOf("c1.end.again")}</button>
        ${overlayHtml()}
      </div>`,
    "c2-home": home("c2"),
    "c2-lobby": lobby("c2", "Players"),
    "c2-play": `
      <div class="phone-ui" data-ui="c2.play.screen" data-ui-type="screen" style="${screenStyle("c2.play.screen")}">
        <div class="topbar"><strong>Mirror Vote</strong><span class="chip">1 / 20</span></div>
        <p class="eyebrow" data-ui="c2.play.eyebrow" data-ui-type="text">${textOf("c2.play.eyebrow")}</p>
        <h1 class="title">plan the trip?</h1>
        <p class="sub" data-ui="c2.play.help" data-ui-type="text">${textOf("c2.play.help")}</p>
        <div class="nominees"><button class="ghost">Alex</button><button class="ghost">Sam</button><button class="ghost">Riley</button><button class="ghost">Jordan</button></div>
        ${overlayHtml()}
      </div>`,
    "c2-wait": `
      <div class="phone-ui" data-ui="c2.wait.screen" data-ui-type="screen" style="${screenStyle("c2.wait.screen")}">
        <p class="badge">Category 2</p>
        <h1 class="title" data-ui="c2.wait.title" data-ui-type="text">${textOf("c2.wait.title")}</h1>
        <p class="sub" data-ui="c2.wait.copy" data-ui-type="text">${textOf("c2.wait.copy")}</p>
        ${overlayHtml()}
      </div>`,
    "c2-results": `
      <div class="phone-ui" data-ui="c2.results.screen" data-ui-type="screen" style="${screenStyle("c2.results.screen")}">
        <h1 class="title" data-ui="c2.results.title" data-ui-type="text">${textOf("c2.results.title")}</h1>
        <div class="card"><strong>Who plans the trip?</strong><p class="sub">Alex 3 · Sam 1</p></div>
        <h1 class="title" data-ui="c2.results.bodyTitle" data-ui-type="text">${textOf("c2.results.bodyTitle")}</h1>
        <p class="sub">planner · chaotic · loyal</p>
        ${overlayHtml()}
      </div>`,
  };
  return html[screenId];
}

function home(game) {
  const p = game + ".home";
  return `
    <div class="phone-ui" data-ui="${p}.screen" data-ui-type="screen" style="${screenStyle(p + ".screen")}">
      ${art(p + ".art")}
      <p class="badge" data-ui="${p}.badge" data-ui-type="text">${textOf(p + ".badge")}</p>
      <p class="logo" data-ui="${p}.brand" data-ui-type="text">${textOf(p + ".brand")}</p>
      <h1 class="title" data-ui="${p}.title" data-ui-type="text">${textOf(p + ".title")}</h1>
      <p class="sub" data-ui="${p}.sub" data-ui-type="text">${textOf(p + ".sub")}</p>
      <span class="label">Your name</span>
      <input class="field-box" data-ui="${p}.name" data-ui-type="field" placeholder="${textOf(p + ".name")}" />
      <button class="btn" data-ui="${p}.create" data-ui-type="button">${textOf(p + ".create")}</button>
      <div class="join">
        <input class="field-box" data-ui="${p}.room" data-ui-type="field" placeholder="${textOf(p + ".room")}" />
        <button class="ghost" data-ui="${p}.join" data-ui-type="button">${textOf(p + ".join")}</button>
      </div>
      ${overlayHtml()}
    </div>`;
}

function lobby(game, title) {
  const p = game + ".lobby";
  return `
    <div class="phone-ui" data-ui="${p}.screen" data-ui-type="screen" style="${screenStyle(p + ".screen")}">
      <div class="topbar">
        <strong data-ui="${p}.brand" data-ui-type="text">${textOf(p + ".brand") || textOf(game + ".home.brand")}</strong>
        <span class="chip">LIME42 <button class="ghost" data-ui="${p}.copy" data-ui-type="button" style="width:auto;margin:0;padding:4px 10px">${textOf(p + ".copy")}</button></span>
      </div>
      <h1 class="title" data-ui="${p}.title" data-ui-type="text">${textOf(p + ".title") || title}</h1>
      <p class="sub" data-ui="${p}.sub" data-ui-type="text">${textOf(p + ".sub")}</p>
      <ul class="list"><li><span>Alex</span><span>you</span></li><li><span>Sam</span><span>joined</span></li><li><span>Riley</span><span>joined</span></li></ul>
      <button class="btn" data-ui="${p}.start" data-ui-type="button">${textOf(p + ".start")}</button>
      ${overlayHtml()}
    </div>`;
}

function selectedMeta() {
  const screen = SCREENS.find((s) => s.id === screenId);
  return screen.nodes.find((n) => n[0] === selectedId) || screen.nodes[0];
}

function slider(id, label, min, max, value, step) {
  return `<div class="field"><span>${label}</span><div class="slider"><input type="range" id="${id}" min="${min}" max="${max}" step="${step || 1}" value="${value}"><output>${value}</output></div></div>`;
}

function currentScreen() {
  return SCREENS.find((s) => s.id === screenId);
}

function isHidden(id) {
  return !!node(id).hidden;
}

function layerRow(id, label, opts) {
  const active = opts.active ? " active" : "";
  const hidden = opts.hidden ? " hidden-layer" : "";
  const selectAttr = opts.overlay
    ? `data-overlay-layer="${id}"`
    : opts.hidden
      ? `data-restore-node="${id}"`
      : `data-node="${id}"`;
  const del = opts.canDelete
    ? `<button type="button" class="layer-del" ${opts.overlay ? `data-delete-overlay="${id}"` : `data-delete-node="${id}"`} title="Delete layer">×</button>`
    : `<span></span>`;
  const restore = opts.hidden
    ? `<button type="button" class="layer-del" data-restore-node="${id}" title="Restore layer">↺</button>`
    : del;
  return `<div class="layer-row"><button class="layer-btn${active}${hidden}" ${selectAttr}>${label}</button>${restore}</div>`;
}

function renderPages() {
  let last = "";
  const screen = currentScreen();
  const visible = screen.nodes.filter(([id, , type]) => type === "screen" || !isHidden(id));
  const hidden = screen.nodes.filter(([id, , type]) => type !== "screen" && isHidden(id));
  const overlayRows = overlays().map((ov) =>
    layerRow(ov.id, overlayName(ov), { overlay: true, active: selectedOverlay === ov.id, canDelete: true })
  ).join("");
  document.getElementById("pages").innerHTML = SCREENS.map((item) => {
    const group = item.group !== last ? `<p class="group">${item.group}</p>` : "";
    last = item.group;
    return `${group}<button class="page-btn${item.id === screenId ? " active" : ""}" data-screen="${item.id}">${item.label}</button>`;
  }).join("") +
    `<p class="group">Layers</p>` +
    visible.map(([id, label, type]) =>
      layerRow(id, label, {
        active: !selectedOverlay && id === selectedId,
        canDelete: type !== "screen",
      })
    ).join("") +
    overlayRows +
    `<div class="row" style="margin-top:8px">
      <button type="button" id="add-text">Add text</button>
      <button type="button" id="add-image">Add image</button>
    </div>
    <div class="row">
      <button type="button" id="add-shape">Add shape</button>
      <button type="button" id="add-sprite">Add sprite</button>
    </div>` +
    (hidden.length ? `<p class="group">Hidden</p>` + hidden.map(([id, label]) =>
      layerRow(id, label, { hidden: true, active: false, canDelete: false })
    ).join("") : "");
}

function shapeButtons(current, scope) {
  const list = scope === "global" ? SHAPES.filter(([id]) => id !== "custom") : SHAPES;
  return `<div class="shape-grid">${list.map(([id, label]) =>
    `<button type="button" data-shape-scope="${scope}" data-local-shape="${id}" class="shape-btn${current === id ? " active" : ""}" title="${label}">
      <svg viewBox="0 0 32 32" aria-hidden="true">${SHAPE_ICONS[id]}</svg>
      <span>${label}</span>
    </button>`
  ).join("")}</div>`;
}

function alignButtons(current) {
  return `<div class="row align-row">${ALIGNS.map(([id, label, icon]) =>
    `<button type="button" data-align="${id}" class="align-btn${(current || "left") === id ? " active" : ""}" title="${label}">
      <svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">${icon}</svg>
      <span>${label}</span>
    </button>`
  ).join("")}</div>`;
}

function applyAlign(el, n, type) {
  const align = n.align;
  if (!align) return;
  el.style.textAlign = align;
  if (type === "button") {
    el.style.justifyContent = align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center";
  }
  if (type === "text" || type === "image") {
    if (align === "center") {
      el.style.marginLeft = "auto";
      el.style.marginRight = "auto";
    } else if (align === "right") {
      el.style.marginLeft = "auto";
      el.style.marginRight = "0";
    } else {
      el.style.marginLeft = "0";
      el.style.marginRight = "auto";
    }
    const display = window.getComputedStyle(el).display;
    if (display === "inline" || display === "inline-block") {
      el.style.display = "block";
      el.style.width = "fit-content";
      el.style.maxWidth = "100%";
    }
  }
  if (type === "field") {
    const input = el.matches("input, textarea") ? el : el.querySelector("input, textarea");
    if (input) input.style.textAlign = align;
    const label = el.querySelector("span");
    if (label) label.style.textAlign = align;
  }
}

function clipField(n, id) {
  if (n.shape !== "custom") return "";
  return `<div class="field"><span>Custom clip-path</span><textarea id="${id}">${n.clipPath || DEFAULT_CLIP}</textarea>
    <p class="hint">Same syntax as CSS clip-path, e.g. polygon(0 0, 100% 20%, 80% 100%, 0 80%).</p></div>`;
}

function imageControls(n, prefix) {
  return `
    <p class="group">Crop &amp; transform</p>
    ${n.image ? `<div class="img-preview" style="background-image:url('${n.image}');background-position:${n.imageX ?? 50}% ${n.imageY ?? 50}%;background-size:${n.imageFit === "contain" ? "contain" : (n.imageScale ?? 100)}%"></div>` : ""}
    <div class="field"><span>Upload image</span><input type="file" id="${prefix}-image" accept="image/*"></div>
    <div class="field"><span>Fit</span><div class="row">
      ${["cover", "contain", "fill", "tile"].map((fit) => `<button type="button" data-fit="${fit}" class="${(n.imageFit || "cover") === fit ? "active" : ""}">${fit}</button>`).join("")}
    </div></div>
    ${slider(prefix + "-x", "Position X", 0, 100, n.imageX ?? 50)}
    ${slider(prefix + "-y", "Position Y", 0, 100, n.imageY ?? 50)}
    ${slider(prefix + "-zoom", "Zoom", 50, 220, n.imageScale ?? 100)}
    ${slider(prefix + "-rotate", "Rotate", -180, 180, n.rotate ?? 0)}
    ${slider(prefix + "-opacity", "Opacity", 10, 100, n.opacity ?? 100)}
    <div class="row">
      <button type="button" id="${prefix}-flipx" class="${n.flipX ? "active" : ""}">Flip H</button>
      <button type="button" id="${prefix}-flipy" class="${n.flipY ? "active" : ""}">Flip V</button>
      <button type="button" id="${prefix}-remove">Remove image</button>
    </div>`;
}

function renderInspector() {
  const g = theme.global;
  const overlay = overlays().find((item) => item.id === selectedOverlay);
  let body = `
    <p class="group">Looks</p>
    <div class="row">${Object.keys(PRESETS).map((id) => `<button data-preset="${id}">${id}</button>`).join("")}</div>
    ${colorField("page-bg", "Page background", g.bg)}
    ${colorField("accent", "Accent", g.accent)}
    <div class="field"><span>Default button shape</span>${shapeButtons(g.buttonShape, "global")}</div>
    <div class="field"><span>Button style</span><div class="row">
      ${["fill", "outline", "soft"].map((s) => `<button data-style="${s}" class="${g.buttonStyle === s ? "active" : ""}">${s}</button>`).join("")}
    </div></div>`;

  if (overlay) {
    body += `<p class="group">Selected · ${overlayName(overlay)}</p>`;
    if (overlay.kind === "text") {
      body += `
        <div class="field"><span>Text</span><textarea id="ov-text">${overlay.text || ""}</textarea></div>
        <div class="field"><span>Align</span>${alignButtons(overlay.align)}</div>
        ${slider("ov-fontsize", "Size", 12, 72, overlay.fontSize || 24)}
        ${colorField("ov-color", "Text color", overlay.color || g.text)}
        ${colorField("ov-fill", "Solid background", overlay.fill, true)}
        ${slider("ov-w", "Width", 40, 360, overlay.w || 220)}
        ${slider("ov-h", "Height", 24, 240, overlay.h || 52)}`;
    } else if (overlay.kind === "image") {
      body += `
        ${slider("ov-w", "Width", 40, 360, overlay.w || 168)}
        ${slider("ov-h", "Height", 40, 360, overlay.h || 112)}
        ${colorField("ov-fill", "Solid background", overlay.fill, true)}
        ${imageControls(overlay, "ov")}`;
    } else {
      body += `
        ${overlay.kind === "shape" ? `<div class="field"><span>Shape</span>${shapeButtons(overlay.shape || "rect", "overlay")}</div>` : ""}
        ${clipField(overlay, "ov-clip")}
        ${colorField("ov-fill", "Solid background", overlay.fill || g.accent)}
        ${slider("ov-w", "Width", 24, 320, overlay.w || 80)}
        ${slider("ov-h", "Height", 24, 320, overlay.h || 80)}
        ${slider("ov-radius", "Corner radius", 0, 160, overlay.radius ?? 12)}
        ${overlay.kind === "sprite" ? slider("ov-opacity", "Opacity", 10, 100, overlay.opacity ?? 100) : ""}
        ${overlay.kind === "sprite" ? `
          <p class="group">Sprite animation</p>
          <div class="field"><span>Sprite sheet or GIF</span><input type="file" id="ov-sprite" accept="image/*"></div>
          ${slider("ov-frames", "Frames", 1, 24, overlay.frames || 4)}
          ${slider("ov-fps", "FPS", 1, 24, overlay.fps || 8)}
          <p class="hint">GIF/WebP plays as-is. A horizontal PNG strip uses Frames + FPS like a game sprite sheet.</p>
        ` : ""}
        ${overlay.kind === "shape" || (overlay.image && overlay.kind !== "sprite") ? imageControls(overlay, "ov") : ""}`;
    }
    body += `
      <button type="button" id="ov-delete" class="danger">Delete layer</button>
      <p class="hint">Drag the layer on the phone to move it. Blue handles resize it.</p>`;
  } else {
    const meta = selectedMeta();
    selectedId = meta[0];
    const type = meta[2];
    const n = node(selectedId);
    body += `
      <p class="group">Selected · ${meta[1]}</p>
      ${type === "text" || type === "button" ? `<div class="field"><span>Text</span><textarea id="node-text">${n.text || ""}</textarea></div>` : ""}
      ${type === "field" ? `<div class="field"><span>Placeholder</span><input id="node-placeholder" value="${n.placeholder || ""}"></div>` : ""}
      ${type === "text" || type === "field" || type === "button" || type === "image" ? `<div class="field"><span>Align</span>${alignButtons(n.align)}</div>` : ""}
      ${type === "button" || type === "image" || type === "screen" ? `<div class="field"><span>Shape</span>${shapeButtons(n.shape || g.buttonShape, "node")}</div>` : ""}
      ${type === "button" || type === "image" || type === "screen" ? clipField(n, "node-clip") : ""}
      ${type === "button" || type === "image" || type === "screen" ? slider("node-radius", "Corner radius", 0, 80, n.radius ?? 16) : ""}
      ${type === "button" || type === "image" || type === "screen" ? `
        <label class="check"><input type="checkbox" id="link-corners" ${n.linkCorners === false ? "" : "checked"}> Link corners</label>
        <div class="field"><span>Independent corners</span><div class="corners">
          <input id="r-tl" type="number" min="0" max="80" value="${n.tl ?? n.radius ?? 16}" title="Top left">
          <input id="r-tr" type="number" min="0" max="80" value="${n.tr ?? n.radius ?? 16}" title="Top right">
          <input id="r-bl" type="number" min="0" max="80" value="${n.bl ?? n.radius ?? 16}" title="Bottom left">
          <input id="r-br" type="number" min="0" max="80" value="${n.br ?? n.radius ?? 16}" title="Bottom right">
        </div></div>` : ""}
      ${colorField("node-color", "Text color", n.color || g.text)}
      ${type === "button"
        ? colorField("node-bg", "Solid background", n.bg || g.accent)
        : type === "screen"
          ? colorField("node-bg", "Solid background", n.bg || g.bg)
          : colorField("node-bg", "Solid background", n.bg, true)}
      ${type === "image" || type === "screen" || type === "button" ? imageControls(n, "node") : ""}
      ${type === "button" ? `<label class="check"><input type="checkbox" id="node-shadow" ${n.shadow ? "checked" : ""}> Drop shadow</label>` : ""}
      ${type !== "screen" ? `<button type="button" id="node-delete" class="danger">Delete layer</button>` : ""}`;
  }

  body += `<p class="hint">Export downloads theme.json into the game folder. This editor stays a separate Chrome app.</p>`;
  document.getElementById("inspector").innerHTML = body;
}

function applyVisualsToPhone() {
  document.querySelectorAll("#phone [data-ui]").forEach((el) => {
    const id = el.getAttribute("data-ui");
    const type = el.getAttribute("data-ui-type") || "text";
    const n = node(id);
    if (n.hidden) {
      el.style.display = "none";
      return;
    }
    if (n.color) el.style.color = n.color;
    if (n.bg && (type === "text" || type === "field")) el.style.background = n.bg;
    applyAlign(el, n, type);
    if (type === "text" || type === "field") {
      el.classList.toggle("selected", !selectedOverlay && id === selectedId);
      return;
    }
    const extra = visualCss(id);
    if (extra) el.style.cssText += ";" + extra;
    el.classList.toggle("selected", !selectedOverlay && id === selectedId);
  });
  let tag = document.getElementById("sprite-css");
  if (!tag) {
    tag = document.createElement("style");
    tag.id = "sprite-css";
    document.head.appendChild(tag);
  }
  tag.textContent = spriteKeyframes();
}

function renderPhone() {
  document.getElementById("phone").innerHTML = screensHtml();
  applyVisualsToPhone();
  bindPhone();
}

function render() {
  renderPages();
  renderPhone();
  renderInspector();
  bind();
}

function liveSlider(id, key, overlay) {
  const el = document.getElementById(id);
  if (!el) return;
  el.oninput = () => {
    const value = Number(el.value);
    el.nextElementSibling.textContent = value;
    if (overlay) patchOverlay({ [key]: value });
    else patchNode({ [key]: value });
  };
}

function bindImageControls(prefix, overlay) {
  const set = (partial, refresh) => overlay ? patchOverlay(partial, refresh) : patchNode(partial, refresh);
  const current = overlay || node(selectedId);
  const img = document.getElementById(prefix + "-image");
  if (img) img.onchange = () => fileToAsset(img.files[0], false).then((data) => set({ image: data, animated: img.files[0].type.includes("gif") || img.files[0].type.includes("webp") ? "gif" : "" }, true));
  document.querySelectorAll("[data-fit]").forEach((btn) => {
    btn.onclick = () => set({ imageFit: btn.getAttribute("data-fit") }, true);
  });
  liveSlider(prefix + "-x", "imageX", overlay);
  liveSlider(prefix + "-y", "imageY", overlay);
  liveSlider(prefix + "-zoom", "imageScale", overlay);
  liveSlider(prefix + "-rotate", "rotate", overlay);
  liveSlider(prefix + "-opacity", "opacity", overlay);
  const fx = document.getElementById(prefix + "-flipx");
  if (fx) fx.onclick = () => set({ flipX: !current.flipX }, true);
  const fy = document.getElementById(prefix + "-flipy");
  if (fy) fy.onclick = () => set({ flipY: !current.flipY }, true);
  const rm = document.getElementById(prefix + "-remove");
  if (rm) rm.onclick = () => set({ image: "", sprite: "" }, true);
}

function bind() {
  document.querySelectorAll("[data-screen]").forEach((btn) => {
    btn.onclick = () => {
      screenId = btn.getAttribute("data-screen");
      selectedOverlay = null;
      selectedId = SCREENS.find((s) => s.id === screenId).nodes[0][0];
      render();
    };
  });
  document.querySelectorAll("[data-node]").forEach((btn) => {
    btn.onclick = () => {
      selectedOverlay = null;
      selectedId = btn.getAttribute("data-node");
      render();
    };
  });
  document.querySelectorAll("[data-overlay-layer]").forEach((btn) => {
    btn.onclick = () => {
      selectedOverlay = btn.getAttribute("data-overlay-layer");
      render();
    };
  });
  document.querySelectorAll("[data-preset]").forEach((btn) => {
    btn.onclick = () => patchGlobal(PRESETS[btn.getAttribute("data-preset")]);
  });
  document.querySelectorAll("[data-style]").forEach((btn) => {
    btn.onclick = () => patchGlobal({ buttonStyle: btn.getAttribute("data-style") });
  });
  document.querySelectorAll("[data-align]").forEach((btn) => {
    btn.onclick = () => {
      const align = btn.getAttribute("data-align");
      if (selectedOverlay) patchOverlay({ align }, true);
      else patchNode({ align }, true);
    };
  });
  document.querySelectorAll("[data-local-shape]").forEach((btn) => {
    btn.onclick = () => {
      const shape = btn.getAttribute("data-local-shape");
      const scope = btn.getAttribute("data-shape-scope");
      const current = scope === "overlay"
        ? overlays().find((item) => item.id === selectedOverlay) || {}
        : node(selectedId);
      const extra = shape === "custom" ? { clipPath: current.clipPath || DEFAULT_CLIP } : {};
      if (scope === "global") patchGlobal({ buttonShape: shape });
      else if (scope === "overlay") patchOverlay({ shape, ...extra }, true);
      else patchNode({ shape, ...extra }, true);
    };
  });

  const addShape = document.getElementById("add-shape");
  if (addShape) addShape.onclick = () => addOverlay("shape");
  const addSprite = document.getElementById("add-sprite");
  if (addSprite) addSprite.onclick = () => addOverlay("sprite");
  const addText = document.getElementById("add-text");
  if (addText) addText.onclick = () => addOverlay("text");
  const addImage = document.getElementById("add-image");
  if (addImage) addImage.onclick = () => addOverlay("image");
  document.querySelectorAll("[data-delete-node]").forEach((btn) => {
    btn.onclick = (event) => {
      event.stopPropagation();
      hideNode(btn.getAttribute("data-delete-node"));
    };
  });
  document.querySelectorAll("[data-delete-overlay]").forEach((btn) => {
    btn.onclick = (event) => {
      event.stopPropagation();
      deleteOverlay(btn.getAttribute("data-delete-overlay"));
    };
  });
  document.querySelectorAll("[data-restore-node]").forEach((btn) => {
    btn.onclick = (event) => {
      event.stopPropagation();
      restoreNode(btn.getAttribute("data-restore-node"));
    };
  });

  const text = document.getElementById("node-text");
  if (text) text.oninput = () => patchNode({ text: text.value });
  const placeholder = document.getElementById("node-placeholder");
  if (placeholder) placeholder.oninput = () => patchNode({ placeholder: placeholder.value });
  bindColorField("page-bg", (hex) => patchGlobalLive({ bg: hex }));
  bindColorField("accent", (hex) => patchGlobalLive({ accent: hex }));
  bindColorField("node-color", (hex) => patchNode({ color: hex }));
  bindColorField("node-bg", (hex) => patchNode({ bg: hex }));
  liveSlider("node-radius", "radius", null);
  const link = document.getElementById("link-corners");
  if (link) link.onchange = () => patchNode({ linkCorners: link.checked });
  ["tl", "tr", "bl", "br"].forEach((corner) => {
    const el = document.getElementById("r-" + corner);
    if (el) el.oninput = () => patchNode({ [corner]: Number(el.value), linkCorners: false });
  });
  const shadow = document.getElementById("node-shadow");
  if (shadow) shadow.onchange = () => patchNode({ shadow: shadow.checked });
  const nodeClip = document.getElementById("node-clip");
  if (nodeClip) nodeClip.oninput = () => patchNode({ clipPath: nodeClip.value, shape: "custom" });
  bindImageControls("node", null);

  const overlay = overlays().find((item) => item.id === selectedOverlay);
  if (overlay) {
    const ovText = document.getElementById("ov-text");
    if (ovText) ovText.oninput = () => patchOverlay({ text: ovText.value });
    bindColorField("ov-color", (hex) => patchOverlay({ color: hex }));
    bindColorField("ov-fill", (hex) => patchOverlay({ fill: hex }));
    liveSlider("ov-fontsize", "fontSize", overlay);
    liveSlider("ov-w", "w", overlay);
    liveSlider("ov-h", "h", overlay);
    liveSlider("ov-radius", "radius", overlay);
    liveSlider("ov-opacity", "opacity", overlay);
    liveSlider("ov-frames", "frames", overlay);
    liveSlider("ov-fps", "fps", overlay);
    const sprite = document.getElementById("ov-sprite");
    if (sprite) sprite.onchange = () => fileToAsset(sprite.files[0], true).then((data) => {
      const gif = sprite.files[0].type.includes("gif") || sprite.files[0].type.includes("webp");
      patchOverlay({ image: data, animated: gif ? "gif" : "sheet" }, true);
    });
    const ovClip = document.getElementById("ov-clip");
    if (ovClip) ovClip.oninput = () => patchOverlay({ clipPath: ovClip.value, shape: "custom" });
    bindImageControls("ov", overlay);
    const del = document.getElementById("ov-delete");
    if (del) del.onclick = () => deleteOverlay(selectedOverlay);
  }
  const nodeDelete = document.getElementById("node-delete");
  if (nodeDelete) nodeDelete.onclick = () => hideNode(selectedId);
}

function bindPhone() {
  const phone = document.getElementById("phone");
  phone.onclick = (event) => {
    const overlay = event.target.closest("[data-overlay]");
    if (overlay) {
      selectedOverlay = overlay.getAttribute("data-overlay");
      render();
      return;
    }
    const el = event.target.closest("[data-ui]");
    if (!el) return;
    selectedOverlay = null;
    selectedId = el.getAttribute("data-ui");
    render();
  };
  phone.querySelectorAll("[data-overlay]").forEach((el) => {
    el.onmousedown = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const stage = phone.querySelector(".phone-ui");
      const rect = stage.getBoundingClientRect();
      const id = el.getAttribute("data-overlay");
      const ov = overlays().find((item) => item.id === id) || {};
      const handle = event.target.closest("[data-handle]");
      selectedOverlay = id;
      if (handle) {
        drag = {
          type: "resize",
          handle: handle.getAttribute("data-handle"),
          id,
          startX: event.clientX,
          startY: event.clientY,
          w: ov.w || 80,
          h: ov.h || 80,
          x: ov.x || 0,
          y: ov.y || 0,
          rect,
        };
        return;
      }
      drag = {
        type: "move",
        id,
        dx: event.clientX - el.getBoundingClientRect().left,
        dy: event.clientY - el.getBoundingClientRect().top,
        rect,
      };
    };
  });
}

function applyDragBox(el, box) {
  if (!el) return;
  el.style.left = box.x + "%";
  el.style.top = box.y + "%";
  if (box.w != null) el.style.width = box.w + "px";
  if (box.h != null) el.style.height = box.h + "px";
}

document.addEventListener("mousemove", (event) => {
  if (colorDrag) colorDrag(event);
  if (!drag) return;
  const el = document.querySelector('[data-overlay="' + drag.id + '"]');
  if (drag.type === "resize") {
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    let w = drag.w;
    let h = drag.h;
    let x = drag.x;
    let y = drag.y;
    const handle = drag.handle;
    if (handle.includes("e")) w = Math.max(24, drag.w + dx);
    if (handle.includes("s")) h = Math.max(24, drag.h + dy);
    if (handle.includes("w")) {
      w = Math.max(24, drag.w - dx);
      x = drag.x + ((drag.w - w) / drag.rect.width) * 100;
    }
    if (handle.includes("n")) {
      h = Math.max(24, drag.h - dy);
      y = drag.y + ((drag.h - h) / drag.rect.height) * 100;
    }
    drag.live = {
      x: Math.max(0, Math.min(90, x)),
      y: Math.max(0, Math.min(90, y)),
      w,
      h,
    };
    applyDragBox(el, drag.live);
    return;
  }
  const x = ((event.clientX - drag.rect.left - drag.dx) / drag.rect.width) * 100;
  const y = ((event.clientY - drag.rect.top - drag.dy) / drag.rect.height) * 100;
  drag.live = {
    x: Math.max(0, Math.min(88, x)),
    y: Math.max(0, Math.min(88, y)),
  };
  applyDragBox(el, drag.live);
});
document.addEventListener("mouseup", () => {
  colorDrag = null;
  if (drag && drag.live) {
    selectedOverlay = drag.id;
    patchOverlay(drag.live, true);
  }
  drag = null;
});

function defaultSpriteSheet() {
  const frames = 4;
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size * frames;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  for (let i = 0; i < frames; i++) {
    ctx.fillStyle = "rgba(8,18,24,.55)";
    ctx.fillRect(i * size, 0, size, size);
    ctx.strokeStyle = theme.global.accent;
    ctx.fillStyle = i === 3 ? theme.global.accent : "#f4ffe0";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(i * size + size / 2, size / 2, 10 + i * 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  return canvas.toDataURL("image/png");
}

function hideNode(id) {
  const meta = currentScreen().nodes.find((item) => item[0] === id);
  if (!meta || meta[2] === "screen") return;
  history.push(JSON.parse(JSON.stringify(theme)));
  if (history.length > 30) history.shift();
  theme = { ...theme, nodes: { ...theme.nodes, [id]: { ...node(id), hidden: true } } };
  selectedOverlay = null;
  selectedId = currentScreen().nodes.find((item) => item[2] === "screen" || !node(item[0]).hidden)[0];
  save();
  render();
}

function restoreNode(id) {
  history.push(JSON.parse(JSON.stringify(theme)));
  if (history.length > 30) history.shift();
  const next = { ...node(id) };
  delete next.hidden;
  theme = { ...theme, nodes: { ...theme.nodes, [id]: next } };
  selectedOverlay = null;
  selectedId = id;
  save();
  render();
}

function deleteOverlay(id) {
  history.push(JSON.parse(JSON.stringify(theme)));
  if (history.length > 30) history.shift();
  theme = { ...theme, overlays: { ...theme.overlays, [screenId]: overlays().filter((item) => item.id !== id) } };
  selectedOverlay = null;
  save();
  render();
}

function addOverlay(kind) {
  const existing = overlays();
  const item = {
    id: "ov" + Date.now(),
    kind,
    x: 10 + (existing.length % 3) * 8,
    y: 16 + (existing.length % 5) * 10,
    opacity: 100,
  };
  if (kind === "text") {
    Object.assign(item, {
      text: "New text",
      fontSize: 24,
      color: theme.global.text,
      align: "left",
      w: 220,
      h: 52,
      radius: 0,
    });
  } else if (kind === "image") {
    Object.assign(item, { w: 168, h: 112, radius: 14, shape: "rounded", image: "" });
  } else {
    Object.assign(item, {
      shape: kind === "sprite" ? "rect" : "circle",
      w: kind === "sprite" ? 72 : 88,
      h: kind === "sprite" ? 72 : 88,
      fill: theme.global.accent,
      opacity: kind === "shape" ? 70 : 100,
      frames: 4,
      fps: 8,
      radius: kind === "sprite" ? 8 : 999,
      animated: kind === "sprite" ? "sheet" : "",
      image: kind === "sprite" ? defaultSpriteSheet() : "",
    });
  }
  theme = { ...theme, overlays: { ...theme.overlays, [screenId]: overlays().concat(item) } };
  selectedOverlay = item.id;
  save();
  render();
}

function fileToAsset(file, keepAnimation) {
  return new Promise((resolve) => {
    if (!file) return;
    if (keepAnimation || file.type === "image/gif" || file.type === "image/webp") {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
      return;
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, 1200 / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.84));
    };
    img.src = url;
  });
}

document.getElementById("btn-undo").onclick = () => {
  const prev = history.pop();
  if (!prev) return;
  theme = prev;
  save();
  render();
};
document.getElementById("btn-reset").onclick = () => commit(defaultTheme());
document.getElementById("btn-export").onclick = () => {
  const blob = new Blob([JSON.stringify(theme, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "theme.json";
  a.click();
  URL.revokeObjectURL(url);
};
document.getElementById("import-json").onchange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const parsed = JSON.parse(await file.text());
  commit({
    ...defaultTheme(),
    ...parsed,
    global: { ...defaultTheme().global, ...(parsed.global || {}) },
    nodes: parsed.nodes || {},
    overlays: parsed.overlays || {},
  });
  event.target.value = "";
};

try {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  if (stored) {
    theme = {
      ...defaultTheme(),
      ...stored,
      global: { ...defaultTheme().global, ...(stored.global || {}) },
      nodes: stored.nodes || {},
      overlays: stored.overlays || {},
    };
  }
} catch (err) {
  theme = defaultTheme();
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

render();
