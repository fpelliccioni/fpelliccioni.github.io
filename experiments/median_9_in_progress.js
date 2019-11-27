g_total_comparissons = 0


// -----------------------------------------------------------------
// step 10.1.1
function select_3_7_ab_ac_ad_eb_ef_fc(a,b,c,d,e,f,g,r) {
    if ( ! r(d, b)) {
        if ( ! r(g, b)) {
            if ( ! r(f, b)) {
                if ( ! r(d, f)) {
                    if ( ! r(g, f)) {
                        return f;
                    } else {
                        return g;
                    }
                } else {
                    if ( ! r(g, d)) {
                        return d;
                    } else {
                        return g;
                    }
                }
            } else {
                if ( ! r(c, b)) {
                    return b;
                } else {
                    return c;
                }
            }
        } else {
            if ( ! r(f, a)) {
                if ( ! r(g, f)) {
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
            } else {
                if ( ! r(g, a)) {
                    if ( ! r(g, c)) {
                        return c;
                    } else {
                        return g;
                    }
                } else {
                    return a;
                }
            }
        }
    } else {
        if ( ! r(g, f)) {
            if ( ! r(g, d)) {
                if ( ! r(d, f)) {
                    if ( ! r(d, c)) {
                        return c;
                    } else {
                        return d;
                    }
                } else {
                    if ( ! r(f, b)) {
                        return b;
                    } else {
                        return f;
                    }
                }
            } else {
                if ( ! r(g, a)) {
                    if ( ! r(g, c)) {
                        return c;
                    } else {
                        return g;
                    }
                } else {
                    return a;
                }
            }
        } else {
            if ( ! r(g, d)) {
                if ( ! r(g, e)) {
                    if ( ! r(g, b)) {
                        return b;
                    } else {
                        return g;
                    }
                } else {
                    return e;
                }
            } else {
                if ( ! r(d, f)) {
                    if ( ! r(f, a)) {
                        return f;
                    } else {
                        return a;
                    }
                } else {
                    if ( ! r(d, e)) {
                        return d;
                    } else {
                        return e;
                    }
                }
            }
        }
    }
}

// step 10.1.2
function select_4_7_ab_bc_dc_de_fb(a,b,c,d,e,f,g,r) {
    if ( ! r(d, a)) {
        if ( ! r(g, b)) {
            if ( ! r(e, c)) {
                if ( ! r(g, d)) {
                    if ( ! r(g, c)) {
                            return c;
                    } else {
                            return g;
                    }
                } else {
                        return d;
                }
            } else {
                if ( ! r(g, e)) {
                    if ( ! r(e, b)) {
                            return e;
                    } else {
                            return b;
                    }
                } else {
                    if ( ! r(g, d)) {
                            return g;
                    } else {
                            return d;
                    }
                }
            }
        } else {
            if ( ! r(e, b)) {
                if ( ! r(d, b)) {
                        return d;
                } else {
                        return b;
                }
            } else {
                if ( ! r(f, e)) {
                    if ( ! r(g, f)) {
                            return g;
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
    } else {
        if ( ! r(g, e)) {
            if ( ! r(g, b)) {
                if ( ! r(e, b)) {
                    if ( ! r(e, c)) {
                            return c;
                    } else {
                            return e;
                    }
                } else {
                        return b;
                }
            } else {
                if ( ! r(f, a)) {
                    if ( ! r(g, f)) {
                            return g;
                    } else {
                            return f;
                    }
                } else {
                    if ( ! r(g, a)) {
                            return g;
                    } else {
                            return a;
                    }
                }
            }
        } else {
            if ( ! r(e, b)) {
                if ( ! r(g, b)) {
                    if ( ! r(g, c)) {
                            return c;
                    } else {
                            return g;
                    }
                } else {
                        return b;
                }
            } else {
                if ( ! r(e, a)) {
                    if ( ! r(f, e)) {
                            return f;
                    } else {
                            return e;
                    }
                } else {
                    if ( ! r(f, a)) {
                            return f;
                    } else {
                            return a;
                    }
                }
            }
        }
    }
}

// step 10.1.1 (traductor)
function select_3_7_ac_bc_de_ae_bd_af(a,b,c,d,e,f,g,r) {
    return select_3_7_ab_ac_ad_eb_ef_fc(a,c,e,f,b,d,g,r);
}

// step 10.1.2 (traductor)
function select_4_7_abd_cd_ce_fb(a,b,c,d,e,f,g,r) {
    return select_4_7_ab_bc_dc_de_fb(a,c,b,g,d,e,f,r);
}
// -----------------------------------------------------------------


// step 10.2.2 (traductor)
function select_4_7_abd_cd_ec_fb(a,b,c,d,e,f,g,r) {
    return select_4_7_ab_bc_dc_de_fb(a,c,b,g,d,e,f,r);
}

// -----------------------------------------------------------------

// step 9.1
function select_4_8_abd_cd_ef_bf_ce(a,b,c,d,e,f,g,h,r) {
    if ( ! r(g, b)) {
        // select_4_8_abd_cd_ef_bf_ce_bg(a,b,c,d,e,f,g,h,r)     //elimino el primer elemento
        // select_3_7_ac_bc_de_ae_bd_af(b,c,d,e,f,g,h,r)
        return select_3_7_ac_bc_de_ae_bd_af(b,c,d,e,f,g,h,r);
    } else {
        //select_4_8_abd_cd_ef_bf_ce_gb(a,b,c,d,e,g,h,r);    //elimino el sexto elemento
        //select_4_7_abd_cd_ce_fb(a,b,c,d,e,g,h,r);
        return select_4_7_abd_cd_ce_fb(a,b,c,d,e,g,h,r);
    }
}

// step 9.2, ver si puedo usar select_4_8_abd_cd_ef_bf_ce() reordenando los parámetros
function select_4_8_abd_cd_ef_bf_ec(a,b,c,d,e,f,g,h,r) {
    if ( ! r(g, b)) {
        // select_4_8_abd_cd_ef_bf_ec_bg(a,b,c,d,e,f,g,h,r)     //elimino el primer elemento
        // select_3_7_ac_bc_de_ae_db_af(b,c,d,e,f,g,h,r)
        return select_3_7_ac_bc_de_ae_db_af(b,c,d,e,f,g,h,r);
    } else {
        //select_4_8_abd_cd_ef_bf_ec_gb(a,b,c,d,e,g,h,r);    //elimino el sexto elemento
        //select_4_7_abd_cd_ec_fb(a,b,c,d,e,g,h,r);
        return select_4_7_abd_cd_ec_fb(a,b,c,d,e,g,h,r);
    }
}

// step 8
function select_4_8_abd_cd_ef_bf(a,b,c,d,e,f,g,h,r) {
    if ( ! r(e, c)) {
        return select_4_8_abd_cd_ef_bf_ce(a,b,c,d,e,f,g,h,r);
    } else {
        return select_4_8_abd_cd_ef_bf_ec(a,b,c,d,e,f,g,h,r);   // ver si puedo usar select_4_8_abd_cd_ef_bf_ce() reordenando los parámetros
    }
}

// step 7
function select_4_9_abd_cd_efh_gh(a,b,c,d,e,f,g,h,i,r) {
    if ( ! r(f, b)) {
        return select_4_8_abd_cd_ef_bf(a,b,c,d,e,f,g,i,r);
    } else {
        return select_4_8_abd_cd_ef_bf(e,f,g,h,a,b,c,i,r);
    }
}

// step 6, like step 3, but using e, f, g and h
function select_4_9_abd_cd_ef_gh(a,b,c,d,e,f,g,h,i,r) {
    if ( ! r(h, f)) {
        return select_4_9_abd_cd_efh_gh(a,b,c,d,e,f,g,h,i,r);
    } else {
        return select_4_9_abd_cd_efh_gh(a,b,c,d,h,g,e,f,i,r);        
    }
}

// step 5, like step 2, but using e, f, g and h
function select_4_9_abd_cd_ef(a,b,c,d,e,f,g,h,i,r) {
    if ( ! r(h, g)) {
        return select_4_9_abd_cd_ef_gh(a,b,c,d,e,f,g,h,i,r);
    } else {
        return select_4_9_abd_cd_ef_gh(a,b,c,d,e,f,h,g,i,r);        
    }
}

// step 4, like step 1, but using e, f, g and h
function select_4_9_abd_cd(a,b,c,d,e,f,g,h,i,r) {
    if ( ! r(f, e)) {
        return select_4_9_abd_cd_ef(a,b,c,d,e,f,g,h,i,r);
    } else {
        return select_4_9_abd_cd_ef(a,b,c,d,f,e,g,h,i,r);        
    }
}

// step 3
function select_4_9_ab_cd(a,b,c,d,e,f,g,h,i,r) {
    if ( ! r(d, b)) {
        return select_4_9_abd_cd(a,b,c,d,e,f,g,h,i,r);
    } else {
        return select_4_9_abd_cd(c,d,a,b,e,f,g,h,i,r);        
    }
}

// step 2
function select_4_9_ab(a,b,c,d,e,f,g,h,i,r) {
    if ( ! r(d, c)) {
        return select_4_9_ab_cd(a,b,c,d,e,f,g,h,i,r);
    } else {
        return select_4_9_ab_cd(a,b,d,c,e,f,g,h,i,r);        
    }
}

// step 1
function select_4_9(a,b,c,d,e,f,g,h,i,r) {
    if ( ! r(b, a)) {
        return select_4_9_ab(a,b,c,d,e,f,g,h,i,r);
    } else {
        return select_4_9_ab(b,a,c,d,e,f,g,h,i,r);        
    }
}

class Block {
    constructor(id, time) {
      this.id = id;
      this.time = time;
    }
}



function lt(a, b) {
    ++g_total_comparissons;
    console.log(`${b.time} < ${a.time} = ${!(a.time < b.time)}`);
    return a.time < b.time;
}

function main() {
    console.log();

    var m = select_4_9(
        new Block(1,1),
        new Block(2,2),
        new Block(3,3),
        new Block(4,4),
        new Block(5,5),
        new Block(6,6),
        new Block(7,7),
        new Block(8,8),
        new Block(9,9),
        lt);

    console.log(`median of 9: ${m}`);
    console.log(`g_total_comparissons: ${g_total_comparissons}`);
}

main();