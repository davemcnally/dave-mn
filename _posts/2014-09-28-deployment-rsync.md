---
layout: post
title: "Deployment With Rsync & Grunt"
date: September 28th, 2014
desc: "Deployment can often be a very complicated part of a process. There is a much more approachable solution though which will cover a lot of circumstances and offers much more functionality than manual deployment methods. Let’s take a look at Rsync."
slug: "deployment_rsync"
keywords: "deployment, rsync, grunt, jekyll, homebrew, tutorial, automate, Dave McNally, davemcnally"
---

If you’re anything like me (poor you), when deployment comes up and people mention the likes of [Capistrano](http://capistranorb.com/ "Capistrano"), you may just decided to stick to what you know and deploy over FTP. It’s simple. There’s a handy drag-and-drop GUI and you know where you’re at with it. It’s also horribly inefficient. Instead, you could be using [Rsync](http://rsync.samba.org/ "Rsync").

Instead of you overwriting a bunch of files on transfers or going through your entire project and manually choosing files to upload, Rsync will automatically transfer just the files that have changed, keeping your server in sync with your local environment. Much quicker. That’s not all though. Let’s automate some things, starting with installing Rsync. Installation will vary, depending on your server environment. On my CentOS droplets, I use [Yum](http://yum.baseurl.org/ "Yum") — The optional -y flag is to auto answer yes to anything that comes up during installation. SSH into your server and then install Rsync. Depending on your server environment, you may need to manually start the service or restart existing ones.

{% highlight bash linenos %}
$ yum -y install rsync xinetd
{% endhighlight %}

You’ll also want to keep your local install of Yum up to date and you can do that with [Homebrew](http://brew.sh/ "Homebrew"). Rsync comes with OSX so we’ll need to get the new version and ensure the new version is being used. Let’s get it installed locally first:

{% highlight bash linenos %}
$ brew tap homebrew/dupes
$ brew install rsync
{% endhighlight %}

To make sure we’re using the new version, either edit /private/etc/paths or your ~/.profile depending on what you’re using and put /usr/local/bin ahead of /usr/bin — you’ll need to restart your terminal after the change. As an example, here’s how it looks in my ~/.bash_profile:

{% highlight bash linenos %}
export PATH="/usr/local/bin:$PATH"
{% endhighlight %}

With installation and configuration taken care of, let’s move onto the interesting part! I use the [grunt-rsync](https://github.com/jedrichards/grunt-rsync "grunt-rsync") plugin to tie the rsync command to my build task. What this means is, my build process is run, files are minified and launch-ready then automatically sent to the server when done. Build in deploy in one quick step. Here’s an edited sample of how I’m using it with this very site, taken from my Gruntfile:

{% highlight javascript linenos %}
rsync: {
    dave: {
        options: {
            src: "build/",
            dest: "dave@123.45.67.89:/usr/share/nginx/html",
            ssh: true,
            recursive: true
        }
    }
}

grunt.registerTask('build', ['jekyll:dev', 'uglify', 'sass', 'cssmin', 'autoprefixer', 'clean:tmp']);
grunt.registerTask('deploy', ['jekyll:dep', 'uglify', 'sass', 'cssmin', 'autoprefixer', 'clean:tmp', 'rsync:dave']);
{% endhighlight %}

So I run my normal build task whilst working locally which runs [Jekyll]({{ site.url }}/blog/jekyll-process/ "Jekyll") with a development-specific config, specifying my local environment as the base and when ready to push the changes live, I run the second deploy task to run Jekyll with the deployment-ready config and then finish with the Rsync task shown above, syncing the contents of my local build directory with files on the server.

Using this method, you could also set up a staging server too. It’s simply a case of defining as many tasks as you wish and running them when ready. Automated, multi-stage deployment made simple! Hey, even I can do this stuff...






