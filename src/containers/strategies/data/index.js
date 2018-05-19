export const conditionTypes = [
	{ label: 'Greater than or equal to', value: 'greater-than-or-equal-to' },
	{ label: 'Less than or equal to', value: 'less-than-or-equal-to' },
	{ label: 'Percentage increase within timeframe', value: 'percentage-increase' },
	{ label: 'Percentage decrease within timeframe', value: 'percentage-decrease' }
];

export const conditionTypesWithTimeframe = ['percentage-increase', 'percentage-decrease'];

export const currencies = [
	{ label: 'Bitcoin (BTC)', value: 'BTC' },
	{ label: 'Ethereum (ETH)', value: 'ETH' },
	{ label: 'NEO (NEO)', value: 'NEO' },
	{ label: 'OmiseGO (OMG)', value: 'OMG' }
];

export const metrics = [
	{ label: 'Price (ask)', value: 'price-ask' },
	{ label: 'Price (bid)', value: 'price-bid' },
	{ label: 'Price (last)', value: 'price-last' },
	{ label: 'Volume', value: 'volume' }
];

export const modifierByTimeframeUnit = {
	m: 1000 * 60,
	h: 1000 * 60 * 60,
	d: 1000 * 60 * 60 * 24
};

export const orderTypes = [
	{ label: 'Limit buy', value: 'limit-buy' },
	{ label: 'Limit sell', value: 'limit-sell' }
];

export const timeframeUnits = [
	{ label: 'Minutes', value: 'm' },
	{ label: 'Hours', value: 'h' },
	{ label: 'Days', value: 'd' }
];
