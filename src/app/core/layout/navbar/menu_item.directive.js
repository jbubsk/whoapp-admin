'use strict';

function menuItemDirective($log) {

    return {
        restrict: 'E',
        require: '^navMenu',
        link: function (scope, element, attrs, navMenuController) {
            var item = {
                className: '',
                state: attrs.state,
                title: attrs.title
            };
            navMenuController.addMenuItem(item);
            $log.debug({'menuItemDirective linked':item});
        }
    };
}
menuItemDirective.$inject = ['$log'];
export default menuItemDirective;