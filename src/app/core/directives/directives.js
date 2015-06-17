'use strict';

import autoFocus from './autofocus.directive';
import onEnter from './onenter.directive';
import deleteItem from './delete.item.directive';

export default angular.module('directives', [])
    .directive('autoFocus', autoFocus)
    .directive('deleteItem', deleteItem)
    .directive('onEnter', onEnter);