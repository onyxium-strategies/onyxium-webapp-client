import React, { Component } from 'react';
import { css } from 'react-emotion';
import { connect } from 'react-redux';
import { AppBar, IconButton, Icon, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';

import { userLogout } from './actions';
import { Block } from './components';

const mapStateToProps = ({ user }) => ({ user: user.data });
const mapDispatchToProps = { userLogout };

const rootClassNames = css({ position: 'absolute' });

class AppHeader extends Component {
	state = {
		anchorEl: null
	};

	handleMenuClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleLogoutClick = () => {
		this.props.userLogout();
	};

	render() {
		const { activeRoute, user } = this.props;

		const isMenuOpened = !!this.state.anchorEl;

		return (
			<AppBar classes={{ root: rootClassNames }}>
				<Toolbar>
					<Block flex="1">
						<Typography variant="title" color="inherit">
							{activeRoute.label}
						</Typography>
					</Block>

					{user && (
						<Block flex="none">
							<IconButton
								aria-owns={isMenuOpened ? 'menu-appbar' : null}
								aria-haspopup="true"
								onClick={this.handleMenuClick}
								color="inherit"
							>
								<Icon>account_circle</Icon>
							</IconButton>

							<Menu
								id="menu-appbar"
								anchorEl={this.state.anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								open={isMenuOpened}
								onClose={this.handleClose}
							>
								<MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
							</Menu>
						</Block>
					)}
				</Toolbar>
			</AppBar>
		);
	}
}

AppHeader = connect(mapStateToProps, mapDispatchToProps)(AppHeader);

export default AppHeader;
