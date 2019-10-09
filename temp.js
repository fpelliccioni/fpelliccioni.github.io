  function sequence(d, n, p) {
        return sequence_internal(d, n, p);
    }
function min_element_nonempty(f, l, r) {
    var _f_ = start_f('min_element_nonempty', f, l, r);
    var m = f;
    f = successor(f);
    while ( ! equal(f, l)) {
        if (r(source(f), source(m))) {
            m = f;
        }
        f = successor(f);
    }
    end_f(_f_);
    return m;
}

function min_element(f, l, r) {
    var _f_ = start_f('min_element', f, l, r);
    if (equal(f, l)) return l;

    var m = f;
    f = successor(f);

    while ( ! equal(f, l)) {
        if (r(source(f), source(m))) {
            m = f;
        }
        f = successor(f);
    }

    end_f(_f_);
    return m;
}

function is_sorted_internal(f, l, r) {
    var _f_ = start_f('is_sorted', f, l, r);
    if (equal(f, l)) return true;
    var n = successor(f);
    while ( ! equal(n, l)) {
        if (r(source(n), source(f))) return false;
        f = n;
        n = successor(n);
    }
    return true;
}

function is_sorted(f, l, r) {
    var _f_ = start_f('is_sorted', f, l, r);
    var res = is_sorted_internal(f, l, r);
    end_f(_f_);
    return res;
}

function move_backward(f_i, l_i, l_o) {
    var _f_ = start_f('move_backward', f_i, l_i, l_o);
    while (! equal(f_i, l_i)) {
        l_i = predecessor(l_i);
        l_o = predecessor(l_o);
        sink_move(l_o, source(l_i));
    } 
    end_f(_f_);
    return l_o;
}

function rotate_right_by_one_nonempty(f, l) {
    var _f_ = start_f('rotate_right_by_one_nonempty', f, l, r);
    var butlast = predecessor(l);
    var x = source_move(butlast);
    move_backward(f, butlast, l);
    sink_move(f, x);
    end_f(_f_);
}

function shift_right_while_unguarded(l, p) {
    var _f_ = start_f('shift_right_while_unguarded', l, r);
    while (p(source(predecessor(l)))) {
        sink_move(l, source_move(predecessor(l)));
        l = predecessor(l);
    }
    end_f(_f_);
    return l;
}

var eq = relation(function eq(x, y) {return x == y;});
var lt = relation(function lt(x, y) {return x < y;});
var gt = relation(function gt(x, y) {return x < y;});
var lte = relation(function lte(x, y) {return x <= y;});
var gte = relation(function gte(x, y) {return x >= y;});

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
        // var tmp = array_from_internal(str);
        var res = []; 
        // for (var i = 0; i < tmp.lenght; ++i) {
            // res.push(tmp[i]); 
        // }
        return res; 
    }
    function find(f, l, x) {
    while ( ! equal(f, l) && ! source(f) != x) {
        f = successor(f)
    }
    return f;
}

print(array_from("Hello, World!"))
var s = sequence(array_from("Hello, World!"), "s");

var it = find(begin(s), end(s), 'x');
if ( ! equal(it, end(s))) {
    print(source(it));
}