// import { stable_sort } from 'stable_sort.mjs';
const tao = require('./stable_sort');

class Block {
    constructor(id, time) {
      this.id = id;
      this.time = time;
    }
}

function lt(a, b){
    return a.time < b.time;
}

// ------------------------------------------------------------

function max(a, b, r) {
    return r(b, a) ? a : b;
}

function median_3_ab(a, b, c, r) {
    // precondition: a <= b
    
    return !r(c, b)
        ? b :           // a, b, c are sorted
        max(a, c, r); // b is not the median
}

function median_3(a, b, c, r) {
    return r(b, a)
        ? median_3_ab(b, a, c, r)
        : median_3_ab(a, b, c, r);
}

// ------------------------------------------------------------

// // unstable
// function median_3_generated(a, b, c, r) {
//     if (r(a, b)) {
//         if (r(a, c)) {
//             if (r(b, c)) {
//                 return b;
//             } else {
//                 return c;
//             }
//         } else {
//             return a;
//         }
//     } else {
//         if (r(a, c)) {
//             return a;
//         } else {
//             if (r(b, c)) {
//                 return c;
//             } else {
//                 return b;
//             }
//         }
//     }
// }

function median_3_generated_stable(a, b, c, r) {
    if (r(b, a)) {              
        if ( ! r(c, b)) {       // b < a          
            if ( ! r(c, a)) {   // b < a && b <= c: 
                return a;       // b < a && b <= c && a <= c: bac
            } else {
                return c;       // b < a && b <= c && c < a:  bca
            }
        } else {                
            return b;           // c < b && b < a: cba
        }
    } else {                    
        if ( ! r(c, b)) {       // a <= b
            return b;           // a <= b && b <= c
        } else {                
            if ( ! r(c, a)) {      // a <= b && c < b:  [a|c]b
                return c;       // a <= b && c < b && a <= c:  acb
            } else {
                return a;       // a <= b && c < b && c < a:  cab
            }
        }
    }
}

// ------------------------------------------------------------

