import React from 'react';

import { Form } from '../../../components';

import { actionSpec } from './fields';

const StrategyFormAction = ({ action, actionValidation, onChange }) => (
	<Form
		schema={actionSpec.schema}
		onChange={onChange}
		valueByName={action}
		validationByName={actionValidation}
	>
		{({ fields, validation }) => actionSpec.fieldsComponent({ action, fields, validation })}
	</Form>
);

export default StrategyFormAction;
