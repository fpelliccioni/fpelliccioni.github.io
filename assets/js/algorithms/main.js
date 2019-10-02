/*
Copyright Fernando Pelliccioni 2019

Distributed under the Boost Software License, Version 1.0. (See accompanying
file LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt) 

TODO list:
    - standard library reference and links with examples
    - Distances between:
        comparissons, swaps, assigments, moves...
*/



var log_stats_enabled = true;
var g_disable_function_printing = false;

var snippets_cat = {
    find_if: null
    , find: null
    , find_backward_if: null
    , iota: null

    , gcd: null
    , equal: null 
    , swap_ranges: null
    , swap_ranges_bounded: null
    , swap_ranges_n: null

    , reverse_n_indexed: 'rearrangements-position-based-reverse'
    , reverse_bidirectional: 'rearrangements-position-based-reverse'
    , reverse_n_forward: 'rearrangements-position-based-reverse'
    , reverse_copy: 'rearrangements-position-based-reverse'
    , reverse_n_with_buffer: 'rearrangements-position-based-reverse'
    , reverse_n_adaptive: 'rearrangements-position-based-reverse'
    , rotate_bidirectional: 'rearrangements-position-based-rotate'
    , rotate_random_access: 'rearrangements-position-based-rotate'

    , partition_semistable_1: 'rearrangements-predicate-based-partition'
    , partition_semistable: 'rearrangements-predicate-based-partition'
    , partition_semistable_nonempty: 'rearrangements-predicate-based-partition'
    , partition_copy: 'rearrangements-predicate-based-partition'
    , partition_stable_with_buffer_0: 'rearrangements-predicate-based-partition'
    , partition_stable_forward: 'rearrangements-predicate-based-partition'
    , partition_point_n: 'rearrangements-predicate-based-partition'


    , insertion_sort_classic_0: 'rearrangements-ordering-based-sort-insertion-sort'
    , insertion_sort_classic_1: 'rearrangements-ordering-based-sort-insertion-sort'
    , insertion_sort_classic_2: 'rearrangements-ordering-based-sort-insertion-sort'
    , insertion_sort_classic_3: 'rearrangements-ordering-based-sort-insertion-sort'
    , insertion_sort_classic:   'rearrangements-ordering-based-sort-insertion-sort'
    , insertion_sort:           'rearrangements-ordering-based-sort-insertion-sort'
    , insertion_sort_backward:  'rearrangements-ordering-based-sort-insertion-sort'

    , selection_sort_classic:   'rearrangements-ordering-based-sort-selection-sort'
    , selection_sort_stable:   'rearrangements-ordering-based-sort-selection-sort'


    , max_element: 'selection'
    , min_element: 'selection'
    , select_1_3: 'selection'

    , insert_naive: null
    , insert: null

    , palindrome_naive: null
    , palindrome_forward_recursive: null
    , palindrome_bidirectional: null
};
    

var categories = [
    {id: 'rearrangements', name: 'Rearrangements', categories: [
        {id: 'rearrangements-position-based', name: 'Position-based', categories: [
              {id: 'rearrangements-position-based-reverse', name: 'Reverse', categories: []}
            , {id: 'rearrangements-position-based-rotate', name: 'Rotate', categories: []}      
        ]}
       ,{id: 'rearrangements-predicate-based', name: 'Predicate-based', categories: [
            {id: 'rearrangements-predicate-based-partition', name: 'Partition', categories: []}
        ]}
       ,{id: 'rearrangements-ordering-based', name: 'Ordering-based', categories: [
            {id: 'rearrangements-ordering-based-sort', name: 'Sorting', categories: [
                {id: 'rearrangements-ordering-based-sort-insertion-sort', name: 'Insertion Sort', categories: []},
                {id: 'rearrangements-ordering-based-sort-selection-sort', name: 'Selection Sort', categories: []}
            ]}
        ]}
    ]}
  , {id: 'selection', name: 'Selection', categories: []}
];


