const common = require('./common');
// const median9 = require('./median_9_in_progress');
// const median3 = require('./median_3_generated');

g_comparissons = 0

// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

// steps 16 ..
// V3(6)_[[2,3],[5,6],[1,3],[2,4],[1,5]]
function select_2_6_bc_ef_ac_bd_ae(a,b,c,d,e,f,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,r);

    
    //[[0,[4,5]],[1,[1,4]],[2,[3,4]],[2,[]],[1,[2,5]],[2,[3,5]],[2,[2,6]]]

    if ( ! r(e, d)) {
        if ( ! r(d, a)) {
            if ( ! r(d, c)) {
                return c;
            } else {
                return d;
            }
        } else {
            return a;
        }
    } else {
        if ( ! r(e, b)) {
            if ( ! r(e, c)) {
                return c;
            } else {
                return e;
            }
        } else {
            if ( ! r(f, b)) {
                return b;
            } else {
                return f;
            }
        }
    }
}

// steps 16 ..
// V2(2)_[]
function select_1_2(a,b,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,r);

    
    //[[0,[1,2]]]

    if ( ! r(b, a)) {
        return b;
    } else {
        return a;
    }
}

// steps 16...
// V4(7)_[[1,2],[5,6],[4,7],[1,4],[3,4],[5,2]]
function select_3_7_ab_ef_dg_ad_cd_eb(a,b,c,d,e,f,g,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,r);

    
    //[[0,[2,4]],[1,[3,6]],[2,[2,6]],[3,[2,3]],[3,[1,6]],[2,[2,3]],[3,[2,6]],[3,[1,3]],[1,[4,6]],[2,[4,5]],[3,[5,7]],[3,[]],[2,[1,3]],[3,[3,6]],[3,[1,6]]]

    if ( ! r(d, b)) {
        if ( ! r(f, c)) {
            if ( ! r(f, b)) {
                if ( ! r(c, b)) {
                    return c;
                } else {
                    return b;
                }
            } else {
                if ( ! r(f, a)) {
                    return f;
                } else {
                    return a;
                }
            }
        } else {
            if ( ! r(c, b)) {
                if ( ! r(f, b)) {
                    return f;
                } else {
                    return b;
                }
            } else {
                if ( ! r(c, a)) {
                    return c;
                } else {
                    return a;
                }
            }
        }
    } else {
        if ( ! r(f, d)) {
            if ( ! r(e, d)) {
                if ( ! r(g, e)) {
                    return e;
                } else {
                    return g;
                }
            } else {
                return d;
            }
        } else {
            if ( ! r(c, a)) {
                if ( ! r(f, c)) {
                    return f;
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
    }
}

// steps 16...
// V3(4)_[[1,2]]
function select_2_4_ab(a,b,c,d,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,r);

    
    //[[0,[3,4]],[1,[2,4]],[2,[2,3]],[2,[1,4]],[1,[2,3]],[2,[2,4]],[2,[1,3]]]

    if ( ! r(d, c)) {
        if ( ! r(d, b)) {
            if ( ! r(c, b)) {
                return c;
            } else {
                return b;
            }
        } else {
            if ( ! r(d, a)) {
                return d;
            } else {
                return a;
            }
        }
    } else {
        if ( ! r(c, b)) {
            if ( ! r(d, b)) {
                return d;
            } else {
                return b;
            }
        } else {
            if ( ! r(c, a)) {
                return c;
            } else {
                return a;
            }
        }
    }
}

// steps 16...
// V4(6)_[[3,4],[4,1],[2,6],[2,5]]
function select_3_6_cd_da_bf_be(a,b,c,d,e,f,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,r);

    
    //[[0,[1,5]],[1,[1,2]],[2,[]],[3,[]],[3,[]],[2,[1,6]],[3,[]],[3,[4,6]],[1,[5,6]],[2,[4,6]],[3,[4,5]],[3,[3,6]],[2,[4,5]],[3,[4,6]],[3,[3,5]]]

    if ( ! r(e, a)) {
        if ( ! r(b, a)) {
            return b;
        } else {
            if ( ! r(f, a)) {
                return a;
            } else {
                if ( ! r(f, d)) {
                    return f;
                } else {
                    return d;
                }
            }
        }
    } else {
        if ( ! r(f, e)) {
            if ( ! r(f, d)) {
                if ( ! r(e, d)) {
                    return e;
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
            if ( ! r(e, d)) {
                if ( ! r(f, d)) {
                    return f;
                } else {
                    return d;
                }
            } else {
                if ( ! r(e, c)) {
                    return e;
                } else {
                    return c;
                }
            }
        }
    }
}

// steps 17...
// V3(4)_[[3,4]]
function select_2_4_cd(a,b,c,d,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,r);

    
    //[[0,[1,2]],[1,[2,4]],[2,[2,3]],[2,[1,4]],[1,[1,4]],[2,[1,3]],[2,[2,4]]]

    if ( ! r(b, a)) {
        if ( ! r(d, b)) {
            if ( ! r(c, b)) {
                return c;
            } else {
                return b;
            }
        } else {
            if ( ! r(d, a)) {
                return d;
            } else {
                return a;
            }
        }
    } else {
        if ( ! r(d, a)) {
            if ( ! r(c, a)) {
                return c;
            } else {
                return a;
            }
        } else {
            if ( ! r(d, b)) {
                return d;
            } else {
                return b;
            }
        }
    }
}

// steps 17...
// V4(6)_[[2,3],[3,5],[4,6],[4,1],[1,6]]
function select_3_6_bc_ce_df_da_af(a,b,c,d,e,f,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,r);

    
    //[[0,[1,3]],[1,[2,6]],[2,[3,6]],[2,[]],[1,[1,5]],[2,[]],[2,[4,5]]]

    if ( ! r(c, a)) {
        if ( ! r(f, b)) {
            if ( ! r(f, c)) {
                return c;
            } else {
                return f;
            }
        } else {
            return b;
        }
    } else {
        if ( ! r(e, a)) {
            return a;
        } else {
            if ( ! r(e, d)) {
                return e;
            } else {
                return d;
            }
        }
    }
}

