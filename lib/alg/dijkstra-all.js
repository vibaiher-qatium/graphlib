var dijkstra = require("./dijkstra");
var lodash = require("../lodash");

module.exports = dijkstraAll;

function dijkstraAll(g, weightFunc, edgeFunc) {
  return lodash.transform(g.nodes(), function(acc, v) {
    acc[v] = dijkstra(g, v, weightFunc, edgeFunc);
  }, {});
}
