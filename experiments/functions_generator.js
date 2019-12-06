// const naming = require('./naming');
const completor = require('./median_n_array_complete_generator');
const code_gen = require('./median_n_code_generator');
const common = require('./common');
const tao = require('./stable_sort');

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

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


function adapt_preconds(preconds_par) {

    // tao.stable_sort(preconds_par, function(a, b){return a[1] < b[1];});
    // tao.stable_sort(preconds_par, function(a, b){return a[0] < b[0];});

    var preconds = [];
    for (let i = 0; i < preconds_par.length; i++) {
        const pair = preconds_par[i];
        preconds.push([common.get_variable_name(pair[0]), common.get_variable_name(pair[1])]);
    }

    var preconds_str = JSON.stringify(preconds);
    preconds_str = preconds_str.replaceAll('"', '');
    preconds_str = preconds_str.replaceAll('],[', '_');
    preconds_str = preconds_str.replaceAll('[[', '');
    preconds_str = preconds_str.replaceAll(']]', '');
    preconds_str = preconds_str.replaceAll(',', '');
    return preconds_str;
}

function get_parameters(n) {
    var ret = "";
    for (let i = 0; i < n; i++) {
        ret += common.get_variable_name(i+1) + ",";
    }
    ret = ret.slice(0, -1);
    ret += ",r";
    return ret;
}


function generate_code(tests_str, n, s, preconds) {
    var tests = JSON.parse(tests_str);

    var comps = common.get_max_comps(vtn, n, s) - preconds.length;

    var values = common.perm_with_preconds(common.iota(n), preconds);
    // console.log(values.length);
    values = common.apply_precons(values, preconds);
    // console.log(values.length);
   
    var complete_tests = completor.generate_code(n, values, tests, 0, 0, comps, s);
    // console.log(JSON.stringify(complete_tests));

    var code = code_gen.generate_code(n, values, complete_tests, 0, 0, comps, s);
    // console.log(code);

    return code;
}

function do_it(knuth_name, tests_str) {
    // console.log(`Generating for ${knuth_name} ... ${tests_str}`);

    var m = knuth_name.match(/V([0-9]+)\(([0-9]+)\)_(.+)/);
    if (m && m.length > 1) {
        var s = Number(m[1]) - 1;
        var n = Number(m[2]);
        var preconds = JSON.parse(m[3]);

        var code = generate_code(tests_str, n, s, preconds);
        // console.log(code);

        var preconds_adapted = adapt_preconds(preconds);
        var params = get_parameters(n);

        return `
// ${knuth_name}
function select_${s}_${n}_${preconds_adapted}(${params}) {
    common.check_precondition(...arguments);
    
    //${tests_str}

${code}
}

`;
    } else {
        return undefined;
    }


    // naming.knuth_to_function()
    // completor.generate_code(n, values, tests, 0, 0, comps, s);
    // code_gen.generate_code(n, values, tests, 0, 0, comps, s);

}



