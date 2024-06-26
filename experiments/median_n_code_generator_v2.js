const common = require('./common');
var fs = require('fs');


function get_level(a, b) {

    var i = 0;
    while (true) {
        if ( ! common.equal_pair(a[i], b[i])) {
            return i;
        }
        ++i;
    }

    console.log("Esto no está bien");

}

function generate_branch(node, f, l, start_else, n) {
    var code = '';
    var first = true;
    const indent_1 = ' '.repeat(4);

    var last_level = f + 1 == l;

    var values = common.get_values_no_optimized(n, node)
    console.log(values.length);
    var median = common.all_median_equals(n, values);
    console.log(median);

    if (median == null) {
        console.log("**************************** error!");
    }

    while (f != l) {
        const indent_level = ' '.repeat((f + 1) * 4);
        const pair = node[f];

        // code += `${indent_level}if ( ! r(${common.get_variable_name(pair[1])}, ${common.get_variable_name(pair[0])})) {
        //     ${indent_level}${indent_1}return ${common.get_variable_name(median_left)};
        //     ${indent_level}} else {
        //     ${indent_level}${indent_1}return ${common.get_variable_name(median_right)};
        //     ${indent_level}}`

        if (start_else && first) {
            code += `${indent_level}} else {\n`
            first = false;
        } else {
            code += `${indent_level}if ( ! r(${common.get_variable_name(pair[1])}, ${common.get_variable_name(pair[0])})) {\n`
        }
        ++f;
    }
    const indent_level = ' '.repeat(f * 4);
    code += `${indent_level}${indent_1}return ${common.get_variable_name(median)};\n`

    if (start_else && last_level) {
        code += `${indent_level}}\n`
    }

    return code;
}

function generate_code(n, values, nodes, index, level, comps, s) {

    var code = generate_branch(nodes[0], 0, nodes[0].length, false, n);
    // console.log(code);

    var node_ant = nodes[0];
    for (let i = 1; i < nodes.length; i++) {
        const node = nodes[i];
        var level = get_level(node_ant, node);
        var start_else = common.equal_pair(node[level], [node_ant[level][1], node_ant[level][0]]);
        code += generate_branch(node, level, node.length, start_else, n);
        // console.log(code);
        node_ant = node;
    }

    // console.log(code);

    return code;



//     const indent_level = ' '.repeat((level + 1) * 4);
//     const indent_1 = ' '.repeat(4);

//     // var mtemp = common.all_median_equals(n, values);
//     var mtemp = common.all_selection_equals(n, values, s);
//     if (mtemp != null) {
//         var code = `${indent_level}return ${common.get_variable_name(mtemp)};`
//         return code;
//     }

//     var pair_left = nodes[index][1];
//     if (pair_left.length == 0) {
//         console.log()
//     }    
//     var pair_right = pair_left.slice().reverse();


//     var new_values_left = common.remove_values(values, pair_left);
//     var new_values_right = common.remove_values(values, pair_right);

//     if (level == comps - 1) {
//         // var median_left = common.all_median_equals(n, new_values_left);
//         // var median_right = common.all_median_equals(n, new_values_right);
//         var median_left = common.all_selection_equals(n, new_values_left, s);
//         var median_right = common.all_selection_equals(n, new_values_right, s);

//         var code = `${indent_level}if ( ! r(${common.get_variable_name(pair_left[1])}, ${common.get_variable_name(pair_left[0])})) {
// ${indent_level}${indent_1}return ${common.get_variable_name(median_left)};
// ${indent_level}} else {
// ${indent_level}${indent_1}return ${common.get_variable_name(median_right)};
// ${indent_level}}`
//         return code;
//     }

//     if (nodes[index + 1][0] != level + 1){
//         console.log("que paso aca!!!");
//     }

//     var code_if = generate_code(n, new_values_left, nodes, index + 1, level + 1, comps, s);

//     // var level_inverse = comps - level - 1;
//     var level_inverse = comps - level;
//     var else_inc = Math.pow(2, level_inverse);

//     if (nodes[index + else_inc][0] != level + 1) {
//         console.log();
//     }

//     var code_else = generate_code(n, new_values_right, nodes, index + else_inc, level + 1, comps, s);

//     var code = `${indent_level}if ( ! r(${common.get_variable_name(pair_left[1])}, ${common.get_variable_name(pair_left[0])})) {
// ${code_if}
// ${indent_level}} else {
// ${code_else}
// ${indent_level}}`;
    
//     return code;
}


function get_tests() {
    var contents = fs.readFileSync('temp/result4e.txt', 'utf8');
    var values = JSON.parse(contents);
    return values;
}

function main() {

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


    // --------------------------------------------------------------------------
    // n=11

    // var tests_str = "[[0,[1,2]],[1,[2,5]],[2,[3,5]],[3,[3,7]],[4,[4,5]],[5,[4,7]],[6,4],[6,7],[5,[5,7]],[6,5],[6,7],[4,3],[],[],[],[],[],[],[3,[3,6]],[4,[3,7]],[5,3],[],[],[5,[5,7]],[6,7],[6,5],[4,[5,7]],[5,[6,7]],[6,6],[6,7],[5,5],[],[],[2,[1,6]],[3,[6,7]],[4,[2,6]],[5,[3,6]],[6,3],[6,6],[5,[2,7]],[6,2],[6,7],[4,[2,7]],[5,[3,7]],[6,3],[6,7],[5,[2,6]],[6,2],[6,6],[3,[1,7]],[4,[2,7]],[5,2],[],[],[5,7],[],[],[4,1],[],[],[],[],[],[],[1,[1,5]],[2,[3,5]],[3,[3,7]],[4,[4,5]],[5,[4,7]],[6,4],[6,7],[5,[5,7]],[6,5],[6,7],[4,3],[],[],[],[],[],[],[3,[3,6]],[4,[3,7]],[5,3],[],[],[5,[5,7]],[6,7],[6,5],[4,[5,7]],[5,[6,7]],[6,6],[6,7],[5,5],[],[],[2,[1,6]],[3,[1,7]],[4,[3,6]],[5,[3,7]],[6,3],[6,7],[5,[6,7]],[6,6],[6,7],[4,1],[],[],[],[],[],[],[3,[1,7]],[4,1],[],[],[],[],[],[],[4,[2,6]],[5,[6,7]],[6,7],[6,6],[5,[2,7]],[6,7],[6,2]]";
    // var tests = JSON.parse(tests_str);
    var tests = get_tests();
    var n = 11;
    var s = 6;

    // filtros: 
    var preconds = [];
    // var comps = common.get_max_comps(vtn, n, s) - preconds.length;
    var comps = 18;
    var values = [];
    // var values = common.perm_with_preconds(common.iota(n), preconds);
    // console.log(values.length);
    // values = common.apply_precons(values, preconds);
    // console.log(values.length);


    // --------------------------------------------------------------------------
    var code = generate_code(n, values, tests, 0, 0, comps, s);
    console.log(code);
}

