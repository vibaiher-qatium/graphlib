var lodash = require("../lodash");

module.exports = components;

function components(g) {
  var visited = {};
  var cmpts = [];
  var cmpt;

  function dfs(v) {
    if (lodash.has(visited, v)) return;
    visited[v] = true;
    cmpt.push(v);
    lodash.each(g.successors(v), dfs);
    lodash.each(g.predecessors(v), dfs);
  }

  lodash.each(g.nodes(), function(v) {
    cmpt = [];
    dfs(v);
    if (cmpt.length) {
      cmpts.push(cmpt);
    }
  });

  return cmpts;
}
