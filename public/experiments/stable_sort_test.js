// import { stable_sort } from 'stable_sort.mjs';
const tao = require('./stable_sort');

function main() {
    
    var stable_data = [
        [[1, 2, 3], 1],
        [[1, 3, 2], 2],
        [[3, 1, 2], 2],
        [[3, 2, 1], 1],
        [[2, 3, 1], 0],
        [[2, 1, 3], 0],

        [[1, 2, 2], 1],
        [[2, 1, 2], 0],
        [[2, 2, 1], 0],
        [[1, 1, 2], 1],
        [[2, 1, 1], 2],
        [[1, 2, 1], 2],

        [[1, 1, 1], 1],
    ];



    function lt(x, y) {return x < y;};

    var s = [4, 3, 1, 5, 2];

    console.log(s);
    // insertion_sort(begin(s), end(s), lt);
    tao.stable_sort(s, lt);
    console.log(s);
}

main();

