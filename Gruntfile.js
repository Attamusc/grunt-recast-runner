/*
 * grunt-recast-runner
 * https://github.com/Attamusc/grunt-recast-runner
 *
 * Copyright (c) 2015 Sean Dunn
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    clean: {
      tests: ['tmp']
    },

    copy: {
      test: {
        expand: true,
        cwd: 'test/fixtures/basic/',
        src: '**/*.js',
        dest: 'tmp/'
      }
    },

    recast: {
      default: {
        src: 'tmp/**/*.js',
        tranforms: 'test/transforms/**/*.js'
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['clean', 'copy:test', 'recast', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
};
