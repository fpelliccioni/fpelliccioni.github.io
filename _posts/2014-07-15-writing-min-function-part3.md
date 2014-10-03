---
layout: post
title:  "Writing min function, part 3: Weakening the ordering"
date:   2014-07-15 08:39:29
comments: true
---

This is the third article of the series called *"Writing min function"*.

Now we understand what **Concepts** are (do we?), I will try to complete the min function.

What do I mean with "complete"?

Well, we need to see how to use our min function, for that purpose I want to use a real programming language.  
So in this article I will write code in [C++](http://www.open-std.org/jtc1/sc22/wg21/). Why C++?, it is a topic for another article.  
But, don't worry if you're not a C++ programmer, the code will be easy to understand, and, the ideas that I want to talk here are very important for programming algorithms, beyond the programming language.  
Later on, I will try to write the same code (and analyze it) using another programming languages.

This is the C++ equivalent of the min function code from [Part 2]({% post_url 2014-05-28-writing-min-function-part2 %}):

{% highlight cpp %}
//Note 1: this code is Concept-enabled C++.
//Note 2: Still has errors!
template <TotallyOrdered T>
T const& min(T const& a, T const& b) {
    if (a < b) return a;
    return b;
}
{% endhighlight %}
(We will see how to **define** the *TotallyOrdered* concept in C++ later. For now, think in the mathematical definition presented [before]({% post_url 2014-05-20-writing-min-function-part1 %})  )

And we use it in this way:

{% highlight cpp %}
void usage_with_builtin_types_simple() {
    int a = 12;
    int b = 34;

    //using variables
    cout << min(a, b); //print the result on standard output

    //using integer-literals (base10)
    cout << min(1, 2);

    //using variables and literals
    cout << min(a, 2);

    //assigning the result (copy)
    int m1 = min(a, b);
    int m2 = min(1, 2);
}
{% endhighlight %}
These are very simple examples using the int builtin type, but our min function is supposed to be Generic, so it has to operate with all types that satisfy the TotallyOrdered concept. So let’s see a little more complicated example.

Suppose we maintain the employee database of a company and we want to take two employees and know which is the minimum of the two. Let's see it on code. Here a simplified Employee class written in C++:

{% highlight cpp %}
struct employee { string name; float salary; };
{% endhighlight %}
And now we use the min function with Employees:

{% highlight cpp %}
void usage_with_employees() {
    employee e1 {"John", 5000.0f};
    employee e2 {"Peter", 6000.0f};
    employee e3 {"George", 4500.0f};
    employee e4 {"Frank", 5000.0f};

    employee m = min(e1, e2); // ???
}
{% endhighlight %}
What happend at line 7?

Well, we should get a compile-time error saying that the employee type doesn't satisfy the TotallyOrdered concept.

Why?

First, syntactically there is no way of comparing two employees using the less-than-operator required by the TotallyOrdered concept.
If we use C++ templates without Concepts (or duck-typing templates) we will get a compile-time error pointing to the min function, saying that a < b could not be done. Instead, if we use a dynamic duck-typing language, like Python, we will get a similar error but at runtime.
The compiler (or interpreter) doesn't know how to do a < b for employees, so this is the reason why we get the error.

So, how to make my Employee type to satisfy the TotallyOrdered concept?

Let's start satisfying the requirements imposed by the concept:

Employee must satisfy the Regular concept.
We have to provide an operator< with the signature: Employee x Employee -> bool
The operator< must be a total ordering relation.
For now I want to skip the points 1 and 3, we will see them in another article. So let's concentrate on point 2, which is a syntactic requirement, that specify that we have to provide the operator<, so let's do it:

{% highlight cpp %}
bool operator<(employee const& a, employee const& b) {
    return ???????;
}
{% endhighlight %}
This is the canonical way on C++ for implementing a less-than-operator, but ... What should I put on line 2?

Actually, I don't know. That answer should be given by the designer of the Employee class. Well..., that's me (?).

First, remember, total ordering, is, roughly speaking, some kind of Natural Ordering. So we need to know what is the natural ordering of Employees.
Maybe the natural ordering of employees is by name, maybe by salary, ... I don't know. This depends on the domain of the application. In a company, I think, employees have a unique identification number, maybe that is a good candidate to implement total ordering. So, let's modify our Employee class:

{% highlight cpp %}
struct employee { int id; string name; float salary; };
{% endhighlight %}
Now, let's finalize our less-than-operator:

{% highlight cpp %}
bool operator<(employee const& a, employee const& b) {
    return a.id < b.id;
}
{% endhighlight %}
Now, we have an Employee class with a natural ordering, by id, that satisfies the TotallyOrdered concept (remember, we are ignoring the points 1 and 3).

But, what if we want to know who is the lowest paid employee, and then raise his salary. Should we modify the less-than-operator to compare by salary?

{% highlight cpp %}
bool operator<(employee const& a, employee const& b) {
    return a.salary < b.salary;
}
{% endhighlight %}
Is it OK?
No, we are imposing a default un-natural ordering to employee’s, it is not the right way to do it.

Changing the Employee’s natural ordering is not an option, so, we need another min function, one that takes a relation as parameter.
Let’s do it in the old-unconstrained-way (wrong way?), that is, without Concepts:

{% highlight cpp %}
//Note: It compiles, but is incorrect, still, be patient!
template <typename T, typename Comparator>
T const& min(T const& a, T const& b, Comparator cmp) {
    if (cmp(a, b)) return a;
    return b;
}
{% endhighlight %}
Now we can write code like the following:

{% highlight cpp %}
struct salary_comparator {
    bool operator()(employee const& a, employee const& b) const {
        return a.salary < b.salary;
    }
};

void usage_with_employees() {
    employee e1 {1, "John", 5000.0f};
    employee e2 {2, "Peter", 6000.0f};
    employee e3 {3, "George", 4500.0f};
    employee e4 {4, "Frank", 5000.0f};

    // using natural employee ordering (by id)
    employee m = min(e1, e2);

    // using another (unnatural) ordering
    employee m2 = min(e1, e2, salary_comparator{});

    // using another (unnatural) ordering, with lambdas   
    employee m3 = min(e1, e2, [](employee const& a, employee const& b){
              return a.name < b.name; } );
}
{% endhighlight %}
But so far, I have not mentioned anything that an experienced programmer does not know, the use of predicates (comparators) is a common thing in practically all programming languages.
What most programmers (and existing implementations) forget is to specify the semantics of the predicate.

So, what are the semantic requirements?
What is Comparator?

Comparator is a Relation, that is, a binary Predicate. What kind of relation?
It is an ordering. What kind of ordering?
Is it a total ordering relation? Well, let’s check it:

Remember, a Relation r is a Strict Total Ordering if: For all a, b and c in the domain of the r, the following must hold:
Transitivity: if r(a, b) and r(b, c) then r(a, c)
Trichotomy: only one of the following holds, r(a, b), r(b, a) or a = b
 
It's easy to prove that the transitivity axiom holds so I will skip it; but, what about trichotomy? Let’s prove it with an example. Given our previous defined employees:

{% highlight cpp %}
employee e1 { 1, "John", 5000.0f };
employee e2 { 2, "Peter", 6000.0f };
employee e3 { 3, "George", 4500.0f };
employee e4 { 4, "Frank", 5000.0f };
{% endhighlight %}
And our salary_comparator, here called r in order to abbreviate it:

Take e1 and e2: According to trichotomy: only one of the following holds, r(e1, e2), r(e2, e1) or e1 = e2
What is the result of r(e1, e2)? r(e1, e2) means e1.salary < e2.salary, which means: 5000 < 6000, so it holds. The other two propositions are false (intentionally omitted), so trichotomy holds in that case.
Take e1 and e3: Following the same analysis,  r(e1, e3) means e1.salary < e3.salary, which means: 5000 < 4500, so it doesn't hold. But r(e3, e1) means ... 4500 < 5000 which is true, and the last proposition is false (again, intentionally omitted), so trichotomy holds.
Now, take e1 and e4: Following the same analysis, r(e1, e4) and r(e4, e1) are both false, so, the proposition e1 = e4 have to be true if we want trichotomy holds.
Is e1 = e4 true?
No! because e1 is not equal to e4, they are differents employees, they are not the same.
Then, the trichotomy axiom does not hold, that is, the salary_comparator relation is not a Total Ordering on the Employee Set. This means that Total Ordering is too restrictive.

So, what kind of ordering relation should be our Comparator?

Partial Ordering? No, we saw in Part1 that Partial Ordering is too weak to define min.
We need something in between Partial and Total Ordering: what we need is called Weak Ordering[1].

Roughly speaking, weak ordering says that if r(a, b) and r(b, a) are false, then, a and b are equivalents.

So, let’s modify the min function to introduce weak ordering:

{% highlight cpp %}
//Note: yes! you guess it, it is incorrect, still!
template <typename T, StrictWeakOrdering Cmp>
   requires SameType<ArgumentType<Cmp>, T>
T const& min(T const& a, T const& b, Cmp cmp) {
    if (cmp(a, b)) return a;
    return b;
}
{% endhighlight %}
The code above means that we have a function called min, that takes two formal parameters, a and b, both of the same type, called T.
The funcion has a third formal parameter, cmp, that models the concept called StrictWeakOrdering. The "requires" clause means that T (the type of a and b) and the argument type of the Comparator (Cmp) must be the same.

Well, in this article I explained what Weak Ordering means and why it is important, I want to end it with a quote from Alex:
"Mathematicians are happy with Total and Partial ordering. But most of them don't know what is Weak Ordering. It is not a common term in mathematics but it is essential in computer science, because when we want to order things, we want to order by something. For example by social security number, by name, by age".

In the next article, finally, I will tell you what are the mistakes that remain to be addressed.

You can get the complete source code on my Github repository.



--------------------------------------------


---
**Exercise 1**: Prove that  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. $$\leq$$ is a Transitive relation  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. $$\leq$$ is an Antisymmetric relation  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. $$\leq$$ is a Total relation  
on $$\mathbb{N}$$







This is the second article of the series called *"Writing min function"*.

I want complete the *min* function and fix the mistakes mentioned in the [previous post]({% post_url 2014-05-20-writing-min-function-part1 %}). But first, we have to understand *Concepts*, so let's review the last version of the function with its requirements.


{% highlight cpp %}
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

&nbsp;&nbsp;&nbsp;[Part 1: The rise of Concepts]({% post_url 2014-05-20-writing-min-function-part1 %})  
&nbsp;&nbsp;&nbsp;[Part 2: Understanding Concepts]({% post_url 2014-05-28-writing-min-function-part2 %})  
&nbsp;&nbsp;&nbsp;[Part 3: Weakening the ordering]({% post_url 2014-07-15-writing-min-function-part3 %})  
&nbsp;&nbsp;&nbsp;[Part 4: Const-Correctness]({% post_url 2014-05-20-writing-min-function-part1 %})  


---

## References

<a name="Ref1">[1]</a>  For a formal definition of *Weak Ordering* see:  
<http://www.elementsofprogramming.com/eop-concepts.pdf>



<a name="Ref1">[1]</a>  For a formal definition of *Weak Ordering* see:  
<http://www.elementsofprogramming.com/eop-concepts.pdf>

