---
layout: post
type: draft
title:  "Palindromes and more"
date:   2015-09-07 12:00:00
comments: true

category: spanish

tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming, book, fmgp, smalltalk, fortran, algol, simula, method, procedure, routine, function, history, palindromos, palindromes]
---

<script type="text/x-mathjax-config">
 MathJax.Hub.Config({
  "HTML-CSS": {
    // scale: 200
    scale: (MathJax.Hub.Browser.isChrome && MathJax.Hub.Browser.isPC ? 100 : 100)
 }});
</script>

I decided to write this article from a question I saw in [stackoverflow.com](http://stackoverflow.com)

[Here](http://stackoverflow.com/questions/4138827/check-string-for-palindrome) the link to the question.

The questioner tries to write an algorithm to identify whether a "word" is a [palindrome](https://en.wikipedia.org/wiki/Palindrome) or it is not. The algorithm is written using the [Java programming language](https://en.wikipedia.org/wiki/Java_(programming_language))

I do not want to analyze the algorithm proposed by the questioner, but I want to analyze the most voted answer algorithm. The latter has 55 votes versus 47 votes that have the accepted answer (to today's date, September 7, 2015).

[Here](http://stackoverflow.com/a/4139065/1006264) the link to the algorithm that I want to analyze.

Here the code:

{% highlight java %}
public static boolean isPalindrome(String str) {
    return str.equals(
       new StringBuilder(str)
       .reverse()
       .toString()
    );
}
{% endhighlight %}

The algorithm works correctly and the logic is very intuitive. Basically compares for *equality* the input word against its reverse.

The problem with this algorithm is that it is very inefficient compared to the optimal algorithm.

I made ​​a comment to the author of the algorithm on Stackoverflow:  "Compare the complexity of your algorithm with respect to others."  
The user [@aioobe](http://stackoverflow.com/users/276052/aioobe) replied: "I think it's the same complexity as the other solutions, no?"

He is right.  
I was not very specific in my comment. @aioobe surely assumed that I was referring to the [asymptotic computational complexity](https://en.wikipedia.org/wiki/Asymptotic_computational_complexity) and he is ok, because usually, when we say "complexity" without specifying anything else, it is assumed that we are referring to the *asymptotic computational complexity*.



### Asymptotic Computational Complexity

*Asymptotic asymptotic computational* means how the algorithms respond in time and space as the input grows.  
It is usually associated with the [O-notation](https://en.wikipedia.org/wiki/Big_O_notation) introduced by [Paul Bachmann](https://en.wikipedia.org/wiki/Paul_Gustav_Heinrich_Bachmann) in his book [Die Analytische Zahlentheorie](https://archive.org/details/dieanalytischeza00bachuoft) in 1894. [[1]](#Ref1)

This way we can measure the scalability of algorithms without relying on machine architecture, CPU speed, the programming language in which is implemented the algorithm, etc...

While it is very useful in many circumstances, this method of measurement it is not accurate, but it is **approximated**.

For more information on O-notation and asymptotic complexity, see [[2]](#Ref2).

### Concrete Computational Complexity

Another way to measure algorithms is no use approximations but concrete quantity of operations, depending on the input to the algorithm.

For example, imagine the algorithm to find the minimum (or maximum) of \\( n \\) elements. We can say that the algorithm has *lineal complexity* (in time), or the algorithm is \\( O(n) \\). But specifically, the algorithm needs \\( n - 1 \\) comparisons to find the minimum element.


### Back to Palindromes

Again, the code of the algorithm.

{% highlight java %}
public static boolean isPalindrome(String str) {
    return str.equals(
       new StringBuilder(str)
       .reverse()
       .toString()
    );
}
{% endhighlight %}

I called *Algorithm I* to the previous code. ("I" as inefficient).

We could say that *Algorithm I* is \\( O(n) \\), but, how can we guarantee it without knowing the complexity of the components in which the algorithm is based?

To do this, we must review the Java documentation. For example, consider the [String.equals()](http://docs.oracle.com/javase/8/docs/api/java/lang/String.html#equals-java.lang.Object-) function. [[3]](#Ref3)

As you may have noticed on the previous page, the Java documentation does not include the time and space complexity of algorithms and data structures.  
I consider this a failure, because it hinders us specifying the complexity of our algorithms, at least of the algorithms that are based on classes provided by Java.

To continue trying to specify the complexity of the *Algorithm I*, we have no choice, we have to review the source code of Java classes.  
Consider the [source code of String.equals()](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/String.java) (click on the link and find the equals function.)

As you can verify the code String.equals() has linear complexity in time, \\( O(n) \\).  
Specifically, String.equals() does \\( n \\) comparisons (*inequality*). (Beyond the noise imposed by Java, such as casts, instanceof, etc ...).

The space complexity of String.equals() is constant, that is, \\( O(1) \\).  
This means that it uses a constant memory beyond the input of the algorithm.


### Determining the complexity

We will determine the complexity of the *Algorithm I* analyzing each component.

[String.equals()](http://docs.oracle.com/javase/8/docs/api/java/lang/String.html#equals-java.lang.Object-). Linear time,  \\( n \\) *inequality comparisons*. Constant space.

[StringBuilder.reverse()](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/AbstractStringBuilder.java). Linear time,  \\( 2 \left\lfloor\dfrac{n}{2}\right\rfloor \\) assignments. Constant space.


[StringBuilder.toString()](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/StringBuilder.java). Linear time, \\( n \\) assignments. Linear space, \\( n \\) elements.

[StringBuilder constructor](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/StringBuilder.java). Linear time,  \\( n + 16 \\)  assignments. Linear space,  \\( n + 16 \\) elements.

So the overall complexity of *Algorithm I* is:

**Time**: In the worst case, when the word is a *palindrome*, this algorithm takes \\( n \\) *inequality* comparisons and \\( 2n + 2 \left\lfloor\dfrac{n}{2}\right\rfloor + 16 \\) assignments.  
**Space**: \\( 2n + 16 \\) elements.

As you can see, this algorithm is very inefficient, it uses a lot of memory (unnecessarily) and as discussed below, takes over \\( 8x \\) operations [optimal algorithm](#RefAlgoritmoOptimo).



### Improving the algorithm (naïve version)

Call the following code *Algorithm N* (N as naïve). *Algorithm N* presents a substantial improvement over the *Algorithm I*.

{% highlight java %}
public static boolean isPalindrome(String str) {
    int n = str.length();
    for (int i = 0; i < n; ++i) {
        if (str.charAt(i) != str.charAt(n-i-1)) return false;
    }
    return true;
}
{% endhighlight %}

**Time**: In the worst case, when the word is a *palindrome*, this algorithm takes \\( n \\) *inequality* comparisons.  
**Space**: Constant

No extra memory usage and runs approximately \\( \dfrac{1}{4} \\) of operations that the *Algorithm I*.
While the code is a bit more complex now, it is an easily understandable code, the increased complexity is negligible compared to the improvement in efficiency.


<a name="RefAlgoritmoOptimo"></a>

### Optimal Algorithm


As we can see in the picture below, there is no need to do \\( n \\) comparisons to determine whether a word is a *palindrome*.

![Optimal Algorithm]({{ site.url }}/images/OptimalAlgorithm.svg)

It is enough to do just (about) half the comparisons:

- If n is even, it performs \\( \dfrac{n}{2} \\) comparisons
- If n is odd, it performs ​​\\( \dfrac{n - 1}{2} \\) comparisons.

The following code will be called *Algorithm O* (O as optimal).

{% highlight java %}
public static boolean isPalindrome(String str) {
    int n = str.length();
    for (int i = 0; i < n/2; ++i) {
        if (str.charAt(i) != str.charAt(n-i-1)) return false;
    }
    return true;    
}
{% endhighlight %}

**Time**: In the worst case, when the word is a *palindrome*, this algorithm performs \\( \left\lfloor\dfrac{n}{2}\right\rfloor \\) *inequality* comparisons.  
**Space**: Constant

### *Algorithm I*, detailed analysis

As explained earlier, the *Algorithm I* is much more inefficient than *Algorithms N* and *Algorithms O*.  
But besides the complexity analysis, we have to consider other issues that affect the efficiency of the *Algorithm I*.

Each component used in the *Algorithm I* come with certain performance penalties that go unnoticed.  
Let us analyze in detail.

#### Construction of [StringBuilder](http://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html)
- Dynamic memory allocation of the StringBuilder object ([heap, free store](https://en.wikipedia.org/wiki/Memory_management#HEAP), or whatever you call it).
- Zero-Initialization of members of StringBuilder. [[4]](#Ref4)
- Dynamic memory allocation of the StringBuilder's internal array.  
  According to the documentation, the size of the internal array is equal to 16 characters plus the size of the original String. [[5]](#Ref5)
- Zero-Initialization of Array's members. Length and the array itself. [[4]](#Ref4)
- Copy of the bytes of the original String to the StringBuilder's internal array.

#### reverse() (StringBuilder)
- Sólo lo mencionado anteriormente. Esta función no utiliza memoria adicional y es eficiente en tiempo de ejecución.

#### toString() (StringBuilder)
- Dynamic memory allocation of the [String](http://docs.oracle.com/javase/8/docs/api/java/lang/String.html) object ([heap, free store](https://en.wikipedia.org/wiki/Memory_management#HEAP), or whatever you call it).
- Zero-Initialization of members of String. [[4]](#Ref4)
- Dynamic memory allocation of the String's internal array.
- Zero-Initialization of Array's members. Length and the array itself. [[4]](#Ref4)
- Copy of the bytes from the StringBuilder's internal array to the String's internal array.


#### equals() (String)
- Sólo lo mencionado anteriormente. Esta función no utiliza memoria adicional y es eficiente en tiempo de ejecución.

#### Garbage Collection
- The GC must release any additional memory (unnecessary) that was used and obviously this operation is not "free."

#### Data Cache Misses
- Another drawback associated with unnecessary memory consumption is the probability that our objects are too large to fit into the cache, causing [cache misses](https://en.wikipedia.org/wiki/CPU_cache#Cache_miss) impacting on runtime performance.
- Another factor that increases the probability of *cache misses* are the indirections (references, pointers) to distant memory locations.


### Memory footprint

To analyze the memory consumption of *Algorithm I*, we will use a concrete example. We will use a 9-char *palindrome*, the word is "evitative".

{% highlight java %}
isPalindrome("evitative");
{% endhighlight %}

While memory consumption of *Algorithm I* depends on the [Virtual Machine](https://en.wikipedia.org/wiki/Java_virtual_machine) and the [Runtime Environment](https://en.wikipedia.org/wiki/Java_virtual_machine#Java_Runtime_Environment_from_Oracle) that we are using, in this case we will use a specific platform that is [detailed here](#RefPlataforma).
 
Basically in our example two objects are created, one StringBuilder and one String.

#### StringBuilder:

The [StringBuilder](http://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html) objects have the following memory representation.

![Java StringBuilder memory representation]({{ site.url }}/images/JavaStringBuilderMemoryRepresentation64CompressedOopsEnabled.svg)

A StringBuilder object consists of two parts (not necessarily contiguous in memory):

- First part: usage size of the array (length() of StringBuilder) and a reference to the array where the data resides.
- Second part: array size (capacity() of StringBuilder) and the array.  
The array size is 16 characters plus the number of characters of the original String ("evitative") [[5]](#Ref5). In the picture, those 16 extra characters are shown in red, to emphasize that it is wasted memory. In Java, the characters have a size of 2 bytes. [[6]](#Ref6)  
So in our example, the array will have a size of \\( 2 \cdot (9 + 16) = 50 \\) bytes.

In Java all objects have a [*header*](http://hg.openjdk.java.net/jdk8/jdk8/hotspot/file/87ee5ee27509/src/share/vm/oops/oop.hpp) (if known any implementation that does not have it, [let me know](https://twitter.com/ferpelliccioni)) in our platform the header is 12 bytes. In other popular platforms can be 8 or 16 bytes, [see here [7]](#Ref7).

Another thing to consider is the [padding](https://en.wikipedia.org/wiki/Data_structure_alignment#Data_structure_padding), which is basically a memory space that is added to meet the [alignment](https://en.wikipedia.org/wiki/Data_structure_alignment) requirement. In our case, the objects must be placed in 8-multiples memory addresses.

In summary, our StringBuilder object has the following memory size (in bytes):

First part: \\( 24 \\)  
Second part: \\( 16 + 2n + 32 + padding \\) [[8]](#Ref8)

Total: \\( 8(\left\lceil\dfrac{n}{4}\right\rceil + 9) \\) bytes


#### String:

The [String](http://docs.oracle.com/javase/8/docs/api/java/lang/String.html) objects have the following memory representation.

![Java String memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation64CompressedOopsEnabledJdk18.svg)

A String object consists of two parts (not necessarily contiguous in memory):

- First part: reference to array (where data resides) and a [hash](http://docs.oracle.com/javase/8/docs/api/java/lang/String.html#hashCode--).
- Second part: the size of the array (length() of String) and the array.

The String object here described belongs to the [Java 8](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/String.java).
In [older versions](http://hg.openjdk.java.net/jdk6/jdk6/jdk/file/814bf0775b52/src/share/classes/java/lang/String.java) of Java, the String class had more fields, therefore memory size was bigger. [[7]](#Ref7)

In summary, our String object has the following memory size (in bytes):

First part: \\( 24 \\)  
First part: \\( 16 + 2n + padding \\) [[8]](#Ref8)

Total: \\( 8(\left\lceil\dfrac{n}{4}\right\rceil + 5) \\) bytes


#### Total memory footprint:

The total memory used by our StringBuilder and String objects is \\( 16(\left\lceil\dfrac{n}{4}\right\rceil + 7) \\) bytes.

In our example \\( n = 9 \\), so the memory used is \\( 16(\left\lceil\dfrac{9}{4}\right\rceil + 7) \\) bytes, which represent 160 bytes of extra memory, only to determine whether "evitative" is a palindrome or not.  
Remember, these 160 bytes is a totally unnecessary memory consumption.

## Benchmarks

I was doing some benchmarks where it can be seen that the *Algorithm I* is about **8.5x** slower than Algorithms *O* and *N*.

I'm leaving out some other benchmarks that show a \\( \approx 500x \\) difference against *Algorithm I*.

You can see the source code of the benchmarks in [my GitHub account](https://github.com/fpelliccioni/componentsprogramming/tree/master/palindrome/part1/java).

The explanation of the benchmarks and the code will be pending for a future article.


### *Algorithm N* versus *Algorithm O*

While previously we saw that the *Algorithm O* performs half of operations than *Algorithm N*, in the worst case; the runtime of both algorithms is affected by several factors, including: the length of the word, if the word is palindrome or not, and other factors relevant to the platform.

In many cases *Algorithm N* is faster than *Algorithm O*.

We will discuss this in a future article.

## Ultimate solution?

I believe that none of the three algorithms presented in this article represent an ultimate solution, and none of them is a [Component]({% post_url en/posts/2014-10-28-components-programming %}).

A *component* should be something that can be reused and, in many cases, the algorithms described in this article are not suitable for re-use.

In addition, the three algorithms only accept a String as input. A palindrome is not just a sequence of characters that reads the same forwards and backwards. A palindrome can be found in music, in numbers and also in nature.

I am no expert in genetics, but I know that [palindromes can be found in DNA strands](https://en.wikipedia.org/wiki/Palindromic_sequence).  
Palindromes in DNA are so important that some experts consider them to be responsible for preventing the extinction of the human race (and other species too). Without palindromes in DNA, incorrigible and irreversible genetic mutations would occur, causing the extension of the species, with the passing of generations.
In a future article we'll talk about this topic.

## Pending issues

Replicate the *Algorithm I* in [C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)) and analyze its efficiency in execution time and memory consumption.

## Conclusions

The *Algorithm I* is an excellent example of brevity and readability, it makes good use of abstractions available to achieve this goal. The problem with *Algorithm I* is that it is a terrible example of efficiency.

Abstractions facilitate our work, let us concentrate on the problem to be solved without having to think about the context, in this case the computer.

While abstractions are good, they have a big disadvantage. They make us forget how the machine works.  
Modern programmers often abuse of abstractions and they do not have knowledge about very important things that affect the behavior of our programs, such as memory, cache, load/store buffers, branch prediction, pipelines, memory models, vector instructions (SIMD), etc ...

As programmers, we must know in detail the computer, the programming language and the complexity of the components we use. Unfortunately modern programmers are just focused on things like testing, agile, metaprogramming and frameworks/libraries whose lifetime is longer than two years.

I do not want to forget to mention that the best of all abstractions was discovered by [Leibniz](https://en.wikipedia.org/wiki/Gottfried_Wilhelm_Leibniz) in 1679. That abstraction is what allows us to model the real world in a computer. That abstraction is the [**Bit**](https://en.wikipedia.org/wiki/Bit).

Finally, it is noteworthy that *Algorithm I* could be useful as a postcondition:

{% highlight java %}
public static boolean isPalindrome(String str) {
    //postcondition: Result := reverse(str) = str
    int n = str.length();
    for (int i = 0; i < n/2; ++i) {
        if (str.charAt(i) != str.charAt(n-i-1)) return false;
    }
    return true;    
}
{% endhighlight %}

---

## Acknowledgements

I want to thank Andreas Lundblad for having asked the question that made this article possible.  
Also Mario dal Lago and Javier Velilla for reviewing the article and suggest corrections.
And finally, since we can say that *we owe our lives to palindromes*, a special thank them. :)

---

## Notes

Byte = 8-bits.  
There are architectures where 1 byte is not necessarily equivalent to 8 bits. These architectures are unusual today.
There is no standard that specifies the size of a byte, but can say that the *de facto* standard is that 1 byte = 8 bits, is most common in modern computer architectures.


<a name="RefPlataforma"></a> 

#### Platform used for the analysis in this article:

- CPU
  - [Intel Core i7-4700MQ](http://ark.intel.com/products/75117) CPU @ 2.40GHz, [Haswell](https://en.wikipedia.org/wiki/Haswell_(microarchitecture))
  - 4 Cores, 8 Threads
  - L1 Data Cache Size  4 x 32 KBytes
  - L1 Instructions Cache Size  4 x 32 KBytes
  - L2 Unified Cache Size 4 x 256 KBytes
  - L3 Unified Cache Size 6144 KBytes
- RAM: 8192 MBytes, DDR3
- Operating System: Windows 10 Home 64-bit
- Java
    - Version 1.8.0_60  
    - Java(TM) SE Runtime Environment (build 1.8.0_60-b27)  
    - 64-bit [HotSpot VM](https://en.wikipedia.org/wiki/HotSpot).  
    - [Compressed Oops](http://docs.oracle.com/javase/7/docs/technotes/guides/vm/performance-enhancements-7.html#compressedOop) activado  
    - [Objects alignment](https://en.wikipedia.org/wiki/Data_structure_alignment): 8 bytes.

For analysis on other platforms, please [refer to [7]](#Ref7).

## References

<a name="Ref1">[1]</a> Zahlen means "Numbers" in German. Hence the set of integers is identified with the letter \\( \mathbb{Z} \\).

<a name="Ref2">[2]</a> The Art of Computer Programming Volume 1, by Donald E. Knuth [3rd Edition, page 107].

<a name="Ref3">[3]</a> Why I call String.equals() "function" and no "method"?. [Here is the answer]({% post_url es/posts/2015-08-12-usando-la-terminologia-adecuada-metodo %}).

<a name="Ref4">[4]</a> In Java the integral data types and arrays of integral data types are initialized to 0, guaranteed by the language specification. [4.12.5 Initial Values of Variables](https://docs.oracle.com/javase/specs/jls/se8/html/jls-4.html#jls-4.12.5)

<a name="Ref5">[5]</a> [Java String class](http://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html#StringBuilder-java.lang.String-)

<a name="Ref6">[6]</a> [Java Primitive Data Types](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html)

<a name="Ref7">[7]</a> [Analysis of memory consumption on other platforms]({% post_url es/posts/2015-08-26-palindromos-otras-plataformas %}). 

<a name="Ref8">[8]</a> The formulas for calculating the [padding](https://en.wikipedia.org/wiki/Data_structure_alignment#Data_structure_padding) of the internal arrays of StringBuilder and String (in bytes):  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;StringBuilder internal array padding = \\( 8\left\lceil\dfrac{2n + 48}{8}\right\rceil - (2n + 48) \\)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String internal array padding  = \\( 8\left\lceil\dfrac{2n + 16}{8}\right\rceil - (2n + 16) \\)  

(Estas fórmulas son específicas para la plataforma descripta en el artículo)

The general formula for the padding of objects is:

$$ alignment\left\lceil\dfrac{size}{alignment}\right\rceil - size $$
