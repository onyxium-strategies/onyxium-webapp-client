export default {
	type: 'conditions',
	conditions: [
		{
			conditionType: 'percentage-increase',
			baseCurrency: 'ETH',
			quoteCurrency: 'OMG',
			timeframeInMS: 3600,
			metric: 'price',
			value: 20
		},
		{
			conditionType: 'absolute-increase',
			baseCurrency: 'ETH',
			quoteCurrency: 'OMG',
			timeframeInMS: 7200,
			value: 5
		}
	],
	then: {
		type: 'order',
		orderType: 'limit-buy',
		orderValueType: 'absolute',
		baseCurrency: 'ETH',
		quoteCurrency: 'OMG',
		quantity: 100,
		value: 0.012
	},
	else: {
		type: 'conditions',
		conditions: [
			{
				conditionType: 'absolute-above',
				baseCurrency: 'ETH',
				quoteCurrency: 'OMG',
				metric: 'price',
				value: .02
			}
		],
		then: {
			type: 'order',
			orderType: 'limit-sell',
			orderValueType: 'relative',
			orderValueRelativeMetric: 'price',
			baseCurrency: 'ETH',
			quoteCurrency: 'OMG',
			value: -0.001
		},
		else: null
	}
};
