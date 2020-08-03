// import { stable_sort } from 'stable_sort.mjs';
const tao = require('./stable_sort');
const common = require('./common');
const median3 = require('./median_3_generated');
const median5 = require('./median_5_generated');
const median7 = require('./median_7_generated');
const median9 = require('./median_9_in_progress');
const median11 = require('./median_11_in_progress');
// const medians_gen = require('./medians_general');

g_comparissons = 0

var factorial=(n)=>Array.from({length: n},(v, k) => k+1).reduce((a, b) => a*b, 1)

class Block {
    constructor(id, time) {
      this.id = id;
      this.time = time;
    }
}

function lt_simple(a, b){
    return a < b;
}

function lt(a, b) {
    ++g_comparissons;
    // console.log(`${b.time} < ${a.time} = ${!(a.time < b.time)}`);
    return a.time < b.time;
}


function create_blocks(data) {
    var res = [];
    for (let i = 0; i < data.length; ++i) {
        res.push(new Block(i, data[i]));
    }
    return res;
}

function copy_block_array(arr) {
    var res = [];
    for (let i = 0; i < arr.length; ++i) {
        const element = arr[i];
        res.push(new Block(element.id, element.time));
    }
    return res;
}

function generate_data() {
    var data = [];
    for (var i = 0; i < arguments.length; ++i) {
        data.push(...common.perm(arguments[i]));
    }    
    data = common.remove_duplicates(data);
    return data;
}

function generate_data_all(n) {
    var res = [...common.perm(common.iota(n))];
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            res.push(
                ...common.perm(common.iota(n-j-1).concat(common.repeat(n-i, j+1)))                
            );
        }
    }
    res = common.remove_duplicates(res);
    return res;

    // // n=5
    // // var data = generate_data(
    // //     [1, 2, 3, 4, 5],

    // //     [1, 1, 2, 3, 4],
    // //     [1, 1, 1, 2, 3],
    // //     [1, 1, 1, 1, 2],
    // //     [1, 1, 1, 1, 1],
        
    // //     [1, 2, 2, 3, 4],
    // //     [1, 2, 2, 2, 3],
    // //     [1, 2, 2, 2, 2],

    // //     [1, 2, 3, 3, 4],
    // //     [1, 2, 3, 3, 3],

    // //     [1, 2, 3, 4, 4],
    // // );    
}

function copy_array(arr) {
    var res = [];
    for (let i = 0; i < arr.length; ++i) {
        const element = arr[i];
        res.push(element);
    }
    return res;
}

