/**

 Website optimization:
 --------------------

 The original code is inside the 'src' folder. It was modified slightly to make a few adjustments.
 Like the use of 'async' on some scripts, and the loading of CSS delayed using JavaScript.
 The 'build' folder is a temporary folder for processing some items.
 The 'dist' folder is final distribution of the we site, and this is where the web server should be launched.

 Running grunt:

 "grunt"             alone will create the distribution of the site in the 'dist' folder
 "grunt cleandist"   removes the content from the 'dist' folder
 "grunt minimize"    minimizes all the content it can (HTML, CSS, etc.)
 "grunt copyfiles"   copies certain files to the 'dist' folder in order to finish
                     the packaging of the final distribution of the site


 Then you can use Python's simple HTTP server:

   $ python -m SimpleHTTPServer 8080

 Or with Python 3:

   $ python -m http.server 8080


  Once the server is running, simply launch ngrok:

    $ ngrok http 8080


  And the web page will be available for testing at:  https://developers.google.com/speed/pagespeed/insights/
  The site will also be automatically tested by the build using PageSpeed Insights.

 Note:  I achieved some results of 95 on mobile and 92 on desktop using PageSpeed Insights directly on Google site.
        Surprisingly, I was able to have 98 on mobile and 98 (sometimes even 100!?) on desktop inside the build.

 */

'use strict'

var ngrok = require('ngrok');

