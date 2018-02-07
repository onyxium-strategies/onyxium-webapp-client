export default [
	{
		type: 'conditions',
		priority: 0,
		conditions: [
			{
				conditionType: 'percentage-increase',
				baseCurrency: 'ETH',
				quoteCurrency: 'OMG',
				timeframeInMS: 3600000,
				baseMetric: 'price',
				value: 20
			}
		],
		action: {
			type: 'order',
			orderType: 'limit-buy',
			orderValueType: 'absolute',
			baseCurrency: 'ETH',
			quoteCurrency: 'OMG',
			quantity: 100,
			value: 0.012,
		},
		then: [
			{
				type: 'conditions',
				priority: 0,
				conditions: [
					{
						conditionType: 'percentage-increase',
						baseCurrency: 'ETH',
						quoteCurrency: 'OMG',
						timeframeInMS: 3600000,
						baseMetric: 'price',
						value: 20
					},
					{
						conditionType: 'percentage-increase',
						baseCurrency: 'ETH',
						quoteCurrency: 'OMG',
						timeframeInMS: 3600000,
						baseMetric: 'price',
						quoteMetric: 'boilinger-band-upper-bound',
						value: 20
					}
				],
				action: {
					type: 'order',
					orderType: 'limit-buy',
					orderValueType: 'absolute',
					baseCurrency: 'ETH',
					quoteCurrency: 'OMG',
					quantity: 100,
					value: 0.012,
				}
			},
			{
				type: 'conditions',
				priority: 1,
				conditions: [
					{
						conditionType: 'absolute-increase',
						baseCurrency: 'ETH',
						quoteCurrency: 'OMG',
						timeframeInMS: 7200000,
						baseMetric: 'rsi',
						value: 5
					}
				],
				action: {
					type: 'order',
					orderType: 'limit-sell',
					orderValueType: 'absolute',
					baseCurrency: 'ETH',
					quoteCurrency: 'OMG',
					quantity: 100,
					value: 0.012
				}
			}
		]
	},
	{
		type: 'conditions',
		priority: 1,
		conditions: [
			{
				conditionType: 'absolute-increase',
				baseCurrency: 'ETH',
				quoteCurrency: 'OMG',
				timeframeInMS: 7200000,
				baseMetric: 'rsi',
				value: 5
			}
		],
		action: {
			type: 'order',
			orderType: 'limit-buy',
			orderValueType: 'absolute',
			baseCurrency: 'ETH',
			quoteCurrency: 'OMG',
			quantity: 100,
			value: 0.012
		}
	},
	{
		type: 'conditions',
		priority: 2,
		conditions: [
			{
				conditionType: 'absolute-decrease',
				baseCurrency: 'ETH',
				quoteCurrency: 'OMG',
				timeframeInMS: 7200000,
				baseMetric: 'rsi',
				value: 10
			}
		],
		action: {
			type: 'order',
			orderType: 'limit-sell',
			orderValueType: 'absolute',
			baseCurrency: 'ETH',
			quoteCurrency: 'OMG',
			quantity: 100,
			value: 0.012
		}
	}
];