function exec_n(median_f, n, q, k, max_comps) {
    var total_select_comparissons = 0;
    var total_sort_comparissons = 0;
    if ( ! k) {
        k = common.half(n);
    }

    if (q == undefined) {
        q = Math.pow(n, n + 1);
    }
    
    for (let i = 0; i < q; ++i) {
        // if (i % 1000000 == 0) {
        //     console.log(`${(i * 100 / q).toFixed(2)}% completed...`);
        // }
        if (i % 10000 == 0) {
            console.log(`${(i * 100 / q).toFixed(2)}% completed...`);
        }

        // const element = common.array_random(n, 0, n);
        const element = common.array_random_non_equals(n, 0, n);

        // const element = [6,2,6,1,3,0,7,8,3];
        // const element = [5,1,3,2,7,0,4,6,8];
        // const element = [0,2,1,8,3,7,4,5,6];            //falla en select_3_7_ab_ac_ad_eb_ef_fc, FIXED
        // const element = [1,7,4,0,3,8,5,6,2];            //falla en select_4_7_abd_cd_ce_fb, FIXED
        // const element = [2,7,0,6,3,1,4,8,5];            //falla en select_4_7_ab_de_be_dc_fb, FIXED
        // const element = [3,1,4,5,8,7,6,0,2];            //falla en select_3_7_ac_bc_de_ae_db_af, FIXED
        // const element = [2, 9, 6, 0, 5, 1, 10, 4, 3, 7, 8];

        var blocks_orig = create_blocks(element);

        blocks = copy_block_array(blocks_orig);

        g_comparissons = 0;
        tao.stable_sort(blocks, lt)
        total_sort_comparissons += g_comparissons;

        var expect = blocks[k];

        blocks = copy_block_array(blocks_orig);

        // console.log(`Before execute the median algo ${element}`);

        g_comparissons = 0;

        try {
            // blocks = JSON.parse('[{"id":0,"time":2},{"id":1,"time":9},{"id":2,"time":6},{"id":3,"time":0},{"id":4,"time":5},{"id":5,"time":1},{"id":6,"time":10},{"id":7,"time":4},{"id":8,"time":3},{"id":9,"time":7},{"id":10,"time":8}]');
            var m1 = median_f(...blocks, lt);
        } catch (error) {
            console.log(JSON.stringify(blocks));
            throw error;
        }

        total_select_comparissons += g_comparissons;

        if (m1 !=null && expect.id == m1.id) {
            // console.log("OK    ", element, expect.id, m1.id);
        } else {
            const element_sorted = copy_array(element);
            tao.stable_sort(element_sorted, lt_simple);
            if (m1 == null) {
                console.log(`ERROR ${element} - ${element_sorted} - ${expect.id} - ${null} - ${expect.time} - ${null}`);
            } else {
                console.log(`ERROR ${element} - ${element_sorted} - ${expect.id} - ${m1.id} - ${expect.time} - ${m1.time}`);
            }
            // return;
        }

        if (g_comparissons <= max_comps) {
            // console.log("OK comparissons", element, expect.id, m1.id);
        } else {
            console.log(`ERROR, exceeds the number of comparisons. element: ${element}. expected <= ${max_comps}. got: ${g_comparissons}`);
            return;
        }

    }
    console.log(`Execution completed OK with ${Number(q).toLocaleString()} elements`);
    console.log(`Selection comparissons total:   ${total_select_comparissons}`);
    console.log(`Selection comparissons average: ${total_select_comparissons / q}`);
    console.log(`Sort comparissons total:        ${total_sort_comparissons}`);
    console.log(`Sort comparissons average:      ${total_sort_comparissons / q}`);
}

function exec_n_with_data(median_f, n, data, k, max_comps) {
    var total_select_comparissons = 0;
    var total_sort_comparissons = 0;
    if ( ! k) {
        k = common.half(n);
    }

    var q = data.length;
    for (let i = 0; i < q; ++i) {

        if (i % 1000000 == 0) {
            console.log(`${(i * 100 / q).toFixed(2)}% completed...`);
        }

        const element = data[i];
        var blocks_orig = create_blocks(element);

        blocks = copy_block_array(blocks_orig);

        g_comparissons = 0;
        tao.stable_sort(blocks, lt)
        total_sort_comparissons += g_comparissons;

        var expect = blocks[k];

        blocks = copy_block_array(blocks_orig);

        g_comparissons = 0;
        var m1 = median_f(...blocks, lt);
        total_select_comparissons += g_comparissons;

        if (expect.id == m1.id) {
            // console.log("OK    ", element, expect.id, m1.id);
        } else {
            console.log("ERROR ", element, expect.id, m1.id);
            return;
        }

        if (g_comparissons <= max_comps) {
            // console.log("OK comparissons", element, expect.id, m1.id);
        } else {
            console.log(`ERROR, exceeds the number of comparisons. element: ${element}. expected <= ${max_comps}. got: ${g_comparissons}`);
            return;
        }

    }
    console.log(`Execution completed OK with ${Number(q).toLocaleString()} elements`);
    console.log(`Selection comparissons total:   ${total_select_comparissons}`);
    console.log(`Selection comparissons average: ${total_select_comparissons / q}`);
    console.log(`Sort comparissons total:        ${total_sort_comparissons}`);
    console.log(`Sort comparissons average:      ${total_sort_comparissons / q}`);
}


