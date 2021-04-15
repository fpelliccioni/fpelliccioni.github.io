/*
Copyright Fernando Pelliccioni 2019-2020

Distributed under the Boost Software License, Version 1.0. (See accompanying
file LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)

TODO list:
    - standard library reference and links with examples
    - Distances between:
        comparissons, swaps, assigments, moves...
*/



var log_stats_enabled = true;
var g_disable_function_printing = false;

var categories_full = [
    {id: 'rearrangements', name: 'Rearrangements', categories: [
        {id: 'rearrangements/position-based', name: 'Position-based', categories: [
              {id: 'rearrangements/position-based/reverse', name: 'Reverse', categories: []}
            , {id: 'rearrangements/position-based/rotate', name: 'Rotate', categories: []}
        ]}
       ,{id: 'rearrangements/predicate-based', name: 'Predicate-based', categories: [
            {id: 'rearrangements/predicate-based/partition', name: 'Partition', categories: []},
            {id: 'rearrangements/predicate-based/make-heap', name: 'Heaps', categories: []}
        ]}
       ,{id: 'rearrangements/ordering-based', name: 'Ordering-based', categories: [
            {id: 'rearrangements/ordering-based/sorting', name: 'Sorting', categories: [
                {id: 'rearrangements/ordering-based/sorting/insertion-sort', name: 'Insertion Sort', categories: []},
                {id: 'rearrangements/ordering-based/sorting/selection-sort', name: 'Selection Sort', categories: []}
            ]}
        ]}
    ]}
  , {id: 'selection', name: 'Selection', categories: []}
  , {id: 'search', name: 'Seach', categories: [
        {id: 'search/binary', name: 'Binary', categories: []},
        {id: 'search/linear', name: 'Linear', categories: []}
  ]}
  , {id: 'uncatalogued', name: 'Uncatalogued', categories: []}
];

// var categories = [
//   , {id: 'selection', name: 'Selection', categories: []}
//   , {id: 'search', name: 'Seach', categories: [
//         {id: 'search/binary', name: 'Binary', categories: []},
//         {id: 'search/linear', name: 'Linear', categories: []}
//   ]}
//   , {id: 'uncatalogued', name: 'Uncatalogued', categories: []}
// ];


var categories = [
    {id: 'rearrangements', name: 'Rearrangements', categories: [
        {id: 'rearrangements/position-based', name: 'Position-based', categories: [
              {id: 'rearrangements/position-based/reverse', name: 'Reverse', categories: []}
            , {id: 'rearrangements/position-based/rotate', name: 'Rotate', categories: []}
        ]}
       ,{id: 'rearrangements/predicate-based', name: 'Predicate-based', categories: [
            {id: 'rearrangements/predicate-based/partition', name: 'Partition', categories: []},
            {id: 'rearrangements/predicate-based/make-heap', name: 'Heaps', categories: []}
        ]}
       ,{id: 'rearrangements/ordering-based', name: 'Ordering-based', categories: [
            {id: 'rearrangements/ordering-based/sorting', name: 'Sorting', categories: [
                {id: 'rearrangements/ordering-based/sorting/insertion-sort', name: 'Insertion Sort', categories: []},
                {id: 'rearrangements/ordering-based/sorting/selection-sort', name: 'Selection Sort', categories: []}
            ]}
        ]}
    ]}
  , {id: 'selection', name: 'Selection', categories: []}
  , {id: 'search', name: 'Seach', categories: [
        {id: 'search/binary', name: 'Binary', categories: []},
        {id: 'search/linear', name: 'Linear', categories: []}
  ]}
  , {id: 'uncatalogued', name: 'Uncatalogued', categories: []}
];

function createChart() {
    var hg_right_pre_a = document.getElementById('hg-right-pre-a');
    hg_right_pre_a.innerHTML = '<canvas id="myChart"></canvas>';

    if ( ! document.getElementById('myChart')) return null;

    chartCtx = document.getElementById('myChart').getContext('2d');

    myChart = new Chart(chartCtx, {
        type: 'bar',
        options: {

            animation: {
                duration: 0, // general animation time
            },
            hover: {
                animationDuration: 0, // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0, // animation duration after a resize

            legend: {
            display: false
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem) {return tooltipItem.yLabel;}
                }
            },

            responsive: true,
            maintainAspectRatio: false,

            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                    categorySpacing: 0
                }]
            },
        }
    });
    return myChart;
}

function process_snippets() {
    var code = global_std_code;
    var p = acorn.parse(code);

    for (var n in p.body) {
        const value = p.body[n];
        if (value.type == 'FunctionDeclaration') {
            snippets[value.id.name] = code.substring(value.start, value.end);
        }
    }
    // console.log('end of process_snippets');
}

function unindent_code(code, n) {
    if (!n) n = 4;
    var res = [];
    var lines = code.split('\n');
    for(var i = 0; i < lines.length; ++i) {
        if (lines[i].startsWith(" ".repeat(n))) {
            var line = lines[i].substr(4) + '\n';
        } else {
            var line = lines[i] + '\n';
        }
        res.push(line);
    }
    var res_str = res.join('').substr(1);
    res_str = res_str.trim();
    res_str = res_str.substring(0, res_str.length - 1);
    return res_str;
}

function process_snippets_usage() {
    // console.log('begin of process_snippets_usage');
    var code = global_std_code_extra;
    var p = acorn.parse(code);

    for (var n in p.body) {
        const value = p.body[n];
        if (value.type == 'FunctionDeclaration') {
            if (value.id.name.startsWith('__') && value.id.name.includes('_usage')) {
                var name = value.id.name.substr(2);
                name = name.replace('_usage', '');
                var fcode = code.substring(value.body.start, value.body.end)
                snippets[name] += '\n\n' + unindent_code(fcode);
            }
        }
    }
    // console.log('end of process_snippets_usage');
    // console.log(snippets);
}

async function downloadStdCode(user, repo) {
    try {
        // const response = await fetch(`https://api.github.com/repos/${user}/${repo}/contents/algorithms/`);
        var url = `https://raw.githubusercontent.com/${user}/${repo}/master/build/algorithms.js`;
        console.log(url);
        const response = await fetch(url);
        const code = await response.text();
        global_std_code = code;
    } catch(e) {console.log(e);}
}

async function downloadStdCodeDebug(user, repo) {
    try {
        var url = `https://raw.githubusercontent.com/${user}/${repo}/master/build/algorithms_debug.js`;
        console.log(url);
        const response = await fetch(url);
        const code = await response.text();
        global_std_code_debug = code;
    } catch(e) {console.log(e);}
}

async function downloadStdCodeExtra(user, repo) {
    try {
        // const response = await fetch(`https://api.github.com/repos/${user}/${repo}/contents/algorithms/`);
        var url = `https://raw.githubusercontent.com/${user}/${repo}/master/build/algorithms_extra.js`;
        console.log(url);
        const response = await fetch(url);
        const code = await response.text();
        global_std_code_extra = code;
    } catch(e) {console.log(e);}
}






function getSnippet(snippet) {
    var res = snippets[snippet];
    if (res) {
        return res;
    }
    return '';
}


function catHasChilds(cat) {
    if (cat.categories == undefined) return false;
    if (cat.categories == null) return false;
    return cat.categories.length > 0;
}

function getSnippets(cat) {
    var sns = []
    for(var key in snippets_cat){

        var value = snippets_cat[key];
        console.log(key);
        console.log(value);
        if (cat.id == value) {
            sns.push(key)
        }
    }
    // console.log(sns);
    return sns;
}

// function getUncataloguedSnippets() {
//     var sns = []
//     for(var key in snippets_cat){
//         var value = snippets_cat[key];

//         if (value == null) {
//             sns.push(key)
//         }
//     }
//     return sns;
// }

function fillCatalogRecursive(str, categories) {

    if (categories == undefined) return;
    if (categories == null) return;

    for(var i in categories) {
        var cat = categories[i];

        str += '<li class="linested"><span class="caret">' + cat.name + '</span><ul class="nested">';
        if (catHasChilds(cat)) {
            str = fillCatalogRecursive(str, cat.categories);
        } else {
            snippets = getSnippets(cat);
            for(var si in snippets) {
                var s = snippets[si]
                // str += '<li><a href="http://componentsprogramming.com/algorithms?snippet=' + s + '">[' + s + ']</a></li>';
                str += '<li><a href="/algorithms?snippet=' + s + '">[' + s + ']</a></li>';
            }
        }

        str +=  '</ul></li>';
    }

    return str;
}

function fillCatalog() {

    var str = fillCatalogRecursive('', categories);

    // str += '<li class="linested"><span class="caret">' + 'Uncatalogued' + '</span><ul class="nested">';

    // snippets = getUncataloguedSnippets();
    // for(var si in snippets) {
    //     var s = snippets[si]
    //     // str += '<li><a href="http://componentsprogramming.com/algorithms?snippet=' + s + '">[' + s + ']</a></li>';
    //     str += '<li><a href="/algorithms?snippet=' + s + '">[' + s + ']</a></li>';
    // }
    // str +=  '</ul></li>';

    var list = document.getElementById('list');
    list.innerHTML = str;
}

function fillCatalogRecursiveFull(str, categories) {

    if (categories == undefined) return;
    if (categories == null) return;

    for(var i in categories) {
        var cat = categories[i];

        str += '<li class="linested"><span class="caret">' + cat.name + '</span><ul class="nested">';
        if (catHasChilds(cat)) {
            str = fillCatalogRecursiveFull(str, cat.categories);
        } else {
            snippets = getSnippets(cat);
            for(var si in snippets) {
                var s = snippets[si]
                str += '<li><a href="/algorithms?repo=tao-js&snippet=' + s + '">[' + s + ']</a></li>';
            }
        }

        str +=  '</ul></li>';
    }

    return str;
}

function fillCatalogFull() {
    var str = fillCatalogRecursiveFull('', categories_full);
    var list = document.getElementById('list');
    list.innerHTML = str;
}

function Iterator(data, index, name, category) {
    this.data = data;
    this.index = index;
    this.name = name;
    this.category = category;
}

function getIteratorCatetoryFromSeqType(seqType) {
    // console.log(`getIteratorCatetoryFromSeqType seqType ${seqType}`);
    if (seqType === "array") {
        return 3; //"RandomAccess";
    } else if (seqType === "sll") {
        return 1; //"Forward";
    } else if (seqType === "dll") {
        return 2; //"Bidirectional";
    } else if (seqType === "stream") {
        return 0; //"SinglePass";
    }
    return undefined;
}

