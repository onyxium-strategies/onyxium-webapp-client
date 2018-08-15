import { handle } from 'redux-pack';

function getAuthenticatedUser() {
	if (!window.localStorage) {
		return null;
	}

	const userString = window.localStorage.getItem('user');
	if (!userString) {
		return null;
	}

	// Test if this is an actual user we can use.
	const user = JSON.parse(userString);
	return user.id ? user : null;
}

const initialState = {
	isErrored: false,
	isLoading: false,
	data: getAuthenticatedUser()
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

		case 'USER_LOGOUT':
			return {
				isLoading: false,
				isErrored: false,
				data: null
			};

		default:
			return state;
	}
};

export default user;
