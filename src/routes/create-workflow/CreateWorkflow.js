import React, { Component } from 'react';
import { Typography } from 'material-ui';

import AppBody from '../../components/app/AppBody';

class CreateWorkflow extends Component {
	render () {
		return (
			<AppBody>
				<Typography type="headline">Create workflow</Typography>
			</AppBody>
		);
	}
}

export default CreateWorkflow;
