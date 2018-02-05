import React, { Component } from 'react';
import { Typography } from 'material-ui';

import AppBody from '../../components/app/AppBody';

class Dashboard extends Component {
	render () {
		return (
			<AppBody>
				<Typography variant="headline">Dashboard</Typography>
			</AppBody>
		);
	}
}

export default Dashboard;
