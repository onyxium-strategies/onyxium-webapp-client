import testStrategy from '../test-data/strategy.json';

export default function strategiesLoad() {
	return {
		type: 'STRATEGIES_LOAD',
		promise: new Promise(resolve => {
			// Stub code, TODO: make a real API call
			setTimeout(() => {
				resolve([
					{
						date: new Date().toLocaleString(),
						id: 'test',
						name: 'Test',
						state: '19eeec10-901d-4e54-92fc-d1f2c08b16c1',
						status: 'running',
						strategy: testStrategy
					}
				]);
			}, Math.round(Math.max(500, Math.random() * 3000)));
		})
	};
}
