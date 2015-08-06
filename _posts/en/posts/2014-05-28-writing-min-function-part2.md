---
layout: post
type: post
title:  "Writing min function, part 2: Understanding Concepts"
date:   2014-05-28 11:48:29
comments: true
tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming]
---

This is the second article of the series called *"Writing min function"*.

I want complete the *min* function and fix the mistakes mentioned in the [previous post]({% post_url en/2014-05-20-writing-min-function-part1 %}). But first, we have to understand *Concepts*, so let's review the last version of the function with its requirements.


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
- T models the concept called *TotallyOrdered*.

*"A type __models__ a concept, if the requirements expressed by the concept are __satisfied__ for this type"*

Now, let's review the formal definition of the *TotallyOrdered* concept:

$$TotallyOrdered(\texttt{T}) \triangleq \qquad \qquad\quad\texttt{line1}\\
\qquad  \texttt{Regular(T)} \qquad \qquad\qquad\texttt{ }\texttt{ line2}\\
\quad \land <\texttt{: T x T} \rightarrow \text{bool} \qquad \qquad\texttt{line3}\\
\quad \land total\_ordering(<) \qquad \qquad\texttt{ line4}$$
 
This reads as:  
(line1) A type T models the *TotallyOrdered* concept if:

- (line2) T also has to model the [*Regular*[1]](#Ref1) concept. This means that *TotallyOrdered* is defined in terms of *Regular*.
- (line3) A procedure less-than-operator (<) with the signature:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T x T -> bool,  
must exist. This is the syntactic rule that allows us to write things like:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a < b
- (line4) This is a semantic requirement, meaning that the less-than-operator procedure has to be a *Total Ordering relation*.

(**Note**: when we say *Total Ordering* we are referring to the ordering relation, the mathematical term mentioned in the previous article. 
When we say *TotallyOrdered* we are referring to the name of the Concept, like Employee is the name of a class or Sort is the name of a function. Here we can use any name we want. We will invoke this name later, in our algorithms)

So in line4 we are using *Total Ordering*, but remember, there are two kinds of *Total Ordering*.  
Do we mean *Reflexive* or *Strict Total Ordering*? Because it would be one or the other.  
Let's review the difference with examples:

- An example of *Reflexive Total Ordering* is the $$\leq$$ relation on the *Natural* numbers set, or in other words, ($$\mathbb{N}$$, $$\leq$$) is a *Reflexive Totally Ordered Set*.  
That is, for all a, b and c in $$\mathbb{N}$$, the following must hold:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Transitivity*: if a $$\leq$$ b and b $$\leq$$ c then a $$\leq$$ c  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Antisymmetry*: if a $$\leq$$ b and b $$\leq$$ a then a $$=$$ b  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Totality*: a $$\leq$$ b or b $$\leq$$ a  
($$\mathbb{N}$$, $$\geq$$) is another example of a *Reflexive Totally Ordered Set*.

- An example of *Strict Total Ordering* is the $$<$$ relation on the *Natural* numbers set, or in other words, ($$\mathbb{N}$$, $$<$$) is a *Strict Totally Ordered Set*.  
That is, for all a, b and c in $$\mathbb{N}$$, the following must hold:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Transitivity*: if a $$<$$ b and b $$<$$ c then a $$<$$ c  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Trichotomy*: only one of the following holds, a $$<$$ b, b $$<$$ a or a $$=$$ b  
($$\mathbb{N}$$, $$>$$) is another example of a *Strict Totally Ordered Set*.

---
**Exercise 1**: Prove that  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. $$\leq$$ is a Transitive relation  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. $$\leq$$ is an Antisymmetric relation  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. $$\leq$$ is a Total relation  
on $$\mathbb{N}$$
 
**Exercise 2**: Prove that  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. $$<$$ is a Transitive relation  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. $$<$$ obeys the Trichotomy law  
on $$\mathbb{N}$$

---

So, we have four options with which the *TotallyOrdered* concept could be defined: $$<$$, $$\leq$$, $$>$$, or, $$\geq$$. Whatever we choose is a right decision, but we have to choose.

---
**Exercise 3**: Do you know why any of the four options is a right choice?

---

I'm lying, actually we will not choose anything, the *TotallyOrdered* concept is defined using $$<$$, but here I will show the thinking behind the choice.

We have two choices to make:

- *Less*... vs. *Greater*...: $$<$$ or $$\leq$$ vs. $$>$$ or $$\geq$$
- *Reflexive* vs. *Strict*: $$\leq$$ or $$\geq$$ vs. $$<$$ or $$>$$

As we know, for the first one, Alex has chosen *Less*.... (see line4 of *TotallyOrdered* concept)
The rationale for his decision is simple: **Counting**!  
$$<$$ is the natural order of *Natural* numbers. Why? Usually we count in ascending order, it is the natural way of counting.

Now we have to chose between *Reflexive* ($$\leq$$) and *Strict* ($$<$$).  
Alex has chosen *Strict* ($$<$$) and his reasoning is:  
&nbsp;&nbsp;&nbsp;*"It is one character less"*, (len('<') < len('<='))  
But maybe you could think: *"This is not a good reason"*.  
The Alex’s answer is: *"We can choose either because they are equivalents!, then, you could use any decision procedure you want, such as, fewer typing"*  
Finally, another fundament: *"Mathematicians consistently use < in their books as the primary ordering, when they talk about, for example, Totally Ordered Fields they write all the axioms in terms of <"*

Summarizing, the choice is to use *LessThan* that is *Strict*, so we use $$<$$.

Well, now we understand what the *TotallyOrdered* concept means (I hope), but this post is ended and we haven't written any new code.  
You must be thinking: *"Anyone knows how to write the min function without having any knowledge about abstract algebra"*.
The Alex's answer is: *"Yes, they may know how to write it, but they implemented it incorrectly time and time again. How I know that? Because I was one of them."*

And this is mine: Remembering some mathematics doesn't do any harm.

In the next post I will write some code. Be patient!



---

## The Series

&nbsp;&nbsp;&nbsp;[Part 1: The rise of Concepts]({% post_url en/2014-05-20-writing-min-function-part1 %})  
&nbsp;&nbsp;&nbsp;[Part 2: Understanding Concepts]({% post_url en/2014-05-28-writing-min-function-part2 %})  
&nbsp;&nbsp;&nbsp;[Part 3: Weakening the ordering]({% post_url en/2014-07-15-writing-min-function-part3 %})  
&nbsp;&nbsp;&nbsp;[Part 4: Const-Correctness]({% post_url en/2014-09-24-writing-min-function-part4 %})  
&nbsp;&nbsp;&nbsp;[Part 5: Stabilizing the algorithm]({% post_url en/2014-10-05-writing-min-function-part5 %})  


---

## References

<a name="Ref1">[1]</a> *Regular* is another concept, maybe the most important one, I will cover it later, but for the moment we will ignore it. If you want to see its definition, see <http://www.elementsofprogramming.com/eop-concepts.pdf> [page 1]

