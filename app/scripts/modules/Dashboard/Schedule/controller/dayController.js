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
        'Common.Model.LessonService',
        'Dashboard.Schedule.ScheduleDataService',
        function ($scope, $rootScope, $state, $uibModalInstance, moment, date, $filter, currentSchedule, currentStage, lessonService, scheduleDataService) {
            var self = this;
            self.close = function () {
                $uibModalInstance.close();
            };
            $scope.isSettingsPage = $state.current.name.indexOf('settings') > -1;
            $scope.openLessonEditForm = function (lesson, order) {
                lessonService.getLessonsByDay(date.format('dddd'))
                    .then(function (data) {
                        $state.go('dashboard.settings.schedule.edit.day', {
                            day: {
                                title: date.format('dddd'),
                                stage: {
                                    id: currentStage.id,
                                    order: order,
                                    stage: currentStage.stage,
                                    suffix: currentStage.suffix
                                }
                            },
                            lessons: data
                        })
                    });
                /*$state.go('dashboard.settings.schedule.edit.day', {
                     day: {
                        title: date.format('dddd'),
                        stage: {
                            id: currentStage.id,
                            order: order,
                            stage: currentStage.stage,
                            suffix: currentStage.suffix
                        }
                    }
                 })*/
            };

            $scope.currentDay = {dayOff: 'day off'};

            lessonService.getLessonsByStageId(currentStage.id)
                .then(function (res) {
                    $scope.currentDay = scheduleDataService.parse(_.filter(res.lessons, function (lesson) {
                        return (lesson.day == date.format('dddd'));
                    }));
                });
        }
    ]);
});