function iteratorCategoryToString(category) {
    console.log(category)
    if (category === 3) {
        return "RandomAccess";
    } else if (category === 1) {
        return "Forward";
    } else if (category === 2) {
        return "Bidirectional";
    } else if (category === 0) {
        return "SinglePass";
    }
    return undefined;
}

function isSinglePass(it) {
    return it.category >= 0;
}

function isSinglePassStrict(it) {
    return it.category == 0;
}

function isForward(it) {
    return it.category >= 1;
}

function isBidirectional(it) {
    return it.category >= 2;
}

function isRandomAccess(it) {
    // console.log(it)
    // console.log(it.category)
    return it.category >= 3;
}

function clearStream(it, n) {
    if ( ! isSinglePassStrict(it)) return;

    // console.log(`clearStream`)
    // console.log(it)
    // console.log(n)

    var i = it.index;
    while (n != 0) {
        it.data.data[i] = undefined;
        ++i;
        --n;
    }
}


function Sequence(name, data, elements, colors, capacity, preds, type, drawChart) {
    if (capacity == undefined) {
        capacity = data.length
    }
    this.name = name;
    this.data = data;
    this.elements = elements;
    // this.colors = colors;
    this.capacity = capacity;
    this.preds = preds;
    this.type = type;
    this.drawChart = drawChart;
}

function RangeBounded(fname, lname) {
    this.fname = fname;
    this.lname = lname;
}

function RangeCounted(fname, nname) {
    this.fname = fname;
    this.nname = nname;
}


function resetState() {

    var hg_right_x_a = document.getElementById('hg-right-x-a');
    hg_right_x_a.innerHTML = '';


    lines = [];

    prevLine = "";
    prevLine2 = "";
    prevNodeType = "";
    prevNode = null;

    iterators_int = {};
    iterators_gui = {};
    predicates = [];
    operations = [];
    sequences = {};
    variables = {};

    stats_n = 0;
    stats_it_moves = 0;
    stats_it_cmps = 0;
    stats_it_other_ops = 0;
    stats_pred_appls = 0;
    stats_operation_calls = 0;
    stats_swaps = 0;
    stats_assigments = 0;
    stats_moves = 0;
    stats_rel_distance = 0;
    stats_move_distance = 0;

    custom_stats = {};

}

function resetStats() {
    var hg_right_x_b = document.getElementById('hg-right-x-b');
    hg_right_x_b.innerHTML = '';
}

function updateState() {
    var hg_right_x_a = document.getElementById('hg-right-x-a');
    hg_right_x_a.innerHTML = '';

    for (var key in iterators_int) {
        // console.log(iterators_int[key]);
        var it = iterators_int[key];
        var data = it.data.data;
        // console.log(data)
        // var length = data.properties['length'];
        // var text = '<p id="Status">source(<b>' + key + '</b>) = ' + data.properties[it.index] + '</p>';

        var length = data.length;
        var text = '<p id="Status">source(<b>' + key + '</b>) = ' + data[it.index] + '</p>';

        hg_right_x_a.innerHTML += text;
    }
}

function updateStats() {
    var hg_right_x_b = document.getElementById('hg-right-x-b');
    hg_right_x_b.innerHTML = '';

    hg_right_x_b.innerHTML += '<p id="Status"><b>n</b>:                      ' + stats_n + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Iterator displacements</b>: ' + stats_it_moves + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Iterator comparisons</b>:   ' + stats_it_cmps + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Iterator other ops.</b>:    ' + stats_it_other_ops + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Pred/Rel applications</b>:  ' + stats_pred_appls + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Op. calls</b>:              ' + stats_operation_calls + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Swaps</b>:                  ' + stats_swaps + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Assignments</b>:            ' + stats_assigments + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Moves</b>:                  ' + stats_moves + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Distance Rel</b>:           ' + stats_rel_distance + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Distance Moves</b>:           ' + stats_move_distance + '</p>';

    for (var key in custom_stats) {
        // console.log(custom_stats[key]);
        hg_right_x_b.innerHTML += `<p id="Status"><b>${key}</b>: ${custom_stats[key]}</p>`;
    }
}

function subscript_digit(digit) {
    if (digit == '1') return '\u2081';
    if (digit == '2') return '\u2082';
    if (digit == '3') return '\u2083';
    if (digit == '4') return '\u2084';
    if (digit == '5') return '\u2085';
    if (digit == '6') return '\u2086';
    if (digit == '7') return '\u2087';
    if (digit == '8') return '\u2088';
    if (digit == '9') return '\u2089';

    return '\u2080';
}
function subscript(number) {
    // console.log(number)
    var nText = number.toString();
    var res = '';
    // for (var c in nText) {
    //     console.log(c)
    //     console.log(subscript_digit(c))
    //     res += subscript_digit(c);
    // }

    for (var i = 0; i < nText.length; i++) {
        var c = nText.charAt(i);
        // console.log(c)
        // console.log(subscript_digit(c))
        res += subscript_digit(c);
    }

    return res;
}

function clearLog() {
    // var hg_right_b_b = document.getElementById('hg-right-b-b');
    // hg_right_b_b.innerHTML = '';
    var hg_right_b_b_data = document.getElementById('hg-right-b-b-data');
    // hg_right_b_b_data.innerHTML = '';
    hg_right_b_b_data.value = '';
    // hg_right_b_b_data.value = subscript('1232');

    // console.log(hg_right_b_b_data.value);

    // var text = '\u2080';
    // // $('hg-right-b-b-data').val($('hg-right-b-b-data').val() + ' ' + text);

    // hg_right_b_b_data.value += text;
    // console.log(hg_right_b_b_data.value);
}

function addLog(text) {
    if (log_stats_enabled) {
        // var hg_right_b_b = document.getElementById('hg-right-b-b');
        // hg_right_b_b.innerHTML += '<p id="Status">' + text+ '</p>';
        var hg_right_b_b_data = document.getElementById('hg-right-b-b-data');
        // hg_right_b_b_data.innerHTML += text + '\n';
        hg_right_b_b_data.value += text + '\n';
    }
}


function serializeIterCompleteForLog(it) {
    const val = it.data.data[it.index] ? it.data.data[it.index] : '\u2205';
    return it.data.name + subscript(it.index) + '=' + val;
}

function serializeIterForLog(x) {
    return x.data.name + subscript(x.index);
}

function addLogEqual(a, b, res) {
    addLog('equal(' + serializeIterForLog(a) + ', ' + serializeIterForLog(b) + ') = ' + res);
}

function addLogSuccessor(it, step, res_it) {
    addLog('successor' + subscript(step) + '(' + serializeIterForLog(it) + ') = ' + serializeIterForLog(res_it) + '');
}

function addLogPredecessor(it, step, res_it) {
    addLog('predecessor' + subscript(step) + '(' + it.data.name + subscript(it.index) + ') = ' + serializeIterForLog(res_it)+ '');
}

function addLogSource(it, res) {
    addLog('source(' + serializeIterForLog(it) + ') = ' + res);
}

function addLogSink(it, x) {
    addLog('sink(' + serializeIterForLog(it) + ', ' + x + ')');
}

function addLogMove(x) {
    addLog('move(' + x + ')');
}

function addLogSwap(a, b) {
    addLog('swap(' + serializeIterForLog(a) + ', ' + serializeIterForLog(b) + ')');
}

function addLogPredicate(name, x, res) {
    addLog(name + '(' + x + ') = ' + res);
}

function addLogRelation(name, x, y, res) {
    addLog(name + '(' + x + ', ' + y + ') = ' + res);
}

function addLogBinaryOperation(name, x, y, res) {
    addLog(name + '(' + x + ', ' + y + ') = ' + res);
}

function addLogUnaryOperation(name, x, res) {
    addLog(name + '(' + x + ') = ' + res);
}



function updateStatus() {
    updateState();
    updateStats();
}

function resetStatus() {
    resetState();
    resetStats();
}

function showError(text) {
    var msg = '<p id="OutputMsg"><span style="color:red">ERROR: </span>' + text + '</p>';

    var output = document.getElementById('hg-right-y');
    output.innerHTML += msg;
    // hljs.highlightBlock(output);

    console.log(arguments.length ? text : '');
}

function fromInterpreterArray(array_par) {
    var length = array_par.properties['length'];
    if ( ! length) return undefined;

    var ret = [];
    for (let i = 0; i < length; ++i) {
        ret.push(array_par.properties[i]);
    }
    return ret;
}