var snippets = {

find_if:
`function find_if(f, l, p) {
    while ( ! equal(f, l) && ! p(source(f))) {
        f = successor(f)
    }
    return f;
}

var even = predicate(function even(x) { return x & 1 == 0; });
var d = sequence(array_random(), "d");
var f = begin(d);
var l = end(d);

var it = find_if(f, l, even);
if ( ! equal(it, l)) {
    print(source(it));
}`

,find:
`function find(f, l, x) {
    while ( ! equal(f, l) && ! source(f) != x) {
        f = successor(f)
    }
    return f;
}

print(array_from("Hello, World!"))
var s = sequence(array_from("Hello, World!"), "s");

var it = find(begin(s), end(s), 'x');
if ( ! equal(it, end(s))) {
    print(source(it));
}`


, find_backward_if: 
`function find_backward_if(f, l, p) {
    while (true) {
        if (equal(l, f)) return f;
        l = predecessor(l);
        if (p(source(l))) return successor(l);
    }    
}

var even = predicate(function even(x) { return x & 1 == 0; });
var d = sequence(array_random(), "d");
var f = begin(d);
var l = end(d);

var it = find_backward_if(f, l, even);
if ( ! equal(it, f)) {
    print(source(predecessor(it)));
}
`

,max_element: 
`function max_element(f, l, r) {
    if (equal(f, l)) return l;

    var m = f;
    f = successor(f);

    while ( ! equal(f, l)) {
        if ( ! r(source(f), source(m))) {
            m = f;
        }
        f = successor(f);
    }
    return m;
}

var d = sequence(array_random(), "d", lt);

var f = begin(d);
var l = end(d);

f = max_element(f, l, lt);
if ( ! equal(f, l)) {
    print("The max element is: " + source(f));
}`

,min_element: 
`function min_element(f, l, r) {
    if (equal(f, l)) return l;

    var m = f;
    f = successor(f);

    while ( ! equal(f, l)) {
        if (r(source(f), source(m))) {
            m = f;
        }
        f = successor(f);
    }
    return m;
}

var d = sequence(array_random(), "d");

var f = begin(d);
var l = end(d);

f = min_element(f, l, lt);
if ( ! equal(f, l)) {
    print("The min element is: " + source(f));
}`


,min_value: 
`function min_value(f, l, r) {
    //precondition: ! equal(f, l)) return l;

    var m = f;
    f = successor(f);

    while ( ! equal(f, l)) {
        if (r(source(f), source(m))) {
            m = f;
        }
        f = successor(f);
    }
    return m;
}

var d = sequence(array_random(), "d");

var f = begin(d);
var l = end(d);

f = min_element(f, l, lt);
if ( ! equal(f, l)) {
    print("The min element is: " + source(f));
}`


, iota: 
`function iota(f, l, start, step) {
    if ( ! start) start = 0;
    if ( ! step) step = 1;

    while ( ! equal(f, l)) {
        sink(f, start);
        start += step;
        f = successor(f);
    }
    return start;
}

var d1 = sequence(new Array(8), "d1");
var d2 = sequence(new Array(5), "d2");

var f = successor(begin(d1));
var l = predecessor(end(d1));

var r = iota(f, l);
print(r);

f = begin(d2);
l = end(d2);


r = iota(f, l, r);
print(r);`

,partition_semistable_1:
`//Nico Lomutos's partition algorithm: https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
//Code taken from: https://github.com/tao-cpp/algorithm/blob/master/include/tao/algorithm/partition/partition.hpp#L40
function find_if(f, l, p) {
    while ( ! equal(f, l) && ! p(source(f))) {
        f = successor(f)
    }
    return f;
}

function partition_semistable_1(f, l, p) {
    f = find_if(f, l, p);
    if (f == l) return f;

    var j = f;
    j = successor(j)

    while ( ! equal(j, l)) {
        if ( ! p(source(j))) {
            iter_swap(f, j);
            f = successor(f);
        }
        j = successor(j);
    }
    return f;
}

var even = predicate(function even(x) { return x & 1 == 0; });
var d = sequence(array_random(), "d", even);
var f = begin(d);
var l = end(d);

var it = partition_semistable_1(f, l, even);
if ( ! equal(it, l)) {
    print('partition point: ' + source(it));
}`

,partition_semistable:
`//Nico Lomutos's partition algorithm: https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
//Code taken from: https://github.com/tao-cpp/algorithm/blob/master/include/tao/algorithm/partition/partition.hpp#L58

var r = range_bounded("f", "l");
var r2 = range_bounded("j", "l");
var r3 = range_bounded("p", "l");

function partition_semistable(f, l, p) {
    while (true) {
        if (equal(f, l)) return f;
        if (p(source(f))) break;
        f = successor(f);
    }

    var j = f;
    j = successor(j)

    while ( ! equal(j, l)) {
        if ( ! p(source(j))) {
            iter_swap(f, j);
            f = successor(f);
        }
        j = successor(j);
    }
    return f;
}

var even = predicate(function even(x) { return x & 1 == 0; });
var d = sequence(array_random(), "d", even);
var f = begin(d);
var l = end(d);

var p = partition_semistable(f, l, even);
if ( ! equal(p, l)) {
    print('partition point: ' + source(p));
}`

,partition_semistable_nonempty:
`//Nico Lomutos's partition algorithm: https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
//Code taken from: https://github.com/tao-cpp/algorithm/blob/master/include/tao/algorithm/partition/partition.hpp#L91

var r = range_bounded("f", "l");
var r2 = range_bounded("j", "l");

function partition_semistable_nonempty(f, l, p) {
    //precondition: nonempty: ! equal(f, l)
    while ( ! p(source(f))) {
        f = successor(f);
        if (equal(f, l)) return;
    }    

    var j = f;
    j = successor(j)
    if (equal(j, l)) return;

    while ( ! equal(successor(j), l)) {
        if ( ! p(source(j))) {
            iter_swap(f, j);
            f = successor(f);
        }
        j = successor(j);
    }
    iter_swap(f, j);
}

var even = predicate(function even(x) { return x & 1 == 0; });
var d = sequence(array_random(), "d", even);
var f = begin(d);
var l = end(d);

partition_semistable_nonempty(f, l, even);`


,partition_copy:
`function partition_copy(f, l, r_b, r_g, p) {
    while ( ! equal(f, l)) {
        if (p(source(f))) {
            sink(r_g, source(f));
            r_g = successor(r_g);
        } else {
            sink(r_b, source(f));
            r_b = successor(r_b);
        }
        f = successor(f);
    }
    return [r_b, r_g];
}


var even = predicate(function even(x) { return x & 1 == 0; });
var d = sequence(array_random(), "d", even);
var bad = sequence(new Array(size(d)), "bad");
var good = sequence(new Array(size(d)), "good");

var res = partition_copy(begin(d), end(d), begin(bad), begin(good), even);

var fg = res[0];
var fb = res[1];

print('...');`



,partition_stable_with_buffer_0:
`function partition_copy(f, l, r_b, r_g, p) {
    while ( ! equal(f, l)) {
        if (p(source(f))) {
            sink(r_g, source(f));
            r_g = successor(r_g);
        } else {
            sink(r_b, source(f));
            r_b = successor(r_b);
        }
        f = successor(f);
    }
    return [r_b, r_g];
}

function copy(f, l, o) {
    while ( ! equal(f, l)) {
        sink(o, source(f));
        o = successor(o);
        f = successor(f);
    }
}

function partition_stable_with_buffer_0(f, l, p, b) {
    var tmp = partition_copy(f, l, f, b, p);
    var tf = tmp[0];
    var ts = tmp[1];
    copy(b, ts, tf);
    return tf;
}

var even = predicate(function even(x) { return x & 1 == 0; });
var d = sequence(array_random(), "d", even);
var buf = sequence(new Array(size(d)), "buf");

var p = partition_stable_with_buffer_0(begin(d), end(d), even, begin(buf));
if ( ! equal(p, l)) {
    print('partition point: ' + source(p));
}`


,partition_stable_forward:
`//Variation of Nico Lomutos's partition algorithm: https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
//Code taken from: https://github.com/tao-cpp/algorithm/blob/master/include/tao/algorithm/partition/partition.hpp#L58

var r = range_bounded("f", "l");
var r2 = range_bounded("j", "l");
var r3 = range_bounded("p", "l");

function partition_stable_forward(f, l, p) {
    while (true) {
        if (equal(f, l)) return f;
        if (p(source(f))) break;
        f = successor(f);
    }

    var j = f;
    j = successor(j)

    while ( ! equal(j, l)) {
        if ( ! p(source(j))) {
            rotate(f, j, successor(j));     //TODO: refine rotate(...)
            f = successor(f);
        }
        j = successor(j);
    }
    return f;
}

var even = predicate(function even(x) { return x & 1 == 0; });
var d = sequence(array_random(), "d", even);
var f = begin(d);
var l = end(d);

var p = partition_stable_forward(f, l, even);
if ( ! equal(p, l)) {
    print('partition point: ' + source(p));
}`



,partition_point_n:
`skip_debug('half_nonnegative');
var r = range_counted("f", "n");

function half_nonnegative(n) {
    return n >> 1;
}

function partition_point_n(f, n, p) {
    while (n != 0) {
        var h = half_nonnegative(n);
        var m = successor(f, h);

        if (p(source(m))) {
            n = h;
        } else {
            n -= h + 1;
            f = successor(m);
        }
    }
    return f;
}

var even = predicate(function even(x) { return x & 1 == 0; });

var d = sequence([1, 5, 1, 1, 3, 3, 3, 7, 3, 2, 6, 4], "d", even);

var p = partition_point_n(begin(d), size(d), even);
print('partition point: ' + source(p));`







,select_1_3:
`// Median of 3

function select_1_2(a, b, r) {
    return r(b, a) ? a : b;
}

function select_1_3_ab(a, b, c, r) {
    // precondition: a <= b
    
    return ! r(c, b) ? 
                b :                  // a, b, c are sorted
                select_1_2(a, c, r); // b is not the median
}

function select_1_3(a, b, c, r) {
    return r(b, a) ? 
              select_1_3_ab(b, a, c, r) 
            : select_1_3_ab(a, b, c, r);
}

var tmp = array_random(3);
var a = tmp[0];
var b = tmp[1];
var c = tmp[2];

var m = select_1_3(a, b, c, lt);
print(m);`


,gcd:
`skip_debug('remainder');
function remainder(a, b) {
    return a % b;
}

function gcd(a, b) {
    while (b != 0) {
        var r = remainder(a, b);
        a = b;
        b = r;
    }
    return a;
}

var a = random_int();
var b = random_int();

var g = gcd(a, b);
print(g);`


, equal: 
`function equal_r(f, l, f2, r) {
    while ( ! equal(f, l)) {
        if ( ! r(source(f), source(f2))) {
            return false;
        }

        f = successor(f);
        f2 = successor(f2);
    }
    return true;
}

var d1_raw = ['e', 'v', 'i', 't', 'a', 't', 'i', 'v', 'e'];
var d2_raw = ['e', 'v', 'i', 't', 'x', 't', 'i', 'v', 'e'];

var d1 = sequence(d1_raw, "d1");
var d2 = sequence(d2_raw, "d2");

var f = begin(d1);
var l = end(d1);
var f2 = begin(d2);

var res = equal_r(f, l, f2, eq);
print(res);`


, palindrome_naive:
`function equal_r(f, l, f2, r) {
    while ( ! equal(f, l)) {
        if ( ! r(source(f), source(f2))) {
            return false;
        }

        f = successor(f);
        f2 = successor(f2);
    }
    return true;
}

function palindrome_naive(seq_arr, r) {
    var seq = sequence(seq_arr, "seq");
    var seq_arr_rev = seq_arr.slice().reverse();
    var seq_rev = sequence(seq_arr_rev, "seq_rev");

    var f = begin(seq);
    var l = end(seq);
    var f2 = begin(seq_rev);

    var res = equal_r(f, l, f2, r);

    return res;
}

//var word_arr = ['e', 'v', 'i', 't', 'a', 't', 'i', 'v', 'e'];
var word_arr = ['e', 'v', 'i', 'x', 'a', 't', 'i', 'v', 'e'];

var res = palindrome_naive(word_arr, eq);
if (res) {
    print('the word is palindrome');
} else {
    print('the word not is palindrome');
};`



, palindrome_forward_recursive:
`var r = range_counted("f", "n");
function palindrome_forward_recursive(f, n, r) {
    if (n == 0) return [true, f];
    if (n == 1) return [true, successor(f)];

    var ret = palindrome_forward_recursive(successor(f), n - 2, r);
    var ret_first = ret[0];
    var f2 = ret[1];

    if ( ! ret_first) return ret;
    if ( ! r(source(f), source(f2))) return [false, f2];

    return [true, successor(f2)];
}

function palindrome_forward(f, n, r) {
    return palindrome_forward_recursive(f, n, r)[0];
}

var word = sequence(['e', 'v', 'i', 't', 'a', 't', 'i', 'v', 'e'], "word");
// var word = sequence(['e', 'v', 'i', 'x', 'a', 't', 'i', 'v', 'e'], "word");

var f = begin(word);
var n = size(word);

var res = palindrome_forward(f, n, eq);


if (res[0]) {
    print('the word is palindrome');
} else {
    print('the word not is palindrome');
};`




, palindrome_bidirectional:
`function palindrome_bidirectional(f, l, r) {
    while (true) {
        if (equal(f, l)) break;
        l = predecessor(l);

        if ( ! r(source(f), source(l))) return false;

        f = successor(f);
        if (equal(f, l)) break;
    }
    return true;
}

//var word = sequence(['e', 'v', 'i', 't', 'a', 't', 'i', 'v', 'e'], "word");
//var word = sequence(['e', 'v', 'i', 'x', 'a', 't', 'i', 'v', 'e'], "word");
var word = sequence(['e', 'v', 'i', 't', 't', 'i', 'v', 'e'], "word");

var f = begin(word);
var l = end(word);

var res = palindrome_bidirectional(f, l, eq);

if (res) {
    print('the word is palindrome');
} else {
    print('the word not is palindrome');
};`



,swap_ranges:
`function swap_ranges(f0, l0, f1) {
    while ( ! equal(f0, l0)) {
        iter_swap(f0, f1);
        f0 = successor(f0);
        f1 = successor(f1);
    }
    return f1; 
}

var s1 = sequence(array_random(), "s1");
var s2 = sequence(array_random(), "s2");

var r = swap_ranges(begin(s1), end(s1), begin(s2));
print('...');`


,swap_ranges_bounded:
`function swap_ranges_bounded(f0, l0, f1, l1) {
    while ( ! equal(f0, l0) && ! equal(f1, l1)) {
        iter_swap(f0, f1);
        f0 = successor(f0);
        f1 = successor(f1);
    } 
    return [f0, f1];
}

var s1 = sequence(array_random(), "s1");
var s2 = sequence(array_random(5), "s2");

var r = swap_ranges_bounded(begin(s1), end(s1), begin(s2), end(s2));
var f0 = r[0];
var f1 = r[1];
print('...');`



,swap_ranges_n:
`var r0 = range_counted("f0", "n");
var r1 = range_counted("f1", "n");
function swap_ranges_n(f0, f1, n) {
    while (n != 0) {
        iter_swap(f0, f1);
        f0 = successor(f0);
        f1 = successor(f1);
        --n;
    }
    return [f0, f1];
}

var s1 = sequence(array_random(), "s1");
var s2 = sequence(array_random(5), "s2");

var r = swap_ranges_n(begin(s1), begin(s2), 5);
var f0 = r[0];
var f1 = r[1];
print('...');`


,reverse_n_indexed:
`var r = range_counted("f", "n");

function reverse_n_indexed(f, n) {
    var i = 0;
    --n;
    while (i < n) {
        iter_swap(successor(f, i), successor(f, n)); 
        ++i;
        --n;
    } 
}

var s = sequence(array_random(), "s1");
print(s);
reverse_n_indexed(begin(s), size(s));
print(s);
print('...');`



,reverse_bidirectional:
`var r = range_bounded("f", "l");

function reverse_bidirectional(f, l) {

    while (true) {
        if (equal(f, l)) return;
        l = predecessor(l);
        if (equal(f, l)) return;
        iter_swap(f, l);
        f = successor(f);        
    }
}

var s = sequence(array_random(), "s1");
print(s);
reverse_bidirectional(begin(s), end(s));
print(s);
print('...');`

,reverse_n_forward:
`skip_debug('half_nonnegative');
skip_debug('twice');
skip_debug('swap_ranges_n');
var r = range_counted("f", "n");

function half_nonnegative(n) {return n >> 1;}
function twice(n) {return n + n;}

function swap_ranges_n(f0, f1, n) {
    while (n != 0) {
        iter_swap(f0, f1);
        f0 = successor(f0);
        f1 = successor(f1);
        --n;
    }
    return [f0, f1];
}

function reverse_n_forward(f, n) {
    if (n < 2) return successor(f, n);
    var h = half_nonnegative(n);
    var n_mod_2 = n - twice(h);

    var m = successor(reverse_n_forward(f, h), n_mod_2);
    var l = reverse_n_forward(m, h);

    swap_ranges_n(f, m, h);
    return l;
}

var s = sequence(array_random(), "s1");
print(s);
var r = reverse_n_forward(begin(s), size(s));
print(s);
print('...');`


,reverse_copy:
`//var r = range_counted("f", "n");
function reverse_copy(f_i, l_i, f_o) {
    while ( ! equal(f_i, l_i)) {
        l_i = predecessor(l_i);
        sink(f_o, source(l_i));
        f_o = successor(f_o);

    } 
    return f_o;
}

var d = sequence(array_random(), "d");
var b = sequence(new Array(size(d)), "b");

var res = reverse_copy(begin(d), end(d), begin(b));
print(d);
print(b);`


,reverse_n_with_buffer:
`//var r = range_counted("f", "n");

function copy_n(f_i, n, f_o) {
    while (n != 0) {
        sink(f_o, source(f_i));
        f_i = successor(f_i);
        f_o = successor(f_o);
        --n;
    }
    return [f_i, f_o];
}

function reverse_copy(f_i, l_i, f_o) {
    while ( ! equal(f_i, l_i)) {
        l_i = predecessor(l_i);
        sink(f_o, source(l_i));
        f_o = successor(f_o);

    } 
    return f_o;
}

function reverse_n_with_buffer(f_i, n, f_b) {
    return reverse_copy(f_b, copy_n(f_i, n, f_b)[1], f_i);
}

var s = sequence(array_random(), "s");
var b = sequence(new Array(size(s)), "b");
print(s);
var r = reverse_n_with_buffer(begin(s), size(s), begin(b));
print(s);`

,reverse_n_adaptive:
`skip_debug('half_nonnegative');
skip_debug('twice');
skip_debug('swap_ranges_n');
skip_debug('copy_n');
skip_debug('reverse_copy');
skip_debug('reverse_n_with_buffer');
var r = range_counted("f_i", "n_i");

function half_nonnegative(n) {return n >> 1;}
function twice(n) {return n + n;}

function swap_ranges_n(f0, f1, n) {
    while (n != 0) {
        iter_swap(f0, f1);
        f0 = successor(f0);
        f1 = successor(f1);
        --n;
    }
    return [f0, f1];
}

function copy_n(f_i, n, f_o) {
    while (n != 0) {
        sink(f_o, source(f_i));
        f_i = successor(f_i);
        f_o = successor(f_o);
        --n;
    }
    return [f_i, f_o];
}

function reverse_copy(f_i, l_i, f_o) {
    while ( ! equal(f_i, l_i)) {
        l_i = predecessor(l_i);
        sink(f_o, source(l_i));
        f_o = successor(f_o);

    } 
    return f_o;
}

function reverse_n_with_buffer(f_i, n, f_b) {
    return reverse_copy(f_b, copy_n(f_i, n, f_b)[1], f_i);
}

function reverse_n_adaptive(f_i, n_i, f_b, n_b) {
    if (n_i < 2) return successor(f_i, n_i);
    if (n_i <= n_b) return reverse_n_with_buffer(f_i, n_i, f_b);

    var h_i = half_nonnegative(n_i);
    var n_mod_2 = n_i - twice(h_i);
    var m_i = successor(reverse_n_adaptive(f_i, h_i, f_b, n_b), n_mod_2);
    var l_i = reverse_n_adaptive(m_i, h_i, f_b, n_b);

    swap_ranges_n(f_i, m_i, h_i);
    return l_i;

}

var s = sequence(array_random(16), "s");
//var b = sequence(new Array(size(s)), "b");
var b = sequence(new Array(4), "b");
print(s);
var r = reverse_n_adaptive(begin(s), size(s), begin(b), size(b));
print(s);`



,rotate_bidirectional:
`var r0 = range_bounded("f", "m");
var r1 = range_bounded("m", "l");

function reverse(f, l) {
    while (true) {
        if (equal(f, l)) return;
        l = predecessor(l);
        if (equal(f, l)) return;
        iter_swap(f, l);
        f = successor(f);        
    }
}

function rotate_bidirectional(f, m, l) {
    reverse(f, m);
    reverse(m, l);
    reverse(f, l);
}
var s = sequence(array_random(), "s");
print(s);
rotate_bidirectional(begin(s), successor(begin(s), 3), end(s));
print(s);
print('...');`



,rotate_random_access:
`skip_debug("k_rotate_from_permutation_random_access");
skip_debug("remainder");
skip_debug("gcd");

function remainder(a, b) {
    return a % b;
}

function gcd(a, b) {
    while (b != 0) {
        var r = remainder(a, b);
        a = b;
        b = r;
    }
    return a;
}

function cycle_from(i, f) {
    var tmp = source(i);
    var j = i;
    var k = f(i);
    while ( ! equal(k, i)) {
        sink(j, source(k));
        j = k;
        k = f(k);
    }
    sink(j, tmp);
}

function rotate_cycles(f, m, l, from) {
    var d = gcd(distance(f, m), distance(m, l));

    while (d != 0) {
        --d;
        cycle_from(successor(f, d), from);
    }
    return successor(f, distance(m, l));
}

function k_rotate_from_permutation_random_access(f, m, l) {
    var k = distance(m, l);
    var n_minus_k = distance(f, m);
    var m_prime = successor(f, distance(m, l));

    return function(x) {
        if ( distance(x, m_prime) > 0) return successor(x, n_minus_k);
        return predecessor(x, k);
    };
}

function rotate_random_access_nontrivial(f, m, l) {
    var p = k_rotate_from_permutation_random_access(f, m, l);
    return rotate_cycles(f, m, l, p);
}

var s = sequence(array_random(12), "s");
print(s);
rotate_random_access_nontrivial(begin(s), successor(begin(s), 3), end(s));
print(s);
print('...');`





,insert_naive:
`function copy_backward(f_i, l_i, l_o) {
    while ( ! equal(f_i, l_i)) {
        // copy_backward_step(l_i, l_o);
        l_i = predecessor(l_i);
        l_o = predecessor(l_o);
        sink(l_o, source(l_i));
    } 
    return l_o;
}
function shift_right_by_one(f, l) {
    if (equal(f, l)) return;
    copy_backward(f, predecessor(l), l);
}

function insert_naive(s, ip, f, l) {
    var d = distance(begin(s), ip);
    
    while ( ! equal(f, l)) {
        // s = increase_capacity(s, 1)
        s = push_back(s, 0);
        ip = successor(begin(s), d)
        shift_right_by_one(ip, end(s));
        sink(ip, source(f));
        f = successor(f);
        ++d;
    }

    return s;
}

var s = sequence(array_random(), "s");
var i = sequence(array_random(5), "i");

print(s);
print(i);
s = insert_naive(s, begin(s), begin(i), end(i));
print(s);
print('...');`



,insert:
`function reverse(f, l) {
    while (true) {
        if (equal(f, l)) return;
        l = predecessor(l);
        if (equal(f, l)) return;
        iter_swap(f, l);
        f = successor(f);        
    }
}

function rotate(f, m, l) {
    reverse(f, m);
    reverse(m, l);
    reverse(f, l);
}

function insert(s, ip, f, l) {
    var d = distance(begin(s), ip);
    var ld = distance(ip, end(s));
    
    while ( ! equal(f, l)) {
        s = push_back(s, source(f));
        f = successor(f);
        ++d;
    }

    rotate(begin(s), successor(begin(s), ld), end(s));

    return s;
}

var s = sequence(array_random(), "s");
var i = sequence(array_random(5), "i");

print(s);
print(i);
s = insert(s, begin(s), begin(i), end(i));
print(s);
print('...');`


,insertion_sort_classic_0:
`var r = range_bounded("f", "l");

function linear_insert(f, c, r) {
  var value = source(c);
  while ( ! equal(f, c) && r(value, source(predecessor(c)))) {
    sink(c, source(predecessor(c)));
    c = predecessor(c);
  }
  sink(c, value); 
  return c;
}

function insertion_sort_classic_0(f, l, r) {
    if (equal(f, l)) return; 
    var c = successor(f);
    while ( ! equal(c, l)) {
        linear_insert(f, c, r);     
        c = successor(c);
    }
}
  
//var s = sequence(array_random(), "s", lt);
var s = sequence([34, 5], "s", lt);
print(s);
insertion_sort_classic_0(begin(s), end(s), lt);
print(s);`


,insertion_sort_classic_1:
`var r = range_bounded("f", "l");

function shift_right_while(f, l, p) {
    while ( ! equal(f, l) && p(source(predecessor(l)))) {
        sink_move(l, source_move(predecessor(l)));
        l = predecessor(l);
    }
    return l;
}

function linear_insert(f, c, r) {
    var value = source_move(c);
    c = shift_right_while(f, c, bind(r, value));
    sink_move(c, value);
    return c;
}

function insertion_sort_classic_1(f, l, r) {
    if (equal(f, l)) return; 
    var c = successor(f);
    while ( ! equal(c, l)) {
        linear_insert(f, c, r);
        c = successor(c);
    }
}
  
var s = sequence(array_random(), "s", lt);
print(s);
insertion_sort_classic_1(begin(s), end(s), lt);
print(s);`



,insertion_sort_classic_2:
`var r = range_bounded("f", "l");

function shift_right_while_nonempty(f, l, p) {
    //precondition: ! equal(f, l)
    while (p(source(predecessor(l)))) {
        sink_move(l, source_move(predecessor(l)));
        l = predecessor(l);
        if (equal(f, l)) break;
    }
    return l;
}

function linear_insert(f, c, r) {
    var value = source_move(c);
    c = shift_right_while_nonempty(f, c, bind(r, value));
    sink_move(c, value);
    return c;
}

function insertion_sort_classic_2(f, l, r) {
    if (equal(f, l)) return; 
    var c = successor(f);
    while ( ! equal(c, l)) {
        linear_insert(f, c, r);
        c = successor(c);
    }
}
  
var s = sequence(array_random(), "s", lt);
print(s);
insertion_sort_classic_2(begin(s), end(s), lt);
print(s);`




,insertion_sort_classic_3:
`var r = range_bounded("f", "l");

function linear_insert(f, c, r) {
    if ( ! r(source(c), source(predecessor(c)))) return c;

    var value = source_move(c);
    while (true) {
        sink_move(c, source(predecessor(c)));
        c = predecessor(c);
        
        if (equal(f, c)) break;
        if ( ! r(value, source(predecessor(c)))) break;
    }
    sink_move(c, value);
    return c;
}

function insertion_sort_classic_3(f, l, r) {
    if (equal(f, l)) return; 
    var c = successor(f);
    while ( ! equal(c, l)) {
        linear_insert(f, c, r);
        c = successor(c);
    }
}
  
var s = sequence(array_random(), "s", lt);
print(s);
insertion_sort_classic_3(begin(s), end(s), lt);
print(s);`


,insertion_sort_classic:
`var r = range_bounded("f", "l");

register_custom_stat("Misplaced elements");

function shift_right_while(f, l, p) {
    while ( ! equal(f, l) && p(source(predecessor(l)))) {
        sink_move(l, source_move(predecessor(l)));
        l = predecessor(l);
    }
    return l;
}

function linear_insert(f, c, r) {
    if ( ! call(r, c, predecessor(c))) return c;

    increment_custom_stat("Misplaced elements");

    var value = source_move(c);
    sink_move(c, source(predecessor(c)));
    var d = shift_right_while(f, predecessor(c), bind(r, value));
    sink_move(d, value);

    register_move_distance(distance(d, c));
    return d;
}

function insertion_sort_classic(f, l, r) {
    if (equal(f, l)) return; 
    var c = successor(f);
    while ( ! equal(c, l)) {
        linear_insert(f, c, r);
        c = successor(c);
    }
}
  
// var s = sequence(array_random(), "s", lt);
var s = sequence(array_descending(), "s", lt);

print(s);
insertion_sort_classic(begin(s), end(s), lt);
print(s);`


,insertion_sort:
`var r = range_bounded("f", "l");
register_custom_stat("Misplaced elements");

function linear_insert_unguarded(c, r) {
    if ( ! call(r, c, predecessor(c))) return c;

    increment_custom_stat("Misplaced elements");

    var value = source_move(c);
    var d = shift_right_while_unguarded(c, bind(r, value));
    sink_move(d, value);
    register_move_distance(distance(d, c));
    return d;
}

function insertion_sort_suffix_nonempty(f, l, r) {
    //precondition: ! equal(f, l) 
    var c = successor(f);
    while ( ! equal(c, l)) {
        linear_insert_unguarded(c, r);     
        c = successor(c);
    }
}

function insertion_sort(f, l, r) {
    if (equal(f, l)) return; 
    var c = successor(f);
    if (equal(c, l)) return;

    // create a sentinel
    var min = min_element_nonempty(f, l, r);
    if (! equal(min, f)) {
        rotate_right_by_one_nonempty(f, successor(min));
        increment_custom_stat("Misplaced elements");
        register_move_distance(distance(f, min));
    }
    insertion_sort_suffix_nonempty(c, l, r);
}
  
// var s = sequence([1, 2, 3, 4, 5], "s", lt);
// var s = sequence([1, 2], "s", lt);

// var s = sequence(array_random(), "s", lt);
// var s = sequence(array_all_equal(), "s", lt);
// var s = sequence(array_ascending(), "s", lt);
var s = sequence(array_descending(), "s", lt);

print(s);
insertion_sort(begin(s), end(s), lt);
print(s);`



,insertion_sort_backward:
`var r = range_bounded("f", "l");

function linear_insert_backward(c, l, r) {
  var value = source(c);
  c = successor(c);
  while ( ! equal(c, l) && r(value, source(c))) {
    sink(c, source(c));
    c = successor(c);
  }
  sink(c, value); 
  return c;
}

function insertion_sort_backward(f, l, r) {
    if (equal(f, l)) return;

    r = complement(r);
    var c = predecessor(l);
    while ( ! equal(c, f)) {
        c = predecessor(c);
        linear_insert_backward(c, l, r);     
    }
}
  
// var s = sequence(array_random(), "s", lt);
// var s = sequence([81, 28, 20, 67, 36, 84, 86, 48, 34, 5], "s", lt);
var s = sequence([34, 5], "s", lt);

print(s);
insertion_sort_backward(begin(s), end(s), lt);
print(s);`




,selection_sort_classic:
`//Unstable selection sort

var r = range_bounded("f", "l");

function selection_sort_classic(f, l, r) {
    // postcondition: is_sorted(f, l, r)
    while ( ! equal(f, l)) {
        var m = min_element(f, l, r);
        iter_swap(f, m);
        f = successor(f);
    }
}
  
var s = sequence(array_random(), "s", lt);

print(s);
selection_sort_classic(begin(s), end(s), lt);
print(s);
print(is_sorted(begin(s), end(s), lt));
`


,selection_sort_stable:
`//Stable selection sort

var r = range_bounded("f", "l");

function move_backward(f_i, l_i, l_o) {
    while (! equal(f_i, l_i)) {
        //move_backward_step(l_i, l_o);
        l_i = predecessor(l_i);
        l_o = predecessor(l_o);
        sink_move(l_o, source(l_i));
    } 
    return l_o;
}

function rotate_right_by_one(f, l) {
    if (equal(f, l)) return;
    var butlast = predecessor(l);
    var x = source_move(butlast);
    move_backward(f, butlast, l);
    sink_move(f, x);
}

function selection_sort_stable(f, l, r) {
    while (! equal(f, l)) {
        var m = min_element(f, l, r);
        rotate_right_by_one(f, successor(m));
        f = successor(f);
    }
}
  
var s = sequence(array_random(), "s", lt);
print(s);
selection_sort_stable(begin(s), end(s), lt);
print(s);`
};

