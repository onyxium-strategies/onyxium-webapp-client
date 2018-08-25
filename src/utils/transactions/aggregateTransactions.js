const defaultColorData = {
	backgroundColor: 'rgba(220,220,220,0.2)',
	borderColor: 'rgba(220,220,220,1)'
};

const colorDataByCurrency = {
	NEO: {
		backgroundColor: 'rgba(88,191,0,0.2)',
		borderColor: 'rgba(88,191,0,1)'
	},
	OMG: {
		backgroundColor: 'rgba(27,83,240,0.2)',
		borderColor: 'rgba(27,83,240,1)'
	},
	LTC: {
		backgroundColor: 'rgba(220,220,220,0.2)',
		borderColor: 'rgba(220,220,220,1)'
	},
	BTC: {
		backgroundColor: 'rgba(247,147,26,0.2)',
		borderColor: 'rgba(247,147,26,1)'
	},
	ETH: {
		backgroundColor: 'rgba(19,19,19,0.2)',
		borderColor: 'rgba(19,19,19,1)'
	}
};

export default function aggregateTransactionsToDatasetByCurrency(transactions) {
	return transactions.reduce((dataByCurrency, transaction) => {
		const {
			Amount: amount,
			CreatedAt: createdAt,
			SubunitToUnit: subunitToUnit,
			Symbol: symbol
		} = transaction;

		if (!dataByCurrency[symbol]) {
			dataByCurrency[symbol] = {
				labels: [],
				datasets: [
					{
						...(colorDataByCurrency[symbol] || defaultColorData),
						label: symbol,
						data: []
					}
				]
			};
		}

		const data = dataByCurrency[symbol];

		const date = new Date(createdAt);
		data.labels.push(
			date.getMonth() + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
		);

		const lastValue = data ? data.datasets[0].data[data.datasets[0].data.length - 1] || 0 : 0;
		const value = lastValue + amount / subunitToUnit;
		data.datasets[0].data.push(value);

		return dataByCurrency;
	}, {});
}
