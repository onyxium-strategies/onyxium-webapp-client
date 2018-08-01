import testStrategy from '../test-data/strategy.json';

const initialState = [
	{
		date: new Date().toLocaleString(),
		id: 'test',
		name: 'Test',
		strategy: testStrategy
	}
];

const strategies = (state = initialState, action) => {
	switch (action.type) {
		case 'STRATEGY_ADD':
			return [
				...state,
				{
					date: action.date,
					id: action.id,
					name: action.name,
					strategy: action.strategy
				}
			];

		default:
			return state;
	}
};

export default strategies;