function exec_n_with_permutations(median_f, n, k, max_comps) {
    var total_select_comparissons = 0;
    var total_sort_comparissons = 0;
    if ( ! k) {
        k = common.half(n);
    }


    //var element = common.iota(n);
    var element = [5, 0, 1, 2, 3, 4, 6, 7, 8, 9, 10];
    
    var q = factorial(n);
    var i = 0;
    do {
        // console.log(data);
        // if (i % 1000000 == 0) {
        //     console.log(`${(i * 100 / q).toFixed(2)}% completed...`);
        // }
        if (i % 10000 == 0) {
            // console.log(`${(i * 100 / q).toFixed(2)}% completed...`);
            console.log(`${i} of ${q}... --- sort cmps: ${total_sort_comparissons} vs. select cmps: ${total_select_comparissons} --- ${total_sort_comparissons / total_select_comparissons}`);
        }
        ++i;


        var blocks_orig = create_blocks(element);
        var blocks = copy_block_array(blocks_orig);

        g_comparissons = 0;
        tao.stable_sort(blocks, lt)
        total_sort_comparissons += g_comparissons;

        var expect = blocks[k];

        blocks = copy_block_array(blocks_orig);

        // console.log(`Before execute the median algo ${element}`);

        g_comparissons = 0;
        var m1 = median_f(...blocks, lt);
        total_select_comparissons += g_comparissons;

        if (m1 !=null && expect.id == m1.id) {
            // console.log("OK    ", element, expect.id, m1.id);
        } else {
            const element_sorted = copy_array(element);
            tao.stable_sort(element_sorted, lt_simple);
            if (m1 == null) {
                console.log(`ERROR ${element} - ${element_sorted} - ${expect.id} - ${null} - ${expect.time} - ${null}`);
            } else {
                console.log(`ERROR ${element} - ${element_sorted} - ${expect.id} - ${m1.id} - ${expect.time} - ${m1.time}`);
            }
            // return;
        }

        if (g_comparissons <= max_comps) {
            // console.log("OK comparissons", element, expect.id, m1.id);
        } else {
            console.log(`ERROR, exceeds the number of comparisons. element: ${element}. expected <= ${max_comps}. got: ${g_comparissons}`);
            return;
        }        
    } while(common.next_permutation(element, 0, element.length));

    console.log(`i vs q: ${i} vs ${q}`)

    console.log(`Execution completed OK with ${Number(q).toLocaleString()} elements`);
    console.log(`Selection comparissons total:   ${total_select_comparissons}`);
    console.log(`Selection comparissons average: ${total_select_comparissons / q}`);
    console.log(`Sort comparissons total:        ${total_sort_comparissons}`);
    console.log(`Sort comparissons average:      ${total_sort_comparissons / q}`);
}


function test_all(n, max_comps) {

    if (n <= 7) {   // To avoid exceeding the call stack size
        var data1 = generate_data_all(n);
        console.log(`Starting tests with deterministic data of lenght: ${data1.length}`);
        // console.log(data1);
        // console.log(JSON.stringify(data1));
        var str1 = `exec_n_with_data(median${n}.median_${n}_generated_stable, ${n}, data1, undefined, max_comps);`;
        eval(str1);
    
    
        var data2 = common.generate_data_random(n);
        console.log(`Starting tests with random data of lenght: ${data2.length}`);
        var str2 = `exec_n_with_data(median${n}.median_${n}_generated_stable, ${n}, data2, undefined, max_comps);`;
        eval(str2);
    } else {


        // // var q = Math.pow(n, n + 1);
        // var q = factorial(n) * 10;
        // console.log(`Starting tests with random data of lenght: ${q}`);
        // var str2 = `exec_n(median${n}.median_${n}_generated_stable, ${n}, ${q}, undefined, max_comps);`;
        // eval(str2);

        console.log(`Starting tests with random data of lenght: unknown`);
        var str2 = `exec_n_with_permutations(median${n}.median_${n}_generated_stable, ${n}, undefined, max_comps);`;
        eval(str2);

    }
}

