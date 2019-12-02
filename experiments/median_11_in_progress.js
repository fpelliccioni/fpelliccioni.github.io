const common = require('./common');
const median9 = require('./median_9_in_progress');
const median3 = require('./median_3_generated');

g_comparissons = 0

// step 13.1.1
function select_4_7_ac_bc_de_cf_df(a, b, c, d, e, f, g, r) {
    common.check_precondition(...arguments);
    
}

// step 12.1.1
// [2,3],[1,3],[4,5],[6,7],[7,8],[3,6],
// [4,6]

// 4,6 => V5(7)_[[2,3],[1,3],[4,5],[3,6],[4,6]] - 5 = 10 - 5 = 5      to remove: [7,8] done comps = 7  total comps = 12
// 6,4 => V2(4)_[[3,4],[3,2]] - 2 = 4 - 2 = 2      to remove: [1,2,3,5,8] done comps = 7  total comps = 9
//TODO: chequear en papel por 6,4 a ver si está bien que elimine tantos...
function select_4_9_ac_bc_de_gh_fg_cf(a,b,c,d,e,f,g,h,i,r) {
    common.check_precondition(...arguments);
    
    if (!r(f, d)) {
        // select_4_9_ac_bc_de_gh_fg_cf_df(a,b,c,d,e,f,g,h,i,r); // to remove: [7,8]->[g,h]
        // select_4_7_ac_bc_de_cf_df(a,b,c,d,e,f,i,r);
        return select_4_7_ac_bc_de_cf_df(a,b,c,d,e,f,i,r);
    } else {
        // select_4_9_ac_bc_de_gh_fg_cf_fd(a,b,c,d,e,f,g,h,i,r);   //to remove: [1,2,3,5,8]
        // select_1_4_ab_cd_ca(d,f,g,i,r);
        return median3.select_1_3_ab(f,g,i,r);
    }
}

// step 12.1.2
function select_4_9_ac_bc_de_gh_fg_fc(a,b,c,d,e,f,g,h,i,r) {
    common.check_precondition(...arguments);
    
    if (!r(e, c)) {
    } else {
    }
}

// step 11.1
// [2,3],[1,3],[4,5],[6,7],[7,8],
// [3, 6],
function select_4_9_ac_bc_de_gh_fg(a,b,c,d,e,f,g,h,i,r) {
    common.check_precondition(...arguments);
    
    if (!r(f, c)) {
        return select_4_9_ac_bc_de_gh_fg_cf(a,b,c,d,e,f,g,h,i,r);
    } else {
        return select_4_9_ac_bc_de_gh_fg_fc(a,b,c,d,e,f,g,h,i,r);
    }
}

// step 10
// V6(10)_[[1,2],[3,4],[5,6],[8,9],[2,4], [7, 8]]
// [7, 1], 
// 1,7 => V5(9)_[[2,3],[4,5],[7,8],[1,3],[6,7]] - 5 = 14 - 5 = 9      to remove: [1] done comps = 7  total comps = 16
// 7,1 => V5(9)_[[1,2],[3,4],[5,6],[7,8],[2,4]] - 5 = 14 - 5 = 9      to remove: [7] done comps = 7  total comps = 16

function select_5_10_abd_cd_ef_hi_gh(a, b, c, d, e, f, g, h, i, j, r) {
    common.check_precondition(...arguments);
    
    if (!r(g, a)) {
        // return select_5_10_abd_cd_ef_hi_gh_ag(a,b,c,d,e,f,g,h,i,j,r);   //remuevo 1->a
        // return select_4_9_bd_cd_ef_hi_gh(b,c,d,e,f,g,h,i,j,r);           // corrimiento
        return select_4_9_ac_bc_de_gh_fg(b,c,d,e,f,g,h,i,j,r);
    } else {
        // return select_5_10_abd_cd_ef_hi_gh_ga(a,b,c,d,e,f,h,g,i,j,r);   //remuevo 7->g
        // return select_4_9_abd_cd_ef_hi(a,b,c,d,e,f,h,i,j,r);             //corrimiento
        return median9.select_4_9_abd_cd_ef_gh(a,b,c,d,e,f,h,i,j,r);
    }
}

// step 9
// V6(10)_[[1,2],[3,4],[5,6],[8,9],[2,4]]
// [7, 8], 
function select_5_10_abd_cd_ef_hi(a, b, c, d, e, f, g, h, i, j, r) {
    common.check_precondition(...arguments);
    
    if (!r(h, g)) {
        return select_5_10_abd_cd_ef_hi_gh(a,b,c,d,e,f,g,h,i,j,r);
    } else {
        return select_5_10_abd_cd_ef_hi_gh(a,b,c,d,e,f,h,g,i,j,r);
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