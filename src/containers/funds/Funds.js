import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line as LineChart } from 'react-chartjs';
import {
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from '@material-ui/core';

import { balancesLoad } from '../../actions';
import { AppBody, Block, Flex, StateMessage } from '../../components';

const mapStateToProps = ({ balances, user }) => ({
	balances: balances.data,
	isErrored: balances.isErrored,
	isLoading: balances.isLoading,
	user: user.data
});
const mapDispatchToProps = { balancesLoad };

var lineChartData = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			label: 'My First dataset',
			fillColor: 'rgba(220,220,220,0.2)',
			strokeColor: 'rgba(220,220,220,1)',
			pointColor: 'rgba(220,220,220,1)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(220,220,220,1)',
			data: [65, 59, 80, 81, 56, 55, 40]
		},
		{
			label: 'My Second dataset',
			fillColor: 'rgba(151,187,205,0.2)',
			strokeColor: 'rgba(151,187,205,1)',
			pointColor: 'rgba(151,187,205,1)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(151,187,205,1)',
			data: [28, 48, 40, 19, 86, 27, 90]
		}
	]
};

class Funds extends Component {
	state = {
		height: null
	};

	tableDomNode = null;

	handleTableRef = domNode => {
		this.tableDomNode = domNode;
	};

	render() {
		const { balances, isErrored, isLoading } = this.props;

		const isLoaded = !isErrored && !isLoading;

		return (
			<AppBody>
				{isErrored && (
					<Flex alignItems="center" flex="1" justifyContent="center">
						<StateMessage
							icon="error"
							title="Error loading funds"
							subTitle="An error occurred while loading your funds"
						/>
					</Flex>
				)}

				{isLoading &&
					!isErrored && (
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
												<TableRow key={balance.Id}>
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

							<Block flex="2">
								{this.state.height !== null && (
									<LineChart
										data={lineChartData}
										height={this.state.height}
										options={{ maintainAspectRatio: false, responsive: true }}
									/>
								)}
							</Block>
						</Flex>
					)}
			</AppBody>
		);
	}

	updateTableHeight() {
		this.setState({ height: Math.max(this.tableDomNode.offsetHeight, 200) });
	}

	componentDidUpdate(prevProps) {
		if (this.props.balances.length !== prevProps.balances.length) {
			this.updateTableHeight();
		}
	}

	componentDidMount() {
		this.props.balancesLoad(this.props.user);

		if (this.tableDomNode) {
			this.updateTableHeight();
		}
	}
}

Funds = connect(mapStateToProps, mapDispatchToProps)(Funds);

export default Funds;
