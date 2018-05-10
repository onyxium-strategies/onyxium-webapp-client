import { orderTypes } from '../data';

const allowedOrderTypeValues = orderTypes.map(orderType => orderType.value);

export default function validateAction(action, allowedCurrencyValues) {
	const validationByFieldName = {};

	if (!action.baseCurrency) {
		validationByFieldName['baseCurrency'] = 'Base currency is required';
	} else if (!allowedCurrencyValues.includes(action.baseCurrency)) {
		validationByFieldName['baseCurrency'] = 'Base currency should be one of the allowed values';
	}

	if (!action.orderType) {
		validationByFieldName['orderType'] = 'Order type is required';
	} else if (!allowedOrderTypeValues.includes(action.orderType)) {
		validationByFieldName['orderType'] = 'Order type should be one of the allowed values';
	}

	if (!action.quantity && action.quantity !== 0) {
		validationByFieldName['quantity'] = 'Quantity is required';
	} else if (action.quantity <= 0) {
		validationByFieldName['quantity'] = 'Quantity should be greater than 0';
	}

	if (!action.quoteCurrency) {
		validationByFieldName['quoteCurrency'] = 'Quote currency is required';
	} else if (!allowedCurrencyValues.includes(action.quoteCurrency)) {
		validationByFieldName['quoteCurrency'] =
			'Quote currency should be one of the allowed values';
	}

	if (!action.value && action.value !== 0) {
		validationByFieldName['value'] = 'Value is required';
	} else if (action.value <= 0) {
		validationByFieldName['value'] = 'Value should be greater than 0';
	}

	return Object.keys(validationByFieldName).length > 0 ? validationByFieldName : null;
}
