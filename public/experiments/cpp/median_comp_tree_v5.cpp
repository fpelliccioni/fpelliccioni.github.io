// // The Art of Computer Programming Vol.3 Sorting, p.212
// // Vt(n) <= n-t + (t+1) * ceil(lg(n+2-t))   


// const vtn = {
//     1: [0],
//     2: [1,1],
//     3: [2,3,2],
//     4: [3,4,4,3],
//     5: [4,6,6,6,4],
//     6: [5,7,8,8,7,5],
//     7: [6,8,10,10,10,8,6],
//     8: [7,9,11,12,12,11,9,7],
//     9: [8,11,12,14,14,14,12,11,8],
//     10: [9,12,14,15,16,16,15,14,12,9],
// };



#include <algorithm>
#include <tuple>
#include <vector>
#include <utility>
#include <iostream>
#include <numeric>
#include <unordered_map>
#include <set>

#include "json.hpp"

using namespace std;
using json = nlohmann::json;

using pair_t = pair<int, int>;
using pairs_t = vector<pair_t>;
using values_t = vector<vector<int>>;

namespace common {

pairs_t gen_pairs(size_t n) {
    pairs_t pairs;

    for (size_t i = 0; i < n; ++i) {
        for (size_t j = 0; j < n; ++j) {
            if (i < j) {
                pairs.emplace_back(i + 1, j + 1);
            }
        }
    }
    return pairs;
}

pairs_t remove_pairs(pairs_t const& pairs, pairs_t const& to_remove) {
    pairs_t res;

    for (auto&& pair_l : pairs) {
        // var pair_r = pair_l.slice().reverse();

        auto index_l = find_if(begin(to_remove), end(to_remove), [&pair_l](auto e) {
            return e == pair_l;
        });

        auto index_r = find_if(begin(to_remove), end(to_remove), [&pair_l](auto e) {
            return e.first == pair_l.second && e.second == pair_l.first;
        });

        if (index_l == end(to_remove) && index_r == end(to_remove)) {
            res.push_back(pair_l);
        }
    }

    // res = remove_duplicates(res);
    return res;
}

pairs_t remove_pairs_transitive(pairs_t const& pairs, pairs_t to_remove) {

    bool cont = true;
    while (cont) {
        cont = false;
        pairs_t trans;

        for (auto&& pair : to_remove) {
            
            auto l = end(to_remove);
            auto f = find_if(begin(to_remove), l, [&pair](auto e) {
                return get<0>(e) == get<1>(pair);
            });

            while (f != l) {
                
                pair_t to_insert_pair {pair.first, f->second};
                auto f2 = find_if(begin(to_remove), l, [&to_insert_pair](auto e) {
                    return e == to_insert_pair;
                });

                if (f2 == l) {
                    trans.emplace_back(pair.first, f->second);
                    cont = true;
                }
                ++f;
                f = find_if(f, l, [&pair](auto e) {
                    return get<0>(e) == get<1>(pair);
                });
            }
        }
        to_remove.insert(end(to_remove), begin(trans), end(trans));
    }

    auto pairs_new = remove_pairs(pairs, to_remove);
    // pairs = remove_pairs(pairs, trans);
    return pairs_new;
}

bool satisfy_all_preconds(vector<int> const& element, pairs_t const& preconds) {
    for (auto&& precond : preconds) {

        auto ia = find(begin(element), end(element), precond.first);
        auto ib = find(begin(element), end(element), precond.second);
        
        if (ia == end(element) || ib == end(element)) {
            cout << "????? 1\n";
        }

        if (ia >= ib) {
            return false;
        }
    }

    return true;
}

values_t get_values(size_t n, pairs_t const& preconds) {

    // if (n == 10) {
    //     var contents = fs.readFileSync('values_10___12_34_56_89_24.txt', 'utf8');
    //     var values = JSON.parse(contents);
    //     // console.log(values.length);
    //     values = apply_precons(values, preconds);
    //     // console.log(values.length);
    //     return values;
    // }

    values_t values;
    vector<int> element(n);
    iota(begin(element), end(element), 1);    

    do {
        if (satisfy_all_preconds(element, preconds)) {
            values.push_back(element);
        }
    } while(next_permutation(begin(element), end(element)));

    return values;
}

//TODO: refactor, use partition
values_t remove_values2(values_t const& values, pair_t const& node) {
    values_t res;

    for (auto&& element : values) {
        if (element.size() < 2) {
            res.push_back(element);
            continue;
        }
        auto ia = find(begin(element), end(element), node.first);
        auto ib = find(begin(element), end(element), node.second);

        if (ia < ib || ia == end(element) || ib == end(element)) {
            res.push_back(element);
        } else {
            1 == 1;
        }
    }

    return res;
}

//TODO: refactor, use partition
values_t apply_precons(values_t values, pairs_t const& preconds) {

    if (values.size() < 2) return values;

    for (auto&& p : preconds) {
        values = remove_values2(values, p);
        if (values.size() == 0) break;
    }
    return values;
}


vector<tuple<int, int, int>> remove_duplicates_slow(vector<tuple<int, int, int>> const& arr) {
    vector<string> arr_str;
    for (auto&& e : arr) {
        arr_str.push_back(json(e).dump());
    }

    // arr_str = [... new Set(arr_str)];
    {
    set<string> s;
    s.insert(begin(arr_str), end(arr_str));
    arr_str.clear();
    arr_str.insert(end(arr_str), begin(s), end(s));
    }
    
    vector<tuple<int, int, int>> res;
    res.reserve(arr_str.size());

    for (auto&& e : arr_str) {
        auto obj = json::parse(e).get<tuple<int, int, int>>();
        res.push_back(obj);
    }
    return res;
}


} // namespace common


