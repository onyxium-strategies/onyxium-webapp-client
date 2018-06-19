import React from 'react';

import { FormField, FormFields, SelectField } from '../../../../components';

import { conditionTypes } from '../../../strategies/data';

import { conditionType } from './schemaProperties';

export const emptyConditionSchema = {
	conditionType
};

const EmptyConditionFields = ({ fields, isReadOnly, validation }) => (
	<FormFields>
		<FormField {...validation.conditionType}>
			<SelectField {...fields.conditionType} disabled={isReadOnly} items={conditionTypes} />
		</FormField>
	</FormFields>
);

export default EmptyConditionFields;
