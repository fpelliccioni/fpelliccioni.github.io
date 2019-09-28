function print(f) {
    var fString = f.toString();
    console.log(fString);
}

var myFunction = function () {
// Any codes here
console.log('This is myFunction');
};

print(myFunction)

// var fString = myFunction.toString();
// console.log(fString);

// var fn = new Function('return ' + fString)(); 
// fn();

// fn = Function('return ' + fString)(); 
// fn();