//TODO: refactor
unordered_map<int, int> count_numbers_at(values_t const& values, size_t s) {
    unordered_map<int, int> d;

    for (auto&& element : values) {
        auto const& num = element[s];

        auto f = d.find(num);
        d[num]++;
        // if (num in d) {
        //     d[num] = d[num] + 1;
        // } else {
        //     d[num] = 1;
        // }
    }


    return d;

}

pair_t invert(pair_t const& x) {
    return {x.second, x.first};
}

//TODO: refactor
optional<pair_t> get_real_pair(pairs_t const& pairs, pair_t const& potential_pair) {
    auto f = find_if(begin(pairs), end(pairs), [&potential_pair](auto e) {
        return e == potential_pair;
    });
    if (f != end(pairs)) return potential_pair;

    auto const potential_pair_r = invert(potential_pair);
    f = find_if(begin(pairs), end(pairs), [&potential_pair_r](auto e) {
        return e == potential_pair_r;
    });
    if (f != end(pairs)) return potential_pair_r;

    return nullopt;
}


vector<tuple<int, int, int>> remove_reflexive_duplicates(vector<tuple<int, int, int>> const& array_of_pairs) {
    vector<tuple<int, int, int>> res;
    
    for (auto&& elem : array_of_pairs) {
        pair_t const p {get<0>(elem), get<1>(elem)};
        pair_t const reflex = invert(p);
        auto const f = find_if(begin(res), end(res), [&reflex](auto e) {
            return get<0>(e) == get<0>(reflex) && get<1>(e) == get<1>(reflex);
        });
        if (f == end(res)) {
            res.push_back(elem);
        } else {
            // console.log()
        }
    }
    return res;
}

vector<pair<int, int>> count_numbers_at_pairs_sorted(unordered_map<int, int> const& counted_nums) {

    vector<tuple<int, int, int>> counted_nums_arr;
    for (auto&& kv0 : counted_nums) {
        for (auto&& kv1 : counted_nums) {
            if (kv0.first != kv1.first) {
                counted_nums_arr.emplace_back(kv0.first, kv1.first, kv0.second + kv1.second);
            }
        }
    }
    auto old_len = counted_nums_arr.size();
    counted_nums_arr = common::remove_duplicates_slow(counted_nums_arr);

    if (counted_nums_arr.size() != old_len) {
        cout << "ALGO ESTA MAL 1\n";
    }

    counted_nums_arr = remove_reflexive_duplicates(counted_nums_arr);

    stable_sort(begin(counted_nums_arr), end(counted_nums_arr), [](auto a, auto b) { 
        return get<2>(a) > get<2>(b); 
    });

    vector<pair<int, int>> res;
    for (auto&& e : counted_nums_arr) {
        res.emplace_back(get<0>(e), get<1>(e));
    }

    return res;
}



