// import { stable_sort } from 'stable_sort.mjs';
const tao = require('./stable_sort');

class Block {
    constructor(id, time) {
      this.id = id;
      this.time = time;
    }
}

function lt(a, b){
    return a.time < b.time;
}

// ------------------------------------------------------------

function max(a, b, r) {
    return r(b, a) ? a : b;
}

function median_3_ab(a, b, c, r) {
    // precondition: a <= b
    
    return !r(c, b)
        ? b :           // a, b, c are sorted
        max(a, c, r); // b is not the median
}

function median_3(a, b, c, r) {
    return r(b, a)
        ? median_3_ab(b, a, c, r)
        : median_3_ab(a, b, c, r);
}

// ------------------------------------------------------------

// // unstable
// function median_3_generated(a, b, c, r) {
//     if (r(a, b)) {
//         if (r(a, c)) {
//             if (r(b, c)) {
//                 return b;
//             } else {
//                 return c;
//             }
//         } else {
//             return a;
//         }
//     } else {
//         if (r(a, c)) {
//             return a;
//         } else {
//             if (r(b, c)) {
//                 return c;
//             } else {
//                 return b;
//             }
//         }
//     }
// }

function median_3_generated_stable(a, b, c, r) {
    if (r(b, a)) {              
        if ( ! r(c, b)) {       // b < a          
            if ( ! r(c, a)) {   // b < a && b <= c: 
                return a;       // b < a && b <= c && a <= c: bac
            } else {
                return c;       // b < a && b <= c && c < a:  bca
            }
        } else {                
            return b;           // c < b && b < a: cba
        }
    } else {                    
        if ( ! r(c, b)) {       // a <= b
            return b;           // a <= b && b <= c
        } else {                
            if ( ! r(c, a)) {      // a <= b && c < b:  [a|c]b
                return c;       // a <= b && c < b && a <= c:  acb
            } else {
                return a;       // a <= b && c < b && c < a:  cab
            }
        }
    }
}

// ------------------------------------------------------------

// function median_5_generated(a, b, c, d, e, r) {
//     if (r(a, b)) {
//         if (r(c, d)) {
//             if (r(a, c)) {
//                 if (r(b, e)) {
//                     if (r(b, c)) {
//                         if (r(c, e)) {
//                             return c;
//                         } else {
//                             return e;
//                         }
//                     } else {
//                         if (r(b, d)) {
//                             return b;
//                         } else {
//                             return d;
//                         }
//                     }
//                 } else {
//                     if (r(c, e)) {
//                         if (r(d, e)) {
//                             return d;
//                         } else {
//                             return e;
//                         }
//                     } else {
//                         if (r(b, c)) {
//                             return b;
//                         } else {
//                             return c;
//                         }
//                     }
//                 }
//             } else {
//                 if (r(d, e)) {
//                     if (r(a, d)) {
//                         if (r(b, d)) {
//                             return b;
//                         } else {
//                             return d;
//                         }
//                     } else {
//                         if (r(a, e)) {
//                             return a;
//                         } else {
//                             return e;
//                         }
//                     }
//                 } else {
//                     if (r(a, e)) {
//                         if (r(b, e)) {
//                             return b;
//                         } else {
//                             return e;
//                         }
//                     } else {
//                         if (r(a, d)) {
//                             return a;
//                         } else {
//                             return d;
//                         }
//                     }
//                 }
//             }
//         } else {
//             if (r(a, d)) {
//                 if (r(b, e)) {
//                     if (r(b, d)) {
//                         if (r(d, e)) {
//                             return d;
//                         } else {
//                             return e;
//                         }
//                     } else {
//                         if (r(b, c)) {
//                             return b;
//                         } else {
//                             return c;
//                         }
//                     }
//                 } else {
//                     if (r(d, e)) {
//                         if (r(c, e)) {
//                             return c;
//                         } else {
//                             return e;
//                         }
//                     } else {
//                         if (r(b, d)) {
//                             return b;
//                         } else {
//                             return d;
//                         }
//                     }
//                 }
//             } else {
//                 if (r(c, e)) {
//                     if (r(a, c)) {
//                         if (r(b, c)) {
//                             return b;
//                         } else {
//                             return c;
//                         }
//                     } else {
//                         if (r(a, e)) {
//                             return a;
//                         } else {
//                             return e;
//                         }
//                     }
//                 } else {
//                     if (r(a, e)) {
//                         if (r(b, e)) {
//                             return b;
//                         } else {
//                             return e;
//                         }
//                     } else {
//                         if (r(a, c)) {
//                             return a;
//                         } else {
//                             return c;
//                         }
//                     }
//                 }
//             }
//         }
//     } else {
//         if (r(c, d)) {
//             if (r(a, d)) {
//                 if (r(c, e)) {
//                     if (r(a, e)) {
//                         if (r(a, c)) {
//                             return c;
//                         } else {
//                             return a;
//                         }
//                     } else {
//                         if (r(b, e)) {
//                             return e;
//                         } else {
//                             return b;
//                         }
//                     }
//                 } else {
//                     if (r(a, c)) {
//                         if (r(a, e)) {
//                             return e;
//                         } else {
//                             return a;
//                         }
//                     } else {
//                         if (r(b, c)) {
//                             return c;
//                         } else {
//                             return b;
//                         }
//                     }
//                 }
//             } else {
//                 if (r(b, e)) {
//                     if (r(d, e)) {
//                         if (r(b, d)) {
//                             return d;
//                         } else {
//                             return b;
//                         }
//                     } else {
//                         if (r(c, e)) {
//                             return e;
//                         } else {
//                             return c;
//                         }
//                     }
//                 } else {
//                     if (r(b, d)) {
//                         if (r(b, c)) {
//                             return c;
//                         } else {
//                             return b;
//                         }
//                     } else {
//                         if (r(d, e)) {
//                             return e;
//                         } else {
//                             return d;
//                         }
//                     }
//                 }
//             }
//         } else {
//             if (r(a, c)) {
//                 if (r(d, e)) {
//                     if (r(a, e)) {
//                         if (r(a, d)) {
//                             return d;
//                         } else {
//                             return a;
//                         }
//                     } else {
//                         if (r(b, e)) {
//                             return e;
//                         } else {
//                             return b;
//                         }
//                     }
//                 } else {
//                     if (r(a, d)) {
//                         if (r(a, e)) {
//                             return e;
//                         } else {
//                             return a;
//                         }
//                     } else {
//                         if (r(b, d)) {
//                             return d;
//                         } else {
//                             return b;
//                         }
//                     }
//                 }
//             } else {
//                 if (r(b, e)) {
//                     if (r(c, e)) {
//                         if (r(b, c)) {
//                             return c;
//                         } else {
//                             return b;
//                         }
//                     } else {
//                         if (r(d, e)) {
//                             return e;
//                         } else {
//                             return d;
//                         }
//                     }
//                 } else {
//                     if (r(b, c)) {
//                         if (r(b, d)) {
//                             return d;
//                         } else {
//                             return b;
//                         }
//                     } else {
//                         if (r(c, e)) {
//                             return e;
//                         } else {
//                             return c;
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }

