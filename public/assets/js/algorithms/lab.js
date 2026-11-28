/* UI controller for al-Khwarizmi. The interpreter and operation counters remain in main.js. */
var lines = [];
var prevLine = '';
var myInterpreter;
var quickSession;
var iterators_colors = [
  '#afafff',
  '#ffaff7',
  '#fdffaf',
  '#affffb',
  '#ffe2af',
  '#d0afff',
  '#e1ffaf',
  '#ffafb9',
];
var iterators_int = {},
  iterators_gui = {},
  predicates = [],
  sequences = {},
  variables = {},
  tracks = [],
  track_data = [],
  skipped = [];
var stats_it_moves = 0,
  stats_it_cmps = 0,
  stats_pred_appls = 0,
  stats_swaps = 0,
  stats_assigments = 0;
var snippets = {},
  snippets_cat = {},
  global_std_code = '',
  global_std_code_debug = '',
  global_std_code_extra = '';
var chartCtx = null,
  myChart = null,
  two,
  two_width = 960,
  two_height = 400;
var params = new URLSearchParams(location.search);
var user = LabLibrary.user;
var repo = LabLibrary.repo;

(function () {
  var es = document.documentElement.lang === 'es';
  var cppPilot = params.get('pilot') === 'cpp';
  var editor = document.getElementById('codeArea');
  var editorSyntax = document.createElement('pre');
  editorSyntax.id = 'editorSyntax';
  editorSyntax.setAttribute('aria-hidden', 'true');
  editorSyntax.hidden = true;
  var editorSyntaxCode = document.createElement('code');
  editorSyntax.appendChild(editorSyntaxCode);
  editor.before(editorSyntax);
  var lastHighlightedCode;

  function syncEditorSyntaxScroll() {
    editorSyntaxCode.style.transform =
      'translate(' + -editor.scrollLeft + 'px, ' + -editor.scrollTop + 'px)';
  }

  function updateEditorSyntax() {
    if (!editor.getClientRects().length || typeof hljs === 'undefined') {
      editorSyntax.hidden = true;
      return;
    }
    if (editor.value !== lastHighlightedCode) {
      editorSyntaxCode.innerHTML = hljs.highlight(cppPilot && hljs.getLanguage('cpp') ? 'cpp' : 'javascript', editor.value, true).value + ' ';
      lastHighlightedCode = editor.value;
    }
    editorSyntax.hidden = false;
    editor.classList.add('has-syntax-preview');
    syncEditorSyntaxScroll();
  }

  var select = document.getElementById('exampleSelect');
  var status = document.getElementById('sessionStatus');
  var sourceDirty = false;
  var ready = false;
  var mode = 'loading';
  var exampleNames = [];
  var functionSources = {};
  var bookReferences = Object.create(null);
  var algorithmDocumentation = Object.create(null);
  var bibliography = document.createElement('section');
  bibliography.className = 'editor-references';
  bibliography.setAttribute('aria-labelledby', 'editorReferencesTitle');
  bibliography.hidden = true;
  var bibliographyTitle = document.createElement('h3');
  bibliographyTitle.id = 'editorReferencesTitle';
  bibliographyTitle.textContent = es ? 'Referencias bibliográficas' : 'Book references';
  var bibliographyList = document.createElement('ul');
  bibliography.append(bibliographyTitle, bibliographyList);
  document.querySelector('.editor-footer').after(bibliography);

  function renderBookReferences(name) {
    var references = bookReferences[name] || [];
    bibliographyList.replaceChildren();
    bibliography.hidden = !references.length;
    for (var reference of references) {
      var item = document.createElement('li');
      var url = '';
      if (reference.startsWith('Elements of Programming,')) {
        var page = /\bpp?\. (\d+)/.exec(reference);
        url = 'https://elementsofprogramming.com/eop.pdf' + (page ? '#page=' + (Number(page[1]) + 14) : '');
      } else if (reference.startsWith('From Mathematics to Generic Programming,')) {
        var chapter = /\bch\. (\d+)/.exec(reference);
        url = chapter
          ? 'https://www.fm2gp.com/code/ch' + chapter[1].padStart(2, '0') + '.h'
          : 'https://www.fm2gp.com/downloads.html';
      }
      if (url) {
        var link = document.createElement('a');
        link.href = url;
        link.textContent = reference;
        item.appendChild(link);
      } else item.textContent = reference;
      bibliographyList.appendChild(item);
    }
  }

  var t = es
    ? {
        loading: 'Cargando biblioteca',
        ready: 'Listo para iniciar',
        executing: 'Sesión en curso',
        finished: 'Ejecución finalizada',
        error: 'Revisá el mensaje de error',
        reference: 'Referencia del algoritmo',
        custom: 'Código personalizado',
        editing: 'Edición',
        viewing: 'Ejecución',
        copied: 'Código copiado',
        copyFailed: 'No se pudo copiar. Seleccioná el código y copialo.',
        loadFailed: 'No pudimos cargar la biblioteca. Comprobá la conexión y volvé a intentarlo.',
        notFound: 'No encontramos el ejemplo solicitado. Elegí otro en el selector.',
        functionNotFound:
          'No encontramos el algoritmo solicitado. Podés elegir un ejemplo para continuar.',
        changed: '¿Querés reemplazar el código que editaste por este ejemplo?',
      }
    : {
        loading: 'Loading library',
        ready: 'Ready to start',
        executing: 'Session in progress',
        finished: 'Execution finished',
        error: 'Check the error message',
        reference: 'Algorithm reference',
        custom: 'Custom code',
        editing: 'Editing',
        viewing: 'Execution',
        copied: 'Code copied',
        copyFailed: 'Could not copy. Select the code and copy it manually.',
        loadFailed: 'We could not load the library. Check your connection and try again.',
        notFound: 'The requested example was not found. Choose another from the selector.',
        functionNotFound: 'The requested algorithm was not found. Choose an example to continue.',
        changed: 'Replace your edited code with this example?',
      };

  function byId(id) {
    return document.getElementById(id);
  }
  function setMode(next) {
    mode = next;
    document.body.dataset.mode = next;
    status.textContent = t[next] || next;
    var executing = next === 'executing' || next === 'finished';
    byId('startButton').hidden = executing || next === 'reference';
    byId('startButton').style.display = executing || next === 'reference' ? 'none' : 'inline-flex';
    byId('startButton').disabled = !ready || !editor.value.trim();
    byId('stepButton').hidden = !executing;
    byId('stepButton').style.display = executing ? 'inline-flex' : 'none';
    byId('stepButton').disabled = next !== 'executing';
    byId('restartButton').style.display = 'inline-flex';
    byId('restartButton').disabled = !executing;
    byId('editButton').style.display = 'inline-flex';
    byId('editButton').disabled =
      cppPilot || (!executing && next !== 'reference' && !(next === 'error' && editor.style.display === 'none'));
    byId('editorMode').textContent = cppPilot
      ? (es ? 'Piloto de solo lectura' : 'Read-only pilot')
      : executing || next === 'reference' ? t.viewing : t.editing;
    syncEmptyStates();
  }
  function syncEmptyStates() {
    var hasScene = two && two.scene.children.length > 0;
    var empty = byId('visualEmpty');
    empty.hidden = !!hasScene || mode === 'reference';
    if (!empty.hidden) {
      empty.textContent = mode === 'executing'
        ? (es ? 'Avanzá hasta que el código cree datos para mostrar.' : 'Step through until the code creates data to display.')
        : mode === 'finished'
          ? (es ? 'Esta ejecución no generó datos para mostrar.' : 'This run produced no data to display.')
          : (es ? 'Iniciá la ejecución para ver los datos.' : 'Start the execution to see the data.');
    }
    byId('stateEmpty').hidden = !!byId('hg-right-x-a').textContent.trim();
    byId('metricsEmpty').hidden = !!byId('hg-right-x-b').textContent.trim();
    byId('outputEmpty').hidden = !!byId('hg-right-y').textContent.trim();
    byId('logEmpty').hidden = !!byId('hg-right-b-b-data').value.trim();
  }
  function updateEditor() {
    updateEditorSyntax();
    var count = editor.value.split('\n').length;
    byId('lineNumbers').textContent = Array.from({ length: count }, function (_, n) {
      return n + 1;
    }).join('\n');
    var before = editor.value.slice(0, editor.selectionStart);
    var row = before.split('\n').length;
    var column = before.length - before.lastIndexOf('\n');
    byId('editorPosition').textContent = 'Ln ' + row + ', Col ' + column;
    byId('copyCode').disabled = !editor.value;
    if (mode === 'ready' || mode === 'error')
      byId('startButton').disabled = !ready || !editor.value.trim();
  }
  function showProblem(message, retry) {
    byId('loadError').hidden = false;
    byId('loadErrorMessage').textContent = message;
    byId('retryLoad').hidden = !retry;
    setMode('error');
  }
  function clearProblem() {
    byId('loadError').hidden = true;
  }
  var visualStage = byId('hg-right-a').parentElement;
  function fitCanvas() {
    if (!two) return;
    var svg = two.renderer.domElement;
    var bounds = svg.getBBox();
    var width = Math.max(visualStage.clientWidth, Math.ceil(bounds.x + bounds.width + 2));
    var height = Math.max(visualStage.clientHeight, Math.ceil(bounds.y + bounds.height + 2));
    if (svg.getAttribute('width') !== String(width)) svg.setAttribute('width', width);
    if (svg.getAttribute('height') !== String(height)) svg.setAttribute('height', height);
  }
  function resizeCanvas() {
    if (!two) return;
    two.width = visualStage.clientWidth;
    if (mode !== 'executing' && mode !== 'finished' && mode !== 'reference') {
      two_width = Math.max(960, visualStage.clientWidth);
      two_height = Math.max(300, visualStage.clientHeight);
      setSizes();
    }
    fitCanvas();
  }
  function drawLabScope(scope) {
    drawScope(scope);
    two.update();
    fitCanvas();
  }

  if (
    typeof Two === 'undefined' ||
    typeof LabQuickJS === 'undefined' ||
    typeof window.acorn === 'undefined' ||
    typeof hljs === 'undefined' ||
    typeof startButton !== 'function' ||
    typeof setSizes !== 'function'
  ) {
    showProblem(
      es
        ? 'No se pudieron cargar los componentes del laboratorio. Actualizá la página para intentarlo de nuevo.'
        : 'The lab components could not be loaded. Refresh the page to try again.',
      false,
    );
    return;
  }
  two = new Two({ width: two_width, height: two_height, autostart: true }).appendTo(
    byId('sequence'),
  );
  setSizes();
  resizeCanvas();
  if (window.ResizeObserver) new ResizeObserver(resizeCanvas).observe(visualStage);
  window.addEventListener('resize', resizeCanvas);

  var declarations = '';
  var typecheckWorkerUrl = document.currentScript?.dataset.typecheckWorker;
  var typecheckWorker;

  function checkEditorTypes() {
    if (!typecheckWorker) typecheckWorker = new Worker(typecheckWorkerUrl);
    var worker = typecheckWorker;
    return new Promise(function (resolve, reject) {
      function clearHandlers() {
        clearTimeout(timer);
        worker.onmessage = null;
        worker.onerror = null;
      }

      function fail(error) {
        clearHandlers();
        worker.terminate();
        typecheckWorker = null;
        reject(error);
      }

      var timer = setTimeout(function () { fail(new Error('Type check timed out.')); }, 15000);
      worker.onerror = function (event) {
        fail(new Error(event.message || 'Type checking failed.'));
      };
      worker.onmessage = function ({ data }) {
        if (data.error) return fail(new Error(data.error));
        clearHandlers();
        resolve(data.diagnostics);
      };
      worker.postMessage({ source: editor.value, declarations: declarations });
    });
  }

  var commandPending = false;
  var typedSources = Object.create(null);
  var editorLanguage = 'javascript';

  function setEditorLanguage(language) {
    editorLanguage = language;
    byId('codeHighlight').classList.toggle('language-cpp', language === 'cpp' && !!hljs.getLanguage('cpp'));
  }
  async function closeSession() {
    if (!quickSession) return;
    var session = quickSession;
    quickSession = null;
    await session.close();
  }
  async function runCommand(command) {
    if (commandPending) return;
    commandPending = true;
    clearProblem();
    try {
      if (command === 'edit') {
        if (cppPilot) return;
        if (mode === 'reference') {
          var editUrl = new URL(location.href);
          editUrl.searchParams.delete('function');
          editUrl.searchParams.delete('snippet');
          editUrl.searchParams.set('code', editor.value);
          if (editorLanguage === 'typescript') editUrl.searchParams.set('lang', 'ts');
          else editUrl.searchParams.delete('lang');
          location.href = editUrl.href;
          return;
        }
        await closeSession();
        editButton();
        resetStatus();
        setMode('ready');
        editor.focus();
      } else if (command === 'start' || command === 'restart') {
        if (!ready || !editor.value.trim()) return;
        editor.readOnly = true;
        if (editorLanguage === 'typescript' && declarations) {
          status.textContent = es ? 'Comprobando tipos…' : 'Checking types…';
          var diagnostics = await checkEditorTypes();
          if (diagnostics.length) {
            var diagnostic = diagnostics.find(function (item) { return item.line; }) || diagnostics[0];
            var sourceLocation = diagnostic.line ? diagnostic.line + ':' + diagnostic.column + ' · ' : '';
            if (!editor.getClientRects().length) editButton();
            showProblem(
              (es ? 'Error de tipos ' : 'Type error ') +
                'TS' + diagnostic.code + ' · ' + sourceLocation + diagnostic.message,
              false,
            );
            editor.focus();
            if (diagnostic.start !== undefined) {
              editor.setSelectionRange(diagnostic.start, diagnostic.start + (diagnostic.length || 1));
            }
            return;
          }
        }
        resizeCanvas();
        await closeSession();
        var initialize = function (adapter) {
          myInterpreter = adapter;
          initFunctions(adapter);
        };
        if (cppPilot) {
          if (!LabCppPilot.supported()) {
            showProblem(
              es
                ? 'Este piloto requiere soporte de WebAssembly JSPI. Probá con Chrome o Firefox.'
                : 'This pilot requires WebAssembly JSPI. Try Chrome or Firefox.',
              false,
            );
            return;
          }
          quickSession = await LabCppPilot.createSession(initialize, drawLabScope, es ? 'Índice: ' : 'Index: ');
        } else {
          var prefix = invisibleCode();
          quickSession = await LabQuickJS.createSession(
            prefix + editor.value, prefix.length, initialize, drawLabScope, editorLanguage,
          );
        }
        startButton(function () {
          return myInterpreter;
        });
        two.update();
        fitCanvas();
        if (byId('hg-right-y').querySelector('[data-output-kind="error"]')) {
          showProblem(
            byId('hg-right-y').querySelector('[data-output-kind="error"]').textContent,
            false,
          );
        } else {
          setMode('executing');
          byId('stepButton').focus({ preventScroll: true });
        }
      } else if (command === 'step' && mode === 'executing') {
        var event = await quickSession.next();
        if (prevNode && prevNode.type === 'VariableDeclaration' && log_stats_enabled) {
          var init = prevNode.declarations[0].init;
          if (init && init.callee && init.callee.name === 'source') {
            ++stats_assigments;
            updateStatus();
          }
        }
        prevNode = event.point || null;
        var code = editor.value;
        var highlighted = byId('codeHighlight');
        var contractError = event.error?.name === 'LabContractError';
        if (event.done) {
          disable(true);
          if (!contractError) highlighted.textContent = code;
          if (event.error && !contractError) showError(event.error.message || String(event.error));
        } else {
          var offset = cppPilot ? 0 : invisibleCode().length;
          var from = event.point.start - offset;
          var to = event.point.end - offset;
          highlighted.innerHTML =
            escapeCodeHtml(code.slice(0, from)) +
            '<mark>' +
            escapeCodeHtml(code.slice(from, to)) +
            '</mark>' +
            escapeCodeHtml(code.slice(to));
        }
        if (!contractError) hljs.highlightBlock(highlighted);
        if (contractError) {
          showProblem(event.error.message, false);
        } else if (byId('hg-right-y').querySelector('[data-output-kind="error"]')) {
          showProblem(
            byId('hg-right-y').querySelector('[data-output-kind="error"]').textContent,
            false,
          );
        } else setMode(byId('stepButton').disabled ? 'finished' : 'executing');
        var marker = byId('codeHighlight').querySelector('mark');
        if (marker) {
          var pre = byId('codeHighlightPre');
          var top = marker.getBoundingClientRect().top - pre.getBoundingClientRect().top;
          if (top < 20 || top > pre.clientHeight - 45) pre.scrollTop += top - pre.clientHeight / 2;
        }
      }
    } catch (error) {
      showError(error.message || String(error));
      showProblem(error.message || String(error), false);
    } finally {
      editor.readOnly = cppPilot;
      commandPending = false;
    }
    syncEmptyStates();
    updateEditor();
    translateMetrics();
  }

  var metricNames = es
    ? {
        'Iterator displacements': 'Desplazamientos',
        'Iterator comparisons': 'Comparaciones',
        'Iterator other ops.': 'Otras op. de iterador',
        'Pred/Rel applications': 'Predicados / relaciones',
        'Op. calls': 'Llamadas a operaciones',
        Swaps: 'Intercambios',
        Assignments: 'Asignaciones',
        Moves: 'Movimientos',
        'Distance Rel': 'Distancia: relaciones',
        'Distance Moves': 'Distancia: movimientos',
      }
    : {};
  function translateMetrics() {
    byId('hg-right-x-b')
      .querySelectorAll('p')
      .forEach(function (row) {
        var label = row.querySelector('b');
        if (!label) return;
        var key = label.textContent.replace(/:\s*$/, '');
        var number = row.textContent.slice(label.textContent.length).replace(/^:\s*/, '');
        label.textContent = metricNames[key] || key;
        var value = document.createElement('span');
        value.textContent = number;
        row.removeAttribute('id');
        row.replaceChildren(label, value);
      });
  }

  ['start', 'step', 'restart', 'edit'].forEach(function (action) {
    byId(action + 'Button').addEventListener('click', function () {
      runCommand(action);
    });
  });
  editor.addEventListener('input', function () {
    sourceDirty = true;
    setCurrentAlgorithm('');
    updateEditor();
  });
  editor.addEventListener('keydown', function (event) {
    if (!cppPilot && event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault();
      editor.setRangeText('    ', editor.selectionStart, editor.selectionEnd, 'end');
      sourceDirty = true;
      setCurrentAlgorithm('');
      updateEditor();
    }
  });
  ['keyup', 'click', 'select'].forEach(function (name) {
    editor.addEventListener(name, updateEditor);
  });
  var functionHelp = {
    Iter: ['Iter<T> representa una posición en una secuencia de elementos T. El iterador de fin delimita el rango y no se puede leer.', 'Iter<T> represents a position in a sequence of T values. The end iterator delimits the range and cannot be read.'],
    Seq: ['Seq<T> es una secuencia visualizable de elementos T.', 'Seq<T> is a visualizable sequence of T values.'],
    ForwardIterator: ['Iterador que avanza y permite recorrer de nuevo el mismo rango.', 'An iterator that advances and supports repeated traversal of the same range.'],
    BidirectionalIterator: ['Iterador que puede avanzar y retroceder.', 'An iterator that can move forward and backward.'],
    MutableForwardIterator: ['Iterador de avance multipasada que permite escribir en su posición.', 'A multipass forward iterator that allows writes at its position.'],
    ForwardLinker: ['Conjunto de operaciones para leer el valor de un nodo, obtener su sucesor y cambiar ese enlace.', 'Operations that read a node value, get its successor, and change that link.'],
    PartitionBlock: ['Par de iteradores con el punto de partición y el fin de un bloque ya particionado.', 'A pair of iterators holding the partition point and end of a partitioned block.'],
    disjoint_counted_ranges: ['Dentro de un contrato, comprueba que dos rangos contados no se solapen.', 'Inside a contract, checks that two counted ranges do not overlap.'],
    stable_partition_snapshot: ['Guarda el orden esperado de los dos grupos sin modificar el rango.', 'Captures the expected order of both groups without changing the range.'],
    range_matches_snapshot: ['Comprueba que el rango tenga los mismos valores y el mismo orden que la copia guardada.', 'Checks that a range has the same values in the same order as the snapshot.'],
    partition_buffered_block: ['Particiona un bloque de forma estable usando un búfer y devuelve el punto de partición.', 'Stably partitions a block using a buffer and returns its partition point.'],
    combine_partition_blocks: ['Combina dos bloques adyacentes ya particionados mediante una rotación que conserva el orden de cada grupo.', 'Combines two adjacent partitioned blocks by rotating while preserving each group’s order.'],
    MutableBidirectionalIterator: ['Iterador bidireccional que permite escribir en su posición.', 'A bidirectional iterator that allows writes at its position.'],
    ValueOf: ['ValueOf<I> obtiene el tipo de elemento del iterador I.', 'ValueOf<I> extracts the element type of iterator I.'],
    Predicate: ['Función que recibe un elemento y devuelve true o false.', 'A function that takes an element and returns true or false.'],
    Relation: ['Función que compara dos elementos y devuelve true o false.', 'A function that compares two elements and returns true or false.'],
    Operation: ['Operación binaria que combina dos valores del mismo tipo y devuelve otro de ese tipo.', 'A binary operation combining two values of the same type and returning a value of that type.'],
    equal: ['Comprueba si dos iteradores del mismo rango están en la misma posición.', 'Checks whether two iterators in the same range are at the same position.'],
    sink: ['Escribe un valor en la posición del iterador. La posición debe ser válida para escritura.', 'Writes a value at the iterator position. The position must be writable.'],
    successor: ['Devuelve el iterador que está n posiciones más adelante. Por defecto avanza una posición.', 'Returns the iterator n positions ahead. Advances one position by default.'],
    predecessor: ['Devuelve el iterador que está n posiciones más atrás. Por defecto retrocede una posición.', 'Returns the iterator n positions back. Moves back one position by default.'],
    distance: ['Devuelve la diferencia de posición del segundo iterador respecto del primero en la misma secuencia.', 'Returns the position of the second iterator relative to the first in the same sequence.'],
    exchange_values: ['Intercambia los valores en las dos posiciones indicadas.', 'Swaps the values at the two iterator positions.'],
    array_ascending: ['Crea un arreglo de n enteros consecutivos en orden ascendente. Por defecto genera 10 valores a partir de 0.', 'Creates an array of n consecutive integers in increasing order. Defaults to 10 values starting at 0.'],
    array_descending: ['Crea un arreglo de n enteros consecutivos en orden descendente. Por defecto genera 10 valores a partir de n − 1.', 'Creates an array of n consecutive integers in decreasing order. Defaults to 10 values starting at n − 1.'],
    array_from: ['Convierte una cadena en un arreglo de unidades UTF-16.', 'Converts a string into an array of UTF-16 code units.'],
    even: ['Comprueba si un entero es par y registra la evaluación del predicado.', 'Checks whether an integer is even and records the predicate evaluation.'],
    odd: ['Comprueba si un entero es impar y registra la evaluación del predicado.', 'Checks whether an integer is odd and records the predicate evaluation.'],
    is_bounded_range: ['Dentro de un contrato, comprueba que ambos iteradores delimiten un rango válido en la misma secuencia.', 'Inside a contract, checks that both iterators delimit a valid range in the same sequence.'],
    range_value_counts: ['Cuenta cuántas veces aparece cada valor del rango. Sirve para guardar el estado inicial en un contrato.', 'Counts occurrences of each value in the range for use as a contract snapshot.'],
    has_range_value_counts: ['Comprueba que el rango conserve todos los valores y sus repeticiones.', 'Checks that the range retains all values and their multiplicities.'],
    pre: ['Comprueba una precondición sin registrar operaciones.', 'Checks a precondition without recording operations.'],
    post: ['Comprueba una poscondición sin registrar operaciones.', 'Checks a postcondition without recording operations.'],
    is_partitioned_n: ['Comprueba que el predicado sea falso al principio y verdadero después del límite.', 'Checks that the predicate is false before the boundary and true afterward.'],
    is_partition_point_n: ['Comprueba que el iterador marque el límite entre los dos grupos.', 'Checks that the iterator marks the boundary between the two groups.'],
    digitSum: ['Suma los dígitos decimales de un entero seguro. Ignora el signo.', 'Adds the decimal digits of a safe integer, ignoring its sign.'],
    lower_bound_n: ['Devuelve la primera posición cuyo elemento no es menor que el valor buscado, según la relación dada.', 'Returns the first position whose element is not less than the search value under the given relation.'],
    upper_bound_n: ['Devuelve la primera posición cuyo elemento es mayor que el valor buscado, según la relación dada.', 'Returns the first position whose element is greater than the search value under the given relation.'],
    partition_point_n: ['Busca el límite entre los elementos que cumplen el predicado y los que no.', 'Finds the boundary between elements that satisfy the predicate and those that do not.'],
    relation: ['Registra una relación binaria para contar y mostrar sus evaluaciones.', 'Registers a binary relation so the lab can count and display its calls.'],
    predicate: ['Registra un predicado para contar y mostrar sus evaluaciones.', 'Registers a predicate so the lab can count and display its calls.'],
    hasLowerDigitSum: ['Indica si el primer entero tiene una suma de dígitos menor que la del segundo.', 'Checks whether the first integer has a smaller digit sum than the second.'],
    sequence: ['Crea una secuencia para el visualizador. Si omitís el nombre, usa el de la variable.', 'Creates a sequence for the visualizer. If omitted, the name comes from the variable.'],
    begin: ['Devuelve el iterador al comienzo de la secuencia.', 'Returns the iterator at the start of the sequence.'],
    end: ['Devuelve el iterador que marca el final de la secuencia.', 'Returns the iterator marking the end of the sequence.'],
    size: ['Devuelve la cantidad de elementos de la secuencia.', 'Returns the number of elements in the sequence.'],
    source: ['Lee el elemento en la posición del iterador.', 'Reads the element at the iterator position.'],
    print: ['Muestra un valor en la salida del laboratorio.', 'Displays a value in the lab output.'],
  };
  var tooltip = document.createElement('div');
  tooltip.className = 'function-tooltip';
  tooltip.setAttribute('role', 'dialog');
  tooltip.setAttribute('aria-label', es ? 'Documentación del código' : 'Code documentation');
  var helpText = document.createElement('div');
  var closeHelp = document.createElement('button');
  closeHelp.className = 'function-tooltip-close';
  closeHelp.type = 'button';
  closeHelp.textContent = '×';
  closeHelp.setAttribute('aria-label', es ? 'Cerrar documentación' : 'Close documentation');
  tooltip.append(helpText, closeHelp);
  tooltip.hidden = true;
  document.body.appendChild(tooltip);
  var measure = document.createElement('canvas').getContext('2d');

  var helpOrigin;
  function hideFunctionHelp(restoreFocus) {
    if (tooltip.hidden) return;
    tooltip.hidden = true;
    if (restoreFocus) helpOrigin.focus({ preventScroll: true });
  }
  closeHelp.addEventListener('click', function () { hideFunctionHelp(true); });
  document.addEventListener('click', function (event) {
    if (!tooltip.contains(event.target)) hideFunctionHelp(false);
  }, true);

  function showFunctionHelp(event) {
    var area = event.currentTarget;
    var style = getComputedStyle(area);
    var rect = area.getBoundingClientRect();
    var x = event.clientX - rect.left - parseFloat(style.paddingLeft) + area.scrollLeft;
    var y = event.clientY - rect.top - parseFloat(style.paddingTop) + area.scrollTop;
    measure.font = style.fontSize + ' ' + style.fontFamily;
    var column = Math.floor(x / measure.measureText('0').width);
    var line = editor.value.split('\n')[Math.floor(y / parseFloat(style.lineHeight))];
    if (!line || column < 0) return;

    var visual = 0;
    var size = parseInt(style.tabSize, 10) || 4;
    var offset = 0;
    while (offset < line.length && visual <= column) {
      visual += line[offset] === '	' ? size - (visual % size) : 1;
      offset++;
    }
    if (visual <= column) return;
    var token = Array.from(line.matchAll(/[A-Za-z_$][\w$]*/g)).find(function (word) {
      return word.index < offset && offset <= word.index + word[0].length;
    });
    if (!token) return;

    var name = token[0];
    var docs = algorithmDocumentation[name];
    var description = docs?.[es ? 0 : 1] ||
      (Object.hasOwn(functionHelp, name) ? functionHelp[name][es ? 0 : 1] : '');
    var definition = Object.hasOwn(functionSources, name) ? functionSources[name].trim() : '';
    if (!description && !definition) return;

    var signature = docs?.[2] || definition.split('\n')[0].replace(/\s*\{\s*$/, '');
    var references = bookReferences[name] || [];
    helpText.textContent = [signature || name, description, ...references].filter(Boolean).join('\n');
    helpOrigin = area;
    tooltip.hidden = false;
    closeHelp.focus({ preventScroll: true });
    tooltip.style.left = Math.max(8, Math.min(event.clientX + 12, innerWidth - tooltip.offsetWidth - 8)) + 'px';
    tooltip.style.top = (event.clientY + tooltip.offsetHeight + 20 < innerHeight
      ? event.clientY + 16
      : Math.max(8, event.clientY - tooltip.offsetHeight - 10)) + 'px';
  }

  [editor, byId('codeHighlightPre')].forEach(function (area) {
    area.addEventListener('click', showFunctionHelp);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') hideFunctionHelp(true);
  });

  [editor, byId('codeHighlightPre')].forEach(function (area) {
    area.addEventListener('scroll', function () {
      byId('lineNumbers').scrollTop = area.scrollTop;
      if (area === editor) syncEditorSyntaxScroll();
    });
  });
  document.addEventListener('keydown', function (event) {
    var editing =
      event.target instanceof HTMLElement &&
      (event.target.matches('textarea,input,select') || event.target.isContentEditable);
    if ((event.ctrlKey || event.metaKey) && (event.key === 'Enter' || event.key === 'F9')) {
      event.preventDefault();
      if (mode === 'ready' || (mode === 'error' && ready)) runCommand('start');
      return;
    }
    if (
      !editing &&
      !event.altKey &&
      !event.metaKey &&
      !event.ctrlKey &&
      (event.key === 'ArrowRight' || event.key === 'ArrowDown') &&
      mode === 'executing'
    ) {
      event.preventDefault();
      runCommand('step');
    }
  });
  byId('clearOutput').addEventListener('click', function () {
    byId('hg-right-y').replaceChildren();
    syncEmptyStates();
  });
  byId('copyCode').addEventListener('click', async function () {
    try {
      await navigator.clipboard.writeText(editor.value);
      status.textContent = t.copied;
    } catch (error) {
      status.textContent = t.copyFailed;
    }
  });
  byId('retryLoad').addEventListener('click', loadLibrary);

  function fillExamples() {
    exampleNames = LabLibrary.examples(global_std_code, global_std_code_extra);
    LabCatalog.setEntries(exampleNames, global_std_code_extra, chooseAlgorithm);
    select.disabled = false;
  }
  function setCurrentAlgorithm(name) {
    select.value = name;
    byId('currentAlgorithm').textContent = name || t.custom;
    LabCatalog.setCurrent(name);
    renderBookReferences(name);
  }
  select.addEventListener('click', function () {
    LabCatalog.open();
  });
  document.querySelectorAll('a[href="/algorithms-catalog/"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (ready) {
        event.preventDefault();
        LabCatalog.open();
      }
    });
  });
  async function chooseAlgorithm(name, confirmed) {
    if (commandPending) return false;
    if (sourceDirty && !confirmed) {
      LabCatalog.confirmReplacement(name, function () {
        return chooseAlgorithm(name, true);
      });
      return false;
    }
    commandPending = true;
    try {
      await closeSession();
      setCurrentAlgorithm(name);
      clearProblem();
      if (mode === 'reference') {
        var next = new URL(location.href);
        next.searchParams.delete('code');
        next.searchParams.delete('function');
        next.searchParams.set('snippet', name);
        location.href = next.href;
        return;
      }
      cppPilot = false;
      editor.readOnly = false;
      setEditorLanguage(typedSources[name] ? 'typescript' : 'javascript');
      editor.value = getSnippet(name);
      editor.setSelectionRange(0, 0);
      editor.scrollTop = 0;
      sourceDirty = false;
      editButton();
      setMode('ready');
      resizeCanvas();
      resetStatus();
      syncEmptyStates();
      updateEditor();
      var next = new URL(location.href);
      next.searchParams.delete('code');
      next.searchParams.delete('function');
      next.searchParams.set('snippet', name);
      next.searchParams.delete('pilot');
      history.replaceState(null, '', next);
      editor.focus();
    } finally {
      commandPending = false;
    }
  }
  function renderReference(name) {
    var container = byId('hg-right-a');
    container.replaceChildren();
    var heading = document.createElement('h3');
    heading.textContent = name;
    container.appendChild(heading);
    var description = document.createElement('p');
    description.textContent = es
      ? 'Definición del algoritmo. Podés copiarla, editarla o abrir su ejemplo de uso.'
      : 'Algorithm definition. Copy it, edit it, or open its usage example.';
    container.appendChild(description);
    var attributes = std_lib_attributes()[name];
    if (attributes) {
      var list = document.createElement('dl');
      list.className = 'reference-attributes';
      Object.keys(attributes).forEach(function (key) {
        var term = document.createElement('dt');
        term.textContent = key;
        var value = document.createElement('dd');
        value.textContent = Array.isArray(attributes[key])
          ? attributes[key].join(' · ')
          : String(attributes[key]);
        list.appendChild(term);
        list.appendChild(value);
      });
      container.appendChild(list);
    }
    if (exampleNames.includes(name)) {
      var exampleUrl = new URL(location.href);
      exampleUrl.searchParams.delete('function');
      exampleUrl.searchParams.delete('code');
      exampleUrl.searchParams.set('snippet', name);
      var link = document.createElement('a');
      link.href = exampleUrl.href;
      link.textContent = es ? 'Abrir ejemplo de uso →' : 'Open usage example →';
      container.appendChild(link);
    }
  }

  async function loadLibrary() {
    ready = false;
    clearProblem();
    select.disabled = true;
    setMode('loading');
    try {
      var library = await Promise.all(
        ['algorithms.js', 'algorithms_debug.js', 'algorithms_extra.js'].map(LabLibrary.load),
      );
      global_std_code = library[0];
      global_std_code_debug = library[1];
      global_std_code_extra = library[2];
      snippets = {};
      process_snippets();
      functionSources = Object.assign({}, snippets);
      process_snippets_usage();
      typedSources = LabLibrary.typescriptSources(global_std_code_extra);
      bookReferences = LabLibrary.bookReferences(global_std_code_extra);
      algorithmDocumentation = LabLibrary.documentation(global_std_code_extra);
      declarations = LabLibrary.typeDeclarations(global_std_code_extra);
      for (var name of Object.keys(typedSources)) {
        if (!Object.hasOwn(functionSources, name)) {
          delete typedSources[name];
          continue;
        }
        var typed = typedSources[name];
        functionSources[name] = typed.definition;
        snippets[name] = typed.definition + '\n\n' + typed.usage;
      }
      fillExamples();
      ready = true;
      if (!sourceDirty) {
        if (cppPilot) {
          setEditorLanguage('cpp');
          editor.value = LabCppPilot.source;
          editor.readOnly = true;
          editButton();
          byId('currentAlgorithm').textContent = 'find_if (C++)';
          setMode('ready');
        } else if (params.has('code')) {
          setEditorLanguage(params.get('lang') === 'ts' ? 'typescript' : 'javascript');
          editor.value = params.get('code');
          editButton();
          setMode('ready');
        } else if (params.get('function')) {
          var name = params.get('function');
          var source = functionSources[name];
          if (typeof source !== 'string' || !source) {
            showProblem(t.functionNotFound, false);
            return;
          }
          setEditorLanguage(typedSources[name] ? 'typescript' : 'javascript');
          editor.value = source;
          showFunction();
          renderReference(name);
          renderBookReferences(name);
          setMode('reference');
        } else {
          var name = params.get('snippet') || 'find';
          var source = getSnippet(name);
          if (typeof source !== 'string' || !source) {
            editButton();
            showProblem(t.notFound, false);
            return;
          }
          setEditorLanguage(typedSources[name] ? 'typescript' : 'javascript');
          editor.value = source;
          setCurrentAlgorithm(name);
          editButton();
          setMode('ready');
        }
      } else {
        editButton();
        setMode('ready');
      }
      if (!sourceDirty) {
        editor.setSelectionRange(0, 0);
        editor.scrollTop = 0;
      }
      resizeCanvas();
      updateEditor();
      syncEmptyStates();
    } catch (error) {
      console.error(error);
      showProblem(t.loadFailed, true);
    }
  }
  if (!cppPilot && params.has('code')) {
    setEditorLanguage(params.get('lang') === 'ts' ? 'typescript' : 'javascript');
    editor.value = params.get('code');
  }
  updateEditor();
  setMode('loading');
  loadLibrary();
})();
