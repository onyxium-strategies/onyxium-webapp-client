/**
 * Traverse into the given path and get the node corresponding to the path.
 *
 * @param nodes {[]} The nodes to traverse
 * @param path {[]} The path to traverse into, array index based
 * @returns {Object} The node that corresponds to the given path
 */
export default function traverseAndGetNode (nodes, path) {
	if (path.length === 0) {
		return nodes;
	}

	return traverseAndGetNode(nodes[path[0]], path.slice(1));
}
