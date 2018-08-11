import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core';

import { Block, TextInput } from '../../components';

class AuthForm extends Component {
	state = {
		email: null,
		password: null
	};

	handleEmailChange = value => this.setState({ email: value });
	handlePasswordChange = value => this.setState({ password: value });

	handleSubmit = event => {
		event.preventDefault();
		this.props.onSubmit(this.state);
	};

	render() {
		return (
			<Block padding="2rem" spaceVertical="2rem">
				<Typography variant="headline">{this.props.actionLabel}</Typography>

				<form onSubmit={this.handleSubmit}>
					<Block spaceVertical="2rem">
						<TextInput
							onChange={this.handleEmailChange}
							placeholder="Email"
							type="email"
							value={this.state.email}
						/>

						<TextInput
							onChange={this.handlePasswordChange}
							placeholder="Password"
							type="password"
							value={this.state.password}
						/>

						<Button
							color="primary"
							onClick={this.handleSubmit}
							variant="raised"
							size="small"
							type="submit"
						>
							{this.props.actionLabel}
						</Button>
					</Block>
				</form>
			</Block>
		);
	}
}

export default AuthForm;
