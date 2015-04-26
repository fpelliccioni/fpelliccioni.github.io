---
layout: post
title:  "Check the memory consumption of your language, part 1: Introduction"
date:   2014-05-20 11:48:29
comments: true
tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, efficient, efficiency, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming]
image:
  feature: typewriter_small.jpg
---

Are you a programmer? I think so.
As programmers, we write code that must satisfy certain purpose
but we do not write the code in the air. 
We write code to be executed on a machine.

An algorithm can be thought of in the abstract, without thinking of a particular machine where the algorithm is executed.
But at some point, as programmers, we will translate the algorithm to code and we will make it run on a machine.

If you are a serious programmer, surely you are interested in the efficiency of your code. If you're not, you can skip reading the rest of the article.

So, if performance is important to you, you must know your machine and you must know the internals of your programming language.

Why should I care about the details of my machine if high-level programming languages are designed to abstract from it?

I hope that after reading this article it will be clear that you should know these details.
So, let's start.

I want to write a simple program, run it using different programming languages, and then analyze memory consumption and memory layout.
Here is the program in my pseudo-language:

{% highlight cpp %}
class employee {
public:
	id: natural32
	other: natural32	
}

class test {
public:
	a: natural32 := 0x88FF7799
	employees: array<employee> := {{0xA1B2C3D4, 0x11223344}, {0x92817348, 0x96161728}, {0x61592308, 0xa8857472}}
	b: natural32 := 0x12345678
}

//program entry-point
main() {	
	tc := test{}
	//measure here!
}
{% endhighlight %}


