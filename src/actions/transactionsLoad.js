const data = {
	method: 'GET',
	headers: {
		Accept: 'application/json'
	}
};

export default function transactionsLoad(user) {
	return {
		type: 'TRANSACTIONS_LOAD',
		promise: fetch(`/api/transactions/${user.id}`, data).then(response => {
			if (!response.ok) {
				throw Error(response.statusText);
			}

			return response.json();
		})
	};
}
