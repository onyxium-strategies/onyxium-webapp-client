import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Icon, List, ListItem, ListItemText } from 'material-ui';

import { AppBody, Flex, StateMessage } from '../../components';

const mapStateToProps = ({ strategies }) => ({ strategies });

class Strategies extends Component {
	handleStrategyClick = strategy => {
		this.props.history.push(`/strategies/${strategy.id}`);
	};

	render() {
		return (
			<AppBody spaceVertical="10px">
				{this.props.strategies.length === 0 && (
					<Flex alignItems="center" flex="1" justifyContent="center">
						<StateMessage
							icon="sentiment_very_dissatisfied"
							title="No strategies created yet"
							subTitle="Click the plus icon below to create your first strategy!"
						/>
					</Flex>
				)}

				{this.props.strategies.length > 0 && (
					<List component="nav">
						{this.props.strategies.map((strategy, index) => (
							<ListItem
								key={index}
								button
								onClick={() => this.handleStrategyClick(strategy)}
							>
								<Icon color="action">dashboard</Icon>
								<ListItemText
									inset
									primary={strategy.name}
									secondary={strategy.date}
								/>
							</ListItem>
						))}
					</List>
				)}

				<Button component={Link} to="/strategies/create" variant="fab" color="primary">
					<Icon>add_icon</Icon>
				</Button>
			</AppBody>
		);
	}
}

Strategies = withRouter(Strategies);
Strategies = connect(mapStateToProps, null)(Strategies);

export default Strategies;
