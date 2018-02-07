export default [
	{
		type: 'conditions',
		conditions: [
			{
				priority: 0,
				conditionType: 'percentage-increase',
				baseCurrency: 'ETH',
				quoteCurrency: 'OMG',
				timeframeInMS: 3600000,
				baseMetric: 'price',
				value: 20
			}
		],
		then: {
			type: 'order',
			orderType: 'limit-buy',
			orderValueType: 'absolute',
			baseCurrency: 'ETH',
			quoteCurrency: 'OMG',
			quantity: 100,
			value: 0.012,
			then: [
				{
					type: 'conditions',
					conditions: [
						{
							priority: 0,
							conditionType: 'percentage-increase',
							baseCurrency: 'ETH',
							quoteCurrency: 'OMG',
							timeframeInMS: 3600000,
							baseMetric: 'price',
							value: 20
						},
						{
							priority: 1,
							conditionType: 'percentage-increase',
							baseCurrency: 'ETH',
							quoteCurrency: 'OMG',
							timeframeInMS: 3600000,
							baseMetric: 'price',
							quoteMetric: 'boilinger-band-upper-bound',
							value: 20
						}
					],
					then: {
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
					conditions: [
						{
							priority: 1,
							conditionType: 'absolute-increase',
							baseCurrency: 'ETH',
							quoteCurrency: 'OMG',
							timeframeInMS: 7200000,
							baseMetric: 'rsi',
							value: 5
						}
					],
					then: {
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
		}
	},
	{
		type: 'conditions',
		conditions: [
			{
				priority: 1,
				conditionType: 'absolute-increase',
				baseCurrency: 'ETH',
				quoteCurrency: 'OMG',
				timeframeInMS: 7200000,
				baseMetric: 'rsi',
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
		}
	},
	{
		type: 'conditions',
		conditions: [
			{
				priority: 2,
				conditionType: 'absolute-decrease',
				baseCurrency: 'ETH',
				quoteCurrency: 'OMG',
				timeframeInMS: 7200000,
				baseMetric: 'rsi',
				value: 10
			}
		],
		then: [
			{
				type: 'order',
				orderType: 'limit-buy',
				orderValueType: 'absolute',
				baseCurrency: 'ETH',
				quoteCurrency: 'OMG',
				quantity: 100,
				value: 0.012
			},
			{
				type: 'order',
				orderType: 'limit-buy',
				orderValueType: 'absolute',
				baseCurrency: 'ETH',
				quoteCurrency: 'OMG',
				quantity: 100,
				value: 0.012
			}
		]
	}
];
