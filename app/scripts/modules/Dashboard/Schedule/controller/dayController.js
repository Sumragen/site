/**
 * Created by sumragen on 3/18/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Schedule.DayController', [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'currentSchedule',
        'moment',
        'date',
        '$filter',
        'Dashboard.Schedule.ScheduleDataService',
        function ($scope, $rootScope, $uibModalInstance, currentSchedule, moment, date, $filter, scheduleDataService) {
            var self = this;
            self.close = function () {
                $uibModalInstance.close();
            };

            var selectedDay = $filter('date')(moment(date).format('dddd'), 'dddd');

            var tempSchedule = currentSchedule.schedule;

            $scope.currentDay = {dayOff: 'day off'};

            _.each(tempSchedule, function (schedule) {
                if (selectedDay === schedule.name) {
                    $scope.currentDay = scheduleDataService.parse(schedule);
                }
            });

        }
    ]);
});