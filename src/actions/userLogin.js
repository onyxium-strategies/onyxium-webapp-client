export default function userLogin(email, password) {
	// const data = {
	// 	method: 'POST',
	// 	headers: {
	// 		Accept: 'application/json'
	// 	},
	// 	body: JSON.stringify({ email, password })
	// };

	return {
		type: 'USER_LOGIN',
		promise: new Promise(resolve => {
			setTimeout(() => resolve({ userId: '123' }), 500);
		})
		// promise: fetch('/api/user', data).then(response => {
		// 	if (!response.ok) {
		// 		throw Error(response.statusText);
		// 	}

		// 	return response.json();
		// })
	};
}
