import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Button, Icon } from '@material-ui/core';

import { AppBody, Flex } from '../../components';

import StrategySidebar from './form/StrategySidebar';
import StrategyTree from './tree/StrategyTree';

const mapStateToProps = ({ strategies }, { match }) => {
	const matchingStrategy = strategies.find(
		strategy => strategy.id.toString() === match.params.id
	);

	return {
		strategy: matchingStrategy || null
	};
};

class ViewStrategy extends Component {
	state = {
		selectedCardPath: null
	};

	handleSelectCard = selectedCardPath => {
		this.setState({ selectedCardPath });
	};

	handleCancelForm = () => {
		this.setState({ selectedCardPath: null });
	};

	render() {
		const { strategy } = this.props;

		if (strategy === null) {
			return <Redirect to="/strategies" />;
		}

		return (
			<AppBody flexDirection="row" padding="0">
				<Flex
					applyCss={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 1 }}
					spaceHorizontal="1rem"
				>
					<Button
						component={Link}
						disabled={!!this.state.selectedCardPath}
						to="/strategies"
						variant="raised"
						size="small"
					>
						<Icon>chevron_left</Icon>
					</Button>
				</Flex>

				<StrategyTree
					onSelectCard={this.handleSelectCard}
					selectedCardPath={this.state.selectedCardPath}
					strategy={strategy.strategy}
				/>

				{this.state.selectedCardPath && (
					<StrategySidebar
						isReadOnly
						onCancelForm={this.handleCancelForm}
						selectedCardPath={this.state.selectedCardPath}
						strategy={strategy.strategy}
					/>
				)}
			</AppBody>
		);
	}
}

ViewStrategy = connect(mapStateToProps, null)(ViewStrategy);
ViewStrategy = withRouter(ViewStrategy);

export default ViewStrategy;
