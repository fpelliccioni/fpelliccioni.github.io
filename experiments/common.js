var assert_internal = require('assert');
var fs = require('fs');

function _get_function_name(stack_str) {
    // var re = new RegExp("at (\\w+)", "g");
    // var re = new RegExp("at (\\w+)");

    var m = stack_str.match(/at (\w+) /);
    // console.log(m)

    if (m && m.length > 1) {
        return m[1];
    } else {
        return undefined;
    }
}

function _get_precondition(fname) {
    // select_[0-9]+_[0-9]+_(\w+)

    var m = fname.match(/select_[0-9]+_[0-9]+_(\w+)/);
    // console.log(m)

    if (m && m.length > 1) {
        return m[1];
    } else {
        return undefined;
    }

}

function check_precondition() {

    // console.log(arguments.length)

    var stack = new Error().stack;
    // var stack_str = JSON.parse(JSON.stringify(stack));
    // var args = JSON.parse(JSON.stringify(arguments));
    var args = arguments;
    var fname = _get_function_name(stack);

    // if (fname == undefined) {
    //     console.log("fname == undefined")
    // }

    // console.log(arguments.length)


    var precond = _get_precondition(fname);

    // if (fname == 'select_5_9_ab_de_gh_eh_eb_fi_af_cf_gb') {
    //     console.log()
    // }

    if (!precond) return;
    var tmp = g_comparissons;
    var r = arguments[arguments.length - 1];
    var seq = precond.split("_");

    for (let i = 0; i < seq.length; i++) {
        const element = seq[i];

        for (let j = 0; j < element.length - 1; j++) {
            var i0 = variable_to_index(element[j]);
            var i1 = variable_to_index(element[j + 1]);
            var v0 = args[i0];
            var v1 = args[i1];

            assert_internal( ! r(v1, v0));

        }
        
    }
    g_comparissons = tmp;
}

function equal_array(a, b) {
    if (a.length != b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] != b[i]) {
            return false;
        }
    }
    return true;
}


function perm(xs) {
    let ret = [];
  
    for (let i = 0; i < xs.length; i = i + 1) {
        let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

        if ( ! rest.length) {
            ret.push([xs[i]])
        } else {
            for (let j = 0; j < rest.length; j = j + 1) {
                ret.push([xs[i]].concat(rest[j]))
            }
        }
    }
    return ret;
}

function perm_exec(xs, n, f) {
    let ret = [];
  
    for (let i = 0; i < xs.length; i = i + 1) {
        let rest = perm_exec(xs.slice(0, i).concat(xs.slice(i + 1)), n, f);

        if ( ! rest.length) {
            ret.push([xs[i]])
        } else {
            for (let j = 0; j < rest.length; j = j + 1) {
                var final = [xs[i]].concat(rest[j]);
                if (final.length == n) {
                    f(final);
                } else {
                    ret.push(final)
                }
            }
        }
    }
    return ret;
}

function iter_swap(data, a, b) {
    [data[a], data[b]] = [data[b], data[a]];
}

function reverse(data, f, l) {
    while ((f != l) && (f != --l)) {
        iter_swap(data, f++, l);
    }
}

function next_permutation(data, f, l) {
    if (f == l) return false;
    var i = l;
    if (f == --i) return false;
 
    while (true) {
        var i1, i2;
 
        i1 = i;
        if (data[--i] < data[i1]) {
            i2 = l;
            while (!(data[i] < data[--i2]));
            iter_swap(data, i, i2);
            reverse(data, i1, l);
            return true;
        }
        if (i == f) {
            reverse(data, f, l);
            return false;
        }
    }
}


function remove_pairs(pairs, to_remove) {
    var res = [];

    for (let i = 0; i < pairs.length; i++) {
        var pair_l = pairs[i];
        var pair_r = pair_l.slice().reverse();

        var index_l = to_remove.findIndex(e => e[0] === pair_l[0] && e[1] === pair_l[1]);
        var index_r = to_remove.findIndex(e => e[0] === pair_r[0] && e[1] === pair_r[1]);

        if (index_l == -1 && index_r == -1) {
            res.push(pair_l);
        }
    }

    // res = remove_duplicates(res);
    return res;
}



function apply_precons(values, preconds) {
    // var values_copy = values.slice();

    if (values.length < 2) return values;

    for (let i = 0; i < preconds.length; i++) {
        const p = preconds[i];
        values = remove_values2(values, p);
        if (values.length == 0) break;
    }
    return values;
}

function perm_with_preconds(xs, preconds) {
    let ret = [];
  
    for (let i = 0; i < xs.length; i = i + 1) {
        let rest = perm_with_preconds(xs.slice(0, i).concat(xs.slice(i + 1)), preconds);

        if ( ! rest.length) {
            ret.push([xs[i]])
        } else {
            for (let j = 0; j < rest.length; j = j + 1) {
                ret.push([xs[i]].concat(rest[j]))
            }
        }
    }
    ret = apply_precons(ret, preconds);
    return ret;
}

