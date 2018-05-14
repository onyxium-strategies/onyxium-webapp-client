import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import CreateStrategy from './CreateStrategy';

const mapStateToProps = ({ strategies }, { match }) => {
	const matchingStrategy = strategies.find(
		strategy => strategy.id.toString() === match.params.id
	);

	return {
		strategy: matchingStrategy ? matchingStrategy.strategy : null
	};
};

let ViewStrategy = ({ strategy }) => {
	if (strategy === null) {
		return <Redirect to="/strategies" />;
	}

	return <CreateStrategy strategy={strategy} />;
};

ViewStrategy = connect(mapStateToProps, null)(ViewStrategy);
ViewStrategy = withRouter(ViewStrategy);

export default ViewStrategy;
