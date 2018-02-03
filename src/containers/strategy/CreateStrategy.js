import React, { Component } from 'react';

import AppBody from '../../components/app/AppBody';

import StrategySidebar from './StrategySidebar';
import StrategyTree from './StrategyTree';

class CreateStrategy extends Component {
    render () {
        return (
            <AppBody flexDirection="row" padding="0">
                <StrategyTree />
                <StrategySidebar />
            </AppBody>
        );
    }
}

export default CreateStrategy;
