const data = {
	method: 'GET',
	headers: {
		Accept: 'application/json'
	}
};

export default function strategiesLoad() {
	return {
		type: 'STRATEGIES_LOAD',
		promise: fetch('/api/strategy', data).then(response => {
			if (!response.ok) {
				throw Error(response.statusText);
			}

			return response.json();
		})
	};
}
