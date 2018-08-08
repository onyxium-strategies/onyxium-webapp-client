export default function strategyAdd(name, strategy) {
	const data = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name,
			userId: '5b6b390b8907ae05f0897510',
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
