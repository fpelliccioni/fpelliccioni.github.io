function log_relation_call(r, name, x, y) {
    var res = r(x, y);
    console.log(`${name}(${x}, ${y}) = ${res}`);
    return res;
}

function relation(_r, _name) {
    var code = "(function " + _name + "(x, y) {return log_relation_call(_r, \"" + _name + "\", x, y);})";
    var func = eval(code);
    func.inner_relation = _r;
    func.inner_name = _name;
    return func;
}

function complement(_r) {
    var _cr = function(x, y) { return !_r.inner_relation(x, y); };
    var code = "(function complement_of_" + _r.inner_name + "(x, y) {return log_relation_call(_cr, \"\\u00AC" + _r.inner_name + "\", x, y);})";
    var func = eval(code);
    func.inner_relation = _cr;
    func.inner_name = "\\u00AC" + _r.inner_name;
    return func;
}

// converse r (a, b) ⇔ r(b, a)
// complement of converse r (a, b) ⇔ ¬r(b, a)

function converse(_r) {
    var _cr = function(x, y) { return _r.inner_relation(y, x); };
    var code = "(function converse_of_" + _r.inner_name + "(x, y) {return log_relation_call(_cr, \"" + _r.inner_name + "\", y, x);})";
    var func = eval(code);
    func.inner_relation = _cr;
    // func.inner_name = _r.inner_name;
    return func;
}


function bind(r, value, arg=0) {
    if (arg == 0)
        return function(x) { return r(value, x);};
    
    return function(x) { return r(x, value);};
}


const less = relation(function(x, y) { return x < y; }, 'less');

// console.log(less(1, 2))
// console.log(less(1, 1))
// console.log(less(2, 1))
// // console.log(less.name)
// // console.log(less.inner_relation)
// // console.log(less.inner_name)


// const less_comp = complement(less);
// console.log(less_comp(1, 2))
// console.log(less_comp(1, 1))
// console.log(less_comp(2, 1))
// // console.log(less_comp.name)
// // console.log(less_comp.inner_relation)
// // console.log(less_comp.inner_name)


const pred = bind(less, 9)

console.log(pred(8))
console.log(pred(9))
console.log(pred(10))
