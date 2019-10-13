//***************************************
function callable_create(f) {return f;}
function callable_get_name(f) {return "";}
function callable_get_parameters(f) {return 2;}
function callable_get_code(f) {return "";}

function sequence_internal(d, n, p, drawChart) {
    return d;
}

function begin(x) {return 1};
function end(x) {return 1};
function equal(x, y) {return false;};
function source(x) {return 1;};
function log_relation_call_internal(fname, x, y, res) {}
function successor(x) {return x};
//***************************************


    function sequence(d, n, p, drawChart) {
        return sequence_internal(d, n, p, drawChart);
    }function __debug_max_element(f, l, r) {
    if (equal(f, l)) return l;

    var m = f;
    f = successor(f);

    while ( ! equal(f, l)) {
        if (r(source(f), source(m))) {
            m = f;
        }
        f = successor(f);
    }
    return m;
}

function max_element(f, l, r) {
    var _f_ = start_f('max_element', f, l, r);
    var res = __debug_max_element(f, l, r);
    end_f(_f_);
    return res;
}

function __max_element_usage() {
    var s = sequence(array_random(), "s");

    var l = end(s);
    
    var m = max_element(begin(s), l, lt);
    if ( ! equal(m, l)) {
        print("The max element is: " + source(m));
    } else {
        print("An empty sequence has no max element");
    }
}

function __max_element_attributes() {
    return {
        class: ['Selection'],
        complexity: 'n - 1 comparisons',
        "type requirements": ['f, l: I: Iterator \u2227 Readable',
                              'r: R: StrictWeakOrdering relation',
                              'Domain(R) = ValueType(I)'],
        precondition: 'readable_bounded_range(f, l)',
        postcondition: 'source(m) = sort_stable_copy(f, l, r)[0]',
        other: ['Stable'],
    };
}

function __debug_min_element(f, l, r) {
    if (equal(f, l)) return l;

    var m = f;
    f = successor(f);

    while ( ! equal(f, l)) {
        if (r(source(f), source(m))) {
            m = f;
        }
        f = successor(f);
    }
    return m;
}

function min_element(f, l, r) {
    var _f_ = start_f('min_element', f, l, r);
    var res = __debug_min_element(f, l, r);
    end_f(_f_);
    return res;
}

function __min_element_usage() {
    var s = sequence(array_random(), "s");
    var l = end(s);
    
    var m = min_element(begin(s), l, lt);
    if ( ! equal(m, l)) {
        print("The min element is: " + source(f));
    } else {
        print("An empty sequence has no min element");
    }
}

function __min_element_attributes() {
    return {
        class: ['Selection'],
        complexity: 'n - 1 comparisons',
        "type requirements": ['f, l: I: Iterator \u2227 Readable',
                              'r: R: StrictWeakOrdering relation',
                              'Domain(R) = ValueType(I)'],
        precondition: 'readable_bounded_range(f, l)',
        postcondition: 'source(m) = sort_stable_copy(f, l, r)[0]',
        other: ['Stable'],
    };
}

function __debug_min_element_nonempty(f, l, r) {
    var m = f;
    f = successor(f);

    while ( ! equal(f, l)) {
        if (r(source(f), source(m))) {
            m = f;
        }
        f = successor(f);
    }
    return m;
}

function min_element_nonempty(f, l, r) {
    var _f_ = start_f('min_element_nonempty', f, l, r);
    var res = __debug_min_element_nonempty(f, l, r);
    end_f(_f_);
    return res;
}

function __min_element_nonempty_usage() {
    var s = sequence(array_random(), "s");
    var l = end(s);
    
    var m = min_element_nonempty(begin(s), l, lt);
    if ( ! equal(m, l)) {
        print("The min element is: " + source(f));
    }
}

function __min_element_nonempty_attributes() {
    return {
        class: ['Selection'],
        complexity: 'n - 1 comparisons',
        "type requirements": ['f, l: I: Iterator \u2227 Readable',
                              'r: R: StrictWeakOrdering relation',
                              'Domain(R) = ValueType(I)'],
        precondition: 
`readable_bounded_range(f, l)
\u2227 f != l
`,
        postcondition: 'source(m) = sort_stable_copy(f, l, r)[0]',
        other: ['Stable'],
    };
}


    function callable(f) {
        var c = callable_create(f);
        var fname = callable_get_name(c);
        var params = callable_get_parameters(c);
        
        if (params == 2) {
            var wrapped_func = function(x, y) {
                var res = f(x, y); 
                log_relation_call_internal(fname, x, y, res); 
                return res;
            };        
        } else if (params == 1) {
            var wrapped_func = function(x) {
                var res = f(x);
                log_predicate_call_internal(fname, x, res); 
                return res;
            };
        }
        wrapped_func.inner_callable = c;
        wrapped_func.inner_function = f;
        wrapped_func.inner_name = fname;
        wrapped_func.inner_code = callable_get_code(c);
        wrapped_func.inner_parameters = params;
        return wrapped_func;
    }    
    function relation(f) {
        return callable(f);
    }
    function predicate(f) {
        return callable(f);
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
    //Nico Lomutos's partition algorithm: https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
//Code taken from: https://github.com/tao-cpp/algorithm/blob/master/include/tao/algorithm/partition/partition.hpp#L58

// var r = range_bounded("f", "l");
// var r2 = range_bounded("j", "l");
// var r3 = range_bounded("p", "l");

function partition_semistable(f, l, p) {
    while (true) {
        if (equal(f, l)) return f;
        if (p(source(f))) break;
        f = successor(f);
    }

    var j = f;
    j = successor(j)

    while ( ! equal(j, l)) {
        if ( ! p(source(j))) {
            iter_swap(f, j);
            f = successor(f);
        }
        j = successor(j);
    }
    return f;
}

var even = predicate(function even(x) { return (x & 1) == 0; });
var d = sequence(array_random(), "d", even, true);
var f = begin(d);
var l = end(d);

var p = partition_semistable(f, l, even);
if ( ! equal(p, l)) {
    print('partition point: ' + source(p));
}