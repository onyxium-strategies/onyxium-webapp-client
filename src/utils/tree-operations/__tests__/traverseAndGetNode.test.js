import traverseAndGetNode from '../traverseAndGetNode';

const testStrategy = [
	{ id: '1' },
	{
		id: '2',
		then: [
			{ id: '2.1' },
			{ id: '2.2' },
			{
				id: '2.3',
				then: [
					{ id: '2.3.1' }
				]
			}
		]
	}
];

test('traverseAndGetNode() returns the node at the given path', () => {
	const updatedStrategy = traverseAndGetNode(testStrategy, [1, 2]);

	expect(updatedStrategy).toEqual({
		id: '2.3',
		then: [
			{ id: '2.3.1' }
		]
	});
});