// function median_5_generated(a, b, c, d, e, r) {
//     if (r(a, b)) {
//         if (r(c, d)) {
//             if (r(a, c)) {
//                 if (r(b, e)) {
//                     if (r(b, c)) {
//                         if (r(c, e)) {
//                             return c;
//                         } else {
//                             return e;
//                         }
//                     } else {
//                         if (r(b, d)) {
//                             return b;
//                         } else {
//                             return d;
//                         }
//                     }
//                 } else {
//                     if (r(c, e)) {
//                         if (r(d, e)) {
//                             return d;
//                         } else {
//                             return e;
//                         }
//                     } else {
//                         if (r(b, c)) {
//                             return b;
//                         } else {
//                             return c;
//                         }
//                     }
//                 }
//             } else {
//                 if (r(d, e)) {
//                     if (r(a, d)) {
//                         if (r(b, d)) {
//                             return b;
//                         } else {
//                             return d;
//                         }
//                     } else {
//                         if (r(a, e)) {
//                             return a;
//                         } else {
//                             return e;
//                         }
//                     }
//                 } else {
//                     if (r(a, e)) {
//                         if (r(b, e)) {
//                             return b;
//                         } else {
//                             return e;
//                         }
//                     } else {
//                         if (r(a, d)) {
//                             return a;
//                         } else {
//                             return d;
//                         }
//                     }
//                 }
//             }
//         } else {
//             if (r(a, d)) {
//                 if (r(b, e)) {
//                     if (r(b, d)) {
//                         if (r(d, e)) {
//                             return d;
//                         } else {
//                             return e;
//                         }
//                     } else {
//                         if (r(b, c)) {
//                             return b;
//                         } else {
//                             return c;
//                         }
//                     }
//                 } else {
//                     if (r(d, e)) {
//                         if (r(c, e)) {
//                             return c;
//                         } else {
//                             return e;
//                         }
//                     } else {
//                         if (r(b, d)) {
//                             return b;
//                         } else {
//                             return d;
//                         }
//                     }
//                 }
//             } else {
//                 if (r(c, e)) {
//                     if (r(a, c)) {
//                         if (r(b, c)) {
//                             return b;
//                         } else {
//                             return c;
//                         }
//                     } else {
//                         if (r(a, e)) {
//                             return a;
//                         } else {
//                             return e;
//                         }
//                     }
//                 } else {
//                     if (r(a, e)) {
//                         if (r(b, e)) {
//                             return b;
//                         } else {
//                             return e;
//                         }
//                     } else {
//                         if (r(a, c)) {
//                             return a;
//                         } else {
//                             return c;
//                         }
//                     }
//                 }
//             }
//         }
//     } else {
//         if (r(c, d)) {
//             if (r(a, d)) {
//                 if (r(c, e)) {
//                     if (r(a, e)) {
//                         if (r(a, c)) {
//                             return c;
//                         } else {
//                             return a;
//                         }
//                     } else {
//                         if (r(b, e)) {
//                             return e;
//                         } else {
//                             return b;
//                         }
//                     }
//                 } else {
//                     if (r(a, c)) {
//                         if (r(a, e)) {
//                             return e;
//                         } else {
//                             return a;
//                         }
//                     } else {
//                         if (r(b, c)) {
//                             return c;
//                         } else {
//                             return b;
//                         }
//                     }
//                 }
//             } else {
//                 if (r(b, e)) {
//                     if (r(d, e)) {
//                         if (r(b, d)) {
//                             return d;
//                         } else {
//                             return b;
//                         }
//                     } else {
//                         if (r(c, e)) {
//                             return e;
//                         } else {
//                             return c;
//                         }
//                     }
//                 } else {
//                     if (r(b, d)) {
//                         if (r(b, c)) {
//                             return c;
//                         } else {
//                             return b;
//                         }
//                     } else {
//                         if (r(d, e)) {
//                             return e;
//                         } else {
//                             return d;
//                         }
//                     }
//                 }
//             }
//         } else {
//             if (r(a, c)) {
//                 if (r(d, e)) {
//                     if (r(a, e)) {
//                         if (r(a, d)) {
//                             return d;
//                         } else {
//                             return a;
//                         }
//                     } else {
//                         if (r(b, e)) {
//                             return e;
//                         } else {
//                             return b;
//                         }
//                     }
//                 } else {
//                     if (r(a, d)) {
//                         if (r(a, e)) {
//                             return e;
//                         } else {
//                             return a;
//                         }
//                     } else {
//                         if (r(b, d)) {
//                             return d;
//                         } else {
//                             return b;
//                         }
//                     }
//                 }
//             } else {
//                 if (r(b, e)) {
//                     if (r(c, e)) {
//                         if (r(b, c)) {
//                             return c;
//                         } else {
//                             return b;
//                         }
//                     } else {
//                         if (r(d, e)) {
//                             return e;
//                         } else {
//                             return d;
//                         }
//                     }
//                 } else {
//                     if (r(b, c)) {
//                         if (r(b, d)) {
//                             return d;
//                         } else {
//                             return b;
//                         }
//                     } else {
//                         if (r(c, e)) {
//                             return e;
//                         } else {
//                             return c;
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }

