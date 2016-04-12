/**
 * Created by trainee on 3/17/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Settings.Schedule.ScheduleSelectorController', [
        '$scope',
        '$state',
        'Dashboard.Schedule.ScheduleService',
        'Dashboard.Schedule.ScheduleDataService',
        function ($scope, $state, scheduleService, scheduleDataService) {
            $scope.busy = false;
            scheduleService.getStages()
                .then(function (data) {
                    $scope.stages = [{suffix: []}];

                    var amount = 0;
                    var maxAmount = 0;
                        _.each(data, function (stage) {
                            if (maxAmount < stage.stage) {
                                maxAmount = stage.stage;
                            }
                        });
                    var stageAmount = [];
                    while(amount < maxAmount){
                        stageAmount.push(amount++);
                    }

                    _.each(data, function (stage) {
                        _.each(stageAmount, function (index) {
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
                        $scope.busy = false;
                        $state.go('dashboard.settings.schedule.edit.stage', {stage: data.data.stage})
                    });
            };

            $scope.selectedPage = function (check) {
                $scope.showDaysTable = check;
            };
        }]);
});