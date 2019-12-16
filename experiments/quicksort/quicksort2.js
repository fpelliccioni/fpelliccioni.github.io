const common = require('../common');
const sort_common = require('./sort_common');
// const median5 = require('../median_5_generated');
const median5 = require('../median_5');
const measure = require('./measure');
const sort1 = require('./quicksort1');

function median_silent(data_par, f, l, r) {

    var tmp_cmp = measure.g_comparissons
    var tmp_swaps = measure.g_swaps
    var data = common.deep_copy_partial_list(data_par, f , l);

    sort1.quicksort(data, 0, data.length, r);
    var middle = common.half(data.length)

    measure.g_comparissons = tmp_cmp
    measure.g_swaps = tmp_swaps

    return data[middle];

}

function unguarded_linear_insert(data, l, value, r) {
    var previous = l;
    while (r(value, data[--previous])) data[l--] = data[previous];
    data[l] = value;
}

function unguarded_insertion_sort(data, f, l, r) {
    for (var i = f; i != l; ++i)
        unguarded_linear_insert(data, i, data[i], r);
}

function linear_insert(data, f, l, value, r) {
    if (r(value, data[f])) {
        while (f != l--) data[l + 1] = data[l];
        data[f] = value;
    }
    else unguarded_linear_insert(data, l, value, r);
}

function insertion_sort(data, f, l, r) {
    if (f == l) return;
    for (var i = f + 1; i != l; ++i)
        linear_insert(data, f, i, data[i], r);
}

function quicksort_loop(data, f, l, threshold, r) {
    var len = l - f;
    while (len > threshold) {
        var middle = f + common.half(l - f)
        var one_quarter = f + common.half(middle - f)
        var three_quarters = middle + common.half(l - middle)
        var pivot_3 = sort_common.median_of_3(data[f], data[middle], data[l - 1], r);
        var pivot_5 = median5.select_2_5(data[f], data[one_quarter], data[middle], data[three_quarters], data[l - 1], r)
        var pivot = median_silent(data, f, l, r);

        if (Math.abs(pivot - pivot_5) < Math.abs(pivot - pivot_3)) {
            // console.log(`median 5 is better`);
            ++measure.g_5_is_better;
        } else {
            // console.log(`median 3 is better`);
            ++measure.g_3_is_better;
        }

        measure.g_comparissons += 3;

        var cut = sort_common.unguarded_partition(data, f, l, pivot, r);
        // console.log(JSON.stringify(data));
        if (l - cut < cut - f) {
            quicksort_loop(data, cut, l, threshold, r);
            l = cut;
        } else {
            quicksort_loop(data, f, cut, threshold, r);
            f = cut;
        }
        len = l - f;
    }
}

function quicksort(data, f, l, r) {
    var len = l - f;
    const threshold = 16;
    if (len <= threshold) {
        insertion_sort(data, f, l, r);
    } else {
        quicksort_loop(data, f, l, threshold, r);
        var middle = f + threshold;
        insertion_sort(data, f, middle, r);
        // console.log(JSON.stringify(data));
        unguarded_insertion_sort(data, middle, l, r);
    }
}


module.exports = {
    quicksort: quicksort,
}
