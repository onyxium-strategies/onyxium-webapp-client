import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Paper, Typography } from '@material-ui/core';

import { userLogin } from '../../actions';
import { AppBody, Block, Flex } from '../../components';

import AuthForm from './AuthForm';

const registerInfoContainerPadding = { top: '1rem', right: '2rem', bottom: '2rem', left: '2rem' };

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { userLogin };

class Login extends Component {
	handleSubmit = values => {
		this.props.userLogin(values);
	};

	render() {
		if (this.props.user.data) {
			return <Redirect to="/funds" />;
		}

		return (
			<AppBody
				alignItems="center"
				flexDirection="row"
				justifyContent="center"
				spaceHorizontal="2rem"
			>
				<Flex flex="1" flexDirection="column" maxWidth="30rem">
					<Paper>
						<AuthForm onSubmit={this.handleSubmit} actionLabel="Login" />

						<Block padding={registerInfoContainerPadding}>
							<Typography>
								Don't have an account yet?{' '}
								<Link to="/register">Register an account.</Link>
							</Typography>
						</Block>
					</Paper>
				</Flex>
			</AppBody>
		);
	}
}

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;
