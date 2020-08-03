const common = require('./common');

g_comparissons = 0

// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
class compare_strict_or_reflexive {
    constructor(self, strict=true) {
        this.strict = strict;
    }

    call(a, b, r) {
        if (this.strict) 
            return r(a, b);
        // reflexive
        return ! r(b, a); // complement_of_converse(r(a, b))
    }
}

// find_54 ******************* 
function select_3_5_da_eb_ec(ai,bi,ci,di,ei,a,b,c,d,e,r){
    cmp = new compare_strict_or_reflexive(bi < ci);
    if (cmp.call(b, c, r)) 
        return select_2_4_da_cb(ai,ci,ei,di,a,c,e,d,r);
    return select_2_4_da_cb(ai,bi,ei,di,a,b,e,d,r);
}

// find_55 ******************* 
function select_2_4_dc(ai,bi,ci,di,a,b,c,d,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return select_2_4_da_cb(ai,ci,di,bi,a,c,d,b,r);
    return select_2_4_da_cb(bi,ci,di,ai,b,c,d,a,r);
}

// find_53 ******************* 
function select_4_7_ea_eb_gb_fc_gc_fd_gd(ai,bi,ci,di,ei,fi,gi,a,b,c,d,e,f,g,r){
    cmp = new compare_strict_or_reflexive(ei < fi);
    if (cmp.call(e, f, r)) 
        return select_3_5_da_eb_ec(ai,ci,di,ei,gi,a,c,d,e,g,r);
    return select_2_4_dc(ai,fi,bi,gi,a,f,b,g,r);
}

// find_49 ******************* 
function select_4_8_ea_fb_hb_ec_gc_fd_gd_hg(ai,bi,ci,di,ei,fi,gi,hi,a,b,c,d,e,f,g,h,r){
    cmp = new compare_strict_or_reflexive(ai < gi);
    if (cmp.call(a, g, r)) 
        return select_4_7_ea_eb_gb_fc_gc_fd_gd(bi,di,ci,ai,fi,ei,gi,b,d,c,a,f,e,g,r);
    return select_2_6_ca_ea_db_eb_fd(bi,gi,fi,ai,hi,ei,b,g,f,a,h,e,r);
}

// find_52 ******************* 
function select_2_6_ea_fa_db_fb_dc_ec(ai,bi,ci,di,ei,fi,a,b,c,d,e,f,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return select_1_4_da_cb(bi,ci,ei,fi,b,c,e,f,r);
    return select_1_4_da_cb(ai,ci,di,fi,a,c,d,f,r);
}

// find_51 ******************* 
function select_3_7_fa_ga_db_fb_ec_fc_ge(ai,bi,ci,di,ei,fi,gi,a,b,c,d,e,f,g,r){
    cmp = new compare_strict_or_reflexive(di < ei);
    if (cmp.call(d, e, r)) 
        return select_2_5_ea_db_dc_ec(ai,di,ci,ei,fi,a,d,c,e,f,r);
    return select_2_6_ea_fa_db_fb_dc_ec(ai,bi,ei,di,gi,fi,a,b,e,d,g,f,r);
}

// find_50 ******************* 
function select_4_9_fa_ia_db_gb_fc_gc_ed_hf_ig(ai,bi,ci,di,ei,fi,gi,hi,ii,a,b,c,d,e,f,g,h,i,r){
    cmp = new compare_strict_or_reflexive(di < fi);
    if (cmp.call(d, f, r)) 
        return select_3_7_fa_ga_db_fb_ec_fc_ge(ai,di,ci,ei,gi,fi,ii,a,d,c,e,g,f,i,r);
    return select_2_6_ca_ea_db_eb_fd(fi,bi,hi,gi,di,ii,f,b,h,g,d,i,r);
}

// find_46 ******************* 
function select_5_10_ha_ia_db_eb_fc_gc_hd_ge_if_ji(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,a,b,c,d,e,f,g,h,i,j,r){
    cmp = new compare_strict_or_reflexive(di < fi);
    if (cmp.call(d, f, r)) 
        return select_4_8_ea_fb_hb_ec_gc_fd_gd_hg(ei,ai,ci,di,gi,hi,fi,ii,e,a,c,d,g,h,f,i,r);
    return select_4_9_fa_ia_db_gb_fc_gc_ed_hf_ig(ai,bi,fi,ei,gi,ii,di,ji,hi,a,b,f,e,g,i,d,j,h,r);
}

