/**
 * Created by sumragen on 3/18/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Schedule.DayController', [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'currentSchedule',
        'Dashboard.Schedule.ScheduleService',
        function ($scope, $rootScope, $uibModalInstance, currentSchedule, scheduleService) {
            var self = this;

            self.close = function () {
                $uibModalInstance.close();
            };

            var selectedDate = moment(date).format('dddd');
            var selectedDay = $filter('date')(selectedDate, 'dddd');

            var scheduleData = currentSchedule.data.schedule;
            for (i = 0; i < scheduleData.days.length; i++) {
                if (selectedDay === scheduleData.days[i].name) {
                    self.currentDay = scheduleData.days[i];
                    return;
                }
            }

            //var scheduleData = scheduleService.loadSchedule();
            self.currentDay = {dayOff: 'day off'};
        }
    ]);
});