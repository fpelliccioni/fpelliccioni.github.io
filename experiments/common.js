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

function all_median_equals(n, values) {
    if (values.length == 0) {
        return null;
    }

    var h = half(n);
    var m = values[0][h];

    if (values.length == 1) {
        return m;
    }

    for (let i = 1; i < values.length; i++) {
        const element = values[i];

        if (element[h] != m) {
            return null;
        }
    }

    return m;
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

function all_median(n, values) {
    var h = half(n);
    var res = [];
    for (let i = 0; i < values.length; i++) {
        const element = values[i];
        res.push(element[h]);
    }

    res = [...new Set(res)];
    res.sort();
    return res;
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

function generate_data_random(n) {
    var res = [];
    var q = Math.pow(n, n + 1);
    for (let i = 0; i < q; ++i) {
        var data = array_random(n, 0, n);
        res.push(data);
    }
    
    return res;

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

module.exports = {
    perm: perm,
    iota: iota,
    half: half,
    all_median_equals: all_median_equals,
    all_median: all_median,
    get_variable_name: get_variable_name,
    remove_values: remove_values,
    ensure_values: ensure_values,
    gen_pairs: gen_pairs,
    gen_empty_array: gen_empty_array,
    all_equal: all_equal,
    print_bool_arr: print_bool_arr,
    pair_equal: pair_equal,
    get_pairs: get_pairs,
    remove_duplicates: remove_duplicates,
    repeat: repeat,
    array_random: array_random,
    generate_data_random: generate_data_random,
    copy_if: copy_if,
    equal_array: equal_array,

}



