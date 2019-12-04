const common = require('./common');
const median9 = require('./median_9_in_progress');
const median3 = require('./median_3_generated');

g_comparissons = 0


// --------------------------------------------------------------------------------------------------------------------

// steps 13 ... TODO
function select_2_7_ab_de_fg_eg_eb(a,b,c,d,e,f,g,r) {
    common.check_precondition(...arguments);
    //TODO    
}

// step 13
// [1, 9]
function select_4_9_abd_cd_gh_eh_eb_fi(a,b,c,d,e,f,g,h,i,r) {
    common.check_precondition(...arguments);

    if (!r(i, a)) {
        return select_4_9_abd_cd_gh_eh_eb_fi_ai(a,b,c,d,e,f,g,h,i,r);
    } else {
        //return select_5_10_abd_cd_ef_hi_fi_fb_gj_je(a,b,c,d,e,f,g,h,i,j,r);       //to remove: [10,7,4]
        return select_2_7_ab_de_fg_eg_eb(a,b,c,e,f,h,i,r);
    }

}

// --------------------------------------------------------------------------------------------------------------------

// step 12
// [5, 10]
// 5,10 => V5(9)_[[1,2],[3,4],[7,8],[2,4],[5,8],[5,2],[6,9]] - 7 = 14 - 7 = 7      to remove: [5] done comps = 9  total comps = 16
// 10,5 => V4(7)_[[1,2],[4,5],[6,7],[5,7],[5,2]] - 5 = 10 - 5 = 5      to remove: [10,7,4] done comps = 9  total comps = 14
function select_5_10_abd_cd_ef_hi_fi_fb_gj(a,b,c,d,e,f,g,h,i,j,r) {
    common.check_precondition(...arguments);
    
    if (!r(j, e)) {
        //return select_5_10_abd_cd_ef_hi_fi_fb_gj_ej(a,b,c,d,e,f,g,h,i,j,r);       //to remove: [5]
        return select_4_9_abd_cd_gh_eh_eb_fi(a,b,c,d,f,g,h,i,j,r);
    } else {
        //return select_5_10_abd_cd_ef_hi_fi_fb_gj_je(a,b,c,d,e,f,g,h,i,j,r);       //to remove: [10,7,4]
        return select_2_7_ab_de_fg_eg_eb(a,b,c,e,f,h,i,r);
    }
}

// step 11
// [7, 10], 
function select_5_10_abd_cd_ef_hi_fi_fb(a,b,c,d,e,f,g,h,i,j,r) {
    common.check_precondition(...arguments);
    
    if (!r(j, g)) {
        return select_5_10_abd_cd_ef_hi_fi_fb_gj(a,b,c,d,e,f,g,h,i,j,r);
    } else {
        return select_5_10_abd_cd_ef_hi_fi_fb_gj(a,b,c,d,e,f,j,h,i,g,r);
    }
}

// step 10
// [6, 2], 
function select_5_10_abd_cd_ef_hi_fi(a,b,c,d,e,f,g,h,i,j,r) {
    common.check_precondition(...arguments);
    
    if (!r(b, f)) {
        return select_5_10_abd_cd_ef_hi_fi_fb(a,b,c,d,e,f,g,h,i,j,r);
    } else {
        //TODO: comprobar si es correcto.
        return select_5_10_abd_cd_ef_hi_fi_fb(e,f,h,i,a,b,g,c,d,j,r);
    }
}

// step 9
// [6, 9], 
function select_5_10_abd_cd_ef_hi(a,b,c,d,e,f,g,h,i,j,r) {
    common.check_precondition(...arguments);
    
    if (!r(i, f)) {
        return select_5_10_abd_cd_ef_hi_fi(a,b,c,d,e,f,g,h,i,j,r);
    } else {
        //TODO: comprobar si es correcto.
        return select_5_10_abd_cd_ef_hi_fi(a,b,c,d,h,i,g,e,f,j,r);
    }
}

