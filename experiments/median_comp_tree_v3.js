// The Art of Computer Programming Vol.3 Sorting, p.212
// Vt(n) <= n-t + (t+1) * ceil(lg(n+2-t))   


var fs = require('fs');
const common = require('./common');
const tree_exportable = require('./median_comp_tree');


var __try = 0;

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


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

function temporal_analysis_pair(values, pair, n, s, preconds, vtn) {
    // console.log(JSON.stringify(pair));
    var values_copy = common.deep_copy(values);

    values_copy = common.remove_values(values_copy, pair);

    // if (pair[0] == 6 && pair[1] == 4) {
    //     console.log();
    // }

    // if (pair[0] == 3 && pair[1] == 4) {
    //     console.log();
    // }


    if (values_copy.length == 0) {
        // return [null, `${pair} => incompatible pair`];
        return null;
    }

    var max_comps = common.get_max_comps(vtn, n, s);

    var counted_nums = count_numbers_at(values_copy, s);
    var rn = removed_numbers(n, counted_nums);
    var s_new = s;
    var n_new = n;
    var preconds_copy = common.deep_copy(preconds);
    preconds_copy.push(pair);
    preconds_copy = common.deep_copy(preconds_copy);
    preconds_copy = manage_preconditions(preconds_copy, rn);

    for (let j = 0; j < rn.length; j++) {
        const e = Number(rn[j]);
        const mp = minimum_pos(values_copy, e);
        n_new--;
        if (mp < s) {
            s_new--;
        }
    }
    var useful_comps = preconds_copy.length
    var done_comps = preconds.length + 1


    // var comps_new = vtn[n_new][s_new]
    var comps_new = common.get_max_comps(vtn, n_new, s_new);


    var ret = comps_new - useful_comps;
    
    if (ret + done_comps > max_comps) {
        // return [null, `${pair} => max comparisons exceeded: ${ret + done_comps}`];
        return null;
    }

    // if (pair[0] == 3 && pair[1] == 4) {
    //     console.log();
    // }

    // if (pair[0] == 3 && pair[1] == 4) {
    //     console.log();
    // }

    // return [ret, `${pair} => V${s_new + 1}(${n_new})_${JSON.stringify(preconds_copy)} - ${useful_comps} = ${comps_new} - ${useful_comps} = ${ret}      to remove: ${JSON.stringify(rn)} done comps = ${done_comps}  total comps = ${ret + done_comps}`];

    return [n_new, s_new, preconds_copy, rn, ret, done_comps, ret + done_comps];
}

function temporal_analysis(level, n, values, pairs, s, preconds, vtn) {
    console.log(`${'    '.repeat(level)} Level ${level} - Processing V${s + 1}(${n})_${JSON.stringify(preconds)}`);

    if (n <= 7) {
        return;
    }

    var to_sort = [];

    for (let i = 0; i < pairs.length; i++) {
        // console.log(`done ${i} of ${pairs.length}`);
        const pair_left = pairs[i];
        const pair_right = pair_left.slice().reverse();

        var l_res = temporal_analysis_pair(values, pair_left, n, s, preconds, vtn);
        if (l_res == null) continue;
        var r_res = temporal_analysis_pair(values, pair_right, n, s, preconds, vtn);
        if (r_res == null) continue;

        var total_comps_l = l_res[6];
        var total_comps_r = r_res[6];
        var total_comps = total_comps_l + total_comps_r;

        to_sort.push([pair_left, total_comps, l_res, r_res]);
        // var l_msg = l_res[1];
        // var r_msg = r_res[1];
        // console.log(l_msg);
        // console.log(r_msg);
    }

    to_sort.sort((a, b) => (a[1] - b[1]))


    for (let i = 0; i < to_sort.length; i++) {
        const e = to_sort[i];
        const pair_left = e[0];
        const pair_right = pair_left.slice().reverse();

        var n_internal = e[2][0];
        var s_internal = e[2][1];
        var preconds_internal = e[2][2];

        if (n_internal <= 7) {
            // console.log(`Skiping Level ${level + 1} - Pair: ${JSON.stringify(pair_left)} -- V${s_internal + 1}(${n_internal})_${JSON.stringify(preconds_internal)}`);

            var res = tree_exportable.tree_exportable(n_internal, s_internal, preconds_internal);

            if (res.length == 0) {
                console.log(`${'    '.repeat(level + 1)} INVALID -- Level ${level + 1} - Pair: ${JSON.stringify(pair_left)} -- V${s_internal + 1}(${n_internal})_${JSON.stringify(preconds_internal)}`);
                // console.log(`index: ${i} invalid: ${s+1}, ${n}, ${JSON.stringify(preconds_internal)}`)
            } else {
                var rev = res[1].reverse();
                // console.log(JSON.stringify(rev));
                console.log(`${'    '.repeat(level + 1)} OK      -- Level ${level + 1} - Pair: ${JSON.stringify(pair_left)} -- V${s_internal + 1}(${n_internal})_${JSON.stringify(preconds_internal)}`); //... ${JSON.stringify(rev)}
            }
            continue;
        }
    
        var values_left = common.deep_copy(values);
        values_left = common.remove_values(values_left, pair_left);
        // console.log(values.length);
        // console.log(values_left.length);

        var pairs_internal = common.gen_pairs(n);
        pairs_internal = common.remove_pairs(pairs_internal, preconds_internal);

        console.log(`${'    '.repeat(level)} Level ${level} - Pair ${JSON.stringify(pair_left)}`);
        temporal_analysis(level + 1, n_internal, values_left, pairs_internal, s_internal, preconds_internal, vtn);


        // var values_right = common.deep_copy(values);
        // values_right = common.remove_values(values_right, pair_right);
    }

}

