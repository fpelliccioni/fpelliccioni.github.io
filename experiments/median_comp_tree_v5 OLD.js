// The Art of Computer Programming Vol.3 Sorting, p.212
// Vt(n) <= n-t + (t+1) * ceil(lg(n+2-t))   


var fs = require('fs');
const common = require('./common');
const tree_exportable = require('./median_comp_tree_reuse');


var __try = 0;

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

Array.prototype.find_if = function(f, l, p) {
    var data = this;
    while (f != l && ! p(data[f])) ++f;
    return f;
};


// function find_if(data, f, l, p) {
//     while (f != l && ! p(data[f])) ++f;
//     return f;
// }


function complete_empty_levels(level, cmp_n, cmp_max) {
    ++cmp_n;
    if (cmp_n == cmp_max) {
        return [true, [[level, []]]];
    }

    var res_left = complete_empty_levels(level + 1, cmp_n, cmp_max);
    var res_right = complete_empty_levels(level + 1, cmp_n, cmp_max);
    var nodes = [];
    nodes.push(...res_right[1]);
    nodes.push(...res_left[1]);
    nodes.push([level, []]);
    return [true, nodes];
}

function count_numbers_at(values, s) {
    var d = {};
    for (let i = 0; i < values.length; i++) {
        const element = values[i];
        const num = element[s];

        if (num in d) {
            d[num] = d[num] + 1;
        } else {
            d[num] = 1;
        }
    }
    return d;
}

function removed_numbers(n, latest) {
    var res = [];

    for (let i = 1; i <= n; i++) {
        if (!(i in latest)) {
            res.push(i);
        }
        
    }
    return res;
}

function minimum_pos(values, x) {
    var min = null;
    for (let i = 0; i < values.length; i++) {
        const element = values[i];
        const index = element.findIndex(e => e === x);

        if (min === null) {
            min = index;
        } else {
            if (index < min) {
                min = index;
            }
        }
    }

    return min;
}

function remove_preconds(preconds, x) {
    var res = [];

    for (let i = 0; i < preconds.length; i++) {
        const pair = preconds[i];
        if (pair[0] != x && pair[1] != x) {
            res.push(pair);
        }
    }
    return res;
}

function manage_preconditions(preconds, rn) {

    for (let j = 0; j < rn.length; j++) {
        const e = Number(rn[j]);
        preconds = remove_preconds(preconds, e);
    }

    //sort descending order
    rn.sort((a, b) => (a > b ? -1 : 1))

    for (let j = 0; j < rn.length; j++) {
        const x = Number(rn[j]);
        for (let i = 0; i < preconds.length; i++) {
            const e = preconds[i];
            if (e[0] > x) {
                e[0]--;
            }
            if (e[1] > x) {
                e[1]--;
            }
        }
    }

    preconds = common.remove_duplicates(preconds);
    return preconds;
}

function match_precons(a, b) {
    // console.log();

    for (let i = 0; i < a.length; i++) {
        const pair = a[i];
        var index = b.findIndex(e => e[0] === pair[0] && e[1] === pair[1]);
        if (index == -1) {
            return false;
        }
    }

    return true;
}

function find_if(data, f, l, p) {
    while (f != l && ! p(data[f])) ++f;
    return f;
}

function equal_pair(a, b) {
    return a[0] == b[0] && a[1] == b[1]; 
}

function remove_pairs_transitive(pairs, to_remove) {

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

    pairs = common.remove_pairs(pairs, to_remove);
    // pairs = common.remove_pairs(pairs, trans);
    return pairs;
}




function tree(n, comps, s) {

    if (s == undefined) {
        s = common.half(n);         
    }

    var pairs = common.gen_pairs(n);
    console.log(JSON.stringify(pairs));
    console.log("-----------------------------------------");

    // var preconds = [
    //     [1,2],[3,4],[5,6],[8,9],[2,4],
    //     // [7,8],   // Lo elijo porque es una comparación típica, ver paper Noshita
    //     // [6,8],   // Lo elijo porque es una comparación típica, ver paper Noshita
    //     [6,9],
    //     [6,2],
    //     [7,10],
    // ];

    // pairs = remove_pairs_transitive(pairs, [[1, 2]]);
    // console.log(JSON.stringify(pairs));
    // console.log("-----------------------------------------");

    pairs = remove_pairs_transitive(pairs, [[1, 2], [2, 4], [4,8]]);
    console.log(JSON.stringify(pairs));
    console.log("-----------------------------------------");

    // ---------------------------------------------------------------------------------



}

function main() {
    var tests = [
        // [3, 3, undefined],
        // [5, 6, undefined],
        // [7, 10, undefined],
        // [8, 12, 4],
        // [9, 14, undefined],
        // [10, 16, 5],
        [11, 20, undefined],
    ];

    for (let i = 0; i < tests.length; i++) {
        const e = tests[i];
        tree(e[0], e[1], e[2]);
    }
}

main();


