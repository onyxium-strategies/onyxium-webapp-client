import React from 'react';
import { Typography } from 'material-ui';

import determineActionSummaryLabel from './utils/determineActionSummaryLabel';
import isActionValid from './utils/isActionValid';

const ActionSummaryLabel = ({ action }) => {
	if (!isActionValid(action)) {
		return <Typography color="textSecondary">No action configured yet</Typography>;
	}

	return (
		<Typography color="textSecondary">
			{determineActionSummaryLabel(action)}
		</Typography>
	);
};

export default ActionSummaryLabel;
