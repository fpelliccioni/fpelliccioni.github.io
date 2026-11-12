/* Shared external library configuration for the lab and catalog. */
(function () {
  var params = new URLSearchParams(location.search);
  var user = params.get('user') || 'fpelliccioni';
  var repo = params.get('repo') || 'tao-js';
  var base =
    'https://raw.githubusercontent.com/' +
    encodeURIComponent(user) +
    '/' +
    encodeURIComponent(repo) +
    '/master/build/';
  async function load(filename) {
    var controller = new AbortController();
    var timer = setTimeout(function () {
      controller.abort();
    }, 15000);
    try {
      var response = await fetch(base + filename, { signal: controller.signal });
      if (!response.ok) throw new Error('Library request failed (' + response.status + ')');
      var source = await response.text();
      if (!source.trim()) throw new Error('Empty library');
      acorn.parse(source);
      return source;
    } finally {
      clearTimeout(timer);
    }
  }
  function examples(source, extra) {
    var definitions = new Set(
      acorn
        .parse(source)
        .body.filter(function (n) {
          return n.type === 'FunctionDeclaration';
        })
        .map(function (n) {
          return n.id.name;
        }),
    );
    return Array.from(
      new Set(
        acorn
          .parse(extra)
          .body.filter(function (n) {
            return n.type === 'FunctionDeclaration' && /^__.+_usage$/.test(n.id.name);
          })
          .map(function (n) {
            return n.id.name.slice(2, -6);
          })
          .filter(function (name) {
            return definitions.has(name);
          }),
      ),
    ).sort();
  }
  window.LabLibrary = { user: user, repo: repo, load: load, examples: examples };
})();
