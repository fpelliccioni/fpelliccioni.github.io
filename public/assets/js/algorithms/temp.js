var r = range_bounded("f", "l");

function linear_insert(f, current, r) {
  var value = source(current);
  while ( ! equal(f, current) && r(value, source(predecessor(current)))) {
    sink(current, source(predecessor(current)));
    current = predecessor(current);
  }
  sink(current, value); 
  return current;
}

function insertion_sort_classic(f, l, r) {
    if (equal(f, l)) return; 
    var current = successor(f);
    while ( ! equal(current, l)) {
        linear_insert(f, current, r);     
        current = successor(current);
    }
}
  
var rel = relation(function(x, y) { return x < y; }, 'less');
var s = add_sequence(random_array(), "s");
print(s);
insertion_sort_classic(begin(s), end(s), rel);
print(s);
print('...');`
