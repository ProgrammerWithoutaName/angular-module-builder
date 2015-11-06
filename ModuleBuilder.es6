import angular from './angularDefinition.es6';
import ComponentBuilder from './ComponentBuilder.es6';

export default class ModuleBuilder {
    constructor(moduleDefinition) {
        if(angular === undefined) {
            throw new Error('Angular Implementation has not been set for angular-module-builder, make sure to call setAngularInstance.');
        }

        this.name = moduleDefinition.name;
        this.module = this.buildModule();
        let componentBuilder = this.buildComponents(moduleDefinition);
        this.exports = componentBuilder.exports;
        this.filters = componentBuilder.filters;
        this.templates = {};
    }

    buildModule(moduleDefinition) {
        let dependencies = moduleDefinition.getDependencyArray();
        return angular.module(this.name, this.dependencies.map(dependency => dependency.name));
    }

    buildComponents(moduleDefinition) {
        let componentBuilder = new ComponentBuilder(this.module);
        let keys = Object.keys(moduleDefinition.components);
        keys.forEach(componentDefinition => componentBuilder.addComponent(componentDefinition));
        componentBuilder.buildExports();
        componentBuilder.runConfigurations();

        return componentBuilder;
    }
}