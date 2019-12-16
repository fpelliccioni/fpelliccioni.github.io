const common = require('../common');
const sort_common = require('./sort_common');
const measure = require('./measure');
const sort0 = require('./quicksort0');
const sort1 = require('./quicksort1');
const sort2 = require('./quicksort2');


// var data_orig = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
// var data_orig = [30,18,23,9,28,13,16,31,2,34,26,21,12,22,14,19,3,32,11,20,33,1,7,5,27,15,8,10,6,4,29,25,17,24];
// var data_orig = common.iota(16 * 2 + 2);
var data_orig = common.iota(1000000);
sort_common.shuffle(data_orig);
console.log(`n:            ${data_orig.length}`);

// --------------------------------------------------------------------------------------------------------------------------------

measure.g_comparissons = 0;
measure.g_swaps = 0;
var data = common.deep_copy(data_orig);

// console.log(JSON.stringify(data));
sort0.quicksort(data, 0, data.length, sort_common.lt);
// console.log(JSON.stringify(data));
console.log(`Sort 0:`);
console.log(`comparissons: ${measure.g_comparissons}`);
console.log(`swaps:        ${measure.g_swaps}`);

// --------------------------------------------------------------------------------------------------------------------------------

measure.g_comparissons = 0;
measure.g_swaps = 0;
data = common.deep_copy(data_orig);

// console.log(JSON.stringify(data));
sort1.quicksort(data, 0, data.length, sort_common.lt);
// console.log(JSON.stringify(data));
console.log(`Sort 1:`);
console.log(`comparissons: ${measure.g_comparissons}`);
console.log(`swaps:        ${measure.g_swaps}`);


// --------------------------------------------------------------------------------------------------------------------------------

measure.g_comparissons = 0;
measure.g_swaps = 0;
data = common.deep_copy(data_orig);

// console.log(JSON.stringify(data));
sort2.quicksort(data, 0, data.length, sort_common.lt);
// console.log(JSON.stringify(data));
console.log(`Sort 2:`);
console.log(`comparissons: ${measure.g_comparissons}`);
console.log(`swaps:        ${measure.g_swaps}`);

console.log(`5 is better:  ${measure.g_5_is_better}`);
console.log(`3 is better:  ${measure.g_3_is_better}`);

