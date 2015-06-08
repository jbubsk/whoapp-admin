"use strict";

import socket from '../../common/socket';

function cityLoadDirective($log) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            var $optionsBlock = $('<div class="db-dropdown"></div>'),
                $parentElement = element.parent();

            function drawOptions(items) {
                var $option = $('.db-dropdown');

                angular.forEach(items, function (value, key) {
                    var option = '' +
                        '<div class="db-dropdown-option">' +
                        '<div class="db-dropdown-option-name">' +
                        '<span class="db-dropdown-option-text">' + value.name_ru + '</span>' +
                        '</div>' +
                        '<div class="db-dropdown-option-district">' +
                        '<span class="db-dropdown-option-text">' + value.district_ru + '</span>' +
                        '</div>' +
                        '<div class="db-dropdown-option-value" style="display: none">' + value.id + '</div>' +
                        '</div>' +
                        '</hr>' +
                        '';
                    $option.append(option);
                });
            }

            $parentElement.append($optionsBlock);

            $optionsBlock.hide();

            $optionsBlock.on('click', function (e) {
                var $element = $(e.target),
                    name = '', id;

                if ($element.hasClass('db-dropdown-option-name')) {
                    name = $element.find('span').html();
                }
                if ($element.hasClass('db-dropdown-option-district')) {
                    name = $element.parent().find('.db-dropdown-option-name > span').html();
                }
                if ($element.hasClass('db-dropdown-option-text')) {
                    name = $element.parents('.db-dropdown-option').find('.db-dropdown-option-name > span').html();
                }
                id = $element.parents('.db-dropdown-option').find('.db-dropdown-option-value').html();

                scope.ctrl.cityEditorDisabled = true;
                scope.ctrl.model.cityId = parseInt(id, 10);
                ngModel.$setViewValue(name);
                ngModel.$render();
                e.stopPropagation();
                $(this).hide();
            });

            $('html').on('click', function () {
                $optionsBlock.hide();
            });

            socket.on('cityFound', function (result) {
                if (angular.isArray(result) && result.length > 0) {
                    $optionsBlock.empty();
                    $optionsBlock.append(drawOptions(result));
                    $optionsBlock.show();
                }
            });

            scope.$watch(
                function () {
                    return ngModel.$modelValue;
                }, function (newValue, oldValue) {
                    if (!scope.ctrl.cityEditorDisabled) {
                        if (newValue !== oldValue) {
                            if (newValue.length > 0) {
                                socket.emit("findCity", newValue);
                            } else {
                                $optionsBlock.empty();
                                $optionsBlock.hide();
                            }
                        }
                    }
                });

        }
    }
}
cityLoadDirective.$inject = ['$log'];

export default cityLoadDirective;