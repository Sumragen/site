/**
 * Created by trainee on 3/17/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Settings.Schedule.EditScheduleController', [
        '$scope',
        'Dashboard.Schedule.ScheduleService',
        'Dashboard.Schedule.ScheduleDataService',
        function ($scope, scheduleService, scheduleDataService) {
            var self = this;
            scheduleService.getStages()
                .then(function (data) {
                    $scope.stages = [{suffix: []}];
                    _.each(data, function (stage) {
                        _.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function (index) {
                            if (stage.stage === index + 1) {
                                if ($scope.stages[index]) {
                                    $scope.stages[index].suffix.push(stage)
                                } else {
                                    $scope.stages[index] = {suffix: [stage]}
                                }
                            }
                        });
                    })

                });

            $scope.selectStage = function (id) {
                $scope.busy = true;
                scheduleService.getStageBySuffix(id)
                    .then(function (data) {
                        $scope.events.splice(0);
                        scheduleDataService.parseLessons(data.data.stage.schedule);
                        $scope.busy = false;
                    });
            };
        }]);
});