// steps 17...
// V4(6)_[[2,3],[3,5],[4,6],[4,1],[6,1]]
function select_3_6_bc_ce_df_da_fa(a,b,c,d,e,f,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,r);

    
    //[[0,[1,3]],[1,[1,2]],[2,[]],[2,[]],[1,[5,6]],[2,[4,5]],[2,[3,6]]]

    if ( ! r(c, a)) {
        if ( ! r(b, a)) {
            return b;
        } else {
            return a;
        }
    } else {
        if ( ! r(f, e)) {
            if ( ! r(e, d)) {
                return e;
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
    }
}

// steps 16...
// V4(6)_[[3,4],[4,1],[6,2],[6,5]]
function select_3_6_cd_da_fb_fe(a,b,c,d,e,f,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,r);

    
    //[[0,[1,2]],[1,[1,5]],[2,[1,6]],[3,[]],[3,[]],[2,[4,5]],[3,[]],[3,[]],[1,[2,5]],[2,[4,5]],[3,[2,4]],[3,[3,5]],[2,[2,4]],[3,[2,3]],[3,[4,5]]]

    if ( ! r(b, a)) {
        if ( ! r(e, a)) {
            if ( ! r(f, a)) {
                return f;
            } else {
                return a;
            }
        } else {
            if ( ! r(e, d)) {
                return e;
            } else {
                return d;
            }
        }
    } else {
        if ( ! r(e, b)) {
            if ( ! r(e, d)) {
                if ( ! r(d, b)) {
                    return d;
                } else {
                    return b;
                }
            } else {
                if ( ! r(e, c)) {
                    return e;
                } else {
                    return c;
                }
            }
        } else {
            if ( ! r(d, b)) {
                if ( ! r(c, b)) {
                    return c;
                } else {
                    return b;
                }
            } else {
                if ( ! r(e, d)) {
                    return e;
                } else {
                    return d;
                }
            }
        }
    }
}

