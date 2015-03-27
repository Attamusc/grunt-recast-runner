'use strict';

var grunt = require('grunt');

exports.recast_runner = {
  default: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default.js');
    var expected = grunt.file.read('test/expected/default.js');
    test.equal(actual, expected, 'recast tranformations have been performed.');

    test.done();
  },
};
