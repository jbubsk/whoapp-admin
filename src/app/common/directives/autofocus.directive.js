"use strict";

function autoFocus() {
    return {
        restrict: 'A',
        link    : function (scope, element) {
            element.focus();
        }
    }
}

export default autoFocus;