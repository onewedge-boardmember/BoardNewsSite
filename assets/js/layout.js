/**
 * partials/header.html と partials/footer.html を読み込む。
 * <body data-base=".">  … トップ（index.html）
 * <body data-base=".."> … 記事（posts/*.html）
 */
(function () {
  var base = document.body.dataset.base || ".";
  var baseHref = base === ".." ? "../" : "./";
  var partialsUrl = baseHref + "partials/";

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

  Promise.all([
    inject("site-header", "header"),
    inject("site-footer", "footer"),
  ]);
})();
