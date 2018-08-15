export default function userLogout() {
	if (window.localStorage) {
		window.localStorage.removeItem('user');
	}

	return {
		type: 'USER_LOGOUT'
	};
}
