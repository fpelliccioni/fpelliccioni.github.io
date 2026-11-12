const common = require('../common');
const measure = require('./measure');

function lt(a, b) {
    ++measure.g_comparissons;
    return a < b;
}

function median_of_3(a, b, c, r) {
    if (r(a, b))
        if (r(b, c)) return b;
        else if (r(a, c)) return c;
        else return a;
    else if (r(a, c)) return a;
    else if (r(b, c)) return c;
    else return b;
}

function unguarded_partition(data, f, l, pivot, r) {
    --l;
    while (r(data[f], pivot)) ++f;
    while (r(pivot, data[l])) --l;
    while (f < l) {
        const tmp = data[f];
        data[f] = data[l];
        data[l] = tmp;
        ++measure.g_swaps;
        ++f; --l;
        while (r(data[f], pivot)) ++f;
        while (r(pivot, data[l])) --l;
    }
    return f;
}

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}




module.exports = {
    shuffle: shuffle,
    lt: lt,
    median_of_3: median_of_3,
    unguarded_partition: unguarded_partition,
}
