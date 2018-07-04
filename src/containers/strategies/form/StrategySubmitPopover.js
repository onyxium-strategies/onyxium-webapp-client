import React, { Component } from 'react';
import { Button, Icon, Popover } from '@material-ui/core';

import { Flex, TextInput } from '../../../components';

class StrategySubmitPopover extends Component {
	state = {
		popoverAnchorElement: null,
		strategyName: ''
	};

	handleSubmitButtonClick = event => {
		this.setState({ popoverAnchorElement: event.currentTarget });
	};

	handleClosePopover = () => {
		this.setState({ popoverAnchorElement: null });
	};

	handleNameInputChange = value => {
		this.setState({ strategyName: value });
	};

	handleSubmitPopoverClick = () => {
		this.props.onSubmit(this.state.strategyName);
	};

	render() {
		return [
			<Button
				key="button"
				color="secondary"
				disabled={this.props.isDisabled}
				onClick={this.handleSubmitButtonClick}
				size="small"
				variant="raised"
			>
				Save
			</Button>,
			<Popover
				key="popover"
				anchorEl={this.state.popoverAnchorElement}
				open={!!this.state.popoverAnchorElement}
				onClose={this.handleClosePopover}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
			>
				<Flex padding="1rem" spaceHorizontal="1rem">
					<TextInput
						onChange={this.handleNameInputChange}
						placeholder="Strategy name"
						value={this.state.strategyName}
					/>

					<Button
						color="primary"
						disabled={!this.state.strategyName}
						onClick={this.handleSubmitPopoverClick}
						size="small"
						variant="raised"
					>
						<Icon>send</Icon>
					</Button>
				</Flex>
			</Popover>
		];
	}
}

export default StrategySubmitPopover;
