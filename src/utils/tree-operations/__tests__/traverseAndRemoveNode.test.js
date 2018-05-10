import traverseAndRemoveNode from '../traverseAndRemoveNode';

const testStrategy = [
	{ id: '1' },
	{
		id: '2',
		then: [
			{ id: '2.1' },
			{ id: '2.2' },
			{
				id: '2.3',
				then: [{ id: '2.3.1' }]
			}
		]
	}
];

test('traverseAndRemoveNode() removes the node at the given path', () => {
	const updatedStrategy = traverseAndRemoveNode(testStrategy, [1, 2]);

	expect(updatedStrategy).toEqual([
		{ id: '1' },
		{
			id: '2',
			then: [{ id: '2.1' }, { id: '2.2' }]
		}
	]);
});

test('traverseAndRemoveNode() removes a root node', () => {
	const updatedStrategy = traverseAndRemoveNode(testStrategy, [1]);

	expect(updatedStrategy).toEqual([{ id: '1' }]);
});
