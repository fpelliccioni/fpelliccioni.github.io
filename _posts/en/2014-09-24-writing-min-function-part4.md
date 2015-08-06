---
layout: post
title:  "Writing min function, part 4: Const-Correctness"
date:   2014-09-24 12:10:00
comments: true
tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming]
---

This is the fourth article of the series called *"Writing min function"*.

I still have to solve two mistakes made in the code of the previous posts. One of them is C++ specific, and the other it is a mistake that could be made in any programming language.

Originally, I wanted to address the two mistakes in the same article, but when I started writing about the first one, the article became longer than I wanted, so I will address each mistake in separate posts.

Therefore, this article will deal with an issue that only concerns to C++ programmers, so if C++ is not of your interest, feel free to jump directly to the fifth article.

In general, I want that the algorithms written in my articles are not tied to a specific programming language, but in order to write the algorithms in a practical way, I have to do it in a real language, and C++ is my choice.  
Once the mistakes have been corrected, with the help of other people, I'll start writing the min function in other programming languages.

So, to start, I'll update the usage code example to reflect things I would like to do using the min function:

{% highlight cpp %}
void raise_salary(employee& e, float increment) {
    e.salary += increment;
}
{% endhighlight %}

The *raise_salary* function is very simple, takes a reference (non-const) to an employee and increases her salary by *increment*. I would like to use it in the following way:

{% highlight cpp %}
void usage_with_mutable_objects() {
    employee e1 {1, "John", 5'000.0f};
    employee e2 {3, "George", 4'500.0f};

    raise_salary(
        min(e1, e2, salary_comparator{}),
        500.0f
    ); //#1 Compile-time error
}
{% endhighlight %}

(*employee* and *salary_comparator* were defined in [Part 3]({% post_url en/2014-07-15-writing-min-function-part3 %}))

In #1 we get a compile-time error, but, why?  
Remember our last version of the min function:

{% highlight cpp %}
template <TotallyOrdered T>
T const& min(T const& a, T const& b) {
    if (a < b) return a;
    return b;
}

template <typename T, StrictWeakOrdering Cmp>
    requires SameType<ArgumentType<Cmp>, T>
T const& min(T const& a, T const& b, Cmp cmp) {
    if (cmp(a, b)) return a;
    return b;
}
{% endhighlight %}

(**Note**: When I refer to the min function, actually I am not referring to a single function, but to a family of functions)

It takes two constant-references to two objects (and a comparator); and returns a constant reference to one of the objects. That means that the returned reference cannot be modified, because it is returned as const.  
The *raise_salary* function tries to modify the object returned by the min function, causing the compilation-time error, because you can’t modify something declared as const.

If I manually expand (or “inliniarize”) the code of the functions min and *raise_salary* I would get something like:

{% highlight cpp %}
// manually-inliniarized code

employee e1 {1, "John", 5'000.0f};
employee e2 {3, "George", 4'500.0f};

employee const& m = e1 < e2 ? e1 : e2;
m.salary += 500.0f; //Compile-time error
{% endhighlight %}

In the last code, it is more clear that we are trying to modify something that is constant.  
The variable m is a constant-reference pointing (or rather, referencing) to e1 or to e2.  
Both e1 and e2 were not declared as constant, so they are mutable objects.  
Then,  why the min function returns a constant reference and not just an ordinary (non-const) reference?
Consider the following variation of a wrong min function:

{% highlight cpp %}
//Obs: It is not valid C++ code (ill-formed code)
template <typename T, StrictWeakOrdering Cmp>
    requires SameType<ArgumentType<Cmp>, T>
T& wrong_min(T const& a, T const& b, Cmp cmp) {
    if (cmp(a, b)) return a;
    return b;
}
{% endhighlight %}

It is not valid C++ code (or using Standard C++ terminology, it is ill-formed code), it doesn’t compiles, because we are trying to return something that is constant as non-constant. And what's up with that?  
Well, suppose that the *wrong_min* function compiles, in a fictitious programming language, then consider the following usage code:

{% highlight cpp %}
void usage_wrong_min() {
    employee const e1 {1, "John", 5'000.0f};
    employee const e2 {3, "George", 4'500.0f};
//...
{% endhighlight %}

The two employees are declared as const objects, meaning that they are immutable objects, so, they cannot be modified. Then consider the folliwing usage of the *wrong_min* function.

{% highlight cpp %}
//...
    employee& m = wrong_min(e1, e2, salary_comparator{});
//...
{% endhighlight %}

Because, *wrong_min* function returns a non-const reference, we can assign the result of the function to a non-const reference, and then we could modify the object referenced by m:

{% highlight cpp %}
//...
    m.salary += 500.0f; //#2
}
{% endhighlight %}

Remember that the *wrong_min* function is not valid, but, if it were valid, we would be in trouble, since we would be modifying an object that can not be modified, because it is constant or immutable.

You might wonder: “But… they are objects, so they reside in memory, and memory can be modified,... what is the problem with that? ”

According to the [**C++ Standard** [1]](#Ref1), *“...any attempt to modify a const object during its lifetime (3.8) results in undefined behavior.”*  
In practice, a const object could be placed by the compiler (and the operating system) in a read-only segment of memory. Any attempt to write to read-only memory causes a segmentation fault, probably causing an abnormal termination of the process (program crash).

That is the reason why C++ protects us from writing things like *wrong_min*.

Returning to the min function, then, why not remove const from everywhere?
Let's see:

{% highlight cpp %}
template <TotallyOrdered T>
T& min(T& a, T& b) {
    if (a < b) return a;
    return b;
}
{% endhighlight %}

If we wrote the min function as above, then we would have problems with the following code:

{% highlight cpp %}
int m = min(5, 7); // Compile-time error
{% endhighlight %}

The code above doesn’t compile. Why?  
In C++, the values 5 and 7 are called integer-literal, more specifically they are called decimal integer literal (base ten). Literals are something that can’t be modified, they are constants. So to accept the code above we have to return to our original min function, using const everywhere.  
But, remember, we want our min function also allows us to work with mutable objects.

So, we want a function that:

- Returns a constant-reference if any of its parameters is a constant object, or,
- Returns a non-constant-reference if both parameters are non-constant objects.

The simplest way to do it in C++ is a little verbose, but it works:

{% highlight cpp %}
template <TotallyOrdered T>
T const& min(T const& a, T const& b) {
    if (a < b) return a;
    return b;
}

template <TotallyOrdered T>
T& min(T& a, T& b) {
    if (a < b) return a;
    return b;
}
{% endhighlight %}

We have to repeat the code, the first function covers the case 1 and the second one covers the case 2. Maybe in a future version of C++ this can be done without the need for repetition of code.

So I'm going to write the full family of min functions we have so far:

{% highlight cpp %}
template <typename T, StrictWeakOrdering Cmp>
    requires SameType<ArgumentType<Cmp>, T>
T const& min(T const& a, T const& b, Cmp cmp) {
    if (cmp(a, b)) return a;
    return b;
}

template <typename T, StrictWeakOrdering Cmp>
    requires SameType<ArgumentType<Cmp>, T>
T& min(T& a, T& b, Cmp cmp) {
    if (cmp(a, b)) return a;
    return b;
}

template <TotallyOrdered T>
T const& min(T const& a, T const& b) {
    if (a < b) return a;
    return b;
}

template <TotallyOrdered T>
T& min(T& a, T& b) {
    if (a < b) return a;
    return b;
}
{% endhighlight %}

Remember that in the following article I will address the last outstanding issue. So do not take the above code as totally definitive.

And, with the code above, we can write things like the following:

{% highlight cpp %}
employee const e1 {1, "John", 5'000.0f};
employee const e2 {2, "Peter", 6'000.0f};
employee e3       {3, "George", 4'500.0f};
employee e4       {4, "Frank", 5'000.0f};

employee const& m1 = min(e1, e2, salary_comparator{});
employee const& m2 = min(e1, e3, salary_comparator{});
employee const& m3 = min(e4, e2, salary_comparator{});

min(e3, e4, salary_comparator{}).salary += 500.0f;
//or
raise_salary(
    min(e3, e4, salary_comparator{}), 500.0f
);
{% endhighlight %}

Finally, I wrote another version of the min function that looks simpler because it prevents writing the same code twice, but it uses some template-metaprogramming (TMP) hacks.

The code looks like the following:

{% highlight cpp %}
template <TotallyOrdered T, TotallyOrdered U>
    requires SameType<T, U>
HERE_SOME_MAGIC min(T&& a, U&& b) {
    if (a < b) return (HERE_SOME_MAGIC)a;
    return (HERE_SOME_MAGIC)b;
}
{% endhighlight %}

Then, I presented the code to Alex, because I wanted to know what he thought, and he answered me with the following advice:

\- Alex Stepanov: *“My standard advice: concentrate on algorithms and data structures. Do not spend time on meta-programming. If it is not in Knuth (or something like Knuth), do not do it.”* [[2]](#Ref2)

At first I did not understand the reason for his answer, but then, after spending hours focusing on details of the template-metaprogramming code, I understood that it is better to focus on real problems, which are the algorithms.

Even so, if you want to take a look at the code, write me by private and I will gladly share it (See [About page](http://componentsprogramming.com/about/)).

I didn’t want to make an article explaining Const-Correctness so long, because there are countless [books and articles on the Internet [3]](#Ref3) that explain the topic better than me. But as I tried to explain some things, I thought it was necessary to extend the explanation, which ended in this article. 


---

## The Series

&nbsp;&nbsp;&nbsp;[Part 1: The rise of Concepts]({% post_url en/2014-05-20-writing-min-function-part1 %})  
&nbsp;&nbsp;&nbsp;[Part 2: Understanding Concepts]({% post_url en/2014-05-28-writing-min-function-part2 %})  
&nbsp;&nbsp;&nbsp;[Part 3: Weakening the ordering]({% post_url en/2014-07-15-writing-min-function-part3 %})  
&nbsp;&nbsp;&nbsp;[Part 4: Const-Correctness]({% post_url en/2014-09-24-writing-min-function-part4 %})  
&nbsp;&nbsp;&nbsp;[Part 5: Stabilizing the algorithm]({% post_url en/2014-10-05-writing-min-function-part5 %})  


---

## References

<a name="Ref1">[1]</a> Latest publicly available C++ Draft Standard (n3797) (at September 2014) [dcl.type.cv] paragraph 4:  
<http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3797.pdf>

<a name="Ref2">[2]</a> Here Alex refers to [Donald Knuth](http://en.wikipedia.org/wiki/Donald_Knuth), but more specifically to his series of books, called ["The Art of Computer Programming"](http://en.wikipedia.org/wiki/The_Art_of_Computer_Programming) ([Amazon](http://www.amazon.com/Computer-Programming-Volumes-1-4A-Boxed/dp/0321751043))

<a name="Ref3">[3]</a> For better references about Const-Correctness and ROM-ability, see:

- Standard C++ FAQ about Const Correctness:  
<https://isocpp.org/wiki/faq/const-correctness>
- The "Guru of the Week" (GotW) articles about Const-Correctness (the original and the new one), from [Herb Sutter](http://en.wikipedia.org/wiki/Herb_Sutter):  
<http://www.gotw.ca/gotw/006.htm>  
<http://herbsutter.com/2013/05/24/gotw-6a-const-correctness-part-1-3/>
- Technical Report on C++ Performance, Chapter 7.1, "ROMability":  
<http://www.open-std.org/jtc1/sc22/wg21/docs/TR18015.pdf>