// find_48 ******************* 
function select_5_10_da_ja_fb_hb_ec_gc_gd_id_he_je_if_jf(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,a,b,c,d,e,f,g,h,i,j,r){
    cmp = new compare_strict_or_reflexive(di < ei);
    if (cmp.call(d, e, r)) 
        return select_3_7_da_ga_cb_eb_fd_ge(bi,ci,gi,fi,ei,ii,hi,b,c,g,f,e,i,h,r);
    return select_3_7_da_ga_cb_eb_fd_ge(ai,bi,hi,di,fi,gi,ji,a,b,h,d,f,g,j,r);
}

// find_47 ******************* 
function select_5_11_da_ha_eb_ib_fc_gc_gd_he_je_if_jf_ki(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,a,b,c,d,e,f,g,h,i,j,k,r){
    cmp = new compare_strict_or_reflexive(di < ii);
    if (cmp.call(d, i, r)) 
        return select_5_10_da_ja_fb_hb_ec_gc_gd_id_he_je_if_jf(bi,ci,ai,ei,di,fi,hi,gi,ji,ii,b,c,a,e,d,f,h,g,j,i,r);
    return select_3_8_fa_ha_eb_fb_dc_ec_gd_hd(ai,ei,fi,ii,ji,hi,ki,di,a,e,f,i,j,h,k,d,r);
}

// find_45 ******************* 
function select_5_11_da_ea_fb_ib_gc_hc_he_jf_ig_jg_ki(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,a,b,c,d,e,f,g,h,i,j,k,r){
    cmp = new compare_strict_or_reflexive(di < fi);
    if (cmp.call(d, f, r)) 
        return select_5_10_ha_ia_db_eb_fc_gc_hd_ge_if_ji(bi,ai,ci,di,ei,gi,hi,fi,ii,ki,b,a,c,d,e,g,h,f,i,k,r);
    return select_5_11_da_ha_eb_ib_fc_gc_gd_he_je_if_jf_ki(ai,bi,ci,ei,fi,gi,hi,di,ii,ji,ki,a,b,c,e,f,g,h,d,i,j,k,r);
}

// find_37 ******************* 
function select_5_11_ea_ja_db_fb_gc_ic_if_hg_jg_kj(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,a,b,c,d,e,f,g,h,i,j,k,r){
    cmp = new compare_strict_or_reflexive(ei < hi);
    if (cmp.call(e, h, r)) 
        return select_5_11_da_ea_fb_ib_gc_hc_he_jf_ig_jg_ki(bi,ai,ci,di,fi,ei,gi,ii,ji,hi,ki,b,a,c,d,f,e,g,i,j,h,k,r);
    return select_4_10_ha_ia_db_eb_fc_hc_ge_if_jh(ai,bi,gi,di,fi,hi,ii,ji,ei,ki,a,b,g,d,f,h,i,j,e,k,r);
}

// find_44 ******************* 
function select_2_4_da_cb(ai,bi,ci,di,a,b,c,d,r){
    cmp = new compare_strict_or_reflexive(ci < di);
    if (cmp.call(c, d, r)) 
        return select_1_2(ai,ci,a,c,r);
    return select_1_2(bi,di,b,d,r);
}

// find_43 ******************* 
function select_3_6_ea_eb_fb_dc_fd(ai,bi,ci,di,ei,fi,a,b,c,d,e,f,r){
    cmp = new compare_strict_or_reflexive(ai < di);
    if (cmp.call(a, d, r)) 
        return select_2_4_da_cb(bi,ci,di,ei,b,c,d,e,r);
    return select_1_3_cb(ai,bi,fi,a,b,f,r);
}

// find_42 ******************* 
function select_3_7_eb_fb_dc_gc_fd_ge(ai,bi,ci,di,ei,fi,gi,a,b,c,d,e,f,g,r){
    cmp = new compare_strict_or_reflexive(ai < di);
    if (cmp.call(a, d, r)) 
        return select_3_6_ea_eb_fb_dc_fd(ai,ci,bi,ei,di,gi,a,c,b,e,d,g,r);
    return select_2_6_ca_ea_db_eb_fd(di,bi,ai,ei,fi,gi,d,b,a,e,f,g,r);
}

