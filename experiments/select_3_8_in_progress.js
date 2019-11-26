const select6 = require('./select_2_6_in_progress');

// level 6b
function select_3_8_abd_cd_efh_gh_bf(a,b,c,d,e,f,g,h,r) {
    return select6.select_2_6_ac_bc_de_ae(b,c,d,e,f,g,r);
}

// level 6
function select_3_8_abd_cd_efh_gh(a,b,c,d,e,f,g,h,r) {
    if ( ! r(f, b)) {
        return select_3_8_abd_cd_efh_gh_bf(a,b,c,d,e,f,g,h,r);
    } else {
        return select_3_8_abd_cd_efh_gh_bf(e,f,g,h,a,b,c,d,r);
    }
}

// level 5, like level 2, but using e, f, g and h
function select_3_8_abd_cd_ef_gh(a,b,c,d,e,f,g,h,r) {
    if ( ! r(h, f)) {
        return select_3_8_abd_cd_efh_gh(a,b,c,d,e,f,g,h,r);
    } else {
        return select_3_8_abd_cd_efh_gh(a,b,c,d,h,g,e,f,r);        
    }
}

// level 4, like level 1, but using e, f, g and h
function select_3_8_abd_cd_ef(a,b,c,d,e,f,g,h,r) {
    if ( ! r(h, g)) {
        return select_3_8_abd_cd_ef_gh(a,b,c,d,e,f,g,h,r);
    } else {
        return select_3_8_abd_cd_ef_gh(a,b,c,d,e,f,h,g,r);        
    }
}

// level 3, like level 0, but using e, f, g and h
function select_3_8_abd_cd(a,b,c,d,e,f,g,h,r) {
    if ( ! r(f, e)) {
        return select_3_8_abd_cd_ef(a,b,c,d,e,f,g,h,r);
    } else {
        return select_3_8_abd_cd_ef(a,b,c,d,f,e,g,h,r);        
    }
}

// level 2
function select_3_8_ab_cd(a,b,c,d,e,f,g,h,r) {
    if ( ! r(d, b)) {
        return select_3_8_abd_cd(a,b,c,d,e,f,g,h,r);
    } else {
        return select_3_8_abd_cd(c,d,a,b,e,f,g,h,r);        
    }
}

// level 1
function select_3_8_ab(a,b,c,d,e,f,g,h,r) {
    if ( ! r(d, c)) {
        return select_3_8_ab_cd(a,b,c,d,e,f,g,h,r);
    } else {
        return select_3_8_ab_cd(a,b,d,c,e,f,g,h,r);        
    }
}

// level 0
function select_3_8(a,b,c,d,e,f,g,h,r) {
    if ( ! r(b, a)) {
        return select_3_8_ab(a,b,c,d,e,f,g,h,r);
    } else {
        return select_3_8_ab(b,a,c,d,e,f,g,h,r);        
    }
}



class Block {
    constructor(id, time) {
      this.id = id;
      this.time = time;
    }
}

function lt(a, b){
    return a.time < b.time;
}

function main() {
    var m = select_3_8(
        new Block(1,1),
        new Block(2,2),
        new Block(3,3),
        new Block(4,4),
        new Block(5,5),
        new Block(6,6),
        new Block(7,7),
        new Block(8,8),
        lt);

    console.log(m);
}

main();