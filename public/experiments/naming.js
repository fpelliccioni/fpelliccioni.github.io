const common = require('./common');
const tao = require('./stable_sort');

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

function knuth_to_function(str) {
    // V([0-9]+)\(([0-9]+)\)_(.+)

    var m = str.match(/V([0-9]+)\(([0-9]+)\)_(.+)/);
    // console.log(m)

    if (m && m.length > 1) {
        var s = Number(m[1]);
        var n = Number(m[2]);
        var preconds = adapt_preconds(JSON.parse(m[3]));
        var params = get_parameters(n);
        return `function select_${s-1}_${n}_${preconds}(${params}) {
    common.check_precondition(...arguments);

    //Code here...
}`;
    } else {
        return undefined;
    }
}

module.exports = {
    knuth_to_function: knuth_to_function,
}


// function main() {
//     var fname = knuth_to_function("V5(7)_[[3,4],[5,6],[4,6],[5,1],[7,2],[2,1]]");
//     console.log(fname);
// }

// main();