/**
 * Created by sumragen on 3/18/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Schedule.DayController', [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'currentSchedule',
        'moment',
        'date',
        '$filter',
        function ($scope, $rootScope, $uibModalInstance, currentSchedule, moment, date, $filter) {
            var self = this;

            self.close = function () {
                $uibModalInstance.close();
            };

            var selectedDate = moment(date).format('dddd');
            var selectedDay = $filter('date')(selectedDate, 'dddd');

            for (i = 0; i < currentSchedule.days.length; i++) {
                if (selectedDay === currentSchedule.days[i].name) {
                    self.currentDay = currentSchedule.days[i];
                    return;
                }
            }
            self.currentDay = {dayOff: 'day off'};
        }
    ]);
});