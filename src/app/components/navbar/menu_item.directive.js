"use strict";

function menuItemDirective() {

    return {
        restrict: 'E',
        require: '^navMenu',
        link: function (scope, element, attrs, navMenuController) {
            navMenuController.addMenuItem({
                className: '',
                state: attrs.state,
                title: attrs.title
            });
        }
    }

}

export default menuItemDirective;