function getSnippet(snippet) {
    var res = snippets[snippet];
    if (res) {
        return res;
    }
    return '';
}


function catHasChilds(cat) {
    if (cat.categories == undefined) return false;
    if (cat.categories == null) return false;
    return cat.categories.length > 0;
}

function getSnippets(cat) {
    var sns = []
    for(var key in snippets_cat){
        var value = snippets_cat[key];
        if (cat.id == value) {
            sns.push(key)
        }
    }
    return sns;
}

function getUncataloguedSnippets() {
    var sns = []
    for(var key in snippets_cat){
        var value = snippets_cat[key];

        if (value == null) {
            sns.push(key)
        }
    }
    return sns;
}

function fillCatalogRecursive(str, categories) {

    if (categories == undefined) return;
    if (categories == null) return;

    for(var i in categories) {
        var cat = categories[i];
       
        str += '<li class="linested"><span class="caret">' + cat.name + '</span><ul class="nested">';
        if (catHasChilds(cat)) {
            str = fillCatalogRecursive(str, cat.categories);
        } else {
            snippets = getSnippets(cat);
            for(var si in snippets) {
                var s = snippets[si]
                // str += '<li><a href="http://componentsprogramming.com/algorithms?snippet=' + s + '">[' + s + ']</a></li>';
                str += '<li><a href="/algorithms?snippet=' + s + '">[' + s + ']</a></li>';
            }
        }
        
        str +=  '</ul></li>';
    }

    return str;
}

function fillCatalog() {

    var str = fillCatalogRecursive('', categories);

    str += '<li class="linested"><span class="caret">' + 'Uncatalogued' + '</span><ul class="nested">';

    snippets = getUncataloguedSnippets();
    for(var si in snippets) {
        var s = snippets[si]
        // str += '<li><a href="http://componentsprogramming.com/algorithms?snippet=' + s + '">[' + s + ']</a></li>';
        str += '<li><a href="/algorithms?snippet=' + s + '">[' + s + ']</a></li>';
    }
    str +=  '</ul></li>';

    var list = document.getElementById('list');
    list.innerHTML = str;
}

function Iterator(data, index, name) {
    this.data = data;
    this.index = index;
    this.name = name;
}

