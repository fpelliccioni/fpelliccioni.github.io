class Block {
    constructor(id, time) {
      this.id = id;
      this.time = time;
    }
}

function lt(a, b){
    // return a.time < b.time;
    var res = a.time < b.time;
    // console.log(`${a.time} < ${b.time} = ${res}`)
    return res;
}


function GetSuitableBlock(blocks) {
    if (blocks[0].time > blocks[2].time) {
        [blocks[0], blocks[2]] = [blocks[2], blocks[0]];
    }

    if (blocks[0].time > blocks[1].time) {
        [blocks[0], blocks[1]] = [blocks[1], blocks[0]];
    }

    if (blocks[1].time > blocks[2].time) {
        [blocks[1], blocks[2]] = [blocks[2], blocks[1]];
    }

    return blocks[1];
}

function max(a, b, r) {
    return r(b, a) ? a : b;
}

function median_3_ab(a, b, c, r) {
    // precondition: a <= b
    
    return !r(c, b)
        ? b :           // a, b, c are sorted
        max(a, c, r); // b is not the median
}

function median_3(a, b, c, r) {
    return r(b, a)
        ? median_3_ab(b, a, c, r)
        : median_3_ab(a, b, c, r);
}

// ------------------------------------------------------------

// function compare_strict_or_reflexive(strict) {

//     if (strict) {
//         return function (a, b, r) {
//             return r(a, b);
//         }
//     }

//     //reflexive
//     return function (a, b, r) {
//         return !r(b, a); // complement of converse r (a, b)    
//     }
// };

// function select_1_2_unstable(a, b, r, ia, ib) {
//     var cmp = compare_strict_or_reflexive(ia < ib);

//     return cmp(b, a, r)
//         ? a
//         : b;
// }

// function select_1_3_ab_unstable(a, b, c, r, ia, ib, ic) {
//     var cmp = compare_strict_or_reflexive(ib < ic);
    
//     return ! cmp(c, b, r)
//         ? b             // a, b, c are sorted
//         : select_1_2_unstable(a, c, r, ia, ic); // b is not the median
// }

// function select_1_3_unstable(a, b, c, r, ia, ib, ic) {
//     var cmp = compare_strict_or_reflexive(ia < ib);
//     return cmp(b, a, r)
//         ? select_1_3_ab_unstable(b, a, c, r, ib, ia, ic)
//         : select_1_3_ab_unstable(a, b, c, r, ia, ib, ic);
// }

// function median_3_unstable(a, b, c, r) {
//     return select_1_3_unstable(a, b, c, r, 0, 1, 2);
// }

// ------------------------------------------------------------

function select_0_2(a, b, r) {
    return r(b, a) ? b : a;
}

function select_1_3_ac_unstable(a, b, c, r) {
    return r(b, a)              // r(2, 1) 2 < 1  false
        ? a                     // b, a, c are sorted
        : select_0_2(b, c, r);  // a is not the median
}

function median_3_unstable(a, b, c, r) {
    return r(c, a)
        ? select_1_3_ac_unstable(c, b, a, r)
        : select_1_3_ac_unstable(a, b, c, r);
}

// ------------------------------------------------------------


function median_3_unstable_inline(a, b, c, r) {
    return c < a
        ? r(b, c) ? c : select_0_2(b, a, r)
        : r(b, a) ? a : select_0_2(b, c, r);
}


// ------------------------------------------------------------

// // unstable
// function median_3_generated(a, b, c, r) {
//     if (r(a, b)) {
//         if (r(a, c)) {
//             if (r(b, c)) {
//                 return b;
//             } else {
//                 return c;
//             }
//         } else {
//             return a;
//         }
//     } else {
//         if (r(a, c)) {
//             return a;
//         } else {
//             if (r(b, c)) {
//                 return c;
//             } else {
//                 return b;
//             }
//         }
//     }
// }

function median_3_generated(a, b, c, r) {
    if (r(a, b)) {
        if (r(b, c)) {
            return b;
        } else {    //a < b && b >= c:  [a|c]b
            if (r(a, c)) {
                return c;
            } else {
                return a;
            }
            return a;
        }
    } else {
        if (r(b, c)) {
            return a;
        } else {
            if (r(a, c)) {
                return c;
            } else {
                return b;
            }
        }
    }
}


// ------------------------------------------------------------

function copy_array(arr) {
    var res = [];
    for (let i = 0; i < arr.length; ++i) {
        const element = arr[i];
        res.push(new Block(element.id, element.time));
    }
    return res;
}


function create_blocks(data) {
    var res = [];
    for (let i = 0; i < data.length; i++) {
        res.push(new Block(i, data[i]));
    }
    return res;
}

