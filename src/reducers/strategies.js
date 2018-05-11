const initialState = [];

const dateLocalizationOptions = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric'
};

const strategies = (state = initialState, action) => {
	switch (action.type) {
		case 'STRATEGY_ADD':
			return [
				...state,
				{
					name: action.name,
					date: new Date().toLocaleString(dateLocalizationOptions),
					strategy: action.strategy
				}
			];

		default:
			return state;
	}
};

export default strategies;
