/* Studio preview bridge. Does nothing on real game pages. */
(function () {
  var preview = document.documentElement.classList.contains("studio-preview");
  var script = document.currentScript;
  var logicSrc = script && script.getAttribute("data-logic");

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var el = document.createElement("script");
      el.src = src;
      el.onload = resolve;
      el.onerror = reject;
      document.body.appendChild(el);
    });
  }

  if (!preview) {
    if (!logicSrc) return;
    loadScript("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2")
      .then(function () {
        return loadScript("/logic/supabase-config.js");
      })
      .then(function () {
        return loadScript(logicSrc);
      })
      .catch(function (err) {
        console.error("Failed to load game logic", err);
      });
    return;
  }

  function activateScreen() {
    var screen = new URLSearchParams(location.search).get("screen");
    if (!screen) return;
    document.querySelectorAll(".screen").forEach(function (el) {
      el.classList.toggle("active", el.id === screen);
    });
  }

  function fillFixtures() {
    var startQs = document.getElementById("btn-start-questions");
    if (startQs) startQs.hidden = false;
    var startVote = document.getElementById("btn-start");
    if (startVote) startVote.hidden = false;
    var lobbyCode = document.getElementById("lobby-code");
    if (lobbyCode) lobbyCode.textContent = "LIME42";
    var players = document.getElementById("player-list");
      ["Alex", "Sam", "Riley"].forEach(function (name, index) {
        var li = document.createElement("li");
        li.innerHTML =
          '<span class="name">' +
          name +
          '</span><span class="meta">' +
          (index === 0 ? "you" : "joined") +
          "</span>";
        players.appendChild(li);
      });
    }

    var count = document.getElementById("question-count");
    if (count) count.textContent = "12";
    var pool = document.getElementById("pool-status");
    if (pool) pool.textContent = "12 / 15 minimum questions";
    var mine = document.getElementById("my-questions");
    if (mine && !mine.children.length) {
      ["Who would survive a zombie movie?", "Worst karaoke song?"].forEach(function (q) {
        var li = document.createElement("li");
        li.textContent = q;
        mine.appendChild(li);
      });
    }

    var strip = document.getElementById("score-strip");
    if (strip && !strip.children.length) {
      ["Alex · 2", "Sam · 1", "Riley · 1"].forEach(function (label) {
        var chip = document.createElement("span");
        chip.textContent = label;
        strip.appendChild(chip);
      });
    }

    var panel = document.getElementById("action-panel");
    if (panel && !panel.children.length) {
      panel.innerHTML =
        '<p class="waiting-note">Sam got the wheel.</p>' +
        '<p class="question-card">Who is most likely to start a group chat at 2am?</p>' +
        '<div class="answer-row">' +
        '<button type="button" class="btn btn-ghost" id="btn-skip">Skip</button>' +
        '<button type="button" class="btn btn-primary" id="btn-answer">Answered</button>' +
        "</div>";
    }

    var canvas = document.getElementById("wheel-canvas");
    if (canvas && canvas.getContext) {
      var ctx = canvas.getContext("2d");
      var size = canvas.width;
      var cx = size / 2;
      ctx.clearRect(0, 0, size, size);
      ["#c8f542", "#3ec6ff", "#ffb020", "#ff5a4a", "#9bb8ef", "#3dff9a"].forEach(function (color, i) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(cx, cx);
        ctx.arc(cx, cx, cx - 8, (i * Math.PI) / 3, ((i + 1) * Math.PI) / 3);
        ctx.closePath();
        ctx.fill();
      });
    }

    var aName = document.getElementById("finalist-a-name");
    if (aName) aName.textContent = "Alex";
    var bName = document.getElementById("finalist-b-name");
    if (bName) bName.textContent = "Sam";
    var aScore = document.getElementById("finalist-a-score");
    if (aScore) aScore.textContent = "4";
    var bScore = document.getElementById("finalist-b-score");
    if (bScore) bScore.textContent = "3";
    var fq = document.getElementById("finals-question");
    if (fq) fq.textContent = "Who would eat dessert first?";
    var controls = document.getElementById("finals-controls");
    if (controls && !controls.children.length) {
      controls.innerHTML =
        '<button type="button" class="btn btn-ok" id="btn-correct">Correct</button>' +
        '<button type="button" class="btn btn-danger" id="btn-wrong">Wrong</button>';
    }

    var nominees = document.getElementById("nominee-grid");
    if (nominees && !nominees.children.length) {
      ["Alex", "Sam", "Riley", "Jordan"].forEach(function (name) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "nominee";
        btn.textContent = name;
        nominees.appendChild(btn);
      });
    }

    var charts = document.getElementById("charts");
    if (charts && !charts.children.length) {
      charts.innerHTML =
        '<article class="chart-card"><h3>Who is most likely to plan the trip?</h3><p class="sub">Alex 3 · Sam 1 · Riley 0</p></article>';
    }

    var traits = document.getElementById("trait-list");
    if (traits && !traits.children.length) {
      ["planner", "chaotic", "loyal"].forEach(function (trait) {
        var li = document.createElement("li");
        li.textContent = trait;
        traits.appendChild(li);
      });
    }

    var standings = document.getElementById("standings");
    if (standings && !standings.children.length) {
      standings.innerHTML =
        "<li><span>#1 Alex</span><span>3 picks</span></li>" +
        "<li><span>#2 Sam</span><span>2 picks</span></li>";
    }
  }

  function selectNode(id) {
    document.querySelectorAll("[data-ui].ui-selected").forEach(function (el) {
      el.classList.remove("ui-selected");
    });
    if (!id) return;
    document.querySelectorAll('[data-ui="' + id + '"]').forEach(function (el) {
      el.classList.add("ui-selected");
    });
  }

  document.addEventListener(
    "click",
    function (event) {
      event.preventDefault();
      event.stopPropagation();
      var target = event.target;
      if (!(target instanceof Element)) return;
      var node = target.closest("[data-ui]");
      if (window.parent !== window) {
        window.parent.postMessage(
          { type: "checktrail-select", id: node ? node.getAttribute("data-ui") : null },
          "*"
        );
      }
      selectNode(node ? node.getAttribute("data-ui") : null);
    },
    true
  );

  window.addEventListener("message", function (event) {
    var data = event.data || {};
    if (data.type === "checktrail-theme" && window.ChecktrailTheme) {
      window.ChecktrailTheme.apply(data.theme);
      selectNode(data.selectedId || null);
    }
    if (data.type === "checktrail-select") {
      selectNode(data.id || null);
    }
  });

  activateScreen();
  fillFixtures();
  if (window.ChecktrailTheme) window.ChecktrailTheme.apply(window.ChecktrailTheme.read());

  if (window.parent !== window) {
    window.parent.postMessage({ type: "checktrail-ready" }, "*");
  }
})();
