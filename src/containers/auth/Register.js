import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Paper } from '@material-ui/core';

import { userRegister } from '../../actions';
import { AppBody, Flex } from '../../components';

import AuthForm from './AuthForm';

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { userRegister };

class Register extends Component {
	handleSubmit = values => {
		this.props.userRegister(values.email, values.password);
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
						<AuthForm onSubmit={this.handleSubmit} actionLabel="Register" />
					</Paper>
				</Flex>
			</AppBody>
		);
	}
}

Register = connect(mapStateToProps, mapDispatchToProps)(Register);

export default Register;
