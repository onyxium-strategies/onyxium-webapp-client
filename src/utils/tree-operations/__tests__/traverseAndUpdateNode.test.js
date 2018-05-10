import traverseAndUpdateNode from '../traverseAndUpdateNode';

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

test('traverseAndUpdateNode() updates a single object property', () => {
	const updatedStrategy = traverseAndUpdateNode(testStrategy, [1, 1], node => {
		return { ...node, id: '2.x' };
	});

	expect(updatedStrategy).toEqual([
		{ id: '1' },
		{
			id: '2',
			then: [
				{ id: '2.1' },
				{ id: '2.x' },
				{
					id: '2.3',
					then: [{ id: '2.3.1' }]
				}
			]
		}
	]);
});

test('traverseAndUpdateNode() adds a single object property', () => {
	const updatedStrategy = traverseAndUpdateNode(testStrategy, [1, 1], node => {
		return { ...node, test: true };
	});

	expect(updatedStrategy).toEqual([
		{ id: '1' },
		{
			id: '2',
			then: [
				{ id: '2.1' },
				{ id: '2.2', test: true },
				{
					id: '2.3',
					then: [{ id: '2.3.1' }]
				}
			]
		}
	]);
});

test('traverseAndUpdateNode removes a single object property', () => {
	const updatedStrategy = traverseAndUpdateNode(testStrategy, [1, 2], node => {
		const updatedNode = { ...node };
		delete updatedNode.then;
		return updatedNode;
	});

	expect(updatedStrategy).toEqual([
		{ id: '1' },
		{
			id: '2',
			then: [{ id: '2.1' }, { id: '2.2' }, { id: '2.3' }]
		}
	]);
});
