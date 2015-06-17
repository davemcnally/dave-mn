---
layout: post
title: "Meet Finch"
date: August 15th, 2014
desc: "If you’ve ever worked with a system locally that generates absolute paths to assets, you’ve no doubt encountered the problem of images and styles not working when testing across multiple devices on the network. You could always deploy to a staging server but Finch is here so you don’t have to."
slug: "meet_finch"
keywords: "development, local, testing, deployment, clients, signoff, Dave McNally, davemcnally"
---

[![Finch]({{ site.url }}/img/post_meet_finch_01.png)](https://meetfinch.com/ "Meet Finch")

If this is the first time you’re hearing of Finch, take a look through their [documentation](https://meetfinch.com/docs "Finch Documentation") to help you get started. This is essentially what Finch does, in their own words:

> Test your local websites across multiple devices, share them with your team and get feedback from your clients through a secure, public URL.

So not only is testing during development resolved but you also have quick and easy previews for clients. No longer do you need to duplicate a local environment and migrate a database full of information! Setup could not be any simpler either.

{% highlight bash linenos %}
$ npm install --global finch
$ finch register
$ finch forward http://localhost:4000
{% endhighlight %}

That’s right, you register from the command line! Only a few months ago, that would have immediately put me off, thinking it was going to be too complicated but now, I’m more likely to sign up because of it.

When you launch Finch, you’ll see something similar to this which gives you the Public URL that you use across devices, machines and hand to anyone else to preview.

![Finch Demo]({{ site.url }}/img/post_meet_finch_03.png)

You’ll also notice there’s a link to your connection details & config and this is where you address the absolute path issues. On your settings page, you’ll see an option to rewrite HTML links. Enable this when required and Finch will rewrite your paths for a new base directory. Congratulations, all of your assets are now working remotely without changing any project files at all!

In the case that any other assets aren’t loading, check that externally-linked assets aren’t having issues over a secure connection and replace with [protocol-relative URLs](http://www.paulirish.com/2010/the-protocol-relative-url/ "Protocol-Relative URLs") instead. Also be sure to update access to any services which you need during testing too. Things like Typekit and in my case, Cloud Typography from [Hoefler & Co.](https://typography.com "Hoefler & Co."). To enable these services, you’ll want to access your dashboard and ensure you use a wildcard for the randomly-generated Finch subdomains.

![Cloud Typograpgy]({{ site.url }}/img/post_meet_finch_02.png)

Finch is currently in beta and so only the free plan is available to choose from but when released with paid plans, you’ll have the options of more monthly usage, reserving subdomains, password protection, live traffic monitoring and even custom domains too. Go check it out and wave goodbye to development testing and client preview problems!