var __try = 0;

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

function half(n) {
    return Math.floor(n / 2);    
}

function all_median_equals(n, values) {
    if (values.length <= 1) {
        return true;
    }

    var h = half(n);
    var m = values[0][h];

    for (let i = 1; i < values.length; i++) {
        const element = values[i];

        if (element[h] != m) {
            return false;
        }
    }

    return true;
}

function remove_level(nodes, level) {
    var res = [];
    for (let i = 0; i < nodes.length; i++) {
        const element = nodes[i];
        if (element[0] < level) {
            res.push(element);
        }
    }
    return res;
}

function recursive(level, n, values, pairs, used_par, cmp_n, cmp_max) {
    var nodes = [];
    // var values = values_par.slice();
    var used = used_par.slice();
    var first_not_used_min = used.indexOf(false);
    var first_not_used = first_not_used_min;

    while (true) {
        used[first_not_used] = true;
        var selected_left = pairs[first_not_used];
        var selected_right = selected_left.slice().reverse();
        
        var new_values_left = remove_values(values, selected_left);
        var new_values_right = remove_values(values, selected_right);

        ++cmp_n;
        ++__try;

        if (__try % 100 == 0) {
            console.log(__try);
        }
        
        if (all_median_equals(n, new_values_left) && all_median_equals(n, new_values_right)) {
            // if (level == 1) {
            //     console.log()
            // }
            // nodes.push([level, selected_left]);

            // if (level != 5) {
            //     console.log()
            // }

            return [true, [[level, selected_left]]];

            //TODO: que nivel tenemos siempre acá?
        }

        if (cmp_n == cmp_max) {

            // if (nodes.length > 0 && level == 1) {
            //      console.log()
            // }

            // if (nodes.length > 0) {
            //      console.log()
            // }
            // nodes = remove_level(nodes, level);

            var first_not_used_new = used.indexOf(false, first_not_used);
            if (first_not_used_new == -1) {
                return false, [];
            }
            used[first_not_used] = false;
            first_not_used = first_not_used_new;
            --cmp_n;
            continue;
        }

        var res_left = recursive(level + 1, n, new_values_left, pairs, used, cmp_n, cmp_max);

        if ( ! res_left[0]) {

            // if (nodes.length > 0) { //} && level == 1) {
            //     console.log()
            // }
            // nodes = remove_level(nodes, level);

            var first_not_used_new = used.indexOf(false, first_not_used);
            if (first_not_used_new == -1) {
                return false, [];
            }
            used[first_not_used] = false;
            first_not_used = first_not_used_new;
            --cmp_n;
            continue;
        } 


        // if (nodes.length > 0) { //} && level == 1) {
        //     console.log()
        // }
        nodes.push(...res_left[1]);

        var res_right = recursive(level + 1, n, new_values_right, pairs, used, cmp_n, cmp_max);

        if (!res_right[0]) {
            
            // if (nodes.length > 0) { // && level == 1) {
            //     console.log()
            // }
            nodes = remove_level(nodes, level);


            var first_not_used_new = used.indexOf(false, first_not_used);
            if (first_not_used_new == -1) {
                return false, [];
            }
            used[first_not_used] = false;
            first_not_used = first_not_used_new;
            --cmp_n;
            continue;
        }

        nodes.push(...res_right[1]);

        // if (level == 1) {
        //     console.log()
        // }

        nodes.push([level, selected_left]);
        // return true;

        return [true, nodes];

    }
}

function tree(n, comps) {

    var pairs = gen_pairs(n);
    var used_pairs = gen_empty_array(n);
    var possible_values = perm(iota(n));

    var res = recursive(0, n, possible_values, pairs, used_pairs, 0, comps);
    console.log(res[0]);
    console.log(res[1]);
}

function main() {
    var tests = [
        // [3, 3],
        // [5, 6],
        [7, 10],
        // [9, 14],
    ];

    for (let i = 0; i < tests.length; i++) {
        const e = tests[i];
        tree(e[0], e[1]);
    }
}

main();


// console.log(perm([1, 2, 3, 4]));
// console.log(perm([1, 2, 3, 4]).join("\n"));
// console.log(iota(4));