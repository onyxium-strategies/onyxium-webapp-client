import React from 'react';
import TextField from 'material-ui/TextField';
import { Button, Typography } from 'material-ui';

import AppBody from '../../components/app/AppBody';
import Flex from '../../components/flex/Flex';

class TextFields extends React.Component {
	state = {
		username: 'FakeUser',
		password: 'fakeuser1'
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	render() {
		return (
			<AppBody>
				<Typography variant="headline">Dashboard</Typography>

				<Flex
					alignItems="flex-start"
					flexDirection="column"
					margin={{ top: '1rem' }}
					spaceVertical="1rem"
				>
					<Flex spaceHorizontal="1rem">
						<TextField
							label="Change username"
							value={this.state.username}
							onChange={this.handleChange('username')}
						/>

						<TextField
							label="Change password"
							value={this.state.password}
							onChange={this.handleChange('password')}
							type="password"
						/>
					</Flex>

					<Button
						color="primary"
						onClick={() => console.log('TODO: submit form', this.state)}
						variant="raised"
					>
						Submit
					</Button>
				</Flex>
			</AppBody>
		);
	}
}

export default TextFields;
