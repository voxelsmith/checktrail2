const STORAGE_KEY = "checktrail-editor-theme";

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
    version: 1,
    global: { ...PRESETS.lime },
    nodes: {},
  };
}

let theme = defaultTheme();
let history = [];
let screenId = "hub";
let selectedId = "hub.brand";

function textOf(id) {
  const node = theme.nodes[id] || {};
  if (node.text) return node.text;
  if (node.placeholder) return node.placeholder;
  if (node.label) return node.label;
  return DEFAULTS[id] || "";
}

function node(id) {
  return theme.nodes[id] || {};
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

function patchNode(partial) {
  theme = {
    ...theme,
    nodes: { ...theme.nodes, [selectedId]: { ...node(selectedId), ...partial } },
  };
  save();
  renderPhone();
}

function art(id) {
  const image = node(id).image;
  return `<div class="art${image ? " has-image" : ""}" data-ui="${id}" data-ui-type="image" style="${image ? `background-image:url('${image}')` : ""}">${image ? "" : "Add a cover image"}</div>`;
}

function screenStyle(id) {
  const n = node(id);
  const bg = n.bg || theme.global.bg;
  const image = n.image;
  const background = image
    ? `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.4)), url('${image}') center/cover, ${bg}`
    : bg;
  return `background:${background};color:${theme.global.text};--bg:${theme.global.bg};--text:${theme.global.text};--muted:${theme.global.muted};--accent:${theme.global.accent};--accent-ink:${theme.global.accentInk};--panel:${theme.global.panel};`;
}

function screensHtml() {
  const g = theme.global;
  document.documentElement.classList.remove("ui-shape-pill", "ui-shape-rounded", "ui-shape-square", "ui-style-fill", "ui-style-outline", "ui-style-soft", "ui-style-image");
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
      </div>`,
    "c1-game": `
      <div class="phone-ui" data-ui="c1.game.screen" data-ui-type="screen" style="${screenStyle("c1.game.screen")}">
        <div class="topbar"><strong>Anon Wheel</strong><span class="chip">Alex · 2</span></div>
        <div class="wheel"></div>
        <p class="sub" data-ui="c1.game.caption" data-ui-type="text" style="text-align:center">${textOf("c1.game.caption")}</p>
        <button class="ghost">Skip</button>
        <button class="btn">Answered</button>
      </div>`,
    "c1-finals": `
      <div class="phone-ui" data-ui="c1.finals.screen" data-ui-type="screen" style="${screenStyle("c1.finals.screen")}">
        <div class="topbar"><strong>Anon Wheel</strong><span class="badge" data-ui="c1.finals.tag" data-ui-type="text">${textOf("c1.finals.tag")}</span></div>
        <div class="buzzers">
          <div class="buzzer">Alex<br/>4</div>
          <div>VS</div>
          <div class="buzzer">Sam<br/>3</div>
        </div>
        <p class="title">Who would eat dessert first?</p>
        <button class="btn">Correct</button>
        <button class="ghost">Wrong</button>
      </div>`,
    "c1-end": `
      <div class="phone-ui" data-ui="c1.end.screen" data-ui-type="screen" style="${screenStyle("c1.end.screen")}">
        ${art("c1.home.art")}
        <p class="logo" data-ui="c1.end.brand" data-ui-type="text">${textOf("c1.end.brand")}</p>
        <h1 class="title" data-ui="c1.end.title" data-ui-type="text">${textOf("c1.end.title")}</h1>
        <ul class="list"><li><span>#1 Alex</span><span>3 picks</span></li><li><span>#2 Sam</span><span>2 picks</span></li></ul>
        <button class="btn" data-ui="c1.end.again" data-ui-type="button">${textOf("c1.end.again")}</button>
      </div>`,
    "c2-home": home("c2"),
    "c2-lobby": lobby("c2", "Players"),
    "c2-play": `
      <div class="phone-ui" data-ui="c2.play.screen" data-ui-type="screen" style="${screenStyle("c2.play.screen")}">
        <div class="topbar"><strong>Mirror Vote</strong><span class="chip">1 / 20</span></div>
        <p class="eyebrow" data-ui="c2.play.eyebrow" data-ui-type="text">${textOf("c2.play.eyebrow")}</p>
        <h1 class="title">plan the trip?</h1>
        <p class="sub" data-ui="c2.play.help" data-ui-type="text">${textOf("c2.play.help")}</p>
        <div class="nominees">
          <button class="ghost">Alex</button><button class="ghost">Sam</button>
          <button class="ghost">Riley</button><button class="ghost">Jordan</button>
        </div>
      </div>`,
    "c2-wait": `
      <div class="phone-ui" data-ui="c2.wait.screen" data-ui-type="screen" style="${screenStyle("c2.wait.screen")}">
        <p class="badge">Category 2</p>
        <h1 class="title" data-ui="c2.wait.title" data-ui-type="text">${textOf("c2.wait.title")}</h1>
        <p class="sub" data-ui="c2.wait.copy" data-ui-type="text">${textOf("c2.wait.copy")}</p>
      </div>`,
    "c2-results": `
      <div class="phone-ui" data-ui="c2.results.screen" data-ui-type="screen" style="${screenStyle("c2.results.screen")}">
        <h1 class="title" data-ui="c2.results.title" data-ui-type="text">${textOf("c2.results.title")}</h1>
        <div class="card"><strong>Who plans the trip?</strong><p class="sub">Alex 3 · Sam 1</p></div>
        <h1 class="title" data-ui="c2.results.bodyTitle" data-ui-type="text">${textOf("c2.results.bodyTitle")}</h1>
        <p class="sub">planner · chaotic · loyal</p>
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
      <input class="field-box" data-ui="${p}.name" data-ui-type="field" placeholder="${textOf(p + ".name")}" value="" />
      <button class="btn" data-ui="${p}.create" data-ui-type="button">${textOf(p + ".create")}</button>
      <div class="join">
        <input class="field-box" data-ui="${p}.room" data-ui-type="field" placeholder="${textOf(p + ".room")}" />
        <button class="ghost" data-ui="${p}.join" data-ui-type="button">${textOf(p + ".join")}</button>
      </div>
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
    </div>`;
}

function selectedMeta() {
  const screen = SCREENS.find((s) => s.id === screenId);
  return screen.nodes.find((n) => n[0] === selectedId) || screen.nodes[0];
}

function renderPages() {
  let last = "";
  document.getElementById("pages").innerHTML = SCREENS.map((screen) => {
    const group = screen.group !== last ? `<p class="group">${screen.group}</p>` : "";
    last = screen.group;
    return `${group}<button class="page-btn${screen.id === screenId ? " active" : ""}" data-screen="${screen.id}">${screen.label}</button>`;
  }).join("") + `<p class="group">Layers</p>` + SCREENS.find((s) => s.id === screenId).nodes.map((n) =>
    `<button class="layer-btn${n[0] === selectedId ? " active" : ""}" data-node="${n[0]}">${n[1]}</button>`
  ).join("");
}

function renderInspector() {
  const meta = selectedMeta();
  selectedId = meta[0];
  const type = meta[2];
  const n = node(selectedId);
  const g = theme.global;
  document.getElementById("inspector").innerHTML = `
    <p class="group">Looks</p>
    <div class="row">
      ${Object.keys(PRESETS).map((id) => `<button data-preset="${id}">${id}</button>`).join("")}
    </div>
    <div class="field"><span>Accent</span><div class="color"><input type="color" id="accent" value="${g.accent}"><input id="accent-text" value="${g.accent}"></div></div>
    <div class="field"><span>Button shape</span><div class="row">
      ${["pill", "rounded", "square"].map((s) => `<button data-shape="${s}" class="${g.buttonShape === s ? "active" : ""}">${s}</button>`).join("")}
    </div></div>
    <div class="field"><span>Button style</span><div class="row">
      ${["fill", "outline", "soft"].map((s) => `<button data-style="${s}" class="${g.buttonStyle === s ? "active" : ""}">${s}</button>`).join("")}
    </div></div>
    <p class="group">Selected · ${meta[1]}</p>
    ${type === "text" || type === "button" ? `<div class="field"><span>Text</span><textarea id="node-text">${n.text || ""}</textarea></div>` : ""}
    ${type === "field" ? `<div class="field"><span>Placeholder</span><input id="node-placeholder" value="${n.placeholder || ""}"></div>` : ""}
    <div class="field"><span>Text color</span><div class="color"><input type="color" id="node-color" value="${n.color || g.text}"><input id="node-color-text" value="${n.color || ""}"></div></div>
    ${type === "button" || type === "screen" ? `<div class="field"><span>Fill color</span><div class="color"><input type="color" id="node-bg" value="${n.bg || g.accent}"><input id="node-bg-text" value="${n.bg || ""}"></div></div>` : ""}
    ${type === "image" || type === "screen" || type === "button" ? `<div class="field"><span>Image</span><input type="file" id="node-image" accept="image/*"><button type="button" id="remove-image">Remove image</button></div>` : ""}
    <p class="hint">Export downloads <code>theme.json</code>. Drop that file into the game at <code>public/ui/theme/theme.json</code>. The game stays separate.</p>
  `;
}

function renderPhone() {
  document.getElementById("phone").innerHTML = screensHtml();
  document.querySelectorAll("#phone [data-ui]").forEach((el) => {
    el.classList.toggle("selected", el.getAttribute("data-ui") === selectedId);
  });
}

function render() {
  renderPages();
  renderPhone();
  renderInspector();
  bind();
}

function bind() {
  document.querySelectorAll("[data-screen]").forEach((btn) => {
    btn.onclick = () => {
      screenId = btn.getAttribute("data-screen");
      selectedId = SCREENS.find((s) => s.id === screenId).nodes[0][0];
      render();
    };
  });
  document.querySelectorAll("[data-node]").forEach((btn) => {
    btn.onclick = () => {
      selectedId = btn.getAttribute("data-node");
      render();
    };
  });
  document.getElementById("phone").onclick = (event) => {
    const el = event.target.closest("[data-ui]");
    if (!el) return;
    selectedId = el.getAttribute("data-ui");
    render();
  };
  document.querySelectorAll("[data-preset]").forEach((btn) => {
    btn.onclick = () => patchGlobal(PRESETS[btn.getAttribute("data-preset")]);
  });
  document.querySelectorAll("[data-shape]").forEach((btn) => {
    btn.onclick = () => patchGlobal({ buttonShape: btn.getAttribute("data-shape") });
  });
  document.querySelectorAll("[data-style]").forEach((btn) => {
    btn.onclick = () => patchGlobal({ buttonStyle: btn.getAttribute("data-style") });
  });
  const text = document.getElementById("node-text");
  if (text) text.oninput = () => patchNode({ text: text.value });
  const placeholder = document.getElementById("node-placeholder");
  if (placeholder) placeholder.oninput = () => patchNode({ placeholder: placeholder.value });
  const accent = document.getElementById("accent");
  if (accent) accent.oninput = () => patchGlobal({ accent: accent.value });
  const nodeColor = document.getElementById("node-color");
  if (nodeColor) nodeColor.oninput = () => patchNode({ color: nodeColor.value });
  const nodeBg = document.getElementById("node-bg");
  if (nodeBg) nodeBg.oninput = () => patchNode({ bg: nodeBg.value });
  const image = document.getElementById("node-image");
  if (image) image.onchange = () => fileToImage(image.files[0]);
  const remove = document.getElementById("remove-image");
  if (remove) remove.onclick = () => patchNode({ image: "" });
}

function fileToImage(file) {
  if (!file) return;
  const img = new Image();
  const url = URL.createObjectURL(file);
  img.onload = () => {
    const scale = Math.min(1, 1100 / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    patchNode({ image: canvas.toDataURL("image/jpeg", 0.82) });
  };
  img.src = url;
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
  commit({ ...defaultTheme(), ...parsed, global: { ...defaultTheme().global, ...(parsed.global || {}) }, nodes: parsed.nodes || {} });
  event.target.value = "";
};

try {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  if (stored) theme = { ...defaultTheme(), ...stored, global: { ...defaultTheme().global, ...(stored.global || {}) }, nodes: stored.nodes || {} };
} catch (err) {
  theme = defaultTheme();
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

render();