function median_5_generated_stable(a, b, c, d, e, r) {
    if ( ! r(b, a)) {
        if ( ! r(d, c)) {
            if ( ! r(c, a)) {
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
                if ( ! r(e, d)) {
                    if ( ! r(d, a)) {
                        if ( ! r(d, b)) {
                            return b;
                        } else {
                            return d;
                        }
                    } else {
                        if ( ! r(e, a)) {
                            return a;
                        } else {
                            return e;
                        }
                    }
                } else {
                    if ( ! r(e, a)) {
                        if ( ! r(e, b)) {
                            return b;
                        } else {
                            return e;
                        }
                    } else {
                        if ( ! r(d, a)) {
                            return a;
                        } else {
                            return d;
                        }
                    }
                }
            }
        } else {
            if ( ! r(d, a)) {
                if ( ! r(e, b)) {
                    if ( ! r(d, b)) {
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
                } else {
                    if ( ! r(e, d)) {
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
                }
            } else {
                if ( ! r(e, c)) {
                    if ( ! r(c, a)) {
                        if ( ! r(c, b)) {
                            return b;
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
                    if ( ! r(e, a)) {
                        if ( ! r(e, b)) {
                            return b;
                        } else {
                            return e;
                        }
                    } else {
                        if ( ! r(c, a)) {
                            return a;
                        } else {
                            return c;
                        }
                    }
                }
            }
        }
    } else {
        if ( ! r(d, c)) {
            if ( ! r(d, a)) {
                if ( ! r(e, c)) {
                    if ( ! r(e, a)) {
                        if ( ! r(c, a)) {
                            return c;
                        } else {
                            return a;
                        }
                    } else {
                        if ( ! r(e, b)) {
                            return e;
                        } else {
                            return b;
                        }
                    }
                } else {
                    if ( ! r(c, a)) {
                        if ( ! r(e, a)) {
                            return e;
                        } else {
                            return a;
                        }
                    } else {
                        if ( ! r(c, b)) {
                            return c;
                        } else {
                            return b;
                        }
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
        } else {
            if ( ! r(c, a)) {
                if ( ! r(e, d)) {
                    if ( ! r(e, a)) {
                        if ( ! r(d, a)) {
                            return d;
                        } else {
                            return a;
                        }
                    } else {
                        if ( ! r(e, b)) {
                            return e;
                        } else {
                            return b;
                        }
                    }
                } else {
                    if ( ! r(d, a)) {
                        if ( ! r(e, a)) {
                            return e;
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
            } else {
                if ( ! r(e, b)) {
                    if ( ! r(e, c)) {
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
                } else {
                    if ( ! r(c, b)) {
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
                }
            }
        }
    }
}

function median_7_generated(a, b, c, d, e, f, g, r) {
    if ( ! r(b, a)) {
        if ( ! r(d, c)) {
            if ( ! r(d, b)) {
                if ( ! r(f, e)) {
                    if ( ! r(f, b)) {
                        if ( ! r(e, b)) {
                            if ( ! r(g, e)) {
                                if ( ! r(e, c)) {
                                    if ( ! r(e, d)) {
                                        return d;
                                    } else {
                                        return e;
                                    }
                                } else {
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
                                }
                            } else {
                                if ( ! r(g, b)) {
                                    if ( ! r(g, c)) {
                                        if ( ! r(g, d)) {
                                            return d;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        if ( ! r(e, c)) {
                                            return c;
                                        } else {
                                            return e;
                                        }
                                    }
                                } else {
                                    if ( ! r(e, c)) {
                                        if ( ! r(c, b)) {
                                            return c;
                                        } else {
                                            return b;
                                        }
                                    } else {
                                        return e;
                                    }
                                }
                            }
                        } else {
                            if ( ! r(g, c)) {
                                if ( ! r(g, b)) {
                                    if ( ! r(f, c)) {
                                        if ( ! r(c, b)) {
                                            return c;
                                        } else {
                                            return b;
                                        }
                                    } else {
                                        return f;
                                    }
                                } else {
                                    if ( ! r(g, e)) {
                                        if ( ! r(g, a)) {
                                            return g;
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
                            } else {
                                if ( ! r(c, b)) {
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
                                    if ( ! r(e, c)) {
                                        if ( ! r(e, a)) {
                                            return e;
                                        } else {
                                            return a;
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
                        }
                    } else {
                        if ( ! r(c, a)) {
                            if ( ! r(g, c)) {
                                if ( ! r(e, c)) {
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
                                    if ( ! r(f, c)) {
                                        if ( ! r(g, f)) {
                                            return f;
                                        } else {
                                            return g;
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
                                if ( ! r(g, f)) {
                                    if ( ! r(g, b)) {
                                        return b;
                                    } else {
                                        if ( ! r(g, a)) {
                                            return g;
                                        } else {
                                            return a;
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
                            }
                        } else {
                            if ( ! r(e, c)) {
                                if ( ! r(g, a)) {
                                    if ( ! r(g, f)) {
                                        if ( ! r(f, a)) {
                                            return f;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(g, e)) {
                                            return g;
                                        } else {
                                            return e;
                                        }
                                    }
                                } else {
                                    if ( ! r(f, a)) {
                                        if ( ! r(e, a)) {
                                            return e;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(g, f)) {
                                            return g;
                                        } else {
                                            return f;
                                        }
                                    }
                                }
                            } else {
                                if ( ! r(g, f)) {
                                    if ( ! r(g, a)) {
                                        if ( ! r(f, a)) {
                                            return f;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(g, c)) {
                                            return g;
                                        } else {
                                            return c;
                                        }
                                    }
                                } else {
                                    if ( ! r(f, a)) {
                                        if ( ! r(g, a)) {
                                            return g;
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
                                }
                            }
                        }
                    }
                } else {
                    if ( ! r(e, b)) {
                        if ( ! r(f, b)) {
                            if ( ! r(g, c)) {
                                if ( ! r(g, f)) {
                                    if ( ! r(f, c)) {
                                        if ( ! r(f, d)) {
                                            return d;
                                        } else {
                                            return f;
                                        }
                                    } else {
                                        if ( ! r(e, c)) {
                                            return c;
                                        } else {
                                            return e;
                                        }
                                    }
                                } else {
                                    if ( ! r(g, b)) {
                                        if ( ! r(g, d)) {
                                            return d;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        return b;
                                    }
                                }
                            } else {
                                if ( ! r(e, c)) {
                                    if ( ! r(f, c)) {
                                        if ( ! r(c, b)) {
                                            return c;
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
                                } else {
                                    if ( ! r(g, e)) {
                                        return e;
                                    } else {
                                        if ( ! r(g, f)) {
                                            return g;
                                        } else {
                                            return f;
                                        }
                                    }
                                }
                            }
                        } else {
                            if ( ! r(g, c)) {
                                if ( ! r(g, b)) {
                                    if ( ! r(e, c)) {
                                        if ( ! r(c, b)) {
                                            return c;
                                        } else {
                                            return b;
                                        }
                                    } else {
                                        return e;
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
                                if ( ! r(c, b)) {
                                    if ( ! r(g, e)) {
                                        return e;
                                    } else {
                                        if ( ! r(g, b)) {
                                            return g;
                                        } else {
                                            return b;
                                        }
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
                    } else {
                        if ( ! r(e, c)) {
                            if ( ! r(c, a)) {
                                if ( ! r(g, e)) {
                                    return e;
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
                            } else {
                                if ( ! r(g, a)) {
                                    if ( ! r(g, e)) {
                                        if ( ! r(e, a)) {
                                            return e;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(g, f)) {
                                            return g;
                                        } else {
                                            return f;
                                        }
                                    }
                                } else {
                                    if ( ! r(e, a)) {
                                        if ( ! r(f, a)) {
                                            return f;
                                        } else {
                                            return a;
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
                                if ( ! r(g, c)) {
                                    if ( ! r(c, a)) {
                                        if ( ! r(c, b)) {
                                            return b;
                                        } else {
                                            return c;
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
                                        if ( ! r(c, a)) {
                                            return a;
                                        } else {
                                            return c;
                                        }
                                    }
                                }
                            } else {
                                if ( ! r(c, a)) {
                                    if ( ! r(e, a)) {
                                        return e;
                                    } else {
                                        return a;
                                    }
                                } else {
                                    return c;
                                }
                            }
                        }
                    }
                }
            } else {
                if ( ! r(f, e)) {
                    if ( ! r(g, a)) {
                        if ( ! r(f, d)) {
                            if ( ! r(e, d)) {
                                if ( ! r(g, e)) {
                                    if ( ! r(e, a)) {
                                        if ( ! r(e, b)) {
                                            return b;
                                        } else {
                                            return e;
                                        }
                                    } else {
                                        if ( ! r(f, a)) {
                                            return a;
                                        } else {
                                            return f;
                                        }
                                    }
                                } else {
                                    if ( ! r(g, b)) {
                                        return b;
                                    } else {
                                        if ( ! r(g, d)) {
                                            return g;
                                        } else {
                                            return d;
                                        }
                                    }
                                }
                            } else {
                                if ( ! r(g, d)) {
                                    if ( ! r(d, a)) {
                                        return d;
                                    } else {
                                        if ( ! r(f, a)) {
                                            return a;
                                        } else {
                                            return f;
                                        }
                                    }
                                } else {
                                    if ( ! r(e, c)) {
                                        if ( ! r(g, e)) {
                                            return g;
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
                                }
                            }
                        } else {
                            if ( ! r(c, a)) {
                                if ( ! r(g, c)) {
                                    if ( ! r(g, f)) {
                                        if ( ! r(f, c)) {
                                            return f;
                                        } else {
                                            return c;
                                        }
                                    } else {
                                        if ( ! r(g, e)) {
                                            return g;
                                        } else {
                                            return e;
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
                                        if ( ! r(g, f)) {
                                            return g;
                                        } else {
                                            return f;
                                        }
                                    }
                                }
                            } else {
                                if ( ! r(g, e)) {
                                    if ( ! r(f, a)) {
                                        if ( ! r(g, f)) {
                                            return f;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        if ( ! r(d, a)) {
                                            return a;
                                        } else {
                                            return d;
                                        }
                                    }
                                } else {
                                    return e;
                                }
                            }
                        }
                    } else {
                        if ( ! r(e, c)) {
                            if ( ! r(g, e)) {
                                if ( ! r(f, d)) {
                                    if ( ! r(g, d)) {
                                        if ( ! r(g, f)) {
                                            return f;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        if ( ! r(d, a)) {
                                            return a;
                                        } else {
                                            return d;
                                        }
                                    }
                                } else {
                                    if ( ! r(g, f)) {
                                        if ( ! r(g, d)) {
                                            return d;
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
                            } else {
                                if ( ! r(d, a)) {
                                    if ( ! r(e, a)) {
                                        if ( ! r(e, d)) {
                                            return d;
                                        } else {
                                            return e;
                                        }
                                    } else {
                                        if ( ! r(f, a)) {
                                            return a;
                                        } else {
                                            return f;
                                        }
                                    }
                                } else {
                                    if ( ! r(e, d)) {
                                        if ( ! r(e, a)) {
                                            return a;
                                        } else {
                                            return e;
                                        }
                                    } else {
                                        if ( ! r(f, d)) {
                                            return d;
                                        } else {
                                            return f;
                                        }
                                    }
                                }
                            }
                        } else {
                            if ( ! r(d, a)) {
                                if ( ! r(f, c)) {
                                    if ( ! r(f, a)) {
                                        if ( ! r(c, a)) {
                                            return c;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(g, f)) {
                                            return g;
                                        } else {
                                            return f;
                                        }
                                    }
                                } else {
                                    if ( ! r(c, a)) {
                                        if ( ! r(f, a)) {
                                            return f;
                                        } else {
                                            return a;
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
                                if ( ! r(g, f)) {
                                    if ( ! r(g, d)) {
                                        if ( ! r(f, d)) {
                                            return f;
                                        } else {
                                            return d;
                                        }
                                    } else {
                                        if ( ! r(g, c)) {
                                            return g;
                                        } else {
                                            return c;
                                        }
                                    }
                                } else {
                                    if ( ! r(f, d)) {
                                        if ( ! r(g, d)) {
                                            return g;
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
                        }
                    }
                } else {
                    if ( ! r(e, d)) {
                        if ( ! r(d, a)) {
                            if ( ! r(g, f)) {
                                if ( ! r(g, d)) {
                                    if ( ! r(f, b)) {
                                        return b;
                                    } else {
                                        if ( ! r(f, d)) {
                                            return f;
                                        } else {
                                            return d;
                                        }
                                    }
                                } else {
                                    if ( ! r(c, a)) {
                                        if ( ! r(g, c)) {
                                            return g;
                                        } else {
                                            return c;
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
                                if ( ! r(f, d)) {
                                    if ( ! r(g, b)) {
                                        return b;
                                    } else {
                                        if ( ! r(g, d)) {
                                            return g;
                                        } else {
                                            return d;
                                        }
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
                        } else {
                            if ( ! r(g, a)) {
                                if ( ! r(f, b)) {
                                    if ( ! r(g, b)) {
                                        return b;
                                    } else {
                                        return g;
                                    }
                                } else {
                                    if ( ! r(f, a)) {
                                        if ( ! r(g, f)) {
                                            return f;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        if ( ! r(e, a)) {
                                            return a;
                                        } else {
                                            return e;
                                        }
                                    }
                                }
                            } else {
                                if ( ! r(f, d)) {
                                    if ( ! r(g, f)) {
                                        if ( ! r(g, e)) {
                                            return e;
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
                                } else {
                                    if ( ! r(g, e)) {
                                        return e;
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
                    } else {
                        if ( ! r(e, c)) {
                            if ( ! r(g, a)) {
                                if ( ! r(g, e)) {
                                    if ( ! r(d, a)) {
                                        if ( ! r(e, a)) {
                                            return e;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        return d;
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
                            } else {
                                if ( ! r(e, a)) {
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
                                } else {
                                    if ( ! r(g, e)) {
                                        if ( ! r(g, d)) {
                                            return d;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        return e;
                                    }
                                }
                            }
                        } else {
                            if ( ! r(c, a)) {
                                if ( ! r(g, e)) {
                                    if ( ! r(g, a)) {
                                        if ( ! r(g, c)) {
                                            return c;
                                        } else {
                                            return g;
                                        }
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
                            } else {
                                if ( ! r(d, a)) {
                                    if ( ! r(g, a)) {
                                        return a;
                                    } else {
                                        if ( ! r(g, c)) {
                                            return g;
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
                    }
                }
            }
        } else {
            if ( ! r(f, e)) {
                if ( ! r(f, b)) {
                    if ( ! r(g, e)) {
                        if ( ! r(g, b)) {
                            if ( ! r(d, b)) {
                                if ( ! r(e, d)) {
                                    if ( ! r(e, c)) {
                                        return c;
                                    } else {
                                        return e;
                                    }
                                } else {
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
                                }
                            } else {
                                if ( ! r(e, c)) {
                                    if ( ! r(e, b)) {
                                        if ( ! r(c, b)) {
                                            return c;
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
                                    if ( ! r(c, b)) {
                                        if ( ! r(e, b)) {
                                            return e;
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
                        } else {
                            if ( ! r(c, a)) {
                                if ( ! r(g, d)) {
                                    if ( ! r(g, c)) {
                                        if ( ! r(e, c)) {
                                            return e;
                                        } else {
                                            return c;
                                        }
                                    } else {
                                        if ( ! r(g, a)) {
                                            return g;
                                        } else {
                                            return a;
                                        }
                                    }
                                } else {
                                    if ( ! r(d, b)) {
                                        return b;
                                    } else {
                                        if ( ! r(d, a)) {
                                            return d;
                                        } else {
                                            return a;
                                        }
                                    }
                                }
                            } else {
                                if ( ! r(e, c)) {
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
                                    if ( ! r(g, a)) {
                                        return a;
                                    } else {
                                        if ( ! r(g, c)) {
                                            return g;
                                        } else {
                                            return c;
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if ( ! r(e, b)) {
                            if ( ! r(d, b)) {
                                if ( ! r(e, c)) {
                                    if ( ! r(g, c)) {
                                        return c;
                                    } else {
                                        if ( ! r(g, d)) {
                                            return g;
                                        } else {
                                            return d;
                                        }
                                    }
                                } else {
                                    if ( ! r(e, d)) {
                                        if ( ! r(g, d)) {
                                            return g;
                                        } else {
                                            return d;
                                        }
                                    } else {
                                        return e;
                                    }
                                }
                            } else {
                                if ( ! r(g, c)) {
                                    if ( ! r(g, b)) {
                                        if ( ! r(c, b)) {
                                            return c;
                                        } else {
                                            return b;
                                        }
                                    } else {
                                        if ( ! r(g, a)) {
                                            return g;
                                        } else {
                                            return a;
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
                                        if ( ! r(c, a)) {
                                            return c;
                                        } else {
                                            return a;
                                        }
                                    }
                                }
                            }
                        } else {
                            if ( ! r(e, c)) {
                                if ( ! r(c, a)) {
                                    if ( ! r(g, c)) {
                                        return g;
                                    } else {
                                        return c;
                                    }
                                } else {
                                    if ( ! r(e, a)) {
                                        if ( ! r(g, a)) {
                                            return g;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        return e;
                                    }
                                }
                            } else {
                                if ( ! r(e, d)) {
                                    if ( ! r(c, a)) {
                                        if ( ! r(e, a)) {
                                            return e;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        return c;
                                    }
                                } else {
                                    if ( ! r(d, a)) {
                                        if ( ! r(d, b)) {
                                            return b;
                                        } else {
                                            return d;
                                        }
                                    } else {
                                        if ( ! r(c, a)) {
                                            return a;
                                        } else {
                                            return c;
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if ( ! r(f, c)) {
                        if ( ! r(e, c)) {
                            if ( ! r(c, a)) {
                                if ( ! r(g, e)) {
                                    return e;
                                } else {
                                    if ( ! r(g, c)) {
                                        return g;
                                    } else {
                                        return c;
                                    }
                                }
                            } else {
                                if ( ! r(g, a)) {
                                    if ( ! r(e, a)) {
                                        if ( ! r(g, e)) {
                                            return e;
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
                                } else {
                                    if ( ! r(g, e)) {
                                        if ( ! r(g, f)) {
                                            return f;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        if ( ! r(e, a)) {
                                            return a;
                                        } else {
                                            return e;
                                        }
                                    }
                                }
                            }
                        } else {
                            if ( ! r(g, a)) {
                                if ( ! r(g, c)) {
                                    if ( ! r(c, a)) {
                                        return c;
                                    } else {
                                        if ( ! r(f, a)) {
                                            return a;
                                        } else {
                                            return f;
                                        }
                                    }
                                } else {
                                    if ( ! r(g, e)) {
                                        if ( ! r(g, d)) {
                                            return g;
                                        } else {
                                            return d;
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
                                if ( ! r(c, a)) {
                                    if ( ! r(e, d)) {
                                        if ( ! r(e, a)) {
                                            return e;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(d, a)) {
                                            return d;
                                        } else {
                                            return a;
                                        }
                                    }
                                } else {
                                    if ( ! r(g, c)) {
                                        if ( ! r(g, f)) {
                                            return f;
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
                        if ( ! r(d, a)) {
                            if ( ! r(g, d)) {
                                if ( ! r(d, b)) {
                                    return b;
                                } else {
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
                                }
                            } else {
                                if ( ! r(g, f)) {
                                    if ( ! r(g, b)) {
                                        return b;
                                    } else {
                                        if ( ! r(g, a)) {
                                            return g;
                                        } else {
                                            return a;
                                        }
                                    }
                                } else {
                                    if ( ! r(f, d)) {
                                        if ( ! r(e, d)) {
                                            return e;
                                        } else {
                                            return d;
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
                        } else {
                            if ( ! r(g, a)) {
                                if ( ! r(c, a)) {
                                    if ( ! r(g, f)) {
                                        if ( ! r(f, a)) {
                                            return f;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(g, e)) {
                                            return g;
                                        } else {
                                            return e;
                                        }
                                    }
                                } else {
                                    return c;
                                }
                            } else {
                                if ( ! r(g, f)) {
                                    if ( ! r(g, c)) {
                                        return c;
                                    } else {
                                        if ( ! r(g, d)) {
                                            return g;
                                        } else {
                                            return d;
                                        }
                                    }
                                } else {
                                    if ( ! r(f, a)) {
                                        if ( ! r(e, a)) {
                                            return e;
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
                            }
                        }
                    }
                }
            } else {
                if ( ! r(e, b)) {
                    if ( ! r(c, b)) {
                        if ( ! r(d, b)) {
                            if ( ! r(g, d)) {
                                if ( ! r(f, c)) {
                                    if ( ! r(g, c)) {
                                        return c;
                                    } else {
                                        return g;
                                    }
                                } else {
                                    if ( ! r(f, d)) {
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
                                }
                            } else {
                                if ( ! r(f, b)) {
                                    if ( ! r(g, f)) {
                                        if ( ! r(g, e)) {
                                            return e;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        if ( ! r(f, d)) {
                                            return d;
                                        } else {
                                            return f;
                                        }
                                    }
                                } else {
                                    if ( ! r(g, e)) {
                                        return e;
                                    } else {
                                        if ( ! r(g, b)) {
                                            return g;
                                        } else {
                                            return b;
                                        }
                                    }
                                }
                            }
                        } else {
                            if ( ! r(g, f)) {
                                if ( ! r(g, b)) {
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
                                    if ( ! r(d, a)) {
                                        if ( ! r(g, d)) {
                                            return g;
                                        } else {
                                            return d;
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
                                if ( ! r(f, b)) {
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
                                    if ( ! r(d, a)) {
                                        if ( ! r(f, d)) {
                                            return f;
                                        } else {
                                            return d;
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
                    } else {
                        if ( ! r(c, a)) {
                            if ( ! r(g, f)) {
                                if ( ! r(g, c)) {
                                    if ( ! r(f, b)) {
                                        return b;
                                    } else {
                                        if ( ! r(f, c)) {
                                            return f;
                                        } else {
                                            return c;
                                        }
                                    }
                                } else {
                                    if ( ! r(d, a)) {
                                        if ( ! r(g, d)) {
                                            return g;
                                        } else {
                                            return d;
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
                                if ( ! r(f, c)) {
                                    if ( ! r(g, b)) {
                                        return b;
                                    } else {
                                        if ( ! r(g, c)) {
                                            return g;
                                        } else {
                                            return c;
                                        }
                                    }
                                } else {
                                    if ( ! r(d, a)) {
                                        if ( ! r(f, d)) {
                                            return f;
                                        } else {
                                            return d;
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
                        } else {
                            if ( ! r(f, b)) {
                                if ( ! r(g, b)) {
                                    return b;
                                } else {
                                    if ( ! r(g, a)) {
                                        return g;
                                    } else {
                                        return a;
                                    }
                                }
                            } else {
                                if ( ! r(g, f)) {
                                    if ( ! r(g, a)) {
                                        if ( ! r(f, a)) {
                                            return f;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(g, c)) {
                                            return g;
                                        } else {
                                            return c;
                                        }
                                    }
                                } else {
                                    if ( ! r(f, a)) {
                                        if ( ! r(g, a)) {
                                            return g;
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
                                }
                            }
                        }
                    }
                } else {
                    if ( ! r(e, c)) {
                        if ( ! r(c, a)) {
                            if ( ! r(d, a)) {
                                if ( ! r(g, f)) {
                                    if ( ! r(g, c)) {
                                        if ( ! r(f, c)) {
                                            return f;
                                        } else {
                                            return c;
                                        }
                                    } else {
                                        if ( ! r(g, d)) {
                                            return g;
                                        } else {
                                            return d;
                                        }
                                    }
                                } else {
                                    if ( ! r(f, c)) {
                                        if ( ! r(g, c)) {
                                            return g;
                                        } else {
                                            return c;
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
                                if ( ! r(g, f)) {
                                    if ( ! r(g, c)) {
                                        if ( ! r(f, c)) {
                                            return f;
                                        } else {
                                            return c;
                                        }
                                    } else {
                                        if ( ! r(g, a)) {
                                            return g;
                                        } else {
                                            return a;
                                        }
                                    }
                                } else {
                                    if ( ! r(f, c)) {
                                        if ( ! r(g, c)) {
                                            return g;
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
                        } else {
                            if ( ! r(g, e)) {
                                if ( ! r(e, a)) {
                                    if ( ! r(f, a)) {
                                        return f;
                                    } else {
                                        return a;
                                    }
                                } else {
                                    return e;
                                }
                            } else {
                                if ( ! r(g, f)) {
                                    if ( ! r(g, a)) {
                                        if ( ! r(f, a)) {
                                            return f;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(g, c)) {
                                            return g;
                                        } else {
                                            return c;
                                        }
                                    }
                                } else {
                                    if ( ! r(f, a)) {
                                        if ( ! r(g, a)) {
                                            return g;
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
                                }
                            }
                        }
                    } else {
                        if ( ! r(g, e)) {
                            if ( ! r(d, a)) {
                                if ( ! r(d, b)) {
                                    if ( ! r(g, b)) {
                                        return b;
                                    } else {
                                        if ( ! r(g, a)) {
                                            return g;
                                        } else {
                                            return a;
                                        }
                                    }
                                } else {
                                    if ( ! r(g, d)) {
                                        if ( ! r(e, d)) {
                                            return e;
                                        } else {
                                            return d;
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
                                if ( ! r(c, a)) {
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
                                    if ( ! r(g, c)) {
                                        return c;
                                    } else {
                                        if ( ! r(g, d)) {
                                            return g;
                                        } else {
                                            return d;
                                        }
                                    }
                                }
                            }
                        } else {
                            if ( ! r(d, a)) {
                                if ( ! r(e, d)) {
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
                                } else {
                                    if ( ! r(e, a)) {
                                        return e;
                                    } else {
                                        return a;
                                    }
                                }
                            } else {
                                if ( ! r(e, a)) {
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
            }
        }
    } else {
        if ( ! r(d, c)) {
            if ( ! r(f, e)) {
                if ( ! r(e, b)) {
                    if ( ! r(e, c)) {
                        if ( ! r(g, e)) {
                            if ( ! r(d, a)) {
                                if ( ! r(e, a)) {
                                    if ( ! r(e, d)) {
                                        return d;
                                    } else {
                                        return e;
                                    }
                                } else {
                                    if ( ! r(f, a)) {
                                        if ( ! r(g, a)) {
                                            return a;
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
                                }
                            } else {
                                if ( ! r(e, d)) {
                                    if ( ! r(e, a)) {
                                        return a;
                                    } else {
                                        return e;
                                    }
                                } else {
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
                                }
                            }
                        } else {
                            if ( ! r(d, a)) {
                                if ( ! r(c, a)) {
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
                                    if ( ! r(g, a)) {
                                        if ( ! r(g, d)) {
                                            return d;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        if ( ! r(e, a)) {
                                            return a;
                                        } else {
                                            return e;
                                        }
                                    }
                                }
                            } else {
                                if ( ! r(d, b)) {
                                    if ( ! r(g, d)) {
                                        if ( ! r(g, a)) {
                                            return a;
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
                                        if ( ! r(g, a)) {
                                            return a;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        return b;
                                    }
                                }
                            }
                        }
                    } else {
                        if ( ! r(c, a)) {
                            if ( ! r(g, e)) {
                                if ( ! r(g, f)) {
                                    if ( ! r(f, a)) {
                                        if ( ! r(f, c)) {
                                            return c;
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
                                        if ( ! r(g, c)) {
                                            return c;
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
                            } else {
                                if ( ! r(e, a)) {
                                    return e;
                                } else {
                                    if ( ! r(f, a)) {
                                        return a;
                                    } else {
                                        return f;
                                    }
                                }
                            }
                        } else {
                            if ( ! r(d, a)) {
                                if ( ! r(g, f)) {
                                    if ( ! r(f, c)) {
                                        if ( ! r(f, a)) {
                                            return a;
                                        } else {
                                            return f;
                                        }
                                    } else {
                                        if ( ! r(g, c)) {
                                            return c;
                                        } else {
                                            return g;
                                        }
                                    }
                                } else {
                                    if ( ! r(g, c)) {
                                        if ( ! r(g, a)) {
                                            return a;
                                        } else {
                                            return g;
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
                                if ( ! r(g, f)) {
                                    if ( ! r(f, c)) {
                                        if ( ! r(f, d)) {
                                            return d;
                                        } else {
                                            return f;
                                        }
                                    } else {
                                        if ( ! r(g, c)) {
                                            return c;
                                        } else {
                                            return g;
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
                                        if ( ! r(f, c)) {
                                            return c;
                                        } else {
                                            return f;
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if ( ! r(c, b)) {
                        if ( ! r(c, a)) {
                            if ( ! r(f, b)) {
                                if ( ! r(g, f)) {
                                    if ( ! r(f, a)) {
                                        if ( ! r(f, c)) {
                                            return c;
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
                                        if ( ! r(g, c)) {
                                            return c;
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
                            } else {
                                if ( ! r(g, b)) {
                                    if ( ! r(g, a)) {
                                        return a;
                                    } else {
                                        return g;
                                    }
                                } else {
                                    return b;
                                }
                            }
                        } else {
                            if ( ! r(g, f)) {
                                if ( ! r(f, c)) {
                                    if ( ! r(d, a)) {
                                        if ( ! r(f, a)) {
                                            return a;
                                        } else {
                                            return f;
                                        }
                                    } else {
                                        if ( ! r(f, d)) {
                                            return d;
                                        } else {
                                            return f;
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
                                        return b;
                                    }
                                }
                            } else {
                                if ( ! r(g, c)) {
                                    if ( ! r(d, a)) {
                                        if ( ! r(g, a)) {
                                            return a;
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
                                    if ( ! r(f, b)) {
                                        if ( ! r(f, c)) {
                                            return c;
                                        } else {
                                            return f;
                                        }
                                    } else {
                                        return b;
                                    }
                                }
                            }
                        }
                    } else {
                        if ( ! r(d, b)) {
                            if ( ! r(g, f)) {
                                if ( ! r(f, b)) {
                                    if ( ! r(d, a)) {
                                        if ( ! r(f, a)) {
                                            return a;
                                        } else {
                                            return f;
                                        }
                                    } else {
                                        if ( ! r(f, d)) {
                                            return d;
                                        } else {
                                            return f;
                                        }
                                    }
                                } else {
                                    if ( ! r(g, b)) {
                                        return b;
                                    } else {
                                        if ( ! r(g, c)) {
                                            return g;
                                        } else {
                                            return c;
                                        }
                                    }
                                }
                            } else {
                                if ( ! r(g, b)) {
                                    if ( ! r(d, a)) {
                                        if ( ! r(g, a)) {
                                            return a;
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
                                    if ( ! r(f, b)) {
                                        return b;
                                    } else {
                                        if ( ! r(f, c)) {
                                            return f;
                                        } else {
                                            return c;
                                        }
                                    }
                                }
                            }
                        } else {
                            if ( ! r(g, d)) {
                                if ( ! r(f, b)) {
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
                                }
                            } else {
                                if ( ! r(f, c)) {
                                    if ( ! r(f, d)) {
                                        if ( ! r(e, d)) {
                                            return e;
                                        } else {
                                            return d;
                                        }
                                    } else {
                                        if ( ! r(g, f)) {
                                            return g;
                                        } else {
                                            return f;
                                        }
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
                    }
                }
            } else {
                if ( ! r(f, b)) {
                    if ( ! r(f, c)) {
                        if ( ! r(d, a)) {
                            if ( ! r(g, a)) {
                                if ( ! r(g, f)) {
                                    if ( ! r(f, a)) {
                                        if ( ! r(f, d)) {
                                            return d;
                                        } else {
                                            return f;
                                        }
                                    } else {
                                        if ( ! r(e, a)) {
                                            return a;
                                        } else {
                                            return e;
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
                            } else {
                                if ( ! r(c, a)) {
                                    return c;
                                } else {
                                    if ( ! r(g, f)) {
                                        if ( ! r(g, e)) {
                                            return e;
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
                        } else {
                            if ( ! r(g, d)) {
                                if ( ! r(g, f)) {
                                    if ( ! r(f, d)) {
                                        if ( ! r(f, a)) {
                                            return a;
                                        } else {
                                            return f;
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
                                        if ( ! r(g, a)) {
                                            return a;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        return b;
                                    }
                                }
                            } else {
                                if ( ! r(d, b)) {
                                    if ( ! r(g, f)) {
                                        if ( ! r(g, e)) {
                                            return e;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        if ( ! r(f, d)) {
                                            return d;
                                        } else {
                                            return f;
                                        }
                                    }
                                } else {
                                    return b;
                                }
                            }
                        }
                    } else {
                        if ( ! r(e, c)) {
                            if ( ! r(g, a)) {
                                if ( ! r(c, a)) {
                                    if ( ! r(g, c)) {
                                        return c;
                                    } else {
                                        if ( ! r(g, f)) {
                                            return g;
                                        } else {
                                            return f;
                                        }
                                    }
                                } else {
                                    if ( ! r(e, d)) {
                                        if ( ! r(d, a)) {
                                            return a;
                                        } else {
                                            return d;
                                        }
                                    } else {
                                        if ( ! r(e, a)) {
                                            return a;
                                        } else {
                                            return e;
                                        }
                                    }
                                }
                            } else {
                                if ( ! r(g, c)) {
                                    if ( ! r(g, e)) {
                                        if ( ! r(e, d)) {
                                            return d;
                                        } else {
                                            return e;
                                        }
                                    } else {
                                        if ( ! r(g, d)) {
                                            return d;
                                        } else {
                                            return g;
                                        }
                                    }
                                } else {
                                    if ( ! r(c, a)) {
                                        if ( ! r(f, a)) {
                                            return f;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        return c;
                                    }
                                }
                            }
                        } else {
                            if ( ! r(c, a)) {
                                if ( ! r(g, a)) {
                                    if ( ! r(g, e)) {
                                        if ( ! r(e, a)) {
                                            return e;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(g, f)) {
                                            return g;
                                        } else {
                                            return f;
                                        }
                                    }
                                } else {
                                    if ( ! r(e, a)) {
                                        if ( ! r(f, a)) {
                                            return f;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(g, e)) {
                                            return g;
                                        } else {
                                            return e;
                                        }
                                    }
                                }
                            } else {
                                if ( ! r(g, e)) {
                                    if ( ! r(g, c)) {
                                        return c;
                                    } else {
                                        return g;
                                    }
                                } else {
                                    return e;
                                }
                            }
                        }
                    }
                } else {
                    if ( ! r(g, e)) {
                        if ( ! r(e, b)) {
                            if ( ! r(e, c)) {
                                if ( ! r(e, d)) {
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
                                } else {
                                    if ( ! r(c, a)) {
                                        return c;
                                    } else {
                                        if ( ! r(e, a)) {
                                            return a;
                                        } else {
                                            return e;
                                        }
                                    }
                                }
                            } else {
                                if ( ! r(c, a)) {
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
                                    if ( ! r(g, c)) {
                                        return c;
                                    } else {
                                        return g;
                                    }
                                }
                            }
                        } else {
                            if ( ! r(d, b)) {
                                if ( ! r(g, c)) {
                                    if ( ! r(c, b)) {
                                        if ( ! r(c, a)) {
                                            return a;
                                        } else {
                                            return c;
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
                                        if ( ! r(g, a)) {
                                            return a;
                                        } else {
                                            return g;
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
                                if ( ! r(e, c)) {
                                    if ( ! r(e, d)) {
                                        return e;
                                    } else {
                                        if ( ! r(g, d)) {
                                            return d;
                                        } else {
                                            return g;
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
                        if ( ! r(g, b)) {
                            if ( ! r(c, a)) {
                                if ( ! r(e, c)) {
                                    if ( ! r(g, a)) {
                                        if ( ! r(g, c)) {
                                            return c;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        return a;
                                    }
                                } else {
                                    if ( ! r(e, a)) {
                                        if ( ! r(g, a)) {
                                            return g;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        return e;
                                    }
                                }
                            } else {
                                if ( ! r(g, d)) {
                                    if ( ! r(d, b)) {
                                        if ( ! r(d, a)) {
                                            return a;
                                        } else {
                                            return d;
                                        }
                                    } else {
                                        return b;
                                    }
                                } else {
                                    if ( ! r(g, c)) {
                                        if ( ! r(g, a)) {
                                            return a;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        if ( ! r(e, c)) {
                                            return c;
                                        } else {
                                            return e;
                                        }
                                    }
                                }
                            }
                        } else {
                            if ( ! r(d, b)) {
                                if ( ! r(e, c)) {
                                    if ( ! r(c, b)) {
                                        if ( ! r(c, a)) {
                                            return a;
                                        } else {
                                            return c;
                                        }
                                    } else {
                                        if ( ! r(e, b)) {
                                            return b;
                                        } else {
                                            return e;
                                        }
                                    }
                                } else {
                                    if ( ! r(e, b)) {
                                        if ( ! r(e, a)) {
                                            return a;
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
                                if ( ! r(e, d)) {
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
                }
            }
        } else {
            if ( ! r(d, b)) {
                if ( ! r(f, e)) {
                    if ( ! r(e, d)) {
                        if ( ! r(e, c)) {
                            if ( ! r(c, a)) {
                                if ( ! r(d, a)) {
                                    if ( ! r(g, c)) {
                                        return c;
                                    } else {
                                        if ( ! r(g, d)) {
                                            return g;
                                        } else {
                                            return d;
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
                                if ( ! r(g, e)) {
                                    if ( ! r(e, a)) {
                                        return a;
                                    } else {
                                        return e;
                                    }
                                } else {
                                    if ( ! r(g, a)) {
                                        return a;
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
                            if ( ! r(g, a)) {
                                if ( ! r(e, a)) {
                                    if ( ! r(g, e)) {
                                        return e;
                                    } else {
                                        if ( ! r(g, d)) {
                                            return g;
                                        } else {
                                            return d;
                                        }
                                    }
                                } else {
                                    if ( ! r(c, a)) {
                                        if ( ! r(f, a)) {
                                            return a;
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
                                }
                            } else {
                                if ( ! r(g, e)) {
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
                                    if ( ! r(d, a)) {
                                        return d;
                                    } else {
                                        if ( ! r(e, a)) {
                                            return a;
                                        } else {
                                            return e;
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if ( ! r(d, a)) {
                            if ( ! r(g, a)) {
                                if ( ! r(f, d)) {
                                    if ( ! r(g, e)) {
                                        if ( ! r(g, d)) {
                                            return d;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        return e;
                                    }
                                } else {
                                    if ( ! r(g, f)) {
                                        if ( ! r(f, a)) {
                                            return f;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(g, e)) {
                                            return g;
                                        } else {
                                            return e;
                                        }
                                    }
                                }
                            } else {
                                if ( ! r(f, b)) {
                                    if ( ! r(f, a)) {
                                        if ( ! r(e, a)) {
                                            return e;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(g, f)) {
                                            return g;
                                        } else {
                                            return f;
                                        }
                                    }
                                } else {
                                    if ( ! r(g, b)) {
                                        return g;
                                    } else {
                                        return b;
                                    }
                                }
                            }
                        } else {
                            if ( ! r(g, f)) {
                                if ( ! r(f, d)) {
                                    if ( ! r(c, a)) {
                                        if ( ! r(f, a)) {
                                            return a;
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
                                    if ( ! r(g, b)) {
                                        if ( ! r(g, d)) {
                                            return d;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        return b;
                                    }
                                }
                            } else {
                                if ( ! r(g, d)) {
                                    if ( ! r(c, a)) {
                                        if ( ! r(g, a)) {
                                            return a;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        if ( ! r(g, c)) {
                                            return c;
                                        } else {
                                            return g;
                                        }
                                    }
                                } else {
                                    if ( ! r(f, b)) {
                                        if ( ! r(f, d)) {
                                            return d;
                                        } else {
                                            return f;
                                        }
                                    } else {
                                        return b;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if ( ! r(g, a)) {
                        if ( ! r(e, c)) {
                            if ( ! r(d, a)) {
                                if ( ! r(g, f)) {
                                    if ( ! r(f, d)) {
                                        if ( ! r(f, c)) {
                                            return c;
                                        } else {
                                            return f;
                                        }
                                    } else {
                                        if ( ! r(g, d)) {
                                            return d;
                                        } else {
                                            return g;
                                        }
                                    }
                                } else {
                                    if ( ! r(g, d)) {
                                        if ( ! r(g, c)) {
                                            return c;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        if ( ! r(f, d)) {
                                            return d;
                                        } else {
                                            return f;
                                        }
                                    }
                                }
                            } else {
                                if ( ! r(f, c)) {
                                    if ( ! r(c, a)) {
                                        if ( ! r(g, c)) {
                                            return c;
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
                                } else {
                                    if ( ! r(f, a)) {
                                        if ( ! r(g, f)) {
                                            return f;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        if ( ! r(c, a)) {
                                            return a;
                                        } else {
                                            return c;
                                        }
                                    }
                                }
                            }
                        } else {
                            if ( ! r(g, e)) {
                                if ( ! r(d, a)) {
                                    if ( ! r(e, d)) {
                                        if ( ! r(f, d)) {
                                            return f;
                                        } else {
                                            return d;
                                        }
                                    } else {
                                        if ( ! r(e, a)) {
                                            return e;
                                        } else {
                                            return a;
                                        }
                                    }
                                } else {
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
                                }
                            } else {
                                if ( ! r(f, d)) {
                                    if ( ! r(g, f)) {
                                        if ( ! r(f, a)) {
                                            return f;
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
                                    if ( ! r(g, d)) {
                                        if ( ! r(d, a)) {
                                            return d;
                                        } else {
                                            return a;
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
                    } else {
                        if ( ! r(f, d)) {
                            if ( ! r(c, a)) {
                                if ( ! r(g, e)) {
                                    return e;
                                } else {
                                    if ( ! r(f, a)) {
                                        if ( ! r(d, a)) {
                                            return d;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(g, f)) {
                                            return g;
                                        } else {
                                            return f;
                                        }
                                    }
                                }
                            } else {
                                if ( ! r(g, c)) {
                                    if ( ! r(f, c)) {
                                        if ( ! r(g, f)) {
                                            return f;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        if ( ! r(e, c)) {
                                            return c;
                                        } else {
                                            return e;
                                        }
                                    }
                                } else {
                                    if ( ! r(g, f)) {
                                        if ( ! r(g, e)) {
                                            return e;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        if ( ! r(f, c)) {
                                            return c;
                                        } else {
                                            return f;
                                        }
                                    }
                                }
                            }
                        } else {
                            if ( ! r(e, d)) {
                                if ( ! r(g, d)) {
                                    if ( ! r(e, c)) {
                                        if ( ! r(g, c)) {
                                            return c;
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
                                    if ( ! r(d, a)) {
                                        if ( ! r(f, a)) {
                                            return f;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        return d;
                                    }
                                }
                            } else {
                                if ( ! r(g, e)) {
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
                                        if ( ! r(f, a)) {
                                            return f;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(e, b)) {
                                            return e;
                                        } else {
                                            return b;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if ( ! r(f, e)) {
                    if ( ! r(e, b)) {
                        if ( ! r(e, c)) {
                            if ( ! r(g, e)) {
                                if ( ! r(c, a)) {
                                    return c;
                                } else {
                                    if ( ! r(e, a)) {
                                        return a;
                                    } else {
                                        return e;
                                    }
                                }
                            } else {
                                if ( ! r(g, c)) {
                                    if ( ! r(g, a)) {
                                        if ( ! r(c, a)) {
                                            return c;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(g, b)) {
                                            return g;
                                        } else {
                                            return b;
                                        }
                                    }
                                } else {
                                    if ( ! r(c, a)) {
                                        if ( ! r(g, a)) {
                                            return g;
                                        } else {
                                            return a;
                                        }
                                    } else {
                                        if ( ! r(c, b)) {
                                            return c;
                                        } else {
                                            return b;
                                        }
                                    }
                                }
                            }
                        } else {
                            if ( ! r(c, a)) {
                                if ( ! r(g, a)) {
                                    if ( ! r(e, a)) {
                                        if ( ! r(g, e)) {
                                            return e;
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
                                } else {
                                    if ( ! r(g, e)) {
                                        if ( ! r(g, f)) {
                                            return f;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        if ( ! r(e, a)) {
                                            return a;
                                        } else {
                                            return e;
                                        }
                                    }
                                }
                            } else {
                                if ( ! r(g, e)) {
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
                                    return e;
                                }
                            }
                        }
                    } else {
                        if ( ! r(f, b)) {
                            if ( ! r(g, c)) {
                                if ( ! r(c, b)) {
                                    if ( ! r(c, a)) {
                                        if ( ! r(f, a)) {
                                            return a;
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
                                    if ( ! r(g, e)) {
                                        if ( ! r(g, b)) {
                                            return b;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        return e;
                                    }
                                }
                            } else {
                                if ( ! r(g, b)) {
                                    if ( ! r(f, a)) {
                                        if ( ! r(g, a)) {
                                            return a;
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
                                        return e;
                                    } else {
                                        if ( ! r(c, b)) {
                                            return b;
                                        } else {
                                            return c;
                                        }
                                    }
                                }
                            }
                        } else {
                            if ( ! r(g, c)) {
                                if ( ! r(e, c)) {
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
                                    if ( ! r(f, c)) {
                                        if ( ! r(g, f)) {
                                            return f;
                                        } else {
                                            return g;
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
                                if ( ! r(g, f)) {
                                    if ( ! r(g, b)) {
                                        return b;
                                    } else {
                                        if ( ! r(g, d)) {
                                            return g;
                                        } else {
                                            return d;
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
                } else {
                    if ( ! r(f, b)) {
                        if ( ! r(c, a)) {
                            if ( ! r(e, c)) {
                                if ( ! r(g, f)) {
                                    if ( ! r(f, a)) {
                                        if ( ! r(f, c)) {
                                            return c;
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
                                        if ( ! r(g, c)) {
                                            return c;
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
                            } else {
                                if ( ! r(g, a)) {
                                    if ( ! r(f, a)) {
                                        if ( ! r(g, f)) {
                                            return f;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        if ( ! r(e, a)) {
                                            return a;
                                        } else {
                                            return e;
                                        }
                                    }
                                } else {
                                    if ( ! r(g, f)) {
                                        if ( ! r(g, e)) {
                                            return e;
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
                        } else {
                            if ( ! r(g, c)) {
                                if ( ! r(g, f)) {
                                    if ( ! r(f, c)) {
                                        if ( ! r(f, a)) {
                                            return a;
                                        } else {
                                            return f;
                                        }
                                    } else {
                                        if ( ! r(e, c)) {
                                            return c;
                                        } else {
                                            return e;
                                        }
                                    }
                                } else {
                                    if ( ! r(g, b)) {
                                        if ( ! r(g, a)) {
                                            return a;
                                        } else {
                                            return g;
                                        }
                                    } else {
                                        return b;
                                    }
                                }
                            } else {
                                if ( ! r(e, c)) {
                                    if ( ! r(f, c)) {
                                        if ( ! r(c, b)) {
                                            return c;
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
                                } else {
                                    if ( ! r(g, e)) {
                                        return e;
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
                    } else {
                        if ( ! r(e, b)) {
                            if ( ! r(g, c)) {
                                if ( ! r(c, b)) {
                                    if ( ! r(e, c)) {
                                        if ( ! r(c, a)) {
                                            return a;
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
                                    if ( ! r(g, b)) {
                                        return b;
                                    } else {
                                        if ( ! r(g, f)) {
                                            return g;
                                        } else {
                                            return f;
                                        }
                                    }
                                }
                            } else {
                                if ( ! r(g, b)) {
                                    if ( ! r(g, e)) {
                                        if ( ! r(e, a)) {
                                            return a;
                                        } else {
                                            return e;
                                        }
                                    } else {
                                        if ( ! r(g, a)) {
                                            return a;
                                        } else {
                                            return g;
                                        }
                                    }
                                } else {
                                    if ( ! r(f, c)) {
                                        return f;
                                    } else {
                                        if ( ! r(c, b)) {
                                            return b;
                                        } else {
                                            return c;
                                        }
                                    }
                                }
                            }
                        } else {
                            if ( ! r(g, e)) {
                                if ( ! r(g, b)) {
                                    if ( ! r(e, c)) {
                                        return e;
                                    } else {
                                        if ( ! r(c, b)) {
                                            return b;
                                        } else {
                                            return c;
                                        }
                                    }
                                } else {
                                    if ( ! r(g, c)) {
                                        if ( ! r(e, c)) {
                                            return e;
                                        } else {
                                            return c;
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
                                if ( ! r(e, c)) {
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
            }
        }
    }
}

// -----------------------------------------------------------------------------------------------------------------------

function select_1_2(a, b, r) {
    return r(b, a) ? a : b;
}

function select_1_3_ab(a, b, c, r) {
    // precondition: a <= b
    return ! r(c, b) ?                      //!(c < b) -> c >= b
                b :                         // a, b, c are sorted
                select_1_2(a, c, r)         // b is not the median
}

function select_2_3(a, b, c, r) {
    return select_1_2(select_1_2(a, b, r), 
                      c, r);
}

function select_2_5_ac_ae_bc_bd(a, b, c, d, e, r) {
    // precondition: a <= c && a <= e && b <= c && b <= d
    if ( ! r(e, d)) {
        return select_1_3_ab(a, c, d, r);
    } else {
        return select_1_3_ab(b, c, e, r);
    }
}

// function select_3_5_ab_cd_eb(a, b, c, d, e, r) {
//     // precondition: a <= b && b <= e && c <= d
//     if ( ! r(d, b)) {
//         return select_1_2(b, c, r);
//     } else {
//         return select_2_3(a, d, e, r);
//     }
// }

//TODO: no es estable
function select_3_5_ab_cd_eb(a, b, c, d, e, r) {
    // precondition: a < b && b < e && c < d

    if ( ! r(d, b)) {
        if ( ! r(c, b)) {
            return c;
        } else {
            return b;
        }
    } else {
        if ( ! r(d, a)) {
            if ( ! r(e, d)) {
                return e;
            } else {
                return d;
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





function median_7_abd_cd_ef_fb(a, b, c, d, e, f, g, r) {
    // if (b < f) {
    //     return median_7_abd_cd_ef_bf(a, b, c, d, e, f, g, r);
    // } else {
    //     return median_7_abd_cd_ef_fb(a, b, c, d, f, e, g, r);
    // }
}

function median_7_abd_cd_ef_bf(a, b, c, d, e, f, g, r) {
    if (c < e) {
        return median_7_abd_cd_ef_bf(a, b, c, d, e, f, g, r);
    } else {
        return median_7_abd_cd_ef_fb(a, b, c, d, f, e, g, r);
    }
}

function median_7_abd_cd_ef(a, b, c, d, e, f, g, r) {
    if (b < f) {
        return median_7_abd_cd_ef_bf(a, b, c, d, e, f, g, r);
    } else {
        return median_7_abd_cd_ef_fb(a, b, c, d, f, e, g, r);
    }
}

function median_7_abd_cd(a, b, c, d, e, f, g, r) {
    if (e < f) {
        return median_7_abd_cd_ef(a, b, c, d, e, f, g, r);
    } else {
        return median_7_abd_cd_ef(a, b, c, d, f, e, g, r);
    }
}

function median_7_ab_cd(a, b, c, d, e, f, g, r) {
    if (b < d) {
        return median_7_abd_cd(a, b, c, d, e, f, g, r);
    } else {
        return median_7_ab_cd_db(a, b, c, d, e, f, g, r);
    }
}

function median_7_ab(a, b, c, d, e, f, g, r) {
    if (c < d) {
        return median_7_ab_cd(a, b, c, d, e, f, g, r);
    } else {
        return median_7_ab_cd(a, b, d, c, e, f, g, r);
    }
}

function median_7(a, b, c, d, e, f, g, r) {
    if (a < b) {
        return median_7_ab(a, b, c, d, e, f, g, r);
    } else {
        return median_7_ab(b, a, c, d, e, f, g, r);
    }
}

// function median_7_generated_stable(a, b, c, d, e, f, g, r) {
// }

// ------------------------------------------------------------

function perm(xs) {
    let ret = [];
  
    for (let i = 0; i < xs.length; i = i + 1) {
        let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

        if ( ! rest.length) {
            ret.push([xs[i]])
        } else {
            for (let j = 0; j < rest.length; j = j + 1) {
                ret.push([xs[i]].concat(rest[j]))
            }
        }
    }
    return ret;
}

function iota(n) {
    var res = [];
    for (let i = 0; i < n; ++i) {
        res.push(i + 1);
    }
    return res;
}

function copy_array(arr) {
    var res = [];
    for (let i = 0; i < arr.length; ++i) {
        const element = arr[i];
        res.push(new Block(element.id, element.time));
    }
    return res;
}

function create_blocks(data) {
    var res = [];
    for (let i = 0; i < data.length; ++i) {
        res.push(new Block(i, data[i]));
    }
    return res;
}

function remove_duplicates(arr) {
    var arr_str = [];
    for (let i = 0; i < arr.length; ++i) {
        arr_str.push(JSON.stringify(arr[i]));
    }

    arr_str = [...new Set(arr_str)];
    
    var res = [];
    for (let i = 0; i < arr_str.length; ++i) {
        var obj = JSON.parse(arr_str[i]);
        res.push(obj);
    }
    return res;
}

function generate_data() {
    var data = [];
    for (var i = 0; i < arguments.length; ++i) {
        data.push(...perm(arguments[i]));
    }    
    data = remove_duplicates(data);
    return data;
}

function repeat(x, n) {
    var res = [];
    for (let i = 0; i < n; i++) {
        res.push(x);
    }
    return res;
}

function generate_data_all(n) {
    var res = [...perm(iota(n))];
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            res.push(
                ...perm(iota(n-j-1).concat(repeat(n-i, j+1)))                
            );
        }
    }
    res = remove_duplicates(res);
    return res;

    // // n=5
    // // var data = generate_data(
    // //     [1, 2, 3, 4, 5],

    // //     [1, 1, 2, 3, 4],
    // //     [1, 1, 1, 2, 3],
    // //     [1, 1, 1, 1, 2],
    // //     [1, 1, 1, 1, 1],
        
    // //     [1, 2, 2, 3, 4],
    // //     [1, 2, 2, 2, 3],
    // //     [1, 2, 2, 2, 2],

    // //     [1, 2, 3, 3, 4],
    // //     [1, 2, 3, 3, 3],

    // //     [1, 2, 3, 4, 4],
    // // );    
}





function array_random(n, from, to) {
    if ( ! n) n = 10;
    if ( ! from) from = 0;
    if ( ! to) to = 99;
    var res = []; 
    while (n != 0) {
        var rand = Math.floor(Math.random() * to) + from; 
        res.push(rand); 
        --n;
    } return res; 
}

function generate_data_random(n) {
    var res = [];
    var q = Math.pow(n, n + 1);
    for (let i = 0; i < q; ++i) {
        var data = array_random(n, 0, n);
        res.push(data);
    }
    
    return res;

}

function half(n) {
    return Math.floor(n / 2);    
}

function exec_n(median_f, n, k) {
    if ( ! k) {
        k = half(n);
    }

    var q = Math.pow(n, n + 1);
    
    for (let i = 0; i < q; ++i) {

        if (i % 100 == 0) {
            console.log(`${(i * 100 / q).toFixed(2)}% completed...`);
        }

        const element = array_random(n, 0, n);
        var blocks_orig = create_blocks(element);

        blocks = copy_array(blocks_orig);
        tao.stable_sort(blocks, lt)
        var expect = blocks[k];

        blocks = copy_array(blocks_orig);
        var m1 = median_f(...blocks, lt);
        
        if (expect.id == m1.id) {
            // console.log("OK    ", element, expect.id, m1.id);
        } else {
            console.log("ERROR ", element, expect.id, m1.id);
            return;
        }
    }
    console.log(`Execution completed OK with ${Number(q).toLocaleString()} elements`);
    
}

function exec_n_with_data(median_f, n, data, k) {
    if ( ! k) {
        k = half(n);
    }

    var q = data.length;
    for (let i = 0; i < data.length; ++i) {

        if (i % 100 == 0) {
            console.log(`${(i * 100 / q).toFixed(2)}% completed...`);
        }

        const element = data[i];
        var blocks_orig = create_blocks(element);

        blocks = copy_array(blocks_orig);
        tao.stable_sort(blocks, lt)
        var expect = blocks[k];

        blocks = copy_array(blocks_orig);
        var m1 = median_f(...blocks, lt);

        if (expect.id == m1.id) {
            // console.log("OK    ", element, expect.id, m1.id);
        } else {
            console.log("ERROR ", element, expect.id, m1.id);
            return;
        }
    }
    console.log(`Execution completed OK with ${Number(q).toLocaleString()} elements`);
}

function copy_if(data, p) {
    var res = [];
    for (let i = 0; i < data.length; i++) {
        const e = data[i];
        const r = p(...e);
        if (r) {
            res.push(e);
        }
    }
    return res;
}

function main() {
    // ---------------------------------------------------------------
    // n=3
    // // var data = generate_data([1, 1, 1],
    // //                          [1, 2, 3],
    // //                          [1, 2, 2],
    // //                          [1, 1, 2]);
    // var data = generate_data_random(3);
    // // exec_n3(data);
    // // exec_n_with_data(median_3_generated, 3, data);
    // exec_n_with_data(median_3_generated_stable, 3, data);




    // ---------------------------------------------------------------
    // // n=5
    // // var data = generate_data(
    // //     [1, 2, 3, 4, 5],

    // //     [1, 1, 2, 3, 4],
    // //     [1, 1, 1, 2, 3],
    // //     [1, 1, 1, 1, 2],
    // //     [1, 1, 1, 1, 1],
        
    // //     [1, 2, 2, 3, 4],
    // //     [1, 2, 2, 2, 3],
    // //     [1, 2, 2, 2, 2],

    // //     [1, 2, 3, 3, 4],
    // //     [1, 2, 3, 3, 3],

    // //     [1, 2, 3, 4, 4],
    // // );

    // // var data = [
    // // ];
    
    // var data = generate_data_random(5);
    // // exec_n_with_data(median_5_generated, 5, data);
    // exec_n_with_data(median_5_generated_stable, 5, data);



    // ---------------------------------------------------------------
    // var data = [
    //     [1, 2, 3, 4, 5, 6, 7]
    // ];

    // // var data = generate_data_random(7);
    // exec_n_with_data(median_7_generated, 7, data);
    // exec_n(median_7_generated, 7);

    // ---------------------------------------------------------------

    // var data = generate_data_random(5);
    // data = copy_if(data, function(a, b, c, d, e) {
    //     return a <= c && 
    //            a <= e && 
    //            b <= c && 
    //            b <= d;
    // });
    // exec_n_with_data(select_2_5_ac_ae_bc_bd, 5, data);

    // ---------------------------------------------------------------

    var data = generate_data_all(5);
    // data = copy_if(data, function(a, b, c, d, e) {
    //     return a <= b && 
    //            e <= b && 
    //            c <= d;
    // });

    data = copy_if(data, function(a, b, c, d, e) {
        return a < b && 
               e < b && 
               c < d;
    });
    
    // var data = [
    //     [0, 3, 1, 2, 3]
    // ];

    exec_n_with_data(select_3_5_ab_cd_eb, 5, data, 3);

}

main();






    
    // n=3
    // var data = [
    //     nodes.push(...res_left[1]);
    //     [[1, 2, 3], 1],
    //     [[1, 3, 2], 2],
    //     [[3, 1, 2], 2],
    //     [[3, 2, 1], 1],
    //     [[2, 3, 1], 0],
    //     [[2, 1, 3], 0],

    //     [[1, 2, 2], 1],
    //     [[2, 1, 2], 0],
    //     [[2, 2, 1], 0],
    //     [[1, 1, 2], 1],
    //     [[2, 1, 1], 2],
    //     [[1, 2, 1], 2],

    //     [[1, 1, 1], 1],
    // ];

    // var data = [
    //     [1, 1, 1],
    // ];
    // data.push(...perm([1, 2, 3]));
    // data.push(...perm([1, 2, 2]));
    // data.push(...perm([1, 1, 2]));
    // data = remove_duplicates(data);
