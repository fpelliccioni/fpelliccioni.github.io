// --------------------------------------------------
// Stable Sort using Insertion Sort
// --------------------------------------------------



// Primitives
// --------------------------------------------------

class Iterator {
    constructor(seq, pos) {
      this.seq = seq;
      this.pos = pos;
    }
}

function begin(seq) {
    var it = new Iterator(seq, 0);
    return it;
}

function end(seq, name) {
    var it = new Iterator(seq, seq.length);
    return it;
}

function successor(it_par, step_par = 1) {
    step = 0 + step_par;
    var seq = it_par.seq;
    var max = seq.length;

    if (it_par.pos + step > max) {
        throw 'out of range';
    }

    var it = new Iterator(it_par.seq, it_par.pos + step);
    return it;
}

function predecessor(it_par, step_par = 1) {
    step = 0 + step_par;
    if (it_par.pos - step < 0) {
        throw 'out of range';
    }

    var it = new Iterator(it_par.seq, it_par.pos - step);
    return it;
}

function equal(a, b) {
    var res = a.pos == b.pos;
    return res;
}

function distance(a, b) {
    var res = b.pos - a.pos;
    return res;
}

function source(it) {
    var seq = it.seq;
    var max = seq.length;

    if (it.pos >= max) {
        throw 'not valid iterator to take the source.';
    }

    var s = seq[it.pos];
    return s;
}

function source_move(it) {
    var seq = it.seq;
    var max = seq.length;

    if (it.pos >= max) {
        throw 'not valid iterator to take the source.';
    }

    var s = seq[it.pos];
    seq[it.pos] = undefined;
    return s;
}

function sink(it, x) {
    var seq = it.seq;

    var max = seq.length;
    if (it.pos >= max) {
        throw 'not valid iterator to take the source.';
    }
    seq[it.pos] = x;
}

function sink_move(it, x) {
    var seq = it.seq;

    var max = seq.length;
    if (it.pos >= max) {
        throw 'not valid iterator to take the source.';
    }

    seq[it.pos] = x;
}

function bind(r, value, arg) {
    return function(x) { 
        return r(value, x);
    };
}


// -------------------------------------------------

function min_element_nonempty(f, l, r) {
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

function shift_right_while_unguarded(l, p) {
    while (p(source(predecessor(l)))) {
        sink_move(l, source_move(predecessor(l)));
        l = predecessor(l);
    }
    return l;
}

function linear_insert_unguarded(c, r) {
    if ( ! r(source(c), source(predecessor(c)))) return c;

    var value = source_move(c);
    var d = shift_right_while_unguarded(c, bind(r, value));
    sink_move(d, value);
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

function move_backward(f_i, l_i, l_o) {
    while (! equal(f_i, l_i)) {
        l_i = predecessor(l_i);
        l_o = predecessor(l_o);
        sink_move(l_o, source(l_i));
    } 
    return l_o;
}

function rotate_right_by_one_nonempty(f, l) {
    var butlast = predecessor(l);
    var x = source_move(butlast);
    move_backward(f, butlast, l);
    sink_move(f, x);
}

function insertion_sort(f, l, r) {
    if (equal(f, l)) return; 
    var c = successor(f);
    if (equal(c, l)) return;

    // create a sentinel
    var min = min_element_nonempty(f, l, r);
    if (! equal(min, f)) {
        rotate_right_by_one_nonempty(f, successor(min));
    }
    insertion_sort_suffix_nonempty(c, l, r);
}

function stable_sort(s, r) {
    insertion_sort(begin(s), end(s), r);
}

// --------------------------------------------------

// function tao() {
//     this.stable_sort = function(s, r) {
//         stable_sort(s, r);
//     }
// }
  
// module.exports = tao;

module.exports = {
    stable_sort: function(s, r) {
        stable_sort(s, r);
    }
 }

// --------------------------------------------------


// function main() {
    
//     var stable_data = [
//         [[1, 2, 3], 1],
//         [[1, 3, 2], 2],
//         [[3, 1, 2], 2],
//         [[3, 2, 1], 1],
//         [[2, 3, 1], 0],
//         [[2, 1, 3], 0],

//         [[1, 2, 2], 1],
//         [[2, 1, 2], 0],
//         [[2, 2, 1], 0],
//         [[1, 1, 2], 1],
//         [[2, 1, 1], 2],
//         [[1, 2, 1], 2],

//         [[1, 1, 1], 1],
//     ];



//     function lt(x, y) {return x < y;};

//     var s = [4, 3, 1, 5, 2];

//     console.log(s);
//     // insertion_sort(begin(s), end(s), lt);
//     stable_sort(s, lt);
//     console.log(s);
// }

// main();

