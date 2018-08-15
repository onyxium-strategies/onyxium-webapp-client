const data = {
	method: 'GET',
	headers: {
		Accept: 'application/json'
	}
};

export default function balancesLoad(user) {
	return {
		type: 'BALANCES_LOAD',
		promise: fetch(`/api/balances/${user.id}`, data).then(response => {
			if (!response.ok) {
				throw Error(response.statusText);
			}

			return response.json();
		})
	};
}
