import React from 'react';

import Flex from '../flex/Flex';

const FormFields = ({ children, padding }) => (
	<Flex
		applyCss={{ width: '100%' }}
		flexDirection="column"
		padding={padding}
		spaceVertical="1rem"
	>
		{children}
	</Flex>
);

export default FormFields;
