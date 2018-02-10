/**
 * Traverse into the given path and immutably update all nodes in the given path.
 * When the end of the path is reached, a condition type node is appended to the child nodes.
 *
 * @param nodes {[]} The nodes to traverse.
 * @param path {[]} The path to traverse into, array index based.
 * @returns {[]} The immutably updated tree with the added condition type node.
 */
export default function traverseAndImmutablyAddNode (nodes, path) {
	if (path.length === 0) {
		return [...nodes, { type: 'condition', priority: nodes.length }];
	}

	const indexToRecurseIn = path[0];
	const node = nodes[indexToRecurseIn];

	return [
		...nodes.slice(0, indexToRecurseIn),
		{
			...node,
			then: traverseAndImmutablyAddNode(node.then || [], path.slice(1))
		},
		...nodes.slice(indexToRecurseIn + 1)
	];
}
