module.exports = function(recast) {
  return {
    visitVariableDeclarator: function(path) {
      var node = path.node;
      node.id.name = 'my_' + node.id.name;
      this.traverse(path);
    }
  };
};
