function median_3_generated_unstable(a, b, c, r) {
    if (r(a, b)) {
        if (r(a, c)) {
            if (r(b, c)) {
                return b;
            } else {
                return c;
            }
        } else {
            return a;
        }
    } else {
        if (r(a, c)) {
            return a;
        } else {
            if (r(b, c)) {
                return c;
            } else {
                return b;
            }
        }
    }
}

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

module.exports = {
    median_3_generated_unstable: median_3_generated_unstable,
    median_3_generated_stable: median_3_generated_stable,
}
