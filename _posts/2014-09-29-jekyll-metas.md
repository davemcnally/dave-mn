---
layout: post
title: "Custom Meta Info With Jekyll"
date: September 29th, 2014
desc: "Setting your meta keywords and descriptions will have an impact not only on your search engine rankings but on the ability of people being able to find your content. Let’s take a look at how we can help them with Jekyll."
slug: "jekyll_metas"
keywords: "jekyll, meta, keywords, description, seo, tutorial, automate, Dave McNally, davemcnally"
---

I’ve never been a big fan of “SEO” in the traditional sense. I’m not about to buy your services to get me onto “the front page of Google”. I am, however, a fan of semantic code and relying on content. Having a meta description and some keywords is going to help people find your content. The problem is, setting this manually won’t be the optimal reflection of each page on your site.

Wouldn’t it be nice if we could tailor our meta tags to the page being looked it? Enter Jekyll and some simple [Liquid](http://liquidmarkup.org/ "Liquid") logic. Using the YAML front matter in our posts and/pages, we can specify custom keywords and descriptions that are tied to that page:


{% highlight text linenos %}
{% raw %}
---
layout: post
title: "Custom Meta Info With Jekyll"
date: September 29th, 2014
desc: "Setting your meta keywords and descriptions will have an impact not only on your search engine rankings but on the ability of people being able to find your content. Let’s take a look at how we can help them with Jekyll."
slug: "jekyll_metas"
keywords: "jekyll, meta, keywords, description, seo, tutorial, automate, Dave McNally, davemcnally"
---
{% endraw %}
{% endhighlight %}

I was already making use of a custom description on the [homepage]({{ site.url }} "Go To My Homepage") to show post excerpts so just had to add a new entry for keywords. These are now accessible throughout your site, to call where needed. We want them within our head element but only under certain conditions. For example, we won’t want a custom post description to be our meta description around the rest of the site — we want a custom solution that allows for a fallback when custom parameters aren’t set. This was my solution:

{% highlight html linenos %}
{% raw %}
{% if page.desc %}
<meta name="description" content="{{ page.desc }}" />
{% else %}
<meta name="description" content="I’m a freelance designer and front-end developer with a passion for details and clean interfaces." />
{% endif %}

{% if page.keywords %}
<meta name="keywords" content="{{ page.keywords }}" />
{% else %}
<meta name="keywords" content="freelance, designer, wirral, web design, development, UI designer, freelance developer, jekyll, grunt, sass, front-end developer, Dave McNally, davemcnally, freelance designer wirral, freelance designer, tileable, tileables, photoshop, patterns, textures" />
{% endif %}
{% endraw %}
{% endhighlight %}

This checks for custom front matter descriptions and keywords and when available, those are used. When not set, a global fallback is used to cover other pages. You could be even more specific with this too and have some custom keywords for individual pages as well as posts — that may be overkill for most cases but it’s certainly possible. Go forth and call yourself an SEO expert or ninja or guru or whatever it is they call themselves these days.
