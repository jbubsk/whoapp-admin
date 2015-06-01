"use strict";

function autoFocus() {
    return {
        restrict: 'A',
        link(scope, element)        {
            element.focus();
        }
    }
}

export default autoFocus;