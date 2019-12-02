// var assert = require('assert');
const common = require('./common');

g_comparissons = 0

// -----------------------------------------------------------------
// // step 10.1.1
// // function select_3_7_ab_ac_ad_eb_ef_fc(a,b,c,d,e,f,g,r) {
// function select_3_7_ab_ac_ad_eb_ef_fc(a,c,e,f,b,d,g,r) {
    
//     console.log('select_3_7_ab_ac_ad_eb_ef_fc')
//     // falla para select_4_9(0,2,1,8,3,7,4,5,6)

//     assert(!r(b,a));
//     assert(!r(c,a));
//     assert(!r(d,a));
//     assert(!r(b,e));
//     assert(!r(f,e));
//     assert(!r(c,f));

//     if ( ! r(d, b)) {
//         if ( ! r(g, b)) {
//             if ( ! r(f, b)) {
//                 if ( ! r(d, f)) {
//                     if ( ! r(g, f)) {
//                         return f;
//                     } else {
//                         return g;
//                     }
//                 } else {
//                     if ( ! r(g, d)) {
//                         return d;
//                     } else {
//                         return g;
//                     }
//                 }
//             } else {
//                 if ( ! r(c, b)) {
//                     return b;
//                 } else {
//                     return c;
//                 }
//             }
//         } else {
//             if ( ! r(f, a)) {
//                 if ( ! r(g, f)) {
//                     if ( ! r(g, c)) {
//                         return c;
//                     } else {
//                         return g;
//                     }
//                 } else {
//                     if ( ! r(f, b)) {
//                         return b;
//                     } else {
//                         return f;
//                     }
//                 }
//             } else {
//                 if ( ! r(g, a)) {
//                     if ( ! r(g, c)) {
//                         return c;
//                     } else {
//                         return g;
//                     }
//                 } else {
//                     return a;
//                 }
//             }
//         }
//     } else {
//         if ( ! r(g, f)) {
//             if ( ! r(g, d)) {
//                 if ( ! r(d, f)) {
//                     if ( ! r(d, c)) {
//                         return c;
//                     } else {
//                         return d;
//                     }
//                 } else {
//                     if ( ! r(f, b)) {
//                         return b;
//                     } else {
//                         return f;
//                     }
//                 }
//             } else {
//                 if ( ! r(g, a)) {
//                     if ( ! r(g, c)) {
//                         return c;
//                     } else {
//                         return g;
//                     }
//                 } else {
//                     return a;
//                 }
//             }
//         } else {
//             if ( ! r(g, d)) {
//                 if ( ! r(g, e)) {
//                     if ( ! r(g, b)) {
//                         return b;
//                     } else {
//                         return g;
//                     }
//                 } else {
//                     return e;
//                 }
//             } else {
//                 if ( ! r(d, f)) {
//                     if ( ! r(f, a)) {
//                         return f;
//                     } else {
//                         return a;
//                     }
//                 } else {
//                     if ( ! r(d, e)) {
//                         return d;
//                     } else {
//                         return e;
//                     }
//                 }
//             }
//         }
//     }
// }

// // step 10.1.2
// function select_4_7_ab_bc_dc_de_fb(a,b,c,d,e,f,g,r) {
//     console.log('select_4_7_ab_bc_dc_de_fb **')


