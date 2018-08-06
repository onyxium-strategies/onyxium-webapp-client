// TODO: date and id should come from the backend, for now just use some stubbed stuff while
// working with data in memory
const dateLocalizationOptions = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric'
};

let id = 0;

export default function strategyAdd(name, strategy) {
	if (!name || !strategy) {
		return;
	}

	return {
		type: 'STRATEGY_ADD',
		id: id++,
		date: new Date().toLocaleString(dateLocalizationOptions),
		name,
		status: 'stopped',
		strategy
	};
}