// find_41 ******************* 
function select_5_10_ea_ja_fb_hb_dc_hc_gd_jd_he_ie_if_jf(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,a,b,c,d,e,f,g,h,i,j,r){
    cmp = new compare_strict_or_reflexive(di < ei);
    if (cmp.call(d, e, r)) 
        return select_3_7_eb_fb_dc_gc_fd_ge(gi,bi,ai,ei,fi,hi,ji,g,b,a,e,f,h,j,r);
    return select_3_7_da_ea_cb_eb_fc_gd(bi,ci,di,fi,hi,gi,ii,b,c,d,f,h,g,i,r);
}

// find_40 ******************* 
function select_5_11_da_ia_fb_ib_ec_hc_gd_ie_je_hf_jf_kh(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,a,b,c,d,e,f,g,h,i,j,k,r){
    cmp = new compare_strict_or_reflexive(di < hi);
    if (cmp.call(d, h, r)) 
        return select_5_10_ea_ja_fb_hb_dc_hc_gd_jd_he_ie_if_jf(ci,bi,ai,di,ei,fi,gi,ii,ji,hi,c,b,a,d,e,f,g,i,j,h,r);
    return select_3_8_fa_ha_eb_fb_dc_ec_gd_hd(ai,ei,fi,hi,ji,ii,ki,di,a,e,f,h,j,i,k,d,r);
}

// find_39 ******************* 
function select_5_11_da_ga_eb_ib_fc_gc_hd_je_if_jf_ki(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,a,b,c,d,e,f,g,h,i,j,k,r){
    cmp = new compare_strict_or_reflexive(ei < gi);
    if (cmp.call(e, g, r)) 
        return select_5_11_da_ia_fb_ib_ec_hc_gd_ie_je_hf_jf_kh(ai,ci,bi,di,ei,fi,hi,ii,gi,ji,ki,a,c,b,d,e,f,h,i,g,j,k,r);
    return select_4_9_ga_gb_hb_dc_ec_fd_he_ig(fi,bi,ai,di,gi,hi,ii,ei,ki,f,b,a,d,g,h,i,e,k,r);
}

// find_38 ******************* 
function select_5_11_da_ja_eb_gb_fc_gc_ie_hf_jf_kj(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,a,b,c,d,e,f,g,h,i,j,k,r){
    cmp = new compare_strict_or_reflexive(di < hi);
    if (cmp.call(d, h, r)) 
        return select_5_11_da_ga_eb_ib_fc_gc_hd_je_if_jf_ki(bi,ai,ci,ei,di,fi,gi,ii,ji,hi,ki,b,a,c,e,d,f,g,i,j,h,k,r);
    return select_4_10_ha_ia_db_eb_fc_hc_ge_if_jh(ai,bi,fi,gi,ei,hi,ii,ji,di,ki,a,b,f,g,e,h,i,j,d,k,r);
}

// find_10 ******************* 
function select_5_11_fa_hb_ec_jc_gd_hd_ig_jg_kj(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,a,b,c,d,e,f,g,h,i,j,k,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return select_5_11_ea_ja_db_fb_gc_ic_if_hg_jg_kj(ci,ai,di,fi,ei,bi,gi,ii,hi,ji,ki,c,a,d,f,e,b,g,i,h,j,k,r);
    return select_5_11_da_ja_eb_gb_fc_gc_ie_hf_jf_kj(ci,bi,di,ei,ai,gi,hi,ii,fi,ji,ki,c,b,d,e,a,g,h,i,f,j,k,r);
}

// find_36 ******************* 
function select_1_3(ai,bi,ci,a,b,c,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return select_1_3_cb(ci,ai,bi,c,a,b,r);
    return select_1_3_cb(ci,bi,ai,c,b,a,r);
}

// find_34 ******************* 
function select_3_7_fa_ga_fb_gb_dc_gc_ed(ai,bi,ci,di,ei,fi,gi,a,b,c,d,e,f,g,r){
    cmp = new compare_strict_or_reflexive(ai < di);
    if (cmp.call(a, d, r)) 
        return select_2_6_ca_ea_db_eb_fd(bi,ci,fi,di,gi,ei,b,c,f,d,g,e,r);
    return select_1_3(ai,bi,ei,a,b,e,r);
}

