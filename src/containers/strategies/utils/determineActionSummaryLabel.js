export default function determineActionSummaryLabel(action) {
	if (!action) {
		return null;
	}

	const { baseCurrency, orderType, quantity, quoteCurrency, value } = action;

	switch (orderType) {
		case 'limit-buy':
			return `Set a "limit buy" order for ${quantity} ${quoteCurrency} at ${value} ${baseCurrency}/${quoteCurrency}`;

		case 'limit-sell':
			return `Set a "limit sell" order for ${quantity} ${quoteCurrency} at ${value} ${baseCurrency}/${quoteCurrency}`;

		default:
			return null;
	}
}
