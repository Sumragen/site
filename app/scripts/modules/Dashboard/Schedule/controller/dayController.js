/**
 * Created by sumragen on 3/18/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Schedule.DayController', [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'selectedDayOfWeek',
        'Dashboard.Schedule.ScheduleService',
        function ($scope, $rootScope, $uibModalInstance,selectedDayOfWeek,scheduleService) {
            var self = this;

            self.close = function () {
                $uibModalInstance.close();
            };

            scheduleService.loadSchedule().then(function (data) {
                var scheduleData = data.data.schedule;
                for (i = 0; i < scheduleData.days.length; i ++){
                    if (selectedDayOfWeek === scheduleData.days[i].name){
                        self.currentDay = scheduleData.days[i];
                        return;
                    }
                }
            }, function (err) {
                $scope.error = err.data.message
            });
            var scheduleData = scheduleService.loadSchedule();
            self.currentDay = {dayOff: 'day off'};
        }
    ]);
});