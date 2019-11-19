// import { stable_sort } from 'stable_sort.mjs';
const tao = require('./stable_sort');
const common = require('./common');
const median3 = require('./median_3_generated');
const median5 = require('./median_5_generated');
const median7 = require('./median_7_generated');
// const medians_gen = require('./medians_general');

class Block {
    constructor(id, time) {
      this.id = id;
      this.time = time;
    }
}

function lt(a, b){
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


function exec_n(median_f, n, k) {
    if ( ! k) {
        k = common.half(n);
    }

    var q = Math.pow(n, n + 1);
    
    for (let i = 0; i < q; ++i) {

        if (i % 100 == 0) {
            console.log(`${(i * 100 / q).toFixed(2)}% completed...`);
        }

        const element = array_random(n, 0, n);
        var blocks_orig = create_blocks(element);

        blocks = copy_block_array(blocks_orig);
        tao.stable_sort(blocks, lt)
        var expect = blocks[k];

        blocks = copy_block_array(blocks_orig);
        var m1 = median_f(...blocks, lt);
        
        if (expect.id == m1.id) {
            // console.log("OK    ", element, expect.id, m1.id);
        } else {
            console.log("ERROR ", element, expect.id, m1.id);
            return;
        }
    }
    console.log(`Execution completed OK with ${Number(q).toLocaleString()} elements`);
    
}

function exec_n_with_data(median_f, n, data, k) {
    if ( ! k) {
        k = common.half(n);
    }

    var q = data.length;
    for (let i = 0; i < data.length; ++i) {

        if (i % 100 == 0) {
            console.log(`${(i * 100 / q).toFixed(2)}% completed...`);
        }

        const element = data[i];
        var blocks_orig = create_blocks(element);

        blocks = copy_block_array(blocks_orig);
        tao.stable_sort(blocks, lt)
        var expect = blocks[k];

        blocks = copy_block_array(blocks_orig);
        var m1 = median_f(...blocks, lt);

        if (expect.id == m1.id) {
            // console.log("OK    ", element, expect.id, m1.id);
        } else {
            console.log("ERROR ", element, expect.id, m1.id);
            return;
        }
    }
    console.log(`Execution completed OK with ${Number(q).toLocaleString()} elements`);
}


function test_all(n) {
    var data1 = generate_data_all(n);

    console.log(data1.length);
    // console.log(data1);
    console.log(JSON.stringify(data1));


    var str1 = `exec_n_with_data(median${n}.median_${n}_generated_stable, ${n}, data1);`;
    var str2 = `exec_n_with_data(median${n}.median_${n}_generated_stable, ${n}, data2);`;

    eval(str1);


    var data2 = common.generate_data_random(n);
    eval(str2);
}

function main() {
    // test_all(3);
    // test_all(5);
    test_all(7);



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




















































// function perm(xs) {
//     let ret = [];
  
//     for (let i = 0; i < xs.length; i = i + 1) {
//         let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

//         if ( ! rest.length) {
//             ret.push([xs[i]])
//         } else {
//             for (let j = 0; j < rest.length; j = j + 1) {
//                 ret.push([xs[i]].concat(rest[j]))
//             }
//         }
//     }
//     return ret;
// }

// function iota(n) {
//     var res = [];
//     for (let i = 0; i < n; ++i) {
//         res.push(i + 1);
//     }
//     return res;
// }

// function copy_array(arr) {
//     var res = [];
//     for (let i = 0; i < arr.length; ++i) {
//         const element = arr[i];
//         res.push(new Block(element.id, element.time));
//     }
//     return res;
// }
   
// function remove_duplicates(arr) {
//     var arr_str = [];
//     for (let i = 0; i < arr.length; ++i) {
//         arr_str.push(JSON.stringify(arr[i]));
//     }

//     arr_str = [...new Set(arr_str)];
    
//     var res = [];
//     for (let i = 0; i < arr_str.length; ++i) {
//         var obj = JSON.parse(arr_str[i]);
//         res.push(obj);
//     }
//     return res;
// }

// function repeat(x, n) {
//     var res = [];
//     for (let i = 0; i < n; i++) {
//         res.push(x);
//     }
//     return res;
// }

// function array_random(n, from, to) {
//     if ( ! n) n = 10;
//     if ( ! from) from = 0;
//     if ( ! to) to = 99;
//     var res = []; 
//     while (n != 0) {
//         var rand = Math.floor(Math.random() * to) + from; 
//         res.push(rand); 
//         --n;
//     } return res; 
// }

// function generate_data_random(n) {
//     var res = [];
//     var q = Math.pow(n, n + 1);
//     for (let i = 0; i < q; ++i) {
//         var data = array_random(n, 0, n);
//         res.push(data);
//     }
    
//     return res;

// }

// function half(n) {
//     return Math.floor(n / 2);    
// }

// function copy_if(data, p) {
//     var res = [];
//     for (let i = 0; i < data.length; i++) {
//         const e = data[i];
//         const r = p(...e);
//         if (r) {
//             res.push(e);
//         }
//     }
//     return res;
// }
