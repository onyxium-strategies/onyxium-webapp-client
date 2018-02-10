import traverseAndUpdateLeafNodes from './traverseAndUpdateLeafNodes';

/**
 * Traverse into the given path and immutably update all nodes it comes along.
 * When the end of the path is reached, the node with that index is removed.
 *
 * @param nodes {[]} The nodes to traverse
 * @param path {[]} The path to traverse into, array index based
 * @returns {[]} The immutably updated tree with the added condition type node
 */
export default function traverseAndRemoveNode (nodes, path) {
	const indexToRemove = path[path.length - 1];
	const traversalPath = path.slice(0, path.length - 1);

	return traverseAndUpdateLeafNodes(
		nodes,
		traversalPath,
		(nodes) => {
			return [
				...nodes.slice(0, indexToRemove),
				...nodes.slice(indexToRemove + 1)
			];
		}
	);
}
