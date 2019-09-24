#include <cassert>
#include <utility>
#include <iostream>

using namespace std;

// -------------------------------------------------------------
#define Regular typename
#define StrictWeakOrdering typename
// -------------------------------------------------------------

struct CBlockIndex {
    size_t nHeight;
    size_t nTime;
    CBlockIndex* pprev;
};

static const CBlockIndex *GetSuitableBlock(const CBlockIndex *pindex) {
    assert(pindex->nHeight >= 3);

    /**
    * In order to avoid a block is a very skewed timestamp to have too much
    * influence, we select the median of the 3 top most blocks as a starting
    * point.
    */
    const CBlockIndex *blocks[3];
    blocks[2] = pindex;
    blocks[1] = pindex->pprev;
    blocks[0] = blocks[1]->pprev;

    // cout << blocks[0]->nTime << std::endl;
    // cout << blocks[1]->nTime << std::endl;
    // cout << blocks[2]->nTime << std::endl;

    // Sorting network.
    if (blocks[0]->nTime > blocks[2]->nTime) {
        // cout << "swap 1" << std::endl;
        std::swap(blocks[0], blocks[2]);
    }

    if (blocks[0]->nTime > blocks[1]->nTime) {
        // cout << "swap 2" << std::endl;
        std::swap(blocks[0], blocks[1]);
    }

    if (blocks[1]->nTime > blocks[2]->nTime) {
        // cout << "swap 3" << std::endl;
        std::swap(blocks[1], blocks[2]);
    }

     // We should have our candidate in the middle now.
    return blocks[1];
}

template <Regular T, StrictWeakOrdering R>
T const& median_3_ab(T const& a, T const& b, T const& c, R r) {
    // precondition: a <= b
    
    return ! r(c, b) ? b :           // a, b, c are sorted
                       std::max(a, c, r); // b is not the median
}

template <Regular T, StrictWeakOrdering R>
T const& median_3(T const& a, T const& b, T const& c, R r) {
    return r(b, a) ? median_3_ab(b, a, c, r) 
                   : median_3_ab(a, b, c, r);
}

static 
CBlockIndex const* GetSuitableBlockNewVersion(CBlockIndex const* pindex) {
    assert(pindex->nHeight >= 3);

    return &median_3(*pindex->pprev->pprev, *pindex->pprev, *pindex, [](auto const& a, auto const& b){
        return a.nTime < b.nTime;
    });
}

int main() {
    CBlockIndex ba {1, 1558731500, nullptr};
    CBlockIndex bb {2, 1558731500, &ba};
    CBlockIndex bc {3, 1558730000, &bb};

    auto r = GetSuitableBlockNewVersion(&bc);
    cout << "GetSuitableBlockNewVersion: " << r->nHeight << std::endl;

    r = GetSuitableBlock(&bc);
    cout << "GetSuitableBlock:  " << r->nHeight << std::endl;
}


/*

2
3
1
1
3
2

2
1
2

2
1
1


*/



// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------














// #include <cassert>
// #include <utility>
// #include <iostream>

// using namespace std;

// // -------------------------------------------------------------
// #define Regular typename
// #define StrictWeakOrdering typename
// // -------------------------------------------------------------

// struct CBlockIndex {
//     int nHeight;
//     int nTime;
//     CBlockIndex* pprev;
// };

// static const CBlockIndex *GetSuitableBlock(const CBlockIndex *pindex) {
//     assert(pindex->nHeight >= 3);

//     /**
//     * In order to avoid a block is a very skewed timestamp to have too much
//     * influence, we select the median of the 3 top most blocks as a starting
//     * point.
//     */
//     const CBlockIndex *blocks[3];
//     blocks[2] = pindex;
//     blocks[1] = pindex->pprev;
//     blocks[0] = blocks[1]->pprev;

//     // cout << blocks[0]->nTime << std::endl;
//     // cout << blocks[1]->nTime << std::endl;
//     // cout << blocks[2]->nTime << std::endl;

//     // Sorting network.
//     if (blocks[0]->nTime > blocks[2]->nTime) {
//         // cout << "swap 1" << std::endl;
//         std::swap(blocks[0], blocks[2]);
//     }

//     if (blocks[0]->nTime > blocks[1]->nTime) {
//         // cout << "swap 2" << std::endl;
//         std::swap(blocks[0], blocks[1]);
//     }

//     if (blocks[1]->nTime > blocks[2]->nTime) {
//         // cout << "swap 3" << std::endl;
//         std::swap(blocks[1], blocks[2]);
//     }

//      // We should have our candidate in the middle now.
//     return blocks[1];
// }

// void test(int a, int b, int c) {
//     CBlockIndex ba {1, a, nullptr};
//     CBlockIndex bb {2, b, &ba};
//     CBlockIndex bc {3, c, &bb};

//     auto r = GetSuitableBlock(&bc);
//     cout << r->nHeight << std::endl;
//     // cout << r->nTime << std::endl;

//     assert(r->nTime == 2);
// }

// // -------------------------------------------------------------


// template <Regular T, StrictWeakOrdering R>
// T const& median_3_ab(T const& a, T const& b, T const& c, R r) {
//     // precondition: a <= b
    
//     return ! r(c, b) ? b :           // a, b, c are sorted
//                        std::max(a, c, r); // b is not the median
// }

// template <Regular T, StrictWeakOrdering R>
// T const& median_3(T const& a, T const& b, T const& c, R r) {
//     return r(b, a) ? median_3_ab(b, a, c, r) 
//                    : median_3_ab(a, b, c, r);
// }


// static 
// CBlockIndex const* GetSuitableBlockNewVersion(CBlockIndex const* pindex) {
//     assert(pindex->nHeight >= 3);

//     return &median_3(*pindex->pprev->pprev, *pindex->pprev, *pindex, [](auto const& a, auto const& b){
//         return a.nTime < b.nTime;
//     });
// }


// void test2(int a, int b, int c) {
//     CBlockIndex ba {1, a, nullptr};
//     CBlockIndex bb {2, b, &ba};
//     CBlockIndex bc {3, c, &bb};

//     auto r = GetSuitableBlockNewVersion(&bc);
//     cout << r->nHeight << std::endl;
//     // cout << r->nTime << std::endl;

//     // assert(r->nTime == 2);
// }

// // void test2(int a, int b, int c) {
// //     cout << median_3(a, b, c, [](auto const& a, auto const& b){
// //         return a < b;
// //     }) << endl;
// // }


// int main() {

//     // test(1, 2, 3);
//     // test(1, 3, 2);
//     // test(2, 1, 3);
//     // test(2, 3, 1);
//     // test(3, 1, 2);
//     // test(3, 2, 1);

//     // test(1, 2, 2);
//     // test(2, 1, 2);
//     test(2, 2, 1);


//     // test2(1, 2, 3);
//     // test2(1, 3, 2);
//     // test2(2, 1, 3);
//     // test2(2, 3, 1);
//     // test2(3, 1, 2);
//     // test2(3, 2, 1);

//     // test2(1, 2, 2);
//     // test2(2, 1, 2);
//     test2(2, 2, 1);
// }


// /*

// 2
// 3
// 1
// 1
// 3
// 2

// 2
// 1
// 2

// 2
// 1
// 1


// */