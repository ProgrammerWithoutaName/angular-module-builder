'use strict';

var setAngularInstance = require('./angularDefinition.es6').setAngularInstance;
var componentTypes = require('./componentTypes.es6').default;
var ModuleDefinition = require('./ModuleDefinition.es6').default;
var ModuleBuilder = require('./ModuleBuilder.es6').default;

module.exports = {
    default: {
        setAngularInstance: setAngularInstance,
        componentTypes: componentTypes,
        ModuleDefinition: ModuleDefinition,
        ModuleBuilder: ModuleBuilder
    }
};