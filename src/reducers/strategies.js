import { handle } from 'redux-pack';

const initialState = {
	isErrored: false,
	isLoading: false,
	data: []
};

const strategies = (state = initialState, action) => {
	switch (action.type) {
		case 'STRATEGIES_LOAD':
			return handle(state, action, {
				start: prevState => ({
					...prevState,
					isLoading: true,
					data: []
				}),
				finish: prevState => ({
					...prevState,
					isLoading: false
				}),
				failure: prevState => ({
					...prevState,
					isLoading: false,
					isErrored: true,
					data: []
				}),
				success: prevState => ({
					...prevState,
					isLoading: false,
					data: action.payload
				})
			});

		case 'STRATEGY_ADD':
			return [
				{
					date: action.date,
					id: action.id,
					name: action.name,
					state: action.state,
					status: action.status,
					strategy: action.strategy
				},
				...state
			];

		default:
			return state;
	}
};

export default strategies;
