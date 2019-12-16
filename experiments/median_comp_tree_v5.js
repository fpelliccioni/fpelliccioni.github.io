// The Art of Computer Programming Vol.3 Sorting, p.212
// Vt(n) <= n-t + (t+1) * ceil(lg(n+2-t))   

var fs = require('fs');
const common = require('./common');
const tao = require('./stable_sort');

// const profiler = require('v8-profiler');

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

Array.prototype.find_if = function(f, l, p) {
    var data = this;
    while (f != l && ! p(data[f])) ++f;
    return f;
};


var __try = 0;



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


    // console.log(d);
    return d;

}

function remove_reflexive_duplicates(array_of_pairs) {
    var res = [];
    for (let i = 0; i < array_of_pairs.length; i++) {
        const elem = array_of_pairs[i];
        const pair = [elem[0], elem[1]];
        const reflex = pair.slice().reverse();

        var f = res.find_if(0, res.length, e => common.equal_pair(e, reflex));
        if (f == res.length) {
            res.push(elem);
        } else {
            // console.log()
        }
    }
    return res;
}

function count_numbers_at_pairs_sorted(counted_nums) {

    var counted_nums_arr = [];
    for (const k0 in counted_nums) {
        for (const k1 in counted_nums) {
            if (k0 != k1) {
                const v0 = counted_nums[k0];
                const v1 = counted_nums[k1];
                counted_nums_arr.push([Number(k0), Number(k1), Number(v0) + Number(v1)]);
            }
        }
    }
    var old_len = counted_nums_arr.length;
    counted_nums_arr = common.remove_duplicates(counted_nums_arr);

    if (counted_nums_arr.length != old_len) {
        console.log("ALGO ESTA MAL 1");
    }

    counted_nums_arr = remove_reflexive_duplicates(counted_nums_arr);

    // tao.stable_sort(counted_nums_arr, function (a, b) { return a[2] < b[2]; });
    tao.stable_sort(counted_nums_arr, function (a, b) { return a[2] > b[2]; });

    var res = [];
    for (let i = 0; i < counted_nums_arr.length; i++) {
        const e = counted_nums_arr[i];
        res.push([e[0], e[1]]);
    }


    return res;
}



