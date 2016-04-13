/**
 * Created by trainee on 3/17/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.Schedule.Edit.DayController', [
        '$scope',
        '$stateParams',
        'Dashboard.Schedule.ScheduleService',
        'Dashboard.Schedule.ScheduleDataService',
        function ($scope, $stateParams, scheduleService, scheduleDataService) {
            $scope.selectedDay = $stateParams.day;

            scheduleService.getStages()
                .then(function (data) {
                    $scope.tempStages = [];

                    _.each(data, function (stage) {
                        $scope.tempStages.push({
                            stage: stage.stage,
                            suffix: stage.suffix,
                            schedule: scheduleDataService.parseLessons(stage.schedule)
                        });
                    });

                    $scope.stages = [];
                    _.each($scope.tempStages, function (stage) {
                        var tempDayLessons = [null, null, null, null, null, null, null, null, null];
                        _.each(stage.schedule, function (lesson) {
                            _.each(_.range(9), function (num) {
                                if (lesson.num === num && $scope.selectedDay.num === lesson.dow[0]) {
                                    tempDayLessons[num] = lesson;
                                }
                            });
                        });
                        stage.filterName =  stage.stage + stage.suffix + ' ' + stage.stage + '-' + stage.suffix;
                        $scope.stages.push({stage: stage.stage, suffix: stage.suffix, filterName: stage.filterName, day: tempDayLessons});
                    });
                });
            $scope.selectLesson = function (lesson) {
                lesson;
            }
        }]);
});