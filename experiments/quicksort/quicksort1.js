const common = require('../common');

function unguarded_linear_insert(data, l, value) {
    var previous = l;
    while (value < data[--previous]) data[l--] = data[previous];
    data[l] = value;
}

function unguarded_insertion_sort(data, f, l) {
    for (var i = f; i != l; ++i)
        unguarded_linear_insert(data, i, data[i]);
}

function linear_insert(data, f, l, value) {
    if (value < data[f]) {
        while (f != l--) data[l + 1] = data[l];
        data[f] = value;
    }
    else unguarded_linear_insert(data, l, value);
}

function insertion_sort(data, f, l) {
    if (f == l) return;
    for (var i = f + 1; i != l; ++i)
        linear_insert(data, f, i, data[i]);
}

function median_of_3(a, b, c) {
    if (a < b)
        if (b < c) return b;
        else if (a < c) return c;
        else return a;
    else if (a < c) return a;
    else if (b < c) return c;
    else return b;
}

function unguarded_partition(data, f, l, pivot) {
    --l;
    while (data[f] < pivot) ++f;
    while (pivot < data[l]) --l;
    while (f < l) {
        const tmp = data[f];
        data[f] = data[l];
        data[l] = tmp;
        ++f; --l;
        while (data[f] < pivot) ++f;
        while (pivot < data[l]) --l;
    }
    return f;
}

function quicksort_loop(data, f, l, threshold) {
    var len = l - f;
    while (len > threshold) {
        var middle = f + common.half(l - f)
        var pivot = median_of_3(data[f], data[middle], data[l - 1]);
        var cut = unguarded_partition(data, f, l, pivot);
        console.log(JSON.stringify(data));
        if (l - cut < cut - f) {
            quicksort_loop(data, cut, l, threshold);
            l = cut;
        } else {
            quicksort_loop(data, f, cut, threshold);
            f = cut;
        }
        len = l - f;
    }
}

function quicksort(data, f, l) {
    var len = l - f;
    const threshold = 16;
    if (len <= threshold) {
        insertion_sort(data, f, l);
    } else {
        quicksort_loop(data, f, l, threshold);
        var middle = f + threshold;
        insertion_sort(data, f, middle);
        console.log(JSON.stringify(data));
        unguarded_insertion_sort(data, middle, l);
    }
}

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// var data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
var data = common.iota(16 * 2 + 2);
shuffle(data);
console.log(JSON.stringify(data));
quicksort(data, 0, data.length);
console.log(JSON.stringify(data));
