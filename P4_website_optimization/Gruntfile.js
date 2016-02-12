/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
 "grunt" alone creates a new, completed images directory
 "grunt clean" removes the images directory
 "grunt responsive_images" re-processes images without removing the old ones
 */

module.exports = function(grunt) {

    grunt.initConfig({
        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [
                        {
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
                        }
                    ]
                },

                /*
                 You don't need to change this part if you don't change
                 the directory structure.
                 */
                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,png}'],
                    cwd: 'images_src/',
                    dest: 'images/'
                }]
            }
        },

        /* Clear out the 'dist' folder */
        clean: {
            dev: {
                src: ['dist'],
            },
        },

        /* Generate the 'dist' folder */
        mkdir: {
            dev: {
                options: {
                    create: ['dist']
                },
            },
        },

        /* Copy the directory structure from the 'src' folder */
        copy: {
            dev: {
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
        },

        /* Minify HTML files */
        htmlmin: {
            dev: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'src/index.html'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-mkdir');

    grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'htmlmin']);

};
