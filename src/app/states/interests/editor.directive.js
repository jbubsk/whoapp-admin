'use strict';

function editorDirective(InterestsService, $log) {
    return {
        restrict: 'A',
        scope: {
            model: '='
        },
        require: '^editorsList',
        template: '<div>' +
        '<span ng-if="mode === \'view\'" ng-bind="model.name"></span>' +
        '<div ng-if="mode === \'edit\'">' +
        '<input id="editor" type="text" ng-model="model.name">' +
        '<a id="editor-button" class="button tiny" ng-click="update(model)">ok</a>' +
        '</div>' +
        '</div>',
        link: function (scope, element, attrs, editorsListController) {
            var xhrRequested = false,
                name = scope.model.name;

            scope.$on('clicked', () => {
                scope.model.name = name;
                scope.mode = 'view';
            });

            element.on('click', 'span', () => {
                editorsListController.broadcast();
                scope.$apply(function () {
                    scope.mode = 'edit';
                });
            });

            scope.mode = 'view';

            scope.update = function () {
                if (!xhrRequested) {
                    var $div = element.find('div');
                    xhrRequested = true;
                    $div.css({opacity: '.3'});
                    InterestsService.update(scope.model).then(
                        () => {
                            xhrRequested = false;
                            $div.css({opacity: '1'});
                            name = scope.model.name;
                            scope.mode = 'view';
                        },
                        (errCode) => {
                            xhrRequested = false;
                            $div.css({opacity: '1'});
                            $log.debug('During update is occurred error: ' + errCode);
                        }
                    );
                }
            };

        }
    };
}
editorDirective.$inject = ['InterestsService', '$log'];

export default editorDirective;