import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
	Button,
	Chip,
	CircularProgress,
	Icon,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText
} from '@material-ui/core';

import { strategiesLoad, strategyUpdate } from '../../actions';
import { AppBody, Flex, StateMessage } from '../../components';

const mapStateToProps = ({ strategies, user }) => ({
	isErrored: strategies.isErrored,
	isLoading: strategies.isLoading,
	strategies: strategies.data,
	user: user.data
});

const mapDispatchToProps = { strategiesLoad, strategyUpdate };

const labelByStatus = {
	executing: 'Running',
	idle: 'Running',
	paused: 'Paused',
	running: 'Running',
	finished: 'Finished'
};

class Strategies extends Component {
	handleStrategyClick = strategy => {
		this.props.history.push(`/strategies/${strategy.id}`);
	};

	handleStartClick = strategy => {
		this.props.strategyUpdate(strategy, { status: 'idle' });
	};

	handlePauseClick = strategy => {
		this.props.strategyUpdate(strategy, { status: 'paused' });
	};

	render() {
		const { isErrored, isLoading, strategies } = this.props;

		const isLoaded = !isErrored && !isLoading;

		return (
			<AppBody spaceVertical="10px">
				{isErrored && (
					<Flex alignItems="center" flex="1" justifyContent="center">
						<StateMessage
							icon="error"
							title="Error loading strategies"
							subTitle="An error occurred while loading your strategies"
						/>
					</Flex>
				)}

				{isLoading &&
					!isErrored && (
						<Flex alignItems="center" flex="1" justifyContent="center">
							<StateMessage
								icon={<CircularProgress size={80} />}
								title="Loading strategies"
							/>
						</Flex>
					)}

				{isLoaded &&
					strategies.length === 0 && (
						<Flex alignItems="center" flex="1" justifyContent="center">
							<StateMessage
								icon="sentiment_very_dissatisfied"
								title="No strategies created yet"
								subTitle="Click the plus icon below to create your first strategy!"
							/>
						</Flex>
					)}

				{isLoaded &&
					strategies.length > 0 && (
						<Flex flex="1" flexDirection="column" overflowY="auto">
							<List component="nav">
								{strategies.map((strategy, index) => (
									<ListItem
										key={index}
										button
										onClick={() => this.handleStrategyClick(strategy)}
									>
										<Icon color="action">dashboard</Icon>

										<ListItemText
											inset
											primary={strategy.name}
											secondary={strategy.createdAt}
										/>

										<ListItemSecondaryAction>
											<Flex alignItems="center" spaceHorizontal="1rem">
												<Chip
													color="primary"
													label={labelByStatus[strategy.status]}
												/>

												<Flex>
													<IconButton
														disabled={
															strategy.status === 'finished' ||
															strategy.status === 'paused'
														}
														onClick={() =>
															this.handlePauseClick(strategy)
														}
													>
														<Icon>pause</Icon>
													</IconButton>

													<IconButton
														color="primary"
														disabled={
															strategy.status === 'finished' ||
															strategy.status === 'executing' ||
															strategy.status === 'idle' ||
															strategy.status === 'running'
														}
														onClick={() =>
															this.handleStartClick(strategy)
														}
													>
														<Icon>play_arrow</Icon>
													</IconButton>
												</Flex>
											</Flex>
										</ListItemSecondaryAction>
									</ListItem>
								))}
							</List>
						</Flex>
					)}

				{isLoaded && (
					<Button component={Link} to="/strategies/create" variant="fab" color="primary">
						<Icon>add_icon</Icon>
					</Button>
				)}
			</AppBody>
		);
	}

	componentDidMount() {
		this.props.strategiesLoad(this.props.user);
	}
}

Strategies = withRouter(Strategies);
Strategies = connect(mapStateToProps, mapDispatchToProps)(Strategies);

export default Strategies;
