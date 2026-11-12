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

function temporal_analysis_pair(values_old, pair, n, s, preconds, vtn) {
    // console.log(JSON.stringify(pair));

    var values_copy = common.deep_copy(values_old);
    values_copy = common.remove_values(values_copy, pair);
    // console.log(values_copy.length);

    if (values_copy.length == 0) {
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
    var comps_new = common.get_max_comps(vtn, n_new, s_new);
    var ret = comps_new - useful_comps;
    
    if (ret + done_comps > max_comps) {
        return null;
    }
    return [n_new, s_new, preconds_copy, rn, ret, done_comps, ret + done_comps];
}

function process_part(level, pair, values_old, n, s, preconds, vtn) {
    console.log(`${'    '.repeat(level)} Level ${level} - Pair ${JSON.stringify(pair)} ???`);

    if (n <= 7) {
        // console.log(`${'    '.repeat(level)} Level ${level} - Pair ${JSON.stringify(pair)} OK ***************`);
        // return true;        //assume is Ok, for the moment

        // console.log(`Skiping Level ${level + 1} - Pair: ${JSON.stringify(pair)} -- V${s + 1}(${n})_${JSON.stringify(preconds)}`);

        var res = tree_exportable.tree_exportable(n, s, preconds);

        if (res.length == 0) {
            // console.log(`${'    '.repeat(level + 1)} INVALID -- Level ${level + 1} - Pair: ${JSON.stringify(pair)} -- V${s + 1}(${n})_${JSON.stringify(preconds)}`);
            // console.log(`index: ${i} invalid: ${s+1}, ${n}, ${JSON.stringify(preconds)}`)
            return false;
        } else {
            var rev = res[1].reverse();
            // console.log(`${'    '.repeat(level)} Level ${level} - Pair ${JSON.stringify(pair)} OK ***************`);
            console.log(`${'    '.repeat(level + 1)} OK      -- Level ${level + 1} - Pair: ${JSON.stringify(pair)} -- V${s + 1}(${n})_${JSON.stringify(preconds)} ... ${JSON.stringify(rev)}`);
            // console.log(JSON.stringify(rev));
            return true;
        }
    }
    
    // var values_copy_old = common.deep_copy(values_old);
    // values_copy_old = common.remove_values(values_copy_old, pair);
    // console.log(values_old.length);
    // console.log(values_copy_old.length);

    // var values_copy = common.get_values(n, preconds);
    // values_copy = common.remove_values(values_copy, pair);
    // console.log(values_copy.length);

    // if (values_copy_old.length != values_copy.length) {
    //     console.log()
    // }


    // var pairs = common.gen_pairs(n);
    // pairs = common.remove_pairs(pairs, preconds);


    var res = temporal_analysis(level + 1, n, s, preconds, vtn);

    if (res) {
        console.log(`${'    '.repeat(level)} Level ${level} - Pair ${JSON.stringify(pair)} OK ***************`);
        // console.log(`${'    '.repeat(level)} Level ${level} - Processing V${s + 1}(${n})_${JSON.stringify(preconds)}`);
    }
    return res;
}

function temporal_analysis(level, n, s, preconds, vtn) {
    if (n <= 7) {
        return false;
    }

    if (level >= 6) {
        return false;
    }

    var values = common.get_values(n, preconds);
    // values = common.remove_values(values, pair);
    // console.log(values.length);
    var pairs = common.gen_pairs(n);
    pairs = common.remove_pairs(pairs, preconds);


    console.log(`${'    '.repeat(level)} Level ${level} - Processing V${s + 1}(${n})_${JSON.stringify(preconds)}`);
    // if (level == 0) {
    //     console.log(`${'    '.repeat(level)} Level ${level} - Processing V${s + 1}(${n})_${JSON.stringify(preconds)}`);
    // }

    var to_sort = [];

    for (let i = 0; i < pairs.length; i++) {
        // console.log(`done ${i} of ${pairs.length}`);
        const pair_left = pairs[i];
        const pair_right = pair_left.slice().reverse();

        // if (pair_left[0] == 5 && pair_left[1] == 10) {
        //     console.log(values.length)
        // }

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

    // if (to_sort.length == 0) {
    //     console.log("****************** to_sort.length == 0");
    // }

    var ok_elements = 0;
    for (let i = 0; i < to_sort.length; i++) {
        const e = to_sort[i];
        const pair_left = e[0];
        const pair_right = pair_left.slice().reverse();


        // Left ----------------------------------------------------------------------------
        var res_left = process_part(level, pair_left, values, e[2][0], e[2][1], e[2][2], vtn);

        if (! res_left) {
            continue;
        }

        // Right ----------------------------------------------------------------------------
        var res_right = process_part(level, pair_right, values, e[3][0], e[3][1], e[3][2], vtn);

        if (res_right) {
            ok_elements++;
            return true;
        }
    }

    return ok_elements > 0;
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

    // var pairs = common.gen_pairs(n);
    // console.log(JSON.stringify(pairs));


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


    // var preconds = [
    //     [1,2],[3,4],[5,6],[8,9],[2,4],
    //     [7,8],   // Lo elijo porque es una comparación típica, ver paper Noshita
    //     // [6,8],   // Lo elijo porque es una comparación típica, ver paper Noshita
    // ];

    // var preconds = [
    //     [1,2],[4,5],[6,7],[8,9],[5,7],
    // ];

    var preconds = [
        [1,2],[3,4],[5,6],[8,9],[2,4],
        [6,9],
        [6,2],
        [7,10],
        [7,1],
    ];

    var fname = data_to_file_name(n, preconds);

    // console.log(preconds.length);

    // pairs = common.remove_pairs(pairs, preconds);
    // console.log(JSON.stringify(pairs));
    // console.log("-----------------------------------------");

    // var values = common.get_values(n, preconds);

    // ---------------------------------------------------------------------------------

    // temporal_analysis(0, n, values, pairs, s, preconds, vtn);    

    // ---------------------------------------------------------------------------------

    temporal_analysis(0, n, s, preconds, vtn);
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


