const common = require('../common');
const sort_common = require('./sort_common');

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
        var pivot = sort_common.median_of_3(data[f], data[middle], data[l - 1], r);
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
