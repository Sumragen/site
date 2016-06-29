/**
 * Created by trainee on 3/17/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.Schedule.selectorController', [
        '$scope',
        '$state',
        'Common.StatePreference',
        'Dashboard.Schedule.ScheduleService',
        'Dashboard.Schedule.ScheduleDataService',
        'Common.Model.StageService',
        'Common.Model.LessonService',
        function ($scope, $state, statePreference, scheduleService, scheduleDataService, stageService, lessonService) {
            $scope.busy = false;

            $scope.days = [
                {
                    num: 1,
                    name: 'M',
                    title: 'Monday'
                }, {
                    num: 2,
                    name: 'T',
                    title: 'Tuesday'
                }, {
                    num: 3,
                    name: 'W',
                    title: 'Wednesday'
                }, {
                    num: 4,
                    name: 'T',
                    title: 'Thursday'
                }, {
                    num: 5,
                    name: 'F',
                    title: 'Friday'
                }, {
                    num: 6,
                    name: 'S',
                    title: 'Saturday'
                }, {
                    num: 7,
                    name: 'S',
                    title: 'Sunday'
                }
            ];

            stageService.getStages()
                .then(function (data) {
                    $scope.stages = data;
                });

            $scope.selectStage = function (id) {
                lessonService.getLessonsByStageId(id)
                    .then(function (res) {
                        $state.go('dashboard.settings.schedule.edit.stage',
                            {
                                stage: {
                                    stage: res.stage,
                                    events: res.lessons ? scheduleDataService.parseNewLessons(res.lessons) : []
                                }
                            });
                    });
            };

            $scope.selectDay = function (day) {
                lessonService.getLessonsByDay(day.title)
                    .then(function (data) {
                        $state.go('dashboard.settings.schedule.edit.day', {day: day, lessons: data})
                    });
            };


            var stateName = 'dashboard.settings.schedule.selector';
            $scope.showDaysTable = $scope.toggleViews = statePreference.getStateData(stateName) || false;

            $scope.selectedPage = function (check) {
                var state = {
                    name: stateName,
                    preference: check
                };
                statePreference.setStateData(state);
                $scope.showDaysTable = check;
            };
        }]);
});