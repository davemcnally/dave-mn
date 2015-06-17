module.exports = function(grunt) {

    var dotenv = require('dotenv');
    dotenv.load();

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        clean: {
            build: ['build/'],
            tmp: ['build/css/tmp/']
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'build/css/tmp/reset.css': 'scss/reset.scss',
                    'build/css/tmp/highlight.css': 'scss/highlight.scss',
                    'build/css/tmp/main.css': 'scss/main.scss'
                },
            },
        },

        imageoptim: {
            main: {
                options: {
                    imageAlpha: true,
                    quitAfter: true
                },
                src: ['img']
            },
        },

        watch: {
            jekyll: {
                files: ['**/*', '!build/**/*', '!node_modules/**/*'],
                tasks: ['build']
            },
            livereload: {
                files: ['build/**/*'],
                options: {
                    livereload: true
                },
            },
        },

        cssmin: {
            combine: {
                files: {
                    'build/css/styles.css': ['build/css/tmp/reset.css', 'build/css/tmp/highlight.css', 'build/css/tmp/main.css']
                },
            },
        },

        jekyll: {
            dev: {
                options: {
                    src: '.',
                    dest: 'build',
                    config: ['_config-dev.yml']
                },
            },
            draft: {
                options: {
                    src: '.',
                    dest: 'build',
                    drafts: true,
                    config: ['_config-dev.yml']
                },
            },
            dep: {
                options: {
                    src: '.',
                    dest: 'build',
                    config: ['_config.yml']
                },
            },
        },

        autoprefixer: {
            dev: {
                options: {
                    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 8', 'ie 9']
                },
                src: 'build/css/styles.css',
                dest: 'build/css/styles.css',
            },
        },

        svgmin: {
            options: {
                plugins: [{
                    mergePaths: false
                }, {
                    convertPathData: false
                }]
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: '_includes/',
                    src: ['*.svg'],
                    dest: '_includes/'
                }]
            },
        },

        rsync: {
            dave: {
                options: {
                    src: "build/",
                    dest: process.env.SYNC_ADDRESS,
                    ssh: true,
                    recursive: true
                },
            },
        },

        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 4000,
                    hostname: '127.0.0.1',
                    base: 'build',
                    open: true
                },
            },
        },

    });

    grunt.registerTask('build', ['jekyll:dev', 'sass', 'cssmin', 'autoprefixer', 'clean:tmp']);
    grunt.registerTask('drafts', ['jekyll:draft', 'sass', 'cssmin', 'autoprefixer', 'clean:tmp']);
    grunt.registerTask('deploy', ['jekyll:dep', 'sass', 'cssmin', 'autoprefixer', 'clean:tmp', 'rsync:dave']);
    grunt.registerTask('default', ['imageoptim', 'svgmin', 'deploy']);
};