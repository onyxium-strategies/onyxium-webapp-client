/**
 * Traverse into the given path and get the node corresponding to the path.
 *
 * @param nodes {[]} The nodes to traverse
 * @param path {[]} The path to traverse into, array index based
 * @returns {Object} The node that corresponds to the given path
 */
export default function traverseAndGetNode (nodes, path) {
	if (path.length === 1) {
		return nodes[path[0]];
	}

	return traverseAndGetNode(nodes[path[0]].then, path.slice(1));
}
