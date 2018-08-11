import React, { Component } from 'react';
import { Line as LineChart } from 'react-chartjs';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import { AppBody, Block, Flex } from '../../components';

const funds = [
	{ currency: 'BTC', value: 2000 },
	{ currency: 'LTC', value: 1000 },
	{ currency: 'ETH', value: 1250 },
	{ currency: 'OMG', value: 1500 }
];

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
		return (
			<AppBody>
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
									{funds.map(fund => (
										<TableRow key={fund.currency}>
											<TableCell scope="row">{fund.currency}</TableCell>

											<TableCell numeric>{fund.value}</TableCell>
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
			</AppBody>
		);
	}

	componentDidMount() {
		this.setState({ height: Math.max(this.tableDomNode.offsetHeight, 200) });
	}
}

export default Funds;
