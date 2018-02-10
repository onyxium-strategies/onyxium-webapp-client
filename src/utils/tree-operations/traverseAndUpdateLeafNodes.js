/**
 * Traverse into the given path and immutably update all nodes in the given path.
 * When the end of the path is reached, a callback is called allowing you to update the remaining nodes.
 *
 * @param nodes {[]} The nodes to traverse.
 * @param path {[]} The path to traverse into, array index based.
 * @param updateLeafNodes {function} Callback function called with the leaf nodes.
 * @returns {[]} The immutably updated tree with the added condition type node.
 */
export default function traverseAndUpdateLeafNodes (nodes, path, updateLeafNodes) {
	if (path.length === 0) {
		return updateLeafNodes(nodes);
	}

	const indexToRecurseIn = path[0];
	const node = nodes[indexToRecurseIn];

	return [
		...nodes.slice(0, indexToRecurseIn),
		{
			...node,
			then: traverseAndUpdateLeafNodes(node.then || [], path.slice(1), updateLeafNodes)
		},
		...nodes.slice(indexToRecurseIn + 1)
	];
}