// step 8
// 4,8 => V6(10)_[[1,2],[3,4],[5,6],[8,9],[2,4]] - 5 = 16 - 5 = 11      to remove: [8] done comps = 8  total comps = 19
// 8,4 => V6(10)_[[1,2],[4,5],[6,7],[8,9],[5,7]] - 5 = 16 - 5 = 11      to remove: [4] done comps = 8  total comps = 19
// [4, 8]
function select_5_11_abd_cd_efh_gh_ij(a, b, c, d, e, f, g, h, i, j, k, r) {
    common.check_precondition(...arguments);

    if ( ! r(h, d)) {
        // return select_5_11_abd_cd_efh_gh_ij_dh(a,b,c,d,e,f,g,h,i,j,k,r); //remuevo 8->h
        return select_5_10_abd_cd_ef_hi(a,b,c,d,e,f,g,i,j,k,r);
    } else {
        //TODO: comprobar si es correcto.
        // return select_5_11_abd_cd_efh_gh_ij_dh(e,f,g,h,a,b,c,d,i,j,k,r); //remuevo 4->d
        return select_5_10_abd_cd_ef_hi(e,f,g,h,a,b,c,i,j,k,r);
    }
}

// step 7
// [6, 8]
function select_5_11_abd_cd_ef_gh_ij(a,b,c,d,e,f,g,h,i,j,k,r) {
    common.check_precondition(...arguments);

    if ( ! r(h, f)) {
        return select_5_11_abd_cd_efh_gh_ij(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_abd_cd_efh_gh_ij(a,b,c,d,g,h,e,f,i,j,k,r);        
    }
}

// step 6
// [2, 4]
function select_5_11_ab_cd_ef_gh_ij(a,b,c,d,e,f,g,h,i,j,k,r) {
    common.check_precondition(...arguments);

    if ( ! r(d, b)) {
        return select_5_11_abd_cd_ef_gh_ij(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_abd_cd_ef_gh_ij(c,d,a,b,e,f,g,h,i,j,k,r);        
    }
}

// step 5
// [9, 10]
function select_5_11_ab_cd_ef_gh(a,b,c,d,e,f,g,h,i,j,k,r) {
    common.check_precondition(...arguments);

    if ( ! r(j, i)) {
        return select_5_11_ab_cd_ef_gh_ij(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_ab_cd_ef_gh_ij(a,b,c,d,e,f,g,h,j,i,k,r);
    }
}

// step 4
// [7, 8]
function select_5_11_ab_cd_ef(a,b,c,d,e,f,g,h,i,j,k,r) {
    common.check_precondition(...arguments);

    if ( ! r(h, g)) {
        return select_5_11_ab_cd_ef_gh(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_ab_cd_ef_gh(a,b,c,d,e,f,h,g,i,j,k,r);
    }
}

// step 3
// [5, 6]
function select_5_11_ab_cd(a,b,c,d,e,f,g,h,i,j,k,r) {
    common.check_precondition(...arguments);

    if ( ! r(f, e)) {
        return select_5_11_ab_cd_ef(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_ab_cd_ef(a,b,c,d,f,e,g,h,i,j,k,r);
    }
}

// step 2
// [3, 4]
function select_5_11_ab(a,b,c,d,e,f,g,h,i,j,k,r) {
    common.check_precondition(...arguments);

    if ( ! r(d, c)) {
        return select_5_11_ab_cd(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_ab_cd(a,b,d,c,e,f,g,h,i,j,k,r);        
    }
}

// step 1
// [1, 2]
function select_5_11(a,b,c,d,e,f,g,h,i,j,k,r) {
    common.check_precondition(...arguments);

    if ( ! r(b, a)) {
        return select_5_11_ab(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_ab(b,a,c,d,e,f,g,h,i,j,k,r);        
    }
}

class Block {
    constructor(id, time) {
      this.id = id;
      this.time = time;
    }
}

function lt(a, b) {
    ++g_comparissons;
    console.log(`${b.time} < ${a.time} = ${!(a.time < b.time)}`);
    return a.time < b.time;
}

module.exports = {
    select_5_11: select_5_11,
    median_11_generated_unstable: select_5_11,
    median_11_generated_stable: select_5_11,
}


// function main() {
//     console.log();

//     var m = select_5_11(
//         new Block(1,1),
//         new Block(2,2),
//         new Block(3,3),
//         new Block(4,4),
//         new Block(5,5),
//         new Block(6,6),
//         new Block(7,7),
//         new Block(8,8),
//         new Block(9,9),
//         new Block(10,10),
//         new Block(11,11),
//     lt);

//     console.log(`median of 11: ${JSON.stringify(m)}`);
//     console.log(`g_comparissons: ${g_comparissons}`);
// }

// main();