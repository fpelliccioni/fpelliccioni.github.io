const common = require('../common');
const sort_common = require('./sort_common');

function quicksort(data, f, l, r) {
    var len = l - f;
    if (len <= 1) return;

    var middle = f + common.half(len)
    var pivot = sort_common.median_of_3(data[f], data[middle], data[l - 1], r);
    var p = sort_common.unguarded_partition(data, f, l, pivot, r);
    // console.log(JSON.stringify(data));
    quicksort(data, f, p, r);
    quicksort(data, p, l, r);
}

module.exports = {
    quicksort: quicksort,
}
