'use strict';

import LayoutController from './layout.controller';
import navbarModule from './navbar/navbar';

export default angular.module('layout', [navbarModule.name])
    .controller('LayoutController', LayoutController);