function main() {
    

    var element = [5, 0, 1, 2, 3, 4, 6, 7, 8, 9, 10];
    median11.median_11_generated_stable(...element, lt_simple);


    // test_all(3);
    // test_all(5, 6);
    // test_all(7, 10);
    // test_all(9, 14);
    test_all(11, 19);



    // // ---------------------------------------------------------------


    // // ---------------------------------------------------------------
    // // // n=5
    // // // var data = generate_data(
    // // //     [1, 2, 3, 4, 5],

    // // //     [1, 1, 2, 3, 4],
    // // //     [1, 1, 1, 2, 3],
    // // //     [1, 1, 1, 1, 2],
    // // //     [1, 1, 1, 1, 1],
        
    // // //     [1, 2, 2, 3, 4],
    // // //     [1, 2, 2, 2, 3],
    // // //     [1, 2, 2, 2, 2],

    // // //     [1, 2, 3, 3, 4],
    // // //     [1, 2, 3, 3, 3],

    // // //     [1, 2, 3, 4, 4],
    // // // );

    // // // var data = [
    // // // ];
    
    // // var data = generate_data_random(5);
    // // // exec_n_with_data(median_5_generated, 5, data);
    // // exec_n_with_data(median_5_generated_stable, 5, data);



    // // ---------------------------------------------------------------
    // // var data = [
    // //     [1, 2, 3, 4, 5, 6, 7]
    // // ];

    // // // var data = generate_data_random(7);
    // // exec_n_with_data(median_7_generated, 7, data);
    // // exec_n(median_7_generated, 7);

    // // ---------------------------------------------------------------

    // // var data = generate_data_random(5);
    // // data = copy_if(data, function(a, b, c, d, e) {
    // //     return a <= c && 
    // //            a <= e && 
    // //            b <= c && 
    // //            b <= d;
    // // });
    // // exec_n_with_data(select_2_5_ac_ae_bc_bd, 5, data);

    // // ---------------------------------------------------------------

    // var data = generate_data_all(5);
    // // data = copy_if(data, function(a, b, c, d, e) {
    // //     return a <= b && 
    // //            e <= b && 
    // //            c <= d;
    // // });

    // data = copy_if(data, function(a, b, c, d, e) {
    //     return a < b && 
    //            e < b && 
    //            c < d;
    // });
    
    // // var data = [
    // //     [0, 3, 1, 2, 3]
    // // ];

    // exec_n_with_data(select_3_5_ab_cd_eb, 5, data, 3);

}

main();






    
    // n=3
    // var data = [
    //     nodes.push(...res_left[1]);
    //     [[1, 2, 3], 1],
    //     [[1, 3, 2], 2],
    //     [[3, 1, 2], 2],
    //     [[3, 2, 1], 1],
    //     [[2, 3, 1], 0],
    //     [[2, 1, 3], 0],

    //     [[1, 2, 2], 1],
    //     [[2, 1, 2], 0],
    //     [[2, 2, 1], 0],
    //     [[1, 1, 2], 1],
    //     [[2, 1, 1], 2],
    //     [[1, 2, 1], 2],

    //     [[1, 1, 1], 1],
    // ];

    // var data = [
    //     [1, 1, 1],
    // ];
    // data.push(...common.perm([1, 2, 3]));
    // data.push(...common.perm([1, 2, 2]));
    // data.push(...common.perm([1, 1, 2]));
    // data = common.remove_duplicates(data);





// -------------------------------------------------------------------------
// Statistics
// -------------------------------------------------------------------------
// 
// n = 7
//
// Starting tests with deterministic data of lenght: 25341
// Execution completed OK with 25,341 elements
// Selection comparissons total:   249621
// Selection comparissons average: 9.850479460163372
// Sort comparissons total:        543277
// Sort comparissons average:      21.438656722307723
// Starting tests with random data of lenght: 5764801
// Execution completed OK with 5,764,801 elements
// Selection comparissons total:   56785928
// Selection comparissons average: 9.850457630714399
// Sort comparissons total:        120082083
// Sort comparissons average:      20.830221719708973
// 
// n = 9
//
// Starting tests with random data of lenght: 3628800
// Execution completed OK with 3,628,800 elements
// Selection comparissons total:   49677572
// Selection comparissons average: 13.689807098765431
// Sort comparissons total:        124408539
// Sort comparissons average:      34.28365823412698
// 
// n = 11
//