function initFunctions(interpreter, scope) {

    // var alert_wrapper = function(text) {
    //     return alert(arguments.length ? text : '');
    // };


    var print_wrapper = function(text) {

        if (text instanceof Sequence) {
            text = "[" + text.data.join(", ") + "]";
        }

        var msg = '<p id="OutputMsg"><span style="color:cyan">INFO: </span>' + text + '</p>';

        var output = document.getElementById('hg-right-y');
        output.innerHTML += msg;
        // hljs.highlightBlock(output);

        // console.log(text);
        console.log(arguments.length ? text : '');
    };



    // var assign_it_wrapper = function(target, source) {
    //     var elements = target.data.elements;
    //     target = new Iterator(target.data, source.index, target.name);
    //     iterators_int[target.name] = target;
    //     moveIteratorTo(two, iterators_gui[target.name], elements[target.index])
    //     two.update();
    //     //TODO: Iterator Assignment/Copy
    //     // ++stats_it_moves;
    //     updateStatus();
    //     return target;
    // };


    var successor_wrapper = function(it_par, step_par = 1) {
        step = 0 + step_par;
        var data = it_par.data.data;
        var max = data.length;

        // console.log(it_par.index)
        if (it_par.index + step > max) {
            showError('out of range');
            disable('disabled');
            return;
        }

        var it = new Iterator(it_par.data, it_par.index + step, it_par.name, it_par.category);
        if (iterators_int[it.name]) {
            iterators_int[it.name] = it;
        }

        // console.log(`isSinglePass(it_par): ${isSinglePass(it_par)}`);
        if (isSinglePassStrict(it_par)) {
            clearStream(it_par, step);
        }

        if (log_stats_enabled) {
            if (isRandomAccess(it_par)) {
                ++stats_it_moves;
            } else {
                stats_it_moves += step;
            }
        }

        updateStatus();
        addLogSuccessor(it_par, step, it)
        return it;
    };

    var predecessor_wrapper = function (it_par, step_par = 1) {
        console.log(it_par);
        console.log(it_par.category);

        if ( ! isBidirectional(it_par)) {
            showError(`predecessor function is not defined for ${iteratorCategoryToString(it_par.category)} iterators`);
            disable('disabled');
            return;
        }

        step = 0 + step_par;
        // console.log(step_par)
        // console.log(step)
        if (it_par.index - step < 0) {
            showError('out of range');
            disable('disabled');
            return;
        }

        var it = new Iterator(it_par.data, it_par.index - step, it_par.name, it_par.category);
        if (iterators_int[it.name]) {
            iterators_int[it.name] = it;
        }

        if (log_stats_enabled) {
            if (isRandomAccess(it_par)) {
                ++stats_it_moves;
            } else {
                stats_it_moves += step;
            }
        }

        updateStatus();

        addLogPredecessor(it_par, step, it)
        return it;
    };

    var begin_wrapper = function(seq, name, color) {
        // console.log(seq)
        // console.log(seq.type)
        var index = 0
        // console.log(`begin_wrapper seq.type: ${seq.type}`);
        // console.log(`begin_wrapper cat: ${getIteratorCatetoryFromSeqType(seq.type)}`);

        var it = new Iterator(seq, index, null, getIteratorCatetoryFromSeqType(seq.type));
        updateStatus();
        return it;
    };

    var end_wrapper = function(seq, name, color) {
        var length = seq.data.length
        var index = length
        var it = new Iterator(seq, index, null, getIteratorCatetoryFromSeqType(seq.type));
        updateStatus();
        return it;
    };

    var size_wrapper = function(seq) {
        var length = seq.data.length
        return length;
    };

    var capacity_wrapper = function(seq) {
        var c = seq.capacity
        return c;
    };

    var increase_capacity_wrapper = function(seq, n) {
        var retobj = new Sequence(seq.name, seq.data, seq.elements, seq.colors, seq.capacity + n, seq.preds, seq.type, seq.drawChart);
        sequences[seq.name] = retobj;
        return retobj;
    };

    var push_back_wrapper = function(seq, x) {

        var cap = seq.capacity
        var data = seq.data;

        // console.log(data)
        // console.log(cap)

        if (cap == data.length) {
            ++cap;
        }

        data.push(x)

        // console.log(data)
        // console.log(cap)

        var retobj = new Sequence(seq.name, data, seq.elements, seq.colors, cap, seq.preds, seq.type, seq.drawChart);
        sequences[seq.name] = retobj;
        return retobj;
    };

    var source_value = function(it) {
        var data = it.data.data;
        var s = data[it.index];
        return s;
    };

    var register_rel_distance_wrapper = function (d) {
        if (log_stats_enabled) {
            stats_rel_distance += Math.abs(d);
        }
    };

    var register_move_distance_wrapper = function (d) {
        if (log_stats_enabled) {
            stats_move_distance += Math.abs(d);
        }
    };

    var register_custom_stat_wrapper = function (s) {
        custom_stats[s] = 0;
    };

    var increment_custom_stat_wrapper = function (s) {
        custom_stats[s] += 1;

        // if (log_stats_enabled) {
        //     stats_move_distance += Math.abs(d);
        // }
    };

    var source_wrapper = function (it) {
        var data = it.data.data;
        var max = data.length;

        if (it.index >= max) {
            showError('not valid iterator to take the source.');
            disable('disabled');
            return;
        }

        var s = data[it.index];
        addLogSource(it, s)

        //TODO
        // ++stats_pred_appls;
        // updateStatus();

        return s;
    };

    var source_move_wrapper = function(it) {
        var data = it.data.data;
        var max = data.length;

        if (it.index >= max) {
            showError('not valid iterator to take the source.');
            disable('disabled');
            return;
        }

        var s = data[it.index];
        data[it.index] = '_';
        addLogSource(it, s)
        addLogMove(s)

        if (log_stats_enabled) {
            ++stats_moves;
        }

        updateStatus();
        return s;
    };

    var sink_wrapper = function(it, x) {
        var data = it.data.data;
        var elements = it.data.elements;

        var max = data.length;
        if (it.index >= max) {
            showError('not valid iterator to take the source.');
            disable('disabled');
            return;
        }

        addLogSink(it, x)

        data[it.index] = x;
        elements[it.index].group.children[1].value = x;

        if (log_stats_enabled) {
            ++stats_assigments;
        }

        updateStatus();
        two.update();
    };

    var sink_move_wrapper = function(it, x) {
        var data = it.data.data;
        var elements = it.data.elements;

        var max = data.length;
        if (it.index >= max) {
            showError('not valid iterator to take the source.');
            disable('disabled');
            return;
        }

        addLogMove(x)
        addLogSink(it, x)

        data[it.index] = x;
        elements[it.index].group.children[1].value = x;

        if (log_stats_enabled) {
            ++stats_moves;
        }

        updateStatus();
        two.update();
    };

    var equal_wrapper = function(a, b) {
        // addLog('equal(' + a.index + ', ' + b.index + ')');
        // addLog('equal(' + a.data.name + ', ' + b.index + ')');

        if (log_stats_enabled) {
            ++stats_it_cmps;
        }

        updateStatus();
        var res = a.index == b.index;
        addLogEqual(a, b, res)
        return res;
    };

    var distance_wrapper = function(a, b) {
        var res = b.index - a.index;

        // console.log(a)
        // console.log(b)

        // console.log(`isRandomAccess(a): ${isRandomAccess(a)}`);
        // console.log(`isRandomAccess(b): ${isRandomAccess(b)}`);

        if (log_stats_enabled) {
            if (isRandomAccess(a)) {
                // console.log("RANDOM ACCESS");
                ++stats_it_other_ops;
            } else {
                // console.log("NON RANDOM ACCESS");
                stats_it_moves += Math.abs(res);
                stats_it_cmps += Math.abs(res) + 1;
            }
        }

        if (isSinglePassStrict(a)) {
            clearStream(a, Math.abs(res));
        }

        updateStatus();

        return res;
    };


    // var copy_it_wrapper = function(it, name, color) {

    //     if ( ! color) {
    //         // console.log(Object.keys(iterators_int).length)
    //         color = iterators_colors[Object.keys(iterators_int).length];
    //     }

    //     var index = it.index
    //     var it = new Iterator(it.data, it.index, name);
    //     var it_gui = drawIterator(two, it.data.elements[index], name, color);
    //     iterators_gui[name] = it_gui;
    //     iterators_int[name] = it;
    //     two.update();

    //     updateStatus();

    //     return it;
    // };

    // var remove_it_wrapper = function(it) {
    //     // console.log(iterators_gui[it.name]);
    //     two.remove(iterators_gui[it.name]);
    //     two.update();
    //     delete iterators_gui[it.name];
    //     delete iterators_int[it.name];
    //     updateStatus();
    // };


    // var move_wrapper = function(x) {
    //     addLogMove(x)
    //     ++stats_moves;
    //     return x;
    // };

    var iter_swap_wrapper = function(a, b) {
        var data_a = a.data.data;
        var data_b = b.data.data;
        // var colors_a = a.data.colors;
        // var colors_b = b.data.colors;

        // var tmp_color = colors_a[a.index];
        // colors_a[a.index] = colors_b[b.index];
        // colors_b[b.index] = tmp_color;

        var tmp = source_value(a);
        data_a[a.index] = source_value(b);
        data_b[b.index] = tmp;

        if (log_stats_enabled) {
            ++stats_swaps;
            stats_assigments += 3;
        }

        addLogSwap(a, b);
        updateStatus();
        two.update();
    };

    var g_rel_count = 0;
    var g_pred_count = 0;

    var callable_create_wrapper = function (f) {
        var codeAll = getAllCode();
        var codeSelected = codeAll.substring(f.node.start, f.node.end);

        // console.log(codeSelected)
        // console.log(f.node)
        // console.log(f.node.id)
        // console.log(f.node.params.length)

        if (f.node.id) {
            var name = f.node.id.name;
        } else {
            if (f.node.params.length == 1) {
                var name = "pred" + g_pred_count;
                ++g_pred_count;
            } else if (f.node.params.length == 2) {
                var name = "rel" + g_rel_count;
                ++g_rel_count;
            }
        }

        return {
            name: name,
            parameters: f.node.params.length,
            code: codeSelected
        };
    }

    var callable_get_code_wrapper = function (c) {
        return c.code;
    }

    var callable_get_name_wrapper = function (c) {
        return c.name;
    }

    var callable_get_parameters_wrapper = function (c) {
        return c.parameters;
    }

    var sequence_internal_wrapper = function(data_par, name, preds_par, type, drawChart) {
        // console.log(data_par)

        // console.log(`sequence_internal_wrapper preds_par: ${preds_par}`);
        // console.log(`sequence_internal_wrapper preds_par[0]: ${preds_par[0]}`);
        // console.log(`sequence_internal_wrapper preds_par[1]: ${preds_par[1]}`);
        // console.log(`preds_par.properties['length']: ${preds_par.properties['length']}`);

        if (sequences[name] != undefined) {
            showError('sequence "' + name + '" already exists.');
            disable('disabled');
            return null;
        }

        var colors = [];

        if (data_par) {
            var data = fromInterpreterArray(data_par);
        } else {
            var data = [];
        }
        stats_n += data.length;

        if (preds_par) {
            var preds = fromInterpreterArray(preds_par);
        } else {
            var preds = preds_par;
        }

        // console.log(`preds: ${preds}`);
        // console.log(`preds.length: ${preds.length}`);
        if ( ! preds || preds.length == 1) {
            // console.log(`inside IF`);
            preds = preds_par;
        }
        // console.log(`preds: ${preds}`);

        var elems = null;
        var retobj = new Sequence(name, data, elems, colors, undefined, preds, type, drawChart);
        sequences[name] = retobj;

        updateStatus();
        // two.update();

        // console.log(`retobj: ${retobj}`);
        return retobj;
    };


    // var set_predicate_wrapper = function(p) {

    //     // console.log(p.node.id.name);
    //     // interpreter.appendCode(p.node.id.name+'();');

    //     predicates.push(p);

    //     updateStatus();
    //     two.update();
    // };

    var log_predicate_call_internal_wrapper = function(name, x, res) {
        if (log_stats_enabled) {
            ++stats_pred_appls;
        }
        updateStatus();

        addLogPredicate(name, x, res);

        if (log_stats_enabled) {
            //TODO
            var hg_right_x_a = document.getElementById('hg-right-x-a');
            var text = '<p id="Status">' + name + '(' + x + ') = ' + res + '</p>';
            hg_right_x_a.innerHTML += text;
        }
    };

    var log_relation_call_internal_wrapper = function(name, x, y, res) {
        // console.log('log_relation_call_internal_wrapper')
        // console.log(name)
        // console.log(x)
        // console.log(y)
        // console.log(res)
        // console.log(log_stats_enabled)

        if (log_stats_enabled) {
            ++stats_pred_appls;
        }
        updateStatus();

        addLogRelation(name, x, y, res);

        if (log_stats_enabled) {
            //TODO
            var hg_right_x_a = document.getElementById('hg-right-x-a');
            var text = '<p id="Status">' + name + '(' + x + ', ' + y + ') = ' + res + '</p>';
            hg_right_x_a.innerHTML += text;
        }
    };

    var log_operation_call_internal_wrapper = function(name, x, y, res) {
        if (log_stats_enabled) {
            ++stats_operation_calls;
        }
        updateStatus();

        if (y) {
            addLogBinaryOperation(name, x, y, res);
        } else {
            addLogUnaryOperation(name, x, res);
        }

        if (log_stats_enabled) {
            //TODO
            var hg_right_x_a = document.getElementById('hg-right-x-a');

            if (y) {
                var text = '<p id="Status">' + name + '(' + x + ', ' + y + ') = ' + res + '</p>';
            } else {
                var text = '<p id="Status">' + name + '(' + x + ') = ' + res + '</p>';
            }

            hg_right_x_a.innerHTML += text;
        }
    };



    // var fill_elem_wrapper = function(data, i, c) {
    //     // var elements = data.elements;
    //     // let elem = elements[i];
    //     // elem.rect.fill = c;

    //     var colors = data.colors;
    //     colors[i] = c;
    // };

    var enable_log_stats_wrapper = function() {
        log_stats_enabled = true;
    };

    var disable_log_stats_wrapper = function() {
        log_stats_enabled = false;
    };

    var skip_debug_wrapper = function(name) {
        skipped.push(name);
        // console.log(skipped);
    };

    var range_bounded_wrapper = function(f, l) {
        return new RangeBounded(f, l);
    };

    var range_counted_wrapper = function(f, n) {
        return new RangeCounted(f, n);
    };

    // var log_f_wrapper = function() {
    //     // var myName = arguments.callee.toString();
    //     // console.log(name)
    //     // console.log(arguments)
    //     // var myName = arguments.caller;
    //     // console.log(arguments.caller);
    //     // console.log(arguments.caller.caller);
    //     // console.log(arguments.caller.caller.name);
    //     // console.log(4_wrapper.caller);
    //     // console.log(log_f_wrapper.caller.caller);
    //     // console.log(log_f_wrapper.caller.caller.name);
    //     // myName = myName.substr('function '.length);
    //     // myName = myName.substr(0, myName.indexOf('('));
    //     // console.log(myName);
    //     // addLog(myName)

    //     if (arguments.length == 0) return;

    //     to_print = arguments[0] + '(';

    //     for (var i = 1; i < arguments.length; ++i) {
    //         // console.log(arguments[i]);
    //         if (arguments[i] && arguments[i] instanceof Iterator) {
    //             if (i > 1) {
    //                 to_print += ', ';
    //             }
    //             to_print += serializeIterForLog(arguments[i]);
    //         }
    //     }

    //     to_print += ')';

    //     // console.log(to_print);
    //     addLog("-- start: " + to_print);
    //     return to_print
    // };

    var start_f_wrapper = function() {
        if (arguments.length == 0) return [false, undefined];
        if (g_disable_function_printing) return [false, undefined];

        g_disable_function_printing = true;
        var to_print = arguments[0] + '(';

        for (var i = 1; i < arguments.length; ++i) {
            if (arguments[i] && arguments[i] instanceof Iterator) {
                if (i > 1) {
                    to_print += ', ';
                }
                to_print += serializeIterCompleteForLog(arguments[i]);
            }
        }

        to_print += ')';
        addLog("-- start: " + to_print);
        return [true, to_print];
    };

    var end_f_wrapper = function(pars) {
        // alert(pars)
        if ( ! pars[0]) return;
        g_disable_function_printing = false;
        addLog("-- end: " + pars[1]);
    }

    // var array_from_wrapper = function(str) {
    //     return Array.from(str);
    // }

    var default_for_wrapper = function(arg, val) {
        return typeof arg !== 'undefined' ? arg : val;
    }

    // function defaultFor(arg, val) { return typeof arg !== 'undefined' ? arg : val; }





    // interpreter.setProperty(scope, 'alert',          interpreter.createNativeFunction(alert_wrapper));
    interpreter.setProperty(scope, 'print',          interpreter.createNativeFunction(print_wrapper));
    interpreter.setProperty(scope, 'successor',      interpreter.createNativeFunction(successor_wrapper));
    interpreter.setProperty(scope, 'next',           interpreter.createNativeFunction(successor_wrapper));
    interpreter.setProperty(scope, 'predecessor',    interpreter.createNativeFunction(predecessor_wrapper));
    interpreter.setProperty(scope, 'pred',           interpreter.createNativeFunction(predecessor_wrapper));
    interpreter.setProperty(scope, 'begin',          interpreter.createNativeFunction(begin_wrapper));
    interpreter.setProperty(scope, 'end',            interpreter.createNativeFunction(end_wrapper));
    interpreter.setProperty(scope, 'size',           interpreter.createNativeFunction(size_wrapper));
    interpreter.setProperty(scope, 'capacity',       interpreter.createNativeFunction(capacity_wrapper));
    interpreter.setProperty(scope, 'increase_capacity', interpreter.createNativeFunction(increase_capacity_wrapper));
    interpreter.setProperty(scope, 'push_back', interpreter.createNativeFunction(push_back_wrapper));

    interpreter.setProperty(scope, 'source',         interpreter.createNativeFunction(source_wrapper));
    interpreter.setProperty(scope, 'source_move',    interpreter.createNativeFunction(source_move_wrapper));
    interpreter.setProperty(scope, 'sink',           interpreter.createNativeFunction(sink_wrapper));
    interpreter.setProperty(scope, 'sink_move',      interpreter.createNativeFunction(sink_move_wrapper));
    interpreter.setProperty(scope, 'equal',          interpreter.createNativeFunction(equal_wrapper));
    interpreter.setProperty(scope, 'distance',       interpreter.createNativeFunction(distance_wrapper));
    // interpreter.setProperty(scope, 'move',           interpreter.createNativeFunction(move_wrapper));
    interpreter.setProperty(scope, 'register_rel_distance', interpreter.createNativeFunction(register_rel_distance_wrapper));
    interpreter.setProperty(scope, 'register_move_distance', interpreter.createNativeFunction(register_move_distance_wrapper));

    interpreter.setProperty(scope, 'register_custom_stat', interpreter.createNativeFunction(register_custom_stat_wrapper));
    interpreter.setProperty(scope, 'increment_custom_stat', interpreter.createNativeFunction(increment_custom_stat_wrapper));





    interpreter.setProperty(scope, 'iter_swap',      interpreter.createNativeFunction(iter_swap_wrapper));

    interpreter.setProperty(scope, 'sequence_internal',   interpreter.createNativeFunction(sequence_internal_wrapper));
    // interpreter.setProperty(scope, 'fill_elem',      interpreter.createNativeFunction(fill_elem_wrapper));
    interpreter.setProperty(scope, 'log_predicate_call_internal', interpreter.createNativeFunction(log_predicate_call_internal_wrapper));
    interpreter.setProperty(scope, 'log_relation_call_internal', interpreter.createNativeFunction(log_relation_call_internal_wrapper));
    interpreter.setProperty(scope, 'log_operation_call_internal', interpreter.createNativeFunction(log_operation_call_internal_wrapper));

    interpreter.setProperty(scope, 'enable_log_stats', interpreter.createNativeFunction(enable_log_stats_wrapper));
    interpreter.setProperty(scope, 'disable_log_stats', interpreter.createNativeFunction(disable_log_stats_wrapper));
    interpreter.setProperty(scope, 'skip_debug', interpreter.createNativeFunction(skip_debug_wrapper));

    interpreter.setProperty(scope, 'range_bounded', interpreter.createNativeFunction(range_bounded_wrapper));
    interpreter.setProperty(scope, 'range_counted', interpreter.createNativeFunction(range_counted_wrapper));


    interpreter.setProperty(scope, 'start_f', interpreter.createNativeFunction(start_f_wrapper));
    interpreter.setProperty(scope, 'end_f', interpreter.createNativeFunction(end_f_wrapper));


    interpreter.setProperty(scope, 'callable_create', interpreter.createNativeFunction(callable_create_wrapper));
    interpreter.setProperty(scope, 'callable_get_code', interpreter.createNativeFunction(callable_get_code_wrapper));
    interpreter.setProperty(scope, 'callable_get_name', interpreter.createNativeFunction(callable_get_name_wrapper));
    interpreter.setProperty(scope, 'callable_get_parameters', interpreter.createNativeFunction(callable_get_parameters_wrapper));

    // interpreter.setProperty(scope, 'array_from_internal', interpreter.createNativeFunction(array_from_internal_wrapper));

    interpreter.setProperty(scope, 'default_for', interpreter.createNativeFunction(default_for_wrapper));
}