module.exports = function(grunt) {

    grunt.initConfig({

        /**
         * I tried using the responsive images plug-in, but I was never able
         * to achieve the same level of compression as Google was able to obtain.
         * So I left the following for reference, but it is not used.
         */
        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [
                        {
                            name: 'icon',
                            width: 100,
                            suffix: "",
                            quality: 30
                        }, {
                            name: 'small',
                            width: 400,
                            suffix: "",
                            quality: 30
                        }, {
                            name: 'medium',
                            width: 800,
                            suffix: "",
                            quality: 30
                        }, {
                            name: 'big',
                            width: 1600,
                            suffix: "",
                            quality: 30
                        }, {
                            name: 'compressed',
                            width: '100%',
                            suffix: "",
                            quality: 30
                        }
                    ]
                },

                files: [
                    {
                        expand: true,
                        cwd: 'src/img/',
                        src: ['*.{gif,jpg,png}'],
                        dest: 'dist/img/'
                    },
                    {
                        expand: true,
                        cwd: 'src/views/images/',
                        src: ['*.{gif,jpg,png}'],
                        dest: 'dist/views/images/'
                    }
                ]
            }
        },

        /**
         * Clear out the 'dist' folder
         */
        clean: {
            default: {
                src: ['dist']
            },
            build: {
                src: ['build/*', '!build/.gitkeep']
            }
        },

        /**
         * Generate the 'dist' folder
         */
        mkdir: {
            default: {
                options: {
                    create: ['dist']
                }
            }
        },

        /**
         * Copy the directory structure from the 'src' folder
         */
        copy: {
            diststruct: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**'],
                        dest: 'dist',
                        filter: 'isDirectory'
                    }
                ]
            },
            html: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['p*.html'],
                        dest: 'dist/'
                    }
                ]
            },
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/views/css/',
                        src: ['*.css'],
                        dest: 'dist/views/css/'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/img/',
                        src: ['*.png', '*.jpg'],
                        dest: 'dist/img/'
                    },
                    {
                        expand: true,
                        cwd: 'src/views/images/',
                        src: ['*.png', '*.jpg'],
                        dest: 'dist/views/images/'
                    }
                ]
            },
            javascript: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js/',
                        src: ['*.js'],
                        dest: 'dist/js/'
                    },
                    {
                        expand: true,
                        cwd: 'src/views/js/',
                        src: ['*.js'],
                        dest: 'dist/views/js/'
                    }
                ]
            }
        },

        /**
         * Minify CSS
         */
        cssmin: {
            target: {
                files: [
                    {
                        'dist/css/style.min.css': ['src/css/style.css']
                    },
                    {
                        'dist/views/css/style.min.css': ['src/views/css/style.css']
                    }
                ]
            }
        },

        /**
         * Minify HTML files
         */
        htmlmin: {
            dev: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {
                        'build/index.html': 'src/index.html'
                    },
                    {
                        'build/project-2048.html': 'src/project-2048.html'
                    },
                    {
                        'build/project-mobile.html': 'src/project-mobile.html'
                    },
                    {
                        'build/project-webperf.html': 'src/project-webperf.html'
                    },
                    {
                        'build/pizza.html': 'src/views/pizza.html'
                    }
                ]
            }
        },

        /**
         * Minify JavaScript
         */
        uglify: {
            options: {
                mangle: true
            },
            default: {
                files: [
                    {
                        'dist/js/perfmatters.min.js': ['src/js/perfmatters.js']
                    },
                    {
                        'dist/views/js/main.min.js': ['src/views/js/main.js']
                    }
                ]
            }
        },

        /**
         * Replace a few references to use new compressed content
         */
        replace: {
            default: {
                options: {
                    patterns: [
                        {
                            match: /style.css/g,
                            replacement: function () {
                                return 'style.min.css';
                            }
                        },
                        {
                            match: /profilepic.jpg/g,
                            replacement: function () {
                                return 'profilepic-compressed.jpg';
                            }
                        },
                        {
                            match: /mobilewebdev.jpg/g,
                            replacement: function () {
                                return 'mobilewebdev-compressed.jpg';
                            }
                        },
                        {
                            match: /cam_be_like.jpg/g,
                            replacement: function () {
                                return 'cam_be_like-compressed.jpg';
                            }
                        },
                        {
                            match: /2048.png/g,
                            replacement: function () {
                                return '2048-compressed.png';
                            }
                        },
                        {
                            match: /pizzeria.jpg/g,
                            replacement: function () {
                                return 'pizzeria-icon.jpg';
                            }
                        },
                        {
                            match: /perfmatters.js/g,
                            replacement: function () {
                                return 'perfmatters.min.js';
                            }
                        },
                        {
                            match: /main.js/g,
                            replacement: function () {
                                return 'main.min.js';
                            }
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['build/index.html', 'build/pr*.html'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['build/pizza.html'],
                        dest: 'dist/views/'
                    }
                ]
            }
        },

        pagespeed: {
            options: {
                nokey: true,
                locale: "en_CA",
                threshold: 90
            },
            mobile: {
                options: {
                    paths: ["/dist/index.html"],
                    strategy: "mobile"
                }
            },
            desktop: {
                options: {
                    paths: ["/dist/index.html"],
                    strategy: "desktop"
                }
            }
        }

    });



    //grunt.loadNpmTasks('grunt-responsive-images'); // responsive images is unused
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-pagespeed');
    grunt.loadNpmTasks('grunt-replace');

    /**
     * Task to run PageSpeed Insights using ngrok.
     * Note: it is very important to use ngrok 0.1.94+, not 0.2+. (latest version doesn't work)
     * Source: https://github.com/jrcryer/grunt-pagespeed-ngrok-sample
     */
    grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
        var done = this.async();
        var port = 8888;
        ngrok.connect(port, function(err, url) {
            if (err !== null) {
                grunt.fail.fatal(err);
                return done();
            }
            grunt.config.set('pagespeed.options.url', url);
            grunt.task.run('pagespeed:mobile');
            grunt.task.run('pagespeed:desktop');
            done();
        });
    });

    grunt.registerTask('cleandist', ['clean', 'mkdir', 'copy:diststruct']);
    grunt.registerTask('minimize', ['cssmin', 'uglify', 'clean:build', 'htmlmin', 'replace', 'clean:build']);
    grunt.registerTask('copyfiles', ['copy:html', 'copy:css', 'copy:images', 'copy:javascript']);
    grunt.registerTask('default', ['cleandist', 'minimize', 'copy:images', 'psi-ngrok']); // 'responsive_images'

};
