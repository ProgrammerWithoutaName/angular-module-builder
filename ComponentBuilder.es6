'use strict';
import componentTypes, {configurationComponents, injectableComponents} from './componentTypes.es6';

class ComponentBuilder {
    constructor(parentModule) {
        this.parentModule = parentModule;
        this.configurationComponents = [];
        this.exportComponents = new Map();
        this.exports = {};
        this.filters = {};
    }

    addComponent(componentDefinition) {
        if(configurationComponents.has(componentDefinition.type)) {
            this.configurationComponents.push(componentDefinition);
        } else {
            this.exportComponents.set(componentDefinition.name, componentDefinition);
        }
    }

    buildExports() {
        for(let component of this.exportComponents.values()) {
            this.runComponent(component);
            this.exports[component.codeName] = component.componentKey;
            if(component.type === componentTypes.filter) {
                this.filters[component.codeName] = component.componentKey;
            }
        }
    }

    runConfigurations() {
        this.configurationComponents.forEach(component => this.runComponent(component));
    }

    runComponent(component) {
        let injectArray = this.getComponentDependencyArray(component.dependencies);
        if(injectableComponents.has(component.type)) {
            component.implementation.$inject = injectArray;
        }

        switch(component.type) {
            case componentTypes.config: return this.parentModule.config(component.implementation);
            case componentTypes.run: return this.parentModule.run(component.implementation);
            case componentTypes.constant: return this.parentModule.constant(component.name, component.implementation);
            case componentTypes.value: return this.parentModule.value(component.name, component.implementation);
            case componentTypes.factory: return this.parentModule.factory(component.name, component.implementation);
            case componentTypes.service: return this.parentModule.service(component.name, component.implementation);
            case componentTypes.controller: return this.parentModule.controller(component.name, component.implementation);
            case componentTypes.filter: return this.parentModule.filter(component.name, component.implementation);
            case componentTypes.provider: return this.parentModule.provider(component.name, component.implementation);
            case componentTypes.directive: return this.parentModule.directive(component.name, component.implementation);
            case componentTypes.component: return this.parentModule.component(component.name, component.implementation);
        }
    }

    getComponentDependencyArray(dependencies) {
        let injectArray;
        if(dependencies) {
            injectArray = dependencies.map(dependency => this.getDependencyKey(dependency));
        }
        return injectArray;
    }

    getDependencyKey(dependency) {
        if (this.exportComponents.has(dependency)) {
            dependency = this.exportComponents.get(dependency).componentKey;
        } else if (dependency.componentKey) {
            dependency = dependency.componentKey;
        }

        return dependency;
    }
}

export default ComponentBuilder;
