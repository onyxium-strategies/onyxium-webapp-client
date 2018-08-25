import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line as LineChart } from 'react-chartjs-2';
import {
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from '@material-ui/core';

import { balancesLoad, transactionsLoad } from '../../actions';
import { AppBody, Block, Flex, StateMessage } from '../../components';

const mapStateToProps = ({ balances, transactions, user }) => ({
	balances: balances.data,
	isBalancesErrored: balances.isErrored,
	isBalancesLoading: balances.isLoading,
	transactions: transactions.data,
	isTransactionsErrored: transactions.isErrored,
	isTransactionsLoading: transactions.isLoading,
	user: user.data
});
const mapDispatchToProps = { balancesLoad, transactionsLoad };

const determineChartContainerStyles = isVisible => ({
	opacity: isVisible ? 1 : 0,
	transition: 'opacity .3s ease-in-out'
});

const chartOptions = {
	maintainAspectRatio: false,
	responsive: true
};

class Funds extends Component {
	state = {
		height: null,
		selectedCurrency: null
	};

	tableDomNode = null;

	handleTableRef = domNode => {
		this.tableDomNode = domNode;
	};

	handleTableRowClick = balance => this.setState({ selectedCurrency: balance.Symbol });
	handleTableRowMouseEnter = balance => this.setState({ hoveredCurrency: balance.Symbol });
	handleTableRowMouseLeave = () => this.setState({ hoveredCurrency: null });

	render() {
		const { balances, isBalancesErrored, isBalancesLoading, transactions } = this.props;

		const isLoaded = !isBalancesErrored && !isBalancesLoading;

		const data = transactions && transactions[this.state.selectedCurrency];

		return (
			<AppBody>
				{isBalancesErrored && (
					<Flex alignItems="center" flex="1" justifyContent="center">
						<StateMessage
							icon="error"
							title="Error loading funds"
							subTitle="An error occurred while loading your funds"
						/>
					</Flex>
				)}

				{isBalancesLoading &&
					!isBalancesErrored && (
						<Flex alignItems="center" flex="1" justifyContent="center">
							<StateMessage
								icon={<CircularProgress size={80} />}
								title="Loading funds"
							/>
						</Flex>
					)}

				{isLoaded &&
					balances.length === 0 && (
						<Flex alignItems="center" flex="1" justifyContent="center">
							<StateMessage
								icon="sentiment_very_dissatisfied"
								title="No funds available yet"
							/>
						</Flex>
					)}

				{isLoaded &&
					balances.length > 0 && (
						<Flex spaceHorizontal="2rem">
							<Block flex="1" innerRef={this.handleTableRef}>
								<Paper>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>Currency</TableCell>
												<TableCell numeric>Value</TableCell>
											</TableRow>
										</TableHead>

										<TableBody>
											{balances.map(balance => (
												<TableRow
													key={balance.Id}
													onClick={() =>
														this.handleTableRowClick(balance)
													}
													onMouseEnter={() =>
														this.handleTableRowMouseEnter(balance)
													}
													onMouseLeave={() =>
														this.handleTableRowMouseLeave()
													}
													hover={
														this.state.hoveredCurrency ===
														balance.Symbol
													}
													selected={
														this.state.selectedCurrency ===
														balance.Symbol
													}
												>
													<TableCell scope="row">
														{balance.Symbol}
													</TableCell>

													<TableCell numeric>
														{(
															balance.Amount / balance.SubunitToUnit
														).toFixed(8)}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</Paper>
							</Block>

							<Flex flex="2" flexDirection="column">
								<Block applyCss={determineChartContainerStyles(!!data)}>
									{!!data && (
										<LineChart
											key={this.state.selectedCurrency}
											data={data}
											height={this.state.height}
											options={chartOptions}
										/>
									)}
								</Block>

								{this.state.selectedCurrency &&
									!data && (
										<Flex alignItems="center" flex="1" justifyContent="center">
											<StateMessage
												icon="show_chart"
												title={
													'No transactions for "' +
													this.state.selectedCurrency +
													'"'
												}
												subTitle="You haven't made any transactions using this currency, select another currency from the list."
											/>
										</Flex>
									)}
							</Flex>
						</Flex>
					)}
			</AppBody>
		);
	}

	updateTableHeight() {
		if (!this.tableDomNode) {
			return;
		}

		setTimeout(() => {
			this.setState({ height: Math.max(this.tableDomNode.offsetHeight, 200) }, () => {
				window.dispatchEvent(new Event('resize'));
			});
		}, 400);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.balances.length > 0 && this.state.selectedCurrency === null) {
			this.setState({ selectedCurrency: nextProps.balances[0].Symbol });
		}
	}

	componentDidUpdate(prevProps) {
		if (
			(!this.state.height && this.tableDomNode) ||
			(this.props.balances.length > 0 && this.props.transactions !== prevProps.transactions)
		) {
			this.updateTableHeight();
		}
	}

	componentDidMount() {
		this.props.balancesLoad(this.props.user);
		this.props.transactionsLoad(this.props.user);

		this.updateTableHeight();
	}
}

Funds = connect(mapStateToProps, mapDispatchToProps)(Funds);

export default Funds;
