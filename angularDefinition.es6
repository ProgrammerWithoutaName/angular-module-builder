'use strict';
let angular = undefined;
let angularInstance = {
    get angular() { return angular; }
};

export function setAngularInstance(angularImplementation) {
    angular = angularImplementation;
}

export default angularInstance;