function Sequence(name, data, elements, colors, capacity, pred) {
    if (capacity == undefined) {
        capacity = data.length
    }
    this.name = name;
    this.data = data;
    this.elements = elements;
    // this.colors = colors;
    this.capacity = capacity;
    this.pred = pred;
}

function RangeBounded(fname, lname) {
    this.fname = fname;
    this.lname = lname;
}

function RangeCounted(fname, nname) {
    this.fname = fname;
    this.nname = nname;
}


function resetState() {
    
    var hg_right_x_a = document.getElementById('hg-right-x-a');
    hg_right_x_a.innerHTML = '';


    lines = [];

    prevLine = "";
    prevLine2 = "";
    prevNodeType = "";
    prevNode = null;

    iterators_int = {};
    iterators_gui = {};
    predicates = [];
    sequences = {};
    variables = {};

    stats_n = 0;
    stats_it_moves = 0;
    stats_it_cmps = 0;
    stats_pred_appls = 0;
    stats_swaps = 0;
    stats_assigments = 0;
    stats_moves = 0;
    stats_rel_distance = 0;
    stats_move_distance = 0;

    custom_stats = {};

}

function resetStats() {
    var hg_right_x_b = document.getElementById('hg-right-x-b');
    hg_right_x_b.innerHTML = '';
}

function updateState() {
    var hg_right_x_a = document.getElementById('hg-right-x-a');
    hg_right_x_a.innerHTML = '';

    for (var key in iterators_int) {
        // console.log(iterators_int[key]);
        var it = iterators_int[key];
        var data = it.data.data;
        // console.log(data)
        // var length = data.properties['length'];
        // var text = '<p id="Status">source(<b>' + key + '</b>) = ' + data.properties[it.index] + '</p>';
 
        var length = data.length;
        var text = '<p id="Status">source(<b>' + key + '</b>) = ' + data[it.index] + '</p>';

        hg_right_x_a.innerHTML += text;
    }
}

function updateStats() {
    var hg_right_x_b = document.getElementById('hg-right-x-b');
    hg_right_x_b.innerHTML = '';

    hg_right_x_b.innerHTML += '<p id="Status"><b>n</b>:                      ' + stats_n + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Iterator displacements</b>: ' + stats_it_moves + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Iterator comparisons</b>:   ' + stats_it_cmps + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Pred/Rel applications</b>:  ' + stats_pred_appls + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Swaps</b>:                  ' + stats_swaps + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Assignments</b>:            ' + stats_assigments + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Moves</b>:                  ' + stats_moves + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Distance Rel</b>:           ' + stats_rel_distance + '</p>';
    hg_right_x_b.innerHTML += '<p id="Status"><b>Distance Moves</b>:           ' + stats_move_distance + '</p>';
        

    for (var key in custom_stats) {
        // console.log(custom_stats[key]);
        hg_right_x_b.innerHTML += `<p id="Status"><b>${key}</b>: ${custom_stats[key]}</p>`;
    }    
}

function subscript_digit(digit) {
    if (digit == '1') return '\u2081';
    if (digit == '2') return '\u2082';
    if (digit == '3') return '\u2083';
    if (digit == '4') return '\u2084';
    if (digit == '5') return '\u2085';
    if (digit == '6') return '\u2086';
    if (digit == '7') return '\u2087';
    if (digit == '8') return '\u2088';
    if (digit == '9') return '\u2089';

    return '\u2080';
}
function subscript(number) {
    // console.log(number)
    var nText = number.toString();
    var res = '';
    // for (var c in nText) {
    //     console.log(c)
    //     console.log(subscript_digit(c))
    //     res += subscript_digit(c);
    // }

    for (var i = 0; i < nText.length; i++) {
        var c = nText.charAt(i);
        // console.log(c)
        // console.log(subscript_digit(c))
        res += subscript_digit(c);
    }
      
    return res;
}

function clearLog() {
    // var hg_right_b_b = document.getElementById('hg-right-b-b');
    // hg_right_b_b.innerHTML = '';
    var hg_right_b_b_data = document.getElementById('hg-right-b-b-data');
    // hg_right_b_b_data.innerHTML = '';
    hg_right_b_b_data.value = '';
    // hg_right_b_b_data.value = subscript('1232');

    // console.log(hg_right_b_b_data.value);

    // var text = '\u2080';
    // // $('hg-right-b-b-data').val($('hg-right-b-b-data').val() + ' ' + text);

    // hg_right_b_b_data.value += text;
    // console.log(hg_right_b_b_data.value);
}

function addLog(text) {
    if (log_stats_enabled) {
        // var hg_right_b_b = document.getElementById('hg-right-b-b');
        // hg_right_b_b.innerHTML += '<p id="Status">' + text+ '</p>';
        var hg_right_b_b_data = document.getElementById('hg-right-b-b-data');
        // hg_right_b_b_data.innerHTML += text + '\n';
        hg_right_b_b_data.value += text + '\n';
    }
}


function serializeIterCompleteForLog(it) {
    const val = it.data.data[it.index] ? it.data.data[it.index] : '\u2205';
    return it.data.name + subscript(it.index) + '=' + val;
}

function serializeIterForLog(x) {
    return x.data.name + subscript(x.index);
}

function addLogEqual(a, b, res) {
    addLog('equal(' + serializeIterForLog(a) + ', ' + serializeIterForLog(b) + ') = ' + res);
}

function addLogSuccessor(it, res_it) {
    addLog('successor(' + serializeIterForLog(it) + ') = ' + serializeIterForLog(res_it) + '');
}

function addLogPredecessor(it, res_it) {
    addLog('predecessor(' + it.data.name + subscript(it.index) + ') = ' + serializeIterForLog(res_it)+ '');
}

function addLogSource(it, res) {
    addLog('source(' + serializeIterForLog(it) + ') = ' + res);
}

function addLogSink(it, x) {
    addLog('sink(' + serializeIterForLog(it) + ', ' + x + ')');
}

function addLogMove(x) {
    addLog('move(' + x + ')');
}

function addLogSwap(a, b) {
    addLog('swap(' + serializeIterForLog(a) + ', ' + serializeIterForLog(b) + ')');
}

function addLogPredicate(name, x, res) {
    addLog(name + '(' + x + ') = ' + res);
}

function addLogRelation(name, x, y, res) {
    addLog(name + '(' + x + ', ' + y + ') = ' + res);
}



function updateStatus() {
    updateState();
    updateStats();
}

function resetStatus() {
    resetState();
    resetStats();
}

function showError(text) {
    var msg = '<p id="OutputMsg"><span style="color:red">ERROR: </span>' + text + '</p>';

    var output = document.getElementById('hg-right-y');
    output.innerHTML += msg;
    // hljs.highlightBlock(output);

    console.log(arguments.length ? text : '');
}


