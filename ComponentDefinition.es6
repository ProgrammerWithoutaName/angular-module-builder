'use strict';
import componentTypes from './componentTypes.es6';

export default class ComponentDefinition {
    constructor(parentModuleDefinition, name) {
        this.parentModuleDefinition = parentModuleDefinition;
        this.name = name;
        this._codeName = undefined;
        this.type = undefined;
    }

    get componentTypes() { return componentTypes; }

    static getCodeName(componentName) {
        let codeNameArray = componentName.split(/[\.`~!@#%^&\*\-\+]/gi);
        codeNameArray = codeNameArray.map( (section, index) => {
            if(index > 0) {
                section = capitalizeFirstLetter(section);
            }
            return section;
        });
        return codeNameArray.join('');
    }

    get codeName() { return this._codeName || ComponentDefinition.getCodeName(this.name); }
    set codeName(name) { this._codeName = name;}

    get componentKey() {
        if(this.type === undefined) {
            throw new Error(`component ${this.name} of module ${this.parentModuleDefinition.name} does not have it's type defined.`);
        }

        switch(this.type) {
            case componentTypes.provider: return this.name + 'Provider';
            case componentTypes.filter: return this.name + 'Filter';
            case componentTypes.run: return undefined;
            case componentTypes.config: return undefined;
            default: return this.name
        }
    }
}

function capitalizeFirstLetter(stringValue) {
    return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
}