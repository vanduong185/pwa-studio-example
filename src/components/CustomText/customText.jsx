import React from 'react';
import configAggregator from './configAggregator';

const CustomText = props => {
    return <span>Custom Text</span>;
};

export default {
    name: 'text', // this name must match with the data-content-type
    configAggregator,
    component: CustomText
};
