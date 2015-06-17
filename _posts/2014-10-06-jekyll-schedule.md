---
layout: post
title: "Drafts & Scheduled Posts With Jekyll"
date: October 6th, 2014
desc: "Thinking of moving to Jekyll? One of the more important features for a lot of publishers is the ability to keep draft posts and when ready, schedule them for automatic posting on a given date. Here’s how I’m doing that with Jekyll."
slug: "jekyll_schedule"
keywords: "jekyll, tutorial, automate, drafts, schedule, lingon, launchd, Dave McNally, davemcnally"
---

<b>Update: I was having issues with launchd running the script with paths not being specific enough but after some much needed help from [Kitt Hodsden](http://twitter.com/kitt "Kitt Hodsden"), we got it working as expected and scheduled tasks now work. The script below has been updated to show path changes.</b>

I’ve never been great at keeping a writing schedule of any kind. None of my previous blogs have lasted more than a few months and I don’t intend to let this one share the same fate! With that in mind, I needed something that works around me and not the other way around. The writing urge and inspiration comes in waves for me and I wanted to take advantage of that.

The first step is to set up some structure for draft posts and although you don’t have to, I would recommend following the [official documentation](http://jekyllrb.com/docs/drafts/ "Jekyll Documentation For Drafts") guide for drafts. It’s really that simple — have yourself a _drafts directory with undated files and when you want to preview them locally, serve Jekyll with the --drafts flag. If using Grunt, you can tie this into your Jekyll plugin flags as I have:

{% highlight javascript linenos %}
jekyll: {
    draft: {
        options: {
            src: '.',
            dest: 'build',
            drafts: true,
            config: ['_config-dev.yml']
        }
    }
}
{% endhighlight %}

With no date front-matter specified in a draft, the current date will be used when serving with the --drafts flag so one is not necessary. If you already have a date in mind, you can leave one in there and that will then be used during previews. So now we have drafts working, let’s take a look at how to schedule them for publishing on a specific date.

Firstly, make sure you set the future [build option](http://jekyllrb.com/docs/configuration/#build-command-options "Jekyll Build Command Options") boolean to false — This will tell Jekyll to ignore any of your finished posts with a specified date that is ahead of the current date at the time of the build. Your posts will still be in the _posts directory but won’t be processed into their own permalink structure until the date is reached.

Now, we can work on drafts, move them to _posts when ready and have them processed when the date parameter is met. However, you may have noticed this isn’t exactly automated. It still requires you to manually build and deploy for the post to be visible by others.

There are several solutions for automating this such as cron jobs and later, [launchd](https://developer.apple.com/library/mac/documentation/Darwin/Reference/Manpages/man8/launchd.8.html "Manual page for launchd"). Having looked at these for a while and finding difficulty in getting one to work properly, I was pointed by [Matt Pennig](https://twitter.com/pennig/status/517319825237217280 "Matt Pennig on Twitter") to [Lingon](https://www.peterborgapps.com/lingon/ "Lingon") which is essentially a GUI wrapper to launchd and allows you to easily automate tasks. In this case, my build and deploy grunt tasks! I saved a simple script for Lingon to run which selects the correct directory and then runs my deploy task for Grunt — this builds my site with the live-ready config and then [deploys it to the server]({{ site.url }}/blog/deployment-rsync "Deployment With Rsync & Grunt") via Rsync:

{% highlight bash linenos %}
#!/bin/bash

source ~/.bash_profile

cd /Users/Dave/Documents/Dev/dave-mn/

/usr/local/bin/grunt deploy
{% endhighlight %}

With Lingon, you can then run the task as often as you need to. If you publish on a random schedule, you could have your script ran every day at a given hour. If you plan to keep a more organised schedule, you can then have it run at a set time on a set day each week. You get the idea. This very post is my first trial of this setup so if all goes to plan, this should be automatically built and viewable live on October 6th, 2014 — all without any manual interference!