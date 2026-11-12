// level 5
function select_3_7_ab_bc_bd_ec_fd(a,b,c,d,e,f,g,r) {
    if ( ! r(f, b)) {
        if ( ! r(g, f)) {
            if ( ! r(f, e)) {
                if ( ! r(f, c)) {
                        return c;
                } else {
                        return f;
                }
            } else {
                if ( ! r(d, e)) {
                    if ( ! r(g, e)) {
                            return e;
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
            }
        } else {
            if ( ! r(g, b)) {
                if ( ! r(g, e)) {
                    if ( ! r(g, c)) {
                            return c;
                    } else {
                            return g;
                    }
                } else {
                    if ( ! r(f, e)) {
                            return e;
                    } else {
                            return f;
                    }
                }
            } else {
                if ( ! r(f, e)) {
                    if ( ! r(e, b)) {
                            return e;
                    } else {
                            return b;
                    }
                } else {
                        return f;
                }
            }
        }
    } else {
        if ( ! r(g, e)) {
            if ( ! r(g, b)) {
                if ( ! r(d, e)) {
                    if ( ! r(e, b)) {
                            return e;
                    } else {
                            return b;
                    }
                } else {
                        return d;
                }
            } else {
                if ( ! r(g, f)) {
                    if ( ! r(g, a)) {
                            return g;
                    } else {
                            return a;
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
                if ( ! r(f, e)) {
                    if ( ! r(f, a)) {
                            return f;
                    } else {
                            return a;
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
}

// level 5
function select_3_6_ab_cd_db(a,b,c,d,e,f,r) {
    if ( ! r(e, a)) {
        if ( ! r(f, e)) {
            if ( ! r(c, e)) {
                if ( ! r(f, c)) {
                    if ( ! r(f, d)) {
                            return d;
                    } else {
                            return f;
                    }
                } else {
                        return c;
                }
            } else {
                if ( ! r(d, e)) {
                    if ( ! r(f, d)) {
                            return d;
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
            }
        } else {
            if ( ! r(f, d)) {
                if ( ! r(f, b)) {
                        return b;
                } else {
                    if ( ! r(f, a)) {
                            return f;
                    } else {
                            return a;
                    }
                }
            } else {
                if ( ! r(d, e)) {
                    if ( ! r(c, e)) {
                            return c;
                    } else {
                            return e;
                    }
                } else {
                    if ( ! r(d, a)) {
                            return d;
                    } else {
                            return a;
                    }
                }
            }
        }
    } else {
        if ( ! r(c, e)) {
            if ( ! r(f, a)) {
                if ( ! r(f, d)) {
                    if ( ! r(d, a)) {
                            return d;
                    } else {
                            return a;
                    }
                } else {
                    if ( ! r(f, c)) {
                            return f;
                    } else {
                            return c;
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
                    if ( ! r(f, d)) {
                            return f;
                    } else {
                            return d;
                    }
                }
            }
        } else {
            if ( ! r(f, d)) {
                if ( ! r(f, a)) {
                    if ( ! r(d, a)) {
                            return d;
                    } else {
                            return a;
                    }
                } else {
                    if ( ! r(f, e)) {
                            return f;
                    } else {
                            return e;
                    }
                }
            } else {
                if ( ! r(d, a)) {
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

// -------------------------------------------------------------

// level 5
function select_3_7_ab_ac_de_eb_fg(a,b,c,d,e,f,g,r) {
    if ( ! r(g, e)) {
        if ( ! r(f, e)) {
            if ( ! r(c, f)) {
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
                if ( ! r(c, b)) {
                        return b;
                } else {
                    if ( ! r(c, e)) {
                            return c;
                    } else {
                            return e;
                    }
                }
            }
        } else {
            if ( ! r(c, e)) {
                if ( ! r(e, a)) {
                        return e;
                } else {
                    if ( ! r(g, a)) {
                            return a;
                    } else {
                            return g;
                    }
                }
            } else {
                if ( ! r(f, d)) {
                    if ( ! r(c, f)) {
                            return c;
                    } else {
                            return f;
                    }
                } else {
                    if ( ! r(c, d)) {
                            return c;
                    } else {
                            return d;
                    }
                }
            }
        }
    } else {
        if ( ! r(d, a)) {
            if ( ! r(c, d)) {
                if ( ! r(c, g)) {
                    if ( ! r(g, d)) {
                            return g;
                    } else {
                            return d;
                    }
                } else {
                    if ( ! r(c, f)) {
                            return c;
                    } else {
                            return f;
                    }
                }
            } else {
                if ( ! r(g, d)) {
                    if ( ! r(f, d)) {
                            return f;
                    } else {
                            return d;
                    }
                } else {
                    if ( ! r(c, g)) {
                            return c;
                    } else {
                            return g;
                    }
                }
            }
        } else {
            if ( ! r(c, f)) {
                if ( ! r(g, a)) {
                    if ( ! r(c, g)) {
                            return g;
                    } else {
                            return c;
                    }
                } else {
                    if ( ! r(e, a)) {
                            return a;
                    } else {
                            return e;
                    }
                }
            } else {
                    return f;
            }
        }
    }
}

// level 5
function select_2_6_ab_cd_ef(a,b,c,d,e,f,r) {
    if ( ! r(c, a)) {
        if ( ! r(e, c)) {
            if ( ! r(d, b)) {
                if ( ! r(e, b)) {
                    if ( ! r(e, d)) {
                            return d;
                    } else {
                            return e;
                    }
                } else {
                    if ( ! r(b, f)) {
                            return f;
                    } else {
                            return b;
                    }
                }
            } else {
                if ( ! r(e, d)) {
                    if ( ! r(e, b)) {
                            return b;
                    } else {
                            return e;
                    }
                } else {
                    if ( ! r(d, f)) {
                            return f;
                    } else {
                            return d;
                    }
                }
            }
        } else {
            if ( ! r(b, f)) {
                if ( ! r(c, f)) {
                    if ( ! r(c, b)) {
                            return b;
                    } else {
                            return c;
                    }
                } else {
                    if ( ! r(d, f)) {
                            return f;
                    } else {
                            return d;
                    }
                }
            } else {
                if ( ! r(c, b)) {
                    if ( ! r(c, f)) {
                            return f;
                    } else {
                            return c;
                    }
                } else {
                    if ( ! r(d, b)) {
                            return b;
                    } else {
                            return d;
                    }
                }
            }
        }
    } else {
        if ( ! r(b, f)) {
            if ( ! r(d, a)) {
                if ( ! r(d, f)) {
                    if ( ! r(a, f)) {
                            return a;
                    } else {
                            return f;
                    }
                } else {
                    if ( ! r(e, d)) {
                            return e;
                    } else {
                            return d;
                    }
                }
            } else {
                if ( ! r(a, f)) {
                    if ( ! r(d, f)) {
                            return d;
                    } else {
                            return f;
                    }
                } else {
                    if ( ! r(e, a)) {
                            return e;
                    } else {
                            return a;
                    }
                }
            }
        } else {
            if ( ! r(e, d)) {
                if ( ! r(e, b)) {
                    if ( ! r(d, b)) {
                            return d;
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
            } else {
                if ( ! r(d, b)) {
                    if ( ! r(e, b)) {
                            return e;
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
            }
        }
    }
}

// -------------------------------------------------------------

// level 4
function select_3_7_ab_bc_dc_ef(a,b,c,d,e,f,g,r) {
    if ( ! r(f, b)) {
        return select_3_7_ab_bc_bd_ec_fd(a,b,d,f,c,e,g,r);
    } else {
        return select_3_6_ab_cd_db(a,b,e,f,c,g,r);
    }
}

// level 4
function select_3_7_ab_cd_db_ef(a,b,c,d,e,f,g,r) {
    if ( ! r(g, a)) {
        return select_3_7_ab_ac_de_eb_fg(a,b,g,c,d,e,f,r);
    } else {
        return select_2_6_ab_cd_ef(c,d,e,f,g,a,r);
    }
}

// level 3
function select_3_7_ab_bc_dc(a,b,c,d,e,f,g,r) {
    if ( ! r(f, e)) {
        return select_3_7_ab_bc_dc_ef(a,b,d,c,e,f,g);
    } else {
        return select_3_7_ab_bc_dc_ef(a,b,d,c,f,e,g);
    }
}

// level 3
function select_3_7_ab_cd_db(a,b,c,d,e,f,g,r) {
    if ( ! r(f, e)) {
        return select_3_7_ab_cd_db_ef(a,b,c,d,e,f,g,r);
    } else {
        return select_3_7_ab_cd_db_ef(a,b,c,d,f,e,g,r);
    }
}

// level 2
function select_3_7_ab_cd(a,b,c,d,e,f,g,r) {
    if ( ! r(d, b)) {
        return select_3_7_ab_bc_dc(a,b,d,c,e,f,g,r);
    } else {
        return select_3_7_ab_cd_db(a,b,c,d,e,f,g,r);
    }
}

// level 1
function select_3_7_ab(a,b,c,d,e,f,g,r) {
    if ( ! r(d, c)) {
        return select_3_7_ab_cd(a,b,c,d,e,f,g,r);
    } else {
        return select_3_7_ab_cd(a,b,d,c,e,f,g,r);
    }
}

// level 0
function select_3_7(a,b,c,d,e,f,g,r) {
    if ( ! r(b, a)) {
        return select_3_7_ab(a,b,c,d,e,f,g,r);
    } else {
        return select_3_7_ab(b,a,c,d,e,f,g,r);        
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
    var m = select_3_7(
        new Block(4,4),
        new Block(1,1),
        new Block(2,2),
        new Block(3,3),
        new Block(5,5),
        new Block(6,6),
        new Block(7,4),
        lt);

    console.log(m);
}

main();