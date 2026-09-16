/* Apply Checktrail visual theme from localStorage. Safe to load on every page. */
(function () {
  var STORAGE_KEY = "checktrail-ui-theme";
  var params = new URLSearchParams(location.search);
  if (params.get("preview") === "1") {
    document.documentElement.classList.add("studio-preview");
  }

  function readTheme() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch (err) {
      return null;
    }
  }

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
    if (node.fontSize) el.style.fontSize = node.fontSize;

    if (type === "text" && typeof node.text === "string") {
      el.innerHTML = node.text.replace(/\n/g, "<br />");
    }

    if (type === "button") {
      if (typeof node.text === "string" && !el.querySelector("[data-ui]")) {
        el.textContent = node.text;
      }
      if (node.bg) el.style.background = node.bg;
      if (node.color) el.style.color = node.color;
      if (node.image) {
        el.style.backgroundImage = 'url("' + node.image + '")';
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
        el.classList.add("is-on");
      } else {
        el.style.backgroundImage = "";
      }
    }

    if (type === "field") {
      var label = el.querySelector("span");
      var input = el.querySelector("input, textarea");
      if (label && typeof node.label === "string") label.textContent = node.label;
      if (input && typeof node.placeholder === "string") input.setAttribute("placeholder", node.placeholder);
      if (node.bg && input) input.style.background = node.bg;
      if (node.color && input) input.style.color = node.color;
    }

    if (type === "image") {
      if (node.image) {
        el.style.backgroundImage = 'url("' + node.image + '")';
        el.classList.add("is-on");
      } else {
        el.style.backgroundImage = "";
        el.classList.remove("is-on");
      }
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
    window.__CHECKTRAIL_UI = theme;
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

    var nodes = theme.nodes || {};
    Object.keys(nodes).forEach(function (id) {
      document.querySelectorAll('[data-ui="' + id + '"]').forEach(function (el) {
        applyNode(el, nodes[id]);
      });
    });
  }

  window.ChecktrailTheme = {
    key: STORAGE_KEY,
    read: readTheme,
    apply: applyTheme,
  };

  applyTheme(readTheme());
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      applyTheme(readTheme());
    });
  }
  window.addEventListener("storage", function (event) {
    if (event.key === STORAGE_KEY) applyTheme(readTheme());
  });
})();
