export const conditionTypes = [
	{ label: 'Absolute increase within timeframe', value: 'absolute-increase' },
	{ label: 'Absolute decrease within timeframe', value: 'absolute-decrease' },
	{ label: 'Percentage increase within timeframe', value: 'percentage-increase' },
	{ label: 'Percentage decrease within timeframe', value: 'percentage-decrease' }
];

export const currencies = [
	{ label: 'Bitcoin (BTC)', value: 'BTC' },
	{ label: 'Ethereum (ETH)', value: 'ETH' },
	{ label: 'NEO (NEO)', value: 'NEO' },
	{ label: 'OmiseGO (OMG)', value: 'OMG' }
];

export const modifierByTimeframeUnit = {
	'm': 1000 * 60,
	'h': 1000 * 60 * 60,
	'd': 1000 * 60 * 60 * 24
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
