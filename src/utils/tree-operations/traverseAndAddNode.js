import traverseAndUpdateLeafNodes from './traverseAndUpdateLeafNodes';

/**
 * Traverse into the given path and immutably update all nodes it comes along.
 * When the end of the path is reached, a condition type node is appended to the child nodes.
 *
 * @param nodes {[]} The nodes to traverse.
 * @param path {[]} The path to traverse into, array index based.
 * @returns {[]} The immutably updated tree with the added condition type node.
 */
export default function traverseAndAddNode (nodes, path) {
	return traverseAndUpdateLeafNodes(
		nodes,
		path,
		(nodes) => {
			return [
				...nodes,
				{ type: 'condition', priority: nodes.length }
			];
		}
	);
}
