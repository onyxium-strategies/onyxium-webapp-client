/**
 * Traverse into the given path and immutably update all nodes in the given path.
 * When the end of the path is reached, a callback is called allowing you to update the remaining nodes.
 *
 * @param nodes {[]} The nodes to traverse
 * @param path {[]} The path to traverse into, array index based
 * @param updateNode {function} Callback function called with the leaf node
 * @returns {[]} The immutably updated tree with the added condition type node
 */
export default function traverseAndUpdateNode(nodes, path, updateNode) {
	const indexToRecurseIn = path[0];
	const node = nodes[indexToRecurseIn];

	const updatedNode =
		path.length <= 1
			? updateNode(node)
			: { ...node, then: traverseAndUpdateNode(node.then, path.slice(1), updateNode) };

	return [...nodes.slice(0, indexToRecurseIn), updatedNode, ...nodes.slice(indexToRecurseIn + 1)];
}
