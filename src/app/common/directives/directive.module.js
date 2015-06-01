"use strict";

import autoFocus from './autofocus.directive';

var ModuleName = 'directives';

angular.module(ModuleName, [])
    .directive('autoFocus', autoFocus);

export default ModuleName;