function iota(n) {
    var res = [];
    for (let i = 0; i < n; ++i) {
        res.push(i + 1);
    }
    return res;
}

function remove_values(values, node) {
    // console.log(values);
    // console.log(node);
    var res = [];
    for (let i = 0; i < values.length; i++) {
        const element = values[i];
        var ia = element.indexOf(node[0]);
        var ib = element.indexOf(node[1]);
        // console.log(ia);
        // console.log(ib);
        if (ia < ib) {
            res.push(element);
        }
    }

    return res;
}

function remove_values2(values, node) {
    // console.log(values);
    // console.log(node);
    var res = [];
    for (let i = 0; i < values.length; i++) {
        const element = values[i];
        if (element.length < 2) {
            res.push(element);
            continue;
        }
        var ia = element.indexOf(node[0]);
        var ib = element.indexOf(node[1]);
        // console.log(ia);
        // console.log(ib);
        if (ia < ib || ia == -1 || ib == -1) {
            res.push(element);
        } else {
            1 == 1;
        }
    }

    return res;
}

function ensure_values(values, node) {
    var res = [];
    for (let i = 0; i < values.length; i++) {
        const element = values[i];

        if (element[node[0] - 1] <= element[node[1] - 1]) {
            res.push(element);
        }
    }

    return res;
}

function half(n) {
    return Math.floor(n / 2);    
}

function all_selection_equals(n, values, s) {
    if (values.length == 0) {
        return null;
    }

    var m = values[0][s];

    if (values.length == 1) {
        return m;
    }

    for (let i = 1; i < values.length; i++) {
        const element = values[i];

        if (element[s] != m) {
            return null;
        }
    }

    return m;
}

function all_median_equals(n, values) {
    return all_selection_equals(n, values, half(n));
    // if (values.length == 0) {
    //     return null;
    // }

    // var h = half(n);
    // var m = values[0][h];

    // if (values.length == 1) {
    //     return m;
    // }

    // for (let i = 1; i < values.length; i++) {
    //     const element = values[i];

    //     if (element[h] != m) {
    //         return null;
    //     }
    // }

    // return m;
}

function variable_to_index(s) {
    var ret = s.charCodeAt(0);
    ret -= 97;
    return ret;
}

function get_variable_name(i) {
    return String.fromCharCode(97 + i - 1);
}

function gen_pairs(n) {
    var pairs = []
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            if (i < j) {
                pairs.push([i + 1, j + 1]);
            }
        }
    }
    return pairs;
}

function gen_empty_array(n) {
    var res = [];
    var pairs_n = (n * n - n) / 2;
    for (let i = 0; i < pairs_n; i++) {
        res.push(false);
    }
    return res;
}

function gen_empty_array_with_len(len) {
    var res = [];
    for (let i = 0; i < len; i++) {
        res.push(false);
    }
    return res;
}



function all_selection(n, values, s) {
    var h = half(n);
    var res = [];
    for (let i = 0; i < values.length; i++) {
        const element = values[i];
        res.push(element[s]);
    }

    res = [...new Set(res)];
    res.sort();
    return res;
}

function all_median(n, values) {
    return all_selection(n, values, half(n));

    // var h = half(n);
    // var res = [];
    // for (let i = 0; i < values.length; i++) {
    //     const element = values[i];
    //     res.push(element[h]);
    // }

    // res = [...new Set(res)];
    // res.sort();
    // return res;
}

function all_equal(values) {
    if (values.length <= 1) {
        return true;
    }

    var m = values[0];

    for (let i = 1; i < values.length; i++) {
        const element = values[i];

        if (element != m) {
            return false;
        }
    }

    return true;
}

function print_bool_arr(arr) {
    var res = [];
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        var x = element ? 1 : 0;    
        res.push(x);
    }
    console.log(res.join(''));
}

function pair_equal(p, m0, m1) {
    if (p[0] == m0 && p[1] == m1) return true;
    if (p[1] == m0 && p[0] == m1) return true;
    return false;
}

// reemplazar esta funcion.
// quiero los pares aun no usados que...
// contengan los numeros que estan en medians
function get_pairs(pairs, used, medians) {
    var tmp = [];
    for (let i = 0; i < used.length; i++) {
        const u = used[i];
        tmp.push([u, false, false]);
    }

    for (let i = 0; i < medians.length; i++) {
        const m = medians[i];
        
        for (let j = 0; j < tmp.length; j++) {
            const p = pairs[j];
            
            if (m == p[0]) {
                tmp[j][1] = true;
            }
            if (m == p[1]) {
                tmp[j][2] = true;
            }

        }
    }

    var res = [];
    for (let i = 0; i < tmp.length; i++) {
        const t = tmp[i];
        if ( ! t[0] && t[1] && t[2]) {
            res.push(i);
        }
    }
    return res;
}

