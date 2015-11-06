'use strict';

let angularInstance = undefined;

export default angularInstance;

export function setAngularInstance(angular) {
    angularInstance = angular;
}