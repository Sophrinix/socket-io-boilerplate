/*jslint node: true, scripturl: true */

'use strict';

var path = require('path');


module.exports = function(grunt) {

    grunt.initConfig({

        express: {
            livereload: {
                options: {
                    port: 7777,
                    bases: path.resolve('public'),
                    monitor: {},
                    debug: true,
                    server: path.resolve('./server')
                }
            }
        },

        regarde: {
            pub: {
                files: 'public/**/*',
                tasks: ['livereload']
            },
            trigger: {
                files: '.server',
                tasks: 'express-restart:livereload'
            },
            express: {
                files: 'public/index.html',
                tasks: 'livereload'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-regarde');

    grunt.registerTask('server', ['livereload-start', 'express', 'regarde']);
    grunt.registerTask('default', ['server']);

};