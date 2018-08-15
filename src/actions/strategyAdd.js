export default function strategyAdd(name, strategy, user) {
	const data = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name,
			userId: user.id,
			tree: strategy
		})
	};

	return {
		type: 'STRATEGY_ADD',
		promise: fetch('/api/strategy', data).then(response => {
			if (!response.ok) {
				throw Error(response.statusText);
			}

			return response.json();
		})
	};
}
