export const baseCurrency = {
	label: 'Base',
	validate: value => {
		if (!value) {
			return 'Base currency is required';
		}

		return null;
	}
};

export const baseMetric = {
	label: 'Base metric',
	validate: value => {
		if (!value) {
			return 'Metric is required';
		}

		return null;
	}
};

export const conditionType = {
	label: 'Condition type',
	validate: value => {
		if (!value) {
			return 'Condition type is required';
		}

		return null;
	}
};

export const orderType = {
	label: 'Order type',
	validate: value => {
		if (!value) {
			return 'Order type is required';
		}

		return null;
	}
};

export const quantity = {
	label: 'Quantity',
	validate: value => {
		if (!value && value !== 0) {
			return 'Quantity is required';
		}

		if (value <= 0) {
			return 'Quantity should be greater than 0';
		}

		return null;
	}
};

export const quoteCurrency = {
	label: 'Quote',
	validate: value => {
		if (!value) {
			return 'Quote currency is required';
		}

		return null;
	}
};

export const timeframeInMS = {
	label: 'Timeframe',
	validate: value => {
		if (value <= 0) {
			return 'Timeframe should be greater than 0';
		}

		return null;
	}
};

export const timeframeUnit = {
	defaultValue: 'h',
	label: 'Unit',
	validate: _value => null
};

export const value = {
	label: 'Value',
	validate: value => {
		if (!value && value !== 0) {
			return 'Value is required';
		}

		if (value <= 0) {
			return 'Value should be greater than 0';
		}

		return null;
	}
};
