/* Shared catalog for the lab picker and standalone catalog page. */
(function () {
  var es = document.documentElement.lang === 'es';
  var entries = [],
    category = '',
    query = '',
    onChoose;
  var standalone = !!document.querySelector('[data-catalog-page]');
  var host = standalone
    ? document.querySelector('[data-catalog-page]')
    : document.createElement('dialog');
  var labels = es
    ? {
        title: 'Catálogo de algoritmos',
        intro: 'Buscá un algoritmo y abrí su ejemplo en el laboratorio.',
        search: 'Buscar por nombre o categoría',
        all: 'Todos',
        close: 'Cerrar catálogo',
        empty: 'No encontramos algoritmos con esos filtros.',
        reset: 'Limpiar filtros',
        open: 'Abrir ejemplo',
        loading: 'Cargando catálogo…',
        error: 'No pudimos cargar el catálogo.',
        retry: 'Reintentar',
        selected: 'Actual',
        count: 'algoritmos',
        categories: 'Categorías',
      }
    : {
        title: 'Algorithm catalog',
        intro: 'Find an algorithm and open its example in the lab.',
        search: 'Search by name or category',
        all: 'All',
        close: 'Close catalog',
        empty: 'No algorithms match these filters.',
        reset: 'Clear filters',
        open: 'Open example',
        loading: 'Loading catalog…',
        error: 'The catalog could not be loaded.',
        retry: 'Retry',
        selected: 'Current',
        count: 'algorithms',
        categories: 'Categories',
      };
  var categoryLabels = es
    ? {
        'search/linear': 'Búsqueda lineal',
        'search/binary': 'Búsqueda binaria',
        selection: 'Selección',
        other: 'Otros',
      }
    : {
        'search/linear': 'Linear search',
        'search/binary': 'Binary search',
        selection: 'Selection',
        other: 'Other',
      };
  var current = '';
  function element(tag, className, text) {
    var node = document.createElement(tag);
    node.className = className || '';
    if (text !== undefined) node.textContent = text;
    return node;
  }
  host.classList.add('algorithm-catalog');
  host.id = 'algorithmCatalog';
  host.setAttribute('aria-labelledby', 'catalogTitle');
  var heading = element('div', 'catalog-heading');
  var titleBlock = element('div');
  titleBlock.appendChild(element('p', 'catalog-eyebrow', 'COMPONENTS PROGRAMMING / CATALOG'));
  var title = element('h2', '', labels.title);
  title.id = 'catalogTitle';
  titleBlock.appendChild(title);
  titleBlock.appendChild(element('p', 'catalog-intro', labels.intro));
  heading.appendChild(titleBlock);
  if (!standalone) {
    var close = element('button', 'catalog-close', '×');
    close.type = 'button';
    close.setAttribute('aria-label', labels.close);
    close.addEventListener('click', function () {
      host.close();
    });
    heading.appendChild(close);
    document.body.appendChild(host);
    host.addEventListener('click', function (event) {
      if (event.target === host) {
        var r = host.getBoundingClientRect();
        if (
          event.clientX < r.left ||
          event.clientX > r.right ||
          event.clientY < r.top ||
          event.clientY > r.bottom
        )
          host.close();
      }
    });
  }
  host.appendChild(heading);
  var searchLabel = element('label', 'catalog-search-label', labels.search);
  searchLabel.htmlFor = 'catalogSearch';
  var search = element('input', 'catalog-search');
  search.id = 'catalogSearch';
  search.type = 'search';
  search.placeholder = es ? 'Ej.: find, lower_bound…' : 'E.g. find, lower_bound…';
  host.appendChild(searchLabel);
  host.appendChild(search);
  var filters = element('div', 'catalog-filters');
  filters.setAttribute('role', 'group');
  filters.setAttribute('aria-label', labels.categories);
  host.appendChild(filters);
  var count = element('p', 'catalog-count', labels.loading);
  count.setAttribute('role', 'status');
  host.appendChild(count);
  var results = element('div', 'catalog-results');
  host.appendChild(results);
  search.addEventListener('input', function () {
    query = search.value;
    render();
  });
  function categoryName(key) {
    return categoryLabels[key] || key.replace(/\//g, ' / ');
  }
  function normalized(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[_/]+/g, ' ');
  }
  function filtered(items, term, group) {
    var words = normalized(term).trim().split(/\s+/);
    return items.filter(function (item) {
      return (
        (!group || item.category === group) &&
        words.every(function (word) {
          return normalized(
            item.name + ' ' + item.category + ' ' + categoryName(item.category),
          ).includes(word);
        })
      );
    });
  }
  // Read literal metadata from the AST; do not execute a remote __catalog function.
  function parseCategories(source) {
    var body = acorn.parse(source).body;
    var fn = body.find(function (node) {
      return node.type === 'FunctionDeclaration' && node.id.name === '__catalog';
    });
    var result = Object.create(null);
    var ret =
      fn &&
      fn.body.body.find(function (node) {
        return node.type === 'ReturnStatement';
      });
    if (ret && ret.argument && ret.argument.type === 'ObjectExpression')
      ret.argument.properties.forEach(function (prop) {
        var name = prop.key.name || prop.key.value;
        var value = prop.value;
        if (
          value.type === 'ArrayExpression' &&
          value.elements[0] &&
          typeof value.elements[0].value === 'string'
        )
          result[name] = value.elements[0].value;
      });
    return result;
  }
  function setEntries(names, source, choose) {
    var categories = parseCategories(source);
    entries = names.map(function (name) {
      return { name: name, category: categories[name] || 'other' };
    });
    onChoose = choose;
    category = '';
    query = '';
    search.value = '';
    render();
  }
  function render() {
    filters.replaceChildren();
    ['']
      .concat(
        Array.from(
          new Set(
            entries.map(function (item) {
              return item.category;
            }),
          ),
        ).sort(),
      )
      .forEach(function (key) {
        var total = key
          ? entries.filter(function (item) {
              return item.category === key;
            }).length
          : entries.length;
        var button = element(
          'button',
          'catalog-filter',
          (key ? categoryName(key) : labels.all) + ' · ' + total,
        );
        button.type = 'button';
        button.setAttribute('aria-pressed', String(category === key));
        button.addEventListener('click', function () {
          category = key;
          render();
        });
        filters.appendChild(button);
      });
    var visible = filtered(entries, query, category);
    count.textContent = visible.length + ' / ' + entries.length + ' ' + labels.count;
    results.replaceChildren();
    if (!visible.length) {
      var empty = element('div', 'catalog-empty');
      empty.appendChild(element('p', '', labels.empty));
      var reset = element('button', '', labels.reset);
      reset.type = 'button';
      reset.addEventListener('click', function () {
        category = '';
        query = '';
        search.value = '';
        render();
        search.focus();
      });
      empty.appendChild(reset);
      results.appendChild(empty);
      return;
    }
    visible.forEach(function (item) {
      var card = element('article', 'catalog-card');
      card.appendChild(element('span', 'catalog-category', categoryName(item.category)));
      card.appendChild(element('h3', '', item.name));
      var action = element(standalone ? 'a' : 'button', 'catalog-open', labels.open + ' →');
      if (standalone) {
        var url = new URL(es ? '/algoritmos/' : '/algorithms/', location.origin);
        var params = new URLSearchParams(location.search);
        ['user', 'repo'].forEach(function (key) {
          if (params.has(key)) url.searchParams.set(key, params.get(key));
        });
        url.searchParams.set('snippet', item.name);
        action.href = url.href;
      } else {
        action.type = 'button';
        action.addEventListener('click', function () {
          if (onChoose(item.name) !== false) host.close();
        });
      }
      if (current === item.name) {
        card.classList.add('is-current');
        card.appendChild(element('span', 'catalog-current', labels.selected));
      }
      card.appendChild(action);
      results.appendChild(card);
    });
  }
  var confirmation;
  function clearConfirmation() {
    if (confirmation) {
      confirmation.remove();
      confirmation = null;
    }
  }
  host.addEventListener('close', clearConfirmation);
  function confirmReplacement(name, apply) {
    clearConfirmation();
    confirmation = element('div', 'catalog-confirm');
    confirmation.setAttribute('role', 'alert');
    confirmation.appendChild(
      element(
        'p',
        '',
        es
          ? 'Tenés cambios en el editor. ¿Querés reemplazarlos por ' + name + '?'
          : 'You have editor changes. Replace them with ' + name + '?',
      ),
    );
    var keep = element('button', '', es ? 'Conservar mi código' : 'Keep my code');
    keep.type = 'button';
    keep.addEventListener('click', function () {
      clearConfirmation();
      search.focus();
    });
    var replace = element('button', '', es ? 'Reemplazar código' : 'Replace code');
    replace.type = 'button';
    replace.addEventListener('click', function () {
      apply();
      clearConfirmation();
      host.close();
    });
    confirmation.appendChild(keep);
    confirmation.appendChild(replace);
    results.before(confirmation);
    keep.focus();
  }
  window.LabCatalog = {
    setEntries: setEntries,
    confirmReplacement: confirmReplacement,
    parseCategories: parseCategories,
    filter: filtered,
    setCurrent: function (name) {
      current = name;
      render();
    },
    open: function () {
      host.showModal();
      search.focus();
    },
  };
  if (standalone) {
    async function load() {
      count.textContent = labels.loading;
      results.replaceChildren();
      try {
        var p = new URLSearchParams(location.search);
        var controller = new AbortController();
        var timer = setTimeout(function () {
          controller.abort();
        }, 15000);
        try {
          var response = await fetch(
            'https://raw.githubusercontent.com/' +
              encodeURIComponent(p.get('user') || 'fpelliccioni') +
              '/' +
              encodeURIComponent(p.get('repo') || 'algorithm_course') +
              '/master/build/algorithms_extra.js',
            { signal: controller.signal },
          );
          if (!response.ok) throw Error(response.status);
          var source = await response.text();
          var names = acorn
            .parse(source)
            .body.filter(function (n) {
              return n.type === 'FunctionDeclaration' && /^__.+_usage$/.test(n.id.name);
            })
            .map(function (n) {
              return n.id.name.slice(2, -6);
            })
            .sort();
          setEntries(names, source);
        } finally {
          clearTimeout(timer);
        }
      } catch (error) {
        count.textContent = labels.error;
        var retry = element('button', '', labels.retry);
        retry.type = 'button';
        retry.addEventListener('click', load);
        results.appendChild(retry);
      }
    }
    load();
  }
})();