const vtn = {
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

function get_real_pair(pairs, potential_pair) {
    var f = pairs.find_if(0, pairs.length, e => common.equal_pair(e, potential_pair));
    if (f != pairs.length) return potential_pair.slice();

    const potential_pair_r = potential_pair.slice().reverse();
    f = pairs.find_if(0, pairs.length, e => common.equal_pair(e, potential_pair_r));
    if (f != pairs.length) return potential_pair_r.slice();

    return null;
}

function tree_exportable(n, s, preconds, max_comps, pairs_par, values_par) {

    if (s == undefined) {
        s = common.half(n);         
    }
    // console.log(JSON.stringify(preconds));
    // console.log(preconds.length);

    // var pairs = common.gen_pairs(n);
    var pairs = common.deep_copy(pairs_par);
    pairs = common.remove_pairs_transitive(pairs, preconds);
    // console.log(JSON.stringify(pairs));
    // console.log(pairs.length);

    // var values = common.get_values(n, preconds);
    // console.log(values.length);
    var values = common.deep_copy(values_par);
    values = common.apply_precons(values, preconds);
    
    var counted_nums = count_numbers_at(values, s);
    // console.log(JSON.stringify(counted_nums));
    // console.log(Object.keys(counted_nums).length);

    if (Object.keys(counted_nums).length == 1) {
        console.log(`Ok: ${JSON.stringify(preconds)}`);
        return [true, [preconds]];
    }

    if (preconds.length >= max_comps) {
        return [false, null];
    }

    var counted_nums_pairs = count_numbers_at_pairs_sorted(counted_nums);
    for (let i = 0; i < counted_nums_pairs.length; i++) {
        const potential_pair = counted_nums_pairs[i];
        var pair = get_real_pair(pairs, potential_pair);

        if (pair != null) {
            var preconds_l = common.deep_copy(preconds);
            preconds_l.push(pair);
            // preconds = common.deep_copy(preconds);

            var res_l = tree_exportable(n, s, preconds_l, max_comps, pairs_par, values_par);
            if (!res_l[0]) {
                continue;
            }

            const pair_r = pair.slice().reverse();
            var preconds_r = common.deep_copy(preconds);
            preconds_r.push(pair_r);
            var res_r = tree_exportable(n, s, preconds_r, max_comps, pairs_par, values_par);
            if (!res_r[0]) {
                continue;
            }

            return [true, [...res_l[1], ...res_r[1]]];
        }
    }

    return [false, null];
}

function main() {

    // if (process.argv.values >= 3) {
        console.log(process.argv)
        var preconds_arg = JSON.parse(process.argv[2]);
        console.log(JSON.stringify(preconds_arg));
    // }

    var tests = [
        // [5, 9, [[2,3],[4,5],[7,8],[1,3],[5,8],[2,6]]],
        // [5, 8, [[2,3],[4,5],[1,3],[2,6],[3,6],[3,5]]],
        // [5, 8, [[2,3],[4,5],[6,7],[1,3],[5,7],[5,3]]],

        // [6, 11, 18, [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10],[2, 4],[6, 8]]],
        // [5, 9, 14, [[1, 2], [3, 4], [5, 6], [7, 8], [2, 4],[6, 8]]],
        // [4, 7, 10, [[1, 2], [3, 4], [5, 6], [2, 4]]],

        [6, 11, 18, preconds_arg],
        // [6, 11, 18, [[1,2],[3,4],[5,6],[7,8],[2,4],[6,8],[2,6],[2,5],[3,5]]],
        // [6, 11, 18, [[1,2],[3,4],[5,6],[7,8],[2,4],[6,8],[2,6],[2,5],[5,3]]],
        // [6, 11, 18, [[1,2],[3,4],[5,6],[7,8],[9,10],[2,4],[6,8]]],
        // [6, 11, 18, [[1,2],[3,4],[5,6],[7,8],[2,4],[6,8],[2,6],[2,5],[5,3],[3,6],[3,7],[3,9],[6,9],[6,7],[4,7],[4,11],[4,6],[6,11]]],
    ];

    for (let i = 0; i < tests.length; i++) {
        const e = tests[i];
        var s = e[0] - 1;
        var n = e[1];
        var max_comps = e[2];
        var preconds = e[3];
        
        
        var pairs = common.gen_pairs(n);
        pairs = common.remove_pairs_transitive(pairs, preconds);
        // console.log(JSON.stringify(pairs));
        // console.log(pairs.length);

        var values = common.get_values(n, preconds);

        var res = tree_exportable(n, s, preconds, max_comps, pairs, values);

        if (! res[0]) {
            console.log(`index: ${i} invalid: ${s+1}, ${n}, ${JSON.stringify(preconds)}`)
        } else {
            // var rev = res[1].reverse();
            console.log("-------------------------------------------------------");
            console.log("-------------------------------------------------------");
            console.log("-------------------------------------------------------");
            console.log("-------------------------------------------------------");
            console.log(JSON.stringify( res[1]));
        }
        

        // // --------------------------------------------------------------------------
        // console.log(res[0]);

        // var rev = res[1].reverse();
        // // console.log(rev);
        // console.log(JSON.stringify(rev));

    }

    


}


// profiler.startProfiling('probe', true)

// setTimeout(function() {
//     const profile = profiler.stopProfiling('probe');
//     profile.export(function(error, result) {
//         fs.writeFileSync('median_comp_tree_v5.cpuprofile', result)
//         profile.delete();
//         process.exit();
//     });
// }, 5000);

// setTimeout(function() {
//     console.log("****************************************")
//     process.exit();
// }, 5000);

main();


