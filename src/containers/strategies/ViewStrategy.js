import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import traverse from 'traverse';
import { Button, Icon } from '@material-ui/core';

import { AppBody, Flex } from '../../components';

import StrategySidebar from './form/StrategySidebar';
import StrategyTree from './tree/StrategyTree';

const mapStateToProps = ({ strategies }, { match }) => {
	const matchingStrategy = strategies.data.find(
		strategy => strategy.id.toString() === match.params.id
	);

	return {
		strategy: matchingStrategy || null
	};
};

const determineInitialState = ({ strategy }) => {
	if (!strategy) {
		return {
			activeCardPath: null,
			selectedCardPath: null
		};
	}

	// I know, fucking ugly but for the prototype it's fine.
	var activeCardPath = traverse(strategy.tree).reduce(function(result, node) {
		if (result !== null) {
			return result;
		}

		// TODO: replace with an actual id coming from the backend.
		// This id currently references to the strategy.json from test-data.
		if (node && node.id === strategy.state) {
			return this.path.reduce((path, pathItem) => {
				if (pathItem !== 'then') {
					path.push(parseInt(pathItem, 10));
				}
				return path;
			}, []);
		}

		return null;
	}, null);

	return {
		activeCardPath: activeCardPath,
		selectedCardPath: null
	};
};

class ViewStrategy extends Component {
	state = determineInitialState(this.props);

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
					activeCardPath={this.state.activeCardPath}
					onSelectCard={this.handleSelectCard}
					selectedCardPath={this.state.selectedCardPath}
					strategy={strategy.tree}
				/>

				{this.state.selectedCardPath && (
					<StrategySidebar
						isReadOnly
						onCancelForm={this.handleCancelForm}
						selectedCardPath={this.state.selectedCardPath}
						strategy={strategy.tree}
					/>
				)}
			</AppBody>
		);
	}
}

ViewStrategy = connect(mapStateToProps, null)(ViewStrategy);
ViewStrategy = withRouter(ViewStrategy);

export default ViewStrategy;