//     if ( ! r(d, a)) {
//         if ( ! r(g, b)) {
//             if ( ! r(e, c)) {
//                 if ( ! r(g, d)) {
//                     if ( ! r(g, c)) {
//                             return c;
//                     } else {
//                             return g;
//                     }
//                 } else {
//                         return d;
//                 }
//             } else {
//                 if ( ! r(g, e)) {
//                     if ( ! r(e, b)) {
//                             return e;
//                     } else {
//                             return b;
//                     }
//                 } else {
//                     if ( ! r(g, d)) {
//                             return g;
//                     } else {
//                             return d;
//                     }
//                 }
//             }
//         } else {
//             if ( ! r(e, b)) {
//                 if ( ! r(d, b)) {
//                         return d;
//                 } else {
//                         return b;
//                 }
//             } else {
//                 if ( ! r(f, e)) {
//                     if ( ! r(g, f)) {
//                             return g;
//                     } else {
//                             return f;
//                     }
//                 } else {
//                     if ( ! r(g, e)) {
//                             return g;
//                     } else {
//                             return e;
//                     }
//                 }
//             }
//         }
//     } else {
//         if ( ! r(g, e)) {
//             if ( ! r(g, b)) {
//                 if ( ! r(e, b)) {
//                     if ( ! r(e, c)) {
//                             return c;
//                     } else {
//                             return e;
//                     }
//                 } else {
//                         return b;
//                 }
//             } else {
//                 if ( ! r(f, a)) {
//                     if ( ! r(g, f)) {
//                             return g;
//                     } else {
//                             return f;
//                     }
//                 } else {
//                     if ( ! r(g, a)) {
//                             return g;
//                     } else {
//                             return a;
//                     }
//                 }
//             }
//         } else {
//             if ( ! r(e, b)) {
//                 if ( ! r(g, b)) {
//                     if ( ! r(g, c)) {
//                             return c;
//                     } else {
//                             return g;
//                     }
//                 } else {
//                         return b;
//                 }
//             } else {
//                 if ( ! r(e, a)) {
//                     if ( ! r(f, e)) {
//                             return f;
//                     } else {
//                             return e;
//                     }
//                 } else {
//                     if ( ! r(f, a)) {
//                             return f;
//                     } else {
//                             return a;
//                     }
//                 }
//             }
//         }
//     }
// }

