import angularInstance from './angularDefinition.es6';
import ComponentBuilder from './ComponentBuilder.es6';

export default class ModuleBuilder {
    constructor(moduleDefinition) {

        if(angularInstance.angular === undefined) {
            throw new Error('Angular Implementation has not been set for angular-module-builder, make sure to call setAngularInstance.');
        }

        this.name = moduleDefinition.name;
        this.module = this.buildModule(moduleDefinition);
        let componentBuilder = this.buildComponents(moduleDefinition);
        this.exports = componentBuilder.exports;
        this.filters = componentBuilder.filters;
        this.templates = {};

        Object.defineProperty(this.exports, '$templates', { get: () => this.templates });
    }

    buildModule(moduleDefinition) {
        let dependencies = moduleDefinition.getDependencyArray();
        this.dependencies = dependencies;
        return angularInstance. angular.module(this.name, this.dependencies.map(dependency => dependency.name));
    }

    buildComponents(moduleDefinition) {
        let componentBuilder = new ComponentBuilder(this.module);
        let keys = Object.keys(moduleDefinition.components);
        keys.forEach(componentKey => componentBuilder.addComponent(moduleDefinition.components[componentKey]));
        componentBuilder.buildExports();
        componentBuilder.runConfigurations();

        return componentBuilder;
    }
}