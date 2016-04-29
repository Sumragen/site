/**
 * Created by sumragen on 3/18/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Schedule.DayController', [
        '$scope',
        '$rootScope',
        '$state',
        '$uibModalInstance',
        'moment',
        'date',
        '$filter',
        'currentSchedule',
        'currentStage',
        'Dashboard.Schedule.ScheduleService',
        'Dashboard.Schedule.ScheduleDataService',
        function ($scope, $rootScope, $state, $uibModalInstance, moment, date, $filter, currentSchedule, currentStage, scheduleService, scheduleDataService) {
            var self = this;
            self.close = function () {
                $uibModalInstance.close();
            };
            $scope.isSettingsPage = $state.current.name.indexOf('settings') > -1;
            $scope.openLessonEditForm = function (lesson, order) {
                $state.go('dashboard.settings.schedule.edit.day', {
                    day: {
                        title: date.format('dddd'),
                        stage: {
                            id: currentStage.id,
                            order: order,
                            stage: currentStage.stage,
                            suffix: currentStage.suffix
                        }
                    }
                })
            };

            $scope.currentDay = {dayOff: 'day off'};

            scheduleService.getLessonsByStage(currentStage)
                .then(function (schedule) {
                    $scope.currentDay = scheduleDataService.parse(_.filter(schedule, function (lesson) {
                        return (lesson.day === date.format('dddd'));
                    }));
                });
        }
    ]);
});