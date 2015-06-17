# Dave.mn

> A responsive, Jekyll powered portfolio and blog.

This is the code behind my simple portfolio/blog. I’m sharing it here for anybody who is new to Jekyll or wants to explore it further and see how my site is actually built.

You are more than welcome to learn from this code and adapt it for your own projects but that’s where the limitation ends — the code is provided for educational purposes but the site design and style is not. Please respect that when considering cloning/forking this to make something of your own.

## Installation

You’ll need [npm](https://npmjs.com), [Grunt](http://gruntjs.com/) and obviously [Jekyll](http://jekyllrb.com/) first. I personally use [Sass](http://sass-lang.com/install) so if you’d like to use that too, you’ll also want to install that; if not, remember to remove the Sass Grunt plugin from your `package.json` file before installing dependencies with:

```
npm install
```

## Development

During development, run `grunt connect` to get a local server up and running, configuring the task as you need in your `Gruntfile.js` then `grunt watch` to keep your build updated upon saving, and live-reload your browser too (browser plugin required).

We then have a couple of tasks registered for convenience. You can run `grunt build` to build your site using your local development config file — perfect whilst working on the design locally. There’s `grunt drafts` which runs Jekyll with a drafts flag enabled so you can preview draft posts.

## Deployment

When you're ready to send your site to a server, `grunt deploy` will build your site using a deployment-ready config file to ensure paths are correct on server and when configured, it will Rsync your files over for you — automatic deployment upon build. In order for this to work whilst keeping any sensitive information private, I’m using `dotenv` to process information stored outside of this repository. For your own use, you should create a `.env` file in your project root directory and fill in a name/value combination to process as your deployment destination. As I'm using `dest: process.env.SYNC_ADDRESS` in my Rsync task options, I have the following format in my `.env` file:

```
SYNC_ADDRESS="user@123.45.67.89:/path/to/server/directory"
``` 

Finally, running `grunt` on it’s own as a default task will perform the deploy task too, after running image optimisation — this is a separated task as it’s not something that needs to be run on each deployment.