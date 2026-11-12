const median5 = require('./median_5');


function select_2_5_ac_bc_de_ae(a, b, c, d, e, r) {
    return r(c, a) 
        ? (select_1_4_ab(_a, _b, _d, _e, r))
        : (select_1_4_ab(_c, _d, _b, _e, r));
}


function select_2_6_ac_bc_de_ae(a,b,c,d,e,f,r) {
    if ( ! r(f, a)) {
        return median5.select_2_5_ab_cd(b,c,d,e,f,r);
    } else {
        return select_2_5_ac_bc_de_ae(a,b,c,d,e,r);
    }
}



module.exports = {
    select_2_6_ac_bc_de_ae: select_2_6_ac_bc_de_ae,
}



// class Block {
//     constructor(id, time) {
//       this.id = id;
//       this.time = time;
//     }
// }

// function lt(a, b){
//     return a.time < b.time;
// }

// function main() {
//     var m = select_3_8(
//         new Block(1,1),
//         new Block(2,2),
//         new Block(3,3),
//         new Block(4,4),
//         new Block(5,5),
//         new Block(6,6),
//         new Block(7,7),
//         new Block(8,8),
//         lt);

//     console.log(m);
// }

// main();