// find_35 ******************* 
function select_3_7_da_cb_gb_fc_ed_gd(ai,bi,ci,di,ei,fi,gi,a,b,c,d,e,f,g,r){
    cmp = new compare_strict_or_reflexive(ai < ci);
    if (cmp.call(a, c, r)) 
        return select_2_6_ca_ea_db_eb_fd(di,bi,ei,ci,gi,fi,d,b,e,c,g,f,r);
    return select_1_3_cb(fi,ai,di,f,a,d,r);
}

// find_29 ******************* 
function select_4_9_fa_ga_db_eb_ec_fc_gd_he_if(ai,bi,ci,di,ei,fi,gi,hi,ii,a,b,c,d,e,f,g,h,i,r){
    cmp = new compare_strict_or_reflexive(di < fi);
    if (cmp.call(d, f, r)) 
        return select_3_7_fa_ga_fb_gb_dc_gc_ed(ai,di,ci,ei,hi,gi,fi,a,d,c,e,h,g,f,r);
    return select_3_7_da_cb_gb_fc_ed_gd(ai,bi,ei,fi,ii,hi,di,a,b,e,f,i,h,d,r);
}

// find_33 ******************* 
function select_1_2(ai,bi,a,b,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return b;
    return a;
}

// find_32 ******************* 
function select_2_4_db_dc(ai,bi,ci,di,a,b,c,d,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return select_1_2(bi,ci,b,c,r);
    return select_1_3_cb(ai,ci,di,a,c,d,r);
}

// find_31 ******************* 
function select_3_6_ca_da_eb_fe(ai,bi,ci,di,ei,fi,a,b,c,d,e,f,r){
    cmp = new compare_strict_or_reflexive(ci < ei);
    if (cmp.call(c, e, r)) 
        return select_2_4_db_dc(di,ci,bi,ei,d,c,b,e,r);
    return select_2_5_da_ea_cb_eb(ai,ei,fi,di,ci,a,e,f,d,c,r);
}

// find_30 ******************* 
function select_3_7_fa_fb_gb_dc_ec_ge(ai,bi,ci,di,ei,fi,gi,a,b,c,d,e,f,g,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return select_3_6_ca_da_eb_fe(ci,ai,di,ei,bi,fi,c,a,d,e,b,f,r);
    return select_3_7_da_ga_cb_eb_fd_ge(bi,ci,di,ai,ei,fi,gi,b,c,d,a,e,f,g,r);
}

// find_14 ******************* 
function select_4_9_ga_gb_hb_dc_ec_fd_he_ig(ai,bi,ci,di,ei,fi,gi,hi,ii,a,b,c,d,e,f,g,h,i,r){
    cmp = new compare_strict_or_reflexive(ai < di);
    if (cmp.call(a, d, r)) 
        return select_4_9_fa_ga_db_eb_ec_fc_gd_he_if(bi,ci,ai,ei,di,gi,hi,fi,ii,b,c,a,e,d,g,h,f,i,r);
    return select_3_7_fa_fb_gb_dc_ec_ge(ei,bi,di,fi,ai,hi,gi,e,b,d,f,a,h,g,r);
}

// find_24 ******************* 
function select_4_9_da_ia_eb_hb_ec_gc_gd_hd_fe_ie(ai,bi,ci,di,ei,fi,gi,hi,ii,a,b,c,d,e,f,g,h,i,r){
    cmp = new compare_strict_or_reflexive(di < ei);
    if (cmp.call(d, e, r)) 
        return select_2_5_da_ea_cb_eb(bi,ci,gi,hi,ei,b,c,g,h,e,r);
    return select_1_4_cb_db(fi,ai,di,ii,f,a,d,i,r);
}

// find_26 ******************* 
function select_2_5_ea_db_dc_ec(ai,bi,ci,di,ei,a,b,c,d,e,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return select_1_3_cb(bi,ci,ei,b,c,e,r);
    return select_1_3_cb(ai,ci,di,a,c,d,r);
}

// find_28 ******************* 
function select_1_4_da_cb(ai,bi,ci,di,a,b,c,d,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return select_0_2(bi,di,b,d,r);
    return select_0_2(ai,ci,a,c,r);
}

