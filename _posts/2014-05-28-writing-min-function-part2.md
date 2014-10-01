---
layout: post
title:  "Writing min function, part 2: Understanding Concepts"
date:   2014-05-28 11:48:29
comments: true
---

This is the second article of the series called *"Writing min function"*.

I want complete the *min* function and fix the mistakes mentioned in the [previous post]({% post_url 2014-05-20-writing-min-function-part1 %}). But first, we have to understand *Concepts*, so let's review the last version of the function with its requirements.


{% highlight cpp %}
// Requires:
//  The type of a is equal to the type of b, and it is called T,
//  and T is TotallyOrdered
min(a, b) {
	if (a < b) return a
	return b
}
{% endhighlight %}

Here we specify that:

- the formal parameters a and b are of the same type, and we called this type: T.
- T models the concept called TotallyOrdered.

*"A type __models__ a concept, if the requirements expressed by the concept are __satisfied__ for this type"*

So, let's review the formal definition of the TotallyOrdered concept:

`$$TotallyOrdered(\texttt{T}) \triangleq \\
\qquad  \texttt{Regular(T)} \\
\quad \land <\texttt{: T x T} \rightarrow \text{bool} \\
\quad \land total\_ordering(<)$$`
 
This reads as:

- line1: A type T models the TotallyOrdered concept if:
- line2: The type T also has to model the Regular[1] concept. This means that TotallyOrdered is defined in terms of Regular.
- line3: A procedure less-than-operator (<) with the signature: T x T -> bool, must exist. This is the syntactic rule that allows us to write things like: a < b
- line4: This is a semantic requirement, meaning that the less-than-operator procedure has to be a Total Ordering relation.

But... remember that there are two kinds of TotalOrdering.  
Do we mean Reflexive or Strict TotalOrdering? Because it would be one or the other.

Let's review the difference with examples:

- An example of Reflexive Total Ordering is the $latex \leq &s=2$ relation on the Natural numbers set, or in other words, ($latex \mathbb{N} &s=2$, $latex \leq &s=2$) is a Reflexive Totally Ordered Set.
That is, for all a, b and c in $latex \mathbb{N} &s=2$, the following must hold:
Transitivity: if a $latex \leq &s=2$ b and b $latex \leq &s=2$ c then a $latex \leq &s=2$ c
Antisymmetry: if a $latex \leq &s=2$ b and b $latex \leq &s=2$ a then a $latex = &s=2$ b
Totality: a $latex \leq &s=2$ b or b $latex \leq &s=2$ a
($latex \mathbb{N} &s=2$, $latex \geq &s=2$) is another example of a Reflexive Totally Ordered Set.

- An example of Strict Total Ordering is the $latex \textless &s=2$ relation on the Natural numbers set, or in other words, ($latex \mathbb{N} &s=2$, $latex \textless &s=2$) is a Strict Totally Ordered Set.
That is, for all a, b and c in $latex \mathbb{N} &s=2$, the following must hold:
Transitivity: if a $latex \textless &s=2$ b and b $latex \textless &s=2$ c then a $latex \textless &s=2$ c
Trichotomy: only one of the following holds, a $latex \textless &s=2$ b, b $latex \textless &s=2$ a or a $latex = &s=2$ b
($latex \mathbb{N} &s=2$, $latex > &s=2$) is another example of a Strict Totally Ordered Set.

Exercise 1: Prove that
a. $latex \leq &s=2$ is a Transitive relation
b. $latex \leq &s=2$ is an Antisymmetric relation
c. $latex \leq &s=2$ is a Total relation
on $latex \mathbb{N} &s=2$
 
Exercise 2: Prove that
a. $latex \textless &s=2$ is a Transitive relation
b. $latex \textless &s=2$ obeys the Trichotomy law
on $latex \mathbb{N} &s=2$
 
So, we have four options with which the TotallyOrdered concept could be defined: $latex \textless &s=2$, $latex \leq &s=2$, $latex > &s=2$, or, $latex \geq &s=2$. Whatever we choose is a right decision, but we have to choose.

