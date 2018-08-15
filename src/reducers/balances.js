import { handle } from 'redux-pack';

const initialState = {
	isErrored: false,
	isLoading: false,
	data: []
};

const balances = (state = initialState, action) => {
	switch (action.type) {
		case 'BALANCES_LOAD':
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

		default:
			return state;
	}
};

export default balances;