main();


// module.exports = {
//     generate_code: generate_code,
// }
























// 574000000
// 111100001010011000101
// 574100000
// 111110000011011100000
// 574200000
// 111110101100010000001
// 574300000
// 111110001001001100010
// [[9,[1,3]],[9,[2,5]],[8,[4,5]],[9,[4,7]],[9,[4,5]],[8,[3,7]],[7,[5,7]],[9,[1,3]],[9,[1,7]],[8,[4,5]],[9,[2,3]],[9,[1,5]],[8,[2,5]],[7,[5,7]],[6,[2,7]],[9,[2,3]],[9,[5,7]],[8,[3,7]],[9,[6,7]],[9,[4,5]],[8,[5,7]],[7,[3,6]],[9,[2,5]],[9,[3,7]],[8,[2,3]],[9,[1,7]],[9,[4,5]],[8,[5,7]],[7,[1,3]],[6,[2,7]],[5,[3,5]],[9,[6,7]],[9,[2,7]],[8,[5,7]],[9,[6,7]],[9,[2,3]],[8,[3,6]],[7,[3,5]],[9,[3,5]],[9,[1,7]],[8,[2,7]],[9,[3,5]],[9,[1,6]],[8,[3,6]],[7,[6,7]],[6,[3,7]],[9,[1,6]],[9,[5,7]],[8,[6,7]],[9,[1,5]],[9,[6,7]],[8,[1,6]],[7,[1,7]],[9,[1,6]],[9,[3,7]],[8,[1,7]],[9,[1,7]],[9,[3,6]],[8,[1,6]],[7,[6,7]],[6,[3,5]],[5,[1,3]],[4,[2,6]],[9,[4,6]],[9,[3,5]],[8,[3,6]],[9,[4,7]],[9,[3,5]],[8,[2,7]],[7,[6,7]],[9,[2,3]],[9,[6,7]],[8,[3,6]],[9,[2,7]],[9,[6,7]],[8,[5,7]],[7,[3,5]],[6,[3,7]],[9,[2,3]],[9,[5,7]],[8,[3,5]],[9,[6,7]],[9,[1,7]],[8,[1,6]],[7,[2,7]],[9,[5,7]],[9,[3,5]],[8,[2,7]],[9,[3,6]],[9,[1,6]],[8,[1,3]],[7,[2,3]],[6,[3,7]],[5,[2,6]],[8,[2,6]],[9,[6,7]],[9,[3,7]],[8,[3,6]],[7,[5,7]],[9,[1,5]],[9,[6,7]],[8,[5,7]],[9,[1,6]],[9,[5,7]],[8,[1,5]],[7,[1,7]],[6,[1,3]],[8,[5,7]],[9,[2,3]],[9,[5,7]],[8,[1,3]],[7,[2,6]],[9,[1,3]],[9,[5,7]],[8,[3,7]],[9,[1,5]],[9,[3,7]],[8,[1,3]],[7,[1,7]],[6,[2,7]],[5,[3,5]],[4,[2,5]],[3,[5,6]],[9,[2,5]],[9,[1,6]],[8,[1,5]],[9,[2,6]],[9,[4,7]],[8,[2,7]],[7,[5,7]],[9,[2,6]],[9,[1,6]],[8,[1,4]],[9,[5,7]],[9,[3,7]],[8,[3,5]],[7,[4,7]],[6,[4,5]],[9,[3,6]],[9,[5,7]],[8,[6,7]],[9,[3,5]],[9,[6,7]],[8,[3,6]],[7,[3,7]],[9,[6,7]],[9,[1,4]],[8,[1,6]],[8,[2,6]],[7,[5,7]],[6,[1,3]],[5,[4,6]],[9,[6,7]],[9,[1,4]],[8,[4,7]],[9,[4,7]],[9,[1,6]],[8,[6,7]],[7,[4,6]],[9,[4,5]],[9,[1,6]],[8,[1,5]],[9,[1,5]],[9,[4,6]],[8,[4,5]],[7,[1,4]],[6,[5,7]],[9,[1,3]],[9,[6,7]],[8,[1,6]],[9,[1,6]],[9,[3,7]],[8,[1,3]],[7,[3,6]],[9,[4,6]],[9,[3,7]],[8,[4,7]],[9,[4,7]],[9,[3,6]],[8,[4,6]],[7,[6,7]],[6,[1,4]],[5,[3,5]],[4,[1,7]],[9,[3,5]],[9,[4,6]],[8,[2,6]],[9,[3,7]],[9,[1,7]],[8,[1,3]],[7,[4,7]],[9,[2,6]],[9,[4,7]],[8,[2,7]],[9,[3,6]],[9,[1,6]],[8,[1,3]],[7,[4,6]],[6,[6,7]],[9,[2,7]],[9,[2,7]],[8,[3,5]],[9,[6,7]],[9,[1,5]],[8,[1,6]],[7,[2,6]],[9,[5,7]],[9,[1,6]],[8,[6,7]],[9,[2,6]],[9,[4,7]],[8,[5,7]],[7,[4,6]],[6,[1,7]],[5,[1,4]],[9,[1,5]],[9,[2,6]],[8,[1,4]],[9,[6,7]],[9,[3,7]],[8,[3,6]],[7,[5,7]],[9,[3,6]],[9,[1,6]],[8,[1,3]],[9,[4,7]],[9,[2,6]],[8,[5,7]],[7,[1,5]],[6,[1,7]],[9,[3,7]],[9,[1,4]],[8,[1,3]],[9,[4,7]],[9,[1,3]],[8,[3,7]],[7,[1,7]],[8,[2,7]],[9,[1,5]],[9,[2,7]],[8,[1,3]],[7,[2,6]],[6,[5,7]],[5,[3,5]],[4,[4,5]],[3,[5,6]],[2,[2,4]],[8,[3,5]],[9,[4,7]],[9,[6,7]],[8,[4,6]],[7,[4,5]],[9,[2,3]],[9,[1,5]],[8,[2,5]],[9,[2,5]],[9,[1,3]],[8,[2,3]],[7,[3,5]],[6,[2,4]],[9,[3,5]],[9,[1,7]],[8,[3,7]],[9,[3,5]],[9,[1,4]],[8,[2,4]],[7,[4,7]],[8,[3,5]],[9,[1,5]],[9,[3,7]],[8,[1,7]],[7,[2,4]],[6,[1,3]],[5,[2,7]],[9,[4,5]],[9,[4,7]],[8,[3,7]],[9,[3,7]],[9,[4,5]],[8,[2,3]],[7,[2,4]],[9,[2,4]],[9,[3,7]],[8,[2,3]],[9,[1,7]],[9,[2,4]],[8,[1,5]],[7,[1,3]],[6,[2,7]],[9,[4,7]],[9,[1,3]],[8,[4,5]],[9,[1,3]],[9,[2,5]],[8,[4,5]],[7,[2,7]],[9,[2,7]],[9,[4,5]],[8,[2,5]],[9,[1,4]],[9,[2,7]],[8,[1,3]],[7,[1,5]],[6,[2,4]],[5,[3,5]],[4,[5,7]],[9,[2,4]],[9,[1,6]],[8,[1,5]],[9,[2,7]],[9,[3,7]],[8,[2,4]],[7,[5,7]],[9,[2,4]],[9,[1,6]],[8,[1,3]],[9,[4,7]],[9,[4,5]],[8,[5,7]],[7,[3,7]],[6,[3,5]],[9,[1,6]],[9,[2,4]],[8,[1,3]],[9,[4,7]],[9,[4,5]],[8,[5,7]],[7,[6,7]],[9,[2,4]],[9,[1,3]],[8,[1,4]],[9,[2,4]],[9,[6,7]],[8,[2,7]],[7,[4,7]],[6,[4,6]],[5,[3,6]],[9,[1,4]],[9,[6,7]],[8,[1,6]],[9,[1,6]],[9,[4,7]],[8,[1,4]],[7,[4,6]],[9,[3,6]],[9,[4,7]],[8,[3,7]],[9,[3,7]],[9,[4,6]],[8,[3,6]],[7,[6,7]],[6,[1,3]],[9,[3,5]],[9,[1,6]],[8,[1,5]],[9,[1,5]],[9,[3,6]],[8,[3,5]],[7,[1,3]],[9,[4,6]],[9,[1,3]],[8,[1,4]],[9,[3,6]],[9,[1,4]],[8,[4,6]],[7,[1,6]],[6,[4,5]],[5,[5,7]],[4,[1,7]],[3,[2,6]],[9,[3,6]],[9,[4,7]],[8,[4,6]],[9,[3,7]],[9,[4,6]],[8,[4,7]],[7,[6,7]],[9,[4,5]],[9,[4,7]],[8,[5,7]],[8,[5,7]],[7,[2,7]],[6,[2,6]],[9,[3,6]],[9,[5,7]],[8,[2,6]],[9,[4,7]],[9,[1,7]],[8,[1,4]],[7,[2,7]],[9,[3,7]],[9,[5,7]],[8,[2,7]],[9,[4,6]],[9,[1,6]],[8,[1,4]],[7,[2,6]],[6,[6,7]],[5,[2,4]],[9,[2,4]],[9,[3,6]],[8,[2,6]],[9,[4,7]],[9,[1,7]],[8,[1,4]],[7,[3,7]],[9,[2,4]],[9,[3,7]],[8,[2,7]],[9,[4,6]],[9,[1,6]],[8,[1,4]],[7,[3,6]],[6,[6,7]],[9,[2,7]],[9,[2,7]],[8,[2,4]],[9,[6,7]],[9,[1,5]],[8,[1,6]],[7,[2,6]],[9,[5,7]],[9,[1,6]],[8,[6,7]],[9,[2,4]],[9,[3,7]],[8,[5,7]],[7,[3,6]],[6,[1,7]],[5,[1,3]],[4,[2,3]],[9,[6,7]],[9,[4,5]],[8,[4,6]],[9,[5,7]],[9,[4,6]],[8,[6,7]],[7,[4,7]],[9,[4,5]],[9,[4,7]],[8,[5,7]],[8,[5,7]],[7,[2,7]],[6,[2,6]],[9,[2,6]],[9,[4,7]],[8,[2,7]],[9,[2,7]],[9,[4,6]],[8,[2,6]],[7,[6,7]],[9,[2,6]],[9,[1,7]],[8,[2,7]],[9,[2,7]],[9,[1,6]],[8,[2,6]],[7,[6,7]],[6,[1,4]],[5,[2,4]],[9,[2,6]],[9,[1,7]],[8,[2,7]],[9,[4,5]],[9,[1,7]],[8,[4,7]],[7,[2,4]],[9,[1,5]],[9,[4,7]],[8,[1,7]],[9,[2,4]],[9,[4,7]],[8,[3,7]],[7,[1,3]],[6,[1,4]],[9,[6,7]],[9,[4,7]],[8,[4,6]],[9,[1,5]],[9,[1,5]],[8,[2,4]],[7,[4,5]],[9,[6,7]],[9,[1,7]],[8,[1,6]],[9,[2,6]],[9,[4,5]],[8,[2,4]],[7,[1,5]],[6,[1,4]],[5,[5,7]],[4,[2,5]],[3,[3,5]],[2,[5,6]],[1,[3,4]],[9,[4,5]],[9,[2,6]],[8,[2,4]],[9,[1,7]],[9,[6,7]],[8,[1,6]],[7,[1,5]],[9,[1,5]],[9,[1,5]],[8,[2,4]],[9,[4,7]],[9,[6,7]],[8,[4,6]],[7,[4,5]],[6,[1,4]],[9,[4,7]],[9,[2,4]],[8,[3,7]],[9,[4,7]],[9,[1,5]],[8,[1,7]],[7,[1,3]],[9,[1,7]],[9,[4,5]],[8,[4,7]],[9,[1,7]],[9,[2,6]],[8,[2,7]],[7,[2,4]],[6,[1,4]],[5,[5,7]],[9,[1,6]],[9,[2,7]],[8,[2,6]],[9,[1,7]],[9,[2,6]],[8,[2,7]],[7,[6,7]],[9,[4,6]],[9,[2,7]],[8,[2,6]],[9,[4,7]],[9,[2,6]],[8,[2,7]],[7,[6,7]],[6,[1,4]],[8,[5,7]],[9,[4,7]],[9,[4,5]],[8,[5,7]],[7,[2,7]],[9,[4,6]],[9,[5,7]],[8,[6,7]],[9,[4,5]],[9,[6,7]],[8,[4,6]],[7,[4,7]],[6,[2,6]],[5,[2,4]],[4,[2,5]],[9,[3,7]],[9,[2,4]],[8,[5,7]],[9,[1,6]],[9,[5,7]],[8,[6,7]],[7,[3,6]],[9,[1,5]],[9,[6,7]],[8,[1,6]],[9,[2,7]],[9,[2,7]],[8,[2,4]],[7,[2,6]],[6,[1,7]],[9,[1,6]],[9,[4,6]],[8,[1,4]],[9,[3,7]],[9,[2,4]],[8,[2,7]],[7,[3,6]],[9,[1,7]],[9,[4,7]],[8,[1,4]],[9,[3,6]],[9,[2,4]],[8,[2,6]],[7,[3,7]],[6,[6,7]],[5,[1,3]],[9,[1,6]],[9,[4,6]],[8,[1,4]],[9,[5,7]],[9,[3,7]],[8,[2,7]],[7,[2,6]],[9,[1,7]],[9,[4,7]],[8,[1,4]],[9,[5,7]],[9,[3,6]],[8,[2,6]],[7,[2,7]],[6,[6,7]],[8,[5,7]],[9,[4,7]],[9,[4,5]],[8,[5,7]],[7,[2,7]],[9,[4,6]],[9,[3,7]],[8,[4,7]],[9,[4,7]],[9,[3,6]],[8,[4,6]],[7,[6,7]],[6,[2,6]],[5,[2,4]],[4,[2,3]],[3,[3,5]],[9,[1,4]],[9,[3,6]],[8,[4,6]],[9,[1,3]],[9,[4,6]],[8,[1,4]],[7,[1,6]],[9,[3,6]],[9,[1,5]],[8,[3,5]],[9,[1,6]],[9,[3,5]],[8,[1,5]],[7,[1,3]],[6,[4,5]],[9,[4,6]],[9,[3,7]],[8,[3,6]],[9,[4,7]],[9,[3,6]],[8,[3,7]],[7,[6,7]],[9,[4,7]],[9,[1,6]],[8,[1,4]],[9,[6,7]],[9,[1,4]],[8,[1,6]],[7,[4,6]],[6,[1,3]],[5,[5,7]],[9,[6,7]],[9,[2,4]],[8,[2,7]],[9,[1,3]],[9,[2,4]],[8,[1,4]],[7,[4,7]],[9,[4,5]],[9,[4,7]],[8,[5,7]],[9,[2,4]],[9,[1,6]],[8,[1,3]],[7,[6,7]],[6,[4,6]],[9,[4,5]],[9,[4,7]],[8,[5,7]],[9,[1,6]],[9,[2,4]],[8,[1,3]],[7,[3,7]],[9,[3,7]],[9,[2,7]],[8,[2,4]],[9,[1,6]],[9,[2,4]],[8,[1,5]],[7,[5,7]],[6,[3,5]],[5,[3,6]],[4,[1,7]],[9,[2,7]],[9,[1,4]],[8,[1,3]],[9,[4,5]],[9,[2,7]],[8,[2,5]],[7,[1,5]],[9,[2,5]],[9,[1,3]],[8,[4,5]],[9,[1,3]],[9,[4,7]],[8,[4,5]],[7,[2,7]],[6,[2,4]],[9,[2,4]],[9,[1,7]],[8,[1,5]],[9,[3,7]],[9,[2,4]],[8,[2,3]],[7,[1,3]],[9,[4,5]],[9,[3,7]],[8,[2,3]],[9,[4,7]],[9,[4,5]],[8,[3,7]],[7,[2,4]],[6,[2,7]],[5,[3,5]],[9,[3,7]],[9,[1,5]],[8,[1,7]],[8,[3,5]],[7,[2,4]],[9,[1,4]],[9,[3,5]],[8,[2,4]],[9,[1,7]],[9,[3,5]],[8,[3,7]],[7,[4,7]],[6,[1,3]],[9,[1,3]],[9,[2,5]],[8,[2,3]],[9,[1,5]],[9,[2,3]],[8,[2,5]],[7,[3,5]],[9,[6,7]],[9,[4,7]],[8,[4,6]],[8,[3,5]],[7,[4,5]],[6,[2,4]],[5,[2,7]],[4,[5,7]],[3,[2,6]],[2,[5,6]],[9,[2,7]],[9,[1,5]],[8,[1,3]],[8,[2,7]],[7,[2,6]],[9,[1,3]],[9,[4,7]],[8,[3,7]],[9,[1,4]],[9,[3,7]],[8,[1,3]],[7,[1,7]],[6,[5,7]],[9,[2,6]],[9,[4,7]],[8,[5,7]],[9,[1,6]],[9,[3,6]],[8,[1,3]],[7,[1,5]],[9,[3,7]],[9,[6,7]],[8,[3,6]],[9,[2,6]],[9,[1,5]],[8,[1,4]],[7,[5,7]],[6,[1,7]],[5,[3,5]],[9,[4,7]],[9,[2,6]],[8,[5,7]],[9,[1,6]],[9,[5,7]],[8,[6,7]],[7,[4,6]],[9,[1,5]],[9,[6,7]],[8,[1,6]],[9,[2,7]],[9,[2,7]],[8,[3,5]],[7,[2,6]],[6,[1,7]],[9,[1,6]],[9,[3,6]],[8,[1,3]],[9,[4,7]],[9,[2,6]],[8,[2,7]],[7,[4,6]],[9,[1,7]],[9,[3,7]],[8,[1,3]],[9,[4,6]],[9,[3,5]],[8,[2,6]],[7,[4,7]],[6,[6,7]],[5,[1,4]],[4,[4,5]],[9,[3,6]],[9,[4,7]],[8,[4,6]],[9,[3,7]],[9,[4,6]],[8,[4,7]],[7,[6,7]],[9,[3,7]],[9,[1,6]],[8,[1,3]],[9,[6,7]],[9,[1,3]],[8,[1,6]],[7,[3,6]],[6,[1,4]],[9,[4,6]],[9,[1,5]],[8,[4,5]],[9,[1,6]],[9,[4,5]],[8,[1,5]],[7,[1,4]],[9,[1,6]],[9,[4,7]],[8,[6,7]],[9,[1,4]],[9,[6,7]],[8,[4,7]],[7,[4,6]],[6,[5,7]],[5,[3,5]],[8,[2,6]],[9,[1,4]],[9,[6,7]],[8,[1,6]],[7,[5,7]],[9,[6,7]],[9,[3,5]],[8,[3,6]],[9,[5,7]],[9,[3,6]],[8,[6,7]],[7,[3,7]],[6,[1,3]],[9,[3,7]],[9,[5,7]],[8,[3,5]],[9,[1,6]],[9,[2,6]],[8,[1,4]],[7,[4,7]],[9,[4,7]],[9,[2,6]],[8,[2,7]],[9,[1,6]],[9,[2,5]],[8,[1,5]],[7,[5,7]],[6,[4,5]],[5,[4,6]],[4,[1,7]],[3,[5,6]],[9,[3,7]],[9,[1,5]],[8,[1,3]],[9,[5,7]],[9,[1,3]],[8,[3,7]],[7,[1,7]],[9,[5,7]],[9,[2,3]],[8,[1,3]],[8,[5,7]],[7,[2,6]],[6,[2,7]],[9,[5,7]],[9,[1,6]],[8,[1,5]],[9,[6,7]],[9,[1,5]],[8,[5,7]],[7,[1,7]],[9,[3,7]],[9,[6,7]],[8,[3,6]],[8,[2,6]],[7,[5,7]],[6,[1,3]],[5,[3,5]],[9,[1,6]],[9,[3,6]],[8,[1,3]],[9,[3,5]],[9,[5,7]],[8,[2,7]],[7,[2,3]],[9,[1,7]],[9,[6,7]],[8,[1,6]],[9,[5,7]],[9,[2,3]],[8,[3,5]],[7,[2,7]],[6,[3,7]],[9,[6,7]],[9,[2,7]],[8,[5,7]],[9,[6,7]],[9,[2,3]],[8,[3,6]],[7,[3,5]],[9,[3,5]],[9,[4,7]],[8,[2,7]],[9,[3,5]],[9,[4,6]],[8,[3,6]],[7,[6,7]],[6,[3,7]],[5,[2,6]],[4,[2,5]],[9,[3,6]],[9,[1,7]],[8,[1,6]],[9,[3,7]],[9,[1,6]],[8,[1,7]],[7,[6,7]],[9,[6,7]],[9,[1,5]],[8,[1,6]],[9,[5,7]],[9,[1,6]],[8,[6,7]],[7,[1,7]],[6,[3,5]],[9,[1,6]],[9,[3,5]],[8,[3,6]],[9,[1,7]],[9,[3,5]],[8,[2,7]],[7,[6,7]],[9,[2,3]],[9,[6,7]],[8,[3,6]],[9,[2,7]],[9,[6,7]],[8,[5,7]],[7,[3,5]],[6,[3,7]],[5,[1,3]],[9,[4,5]],[9,[1,7]]


