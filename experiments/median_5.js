function select_0_2(a, b, r) {
    return r(b, a) ? b : a;
}

function select_1_4_ab_cd(a, b, c, d, r) {
    return r(c, a) ? // c < a
        select_0_2(a, d, r)
        : select_0_2(b, c, r);
}

function select_1_4_ab(a, b, c, d, e, r) {
    return r(d, c) ? // d < c
        select_1_4_ab_cd(a, b, d, c, r)
        : select_1_4_ab_cd(a, b, c, d, r)
}

function select_2_5_ab_cd(a, b, c, d, e, r) {
    return r(c, a) 
        ? (select_1_4_ab(_a, _b, _d, _e, r))
        : (select_1_4_ab(_c, _d, _b, _e, r));
}

function select_2_5_ab(a, b, c, d, e, r) {
    return r(d, c)
        ? (select_2_5_ab_cd(_a, _b, _d, _c, _e, r))
        : (select_2_5_ab_cd(_a, _b, _c, _d, _e, r));
}

function select_2_5(a, b, c, d, e, r) {
    return r(b, a)
        ? (select_2_5_ab(_b, _a, _c, _d, _e, r))
        : (select_2_5_ab(_a, _b, _c, _d, _e, r));
}
