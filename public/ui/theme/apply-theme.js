/* Apply an exported Checktrail UI theme. The editor is a separate Chrome app. */
(function () {
  var CLIPS = {
    hex: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)",
    diamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    star: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    blob: "polygon(32% 4%, 70% 8%, 96% 32%, 92% 70%, 64% 96%, 28% 92%, 6% 64%, 8% 28%)",
    triangle: "polygon(50% 0%, 100% 100%, 0% 100%)",
  };

  function setClass(prefix, value, allowed) {
    var html = document.documentElement;
    allowed.forEach(function (item) {
      html.classList.remove(prefix + item);
    });
    if (value) html.classList.add(prefix + value);
  }

  function radiusCss(node) {
    if (!node) return "";
    if (node.shape === "pill" || node.shape === "circle") return "999px";
    if (node.linkCorners === false) {
      return (node.tl || 0) + "px " + (node.tr || 0) + "px " + (node.br || 0) + "px " + (node.bl || 0) + "px";
    }
    if (node.radius != null) return node.radius + "px";
    return "";
  }

  function clipCss(node) {
    if (!node) return "";
    if (node.shape === "custom" && node.clipPath) return node.clipPath;
    return CLIPS[node.shape] || "";
  }

  function applyImage(el, node) {
    if (!node.image) return;
    var fit = node.imageFit || "cover";
    el.style.backgroundImage = 'url("' + node.image + '")';
    el.style.backgroundPosition = (node.imageX || 50) + "% " + (node.imageY || 50) + "%";
    el.style.backgroundRepeat = fit === "tile" ? "repeat" : "no-repeat";
    el.style.backgroundSize = fit === "contain" ? "contain" : fit === "fill" ? "100% 100%" : (node.imageScale || 100) + "% auto";
    el.classList.add("is-on");
    var flipX = node.flipX ? -1 : 1;
    var flipY = node.flipY ? -1 : 1;
    if (node.rotate || node.flipX || node.flipY) {
      el.style.transform = "rotate(" + (node.rotate || 0) + "deg) scale(" + flipX + ", " + flipY + ")";
    }
  }

  function applyNode(el, node) {
    if (!el || !node) return;
    var type = el.getAttribute("data-ui-type") || "text";
    if (node.color) el.style.color = node.color;
    if (type === "text" && typeof node.text === "string") {
      el.innerHTML = node.text.replace(/\n/g, "<br />");
    }
    if (type === "button") {
      if (typeof node.text === "string" && !el.querySelector("[data-ui]")) el.textContent = node.text;
      if (node.bg) el.style.background = node.bg;
      if (node.color) el.style.color = node.color;
      if (node.shadow) el.style.boxShadow = "0 10px 24px rgba(0,0,0,.35)";
    }
    if (type === "field") {
      var label = el.querySelector("span");
      var input = el.querySelector("input, textarea");
      if (label && typeof node.label === "string") label.textContent = node.label;
      if (input && typeof node.placeholder === "string") input.setAttribute("placeholder", node.placeholder);
    }
    if (node.align) {
      el.style.textAlign = node.align;
      if (type === "button") {
        el.style.justifyContent = node.align === "left" ? "flex-start" : node.align === "right" ? "flex-end" : "center";
      }
      if (type === "text" || type === "image") {
        if (node.align === "center") {
          el.style.marginLeft = "auto";
          el.style.marginRight = "auto";
        } else if (node.align === "right") {
          el.style.marginLeft = "auto";
          el.style.marginRight = "0";
        } else {
          el.style.marginLeft = "0";
          el.style.marginRight = "auto";
        }
        var display = window.getComputedStyle(el).display;
        if (display === "inline" || display === "inline-block") {
          el.style.display = "block";
          el.style.width = "fit-content";
          el.style.maxWidth = "100%";
        }
      }
      if (type === "field") {
        var alignInput = el.matches("input, textarea") ? el : el.querySelector("input, textarea");
        if (alignInput) alignInput.style.textAlign = node.align;
        if (label) label.style.textAlign = node.align;
      }
    }
    if (type === "text" || type === "field") return;
    var radius = radiusCss(node);
    if (radius) el.style.borderRadius = radius;
    var clip = clipCss(node);
    if (clip) {
      el.style.clipPath = clip;
      el.style.overflow = "hidden";
    }
    applyImage(el, node);
    if (node.opacity != null) el.style.opacity = String(node.opacity / 100);
    if (type === "screen") {
      var bg = node.bg || "";
      if (node.image) {
        el.style.background =
          "linear-gradient(180deg, rgba(0,0,0,.28), rgba(0,0,0,.4)), url(\"" +
          node.image +
          "\") " + (node.imageX || 50) + "% " + (node.imageY || 50) + "% / " +
          (node.imageFit === "contain" ? "contain" : "cover") + " no-repeat" +
          (bg ? ", " + bg : "");
      } else if (bg) {
        el.style.background = bg;
      }
    }
  }

  function screenAttr(id) {
    if (id === "hub") return "hub.screen";
    return id.replace("-", ".") + ".screen";
  }

  function applyOverlays(theme) {
    var overlays = theme.overlays || {};
    var css = [];
    Object.keys(overlays).forEach(function (screen) {
      var host = document.querySelector('[data-ui="' + screenAttr(screen) + '"]');
      if (!host) return;
      host.style.position = host.style.position || "relative";
      overlays[screen].forEach(function (ov) {
        var el = document.createElement("div");
        el.className = "ui-overlay";
        el.style.cssText =
          "position:absolute;left:" + (ov.x || 0) + "%;top:" + (ov.y || 0) +
          "%;width:" + (ov.w || 72) + "px;height:" + (ov.h || 72) +
          "px;opacity:" + ((ov.opacity || 100) / 100) + ";pointer-events:none;overflow:hidden;";
        if (ov.shape === "circle" || ov.shape === "pill") el.style.borderRadius = "999px";
        else el.style.borderRadius = (ov.radius || 12) + "px";
        var clip = clipCss(ov);
        if (clip) el.style.clipPath = clip;
        if (ov.kind === "sprite" && ov.image) {
          if (ov.animated === "gif") {
            el.style.background = "url(\"" + ov.image + "\") center / cover no-repeat";
          } else {
            var frames = ov.frames || 4;
            var fps = ov.fps || 8;
            var name = "sp_" + String(ov.id).replace(/[^a-z0-9]/gi, "");
            css.push("@keyframes " + name + "{from{background-position:0 0}to{background-position:-" + frames * 100 + "% 0}}");
            el.style.backgroundImage = "url(\"" + ov.image + "\")";
            el.style.backgroundSize = frames * 100 + "% 100%";
            el.style.animation = name + " " + (frames / fps).toFixed(2) + "s steps(" + frames + ") infinite";
            el.style.imageRendering = "pixelated";
          }
        } else if (ov.image) {
          applyImage(el, ov);
        } else {
          el.style.background = ov.fill || theme.global && theme.global.accent || "#c8f542";
        }
        host.appendChild(el);
      });
    });
    if (css.length) {
      var tag = document.createElement("style");
      tag.textContent = css.join("\n");
      document.head.appendChild(tag);
    }
  }

  function applyTheme(theme) {
    if (!theme) return;
    var html = document.documentElement;
    var global = theme.global || {};
    setClass("ui-shape-", global.buttonShape, ["pill", "rounded", "square", "circle", "hex", "diamond", "blob", "star", "triangle", "rect"]);
    setClass("ui-style-", global.buttonStyle, ["fill", "outline", "soft", "image"]);
    if (global.accent) html.style.setProperty("--lime", global.accent);
    if (global.accent) html.style.setProperty("--btn-primary-bg", global.accent);
    if (global.accentInk) html.style.setProperty("--lime-ink", global.accentInk);
    if (global.accentInk) html.style.setProperty("--btn-primary-color", global.accentInk);
    if (global.text) html.style.setProperty("--text", global.text);
    if (global.muted) html.style.setProperty("--muted", global.muted);
    if (global.bg) html.style.setProperty("--ink", global.bg);
    if (global.panel) html.style.setProperty("--panel", global.panel);
    Object.keys(theme.nodes || {}).forEach(function (id) {
      document.querySelectorAll('[data-ui="' + id + '"]').forEach(function (el) {
        applyNode(el, theme.nodes[id]);
      });
    });
    applyOverlays(theme);
  }

  function boot() {
    fetch("/ui/theme/theme.json", { cache: "no-store" })
      .then(function (res) {
        return res.ok ? res.json() : null;
      })
      .then(applyTheme)
      .catch(function () {});
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