// function bind(r, value, arg=0) {
//     if (arg == 0)
//         return function(x) { return r(value, x);};

//     return function(x) { return r(x, value);};
// }


// function bind(r, value) {
//     return function(x) { return r(value, x);};
// }




function callPredCode() {
    return '';

    // var res = '' +
    //     // + 'function predicate(p, name) {return function(x) {return log_predicate_call(p, name, x);};}\n'
    //     // + 'function log_relation_call(r, name, x, y){var res = r(x, y); log_relation_call_internal(name, x, y, res); return res;}\n'

    //     + 'function complement(_r) {var _cr = function(x, y) { return !_r.inner_relation(x, y); };var code = "(function complement_of_" + _r.inner_name + "(x, y) {return log_relation_call(_cr, \\"\\u00AC" + _r.inner_name + "\\", x, y);})";var func = eval(code);func.inner_relation = _cr;func.inner_name = "\\u00AC" + _r.inner_name;return func;}\n'
    //     + 'function converse(_r) {var _cr = function(x, y) { return _r.inner_relation(y, x); };var code = "(function converse_of_" + _r.inner_name + "(x, y) {return log_relation_call(_cr, \\"" + _r.inner_name + "\\", y, x);})";var func = eval(code);func.inner_relation = _cr;return func;}\n'

    //     //  + 'function bind(r, value, arg=0) {if (arg == 0) return function(x) { return r(value, x);}; return function(x) { return r(x, value);};}\n'
    //     + 'function bind(r, value, arg) {return function(x) { return r(value, x);};}\n'

    //     + 'function random_int(from, to) {if ( ! from) from = 0;if ( ! to) to = 99;return Math.floor(Math.random() * to) + from;}\n';
    //     //  + 'function array_random(n, from, to) {if ( ! n) n = 10;if ( ! from) from = 0;if ( ! to) to = 99;var res = []; while (n != 0) { var rand = Math.floor(Math.random() * to) + from; res.push(rand); --n;} return res; }\n';

    // res += `
    // function log_relation_call(r, name, x, y) {
    //     var res = r(x, y);
    //     log_relation_call_internal(name, x, y, res);
    //     return res;
    // }`;

    return res;
}

