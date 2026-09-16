/* Apply an exported Checktrail UI theme. The editor is a separate Chrome app. */
(function () {
  function setClass(prefix, value, allowed) {
    var html = document.documentElement;
    allowed.forEach(function (item) {
      html.classList.remove(prefix + item);
    });
    if (value) html.classList.add(prefix + value);
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
      if (node.image) {
        el.style.backgroundImage = 'url("' + node.image + '")';
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
        el.classList.add("is-on");
      }
    }
    if (type === "field") {
      var label = el.querySelector("span");
      var input = el.querySelector("input, textarea");
      if (label && typeof node.label === "string") label.textContent = node.label;
      if (input && typeof node.placeholder === "string") input.setAttribute("placeholder", node.placeholder);
    }
    if (type === "image" && node.image) {
      el.style.backgroundImage = 'url("' + node.image + '")';
      el.classList.add("is-on");
    }
    if (type === "screen") {
      var bg = node.bg || "";
      var image = node.image || "";
      if (image) {
        el.style.background =
          "linear-gradient(180deg, rgba(0,0,0,.28), rgba(0,0,0,.4)), url(\"" +
          image +
          "\") center / cover no-repeat" +
          (bg ? ", " + bg : "");
      } else if (bg) {
        el.style.background = bg;
      }
    }
  }

  function applyTheme(theme) {
    if (!theme) return;
    var html = document.documentElement;
    var global = theme.global || {};
    setClass("ui-shape-", global.buttonShape, ["pill", "rounded", "square"]);
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
