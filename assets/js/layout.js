/**
 * partials/header.html と partials/footer.html を読み込む。
 * favicon / OG など共通 head 要素も注入する。
 * <body data-base=".">  … トップ（index.html）
 * <body data-base=".."> … 記事（posts/*.html）
 */
(function () {
  var base = document.body.dataset.base || ".";
  var baseHref = base === ".." ? "../" : "./";
  var partialsUrl = baseHref + "partials/";
  var config = window.SITE_CONFIG || {};
  var siteName = config.name || "Board Activity News";

  function asset(path) {
    return baseHref + path;
  }

  function absoluteUrl(path) {
    if (config.origin) {
      return config.origin.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
    }
    try {
      return new URL(path, window.location.href).href;
    } catch (e) {
      return path;
    }
  }

  function injectHeadAssets() {
    var head = document.head;
    if (!head || head.querySelector("[data-site-head]")) return;

    var iconSvg = asset("assets/images/favicon.svg");
    var appleIcon = asset("assets/images/apple-touch-icon.svg");
    var ogImage = absoluteUrl(asset(config.defaultOgImage || "assets/images/og-default.svg"));

    [
      { rel: "icon", href: iconSvg, type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: appleIcon },
    ].forEach(function (spec) {
      var link = document.createElement("link");
      link.rel = spec.rel;
      link.href = spec.href;
      if (spec.type) link.type = spec.type;
      link.setAttribute("data-site-head", "");
      head.appendChild(link);
    });

    var theme = document.createElement("meta");
    theme.name = "theme-color";
    theme.content = "#0891b2";
    theme.setAttribute("data-site-head", "");
    head.appendChild(theme);

    if (!document.querySelector('meta[property="og:image"]')) {
      var og = document.createElement("meta");
      og.setAttribute("property", "og:image");
      og.content = ogImage;
      og.setAttribute("data-site-head", "");
      head.appendChild(og);
    }

    if (!document.querySelector('meta[property="og:site_name"]')) {
      var ogSite = document.createElement("meta");
      ogSite.setAttribute("property", "og:site_name");
      ogSite.content = siteName;
      ogSite.setAttribute("data-site-head", "");
      head.appendChild(ogSite);
    }

    if (!document.querySelector('meta[name="twitter:card"]')) {
      var twitter = document.createElement("meta");
      twitter.name = "twitter:card";
      twitter.content = "summary_large_image";
      twitter.setAttribute("data-site-head", "");
      head.appendChild(twitter);
    }
  }

  function inject(id, name) {
    var el = document.getElementById(id);
    if (!el) return Promise.resolve();

    return fetch(partialsUrl + name + ".html")
      .then(function (res) {
        if (!res.ok) throw new Error(name + ": " + res.status);
        return res.text();
      })
      .then(function (html) {
        el.innerHTML = html.replace(/\{\{BASE\}\}/g, baseHref);
      })
      .catch(function (err) {
        console.error("[layout] partial load failed:", err);
      });
  }

  injectHeadAssets();

  Promise.all([
    inject("site-header", "header"),
    inject("site-footer", "footer"),
  ]);
})();
