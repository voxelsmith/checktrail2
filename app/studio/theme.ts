export const STORAGE_KEY = "checktrail-ui-theme";

export type ButtonShape = "pill" | "rounded" | "square";
export type ButtonStyle = "fill" | "outline" | "soft" | "image";

export type ThemeNode = {
  text?: string;
  label?: string;
  placeholder?: string;
  color?: string;
  bg?: string;
  image?: string;
  fontSize?: string;
};

export type Theme = {
  version: number;
  global: {
    accent: string;
    accentInk: string;
    bg: string;
    text: string;
    muted: string;
    panel: string;
    buttonShape: ButtonShape;
    buttonStyle: ButtonStyle;
  };
  nodes: Record<string, ThemeNode>;
};

export function defaultTheme(): Theme {
  return {
    version: 1,
    global: {
      accent: "#c8f542",
      accentInk: "#102000",
      bg: "#071018",
      text: "#e8f4ff",
      muted: "#8aa3b5",
      panel: "#122433",
      buttonShape: "pill",
      buttonStyle: "fill",
    },
    nodes: {},
  };
}

export function loadTheme(): Theme {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultTheme();
    const parsed = JSON.parse(raw) as Theme;
    return {
      ...defaultTheme(),
      ...parsed,
      global: { ...defaultTheme().global, ...(parsed.global || {}) },
      nodes: parsed.nodes || {},
    };
  } catch {
    return defaultTheme();
  }
}

export function saveTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
}

export function fileToImageDataUrl(file: File, max = 1100): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not read image"));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = url;
  });
}
