(function () {
  "use strict";

  var CONFIG_PATH = "/config/redirects.json";
  var FALLBACK_PATH = "/fallback/qr-unavailable.html";

  function setManualLink(url) {
    var link = document.getElementById("manual-link");
    if (link) {
      link.href = url;
      link.textContent = url;
    }
  }

  function sendToFallback(reason) {
    console.error("[qr-redirect]", reason);
    window.location.replace(FALLBACK_PATH);
  }

  function parseTarget(url) {
    try {
      var parsed = new URL(url);
      if (parsed.protocol !== "https:") return null;
      return parsed.toString();
    } catch (error) {
      return null;
    }
  }

  fetch(CONFIG_PATH, { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("Failed to read redirect config");
      return response.json();
    })
    .then(function (config) {
      var target = parseTarget(config.qr_target);
      if (!target) {
        sendToFallback("Invalid or missing `qr_target`");
        return;
      }

      setManualLink(target);
      window.location.replace(target);
    })
    .catch(function (error) {
      sendToFallback(error && error.message ? error.message : "Unknown redirect error");
    });
})();
