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
        'Dashboard.Schedule.ScheduleService',
        function ($scope, $rootScope, $uibModalInstance, currentSchedule, moment, date, $filter, scheduleService) {
            var self = this;
            self.close = function () {
                $uibModalInstance.close();
            };

            var selectedDay = $filter('date')(moment(date).format('dddd'), 'dddd');

            var tempSchedule = currentSchedule.objects.schedule;

            $scope.currentDay = {dayOff: 'day off'};

            _.each(tempSchedule, function (schedule) {
                if (selectedDay === schedule.name) {
                    $scope.currentDay = scheduleService.parseLessons(schedule);
                }
            });

        }
    ]);
});