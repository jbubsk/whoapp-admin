"use strict";

import autoFocus from './autofocus.directive';
import onEnter from './onenter.directive';
import deleteItem from './delete.item.directive';

var ModuleName = 'directives';

angular.module(ModuleName, [])
    .directive('autoFocus', autoFocus)
    .directive('deleteItem', deleteItem)
    .directive('onEnter', onEnter);

export default ModuleName;