function median_5_generated_stable(a, b, c, d, e, r) {
    if ( ! r(b, a)) {
        if ( ! r(d, c)) {
            if ( ! r(c, a)) {
                if ( ! r(e, b)) {
                    if ( ! r(c, b)) {
                        if ( ! r(e, c)) {
                            return c;
                        } else {
                            return e;
                        }
                    } else {
                        if ( ! r(d, b)) {
                            return b;
                        } else {
                            return d;
                        }
                    }
                } else {
                    if ( ! r(e, c)) {
                        if ( ! r(e, d)) {
                            return d;
                        } else {
                            return e;
                        }
                    } else {
                        if ( ! r(c, b)) {
                            return b;
                        } else {
                            return c;
                        }
                    }
                }
            } else {
                if ( ! r(e, d)) {
                    if ( ! r(d, a)) {
                        if ( ! r(d, b)) {
                            return b;
                        } else {
                            return d;
                        }
                    } else {
                        if ( ! r(e, a)) {
                            return a;
                        } else {
                            return e;
                        }
                    }
                } else {
                    if ( ! r(e, a)) {
                        if ( ! r(e, b)) {
                            return b;
                        } else {
                            return e;
                        }
                    } else {
                        if ( ! r(d, a)) {
                            return a;
                        } else {
                            return d;
                        }
                    }
                }
            }
        } else {
            if ( ! r(d, a)) {
                if ( ! r(e, b)) {
                    if ( ! r(d, b)) {
                        if ( ! r(e, d)) {
                            return d;
                        } else {
                            return e;
                        }
                    } else {
                        if ( ! r(c, b)) {
                            return b;
                        } else {
                            return c;
                        }
                    }
                } else {
                    if ( ! r(e, d)) {
                        if ( ! r(e, c)) {
                            return c;
                        } else {
                            return e;
                        }
                    } else {
                        if ( ! r(d, b)) {
                            return b;
                        } else {
                            return d;
                        }
                    }
                }
            } else {
                if ( ! r(e, c)) {
                    if ( ! r(c, a)) {
                        if ( ! r(c, b)) {
                            return b;
                        } else {
                            return c;
                        }
                    } else {
                        if ( ! r(e, a)) {
                            return a;
                        } else {
                            return e;
                        }
                    }
                } else {
                    if ( ! r(e, a)) {
                        if ( ! r(e, b)) {
                            return b;
                        } else {
                            return e;
                        }
                    } else {
                        if ( ! r(c, a)) {
                            return a;
                        } else {
                            return c;
                        }
                    }
                }
            }
        }
    } else {
        if ( ! r(d, c)) {
            if ( ! r(d, a)) {
                if ( ! r(e, c)) {
                    if ( ! r(e, a)) {
                        if ( ! r(c, a)) {
                            return c;
                        } else {
                            return a;
                        }
                    } else {
                        if ( ! r(e, b)) {
                            return e;
                        } else {
                            return b;
                        }
                    }
                } else {
                    if ( ! r(c, a)) {
                        if ( ! r(e, a)) {
                            return e;
                        } else {
                            return a;
                        }
                    } else {
                        if ( ! r(c, b)) {
                            return c;
                        } else {
                            return b;
                        }
                    }
                }
            } else {
                if ( ! r(e, b)) {
                    if ( ! r(e, d)) {
                        if ( ! r(d, b)) {
                            return d;
                        } else {
                            return b;
                        }
                    } else {
                        if ( ! r(e, c)) {
                            return e;
                        } else {
                            return c;
                        }
                    }
                } else {
                    if ( ! r(d, b)) {
                        if ( ! r(c, b)) {
                            return c;
                        } else {
                            return b;
                        }
                    } else {
                        if ( ! r(e, d)) {
                            return e;
                        } else {
                            return d;
                        }
                    }
                }
            }
        } else {
            if ( ! r(c, a)) {
                if ( ! r(e, d)) {
                    if ( ! r(e, a)) {
                        if ( ! r(d, a)) {
                            return d;
                        } else {
                            return a;
                        }
                    } else {
                        if ( ! r(e, b)) {
                            return e;
                        } else {
                            return b;
                        }
                    }
                } else {
                    if ( ! r(d, a)) {
                        if ( ! r(e, a)) {
                            return e;
                        } else {
                            return a;
                        }
                    } else {
                        if ( ! r(d, b)) {
                            return d;
                        } else {
                            return b;
                        }
                    }
                }
            } else {
                if ( ! r(e, b)) {
                    if ( ! r(e, c)) {
                        if ( ! r(c, b)) {
                            return c;
                        } else {
                            return b;
                        }
                    } else {
                        if ( ! r(e, d)) {
                            return e;
                        } else {
                            return d;
                        }
                    }
                } else {
                    if ( ! r(c, b)) {
                        if ( ! r(d, b)) {
                            return d;
                        } else {
                            return b;
                        }
                    } else {
                        if ( ! r(e, c)) {
                            return e;
                        } else {
                            return c;
                        }
                    }
                }
            }
        }
    }
}

// ------------------------------------------------------------

function perm(xs) {
    let ret = [];
  
    for (let i = 0; i < xs.length; i = i + 1) {
        let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

        if ( ! rest.length) {
            ret.push([xs[i]])
        } else {
            for (let j = 0; j < rest.length; j = j + 1) {
                ret.push([xs[i]].concat(rest[j]))
            }
        }
    }
    return ret;
}

function iota(n) {
    var res = [];
    for (let i = 0; i < n; ++i) {
        res.push(i + 1);
    }
    return res;
}

function copy_array(arr) {
    var res = [];
    for (let i = 0; i < arr.length; ++i) {
        const element = arr[i];
        res.push(new Block(element.id, element.time));
    }
    return res;
}

