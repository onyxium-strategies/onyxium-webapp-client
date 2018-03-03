import React from 'react';
import { Typography } from 'material-ui';

import isActionValid from './utils/isActionValid';

function determineActionSummaryContent (action) {
	const { baseCurrency, orderType, quantity, quoteCurrency, value } = action;

	switch (orderType) {
		case 'limit-buy':
			return (
				`Set a "limit buy" order for ${quantity} ${baseCurrency} at ${value} ${baseCurrency}/${quoteCurrency}`
			);

		case 'limit-sell':
			return (
				`Set a "limit sell" order for ${quantity} ${baseCurrency} at ${value} ${baseCurrency}/${quoteCurrency}`
			);

		default:
			return null;
	}
}

const ActionSummaryLabel = ({ action }) => {
	if (!isActionValid(action)) {
		return <Typography color="textSecondary">No action configured yet</Typography>;
	}

	return (
		<Typography color="textSecondary">
			{determineActionSummaryContent(action)}
		</Typography>
	);
}

export default ActionSummaryLabel;
