'use strict';

function autoHeight($injector) {
    return {
        link: function (scope, element) {
            var window = angular.element($injector.get('$window')),
                height = window.height() - 150;

            element.css({height: height + 'px'});

            window.on('resize', function () {
                element.css({height: height + 'px'});
            });
        }
    };
}
autoHeight.$inject = ['$injector'];

export default autoHeight;