// step 10.1.1 (traductor)
function select_3_7_ac_bc_de_ae_bd_af(a,b,c,d,e,f,g,r) {
    common.check_precondition(...arguments);
    // return select_3_7_ab_ac_ad_eb_ef_fc(a,c,e,f,b,d,g,r);


    if ( ! r(f, c)) {
        if ( ! r(g, c)) {
            if ( ! r(d, c)) {
                if ( ! r(f, d)) {
                    if ( ! r(g, d)) {
                        return d;
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
                if ( ! r(e, c)) {
                    return c;
                } else {
                    return e;
                }
            }
        } else {
            if ( ! r(d, a)) {
                if ( ! r(g, d)) {
                    if ( ! r(g, e)) {
                        return e;
                    } else {
                        return g;
                    }
                } else {
                    if ( ! r(d, c)) {
                        return c;
                    } else {
                        return d;
                    }
                }
            } else {
                if ( ! r(g, a)) {
                    if ( ! r(g, e)) {
                        return e;
                    } else {
                        return g;
                    }
                } else {
                    return a;
                }
            }
        }
    } else {
        if ( ! r(g, d)) {
            if ( ! r(g, f)) {
                if ( ! r(f, d)) {
                    if ( ! r(f, e)) {
                        return e;
                    } else {
                        return f;
                    }
                } else {
                    if ( ! r(d, c)) {
                        return c;
                    } else {
                        return d;
                    }
                }
            } else {
                if ( ! r(g, a)) {
                    if ( ! r(g, e)) {
                        return e;
                    } else {
                        return g;
                    }
                } else {
                    return a;
                }
            }
        } else {
            if ( ! r(g, f)) {
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
                if ( ! r(f, d)) {
                    if ( ! r(d, a)) {
                        return d;
                    } else {
                        return a;
                    }
                } else {
                    if ( ! r(f, b)) {
                        return f;
                    } else {
                        return b;
                    }
                }
            }
        }
    }
}

// step 10.1.2 (traductor)
function select_4_7_abd_cd_ce_fb(a,b,c,d,e,f,g,r) {
    common.check_precondition(...arguments);

    if ( ! r(c, a)) {
        if ( ! r(g, b)) {
            if ( ! r(e, d)) {
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
                if ( ! r(g, e)) {
                    if ( ! r(e, b)) {
                        return e;
                    } else {
                        return b;
                    }
                } else {
                    if ( ! r(g, c)) {
                        return g;
                    } else {
                        return c;
                    }
                }
            }
        } else {
            if ( ! r(e, b)) {
                if ( ! r(c, b)) {
                    return c;
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
                    if ( ! r(e, d)) {
                        return d;
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
                    if ( ! r(g, d)) {
                        return d;
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
// -----------------------------------------------------------------

// // step 10.2.1
// function select_3_7_ab_ac_ad_eb_fe_fc(a,b,c,d,e,f,g,r) {
//     console.log('select_3_7_ab_ac_ad_eb_fe_fc')

//     if ( ! r(g, e)) {
//         if ( ! r(d, c)) {
//             if ( ! r(g, c)) {
//                 if ( ! r(c, e)) {
//                     if ( ! r(c, b)) {
//                             return b;
//                     } else {
//                             return c;
//                     }
//                 } else {
//                     if ( ! r(d, e)) {
//                             return e;
//                     } else {
//                             return d;
//                     }
//                 }
//             } else {
//                 if ( ! r(g, a)) {
//                     if ( ! r(g, b)) {
//                             return b;
//                     } else {
//                             return g;
//                     }
//                 } else {
//                         return a;
//                 }
//             }
//         } else {
//             if ( ! r(g, d)) {
//                 if ( ! r(d, e)) {
//                     if ( ! r(d, b)) {
//                             return b;
//                     } else {
//                             return d;
//                     }
//                 } else {
//                     if ( ! r(c, e)) {
//                             return e;
//                     } else {
//                             return c;
//                     }
//                 }
//             } else {
//                 if ( ! r(g, a)) {
//                     if ( ! r(g, b)) {
//                             return b;
//                     } else {
//                             return g;
//                     }
//                 } else {
//                         return a;
//                 }
//             }
//         }
//     } else {
//         if ( ! r(c, e)) {
//             if ( ! r(d, e)) {
//                 if ( ! r(e, a)) {
//                         return e;
//                 } else {
//                         return a;
//                 }
//             } else {
//                 if ( ! r(d, f)) {
//                     if ( ! r(g, d)) {
//                             return g;
//                     } else {
//                             return d;
//                     }
//                 } else {
//                     if ( ! r(g, f)) {
//                             return g;
//                     } else {
//                             return f;
//                     }
//                 }
//             }
//         } else {
//             if ( ! r(g, d)) {
//                 if ( ! r(g, c)) {
//                     if ( ! r(d, c)) {
//                             return d;
//                     } else {
//                             return c;
//                     }
//                 } else {
//                     if ( ! r(g, f)) {
//                             return g;
//                     } else {
//                             return f;
//                     }
//                 }
//             } else {
//                 if ( ! r(d, c)) {
//                     if ( ! r(g, c)) {
//                             return g;
//                     } else {
//                             return c;
//                     }
//                 } else {
//                     if ( ! r(d, f)) {
//                             return d;
//                     } else {
//                             return f;
//                     }
//                 }
//             }
//         }
//     }
// }

// // step 10.2.2
// function select_4_7_ab_bc_de_dc_fb(a,b,c,d,e,f,g,r) {
//     console.log('select_4_7_ab_bc_de_dc_fb')

//     if ( ! r(e, a)) {
//         if ( ! r(g, b)) {
//             if ( ! r(c, e)) {
//                 if ( ! r(g, e)) {
//                     if ( ! r(e, b)) {
//                             return e;
//                     } else {
//                             return b;
//                     }
//                 } else {
//                     if ( ! r(g, d)) {
//                             return g;
//                     } else {
//                             return d;
//                     }
//                 }
//             } else {
//                 if ( ! r(g, d)) {
//                     if ( ! r(g, c)) {
//                             return c;
//                     } else {
//                             return g;
//                     }
//                 } else {
//                         return d;
//                 }
//             }
//         } else {
//             if ( ! r(e, b)) {
//                 if ( ! r(d, b)) {
//                         return d;
//                 } else {
//                         return b;
//                 }
//             } else {
//                 if ( ! r(f, e)) {
//                     if ( ! r(g, f)) {
//                             return g;
//                     } else {
//                             return f;
//                     }
//                 } else {
//                     if ( ! r(g, e)) {
//                             return g;
//                     } else {
//                             return e;
//                     }
//                 }
//             }
//         }
//     } else {
//         if ( ! r(f, a)) {
//             if ( ! r(g, b)) {
//                     return b;
//             } else {
//                 if ( ! r(g, f)) {
//                         return g;
//                 } else {
//                         return f;
//                 }
//             }
//         } else {
//             if ( ! r(g, a)) {
//                 if ( ! r(g, b)) {
//                         return b;
//                 } else {
//                         return g;
//                 }
//             } else {
//                     return a;
//             }
//         }
//     }
// }

// step 10.2.1 (traductor)
function select_3_7_ac_bc_de_ae_db_af(a,b,c,d,e,f,g,r) {
    common.check_precondition(...arguments);

    if ( ! r(g, b)) {
        if ( ! r(f, e)) {
            if ( ! r(g, e)) {
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
            if ( ! r(g, f)) {
                if ( ! r(f, b)) {
                    if ( ! r(f, c)) {
                        return c;
                    } else {
                        return f;
                    }
                } else {
                    if ( ! r(e, b)) {
                        return b;
                    } else {
                        return e;
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
        if ( ! r(e, b)) {
            if ( ! r(f, b)) {
                if ( ! r(b, a)) {
                    return b;
                } else {
                    return a;
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
        } else {
            if ( ! r(g, f)) {
                if ( ! r(g, e)) {
                    if ( ! r(f, e)) {
                        return f;
                    } else {
                        return e;
                    }
                } else {
                    if ( ! r(g, d)) {
                        return g;
                    } else {
                        return d;
                    }
                }
            } else {
                if ( ! r(f, e)) {
                    if ( ! r(g, e)) {
                        return g;
                    } else {
                        return e;
                    }
                } else {
                    if ( ! r(f, d)) {
                        return f;
                    } else {
                        return d;
                    }
                }
            }
        }
    }
}

// step 10.2.2 (traductor)
function select_4_7_ab_de_be_dc_fb(a,b,c,d,e,f,g,r) {
    common.check_precondition(...arguments);

    if ( ! r(c, a)) {
        if ( ! r(g, b)) {
            if ( ! r(e, c)) {
                if ( ! r(g, c)) {
                    if ( ! r(c, b)) {
                        return c;
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
            } else {
                if ( ! r(g, d)) {
                    if ( ! r(g, e)) {
                        return e;
                    } else {
                        return g;
                    }
                } else {
                    return d;
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
                if ( ! r(f, c)) {
                    if ( ! r(g, f)) {
                        return g;
                    } else {
                        return f;
                    }
                } else {
                    if ( ! r(g, c)) {
                        return g;
                    } else {
                        return c;
                    }
                }
            }
        }
    } else {
        if ( ! r(f, a)) {
            if ( ! r(g, b)) {
                return b;
            } else {
                if ( ! r(g, f)) {
                    return g;
                } else {
                    return f;
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

}

// -----------------------------------------------------------------

// step 9.1
// [2, 7]
function select_4_8_abd_cd_ef_bf_ce(a,b,c,d,e,f,g,h,r) {
    common.check_precondition(...arguments);

    if ( ! r(g, b)) {
        // select_4_8_abd_cd_ef_bf_ce_bg(a,b,c,d,e,f,g,h,r)     //elimino el primer elemento
        // select_3_7_ac_bc_de_ae_bd_af(b,c,d,e,f,g,h,r)
        return select_3_7_ac_bc_de_ae_bd_af(b,c,d,e,f,g,h,r);
    } else {
        //select_4_8_abd_cd_ef_bf_ce_gb(a,b,c,d,e,g,h,r);       //elimino el sexto elemento
        //select_4_7_abd_cd_ce_fb(a,b,c,d,e,g,h,r);
        return select_4_7_abd_cd_ce_fb(a,b,c,d,e,g,h,r);
    }
}

// step 9.2, ver si puedo usar select_4_8_abd_cd_ef_bf_ce() reordenando los parámetros
// [2, 7]
function select_4_8_abd_cd_ef_bf_ec(a, b, c, d, e, f, g, h, r) {
    common.check_precondition(...arguments);

    if ( ! r(g, b)) {
        // select_4_8_abd_cd_ef_bf_ec_bg(a,b,c,d,e,f,g,h,r)     //elimino el primer elemento
        // select_3_7_ac_bc_de_ae_db_af(b,c,d,e,f,g,h,r)
        return select_3_7_ac_bc_de_ae_db_af(b,c,d,e,f,g,h,r);
    } else {
        //select_4_8_abd_cd_ef_bf_ec_gb(a,b,c,d,e,g,h,r);       //elimino el cuarto elemento
        //select_4_7_ab_de_be_dc_fb(a,b,c,e,g,h,r);
        return select_4_7_ab_de_be_dc_fb(a,b,c,e,f,g,h,r);
    }
}

// step 8 (TODO: creo que esta mal el nombre del algoritmo)
// [3, 5]
function select_4_8_abd_cd_ef_bf(a,b,c,d,e,f,g,h,r) {
    common.check_precondition(...arguments);

    if ( ! r(e, c)) {
        return select_4_8_abd_cd_ef_bf_ce(a,b,c,d,e,f,g,h,r);
    } else {
        return select_4_8_abd_cd_ef_bf_ec(a,b,c,d,e,f,g,h,r);   // ver si puedo usar select_4_8_abd_cd_ef_bf_ce() reordenando los parámetros
    }
}

// 2,6 => V5(8)_[[1,2],[3,4],[2,4],[5,6],[2,6]] - 5 = 12 - 5 = 7      to remove: [8] done comps = 7  total comps = 14
// 6,2 => V5(8)_[[1,2],[4,5],[6,7],[5,7],[5,2]] - 5 = 12 - 5 = 7      to remove: [4] done comps = 7  total comps = 14

// step 7
// [2, 6]
function select_4_9_abd_cd_efh_gh(a,b,c,d,e,f,g,h,i,r) {
    common.check_precondition(...arguments);

    if ( ! r(f, b)) {
        return select_4_8_abd_cd_ef_bf(a,b,c,d,e,f,g,i,r);      // (TODO: creo que esta mal el nombre del algoritmo)
    } else {
        return select_4_8_abd_cd_ef_bf(e,f,g,h,a,b,c,i,r);      // (TODO: creo que esta mal el nombre del algoritmo)
    }
}

// step 6, like step 3, but using e, f, g and h
// [6, 8]
function select_4_9_abd_cd_ef_gh(a, b, c, d, e, f, g, h, i, r) {
    common.check_precondition(...arguments);

    if ( ! r(h, f)) {
        return select_4_9_abd_cd_efh_gh(a,b,c,d,e,f,g,h,i,r);
    } else {
        return select_4_9_abd_cd_efh_gh(a,b,c,d,g,h,e,f,i,r);
    }
}

// step 5, like step 2, but using e, f, g and h
// [7, 8]
function select_4_9_abd_cd_ef(a, b, c, d, e, f, g, h, i, r) {
    common.check_precondition(...arguments);

    if ( ! r(h, g)) {
        return select_4_9_abd_cd_ef_gh(a,b,c,d,e,f,g,h,i,r);
    } else {
        return select_4_9_abd_cd_ef_gh(a,b,c,d,e,f,h,g,i,r);        
    }
}

// step 4, like step 1, but using e, f, g and h
// [5, 6]
function select_4_9_abd_cd(a,b,c,d,e,f,g,h,i,r) {
    common.check_precondition(...arguments);

    if ( ! r(f, e)) {
        return select_4_9_abd_cd_ef(a,b,c,d,e,f,g,h,i,r);
    } else {
        return select_4_9_abd_cd_ef(a,b,c,d,f,e,g,h,i,r);        
    }
}

// step 3 [2, 4]
function select_4_9_ab_cd(a,b,c,d,e,f,g,h,i,r) {
    common.check_precondition(...arguments);

    if (!r(d, b)) {
        return select_4_9_abd_cd(a,b,c,d,e,f,g,h,i,r);
    } else {
        return select_4_9_abd_cd(c,d,a,b,e,f,g,h,i,r);        
    }
}

// step 2 [3, 4]
function select_4_9_ab(a,b,c,d,e,f,g,h,i,r) {
    common.check_precondition(...arguments);

    if ( ! r(d, c)) {
        return select_4_9_ab_cd(a,b,c,d,e,f,g,h,i,r);
    } else {
        return select_4_9_ab_cd(a,b,d,c,e,f,g,h,i,r);        
    }
}

// step 1 [1, 2]
function select_4_9(a,b,c,d,e,f,g,h,i,r) {
    common.check_precondition(...arguments);
    
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
    ++g_comparissons;
    console.log(`${b.time} < ${a.time} = ${!(a.time < b.time)}`);
    return a.time < b.time;
}

module.exports = {
    select_4_9: select_4_9,
    median_9_generated_unstable: select_4_9,
    median_9_generated_stable: select_4_9,
}





// function main() {
//     console.log();

//     var m = select_4_9(
//         new Block(1,1),
//         new Block(2,2),
//         new Block(3,5),
//         new Block(4,4),
//         new Block(5,3),
//         new Block(6,6),
//         new Block(7,7),
//         new Block(8,8),
//         new Block(9,9),
//         lt);

//     console.log(`median of 9: ${JSON.stringify(m)}`);
//     console.log(`g_comparissons: ${g_comparissons}`);
// }

// main();