function data_to_file_name(n, preconds) {
    var preconds_str = JSON.stringify(preconds);
    preconds_str = preconds_str.replaceAll('],[', '_');
    preconds_str = preconds_str.replaceAll('[[', '');
    preconds_str = preconds_str.replaceAll(']]', '');
    preconds_str = preconds_str.replaceAll(',', '');
    return `values_${n}___${preconds_str}.txt`;
}


function tree(n, comps, s) {

    if (s == undefined) {
        s = common.half(n);         
    }
    // var s = 4;

    var vtn = {
        1: [0],
        2: [1,1],
        3: [2,3,2],
        4: [3,4,4,3],
        5: [4,6,6,6,4],
        6: [5,7,8,8,7,5],
        7: [6,8,10,10,10,8,6],
        8: [7,9,11,12,12,11,9,7],
        9: [8,11,12,14,14,14,12,11,8],
        10: [9,12,14,15,16,16,15,14,12,9],
    };

    var pairs = common.gen_pairs(n);
    console.log(JSON.stringify(pairs));


    // // ---------------------------------------------------------------------------------
    // // n=11

    // var preconds = [
    //     [1, 2], [3, 4], [5, 6], [7, 8], [9, 10],
    //     [2, 4],
    //     [6, 8],
    //     ];

    // // 4,8 => V6(10)_[[1,2],[3,4],[5,6],[8,9],[2,4]] - 5 = 16 - 5 = 11      to remove: [8] done comps = 8  total comps = 19
    // // 8,4 => V6(10)_[[1,2],[4,5],[6,7],[8,9],[5,7]] - 5 = 16 - 5 = 11      to remove: [4] done comps = 8  total comps = 19
         
    // console.log(preconds.length);

    // pairs = common.remove_pairs(pairs, preconds);
    // console.log(JSON.stringify(pairs));
    // console.log("-----------------------------------------");

    // // var values = common.perm_with_preconds(common.iota(n), preconds);
    // // console.log(values.length);
    // // values = common.apply_precons(values, preconds);
    // // console.log(values.length);
    // // console.log(JSON.stringify(values));

 
    // var contents = fs.readFileSync('values11.txt', 'utf8');
    // var values = JSON.parse(contents);
    // console.log(values.length);
    // values = common.apply_precons(values, preconds);
    // console.log(values.length);
    

    // ---------------------------------------------------------------------------------
    // n=10

    // 4,8 => V6(10)_[[1,2],[3,4],[5,6],[8,9],[2,4]] - 5 = 16 - 5 = 11      to remove: [8] done comps = 8  total comps = 19
    // 8,4 => V6(10)_[[1,2],[4,5],[6,7],[8,9],[5,7]] - 5 = 16 - 5 = 11      to remove: [4] done comps = 8  total comps = 19


    var preconds = [
        [1,2],[3,4],[5,6],[8,9],[2,4],
        [7,8],   // Lo elijo porque es una comparación típica, ver paper Noshita
        // [6,8],   // Lo elijo porque es una comparación típica, ver paper Noshita
    ];

    // var preconds = [
    //     [1,2],[4,5],[6,7],[8,9],[5,7],
    // ];

    var fname = data_to_file_name(n, preconds);

    // console.log(preconds.length);

    pairs = common.remove_pairs(pairs, preconds);
    console.log(JSON.stringify(pairs));
    console.log("-----------------------------------------");

    // var values = common.perm_with_preconds(common.iota(n), preconds);
    // console.log(values.length);
    // values = common.apply_precons(values, preconds);
    // console.log(values.length);
    // console.log(JSON.stringify(values));
    // return;
 
    var contents = fs.readFileSync('values_10___12_34_56_89_24.txt', 'utf8');
    var values = JSON.parse(contents);
    console.log(values.length);
    values = common.apply_precons(values, preconds);
    console.log(values.length);

    
    // Según el script [4, 7] es mejor, pero elijo [1, 7] porque da resultados más parejos
    // 1,7 => V5(9)_[[2,3],[4,5],[7,8],[1,3],[6,7]] - 5 = 14 - 5 = 9      to remove: [1] done comps = 7  total comps = 16
    // 7,1 => V5(9)_[[1,2],[3,4],[5,6],[7,8],[2,4]] - 5 = 14 - 5 = 9      to remove: [7] done comps = 7  total comps = 16

    // ---------------------------------------------------------------------------------



    temporal_analysis(0, n, values, pairs, s, preconds, vtn);    
}

function main() {
    var tests = [
        // [3, 3, undefined],
        // [5, 6, undefined],
        // [7, 10, undefined],
        // [8, 12, 4],
        // [9, 14, undefined],
        [10, 16, 5],
        // [11, 20, undefined],
    ];

    for (let i = 0; i < tests.length; i++) {
        const e = tests[i];
        tree(e[0], e[1], e[2]);
    }
}

main();


