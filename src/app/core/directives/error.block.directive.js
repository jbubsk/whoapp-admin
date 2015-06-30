function errorBlock() {
    return {
        restrict: 'EA',
        replace: true,
        template: '<div class="error-block" ' +
        'ng-if="ctrl.errorMessage.length > 0"' +
        'ng-click="ctrl.hideError()">' +
        '<span ng-bind="ctrl.errorMessage"/>' +
        '</div>',
        compile: function (element, attributes) {
            if (attributes['border'] === 'no' || attributes['border'] === 'false') {
                element.addClass('error-msg');
            }
        }
    }
}

export default errorBlock;