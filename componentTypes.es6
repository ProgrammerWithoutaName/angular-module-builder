'use strict';

const componentTypes = {
    constant: 'constant',
    value: 'value',
    config: 'config',
    run: 'run',
    factory: 'factory',
    service: 'service',
    controller: 'controller',
    filter: 'filter',
    provider: 'provider',
    directive: 'directive',
    component: 'component'
};

export default componentTypes;

export const injectableComponents = new Set([
    componentTypes.config,
    componentTypes.run,
    componentTypes.factory,
    componentTypes.service,
    componentTypes.controller,
    componentTypes.filter,
    componentTypes.provider,
    componentTypes.directive,
    componentTypes.component
]);

export const configurationComponents = new Set([
    componentTypes.config,
    componentTypes.run
]);