pair<bool, vector<pairs_t>> tree_exportable(size_t n, size_t s, pairs_t const& preconds, size_t max_comps, pairs_t pairs, values_t values) {

    if (s == n) {
        s = n << 1;
        cout << "n: " << n << "\n";
        cout << "s: " << s << "\n";
    }

    //TODO: mutable algorithm
    pairs = common::remove_pairs_transitive(pairs, preconds);

    //TODO: mutable algorithm
    values = common::apply_precons(values, preconds);
    
    auto counted_nums = count_numbers_at(values, s);
    // console.log(JSON.stringify(counted_nums));
    // console.log(Object.keys(counted_nums).length);

    if (counted_nums.size() == 1) {
        // cout << "Ok: " << json(preconds).dump() << '\n';
        return {true, {preconds}};
        // return true;
    }

    if (preconds.size() >= max_comps) {
        return {false, {}};
        // return false;
    }

    auto counted_nums_pairs = count_numbers_at_pairs_sorted(counted_nums);
    for (auto&& potential_pair : counted_nums_pairs) {
        auto pair = get_real_pair(pairs, potential_pair);

        if (pair) {
            auto preconds_l = preconds;
            preconds_l.push_back(*pair);

            auto res_l = tree_exportable(n, s, preconds_l, max_comps, pairs, values);
            if ( ! get<0>(res_l)) {
                continue;
            }

            auto const pair_r = invert(*pair);
            auto preconds_r = preconds;
            preconds_r.push_back(pair_r);
            auto res_r = tree_exportable(n, s, preconds_r, max_comps, pairs, values);
            if ( ! get<0>(res_r)) {
                continue;
            }

            vector<pairs_t> res;
            res.reserve(get<1>(res_l).size() + get<1>(res_r).size());
            res.insert(end(res), begin(get<1>(res_l)), end(get<1>(res_l)));
            res.insert(end(res), begin(get<1>(res_r)), end(get<1>(res_r)));
            return {true, res};
            // return [true, [...res_l[1], ...res_r[1]]];
        }
    }

    return {false, {}};
}

int main(int argc, char** argv) {
    pairs_t preconds_arg;
    if (argc >= 2) {
        cout << argv[1] << '\n';
        json::parse(argv[1]).get_to(preconds_arg);
        // var preconds_arg = JSON.parse(process.argv[2]);
        cout << json(preconds_arg).dump() << '\n';
    }

    
    // vector<tuple<int, int, int, pairs_t>> tests = {
    //     {6, 11, 18, {{1,2},{3,4},{5,6},{7,8},{2,4},{6,8},{2,6},{2,5},{5,3},{9,7}}}
    // };

    vector<tuple<int, int, int, pairs_t>> tests = {
        {6, 11, 18, preconds_arg}
    };

    for (auto&& e : tests) {
        auto s = get<0>(e) - 1;
        size_t n = get<1>(e);
        auto max_comps = get<2>(e);
        auto preconds = get<3>(e);
        
        auto pairs = common::gen_pairs(n);
        std::cout << json(pairs).dump() << std::endl;
        std::cout << pairs.size() << std::endl;
        pairs = common::remove_pairs_transitive(pairs, preconds);
        std::cout << json(pairs).dump() << std::endl;
        std::cout << pairs.size() << std::endl;

        auto values = common::get_values(n, preconds);
        std::cout << values.size() << std::endl;

        auto res = tree_exportable(n, s, preconds, max_comps, pairs, values);

        if ( ! get<0>(res)) {
            cout << "index: invalid: " << (s + 1) << ", " << n << ", " << json(preconds).dump() << '\n';
        } else {
            // var rev = res[1].reverse();
            cout << "-------------------------------------------------------" << '\n';
            cout << "-------------------------------------------------------" << '\n';
            cout << "-------------------------------------------------------" << '\n';
            cout << "-------------------------------------------------------" << '\n';
            cout << json(get<1>(res)).dump();
        }
    }
}