/*
[[9,[1,3]],[9,[2,5]],[8,[4,5]],[9,[4,7]],[9,[4,5]],[8,[3,7]],[7,[5,7]],[9,[1,3]],[9,[1,7]],[8,[4,5]],[9,[2,3]],[9,[1,5]],[8,[2,5]],[7,[5,7]],[6,[2,7]],[9,[2,3]],[9,[5,7]],[8,[3,7]],[9,[6,7]],[9,[4,5]],[8,[5,7]],[7,[3,6]],[9,[2,5]],[9,[3,7]],[8,[2,3]],[9,[1,7]],[9,[4,5]],[8,[5,7]],[7,[1,3]],[6,[2,7]],[5,[3,5]],[9,[6,7]],[9,[2,7]],[8,[5,7]],[9,[6,7]],[9,[2,3]],[8,[3,6]],[7,[3,5]],[9,[3,5]],[9,[1,7]],[8,[2,7]],[9,[3,5]],[9,[1,6]],[8,[3,6]],[7,[6,7]],[6,[3,7]],[9,[1,6]],[9,[5,7]],[8,[6,7]],[9,[1,5]],[9,[6,7]],[8,[1,6]],[7,[1,7]],[9,[1,6]],[9,[3,7]],[8,[1,7]],[9,[1,7]],[9,[3,6]],[8,[1,6]],[7,[6,7]],[6,[3,5]],[5,[1,3]],[4,[2,6]],[9,[4,6]],[9,[3,5]],[8,[3,6]],[9,[4,7]],[9,[3,5]],[8,[2,7]],[7,[6,7]],[9,[2,3]],[9,[6,7]],[8,[3,6]],[9,[2,7]],[9,[6,7]],[8,[5,7]],[7,[3,5]],[6,[3,7]],[9,[2,3]],[9,[5,7]],[8,[3,5]],[9,[6,7]],[9,[1,7]],[8,[1,6]],[7,[2,7]],[9,[5,7]],[9,[3,5]],[8,[2,7]],[9,[3,6]],[9,[1,6]],[8,[1,3]],[7,[2,3]],[6,[3,7]],[5,[2,6]],[8,[2,6]],[9,[6,7]],[9,[3,7]],[8,[3,6]],[7,[5,7]],[9,[1,5]],[9,[6,7]],[8,[5,7]],[9,[1,6]],[9,[5,7]],[8,[1,5]],[7,[1,7]],[6,[1,3]],[8,[5,7]],[9,[2,3]],[9,[5,7]],[8,[1,3]],[7,[2,6]],[9,[1,3]],[9,[5,7]],[8,[3,7]],[9,[1,5]],[9,[3,7]],[8,[1,3]],[7,[1,7]],[6,[2,7]],[5,[3,5]],[4,[2,5]],[3,[5,6]],[9,[2,5]],[9,[1,6]],[8,[1,5]],[9,[2,6]],[9,[4,7]],[8,[2,7]],[7,[5,7]],[9,[2,6]],[9,[1,6]],[8,[1,4]],[9,[5,7]],[9,[3,7]],[8,[3,5]],[7,[4,7]],[6,[4,5]],[9,[3,6]],[9,[5,7]],[8,[6,7]],[9,[3,5]],[9,[6,7]],[8,[3,6]],[7,[3,7]],[9,[6,7]],[9,[1,4]],[8,[1,6]],[8,[2,6]],[7,[5,7]],[6,[1,3]],[5,[4,6]],[9,[6,7]],[9,[1,4]],[8,[4,7]],[9,[4,7]],[9,[1,6]],[8,[6,7]],[7,[4,6]],[9,[4,5]],[9,[1,6]],[8,[1,5]],[9,[1,5]],[9,[4,6]],[8,[4,5]],[7,[1,4]],[6,[5,7]],[9,[1,3]],[9,[6,7]],[8,[1,6]],[9,[1,6]],[9,[3,7]],[8,[1,3]],[7,[3,6]],[9,[4,6]],[9,[3,7]],[8,[4,7]],[9,[4,7]],[9,[3,6]],[8,[4,6]],[7,[6,7]],[6,[1,4]],[5,[3,5]],[4,[1,7]],[9,[3,5]],[9,[4,6]],[8,[2,6]],[9,[3,7]],[9,[1,7]],[8,[1,3]],[7,[4,7]],[9,[2,6]],[9,[4,7]],[8,[2,7]],[9,[3,6]],[9,[1,6]],[8,[1,3]],[7,[4,6]],[6,[6,7]],[9,[2,7]],[9,[2,7]],[8,[3,5]],[9,[6,7]],[9,[1,5]],[8,[1,6]],[7,[2,6]],[9,[5,7]],[9,[1,6]],[8,[6,7]],[9,[2,6]],[9,[4,7]],[8,[5,7]],[7,[4,6]],[6,[1,7]],[5,[1,4]],[9,[1,5]],[9,[2,6]],[8,[1,4]],[9,[6,7]],[9,[3,7]],[8,[3,6]],[7,[5,7]],[9,[3,6]],[9,[1,6]],[8,[1,3]],[9,[4,7]],[9,[2,6]],[8,[5,7]],[7,[1,5]],[6,[1,7]],[9,[3,7]],[9,[1,4]],[8,[1,3]],[9,[4,7]],[9,[1,3]],[8,[3,7]],[7,[1,7]],[8,[2,7]],[9,[1,5]],[9,[2,7]],[8,[1,3]],[7,[2,6]],[6,[5,7]],[5,[3,5]],[4,[4,5]],[3,[5,6]],[2,[2,4]],[8,[3,5]],[9,[4,7]],[9,[6,7]],[8,[4,6]],[7,[4,5]],[9,[2,3]],[9,[1,5]],[8,[2,5]],[9,[2,5]],[9,[1,3]],[8,[2,3]],[7,[3,5]],[6,[2,4]],[9,[3,5]],[9,[1,7]],[8,[3,7]],[9,[3,5]],[9,[1,4]],[8,[2,4]],[7,[4,7]],[8,[3,5]],[9,[1,5]],[9,[3,7]],[8,[1,7]],[7,[2,4]],[6,[1,3]],[5,[2,7]],[9,[4,5]],[9,[4,7]],[8,[3,7]],[9,[3,7]],[9,[4,5]],[8,[2,3]],[7,[2,4]],[9,[2,4]],[9,[3,7]],[8,[2,3]],[9,[1,7]],[9,[2,4]],[8,[1,5]],[7,[1,3]],[6,[2,7]],[9,[4,7]],[9,[1,3]],[8,[4,5]],[9,[1,3]],[9,[2,5]],[8,[4,5]],[7,[2,7]],[9,[2,7]],[9,[4,5]],[8,[2,5]],[9,[1,4]],[9,[2,7]],[8,[1,3]],[7,[1,5]],[6,[2,4]],[5,[3,5]],[4,[5,7]],[9,[2,4]],[9,[1,6]],[8,[1,5]],[9,[2,7]],[9,[3,7]],[8,[2,4]],[7,[5,7]],[9,[2,4]],[9,[1,6]],[8,[1,3]],[9,[4,7]],[9,[4,5]],[8,[5,7]],[7,[3,7]],[6,[3,5]],[9,[1,6]],[9,[2,4]],[8,[1,3]],[9,[4,7]],[9,[4,5]],[8,[5,7]],[7,[6,7]],[9,[2,4]],[9,[1,3]],[8,[1,4]],[9,[2,4]],[9,[6,7]],[8,[2,7]],[7,[4,7]],[6,[4,6]],[5,[3,6]],[9,[1,4]],[9,[6,7]],[8,[1,6]],[9,[1,6]],[9,[4,7]],[8,[1,4]],[7,[4,6]],[9,[3,6]],[9,[4,7]],[8,[3,7]],[9,[3,7]],[9,[4,6]],[8,[3,6]],[7,[6,7]],[6,[1,3]],[9,[3,5]],[9,[1,6]],[8,[1,5]],[9,[1,5]],[9,[3,6]],[8,[3,5]],[7,[1,3]],[9,[4,6]],[9,[1,3]],[8,[1,4]],[9,[3,6]],[9,[1,4]],[8,[4,6]],[7,[1,6]],[6,[4,5]],[5,[5,7]],[4,[1,7]],[3,[2,6]],[9,[3,6]],[9,[4,7]],[8,[4,6]],[9,[3,7]],[9,[4,6]],[8,[4,7]],[7,[6,7]],[9,[4,5]],[9,[4,7]],[8,[5,7]],[8,[5,7]],[7,[2,7]],[6,[2,6]],[9,[3,6]],[9,[5,7]],[8,[2,6]],[9,[4,7]],[9,[1,7]],[8,[1,4]],[7,[2,7]],[9,[3,7]],[9,[5,7]],[8,[2,7]],[9,[4,6]],[9,[1,6]],[8,[1,4]],[7,[2,6]],[6,[6,7]],[5,[2,4]],[9,[2,4]],[9,[3,6]],[8,[2,6]],[9,[4,7]],[9,[1,7]],[8,[1,4]],[7,[3,7]],[9,[2,4]],[9,[3,7]],[8,[2,7]],[9,[4,6]],[9,[1,6]],[8,[1,4]],[7,[3,6]],[6,[6,7]],[9,[2,7]],[9,[2,7]],[8,[2,4]],[9,[6,7]],[9,[1,5]],[8,[1,6]],[7,[2,6]],[9,[5,7]],[9,[1,6]],[8,[6,7]],[9,[2,4]],[9,[3,7]],[8,[5,7]],[7,[3,6]],[6,[1,7]],[5,[1,3]],[4,[2,3]],[9,[6,7]],[9,[4,5]],[8,[4,6]],[9,[5,7]],[9,[4,6]],[8,[6,7]],[7,[4,7]],[9,[4,5]],[9,[4,7]],[8,[5,7]],[8,[5,7]],[7,[2,7]],[6,[2,6]],[9,[2,6]],[9,[4,7]],[8,[2,7]],[9,[2,7]],[9,[4,6]],[8,[2,6]],[7,[6,7]],[9,[2,6]],[9,[1,7]],[8,[2,7]],[9,[2,7]],[9,[1,6]],[8,[2,6]],[7,[6,7]],[6,[1,4]],[5,[2,4]],[9,[2,6]],[9,[1,7]],[8,[2,7]],[9,[4,5]],[9,[1,7]],[8,[4,7]],[7,[2,4]],[9,[1,5]],[9,[4,7]],[8,[1,7]],[9,[2,4]],[9,[4,7]],[8,[3,7]],[7,[1,3]],[6,[1,4]],[9,[6,7]],[9,[4,7]],[8,[4,6]],[9,[1,5]],[9,[1,5]],[8,[2,4]],[7,[4,5]],[9,[6,7]],[9,[1,7]],[8,[1,6]],[9,[2,6]],[9,[4,5]],[8,[2,4]],[7,[1,5]],[6,[1,4]],[5,[5,7]],[4,[2,5]],[3,[3,5]],[2,[5,6]],[1,[3,4]],[9,[4,5]],[9,[2,6]],[8,[2,4]],[9,[1,7]],[9,[6,7]],[8,[1,6]],[7,[1,5]],[9,[1,5]],[9,[1,5]],[8,[2,4]],[9,[4,7]],[9,[6,7]],[8,[4,6]],[7,[4,5]],[6,[1,4]],[9,[4,7]],[9,[2,4]],[8,[3,7]],[9,[4,7]],[9,[1,5]],[8,[1,7]],[7,[1,3]],[9,[1,7]],[9,[4,5]],[8,[4,7]],[9,[1,7]],[9,[2,6]],[8,[2,7]],[7,[2,4]],[6,[1,4]],[5,[5,7]],[9,[1,6]],[9,[2,7]],[8,[2,6]],[9,[1,7]],[9,[2,6]],[8,[2,7]],[7,[6,7]],[9,[4,6]],[9,[2,7]],[8,[2,6]],[9,[4,7]],[9,[2,6]],[8,[2,7]],[7,[6,7]],[6,[1,4]],[8,[5,7]],[9,[4,7]],[9,[4,5]],[8,[5,7]],[7,[2,7]],[9,[4,6]],[9,[5,7]],[8,[6,7]],[9,[4,5]],[9,[6,7]],[8,[4,6]],[7,[4,7]],[6,[2,6]],[5,[2,4]],[4,[2,5]],[9,[3,7]],[9,[2,4]],[8,[5,7]],[9,[1,6]],[9,[5,7]],[8,[6,7]],[7,[3,6]],[9,[1,5]],[9,[6,7]],[8,[1,6]],[9,[2,7]],[9,[2,7]],[8,[2,4]],[7,[2,6]],[6,[1,7]],[9,[1,6]],[9,[4,6]],[8,[1,4]],[9,[3,7]],[9,[2,4]],[8,[2,7]],[7,[3,6]],[9,[1,7]],[9,[4,7]],[8,[1,4]],[9,[3,6]],[9,[2,4]],[8,[2,6]],[7,[3,7]],[6,[6,7]],[5,[1,3]],[9,[1,6]],[9,[4,6]],[8,[1,4]],[9,[5,7]],[9,[3,7]],[8,[2,7]],[7,[2,6]],[9,[1,7]],[9,[4,7]],[8,[1,4]],[9,[5,7]],[9,[3,6]],[8,[2,6]],[7,[2,7]],[6,[6,7]],[8,[5,7]],[9,[4,7]],[9,[4,5]],[8,[5,7]],[7,[2,7]],[9,[4,6]],[9,[3,7]],[8,[4,7]],[9,[4,7]],[9,[3,6]],[8,[4,6]],[7,[6,7]],[6,[2,6]],[5,[2,4]],[4,[2,3]],[3,[3,5]],[9,[1,4]],[9,[3,6]],[8,[4,6]],[9,[1,3]],[9,[4,6]],[8,[1,4]],[7,[1,6]],[9,[3,6]],[9,[1,5]],[8,[3,5]],[9,[1,6]],[9,[3,5]],[8,[1,5]],[7,[1,3]],[6,[4,5]],[9,[4,6]],[9,[3,7]],[8,[3,6]],[9,[4,7]],[9,[3,6]],[8,[3,7]],[7,[6,7]],[9,[4,7]],[9,[1,6]],[8,[1,4]],[9,[6,7]],[9,[1,4]],[8,[1,6]],[7,[4,6]],[6,[1,3]],[5,[5,7]],[9,[6,7]],[9,[2,4]],[8,[2,7]],[9,[1,3]],[9,[2,4]],[8,[1,4]],[7,[4,7]],[9,[4,5]],[9,[4,7]],[8,[5,7]],[9,[2,4]],[9,[1,6]],[8,[1,3]],[7,[6,7]],[6,[4,6]],[9,[4,5]],[9,[4,7]],[8,[5,7]],[9,[1,6]],[9,[2,4]],[8,[1,3]],[7,[3,7]],[9,[3,7]],[9,[2,7]],[8,[2,4]],[9,[1,6]],[9,[2,4]],[8,[1,5]],[7,[5,7]],[6,[3,5]],[5,[3,6]],[4,[1,7]],[9,[2,7]],[9,[1,4]],[8,[1,3]],[9,[4,5]],[9,[2,7]],[8,[2,5]],[7,[1,5]],[9,[2,5]],[9,[1,3]],[8,[4,5]],[9,[1,3]],[9,[4,7]],[8,[4,5]],[7,[2,7]],[6,[2,4]],[9,[2,4]],[9,[1,7]],[8,[1,5]],[9,[3,7]],[9,[2,4]],[8,[2,3]],[7,[1,3]],[9,[4,5]],[9,[3,7]],[8,[2,3]],[9,[4,7]],[9,[4,5]],[8,[3,7]],[7,[2,4]],[6,[2,7]],[5,[3,5]],[9,[3,7]],[9,[1,5]],[8,[1,7]],[8,[3,5]],[7,[2,4]],[9,[1,4]],[9,[3,5]],[8,[2,4]],[9,[1,7]],[9,[3,5]],[8,[3,7]],[7,[4,7]],[6,[1,3]],[9,[1,3]],[9,[2,5]],[8,[2,3]],[9,[1,5]],[9,[2,3]],[8,[2,5]],[7,[3,5]],[9,[6,7]],[9,[4,7]],[8,[4,6]],[8,[3,5]],[7,[4,5]],[6,[2,4]],[5,[2,7]],[4,[5,7]],[3,[2,6]],[2,[5,6]],[9,[2,7]],[9,[1,5]],[8,[1,3]],[8,[2,7]],[7,[2,6]],[9,[1,3]],[9,[4,7]],[8,[3,7]],[9,[1,4]],[9,[3,7]],[8,[1,3]],[7,[1,7]],[6,[5,7]],[9,[2,6]],[9,[4,7]],[8,[5,7]],[9,[1,6]],[9,[3,6]],[8,[1,3]],[7,[1,5]],[9,[3,7]],[9,[6,7]],[8,[3,6]],[9,[2,6]],[9,[1,5]],[8,[1,4]],[7,[5,7]],[6,[1,7]],[5,[3,5]],[9,[4,7]],[9,[2,6]],[8,[5,7]],[9,[1,6]],[9,[5,7]],[8,[6,7]],[7,[4,6]],[9,[1,5]],[9,[6,7]],[8,[1,6]],[9,[2,7]],[9,[2,7]],[8,[3,5]],[7,[2,6]],[6,[1,7]],[9,[1,6]],[9,[3,6]],[8,[1,3]],[9,[4,7]],[9,[2,6]],[8,[2,7]],[7,[4,6]],[9,[1,7]],[9,[3,7]],[8,[1,3]],[9,[4,6]],[9,[3,5]],[8,[2,6]],[7,[4,7]],[6,[6,7]],[5,[1,4]],[4,[4,5]],[9,[3,6]],[9,[4,7]],[8,[4,6]],[9,[3,7]],[9,[4,6]],[8,[4,7]],[7,[6,7]],[9,[3,7]],[9,[1,6]],[8,[1,3]],[9,[6,7]],[9,[1,3]],[8,[1,6]],[7,[3,6]],[6,[1,4]],[9,[4,6]],[9,[1,5]],[8,[4,5]],[9,[1,6]],[9,[4,5]],[8,[1,5]],[7,[1,4]],[9,[1,6]],[9,[4,7]],[8,[6,7]],[9,[1,4]],[9,[6,7]],[8,[4,7]],[7,[4,6]],[6,[5,7]],[5,[3,5]],[8,[2,6]],[9,[1,4]],[9,[6,7]],[8,[1,6]],[7,[5,7]],[9,[6,7]],[9,[3,5]],[8,[3,6]],[9,[5,7]],[9,[3,6]],[8,[6,7]],[7,[3,7]],[6,[1,3]],[9,[3,7]],[9,[5,7]],[8,[3,5]],[9,[1,6]],[9,[2,6]],[8,[1,4]],[7,[4,7]],[9,[4,7]],[9,[2,6]],[8,[2,7]],[9,[1,6]],[9,[2,5]],[8,[1,5]],[7,[5,7]],[6,[4,5]],[5,[4,6]],[4,[1,7]],[3,[5,6]],[9,[3,7]],[9,[1,5]],[8,[1,3]],[9,[5,7]],[9,[1,3]],[8,[3,7]],[7,[1,7]],[9,[5,7]],[9,[2,3]],[8,[1,3]],[8,[5,7]],[7,[2,6]],[6,[2,7]],[9,[5,7]],[9,[1,6]],[8,[1,5]],[9,[6,7]],[9,[1,5]],[8,[5,7]],[7,[1,7]],[9,[3,7]],[9,[6,7]],[8,[3,6]],[8,[2,6]],[7,[5,7]],[6,[1,3]],[5,[3,5]],[9,[1,6]],[9,[3,6]],[8,[1,3]],[9,[3,5]],[9,[5,7]],[8,[2,7]],[7,[2,3]],[9,[1,7]],[9,[6,7]],[8,[1,6]],[9,[5,7]],[9,[2,3]],[8,[3,5]],[7,[2,7]],[6,[3,7]],[9,[6,7]],[9,[2,7]],[8,[5,7]],[9,[6,7]],[9,[2,3]],[8,[3,6]],[7,[3,5]],[9,[3,5]],[9,[4,7]],[8,[2,7]],[9,[3,5]],[9,[4,6]],[8,[3,6]],[7,[6,7]],[6,[3,7]],[5,[2,6]],[4,[2,5]],[9,[3,6]],[9,[1,7]],[8,[1,6]],[9,[3,7]],[9,[1,6]],[8,[1,7]],[7,[6,7]],[9,[6,7]],[9,[1,5]],[8,[1,6]],[9,[5,7]],[9,[1,6]],[8,[6,7]],[7,[1,7]],[6,[3,5]],[9,[1,6]],[9,[3,5]],[8,[3,6]],[9,[1,7]],[9,[3,5]],[8,[2,7]],[7,[6,7]],[9,[2,3]],[9,[6,7]],[8,[3,6]],[9,[2,7]],[9,[6,7]],[8,[5,7]],[7,[3,5]],[6,[3,7]],[5,[1,3]],[9,[4,5]],[9,[1,7]]
*/



