---
layout: post
type: draft
title:  "Algoritmos y especificaciones"
date:   2019-05-20 12:00:00
comments: true
tags: [bitcoin, btc, bch, crypto, currency, crytocurrencies, stepanov, knuth, c++, cpp,
pisano, fibonacci, greek, arabs, merkle, fm2gp, generic, programming, math, mathematics]
---

En este artículo quiero hablar sobre 2 temas en los que creo que la mayoría de los programadores solemos fallar: Algoritmos y Especificaciones.

Voy a usar una experiencia real para ... ***

Desde hace ya 3 años mantengo un nodo multimoneda (Bitcoin, Bitcoin Cash y Litecoin) llamado [Bitprim](https://github.com/bitprim/bitprim).   
En Noviembre de 2017 [Bitcoin Cash](https://www.bitcoincash.org/) hizo su primer cambio de protocolo luego de su nacimiento en Agosto del mismo año. Mi trabajo en ese momento era actualizar el código de nuestro nodo para que soporte los cambios de protocolo.

El cambio más importante de fue en el _Algoritmo de Ajuste de Dificultad_, en adelante _DAA_ (del inglés _Difficulty Adjustment Algorithm_).   
Aquí la descripción del algoritmo: https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/nov-13-hardfork-spec.md#difficulty-adjustment-algorithm-description.

No quiero entrar en detalles acerca del concepto de _difultad_ ni del DAA. Para ello puede referirse a https://en.bitcoin.it/wiki/Difficulty. Lo que me interesa son los puntos 2 y 3 de la descripción del DAA:

{% highlight cpp %}
2. Let B_last be chosen[2] from [B_n-2, B_n-1, B_n].
3. Let B_first be chosen[2] from [B_n-146, B_n-145, B_n-144].
{% endhighlight %}

Ambos apuntan a la nota al pie `[2]`:

{% highlight cpp %}
2. A block is chosen via the following mechanism: 

Given a list: S = [B_n-2, B_n-1, B_n] 
a. If timestamp(S[0]) greater than timestamp(S[2]) then swap S[0] and S[2]. 
b. If timestamp(S[0]) greater than timestamp(S[1]) then swap S[0] and S[1]. 
c. If timestamp(S[1]) greater than timestamp(S[2]) then swap S[1] and S[2]. 
d. Return S[1]. 

See GetSuitableBlock
{% endhighlight %}

La especificación del algoritmo apunta a su implementación, en una función llamada [GetSuitableBlock](https://github.com/Bitcoin-ABC/bitcoin-abc/commit/be51cf295c239ff6395a0aa67a3e13906aca9cb2#diff-ba91592f703a9d0badf94e67144bc0aaR208). Aquí su código:

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


Observe bien el algoritmo anterior. Lo que está haciendo es básicamente crear una sequencia de 3 elementos (array), la ordena de menor a mayor y retorna el elemento del medio.

La complejidad en tiempo de este algoritmo es: 

{% highlight cpp %}
Caso mejor: 0 swaps, 3 comparaciones
Caso peor:  2 swaps, 3 comparaciones
Caso promedio: 7/6 swaps, 3 comparaciones; asumiendo una distribución uniforme de los datos de entrada.
{% endhighlight %}






{% highlight cpp %}
template <Regular T, StrictWeakOrdering R>
auto select_1_3_ab(T const& a, T const& b, T const& c, R r) {
    // precondition: a <= b
    
    return ! r(c, b) ? b :                  // a, b, c are sorted
                       select_1_2(a, c, r)  // b is not the median
}

template <Regular T, StrictWeakOrdering R>
auto select_1_3(T const& a, T const& b, T const& c, R r) {
    return r(b, a) ? select_1_3_ab(b, a, c, r) 
                   : select_1_3_ab(a, b, c, r)
}
{% endhighlight %}


{% highlight cpp %}
template <Regular T>
auto select_1_3_ab(T const& a, T const& b, T const& c) {
    // precondition: a <= b
    
    return ! (c < b) ? b :               // a, b, c are sorted
                       select_1_2(a, c)  // b is not the median
}

template <Regular T>
auto select_1_3(T const& a, T const& b, T const& c) {
    return b < a ? select_1_3_ab(b, a, c) 
                 : select_1_3_ab(a, b, c)
}
{% endhighlight %}










{% highlight cpp %}
/**
 * To reduce the impact of timestamp manipulation, we select the block we are
 * basing our computation on via a median of 3.
 */
static const CBlockIndex *GetSuitableBlock(const CBlockIndex *pindex) {
    assert(pindex->nHeight >= 3);
    return select_1_3(pindex->pprev->pprev, pindex->pprev, pindex);
}

{% endhighlight %}










{% highlight cpp %}

template <Regular T, Regular U, Regular V, StrictWeakOrdering R>
    requires(Same<T, U, V> && Domain<R, T>)
inline constexpr
auto select_1_3_ab(T&& a, U&& b, V&& c, R r) {
    // precondition: a <= b
    
    ! r(c, b) ? //!(c < b) -> c >= b
                std::forward<U>(b) :                               // a, b, c are sorted
                select_1_2(std::forward<T>(a), std::forward<V>(c), r)  // b is not the median
}

template <Regular T, Regular U, Regular V, StrictWeakOrdering R>
    requires(Same<T, U, V> && Domain<R, T>)
inline constexpr
auto select_1_3(T&& a, U&& b, V&& c, R r) {
    
    r(b, a) ? select_1_3_ab(std::forward<U>(b), std::forward<T>(a), std::forward<V>(c), r) 
            : select_1_3_ab(std::forward<T>(a), std::forward<U>(b), std::forward<V>(c), r)
}
{% endhighlight %}




Gracias!



I share with you the links to the video and slides of my talk entitled _The Gift of the Arabs_, which was presented at the _Algorithms Study Group_ meetup in May 2017 in Buenos Aires, Argentina.

The content of my talk is based on [Three Algorithmic Journeys](http://stepanovpapers.com/Journeys/Journeys-0.3.pdf) and [From Mathematics to Generic Programming](https://www.amazon.es/Mathematics-Generic-Programming-Alexander-Stepanov/dp/0321942043) by [Alex Stepanov](https://en.wikipedia.org/wiki/Alexander_Stepanov).

It's my interpretation of what would have been his fourth episode, which was never presented, and would have had the same name.

Hope you like it!

[Link to the Video](https://www.youtube.com/watch?v=ZgC6MDh7zJc)

[Link to the Slides ]({{ site.url }}/images/fpelliccioni-ElRegaloDeLosArabes.pdf)

Regards!
