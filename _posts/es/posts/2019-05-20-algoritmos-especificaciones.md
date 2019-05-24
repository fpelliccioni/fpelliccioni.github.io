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

La complejidad en tiempo de `median_3` es: 

- Caso mejor:    0 swaps, 2 comparaciones
- Caso peor:     0 swaps, 3 comparaciones
- Caso promedio: 0 swaps, 8/3 comparaciones; asumiendo una distribución uniforme de los datos de entrada.


Ahora, podríamos usar nuestro nuevo algoritmo en la función `GetSuitableBlock` original:

{% highlight cpp %}
static 
CBlockIndex const* GetSuitableBlock(CBlockIndex const* pindex) {
    assert(pindex->nHeight >= 3);
    return &median_3(*pindex->pprev->pprev, *pindex->pprev, *pindex);
}
{% endhighlight %}

Mucho más breve y entendible, ¿no?.

Antes de seguir, tenemos que corregir un problema: no sabemos si el _Ordenamiento Natural_ especificado en la clase `CBlockIndex` está dado por el timestamp del bloque (atributo `nTime`).
Necesitamos una versión de `median_3` que acepte una forma de comparar especificado por el usuario: necesitamos que acepte una _relación de preorden total estricta_ (_strick weak ordering relation_, [para más información consulte aquí](http://componentsprogramming.com/writing-min-function-part3/)).


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


Ahora sí, podemos implementar correctamente `GetSuitableBlock`, comparando por `nTime`:

{% highlight cpp %}
static 
CBlockIndex const* GetSuitableBlock(CBlockIndex const* pindex) {
    assert(pindex->nHeight >= 3);
    return &median_3(*pindex->pprev->pprev, *pindex->pprev, *pindex, [](auto const& a, auto const& b){
        return a.nTime < b.nTime;
    });
}
{% endhighlight %}

Nos queda un último problema por resolver. Hagamos una pequeña prueba del algoritmo original y del nuevo:


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

El código anterior imprime:

{% highlight cpp %}
GetSuitableBlockNewVersion: 1
GetSuitableBlock:           2
{% endhighlight %}

Lo que estamos intentando probar con el código anterior es la _estabilidad_ de ambos algoritmos.
Nuestro algoritmo *median_3* es _estable_ lo que quiere decir que el orden de los elementos equivalentes se preserva
([para más información consulte aquí](http://componentsprogramming.com/writing-min-function-part5/)).

Para demostrarlo con datos, vamos a utilizar el ejemplo anterior, en el cual tenemos los siguientes datos de entrada para nuestros algoritmos:

{% highlight cpp %}
s = [{1, 1558731500}, {2, 1558731500}, {3, 1558730000}]
{% endhighlight %}

Donde el primer elemento de cada par es el identificador del bloque `nHeight` y el segundo elemento es el timestamp `nTime`.  
Note que el `nTime` de los primeros 2 elementos es igual.

Si ordenamos la sequencia anterior por `nTime` usando un algoritmo de ordenamiento estable, como por ejemplo [Merge sort](https://en.wikipedia.org/wiki/Merge_sort) nos quedaría algo así:

{% highlight cpp %}
s = [{3, 1558730000}, {1, 1558731500}, {2, 1558731500}]
{% endhighlight %}

Note que el elemento del medio es el que tiene `nHeight = 1`. Lo cual indica que nuestro algoritmo se comportó de manera estable y no así el algoritmo original usado en el DAA de Bitcoin Cash. 

En mi primer implementación de DAA en el nodo Bitprim usé un código similar a `median_3` el cual también era estable, dado que no había verificado el código de la especificación, yo había asumido erróneamente que también era estable.  
Luego esto provocó errores en tiempo de ejecución de nuestro nodo ante un ajuste de dificultad. No se daba siempre, pero hubo un caso en particular en el que lo pudimos detectar. Luego de varias horas de debugging pude detectar que el problema era que el algoritmo usado por mí no era compatible con el "especificado" en DAA.

Por lo tanto, tuve que "corregir" mi algoritmo para hacelo no-estable de la misma forma que el de la especificación.

En realidad, si mal no recuero, en la primera versión de la especificación de DAA no se mencionaba al código de `GetSuitableBlock`, sino que decía que se calculaba la mediana de 3 elementos.

De toda esta experiencia saco algunas conclusiones sobre `GetSuitableBlock` vs. `median_3`:
- `median_3` no efectua ningún swap, `GetSuitableBlock` puede efectuar entre 0, 7/6 o 2 swaps, innecesariamente. (Eficiencia)
- `GetSuitableBlock` crea un array innecesariamente. (Eficiencia)
- `median_3` realiza 2, 8/3 o 3 comparaciones, `GetSuitableBlock` realiza siempre 3 comparaciones. (Eficiencia)
- `median_3` es estable, `GetSuitableBlock` no lo es. `median_3` es lo que cualquiera espera de un algoritmo que calcule la mediana de 3 elementos. (Correctitud)

El autor de la especificación de DAA podría haber optado por usar un algoritmo conocido y "estándar", pero no lo hizo.  
Es más, quizás lo peor de todo esto que es que la especificación hace referencia a código. **El código no debe ser nunca especificación. El código debe ser creador a partir de una especificación.** Por lo que si una especificación hace referencia a código no existe dicha especificación.

¡Saludos!
