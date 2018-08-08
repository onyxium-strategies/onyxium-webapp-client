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
					data: action.payload || []
				})
			});

		case 'STRATEGY_ADD':
			return handle(state, action, {
				start: prevState => ({
					...prevState,
					isLoading: true
				}),
				finish: prevState => ({
					...prevState,
					isLoading: false
				}),
				failure: prevState => ({
					...prevState,
					isLoading: false,
					isErrored: true
				}),
				success: prevState => ({
					...prevState,
					isLoading: false,
					data: [action.payload, ...state.data]
				})
			});

		default:
			return state;
	}
};

export default strategies;
