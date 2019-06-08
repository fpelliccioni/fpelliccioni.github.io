---
layout: post
type: draft
title:  "Algorithms and specifications"
date:   2019-05-20 12:00:00
comments: true
tags: [bitcoin, btc, bch, crypto, currency, crytocurrencies, stepanov, knuth, c++, cpp,
pisano, fibonacci, greek, arabs, merkle, fm2gp, generic, programming, math, mathematics]
---

In this article I want to talk about 2 topics in which I think that most programmers tend to fail: Algorithms and Specifications.

I'm going to use a real experience, which happened some time ago:

For 3 years now I have maintained a multi-currency node (Bitcoin, Bitcoin Cash and Litecoin) called [Bitprim](https://github.com/bitprim/bitprim).  
In November 2017 [Bitcoin Cash](https://www.bitcoincash.org/) made its first protocol change after its birth in August of the same year. My job at that time was to update the code of our node to support the protocol changes. From that moment I want to write this article, but ... for one or several reasons I did not do it at that moment, I am doing it now.

The most important change was in the _Difficulty Adjustment Algorithm_, from now _DAA_.

[Here the description of the algorithm](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/nov-13-hardfork-spec.md#difficulty-adjustment-algorithm-description).

I do not want to go into detail about the concept of difficulty or the DAA. For this you can refer to: [Difficulty](https://en.bitcoin.it/wiki/Difficulty). 

What interests me are points 2 and 3 of the description of the DAA:

{% highlight cpp %}
2. Let B_last be chosen[2] from [B_n-2, B_n-1, B_n].
3. Let B_first be chosen[2] from [B_n-146, B_n-145, B_n-144].
{% endhighlight %}

Both point to the footnote `[2]`:

{% highlight cpp %}
2. A block is chosen via the following mechanism: 

Given a list: S = [B_n-2, B_n-1, B_n] 
a. If timestamp(S[0]) greater than timestamp(S[2]) then swap S[0] and S[2]. 
b. If timestamp(S[0]) greater than timestamp(S[1]) then swap S[0] and S[1]. 
c. If timestamp(S[1]) greater than timestamp(S[2]) then swap S[1] and S[2]. 
d. Return S[1]. 

See GetSuitableBlock
{% endhighlight %}

The specification of the algorithm points to its implementation, in a function called [GetSuitableBlock](https://github.com/Bitcoin-ABC/bitcoin-abc/commit/be51cf295c239ff6395a0aa67a3e13906aca9cb2#diff-ba91592f703a9d0badf94e67144bc0aaR208). Here the code:

{% highlight cpp %}
/**
 * To reduce the impact of timestamp manipulation, we select the block we are
 * basing our computation on via a median of 3.
 */
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

    // Sorting network.
    if (blocks[0]->nTime > blocks[2]->nTime) {
        std::swap(blocks[0], blocks[2]);
    }

    if (blocks[0]->nTime > blocks[1]->nTime) {
        std::swap(blocks[0], blocks[1]);
    }

    if (blocks[1]->nTime > blocks[2]->nTime) {
        std::swap(blocks[1], blocks[2]);
    }

     // We should have our candidate in the middle now.
    return blocks[1];
}
{% endhighlight %}

What the algorithm does is basically create a sequence of 3 elements (array), order it from least to greatest and return the second element.

The complexity in time of this algorithm is:

- Best case: 0 swaps, 3 comparisons
- Worst case: 2 swaps, 3 comparisons
- Average case: 7/6 swaps, 3 comparisons; assuming a uniform distribution of the input data.

Now, look again at the algorithm. An array is being created (using the input data), then sort it up and return the middle element. This is a known algorithm and is called [median](https://en.wikipedia.org/wiki/Median), in particular, _median of 3 elements_.

The median is a _selection_ algorithm. Unlike the sorting (inplace) algorithms, the selection algorithms should not mutate the input data, but return one of the elements.

Here is a sketch of the _median of 3_ algorithm, in `C++`:

{% highlight cpp %}
template <TotallyOrdered T>
auto max(T const& a, U const& b) {
    return b < a ? b : a;
}

template <TotallyOrdered T>
auto median_3_ab(T const& a, T const& b, T const& c) {
    // precondition: a <= b
    
    return ! (c < b) ? b :        // a, b, c are sorted
                       max(a, c); // b is not the median
}

template <TotallyOrdered T>
auto median_3(T const& a, T const& b, T const& c) {
    return b < a ? median_3_ab(b, a, c) 
                 : median_3_ab(a, b, c);
}
{% endhighlight %}

Or if you prefer the _inline_ version of the algorithm:

{% highlight cpp %}
template <TotallyOrdered T>
auto median_3(T const& a, T const& b, T const& c) {
    if (b < a) {
        if (c >= a) return a;  // b, a, c are sorted
        return max(b, c);      // a is not the median
    } else {    // a <= b
        if (c >= b) return b;  // a, b, c are sorted
        return max(a, c);      // b is not the median
    }
}
{% endhighlight %}

I leave the analysis of the code for the reader, for the lazy: what the algorithm does is simply select the middle element between `a`, `b` and `c`, pretending that the 3 were sorted in ascending order. It does this without mutating or reordering the input data.

The time complexity of `median_3` is:

- Best case: 0 swaps, 2 comparisons
- Worst case: 0 swaps, 3 comparisons
- Average case: 0 swaps, 8/3 comparisons; assuming a uniform distribution of the input data.

Now, we could use our new algorithm in the original `GetSuitableBlock` function:

{% highlight cpp %}
static 
CBlockIndex const* GetSuitableBlockNewVersion(CBlockIndex const* pindex) {
    assert(pindex->nHeight >= 3);
    return &median_3(*pindex->pprev->pprev, *pindex->pprev, *pindex);
}
{% endhighlight %}

Much shorter and understandable, right?.

Before continuing, we have to fix something: we do not know if the _Natural Ordering_ specified in the `CBlockIndex` class is given by the block's timestamp (`nTime` attribute).  
We need a version of `median_3` that accepts a form of comparison specified by the user: we need you to accept a _strict weak ordering relation_ ([for more information see here](http://componentsprogramming.com/writing-min-function-part3/)).

{% highlight cpp %}
template <Regular T, StrictWeakOrdering R>
auto max(T const& a, U const& b, R r) {
    return r(b, a) ? b : a;
}

template <Regular T, StrictWeakOrdering R>
auto median_3_ab(T const& a, T const& b, T const& c, R r) {
    // precondition: a <= b
    
    return ! r(c, b) ? b :           // a, b, c are sorted
                       max(a, c, r); // b is not the median
}

template <Regular T, StrictWeakOrdering R>
auto median_3(T const& a, T const& b, T const& c, R r) {
    return r(b, a) ? median_3_ab(b, a, c, r) 
                   : median_3_ab(a, b, c, r);
}
{% endhighlight %}

Now, we can correctly implement `GetSuitableBlockNewVersion`, comparing by `nTime`:

{% highlight cpp %}
static 
CBlockIndex const* GetSuitableBlockNewVersion(CBlockIndex const* pindex) {
    assert(pindex->nHeight >= 3);
    return &median_3(*pindex->pprev->pprev, *pindex->pprev, *pindex, [](auto const& a, auto const& b){
        return a.nTime < b.nTime;
    });
}
{% endhighlight %}

We have one last problem to solve. Let's make a small test of the original algorithm and the new one:

{% highlight cpp %}
struct CBlockIndex {
    size_t nHeight;
    size_t nTime;
    CBlockIndex* pprev;
};

int main() {
    CBlockIndex ba {1, 1558731500, nullptr};
    CBlockIndex bb {2, 1558731500, &ba};        //same nTime as previous
    CBlockIndex bc {3, 1558730000, &bb};

    auto r = GetSuitableBlockNewVersion(&bc);
    cout << "GetSuitableBlockNewVersion: " << r->nHeight << endl;

    r = GetSuitableBlock(&bc);
    cout << "GetSuitableBlock:           " << r->nHeight << endl;
}
{% endhighlight %}

The code above prints:

{% highlight cpp %}
GetSuitableBlockNewVersion: 1
GetSuitableBlock:           2
{% endhighlight %}

What we are trying to prove with the previous code is the stability of both algorithms. Our `median_3` algorithm is _stable_ which means that the relative order of the equivalent elements is preserved ([for more information see here](http://componentsprogramming.com/writing-min-function-part5/)).

To prove it with data, we will use the previous example, in which we have the following input data for our algorithms:

{% highlight cpp %}
s = [{1, 1558731500}, {2, 1558731500}, {3, 1558730000}]
{% endhighlight %}

Where the first element of each pair is `nHeight`, the identifier of the block, and the second element is the timestamp called `nTime`.
Note that the `nTime` of the first 2 elements is the same.

If we sort the previous sequence by `nTime` using a stable ordering algorithm, such as [Merge sort](https://en.wikipedia.org/wiki/Merge_sort) we would have something like this:

{% highlight cpp %}
s = [{3, 1558730000}, {1, 1558731500}, {2, 1558731500}]
{% endhighlight %}

Note that the middle element is the one with `nHeight = 1`. This indicates that our algorithm behaved in a stable manner but not the original algorithm used in the Bitcoin Cash DAA.

In my first implementation of DAA in the Bitprim node I used a code similar to `median_3` which was also stable, since I had not verified the code of the specification, I had mistakenly assumed that it was also stable.  
Then this caused runtime errors of our node on a difficulty change. It did not always happen, but there was a particular case in which we could detect it. After several hours of debugging I could detect that the problem was that the algorithm used by me was not compatible with the "specified" in DAA.

Therefore, I had to "correct" my algorithm to make it non-stable in the same way as that of the specification.

Actually, if I remember correctly, the first version of the DAA specification did not mention the `GetSuitableBlock` code, but said that the median of 3 elements was calculated. Since the implementation of the median was "incorrect" they had to adapt the specification to be consistent with the code.
Keep in mind, that once the code of a Bitcoin node (or any cryptocurrency) is in operation, a modification in its behavior introduces incompatibilities with previous versions and produces the so-called forks. So once the code is running, it's about not changing it. For this reason it is why the specification had to be adapted instead of correcting the code.

Before finishing, let's make a comparison of both algorithms, `GetSuitableBlock` vs. `median_3`:

- `median_3` does not make any swap, `GetSuitableBlock` can make between 0, 7/6 or 2 swaps, unnecessarily. (Efficiency)
- `GetSuitableBlock` creates an array, unnecessarily. (Efficiency)
- `median_3` performs 2, 8/3 or 3 comparisons, `GetSuitableBlock` always performs 3 comparisons. (Efficiency)
- `median_3` is stable, `GetSuitableBlock` is not. `median_3` is what anyone expects from an algorithm that calculates the median of 3 elements. (Correctness)

And now, to conclude, some conclusions:

The author of the DAA specification could have chosen a known and "standard" algorithm, but he did not.
And perhaps the worst of all is that the specification refers to the code. **The code must never be specification. The code must be created from a specification.** So if a specification refers to code, there is no such specification.

Bye!

---

## Acknowledgments

Thanks in particular to the following for their feedback to improve this article: Dario Ramos and Nubis Bruno.
