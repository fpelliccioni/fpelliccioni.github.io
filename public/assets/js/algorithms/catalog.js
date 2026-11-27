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
        comparison: 'Comparación', copying: 'Copia', position: 'Por posición', predicate: 'Por predicado',
        numerics: 'Numéricos', gcd: 'Máximo común divisor', misc: 'Varios', power: 'Potencias',
        primality_testing: 'Primalidad', remainder: 'Restos', sift: 'Cribas',
        rearrangements: 'Reordenamiento', 'ordering-based': 'Por orden',
        'position-based': 'Por posición', 'predicate-based': 'Por predicado',
        sorting: 'Ordenamiento', 'insertion-sort': 'Inserción', 'selection-sort': 'Selección',
        'sort-n': 'Tamaño fijo', cycle: 'Ciclos', reverse: 'Inversión', rotate: 'Rotación',
        shift: 'Desplazamiento', heaps: 'Montículos', partition: 'Partición',
        search: 'Búsqueda', linear: 'Lineal', binary: 'Binaria', selection: 'Selección',
        traversal: 'Recorrido', reduction: 'Reducción',
        swapping: 'Intercambio', uncatalogued: 'Sin categoría', writing: 'Escritura', other: 'Otros',
      }
    : {
        gcd: 'Greatest common divisor', misc: 'Miscellaneous', power: 'Powers',
        primality_testing: 'Primality testing', sift: 'Sieves',
        'ordering-based': 'By order', 'position-based': 'By position', 'predicate-based': 'By predicate',
        position: 'By position', predicate: 'By predicate',
        'insertion-sort': 'Insertion sort', 'selection-sort': 'Selection sort',
        'sort-n': 'Fixed size', uncatalogued: 'Uncategorized',
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
  var subcategories = element('div', 'catalog-subcategories');
  host.appendChild(filters);
  host.appendChild(subcategories);
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
    return Object.hasOwn(categoryLabels, key)
      ? categoryLabels[key]
      : key.charAt(0).toUpperCase() + key.slice(1).replace(/[_-]/g, ' ');
  }
  function navigationPath(path) {
    return path.replace(/^rearrangements\/(ordering|position|predicate)-based\//, 'rearrangements/');
  }
  function belongsTo(path, group) {
    return !group || path === group || path.startsWith(group + '/');
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
        belongsTo(navigationPath(item.category), group) &&
        words.every(function (word) {
          return normalized(
            item.name + ' ' + item.category + ' ' + item.category.split('/').map(categoryName).join(' '),
          ).includes(word);
        })
      );
    });
  }
  // Read literal metadata from the AST; do not execute a remote __catalog function.
  function parseCategories(source) {
    var body = acorn.parse(source, { ecmaVersion: 'latest' }).body;
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
  function renderCategoryRow(row, parent) {
    var prefix = parent ? parent + '/' : '';
    var children = new Map();
    entries.forEach(function (item) {
      var path = navigationPath(item.category);
      if (!path.startsWith(prefix) || path === parent) return;
      var name = path.slice(prefix.length).split('/')[0];
      children.set(name, (children.get(name) || 0) + 1);
    });
    if (!children.size) return false;

    var options = [[parent, parent ? (es ? 'Todas' : 'All') : labels.all, filtered(entries, '', parent).length]];
    [...children].sort(function (a, b) {
      return categoryName(a[0]).localeCompare(categoryName(b[0]), es ? 'es' : 'en');
    }).forEach(function ([name, total]) {
      options.push([prefix + name, categoryName(name), total]);
    });
    options.forEach(function ([key, label, total]) {
      var button = element('button', 'catalog-filter', label + ' · ' + total);
      button.type = 'button';
      var active = key === parent ? category === parent : belongsTo(category, key);
      button.setAttribute('aria-pressed', String(active));
      button.addEventListener('click', function () {
        category = key;
        render();
        var renderedRow = parent
          ? Array.from(subcategories.children).find(function (group) { return group.dataset.parent === parent; })
          : filters;
        renderedRow?.querySelector('[aria-pressed="true"]')?.focus();
      });
      row.appendChild(button);
    });
    return true;
  }

  function render() {
    filters.replaceChildren();
    subcategories.replaceChildren();
    renderCategoryRow(filters, '');
    var parent = '';
    if (category) category.split('/').forEach(function (part) {
      parent = parent ? parent + '/' + part : part;
      var row = element('div', 'catalog-filters catalog-subcategory-row');
      row.dataset.parent = parent;
      row.setAttribute('role', 'group');
      row.setAttribute('aria-label', parent.split('/').map(categoryName).join(' / '));
      if (!renderCategoryRow(row, parent)) return;
      var label = element('span', 'catalog-subcategory-label', categoryName(part));
      row.prepend(label);
      subcategories.appendChild(row);
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
      card.appendChild(element('span', 'catalog-category', navigationPath(item.category).split('/').map(categoryName).slice(-2).join(' · ')));
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
        action.addEventListener('click', async function () {
          if ((await onChoose(item.name)) !== false) host.close();
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
    replace.addEventListener('click', async function () {
      if ((await apply()) === false) return;
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
        var library = await Promise.all(
          ['algorithms.js', 'algorithms_extra.js'].map(LabLibrary.load),
        );
        setEntries(LabLibrary.examples(library[0], library[1]), library[1]);
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
