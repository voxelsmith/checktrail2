export type NodeType = "text" | "button" | "field" | "image" | "screen";

export type ScreenDef = {
  id: string;
  group: string;
  label: string;
  src: string;
  nodes: { id: string; label: string; type: NodeType }[];
};

export const SCREENS: ScreenDef[] = [
  {
    id: "hub",
    group: "Hub",
    label: "Pick a category",
    src: "/?preview=1",
    nodes: [
      { id: "hub.screen", label: "Phone background", type: "screen" },
      { id: "hub.art", label: "Hero image", type: "image" },
      { id: "hub.brand", label: "Brand", type: "text" },
      { id: "hub.title", label: "Title", type: "text" },
      { id: "hub.sub", label: "Subtitle", type: "text" },
      { id: "hub.card1", label: "Anon Wheel card", type: "button" },
      { id: "hub.card1.name", label: "Anon Wheel name", type: "text" },
      { id: "hub.card1.desc", label: "Anon Wheel description", type: "text" },
      { id: "hub.card2", label: "Mirror Vote card", type: "button" },
      { id: "hub.card2.name", label: "Mirror Vote name", type: "text" },
      { id: "hub.card2.desc", label: "Mirror Vote description", type: "text" },
    ],
  },
  {
    id: "c1-home",
    group: "Anon Wheel",
    label: "Home",
    src: "/game.html?preview=1&screen=screen-home",
    nodes: [
      { id: "c1.home.screen", label: "Phone background", type: "screen" },
      { id: "c1.home.art", label: "Hero image", type: "image" },
      { id: "c1.home.badge", label: "Badge", type: "text" },
      { id: "c1.home.brand", label: "Game name", type: "text" },
      { id: "c1.home.title", label: "Title", type: "text" },
      { id: "c1.home.sub", label: "Subtitle", type: "text" },
      { id: "c1.home.name", label: "Name field", type: "field" },
      { id: "c1.home.create", label: "Create button", type: "button" },
      { id: "c1.home.room", label: "Room code field", type: "field" },
      { id: "c1.home.join", label: "Join button", type: "button" },
    ],
  },
  {
    id: "c1-lobby",
    group: "Anon Wheel",
    label: "Lobby",
    src: "/game.html?preview=1&screen=screen-lobby",
    nodes: [
      { id: "c1.lobby.screen", label: "Phone background", type: "screen" },
      { id: "c1.lobby.brand", label: "Top brand", type: "text" },
      { id: "c1.lobby.title", label: "Title", type: "text" },
      { id: "c1.lobby.sub", label: "Subtitle", type: "text" },
      { id: "c1.lobby.copy", label: "Copy link button", type: "button" },
      { id: "c1.lobby.start", label: "Start button", type: "button" },
    ],
  },
  {
    id: "c1-questions",
    group: "Anon Wheel",
    label: "Questions",
    src: "/game.html?preview=1&screen=screen-questions",
    nodes: [
      { id: "c1.questions.screen", label: "Phone background", type: "screen" },
      { id: "c1.questions.title", label: "Title", type: "text" },
      { id: "c1.questions.sub", label: "Subtitle", type: "text" },
      { id: "c1.questions.input", label: "Question field", type: "field" },
      { id: "c1.questions.add", label: "Add button", type: "button" },
    ],
  },
  {
    id: "c1-game",
    group: "Anon Wheel",
    label: "Wheel",
    src: "/game.html?preview=1&screen=screen-game",
    nodes: [
      { id: "c1.game.screen", label: "Phone background", type: "screen" },
      { id: "c1.game.caption", label: "Caption", type: "text" },
    ],
  },
  {
    id: "c1-finals",
    group: "Anon Wheel",
    label: "Finals",
    src: "/game.html?preview=1&screen=screen-finals",
    nodes: [
      { id: "c1.finals.screen", label: "Phone background", type: "screen" },
      { id: "c1.finals.tag", label: "Tag", type: "text" },
    ],
  },
  {
    id: "c1-end",
    group: "Anon Wheel",
    label: "End",
    src: "/game.html?preview=1&screen=screen-end",
    nodes: [
      { id: "c1.end.screen", label: "Phone background", type: "screen" },
      { id: "c1.end.brand", label: "Brand", type: "text" },
      { id: "c1.end.title", label: "Title", type: "text" },
      { id: "c1.end.again", label: "Play again button", type: "button" },
    ],
  },
  {
    id: "c2-home",
    group: "Mirror Vote",
    label: "Home",
    src: "/category2.html?preview=1&screen=screen-home",
    nodes: [
      { id: "c2.home.screen", label: "Phone background", type: "screen" },
      { id: "c2.home.art", label: "Hero image", type: "image" },
      { id: "c2.home.badge", label: "Badge", type: "text" },
      { id: "c2.home.brand", label: "Game name", type: "text" },
      { id: "c2.home.title", label: "Title", type: "text" },
      { id: "c2.home.sub", label: "Subtitle", type: "text" },
      { id: "c2.home.name", label: "Name field", type: "field" },
      { id: "c2.home.create", label: "Create button", type: "button" },
      { id: "c2.home.room", label: "Room code field", type: "field" },
      { id: "c2.home.join", label: "Join button", type: "button" },
    ],
  },
  {
    id: "c2-lobby",
    group: "Mirror Vote",
    label: "Lobby",
    src: "/category2.html?preview=1&screen=screen-lobby",
    nodes: [
      { id: "c2.lobby.screen", label: "Phone background", type: "screen" },
      { id: "c2.lobby.title", label: "Title", type: "text" },
      { id: "c2.lobby.sub", label: "Subtitle", type: "text" },
      { id: "c2.lobby.copy", label: "Copy link button", type: "button" },
      { id: "c2.lobby.start", label: "Start button", type: "button" },
    ],
  },
  {
    id: "c2-play",
    group: "Mirror Vote",
    label: "Vote",
    src: "/category2.html?preview=1&screen=screen-play",
    nodes: [
      { id: "c2.play.screen", label: "Phone background", type: "screen" },
      { id: "c2.play.eyebrow", label: "Eyebrow", type: "text" },
      { id: "c2.play.help", label: "Help text", type: "text" },
    ],
  },
  {
    id: "c2-wait",
    group: "Mirror Vote",
    label: "Waiting",
    src: "/category2.html?preview=1&screen=screen-wait",
    nodes: [
      { id: "c2.wait.screen", label: "Phone background", type: "screen" },
      { id: "c2.wait.title", label: "Title", type: "text" },
      { id: "c2.wait.copy", label: "Waiting copy", type: "text" },
    ],
  },
  {
    id: "c2-results",
    group: "Mirror Vote",
    label: "Results",
    src: "/category2.html?preview=1&screen=screen-results",
    nodes: [
      { id: "c2.results.screen", label: "Phone background", type: "screen" },
      { id: "c2.results.title", label: "Charts title", type: "text" },
      { id: "c2.results.bodyTitle", label: "Portrait title", type: "text" },
    ],
  },
];

export const PRESETS = [
  {
    id: "lime",
    label: "Lime night",
    global: { accent: "#c8f542", accentInk: "#102000", bg: "#071018", text: "#e8f4ff", muted: "#8aa3b5", panel: "#122433", buttonShape: "pill" as const, buttonStyle: "fill" as const },
  },
  {
    id: "blue",
    label: "Night blue",
    global: { accent: "#4d7dff", accentInk: "#071018", bg: "#05070b", text: "#eef2f7", muted: "#8b93a7", panel: "#12151c", buttonShape: "pill" as const, buttonStyle: "fill" as const },
  },
  {
    id: "coral",
    label: "Hot coral",
    global: { accent: "#ff5a4a", accentInk: "#fff8f6", bg: "#14080a", text: "#ffece8", muted: "#c49b96", panel: "#2a1214", buttonShape: "rounded" as const, buttonStyle: "fill" as const },
  },
  {
    id: "light",
    label: "Soft light",
    global: { accent: "#111111", accentInk: "#ffffff", bg: "#f4efe6", text: "#171717", muted: "#6b645c", panel: "#ffffff", buttonShape: "square" as const, buttonStyle: "outline" as const },
  },
];
