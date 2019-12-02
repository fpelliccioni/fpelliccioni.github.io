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

function recursive_v3(suggested_pairs, level, n, values, pairs, used_par, cmp_n, cmp_max) {
    var nodes = [];

    var used = used_par.slice();

    // var first_not_used_min = used.indexOf(false);
    // var first_not_used = first_not_used_min;

    var medians_all = common.all_median(n, values);
    var possible_pairs = common.get_pairs(pairs, used, medians_all);

    if (medians_all.length <= 1) {
        console.log("Opaaaaaa 3");
    }

    //TODO: get an appropiate thresold to see when it is convinient to sort.
    // if (level >= 4) {
    if (level >= 0) {
            // console.log("Sorting possible_pairs");
        possible_pairs.sort(function(ai, bi) {
            // return a.sort1 - b.sort1  ||  a.sort2 - b.sort2;

            var a_selected_left = pairs[ai];
            var a_selected_right = a_selected_left.slice().reverse();
            var a_new_values_left = common.remove_values(values, a_selected_left);
            var a_new_values_right = common.remove_values(values, a_selected_right);
            var a_medians_left = common.all_median(n, a_new_values_left);
            var a_medians_right = common.all_median(n, a_new_values_right);
            var a_medians_total_len = a_medians_left.length + a_medians_right.length;
            var a_values_total_len = a_new_values_left.length + a_new_values_right.length;

            var b_selected_left = pairs[bi];
            var b_selected_right = b_selected_left.slice().reverse();
            var b_new_values_left = common.remove_values(values, b_selected_left);
            var b_new_values_right = common.remove_values(values, b_selected_right);
            var b_medians_left = common.all_median(n, b_new_values_left);
            var b_medians_right = common.all_median(n, b_new_values_right);
            var b_medians_total_len = b_medians_left.length + b_medians_right.length;
            var b_values_total_len = b_new_values_left.length + b_new_values_right.length;

    //         console.log(`ai:                  ${ai}
    // bi:                  ${bi}
    // a_new_values_left:   ${a_new_values_left.length}
    // a_new_values_right:  ${a_new_values_right.length}. 
    // a_medians_left:      ${a_medians_left.length}. 
    // a_medians_right:     ${a_medians_right.length}
    // a_medians_total_len: ${a_medians_total_len}
    // a_values_total_len:  ${a_values_total_len}
    // ------------------------------------------------
    // b_new_values_left:   ${b_new_values_left.length}
    // b_new_values_right:  ${b_new_values_right.length}. 
    // b_medians_left:      ${b_medians_left.length}. 
    // b_medians_right:     ${b_medians_right.length}
    // b_medians_total_len: ${b_medians_total_len}
    // b_values_total_len:  ${b_values_total_len}
    // ------------------------------------------------
    // ------------------------------------------------`)

            return a_medians_total_len - b_medians_total_len || a_values_total_len - b_values_total_len;
        });
    }

    for (let i = 0; i < possible_pairs.length; ++i) {
        const first_not_used = possible_pairs[i];
            
        used[first_not_used] = true;
        var selected_left = pairs[first_not_used];
        var selected_right = selected_left.slice().reverse();
        
        var new_values_left = common.remove_values(values, selected_left);
        var new_values_right = common.remove_values(values, selected_right);

        ++cmp_n;
        ++__try;

        if (__try % 100000 == 0) {
            console.log(__try);
            common.print_bool_arr(used);
        }

        // if (level == 7) {
        //     if (selected_left[0] == 5 && selected_left[1] == 7) {
        //         console.log();
        //     }
        // }

        // if (__try >= 574300000) {
        //     // [7,[5,7]]
        //     if (level == 7) {
        //         if (selected_left[0] == 5 && selected_left[1] == 7) {
        //             console.log();
        //         }
        //     }
        // }


        var medians_left = common.all_median(n, new_values_left);
        var medians_right = common.all_median(n, new_values_right);

        // console.log(`level: ${level}. new_values_left: ${new_values_left.length}. new_values_right: ${new_values_right.length}. medians_left: ${medians_left.length}. medians_right: ${medians_right.length}`)

        if (medians_left.length == 0 || medians_right.length == 0) {
            // console.log("Opaaaaaa 1")
            used[first_not_used] = false;
            --cmp_n;
            continue;
        }
        // if (medians_right.length == 0) {
        //     console.log("Opaaaaaa 2")
        // }

        if (common.all_equal(medians_left) && common.all_equal(medians_right)) {
            if (cmp_n != cmp_max) {
                var res_left = complete_empty_levels(level + 1, cmp_n, cmp_max);
                var res_right = complete_empty_levels(level + 1, cmp_n, cmp_max);
                nodes.push(...res_right[1]);
                nodes.push(...res_left[1]);
                nodes.push([level, selected_left]);
                return [true, nodes];
            } else {
                return [true, [[level, selected_left]]];
            }
        }

        if (cmp_n == cmp_max) {
            used[first_not_used] = false;
            --cmp_n;
            continue;
        }

        if (medians_left.length == 1) {
            var res_left = complete_empty_levels(level + 1, cmp_n, cmp_max);
        } else {
            var res_left = recursive_v3(suggested_pairs, level + 1, n, new_values_left, pairs, used, cmp_n, cmp_max);
            if ( ! res_left[0]) {
                used[first_not_used] = false;
                --cmp_n;
                continue;
            } 
        }

        if (medians_right.length == 1) {
            var res_right = complete_empty_levels(level + 1, cmp_n, cmp_max);
        } else {
            var res_right = recursive_v3(suggested_pairs, level + 1, n, new_values_right, pairs, used, cmp_n, cmp_max);
            if (!res_right[0]) {
                used[first_not_used] = false;
                --cmp_n;
                continue;
            }
        }

        nodes.push(...res_right[1]);
        nodes.push(...res_left[1]);
        nodes.push([level, selected_left]);
        return [true, nodes];
    }

    return false, [];

}

function recursive_v2(suggested_pairs, level, n, values, pairs, used_par, cmp_n, cmp_max, s) {
    var nodes = [];

    var used = used_par.slice();

    // var first_not_used_min = used.indexOf(false);
    // var first_not_used = first_not_used_min;

    // var medians_all = common.all_median(n, values);
    var medians_all = common.all_selection(n, values, s);

    var possible_pairs = common.get_pairs(pairs, used, medians_all);

    if (medians_all.length <= 1) {
        console.log("Opaaaaaa 3");
    }

    for (let i = 0; i < possible_pairs.length; ++i) {
        const first_not_used = possible_pairs[i];
            
        used[first_not_used] = true;
        var selected_left = pairs[first_not_used];
        var selected_right = selected_left.slice().reverse();
        
        var new_values_left = common.remove_values(values, selected_left);
        var new_values_right = common.remove_values(values, selected_right);

        ++cmp_n;
        ++__try;

        if (__try % 100000 == 0) {
            console.log(__try);
            common.print_bool_arr(used);
        }

        // if (level == 7) {
        //     if (selected_left[0] == 5 && selected_left[1] == 7) {
        //         console.log();
        //     }
        // }

        // if (__try >= 574300000) {
        //     // [7,[5,7]]
        //     if (level == 7) {
        //         if (selected_left[0] == 5 && selected_left[1] == 7) {
        //             console.log();
        //         }
        //     }
        // }

        var medians_left = common.all_selection(n, new_values_left, s);
        var medians_right = common.all_selection(n, new_values_right, s);

        // console.log(`level: ${level}. new_values_left: ${new_values_left.length}. new_values_right: ${new_values_right.length}. medians_left: ${medians_left.length}. medians_right: ${medians_right.length}`)

        if (medians_left.length == 0 || medians_right.length == 0) {
            // console.log("Opaaaaaa 1")
            used[first_not_used] = false;
            --cmp_n;
            continue;
        }
        // if (medians_right.length == 0) {
        //     console.log("Opaaaaaa 2")
        // }

        if (common.all_equal(medians_left) && common.all_equal(medians_right)) {
            if (cmp_n != cmp_max) {
                var res_left = complete_empty_levels(level + 1, cmp_n, cmp_max);
                var res_right = complete_empty_levels(level + 1, cmp_n, cmp_max);
                nodes.push(...res_right[1]);
                nodes.push(...res_left[1]);
                nodes.push([level, selected_left]);
                return [true, nodes];
            } else {
                return [true, [[level, selected_left]]];
            }
        }

        if (cmp_n == cmp_max) {
            used[first_not_used] = false;
            --cmp_n;
            continue;
        }

        if (medians_left.length == 1) {
            var res_left = complete_empty_levels(level + 1, cmp_n, cmp_max);
        } else {
            var res_left = recursive_v2(suggested_pairs, level + 1, n, new_values_left, pairs, used, cmp_n, cmp_max, s);
            if ( ! res_left[0]) {
                used[first_not_used] = false;
                --cmp_n;
                continue;
            } 
        }

        if (medians_right.length == 1) {
            var res_right = complete_empty_levels(level + 1, cmp_n, cmp_max);
        } else {
            var res_right = recursive_v2(suggested_pairs, level + 1, n, new_values_right, pairs, used, cmp_n, cmp_max, s);
            if (!res_right[0]) {
                used[first_not_used] = false;
                --cmp_n;
                continue;
            }
        }

        nodes.push(...res_right[1]);
        nodes.push(...res_left[1]);
        nodes.push([level, selected_left]);
        return [true, nodes];
    }

    return false, [];
}