function initFunctions(interpreter, scope) {

    // var alert_wrapper = function(text) {
    //     return alert(arguments.length ? text : '');
    // };


    var print_wrapper = function(text) {

        if (text instanceof Sequence) {
            text = "[" + text.data.join(", ") + "]";
        }

        var msg = '<p id="OutputMsg"><span style="color:cyan">INFO: </span>' + text + '</p>';

        var output = document.getElementById('hg-right-y');
        output.innerHTML += msg;
        // hljs.highlightBlock(output);

        // console.log(text);
        console.log(arguments.length ? text : '');
    };

    

    // var assign_it_wrapper = function(target, source) {
    //     var elements = target.data.elements;
    //     target = new Iterator(target.data, source.index, target.name);
    //     iterators_int[target.name] = target;
    //     moveIteratorTo(two, iterators_gui[target.name], elements[target.index])
    //     two.update();
    //     //TODO: Iterator Assignment/Copy
    //     // ++stats_it_moves;
    //     updateStatus();
    //     return target;
    // };


    var successor_wrapper = function(it_par, step = 1) {
        var data = it_par.data.data;
        var max = data.length;

        // console.log(it_par.index)
        if (it_par.index + step > max) {
            showError('out of range');
            disable('disabled');
            return;
        }

        var it = new Iterator(it_par.data, it_par.index + step, it_par.name);
        if (iterators_int[it.name]) {
            iterators_int[it.name] = it;
        }

        if (log_stats_enabled) {
            ++stats_it_moves;
        }

        updateStatus();
        addLogSuccessor(it_par, it)
        return it;
    };

    var predecessor_wrapper = function(it_par, step = 1) {
        // console.log(it_par.index)
        if (it_par.index - step < 0) {
            showError('out of range');
            disable('disabled');
            return;
        }

        var it = new Iterator(it_par.data, it_par.index - step, it_par.name);
        if (iterators_int[it.name]) {
            iterators_int[it.name] = it;
        }
        
        if (log_stats_enabled) {
            ++stats_it_moves;
        }

        updateStatus();

        addLogPredecessor(it_par, it)
        return it;
    };
    
    var begin_wrapper = function(arr, name, color) {
        // console.log(arr)
        // console.log('begin_wrapper')

        // if (iterators_int[name] != undefined) {
        //     var gui = iterators_gui[name];
        //     // console.log(gui)
        //     color = gui.children[0].fill;
        //     // console.log(color)
        //     remove_it_wrapper(iterators_int[name]);
        // }

        // if ( ! color) {
        //     // console.log(Object.keys(iterators_int).length)
        //     color = iterators_colors[Object.keys(iterators_int).length];
        // }


        var index = 0
        // var it = new Iterator(arr, index, name);
        var it = new Iterator(arr, index, null);
        // iterators_int[name] = it;

        updateStatus();

        return it;
    };

    var end_wrapper = function(arr, name, color) {

        // if (iterators_int[name] != undefined) {
        //     var gui = iterators_gui[name];
        //     // console.log(gui)
        //     color = gui.children[0].fill;
        //     // console.log(color)
        //     remove_it_wrapper(iterators_int[name]);
        // }

        // if ( ! color) {
        //     // console.log(Object.keys(iterators_int).length)
        //     color = iterators_colors[Object.keys(iterators_int).length];
        // }

        var length = arr.data.length
        var index = length
        // var it = new Iterator(arr, index, name);
        var it = new Iterator(arr, index, null);
        // iterators_int[name] = it;

        updateStatus();

        return it;
    };

    var size_wrapper = function(arr) {
        var length = arr.data.length
        return length;
    };

    var capacity_wrapper = function(arr) {
        var c = arr.capacity
        return c;
    };

    var increase_capacity_wrapper = function(seq, n) {
        var retobj = new Sequence(seq.name, seq.data, seq.elements, seq.colors, seq.capacity + n, seq.pred);
        sequences[seq.name] = retobj;
        return retobj;
    };


    var push_back_wrapper = function(seq, x) {

        var cap = seq.capacity
        var data = seq.data;

        // console.log(data)
        // console.log(cap)

        if (cap == data.length) {
            ++cap;
        }

        data.push(x)

        // console.log(data)
        // console.log(cap)

        var retobj = new Sequence(seq.name, data, seq.elements, seq.colors, cap, seq.pred);
        sequences[seq.name] = retobj;
        return retobj;
    };


    var source_value = function(it) {
        var data = it.data.data;
        var s = data[it.index];
        return s;
    };

    

    var register_rel_distance_wrapper = function (d) {
        if (log_stats_enabled) {
            stats_rel_distance += Math.abs(d);
        }
    };

    var register_move_distance_wrapper = function (d) {
        if (log_stats_enabled) {
            stats_move_distance += Math.abs(d);
        }
    };

    var register_custom_stat_wrapper = function (s) {
        custom_stats[s] = 0;
    };

    var increment_custom_stat_wrapper = function (s) {
        custom_stats[s] += 1;

        // if (log_stats_enabled) {
        //     stats_move_distance += Math.abs(d);
        // }
    };


    var source_wrapper = function (it) {
        var data = it.data.data;
        var max = data.length;

        if (it.index >= max) {
            showError('not valid iterator to take the source.');
            disable('disabled');
            return;
        }

        var s = data[it.index];
        addLogSource(it, s)

        //TODO
        // ++stats_pred_appls;
        // updateStatus();

        return s;
    };

    var source_move_wrapper = function(it) {
        var data = it.data.data;
        var max = data.length;

        if (it.index >= max) {
            showError('not valid iterator to take the source.');
            disable('disabled');
            return;
        }

        var s = data[it.index];
        data[it.index] = '_';
        addLogSource(it, s)
        addLogMove(s)

        if (log_stats_enabled) {
            ++stats_moves;
        }

        updateStatus();
        return s;
    };

    var sink_wrapper = function(it, x) {
        var data = it.data.data;
        var elements = it.data.elements;

        var max = data.length;
        if (it.index >= max) {
            showError('not valid iterator to take the source.');
            disable('disabled');
            return;
        }

        addLogSink(it, x)
        
        data[it.index] = x;
        elements[it.index].group.children[1].value = x;

        if (log_stats_enabled) {
            ++stats_assigments;
        }

        updateStatus();
        two.update();
    };

    var sink_move_wrapper = function(it, x) {
        var data = it.data.data;
        var elements = it.data.elements;

        var max = data.length;
        if (it.index >= max) {
            showError('not valid iterator to take the source.');
            disable('disabled');
            return;
        }

        addLogMove(x)
        addLogSink(it, x)

        data[it.index] = x;
        elements[it.index].group.children[1].value = x;

        if (log_stats_enabled) {
            ++stats_moves;
        }

        updateStatus();
        two.update();
    };

    var equal_wrapper = function(a, b) {
        // addLog('equal(' + a.index + ', ' + b.index + ')');
        // addLog('equal(' + a.data.name + ', ' + b.index + ')');

        if (log_stats_enabled) {
            ++stats_it_cmps;
        }

        updateStatus();
        var res = a.index == b.index;
        addLogEqual(a, b, res)
        return res;
    };

    var distance_wrapper = function(a, b) {
        var res = b.index - a.index;
        return res;
    };

    
    // var copy_it_wrapper = function(it, name, color) {

    //     if ( ! color) {
    //         // console.log(Object.keys(iterators_int).length)
    //         color = iterators_colors[Object.keys(iterators_int).length];
    //     }

    //     var index = it.index
    //     var it = new Iterator(it.data, it.index, name);
    //     var it_gui = drawIterator(two, it.data.elements[index], name, color);
    //     iterators_gui[name] = it_gui;
    //     iterators_int[name] = it;
    //     two.update();

    //     updateStatus();

    //     return it;
    // };

    // var remove_it_wrapper = function(it) {
    //     // console.log(iterators_gui[it.name]);
    //     two.remove(iterators_gui[it.name]);
    //     two.update();
    //     delete iterators_gui[it.name];
    //     delete iterators_int[it.name];
    //     updateStatus();
    // };


    // var move_wrapper = function(x) {
    //     addLogMove(x)
    //     ++stats_moves;
    //     return x;
    // };

    var iter_swap_wrapper = function(a, b) {
        var data_a = a.data.data;
        var data_b = b.data.data;
        // var colors_a = a.data.colors;
        // var colors_b = b.data.colors;

        // var tmp_color = colors_a[a.index];
        // colors_a[a.index] = colors_b[b.index];
        // colors_b[b.index] = tmp_color;

        var tmp = source_value(a);
        data_a[a.index] = source_value(b);
        data_b[b.index] = tmp;

        if (log_stats_enabled) {
            ++stats_swaps;
            stats_assigments += 3;
        }

        addLogSwap(a, b);
        updateStatus();
        two.update();
    };

    var g_rel_count = 0;
    var g_pred_count = 0;

    var callable_create_wrapper = function (f) {
        var codeAll = getAllCode();
        var codeSelected = codeAll.substring(f.node.start, f.node.end);

        if (f.node.id) {
            var name = f.node.id.name;
        } else {
            if (f.node.params.length == 1) {
                var name = "pred" + g_pred_count;
                ++g_pred_count;
            } else if (f.node.params.length == 2) {
                var name = "rel" + g_rel_count;
                ++g_rel_count;
            }
        }

        return {
            name: name,
            parameters: f.node.params.length,
            code: codeSelected
        };
    }

    var callable_get_code_wrapper = function (c) {
        return c.code;
    }

    var callable_get_name_wrapper = function (c) {
        return c.name;
    }

    var callable_get_parameters_wrapper = function (c) {
        return c.parameters;
    }

    var sequence_internal_wrapper = function(data_par, name, pred) {
        console.log(data_par)
        
        if (sequences[name] != undefined) {
            showError('sequence "' + name + '" already exists.');
            disable('disabled');
            return null;
        }

        var data = [];
        var colors = [];
        var length = data_par.properties['length'];

        stats_n += length; 

        for (let i = 0; i < length; ++i) {
            data.push(data_par.properties[i]);
            // colors.push(defaultElementColor);
        }

        // var elems = drawArray(two, data, name, Object.keys(sequences).length);
        var elems = null;
        var retobj = new Sequence(name, data, elems, colors, undefined, pred);
        sequences[name] = retobj;

        updateStatus();
        // two.update();
        return retobj;
    };    


    var set_predicate_wrapper = function(p) {
       
        // console.log(p.node.id.name);
        // interpreter.appendCode(p.node.id.name+'();');

        predicates.push(p);
        
        updateStatus();
        two.update();
    };    

    var log_predicate_call_internal_wrapper = function(name, x, res) {
        if (log_stats_enabled) {
            ++stats_pred_appls;
        }
        updateStatus();

        addLogPredicate(name, x, res);

        if (log_stats_enabled) {
            //TODO
            var hg_right_x_a = document.getElementById('hg-right-x-a');
            var text = '<p id="Status">' + name + '(' + x + ') = ' + res + '</p>';
            hg_right_x_a.innerHTML += text;
        }
    };    

    var log_relation_call_internal_wrapper = function(name, x, y, res) {
        // console.log('log_relation_call_internal_wrapper')
        // console.log(name)
        // console.log(x)
        // console.log(y)
        // console.log(res)
        // console.log(log_stats_enabled)
        
        if (log_stats_enabled) {
            ++stats_pred_appls;
        }
        updateStatus();

        addLogRelation(name, x, y, res);

        if (log_stats_enabled) {
            //TODO
            var hg_right_x_a = document.getElementById('hg-right-x-a');
            var text = '<p id="Status">' + name + '(' + x + ', ' + y + ') = ' + res + '</p>';
            hg_right_x_a.innerHTML += text;
        }
    };    

    

    // var fill_elem_wrapper = function(data, i, c) {
    //     // var elements = data.elements;
    //     // let elem = elements[i];
    //     // elem.rect.fill = c;

    //     var colors = data.colors;
    //     colors[i] = c;
    // };    

    var enable_log_stats_wrapper = function() {
        log_stats_enabled = true;
    };    

    var disable_log_stats_wrapper = function() {
        log_stats_enabled = false;
    };    
    
    var skip_debug_wrapper = function(name) {
        skipped.push(name);
        // console.log(skipped);
    };    

    var range_bounded_wrapper = function(f, l) {
        return new RangeBounded(f, l);
    };    

    var range_counted_wrapper = function(f, n) {
        return new RangeCounted(f, n);
    };    

    // var log_f_wrapper = function() {
    //     // var myName = arguments.callee.toString();
    //     // console.log(name)
    //     // console.log(arguments)
    //     // var myName = arguments.caller;
    //     // console.log(arguments.caller);
    //     // console.log(arguments.caller.caller);
    //     // console.log(arguments.caller.caller.name);
    //     // console.log(4_wrapper.caller);
    //     // console.log(log_f_wrapper.caller.caller);
    //     // console.log(log_f_wrapper.caller.caller.name);
    //     // myName = myName.substr('function '.length);
    //     // myName = myName.substr(0, myName.indexOf('('));
    //     // console.log(myName);
    //     // addLog(myName)

    //     if (arguments.length == 0) return;

    //     to_print = arguments[0] + '(';

    //     for (var i = 1; i < arguments.length; ++i) {
    //         // console.log(arguments[i]);
    //         if (arguments[i] && arguments[i] instanceof Iterator) {
    //             if (i > 1) {
    //                 to_print += ', ';
    //             }
    //             to_print += serializeIterForLog(arguments[i]);
    //         }
    //     }

    //     to_print += ')';

    //     // console.log(to_print);
    //     addLog("-- start: " + to_print);
    //     return to_print
    // }; 

    var start_f_wrapper = function() {
        if (arguments.length == 0) return [false, undefined];
        if (g_disable_function_printing) return [false, undefined];

        g_disable_function_printing = true;
        var to_print = arguments[0] + '(';

        for (var i = 1; i < arguments.length; ++i) {
            if (arguments[i] && arguments[i] instanceof Iterator) {
                if (i > 1) {
                    to_print += ', ';
                }
                to_print += serializeIterCompleteForLog(arguments[i]);
            }
        }

        to_print += ')';
        addLog("-- start: " + to_print);
        return [true, to_print];
    }; 

    var end_f_wrapper = function(pars) {
        // alert(pars)
        if ( ! pars[0]) return;
        g_disable_function_printing = false;
        addLog("-- end: " + pars[1]);
    }

    // var array_from_wrapper = function(str) {
    //     return Array.from(str);
    // }



    

    

    // interpreter.setProperty(scope, 'alert',          interpreter.createNativeFunction(alert_wrapper));
    interpreter.setProperty(scope, 'print',          interpreter.createNativeFunction(print_wrapper));
    interpreter.setProperty(scope, 'successor',      interpreter.createNativeFunction(successor_wrapper));
    interpreter.setProperty(scope, 'next',           interpreter.createNativeFunction(successor_wrapper));
    interpreter.setProperty(scope, 'predecessor',    interpreter.createNativeFunction(predecessor_wrapper));
    interpreter.setProperty(scope, 'pred',           interpreter.createNativeFunction(predecessor_wrapper));
    interpreter.setProperty(scope, 'begin',          interpreter.createNativeFunction(begin_wrapper));
    interpreter.setProperty(scope, 'end',            interpreter.createNativeFunction(end_wrapper));
    interpreter.setProperty(scope, 'size',           interpreter.createNativeFunction(size_wrapper));
    interpreter.setProperty(scope, 'capacity',       interpreter.createNativeFunction(capacity_wrapper));
    interpreter.setProperty(scope, 'increase_capacity', interpreter.createNativeFunction(increase_capacity_wrapper));
    interpreter.setProperty(scope, 'push_back', interpreter.createNativeFunction(push_back_wrapper));
    
    interpreter.setProperty(scope, 'source',         interpreter.createNativeFunction(source_wrapper));
    interpreter.setProperty(scope, 'source_move',    interpreter.createNativeFunction(source_move_wrapper));
    interpreter.setProperty(scope, 'sink',           interpreter.createNativeFunction(sink_wrapper));
    interpreter.setProperty(scope, 'sink_move',      interpreter.createNativeFunction(sink_move_wrapper));
    interpreter.setProperty(scope, 'equal',          interpreter.createNativeFunction(equal_wrapper));
    interpreter.setProperty(scope, 'distance',       interpreter.createNativeFunction(distance_wrapper));
    // interpreter.setProperty(scope, 'move',           interpreter.createNativeFunction(move_wrapper));
    interpreter.setProperty(scope, 'register_rel_distance', interpreter.createNativeFunction(register_rel_distance_wrapper));
    interpreter.setProperty(scope, 'register_move_distance', interpreter.createNativeFunction(register_move_distance_wrapper));

    interpreter.setProperty(scope, 'register_custom_stat', interpreter.createNativeFunction(register_custom_stat_wrapper));
    interpreter.setProperty(scope, 'increment_custom_stat', interpreter.createNativeFunction(increment_custom_stat_wrapper));

    

    

    interpreter.setProperty(scope, 'iter_swap',      interpreter.createNativeFunction(iter_swap_wrapper));

    interpreter.setProperty(scope, 'sequence_internal',   interpreter.createNativeFunction(sequence_internal_wrapper));
    // interpreter.setProperty(scope, 'fill_elem',      interpreter.createNativeFunction(fill_elem_wrapper));
    interpreter.setProperty(scope, 'log_predicate_call_internal', interpreter.createNativeFunction(log_predicate_call_internal_wrapper));
    interpreter.setProperty(scope, 'log_relation_call_internal', interpreter.createNativeFunction(log_relation_call_internal_wrapper));

    interpreter.setProperty(scope, 'enable_log_stats', interpreter.createNativeFunction(enable_log_stats_wrapper));
    interpreter.setProperty(scope, 'disable_log_stats', interpreter.createNativeFunction(disable_log_stats_wrapper));
    interpreter.setProperty(scope, 'skip_debug', interpreter.createNativeFunction(skip_debug_wrapper));

    interpreter.setProperty(scope, 'range_bounded', interpreter.createNativeFunction(range_bounded_wrapper));
    interpreter.setProperty(scope, 'range_counted', interpreter.createNativeFunction(range_counted_wrapper));
 

    interpreter.setProperty(scope, 'start_f', interpreter.createNativeFunction(start_f_wrapper));
    interpreter.setProperty(scope, 'end_f', interpreter.createNativeFunction(end_f_wrapper));


    interpreter.setProperty(scope, 'callable_create', interpreter.createNativeFunction(callable_create_wrapper));
    interpreter.setProperty(scope, 'callable_get_code', interpreter.createNativeFunction(callable_get_code_wrapper));
    interpreter.setProperty(scope, 'callable_get_name', interpreter.createNativeFunction(callable_get_name_wrapper));
    interpreter.setProperty(scope, 'callable_get_parameters', interpreter.createNativeFunction(callable_get_parameters_wrapper));

    // interpreter.setProperty(scope, 'array_from_internal', interpreter.createNativeFunction(array_from_internal_wrapper));

    
}

// function bind(r, value, arg=0) {
//     if (arg == 0)
//         return function(x) { return r(value, x);};
    
//     return function(x) { return r(x, value);};
// }


// function bind(r, value) {
//     return function(x) { return r(value, x);};
// }