// steps 15...
// V5(7)_[[1,2],[4,5],[5,2],[1,6],[3,6]]
function select_4_7_ab_de_eb_af_cf(a,b,c,d,e,f,g,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,r);

    
    //[[0,[2,6]],[1,[1,3]],[2,[3,7]],[3,[2,7]],[4,[2,3]],[4,[5,7]],[3,[2,3]],[4,[2,7]],[4,[3,5]],[2,[1,5]],[3,[2,7]],[4,[]],[4,[5,7]],[3,[1,7]],[4,[2,7]],[4,[]],[1,[5,7]],[2,[1,3]],[3,[6,7]],[4,[5,6]],[4,[3,7]],[3,[6,7]],[4,[5,6]],[4,[1,7]],[2,[5,6]],[3,[1,3]],[4,[3,5]],[4,[1,5]],[3,[4,6]],[4,[6,7]],[4,[4,7]]]

    if ( ! r(f, b)) {
        if ( ! r(c, a)) {
            if ( ! r(g, c)) {
                if ( ! r(g, b)) {
                    if ( ! r(c, b)) {
                        return c;
                    } else {
                        return b;
                    }
                } else {
                    if ( ! r(g, e)) {
                        return g;
                    } else {
                        return e;
                    }
                }
            } else {
                if ( ! r(c, b)) {
                    if ( ! r(g, b)) {
                        return g;
                    } else {
                        return b;
                    }
                } else {
                    if ( ! r(e, c)) {
                        return e;
                    } else {
                        return c;
                    }
                }
            }
        } else {
            if ( ! r(e, a)) {
                if ( ! r(g, b)) {
                    return b;
                } else {
                    if ( ! r(g, e)) {
                        return g;
                    } else {
                        return e;
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
        if ( ! r(g, e)) {
            if ( ! r(c, a)) {
                if ( ! r(g, f)) {
                    if ( ! r(f, e)) {
                        return f;
                    } else {
                        return e;
                    }
                } else {
                    if ( ! r(g, c)) {
                        return g;
                    } else {
                        return c;
                    }
                }
            } else {
                if ( ! r(g, f)) {
                    if ( ! r(f, e)) {
                        return f;
                    } else {
                        return e;
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
            if ( ! r(f, e)) {
                if ( ! r(c, a)) {
                    if ( ! r(e, c)) {
                        return e;
                    } else {
                        return c;
                    }
                } else {
                    if ( ! r(e, a)) {
                        return e;
                    } else {
                        return a;
                    }
                }
            } else {
                if ( ! r(f, d)) {
                    if ( ! r(g, f)) {
                        return g;
                    } else {
                        return f;
                    }
                } else {
                    if ( ! r(g, d)) {
                        return g;
                    } else {
                        return d;
                    }
                }
            }
        }
    }
}

// steps 15...
// V4(7)_[[3,4],[5,6],[4,6],[4,1],[5,2]]
function select_3_7_cd_ef_df_da_eb(a,b,c,d,e,f,g,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,r);

    
    //[[0,[1,2]],[1,[1,6]],[2,[5,7]],[3,[1,7]],[4,[1,5]],[4,[4,7]],[3,[1,5]],[4,[1,7]],[4,[4,5]],[2,[4,5]],[3,[5,7]],[4,[6,7]],[4,[]],[3,[4,7]],[4,[6,7]],[4,[]],[1,[2,7]],[2,[2,3]],[3,[3,7]],[4,[4,7]],[4,[]],[3,[2,4]],[4,[4,7]],[4,[2,6]],[2,[4,7]],[3,[5,7]],[4,[6,7]],[4,[]],[3,[2,4]],[4,[2,3]],[4,[4,5]]]

    if ( ! r(b, a)) {
        if ( ! r(f, a)) {
            if ( ! r(g, e)) {
                if ( ! r(g, a)) {
                    if ( ! r(e, a)) {
                        return e;
                    } else {
                        return a;
                    }
                } else {
                    if ( ! r(g, d)) {
                        return g;
                    } else {
                        return d;
                    }
                }
            } else {
                if ( ! r(e, a)) {
                    if ( ! r(g, a)) {
                        return g;
                    } else {
                        return a;
                    }
                } else {
                    if ( ! r(e, d)) {
                        return e;
                    } else {
                        return d;
                    }
                }
            }
        } else {
            if ( ! r(e, d)) {
                if ( ! r(g, e)) {
                    if ( ! r(g, f)) {
                        return f;
                    } else {
                        return g;
                    }
                } else {
                    return e;
                }
            } else {
                if ( ! r(g, d)) {
                    if ( ! r(g, f)) {
                        return f;
                    } else {
                        return g;
                    }
                } else {
                    return d;
                }
            }
        }
    } else {
        if ( ! r(g, b)) {
            if ( ! r(c, b)) {
                if ( ! r(g, c)) {
                    if ( ! r(g, d)) {
                        return d;
                    } else {
                        return g;
                    }
                } else {
                    return c;
                }
            } else {
                if ( ! r(d, b)) {
                    if ( ! r(g, d)) {
                        return d;
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
            if ( ! r(g, d)) {
                if ( ! r(g, e)) {
                    if ( ! r(g, f)) {
                        return f;
                    } else {
                        return g;
                    }
                } else {
                    return e;
                }
            } else {
                if ( ! r(d, b)) {
                    if ( ! r(c, b)) {
                        return c;
                    } else {
                        return b;
                    }
                } else {
                    if ( ! r(e, d)) {
                        return e;
                    } else {
                        return d;
                    }
                }
            }
        }
    }
}

//steps 16...
// V5(7)_[[2,3],[5,6],[3,6],[4,7],[4,1],[5,1]]
function select_4_7_bc_ef_cf_dg_da_ea(a,b,c,d,e,f,g,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,r);

    
    //[[0,[1,7]],[1,[1,3]],[2,[2,7]],[3,[3,7]],[3,[]],[2,[1,6]],[3,[]],[3,[4,6]],[1,[3,7]],[2,[6,7]],[3,[4,6]],[3,[5,7]],[2,[1,3]],[3,[1,2]],[3,[3,5]]]

    if ( ! r(g, a)) {
        if ( ! r(c, a)) {
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
            if ( ! r(f, a)) {
                return a;
            } else {
                if ( ! r(f, d)) {
                    return f;
                } else {
                    return d;
                }
            }
        }
    } else {
        if ( ! r(g, c)) {
            if ( ! r(g, f)) {
                if ( ! r(f, d)) {
                    return f;
                } else {
                    return d;
                }
            } else {
                if ( ! r(g, e)) {
                    return g;
                } else {
                    return e;
                }
            }
        } else {
            if ( ! r(c, a)) {
                if ( ! r(b, a)) {
                    return b;
                } else {
                    return a;
                }
            } else {
                if ( ! r(e, c)) {
                    return e;
                } else {
                    return c;
                }
            }
        }
    }
}

//steps 16...
// V4(7)_[[1,2],[5,6],[4,7],[4,1],[5,1],[3,7]]
function select_3_7_ab_ef_dg_da_ea_cg(a,b,c,d,e,f,g,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,r);

    
    //[[0,[1,6]],[1,[1,3]],[2,[2,3]],[3,[2,6]],[3,[3,6]],[2,[1,7]],[3,[]],[3,[5,7]],[1,[3,6]],[2,[6,7]],[3,[4,6]],[3,[5,7]],[2,[1,3]],[3,[]],[3,[3,4]]]

    if ( ! r(f, a)) {
        if ( ! r(c, a)) {
            if ( ! r(c, b)) {
                if ( ! r(f, b)) {
                    return b;
                } else {
                    return f;
                }
            } else {
                if ( ! r(f, c)) {
                    return c;
                } else {
                    return f;
                }
            }
        } else {
            if ( ! r(g, a)) {
                return a;
            } else {
                if ( ! r(g, e)) {
                    return g;
                } else {
                    return e;
                }
            }
        }
    } else {
        if ( ! r(f, c)) {
            if ( ! r(g, f)) {
                if ( ! r(f, d)) {
                    return f;
                } else {
                    return d;
                }
            } else {
                if ( ! r(g, e)) {
                    return g;
                } else {
                    return e;
                }
            }
        } else {
            if ( ! r(c, a)) {
                return a;
            } else {
                if ( ! r(d, c)) {
                    return d;
                } else {
                    return c;
                }
            }
        }
    }
}

// steps 16...
// V4(7)_[[1,2],[4,5],[5,6],[5,2],[7,3],[1,3]]
function select_3_7_ab_de_ef_eb_gc_ac(a,b,c,d,e,f,g,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,r);

    
    //[[0,[1,5]],[1,[5,7]],[2,[2,6]],[3,[2,7]],[3,[6,7]],[2,[3,4]],[3,[]],[3,[3,5]],[1,[6,7]],[2,[1,6]],[3,[2,6]],[3,[1,7]],[2,[1,7]],[3,[2,7]],[3,[1,6]]]

    if ( ! r(e, a)) {
        if ( ! r(g, e)) {
            if ( ! r(f, b)) {
                if ( ! r(g, b)) {
                    return b;
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
            if ( ! r(d, c)) {
                return d;
            } else {
                if ( ! r(e, c)) {
                    return c;
                } else {
                    return e;
                }
            }
        }
    } else {
        if ( ! r(g, f)) {
            if ( ! r(f, a)) {
                if ( ! r(f, b)) {
                    return b;
                } else {
                    return f;
                }
            } else {
                if ( ! r(g, a)) {
                    return a;
                } else {
                    return g;
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
                if ( ! r(f, a)) {
                    return a;
                } else {
                    return f;
                }
            }
        }
    }
}

// steps 16...
// V5(7)_[[3,4],[5,6],[4,6],[5,1],[7,2],[2,1]]
function select_4_7_cd_ef_df_ea_gb_ba(a,b,c,d,e,f,g,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,r);

    
    //[[0,[1,3]],[1,[]],[2,[]],[3,[]],[3,[]],[2,[]],[3,[]],[3,[]],[1,[2,4]],[2,[1,4]],[3,[]],[3,[4,5]],[2,[2,6]],[3,[2,5]],[3,[6,7]]]

    if ( ! r(c, a)) {
        return c;
    } else {
        if ( ! r(d, b)) {
            if ( ! r(d, a)) {
                return a;
            } else {
                if ( ! r(e, d)) {
                    return e;
                } else {
                    return d;
                }
            }
        } else {
            if ( ! r(f, b)) {
                if ( ! r(e, b)) {
                    return e;
                } else {
                    return b;
                }
            } else {
                if ( ! r(g, f)) {
                    return g;
                } else {
                    return f;
                }
            }
        }
    }
}

// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

// step 15
// [1,8]
function select_3_8_bc_fg_ac_dg_da_eh_be_af(a,b,c,d,e,f,g,h,r) {
    // common.check_precondition(...arguments);
    common.check_precondition(a,b,c,d,e,f,g,h,r);

    if (!r(h, a)) {
        return select_2_6_bc_ef_ac_bd_ae(a,b,c,e,f,g,r);    //to remove: [8,4]
    } else {
        return select_1_2(d,h,r);                           //to remove: [7,6,5,3,2,1] 
    }
}

// --------------------------------------------------------------------------------------------------------------------


// step 15
// [5,6]
function select_5_9_ab_de_gh_eh_eb_fi_af_cf_gb(a,b,c,d,e,f,g,h,i,r) {
    // console.log('select_5_9_ab_de_gh_eh_eb_fi_af_cf_gb')
    // console.log(JSON.stringify(arguments))
    // console.log(new Error().stack)
    // console.log(arguments.length)
    // common.check_precondition(...arguments);
    common.check_precondition(a,b,c,d,e,f,g,h,i,r);

    // try {
    //     common.check_precondition(...arguments);
    // } catch (error) {
    //     console.log(JSON.stringify(arguments));
    //     throw error;
    // }

    if (!r(f, e)) {
        return select_3_7_ab_ef_dg_ad_cd_eb(a,b,c,f,g,h,i,r);       //to remove: [5,4]
    } else {
        return select_2_4_ab(d,e,g,i,r);                            //to remove: [8,6,3,2,1]
    }
}

// --------------------------------------------------------------------------------------------------------------------

// step 14
// [2,8]
function select_5_10_ab_cd_ef_hi_bd_fi_fb_gj_ag_cg(a,b,c,d,e,f,g,h,i,j,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,h,i,j,r);


    if (!r(h, b)) {
        return select_3_8_bc_fg_ac_dg_da_eh_be_af(b,c,d,f,g,h,i,j,r);       //to remove: [5,1]
    } else {
        return select_5_9_ab_de_gh_eh_eb_fi_af_cf_gb(a,b,c,e,f,g,h,i,j,r);      //to remove: [4]
    }
}

// --------------------------------------------------------------------------------------------------------------------


// step 16
// [1,2]
function select_4_8_cd_fg_dg_da_eh_eb_bh_fb(a,b,c,d,e,f,g,h,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,h,r);


    if (!r(b, a)) {
        return select_2_4_cd(a,e,f,g,r);                    //to remove: [8,4,3,2]
    } else {
        return select_3_6_bc_ce_df_da_af(b,c,d,e,g,h,r);    //to remove: [6,1]
    }
}

// step 15
// [2,6]
function select_4_8_cd_fg_dg_da_eh_eb_bh(a,b,c,d,e,f,g,h,r) {
    // common.check_precondition(...arguments);
    common.check_precondition(a,b,c,d,e,f,g,h,r);

    if (!r(f, b)) {
        return select_3_6_cd_da_bf_be(a,b,c,d,f,h,r);                   //to remove: [7,5]
    } else {
        return select_4_8_cd_fg_dg_da_eh_eb_bh_fb(a,b,c,d,e,f,g,h,r);
    }
}

// --------------------------------------------------------------------------------------------------------------------



// step 16
// [1,8]
function select_4_8_cd_fg_dg_da_eh_eb_hb_fh(a,b,c,d,e,f,g,h,r) {
    // common.check_precondition(...arguments);
    common.check_precondition(a,b,c,d,e,f,g,h,r);

    if (!r(h, a)) {
        return select_2_4_cd(a,e,f,g,r);                    //to remove: [8,4,3,2]
    } else {
        return select_3_6_bc_ce_df_da_fa(b,c,d,e,g,h,r);    //to remove: [6,1]
    }
}

// step 15
// [6,8]
function select_4_8_cd_fg_dg_da_eh_eb_hb(a,b,c,d,e,f,g,h,r) {
    // common.check_precondition(...arguments);
    common.check_precondition(a,b,c,d,e,f,g,h,r);

    if (!r(h, f)) {
        return select_4_8_cd_fg_dg_da_eh_eb_hb_fh(a,b,c,d,e,f,g,h,r);
    } else {
        return select_3_6_cd_da_fb_fe(a,b,c,d,f,h,r);                       //to remove: [7,5]
    }
}

// --------------------------------------------------------------------------------------------------------------------

// step 14
// [2,8]
function select_4_8_cd_fg_dg_da_eh_eb(a,b,c,d,e,f,g,h,r) {
    // common.check_precondition(...arguments);
    common.check_precondition(a,b,c,d,e,f,g,h,r);

    if (!r(h, b)) {
        return select_4_8_cd_fg_dg_da_eh_eb_bh(a,b,c,d,e,f,g,h,r);
    } else {
        return select_4_8_cd_fg_dg_da_eh_eb_hb(a,b,c,d,e,f,g,h,r);
    }
}

// --------------------------------------------------------------------------------------------------------------------

// step 13
// [3,7]
function select_5_10_ab_cd_ef_hi_bd_fi_fb_gj_ag(a,b,c,d,e,f,g,h,i,j,r) {
    // common.check_precondition(...arguments);
    common.check_precondition(a,b,c,d,e,f,g,h,i,j,r);

    // 3,7 => V6(10)_[[1,2],[3,4],[5,6],[8,9],[2,4],[6,9],[6,2],[7,10],[1,7],[3,7]] - 10 = 16 - 10 = 6      to remove: [] done comps = 10  total comps = 16
    // 7,3 => V5(8)_[[3,4],[6,7],[4,7],[4,1],[5,8],[5,2]] - 6 = 12 - 6 = 6      to remove: [4,1] done comps = 10  total comps = 16

    if (!r(g, c)) {
        return select_5_10_ab_cd_ef_hi_bd_fi_fb_gj_ag_cg(a,b,c,d,e,f,g,h,i,j,r);
    } else {
        return select_4_8_cd_fg_dg_da_eh_eb(b,c,e,f,g,h,i,j,r);     //to remove: [4,1]
    }
}

// --------------------------------------------------------------------------------------------------------------------

// step 14
// [3,6]
function select_4_8_ab_de_fg_eg_eb_af(a,b,c,d,e,f,g,h,r) {
    // common.check_precondition(...arguments);
    common.check_precondition(a,b,c,d,e,f,g,h,r);

    if (!r(f, c)) {
        return select_4_7_ab_de_eb_af_cf(a,b,c,d,e,f,h,r);            //to remove: [7]
    } else {
        return select_3_7_cd_ef_df_da_eb(b,c,d,e,f,g,h,r);            //to remove: [1]
    }
}

// step 15
// [3,5]
function select_5_9_ab_de_gh_eh_eb_fi_fa_ga_ci(a,b,c,d,e,f,g,h,i,r) {
    // common.check_precondition(...arguments);
    common.check_precondition(a,b,c,d,e,f,g,h,i,r);

    if (!r(e, c)) {
        return select_4_7_bc_ef_cf_dg_da_ea(a,d,e,f,g,h,i,r);       //to remove: [3,2]
    } else {
        return select_3_7_ab_ef_dg_da_ea_cg(a,b,c,f,g,h,i,r);       //to remove: [5,4]
    }
}

// step 15
// [1,3]
function select_4_8_ab_de_fg_eg_eb_fa_hc(a,b,c,d,e,f,g,h,r) {
    // common.check_precondition(...arguments);
    common.check_precondition(a,b,c,d,e,f,g,h,r);

    if (!r(c, a)) {
        return select_3_7_ab_de_ef_eb_gc_ac(a,b,c,d,e,g,h,r);   //to remove: [6]
    } else {
        return select_4_7_cd_ef_df_ea_gb_ba(a,c,d,e,f,g,h,r);   //to remove: [2]
    }
}

// step 14
// [3,9]
function select_5_9_ab_de_gh_eh_eb_fi_fa_ga(a,b,c,d,e,f,g,h,i,r) {
    // common.check_precondition(...arguments);
    common.check_precondition(a,b,c,d,e,f,g,h,i,r);

    if (!r(i, c)) {
        return select_5_9_ab_de_gh_eh_eb_fi_fa_ga_ci(a,b,c,d,e,f,g,h,i,r);
    } else {
        return select_4_8_ab_de_fg_eg_eb_fa_hc(a,b,c,d,e,g,h,i,r);            //to remove: [6]
    }
}

// step 13
// [1,8]
function select_5_10_ab_cd_ef_hi_bd_fi_fb_gj_ga(a,b,c,d,e,f,g,h,i,j,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,h,i,j,r);


    if (!r(h, a)) {
        return select_4_8_ab_de_fg_eg_eb_af(a,b,c,e,f,h,i,j,r);                 //to remove: [7,4] 
    } else {
        return select_5_9_ab_de_gh_eh_eb_fi_fa_ga(a,b,c,e,f,g,h,i,j,r);           //to remove: [4]
    }
}

// --------------------------------------------------------------------------------------------------------------------

// step 12
// [1,7], 
function select_5_10_ab_cd_ef_hi_bd_fi_fb_gj(a,b,c,d,e,f,g,h,i,j,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,h,i,j,r);


    if (!r(g, a)) {
        //V6(10)_[[1,2],[3,4],[5,6],[8,9],[2,4],[6,9],[6,2],[7,10],[1,7]]
        return select_5_10_ab_cd_ef_hi_bd_fi_fb_gj_ag(a,b,c,d,e,f,g,h,i,j,r);
    } else {
        //V6(10)_[[1,2],[3,4],[5,6],[8,9],[2,4],[6,9],[6,2],[7,10],[7,1]]
        // return select_5_10_ab_cd_ef_hi_bd_fi_fb_gj_ga(a,b,c,d,e,f,j,h,i,g,r);
        return select_5_10_ab_cd_ef_hi_bd_fi_fb_gj_ga(a,b,c,d,e,f,g,h,i,j,r);
    }
}

// step 11
// [7,10]
function select_5_10_ab_cd_ef_hi_bd_fi_fb(a,b,c,d,e,f,g,h,i,j,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,h,i,j,r);

    
    if (!r(j, g)) {
        return select_5_10_ab_cd_ef_hi_bd_fi_fb_gj(a,b,c,d,e,f,g,h,i,j,r);
    } else {
        return select_5_10_ab_cd_ef_hi_bd_fi_fb_gj(a,b,c,d,e,f,j,h,i,g,r);
    }
}

// step 10
// [6,2]
function select_5_10_ab_cd_ef_hi_bd_fi(a,b,c,d,e,f,g,h,i,j,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,h,i,j,r);

    
    if (!r(b, f)) {
        return select_5_10_ab_cd_ef_hi_bd_fi_fb(a,b,c,d,e,f,g,h,i,j,r);
    } else {
        //TODO: comprobar si es correcto.
        return select_5_10_ab_cd_ef_hi_bd_fi_fb(e,f,h,i,a,b,g,c,d,j,r);
    }
}

// step 9
// [6,9]
function select_5_10_ab_cd_ef_hi_bd(a,b,c,d,e,f,g,h,i,j,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,h,i,j,r);

    
    if (!r(i, f)) {
        return select_5_10_ab_cd_ef_hi_bd_fi(a,b,c,d,e,f,g,h,i,j,r);
    } else {
        //TODO: comprobar si es correcto.
        return select_5_10_ab_cd_ef_hi_bd_fi(a,b,c,d,h,i,g,e,f,j,r);
    }
}

