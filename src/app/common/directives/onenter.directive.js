"use strict";

function onEnter() {
    return {
        restrict: 'A',
        scope   : {
            onEnter: '&'
        },
        link    : function (scope, element) {
            element.on('keypress', function (e) {
                var charCode = e.charCode || e.keyCode || e.which;
                if (charCode === 13) {
                    scope.onEnter();
                }
            });
        }
    }
}

export default onEnter;