function addSequenceCode() {
    return `

    function __standardSequenceType(type) {
        if (type === "array") {
            return "array";
        } else if (type === "list" || type === "sll") {
            return "sll";
        } else if (type === "double" || type === "dll") {
            return "dll";
        } else if (type === "stream" || type === "buffer") {
            return "stream";
        }
        return undefined;
    }

    function sequence(d, n, p, type, drawChart) {
        type = typeof type !== 'undefined' ? type : "array";
        type = __standardSequenceType(type);
        drawChart = typeof drawChart !== 'undefined' ? drawChart : false;
        return sequence_internal(d, n, p, type, drawChart);
    }

`

    // return `
    // function sequence(d, n, p) {
    //     // disable_log_stats();
    //     var obj = sequence_internal(d, n, p);

    //     // if ( ! obj) {enable_log_stats(); return obj;}
    //     // if (p) {
    //     //     for (var i = 0; i < d.length; ++i) {
    //     //         var value = d[i];
    //     //         if ( ! p(value)) {
    //     //             fill_elem(obj, i, "#ff9191");
    //     //             //obj.colors[i] = "#ff9191";
    //     //         }
    //     //     }
    //     // }
    //     // enable_log_stats();
    //     return obj;
    // }`

}

function add_utils_lib() {
    // var res = '' +
    //     // 'function log_predicate_call(p, name, x){var res = p(x); log_predicate_call_internal(name, x, res); return res;};\n'
    //     // + 'function predicate(p, name) {return function(x) {return log_predicate_call(p, name, x);};}\n'
    //     // + 'function log_relation_call(r, name, x, y){var res = r(x, y); log_relation_call_internal(name, x, y, res); return res;}\n'

    //     + 'function complement(_r) {var _cr = function(x, y) { return !_r.inner_relation(x, y); };var code = "(function complement_of_" + _r.inner_name + "(x, y) {return log_relation_call(_cr, \\"\\u00AC" + _r.inner_name + "\\", x, y);})";var func = eval(code);func.inner_relation = _cr;func.inner_name = "\\u00AC" + _r.inner_name;return func;}\n'
    //     + 'function converse(_r) {var _cr = function(x, y) { return _r.inner_relation(y, x); };var code = "(function converse_of_" + _r.inner_name + "(x, y) {return log_relation_call(_cr, \\"" + _r.inner_name + "\\", y, x);})";var func = eval(code);func.inner_relation = _cr;return func;}\n'

    //     //  + 'function bind(r, value, arg=0) {if (arg == 0) return function(x) { return r(value, x);}; return function(x) { return r(x, value);};}\n'
    //     + 'function bind(r, value, arg) {return function(x) { return r(value, x);};}\n'

    //     + 'function random_int(from, to) {if ( ! from) from = 0;if ( ! to) to = 99;return Math.floor(Math.random() * to) + from;}\n';
    //     //  + 'function array_random(n, from, to) {if ( ! n) n = 10;if ( ! from) from = 0;if ( ! to) to = 99;var res = []; while (n != 0) { var rand = Math.floor(Math.random() * to) + from; res.push(rand); --n;} return res; }\n';


    return `
    function callable(f, type) {
        var c = callable_create(f);
        var fname = callable_get_name(c);
        var params = callable_get_parameters(c);

        if (type == "relation") {
            var wrapped_func = function(x, y) {
                var res = f(x, y);
                log_relation_call_internal(fname, x, y, res);
                return res;
            };
        } else if (type == "binary_operation") {
            var wrapped_func = function(x, y) {
                var res = f(x, y);
                log_operation_call_internal(fname, x, y, res);
                return res;
            };
        } else if (type == "unary_operation") {
            var wrapped_func = function(x) {
                var res = f(x);
                log_operation_call_internal(fname, x, undefined, res);
                return res;
            };
        } else if (type == "predicate") {
            var wrapped_func = function(x) {
                var res = f(x);
                log_predicate_call_internal(fname, x, res);
                return res;
            };
        }

        // if (params == 2) {
        //     var wrapped_func = function(x, y) {
        //         var res = f(x, y);
        //         log_relation_call_internal(fname, x, y, res);
        //         return res;
        //     };
        // } else if (params == 1) {
        //     var wrapped_func = function(x) {
        //         var res = f(x);
        //         log_predicate_call_internal(fname, x, res);
        //         return res;
        //     };
        // }
        wrapped_func.inner_callable = c;
        wrapped_func.inner_function = f;
        wrapped_func.inner_name = fname;
        wrapped_func.inner_code = callable_get_code(c);
        wrapped_func.inner_parameters = params;
        return wrapped_func;
    }
    function relation(f) {
        return callable(f, "relation");
    }
    function predicate(f) {
        return callable(f, "predicate");
    }
    function binary_operation(f) {
        return callable(f, "binary_operation");
    }
    function unary_operation(f) {
        return callable(f, "unary_operation");
    }
    function bind(r, value, arg) {
        return function(x) {
            return r(value, x);
        };
    }
    function call(r, it0, it1) {
        var d = distance(it0, it1);
        register_rel_distance(d);
        return r(source(it0), source(it1));
    }
    function array_random(n, from, to) {
        if ( ! n) n = 10;
        if ( ! from) from = 0;
        if ( ! to) to = 99;
        var res = [];
        while (n != 0) {
            var rand = Math.floor(Math.random() * to) + from;
            res.push(rand);
            --n;
        } return res;
    }
    function array_all_equal(n, x) {
        if ( ! n) n = 10;
        if ( ! x) x = 1;
        var res = [];
        while (n != 0) {
            res.push(x);
            --n;
        }
        return res;
    }
    function array_ascending(n, from) {
        if ( ! n) n = 10;
        if ( ! from) from = 0;
        var res = [];
        while (n != 0) {
            res.push(from);
            ++from;
            --n;
        }
        return res;
    }
    function array_descending(n, from) {
        if ( ! n) n = 10;
        if ( ! from) from = n - 1;
        var res = [];
        while (n != 0) {
            res.push(from);
            --from;
            --n;
        }
        return res;
    }
    function array_from(str) {
        var res = [];
        for (var i = 0; i < str.length; ++i) {
            res.push(str[i]);
        }
        return res;
    }
    function random_int(from, to) {
        if ( ! from) from = 0;
        if ( ! to) to = 99;
        return Math.floor(Math.random() * to) + from;
    }
    `;
}


function sort_keys(dict) {
    var sorted = [];
    for(var key in dict) {
        sorted[sorted.length] = key;
    }
    return sorted.sort();
}

function getFunction(name) {
    var libs = add_std_lib_dict();
    var res = libs[name];
    if (res) {
        return "\n\n\n" + res;
    }
    return '';
}


function fillStdLib() {
    // var str = fillCatalogRecursive('', categories);
    // str += '<li class="linested"><span class="caret">' + 'Uncatalogued' + '</span><ul class="nested">';
    // snippets = getUncataloguedSnippets();

    var libs = add_std_lib_dict();
    var keys = sort_keys(libs);
    var str = '';

    for(var i = 0; i < keys.length; ++i) {
        str += '<li><a href="/algorithms?function=' + keys[i] + '">[' + keys[i] + ']</a></li>';
    }

    // for (var key in libs) {
    //     str += '<li><a href="/algorithms?function=' + key + '">[' + key + ']</a></li>';
    // }
    str +=  '</ul></li>';

    var list = document.getElementById('list');
    list.innerHTML = str;
}


function add_std_lib_prepare_code(code_lines) {
    var res = []
    for (var i = 0; i < code_lines.length; ++i) {
        if (!code_lines[i].includes('start_f') && !code_lines[i].includes('end_f')) {
            res.push(code_lines[i]);
        }
    }

    return res.join('\n');
}

function add_std_lib_get_function_name(e) {
    var code = e.trim();
    var lines = code.split("\n");
    if (lines.length == 0) return undefined;
    if ( ! lines[0].startsWith('function')) return undefined;

    var parens = lines[0].indexOf('(');
    if (parens < 0) return undefined;

    var res = lines[0].substring('function'.length, parens).trim();
    // return { key: res, value: code };
    return { key: res, value: add_std_lib_prepare_code(lines) };
}

function add_std_lib_dict_temp() {
    var list = add_std_lib_array();
    var res = {};
    for (var i = 0; i < list.length; ++i) {
        var data = add_std_lib_get_function_name(list[i]);
        if (data != undefined) {
            res[data.key] = data.value;
        }
    }
    return res;
}

function add_std_lib_dict() {
    var dict = add_std_lib_dict_temp();

    var res = {};
    for (var key in dict) {
        if (key.includes("_internal")) continue;

        if ((key + "_internal") in dict) {
            res[key] = dict[key + "_internal"].replace(key + "_internal", key);
        } else {
            res[key] = dict[key];
        }
    }
    return res;
}

// --------------------------------------------------------------------

// async function add_std_lib_async() {
//     try {
//         // const response = await fetch(`https://api.github.com/repos/${user}/${repo}/contents/algorithms/`);
//         var url = `https://raw.githubusercontent.com/${user}/${repo}/master/build/algorithms_debug.js`;
//         console.log(url);
//         const response = await fetch(url);
//         const code = await response.text();
//         return code;
//     } catch(e) {console.log(e);}
// }

function add_std_lib() {
    // console.log("calling add_std_lib()");
    // console.log(global_std_code);
    return global_std_code_debug;

    // var code = (async function(){
    //     return await add_std_lib_async();
    //     // alert(fetchData);
    // })();
    // console.log(code);
    // return code;
}

// --------------------------------------------------------------------


// function add_std_lib() {
//     return add_std_lib_array().join('\n');
// }

