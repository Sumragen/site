/**
 * Created by sumragen on 3/18/16.
 */
define(['../module','lodash'], function (module,_) {
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
            _.find(tempSchedule,function (schedule) {
                if (selectedDay === schedule.name) {
                    self.currentDay = scheduleService.parseLessons(schedule);
                    return;
                }
            });
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