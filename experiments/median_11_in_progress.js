const common = require('./common');

g_comparissons = 0

// step 11.1.1
// 6 comparisons
function select_4_9_ac_bc_deg_fg_ae_ah(a,b,c,d,e,f,g,h,i,r) {
    common.check_precondition(...arguments);

    if ( ! r(e, c)) {
        if ( ! r(i, d)) {
            if ( ! r(g, d)) {
                if ( ! r(e, d)) {
                    if ( ! r(g, e)) {
                        if ( ! r(i, e)) {
                            return e;
                        } else {
                            return i;
                        }
                    } else {
                        if ( ! r(i, g)) {
                            return g;
                        } else {
                            return i;
                        }
                    }
                } else {
                    if ( ! r(f, d)) {
                        return d;
                    } else {
                        return f;
                    }
                }
            } else {
                if ( ! r(e, b)) {
                    if ( ! r(g, e)) {
                        if ( ! r(g, f)) {
                            return f;
                        } else {
                            return g;
                        }
                    } else {
                        if ( ! r(e, d)) {
                            return d;
                        } else {
                            return e;
                        }
                    }
                } else {
                    if ( ! r(g, b)) {
                        if ( ! r(g, f)) {
                            return f;
                        } else {
                            return g;
                        }
                    } else {
                        return b;
                    }
                }
            }
        } else {
            if ( ! r(g, e)) {
                if ( ! r(i, g)) {
                    if ( ! r(g, b)) {
                        if ( ! r(g, f)) {
                            return f;
                        } else {
                            return g;
                        }
                    } else {
                        return b;
                    }
                } else {
                    if ( ! r(i, e)) {
                        if ( ! r(i, f)) {
                            return f;
                        } else {
                            return i;
                        }
                    } else {
                        if ( ! r(e, d)) {
                            return d;
                        } else {
                            return e;
                        }
                    }
                }
            } else {
                if ( ! r(i, g)) {
                    if ( ! r(i, e)) {
                        if ( ! r(e, b)) {
                            return e;
                        } else {
                            return b;
                        }
                    } else {
                        if ( ! r(i, c)) {
                            return i;
                        } else {
                            return c;
                        }
                    }
                } else {
                    if ( ! r(g, c)) {
                        if ( ! r(g, d)) {
                            return d;
                        } else {
                            return g;
                        }
                    } else {
                        return c;
                    }
                }
            }
        }
    } else {
        if ( ! r(g, c)) {
            if ( ! r(g, f)) {
                if ( ! r(i, f)) {
                    if ( ! r(f, c)) {
                        if ( ! r(f, d)) {
                            return d;
                        } else {
                            return f;
                        }
                    } else {
                        if ( ! r(i, c)) {
                            return c;
                        } else {
                            return i;
                        }
                    }
                } else {
                    if ( ! r(i, c)) {
                        if ( ! r(i, d)) {
                            return d;
                        } else {
                            return i;
                        }
                    } else {
                        if ( ! r(f, c)) {
                            return c;
                        } else {
                            return f;
                        }
                    }
                }
            } else {
                if ( ! r(g, d)) {
                    if ( ! r(i, c)) {
                        if ( ! r(i, d)) {
                            return d;
                        } else {
                            return i;
                        }
                    } else {
                        return c;
                    }
                } else {
                    if ( ! r(i, g)) {
                        if ( ! r(g, b)) {
                            return g;
                        } else {
                            return b;
                        }
                    } else {
                        if ( ! r(i, c)) {
                            return i;
                        } else {
                            return c;
                        }
                    }
                }
            }
        } else {
            if ( ! r(f, c)) {
                if ( ! r(i, c)) {
                    if ( ! r(c, b)) {
                        return c;
                    } else {
                        return b;
                    }
                } else {
                    if ( ! r(g, e)) {
                        if ( ! r(i, g)) {
                            return i;
                        } else {
                            return g;
                        }
                    } else {
                        if ( ! r(i, e)) {
                            return i;
                        } else {
                            return e;
                        }
                    }
                }
            } else {
                if ( ! r(i, g)) {
                    if ( ! r(i, f)) {
                        if ( ! r(g, f)) {
                            return g;
                        } else {
                            return f;
                        }
                    } else {
                        if ( ! r(i, e)) {
                            return i;
                        } else {
                            return e;
                        }
                    }
                } else {
                    if ( ! r(g, f)) {
                        if ( ! r(i, f)) {
                            return i;
                        } else {
                            return f;
                        }
                    } else {
                        if ( ! r(g, e)) {
                            return g;
                        } else {
                            return e;
                        }
                    }
                }
            }
        }
    }
}

// step 11.1.2 TODO

