'use strict';

import autoFocus from './autofocus.directive';
import onEnter from './onenter.directive';
import deleteItem from './delete.item.directive';
import errorBlock from './error.block.directive';
import autoHeight from './autoheight.directive';

export default angular.module('directives', [])
    .directive('autoFocus', autoFocus)
    .directive('deleteItem', deleteItem)
    .directive('errorBlock', errorBlock)
    .directive('autoHeight', autoHeight)
    .directive('onEnter', onEnter);