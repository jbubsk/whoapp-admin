'use strict';

function deleteItemDirective($injector) {
    return {
        restrict: 'A',
        replace: true,
        template: '<div class="delete-item"><img/></div>',
        link: function (scope, element, attributes) {
            var id = scope.item.id,
                service = $injector.get(attributes.service),
                images = $injector.get('IMAGES'),
                logger = $injector.get('$log'),
                $img = element.find('img');

            $img.attr('src', images.delete);
            $img.one('click', function (event) {

                $img.attr('src', images.loader);
                service.remove(id).then(
                    (data) => {
                        logger.debug(data);
                        angular.forEach(scope.ctrl.collection, function (value, key) {
                            if (value.id === id) {
                                scope.ctrl.collection.splice(key, 1);
                                if (typeof scope.ctrl._checkEmpty === 'function') {
                                    scope.ctrl._checkEmpty();
                                }
                            }
                        });
                    },
                    (err) => {
                        $img.attr('src', images.delete);
                        scope.ctrl.handleError(err);
                        logger.debug(err);
                    });
                event.stopPropagation();
            });
        }
    };
}
deleteItemDirective.$inject = ['$injector'];

export default deleteItemDirective;