var functions = [
    ["V3(6)_[[2,3],[5,6],[1,3],[2,4],[1,5]]", "[[0,[4,5]],[1,[1,4]],[2,[3,4]],[2,[]],[1,[2,5]],[2,[3,5]],[2,[2,6]]]"],
    ["V2(2)_[]", "[[0,[1,2]]]"],
    ["V4(7)_[[1,2],[5,6],[4,7],[1,4],[3,4],[5,2]]", "[[0,[2,4]],[1,[3,6]],[2,[2,6]],[3,[2,3]],[3,[1,6]],[2,[2,3]],[3,[2,6]],[3,[1,3]],[1,[4,6]],[2,[4,5]],[3,[5,7]],[3,[]],[2,[1,3]],[3,[3,6]],[3,[1,6]]]"],
    ["V3(4)_[[1,2]]", "[[0,[3,4]],[1,[2,4]],[2,[2,3]],[2,[1,4]],[1,[2,3]],[2,[2,4]],[2,[1,3]]]"],
    ["V4(6)_[[3,4],[4,1],[2,6],[2,5]]", "[[0,[1,5]],[1,[1,2]],[2,[]],[3,[]],[3,[]],[2,[1,6]],[3,[]],[3,[4,6]],[1,[5,6]],[2,[4,6]],[3,[4,5]],[3,[3,6]],[2,[4,5]],[3,[4,6]],[3,[3,5]]]"],
    ["V3(4)_[[3,4]]", "[[0,[1,2]],[1,[2,4]],[2,[2,3]],[2,[1,4]],[1,[1,4]],[2,[1,3]],[2,[2,4]]]"],
    ["V4(6)_[[2,3],[3,5],[4,6],[4,1],[1,6]]", "[[0,[1,3]],[1,[2,6]],[2,[3,6]],[2,[]],[1,[1,5]],[2,[]],[2,[4,5]]]"],
    ["V3(4)_[[3,4]]", "[[0,[1,2]],[1,[2,4]],[2,[2,3]],[2,[1,4]],[1,[1,4]],[2,[1,3]],[2,[2,4]]]"],
    ["V4(6)_[[2,3],[3,5],[4,6],[4,1],[6,1]]", "[[0,[1,3]],[1,[1,2]],[2,[]],[2,[]],[1,[5,6]],[2,[4,5]],[2,[3,6]]]"],
    ["V4(6)_[[3,4],[4,1],[6,2],[6,5]]", "[[0,[1,2]],[1,[1,5]],[2,[1,6]],[3,[]],[3,[]],[2,[4,5]],[3,[]],[3,[]],[1,[2,5]],[2,[4,5]],[3,[2,4]],[3,[3,5]],[2,[2,4]],[3,[2,3]],[3,[4,5]]]"],
    ["V5(7)_[[1,2],[4,5],[5,2],[1,6],[3,6]]", "[[0,[2,6]],[1,[1,3]],[2,[3,7]],[3,[2,7]],[4,[2,3]],[4,[5,7]],[3,[2,3]],[4,[2,7]],[4,[3,5]],[2,[1,5]],[3,[2,7]],[4,[]],[4,[5,7]],[3,[1,7]],[4,[2,7]],[4,[]],[1,[5,7]],[2,[1,3]],[3,[6,7]],[4,[5,6]],[4,[3,7]],[3,[6,7]],[4,[5,6]],[4,[1,7]],[2,[5,6]],[3,[1,3]],[4,[3,5]],[4,[1,5]],[3,[4,6]],[4,[6,7]],[4,[4,7]]]"],
    ["V4(7)_[[3,4],[5,6],[4,6],[4,1],[5,2]]", "[[0,[1,2]],[1,[1,6]],[2,[5,7]],[3,[1,7]],[4,[1,5]],[4,[4,7]],[3,[1,5]],[4,[1,7]],[4,[4,5]],[2,[4,5]],[3,[5,7]],[4,[6,7]],[4,[]],[3,[4,7]],[4,[6,7]],[4,[]],[1,[2,7]],[2,[2,3]],[3,[3,7]],[4,[4,7]],[4,[]],[3,[2,4]],[4,[4,7]],[4,[2,6]],[2,[4,7]],[3,[5,7]],[4,[6,7]],[4,[]],[3,[2,4]],[4,[2,3]],[4,[4,5]]]"],
    ["V5(7)_[[2,3],[5,6],[3,6],[4,7],[4,1],[5,1]]", "[[0,[1,7]],[1,[1,3]],[2,[2,7]],[3,[3,7]],[3,[]],[2,[1,6]],[3,[]],[3,[4,6]],[1,[3,7]],[2,[6,7]],[3,[4,6]],[3,[5,7]],[2,[1,3]],[3,[1,2]],[3,[3,5]]]"],
    ["V4(7)_[[1,2],[5,6],[4,7],[4,1],[5,1],[3,7]]", "[[0,[1,6]],[1,[1,3]],[2,[2,3]],[3,[2,6]],[3,[3,6]],[2,[1,7]],[3,[]],[3,[5,7]],[1,[3,6]],[2,[6,7]],[3,[4,6]],[3,[5,7]],[2,[1,3]],[3,[]],[3,[3,4]]]"],
    ["V4(7)_[[1,2],[4,5],[5,6],[5,2],[7,3],[1,3]]", "[[0,[1,5]],[1,[5,7]],[2,[2,6]],[3,[2,7]],[3,[6,7]],[2,[3,4]],[3,[]],[3,[3,5]],[1,[6,7]],[2,[1,6]],[3,[2,6]],[3,[1,7]],[2,[1,7]],[3,[2,7]],[3,[1,6]]]"],
    ["V5(7)_[[3,4],[5,6],[4,6],[5,1],[7,2],[2,1]]", "[[0,[1,3]],[1,[]],[2,[]],[3,[]],[3,[]],[2,[]],[3,[]],[3,[]],[1,[2,4]],[2,[1,4]],[3,[]],[3,[4,5]],[2,[2,6]],[3,[2,5]],[3,[6,7]]]"],
]


function main() {

    for (let i = 0; i < functions.length; i++) {
        const e = functions[i];
        var full_code = do_it(e[0], e[1]);
        console.log(full_code);
    }


}

main();