// step 8
// 4,8 => V6(10)_[[1,2],[3,4],[5,6],[8,9],[2,4]] - 5 = 16 - 5 = 11      to remove: [8] done comps = 8  total comps = 19
// 8,4 => V6(10)_[[1,2],[4,5],[6,7],[8,9],[5,7]] - 5 = 16 - 5 = 11      to remove: [4] done comps = 8  total comps = 19
// [4,8]
function select_5_11_ab_cd_ef_gh_ij_bd_fh(a,b,c,d,e,f,g,h,i,j,k,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,h,i,j,k,r);


    if ( ! r(h, d)) {
        // return select_5_11_ab_cd_ef_gh_ij_bd_fh_dh(a,b,c,d,e,f,g,h,i,j,k,r); //remuevo 8->h
        return select_5_10_ab_cd_ef_hi_bd(a,b,c,d,e,f,g,i,j,k,r);
    } else {
        //TODO: comprobar si es correcto.
        // return select_5_11_ab_cd_ef_gh_ij_bd_fh_dh(e,f,g,h,a,b,c,d,i,j,k,r); //remuevo 4->d
        return select_5_10_ab_cd_ef_hi_bd(e,f,g,h,a,b,c,i,j,k,r);
    }
}

// step 7
// [6,8]
function select_5_11_ab_cd_ef_gh_ij_bd(a,b,c,d,e,f,g,h,i,j,k,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,h,i,j,k,r);


    if ( ! r(h, f)) {
        return select_5_11_ab_cd_ef_gh_ij_bd_fh(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_ab_cd_ef_gh_ij_bd_fh(a,b,c,d,g,h,e,f,i,j,k,r);        
    }
}

