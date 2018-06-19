import React from 'react';

import { Form } from '../../../components';

import { actionSpec } from './fields';

const StrategyFormAction = ({ action, actionValidation, isReadOnly, onChange }) => (
	<Form
		schema={actionSpec.schema}
		onChange={onChange}
		valueByName={action}
		validationByName={actionValidation}
	>
		{({ fields, validation }) =>
			actionSpec.fieldsComponent({ action, isReadOnly, fields, validation })
		}
	</Form>
);

export default StrategyFormAction;
