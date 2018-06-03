import React from 'react';

import { FormControl, FormHelperText } from 'material-ui';

const FormField = ({ children, validationMessage }) => (
	<FormControl error={!!validationMessage} fullWidth>
		{children}

		{validationMessage && <FormHelperText>{validationMessage}</FormHelperText>}
	</FormControl>
);

export default FormField;
