const common = require('./common');
const median9 = require('./median_9_in_progress');
const median3 = require('./median_3_generated');

g_comparissons = 0

// ------------------------------------------------------------------
// step 13.1.1.1
function select_4_6_ac_bc_de(a, b, c, d, e, f, r) {
    common.check_precondition(...arguments);

    if ( ! r(f, e)) {
        if ( ! r(b, a)) {
            if ( ! r(f, c)) {
                if ( ! r(e, c)) {
                    return e;
                } else {
                    return c;
                }
            } else {
                if ( ! r(f, b)) {
                    return f;
                } else {
                    return b;
                }
            }
        } else {
            if ( ! r(f, c)) {
                if ( ! r(e, c)) {
                    return e;
                } else {
                    return c;
                }
            } else {
                if ( ! r(f, a)) {
                    return f;
                } else {
                    return a;
                }
            }
        }
    } else {
        if ( ! r(e, c)) {
            if ( ! r(d, c)) {
                if ( ! r(f, d)) {
                    return f;
                } else {
                    return d;
                }
            } else {
                if ( ! r(f, c)) {
                    return f;
                } else {
                    return c;
                }
            }
        } else {
            if ( ! r(b, a)) {
                if ( ! r(e, b)) {
                    return e;
                } else {
                    return b;
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
}

// step 13.1.1.2
function select_2_5_cd_ac(a, b, c, d, e, r) {
    common.check_precondition(...arguments);
 
    if ( ! r(b, a)) {
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
        if ( ! r(e, a)) {
            if ( ! r(e, c)) {
                return c;
            } else {
                return e;
            }
        } else {
            return a;
        }
    }
    
}

// ------------------------------------------------------------------

// step 12.1.1
// [2,3],[4,5],[7,8],[1,3],[6,7],[3,6],
// [5,6]

// 5,6 => V5(6)_[[2,3],[4,5],[1,3]] - 3 = 7 - 3 = 4      to remove: [8,7,6] done comps = 7  total comps = 11
//      [[0,[5,6]],[1,[1,2]],[2,[3,6]],[3,[3,5]],[3,[2,6]],[2,[3,6]],[3,[3,5]],[3,[1,6]],[1,[3,5]],[2,[3,4]],[3,[4,6]],[3,[3,6]],[2,[1,2]],[3,[2,5]],[3,[1,5]]]
// 6,5 => V3(5)_[[3,4],[1,3]] - 2 = 6 - 2 = 4      to remove: [8,5,2,1] done comps = 7  total comps = 11
//      [[0,[1,2]],[1,[2,5]],[2,[2,3]],[3,[3,5]],[3,[2,4]],[2,[3,5]],[3,[4,5]],[3,[2,3]],[1,[1,5]],[2,[3,5]],[3,[]],[3,[]],[2,[]],[3,[]],[3,[]]]
function select_4_9_ac_bc_de_gh_fg_cf(a,b,c,d,e,f,g,h,i,r) {
    common.check_precondition(...arguments);
    
    if (!r(f, e)) {
        // select_4_9_ac_bc_de_gh_fg_cf_ef(a,b,c,d,e,f,g,h,i,r);       //to remove: [8,7,6]
        return select_4_6_ac_bc_de(a,b,c,d,e,i,r);
    } else {
        // select_4_9_ac_bc_de_gh_fg_cf_fe(a,b,c,d,e,f,g,h,i,r);       //to remove: [8,5,2,1]
        return select_2_5_cd_ac(c,d,f,g,i,r);
    }
}


// ------------------------------------------------------------------

// step 13.1.2.1
// [2,3],[5,6],[1,3],[3,4]
function select_3_7_ac_bc_ef_cd(a,b,c,d,e,f,g,r) {
    common.check_precondition(...arguments);
    
    if ( ! r(b, a)) {
        if ( ! r(e, b)) {
            if ( ! r(e, c)) {
                if ( ! r(g, c)) {
                    if ( ! r(e, d)) {
                        if ( ! r(g, d)) {
                            return d;
                        } else {
                            return g;
                        }
                    } else {
                        if ( ! r(g, e)) {
                            return e;
                        } else {
                            return g;
                        }
                    }
                } else {
                    return c;
                }
            } else {
                if ( ! r(f, c)) {
                    if ( ! r(g, c)) {
                        return c;
                    } else {
                        if ( ! r(g, e)) {
                            return g;
                        } else {
                            return e;
                        }
                    }
                } else {
                    if ( ! r(g, e)) {
                        if ( ! r(g, f)) {
                            return f;
                        } else {
                            return g;
                        }
                    } else {
                        return e;
                    }
                }
            }
        } else {
            if ( ! r(f, a)) {
                if ( ! r(g, f)) {
                    if ( ! r(f, b)) {
                        if ( ! r(f, c)) {
                            return c;
                        } else {
                            return f;
                        }
                    } else {
                        if ( ! r(g, b)) {
                            return b;
                        } else {
                            return g;
                        }
                    }
                } else {
                    if ( ! r(g, b)) {
                        if ( ! r(g, c)) {
                            return c;
                        } else {
                            return g;
                        }
                    } else {
                        if ( ! r(f, b)) {
                            return b;
                        } else {
                            return f;
                        }
                    }
                }
            } else {
                if ( ! r(g, a)) {
                    if ( ! r(g, b)) {
                        return b;
                    } else {
                        return g;
                    }
                } else {
                    return a;
                }
            }
        }
    } else {
        if ( ! r(e, a)) {
            if ( ! r(e, c)) {
                if ( ! r(g, c)) {
                    if ( ! r(e, d)) {
                        if ( ! r(g, d)) {
                            return d;
                        } else {
                            return g;
                        }
                    } else {
                        if ( ! r(g, e)) {
                            return e;
                        } else {
                            return g;
                        }
                    }
                } else {
                    return c;
                }
            } else {
                if ( ! r(f, c)) {
                    if ( ! r(g, c)) {
                        return c;
                    } else {
                        if ( ! r(g, e)) {
                            return g;
                        } else {
                            return e;
                        }
                    }
                } else {
                    if ( ! r(g, e)) {
                        if ( ! r(g, f)) {
                            return f;
                        } else {
                            return g;
                        }
                    } else {
                        return e;
                    }
                }
            }
        } else {
            if ( ! r(f, a)) {
                if ( ! r(g, a)) {
                    if ( ! r(f, c)) {
                        if ( ! r(g, c)) {
                            return c;
                        } else {
                            return g;
                        }
                    } else {
                        if ( ! r(g, f)) {
                            return f;
                        } else {
                            return g;
                        }
                    }
                } else {
                    return a;
                }
            } else {
                if ( ! r(g, a)) {
                    return a;
                } else {
                    if ( ! r(f, b)) {
                        if ( ! r(g, f)) {
                            return g;
                        } else {
                            return f;
                        }
                    } else {
                        if ( ! r(g, b)) {
                            return g;
                        } else {
                            return b;
                        }
                    }
                }
            }
        }
    }
}

// step 13.1.2.2
// [2,3],[4,5],[7,8],[1,3],[6,7],[6,3],[4,3]
function select_4_9_ac_bc_de_gh_fg_fc_dc(a,b,c,d,e,f,g,h,i,r) {
    common.check_precondition(...arguments);
    //TODO
}

// ------------------------------------------------------------------
// step 12.1.2
// [2,3],[4,5],[7,8],[1,3],[6,7],[6,3],
// [3,4]
// 3,4 => V4(7)_[[2,3],[5,6],[1,3],[3,4]] - 4 = 10 - 4 = 6      to remove: [6,5] done comps = 7  total comps = 13
// 4,3 => V5(9)_[[2,3],[4,5],[7,8],[1,3],[6,7],[6,3],[4,3]] - 7 = 14 - 7 = 7      to remove: [] done comps = 7  total comps = 14
function select_4_9_ac_bc_de_gh_fg_fc(a,b,c,d,e,f,g,h,i,r) {
    common.check_precondition(...arguments);
    
    if (!r(d, c)) {
        // return select_4_9_ac_bc_de_gh_fg_fc_cd(a,b,c,d,e,f,g,h,i,r);    //to remove: [6,5]
        return select_3_7_ac_bc_ef_cd(a,b,c,d,g,h,i,r);
    } else {
        return select_4_9_ac_bc_de_gh_fg_fc_dc(a,b,c,d,e,f,g,h,i,r);
    }
}

// ------------------------------------------------------------------

// step 11.1
// [2,3],[4,5],[7,8],[1,3],[6,7],
// [3,6],
function select_4_9_ac_bc_de_gh_fg(a,b,c,d,e,f,g,h,i,r) {
    common.check_precondition(...arguments);
    
    if (!r(f, c)) {
        return select_4_9_ac_bc_de_gh_fg_cf(a,b,c,d,e,f,g,h,i,r);
    } else {
        return select_4_9_ac_bc_de_gh_fg_fc(a,b,c,d,e,f,g,h,i,r);
    }
}


// ------------------------------------------------------------------


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