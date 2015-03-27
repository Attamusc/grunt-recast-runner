/*
 * grunt-recast-runner
 * https://github.com/Attamusc/grunt-recast-runner
 *
 * Copyright (c) 2015 Sean Dunn
 * Licensed under the MIT license.
 */

'use strict';

var recast = require('recast');
var path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('recast', 'Run recast scripts across a codebase', function() {
    var transforms = grunt.file.expand(this.data.tranforms);
    var files = this.filesSrc;

    var options = this.options({});

    transforms.forEach(function(transform) {
      var transformer = require(path.join(process.cwd(), transform))(recast);

      files.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function(filepath) {
        var ast = recast.parse(grunt.file.read(filepath));
        recast.visit(ast, transformer);

        grunt.file.write(filepath, recast.print(ast).code);
        grunt.log.writeln('"' + transform + '" processed "' + filepath + '".');
      });
    });
  });

};