function callPredCode() {
    return '';
    
    // var res = '' + 
    //     // + 'function predicate(p, name) {return function(x) {return log_predicate_call(p, name, x);};}\n'
    //     // + 'function log_relation_call(r, name, x, y){var res = r(x, y); log_relation_call_internal(name, x, y, res); return res;}\n'

    //     + 'function complement(_r) {var _cr = function(x, y) { return !_r.inner_relation(x, y); };var code = "(function complement_of_" + _r.inner_name + "(x, y) {return log_relation_call(_cr, \\"\\u00AC" + _r.inner_name + "\\", x, y);})";var func = eval(code);func.inner_relation = _cr;func.inner_name = "\\u00AC" + _r.inner_name;return func;}\n'
    //     + 'function converse(_r) {var _cr = function(x, y) { return _r.inner_relation(y, x); };var code = "(function converse_of_" + _r.inner_name + "(x, y) {return log_relation_call(_cr, \\"" + _r.inner_name + "\\", y, x);})";var func = eval(code);func.inner_relation = _cr;return func;}\n'

    //     //  + 'function bind(r, value, arg=0) {if (arg == 0) return function(x) { return r(value, x);}; return function(x) { return r(x, value);};}\n'
    //     + 'function bind(r, value, arg) {return function(x) { return r(value, x);};}\n'

    //     + 'function random_int(from, to) {if ( ! from) from = 0;if ( ! to) to = 99;return Math.floor(Math.random() * to) + from;}\n';
    //     //  + 'function array_random(n, from, to) {if ( ! n) n = 10;if ( ! from) from = 0;if ( ! to) to = 99;var res = []; while (n != 0) { var rand = Math.floor(Math.random() * to) + from; res.push(rand); --n;} return res; }\n';
    
    // res += `
    // function log_relation_call(r, name, x, y) {
    //     var res = r(x, y); 
    //     log_relation_call_internal(name, x, y, res); 
    //     return res;
    // }`;

    return res;
}

function addSequenceCode() {
    return `
    function sequence(d, n, p) {
        return sequence_internal(d, n, p);
    }`

    // return `
    // function sequence(d, n, p) {
    //     // disable_log_stats();
    //     var obj = sequence_internal(d, n, p);

    //     // if ( ! obj) {enable_log_stats(); return obj;}
    //     // if (p) {    
    //     //     for (var i = 0; i < d.length; ++i) {
    //     //         var value = d[i];
    //     //         if ( ! p(value)) {
    //     //             fill_elem(obj, i, "#ff9191");
    //     //             //obj.colors[i] = "#ff9191";
    //     //         }
    //     //     }
    //     // }
    //     // enable_log_stats();
    //     return obj;
    // }`

}

function add_utils_lib() {
    // var res = '' + 
    //     // 'function log_predicate_call(p, name, x){var res = p(x); log_predicate_call_internal(name, x, res); return res;};\n'
    //     // + 'function predicate(p, name) {return function(x) {return log_predicate_call(p, name, x);};}\n'
    //     // + 'function log_relation_call(r, name, x, y){var res = r(x, y); log_relation_call_internal(name, x, y, res); return res;}\n'

    //     + 'function complement(_r) {var _cr = function(x, y) { return !_r.inner_relation(x, y); };var code = "(function complement_of_" + _r.inner_name + "(x, y) {return log_relation_call(_cr, \\"\\u00AC" + _r.inner_name + "\\", x, y);})";var func = eval(code);func.inner_relation = _cr;func.inner_name = "\\u00AC" + _r.inner_name;return func;}\n'
    //     + 'function converse(_r) {var _cr = function(x, y) { return _r.inner_relation(y, x); };var code = "(function converse_of_" + _r.inner_name + "(x, y) {return log_relation_call(_cr, \\"" + _r.inner_name + "\\", y, x);})";var func = eval(code);func.inner_relation = _cr;return func;}\n'

    //     //  + 'function bind(r, value, arg=0) {if (arg == 0) return function(x) { return r(value, x);}; return function(x) { return r(x, value);};}\n'
    //     + 'function bind(r, value, arg) {return function(x) { return r(value, x);};}\n'

    //     + 'function random_int(from, to) {if ( ! from) from = 0;if ( ! to) to = 99;return Math.floor(Math.random() * to) + from;}\n';
    //     //  + 'function array_random(n, from, to) {if ( ! n) n = 10;if ( ! from) from = 0;if ( ! to) to = 99;var res = []; while (n != 0) { var rand = Math.floor(Math.random() * to) + from; res.push(rand); --n;} return res; }\n';
    
    
    return `
    function callable(f) {
        var c = callable_create(f);
        var fname = callable_get_name(c);
        var params = callable_get_parameters(c);
    
        if (params == 2) {
            var wrapped_func = function(x, y) {
                var res = f(x, y); 
                log_relation_call_internal(fname, x, y, res); 
                return res;
            };        
        } else if (params == 1) {
            var wrapped_func = function(x) {
                var res = f(x); 
                log_predicate_call_internal(fname, x, res); 
                return res;
            };
        }
        wrapped_func.inner_callable = c;
        wrapped_func.inner_function = f;
        wrapped_func.inner_name = fname;
        wrapped_func.inner_code = callable_get_code(c);
        wrapped_func.inner_parameters = params;
        return wrapped_func;
    }    
    function relation(f) {
        return callable(f);
    }
    function predicate(f) {
        return callable(f);
    }
    function bind(r, value, arg) {
        return function(x) { 
            return r(value, x);
        };
    }
    function call(r, it0, it1) {
        var d = distance(it0, it1);
        register_rel_distance(d);
        return r(source(it0), source(it1));
    }
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
    function array_all_equal(n, x) {
        if ( ! n) n = 10;
        if ( ! x) x = 1;
        var res = []; 
        while (n != 0) { 
            res.push(x); 
            --n;
        } 
        return res; 
    }
    function array_ascending(n, from) {
        if ( ! n) n = 10;
        if ( ! from) from = 0;
        var res = []; 
        while (n != 0) {
            res.push(from); 
            ++from;
            --n;
        } 
        return res; 
    }
    function array_descending(n, from) {
        if ( ! n) n = 10;
        if ( ! from) from = n - 1;
        var res = []; 
        while (n != 0) {
            res.push(from); 
            --from;
            --n;
        } 
        return res; 
    }
    function array_from(str) {
        var res = []; 
        for (var i = 0; i < str.length; ++i) {
            res.push(str[i]); 
        }
        return res; 
    }
    `;
}


function sort_keys(dict) {
    var sorted = [];
    for(var key in dict) {
        sorted[sorted.length] = key;
    }
    return sorted.sort();
}

function getFunction(name) {
    var libs = add_std_lib_dict();
    var res = libs[name];
    if (res) {
        return "\n\n\n" + res;
    }
    return '';
}


function fillStdLib() {
    // var str = fillCatalogRecursive('', categories);
    // str += '<li class="linested"><span class="caret">' + 'Uncatalogued' + '</span><ul class="nested">';
    // snippets = getUncataloguedSnippets();

    var libs = add_std_lib_dict();
    var keys = sort_keys(libs);
    var str = '';

    for(var i = 0; i < keys.length; ++i) {
        str += '<li><a href="/algorithms?function=' + keys[i] + '">[' + keys[i] + ']</a></li>';
    }

    // for (var key in libs) {
    //     str += '<li><a href="/algorithms?function=' + key + '">[' + key + ']</a></li>';
    // }
    str +=  '</ul></li>';

    var list = document.getElementById('list');
    list.innerHTML = str;
}


function add_std_lib_prepare_code(code_lines) {
    var res = []
    for (var i = 0; i < code_lines.length; ++i) {
        if (!code_lines[i].includes('start_f') && !code_lines[i].includes('end_f')) {
            res.push(code_lines[i]);
        }
    }

    return res.join('\n');
}

function add_std_lib_get_function_name(e) {
    var code = e.trim();
    var lines = code.split("\n");
    if (lines.length == 0) return undefined;
    if ( ! lines[0].startsWith('function')) return undefined;

    var parens = lines[0].indexOf('(');
    if (parens < 0) return undefined;

    var res = lines[0].substring('function'.length, parens).trim();
    // return { key: res, value: code };
    return { key: res, value: add_std_lib_prepare_code(lines) };
}

function add_std_lib_dict_temp() {
    var list = add_std_lib_array();
    var res = {};
    for (var i = 0; i < list.length; ++i) {
        var data = add_std_lib_get_function_name(list[i]);
        if (data != undefined) {
            res[data.key] = data.value;
        }
    }
    return res;
}

function add_std_lib_dict() {
    var dict = add_std_lib_dict_temp();

    var res = {};
    for (var key in dict) {
        if (key.includes("_internal")) continue;
        
        if ((key + "_internal") in dict) {
            res[key] = dict[key + "_internal"].replace(key + "_internal", key);
        } else {
            res[key] = dict[key];
        }
    }
    return res;
}

function add_std_lib() {
    return add_std_lib_array().join('\n');
}

function add_std_lib_array() {
    return [`
function min_element(f, l, r) {
    var _f_ = start_f('min_element', f, l, r);
    if (equal(f, l)) return l;

    var m = f;
    f = successor(f);

    while ( ! equal(f, l)) {
        if (r(source(f), source(m))) {
            m = f;
        }
        f = successor(f);
    }
    end_f(_f_);
    return m;
}`, `
function min_element_nonempty(f, l, r) {
    var _f_ = start_f('min_element_nonempty', f, l, r);
    var m = f;
    f = successor(f);
    while ( ! equal(f, l)) {
        if (r(source(f), source(m))) {
            m = f;
        }
        f = successor(f);
    }
    end_f(_f_);
    return m;
}`, `
function min_value_nonempty(f, l, r) {
    var _f_ = start_f('min_value_nonempty', f, l, r);
    var m = source(f);
    f = successor(f);
    while ( ! equal(f, l)) {
        if (r(source(f), m)) {
            m = source(f);
        }
        f = successor(f);
    }
    end_f(_f_);
    return m;
}`, `
function is_sorted_internal(f, l, r) {
    var _f_ = start_f('is_sorted', f, l, r);
    if (equal(f, l)) return true;
    var n = successor(f);
    while ( ! equal(n, l)) {
        if (r(source(n), source(f))) return false;
        f = n;
        n = successor(n);
    }
    return true;
}`, `
function is_sorted(f, l, r) {
    var _f_ = start_f('is_sorted', f, l, r);
    var res = is_sorted_internal(f, l, r);
    end_f(_f_);
    return res;
}`, `
function move_backward(f_i, l_i, l_o) {
    var _f_ = start_f('move_backward', f_i, l_i, l_o);
    while (! equal(f_i, l_i)) {
        l_i = predecessor(l_i);
        l_o = predecessor(l_o);
        sink_move(l_o, source(l_i));
    } 
    end_f(_f_);
    return l_o;
}`, `
function rotate_right_by_one_nonempty(f, l) {
    var _f_ = start_f('rotate_right_by_one_nonempty', f, l, r);
    var butlast = predecessor(l);
    var x = source_move(butlast);
    move_backward(f, butlast, l);
    sink_move(f, x);
    end_f(_f_);
}`, `
function shift_right_while_unguarded(l, p) {
    var _f_ = start_f('shift_right_while_unguarded', l, r);
    while (p(source(predecessor(l)))) {
        sink_move(l, source_move(predecessor(l)));
        l = predecessor(l);
    }
    end_f(_f_);
    return l;
}`, `
var eq = relation(function eq(x, y) {return x == y;});
var lt = relation(function lt(x, y) {return x < y;});
var gt = relation(function gt(x, y) {return x < y;});
var lte = relation(function lte(x, y) {return x <= y;});
var gte = relation(function gte(x, y) {return x >= y;});
`];

    // `function iota(f, l, start, step) {
    //     if ( ! start) start = 0;
    //     if ( ! step) step = 1;
    
    //     while ( ! equal(f, l)) {
    //         sink(f, start);
    //         start += step;
    //         f = successor(f);
    //     }
    //     return start;
    // }`    
}

