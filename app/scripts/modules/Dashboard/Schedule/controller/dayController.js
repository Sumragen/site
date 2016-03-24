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
        'Dashboard.Schedule.ScheduleService',
        function ($scope, $rootScope, $uibModalInstance, currentSchedule, moment, date, $filter, scheduleService) {
            var self = this;

            self.close = function () {
                $uibModalInstance.close();
            };

            //var selectedDate = moment(date).format('dddd');
            var selectedDay = $filter('date')(moment(date).format('dddd'), 'dddd');


            var tempSchedule = currentSchedule.objects.schedule;
            for (i = 0; i < tempSchedule.length; i++) {
                if (selectedDay === tempSchedule[i].name) {
                    self.currentDay = scheduleService.parseLessons(tempSchedule[i]);
                    return;
                }
            }
            self.currentDay = {dayOff: 'day off'};
        }
    ]);
});