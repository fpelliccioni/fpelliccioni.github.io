function select_0_2(a, b, r) {
    return r(b, a) ? b : a;
}

function select_1_4_ab_cd(a, b, c, d, r) {
    return r(c, a) ? // c < a
        select_0_2(a, d, r)
        : select_0_2(b, c, r);
}

function select_1_4_ab(a, b, c, d, r) {
    return r(d, c) ? // d < c
        select_1_4_ab_cd(a, b, d, c, r)
        : select_1_4_ab_cd(a, b, c, d, r)
}

function select_2_5_ab_cd(a, b, c, d, e, r) {
    return r(c, a) 
        ? (select_1_4_ab(a, b, d, e, r))
        : (select_1_4_ab(c, d, b, e, r));
}

function select_2_5_ab(a, b, c, d, e, r) {
    return r(d, c)
        ? (select_2_5_ab_cd(a, b, d, c, e, r))
        : (select_2_5_ab_cd(a, b, c, d, e, r));
}

function select_2_5(a, b, c, d, e, r) {
    return r(b, a)
        ? (select_2_5_ab(b, a, c, d, e, r))
        : (select_2_5_ab(a, b, c, d, e, r));
}



module.exports = {
    select_2_5_ab_cd: select_2_5_ab_cd,
    select_2_5: select_2_5,
}