function std_lib_attributes() {

    return {
        min_element: {
            category: ['Selection', 'Stable'],
            complexity: 'n - 1 comparisons',
            "type requirements": ['f, l: I: Iterator \u2227 Readable',
                                  'r: R: StrictWeakOrdering relation',
                                  'Domain(R) = ValueType(I)'],
            precondition: 'readable_bounded_range(f, l)',
            postcondition: 'source(m) = stable_sort_copy(f, l, r)[0]',
        },
        min_element_nonempty: {
            category: ['Selection', 'Stable'],
            complexity: 'n - 1 comparisons',
            "type requirements": ['f, l: I: Iterator \u2227 Readable',
                                  'r: R: StrictWeakOrdering relation',
                                  'Domain(R) = ValueType(I)'],
            precondition: 'f != l \u2227 readable_bounded_range(f, l)',
            postcondition: 'source(m) = stable_sort_copy(f, l, r)[0]',
        },
        min_value_nonempty: {
            category: ['Selection', 'Stable'],
            complexity: 'n - 1 comparisons',
            "type requirements": ['f, l: I: Iterator \u2227 Readable',
                                  'r: R: StrictWeakOrdering relation',
                                  'Domain(R) = ValueType(I)'],
            precondition: 'f != l \u2227 readable_bounded_range(f, l)',
            postcondition: 'm = stable_sort_copy(f, l, r)[0]',
        },
        is_sorted: {
            category: 'Selection',
            complexity: 'n - 1',
            precondition: '',
            postcondition: '',
        },
        move_backward: {
            category: 'Selection',
            complexity: 'n - 1',
            precondition: '',
            postcondition: '',
        },
        rotate_right_by_one_nonempty: {
            category: 'Selection',
            complexity: 'n - 1',
            precondition: '',
            postcondition: '',
        },
        shift_right_while_unguarded: {
            category: 'selection',
            complexity: 'n - 1',
            precondition: '',
            postcondition: '',
        },
    };
}




function invisibleCode() {
    return callPredCode() + addSequenceCode() + add_std_lib() + add_utils_lib();
}


function getAllCode() {
    // var dataCodeText = document.getElementById('dataCodeArea').value;
    // var codeText = document.getElementById('codeArea').value;
    // return dataCodeText + '\n' + codeText;

    return invisibleCode() + document.getElementById('codeArea').value;
}

function getViewCode() {
    // var dataCodeText = document.getElementById('dataCodeArea').value;
    // var codeText = document.getElementById('codeArea').value;
    // return dataCodeText + '\n' + codeText;

    return document.getElementById('codeArea').value;
}


// function paint_data_pred(interpreter, p, data) {

//     for (let index = 0; index < elements.length - 1; ++index) {
//         let value = data[index];
//         let elem = elements[index];

//         // console.log(value)
//         // console.log(elem)
//         // console.log(p)
//         // interpreter.appendCode(p.node.id.name+'();');
//         var code = 'if ( ! ' + p.node.id.name+'(' + value + ')) { fill_elem(' + index + ', "#ff9191"); }';
//         // console.log(code);
//         interpreter.appendCode(code);

//         // if ( ! p(value)) {
//         //     elem.rect.fill = '#ff9191';
//         // }
//     }
// }


function editButton() {
    // document.getElementById('dataCodeArea').style.display = "inline";
    document.getElementById('codeArea').style.display = "inline";
    document.getElementById('codeHighlightPre').style.display = "none";

    document.getElementById('startButton').style.display = "inline";
    document.getElementById('stepButton').style.display = "none";
    document.getElementById('editButton').style.display = "none";
    document.getElementById('restartButton').style.display = "none";

    var output = document.getElementById('hg-right-y');
    output.innerHTML = '';

    var hg_right_x_a = document.getElementById('hg-right-x-a');
    // console.log(hg_right_x_a.innerHTML);
    hg_right_x_a.innerHTML = '';

    clearLog();

    two.clear();
}

function restartButton() {
    // document.getElementById('dataCodeArea').style.display = "inline";
    document.getElementById('codeArea').style.display = "inline";
    document.getElementById('codeHighlightPre').style.display = "none";

    document.getElementById('startButton').style.display = "inline";
    document.getElementById('stepButton').style.display = "none";
    document.getElementById('editButton').style.display = "none";
    document.getElementById('restartButton').style.display = "none";

    var output = document.getElementById('hg-right-y');
    output.innerHTML = '';

    var hg_right_x_a = document.getElementById('hg-right-x-a');
    hg_right_x_a.innerHTML = '';

    clearLog();

    resetStatus();
    two.clear();

    startButton();
}


function startButton() {
    var codeAll = getAllCode();
    var codeView = getViewCode();
    
    // document.getElementById('dataCodeArea').style.display = "none";
    document.getElementById('codeArea').style.display = "none";
    document.getElementById('codeHighlightPre').style.display = "block";

    document.getElementById('startButton').style.display = "none";
    document.getElementById('stepButton').style.display = "inline";
    document.getElementById('editButton').style.display = "inline";
    document.getElementById('restartButton').style.display = "inline";

    var output = document.getElementById('hg-right-y');
    output.innerHTML = '';

    var hg_right_x_a = document.getElementById('hg-right-x-a');
    hg_right_x_a.innerHTML = '';

    clearLog();

    two.clear();
    resetStatus();

    var codeHighlight = document.getElementById('codeHighlight');
    codeHighlight.innerHTML = codeView;
    hljs.highlightBlock(codeHighlight);
    codeHighlight.style.fontSize = "12pt";



    // var output = document.getElementById('hg-right-y');
    // hljs.highlightBlock(output);

    // console.log(codeAll)

    try {
        myInterpreter = new Interpreter(codeAll, initFunctions);    
        disable('');
        updateStatus();
    } catch (error) {
        editButton();
        showError("parsing error");
    }
}

function showFunction() {
    var codeAll = getAllCode();
    var codeView = getViewCode();
    
    // document.getElementById('dataCodeArea').style.display = "none";
    document.getElementById('codeArea').style.display = "none";
    document.getElementById('codeHighlightPre').style.display = "block";


    document.getElementById('startButton').style.display = "none";
    document.getElementById('stepButton').style.display = "none";
    document.getElementById('editButton').style.display = "none";
    document.getElementById('restartButton').style.display = "none";

    var output = document.getElementById('hg-right-y');
    output.innerHTML = '';

    var hg_right_x_a = document.getElementById('hg-right-x-a');
    hg_right_x_a.innerHTML = '';

    clearLog();

    two.clear();
    resetStatus();

    var codeHighlight = document.getElementById('codeHighlight');
    codeHighlight.innerHTML = codeView;
    hljs.highlightBlock(codeHighlight);
    codeHighlight.style.fontSize = "20pt";

    document.getElementById('hg-left').style.width = "50%";
    document.getElementById('hg-left').style.maxWidth = "50%";
}

function pad_end_nbsp(targetLength, str) {
    var n = targetLength - str.length
    if (n <= 0) return str;

    while (n != 0) {
        str += "&nbsp;"
        --n;
    }
    return str;
}

function array_to_str(key, arr, maxKeyLen) {
    if (arr.length == 0) return '';
    
    var str = `<p id="Attribute"><b>${pad_end_nbsp(maxKeyLen, key + ":")}</b> <code>${arr[0]}</code></p>`;

    for (let i = 1; i < arr.length; ++i) {
        const e = arr[i];
        console.log(e);
        str += `<p id="Attribute"><b>${pad_end_nbsp(maxKeyLen, "")}</b> <code>${arr[i]}</code></p>`;
        // // hg_right_a.innerHTML += `<p id="Attribute"><b>${pad_end_nbsp(maxKeyLen, key + ":")}</b><code>${value}</code></p>`;
    }

    return str;
}

function showFunctionAttributes(function_name) {
    var hg_right_a = document.getElementById('hg-right-a');
    // hg_right_a.innerHTML = '';
    hg_right_a.innerHTML = `<p id="Attribute"><b>Algorithm attributes</b>:</p>`;
    hg_right_a.innerHTML += `<p id="Attribute">&nbsp;</p>`;

    var attrs = std_lib_attributes()[function_name];
    var maxKeyLen = 0;
    for (var key in attrs) {
        if (key.length > maxKeyLen) maxKeyLen = key.length;
    }    

    ++maxKeyLen;
    for (var key in attrs) {
        // console.log(attrs[key]);

        var value = attrs[key];

        if (value && value instanceof Array) {
            value = array_to_str(key, value, maxKeyLen);
            hg_right_a.innerHTML += value;
        } else {
            hg_right_a.innerHTML += `<p id="Attribute"><b>${pad_end_nbsp(maxKeyLen, key + ":")}</b> <code>${value}</code></p>`;
        }
    }    

    hg_right_a.innerHTML += `<p id="Attribute">&nbsp;</p>`;
    hg_right_a.innerHTML += `<p id="Attribute">&nbsp;</p>`;
    hg_right_a.innerHTML += `<p id="Attribute"><a href="/algorithms?snippet=${function_name}">Click here to see an example!</a></p>`;
}



function addVariable(name, value, seqn) {

    var initTop = defaultTopMargin + seqn * sequenceTotalHeight;

    var elems = drawVariable(two, name, value, initTop);

    var retobj = {
        name: name,
        value: value,
        elements: elems
    };

    variables[name] = retobj;
}

function find_ranges(scope) {

    if (scope == null) return [];

    var res = find_ranges(scope.parentScope);
    var keys = Object.keys(scope.properties).sort();

    for (var x in keys) {
        var key = keys[x];
        var value = scope.properties[key];
        if (value && value instanceof RangeCounted) {
            // console.log(value)
            res.push(value);
        } else if (value && value instanceof RangeBounded) {
            res.push(value);
        }
    }
    return res;
}


var prevScopeOrder = [];

function scopeComparer(a, b) {
    var ai = prevScopeOrder.indexOf(a);
    var bi = prevScopeOrder.indexOf(b);

    if (ai == -1 && bi == -1) return 0;
    if (ai == -1 && bi != -1) return 1;
    if (ai != -1 && bi == -1) return -1;

    // console.log(a)
    // console.log(b)
    // console.log(ai)
    // console.log(bi)

    if (ai < bi) return -1;
    if (ai == bi) return 0;
    return 1;
}

function scopeOrder(scope) {

    var res = [];

    var reserved = ['arguments', 'this', 'undefined', 'NaN', 'Infinity',
        'Array', 'Boolean','Date', 'Error', 'EvalError', 'Function',
        'JSON', 'Math', 'Number', 'Object', 'RangeError', 'ReferenceError',
        'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError',
        'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'self', 
        'window',
        'sequence', 'sequence_internal', 'alert', 'assign_it',
        'begin', 'log_predicate_call_internal', 'log_relation_call',
        'log_relation_call_internal', 'copy_it', 'disable_log_stats', 'enable_log_stats',
        'end',  'equal', 'find_if', 'sink', 'source', 'successor', 'remove_it',
        'print', 'array_random', 'array_all_equal', 'array_ascending', 'array_descending', 
        'relation', 'iter_swap', 'predecessor', 'predicate'];

    // 'fill_elem'

    variables = [];

    // var ranges = find_ranges(scope);


    // var keys = Object.keys(scope.properties).sort();
    var keys = Object.keys(scope.properties);

    for (var x in keys) {
        var key = keys[x];
        if ( ! reserved.includes(key)) {
            var value = scope.properties[key];
            if (value && value instanceof Sequence) {
                res.push(key);
            }
        }
    }

    for (var x in keys) {
        var key = keys[x];
        if ( ! reserved.includes(key)) {
            var value = scope.properties[key];
            if (value && value instanceof Iterator) {
                res.push(key);
            }
        }
    }

    for (var x in keys) {
        var key = keys[x];

        if ( ! reserved.includes(key)) {
            var value = scope.properties[key];
        
            if (value != undefined) {

                if (value instanceof Sequence) {
                } else if (value instanceof Iterator) {
                } else if (value instanceof RangeBounded) {
                } else if (value instanceof RangeCounted) {
                } else if (value instanceof Interpreter.Object) {
                } else {
                    res.push(key);
                }

                // if ( ! value.class) {
                //     addVariable(key, value, seqn);
                // }
            } else {
                // console.log(key);
                // console.log(value);
                // addVariable(key, value, seqn);
            }
        }
    }

    // console.log(res);
    res.sort(scopeComparer);

    return res;
}


function scopePairComparer(a, b) {

    // console.log(a)
    // console.log(b)

    var ai = prevScopeOrder.indexOf(a.key);
    var bi = prevScopeOrder.indexOf(b.key);

    if (ai == -1 && bi == -1) return 0;
    if (ai == -1 && bi != -1) return 1;
    if (ai != -1 && bi == -1) return -1;

    // console.log(a)
    // console.log(b)
    // console.log(ai)
    // console.log(bi)

    if (ai < bi) return -1;
    if (ai == bi) return 0;
    return 1;
}

// function alert2(n, its_internal) {
//     var s = "------------- " + n + '\n';
//     for (var i in its_internal) {
//         var key = its_internal[i].key;
//         var value = its_internal[i].value;
//         s += key + " - " + value.name + "\n";
//     }
//     alert(s);
// }

