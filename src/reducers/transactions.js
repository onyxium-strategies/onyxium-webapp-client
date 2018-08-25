import { handle } from 'redux-pack';

import { aggregateTransactions } from '../utils';

const initialState = {
	isErrored: false,
	isLoading: false,
	data: null
};

const transactions = (state = initialState, action) => {
	switch (action.type) {
		case 'TRANSACTIONS_LOAD':
			return handle(state, action, {
				start: prevState => ({
					...prevState,
					isLoading: true,
					data: null
				}),
				finish: prevState => ({
					...prevState,
					isLoading: false
				}),
				failure: prevState => ({
					...prevState,
					isLoading: false,
					isErrored: true,
					data: null
				}),
				success: prevState => ({
					...prevState,
					isLoading: false,
					data: aggregateTransactions(action.payload)
				})
			});

		default:
			return state;
	}
};

export default transactions;
