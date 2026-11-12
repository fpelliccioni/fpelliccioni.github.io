const common = require('../common');

function min_element(data, f, l, r) {
    if (f == l) return l;

    var m = f;
    ++f;

    while (f != l) {
        if (r(data[f], data[m])) {
            m = f;
        }
        ++f;
    }
    return m;
}

function selection_sort(data, f, l, r) {
    // postcondition: is_sorted(f, l, r)
    while (f != l) {
        var m = min_element(data, f, l, r);
        [data[f], data[m]] = [data[m], data[f]];
        ++f;
    }
}

var g_comparissons = 0
function lt(a, b) {
    ++g_comparissons;
    return a < b;
}

function main() {

    var n = 11;
    var max = 0;
    var seq = common.iota(n);
    do {
        var seq_copy = common.deep_copy(seq);
        g_comparissons = 0;
        selection_sort(seq_copy, 0, seq_copy.length, lt);
        if (g_comparissons > max) {
            max = g_comparissons;
        }
        console.log(`max: ${max}`);
    } while (common.next_permutation(seq, 0, seq.length));

    console.log(`max: ${max}`);
}

main();

// 1: n-1
// 2: n-2
// 3: n-3
// ...
// n: n - n


// n^2/2 - n/2
