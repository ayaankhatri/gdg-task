(function () {
  var root = document.documentElement;
  var dark = false;
  try {
    var state = JSON.parse(localStorage.getItem("settings-sync:v1") || "null");
    if (state && typeof state === "object") {
      dark = state.darkMode && state.darkMode.value === true;
      var lang = state.language && state.language.value;
      if (typeof lang === "string" && ["en", "es", "fr", "de", "hi"].indexOf(lang) !== -1) root.lang = lang;
      var size = state.fontSize && state.fontSize.value;
      if (typeof size === "number" && isFinite(size) && size >= 12 && size <= 24) {
        root.style.setProperty("--font-size", Math.round(size) + "px");
      }
    }
  } catch (e) {}
  root.dataset.theme = dark ? "dark" : "light";
})();
