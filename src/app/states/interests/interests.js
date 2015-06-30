'use strict';

import InterestsController from './interests.controller';
import interestsRoute from './interests.route';
import editorDirective from './editor.directive';
import editorsListDirective from './editors.list.directive';

export default angular.module('interests', [])
    .config(interestsRoute)
    .directive('editor', editorDirective)
    .directive('editorsList', editorsListDirective)
    .controller('InterestsController', InterestsController);