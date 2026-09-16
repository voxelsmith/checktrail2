"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PRESETS, SCREENS } from "./catalog";
import {
  defaultTheme,
  fileToImageDataUrl,
  loadTheme,
  saveTheme,
  type ButtonShape,
  type ButtonStyle,
  type Theme,
  type ThemeNode,
} from "./theme";
import "./studio.css";

export function StudioApp() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [screenId, setScreenId] = useState(SCREENS[0].id);
  const [selectedId, setSelectedId] = useState<string | null>("hub.brand");
  const history = useRef<Theme[]>([]);

  const screen = SCREENS.find((item) => item.id === screenId) ?? SCREENS[0];
  const selected = screen.nodes.find((node) => node.id === selectedId) ?? screen.nodes[0];
  const node = theme.nodes[selected.id] || {};

  const pushTheme = useCallback((next: Theme) => {
    history.current = [...history.current.slice(-29), theme];
    setTheme(next);
    saveTheme(next);
  }, [theme]);

  useEffect(() => {
    setTheme(loadTheme());
  }, []);

  const postTheme = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "checktrail-theme", theme, selectedId: selected?.id },
      "*"
    );
  }, [theme, selected?.id]);

  useEffect(() => {
    postTheme();
  }, [postTheme, screen.src]);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const data = event.data || {};
      if (data.type === "checktrail-ready") postTheme();
      if (data.type === "checktrail-select") {
        if (data.id) setSelectedId(data.id);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [postTheme]);

  function patchGlobal(partial: Partial<Theme["global"]>) {
    pushTheme({ ...theme, global: { ...theme.global, ...partial } });
  }

  function patchNode(partial: ThemeNode) {
    pushTheme({
      ...theme,
      nodes: {
        ...theme.nodes,
        [selected.id]: { ...node, ...partial },
      },
    });
  }

  async function onImage(file?: File | null) {
    if (!file) return;
    const image = await fileToImageDataUrl(file);
    patchNode({ image });
  }

  const groups = useMemo(() => {
    const map = new Map<string, typeof SCREENS>();
    SCREENS.forEach((item) => {
      const list = map.get(item.group) || [];
      list.push(item);
      map.set(item.group, list);
    });
    return Array.from(map.entries());
  }, []);

  return (
    <div className="studio">
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <header className="studio-top">
        <div className="studio-brand">
          <strong>Checktrail Studio</strong>
          <span>Tap the phone. Change text, buttons, and images.</span>
        </div>
        <div className="studio-actions">
          <button
            type="button"
            className="studio-btn"
            onClick={() => {
              const prev = history.current.pop();
              if (!prev) return;
              setTheme(prev);
              saveTheme(prev);
            }}
          >
            Undo
          </button>
          <button
            type="button"
            className="studio-btn"
            onClick={() => {
              const next = defaultTheme();
              pushTheme(next);
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className="studio-btn"
            onClick={() => {
              const blob = new Blob([JSON.stringify(theme, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "checktrail-ui.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export
          </button>
          <label className="studio-btn">
            Import
            <input
              type="file"
              accept="application/json"
              hidden
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const parsed = JSON.parse(await file.text()) as Theme;
                pushTheme({ ...defaultTheme(), ...parsed, global: { ...defaultTheme().global, ...parsed.global }, nodes: parsed.nodes || {} });
                event.target.value = "";
              }}
            />
          </label>
          <a className="studio-btn primary" href={screen.src.includes("category2") ? "/category2.html?host=1" : screen.src.includes("game.html") ? "/game.html?host=1" : "/"}>
            Play this page
          </a>
        </div>
      </header>

      <div className="studio-tabs" style={{ display: "none" }} />

      <div className="studio-body">
        <aside className="studio-side">
          {groups.map(([group, items]) => (
            <div key={group}>
              <p className="studio-group">{group}</p>
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`studio-page${item.id === screen.id ? " active" : ""}`}
                  onClick={() => {
                    setScreenId(item.id);
                    setSelectedId(item.nodes[0]?.id ?? null);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
          <p className="studio-group">Layers</p>
          {screen.nodes.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`studio-layer${item.id === selected.id ? " active" : ""}`}
              onClick={() => setSelectedId(item.id)}
            >
              {item.label}
            </button>
          ))}
        </aside>

        <main className="studio-canvas">
          <div className="studio-phone">
            <div className="studio-notch" />
            <iframe
              ref={iframeRef}
              title={screen.label}
              src={screen.src}
              onLoad={postTheme}
            />
          </div>
        </main>

        <aside className="studio-inspector">
          <p className="studio-group">Looks</p>
          <div className="studio-row">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="studio-chip"
                onClick={() => patchGlobal(preset.global)}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="studio-field" style={{ marginTop: "1rem" }}>
            <span>Accent</span>
            <div className="studio-color">
              <input type="color" value={theme.global.accent} onChange={(e) => patchGlobal({ accent: e.target.value })} />
              <input type="text" value={theme.global.accent} onChange={(e) => patchGlobal({ accent: e.target.value })} />
            </div>
          </div>
          <div className="studio-field">
            <span>Button shape</span>
            <div className="studio-row">
              {(["pill", "rounded", "square"] as ButtonShape[]).map((shape) => (
                <button
                  key={shape}
                  type="button"
                  className={`studio-chip${theme.global.buttonShape === shape ? " active" : ""}`}
                  onClick={() => patchGlobal({ buttonShape: shape })}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>
          <div className="studio-field">
            <span>Button style</span>
            <div className="studio-row">
              {(["fill", "outline", "soft", "image"] as ButtonStyle[]).map((style) => (
                <button
                  key={style}
                  type="button"
                  className={`studio-chip${theme.global.buttonStyle === style ? " active" : ""}`}
                  onClick={() => patchGlobal({ buttonStyle: style })}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <p className="studio-group">Selected · {selected.label}</p>
          {selected.type === "text" || selected.type === "button" ? (
            <div className="studio-field">
              <span>Text</span>
              <textarea value={node.text ?? ""} placeholder="Leave blank to keep original" onChange={(e) => patchNode({ text: e.target.value })} />
            </div>
          ) : null}
          {selected.type === "field" ? (
            <>
              <div className="studio-field">
                <span>Label</span>
                <input type="text" value={node.label ?? ""} onChange={(e) => patchNode({ label: e.target.value })} />
              </div>
              <div className="studio-field">
                <span>Placeholder</span>
                <input type="text" value={node.placeholder ?? ""} onChange={(e) => patchNode({ placeholder: e.target.value })} />
              </div>
            </>
          ) : null}
          {selected.type !== "field" ? (
            <div className="studio-field">
              <span>Text color</span>
              <div className="studio-color">
                <input type="color" value={node.color || "#e8f4ff"} onChange={(e) => patchNode({ color: e.target.value })} />
                <input type="text" value={node.color || ""} placeholder="#e8f4ff" onChange={(e) => patchNode({ color: e.target.value })} />
              </div>
            </div>
          ) : null}
          {selected.type === "button" || selected.type === "screen" || selected.type === "field" ? (
            <div className="studio-field">
              <span>Fill color</span>
              <div className="studio-color">
                <input type="color" value={node.bg || theme.global.accent} onChange={(e) => patchNode({ bg: e.target.value })} />
                <input type="text" value={node.bg || ""} placeholder="#c8f542" onChange={(e) => patchNode({ bg: e.target.value })} />
              </div>
            </div>
          ) : null}
          {selected.type === "image" || selected.type === "screen" || selected.type === "button" ? (
            <div className="studio-field">
              <span>Image</span>
              <input type="file" accept="image/*" onChange={(e) => onImage(e.target.files?.[0])} />
              {node.image ? (
                <button type="button" className="studio-btn" onClick={() => patchNode({ image: "" })}>
                  Remove image
                </button>
              ) : null}
              <p className="studio-help">
                Upload a photo or button graphic. This is the easy Figma-style part: drop it in, and the phone updates.
              </p>
            </div>
          ) : null}
          <p className="studio-help">
            Changes save in this browser and show up in the real mobile game. Export the JSON if you want a backup. Main game rules stay untouched.
          </p>
        </aside>
      </div>
    </div>
  );
}
