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
      acorn.parse(source, { ecmaVersion: 'latest' });
      return source;
    } finally {
      clearTimeout(timer);
    }
  }
  function examples(source, extra) {
    var definitions = new Set(
      acorn
        .parse(source, { ecmaVersion: 'latest' })
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
          .parse(extra, { ecmaVersion: 'latest' })
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
  function literalLists(extra, pattern) {
    var entries = Object.create(null);
    for (var node of acorn.parse(extra, { ecmaVersion: 'latest' }).body) {
      if (node.type !== 'FunctionDeclaration') continue;
      var match = pattern.exec(node.id.name);
      if (!match || node.body.body.length !== 1) continue;
      var statement = node.body.body[0];
      if (statement.type !== 'ReturnStatement' || statement.argument?.type !== 'ArrayExpression')
        continue;
      var values = statement.argument.elements;
      if (
        values.length > 0 &&
        values.every(function (value) {
          return value?.type === 'Literal' && typeof value.value === 'string';
        })
      ) {
        entries[match[1]] = values.map(function (value) { return value.value; });
      }
    }
    return entries;
  }
  function typescriptSources(extra) {
    var entries = literalLists(extra, /^__(.+)_typescript$/);
    for (var name of Object.keys(entries)) {
      var values = entries[name];
      if (values.length === 2) entries[name] = { definition: values[0], usage: values[1] };
      else delete entries[name];
    }
    return entries;
  }
  function bookReferences(extra) {
    return literalLists(extra, /^__(.+)_references$/);
  }
  window.LabLibrary = {
    user: user,
    repo: repo,
    load: load,
    examples: examples,
    typescriptSources: typescriptSources,
    bookReferences: bookReferences,
    typeDeclarations: function (extra) {
      return literalLists(extra, /^__(lab_types)_declarations$/).lab_types?.[0] || '';
    },
  };
})();
