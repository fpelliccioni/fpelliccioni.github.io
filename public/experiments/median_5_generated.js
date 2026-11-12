
function median_5_generated_unstable(a, b, c, d, e, r) {
    if (r(a, b)) {
        if (r(c, d)) {
            if (r(a, c)) {
                if (r(b, e)) {
                    if (r(b, c)) {
                        if (r(c, e)) {
                            return c;
                        } else {
                            return e;
                        }
                    } else {
                        if (r(b, d)) {
                            return b;
                        } else {
                            return d;
                        }
                    }
                } else {
                    if (r(c, e)) {
                        if (r(d, e)) {
                            return d;
                        } else {
                            return e;
                        }
                    } else {
                        if (r(b, c)) {
                            return b;
                        } else {
                            return c;
                        }
                    }
                }
            } else {
                if (r(d, e)) {
                    if (r(a, d)) {
                        if (r(b, d)) {
                            return b;
                        } else {
                            return d;
                        }
                    } else {
                        if (r(a, e)) {
                            return a;
                        } else {
                            return e;
                        }
                    }
                } else {
                    if (r(a, e)) {
                        if (r(b, e)) {
                            return b;
                        } else {
                            return e;
                        }
                    } else {
                        if (r(a, d)) {
                            return a;
                        } else {
                            return d;
                        }
                    }
                }
            }
        } else {
            if (r(a, d)) {
                if (r(b, e)) {
                    if (r(b, d)) {
                        if (r(d, e)) {
                            return d;
                        } else {
                            return e;
                        }
                    } else {
                        if (r(b, c)) {
                            return b;
                        } else {
                            return c;
                        }
                    }
                } else {
                    if (r(d, e)) {
                        if (r(c, e)) {
                            return c;
                        } else {
                            return e;
                        }
                    } else {
                        if (r(b, d)) {
                            return b;
                        } else {
                            return d;
                        }
                    }
                }
            } else {
                if (r(c, e)) {
                    if (r(a, c)) {
                        if (r(b, c)) {
                            return b;
                        } else {
                            return c;
                        }
                    } else {
                        if (r(a, e)) {
                            return a;
                        } else {
                            return e;
                        }
                    }
                } else {
                    if (r(a, e)) {
                        if (r(b, e)) {
                            return b;
                        } else {
                            return e;
                        }
                    } else {
                        if (r(a, c)) {
                            return a;
                        } else {
                            return c;
                        }
                    }
                }
            }
        }
    } else {
        if (r(c, d)) {
            if (r(a, d)) {
                if (r(c, e)) {
                    if (r(a, e)) {
                        if (r(a, c)) {
                            return c;
                        } else {
                            return a;
                        }
                    } else {
                        if (r(b, e)) {
                            return e;
                        } else {
                            return b;
                        }
                    }
                } else {
                    if (r(a, c)) {
                        if (r(a, e)) {
                            return e;
                        } else {
                            return a;
                        }
                    } else {
                        if (r(b, c)) {
                            return c;
                        } else {
                            return b;
                        }
                    }
                }
            } else {
                if (r(b, e)) {
                    if (r(d, e)) {
                        if (r(b, d)) {
                            return d;
                        } else {
                            return b;
                        }
                    } else {
                        if (r(c, e)) {
                            return e;
                        } else {
                            return c;
                        }
                    }
                } else {
                    if (r(b, d)) {
                        if (r(b, c)) {
                            return c;
                        } else {
                            return b;
                        }
                    } else {
                        if (r(d, e)) {
                            return e;
                        } else {
                            return d;
                        }
                    }
                }
            }
        } else {
            if (r(a, c)) {
                if (r(d, e)) {
                    if (r(a, e)) {
                        if (r(a, d)) {
                            return d;
                        } else {
                            return a;
                        }
                    } else {
                        if (r(b, e)) {
                            return e;
                        } else {
                            return b;
                        }
                    }
                } else {
                    if (r(a, d)) {
                        if (r(a, e)) {
                            return e;
                        } else {
                            return a;
                        }
                    } else {
                        if (r(b, d)) {
                            return d;
                        } else {
                            return b;
                        }
                    }
                }
            } else {
                if (r(b, e)) {
                    if (r(c, e)) {
                        if (r(b, c)) {
                            return c;
                        } else {
                            return b;
                        }
                    } else {
                        if (r(d, e)) {
                            return e;
                        } else {
                            return d;
                        }
                    }
                } else {
                    if (r(b, c)) {
                        if (r(b, d)) {
                            return d;
                        } else {
                            return b;
                        }
                    } else {
                        if (r(c, e)) {
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


module.exports = {
    median_5_generated_unstable: median_5_generated_unstable,
    median_5_generated_stable: median_5_generated_stable,
}
