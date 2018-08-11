import { handle } from 'redux-pack';

const initialState = {
	isErrored: false,
	isLoading: false,
	data: null
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case 'USER_LOGIN':
		case 'USER_REGISTER':
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
					data: action.payload || null
				})
			});

		default:
			return state;
	}
};

export default user;
