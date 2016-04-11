/**
 * Created by sumragen on 4/9/16.
 */
define(['../module', 'lodash'], function (module, _) {
    'use strict';
    module.directive('sDateTimePicker', [
        'moment',
        function (moment) {
            return {
                restrict: 'A',
                require: '^ngModel',
                link: function ($scope, element, attrs, ngModelController) {
                    $scope.form.$options = $scope.form.$options || {format: 'LLL'};
                    $(element[0])
                        .parent()
                        .datetimepicker(_.merge($scope.form.$options, {defaultDate: ngModelController.$viewValue}))
                        .on('dp.change', function (e) {
                        ngModelController.$setViewValue(moment(new Date(e.date)).format('LLL'));
                        ngModelController.$commitViewValue();
                    });

                }
            }
        }
    ]);
});