function drawScope(scope) {
    // console.log(scope.properties);
    prevScopeOrder = scopeOrder(scope);
    // console.log(prevScopeOrder);


    var reserved = ['arguments', 'this', 'undefined', 'NaN', 'Infinity',
        'Array', 'Boolean','Date', 'Error', 'EvalError', 'Function',
        'JSON', 'Math', 'Number', 'Object', 'RangeError', 'ReferenceError',
        'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError',
        'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'self', 
        'window',
        'sequence', 'sequence_internal', 'alert', 'assign_it',
        'begin', 'log_predicate_call_internal', 'log_relation_call',
        'log_relation_call_internal', 'copy_it', 'disable_log_stats', 'enable_log_stats',
        'end',  'equal', 'find_if', 'sink', 'source', 'successor', 'remove_it',
        'print', 'array_random', 'array_all_equal', 'array_ascending', 'array_descending',
        'relation', 'iter_swap', 'predecessor', 'predicate'];

        // 'fill_elem'

    // console.clear();
    two.clear();
    variables = [];

    var ranges = find_ranges(scope);
    // console.log(r);

    // console.log(two.width);

    // console.log(scope.properties);

    // var keys = Object.keys(scope.properties).sort();
    var keys = Object.keys(scope.properties);

    // First Sequences

    var seq_internal = [];
    var its_internal = [];
    var vars_internal = [];

    for (var x in keys) {
        var key = keys[x];
        if ( ! reserved.includes(key)) {
            var value = scope.properties[key];
            if (value && value instanceof Sequence) {
                seq_internal.push({key: key, value: value});
            }
        }
    }

    

    // console.log(keys)
    for (var x in keys) {
        var key = keys[x];
        if ( ! reserved.includes(key)) {
            var value = scope.properties[key];
            if (value && value instanceof Iterator) {
                // console.log(key)
                // console.log(value)
                // console.log(its_internal)
                its_internal.push({key: key, value: new Iterator(value.data, value.index, value.name)});

                // console.log(its_internal)
            }
        }
    }

    // if (its_internal.length >= 2) {
    //     console.log("----------- 1")
    //     console.log(its_internal)
    //     alert2(1, its_internal)
    // }

    its_internal.sort(scopePairComparer);

    // if (its_internal.length >= 2) {
    //     console.log("----------- 2")
    //     console.log(its_internal)

    //     alert2(2, its_internal)
    // }

    for (var i in its_internal) {
        var key = its_internal[i].key;
        var value = its_internal[i].value;

        var found = seq_internal.find(function(x) {
            return x.value && x.value.name == value.data.name;
        });

        if ( ! found) {
            seq_internal.push({key: value.data.name, value: value.data});
        }

    }
    // for (var x in keys) {
    //     var key = keys[x];
    //     if ( ! reserved.includes(key)) {
    //         var value = scope.properties[key];
    //         if (value && value instanceof Iterator) {

    //             var found = seq_internal.find(function(x) {
    //                 return x.value && x.value.name == value.data.name;
    //             });

    //             if ( ! found) {
    //                 seq_internal.push({key: value.data.name, value: value.data});
    //             }
    //         }
    //     }
    // }


    seq_internal.sort(scopePairComparer);

    var seqn = 0;
    for (var i in seq_internal) {
        var key = seq_internal[i].key;
        var value = seq_internal[i].value;
        // console.log(value);
        var elems = drawArray(two, key, seqn, value.data, value.colors, value.capacity, value.pred);
        sequences[value.name].elements = elems;
        ++seqn;
    }

    // var itn = 0;
    // for (var x in keys) {
    //     var key = keys[x];
    //     if ( ! reserved.includes(key)) {
    //         var value = scope.properties[key];
    //         if (value && value instanceof Iterator) {

    //             // console.log(key)
    //             // console.log(value)

    //             if ( ! value.name) {
    //                 value.name = key;
    //                 iterators_int[key] = value;
    //                 updateStatus();
    //             }

    //             if (key != value.name) {
    //                 value.name = key;
    //                 iterators_int[key] = value;
    //                 updateStatus();
    //             }


    //             // var it = new Iterator(arr, index, null);
    //             // iterators_int[name] = it;

    //             var color = iterators_colors[itn];
    //             var it_gui = drawIterator(two, value.data.elements[value.index], key, color);
    //             iterators_gui[value.name] = it_gui;
    //             ++itn;
    //         }
    //     }
    // }

    var itn = 0;

    // if (its_internal.length >= 2) {
    //     // console.log("----------- 3")
    //     // console.log(its_internal)
    //     alert2(3, its_internal)
    // }
    
    for (var i in its_internal) {
        var key = its_internal[i].key;
        var value = its_internal[i].value;

        if ( ! value.name) {
            // console.log('********************** 1')
            // console.log(value);
            value.name = key;
            // console.log(value);
            iterators_int[key] = value;
            updateStatus();
        }

        if (key != value.name) {
            // console.log('********************** 2')
            // console.log(value);
            value.name = key;
            iterators_int[key] = value;
            updateStatus();
        }

        var color = iterators_colors[itn];
        var it_gui = drawIterator(two, value.data.elements[value.index], key, color);
        iterators_gui[value.name] = it_gui;
        ++itn;
    }

    // if (its_internal.length >= 2) {
    //     // console.log("----------- 3")
    //     // console.log(its_internal)
    //     alert2(4, its_internal)
    // }


    for (var x in keys) {
        // console.log(x);
        // console.log(keys[x]);

        var key = keys[x];


        if ( ! reserved.includes(key)) {
            var value = scope.properties[key];
        
            // console.log(key);
            // console.log(scope.properties['start']);

            if (value != undefined) {

                if (value instanceof Sequence) {
                } else if (value instanceof Iterator) {
                } else if (value instanceof RangeBounded) {
                } else if (value instanceof RangeCounted) {
                } else if (value instanceof Interpreter.Object) {
                } else {
                    // addVariable(key, value, seqn);
                    vars_internal.push({key: key, value: value});
                }

                // if ( ! value.class) {
                //     addVariable(key, value, seqn);
                // }
            } else {
                // console.log(key);
                // console.log(value);
                // addVariable(key, value, seqn);
            }
        }
    }

    vars_internal.sort(scopePairComparer);
    for (var i in vars_internal) {
        var key = vars_internal[i].key;
        var value = vars_internal[i].value;
        if (key.startsWith("_")) continue;
        // console.log(key)
        // console.log(value)
        addVariable(key, value, seqn);
    }

    // console.log(ranges);

    for (var i = 0; i < ranges.length; i++) {
        var r = ranges[i];

        if (r instanceof RangeBounded) {
            // var f = scope.properties[r.fname];
            // var l = scope.properties[r.lname];

            var f = its_internal.find( x => x.key === r.fname );
            var l = its_internal.find( x => x.key === r.lname );
            
            if (f != undefined && l != undefined) {
                drawBoundedRange(f.value, l.value);
            }

        } else if (r instanceof RangeCounted) {
            // var f = scope.properties[r.fname];
            // var n = scope.properties[r.nname];

            var f = its_internal.find( x => x.key === r.fname );
            var n = vars_internal.find( x => x.key === r.nname );

            // console.log(r)
            // console.log(f)
            // console.log(n)

            if (f != undefined && n != undefined) {
                drawCountedRange(f.value, n.value);
            }
        }
    }
}


// Object.prototype.getName = function() { 
//     var funcNameRegex = /function (.{1,})\(/;
//     var results = (funcNameRegex).exec((this).constructor.toString());
//     return (results && results.length > 1) ? results[1] : "";
//  };


function inside_skipped_function(scope) {
    if (scope.parentScope == null) return false;

    for (var i = 0; i < skipped.length; i+=1) {
        // console.log("En el índice '" + i + "' hay este valor: " + skipped[i]);
        // console.log()

        if (scope.properties[skipped[i]] != undefined) {
            return true;
        }
    }

    return false;
}

function stepButton() {
    var codeHighlight = document.getElementById('codeHighlight');
    // console.log(codeHighlight.innerHTML)


    while (true) {


        // console.log(myInterpreter)
        // console.log(myInterpreter.stateStack)

        if (myInterpreter.stateStack.length) {
            // console.log("stepButton 1");
            var node = myInterpreter.stateStack[myInterpreter.stateStack.length - 1].node;
            // var scope = myInterpreter.stateStack[myInterpreter.stateStack.length - 1].scope;
            var scope = myInterpreter.getScope();
            var start = node.start;
            var end = node.end;
        } else {
            // console.log("stepButton 2");
            var start = 0;
            var end = 0;
        }
        // createSelection(start, end);


        var codeAll = getAllCode();
        var codeView = getViewCode();

        try {
            var ok = myInterpreter.step();
        } finally {
            if (!ok) {
                disable('disabled');
                // console.log('break 2')

                var codeHighlight = document.getElementById('codeHighlight');
                codeHighlight.innerHTML = codeView;
                hljs.highlightBlock(codeHighlight);
        
                break;
            }
        }

        // console.log('-----------------------');
        // console.log(start);
        // console.log(end);

        if (start < invisibleCode().length) {
            //console.log('continue 0')
            continue;
        }
        start -= invisibleCode().length;
        end -= invisibleCode().length;

        // console.log(start);
        // console.log(end);
        // console.log('-----------------------');

        var codeSelected = codeView.substring(start, end);
        // console.log(codeSelected);

        var codeHtml = [codeView.slice(0, end), "</mark>", codeView.slice(end)].join('');
            codeHtml = [codeHtml.slice(0, start), "<mark>", codeHtml.slice(start)].join('');
        // console.log(codeHtml);
        var codeHighlight = document.getElementById('codeHighlight');
        codeHighlight.innerHTML = codeHtml;
        hljs.highlightBlock(codeHighlight);



        // console.log(node);


        if (codeSelected.length == 1) {
            //console.log('continue 1')
            continue;
        }

        var countLineEnd = (codeSelected.match(/\n/g) || []).length;
        // console.log(countLineEnd);

        if (countLineEnd > 1) {
            //console.log('continue 2')
            continue;
        }

        if (codeSelected[0] == '[' && codeSelected[codeSelected.length - 1] == ']') {
            //console.log('continue 3')
            continue;
        }

        // if (lines.indexOf(codeSelected) != -1) {
        //     continue;
        // }
        // var found = lines.findIndex(function(l) {
        //     return l.includes(codeSelected);
        // });
        // if (found != -1) {
        //     continue;
        // }

        // console.log(prevLine)
        // console.log(codeSelected)
        if (prevLine.includes(codeSelected)) {
            // prevLine = codeSelected;
            //console.log('continue 4')
            continue;
        }

        if (prevLine2.includes(codeSelected)) {
            continue;
        }

        if (node.type == 'Literal') {
            //console.log('continue 5')
            // console.log(node);
            continue;
        }

        if (node.expression && node.expression.callee && node.expression.callee.name == 'skip_debug') {
            //console.log('continue 6')
            // console.log(node.expression.callee.name);
            // console.log(node);
            continue;
        }

        if (node.callee && node.callee.name == 'skip_debug') {
            //console.log('continue 7')
            // console.log(node.expression.callee.name);
            // console.log(node);
            continue;
        }

        if (node.name && node.name == 'skip_debug') {
            //console.log('continue 8')
            // console.log(node.expression.callee.name);
            // console.log(node);
            continue;
        }

        if (inside_skipped_function(scope)) {
            //console.log('continue 9')
            continue;
        }


        // console.log(codeSelected);
        // console.log(myInterpreter.stateStack);
        // console.log(scope);
        // console.log(node);
        // console.log(node.type);
        // console.log(node.getName);



        // console.log('*********************')
        // console.log(node.type);
        // console.log(prevNodeType);
        // console.log('*********************')


        // console.log(codeSelected);
        // console.log(prevLine);

        prevLine2 = codeSelected;


        if (node.type == 'CallExpression' && prevNodeType == 'BlockStatement') {
            prevNodeType = node.type;
            //console.log('continue 11')
            continue;
        }

        if (node.type == 'ReturnStatement' && prevNodeType == 'BlockStatement') {
            prevNodeType = node.type;
            //console.log('continue 11')
            continue;
        }

        if (node.type == 'VariableDeclaration' && prevNodeType == 'CallExpression') {
            prevNodeType = node.type;
            //console.log('continue 12')
            continue;
        }


        prevNodeType = node.type;

        if (node.type == 'BlockStatement') {
            //console.log('continue 10')
            // console.log(node);
            continue;
        }


        if (prevNode != null && prevNode.type == 'VariableDeclaration') {
            if (prevNode.declarations[0].init.callee && prevNode.declarations[0].init.callee.name == "source") {
                if (log_stats_enabled) {
                    ++stats_assigments;
                    updateStatus();
                }
            }
        }


        prevLine = codeSelected;
        prevNode = node;

        

        // console.log('-----------------------------------')
        drawScope(scope);



        // if (countLineEnd == 0) {
        //     break;
        // }

        // lines.push(codeSelected);

        // console.log('break 1')
        break;
    }
}

function runButton() {
    disable('disabled');
    myInterpreter.run();
}

function disable(disabled) {
    document.getElementById('stepButton').disabled = disabled;
    // document.getElementById('runButton').disabled = disabled;
}

function createSelection(start, end) {
    var field = document.getElementById('codeArea');
    if (field.createTextRange) {
        var selRange = field.createTextRange();
        selRange.collapse(true);
        selRange.moveStart('character', start);
        selRange.moveEnd('character', end);
        selRange.select();
    } else if (field.setSelectionRange) {
        field.setSelectionRange(start, end);
    } else if (field.selectionStart) {
        field.selectionStart = start;
        field.selectionEnd = end;
    }
    field.focus();
}