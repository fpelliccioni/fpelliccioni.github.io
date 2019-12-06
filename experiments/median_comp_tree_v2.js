// The Art of Computer Programming Vol.3 Sorting, p.212
// Vt(n) <= n-t + (t+1) * ceil(lg(n+2-t))   


var fs = require('fs');
const common = require('./common');

var __try = 0;

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

// function removed_numbers(orig, latest) {
//     var res = [];
//     for (const k in orig) {
//         if (!(k in latest)) {
//             res.push(k);
//         }
//     }
//     return res;
// }

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


function temporal_analysis_pair(values, pair, counted_nums_orig, n, s, preconds, vtn) {
    // console.log(JSON.stringify(pair));

    // var values_copy = values.slice();
    var values_copy = common.deep_copy(values);

    values_copy = common.remove_values(values_copy, pair);

    if (pair[0] == 1 && pair[1] == 8) {
        console.log();
    }

    // if (pair[0] == 3 && pair[1] == 4) {
    //     console.log();
    // }


    if (values_copy.length == 0) {
        return [null, `${pair} => incompatible pair`];
    }

    var max_comps = common.get_max_comps(vtn, n, s); //vtn[n][s];

    var counted_nums = count_numbers_at(values_copy, s);
    // var rn = removed_numbers(counted_nums_orig, counted_nums);
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
    var comps_new = common.get_max_comps(vtn, n_new, s_new); //vtn[n][s];


    var ret = comps_new - useful_comps;
    
    if (ret + done_comps > max_comps) {
        return [null, `${pair} => max comparisons exceeded: ${ret + done_comps}`];
    }

    // if (pair[0] == 3 && pair[1] == 4) {
    //     console.log();
    // }

    // if (pair[0] == 3 && pair[1] == 4) {
    //     console.log();
    // }

    return [ret, `${pair} => V${s_new + 1}(${n_new})_${JSON.stringify(preconds_copy)} - ${useful_comps} = ${comps_new} - ${useful_comps} = ${ret}      to remove: ${JSON.stringify(rn)} done comps = ${done_comps}  total comps = ${ret + done_comps}`];
}

function temporal_analysis(level, n, values, pairs, cmp_n, cmp_max, s, preconds, vtn) {

    var counted_nums_orig = count_numbers_at(values, s);
    
    var min_sum = null;
    var min_sum_elem = null;

    for (let i = 0; i < pairs.length; i++) {
        const pair_left = pairs[i];
        const pair_right = pair_left.slice().reverse();

        if (pair_left[0] == 1 && pair_left[1] == 8) {
            console.log()
        }


        // console.log("left ---------------------------------------------------")
        var l_res = temporal_analysis_pair(values, pair_left, counted_nums_orig, n, s, preconds, vtn);
        
        // console.log("right ---------------------------------------------------")
        var r_res = temporal_analysis_pair(values, pair_right, counted_nums_orig, n, s, preconds, vtn);

        var l = l_res[0];
        var r = r_res[0];

        var l_msg = l_res[1];
        var r_msg = r_res[1];

        if (l == null || r == null) continue;

        console.log(l_msg);
        console.log(r_msg);


        var sum = l + r;
        if (min_sum == null) {
            min_sum = sum;
            min_sum_elem = pair_left;
        } else {
            if (sum < min_sum) {
                min_sum = sum;
                min_sum_elem = pair_left;
            }
        }
    }

    console.log(`${min_sum_elem} => ${min_sum}`);

}

function get_values(n, preconds) {
    if (n == 11) {
        console.log("IMPLEMENT!!!")
        return [];
    }

    if (n == 10) {
        var contents = fs.readFileSync('values_10___12_34_56_89_24.txt', 'utf8');
        var values = JSON.parse(contents);
        console.log(values.length);
        values = common.apply_precons(values, preconds);
        console.log(values.length);
        return values;
    }

    var values = common.perm_with_preconds(common.iota(n), preconds);
    console.log(values.length);
    values = common.apply_precons(values, preconds);
    console.log(values.length);
    // console.log(JSON.stringify(values));
    return values;
}



function tree(n, comps, s, preconds) {

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

    
    // ---------------------------------------------------------------------------------

    console.log(preconds.length);

    pairs = common.remove_pairs(pairs, preconds);
    console.log(JSON.stringify(pairs));
    console.log("-----------------------------------------");

    // var values = common.perm_with_preconds(common.iota(n), preconds);
    // console.log(values.length);
    // values = common.apply_precons(values, preconds);
    // console.log(values.length);
    // // console.log(JSON.stringify(values));
    
    var values = get_values(n, preconds);
        
    //----------------------------------------------------------





    temporal_analysis(0, n, values, pairs, 0, comps, s, preconds, vtn);    
}

function main() {
    var tests = [
        // [3, 3, undefined],
        // [5, 6, undefined],
        // [7, 10, undefined],
        // [8, 12, 4, [[1,2],[4,5],[6,7],[5,7],[5,2],[6,1],[8,3]]],                      // V5(8)_[[1,2],[4,5],[6,7],[5,7],[5,2],[6,1],[8,3]]
        // [9, 14, 6-1, [[1,2],[4,5],[7,8],[5,8],[5,2],[6,9],[6,1],[7,1]]],           //V6(9)_[[1,2],[4,5],[7,8],[5,8],[5,2],[6,9],[6,1],[7,1]]
        [10, 16, 5, [[1,2],[3,4],[5,6],[8,9],[2,4],[6,9],[6,2],[7,10],[7,1]]],     //V6(10)_[[1,2],[3,4],[5,6],[8,9],[2,4],[6,9],[6,2],[7,10],[7,1]]
        // [11, 20, undefined],
    ];

    for (let i = 0; i < tests.length; i++) {
        const e = tests[i];
        tree(e[0], e[1], e[2], e[3]);
    }
}

main();