// find_27 ******************* 
function select_2_6_ca_ea_db_eb_fd(ai,bi,ci,di,ei,fi,a,b,c,d,e,f,r){
    cmp = new compare_strict_or_reflexive(ci < di);
    if (cmp.call(c, d, r)) 
        return select_1_3_cb(ci,bi,ei,c,b,e,r);
    return select_1_4_da_cb(ai,di,fi,ei,a,d,f,e,r);
}

// find_25 ******************* 
function select_3_7_da_ga_cb_eb_fd_ge(ai,bi,ci,di,ei,fi,gi,a,b,c,d,e,f,g,r){
    cmp = new compare_strict_or_reflexive(ci < di);
    if (cmp.call(c, d, r)) 
        return select_2_5_ea_db_dc_ec(ci,ei,ai,gi,di,c,e,a,g,d,r);
    return select_2_6_ca_ea_db_eb_fd(di,bi,fi,ei,ci,gi,d,b,f,e,c,g,r);
}

// find_16 ******************* 
function select_4_9_ha_ia_db_gb_ec_ic_fd_id_ge_he(ai,bi,ci,di,ei,fi,gi,hi,ii,a,b,c,d,e,f,g,h,i,r){
    cmp = new compare_strict_or_reflexive(ai < di);
    if (cmp.call(a, d, r)) 
        return select_4_9_da_ia_eb_hb_ec_gc_gd_hd_fe_ie(ci,bi,ai,ei,di,fi,hi,gi,ii,c,b,a,e,d,f,h,g,i,r);
    return select_3_7_da_ga_cb_eb_fd_ge(ci,di,fi,ei,ai,gi,ii,c,d,f,e,a,g,i,r);
}

// find_23 ******************* 
function select_1_4_cb_db(ai,bi,ci,di,a,b,c,d,r){
    cmp = new compare_strict_or_reflexive(ai < ci);
    if (cmp.call(a, c, r)) 
        return select_1_3_cb(ai,bi,di,a,b,d,r);
    return select_0_2(ci,di,c,d,r);
}

// find_18 ******************* 
function select_3_8_da_ha_cb_gb_ec_hc_fd_gd(ai,bi,ci,di,ei,fi,gi,hi,a,b,c,d,e,f,g,h,r){
    cmp = new compare_strict_or_reflexive(ci < di);
    if (cmp.call(c, d, r)) 
        return select_1_4_cb_db(ei,ai,di,hi,e,a,d,h,r);
    return select_1_4_cb_db(fi,bi,ci,gi,f,b,c,g,r);
}

// find_22 ******************* 
function select_0_2(ai,bi,a,b,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return a;
    return b;
}

// find_21 ******************* 
function select_1_3_cb(ai,bi,ci,a,b,c,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return b;
    return select_0_2(ai,ci,a,c,r);
}

// find_20 ******************* 
function select_2_5_da_ea_cb_eb(ai,bi,ci,di,ei,a,b,c,d,e,r){
    cmp = new compare_strict_or_reflexive(ci < di);
    if (cmp.call(c, d, r)) 
        return select_1_3_cb(ci,ai,ei,c,a,e,r);
    return select_1_3_cb(di,bi,ei,d,b,e,r);
}

// find_19 ******************* 
function select_3_7_da_ea_cb_eb_fc_gd(ai,bi,ci,di,ei,fi,gi,a,b,c,d,e,f,g,r){
    cmp = new compare_strict_or_reflexive(ci < di);
    if (cmp.call(c, d, r)) 
        return select_2_5_da_ea_cb_eb(ai,ci,fi,ei,di,a,c,f,e,d,r);
    return select_2_5_da_ea_cb_eb(bi,di,gi,ei,ci,b,d,g,e,c,r);
}

// find_17 ******************* 
function select_3_8_fa_ha_eb_fb_dc_ec_gd_hd(ai,bi,ci,di,ei,fi,gi,hi,a,b,c,d,e,f,g,h,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return select_3_8_da_ha_cb_gb_ec_hc_fd_gd(ai,ci,di,bi,gi,fi,ei,hi,a,c,d,b,g,f,e,h,r);
    return select_3_7_da_ea_cb_eb_fc_gd(bi,ci,di,ai,ei,gi,fi,b,c,d,a,e,g,f,r);
}

