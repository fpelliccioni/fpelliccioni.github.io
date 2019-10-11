const { PerformanceObserver, performance } = require('perf_hooks');

function even0(x) { return (x & 1) == 0; }
function even1(x) { return x % 2 == 0; }

function array_random(n, from, to) {
    if ( ! n) n = 10;
    if ( ! from) from = 0;
    if ( ! to) to = 99;
    var res = []; 
    while (n != 0) {
        var rand = Math.floor(Math.random() * to) + from; 
        res.push(rand); 
        --n;
    } return res; 
}

function count(arr, p) {
    var res = 0;
    for (let i = 0; i < arr.length; ++i) {
        const element = arr[i];
        if (p(element)) {
            ++res;
        }
    }
    return res;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function measure(arr, f, reps) {

}

function main() {
    var arr = array_random(10000000);

    shuffle(arr);
    var t0 = performance.now();
    var c = count(arr, even0);
    var t1 = performance.now();
    
    console.log(`c = ${c}`);
    console.log("count with even0 took " + (t1 - t0) + " milliseconds.");

    shuffle(arr);
    t0 = performance.now();
    c = count(arr, even1);
    t1 = performance.now();
    console.log(`c = ${c}`);
    console.log("count with even1 took " + (t1 - t0) + " milliseconds.");

    shuffle(arr);
    t0 = performance.now();
    c = count(arr, even0);
    t1 = performance.now();
    console.log(`c = ${c}`);
    console.log("count with even0 (again) took " + (t1 - t0) + " milliseconds.");

    shuffle(arr);
    t0 = performance.now();
    c = count(arr, even1);
    t1 = performance.now();
    console.log(`c = ${c}`);
    console.log("count with even1 (again) took " + (t1 - t0) + " milliseconds.");


}



main();