function remove_duplicates(arr) {
    var arr_str = [];
    for (let i = 0; i < arr.length; ++i) {
        arr_str.push(JSON.stringify(arr[i]));
    }

    arr_str = [...new Set(arr_str)];
    
    var res = [];
    for (let i = 0; i < arr_str.length; ++i) {
        var obj = JSON.parse(arr_str[i]);
        res.push(obj);
    }
    return res;
}

function repeat(x, n) {
    var res = [];
    for (let i = 0; i < n; i++) {
        res.push(x);
    }
    return res;
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

function array_random_non_equals(n, from, to) {
    if ( ! n) n = 10;
    if ( ! from) from = 0;
    if ( ! to) to = 99;
    var res = new Set(res)
    while (res.size != n) {
        var rand = Math.floor(Math.random() * to) + from; 
        res.add(rand); 
    } 
    return [...res]; 
}

function generate_data_random(n) {
    var res = [];
    var q = Math.pow(n, n + 1);
    for (let i = 0; i < q; ++i) {
        var data = array_random(n, 0, n);
        res.push(data);
    }
    
    return res;

}

function deep_copy(o) {
    return JSON.parse(JSON.stringify(o));
}

function copy_if(data, p) {
    var res = [];
    for (let i = 0; i < data.length; i++) {
        const e = data[i];
        const r = p(...e);
        if (r) {
            res.push(e);
        }
    }
    return res;
}

function get_max_comps(vtn, n, s) {
    if (n in vtn) {
        var max_comps = vtn[n][s];
        return max_comps;
    }
    var t = s + 1;
    var max_comps = n - t + (t - 1) * Math.ceil(Math.log2(n + 2 - t));
    return max_comps;
}


function equal_pair(a, b) {
    return a[0] == b[0] && a[1] == b[1]; 
}

function remove_pairs_transitive(pairs, to_remove_par) {
    var to_remove = deep_copy(to_remove_par);

    var cont = true;
    while (cont) {
        cont = false;
        var trans = [];
        for (let i = 0; i < to_remove.length; i++) {
            const pair = to_remove[i];
            
            var f = 0;
            const l = to_remove.length;
            f = to_remove.find_if(f, l, e => e[0] === pair[1]);
            while (f != l) {
                var to_insert_pair = [pair[0], to_remove[f][1]];
                var f2 = to_remove.find_if(0, l, e => equal_pair(e, to_insert_pair));
                if (f2 == l) {
                    trans.push([pair[0], to_remove[f][1]]);
                    cont = true;
                }
                ++f;
                f = to_remove.find_if(f, l, e => e[0] === pair[1]);
            }
        }
        to_remove.push(...trans);
    }

    pairs = remove_pairs(pairs, to_remove);
    // pairs = remove_pairs(pairs, trans);
    return pairs;
}

function get_values(n, preconds) {
    if (n == 11) {
        var contents = fs.readFileSync('median_11___12_34_56_78_910_24_68.txt', 'utf8');
        var values = JSON.parse(contents);
        // console.log(values.length);
        values = apply_precons(values, preconds);
        // console.log(values.length);
        return values;
    }

    if (n == 10) {
        var contents = fs.readFileSync('values_10___12_34_56_89_24.txt', 'utf8');
        var values = JSON.parse(contents);
        // console.log(values.length);
        values = apply_precons(values, preconds);
        // console.log(values.length);
        return values;
    }

    var values = perm_with_preconds(iota(n), preconds);
    // console.log(values.length);
    values = apply_precons(values, preconds);
    // console.log(values.length);
    // console.log(JSON.stringify(values));
    return values;
}


module.exports = {
    equal_pair: equal_pair,
    remove_pairs_transitive: remove_pairs_transitive,
    get_values: get_values,

    perm: perm,
    perm_with_preconds: perm_with_preconds,
    perm_exec: perm_exec,
    apply_precons: apply_precons,
    remove_pairs: remove_pairs,
    iota: iota,
    half: half,
    all_median_equals: all_median_equals,
    all_selection_equals: all_selection_equals,
    all_median: all_median,
    all_selection: all_selection,
    get_variable_name: get_variable_name,
    remove_values: remove_values,
    ensure_values: ensure_values,
    gen_pairs: gen_pairs,
    gen_empty_array: gen_empty_array,
    gen_empty_array_with_len: gen_empty_array_with_len,
    all_equal: all_equal,
    print_bool_arr: print_bool_arr,
    pair_equal: pair_equal,
    get_pairs: get_pairs,
    remove_duplicates: remove_duplicates,
    repeat: repeat,
    array_random: array_random,
    array_random_non_equals: array_random_non_equals,
    generate_data_random: generate_data_random,
    copy_if: copy_if,
    equal_array: equal_array,
    check_precondition: check_precondition,
    deep_copy: deep_copy,
    get_max_comps: get_max_comps,

    iter_swap: iter_swap,
    reverse: reverse,
    next_permutation: next_permutation,
}



