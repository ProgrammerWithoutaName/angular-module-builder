'use strict';
import ComponentDefinition from './ComponentDefinition.es6';

export default class ModuleDefinition {
    constructor(name) {
        this.name = name;
        this.imports = {};
        this.components = {};
    }

    setDependencies(dependencies) {
        this.dependencies = dependencies;
        let keys = Object.keys(this.dependencies);
        keys.forEach(key => {
            this.imports[key] = this.dependencies[key].exports;
        });
    }

    setComponents(components) {
        let keys = Object.keys(components);
        components.forEach(componentCodeName => {
            let component = new ComponentDefinition(this, components[componentCodeName]);
            component.codeName = componentCodeName;
            this.components[componentCodeName] = component;
        });
    }

    getDependencyArray() {
        let keys = Object.keys(this.dependencies);
        return keys.map(key => this.dependencies[key]);
    }
}