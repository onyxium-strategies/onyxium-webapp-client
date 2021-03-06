const data = {
	method: 'GET',
	headers: {
		Accept: 'application/json'
	}
};

export default function strategiesLoad(user) {
	return {
		type: 'STRATEGIES_LOAD',
		promise: fetch(`/api/strategy?userId=${user.id}`, data).then(response => {
			if (!response.ok) {
				throw Error(response.statusText);
			}

			return response.json();
		})
	};
}
