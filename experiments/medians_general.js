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



// -----------------------------------------------------------------------------------------------------------------------

function select_1_2(a, b, r) {
    return r(b, a) ? a : b;
}

function select_1_3_ab(a, b, c, r) {
    // precondition: a <= b
    return ! r(c, b) ?                      //!(c < b) -> c >= b
                b :                         // a, b, c are sorted
                select_1_2(a, c, r)         // b is not the median
}

function select_2_3(a, b, c, r) {
    return select_1_2(select_1_2(a, b, r), 
                      c, r);
}

function select_2_5_ac_ae_bc_bd(a, b, c, d, e, r) {
    // precondition: a <= c && a <= e && b <= c && b <= d
    if ( ! r(e, d)) {
        return select_1_3_ab(a, c, d, r);
    } else {
        return select_1_3_ab(b, c, e, r);
    }
}

// function select_3_5_ab_cd_eb(a, b, c, d, e, r) {
//     // precondition: a <= b && b <= e && c <= d
//     if ( ! r(d, b)) {
//         return select_1_2(b, c, r);
//     } else {
//         return select_2_3(a, d, e, r);
//     }
// }

//TODO: no es estable
function select_3_5_ab_cd_eb(a, b, c, d, e, r) {
    // precondition: a < b && b < e && c < d

    if ( ! r(d, b)) {
        if ( ! r(c, b)) {
            return c;
        } else {
            return b;
        }
    } else {
        if ( ! r(d, a)) {
            if ( ! r(e, d)) {
                return e;
            } else {
                return d;
            }
        } else {
            if ( ! r(e, a)) {
                return e;
            } else {
                return a;
            }
        }
    }
}





function median_7_abd_cd_ef_fb(a, b, c, d, e, f, g, r) {
    // if (b < f) {
    //     return median_7_abd_cd_ef_bf(a, b, c, d, e, f, g, r);
    // } else {
    //     return median_7_abd_cd_ef_fb(a, b, c, d, f, e, g, r);
    // }
}

function median_7_abd_cd_ef_bf(a, b, c, d, e, f, g, r) {
    if (c < e) {
        return median_7_abd_cd_ef_bf(a, b, c, d, e, f, g, r);
    } else {
        return median_7_abd_cd_ef_fb(a, b, c, d, f, e, g, r);
    }
}

function median_7_abd_cd_ef(a, b, c, d, e, f, g, r) {
    if (b < f) {
        return median_7_abd_cd_ef_bf(a, b, c, d, e, f, g, r);
    } else {
        return median_7_abd_cd_ef_fb(a, b, c, d, f, e, g, r);
    }
}

function median_7_abd_cd(a, b, c, d, e, f, g, r) {
    if (e < f) {
        return median_7_abd_cd_ef(a, b, c, d, e, f, g, r);
    } else {
        return median_7_abd_cd_ef(a, b, c, d, f, e, g, r);
    }
}

function median_7_ab_cd(a, b, c, d, e, f, g, r) {
    if (b < d) {
        return median_7_abd_cd(a, b, c, d, e, f, g, r);
    } else {
        return median_7_ab_cd_db(a, b, c, d, e, f, g, r);
    }
}

function median_7_ab(a, b, c, d, e, f, g, r) {
    if (c < d) {
        return median_7_ab_cd(a, b, c, d, e, f, g, r);
    } else {
        return median_7_ab_cd(a, b, d, c, e, f, g, r);
    }
}

function median_7(a, b, c, d, e, f, g, r) {
    if (a < b) {
        return median_7_ab(a, b, c, d, e, f, g, r);
    } else {
        return median_7_ab(b, a, c, d, e, f, g, r);
    }
}

// function median_7_generated_stable(a, b, c, d, e, f, g, r) {
// }


// module.exports = {
//     median_3_generated_unstable: median_3_generated_unstable,
//     median_3_generated_stable: median_3_generated_stable,
// }