// function add_std_lib_array() {
//     return [`
// function min_element(f, l, r) {
//     var _f_ = start_f('min_element', f, l, r);
//     if (equal(f, l)) return l;

//     var m = f;
//     f = successor(f);

//     while ( ! equal(f, l)) {
//         if (r(source(f), source(m))) {
//             m = f;
//         }
//         f = successor(f);
//     }
//     end_f(_f_);
//     return m;
// }`, `
// function min_element_nonempty(f, l, r) {
//     var _f_ = start_f('min_element_nonempty', f, l, r);
//     var m = f;
//     f = successor(f);
//     while ( ! equal(f, l)) {
//         if (r(source(f), source(m))) {
//             m = f;
//         }
//         f = successor(f);
//     }
//     end_f(_f_);
//     return m;
// }`, `
// function min_value_nonempty(f, l, r) {
//     var _f_ = start_f('min_value_nonempty', f, l, r);
//     var m = source(f);
//     f = successor(f);
//     while ( ! equal(f, l)) {
//         if (r(source(f), m)) {
//             m = source(f);
//         }
//         f = successor(f);
//     }
//     end_f(_f_);
//     return m;
// }`, `
// function is_sorted_internal(f, l, r) {
//     var _f_ = start_f('is_sorted', f, l, r);
//     if (equal(f, l)) return true;
//     var n = successor(f);
//     while ( ! equal(n, l)) {
//         if (r(source(n), source(f))) return false;
//         f = n;
//         n = successor(n);
//     }
//     return true;
// }`, `
// function is_sorted(f, l, r) {
//     var _f_ = start_f('is_sorted', f, l, r);
//     var res = is_sorted_internal(f, l, r);
//     end_f(_f_);
//     return res;
// }`, `
// function move_backward(f_i, l_i, l_o) {
//     var _f_ = start_f('move_backward', f_i, l_i, l_o);
//     while (! equal(f_i, l_i)) {
//         l_i = predecessor(l_i);
//         l_o = predecessor(l_o);
//         sink_move(l_o, source(l_i));
//     }
//     end_f(_f_);
//     return l_o;
// }`, `
// function rotate_right_by_one_nonempty(f, l) {
//     var _f_ = start_f('rotate_right_by_one_nonempty', f, l, r);
//     var butlast = predecessor(l);
//     var x = source_move(butlast);
//     move_backward(f, butlast, l);
//     sink_move(f, x);
//     end_f(_f_);
// }`, `
// function shift_right_while_unguarded(l, p) {
//     var _f_ = start_f('shift_right_while_unguarded', l, r);
//     while (p(source(predecessor(l)))) {
//         sink_move(l, source_move(predecessor(l)));
//         l = predecessor(l);
//     }
//     end_f(_f_);
//     return l;
// }`, `
// var eq = relation(function eq(x, y) {return x == y;});
// var lt = relation(function lt(x, y) {return x < y;});
// var gt = relation(function gt(x, y) {return x < y;});
// var lte = relation(function lte(x, y) {return x <= y;});
// var gte = relation(function gte(x, y) {return x >= y;});
// `];

//     // `function iota(f, l, start, step) {
//     //     if ( ! start) start = 0;
//     //     if ( ! step) step = 1;

//     //     while ( ! equal(f, l)) {
//     //         sink(f, start);
//     //         start += step;
//     //         f = successor(f);
//     //     }
//     //     return start;
//     // }`
// }

function std_lib_attributes() {

    return {
        min_element: {
            category: ['Selection', 'Stable'],
            complexity: 'n - 1 comparisons',
            "type requirements": ['f, l: I: Iterator \u2227 Readable',
                                  'r: R: StrictWeakOrdering relation',
                                  'Domain(R) = ValueType(I)'],
            precondition: 'readable_bounded_range(f, l)',
            postcondition: 'source(m) = stable_sort_copy(f, l, r)[0]',
        },
        min_element_nonempty: {
            category: ['Selection', 'Stable'],
            complexity: 'n - 1 comparisons',
            "type requirements": ['f, l: I: Iterator \u2227 Readable',
                                  'r: R: StrictWeakOrdering relation',
                                  'Domain(R) = ValueType(I)'],
            precondition: 'f != l \u2227 readable_bounded_range(f, l)',
            postcondition: 'source(m) = stable_sort_copy(f, l, r)[0]',
        },
        min_value_nonempty: {
            category: ['Selection', 'Stable'],
            complexity: 'n - 1 comparisons',
            "type requirements": ['f, l: I: Iterator \u2227 Readable',
                                  'r: R: StrictWeakOrdering relation',
                                  'Domain(R) = ValueType(I)'],
            precondition: 'f != l \u2227 readable_bounded_range(f, l)',
            postcondition: 'm = stable_sort_copy(f, l, r)[0]',
        },
        is_sorted: {
            category: 'Selection',
            complexity: 'n - 1',
            precondition: '',
            postcondition: '',
        },
        move_backward: {
            category: 'Selection',
            complexity: 'n - 1',
            precondition: '',
            postcondition: '',
        },
        rotate_right_by_one_nonempty: {
            category: 'Selection',
            complexity: 'n - 1',
            precondition: '',
            postcondition: '',
        },
        shift_right_while_unguarded: {
            category: 'selection',
            complexity: 'n - 1',
            precondition: '',
            postcondition: '',
        },
    };
}




function invisibleCode() {
    return callPredCode() + addSequenceCode() + add_std_lib() + add_utils_lib();
}


function getAllCode() {
    // var dataCodeText = document.getElementById('dataCodeArea').value;
    // var codeText = document.getElementById('codeArea').value;
    // return dataCodeText + '\n' + codeText;

    return invisibleCode() + document.getElementById('codeArea').value;
}

function getViewCode() {
    // var dataCodeText = document.getElementById('dataCodeArea').value;
    // var codeText = document.getElementById('codeArea').value;
    // return dataCodeText + '\n' + codeText;

    return document.getElementById('codeArea').value;
}


// function paint_data_pred(interpreter, p, data) {

//     for (let index = 0; index < elements.length - 1; ++index) {
//         let value = data[index];
//         let elem = elements[index];

//         // console.log(value)
//         // console.log(elem)
//         // console.log(p)
//         // interpreter.appendCode(p.node.id.name+'();');
//         var code = 'if ( ! ' + p.node.id.name+'(' + value + ')) { fill_elem(' + index + ', "#ff9191"); }';
//         // console.log(code);
//         interpreter.appendCode(code);

//         // if ( ! p(value)) {
//         //     elem.rect.fill = '#ff9191';
//         // }
//     }
// }


function editButton() {
    // document.getElementById('dataCodeArea').style.display = "inline";
    document.getElementById('codeArea').style.display = "inline";
    document.getElementById('codeHighlightPre').style.display = "none";

    document.getElementById('startButton').style.display = "inline";
    document.getElementById('stepButton').style.display = "none";
    document.getElementById('editButton').style.display = "none";
    document.getElementById('restartButton').style.display = "none";

    var output = document.getElementById('hg-right-y');
    output.innerHTML = '';

    var hg_right_x_a = document.getElementById('hg-right-x-a');
    // console.log(hg_right_x_a.innerHTML);
    hg_right_x_a.innerHTML = '';

    clearLog();

    two.clear();
}

function restartButton() {
    // document.getElementById('dataCodeArea').style.display = "inline";
    document.getElementById('codeArea').style.display = "inline";
    document.getElementById('codeHighlightPre').style.display = "none";

    document.getElementById('startButton').style.display = "inline";
    document.getElementById('stepButton').style.display = "none";
    document.getElementById('editButton').style.display = "none";
    document.getElementById('restartButton').style.display = "none";

    var output = document.getElementById('hg-right-y');
    output.innerHTML = '';

    var hg_right_x_a = document.getElementById('hg-right-x-a');
    hg_right_x_a.innerHTML = '';

    clearLog();

    resetStatus();
    two.clear();


    if (myChart) {
        // myChart.clear();
        // myChart.data = {};
        myChart.data.datasets.length = 0;
        myChart.update();
    }

    startButton();



}


function startButton() {
    var codeAll = getAllCode();
    console.log(codeAll);
    var codeView = getViewCode();

    // document.getElementById('dataCodeArea').style.display = "none";
    document.getElementById('codeArea').style.display = "none";
    document.getElementById('codeHighlightPre').style.display = "block";

    document.getElementById('startButton').style.display = "none";
    document.getElementById('stepButton').style.display = "inline";
    document.getElementById('editButton').style.display = "inline";
    document.getElementById('restartButton').style.display = "inline";

    var output = document.getElementById('hg-right-y');
    output.innerHTML = '';

    var hg_right_x_a = document.getElementById('hg-right-x-a');
    hg_right_x_a.innerHTML = '';

    clearLog();

    two.clear();
    resetStatus();

    var codeHighlight = document.getElementById('codeHighlight');
    codeHighlight.innerHTML = codeView;
    hljs.highlightBlock(codeHighlight);
    codeHighlight.style.fontSize = "12pt";

    try {
        myInterpreter = new Interpreter(codeAll, initFunctions);
        disable('');
        updateStatus();
    } catch (error) {
        editButton();
        showError("parsing error");
    }
}

function showFunction() {
    var codeAll = getAllCode();
    var codeView = getViewCode();

    // document.getElementById('dataCodeArea').style.display = "none";
    document.getElementById('codeArea').style.display = "none";
    document.getElementById('codeHighlightPre').style.display = "block";


    document.getElementById('startButton').style.display = "none";
    document.getElementById('stepButton').style.display = "none";
    document.getElementById('editButton').style.display = "none";
    document.getElementById('restartButton').style.display = "none";

    var output = document.getElementById('hg-right-y');
    output.innerHTML = '';

    var hg_right_x_a = document.getElementById('hg-right-x-a');
    hg_right_x_a.innerHTML = '';

    clearLog();

    two.clear();
    resetStatus();

    var codeHighlight = document.getElementById('codeHighlight');
    codeHighlight.innerHTML = codeView;
    hljs.highlightBlock(codeHighlight);
    codeHighlight.style.fontSize = "20pt";

    document.getElementById('hg-left').style.width = "50%";
    document.getElementById('hg-left').style.maxWidth = "50%";
}

function pad_end_nbsp(targetLength, str) {
    var n = targetLength - str.length
    if (n <= 0) return str;

    while (n != 0) {
        str += "&nbsp;"
        --n;
    }
    return str;
}