The program consists of a main function (entry-point) in which is created an object of type "test".
The test class has three data members (or Fields, in order to use Java/C# jargons):
	- a: it is 32-bits natural number (like C/C++'s uint32_t). It is set to 88FF7799 (base16)
	- employees: it is a sequence of elements of type "employee".
	             The employees sequence is filled with three elements.
	- b: it is 32-bits natural number. It is set to 12345678 (base16)
The employee class has two data members:
	- id: it is 32-bits natural number
	- other: it is 32-bits natural number

Note: "array" is a data structure that stores elements contiguosly in memory.
	  The size of the sequence is dynamic, it is resizable.
	  Equivalents: C++ std::vector, .Net List<T>, Java ArrayList<T>		 

For example it is not necessary runtime polymorphism neither runtime type introspection (aka Reflection).
For simplicity all the data members are public.


Now, let's code in real programming languages:







This is the first in a series of articles in which I want to transmit what I learned (or what I think I learned) from the books, papers and lectures of Alexander Stepanov.

These are the lessons that Alex gives us, and I want to show them in this series:

- Specify our algorithms correctly
- Programming must be based on a solid mathematical foundation
- Designing our API's consistently
- Not always the library implementations provided by the programming languages we use are correct, even though they are designed by "experts".
- The concept of Stability
- [*Generic programming* [1]](#Ref1), of course!

And... the following lesson is mine:

- Please don't blindly accept what it is expressed on this blog. In case of doubt you should go to the source, the [Elements of Programming book [2]](#Ref2)

In this article I want to avoid using any programming language, I want to focus on the algorithms and the specifications. In subsequent articles, I will try to implement what we learned using several mainstream programming languages.

## Writing *min*

I will try to write the function *min*, that is, a function that returns the minimum of two things.

At this time you may be wondering, this guy is writing an entire blog post about a two-line function, is this serious?
The answer is yes. As Alex says: *“Simple things are beautiful”*, and believe it or not, we can learn a lot in the process of writing *min*.

The objective is to learn to correctly determine what are the *requirements* that a function must impose on types used in it.

*“It is better to design our __Components__ (algorithms and data structures) not in terms of concrete types, but in terms of requirements on types expressed as syntactic and semantic properties”*

Alex calls a collection of requirements a [*Concept*[3]](#Ref3).

Despite having no support for *Concepts* in programming languages, he has been using them for decades, not in code, but in his mind and in the documentation of the components developed by him [[4]](#Ref4).

## First Attempt

Well, let’s start writing the specification and then, the code:

Spec: Given two [objects[5]](#Ref5), a and b, return the smaller of both.


{% highlight cpp %}
//Note: Naive min function in pseudo-code (contains errors).
min(a, b) {
	if (a < b) return a
	return b
}
{% endhighlight %}


The above function is written in pseudo-code (which looks like a mix between [*C*](http://www.open-std.org/jtc1/sc22/wg14/) and [*Python*](https://www.python.org/)), it has some flaws, but we will see them later.

The most important question is… What are the requirements of *min* function must impose to the arguments a and b? That is... Which are the *Concepts*?

For some programmers, especially those advocates of duck-typing, imposing requirements to arguments may be something uninteresting. They simply use the arguments in the function body, and they hope to at least get a runtime error.

I strongly disagree!

*“Even if we do not have Concepts in the language, they should exists in our mind. You have to learn to think in terms of Concepts whichever language you use.”*

Forget for a while about programming languages, let’s see what the requirements are. The problem arises from this code snippet

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a < b

What does this mean?

Someone could say that the requirement is that arguments a and b must be compared using the less-than-operator.

But this is just a syntactic requirement, we have to go further in order to correctly specify our function. We need to include ***semantics*** in our type requirements! But... how to do it?

## Mathematics to the rescue!

What is the less-than-operator?

It is a way for comparing two objects, returning a boolean value.
Is this enough for defining *min* function?

No, and to ilustrate that, see what happened if the less-than-operator is defined this way:

{% highlight cpp %}
//Pseudo-code for less-than-operator
less_than_operator(a, b) {
	if ( is_even(system_time().seconds) ) return true
	return false
}
{% endhighlight %}

This function returns *true* if the number of seconds of the system time is even, otherwise returns *false*. With this code I want to emphasize that the less_than_operator could be defined using a random behaviour, but we need to define an specific behaviour.

Mathematically the less-than-operator is a *Relation*[[6]](#Ref6). A relation is a binary *Predicate*[[6]](#Ref6).

That is, a predicate that takes two parameters of the same type.
*“If you look of two things, is either true or false. The relation holds, or not.”*
The difference between the code above and a relation is that the relation is considered a *FunctionalProcedure*[[6]](#Ref6), that is, a function in which by replacing its inputs with equal objects results in equal output objects.

But the *relation concept* is too weak, we need a stronger concept: *Ordering*.

*“What is an ordering? What do mathematicians call ordering?*

*The only absolute rule for ordering is the requirement of __transitivity__ [[6]](#Ref6).*
*A relation is transitive if, whenever it holds between a and b, and between b and c, it holds between a and c.*
*A transitive relation is the most basic notion of ordering, but it is still too weak for our needs.”*

Let's review what kinds of Ordering Relations exist:

- ***Partial Ordering***: A *Partial Ordering* is an *ordering relation* in which not every pair of elements need to be related.  
Examples:  
    *“The canonical example of Partial Ordering is the Subset Relation”*  
    Subset are ordered, one subset could be a Subset of another subset, for example, the subset {2, 4} **Is a Subset Of** the subset   {1, 2, 3, 4}.  
    But it also happens that there are subsets which you could said nothing about, for example, given {2, 4} and {3, 5}.  
    Which one is greater? Which one includes the other?  
    It is not defined!  
We have two kinds of Partial Ordering:  
	- ***Reflexive Partial Ordering*** (or Non-Strict Partial Ordering): A relation is a Reflexive Partial Ordering if it is *transitive*, *reflexive*[[6]](#Ref6) and *antisymmetric*[[6]](#Ref6).  
	- ***Strict Partial Ordering*** (or Non-Reflexive Partial Ordering): A relation is a Strict Partial Ordering if it is *transitive* and *ireflexive*[[6]](#Ref6) (it is also *asymmetric*[[6]](#Ref6), but this axiom is implied by irreflexivity and transitivity)
- ***Total Ordering***: a *Total Ordering* is an Ordering Relation in which any pair of elements in the set of the relation are comparable under the relation.  
Total Ordering is a specialization of Partial Ordering.  
Examples:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Real numbers ordered by the less-than relation (<) (also Rational, Integers and Natural numbers)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The letters of the alphabet ordered by the natural dictionary order.  
We have two kinds of Total Ordering:
	- ***Reflexive Total Ordering*** (or Non-Strict Total Ordering): A relation is a Reflexive Total Ordering if it is transitive, antisymmetric and *total*[[6]](#Ref6). (it is also reflexive, but is implied by totally)
	- ***Strict Total Ordering***[[6]](#Ref6) (or Non-Reflexive Total Ordering): A relation is a Strict Total Ordering if it is *transitive* and obeys the *trichotomy law*, whereby for every pair of elements, exactly one of the following holds: the relation, its converse, or equality. (It is also *irreflexive*, but this axiom is implied by the trichotomy law)

(Note: There are more ordering relations, but we will see them later)

## Writing *min* using *Concepts*

Well, now we know about ordering relations, let's look at how we can use them to specify the *min* function.

But first, what should we use? Partial or Total Ordering?

*“If our relation is the Subset relation on a set, then, _min_ and _max_ of two sets doesn't make sense.”*

Then, Partial Ordering is too weak, because the relation doesn't hold for every pair of elements of the set.

We need to use Total Ordering for define the requirements of *min*, let's do it:

{% highlight cpp %}
// Requires:
//  The type of a is equal to the type of b, and it is called T,
//  and T is TotallyOrdered[6]
min(a, b) {
	if (a < b) return a
	return b
}
// Note: the implementations still has errors.
{% endhighlight %}

Note that the requirements were expressed as code comments. Later we will see what the programming languages provide us to express them as code.

Well, this is enough for a single post.

In the next articles of the series, we will:

- complete and fix the errors of the implementation of *min*
- write the *max* function
- refine the requirements of *min* and *max*
- implement them in real programming languages
- analyze the API provided by some programming languages.

Stay tuned!

 
---

## Acknowledgments

Thanks in particular to the following for their feedback to improve this article: Mario Dal Lago, Andrzej Krzemienski, Dean Michael Berris, Javier Centurión, Alejandro Santos, Ezequiel Reyno.

 

---

## The Series

&nbsp;&nbsp;&nbsp;[Part 1: The rise of Concepts]({% post_url 2014-05-20-writing-min-function-part1 %})  
&nbsp;&nbsp;&nbsp;[Part 2: Understanding Concepts]({% post_url 2014-05-28-writing-min-function-part2 %})  
&nbsp;&nbsp;&nbsp;[Part 3: Weakening the ordering]({% post_url 2014-07-15-writing-min-function-part3 %})  
&nbsp;&nbsp;&nbsp;[Part 4: Const-Correctness]({% post_url 2014-09-24-writing-min-function-part4 %})  
&nbsp;&nbsp;&nbsp;[Part 5: Stabilizing the algorithm]({% post_url 2014-10-05-writing-min-function-part5 %})  


---

## References

<a name="Ref1">[1]</a> Original definition of "Generic Programming":  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;David R. Musser and Alexander A. Stepanov: Generic Programming. ISSAC 1988, pages 13-25. <http://www.stepanovpapers.com/genprog.pdf>  
<a name="Ref2">[2]</a> Elements of Programming of Alexander Stepanov and Paul McJones:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<http://www.elementsofprogramming.com>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Buy it at Amazon](http://www.amazon.com/Elements-Programming-Alexander-A-Stepanov/dp/032163537X)  
<a name="Ref3">[3]</a> Concept definition: Stepanov and McJones [2009, page 10]  
<a name="Ref4">[4]</a> SGI's STL using Concepts in Documentation: <https://www.sgi.com/tech/stl/min.html>  
<a name="Ref5">[5]</a> Object definition:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The definition used in this article has nothing to do with an OOP-like definition of object [[7]](#Ref7).  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The definition used here is a practical definition of what an object is:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Object is a sequence of bits in memory" or  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Object is a value residing in memory"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See Stepanov and McJones [2009, page 4] for a complete definition.  
<a name="Ref6">[6]</a> [See Appendix A](#AppendixA)  
<a name="Ref7">[7]</a> Object-Oriented Software Construction (2nd Ed) by Bertrand Meyer [1997, page 1198]
 

---

## <a name="AppendixA">Appendix A: Definitions</a>

Some of the definitions presented here are based on: <http://www.elementsofprogramming.com/eop-concepts.pdf>

`$$Relation(\texttt{Op}) \triangleq \\
\qquad HomogeneousPredicate(\texttt{Op}) \\
\quad \land \texttt{ Arity(Op) = 2}$$`


`$$HomogeneousPredicate(\texttt{P}) \triangleq \\
\qquad  Predicate(\texttt{P}) \\
\quad \land HomogeneousFunction(\texttt{P})$$`


`$$Predicate(\texttt{P}) \triangleq \\
\qquad  FunctionalProcedure(\texttt{P}) \\
\quad \land \texttt{Codomain(P) = bool}$$`
 

`$$\textbf{property}\text{(R : Relation)} \\
\text{transitive : R}  \\
\quad r \mapsto (\forall a, b, c \in \texttt{Domain(R)}) (r(a, b) \land r(b, c) \Rightarrow r(a, c))$$`


`$$\textbf{property}\text{(R : Relation)} \\
\text{refexive : R}  \\
\quad r \mapsto (\forall a \in \texttt{Domain(R)}) (r(a, a))$$`


`$$\textbf{property}\text{(R : Relation)} \\
\text{antisymmetric : R}  \\
\quad r \mapsto (\forall a, b \in \texttt{Domain(R)}) (r(a, b) \land r(b, a) \Rightarrow a = b)$$`


`$$\textbf{property}\text{(R : Relation)} \\
\text{irreflexive : R}  \\
\quad r \mapsto (\forall a \in \texttt{Domain(R)}) (\lnot r(a, a))$$`


`$$\textbf{property}\text{(R : Relation)} \\
\text{asymmetric : R}  \\
\quad r \mapsto (\forall a, b \in \texttt{Domain(R)}) (r(a, b) \Rightarrow \lnot r(b, a))$$`


`$$\textbf{property}\text{(R : Relation)} \\
\text{total : R}  \\
\quad r \mapsto (\forall a, b \in \texttt{Domain(R)}) (r(a, b) \lor r(b, a))$$`


`$$\textbf{property}\text{(R : Relation)} \\
\text{total_ordering : R}  \\
\quad \text{r} \mapsto \text{transitive(r) } \land \\
\quad \text{ (} \forall \text{ a, b} \in \texttt{Domain(R)} \text{) exactly one of the following holds: r(a, b), r(b, a), or a = b}$$`

`$$TotallyOrdered(\texttt{T}) \triangleq \\
\qquad  \texttt{Regular(T)} \\
\quad \land <\texttt{: T x T} \rightarrow \text{bool} \\
\quad \land total\_ordering(<)$$`
 
For definitions of: HomogeneousFunction, FunctionalProcedure, and Regular, see <http://www.elementsofprogramming.com/eop-concepts.pdf> [page 1]
