/**
 * Created by sumragen on 4/9/16.
 */
define(['../module'], function (module) {
    'use strict';
    module.directive('sDateTimePicker', [
        'moment',
        function (moment) {
            return {
                restrict: 'A',
                require: '^ngModel',
                link: function ($scope, element, attrs, ngModelController) {
                    $('div.date').datetimepicker({
                        defaultDate: attrs['sDateTimePicker'],
                        format: 'LLL'
                    }).on('dp.change', function (e) {
                        ngModelController.$setViewValue(moment(new Date(e.date)).format('LLL'));
                        ngModelController.$commitViewValue();
                    });

                }
            }
        }
    ]);
});