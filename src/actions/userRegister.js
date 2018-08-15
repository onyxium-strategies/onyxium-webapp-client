export default function userRegister(email, password) {
	const data = {
		method: 'POST',
		headers: {
			Accept: 'application/json'
		},
		body: JSON.stringify({ email, password })
	};

	return {
		type: 'USER_REGISTER',
		promise: fetch('/api/user', data)
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}

				return response.json();
			})
			.then(user => {
				if (window.localStorage) {
					window.localStorage.setItem('user', JSON.stringify(user));
				}

				return user;
			})
	};
}