// find_15 ******************* 
function select_4_10_da_ha_gb_ib_ec_gc_fd_he_ie_jg(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,a,b,c,d,e,f,g,h,i,j,r){
    cmp = new compare_strict_or_reflexive(di < gi);
    if (cmp.call(d, g, r)) 
        return select_4_9_ha_ia_db_gb_ec_ic_fd_id_ge_he(bi,ai,ci,di,ei,fi,hi,ii,gi,b,a,c,d,e,f,h,i,g,r);
    return select_3_8_fa_ha_eb_fb_dc_ec_gd_hd(ai,ei,bi,gi,ii,hi,ji,di,a,e,b,g,i,h,j,d,r);
}

// find_13 ******************* 
function select_4_10_ha_ia_db_eb_fc_hc_ge_if_jh(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,a,b,c,d,e,f,g,h,i,j,r){
    cmp = new compare_strict_or_reflexive(di < fi);
    if (cmp.call(d, f, r)) 
        return select_4_9_ga_gb_hb_dc_ec_fd_he_ig(ai,ci,bi,ei,di,gi,hi,fi,ji,a,c,b,e,d,g,h,f,j,r);
    return select_4_10_da_ha_gb_ib_ec_gc_fd_he_ie_jg(bi,ai,ci,ei,fi,gi,hi,di,ii,ji,b,a,c,e,f,g,h,d,i,j,r);
}

// find_12 ******************* 
function select_4_10_ea_ia_db_ib_fc_gc_hg_ji(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,a,b,c,d,e,f,g,h,i,j,r){
    cmp = new compare_strict_or_reflexive(di < ei);
    if (cmp.call(d, e, r)) 
        return select_4_10_ha_ia_db_eb_fc_hc_ge_if_jh(ai,ci,bi,fi,gi,di,hi,ii,ei,ji,a,c,b,f,g,d,h,i,e,j,r);
    return select_4_10_ha_ia_db_eb_fc_hc_ge_if_jh(bi,ci,ai,fi,gi,ei,hi,ii,di,ji,b,c,a,f,g,e,h,i,d,j,r);
}

// find_11 ******************* 
function select_4_10_ha_gb_fc_ic_ed_id_ji(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,a,b,c,d,e,f,g,h,i,j,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return select_4_10_ea_ia_db_ib_fc_gc_hg_ji(ci,di,ai,ei,fi,hi,bi,gi,ii,ji,c,d,a,e,f,h,b,g,i,j,r);
    return select_4_10_ea_ia_db_ib_fc_gc_hg_ji(ci,di,bi,ei,fi,gi,ai,hi,ii,ji,c,d,b,e,f,g,a,h,i,j,r);
}

// find_9 ******************* 
function select_5_11_gb_fc_jc_ed_hd_ih_jh_kj(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,a,b,c,d,e,f,g,h,i,j,k,r){
    cmp = new compare_strict_or_reflexive(ai < ei);
    if (cmp.call(a, e, r)) 
        return select_5_11_fa_hb_ec_jc_gd_hd_ig_jg_kj(bi,ai,ci,di,fi,gi,hi,ei,ii,ji,ki,b,a,c,d,f,g,h,e,i,j,k,r);
    return select_4_10_ha_gb_fc_ic_ed_id_ji(bi,ei,ci,hi,ii,fi,ai,gi,ji,ki,b,e,c,h,i,f,a,g,j,k,r);
}

// find_8 ******************* 
function select_5_11_eb_gc_ic_fd_hd_jh_ki(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,a,b,c,d,e,f,g,h,i,j,k,r){
    cmp = new compare_strict_or_reflexive(hi < ii);
    if (cmp.call(h, i, r)) 
        return select_5_11_gb_fc_jc_ed_hd_ih_jh_kj(ai,bi,ci,di,fi,gi,ei,hi,ji,ii,ki,a,b,c,d,f,g,e,h,j,i,k,r);
    return select_5_11_gb_fc_jc_ed_hd_ih_jh_kj(ai,bi,di,ci,gi,fi,ei,ii,ki,hi,ji,a,b,d,c,g,f,e,i,k,h,j,r);
}