// step 6
// [2,4]
function select_5_11_ab_cd_ef_gh_ij(a,b,c,d,e,f,g,h,i,j,k,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,h,i,j,k,r);


    if ( ! r(d, b)) {
        return select_5_11_ab_cd_ef_gh_ij_bd(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_ab_cd_ef_gh_ij_bd(c,d,a,b,e,f,g,h,i,j,k,r);        
    }
}

// step 5
// [9,10]
function select_5_11_ab_cd_ef_gh(a,b,c,d,e,f,g,h,i,j,k,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,h,i,j,k,r);


    if ( ! r(j, i)) {
        return select_5_11_ab_cd_ef_gh_ij(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_ab_cd_ef_gh_ij(a,b,c,d,e,f,g,h,j,i,k,r);
    }
}

// step 4
// [7,8]
function select_5_11_ab_cd_ef(a,b,c,d,e,f,g,h,i,j,k,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,h,i,j,k,r);


    if ( ! r(h, g)) {
        return select_5_11_ab_cd_ef_gh(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_ab_cd_ef_gh(a,b,c,d,e,f,h,g,i,j,k,r);
    }
}

// step 3
// [5,6]
function select_5_11_ab_cd(a,b,c,d,e,f,g,h,i,j,k,r) {
        // common.check_precondition(...arguments);
        common.check_precondition(a,b,c,d,e,f,g,h,i,j,k,r);


    if ( ! r(f, e)) {
        return select_5_11_ab_cd_ef(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_ab_cd_ef(a,b,c,d,f,e,g,h,i,j,k,r);
    }
}

// step 2
// [3,4]
function select_5_11_ab(a,b,c,d,e,f,g,h,i,j,k,r) {
    // common.check_precondition(...arguments);
    common.check_precondition(a,b,c,d,e,f,g,h,i,j,k,r);


    if ( ! r(d, c)) {
        return select_5_11_ab_cd(a,b,c,d,e,f,g,h,i,j,k,r);
    } else {
        return select_5_11_ab_cd(a,b,d,c,e,f,g,h,i,j,k,r);        
    }
}

// step 1
// [1,2]
function select_5_11(a,b,c,d,e,f,g,h,i,j,k,r) {
    // common.check_precondition(...arguments);
    common.check_precondition(a,b,c,d,e,f,g,h,i,j,k,r);

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