function array_to_str(key, arr, maxKeyLen) {
    if (arr.length == 0) return '';

    var str = `<p id="Attribute"><b>${pad_end_nbsp(maxKeyLen, key + ":")}</b> <code>${arr[0]}</code></p>`;

    for (let i = 1; i < arr.length; ++i) {
        const e = arr[i];
        console.log(e);
        str += `<p id="Attribute"><b>${pad_end_nbsp(maxKeyLen, "")}</b> <code>${arr[i]}</code></p>`;
        // // hg_right_a.innerHTML += `<p id="Attribute"><b>${pad_end_nbsp(maxKeyLen, key + ":")}</b><code>${value}</code></p>`;
    }

    return str;
}

function showFunctionAttributes(function_name) {
    var hg_right_a = document.getElementById('hg-right-a');
    // hg_right_a.innerHTML = '';
    hg_right_a.innerHTML = `<p id="Attribute"><b>Algorithm attributes</b>:</p>`;
    hg_right_a.innerHTML += `<p id="Attribute">&nbsp;</p>`;

    var attrs = std_lib_attributes()[function_name];
    var maxKeyLen = 0;
    for (var key in attrs) {
        if (key.length > maxKeyLen) maxKeyLen = key.length;
    }

    ++maxKeyLen;
    for (var key in attrs) {
        // console.log(attrs[key]);

        var value = attrs[key];

        if (value && value instanceof Array) {
            value = array_to_str(key, value, maxKeyLen);
            hg_right_a.innerHTML += value;
        } else {
            hg_right_a.innerHTML += `<p id="Attribute"><b>${pad_end_nbsp(maxKeyLen, key + ":")}</b> <code>${value}</code></p>`;
        }
    }

    hg_right_a.innerHTML += `<p id="Attribute">&nbsp;</p>`;
    hg_right_a.innerHTML += `<p id="Attribute">&nbsp;</p>`;
    hg_right_a.innerHTML += `<p id="Attribute"><a href="/algorithms?snippet=${function_name}">Click here to see an example!</a></p>`;
}



function addVariable(name, value, seqn) {

    var initTop = defaultTopMargin + seqn * sequenceTotalHeight;

    var elems = drawVariable(two, name, value, initTop);

    var retobj = {
        name: name,
        value: value,
        elements: elems
    };

    variables[name] = retobj;
}

function find_ranges(scope) {

    if (scope == null) return [];

    var res = find_ranges(scope.parentScope);
    var keys = Object.keys(scope.properties).sort();

    for (var x in keys) {
        var key = keys[x];
        var value = scope.properties[key];
        if (value && value instanceof RangeCounted) {
            // console.log(value)
            res.push(value);
        } else if (value && value instanceof RangeBounded) {
            res.push(value);
        }
    }
    return res;
}


var prevScopeOrder = [];

function scopeComparer(a, b) {
    var ai = prevScopeOrder.indexOf(a);
    var bi = prevScopeOrder.indexOf(b);

    if (ai == -1 && bi == -1) return 0;
    if (ai == -1 && bi != -1) return 1;
    if (ai != -1 && bi == -1) return -1;

    // console.log(a)
    // console.log(b)
    // console.log(ai)
    // console.log(bi)

    if (ai < bi) return -1;
    if (ai == bi) return 0;
    return 1;
}

function scopeOrder(scope) {

    var res = [];

    var reserved = ['arguments', 'this', 'undefined', 'NaN', 'Infinity',
        'Array', 'Boolean','Date', 'Error', 'EvalError', 'Function',
        'JSON', 'Math', 'Number', 'Object', 'RangeError', 'ReferenceError',
        'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError',
        'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'self',
        'window',
        'sequence', 'sequence_internal', 'alert', 'assign_it',
        'begin', 'log_predicate_call_internal', 'log_relation_call',
        'log_relation_call_internal', 'log_operation_call_internal', 'copy_it', 'disable_log_stats', 'enable_log_stats',
        'end',  'equal', 'find_if', 'sink', 'source', 'successor', 'remove_it',
        'print', 'array_random', 'array_all_equal', 'array_ascending', 'array_descending',
        'relation', 'iter_swap', 'predecessor', 'predicate', 'operation'];

    // 'fill_elem'

    variables = [];

    // var ranges = find_ranges(scope);


    // var keys = Object.keys(scope.properties).sort();
    var keys = Object.keys(scope.properties);

    for (var x in keys) {
        var key = keys[x];
        if ( ! reserved.includes(key)) {
            var value = scope.properties[key];
            if (value && value instanceof Sequence) {
                res.push(key);
            }
        }
    }

    for (var x in keys) {
        var key = keys[x];
        if ( ! reserved.includes(key)) {
            var value = scope.properties[key];
            if (value && value instanceof Iterator) {
                res.push(key);
            }
        }
    }

    for (var x in keys) {
        var key = keys[x];

        if ( ! reserved.includes(key)) {
            var value = scope.properties[key];

            if (value != undefined) {

                if (value instanceof Sequence) {
                } else if (value instanceof Iterator) {
                } else if (value instanceof RangeBounded) {
                } else if (value instanceof RangeCounted) {
                } else if (value instanceof Interpreter.Object) {
                } else {
                    res.push(key);
                }

                // if ( ! value.class) {
                //     addVariable(key, value, seqn);
                // }
            } else {
                // console.log(key);
                // console.log(value);
                // addVariable(key, value, seqn);
            }
        }
    }

    // console.log(res);
    res.sort(scopeComparer);

    return res;
}


function scopePairComparer(a, b) {

    // console.log(a)
    // console.log(b)

    var ai = prevScopeOrder.indexOf(a.key);
    var bi = prevScopeOrder.indexOf(b.key);

    if (ai == -1 && bi == -1) return 0;
    if (ai == -1 && bi != -1) return 1;
    if (ai != -1 && bi == -1) return -1;

    // console.log(a)
    // console.log(b)
    // console.log(ai)
    // console.log(bi)

    if (ai < bi) return -1;
    if (ai == bi) return 0;
    return 1;
}

// function alert2(n, its_internal) {
//     var s = "------------- " + n + '\n';
//     for (var i in its_internal) {
//         var key = its_internal[i].key;
//         var value = its_internal[i].value;
//         s += key + " - " + value.name + "\n";
//     }
//     alert(s);
// }

function drawScope(scope) {
    // console.log(scope.properties);
    prevScopeOrder = scopeOrder(scope);
    // console.log(prevScopeOrder);


    var reserved = ['arguments', 'this', 'undefined', 'NaN', 'Infinity',
        'Array', 'Boolean','Date', 'Error', 'EvalError', 'Function',
        'JSON', 'Math', 'Number', 'Object', 'RangeError', 'ReferenceError',
        'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError',
        'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'self',
        'window',
        'sequence', 'sequence_internal', 'alert', 'assign_it',
        'begin', 'log_predicate_call_internal', 'log_relation_call',
        'log_relation_call_internal', 'log_operation_call_internal', 'copy_it', 'disable_log_stats', 'enable_log_stats',
        'end',  'equal', 'find_if', 'sink', 'source', 'successor', 'remove_it',
        'print', 'array_random', 'array_all_equal', 'array_ascending', 'array_descending',
        'relation', 'iter_swap', 'predecessor', 'predicate', 'operation'];

        // 'fill_elem'

    // console.clear();
    two.clear();
    variables = [];

    var ranges = find_ranges(scope);
    // console.log(r);

    // console.log(two.width);

    // console.log(scope.properties);

    // var keys = Object.keys(scope.properties).sort();
    var keys = Object.keys(scope.properties);

    // First Sequences

    var seq_internal = [];
    var its_internal = [];
    var vars_internal = [];

    for (var x in keys) {
        var key = keys[x];
        if ( ! reserved.includes(key)) {
            var value = scope.properties[key];
            if (value && value instanceof Sequence) {
                seq_internal.push({key: key, value: value});
            }
        }
    }



    // console.log(keys)
    for (var x in keys) {
        var key = keys[x];
        if ( ! reserved.includes(key)) {
            var value = scope.properties[key];
            if (value && value instanceof Iterator) {
                // console.log(key)
                // console.log(value)
                // console.log(its_internal)
                its_internal.push({key: key, value: new Iterator(value.data, value.index, value.name)});

                // console.log(its_internal)
            }
        }
    }

    // if (its_internal.length >= 2) {
    //     console.log("----------- 1")
    //     console.log(its_internal)
    //     alert2(1, its_internal)
    // }

    its_internal.sort(scopePairComparer);

    // if (its_internal.length >= 2) {
    //     console.log("----------- 2")
    //     console.log(its_internal)

    //     alert2(2, its_internal)
    // }

    for (var i in its_internal) {
        var key = its_internal[i].key;
        var value = its_internal[i].value;

        var found = seq_internal.find(function(x) {
            return x.value && x.value.name == value.data.name;
        });

        if ( ! found) {
            seq_internal.push({key: value.data.name, value: value.data});
        }

    }
    // for (var x in keys) {
    //     var key = keys[x];
    //     if ( ! reserved.includes(key)) {
    //         var value = scope.properties[key];
    //         if (value && value instanceof Iterator) {

    //             var found = seq_internal.find(function(x) {
    //                 return x.value && x.value.name == value.data.name;
    //             });

    //             if ( ! found) {
    //                 seq_internal.push({key: value.data.name, value: value.data});
    //             }
    //         }
    //     }
    // }


    seq_internal.sort(scopePairComparer);

    var seqn = 0;
    for (var i in seq_internal) {
        var key = seq_internal[i].key;
        var value = seq_internal[i].value;
        // console.log(value);

        if (value.type === "array") {
            var elems = drawArray(two, myChart, key, seqn, value.data, value.capacity, value.preds, value.drawChart);
        } else if (value.type === "sll") {
            var elems = drawSingleLinkedList(two, myChart, key, seqn, value.data, value.capacity, value.preds, value.drawChart);
        } else if (value.type === "dll") {
            var elems = drawDoubleLinkedList(two, myChart, key, seqn, value.data, value.capacity, value.preds, value.drawChart);
        } else if (value.type === "stream") {
            var elems = drawSingleLinkedList(two, myChart, key, seqn, value.data, value.capacity, value.preds, value.drawChart);
        } else {
            showError('invalid sequence type');
            disable('disabled');
            return;
        }

        sequences[value.name].elements = elems;
        ++seqn;
    }

    // var itn = 0;
    // for (var x in keys) {
    //     var key = keys[x];
    //     if ( ! reserved.includes(key)) {
    //         var value = scope.properties[key];
    //         if (value && value instanceof Iterator) {

    //             // console.log(key)
    //             // console.log(value)

    //             if ( ! value.name) {
    //                 value.name = key;
    //                 iterators_int[key] = value;
    //                 updateStatus();
    //             }

    //             if (key != value.name) {
    //                 value.name = key;
    //                 iterators_int[key] = value;
    //                 updateStatus();
    //             }


    //             // var it = new Iterator(arr, index, null);
    //             // iterators_int[name] = it;

    //             var color = iterators_colors[itn];
    //             var it_gui = drawIterator(two, value.data.elements[value.index], key, color);
    //             iterators_gui[value.name] = it_gui;
    //             ++itn;
    //         }
    //     }
    // }

    var itn = 0;

    // if (its_internal.length >= 2) {
    //     // console.log("----------- 3")
    //     // console.log(its_internal)
    //     alert2(3, its_internal)
    // }

    for (var i in its_internal) {
        var key = its_internal[i].key;
        var value = its_internal[i].value;

        if ( ! value.name) {
            // console.log('********************** 1')
            // console.log(value);
            value.name = key;
            // console.log(value);
            iterators_int[key] = value;
            updateStatus();
        }

        if (key != value.name) {
            // console.log('********************** 2')
            // console.log(value);
            value.name = key;
            iterators_int[key] = value;
            updateStatus();
        }

        var color = iterators_colors[itn];
        var it_gui = drawIterator(two, value.data.elements[value.index], key, color);

        if (value.data.drawChart) {
            var chart = myChart;
            if (value.index < chart.data.datasets[0].backgroundColor.length) {
                // chart.data.datasets[0].backgroundColor[value.index] = str_to_rgba_str(color, 0.2);
                chart.data.datasets[0].borderColor[value.index] = str_to_rgba_str(color, 1);
            }
            chart.update();
        }

        iterators_gui[value.name] = it_gui;
        ++itn;
    }

    // if (its_internal.length >= 2) {
    //     // console.log("----------- 3")
    //     // console.log(its_internal)
    //     alert2(4, its_internal)
    // }


    for (var x in keys) {
        // console.log(x);
        // console.log(keys[x]);

        var key = keys[x];


        if ( ! reserved.includes(key)) {
            var value = scope.properties[key];

            // console.log(key);
            // console.log(scope.properties['start']);

            if (value != undefined) {

                if (value instanceof Sequence) {
                } else if (value instanceof Iterator) {
                } else if (value instanceof RangeBounded) {
                } else if (value instanceof RangeCounted) {
                } else if (value instanceof Interpreter.Object) {
                } else {
                    // addVariable(key, value, seqn);
                    vars_internal.push({key: key, value: value});
                }

                // if ( ! value.class) {
                //     addVariable(key, value, seqn);
                // }
            } else {
                // console.log(key);
                // console.log(value);
                // addVariable(key, value, seqn);
            }
        }
    }

    vars_internal.sort(scopePairComparer);
    for (var i in vars_internal) {
        var key = vars_internal[i].key;
        var value = vars_internal[i].value;
        if (key.startsWith("_")) continue;
        // console.log(key)
        // console.log(value)
        addVariable(key, value, seqn);
    }

    // console.log(ranges);

    for (var i = 0; i < ranges.length; i++) {
        var r = ranges[i];

        if (r instanceof RangeBounded) {
            // var f = scope.properties[r.fname];
            // var l = scope.properties[r.lname];

            var f = its_internal.find( x => x.key === r.fname );
            var l = its_internal.find( x => x.key === r.lname );

            if (f != undefined && l != undefined) {
                drawBoundedRange(f.value, l.value);
            }

        } else if (r instanceof RangeCounted) {
            // var f = scope.properties[r.fname];
            // var n = scope.properties[r.nname];

            var f = its_internal.find( x => x.key === r.fname );
            var n = vars_internal.find( x => x.key === r.nname );

            // console.log(r)
            // console.log(f)
            // console.log(n)

            if (f != undefined && n != undefined) {
                drawCountedRange(f.value, n.value);
            }
        }
    }
}