function create_blocks(data) {
    var res = [];
    for (let i = 0; i < data.length; ++i) {
        res.push(new Block(i, data[i]));
    }
    return res;
}

function remove_duplicates(arr) {
    var arr_str = [];
    for (let i = 0; i < arr.length; ++i) {
        arr_str.push(JSON.stringify(arr[i]));
    }

    arr_str = [...new Set(arr_str)];
    
    var res = [];
    for (let i = 0; i < arr_str.length; ++i) {
        var obj = JSON.parse(arr_str[i]);
        res.push(obj);
    }
    return res;
}

function generate_data() {
    var data = [];
    for (var i = 0; i < arguments.length; ++i) {
        data.push(...perm(arguments[i]));
    }    
    data = remove_duplicates(data);
    return data;
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

function generate_data_random(n) {
    var res = [];
    var q = Math.pow(n, n + 1);
    for (let i = 0; i < q; ++i) {
        var data = array_random(n, 0, n);
        res.push(data);
    }
    
    return res;

}




// --------------------------------------------------

function exec_n3(data) {
    for (let i = 0; i < data.length; ++i) {
        const element = data[i];
        var blocks_orig = create_blocks(element);

        blocks = copy_array(blocks_orig);
        tao.stable_sort(blocks, lt)
        var expect = blocks[1];

        blocks = copy_array(blocks_orig);
        // var m1 = median_3_generated(blocks[0], blocks[1], blocks[2], lt);
        var m1 = median_3_generated_stable(blocks[0], blocks[1], blocks[2], lt);

        if (expect.id == m1.id) {
            // console.log("OK    ", element, expect.id, m1.id);
        } else {
            console.log("ERROR ", element, expect.id, m1.id);
        }
    }
}

function exec_n5(data) {
    for (let i = 0; i < data.length; ++i) {
        const element = data[i];
        var blocks_orig = create_blocks(element);

        blocks = copy_array(blocks_orig);
        tao.stable_sort(blocks, lt)
        var expect = blocks[2];

        blocks = copy_array(blocks_orig);
        // var m1 = median_5_generated(blocks[0], blocks[1], blocks[2], blocks[3], blocks[4], lt);
        var m1 = median_5_generated_stable(blocks[0], blocks[1], blocks[2], blocks[3], blocks[4], lt);

        if (expect.id == m1.id) {
            // console.log("OK    ", element, expect.id, m1.id);
        } else {
            console.log("ERROR ", element, expect.id, m1.id);
        }
    }
}



function main() {
    // n=3
    // var data = generate_data([1, 1, 1],
    //                          [1, 2, 3],
    //                          [1, 2, 2],
    //                          [1, 1, 2]);
    // exec_n3(data);
    // var data = generate_data_random(3);
    // exec_n3(data);


    // n=5
    // var data = generate_data(
    //     [1, 2, 3, 4, 5],

    //     [1, 1, 2, 3, 4],
    //     [1, 1, 1, 2, 3],
    //     [1, 1, 1, 1, 2],
    //     [1, 1, 1, 1, 1],
        
    //     [1, 2, 2, 3, 4],
    //     [1, 2, 2, 2, 3],
    //     [1, 2, 2, 2, 2],

    //     [1, 2, 3, 3, 4],
    //     [1, 2, 3, 3, 3],

    //     [1, 2, 3, 4, 4],
    // );

    // var data = [
    // ];
    
    var data = generate_data_random(5);
    exec_n5(data);
}

main();






    
    // n=3
    // var data = [
    //     nodes.push(...res_left[1]);
    //     [[1, 2, 3], 1],
    //     [[1, 3, 2], 2],
    //     [[3, 1, 2], 2],
    //     [[3, 2, 1], 1],
    //     [[2, 3, 1], 0],
    //     [[2, 1, 3], 0],

    //     [[1, 2, 2], 1],
    //     [[2, 1, 2], 0],
    //     [[2, 2, 1], 0],
    //     [[1, 1, 2], 1],
    //     [[2, 1, 1], 2],
    //     [[1, 2, 1], 2],

    //     [[1, 1, 1], 1],
    // ];

    // var data = [
    //     [1, 1, 1],
    // ];
    // data.push(...perm([1, 2, 3]));
    // data.push(...perm([1, 2, 2]));
    // data.push(...perm([1, 1, 2]));
    // data = remove_duplicates(data);
