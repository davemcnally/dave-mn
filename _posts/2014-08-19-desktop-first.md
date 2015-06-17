---
layout: post
title: "Desktop First Design"
date: August 19th, 2014
desc: "So you’re working on a new client project, you’re in charge of design and you’re starting with a blank canvas. Speaking of which, you fired up your graphics application of choice and started fresh with a width of 320 pixels. You’re doing it wrong."
slug: "desktop_first"
keywords: "design, responsive, mobile first, css, media queries, desktop first, Dave McNally, davemcnally"
---

We’ve read the books and seen the talks all advocating a mobile-first approach to our web work. The lines start to become blurred when the all important word is missing. Development. Starting your CSS for the smallest size first and working up is most definitely a great idea and there are several advantages to doing so.

Mobile users are no longer waiting to render your desktop-targeted styles before getting their tailored versions and you save on immediately loading in assets not needed for mobile too. Anything you include in your CSS before the start of any media queries is going to be processed by the browser and you’re costing the user time and money by developing any other way than mobile first. If you’re not sure what that means, you’re using min-based media queries instead of max-based and adding to your design as screen sizes increase:

{% highlight css linenos %}
@media (min-width: 720px) {
    // Styles here only applied once browser width reaches 720px
}
{% endhighlight %}

So where do the problems come in? Design. I love designing for mobile devices and I’m sure a lot of you are the same. I really enjoy the constraints and focusing on what needs to be there the most, space and connection issues considered. This is becoming all too apparent in recent designs though and our desktops are suffering the consequences of mobile-first design. We’re lacking the creativity we once had, when desktop designs were prominent.

When designing for a mobile device first, the temptation is to build that and simply blow it up and stretch things out for desktops. It’s not responsive, it’s just lazy. Our desktops are not mobile devices with larger screens and they still deserve their own care and attention to detail that our pocket browsers are getting. I am most definitely guilty of this myself and I’m only writing this as a result of noticing myself fall into this very pattern.

The solution? Desktop first design with mobile first development. It’s not quite a catchy buzzword that Twitter can start going crazy over and it’s not about to be a book title either but that’s okay. It’s more about awareness of neglecting our desktops, not gaining internet fame. We still have to be careful with this approach to ensure we don’t fall into exactly the opposite scenario of shrinking down our desktops and calling it a mobile design but focusing on our desktops first is, in my opinion (which is kind of what a blog is for), the best approach all around to avoid the web getting stale.

Don’t forget the desktop.