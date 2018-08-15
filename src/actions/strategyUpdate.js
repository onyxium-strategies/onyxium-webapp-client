export default function strategyAdd(strategy, updatedFields) {
	const data = {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(updatedFields)
	};

	return {
		type: 'STRATEGY_UPDATE',
		promise: fetch(`/api/strategy/${strategy.id}`, data).then(response => {
			if (!response.ok) {
				throw Error(response.statusText);
			}

			return response.json();
		})
	};
}
