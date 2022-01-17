var lodash = require("./lodash");
var Graph = require("./graph");

module.exports = {
  write: write,
  read: read
};

function write(g) {
  var json = {
    options: {
      directed: g.isDirected(),
      multigraph: g.isMultigraph(),
      compound: g.isCompound()
    },
    nodes: writeNodes(g),
    edges: writeEdges(g)
  };
  if (!lodash.isUndefined(g.graph())) {
    json.value = lodash.clone(g.graph());
  }
  return json;
}

function writeNodes(g) {
  return lodash.map(g.nodes(), function(v) {
    var nodeValue = g.node(v);
    var parent = g.parent(v);
    var node = { v: v };
    if (!lodash.isUndefined(nodeValue)) {
      node.value = nodeValue;
    }
    if (!lodash.isUndefined(parent)) {
      node.parent = parent;
    }
    return node;
  });
}

function writeEdges(g) {
  return lodash.map(g.edges(), function(e) {
    var edgeValue = g.edge(e);
    var edge = { v: e.v, w: e.w };
    if (!lodash.isUndefined(e.name)) {
      edge.name = e.name;
    }
    if (!lodash.isUndefined(edgeValue)) {
      edge.value = edgeValue;
    }
    return edge;
  });
}

function read(json) {
  var g = new Graph(json.options).setGraph(json.value);
  lodash.each(json.nodes, function(entry) {
    g.setNode(entry.v, entry.value);
    if (entry.parent) {
      g.setParent(entry.v, entry.parent);
    }
  });
  lodash.each(json.edges, function(entry) {
    g.setEdge({ v: entry.v, w: entry.w, name: entry.name }, entry.value);
  });
  return g;
}
