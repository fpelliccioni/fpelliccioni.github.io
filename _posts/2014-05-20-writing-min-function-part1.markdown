---
layout: post
title:  "Writing min function, part 1: The rise of Concepts"
date:   2014-05-20 11:48:29
<!---
categories: jekyll update
-->
---
This is the first in a series of articles in which I want to transmit what I learned (or what I think I learned) from the books, papers and lectures of Alexander Stepanov.

These are the lessons that Alex gives us, and I want to show them in this series:

`$$a^2 + b^2 = c^2$$`

- Specify our algorithms correctly
- Programming must be based on a solid mathematical foundation
- Designing our API’s consistently
- Not always the library implementations provided by the programming languages we use are correct, even though they are designed by “experts”.
- The concept of Stability
- Generic programming, of course!
- And… the following lesson is mine:

`$$a^2 + b^2 = c^2$$`

Here is an example MathJax inline rendering \\( 1/x^{2} \\), and here is a block rendering: 
\\[ \frac{1}{n^{2}} \\]



{% highlight cpp %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}


Here is an example MathJax inline rendering \\( 1/x^{2} \\), and here is a block rendering: 
\\[ \frac{1}{n^{2}} \\]

`$$a^2 + b^2 = c^2$$`



You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve --watch`, which launches a web server and auto-regenerates your site when a file is updated.


`$$
\begin{align}
    f(n) :=& 2n \\
    g(n) :=& 2^n \\
    h(n) :=& 2^{2^n}
\end{align}
$$`

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll’s dedicated Help repository][jekyll-help].

[jekyll]:      http://jekyllrb.com
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-help]: https://github.com/jekyll/jekyll-help