// find_7 ******************* 
function select_5_11_hb_gc_fd_ie_je_kj(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,a,b,c,d,e,f,g,h,i,j,k,r){
    cmp = new compare_strict_or_reflexive(bi < ci);
    if (cmp.call(b, c, r)) 
        return select_5_11_eb_gc_ic_fd_hd_jh_ki(ai,di,bi,ei,fi,ii,hi,ji,ci,ki,gi,a,d,b,e,f,i,h,j,c,k,g,r);
    return select_5_11_eb_gc_ic_fd_hd_jh_ki(ai,di,ci,ei,fi,ii,gi,ji,bi,ki,hi,a,d,c,e,f,i,g,j,b,k,h,r);
}

// find_6 ******************* 
function select_5_11_kb_jc_id_he_gf(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,a,b,c,d,e,f,g,h,i,j,k,r){
    cmp = new compare_strict_or_reflexive(bi < ci);
    if (cmp.call(b, c, r)) 
        return select_5_11_hb_gc_fd_ie_je_kj(ai,di,ei,fi,bi,gi,hi,ii,ki,ci,ji,a,d,e,f,b,g,h,i,k,c,j,r);
    return select_5_11_hb_gc_fd_ie_je_kj(ai,di,ei,fi,ci,gi,hi,ii,ji,bi,ki,a,d,e,f,c,g,h,i,j,b,k,r);
}

// find_5 ******************* 
function select_5_11_kd_je_if_hg(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,a,b,c,d,e,f,g,h,i,j,k,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return select_5_11_kb_jc_id_he_gf(ci,ai,di,ei,fi,gi,hi,ii,ji,ki,bi,c,a,d,e,f,g,h,i,j,k,b,r);
    return select_5_11_kb_jc_id_he_gf(ci,bi,di,ei,fi,gi,hi,ii,ji,ki,ai,c,b,d,e,f,g,h,i,j,k,a,r);
}

// find_4 ******************* 
function select_5_11_kf_jg_ih(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,a,b,c,d,e,f,g,h,i,j,k,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return select_5_11_kd_je_if_hg(ci,di,ei,ai,fi,gi,hi,ii,ji,ki,bi,c,d,e,a,f,g,h,i,j,k,b,r);
    return select_5_11_kd_je_if_hg(ci,di,ei,bi,fi,gi,hi,ii,ji,ki,ai,c,d,e,b,f,g,h,i,j,k,a,r);
}

// find_3 ******************* 
function select_5_11_kh_ji(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,a,b,c,d,e,f,g,h,i,j,k,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return select_5_11_kf_jg_ih(ci,di,ei,fi,gi,ai,hi,ii,ji,ki,bi,c,d,e,f,g,a,h,i,j,k,b,r);
    return select_5_11_kf_jg_ih(ci,di,ei,fi,gi,bi,hi,ii,ji,ki,ai,c,d,e,f,g,b,h,i,j,k,a,r);
}

// find_2 ******************* 
function select_5_11_kj(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,a,b,c,d,e,f,g,h,i,j,k,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return select_5_11_kh_ji(ci,di,ei,fi,gi,hi,ii,ai,ji,ki,bi,c,d,e,f,g,h,i,a,j,k,b,r);
    return select_5_11_kh_ji(ci,di,ei,fi,gi,hi,ii,bi,ji,ki,ai,c,d,e,f,g,h,i,b,j,k,a,r);
}

// find_1 ******************* 
function select_5_11(ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,a,b,c,d,e,f,g,h,i,j,k,r){
    cmp = new compare_strict_or_reflexive(ai < bi);
    if (cmp.call(a, b, r)) 
        return select_5_11_kj(ci,di,ei,fi,gi,hi,ii,ji,ki,ai,bi,c,d,e,f,g,h,i,j,k,a,b,r);
    return select_5_11_kj(ci,di,ei,fi,gi,hi,ii,ji,ki,bi,ai,c,d,e,f,g,h,i,j,k,b,a,r);
}

function median_11(a,b,c,d,e,f,g,h,i,j,k,r){
    return select_5_11(0,1,2,3,4,5,6,7,8,9,10,a,b,c,d,e,f,g,h,i,j,k,r);
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
    select_5_11: median_11,
    median_11_generated_unstable: median_11,
    median_11_generated_stable: median_11,
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