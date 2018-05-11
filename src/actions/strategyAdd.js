export default function strategyAdd(name, strategy) {
	if (!name || !strategy) {
		return;
	}

	return {
		type: 'STRATEGY_ADD',
		name,
		strategy
	};
}