function exec_1(data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        var blocks_orig = create_blocks(element[0]);
        var expect = element[1];
        // console.log(blocks_orig);

        var blocks = copy_array(blocks_orig);
        var m1 = GetSuitableBlock(blocks);
        // console.log(m1);

        blocks = copy_array(blocks_orig);
        var m2 = median_3(blocks[0], blocks[1], blocks[2], lt);
        // console.log(m2);
        // var m2 = m1;

        blocks = copy_array(blocks_orig);
        var m3 = median_3_unstable(blocks[0], blocks[1], blocks[2], lt);

        // console.log(m3);

        if (expect == m1.id && m1.id == m2.id && m2.id == m3.id) {
            console.log("OK    ", i, expect, m1.id, m2.id, m3.id);
        } else {
            console.log("ERROR ", i, expect, m1.id, m2.id, m3.id);
        }
    }
}

function exec_2(data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        var blocks_orig = create_blocks(element[0]);
        var expect = element[1];
        // console.log(blocks_orig);

        blocks = copy_array(blocks_orig);
        var m1 = median_3(blocks[0], blocks[1], blocks[2], lt);

        blocks = copy_array(blocks_orig);
        var m2 = median_3_generated(blocks[0], blocks[1], blocks[2], lt);

        // console.log(m3);

        if (expect == m1.id && m1.id == m2.id) {
            console.log("OK    ", i, expect, m1.id, m2.id);
        } else {
            console.log("ERROR ", i, expect, m1.id, m2.id);
        }
    }
}

function main() {
    
    var stable_data = [
        [[1, 2, 3], 1],
        [[1, 3, 2], 2],
        [[3, 1, 2], 2],
        [[3, 2, 1], 1],
        [[2, 3, 1], 0],
        [[2, 1, 3], 0],

        [[1, 2, 2], 1],
        [[2, 1, 2], 0],
        [[2, 2, 1], 0],
        [[1, 1, 2], 1],
        [[2, 1, 1], 2],
        [[1, 2, 1], 2],

        [[1, 1, 1], 1],
];

    // var abc_data = [
    //     [[1, 2, 3], 1],
    //     [[1, 3, 2], 2],
    //     [[3, 1, 2], 2],
    //     [[3, 2, 1], 1],
    //     [[2, 3, 1], 0],
    //     [[2, 1, 3], 0],

    //     [[1, 2, 2], 1],
    //     [[2, 1, 2], 0],
    //     [[2, 2, 1], 1], //* stable: 0
    //     [[1, 1, 2], 1],
    //     [[2, 1, 1], 1], //* stable: 2
    //     [[1, 2, 1], 2],

    //     [[1, 1, 1], 1],

    // ];

    // exec_1(abc_data);
    exec_2(stable_data);


    // var blocks0 = [
    //     new Block(1, 1558731500),
    //     new Block(2, 1558731500), //same time as previous
    //     new Block(3, 1558730000)
    // ];


    // var blocks0 = [
    //     new Block(1, 2),
    //     new Block(2, 2),
    //     new Block(3, 1)
    // ];
    // var blocks1 = copy_array(blocks0);


    // var m1 = GetSuitableBlock(blocks0);
    // console.log(m1);

    // var m2 = median_3(blocks1[0], blocks1[1], blocks1[2], lt);
    // console.log(m2);

    // var m3 = median_3_unstable(blocks1[0], blocks1[1], blocks1[2], lt);
    // console.log(m3);

}

main();


// template <Regular T, StrictWeakOrdering R>
// auto max(T const& a, U const& b, R r) {
//     return r(b, a) ? b : a;
// }

// template <Regular T, StrictWeakOrdering R>
// auto median_3_ab(T const& a, T const& b, T const& c, R r) {
//     // precondition: a <= b
    
//     return ! r(c, b) ? b :           // a, b, c are sorted
//                        max(a, c, r); // b is not the median
// }

// template <Regular T, StrictWeakOrdering R>
// auto median_3(T const& a, T const& b, T const& c, R r) {
//     return r(b, a) ? median_3_ab(b, a, c, r) 
//                    : median_3_ab(a, b, c, r);
// }


// static const CBlockIndex *GetSuitableBlock(const CBlockIndex *pindex) {
//     assert(pindex->nHeight >= 3);

//     /**
//     * In order to avoid a block is a very skewed timestamp to have too much
//     * influence, we select the median of the 3 top most blocks as a starting
//     * point.
//     */
//     const CBlockIndex *blocks[3];
//     blocks[2] = pindex;
//     blocks[1] = pindex->pprev;
//     blocks[0] = blocks[1]->pprev;

//     // Sorting network.
//     if (blocks[0]->time > blocks[2]->time) {
//         std::swap(blocks[0], blocks[2]);
//     }

//     if (blocks[0]->time > blocks[1]->v) {
//         std::swap(blocks[0], blocks[1]);
//     }

//     if (blocks[1]->time > blocks[2]->time) {
//         std::swap(blocks[1], blocks[2]);
//     }

//      // We should have our candidate in the middle now.
//     return blocks[1];
// }