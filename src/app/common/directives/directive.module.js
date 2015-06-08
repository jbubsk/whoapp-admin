"use strict";

import autoFocus from './autofocus.directive';
import onEnter from './onenter.directive';

var ModuleName = 'directives';

angular.module(ModuleName, [])
    .directive('autoFocus', autoFocus)
    .directive('onEnter', onEnter);

export default ModuleName;