// Object.prototype.getName = function() {
//     var funcNameRegex = /function (.{1,})\(/;
//     var results = (funcNameRegex).exec((this).constructor.toString());
//     return (results && results.length > 1) ? results[1] : "";
//  };


function inside_skipped_function(scope) {
    if (scope.parentScope == null) return false;

    for (var i = 0; i < skipped.length; i+=1) {
        // console.log("En el índice '" + i + "' hay este valor: " + skipped[i]);
        // console.log()

        if (scope.properties[skipped[i]] != undefined) {
            return true;
        }
    }

    return false;
}

function stepButton() {
    var codeHighlight = document.getElementById('codeHighlight');
    // console.log(codeHighlight.innerHTML)


    while (true) {


        // console.log(myInterpreter)
        // console.log(myInterpreter.stateStack)

        if (myInterpreter.stateStack.length) {
            // console.log("stepButton 1");
            var node = myInterpreter.stateStack[myInterpreter.stateStack.length - 1].node;
            // var scope = myInterpreter.stateStack[myInterpreter.stateStack.length - 1].scope;
            var scope = myInterpreter.getScope();
            var start = node.start;
            var end = node.end;
        } else {
            // console.log("stepButton 2");
            var start = 0;
            var end = 0;
        }
        // createSelection(start, end);


        var codeAll = getAllCode();
        var codeView = getViewCode();

        try {
            var ok = myInterpreter.step();
        } finally {
            if (!ok) {
                disable('disabled');
                // console.log('break 2')

                var codeHighlight = document.getElementById('codeHighlight');
                codeHighlight.innerHTML = codeView;
                hljs.highlightBlock(codeHighlight);

                break;
            }
        }

        // console.log('-----------------------');
        // console.log(start);
        // console.log(end);

        if (start < invisibleCode().length) {
            //console.log('continue 0')
            continue;
        }
        start -= invisibleCode().length;
        end -= invisibleCode().length;

        // console.log(start);
        // console.log(end);
        // console.log('-----------------------');

        var codeSelected = codeView.substring(start, end);
        // console.log(codeSelected);

        var codeHtml = [codeView.slice(0, end), "</mark>", codeView.slice(end)].join('');
            codeHtml = [codeHtml.slice(0, start), "<mark>", codeHtml.slice(start)].join('');
        // console.log(codeHtml);
        var codeHighlight = document.getElementById('codeHighlight');
        codeHighlight.innerHTML = codeHtml;
        hljs.highlightBlock(codeHighlight);



        // console.log(node);


        if (codeSelected.length == 1) {
            //console.log('continue 1')
            continue;
        }

        var countLineEnd = (codeSelected.match(/\n/g) || []).length;
        // console.log(countLineEnd);

        if (countLineEnd > 1) {
            //console.log('continue 2')
            continue;
        }

        if (codeSelected[0] == '[' && codeSelected[codeSelected.length - 1] == ']') {
            //console.log('continue 3')
            continue;
        }

        // if (lines.indexOf(codeSelected) != -1) {
        //     continue;
        // }
        // var found = lines.findIndex(function(l) {
        //     return l.includes(codeSelected);
        // });
        // if (found != -1) {
        //     continue;
        // }

        // console.log(prevLine)
        // console.log(codeSelected)
        if (prevLine.includes(codeSelected)) {
            // prevLine = codeSelected;
            //console.log('continue 4')
            continue;
        }

        if (prevLine2.includes(codeSelected)) {
            continue;
        }

        if (node.type == 'Literal') {
            //console.log('continue 5')
            // console.log(node);
            continue;
        }

        if (node.expression && node.expression.callee && node.expression.callee.name == 'skip_debug') {
            //console.log('continue 6')
            // console.log(node.expression.callee.name);
            // console.log(node);
            continue;
        }

        if (node.callee && node.callee.name == 'skip_debug') {
            //console.log('continue 7')
            // console.log(node.expression.callee.name);
            // console.log(node);
            continue;
        }

        if (node.name && node.name == 'skip_debug') {
            //console.log('continue 8')
            // console.log(node.expression.callee.name);
            // console.log(node);
            continue;
        }

        if (inside_skipped_function(scope)) {
            //console.log('continue 9')
            continue;
        }


        // console.log(codeSelected);
        // console.log(myInterpreter.stateStack);
        // console.log(scope);
        // console.log(node);
        // console.log(node.type);
        // console.log(node.getName);



        // console.log('*********************')
        // console.log(node.type);
        // console.log(prevNodeType);
        // console.log('*********************')


        // console.log(codeSelected);
        // console.log(prevLine);

        prevLine2 = codeSelected;


        if (node.type == 'CallExpression' && prevNodeType == 'BlockStatement') {
            prevNodeType = node.type;
            //console.log('continue 11')
            continue;
        }

        if (node.type == 'ReturnStatement' && prevNodeType == 'BlockStatement') {
            prevNodeType = node.type;
            //console.log('continue 11')
            continue;
        }

        if (node.type == 'VariableDeclaration' && prevNodeType == 'CallExpression') {
            prevNodeType = node.type;
            //console.log('continue 12')
            continue;
        }


        prevNodeType = node.type;

        if (node.type == 'BlockStatement') {
            //console.log('continue 10')
            // console.log(node);
            continue;
        }

        if (prevNode != null && prevNode.type == 'VariableDeclaration') {
            if (prevNode.declarations[0].init && prevNode.declarations[0].init.callee && prevNode.declarations[0].init.callee.name == "source") {
                if (log_stats_enabled) {
                    ++stats_assigments;
                    updateStatus();
                }
            }
        }

        prevLine = codeSelected;
        prevNode = node;

        // console.log('-----------------------------------')
        drawScope(scope);



        // if (countLineEnd == 0) {
        //     break;
        // }

        // lines.push(codeSelected);

        // console.log('break 1')
        break;
    }
}

function runButton() {
    disable('disabled');
    myInterpreter.run();
}

function disable(disabled) {
    document.getElementById('stepButton').disabled = disabled;
    // document.getElementById('runButton').disabled = disabled;
}

function createSelection(start, end) {
    var field = document.getElementById('codeArea');
    if (field.createTextRange) {
        var selRange = field.createTextRange();
        selRange.collapse(true);
        selRange.moveStart('character', start);
        selRange.moveEnd('character', end);
        selRange.select();
    } else if (field.setSelectionRange) {
        field.setSelectionRange(start, end);
    } else if (field.selectionStart) {
        field.selectionStart = start;
        field.selectionEnd = end;
    }
    field.focus();
}