Exercise 3: Do you know why any of the four options is a right choice?
 
I'm lying, actually we will not choose anything, the TotallyOrdered concept is defined using $latex \textless &s=2$, but here I will show the thinking behind the choice.

We have two choices to make:

Less... vs. Greater...: $latex \textless &s=2$ or $latex \leq &s=2$ vs. $latex > &s=2$ or $latex \geq &s=2$
Reflexive vs. Strict: $latex \leq &s=2$ or $latex \geq &s=2$ vs. $latex \textless &s=2$ or $latex > &s=2$
As we know, for 1, Alex has chosen Less.... The rationale for his decision is simple: Counting!
$latex \textless &s=2$ is the natural order of natural numbers. Why? Usually we count in ascending order, it is the natural way of counting.

Having chosen Less... then, we have to chose between Reflexive ($latex \leq &s=2$) and Strict ($latex \textless &s=2$).
Alex has chosen Strict ($latex \textless &s=2$) and his reasoning is: "It is one character less" (len('<') < len('<='))
But maybe you could think: "This is not a good reason".
The Alex’s answer is: "Well, we can choose either because they are equivalents!, then, you could use any decision procedure, such as, fewer typing"
Finally, another fundament: "Mathematicians consistently use $latex \textless &s=2$ in their books as the primary ordering, when they talk about, for example, Totally Ordered Fields they write all the axioms in terms of $latex \textless &s=2$"

Summarizing, the choice is to use LessThan that is Strict, so we use $latex \textless &s=2$.

Well, now we understand what we mean when we use the TotallyOrdered concept, but  this post is ended and we haven't written any new code.
You must be thinking: "Anyone knows how to write the min function without having any knowledge about abstract algebra".
The Alex's answer is: "Yes, they may know how to write it, but they implemented it incorrectly time and time again. How I know that? Because I was one of them."

And this is mine: "Remembering some mathematics doesn't do any harm"

In the next post I will write some code. Be patient :)

 

The Series

Part 1: The rise of Concepts
Part 2: Understanding Concepts
Part 3: Weakening the ordering
Part 4: Const-Correctness
References

[1] Regular is another concept, maybe the most important one, I will cover it later, but for the moment we will ignore it. If you want to see its definition, see http://www.elementsofprogramming.com/eop-concepts.pdf [page 1]

 
 
---

## Acknowledgments



---

## The Series

&nbsp;&nbsp;&nbsp;[Part 1: The rise of Concepts]({% post_url 2014-05-20-writing-min-function-part1 %})  
&nbsp;&nbsp;&nbsp;[Part 2: Understanding Concepts]({% post_url 2014-05-28-writing-min-function-part2 %})  
&nbsp;&nbsp;&nbsp;[Part 3: Weakening the ordering]({% post_url 2014-05-20-writing-min-function-part1 %})  
&nbsp;&nbsp;&nbsp;[Part 4: Const-Correctness]({% post_url 2014-05-20-writing-min-function-part1 %})  


---

## References

<a name="Ref1">[1]</a> Elements of Programming of Alexander Stepanov and Paul McJones, <http://www.elementsofprogramming.com>  
<a name="Ref2">[2]</a> Concept definition: Stepanov and McJones [2009, page 10]  
<a name="Ref3">[3]</a> SGI's STL using Concepts in Documentation: <https://www.sgi.com/tech/stl/min.html>  
<a name="Ref4">[4]</a> Object definition:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The definition used in this article has nothing to do with an OOP-like definition of object [[6]](#Ref6).  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The definition used here is a practical definition of what an object is:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Object is a sequence of bits in memory" or  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Object is a value residing in memory"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See Stepanov and McJones [2009, page 4] for a complete definition.  
<a name="Ref5">[5]</a> See Appendix A  
<a name="Ref6">[6]</a> Object-Oriented Software Construction (2nd Ed) by Bertrand Meyer [1997, page 1198]
 

---

## Appendix A: Definitions

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
