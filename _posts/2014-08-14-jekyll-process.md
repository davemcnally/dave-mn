---
layout: post
title: "My Jekyll Process"
date: August 14th, 2014
desc: "A quick run-down of my typical Jekyll process to show how I manage my projects and how Jekyll ties into the rest of my build processes without getting in the way or conflicting with anything."
slug: "jekyll_process"
keywords: "jekyll, tutorial, grunt, node, homebrew, setup, Dave McNally, davemcnally"
---

If you want to follow along and get something up and running yourself, you’ll need a couple of things first. I’m working on a Mac and the process is a little different on Windows so be sure to check instructions for your platform. So first up, you want a better way to manage your version of Ruby. It comes preinstalled on Mac but is likely not up to date and out of date versions can be quite buggy. To manage our new version of Ruby, we’ll use [RVM](http://rvm.io "RVM") so let’s grab that, along with the latest stable Ruby build:

{% highlight bash linenos %}
$ \curl -L https://get.rvm.io | bash -s stable --ruby
{% endhighlight %}

To prevent any issues further down the process, double check your bash profile config has been updated now too. It should look a little something like this:

{% highlight bash linenos %}
[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm"
{% endhighlight %}

Now, we're ready to get Jekyll itself. If you don’t have Sass either and want to use it, now is your chance. You can leave it out if you prefer to not use it or already have it. We install those with:

{% highlight bash linenos %}
$ gem install jekyll sass
{% endhighlight %}

Personally, I like [Grunt](http://gruntjs.com/ "Grunt") for managing my builds and we can use it to control our Jekyll build too and keep everything tied together in one command. To use Grunt, we need [Node](http://nodejs.org/ "Node"). You can head straight to their site and just download the installer if you must. I use [Homebrew](http://brew.sh "Homebrew") to manage packages on my machine so let's get that installed and open up our bash profile again to make sure we’re using the Homebrew versions of any packages already on our system:

{% highlight bash linenos %}
$ ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
export PATH="/usr/local/bin:$PATH"
{% endhighlight %}

Let's get Node installed and whilst at it, make sure we have a recent copy of Git on our system. If you’re not using version control at this point, consider this time to start!

{% highlight bash linenos %}
$ brew install node git
{% endhighlight %}

With Node up and running, it’s time to get grunt and start building!

{% highlight bash linenos %}
$ npm install -g grunt-cli
{% endhighlight %}

Instead of covering everything I normally use with Grunt, I’ll keep this focused on the Jekyll specifics. To tie our processes together and have Grunt manage our Jekyll build, we want [Grunt Jekyll](https://github.com/dannygarcia/grunt-jekyll "Grunt Jekyll") which is a plugin designed for exactly this purpose. Once this task is registered, we can run the Jekyll process along with everything else in one go. So things like our styles being processed and minified, scripts being minified and images optimised are all done together. Jekyll can do some of this on its own without Grunt but it’s not as robust and I like using the best tool for the job.

Now when configuring our Jekyll task, we can specify multiple configs for development, staging, deployment and anything else without needing to edit config files each time. Here’s an edited version of what your task may look like:

{% highlight javascript linenos %}
jekyll: {
    dev: {
        options: {
            src: '.',
            dest: 'build',
            config: ['_config-dev.yml']
        },
    },
    dep: {
        options: {
            src: '.',
            dest: 'build',
            config: ['_config.yml']
        }
    }
}

grunt.registerTask('build', ['jekyll:dev', [...]);
grunt.registerTask('deploy', ['jekyll:dep', [...]);
{% endhighlight %}

This way, you can set up your watch task to run your build, specifying a development config file which points to your local environment and then run your deploy task when ready to rebuild with your production URL and even deploy directly to your server.
