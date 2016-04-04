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
            $scope.busy = true;

            self.close = function () {
                $uibModalInstance.close();
            };

            var selectedDay = $filter('date')(moment(date).format('dddd'), 'dddd');

            var tempSchedule = currentSchedule.objects.schedule;

            for (i = 0; i < tempSchedule.length; i++) {
                if (selectedDay === tempSchedule[i].name) {
                    $scope.currentDay = scheduleService.parseLessons(tempSchedule[i]);
                    $scope.busy = false;
                    return;
                }
            }
            $scope.currentDay = {dayOff: 'day off'};
        }
    ]);
});