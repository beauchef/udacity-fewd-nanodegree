# Website Performance Optimization portfolio project

## Introduction

### Pre-requisites

In order to test this web site, here are some pre-requesites:

* [NodeJS and npm](https://nodejs.org/)
* A simple HTTP server (Like the one in Python, or the [http-server Node plug-in](https://www.npmjs.com/package/http-server))
* [ngrok](https://ngrok.com/) to expose the web site on the Internet (to be able to test it!)

### Project organization

There are 3 folders in this project:

* ``src`` contains the development code. (some optimization are already done inside the code)
* ``build`` is a folder where some temporary work is being done by the Grunt build.
* ``dist`` contains the optimized version of the site, as produced by Grunt. (the Grunt build gets the web site poduction-ready by minifying HTML, CSS, and JavaScript files)

### How to generate the distribution

Start by doing a ``npm install`` in the P4 root folder, and then simply run  ``grunt``.

  ```bash
  $ cd /path-to/my-project-folder/P4_website_optimization
  $ npm install
  $ grunt
  ```

## Part 1: Optimize PageSpeed Insights score for index.html

### What was done

TODO

### How to test it

The Grunt build will display the results using the ``grunt-pagespeed`` plug-in.
Sadly, for some unknown reason, the results are not the same as the results obtained when running the tests manually.
So here are the steps to follow, to test the web page manually:

* After running the grunt build, start a local web server
  * With Python 2: ``python -m SimpleHTTPServer 8080``
  * With Python 3: ``python -m http.server 8080``
  * The http-server Node plug-in: ``http-server -p 8080``
* Once the HTTP server is running, launch ngrok: ``ngrok http 8080``
* With the web page now available online through the link given by ngrok, go on [Google's PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) web site.
* Paste the link to website there, and look at the results!

## Part 2: Optimize Frames per Second in pizza.html

### What was done

* Moved ``document.body.scrollTop`` outside the for loop
* Eliminated the ``determineDx`` function, and changed the size of pizzas using ``%`` (percentage) instead of ``px`` (pixels)
* Moved the ``querySelector`` and ``querySelectorAll`` invocations outside of for loops, but also outside of functions as much as possible
* Added ``requestAnimationFrame`` on ``updatePositions`` function
* Splitted some functions for clarity
* Added comments for clarity

### How to test it

In the Chrome Dev Tools "Customize and control DevTools" options menu (Kebab menu icon on the top right corner of the DevTools), select "More Tools > Rendering Settings". Inside the "Rendering" option screen, select "Show FPS meter".

Now when scrolling on the Pizza page, Chrome should be able to handle 60 FPS.

## Possible improvements

My Grunt process is long and not very elegant, I know. The way I am using the ``grunt-replace`` plug-in seems odd.
Here are some things I should I could have done:

* Use Bower
* Integrate ``grunt-uncss`` in the build process
* Integrate ``grunt-responsive-images`` in the build process
* Clean-up the Grunt file

That will be for another day!
