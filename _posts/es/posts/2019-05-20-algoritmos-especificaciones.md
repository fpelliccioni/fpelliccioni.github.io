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
En Noviembre de 2017 [Bitcoin Cash](https://www.bitcoincash.org/) hizo su primer cambio de protocolo luego de su nacimiento en Agosto del mismo año. Mi trabajo en ese momento era actualizar el código de nuestro nodo para que soporte los cambios de protocolo. Desde aquel momento que quiero escribir este artículo, pero... por alguna o varias razones no lo hice en ese momento, lo estoy haciendo ahora.

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


Lo que hace el algoritmo es básicamente crear una sequencia de 3 elementos (array), la ordena de menor a mayor y retorna el segundo elemento.

La complejidad en tiempo de este algoritmo es: 

- Caso mejor:    0 swaps,   3 comparaciones
- Caso peor:     2 swaps,   3 comparaciones
- Caso promedio: 7/6 swaps, 3 comparaciones; asumiendo una distribución uniforme de los datos de entrada.

Ahora, vuelva a observar con detenimiento el algoritmo. Se está creando un array (usando los datos de entrada), para luego ordenarlo ascendentemente y retornar el elemento del medio. Este es un algoritmo conocido y se llama [mediana](https://en.wikipedia.org/wiki/Median), en particular, _mediana de 3 elementos_.

La mediana es un algoritmo de _selección_. A diferencia de los algoritmos de ordenamiento (inplace), los algoritmos de selección no deberían mutar los datos de entrada, sino, retornar uno de ellos.

Aquí les dejo un boceto del algoritmo _mediana de 3_, en `C++`:

{% highlight cpp %}
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

O si prefiere la version _inline_ del algoritmo:

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

Dejo el análisis del código para el lector, para el vago: lo que hace el algoritmo es simplemente seleccionar el elemento del medio entre `a`, `b` y `c`, haciendo de cuenta que los 3 estuviesen ordenados ascendentemente. Esto lo hace sin mutar ni reordenar los datos de entrada.


{% highlight cpp %}
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


{% highlight cpp %}
template <Regular T>
auto median_3_ab(T const& a, T const& b, T const& c) {
    // precondition: a <= b
    
    return ! (c < b) ? b :        // a, b, c are sorted
                       max(a, c); // b is not the median
}

template <Regular T>
auto median_3(T const& a, T const& b, T const& c) {
    return b < a ? median_3_ab(b, a, c) 
                 : median_3_ab(a, b, c);
}
{% endhighlight %}










{% highlight cpp %}
/**
 * To reduce the impact of timestamp manipulation, we select the block we are
 * basing our computation on via a median of 3.
 */
static const CBlockIndex *GetSuitableBlock(const CBlockIndex *pindex) {
    assert(pindex->nHeight >= 3);
    return median_3(pindex->pprev->pprev, pindex->pprev, pindex);
}

{% endhighlight %}










{% highlight cpp %}

template <Regular T, Regular U, StrictWeakOrdering R>
    requires(Same<T, U> && Domain<R, T>)
inline constexpr
auto max(T&& a, U&& b, R r) {
    return r(b, a) ? std::forward<T>(a) : std::forward<U>(b);
}

template <TotallyOrdered T, TotallyOrdered U>
    requires(Same<T, U>)
inline constexpr
auto max(T&& a, U&& b) {
    return  b < a ? std::forward<T>(a) : std::forward<U>(b);
}

template <Regular T, Regular U, Regular V, StrictWeakOrdering R>
    requires(Same<T, U, V> && Domain<R, T>)
inline constexpr
auto median_3_ab(T&& a, U&& b, V&& c, R r) {
    // precondition: a <= b
    
    ! r(c, b) ? //!(c < b) -> c >= b
                std::forward<U>(b) :                            // a, b, c are sorted
                max(std::forward<T>(a), std::forward<V>(c), r); // b is not the median
}

template <Regular T, Regular U, Regular V, StrictWeakOrdering R>
    requires(Same<T, U, V> && Domain<R, T>)
inline constexpr
auto median_3(T&& a, U&& b, V&& c, R r) {
    r(b, a) ? median_3_ab(std::forward<U>(b), std::forward<T>(a), std::forward<V>(c), r) 
            : median_3_ab(std::forward<T>(a), std::forward<U>(b), std::forward<V>(c), r);
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