function recursive_v1(level, n, values, pairs, used_par, cmp_n, cmp_max) {
    var nodes = [];
    // var values = values_par.slice();
    var used = used_par.slice();
    var first_not_used_min = used.indexOf(false);
    var first_not_used = first_not_used_min;

    while (true) {
        used[first_not_used] = true;
        var selected_left = pairs[first_not_used];
        var selected_right = selected_left.slice().reverse();
        
        var new_values_left = common.remove_values(values, selected_left);
        var new_values_right = common.remove_values(values, selected_right);

        ++cmp_n;
        ++__try;

        if (__try % 100000 == 0) {
            console.log(__try);
            common.print_bool_arr(used);
        }

        // if (level == 7) {
        //     if (selected_left[0] == 5 && selected_left[1] == 7) {
        //         console.log();
        //     }
        // }

        // if (__try >= 574300000) {
        //     // [7,[5,7]]
        //     if (level == 7) {
        //         if (selected_left[0] == 5 && selected_left[1] == 7) {
        //             console.log();
        //         }
        //     }
        // }


        
        if (common.all_median_equals(n, new_values_left) && common.all_median_equals(n, new_values_right)) {
            return [true, [[level, selected_left]]];
            //TODO: que nivel tenemos siempre acá?
        }

        if (cmp_n == cmp_max) {
            var first_not_used_new = used.indexOf(false, first_not_used);
            if (first_not_used_new == -1) {
                return false, [];
            }
            used[first_not_used] = false;
            first_not_used = first_not_used_new;
            --cmp_n;
            continue;
        }

        var res_left = recursive_v1(level + 1, n, new_values_left, pairs, used, cmp_n, cmp_max);

        if ( ! res_left[0]) {
            var first_not_used_new = used.indexOf(false, first_not_used);
            if (first_not_used_new == -1) {
                return false, [];
            }
            used[first_not_used] = false;
            first_not_used = first_not_used_new;
            --cmp_n;
            continue;
        } 

        var res_right = recursive_v1(level + 1, n, new_values_right, pairs, used, cmp_n, cmp_max);
        if (!res_right[0]) {
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

        nodes.push(...res_left[1]);
        nodes.push(...res_right[1]);
        nodes.push([level, selected_left]);
        return [true, nodes];
    }
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


    // console.log(d);
    return d;

}

// function tree_exportable(n, comps, s) {

//     if (s == undefined) {
//         s = common.half(n);         
//     }
//     // var s = 4;

//     var vtn = {
//         1: [0],
//         2: [1,1],
//         3: [2,3,2],
//         4: [3,4,4,3],
//         5: [4,6,6,6,4],
//         6: [5,7,8,8,7,5],
//         7: [6,8,10,10,10,8,6],
//         8: [7,9,11,12,12,11,9,7],
//         9: [8,11,12,14,14,14,12,11,8],
//         10: [9,12,14,15,16,16,15,14,12,9],
//     };


//     var pairs = common.gen_pairs(n);
//     console.log(JSON.stringify(pairs));

//     // // ---------------------------------------------------------------------------------
//     // // pairs for n=7
//     // // var pairs =[ [ 1, 2 ],
//     // //              [ 3, 4 ],
//     // //              [ 2, 4 ],
//     // //              [ 5, 6 ],
//     // //              [ 2, 6 ],
//     // //              [ 3, 5 ],
//     // //              [ 2, 7 ],
//     // //              [ 5, 7 ],
//     // //              [ 4, 5 ],
//     // //              [ 1, 3 ],
//     // //              [ 1, 4 ],
//     // //              [ 1, 5 ],
//     // //              [ 1, 6 ],
//     // //              [ 1, 7 ],
//     // //              [ 2, 3 ],
//     // //              [ 2, 5 ],
//     // //              [ 3, 6 ],
//     // //              [ 3, 7 ],
//     // //              [ 4, 6 ],
//     // //              [ 4, 7 ],
//     // //              [ 6, 7 ] ];

//     // // var pairs = [
//     // //     [1, 2],
//     // //     [3, 4],
//     // //     [2, 4],
//     // //     [5, 6],
//     // //     [2, 5],
//     // //     [3, 5],
//     // //     [1, 3],
//     // //     [5, 7],
//     // //     [2, 6],
//     // //     [3, 6],
//     // //     [2, 7],
//     // //     [4, 5],
//     // //     [1, 4],
//     // //     [1, 5],
//     // //     [1, 6],
//     // //     [1, 7],
//     // //     [2, 3],
//     // //     [3, 7],
//     // //     [4, 6],
//     // //     [4, 7],
//     // //     [6, 7]];

//     // var pairs = [
//     //     [1, 2],
//     //     [3, 4],
//     //     [2, 4],
//     //     [5, 6],
//     //     [2, 6],
//     //     [2, 5],
//     //     [5, 7],
//     //     [3, 5],
//     //     [4, 5],
//     //     [3, 6],
//     //     [3, 7],
//     //     [6, 7],
//     //     [2, 7],
//     //     [4, 7],
//     //     [2, 3],
//     //     [1, 7],
//     //     [1, 5],
//     //     [1, 3],
//     //     [1, 6],
//     //     [4, 6],
//     //     [1, 4]];

//     // var suggested_pairs_7 = [
//     //     [ 1, 2],
//     //     [ 3, 4],
//     //     [ 2, 4],
//     //     [ 5, 6],
//     //     [ 2, 5],
//     //     [ 3, 5],
//     //     [ 1, 3],
//     // ];

//     // var used_pairs = common.gen_empty_array(n);
//     // var values = common.perm(common.iota(n));
//     // // console.log(pairs);
//     // var s = common.half(n);         

//     // // var res = recursive_v3(suggested_pairs_7, 0, n, values, pairs, used_pairs, 0, comps);
//     // var res = recursive_v2(suggested_pairs_7, 0, n, values, pairs, used_pairs, 0, comps,s);
//     // // var res = recursive_v1(0, n, values, pairs, used_pairs, 0, comps);




//     // // ---------------------------------------------------------------------------------
//     // // pairs for n=7 CASO ESPECIAL... necesito select_3_7_ac_bc_de_ae_bd_af()
//     // // filtros: ac ae af bc bd  de

//     // // var pairs = common.gen_pairs(n);
//     // var pairs = [[1,2],[1,4],[1,7],[2,5],[2,6],[2,7],[3,4],[3,5],[3,6],[3,7],[4,6],[4,7],[5,6],[5,7],[6,7],
//     //                 [1,3],
//     //                 [1,5],
//     //                 [1,6],
//     //                 [2,3],
//     //                 [2,4],
//     //                 [4,5],   
//     //                 ];

//     // var suggested_pairs_7 = [];

//     // var used_pairs = common.gen_empty_array(n);
//     // var values = common.perm(common.iota(n));

//     // values = common.remove_values(values, [1,3]);
//     // values = common.remove_values(values, [1,5]);
//     // values = common.remove_values(values, [1,6]);
//     // values = common.remove_values(values, [2,3]);
//     // values = common.remove_values(values, [2,4]);
//     // values = common.remove_values(values, [4,5]);

//     // // var zzz = common.equal_array(values2, values);
//     // comps = 5;
//     // var s = common.half(n);

//     // var res = recursive_v2(suggested_pairs_7, 0, n, values, pairs, used_pairs, 0, comps,s);

//     // // ---------------------------------------------------------------------------------
//     // // pairs for n=7 CASO ESPECIAL... necesito select_4_7_abd_cd_ce_fb()
//     // // filtros: ab bd cd ce fb

//     // // var pairs = common.gen_pairs(n);
//     // // console.log(JSON.stringify(pairs));
    
    
//     // var pairs = [[1,3],[1,4],[1,5],[1,6],[1,7],[2,3],[2,5],[2,7],[3,6],[3,7],[4,5],[4,6],[4,7],[5,6],[5,7],[6,7],
//     //                 [1,2],
//     //                 [2,4],
//     //                 [3,4],
//     //                 [3,5],
//     //                 [6,2],
//     // ];
    
//     // var suggested_pairs_7 = [];

//     // var used_pairs = common.gen_empty_array(n);
//     // var values = common.perm(common.iota(n));

//     // values = common.remove_values(values, [1,2]);
//     // values = common.remove_values(values, [2,4]);
//     // values = common.remove_values(values, [3,4]);
//     // values = common.remove_values(values, [3,5]);
//     // values = common.remove_values(values, [6,2]);

//     // comps = 5;
//     // var s = 4;           //common.half(n);

//     // var res = recursive_v2(suggested_pairs_7, 0, n, values, pairs, used_pairs, 0, comps, s);
//     // // var res = recursive_v3(suggested_pairs_7, 0, n, values, pairs, used_pairs, 0, comps);

//     // // --------------------------------------------------------------------------


//     // // ---------------------------------------------------------------------------------
//     // // pairs for n=7 CASO ESPECIAL... necesito select_4_7_ab_de_be_dc_fb()
//     // // filtros: ab be dc de fb

//     // var pairs_str = `[[1,3],[1,4],[1,5],[1,6],[1,7],[2,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6],[4,7],[5,6],[5,7],[6,7],
//     //                   [1,2],[2,5],[4,3],[4,5],[6,2]
//     //                  ]`

//     // var pairs = JSON.parse(pairs_str);
    
//     // var suggested_pairs_7 = [];

//     // var used_pairs = common.gen_empty_array(n);
//     // var values = common.perm(common.iota(n));

//     // values = common.remove_values(values, [1,2]);
//     // values = common.remove_values(values, [2,5]);
//     // values = common.remove_values(values, [4,3]);
//     // values = common.remove_values(values, [4,5]);
//     // values = common.remove_values(values, [6,2]);

//     // comps = 5;
//     // var s = 4;           //common.half(n);

//     // var res = recursive_v2(suggested_pairs_7, 0, n, values, pairs, used_pairs, 0, comps, s);
//     // // var res = recursive_v3(suggested_pairs_7, 0, n, values, pairs, used_pairs, 0, comps);

//     // // --------------------------------------------------------------------------


//     // // ---------------------------------------------------------------------------------
//     // // pairs for n=7 CASO ESPECIAL... necesito select_3_7_ac_bc_de_ae_db_af()
                                                
//     // // filtros: ac ae af bc db de

//     // // var pairs = common.gen_pairs(n);
//     // var pairs = [[1,2],[1,4],[1,7],[2,5],[2,6],[2,7],[3,4],[3,5],[3,6],[3,7],[4,6],[4,7],[5,6],[5,7],[6,7],
//     //                 [1,3],
//     //                 [1,5],
//     //                 [1,6],
//     //                 [2,3],
//     //                 [4,2],
//     //                 [4,5],   
//     //                 ];

//     // var suggested_pairs_7 = [];

//     // var used_pairs = common.gen_empty_array(n);
//     // var values = common.perm(common.iota(n));

//     // values = common.remove_values(values, [1,3]);
//     // values = common.remove_values(values, [1,5]);
//     // values = common.remove_values(values, [1,6]);
//     // values = common.remove_values(values, [2,3]);
//     // values = common.remove_values(values, [4,2]);
//     // values = common.remove_values(values, [4,5]);

//     // comps = 5;
//     // var s = common.half(n);


//     // var res = recursive_v2(suggested_pairs_7, 0, n, values, pairs, used_pairs, 0, comps, s);


//     // ---------------------------------------------------------------------------------

//     // // pairs for n=9

//     // // var pairs = [
//     // //     [1, 2],
//     // //     [1, 3],
//     // //     [1, 4],
//     // //     [1, 5],
//     // //     [1, 6],
//     // //     [1, 7],
//     // //     [1, 8],
//     // //     [1, 9],
//     // //     [2, 3],
//     // //     [2, 4],
//     // //     [2, 5],
//     // //     [2, 6],
//     // //     [2, 7],
//     // //     [2, 8],
//     // //     [2, 9],
//     // //     [3, 4],
//     // //     [3, 5],
//     // //     [3, 6],
//     // //     [3, 7],
//     // //     [3, 8],
//     // //     [3, 9],
//     // //     [4, 5],
//     // //     [4, 6],
//     // //     [4, 7],
//     // //     [4, 8],
//     // //     [4, 9],
//     // //     [5, 6],
//     // //     [5, 7],
//     // //     [5, 8],
//     // //     [5, 9],
//     // //     [6, 7],
//     // //     [6, 8],
//     // //     [6, 9],
//     // //     [7, 8],
//     // //     [7, 9],
//     // //     [8, 9]];


//     // var pairs = [
//     //     [1, 2],
//     //     [3, 4],
//     //     [2, 4],
//     //     [5, 6],
//     //     [2, 6],
//     //     [2, 5],
//     //     [5, 7],
//     //     [3, 5],
//     //     [4, 5],

//     //     [1, 3],
//     //     [1, 4],
//     //     [1, 5],
//     //     [1, 6],
//     //     [1, 7],
//     //     [1, 8],
//     //     [1, 9],
//     //     [2, 3],
//     //     [2, 7],
//     //     [2, 8],
//     //     [2, 9],
//     //     [3, 6],
//     //     [3, 7],
//     //     [3, 8],
//     //     [3, 9],
//     //     [4, 6],
//     //     [4, 7],
//     //     [4, 8],
//     //     [4, 9],
//     //     [5, 8],
//     //     [5, 9],
//     //     [6, 7],
//     //     [6, 8],
//     //     [6, 9],
//     //     [7, 8],
//     //     [7, 9],
//     //     [8, 9]];

//     // // taken from n=7 result
//     // // [
//     // //     [0, [1, 2]],
//     // //     [1, [3, 4]],
//     // //     [2, [2, 4]],
//     // //     [3, [5, 6]],
//     // //     [4, [2, 6]],
//     // //     [5, [2, 5]],
//     // //     [6, [5, 7]],
//     // //     [7, [3, 5]],
//     // //     [8, [4, 5]],
//     // //     [9, []],
//     // //     [9, []],
//     // //     [8, [3, 6]],
//     // //     [9, [3, 7]], [9, [6, 7]], [7, [2, 7]], [8, [3, 7]], [9, [4, 7]], [9, [3, 5]], [8, [3, 5]], [9, [2, 3]], [9, []], [6, [3, 7]], [7, [2, 7]], [8, [3, 6]], [9, [2, 3]], [9, []], [8, [5, 7]], [9, [1, 7]], [9, [1, 5]], [7, [2, 3]], [8, [2, 7]], [9, [6, 7]], [9, []], [8, [3, 5]], [9, [1, 5]], [9, [1, 3]], [5, [1, 3]], [6, [3, 7]], [7, [3, 5]], [8, [5, 7]], [9, [6, 7]], [9, []], [8, [3, 6]], [9, [6, 7]], [9, [2, 3]], [7, [6, 7]], [8, [2, 7]], [9, []], [9, [1, 7]], [8, [3, 6]], [9, [3, 5]], [9, [1, 6]], [6, [3, 5]], [7, [1, 7]], [8, [6, 7]], [9, [1, 6]], [9, [5, 7]], [8, [1, 6]], [9, [1, 5]], [9, [6, 7]], [7, [6, 7]], [8, [1, 7]], [9, [1, 6]], [9, [3, 7]], [8, [1, 6]], [9, [1, 7]], [9, [3, 6]], [4, [2, 5]], [5, [2, 6]], [6, [3, 7]], [7, [6, 7]], [8, [3, 6]], [9, [4, 6]], [9, [3, 5]], [8, [2, 7]], [9, [4, 7]], [9, []], [7, [3, 5]], [8, [3, 6]], [9, [2, 3]], [9, [6, 7]], [8, [5, 7]], [9, []], [9, [6, 7]], [6, [3, 7]], [7, [2, 7]], [8, [3, 5]], [9, [2, 3]], [9, []], [8, [1, 6]], [9, [6, 7]], [9, [1, 7]], [7, [2, 3]], [8, [5, 7]], [9, []], [9, [2, 7]], [8, [1, 3]], [9, [3, 6]], [9, [1, 6]], [5, [3, 5]], [6, [1, 3]], [7, [5, 7]], [8, []], [9, []], [9, []], [8, [3, 6]], [9, [6, 7]], [9, [3, 7]], [7, [1, 7]], [8, [5, 7]], [9, [1, 5]], [9, [6, 7]], [8, [1, 5]], [9, [1, 6]], [9, [5, 7]], [6, [5, 7]], [7, [3, 7]], [8, [1, 3]], [9, [2, 3]], [9, [1, 7]], [8, [1, 7]], [9, [2, 7]], [9, [1, 3]], [7, [1, 3]], [8, [1, 5]], [9, []], [9, []], [8, []], [9, []], [9, []], [3, [5, 6]], [4, [1, 7]], [5, [4, 6]], [6, [4, 5]], [7, [5, 7]], [8, [1, 5]], [9, [2, 5]], [9, [1, 6]], [8, [2, 7]], [9, []], [9, [4, 7]], [7, [4, 7]], [8, [1, 4]], [9, []], [9, [1, 6]], [8, [3, 5]], [9, [5, 7]], [9, [3, 7]], [6, [1, 3]], [7, [3, 7]], [8, [6, 7]], [9, [3, 6]], [9, [5, 7]], [8, [3, 6]], [9, [3, 5]], [9, [6, 7]], [7, [5, 7]], [8, [1, 6]], [9, [6, 7]], [9, [1, 4]], [8, []], [9, []], [9, []], [5, [3, 5]], [6, [5, 7]], [7, [4, 6]], [8, [4, 7]], [9, [6, 7]], [9, [1, 4]], [8, [6, 7]], [9, [4, 7]], [9, [1, 6]], [7, [1, 4]], [8, [1, 5]], [9, [4, 5]], [9, [1, 6]], [8, [4, 5]], [9, [1, 5]], [9, [4, 6]], [6, [1, 4]], [7, [3, 6]], [8, [1, 6]], [9, [1, 3]], [9, [6, 7]], [8, [1, 3]], [9, [1, 6]], [9, [3, 7]], [7, [6, 7]], [8, [4, 7]], [9, [4, 6]], [9, [3, 7]], [8, [4, 6]], [9, [4, 7]], [9, [3, 6]], [4, [4, 5]], [5, [1, 4]], [6, [6, 7]], [7, [4, 7]], [8, [2, 6]], [9, []], [9, [4, 6]], [8, [1, 3]], [9, [3, 7]], [9, [1, 7]], [7, [4, 6]], [8, [2, 7]], [9, []], [9, [4, 7]], [8, [1, 3]], [9, [3, 6]], [9, [1, 6]], [6, [1, 7]], [7, [2, 6]], [8, [2, 7]], [9, []], [9, []], [8, [1, 6]], [9, [6, 7]], [9, [1, 5]], [7, [4, 6]], [8, [6, 7]], [9, [5, 7]], [9, [1, 6]], [8, [5, 7]], [9, []], [9, [4, 7]], [5, [3, 5]], [6, [1, 7]], [7, [5, 7]], [8, [1, 4]], [9, [1, 5]], [9, []], [8, [3, 6]], [9, [6, 7]], [9, [3, 7]], [7, [1, 5]], [8, [1, 3]], [9, [3, 6]], [9, [1, 6]], [8, [5, 7]], [9, [4, 7]], [9, []], [6, [1, 3]], [7, [5, 7]], [8, [1, 7]], [9, [3, 7]], [9, []], [8, [1, 5]], [9, []], [9, []], [7, [1, 4]], [8, [1, 7]], [9, []], [9, [3, 7]], [8, [3, 7]], [9, [4, 7]], [9, []], [2, [5, 6]], [3, [2, 6]], [4, [5, 7]], [5, [2, 7]], [6, [2, 4]], [7, [4, 5]], [8, [3, 5]], [9, []], [9, []], [8, [4, 6]], [9, [4, 7]], [9, [6, 7]], [7, [3, 5]], [8, [2, 5]], [9, [2, 3]], [9, [1, 5]], [8, [2, 3]], [9, [2, 5]], [9, [1, 3]], [6, [1, 3]], [7, [4, 7]], [8, [3, 7]], [9, [3, 5]], [9, [1, 7]], [8, [2, 4]], [9, []], [9, [1, 4]], [7, [3, 5]], [8, [1, 5]], [9, []], [9, [1, 7]], [8, [1, 7]], [9, []], [9, [3, 7]], [5, [2, 5]], [6, [2, 4]], [7, [3, 5]], [8, [3, 7]], [9, []], [9, [4, 7]], [8, [4, 5]], [9, [4, 7]], [9, []], [7, [3, 7]], [8, [2, 7]], [9, [2, 3]], [9, [1, 7]], [8, [2, 3]], [9, [2, 7]], [9, [1, 3]], [6, [3, 5]], [7, [1, 3]], [8, [3, 7]], [9, []], [9, []], [8, [1, 5]], [9, [1, 7]], [9, []], [7, [4, 5]], [8, [1, 3]], [9, [1, 5]], [9, []], [8, [1, 4]], [9, [2, 4]], [9, [1, 3]], [4, [3, 6]], [5, [3, 5]], [6, [1, 3]], [7, [5, 7]], [8, []], [9, []], [9, []], [8, [3, 7]], [9, []], [9, []], [7, [1, 7]], [8, [1, 5]], [9, [5, 7]], [9, [1, 6]], [8, [5, 7]], [9, [6, 7]], [9, [1, 5]], [6, [1, 7]], [7, [3, 7]], [8, [1, 3]], [9, []], [9, [1, 6]], [8, [5, 7]], [9, [4, 7]], [9, [4, 5]], [7, [1, 3]], [8, [4, 5]], [9, [1, 5]], [9, [1, 4]], [8, [3, 7]], [9, [6, 7]], [9, []], [5, [1, 4]], [6, [4, 7]], [7, [2, 4]], [8, []], [9, []], [9, []], [8, [6, 7]], [9, [4, 6]], [9, [5, 7]], [7, [6, 7]], [8, [2, 7]], [9, []], [9, [1, 7]], [8, [4, 6]], [9, [4, 5]], [9, [1, 6]], [6, [1, 7]], [7, [1, 3]], [8, [6, 7]], [9, [1, 6]], [9, [5, 7]], [8, []], [9, []], [9, []], [7, [6, 7]], [8, [3, 7]], [9, []], [9, [4, 7]], [8, [1, 6]], [9, [1, 5]], [9, [4, 6]], [3, [2, 5]], [4, [2, 3]], [5, [2, 4]], [6, [4, 7]], [7, [3, 6]], [8, [3, 7]], [9, []], [9, []], [8, [4, 6]], [9, [6, 7]], [9, [4, 5]], [7, [2, 6]], [8, [6, 7]], [9, [5, 7]], [9, [4, 6]], [8, [5, 7]], [9, []], [9, [2, 7]], [6, [6, 7]], [7, [2, 7]], [8, [2, 6]], [9, [3, 6]], [9, []], [8, [1, 4]], [9, [4, 7]], [9, [1, 7]], [7, [2, 6]], [8, [2, 7]], [9, [3, 7]], [9, []], [8, [1, 4]], [9, [4, 6]], [9, [1, 6]], [5, [1, 3]], [6, [6, 7]], [7, [3, 7]], [8, [2, 6]], [9, []], [9, [3, 6]], [8, [1, 4]], [9, [4, 7]], [9, [1, 7]], [7, [3, 6]], [8, [2, 7]], [9, []], [9, [3, 7]], [8, [1, 4]], [9, [4, 6]], [9, [1, 6]], [6, [2, 6]], [7, [2, 7]], [8, []], [9, []], [9, []], [8, [1, 7]], [9, []], [9, []], [7, [6, 7]], [8, [1, 7]], [9, [1, 6]], [9, [3, 7]], [8, [1, 6]], [9, [1, 7]], [9, [3, 6]], [4, [3, 5]], [5, [1, 3]], [6, [1, 4]], [7, [6, 7]], [8, [3, 7]], [9, [3, 6]], [9, [4, 7]], [8, [3, 6]], [9, [3, 7]], [9, [4, 6]], [7, [6, 7]], [8, [3, 7]], [9, [3, 6]], [9, [1, 7]], [8, [3, 6]], [9, [3, 7]], [9, [1, 6]], [6, [5, 7]], [7, [1, 5]], [8, [1, 6]], [9, []], [9, []], [8, []], [9, []], [9, []], [7, [6, 7]], [8, [1, 7]], [9, [1, 6]], [9, [3, 7]], [8, [1, 6]], [9, [1, 7]], [9, [3, 6]], [5, [5, 7]], [6, [1, 4]], [7, [2, 4]], [8, [2, 7]], [9, []], [9, [1, 7]], [8, [4, 7]], [9, [4, 5]], [9, [1, 7]], [7, [1, 3]], [8, [1, 7]], [9, [1, 5]], [9, [4, 7]], [8, [3, 7]], [9, []], [9, [4, 7]], [6, [1, 4]], [7, [4, 5]], [8, [4, 6]], [9, [6, 7]], [9, [4, 7]], [8, [1, 5]], [9, []], [9, []], [7, [1, 5]], [8, [1, 6]], [9, [6, 7]], [9, [1, 7]], [8, [4, 5]], [9, []], [9, []], [1, [3, 4]], [2, [5, 6]], [3, [2, 5]], [4, [3, 5]], [5, [5, 7]], [6, [1, 4]], [7, [1, 5]], [8, [4, 5]], [9, []], [9, []], [8, [1, 6]], [9, [1, 7]], [9, [6, 7]], [7, [4, 5]], [8, [1, 5]], [9, []], [9, []], [8, [4, 6]], [9, [4, 7]], [9, [6, 7]], [6, [1, 4]], [7, [1, 3]], [8, [3, 7]], [9, [4, 7]], [9, []], [8, [1, 7]], [9, [4, 7]], [9, [1, 5]], [7, [2, 4]], [8, [4, 7]], [9, [1, 7]], [9, [4, 5]], [8, [2, 7]], [9, [1, 7]], [9, []], [5, [1, 3]], [6, [5, 7]], [7, [6, 7]], [8, [1, 6]], [9, [3, 6]], [9, [1, 7]], [8, [1, 7]], [9, [3, 7]], [9, [1, 6]], [7, [1, 5]], [8, []], [9, []], [9, []], [8, [1, 6]], [9, []], [9, []], [6, [1, 4]], [7, [6, 7]], [8, [3, 6]], [9, [1, 6]], [9, [3, 7]], [8, [3, 7]], [9, [1, 7]], [9, [3, 6]], [7, [6, 7]], [8, [3, 6]], [9, [4, 6]], [9, [3, 7]], [8, [3, 7]], [9, [4, 7]], [9, [3, 6]], [4, [2, 3]], [5, [1, 3]], [6, [2, 6]], [7, [6, 7]], [8, [1, 6]], [9, [3, 6]], [9, [1, 7]], [8, [1, 7]], [9, [3, 7]], [9, [1, 6]], [7, [2, 7]], [8, [1, 7]], [9, []], [9, []], [8, []], [9, []], [9, []], [6, [6, 7]], [7, [3, 6]], [8, [1, 4]], [9, [1, 6]], [9, [4, 6]], [8, [2, 7]], [9, [3, 7]], [9, []], [7, [3, 7]], [8, [1, 4]], [9, [1, 7]], [9, [4, 7]], [8, [2, 6]], [9, [3, 6]], [9, []], [5, [2, 4]], [6, [6, 7]], [7, [2, 6]], [8, [1, 4]], [9, [1, 6]], [9, [4, 6]], [8, [2, 7]], [9, []], [9, [3, 7]], [7, [2, 7]], [8, [1, 4]], [9, [1, 7]], [9, [4, 7]], [8, [2, 6]], [9, []], [9, [3, 6]], [6, [4, 7]], [7, [2, 6]], [8, [5, 7]], [9, [2, 7]], [9, []], [8, [6, 7]], [9, [4, 6]], [9, [5, 7]], [7, [3, 6]], [8, [4, 6]], [9, [4, 5]], [9, [6, 7]], [8, [3, 7]], [9, []], [9, []], [3, [2, 6]], [4, [3, 6]], [5, [1, 4]], [6, [1, 7]], [7, [6, 7]], [8, [1, 6]], [9, [4, 6]], [9, [1, 5]], [8, [3, 7]], [9, [4, 7]], [9, []], [7, [1, 3]], [8, []], [9, []], [9, []], [8, [6, 7]], [9, [5, 7]], [9, [1, 6]], [6, [4, 7]], [7, [6, 7]], [8, [4, 6]], [9, [1, 6]], [9, [4, 5]], [8, [2, 7]], [9, [1, 7]], [9, []], [7, [2, 4]], [8, [6, 7]], [9, [5, 7]], [9, [4, 6]], [8, []], [9, []], [9, []], [5, [3, 5]], [6, [1, 7]], [7, [1, 3]], [8, [3, 7]], [9, []], [9, [6, 7]], [8, [4, 5]], [9, [1, 4]], [9, [1, 5]], [7, [3, 7]], [8, [5, 7]], [9, [4, 5]], [9, [4, 7]], [8, [1, 3]], [9, [1, 6]], [9, []], [6, [1, 3]], [7, [1, 7]], [8, [5, 7]], [9, [1, 5]], [9, [6, 7]], [8, [1, 5]], [9, [1, 6]], [9, [5, 7]], [7, [5, 7]], [8, [3, 7]], [9, []], [9, []], [8, []], [9, []], [9, []], [4, [5, 7]], [5, [2, 5]], [6, [3, 5]], [7, [4, 5]], [8, [1, 4]], [9, [1, 3]], [9, [2, 4]], [8, [1, 3]], [9, []], [9, [1, 5]], [7, [1, 3]], [8, [1, 5]], [9, []], [9, [1, 7]], [8, [3, 7]], [9, []], [9, []], [6, [2, 4]], [7, [3, 7]], [8, [2, 3]], [9, [1, 3]], [9, [2, 7]], [8, [2, 7]], [9, [1, 7]], [9, [2, 3]], [7, [3, 5]], [8, [4, 5]], [9, []], [9, [4, 7]], [8, [3, 7]], [9, [4, 7]], [9, []], [5, [2, 7]], [6, [1, 3]], [7, [3, 5]], [8, [1, 7]], [9, [3, 7]], [9, []], [8, [1, 5]], [9, [1, 7]], [9, []], [7, [4, 7]], [8, [2, 4]], [9, [1, 4]], [9, []], [8, [3, 7]], [9, [1, 7]], [9, [3, 5]], [6, [2, 4]], [7, [3, 5]], [8, [2, 3]], [9, [1, 3]], [9, [2, 5]], [8, [2, 5]], [9, [1, 5]], [9, [2, 3]], [7, [4, 5]], [8, [4, 6]], [9, [6, 7]], [9, [4, 7]], [8, [3, 5]], [9, []], [9, []], [2, [2, 4]], [3, [5, 6]], [4, [4, 5]], [5, [3, 5]], [6, [1, 3]], [7, [1, 4]], [8, [3, 7]], [9, []], [9, [4, 7]], [8, [1, 7]], [9, [3, 7]], [9, []], [7, [5, 7]], [8, [1, 5]], [9, []], [9, []], [8, [1, 7]], [9, []], [9, [3, 7]], [6, [1, 7]], [7, [1, 5]], [8, [5, 7]], [9, []], [9, [4, 7]], [8, [1, 3]], [9, [1, 6]], [9, [3, 6]], [7, [5, 7]], [8, [3, 6]], [9, [3, 7]], [9, [6, 7]], [8, [1, 4]], [9, []], [9, [1, 5]], [5, [1, 4]], [6, [1, 7]], [7, [4, 6]], [8, [5, 7]], [9, [4, 7]], [9, []], [8, [6, 7]], [9, [1, 6]], [9, [5, 7]], [7, [2, 6]], [8, [1, 6]], [9, [1, 5]], [9, [6, 7]], [8, [2, 7]], [9, []], [9, []], [6, [6, 7]], [7, [4, 6]], [8, [1, 3]], [9, [1, 6]], [9, [3, 6]], [8, [2, 7]], [9, [4, 7]], [9, []], [7, [4, 7]], [8, [1, 3]], [9, [1, 7]], [9, [3, 7]], [8, [2, 6]], [9, [4, 6]], [9, []], [4, [1, 7]], [5, [3, 5]], [6, [1, 4]], [7, [6, 7]], [8, [4, 6]], [9, [3, 6]], [9, [4, 7]], [8, [4, 7]], [9, [3, 7]], [9, [4, 6]], [7, [3, 6]], [8, [1, 3]], [9, [3, 7]], [9, [1, 6]], [8, [1, 6]], [9, [6, 7]], [9, [1, 3]], [6, [5, 7]], [7, [1, 4]], [8, [4, 5]], [9, [4, 6]], [9, [1, 5]], [8, [1, 5]], [9, [1, 6]], [9, [4, 5]], [7, [4, 6]], [8, [6, 7]], [9, [1, 6]], [9, [4, 7]], [8, [4, 7]], [9, [1, 4]], [9, [6, 7]], [5, [4, 6]], [6, [1, 3]], [7, [5, 7]], [8, []], [9, []], [9, []], [8, [1, 6]], [9, [1, 4]], [9, [6, 7]], [7, [3, 7]], [8, [3, 6]], [9, [6, 7]], [9, [3, 5]], [8, [6, 7]], [9, [5, 7]], [9, [3, 6]], [6, [4, 5]], [7, [4, 7]], [8, [3, 5]], [9, [3, 7]], [9, [5, 7]], [8, [1, 4]], [9, [1, 6]], [9, []], [7, [5, 7]], [8, [2, 7]], [9, [4, 7]], [9, []], [8, [1, 5]], [9, [1, 6]], [9, [2, 5]], [3, [5, 6]], [4, [2, 5]], [5, [3, 5]], [6, [5, 7]], [7, [1, 3]], [8, []], [9, []], [9, []], [8, [1, 5]], [9, []], [9, []], [7, [3, 7]], [8, [1, 7]], [9, [1, 3]], [9, [2, 7]], [8, [1, 3]], [9, [1, 7]], [9, [2, 3]], [6, [1, 3]], [7, [1, 7]], [8, [1, 5]], [9, [5, 7]], [9, [1, 6]], [8, [5, 7]], [9, [6, 7]], [9, [1, 5]], [7, [5, 7]], [8, [3, 6]], [9, [3, 7]], [9, [6, 7]], [8, []], [9, []], [9, []], [5, [2, 6]], [6, [3, 7]], [7, [2, 3]], [8, [1, 3]], [9, [1, 6]], [9, [3, 6]], [8, [5, 7]], [9, [2, 7]], [9, []], [7, [2, 7]], [8, [1, 6]], [9, [1, 7]], [9, [6, 7]], [8, [3, 5]], [9, []], [9, [2, 3]], [6, [3, 7]], [7, [3, 5]], [8, [5, 7]], [9, [6, 7]], [9, []], [8, [3, 6]], [9, [6, 7]], [9, [2, 3]], [7, [6, 7]], [8, [2, 7]], [9, []], [9, [4, 7]], [8, [3, 6]], [9, [3, 5]], [9, [4, 6]], [4, [2, 6]], [5, [1, 3]], [6, [3, 5]], [7, [6, 7]], [8, [1, 6]], [9, [3, 6]], [9, [1, 7]], [8, [1, 7]], [9, [3, 7]], [9, [1, 6]], [7, [1, 7]], [8, [1, 6]], [9, [6, 7]], [9, [1, 5]], [8, [6, 7]], [9, [5, 7]], [9, [1, 6]], [6, [3, 7]], [7, [6, 7]], [8, [3, 6]], [9, [1, 6]], [9, [3, 5]], [8, [2, 7]], [9, [1, 7]], [9, []], [7, [3, 5]], [8, [3, 6]], [9, [2, 3]], [9, [6, 7]], [8, [5, 7]], [9, []], [9, [6, 7]], [5, [2, 5]], [6, [3, 7]], [7, [2, 3]], [8, [3, 5]], [9, [1, 3]], [9, [1, 5]], [8, [2, 7]], [9, []], [9, [6, 7]], [7, [2, 7]], [8, [5, 7]], [9, [1, 5]], [9, [1, 7]], [8, [3, 6]], [9, []], [9, [2, 3]], [6, [5, 7]], [7, [2, 7]], [8, [3, 5]], [9, []], [9, [2, 3]], [8, [3, 7]], [9, [3, 5]], [9, [4, 7]], [7, [3, 5]], [8, [3, 6]], [9, [6, 7]], [9, [3, 7]], [8, [4, 5]], [9, []], [9, []]]

//     // var suggested_pairs_9 = [
//     // ];

//     // var used_pairs = common.gen_empty_array(n);
//     // var values = common.perm(common.iota(n));
//     // // console.log(pairs);

//     // var s = common.half(n);
//     // // var res = recursive_v3(suggested_pairs_9, 0, n, values, pairs, used_pairs, 0, comps);
//     // var res = recursive_v2(suggested_pairs_9, 0, n, values, pairs, used_pairs, 0, comps, s);
//     // // var res = recursive_v1(0, n, values, pairs, used_pairs, 0, comps);



//     // // ---------------------------------------------------------------------------------
//     // // pairs for n=7 CASO ESPECIAL... necesito select_4_9_ab_bd_be_bi_cd_ef_fh_gh()
                                                
//     // // filtros: ac ae af bc db de

//     // // var pairs = common.gen_pairs(n);
//     // // var pairs_str = "[[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[4,5],[4,6],[4,7],[4,8],[4,9],[5,6],[5,7],[5,8],[5,9],[6,7],[6,8],[6,9],[7,8],[7,9],[8,9]]";
//     // var pairs_str = `[[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9],[2,3],[2,5],[2,7],[2,8],[3,5],[3,6],
//     //                   [3,7],[3,8],[3,9],[4,5],[4,6],[4,7],[4,8],[4,9],[5,7],[5,8],[5,9],[6,7],[6,9],
//     //                   [7,9],[8,9],
//     //                   [1,2],
//     //                   [2,4],
//     //                   [2,6],
//     //                   [2,9],
//     //                   [3,4],
//     //                   [5,6],
//     //                   [6,8],
//     //                   [7,8]
//     //                 ]`;
//     // var pairs = JSON.parse(pairs_str);
    
//     // /*
//     // [1,2],  
//     // [2,4],
//     // [2,6],
//     // [2,9],
//     // [3,4],
//     // [5,6],
//     // [6,8],
//     // [7,8],
//     // */


//     // var used_pairs = common.gen_empty_array(n);
//     // var values = common.perm(common.iota(n));
//     // console.log(values.length)

//     // values = common.remove_values(values, [1,2]);
//     // values = common.remove_values(values, [2,4]);
//     // values = common.remove_values(values, [2,6]);
//     // values = common.remove_values(values, [2,9]);
//     // values = common.remove_values(values, [3,4]);
//     // values = common.remove_values(values, [5,6]);
//     // values = common.remove_values(values, [6,8]);
//     // values = common.remove_values(values, [7,8]);
//     // console.log(values.length)

//     // comps = 6;
//     // var s = common.half(n);

//     // var res = recursive_v2([], 0, n, values, pairs, used_pairs, 0, comps, s);



//     // // --------------------------------------------------------------------------


//     // // ---------------------------------------------------------------------------------
//     // // pairs for n=10 CASO ESPECIAL... necesito
    
//     // // 4,8 => V6(10)_[[1,2],[3,4],[5,6],[8,9],[2,4]] - 5 = 16 - 5 = 11      to remove: [8] done comps = 8  total comps = 19
//     // // 8,4 => V6(10)_[[1,2],[4,5],[6,7],[8,9],[5,7]] - 5 = 16 - 5 = 11      to remove: [4] done comps = 8  total comps = 19

//     // // filtros: 
//     // var preconds = [[1, 2], [3, 4], [5, 6], [8, 9], [2, 4]];

//     // // var pairs = common.gen_pairs(n);
//     // var pairs_str = `[[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9],[1,10],
//     //                   [2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9],[2,10],
//     //                   [3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],
//     //                   [4,5],[4,6],[4,7],[4,8],[4,9],[4,10],
//     //                   [5,6],[5,7],[5,8],[5,9],[5,10],
//     //                   [6,7],[6,8],[6,9],[6,10],
//     //                   [7,8],[7,9],[7,10],
//     //                   [8,9],[8,10],
//     //                   [9,10]]`;

//     // var pairs = JSON.parse(pairs_str);
//     // pairs = common.remove_pairs(pairs, preconds);
//     // console.log(JSON.stringify(pairs));


//     // // var used_pairs = common.gen_empty_array(n);
//     // var used_pairs = common.gen_empty_array_with_len(pairs.length);

//     //     // var values = common.perm_with_preconds(common.iota(n), preconds);
//     // // console.log(values.length);
//     // // values = common.apply_precons(values, preconds);
//     // // console.log(values.length);
//     // // console.log(JSON.stringify(values));
//     // // return;

//     // var contents = fs.readFileSync('values10.txt', 'utf8');
//     // var values = JSON.parse(contents);
//     // console.log(values.length);
//     // values = common.apply_precons(values, preconds);
//     // console.log(values.length);



//     // // ---------------------------------------------------------------------------------
//     // // pairs for n=9 CASO ESPECIAL... necesito
    
//     // // 7,1 => V5(9)_[[1,2],[3,4],[2,4],[5,6],[7,8]] - 5 = 14 - 5 = 9      to remove: [7] done comps = 7  total comps = 16
//     // // 1,7 => V5(9)_[[2,3],[1,3],[4,5],[6,7],[7,8]] - 5 = 14 - 5 = 9      to remove: [1] done comps = 7  total comps = 16

//     // // filtros: 
//     // // var preconds = [[1,2],[3,4],[2,4],[5,6],[7,8]];
//     // var preconds = [[2,3],[1,3],[4,5],[6,7],[7,8]];

//     // var pairs_str = `
//     //     [
//     //         [3,6],[3,5],
//     //         [2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9],
//     //         [3,4],[3,7],[3,8],[3,9],
//     //         [4,5],[4,6],[4,7],[4,8],[4,9],
//     //         [5,6],[5,7],[5,8],[5,9],
//     //         [6,7],[6,8],[6,9],
//     //         [7,8],[7,9],
//     //         [8,9],
//     //         [1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9]
//     //     ]    
//     // `;

//     // var pairs = JSON.parse(pairs_str);
//     // pairs = common.remove_pairs(pairs, preconds);
//     // console.log(JSON.stringify(pairs));


//     // // var used_pairs = common.gen_empty_array(n);
//     // var used_pairs = common.gen_empty_array_with_len(pairs.length);

//     // var values = common.perm_with_preconds(common.iota(n), preconds);
//     // console.log(values.length);
//     // values = common.apply_precons(values, preconds);
//     // console.log(values.length);
//     // // console.log(JSON.stringify(values));
//     // // return;

//     // // var contents = fs.readFileSync('values10.txt', 'utf8');
//     // // var values = JSON.parse(contents);
//     // // console.log(values.length);
//     // // values = common.apply_precons(values, preconds);
//     // // console.log(values.length);



//     // // ---------------------------------------------------------------------------------
//     // // pairs for n=7 CASO ESPECIAL... necesito
    
//     // // 4,7 => V5(7)_[[2,3],[1,3],[4,5],[3,6]] - 4 = 10 - 4 = 6      to remove: [7,8] done comps = 7  total comps = 13

//     // // filtros: 
//     // var preconds = [[2,3],[1,3],[4,5],[3,6]];

//     // var pairs_str = `
//     //     [
//     //         [1,2],[1,3],[1,4],[1,5],[1,6],[1,7],
//     //         [2,3],[2,4],[2,5],[2,6],[2,7],
//     //         [3,4],[3,5],[3,6],[3,7],
//     //         [4,5],[4,6],[4,7],
//     //         [5,6],[5,7],
//     //         [6,7]
//     //     ]    
//     // `;

//     // var pairs = JSON.parse(pairs_str);
//     // pairs = common.remove_pairs(pairs, preconds);
//     // console.log(JSON.stringify(pairs));


//     // // var used_pairs = common.gen_empty_array(n);
//     // var used_pairs = common.gen_empty_array_with_len(pairs.length);

//     // var values = common.perm_with_preconds(common.iota(n), preconds);
//     // console.log(values.length);
//     // values = common.apply_precons(values, preconds);
//     // console.log(values.length);
//     // // console.log(JSON.stringify(values));
//     // // return;

//     // // var contents = fs.readFileSync('values10.txt', 'utf8');
//     // // var values = JSON.parse(contents);
//     // // console.log(values.length);
//     // // values = common.apply_precons(values, preconds);
//     // // console.log(values.length);




//     // // ---------------------------------------------------------------------------------
//     // // pairs for n=6 CASO ESPECIAL... necesito
    
//     // // 3,5 => V3(6)_[[2,3],[4,5],[1,4],[1,3]] - 4 = 8 - 4 = 4      to remove: [8,2,1] done comps = 7  total comps = 11

//     // // filtros: 
//     // var preconds = [[2,3],[4,5],[1,4],[1,3]];

//     // var pairs_str = `
//     //     [
//     //         [1,2],[1,3],[1,4],[1,5],[1,6],
//     //         [2,3],[2,4],[2,5],[2,6],
//     //         [3,4],[3,5],[3,6],
//     //         [4,5],[4,6],
//     //         [5,6]
//     //     ]    
//     // `;

//     // var pairs = JSON.parse(pairs_str);
//     // pairs = common.remove_pairs(pairs, preconds);
//     // console.log(JSON.stringify(pairs));


//     // // var used_pairs = common.gen_empty_array(n);
//     // var used_pairs = common.gen_empty_array_with_len(pairs.length);

//     // var values = common.perm_with_preconds(common.iota(n), preconds);
//     // console.log(values.length);
//     // values = common.apply_precons(values, preconds);
//     // console.log(values.length);



//     // // ---------------------------------------------------------------------------------
//     // // pairs for n=5 CASO ESPECIAL... necesito
//     // // NO FUNCIONA!!!! Ver en papel
    
//     // // V4(5)_[[2,3],[1,3],[4,3]]

//     // // filtros: 
//     // var preconds = [[2,3],[1,3],[4,3]];

//     // var pairs_str = `
//     //     [
//     //         [1,2],[1,3],[1,4],[1,5],
//     //         [2,3],[2,4],[2,5],
//     //         [3,4],[3,5],
//     //         [4,5]
//     //     ]    
//     // `;

//     // var pairs = JSON.parse(pairs_str);
//     // pairs = common.remove_pairs(pairs, preconds);
//     // console.log(JSON.stringify(pairs));


//     // // var used_pairs = common.gen_empty_array(n);
//     // var used_pairs = common.gen_empty_array_with_len(pairs.length);

//     // var values = common.perm_with_preconds(common.iota(n), preconds);
//     // console.log(values.length);
//     // values = common.apply_precons(values, preconds);
//     // console.log(values.length);

//     // ---------------------------------------------------------------------------------
//     // pairs for n=5 CASO ESPECIAL... necesito
    
//     // V2(4)_[[2,3],[2,1]]

//     // filtros: 
//     var preconds = [[2,3],[2,1]];

//     pairs = common.remove_pairs(pairs, preconds);
//     console.log(JSON.stringify(pairs));


//     // var used_pairs = common.gen_empty_array(n);
//     var used_pairs = common.gen_empty_array_with_len(pairs.length);

//     var values = common.perm_with_preconds(common.iota(n), preconds);
//     console.log(values.length);
//     values = common.apply_precons(values, preconds);
//     console.log(values.length);


    

//     // --------------------------------------------------------------------------
//     // comps = comps - preconds.length;
//     comps = common.get_max_comps(vtn, n, s) - preconds.length;
//     var res = recursive_v2([], 0, n, values, pairs, used_pairs, 0, comps, s);
//     // --------------------------------------------------------------------------



//     // --------------------------------------------------------------------------
//     console.log(res[0]);

//     var rev = res[1].reverse();
//     console.log(rev);
//     console.log(JSON.stringify(rev));
// }



function tree_exportable(n, s, preconds) {
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

    if (s == undefined) {
        s = common.half(n);         
    }

    var pairs = common.gen_pairs(n);
    // console.log(JSON.stringify(pairs));
    pairs = common.remove_pairs(pairs, preconds);
    // console.log(JSON.stringify(pairs));

    // var used_pairs = common.gen_empty_array(n);
    var used_pairs = common.gen_empty_array_with_len(pairs.length);

    var values = common.perm_with_preconds(common.iota(n), preconds);
    // console.log(values.length);
    values = common.apply_precons(values, preconds);
    // console.log(values.length);


    

    // --------------------------------------------------------------------------
    // comps = comps - preconds.length;
    comps = common.get_max_comps(vtn, n, s) - preconds.length;
    var res = recursive_v2([], 0, n, values, pairs, used_pairs, 0, comps, s);
    // --------------------------------------------------------------------------

    return res;
}


function main() {


    // var tests = [
    //     [5, 6, [[2,3],[4,5],[1,3]]],
    //     [3, 5, [[3,4],[1,3]]],
    // ];

    // var tests = [
    //     [4, 7, [[1,2],[3,4],[5,6],[2,5]]],
    //     [4, 7, [[3,4],[1,2],[5,6],[2,5]]],

    //     [4, 7, [[1,2],[3,4],[5,6],[2,5]]],
    //     [4, 6, [[2,3],[1,3],[3,5]]],

    //     // Invalid
    //     // [4, 7, [[1,2],[3,4],[5,6],[2,5]]],
    //     // [3, 4, [[2,3],[1,3]]],

    //     [4, 7, [[1,2],[3,4],[5,6],[2,5]]],
    //     [4, 6, [[2,3],[4,5],[1,3],[3,6]]],

    //     [4, 7, [[3,4],[1,2],[5,6],[2,5]]],
    //     [4, 6, [[2,3],[1,3],[3,5]]],

    //     // Invalid
    //     // [4, 7, [[3,4],[1,2],[5,6],[2,5]]],
    //     // [3, 4, [[2,3],[1,3]]],

    //     [4, 7, [[3,4],[1,2],[5,6],[2,5]]],
    //     [4, 6, [[2,3],[4,5],[1,3],[3,6]]],

    //     [2, 5, [[1,2],[3,4]]],
    //     [4, 6, [[2,3],[1,3],[3,5]]],

    //     // Invalid
    //     // [3, 6, [[2,3],[4,5],[1,4],[1,3]]],
    //     // [4, 5, [[2,3],[1,3],[4,3]]],

    //     [3, 6, [[2,3],[4,5],[1,4],[1,6]]],
    //     [5, 7, [[2,3],[4,5],[1,3],[3,6],[7,3]]],

    //     // Invalid
    //     // [5, 7, [[2,3],[4,5],[1,3],[3,6],[4,6]]],
    //     // [2, 4, [[2,3],[2,1]]],

    //     [5, 7, [[2,3],[4,5],[1,3],[3,6]]],
    //     [2, 3, [[1,2]]],

    //     [5, 8, [[2,3],[4,5],[1,3],[6,7],[3,6]]],
    //     [2, 3, [[1,2]]],

    //     [5, 8, [[2,3],[4,5],[1,3],[6,7],[3,6],[4,8]]],
    //     [5, 8, [[2,3],[4,5],[1,3],[6,7],[3,6],[8,4]]],

    //     [5, 6, [[2,3],[4,5],[1,3]]],
    //     [3, 5, [[3,4],[1,3]]],

    //     [5, 7, [[2,3],[4,5],[1,3],[3,6]]],
    //     [3, 5, [[3,4],[1,3]]],

    //     [5, 8, [[2,3],[4,5],[1,3],[6,7],[3,6]]],
    //     [3, 5, [[3,4],[1,3]]],

    //     [5, 8, [[2,3],[4,5],[1,3],[6,7],[3,6],[5,8]]],
    //     [5, 8, [[2,3],[4,5],[1,3],[6,7],[3,6],[8,5]]],

    //     [3, 6, [[2,3],[4,5],[1,4],[4,6]]],
    //     [5, 7, [[2,3],[4,5],[1,3],[3,6],[7,6]]],

    //     [3, 5, [[2,3],[4,5],[1,4]]],
    //     [5, 7, [[2,3],[4,5],[1,3],[3,6]]],

    //     [3, 5, [[2,3],[4,5],[1,4]]],
    //     [5, 8, [[2,3],[4,5],[1,3],[6,7],[3,6]]],
    // ];


    // var tests = [
    //     [4, 7, [[2,3],[5,6],[1,3],[3,4],[1,6]]],
    //     [3, 4, [[3,1]]],
    // ];

    var tests = [
        [4, 7, [[2,3],[5,6],[1,3],[3,4]]],
    ];


    // var tests = [
    //     [4, 7, [[2,3],[5,6],[1,3],[3,4],[1,2]]],
    //     [4, 7, [[2,3],[5,6],[1,3],[3,4],[2,1]]],

    //     [3, 6, [[1,2],[4,5],[2,3]]],
    //     [4, 7, [[2,3],[5,6],[1,3],[3,4]]],

    //     // [3, 6, [[1,2],[4,5],[2,3]]],
    //     // [3, 5, [[2,3],[1,3]]],

    //     [4, 7, [[2,3],[5,6],[1,3],[3,4],[1,6]]],
    //     [3, 4, [[3,1]]],

    //     [4, 7, [[2,3],[5,6],[1,3],[3,4],[1,7]]],
    //     [4, 6, [[2,3],[4,5],[1,3],[6,1]]],

    //     [3, 6, [[4,5],[1,2],[2,3]]],
    //     [4, 7, [[2,3],[5,6],[1,3],[3,4]]],

    //     // [3, 6, [[4,5],[1,2],[2,3]]],
    //     // [3, 5, [[2,3],[1,3]]],

    //     [4, 7, [[2,3],[5,6],[1,3],[3,4],[2,6]]],
    //     [3, 4, [[3,2]]],

    //     [4, 7, [[2,3],[5,6],[1,3],[3,4],[2,7]]],
    //     [4, 6, [[2,3],[4,5],[1,3],[6,2]]],

    //     // [2, 4, [[1,2],[1,3]]],
    //     // [4, 6, [[2,3],[4,5],[1,3],[4,3]]],

    //     [4, 6, [[2,3],[1,3],[3,4]]],
    //     [4, 5, [[3,4]]],

    //     // [4, 7, [[2,3],[5,6],[1,3],[3,4],[3,7]]],
    //     // [4, 6, [[2,3],[4,5],[1,3],[6,3]]],

    //     // [2, 3, [[1,2]]],
    //     // [4, 6, [[2,3],[4,5],[1,3]]],

    //     // [4, 6, [[2,3],[1,3],[3,4]]],
    //     // [4, 6, [[2,3],[4,5],[1,3]]],

    //     // [4, 6, [[2,3],[5,6],[1,3],[3,4]]],
    //     // [4, 6, [[2,3],[4,5],[1,3]]],

    //     [2, 3, [[1,2]]],
    //     [4, 7, [[2,3],[5,6],[1,3],[3,4]]],

    //     [4, 6, [[2,3],[1,3],[3,4]]],
    //     [4, 7, [[2,3],[5,6],[1,3],[3,4]]],

    //     [4, 6, [[2,3],[5,6],[1,3],[3,4]]],
    //     [4, 7, [[2,3],[5,6],[1,3],[3,4]]],

    //     // [4, 7, [[2,3],[5,6],[1,3],[3,4]]],
    //     // [3, 5, [[2,3],[4,5],[1,3]]],

    //     [4, 7, [[2,3],[5,6],[1,3],[3,4],[5,7]]],
    //     [4, 7, [[2,3],[5,6],[1,3],[3,4],[7,5]]],

    //     [4, 7, [[2,3],[5,6],[1,3],[3,4],[6,7]]],
    //     [4, 7, [[2,3],[5,6],[1,3],[3,4],[7,6]]],
    // ];


    for (let i = 0; i < tests.length; i++) {
        const e = tests[i];
        var s = e[0] - 1;
        var n = e[1];
        var preconds = e[2];
        var res = tree_exportable(n, s, preconds);

        if (res.length == 0) {
            console.log(`index: ${i} invalid: ${s+1}, ${n}, ${JSON.stringify(preconds)}`)
        } else {
            var rev = res[1].reverse();
            console.log(JSON.stringify(rev));
        }
        

        // // --------------------------------------------------------------------------
        // console.log(res[0]);

        // var rev = res[1].reverse();
        // // console.log(rev);
        // console.log(JSON.stringify(rev));

    }

    


    // index: 5 invalid: 3, 5, [[2,3],[1,3]]
    // index: 13 invalid: 3, 5, [[2,3],[1,3]]
    // index: 18 invalid: 2, 4, [[1,2],[1,3]]
    // index: 19 invalid: 4, 6, [[2,3],[4,5],[1,3],[4,3]]
    // index: 23 invalid: 4, 6, [[2,3],[4,5],[1,3],[6,3]]
    // index: 25 invalid: 4, 6, [[2,3],[4,5],[1,3]]
    // index: 27 invalid: 4, 6, [[2,3],[4,5],[1,3]]
    // index: 29 invalid: 4, 6, [[2,3],[4,5],[1,3]]
    // index: 37 invalid: 3, 5, [[2,3],[4,5],[1,3]]
    
    // 1,2 => V4(7)_[[2,3],[5,6],[1,3],[3,4],[1,2]] - 5 = 10 - 5 = 5      to remove: [6,5] done comps = 8  total comps = 13
    // 2,1 => V4(7)_[[2,3],[5,6],[1,3],[3,4],[2,1]] - 5 = 10 - 5 = 5      to remove: [6,5] done comps = 8  total comps = 13

    // 1,6 => V3(6)_[[1,2],[4,5],[2,3]] - 3 = 8 - 3 = 5      to remove: [6,5,1] done comps = 8  total comps = 13
    // 6,1 => V4(7)_[[2,3],[5,6],[1,3],[3,4]] - 4 = 10 - 4 = 6      to remove: [6,5] done comps = 8  total comps = 14

    // // 1,7 => V3(6)_[[1,2],[4,5],[2,3]] - 3 = 8 - 3 = 5      to remove: [6,5,1] done comps = 8  total comps = 13
    // // 7,1 => V3(5)_[[2,3],[1,3]] - 2 = 6 - 2 = 4      to remove: [7,6,5,4] done comps = 8  total comps = 12

    // 1,8 => V4(7)_[[2,3],[5,6],[1,3],[3,4],[1,6]] - 5 = 10 - 5 = 5      to remove: [6,5] done comps = 8  total comps = 13
    // 8,1 => V3(4)_[[3,1]] - 1 = 4 - 1 = 3      to remove: [7,6,5,4,3] done comps = 8  total comps = 11

    // 1,9 => V4(7)_[[2,3],[5,6],[1,3],[3,4],[1,7]] - 5 = 10 - 5 = 5      to remove: [6,5] done comps = 8  total comps = 13
    // 9,1 => V4(6)_[[2,3],[4,5],[1,3],[6,1]] - 4 = 8 - 4 = 4      to remove: [6,5,4] done comps = 8  total comps = 12

    // 2,6 => V3(6)_[[4,5],[1,2],[2,3]] - 3 = 8 - 3 = 5      to remove: [6,5,2] done comps = 8  total comps = 13
    // 6,2 => V4(7)_[[2,3],[5,6],[1,3],[3,4]] - 4 = 10 - 4 = 6      to remove: [6,5] done comps = 8  total comps = 14

    // // 2,7 => V3(6)_[[4,5],[1,2],[2,3]] - 3 = 8 - 3 = 5      to remove: [6,5,2] done comps = 8  total comps = 13
    // // 7,2 => V3(5)_[[2,3],[1,3]] - 2 = 6 - 2 = 4      to remove: [7,6,5,4] done comps = 8  total comps = 12

    // 2,8 => V4(7)_[[2,3],[5,6],[1,3],[3,4],[2,6]] - 5 = 10 - 5 = 5      to remove: [6,5] done comps = 8  total comps = 13
    // 8,2 => V3(4)_[[3,2]] - 1 = 4 - 1 = 3      to remove: [7,6,5,4,3] done comps = 8  total comps = 11

    // 2,9 => V4(7)_[[2,3],[5,6],[1,3],[3,4],[2,7]] - 5 = 10 - 5 = 5      to remove: [6,5] done comps = 8  total comps = 13
    // 9,2 => V4(6)_[[2,3],[4,5],[1,3],[6,2]] - 4 = 8 - 4 = 4      to remove: [6,5,4] done comps = 8  total comps = 12

    // // 3,7 => V2(4)_[[1,2],[1,3]] - 2 = 4 - 2 = 2      to remove: [8,6,5,2,1] done comps = 8  total comps = 10
    // // 7,3 => V4(6)_[[2,3],[4,5],[1,3],[4,3]] - 4 = 8 - 4 = 4      to remove: [6,5,4] done comps = 8  total comps = 12

    // 3,8 => V4(6)_[[2,3],[1,3],[3,4]] - 3 = 8 - 3 = 5      to remove: [8,6,5] done comps = 8  total comps = 13
    // 8,3 => V4(5)_[[3,4]] - 1 = 6 - 1 = 5      to remove: [6,5,4,3] done comps = 8  total comps = 13

    // // 3,9 => V4(7)_[[2,3],[5,6],[1,3],[3,4],[3,7]] - 5 = 10 - 5 = 5      to remove: [6,5] done comps = 8  total comps = 13
    // // 9,3 => V4(6)_[[2,3],[4,5],[1,3],[6,3]] - 4 = 8 - 4 = 4      to remove: [6,5,4] done comps = 8  total comps = 12

    // // 4,7 => V2(3)_[[1,2]] - 1 = 3 - 1 = 2      to remove: [8,7,6,5,2,1] done comps = 8  total comps = 10
    // // 7,4 => V4(6)_[[2,3],[4,5],[1,3]] - 3 = 8 - 3 = 5      to remove: [6,5,4] done comps = 8  total comps = 13

    // // 4,8 => V4(6)_[[2,3],[1,3],[3,4]] - 3 = 8 - 3 = 5      to remove: [8,6,5] done comps = 8  total comps = 13
    // // 8,4 => V4(6)_[[2,3],[4,5],[1,3]] - 3 = 8 - 3 = 5      to remove: [6,5,4] done comps = 8  total comps = 13

    // // 4,9 => V4(6)_[[2,3],[5,6],[1,3],[3,4]] - 4 = 8 - 4 = 4      to remove: [9,6,5] done comps = 8  total comps = 12
    // // 9,4 => V4(6)_[[2,3],[4,5],[1,3]] - 3 = 8 - 3 = 5      to remove: [6,5,4] done comps = 8  total comps = 13

    // 5,7 => V2(3)_[[1,2]] - 1 = 3 - 1 = 2      to remove: [8,7,6,5,2,1] done comps = 8  total comps = 10
    // 7,5 => V4(7)_[[2,3],[5,6],[1,3],[3,4]] - 4 = 10 - 4 = 6      to remove: [6,5] done comps = 8  total comps = 14

    // 5,8 => V4(6)_[[2,3],[1,3],[3,4]] - 3 = 8 - 3 = 5      to remove: [8,6,5] done comps = 8  total comps = 13
    // 8,5 => V4(7)_[[2,3],[5,6],[1,3],[3,4]] - 4 = 10 - 4 = 6      to remove: [6,5] done comps = 8  total comps = 14

    // 5,9 => V4(6)_[[2,3],[5,6],[1,3],[3,4]] - 4 = 8 - 4 = 4      to remove: [9,6,5] done comps = 8  total comps = 12
    // 9,5 => V4(7)_[[2,3],[5,6],[1,3],[3,4]] - 4 = 10 - 4 = 6      to remove: [6,5] done comps = 8  total comps = 14

    // // 6,9 => V4(7)_[[2,3],[5,6],[1,3],[3,4]] - 4 = 10 - 4 = 6      to remove: [6,5] done comps = 8  total comps = 14
    // // 9,6 => V3(5)_[[2,3],[4,5],[1,3]] - 3 = 6 - 3 = 3      to remove: [9,6,5,4] done comps = 8  total comps = 11

    // 7,9 => V4(7)_[[2,3],[5,6],[1,3],[3,4],[5,7]] - 5 = 10 - 5 = 5      to remove: [6,5] done comps = 8  total comps = 13
    // 9,7 => V4(7)_[[2,3],[5,6],[1,3],[3,4],[7,5]] - 5 = 10 - 5 = 5      to remove: [6,5] done comps = 8  total comps = 13

    // 8,9 => V4(7)_[[2,3],[5,6],[1,3],[3,4],[6,7]] - 5 = 10 - 5 = 5      to remove: [6,5] done comps = 8  total comps = 13
    // 9,8 => V4(7)_[[2,3],[5,6],[1,3],[3,4],[7,6]] - 5 = 10 - 5 = 5      to remove: [6,5] done comps = 8  total comps = 13
    















    // index: 5 invalid: 3, 4, [[2,3],[1,3]]
    // index: 11 invalid: 3, 4, [[2,3],[1,3]]
    // index: 17 invalid: 4, 5, [[2,3],[1,3],[4,3]]
    // index: 21 invalid: 2, 4, [[2,3],[2,1]]


    // 1,2 => V4(7)_[[1,2],[3,4],[5,6],[2,5]] - 4 = 10 - 4 = 6      to remove: [8,1] done comps = 7  total comps = 13
    // 2,1 => V4(7)_[[3,4],[1,2],[5,6],[2,5]] - 4 = 10 - 4 = 6      to remove: [8,2] done comps = 7  total comps = 13

    // 1,4 => V4(7)_[[1,2],[3,4],[5,6],[2,5]] - 4 = 10 - 4 = 6      to remove: [8,1] done comps = 7  total comps = 13
    // 4,1 => V4(6)_[[2,3],[1,3],[3,5]] - 3 = 8 - 3 = 5      to remove: [8,7,4] done comps = 7  total comps = 12

    // Invalid
    //// 1,5 => V4(7)_[[1,2],[3,4],[5,6],[2,5]] - 4 = 10 - 4 = 6      to remove: [8,1] done comps = 7  total comps = 13
    //// 5,1 => V3(4)_[[2,3],[1,3]] - 2 = 4 - 2 = 2      to remove: [8,7,6,5,4] done comps = 7  total comps = 9

    // 1,9 => V4(7)_[[1,2],[3,4],[5,6],[2,5]] - 4 = 10 - 4 = 6      to remove: [8,1] done comps = 7  total comps = 13
    // 9,1 => V4(6)_[[2,3],[4,5],[1,3],[3,6]] - 4 = 8 - 4 = 4      to remove: [9,8,7] done comps = 7  total comps = 11

    // 2,4 => V4(7)_[[3,4],[1,2],[5,6],[2,5]] - 4 = 10 - 4 = 6      to remove: [8,2] done comps = 7  total comps = 13
    // 4,2 => V4(6)_[[2,3],[1,3],[3,5]] - 3 = 8 - 3 = 5      to remove: [8,7,4] done comps = 7  total comps = 12

    // Invalid
    //// 2,5 => V4(7)_[[3,4],[1,2],[5,6],[2,5]] - 4 = 10 - 4 = 6      to remove: [8,2] done comps = 7  total comps = 13
    //// 5,2 => V3(4)_[[2,3],[1,3]] - 2 = 4 - 2 = 2      to remove: [8,7,6,5,4] done comps = 7  total comps = 9

    // 2,9 => V4(7)_[[3,4],[1,2],[5,6],[2,5]] - 4 = 10 - 4 = 6      to remove: [8,2] done comps = 7  total comps = 13
    // 9,2 => V4(6)_[[2,3],[4,5],[1,3],[3,6]] - 4 = 8 - 4 = 4      to remove: [9,8,7] done comps = 7  total comps = 11

    // 3,4 => V2(5)_[[1,2],[3,4]] - 2 = 6 - 2 = 4      to remove: [8,3,2,1] done comps = 7  total comps = 11
    // 4,3 => V4(6)_[[2,3],[1,3],[3,5]] - 3 = 8 - 3 = 5      to remove: [8,7,4] done comps = 7  total comps = 12

    // Invalid
    //// 3,5 => V3(6)_[[2,3],[4,5],[1,4],[1,3]] - 4 = 8 - 4 = 4      to remove: [8,2,1] done comps = 7  total comps = 11
    //// 5,3 => V4(5)_[[2,3],[1,3],[4,3]] - 3 = 6 - 3 = 3      to remove: [8,7,6,4] done comps = 7  total comps = 10

    // 3,9 => V3(6)_[[2,3],[4,5],[1,4],[1,6]] - 4 = 8 - 4 = 4      to remove: [8,2,1] done comps = 7  total comps = 11
    // 9,3 => V5(7)_[[2,3],[4,5],[1,3],[3,6],[7,3]] - 5 = 10 - 5 = 5      to remove: [8,7] done comps = 7  total comps = 12
    
    // Invalid
    //// 4,6 => V5(7)_[[2,3],[4,5],[1,3],[3,6],[4,6]] - 5 = 10 - 5 = 5      to remove: [8,7] done comps = 7  total comps = 12
    //// 6,4 => V2(4)_[[2,3],[2,1]] - 2 = 4 - 2 = 2      to remove: [8,5,3,2,1] done comps = 7  total comps = 9

    // 4,7 => V5(7)_[[2,3],[4,5],[1,3],[3,6]] - 4 = 10 - 4 = 6      to remove: [8,7] done comps = 7  total comps = 13
    // 7,4 => V2(3)_[[1,2]] - 1 = 3 - 1 = 2      to remove: [8,5,4,3,2,1] done comps = 7  total comps = 9

    // 4,8 => V5(8)_[[2,3],[4,5],[1,3],[6,7],[3,6]] - 5 = 12 - 5 = 7      to remove: [8] done comps = 7  total comps = 14
    // 8,4 => V2(3)_[[1,2]] - 1 = 3 - 1 = 2      to remove: [8,5,4,3,2,1] done comps = 7  total comps = 9

    // 4,9 => V5(8)_[[2,3],[4,5],[1,3],[6,7],[3,6],[4,8]] - 6 = 12 - 6 = 6      to remove: [8] done comps = 7  total comps = 13
    // 9,4 => V5(8)_[[2,3],[4,5],[1,3],[6,7],[3,6],[8,4]] - 6 = 12 - 6 = 6      to remove: [8] done comps = 7  total comps = 13

    // 5,6 => V5(6)_[[2,3],[4,5],[1,3]] - 3 = 7 - 3 = 4      to remove: [8,7,6] done comps = 7  total comps = 11
    // 6,5 => V3(5)_[[3,4],[1,3]] - 2 = 6 - 2 = 4      to remove: [8,5,2,1] done comps = 7  total comps = 11

    // 5,7 => V5(7)_[[2,3],[4,5],[1,3],[3,6]] - 4 = 10 - 4 = 6      to remove: [8,7] done comps = 7  total comps = 13
    // 7,5 => V3(5)_[[3,4],[1,3]] - 2 = 6 - 2 = 4      to remove: [8,5,2,1] done comps = 7  total comps = 11

    // 5,8 => V5(8)_[[2,3],[4,5],[1,3],[6,7],[3,6]] - 5 = 12 - 5 = 7      to remove: [8] done comps = 7  total comps = 14
    // 8,5 => V3(5)_[[3,4],[1,3]] - 2 = 6 - 2 = 4      to remove: [8,5,2,1] done comps = 7  total comps = 11

    // 5,9 => V5(8)_[[2,3],[4,5],[1,3],[6,7],[3,6],[5,8]] - 6 = 12 - 6 = 6      to remove: [8] done comps = 7  total comps = 13
    // 9,5 => V5(8)_[[2,3],[4,5],[1,3],[6,7],[3,6],[8,5]] - 6 = 12 - 6 = 6      to remove: [8] done comps = 7  total comps = 13

    // 6,9 => V3(6)_[[2,3],[4,5],[1,4],[4,6]] - 4 = 8 - 4 = 4      to remove: [8,2,1] done comps = 7  total comps = 11
    // 9,6 => V5(7)_[[2,3],[4,5],[1,3],[3,6],[7,6]] - 5 = 10 - 5 = 5      to remove: [8,7] done comps = 7  total comps = 12

    // 7,9 => V3(5)_[[2,3],[4,5],[1,4]] - 3 = 6 - 3 = 3      to remove: [9,8,2,1] done comps = 7  total comps = 10
    // 9,7 => V5(7)_[[2,3],[4,5],[1,3],[3,6]] - 4 = 10 - 4 = 6      to remove: [8,7] done comps = 7  total comps = 13

    // 8,9 => V3(5)_[[2,3],[4,5],[1,4]] - 3 = 6 - 3 = 3      to remove: [9,8,2,1] done comps = 7  total comps = 10
    // 9,8 => V5(8)_[[2,3],[4,5],[1,3],[6,7],[3,6]] - 5 = 12 - 5 = 7      to remove: [8] done comps = 7  total comps = 14
    

}


// function main() {
//     var tests = [
//         // [3, 3, undefined],
//         [4, 99, 1],
//         // [5, 6, undefined],
//         // [5, 99, 3],
//         // [6, 99, 2],
//         // [7, 10, 4],
//         // [9, 14, undefined],
//         // [10, 16, 5],
//     ];
//     for (let i = 0; i < tests.length; i++) {
//         const e = tests[i];
//         tree_exportable(e[0], e[1], e[2]);
//     }
// }

// main();


module.exports = {
    recursive_v2: recursive_v2,
    tree_exportable: tree_exportable,
}


// ------------------------------------------------------------------------
// n=3

// [[0,[1,2]],[1,[1,3]],[2,[2,3]],[2,[]],[1,[1,3]],[2,[]],[2,[2,3]]]


// ------------------------------------------------------------------------
// n=5

// [[0,[1,2]],[1,[3,4]],[2,[1,3]],[3,[2,5]],[4,[2,3]],[5,[3,5]],[5,[2,4]],[4,[3,5]],[5,[4,5]],[5,[2,3]],[3,[4,5]],[4,[1,4]],[5,[2,4]],[5,[1,5]],[4,[1,5]],[5,[2,5]],[5,[1,4]],[2,[1,4]],[3,[2,5]],[4,[2,4]],[5,[4,5]],[5,[2,3]],[4,[4,5]],[5,[3,5]],[5,[2,4]],[3,[3,5]],[4,[1,3]],[5,[2,3]],[5,[1,5]],[4,[1,5]],[5,[2,5]],[5,[1,3]],[1,[3,4]],[2,[1,4]],[3,[3,5]],[4,[1,5]],[5,[1,3]],[5,[2,5]],[4,[1,3]],[5,[1,5]],[5,[2,3]],[3,[2,5]],[4,[4,5]],[5,[2,4]],[5,[3,5]],[4,[2,4]],[5,[2,3]],[5,[4,5]],[2,[1,3]],[3,[4,5]],[4,[1,5]],[5,[1,4]],[5,[2,5]],[4,[1,4]],[5,[1,5]],[5,[2,4]],[3,[2,5]],[4,[3,5]],[5,[2,3]],[5,[4,5]],[4,[2,3]],[5,[2,4]],[5,[3,5]]]

// ------------------------------------------------------------------------
// n=7

    // ------------------------------------------------------------------------
    // Corrida 2019-Nov-19 usando
        // var pairs = [[1,2],[3,4],[2,4],[5,6],[2,5],[3,5],[1,3],[5,7],[2,6],[3,6],[2,7],[4,5],[1,4],[1,5],[1,6],[1,7],[2,3],[3,7],[4,6],[4,7],[6,7]];
        // recursive_v2()

        // 99900000
        // 111100011000001101100
        // [[9,[]],[9,[]],[8,[4,5]],[9,[3,7]],[9,[6,7]],[8,[3,6]],[7,[3,5]],[9,[4,7]],[9,[3,5]],[8,[3,7]],[9,[2,3]],[9,[]],[8,[3,5]],[7,[2,7]],[6,[5,7]],[9,[2,3]],[9,[]],[8,[3,6]],[9,[1,7]],[9,[1,5]],[8,[5,7]],[7,[2,7]],[9,[6,7]],[9,[]],[8,[2,7]],[9,[1,5]],[9,[1,3]],[8,[3,5]],[7,[2,3]],[6,[3,7]],[5,[2,5]],[9,[6,7]],[9,[]],[8,[5,7]],[9,[6,7]],[9,[2,3]],[8,[3,6]],[7,[3,5]],[9,[]],[9,[1,7]],[8,[2,7]],[9,[3,5]],[9,[1,6]],[8,[3,6]],[7,[6,7]],[6,[3,7]],[9,[1,6]],[9,[5,7]],[8,[6,7]],[9,[1,5]],[9,[6,7]],[8,[1,6]],[7,[1,7]],[9,[1,6]],[9,[3,7]],[8,[1,7]],[9,[1,7]],[9,[3,6]],[8,[1,6]],[7,[6,7]],[6,[3,5]],[5,[1,3]],[4,[2,6]],[9,[4,6]],[9,[3,5]],[8,[3,6]],[9,[4,7]],[9,[]],[8,[2,7]],[7,[6,7]],[9,[2,3]],[9,[6,7]],[8,[3,6]],[9,[]],[9,[6,7]],[8,[5,7]],[7,[3,5]],[6,[3,7]],[9,[2,3]],[9,[]],[8,[3,5]],[9,[6,7]],[9,[1,7]],[8,[1,6]],[7,[2,7]],[9,[]],[9,[2,7]],[8,[5,7]],[9,[3,6]],[9,[1,6]],[8,[1,3]],[7,[2,3]],[6,[3,7]],[5,[2,6]],[9,[]],[9,[]],[8,[]],[9,[6,7]],[9,[3,7]],[8,[3,6]],[7,[5,7]],[9,[1,5]],[9,[6,7]],[8,[5,7]],[9,[1,6]],[9,[5,7]],[8,[1,5]],[7,[1,7]],[6,[1,3]],[9,[2,3]],[9,[1,7]],[8,[1,3]],[9,[2,7]],[9,[1,3]],[8,[1,7]],[7,[3,7]],[9,[]],[9,[]],[8,[1,5]],[9,[]],[9,[]],[8,[]],[7,[1,3]],[6,[5,7]],[5,[3,5]],[4,[2,5]],[3,[5,6]],[9,[2,5]],[9,[1,6]],[8,[1,5]],[9,[]],[9,[4,7]],[8,[2,7]],[7,[5,7]],[9,[]],[9,[1,6]],[8,[1,4]],[9,[5,7]],[9,[3,7]],[8,[3,5]],[7,[4,7]],[6,[4,5]],[9,[3,6]],[9,[5,7]],[8,[6,7]],[9,[3,5]],[9,[6,7]],[8,[3,6]],[7,[3,7]],[9,[6,7]],[9,[1,4]],[8,[1,6]],[9,[]],[9,[]],[8,[]],[7,[5,7]],[6,[1,3]],[5,[4,6]],[9,[6,7]],[9,[1,4]],[8,[4,7]],[9,[4,7]],[9,[1,6]],[8,[6,7]],[7,[4,6]],[9,[4,5]],[9,[1,6]],[8,[1,5]],[9,[1,5]],[9,[4,6]],[8,[4,5]],[7,[1,4]],[6,[5,7]],[9,[1,3]],[9,[6,7]],[8,[1,6]],[9,[1,6]],[9,[3,7]],[8,[1,3]],[7,[3,6]],[9,[4,6]],[9,[3,7]],[8,[4,7]],[9,[4,7]],[9,[3,6]],[8,[4,6]],[7,[6,7]],[6,[1,4]],[5,[3,5]],[4,[1,7]],[9,[]],[9,[4,6]],[8,[2,6]],[9,[3,7]],[9,[1,7]],[8,[1,3]],[7,[4,7]],[9,[]],[9,[4,7]],[8,[2,7]],[9,[3,6]],[9,[1,6]],[8,[1,3]],[7,[4,6]],[6,[6,7]],[9,[]],[9,[]],[8,[2,7]],[9,[6,7]],[9,[1,5]],[8,[1,6]],[7,[2,6]],[9,[5,7]],[9,[1,6]],[8,[6,7]],[9,[]],[9,[4,7]],[8,[5,7]],[7,[4,6]],[6,[1,7]],[5,[1,4]],[9,[1,5]],[9,[]],[8,[1,4]],[9,[6,7]],[9,[3,7]],[8,[3,6]],[7,[5,7]],[9,[3,6]],[9,[1,6]],[8,[1,3]],[9,[4,7]],[9,[]],[8,[5,7]],[7,[1,5]],[6,[1,7]],[9,[3,7]],[9,[]],[8,[1,7]],[9,[]],[9,[]],[8,[1,5]],[7,[5,7]],[9,[]],[9,[3,7]],[8,[1,7]],[9,[4,7]],[9,[]],[8,[3,7]],[7,[1,4]],[6,[1,3]],[5,[3,5]],[4,[4,5]],[3,[5,6]],[2,[2,4]],[9,[]],[9,[]],[8,[3,5]],[9,[4,7]],[9,[6,7]],[8,[4,6]],[7,[4,5]],[9,[2,3]],[9,[1,5]],[8,[2,5]],[9,[2,5]],[9,[1,3]],[8,[2,3]],[7,[3,5]],[6,[2,4]],[9,[3,5]],[9,[1,7]],[8,[3,7]],[9,[]],[9,[1,4]],[8,[2,4]],[7,[4,7]],[9,[]],[9,[1,7]],[8,[1,5]],[9,[]],[9,[3,7]],[8,[1,7]],[7,[3,5]],[6,[1,3]],[5,[2,7]],[9,[]],[9,[4,7]],[8,[3,7]],[9,[4,7]],[9,[]],[8,[4,5]],[7,[3,5]],[9,[2,3]],[9,[1,7]],[8,[2,7]],[9,[2,7]],[9,[1,3]],[8,[2,3]],[7,[3,7]],[6,[2,4]],[9,[]],[9,[]],[8,[3,7]],[9,[1,7]],[9,[]],[8,[1,5]],[7,[1,3]],[9,[1,5]],[9,[]],[8,[1,3]],[9,[2,4]],[9,[1,3]],[8,[1,4]],[7,[4,5]],[6,[3,5]],[5,[2,5]],[4,[5,7]],[9,[]],[9,[]],[8,[]],[9,[]],[9,[]],[8,[3,7]],[7,[5,7]],[9,[5,7]],[9,[1,6]],[8,[1,5]],[9,[6,7]],[9,[1,5]],[8,[5,7]],[7,[1,7]],[6,[1,3]],[9,[]],[9,[1,6]],[8,[1,3]],[9,[4,7]],[9,[4,5]],[8,[5,7]],[7,[3,7]],[9,[1,5]],[9,[1,4]],[8,[4,5]],[9,[6,7]],[9,[]],[8,[3,7]],[7,[1,3]],[6,[1,7]],[5,[3,5]],[9,[]],[9,[]],[8,[]],[9,[4,6]],[9,[5,7]],[8,[6,7]],[7,[2,4]],[9,[]],[9,[1,7]],[8,[2,7]],[9,[4,5]],[9,[1,6]],[8,[4,6]],[7,[6,7]],[6,[4,7]],[9,[1,6]],[9,[5,7]],[8,[6,7]],[9,[]],[9,[]],[8,[]],[7,[1,3]],[9,[]],[9,[4,7]],[8,[3,7]],[9,[1,5]],[9,[4,6]],[8,[1,6]],[7,[6,7]],[6,[1,7]],[5,[1,4]],[4,[3,6]],[3,[2,6]],[9,[]],[9,[]],[8,[3,7]],[9,[6,7]],[9,[4,5]],[8,[4,6]],[7,[3,6]],[9,[5,7]],[9,[4,6]],[8,[6,7]],[9,[]],[9,[2,7]],[8,[5,7]],[7,[2,6]],[6,[4,7]],[9,[3,6]],[9,[]],[8,[2,6]],[9,[4,7]],[9,[1,7]],[8,[1,4]],[7,[2,7]],[9,[3,7]],[9,[]],[8,[2,7]],[9,[4,6]],[9,[1,6]],[8,[1,4]],[7,[2,6]],[6,[6,7]],[5,[2,4]],[9,[]],[9,[3,6]],[8,[2,6]],[9,[4,7]],[9,[1,7]],[8,[1,4]],[7,[3,7]],[9,[]],[9,[3,7]],[8,[2,7]],[9,[4,6]],[9,[1,6]],[8,[1,4]],[7,[3,6]],[6,[6,7]],[9,[]],[9,[]],[8,[]],[9,[]],[9,[]],[8,[1,7]],[7,[2,7]],[9,[1,6]],[9,[3,7]],[8,[1,7]],[9,[1,7]],[9,[3,6]],[8,[1,6]],[7,[6,7]],[6,[2,6]],[5,[1,3]],[4,[2,3]],[9,[3,6]],[9,[4,7]],[8,[3,7]],[9,[3,7]],[9,[4,6]],[8,[3,6]],[7,[6,7]],[9,[3,6]],[9,[1,7]],[8,[3,7]],[9,[3,7]],[9,[1,6]],[8,[3,6]],[7,[6,7]],[6,[1,4]],[9,[]],[9,[]],[8,[1,6]],[9,[]],[9,[]],[8,[]],[7,[1,5]],[9,[1,6]],[9,[3,7]],[8,[1,7]],[9,[1,7]],[9,[3,6]],[8,[1,6]],[7,[6,7]],[6,[5,7]],[5,[1,3]],[9,[]],[9,[1,7]],[8,[2,7]],[9,[4,5]],[9,[1,7]],[8,[4,7]],[7,[2,4]],[9,[1,5]],[9,[4,7]],[8,[1,7]],[9,[]],[9,[4,7]],[8,[3,7]],[7,[1,3]],[6,[1,4]],[9,[6,7]],[9,[4,7]],[8,[4,6]],[9,[]],[9,[]],[8,[1,5]],[7,[4,5]],[9,[6,7]],[9,[1,7]],[8,[1,6]],[9,[]],[9,[]],[8,[4,5]],[7,[1,5]],[6,[1,4]],[5,[5,7]],[4,[3,5]],[3,[2,5]],[2,[5,6]],[1,[3,4]],[9,[]],[9,[]],[8,[4,5]],[9,[1,7]],[9,[6,7]],[8,[1,6]],[7,[1,5]],[9,[]],[9,[]],[8,[1,5]],[9,[4,7]],[9,[6,7]],[8,[4,6]],[7,[4,5]],[6,[1,4]],[9,[4,7]],[9,[]],[8,[3,7]],[9,[4,7]],[9,[1,5]],[8,[1,7]],[7,[1,3]],[9,[1,7]],[9,[4,5]],[8,[4,7]],[9,[1,7]],[9,[]],[8,[2,7]],[7,[2,4]],[6,[1,4]],[5,[5,7]],[9,[3,6]],[9,[1,7]],[8,[1,6]],[9,[3,7]],[9,[1,6]],[8,[1,7]],[7,[6,7]],[9,[]],[9,[]],[8,[]],[9,[]],[9,[]],[8,[1,6]],[7,[1,5]],[6,[5,7]],[9,[1,6]],[9,[3,7]],[8,[3,6]],[9,[1,7]],[9,[3,6]],[8,[3,7]],[7,[6,7]],[9,[4,6]],[9,[3,7]],[8,[3,6]],[9,[4,7]],[9,[3,6]],[8,[3,7]],[7,[6,7]],[6,[1,4]],[5,[1,3]],[4,[3,5]],[9,[3,6]],[9,[1,7]],[8,[1,6]],[9,[3,7]],[9,[1,6]],[8,[1,7]],[7,[6,7]],[9,[]],[9,[]],[8,[1,7]],[9,[]],[9,[]],[8,[]],[7,[2,7]],[6,[2,6]],[9,[1,6]],[9,[4,6]],[8,[1,4]],[9,[3,7]],[9,[]],[8,[2,7]],[7,[3,6]],[9,[1,7]],[9,[4,7]],[8,[1,4]],[9,[3,6]],[9,[]],[8,[2,6]],[7,[3,7]],[6,[6,7]],[5,[1,3]],[9,[1,6]],[9,[4,6]],[8,[1,4]],[9,[]],[9,[3,7]],[8,[2,7]],[7,[2,6]],[9,[1,7]],[9,[4,7]],[8,[1,4]],[9,[]],[9,[3,6]],[8,[2,6]],[7,[2,7]],[6,[6,7]],[9,[2,7]],[9,[]],[8,[5,7]],[9,[4,6]],[9,[5,7]],[8,[6,7]],[7,[2,6]],[9,[4,5]],[9,[6,7]],[8,[4,6]],[9,[]],[9,[]],[8,[3,7]],[7,[3,6]],[6,[4,7]],[5,[2,4]],[4,[2,3]],[3,[2,5]],[9,[4,6]],[9,[1,5]],[8,[1,6]],[9,[4,7]],[9,[]],[8,[3,7]],[7,[6,7]],[9,[]],[9,[]],[8,[]],[9,[5,7]],[9,[1,6]],[8,[6,7]],[7,[1,3]],[6,[1,7]],[9,[1,6]],[9,[4,5]],[8,[4,6]],[9,[1,7]],[9,[]],[8,[2,7]],[7,[6,7]],[9,[5,7]],[9,[4,6]],[8,[6,7]],[9,[]],[9,[]],[8,[]],[7,[2,4]],[6,[4,7]],[5,[1,4]],[9,[]],[9,[6,7]],[8,[3,7]],[9,[1,4]],[9,[1,5]],[8,[4,5]],[7,[1,3]],[9,[4,5]],[9,[4,7]],[8,[5,7]],[9,[1,6]],[9,[]],[8,[1,3]],[7,[3,7]],[6,[1,7]],[9,[1,5]],[9,[6,7]],[8,[5,7]],[9,[1,6]],[9,[5,7]],[8,[1,5]],[7,[1,7]],[9,[]],[9,[]],[8,[3,7]],[9,[]],[9,[]],[8,[]],[7,[5,7]],[6,[1,3]],[5,[3,5]],[4,[3,6]],[9,[1,3]],[9,[2,4]],[8,[1,4]],[9,[]],[9,[1,5]],[8,[1,3]],[7,[4,5]],[9,[]],[9,[1,7]],[8,[1,5]],[9,[]],[9,[]],[8,[3,7]],[7,[1,3]],[6,[3,5]],[9,[1,3]],[9,[2,7]],[8,[2,3]],[9,[1,7]],[9,[2,3]],[8,[2,7]],[7,[3,7]],[9,[]],[9,[4,7]],[8,[4,5]],[9,[4,7]],[9,[]],[8,[3,7]],[7,[3,5]],[6,[2,4]],[5,[2,5]],[9,[3,7]],[9,[]],[8,[1,7]],[9,[1,7]],[9,[]],[8,[1,5]],[7,[3,5]],[9,[1,4]],[9,[]],[8,[2,4]],[9,[1,7]],[9,[3,5]],[8,[3,7]],[7,[4,7]],[6,[1,3]],[9,[1,3]],[9,[2,5]],[8,[2,3]],[9,[1,5]],[9,[2,3]],[8,[2,5]],[7,[3,5]],[9,[6,7]],[9,[4,7]],[8,[4,6]],[9,[]],[9,[]],[8,[3,5]],[7,[4,5]],[6,[2,4]],[5,[2,7]],[4,[5,7]],[3,[2,6]],[2,[5,6]],[9,[]],[9,[4,7]],[8,[3,7]],[9,[3,7]],[9,[]],[8,[1,7]],[7,[1,4]],[9,[]],[9,[]],[8,[1,5]],[9,[]],[9,[3,7]],[8,[1,7]],[7,[5,7]],[6,[1,3]],[9,[]],[9,[4,7]],[8,[5,7]],[9,[1,6]],[9,[3,6]],[8,[1,3]],[7,[1,5]],[9,[3,7]],[9,[6,7]],[8,[3,6]],[9,[]],[9,[1,5]],[8,[1,4]],[7,[5,7]],[6,[1,7]],[5,[3,5]],[9,[4,7]],[9,[]],[8,[5,7]],[9,[1,6]],[9,[5,7]],[8,[6,7]],[7,[4,6]],[9,[1,5]],[9,[6,7]],[8,[1,6]],[9,[]],[9,[]],[8,[2,7]],[7,[2,6]],[6,[1,7]],[9,[1,6]],[9,[3,6]],[8,[1,3]],[9,[4,7]],[9,[]],[8,[2,7]],[7,[4,6]],[9,[1,7]],[9,[3,7]],[8,[1,3]],[9,[4,6]],[9,[]],[8,[2,6]],[7,[4,7]],[6,[6,7]],[5,[1,4]],[4,[4,5]],[9,[3,6]],[9,[4,7]],[8,[4,6]],[9,[3,7]],[9,[4,6]],[8,[4,7]],[7,[6,7]],[9,[3,7]],[9,[1,6]],[8,[1,3]],[9,[6,7]],[9,[1,3]],[8,[1,6]],[7,[3,6]],[6,[1,4]],[9,[4,6]],[9,[1,5]],[8,[4,5]],[9,[1,6]],[9,[4,5]],[8,[1,5]],[7,[1,4]],[9,[1,6]],[9,[4,7]],[8,[6,7]],[9,[1,4]],[9,[6,7]],[8,[4,7]],[7,[4,6]],[6,[5,7]],[5,[3,5]],[9,[]],[9,[]],[8,[]],[9,[1,4]],[9,[6,7]],[8,[1,6]],[7,[5,7]],[9,[6,7]],[9,[3,5]],[8,[3,6]],[9,[5,7]],[9,[3,6]],[8,[6,7]],[7,[3,7]],[6,[1,3]],[9,[3,7]],[9,[5,7]],[8,[3,5]],[9,[1,6]],[9,[]],[8,[1,4]],[7,[4,7]],[9,[4,7]],[9,[]],[8,[2,7]],[9,[1,6]],[9,[2,5]],[8,[1,5]],[7,[5,7]],[6,[4,5]],[5,[4,6]],[4,[1,7]],[3,[5,6]],[9,[]],[9,[]],[8,[]],[9,[]],[9,[]],[8,[1,5]],[7,[1,3]],[9,[1,3]],[9,[2,7]],[8,[1,7]],[9,[1,7]],[9,[2,3]],[8,[1,3]],[7,[3,7]],[6,[5,7]],[9,[5,7]],[9,[1,6]],[8,[1,5]],[9,[6,7]],[9,[1,5]],[8,[5,7]],[7,[1,7]],[9,[3,7]],[9,[6,7]],[8,[3,6]],[9,[]],[9,[]],[8,[]],[7,[5,7]],[6,[1,3]],[5,[3,5]],[9,[1,6]],[9,[3,6]],[8,[1,3]],[9,[2,7]],[9,[]],[8,[5,7]],[7,[2,3]],[9,[1,7]],[9,[6,7]],[8,[1,6]],[9,[]],[9,[2,3]],[8,[3,5]],[7,[2,7]],[6,[3,7]],[9,[6,7]],[9,[]],[8,[5,7]],[9,[6,7]],[9,[2,3]],[8,[3,6]],[7,[3,5]],[9,[]],[9,[4,7]],[8,[2,7]],[9,[3,5]],[9,[4,6]],[8,[3,6]],[7,[6,7]],[6,[3,7]],[5,[2,6]],[4,[2,5]],[9,[3,6]],[9,[1,7]],[8,[1,6]],[9,[3,7]],[9,[1,6]],[8,[1,7]],[7,[6,7]],[9,[6,7]],[9,[1,5]],[8,[1,6]],[9,[5,7]],[9,[1,6]],[8,[6,7]],[7,[1,7]],[6,[3,5]],[9,[1,6]],[9,[3,5]],[8,[3,6]],[9,[1,7]],[9,[]],[8,[2,7]],[7,[6,7]],[9,[2,3]],[9,[6,7]],[8,[3,6]],[9,[]],[9,[6,7]],[8,[5,7]],[7,[3,5]],[6,[3,7]],[5,[1,3]],[9,[1,3]],[9,[1,5]],[8,[3,5]],[9,[]],[9,[6,7]],[8,[2,7]],[7,[2,3]],[9,[1,5]],[9,[1,7]],[8,[5,7]],[9,[]],[9,[2,3]],[8,[3,6]],[7,[2,7]],[6,[3,7]],[9,[]],[9,[2,3]],[8,[3,5]],[9,[3,5]],[9,[4,7]],[8,[3,7]],[7,[2,7]],[9,[6,7]],[9,[3,7]],[8,[3,6]],[9,[]],[9,[]],[8,[4,5]],[7,[3,5]],[6,[5,7]],[5,[2,5]],[4,[2,6]],[3,[5,6]],[2,[2,4]],[1,[3,4]],[0,[1,2]]]
        // [[0,[1,2]],[1,[3,4]],[2,[2,4]],[3,[5,6]],[4,[2,6]],[5,[2,5]],[6,[5,7]],[7,[3,5]],[8,[4,5]],[9,[]],[9,[]],[8,[3,6]],[9,[3,7]],[9,[6,7]],[7,[2,7]],[8,[3,7]],[9,[4,7]],[9,[3,5]],[8,[3,5]],[9,[2,3]],[9,[]],[6,[3,7]],[7,[2,7]],[8,[3,6]],[9,[2,3]],[9,[]],[8,[5,7]],[9,[1,7]],[9,[1,5]],[7,[2,3]],[8,[2,7]],[9,[6,7]],[9,[]],[8,[3,5]],[9,[1,5]],[9,[1,3]],[5,[1,3]],[6,[3,7]],[7,[3,5]],[8,[5,7]],[9,[6,7]],[9,[]],[8,[3,6]],[9,[6,7]],[9,[2,3]],[7,[6,7]],[8,[2,7]],[9,[]],[9,[1,7]],[8,[3,6]],[9,[3,5]],[9,[1,6]],[6,[3,5]],[7,[1,7]],[8,[6,7]],[9,[1,6]],[9,[5,7]],[8,[1,6]],[9,[1,5]],[9,[6,7]],[7,[6,7]],[8,[1,7]],[9,[1,6]],[9,[3,7]],[8,[1,6]],[9,[1,7]],[9,[3,6]],[4,[2,5]],[5,[2,6]],[6,[3,7]],[7,[6,7]],[8,[3,6]],[9,[4,6]],[9,[3,5]],[8,[2,7]],[9,[4,7]],[9,[]],[7,[3,5]],[8,[3,6]],[9,[2,3]],[9,[6,7]],[8,[5,7]],[9,[]],[9,[6,7]],[6,[3,7]],[7,[2,7]],[8,[3,5]],[9,[2,3]],[9,[]],[8,[1,6]],[9,[6,7]],[9,[1,7]],[7,[2,3]],[8,[5,7]],[9,[]],[9,[2,7]],[8,[1,3]],[9,[3,6]],[9,[1,6]],[5,[3,5]],[6,[1,3]],[7,[5,7]],[8,[]],[9,[]],[9,[]],[8,[3,6]],[9,[6,7]],[9,[3,7]],[7,[1,7]],[8,[5,7]],[9,[1,5]],[9,[6,7]],[8,[1,5]],[9,[1,6]],[9,[5,7]],[6,[5,7]],[7,[3,7]],[8,[1,3]],[9,[2,3]],[9,[1,7]],[8,[1,7]],[9,[2,7]],[9,[1,3]],[7,[1,3]],[8,[1,5]],[9,[]],[9,[]],[8,[]],[9,[]],[9,[]],[3,[5,6]],[4,[1,7]],[5,[4,6]],[6,[4,5]],[7,[5,7]],[8,[1,5]],[9,[2,5]],[9,[1,6]],[8,[2,7]],[9,[]],[9,[4,7]],[7,[4,7]],[8,[1,4]],[9,[]],[9,[1,6]],[8,[3,5]],[9,[5,7]],[9,[3,7]],[6,[1,3]],[7,[3,7]],[8,[6,7]],[9,[3,6]],[9,[5,7]],[8,[3,6]],[9,[3,5]],[9,[6,7]],[7,[5,7]],[8,[1,6]],[9,[6,7]],[9,[1,4]],[8,[]],[9,[]],[9,[]],[5,[3,5]],[6,[5,7]],[7,[4,6]],[8,[4,7]],[9,[6,7]],[9,[1,4]],[8,[6,7]],[9,[4,7]],[9,[1,6]],[7,[1,4]],[8,[1,5]],[9,[4,5]],[9,[1,6]],[8,[4,5]],[9,[1,5]],[9,[4,6]],[6,[1,4]],[7,[3,6]],[8,[1,6]],[9,[1,3]],[9,[6,7]],[8,[1,3]],[9,[1,6]],[9,[3,7]],[7,[6,7]],[8,[4,7]],[9,[4,6]],[9,[3,7]],[8,[4,6]],[9,[4,7]],[9,[3,6]],[4,[4,5]],[5,[1,4]],[6,[6,7]],[7,[4,7]],[8,[2,6]],[9,[]],[9,[4,6]],[8,[1,3]],[9,[3,7]],[9,[1,7]],[7,[4,6]],[8,[2,7]],[9,[]],[9,[4,7]],[8,[1,3]],[9,[3,6]],[9,[1,6]],[6,[1,7]],[7,[2,6]],[8,[2,7]],[9,[]],[9,[]],[8,[1,6]],[9,[6,7]],[9,[1,5]],[7,[4,6]],[8,[6,7]],[9,[5,7]],[9,[1,6]],[8,[5,7]],[9,[]],[9,[4,7]],[5,[3,5]],[6,[1,7]],[7,[5,7]],[8,[1,4]],[9,[1,5]],[9,[]],[8,[3,6]],[9,[6,7]],[9,[3,7]],[7,[1,5]],[8,[1,3]],[9,[3,6]],[9,[1,6]],[8,[5,7]],[9,[4,7]],[9,[]],[6,[1,3]],[7,[5,7]],[8,[1,7]],[9,[3,7]],[9,[]],[8,[1,5]],[9,[]],[9,[]],[7,[1,4]],[8,[1,7]],[9,[]],[9,[3,7]],[8,[3,7]],[9,[4,7]],[9,[]],[2,[5,6]],[3,[2,6]],[4,[5,7]],[5,[2,7]],[6,[2,4]],[7,[4,5]],[8,[3,5]],[9,[]],[9,[]],[8,[4,6]],[9,[4,7]],[9,[6,7]],[7,[3,5]],[8,[2,5]],[9,[2,3]],[9,[1,5]],[8,[2,3]],[9,[2,5]],[9,[1,3]],[6,[1,3]],[7,[4,7]],[8,[3,7]],[9,[3,5]],[9,[1,7]],[8,[2,4]],[9,[]],[9,[1,4]],[7,[3,5]],[8,[1,5]],[9,[]],[9,[1,7]],[8,[1,7]],[9,[]],[9,[3,7]],[5,[2,5]],[6,[2,4]],[7,[3,5]],[8,[3,7]],[9,[]],[9,[4,7]],[8,[4,5]],[9,[4,7]],[9,[]],[7,[3,7]],[8,[2,7]],[9,[2,3]],[9,[1,7]],[8,[2,3]],[9,[2,7]],[9,[1,3]],[6,[3,5]],[7,[1,3]],[8,[3,7]],[9,[]],[9,[]],[8,[1,5]],[9,[1,7]],[9,[]],[7,[4,5]],[8,[1,3]],[9,[1,5]],[9,[]],[8,[1,4]],[9,[2,4]],[9,[1,3]],[4,[3,6]],[5,[3,5]],[6,[1,3]],[7,[5,7]],[8,[]],[9,[]],[9,[]],[8,[3,7]],[9,[]],[9,[]],[7,[1,7]],[8,[1,5]],[9,[5,7]],[9,[1,6]],[8,[5,7]],[9,[6,7]],[9,[1,5]],[6,[1,7]],[7,[3,7]],[8,[1,3]],[9,[]],[9,[1,6]],[8,[5,7]],[9,[4,7]],[9,[4,5]],[7,[1,3]],[8,[4,5]],[9,[1,5]],[9,[1,4]],[8,[3,7]],[9,[6,7]],[9,[]],[5,[1,4]],[6,[4,7]],[7,[2,4]],[8,[]],[9,[]],[9,[]],[8,[6,7]],[9,[4,6]],[9,[5,7]],[7,[6,7]],[8,[2,7]],[9,[]],[9,[1,7]],[8,[4,6]],[9,[4,5]],[9,[1,6]],[6,[1,7]],[7,[1,3]],[8,[6,7]],[9,[1,6]],[9,[5,7]],[8,[]],[9,[]],[9,[]],[7,[6,7]],[8,[3,7]],[9,[]],[9,[4,7]],[8,[1,6]],[9,[1,5]],[9,[4,6]],[3,[2,5]],[4,[2,3]],[5,[2,4]],[6,[4,7]],[7,[3,6]],[8,[3,7]],[9,[]],[9,[]],[8,[4,6]],[9,[6,7]],[9,[4,5]],[7,[2,6]],[8,[6,7]],[9,[5,7]],[9,[4,6]],[8,[5,7]],[9,[]],[9,[2,7]],[6,[6,7]],[7,[2,7]],[8,[2,6]],[9,[3,6]],[9,[]],[8,[1,4]],[9,[4,7]],[9,[1,7]],[7,[2,6]],[8,[2,7]],[9,[3,7]],[9,[]],[8,[1,4]],[9,[4,6]],[9,[1,6]],[5,[1,3]],[6,[6,7]],[7,[3,7]],[8,[2,6]],[9,[]],[9,[3,6]],[8,[1,4]],[9,[4,7]],[9,[1,7]],[7,[3,6]],[8,[2,7]],[9,[]],[9,[3,7]],[8,[1,4]],[9,[4,6]],[9,[1,6]],[6,[2,6]],[7,[2,7]],[8,[]],[9,[]],[9,[]],[8,[1,7]],[9,[]],[9,[]],[7,[6,7]],[8,[1,7]],[9,[1,6]],[9,[3,7]],[8,[1,6]],[9,[1,7]],[9,[3,6]],[4,[3,5]],[5,[1,3]],[6,[1,4]],[7,[6,7]],[8,[3,7]],[9,[3,6]],[9,[4,7]],[8,[3,6]],[9,[3,7]],[9,[4,6]],[7,[6,7]],[8,[3,7]],[9,[3,6]],[9,[1,7]],[8,[3,6]],[9,[3,7]],[9,[1,6]],[6,[5,7]],[7,[1,5]],[8,[1,6]],[9,[]],[9,[]],[8,[]],[9,[]],[9,[]],[7,[6,7]],[8,[1,7]],[9,[1,6]],[9,[3,7]],[8,[1,6]],[9,[1,7]],[9,[3,6]],[5,[5,7]],[6,[1,4]],[7,[2,4]],[8,[2,7]],[9,[]],[9,[1,7]],[8,[4,7]],[9,[4,5]],[9,[1,7]],[7,[1,3]],[8,[1,7]],[9,[1,5]],[9,[4,7]],[8,[3,7]],[9,[]],[9,[4,7]],[6,[1,4]],[7,[4,5]],[8,[4,6]],[9,[6,7]],[9,[4,7]],[8,[1,5]],[9,[]],[9,[]],[7,[1,5]],[8,[1,6]],[9,[6,7]],[9,[1,7]],[8,[4,5]],[9,[]],[9,[]],[1,[3,4]],[2,[5,6]],[3,[2,5]],[4,[3,5]],[5,[5,7]],[6,[1,4]],[7,[1,5]],[8,[4,5]],[9,[]],[9,[]],[8,[1,6]],[9,[1,7]],[9,[6,7]],[7,[4,5]],[8,[1,5]],[9,[]],[9,[]],[8,[4,6]],[9,[4,7]],[9,[6,7]],[6,[1,4]],[7,[1,3]],[8,[3,7]],[9,[4,7]],[9,[]],[8,[1,7]],[9,[4,7]],[9,[1,5]],[7,[2,4]],[8,[4,7]],[9,[1,7]],[9,[4,5]],[8,[2,7]],[9,[1,7]],[9,[]],[5,[1,3]],[6,[5,7]],[7,[6,7]],[8,[1,6]],[9,[3,6]],[9,[1,7]],[8,[1,7]],[9,[3,7]],[9,[1,6]],[7,[1,5]],[8,[]],[9,[]],[9,[]],[8,[1,6]],[9,[]],[9,[]],[6,[1,4]],[7,[6,7]],[8,[3,6]],[9,[1,6]],[9,[3,7]],[8,[3,7]],[9,[1,7]],[9,[3,6]],[7,[6,7]],[8,[3,6]],[9,[4,6]],[9,[3,7]],[8,[3,7]],[9,[4,7]],[9,[3,6]],[4,[2,3]],[5,[1,3]],[6,[2,6]],[7,[6,7]],[8,[1,6]],[9,[3,6]],[9,[1,7]],[8,[1,7]],[9,[3,7]],[9,[1,6]],[7,[2,7]],[8,[1,7]],[9,[]],[9,[]],[8,[]],[9,[]],[9,[]],[6,[6,7]],[7,[3,6]],[8,[1,4]],[9,[1,6]],[9,[4,6]],[8,[2,7]],[9,[3,7]],[9,[]],[7,[3,7]],[8,[1,4]],[9,[1,7]],[9,[4,7]],[8,[2,6]],[9,[3,6]],[9,[]],[5,[2,4]],[6,[6,7]],[7,[2,6]],[8,[1,4]],[9,[1,6]],[9,[4,6]],[8,[2,7]],[9,[]],[9,[3,7]],[7,[2,7]],[8,[1,4]],[9,[1,7]],[9,[4,7]],[8,[2,6]],[9,[]],[9,[3,6]],[6,[4,7]],[7,[2,6]],[8,[5,7]],[9,[2,7]],[9,[]],[8,[6,7]],[9,[4,6]],[9,[5,7]],[7,[3,6]],[8,[4,6]],[9,[4,5]],[9,[6,7]],[8,[3,7]],[9,[]],[9,[]],[3,[2,6]],[4,[3,6]],[5,[1,4]],[6,[1,7]],[7,[6,7]],[8,[1,6]],[9,[4,6]],[9,[1,5]],[8,[3,7]],[9,[4,7]],[9,[]],[7,[1,3]],[8,[]],[9,[]],[9,[]],[8,[6,7]],[9,[5,7]],[9,[1,6]],[6,[4,7]],[7,[6,7]],[8,[4,6]],[9,[1,6]],[9,[4,5]],[8,[2,7]],[9,[1,7]],[9,[]],[7,[2,4]],[8,[6,7]],[9,[5,7]],[9,[4,6]],[8,[]],[9,[]],[9,[]],[5,[3,5]],[6,[1,7]],[7,[1,3]],[8,[3,7]],[9,[]],[9,[6,7]],[8,[4,5]],[9,[1,4]],[9,[1,5]],[7,[3,7]],[8,[5,7]],[9,[4,5]],[9,[4,7]],[8,[1,3]],[9,[1,6]],[9,[]],[6,[1,3]],[7,[1,7]],[8,[5,7]],[9,[1,5]],[9,[6,7]],[8,[1,5]],[9,[1,6]],[9,[5,7]],[7,[5,7]],[8,[3,7]],[9,[]],[9,[]],[8,[]],[9,[]],[9,[]],[4,[5,7]],[5,[2,5]],[6,[3,5]],[7,[4,5]],[8,[1,4]],[9,[1,3]],[9,[2,4]],[8,[1,3]],[9,[]],[9,[1,5]],[7,[1,3]],[8,[1,5]],[9,[]],[9,[1,7]],[8,[3,7]],[9,[]],[9,[]],[6,[2,4]],[7,[3,7]],[8,[2,3]],[9,[1,3]],[9,[2,7]],[8,[2,7]],[9,[1,7]],[9,[2,3]],[7,[3,5]],[8,[4,5]],[9,[]],[9,[4,7]],[8,[3,7]],[9,[4,7]],[9,[]],[5,[2,7]],[6,[1,3]],[7,[3,5]],[8,[1,7]],[9,[3,7]],[9,[]],[8,[1,5]],[9,[1,7]],[9,[]],[7,[4,7]],[8,[2,4]],[9,[1,4]],[9,[]],[8,[3,7]],[9,[1,7]],[9,[3,5]],[6,[2,4]],[7,[3,5]],[8,[2,3]],[9,[1,3]],[9,[2,5]],[8,[2,5]],[9,[1,5]],[9,[2,3]],[7,[4,5]],[8,[4,6]],[9,[6,7]],[9,[4,7]],[8,[3,5]],[9,[]],[9,[]],[2,[2,4]],[3,[5,6]],[4,[4,5]],[5,[3,5]],[6,[1,3]],[7,[1,4]],[8,[3,7]],[9,[]],[9,[4,7]],[8,[1,7]],[9,[3,7]],[9,[]],[7,[5,7]],[8,[1,5]],[9,[]],[9,[]],[8,[1,7]],[9,[]],[9,[3,7]],[6,[1,7]],[7,[1,5]],[8,[5,7]],[9,[]],[9,[4,7]],[8,[1,3]],[9,[1,6]],[9,[3,6]],[7,[5,7]],[8,[3,6]],[9,[3,7]],[9,[6,7]],[8,[1,4]],[9,[]],[9,[1,5]],[5,[1,4]],[6,[1,7]],[7,[4,6]],[8,[5,7]],[9,[4,7]],[9,[]],[8,[6,7]],[9,[1,6]],[9,[5,7]],[7,[2,6]],[8,[1,6]],[9,[1,5]],[9,[6,7]],[8,[2,7]],[9,[]],[9,[]],[6,[6,7]],[7,[4,6]],[8,[1,3]],[9,[1,6]],[9,[3,6]],[8,[2,7]],[9,[4,7]],[9,[]],[7,[4,7]],[8,[1,3]],[9,[1,7]],[9,[3,7]],[8,[2,6]],[9,[4,6]],[9,[]],[4,[1,7]],[5,[3,5]],[6,[1,4]],[7,[6,7]],[8,[4,6]],[9,[3,6]],[9,[4,7]],[8,[4,7]],[9,[3,7]],[9,[4,6]],[7,[3,6]],[8,[1,3]],[9,[3,7]],[9,[1,6]],[8,[1,6]],[9,[6,7]],[9,[1,3]],[6,[5,7]],[7,[1,4]],[8,[4,5]],[9,[4,6]],[9,[1,5]],[8,[1,5]],[9,[1,6]],[9,[4,5]],[7,[4,6]],[8,[6,7]],[9,[1,6]],[9,[4,7]],[8,[4,7]],[9,[1,4]],[9,[6,7]],[5,[4,6]],[6,[1,3]],[7,[5,7]],[8,[]],[9,[]],[9,[]],[8,[1,6]],[9,[1,4]],[9,[6,7]],[7,[3,7]],[8,[3,6]],[9,[6,7]],[9,[3,5]],[8,[6,7]],[9,[5,7]],[9,[3,6]],[6,[4,5]],[7,[4,7]],[8,[3,5]],[9,[3,7]],[9,[5,7]],[8,[1,4]],[9,[1,6]],[9,[]],[7,[5,7]],[8,[2,7]],[9,[4,7]],[9,[]],[8,[1,5]],[9,[1,6]],[9,[2,5]],[3,[5,6]],[4,[2,5]],[5,[3,5]],[6,[5,7]],[7,[1,3]],[8,[]],[9,[]],[9,[]],[8,[1,5]],[9,[]],[9,[]],[7,[3,7]],[8,[1,7]],[9,[1,3]],[9,[2,7]],[8,[1,3]],[9,[1,7]],[9,[2,3]],[6,[1,3]],[7,[1,7]],[8,[1,5]],[9,[5,7]],[9,[1,6]],[8,[5,7]],[9,[6,7]],[9,[1,5]],[7,[5,7]],[8,[3,6]],[9,[3,7]],[9,[6,7]],[8,[]],[9,[]],[9,[]],[5,[2,6]],[6,[3,7]],[7,[2,3]],[8,[1,3]],[9,[1,6]],[9,[3,6]],[8,[5,7]],[9,[2,7]],[9,[]],[7,[2,7]],[8,[1,6]],[9,[1,7]],[9,[6,7]],[8,[3,5]],[9,[]],[9,[2,3]],[6,[3,7]],[7,[3,5]],[8,[5,7]],[9,[6,7]],[9,[]],[8,[3,6]],[9,[6,7]],[9,[2,3]],[7,[6,7]],[8,[2,7]],[9,[]],[9,[4,7]],[8,[3,6]],[9,[3,5]],[9,[4,6]],[4,[2,6]],[5,[1,3]],[6,[3,5]],[7,[6,7]],[8,[1,6]],[9,[3,6]],[9,[1,7]],[8,[1,7]],[9,[3,7]],[9,[1,6]],[7,[1,7]],[8,[1,6]],[9,[6,7]],[9,[1,5]],[8,[6,7]],[9,[5,7]],[9,[1,6]],[6,[3,7]],[7,[6,7]],[8,[3,6]],[9,[1,6]],[9,[3,5]],[8,[2,7]],[9,[1,7]],[9,[]],[7,[3,5]],[8,[3,6]],[9,[2,3]],[9,[6,7]],[8,[5,7]],[9,[]],[9,[6,7]],[5,[2,5]],[6,[3,7]],[7,[2,3]],[8,[3,5]],[9,[1,3]],[9,[1,5]],[8,[2,7]],[9,[]],[9,[6,7]],[7,[2,7]],[8,[5,7]],[9,[1,5]],[9,[1,7]],[8,[3,6]],[9,[]],[9,[2,3]],[6,[5,7]],[7,[2,7]],[8,[3,5]],[9,[]],[9,[2,3]],[8,[3,7]],[9,[3,5]],[9,[4,7]],[7,[3,5]],[8,[3,6]],[9,[6,7]],[9,[3,7]],[8,[4,5]],[9,[]],[9,[]]]


    // --------------------------------------
    // Corrida 2019-Nov-19 usando
        // var pairs = [[1,2],[3,4],[2,4],[5,6],[2,6],[2,5],[5,7],[3,5],[4,5],[3,6],[3,7],[6,7],[2,7],[4,7],[2,3],[1,7],[1,5],[1,3],[1,6],[4,6],[1, 4]];
        // recursive_v2()

        // 86700000
        // 111111000110100100000
        // true
        // [[0,[1,2]],[1,[3,4]],[2,[2,4]],[3,[5,6]],[4,[2,6]],[5,[2,5]],[6,[5,7]],[7,[3,5]],[8,[4,5]],[9,[]],[9,[]],[8,[3,6]],[9,[3,7]],[9,[6,7]],[7,[3,7]],[8,[2,7]],[9,[4,7]],[9,[]],[8,[3,5]],[9,[2,3]],[9,[]],[6,[3,7]],[7,[2,7]],[8,[3,6]],[9,[2,3]],[9,[]],[8,[5,7]],[9,[1,7]],[9,[1,5]],[7,[2,3]],[8,[6,7]],[9,[]],[9,[2,7]],[8,[3,5]],[9,[1,5]],[9,[1,3]],[5,[3,6]],[6,[5,7]],[7,[1,7]],[8,[6,7]],[9,[1,6]],[9,[3,7]],[8,[1,6]],[9,[1,3]],[9,[6,7]],[7,[3,5]],[8,[1,5]],[9,[]],[9,[1,6]],[8,[1,3]],[9,[]],[9,[1,6]],[6,[3,7]],[7,[2,7]],[8,[2,3]],[9,[]],[9,[1,3]],[8,[1,7]],[9,[1,3]],[9,[]],[7,[6,7]],[8,[1,7]],[9,[2,7]],[9,[1,3]],[8,[1,3]],[9,[1,6]],[9,[]],[4,[2,5]],[5,[2,6]],[6,[3,7]],[7,[6,7]],[8,[3,6]],[9,[4,6]],[9,[3,5]],[8,[2,7]],[9,[4,7]],[9,[]],[7,[5,7]],[8,[]],[9,[]],[9,[]],[8,[3,6]],[9,[2,3]],[9,[6,7]],[6,[3,7]],[7,[2,7]],[8,[3,5]],[9,[2,3]],[9,[]],[8,[6,7]],[9,[1,7]],[9,[1,6]],[7,[2,3]],[8,[5,7]],[9,[]],[9,[2,7]],[8,[3,6]],[9,[1,6]],[9,[1,3]],[5,[5,7]],[6,[3,5]],[7,[1,7]],[8,[1,5]],[9,[]],[9,[]],[8,[]],[9,[]],[9,[]],[7,[3,7]],[8,[1,3]],[9,[2,3]],[9,[1,7]],[8,[1,7]],[9,[2,7]],[9,[1,3]],[6,[3,6]],[7,[6,7]],[8,[1,7]],[9,[]],[9,[1,5]],[8,[1,5]],[9,[1,6]],[9,[]],[7,[1,3]],[8,[3,5]],[9,[3,7]],[9,[1,5]],[8,[1,5]],[9,[1,7]],[9,[3,5]],[3,[5,6]],[4,[1,7]],[5,[6,7]],[6,[4,6]],[7,[4,5]],[8,[1,5]],[9,[2,5]],[9,[1,6]],[8,[1,6]],[9,[1,4]],[9,[]],[7,[3,6]],[8,[1,6]],[9,[]],[9,[1,4]],[8,[1,3]],[9,[3,7]],[9,[1,4]],[6,[4,5]],[7,[2,5]],[8,[2,7]],[9,[]],[9,[4,7]],[8,[5,7]],[9,[1,5]],[9,[4,7]],[7,[3,7]],[8,[4,7]],[9,[1,4]],[9,[5,7]],[8,[3,5]],[9,[]],[9,[3,6]],[5,[5,7]],[6,[3,7]],[7,[4,6]],[8,[4,7]],[9,[6,7]],[9,[1,4]],[8,[6,7]],[9,[4,7]],[9,[1,6]],[7,[1,6]],[8,[1,3]],[9,[3,6]],[9,[1,4]],[8,[3,6]],[9,[4,6]],[9,[1,3]],[6,[3,5]],[7,[1,4]],[8,[1,5]],[9,[4,5]],[9,[1,6]],[8,[4,5]],[9,[1,5]],[9,[4,6]],[7,[1,6]],[8,[1,3]],[9,[3,6]],[9,[1,4]],[8,[3,6]],[9,[4,6]],[9,[1,3]],[4,[4,5]],[5,[6,7]],[6,[1,4]],[7,[4,7]],[8,[2,6]],[9,[]],[9,[4,6]],[8,[3,7]],[9,[1,7]],[9,[1,3]],[7,[1,7]],[8,[1,6]],[9,[2,6]],[9,[1,5]],[8,[5,7]],[9,[]],[9,[4,7]],[6,[4,7]],[7,[2,6]],[8,[2,7]],[9,[]],[9,[1,7]],[8,[1,7]],[9,[]],[9,[1,6]],[7,[1,6]],[8,[4,6]],[9,[1,4]],[9,[3,6]],[8,[1,4]],[9,[1,3]],[9,[4,6]],[5,[5,7]],[6,[3,5]],[7,[4,7]],[8,[1,5]],[9,[]],[9,[1,4]],[8,[1,7]],[9,[1,5]],[9,[]],[7,[1,7]],[8,[1,3]],[9,[3,7]],[9,[1,4]],[8,[3,7]],[9,[4,7]],[9,[1,3]],[6,[3,6]],[7,[6,7]],[8,[1,7]],[9,[]],[9,[1,5]],[8,[1,5]],[9,[1,6]],[9,[]],[7,[1,3]],[8,[3,5]],[9,[3,7]],[9,[1,5]],[8,[1,5]],[9,[1,7]],[9,[3,5]],[2,[5,6]],[3,[2,6]],[4,[5,7]],[5,[3,7]],[6,[2,3]],[7,[2,4]],[8,[4,5]],[9,[3,5]],[9,[4,6]],[8,[2,5]],[9,[3,5]],[9,[]],[7,[3,5]],[8,[1,5]],[9,[2,5]],[9,[1,7]],[8,[1,7]],[9,[1,3]],[9,[]],[6,[2,4]],[7,[6,7]],[8,[4,5]],[9,[]],[9,[4,6]],[8,[4,7]],[9,[4,5]],[9,[2,7]],[7,[1,7]],[8,[2,7]],[9,[2,5]],[9,[4,7]],[8,[1,3]],[9,[1,4]],[9,[]],[5,[2,5]],[6,[2,4]],[7,[3,5]],[8,[3,7]],[9,[]],[9,[4,7]],[8,[4,5]],[9,[4,7]],[9,[]],[7,[3,7]],[8,[2,7]],[9,[2,3]],[9,[1,7]],[8,[2,3]],[9,[2,7]],[9,[1,3]],[6,[3,5]],[7,[3,7]],[8,[1,7]],[9,[]],[9,[1,5]],[8,[1,5]],[9,[1,3]],[9,[]],[7,[4,5]],[8,[1,5]],[9,[]],[9,[1,3]],[8,[1,4]],[9,[2,4]],[9,[1,3]],[4,[3,6]],[5,[5,7]],[6,[1,7]],[7,[1,3]],[8,[3,7]],[9,[3,5]],[9,[4,7]],[8,[1,5]],[9,[]],[9,[1,6]],[7,[3,7]],[8,[6,7]],[9,[]],[9,[]],[8,[1,3]],[9,[1,4]],[9,[]],[6,[3,5]],[7,[3,7]],[8,[1,7]],[9,[]],[9,[1,5]],[8,[1,5]],[9,[1,3]],[9,[]],[7,[4,5]],[8,[1,5]],[9,[]],[9,[1,3]],[8,[1,3]],[9,[1,4]],[9,[]],[5,[6,7]],[6,[1,4]],[7,[2,4]],[8,[2,7]],[9,[]],[9,[1,7]],[8,[4,7]],[9,[4,6]],[9,[1,7]],[7,[3,7]],[8,[1,3]],[9,[1,6]],[9,[]],[8,[1,7]],[9,[1,6]],[9,[4,7]],[6,[5,7]],[7,[1,4]],[8,[4,6]],[9,[4,7]],[9,[1,6]],[8,[1,6]],[9,[1,7]],[9,[4,6]],[7,[1,4]],[8,[4,6]],[9,[4,5]],[9,[1,6]],[8,[1,6]],[9,[1,5]],[9,[4,6]],[3,[2,5]],[4,[6,7]],[5,[3,7]],[6,[2,3]],[7,[2,4]],[8,[4,6]],[9,[3,6]],[9,[4,5]],[8,[2,6]],[9,[3,6]],[9,[]],[7,[3,6]],[8,[1,6]],[9,[2,6]],[9,[1,7]],[8,[1,7]],[9,[1,3]],[9,[]],[6,[2,4]],[7,[5,7]],[8,[4,5]],[9,[4,6]],[9,[]],[8,[4,7]],[9,[4,6]],[9,[2,7]],[7,[1,7]],[8,[2,7]],[9,[2,6]],[9,[4,7]],[8,[1,3]],[9,[1,4]],[9,[]],[5,[2,6]],[6,[2,4]],[7,[3,6]],[8,[3,7]],[9,[]],[9,[4,7]],[8,[4,7]],[9,[]],[9,[4,6]],[7,[3,7]],[8,[2,7]],[9,[2,3]],[9,[1,7]],[8,[2,3]],[9,[2,7]],[9,[1,3]],[6,[3,6]],[7,[3,7]],[8,[1,7]],[9,[]],[9,[1,6]],[8,[1,3]],[9,[]],[9,[1,6]],[7,[1,6]],[8,[2,4]],[9,[]],[9,[4,6]],[8,[1,4]],[9,[2,4]],[9,[1,3]],[4,[3,5]],[5,[3,6]],[6,[5,7]],[7,[1,5]],[8,[1,6]],[9,[]],[9,[]],[8,[]],[9,[]],[9,[]],[7,[1,7]],[8,[6,7]],[9,[1,6]],[9,[3,7]],[8,[1,6]],[9,[1,3]],[9,[6,7]],[6,[1,7]],[7,[3,7]],[8,[1,5]],[9,[1,3]],[9,[]],[8,[6,7]],[9,[4,7]],[9,[4,6]],[7,[1,3]],[8,[1,6]],[9,[4,6]],[9,[1,4]],[8,[5,7]],[9,[]],[9,[3,7]],[5,[5,7]],[6,[1,4]],[7,[2,4]],[8,[2,7]],[9,[]],[9,[1,7]],[8,[4,7]],[9,[4,5]],[9,[1,7]],[7,[3,7]],[8,[1,5]],[9,[]],[9,[1,3]],[8,[1,7]],[9,[1,5]],[9,[4,7]],[6,[6,7]],[7,[1,4]],[8,[4,5]],[9,[4,7]],[9,[1,5]],[8,[1,5]],[9,[1,7]],[9,[4,5]],[7,[1,4]],[8,[4,5]],[9,[4,6]],[9,[1,5]],[8,[1,5]],[9,[1,6]],[9,[4,5]],[1,[3,4]],[2,[5,6]],[3,[2,5]],[4,[3,5]],[5,[5,7]],[6,[6,7]],[7,[1,4]],[8,[1,5]],[9,[4,5]],[9,[1,6]],[8,[4,5]],[9,[1,5]],[9,[4,6]],[7,[1,4]],[8,[1,5]],[9,[4,5]],[9,[1,7]],[8,[4,5]],[9,[1,5]],[9,[4,7]],[6,[1,4]],[7,[3,7]],[8,[1,7]],[9,[4,7]],[9,[1,5]],[8,[1,5]],[9,[1,3]],[9,[]],[7,[2,4]],[8,[4,7]],[9,[1,7]],[9,[4,5]],[8,[2,7]],[9,[1,7]],[9,[]],[5,[3,6]],[6,[1,7]],[7,[1,3]],[8,[5,7]],[9,[3,7]],[9,[]],[8,[1,6]],[9,[1,4]],[9,[4,6]],[7,[3,7]],[8,[6,7]],[9,[4,6]],[9,[4,7]],[8,[1,5]],[9,[]],[9,[1,3]],[6,[5,7]],[7,[1,7]],[8,[1,6]],[9,[6,7]],[9,[1,3]],[8,[6,7]],[9,[3,7]],[9,[1,6]],[7,[1,5]],[8,[]],[9,[]],[9,[]],[8,[1,6]],[9,[]],[9,[]],[4,[6,7]],[5,[2,6]],[6,[3,6]],[7,[1,6]],[8,[1,4]],[9,[1,3]],[9,[2,4]],[8,[2,4]],[9,[4,6]],[9,[]],[7,[3,7]],[8,[1,3]],[9,[1,6]],[9,[]],[8,[1,7]],[9,[1,6]],[9,[]],[6,[2,4]],[7,[3,7]],[8,[2,3]],[9,[1,3]],[9,[2,7]],[8,[2,7]],[9,[1,7]],[9,[2,3]],[7,[3,6]],[8,[4,7]],[9,[4,6]],[9,[]],[8,[3,7]],[9,[4,7]],[9,[]],[5,[3,7]],[6,[2,4]],[7,[1,7]],[8,[1,3]],[9,[]],[9,[1,4]],[8,[2,7]],[9,[4,7]],[9,[2,6]],[7,[5,7]],[8,[4,7]],[9,[2,7]],[9,[4,6]],[8,[4,5]],[9,[]],[9,[4,6]],[6,[2,3]],[7,[3,6]],[8,[1,7]],[9,[]],[9,[1,3]],[8,[1,6]],[9,[1,7]],[9,[2,6]],[7,[2,4]],[8,[2,6]],[9,[]],[9,[3,6]],[8,[4,6]],[9,[4,5]],[9,[3,6]],[3,[2,6]],[4,[3,6]],[5,[6,7]],[6,[5,7]],[7,[1,4]],[8,[1,6]],[9,[4,6]],[9,[1,5]],[8,[4,6]],[9,[1,6]],[9,[4,5]],[7,[1,4]],[8,[1,6]],[9,[4,6]],[9,[1,7]],[8,[4,6]],[9,[1,6]],[9,[4,7]],[6,[1,4]],[7,[3,7]],[8,[1,7]],[9,[4,7]],[9,[1,6]],[8,[1,3]],[9,[]],[9,[1,6]],[7,[2,4]],[8,[4,7]],[9,[1,7]],[9,[4,6]],[8,[2,7]],[9,[1,7]],[9,[]],[5,[5,7]],[6,[3,5]],[7,[4,5]],[8,[1,3]],[9,[]],[9,[1,4]],[8,[1,5]],[9,[1,3]],[9,[]],[7,[3,7]],[8,[1,5]],[9,[]],[9,[1,3]],[8,[1,7]],[9,[1,5]],[9,[]],[6,[1,7]],[7,[3,7]],[8,[1,3]],[9,[]],[9,[1,4]],[8,[6,7]],[9,[]],[9,[]],[7,[1,3]],[8,[1,5]],[9,[1,6]],[9,[]],[8,[3,7]],[9,[4,7]],[9,[3,5]],[4,[5,7]],[5,[2,5]],[6,[3,5]],[7,[4,5]],[8,[1,4]],[9,[1,3]],[9,[2,4]],[8,[1,5]],[9,[1,3]],[9,[]],[7,[3,7]],[8,[1,5]],[9,[]],[9,[1,3]],[8,[1,7]],[9,[1,5]],[9,[]],[6,[2,4]],[7,[3,7]],[8,[2,3]],[9,[1,3]],[9,[2,7]],[8,[2,7]],[9,[1,7]],[9,[2,3]],[7,[3,5]],[8,[4,5]],[9,[]],[9,[4,7]],[8,[3,7]],[9,[4,7]],[9,[]],[5,[3,7]],[6,[2,4]],[7,[1,7]],[8,[1,3]],[9,[]],[9,[1,4]],[8,[2,7]],[9,[4,7]],[9,[2,5]],[7,[6,7]],[8,[4,7]],[9,[2,7]],[9,[4,5]],[8,[4,5]],[9,[4,6]],[9,[]],[6,[2,3]],[7,[3,5]],[8,[1,7]],[9,[]],[9,[1,3]],[8,[1,5]],[9,[1,7]],[9,[2,5]],[7,[2,4]],[8,[2,5]],[9,[]],[9,[3,5]],[8,[4,5]],[9,[4,6]],[9,[3,5]],[2,[2,4]],[3,[5,6]],[4,[4,5]],[5,[5,7]],[6,[3,6]],[7,[1,3]],[8,[1,5]],[9,[3,5]],[9,[1,7]],[8,[3,5]],[9,[1,5]],[9,[3,7]],[7,[6,7]],[8,[1,5]],[9,[]],[9,[1,6]],[8,[1,7]],[9,[1,5]],[9,[]],[6,[3,5]],[7,[1,7]],[8,[3,7]],[9,[1,3]],[9,[4,7]],[8,[1,3]],[9,[1,4]],[9,[3,7]],[7,[4,7]],[8,[1,7]],[9,[]],[9,[1,5]],[8,[1,5]],[9,[1,4]],[9,[]],[5,[6,7]],[6,[4,7]],[7,[1,6]],[8,[1,4]],[9,[4,6]],[9,[1,3]],[8,[4,6]],[9,[3,6]],[9,[1,4]],[7,[2,6]],[8,[1,7]],[9,[1,6]],[9,[]],[8,[2,7]],[9,[1,7]],[9,[]],[6,[1,4]],[7,[1,7]],[8,[5,7]],[9,[4,7]],[9,[]],[8,[1,6]],[9,[1,5]],[9,[2,6]],[7,[4,7]],[8,[3,7]],[9,[1,3]],[9,[1,7]],[8,[2,6]],[9,[4,6]],[9,[]],[4,[1,7]],[5,[5,7]],[6,[3,5]],[7,[1,6]],[8,[3,6]],[9,[1,3]],[9,[4,6]],[8,[1,3]],[9,[1,4]],[9,[3,6]],[7,[1,4]],[8,[4,5]],[9,[4,6]],[9,[1,5]],[8,[1,5]],[9,[1,6]],[9,[4,5]],[6,[3,7]],[7,[1,6]],[8,[3,6]],[9,[1,3]],[9,[4,6]],[8,[1,3]],[9,[1,4]],[9,[3,6]],[7,[4,6]],[8,[6,7]],[9,[1,6]],[9,[4,7]],[8,[4,7]],[9,[1,4]],[9,[6,7]],[5,[6,7]],[6,[4,5]],[7,[3,7]],[8,[3,5]],[9,[3,6]],[9,[]],[8,[4,7]],[9,[5,7]],[9,[1,4]],[7,[2,5]],[8,[5,7]],[9,[4,7]],[9,[1,5]],[8,[2,7]],[9,[4,7]],[9,[]],[6,[4,6]],[7,[3,6]],[8,[1,3]],[9,[1,4]],[9,[3,7]],[8,[1,6]],[9,[1,4]],[9,[]],[7,[4,5]],[8,[1,6]],[9,[]],[9,[1,4]],[8,[1,5]],[9,[1,6]],[9,[2,5]],[3,[5,6]],[4,[2,5]],[5,[5,7]],[6,[3,6]],[7,[1,3]],[8,[1,5]],[9,[3,5]],[9,[1,7]],[8,[3,5]],[9,[1,5]],[9,[3,7]],[7,[6,7]],[8,[1,5]],[9,[]],[9,[1,6]],[8,[1,7]],[9,[1,5]],[9,[]],[6,[3,5]],[7,[3,7]],[8,[1,7]],[9,[1,3]],[9,[2,7]],[8,[1,3]],[9,[1,7]],[9,[2,3]],[7,[1,7]],[8,[]],[9,[]],[9,[]],[8,[1,5]],[9,[]],[9,[]],[5,[2,6]],[6,[3,7]],[7,[2,3]],[8,[3,6]],[9,[1,3]],[9,[1,6]],[8,[5,7]],[9,[2,7]],[9,[]],[7,[2,7]],[8,[6,7]],[9,[1,6]],[9,[1,7]],[8,[3,5]],[9,[]],[9,[2,3]],[6,[3,7]],[7,[5,7]],[8,[3,6]],[9,[6,7]],[9,[2,3]],[8,[]],[9,[]],[9,[]],[7,[6,7]],[8,[2,7]],[9,[]],[9,[4,7]],[8,[3,6]],[9,[3,5]],[9,[4,6]],[4,[2,6]],[5,[3,6]],[6,[3,7]],[7,[6,7]],[8,[1,3]],[9,[]],[9,[1,6]],[8,[1,7]],[9,[1,3]],[9,[2,7]],[7,[2,7]],[8,[1,7]],[9,[]],[9,[1,3]],[8,[2,3]],[9,[1,3]],[9,[]],[6,[5,7]],[7,[3,5]],[8,[1,3]],[9,[1,6]],[9,[]],[8,[1,5]],[9,[1,6]],[9,[]],[7,[1,7]],[8,[1,6]],[9,[6,7]],[9,[1,3]],[8,[6,7]],[9,[3,7]],[9,[1,6]],[5,[2,5]],[6,[3,7]],[7,[2,3]],[8,[3,5]],[9,[1,3]],[9,[1,5]],[8,[6,7]],[9,[2,7]],[9,[]],[7,[2,7]],[8,[5,7]],[9,[1,5]],[9,[1,7]],[8,[3,6]],[9,[]],[9,[2,3]],[6,[5,7]],[7,[3,7]],[8,[3,5]],[9,[]],[9,[2,3]],[8,[2,7]],[9,[]],[9,[4,7]],[7,[3,5]],[8,[3,6]],[9,[6,7]],[9,[3,7]],[8,[4,5]],[9,[]],[9,[]]]




// --------------------------------------

    // Corrida vieja
    // [[9,[1,3]],[9,[2,5]],[8,[4,5]],[9,[4,7]],[9,[4,5]],[8,[3,7]],[7,[5,7]],[9,[1,3]],[9,[1,7]],[8,[4,5]],[9,[2,3]],[9,[1,5]],[8,[2,5]],[7,[5,7]],[6,[2,7]],[9,[2,3]],[9,[5,7]],[8,[3,7]],[9,[6,7]],[9,[4,5]],[8,[5,7]],[7,[3,6]],[9,[2,5]],[9,[3,7]],[8,[2,3]],[9,[1,7]],[9,[4,5]],[8,[5,7]],[7,[1,3]],[6,[2,7]],[5,[3,5]],[9,[6,7]],[9,[2,7]],[8,[5,7]],[9,[6,7]],[9,[2,3]],[8,[3,6]],[7,[3,5]],[9,[3,5]],[9,[1,7]],[8,[2,7]],[9,[3,5]],[9,[1,6]],[8,[3,6]],[7,[6,7]],[6,[3,7]],[9,[1,6]],[9,[5,7]],[8,[6,7]],[9,[1,5]],[9,[6,7]],[8,[1,6]],[7,[1,7]],[9,[1,6]],[9,[3,7]],[8,[1,7]],[9,[1,7]],[9,[3,6]],[8,[1,6]],[7,[6,7]],[6,[3,5]],[5,[1,3]],[4,[2,6]],[9,[4,6]],[9,[3,5]],[8,[3,6]],[9,[4,7]],[9,[3,5]],[8,[2,7]],[7,[6,7]],[9,[2,3]],[9,[6,7]],[8,[3,6]],[9,[2,7]],[9,[6,7]],[8,[5,7]],[7,[3,5]],[6,[3,7]],[9,[2,3]],[9,[5,7]],[8,[3,5]],[9,[6,7]],[9,[1,7]],[8,[1,6]],[7,[2,7]],[9,[5,7]],[9,[3,5]],[8,[2,7]],[9,[3,6]],[9,[1,6]],[8,[1,3]],[7,[2,3]],[6,[3,7]],[5,[2,6]],[8,[2,6]],[9,[6,7]],[9,[3,7]],[8,[3,6]],[7,[5,7]],[9,[1,5]],[9,[6,7]],[8,[5,7]],[9,[1,6]],[9,[5,7]],[8,[1,5]],[7,[1,7]],[6,[1,3]],[8,[5,7]],[9,[2,3]],[9,[5,7]],[8,[1,3]],[7,[2,6]],[9,[1,3]],[9,[5,7]],[8,[3,7]],[9,[1,5]],[9,[3,7]],[8,[1,3]],[7,[1,7]],[6,[2,7]],[5,[3,5]],[4,[2,5]],[3,[5,6]],[9,[2,5]],[9,[1,6]],[8,[1,5]],[9,[2,6]],[9,[4,7]],[8,[2,7]],[7,[5,7]],[9,[2,6]],[9,[1,6]],[8,[1,4]],[9,[5,7]],[9,[3,7]],[8,[3,5]],[7,[4,7]],[6,[4,5]],[9,[3,6]],[9,[5,7]],[8,[6,7]],[9,[3,5]],[9,[6,7]],[8,[3,6]],[7,[3,7]],[9,[6,7]],[9,[1,4]],[8,[1,6]],[8,[2,6]],[7,[5,7]],[6,[1,3]],[5,[4,6]],[9,[6,7]],[9,[1,4]],[8,[4,7]],[9,[4,7]],[9,[1,6]],[8,[6,7]],[7,[4,6]],[9,[4,5]],[9,[1,6]],[8,[1,5]],[9,[1,5]],[9,[4,6]],[8,[4,5]],[7,[1,4]],[6,[5,7]],[9,[1,3]],[9,[6,7]],[8,[1,6]],[9,[1,6]],[9,[3,7]],[8,[1,3]],[7,[3,6]],[9,[4,6]],[9,[3,7]],[8,[4,7]],[9,[4,7]],[9,[3,6]],[8,[4,6]],[7,[6,7]],[6,[1,4]],[5,[3,5]],[4,[1,7]],[9,[3,5]],[9,[4,6]],[8,[2,6]],[9,[3,7]],[9,[1,7]],[8,[1,3]],[7,[4,7]],[9,[2,6]],[9,[4,7]],[8,[2,7]],[9,[3,6]],[9,[1,6]],[8,[1,3]],[7,[4,6]],[6,[6,7]],[9,[2,7]],[9,[2,7]],[8,[3,5]],[9,[6,7]],[9,[1,5]],[8,[1,6]],[7,[2,6]],[9,[5,7]],[9,[1,6]],[8,[6,7]],[9,[2,6]],[9,[4,7]],[8,[5,7]],[7,[4,6]],[6,[1,7]],[5,[1,4]],[9,[1,5]],[9,[2,6]],[8,[1,4]],[9,[6,7]],[9,[3,7]],[8,[3,6]],[7,[5,7]],[9,[3,6]],[9,[1,6]],[8,[1,3]],[9,[4,7]],[9,[2,6]],[8,[5,7]],[7,[1,5]],[6,[1,7]],[9,[3,7]],[9,[1,4]],[8,[1,3]],[9,[4,7]],[9,[1,3]],[8,[3,7]],[7,[1,7]],[8,[2,7]],[9,[1,5]],[9,[2,7]],[8,[1,3]],[7,[2,6]],[6,[5,7]],[5,[3,5]],[4,[4,5]],[3,[5,6]],[2,[2,4]],[8,[3,5]],[9,[4,7]],[9,[6,7]],[8,[4,6]],[7,[4,5]],[9,[2,3]],[9,[1,5]],[8,[2,5]],[9,[2,5]],[9,[1,3]],[8,[2,3]],[7,[3,5]],[6,[2,4]],[9,[3,5]],[9,[1,7]],[8,[3,7]],[9,[3,5]],[9,[1,4]],[8,[2,4]],[7,[4,7]],[8,[3,5]],[9,[1,5]],[9,[3,7]],[8,[1,7]],[7,[2,4]],[6,[1,3]],[5,[2,7]],[9,[4,5]],[9,[4,7]],[8,[3,7]],[9,[3,7]],[9,[4,5]],[8,[2,3]],[7,[2,4]],[9,[2,4]],[9,[3,7]],[8,[2,3]],[9,[1,7]],[9,[2,4]],[8,[1,5]],[7,[1,3]],[6,[2,7]],[9,[4,7]],[9,[1,3]],[8,[4,5]],[9,[1,3]],[9,[2,5]],[8,[4,5]],[7,[2,7]],[9,[2,7]],[9,[4,5]],[8,[2,5]],[9,[1,4]],[9,[2,7]],[8,[1,3]],[7,[1,5]],[6,[2,4]],[5,[3,5]],[4,[5,7]],[9,[2,4]],[9,[1,6]],[8,[1,5]],[9,[2,7]],[9,[3,7]],[8,[2,4]],[7,[5,7]],[9,[2,4]],[9,[1,6]],[8,[1,3]],[9,[4,7]],[9,[4,5]],[8,[5,7]],[7,[3,7]],[6,[3,5]],[9,[1,6]],[9,[2,4]],[8,[1,3]],[9,[4,7]],[9,[4,5]],[8,[5,7]],[7,[6,7]],[9,[2,4]],[9,[1,3]],[8,[1,4]],[9,[2,4]],[9,[6,7]],[8,[2,7]],[7,[4,7]],[6,[4,6]],[5,[3,6]],[9,[1,4]],[9,[6,7]],[8,[1,6]],[9,[1,6]],[9,[4,7]],[8,[1,4]],[7,[4,6]],[9,[3,6]],[9,[4,7]],[8,[3,7]],[9,[3,7]],[9,[4,6]],[8,[3,6]],[7,[6,7]],[6,[1,3]],[9,[3,5]],[9,[1,6]],[8,[1,5]],[9,[1,5]],[9,[3,6]],[8,[3,5]],[7,[1,3]],[9,[4,6]],[9,[1,3]],[8,[1,4]],[9,[3,6]],[9,[1,4]],[8,[4,6]],[7,[1,6]],[6,[4,5]],[5,[5,7]],[4,[1,7]],[3,[2,6]],[9,[3,6]],[9,[4,7]],[8,[4,6]],[9,[3,7]],[9,[4,6]],[8,[4,7]],[7,[6,7]],[9,[4,5]],[9,[4,7]],[8,[5,7]],[8,[5,7]],[7,[2,7]],[6,[2,6]],[9,[3,6]],[9,[5,7]],[8,[2,6]],[9,[4,7]],[9,[1,7]],[8,[1,4]],[7,[2,7]],[9,[3,7]],[9,[5,7]],[8,[2,7]],[9,[4,6]],[9,[1,6]],[8,[1,4]],[7,[2,6]],[6,[6,7]],[5,[2,4]],[9,[2,4]],[9,[3,6]],[8,[2,6]],[9,[4,7]],[9,[1,7]],[8,[1,4]],[7,[3,7]],[9,[2,4]],[9,[3,7]],[8,[2,7]],[9,[4,6]],[9,[1,6]],[8,[1,4]],[7,[3,6]],[6,[6,7]],[9,[2,7]],[9,[2,7]],[8,[2,4]],[9,[6,7]],[9,[1,5]],[8,[1,6]],[7,[2,6]],[9,[5,7]],[9,[1,6]],[8,[6,7]],[9,[2,4]],[9,[3,7]],[8,[5,7]],[7,[3,6]],[6,[1,7]],[5,[1,3]],[4,[2,3]],[9,[6,7]],[9,[4,5]],[8,[4,6]],[9,[5,7]],[9,[4,6]],[8,[6,7]],[7,[4,7]],[9,[4,5]],[9,[4,7]],[8,[5,7]],[8,[5,7]],[7,[2,7]],[6,[2,6]],[9,[2,6]],[9,[4,7]],[8,[2,7]],[9,[2,7]],[9,[4,6]],[8,[2,6]],[7,[6,7]],[9,[2,6]],[9,[1,7]],[8,[2,7]],[9,[2,7]],[9,[1,6]],[8,[2,6]],[7,[6,7]],[6,[1,4]],[5,[2,4]],[9,[2,6]],[9,[1,7]],[8,[2,7]],[9,[4,5]],[9,[1,7]],[8,[4,7]],[7,[2,4]],[9,[1,5]],[9,[4,7]],[8,[1,7]],[9,[2,4]],[9,[4,7]],[8,[3,7]],[7,[1,3]],[6,[1,4]],[9,[6,7]],[9,[4,7]],[8,[4,6]],[9,[1,5]],[9,[1,5]],[8,[2,4]],[7,[4,5]],[9,[6,7]],[9,[1,7]],[8,[1,6]],[9,[2,6]],[9,[4,5]],[8,[2,4]],[7,[1,5]],[6,[1,4]],[5,[5,7]],[4,[2,5]],[3,[3,5]],[2,[5,6]],[1,[3,4]],[9,[4,5]],[9,[2,6]],[8,[2,4]],[9,[1,7]],[9,[6,7]],[8,[1,6]],[7,[1,5]],[9,[1,5]],[9,[1,5]],[8,[2,4]],[9,[4,7]],[9,[6,7]],[8,[4,6]],[7,[4,5]],[6,[1,4]],[9,[4,7]],[9,[2,4]],[8,[3,7]],[9,[4,7]],[9,[1,5]],[8,[1,7]],[7,[1,3]],[9,[1,7]],[9,[4,5]],[8,[4,7]],[9,[1,7]],[9,[2,6]],[8,[2,7]],[7,[2,4]],[6,[1,4]],[5,[5,7]],[9,[1,6]],[9,[2,7]],[8,[2,6]],[9,[1,7]],[9,[2,6]],[8,[2,7]],[7,[6,7]],[9,[4,6]],[9,[2,7]],[8,[2,6]],[9,[4,7]],[9,[2,6]],[8,[2,7]],[7,[6,7]],[6,[1,4]],[8,[5,7]],[9,[4,7]],[9,[4,5]],[8,[5,7]],[7,[2,7]],[9,[4,6]],[9,[5,7]],[8,[6,7]],[9,[4,5]],[9,[6,7]],[8,[4,6]],[7,[4,7]],[6,[2,6]],[5,[2,4]],[4,[2,5]],[9,[3,7]],[9,[2,4]],[8,[5,7]],[9,[1,6]],[9,[5,7]],[8,[6,7]],[7,[3,6]],[9,[1,5]],[9,[6,7]],[8,[1,6]],[9,[2,7]],[9,[2,7]],[8,[2,4]],[7,[2,6]],[6,[1,7]],[9,[1,6]],[9,[4,6]],[8,[1,4]],[9,[3,7]],[9,[2,4]],[8,[2,7]],[7,[3,6]],[9,[1,7]],[9,[4,7]],[8,[1,4]],[9,[3,6]],[9,[2,4]],[8,[2,6]],[7,[3,7]],[6,[6,7]],[5,[1,3]],[9,[1,6]],[9,[4,6]],[8,[1,4]],[9,[5,7]],[9,[3,7]],[8,[2,7]],[7,[2,6]],[9,[1,7]],[9,[4,7]],[8,[1,4]],[9,[5,7]],[9,[3,6]],[8,[2,6]],[7,[2,7]],[6,[6,7]],[8,[5,7]],[9,[4,7]],[9,[4,5]],[8,[5,7]],[7,[2,7]],[9,[4,6]],[9,[3,7]],[8,[4,7]],[9,[4,7]],[9,[3,6]],[8,[4,6]],[7,[6,7]],[6,[2,6]],[5,[2,4]],[4,[2,3]],[3,[3,5]],[9,[1,4]],[9,[3,6]],[8,[4,6]],[9,[1,3]],[9,[4,6]],[8,[1,4]],[7,[1,6]],[9,[3,6]],[9,[1,5]],[8,[3,5]],[9,[1,6]],[9,[3,5]],[8,[1,5]],[7,[1,3]],[6,[4,5]],[9,[4,6]],[9,[3,7]],[8,[3,6]],[9,[4,7]],[9,[3,6]],[8,[3,7]],[7,[6,7]],[9,[4,7]],[9,[1,6]],[8,[1,4]],[9,[6,7]],[9,[1,4]],[8,[1,6]],[7,[4,6]],[6,[1,3]],[5,[5,7]],[9,[6,7]],[9,[2,4]],[8,[2,7]],[9,[1,3]],[9,[2,4]],[8,[1,4]],[7,[4,7]],[9,[4,5]],[9,[4,7]],[8,[5,7]],[9,[2,4]],[9,[1,6]],[8,[1,3]],[7,[6,7]],[6,[4,6]],[9,[4,5]],[9,[4,7]],[8,[5,7]],[9,[1,6]],[9,[2,4]],[8,[1,3]],[7,[3,7]],[9,[3,7]],[9,[2,7]],[8,[2,4]],[9,[1,6]],[9,[2,4]],[8,[1,5]],[7,[5,7]],[6,[3,5]],[5,[3,6]],[4,[1,7]],[9,[2,7]],[9,[1,4]],[8,[1,3]],[9,[4,5]],[9,[2,7]],[8,[2,5]],[7,[1,5]],[9,[2,5]],[9,[1,3]],[8,[4,5]],[9,[1,3]],[9,[4,7]],[8,[4,5]],[7,[2,7]],[6,[2,4]],[9,[2,4]],[9,[1,7]],[8,[1,5]],[9,[3,7]],[9,[2,4]],[8,[2,3]],[7,[1,3]],[9,[4,5]],[9,[3,7]],[8,[2,3]],[9,[4,7]],[9,[4,5]],[8,[3,7]],[7,[2,4]],[6,[2,7]],[5,[3,5]],[9,[3,7]],[9,[1,5]],[8,[1,7]],[8,[3,5]],[7,[2,4]],[9,[1,4]],[9,[3,5]],[8,[2,4]],[9,[1,7]],[9,[3,5]],[8,[3,7]],[7,[4,7]],[6,[1,3]],[9,[1,3]],[9,[2,5]],[8,[2,3]],[9,[1,5]],[9,[2,3]],[8,[2,5]],[7,[3,5]],[9,[6,7]],[9,[4,7]],[8,[4,6]],[8,[3,5]],[7,[4,5]],[6,[2,4]],[5,[2,7]],[4,[5,7]],[3,[2,6]],[2,[5,6]],[9,[2,7]],[9,[1,5]],[8,[1,3]],[8,[2,7]],[7,[2,6]],[9,[1,3]],[9,[4,7]],[8,[3,7]],[9,[1,4]],[9,[3,7]],[8,[1,3]],[7,[1,7]],[6,[5,7]],[9,[2,6]],[9,[4,7]],[8,[5,7]],[9,[1,6]],[9,[3,6]],[8,[1,3]],[7,[1,5]],[9,[3,7]],[9,[6,7]],[8,[3,6]],[9,[2,6]],[9,[1,5]],[8,[1,4]],[7,[5,7]],[6,[1,7]],[5,[3,5]],[9,[4,7]],[9,[2,6]],[8,[5,7]],[9,[1,6]],[9,[5,7]],[8,[6,7]],[7,[4,6]],[9,[1,5]],[9,[6,7]],[8,[1,6]],[9,[2,7]],[9,[2,7]],[8,[3,5]],[7,[2,6]],[6,[1,7]],[9,[1,6]],[9,[3,6]],[8,[1,3]],[9,[4,7]],[9,[2,6]],[8,[2,7]],[7,[4,6]],[9,[1,7]],[9,[3,7]],[8,[1,3]],[9,[4,6]],[9,[3,5]],[8,[2,6]],[7,[4,7]],[6,[6,7]],[5,[1,4]],[4,[4,5]],[9,[3,6]],[9,[4,7]],[8,[4,6]],[9,[3,7]],[9,[4,6]],[8,[4,7]],[7,[6,7]],[9,[3,7]],[9,[1,6]],[8,[1,3]],[9,[6,7]],[9,[1,3]],[8,[1,6]],[7,[3,6]],[6,[1,4]],[9,[4,6]],[9,[1,5]],[8,[4,5]],[9,[1,6]],[9,[4,5]],[8,[1,5]],[7,[1,4]],[9,[1,6]],[9,[4,7]],[8,[6,7]],[9,[1,4]],[9,[6,7]],[8,[4,7]],[7,[4,6]],[6,[5,7]],[5,[3,5]],[8,[2,6]],[9,[1,4]],[9,[6,7]],[8,[1,6]],[7,[5,7]],[9,[6,7]],[9,[3,5]],[8,[3,6]],[9,[5,7]],[9,[3,6]],[8,[6,7]],[7,[3,7]],[6,[1,3]],[9,[3,7]],[9,[5,7]],[8,[3,5]],[9,[1,6]],[9,[2,6]],[8,[1,4]],[7,[4,7]],[9,[4,7]],[9,[2,6]],[8,[2,7]],[9,[1,6]],[9,[2,5]],[8,[1,5]],[7,[5,7]],[6,[4,5]],[5,[4,6]],[4,[1,7]],[3,[5,6]],[9,[3,7]],[9,[1,5]],[8,[1,3]],[9,[5,7]],[9,[1,3]],[8,[3,7]],[7,[1,7]],[9,[5,7]],[9,[2,3]],[8,[1,3]],[8,[5,7]],[7,[2,6]],[6,[2,7]],[9,[5,7]],[9,[1,6]],[8,[1,5]],[9,[6,7]],[9,[1,5]],[8,[5,7]],[7,[1,7]],[9,[3,7]],[9,[6,7]],[8,[3,6]],[8,[2,6]],[7,[5,7]],[6,[1,3]],[5,[3,5]],[9,[1,6]],[9,[3,6]],[8,[1,3]],[9,[3,5]],[9,[5,7]],[8,[2,7]],[7,[2,3]],[9,[1,7]],[9,[6,7]],[8,[1,6]],[9,[5,7]],[9,[2,3]],[8,[3,5]],[7,[2,7]],[6,[3,7]],[9,[6,7]],[9,[2,7]],[8,[5,7]],[9,[6,7]],[9,[2,3]],[8,[3,6]],[7,[3,5]],[9,[3,5]],[9,[4,7]],[8,[2,7]],[9,[3,5]],[9,[4,6]],[8,[3,6]],[7,[6,7]],[6,[3,7]],[5,[2,6]],[4,[2,5]],[9,[3,6]],[9,[1,7]],[8,[1,6]],[9,[3,7]],[9,[1,6]],[8,[1,7]],[7,[6,7]],[9,[6,7]],[9,[1,5]],[8,[1,6]],[9,[5,7]],[9,[1,6]],[8,[6,7]],[7,[1,7]],[6,[3,5]],[9,[1,6]],[9,[3,5]],[8,[3,6]],[9,[1,7]],[9,[3,5]],[8,[2,7]],[7,[6,7]],[9,[2,3]],[9,[6,7]],[8,[3,6]],[9,[2,7]],[9,[6,7]],[8,[5,7]],[7,[3,5]],[6,[3,7]],[5,[1,3]],[9,[4,5]],[9,[1,7]],[8,[5,7]],[9,[3,7]],[9,[2,5]],[8,[2,3]],[7,[1,3]],[9,[4,5]],[9,[6,7]],[8,[5,7]],[9,[5,7]],[9,[2,3]],[8,[3,7]],[7,[3,6]],[6,[2,7]],[9,[1,5]],[9,[2,3]],[8,[2,5]],[9,[1,7]],[9,[1,3]],[8,[4,5]],[7,[5,7]],[9,[4,5]],[9,[4,7]],[8,[3,7]],[9,[2,5]],[9,[1,3]],[8,[4,5]],[7,[5,7]],[6,[2,7]],[5,[3,5]],[4,[2,6]],[3,[5,6]],[2,[2,4]],[1,[3,4]],[0,[1,2]]]

























































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

// function gen_pairs(n) {
//     var pairs = []
//     for (let i = 0; i < n; ++i) {
//         for (let j = 0; j < n; ++j) {
//             if (i < j) {
//                 pairs.push([i + 1, j + 1]);
//             }
//         }
//     }
//     return pairs;
// }

// function gen_empty_array(n) {
//     var res = [];
//     var pairs_n = (n * n - n) / 2;
//     for (let i = 0; i < pairs_n; i++) {
//         res.push(false);
//     }
//     return res;
// }

// function remove_values(values, node) {
//     // console.log(values);
//     // console.log(node);
//     var res = [];
//     for (let i = 0; i < values.length; i++) {
//         const element = values[i];
//         var ia = element.indexOf(node[0]);
//         var ib = element.indexOf(node[1]);
//         // console.log(ia);
//         // console.log(ib);
//         if (ia < ib) {
//             res.push(element);
//         }
//     }

//     return res;
// }

// function half(n) {
//     return Math.floor(n / 2);    
// }

// function all_median(n, values) {
//     var h = half(n);
//     var res = [];
//     for (let i = 0; i < values.length; i++) {
//         const element = values[i];
//         res.push(element[h]);
//     }

//     res = [...new Set(res)];
//     res.sort();
//     return res;
// }

// function all_median_equals(n, values) {
//     if (values.length <= 1) {
//         return true;
//     }

//     var h = half(n);
//     var m = values[0][h];

//     for (let i = 1; i < values.length; i++) {
//         const element = values[i];

//         if (element[h] != m) {
//             return false;
//         }
//     }

//     return true;
// }

// function all_equal(values) {
//     if (values.length <= 1) {
//         return true;
//     }

//     var m = values[0];

//     for (let i = 1; i < values.length; i++) {
//         const element = values[i];

//         if (element != m) {
//             return false;
//         }
//     }

//     return true;
// }


// function remove_level(nodes, level) {
//     var res = [];
//     for (let i = 0; i < nodes.length; i++) {
//         const element = nodes[i];
//         if (element[0] < level) {
//             res.push(element);
//         }
//     }
//     return res;
// }

// function print_bool_arr(arr) {
//     var res = [];
//     for (let i = 0; i < arr.length; i++) {
//         const element = arr[i];
//         var x = element ? 1 : 0;    
//         res.push(x);
//     }
//     console.log(res.join(''));
// }

// function pair_equal(p, m0, m1) {
//     if (p[0] == m0 && p[1] == m1) return true;
//     if (p[1] == m0 && p[0] == m1) return true;
//     return false;
// }

// // reemplazar esta funcion.
// // quiero los pares aun no usados que...
// // contengan los numeros que estan en medians
// function get_pairs(pairs, used, medians) {
//     var tmp = [];
//     for (let i = 0; i < used.length; i++) {
//         const u = used[i];
//         tmp.push([u, false, false]);
//     }

//     for (let i = 0; i < medians.length; i++) {
//         const m = medians[i];
        
//         for (let j = 0; j < tmp.length; j++) {
//             const p = pairs[j];
            
//             if (m == p[0]) {
//                 tmp[j][1] = true;
//             }
//             if (m == p[1]) {
//                 tmp[j][2] = true;
//             }

//         }
//     }

//     var res = [];
//     for (let i = 0; i < tmp.length; i++) {
//         const t = tmp[i];
//         if ( ! t[0] && t[1] && t[2]) {
//             res.push(i);
//         }
//     }
//     return res;
// }


// function get_pairs(pairs, used, medians) {
//     if (medians.length <= 1) {
//         console.log();
//         return [];
//     }

//     // medians.sort();

//     var res = [];

//     var i0 = 0;
//     var i1 = 1;

//     while (true) {
//         if (i1 >= medians.length) {
//             break;
//         }

//         var m0 = medians[i0];
//         var m1 = medians[i1];
    
//         for (let i = 0; i < pairs.length; i++) {
//             const p = pairs[i];
//             const u = used[i];

//             if ( ! u && pair_equal(p, m0, m1)) {
//                 res.push(i);
//                 break;
//             }
//         }
//         ++i0;
//         ++i1;
//     }
//     return res;
// }