// step 11.2.1 TODO
function select_4_9_ac_bc_de_gh_ae_ah(a,b,c,d,e,f,g,h,i,r) {
    common.check_precondition(...arguments);
    
}

// step 11.2.2 TODO

// step 10.1
function select_5_10_abd_cd_efh_gh_bf(a,b,c,d,e,f,g,h,i,j,r) {
    common.check_precondition(...arguments);

    if ( ! r(i, b)) {
        //select_5_10_abd_cd_efh_gh_bf_bi(a,b,c,d,e,f,g,h,i,j,r); //remuevo a
        //select_4_9_bd_cd_efh_gh_bf_bi(b,c,d,e,f,g,h,i,j,r);
        return select_4_9_ac_bc_deg_fg_ae_ah(b,c,d,e,f,g,h,i,j,r);
    } else {
        //TODO
        return null;
    }
}


// step 10.2
function select_5_10_abd_cd_ef_hi_bf(a,b,c,d,e,f,g,h,i,j,r) {
    common.check_precondition(...arguments);

    if ( ! r(i, b)) {
        //select_5_10_abd_cd_ef_hi_bf_bi(a,b,c,d,e,f,g,h,i,j,r); //remuevo a
        return select_4_9_ac_bc_de_gh_ae_ah(b,c,d,e,f,g,h,i,j,r);
    } else {
        //TODO
        return null;
    }
}

// step 9
function select_5_11_abd_cd_efh_gh_ij_bf(a,b,c,d,e,f,g,h,i,j,k,r) {
    common.check_precondition(...arguments);

    if ( ! r(j, h)) {
        //select_5_11_abd_cd_efh_gh_ij_bf_hj(a,b,c,d,e,f,g,h,i,j,k,r);  //remuevo j
        return select_5_10_abd_cd_efh_gh_bf(a,b,c,d,e,f,g,h,i,k,r);
    } else {
        //select_5_11_abd_cd_efh_gh_ij_bf_hj(a,b,c,d,e,f,g,h,i,j,k,r);  //remuevo h
        return select_5_10_abd_cd_ef_hi_bf(a,b,c,d,e,f,g,i,j,k,r);
    }
}

// step 8
function select_5_11_abd_cd_efh_gh_ij(a,b,c,d,e,f,g,h,i,j,k,r) {
    common.check_precondition(...arguments);

    if ( ! r(f, b)) {
        return select_5_11_abd_cd_efh_gh_ij_bf(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_abd_cd_efh_gh_ij_bf(e,f,g,h,a,b,c,d,i,j,k,r);        
    }
}

// step 7
function select_5_11_abd_cd_ef_gh_ij(a,b,c,d,e,f,g,h,i,j,k,r) {
    common.check_precondition(...arguments);

    if ( ! r(h, f)) {
        return select_5_11_abd_cd_efh_gh_ij(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_abd_cd_efh_gh_ij(a,b,c,d,g,h,e,f,i,j,k,r);        
    }
}


// step 6
function select_5_11_ab_cd_ef_gh_ij(a,b,c,d,e,f,g,h,i,j,k,r) {
    common.check_precondition(...arguments);

    if ( ! r(d, b)) {
        return select_5_11_abd_cd_ef_gh_ij(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_abd_cd_ef_gh_ij(c,d,a,b,e,f,g,h,i,j,k,r);        
    }
}

// step 5
function select_5_11_ab_cd_ef_gh(a,b,c,d,e,f,g,h,i,j,k,r) {
    common.check_precondition(...arguments);

    if ( ! r(j, i)) {
        return select_5_11_ab_cd_ef_gh_ij(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_ab_cd_ef_gh_ij(a,b,c,d,e,f,g,h,j,i,k,r);
    }
}

// step 4
function select_5_11_ab_cd_ef(a,b,c,d,e,f,g,h,i,j,k,r) {
    common.check_precondition(...arguments);

    if ( ! r(h, g)) {
        return select_5_11_ab_cd_ef_gh(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_ab_cd_ef_gh(a,b,c,d,e,f,h,g,i,j,k,r);
    }
}


// step 3
function select_5_11_ab_cd(a,b,c,d,e,f,g,h,i,j,k,r) {
    common.check_precondition(...arguments);

    if ( ! r(f, e)) {
        return select_5_11_ab_cd_ef(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_ab_cd_ef(a,b,c,d,f,e,g,h,i,j,k,r);
    }
}

// step 2
function select_5_11_ab(a,b,c,d,e,f,g,h,i,j,k,r) {
    common.check_precondition(...arguments);

    if ( ! r(d, c)) {
        return select_5_11_ab_cd(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_ab_cd(a,b,d,c,e,f,g,h,i,j,k,r);        
    }
}

// step 1
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