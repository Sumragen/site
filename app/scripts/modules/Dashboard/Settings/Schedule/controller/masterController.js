/**
 * Created by trainee on 3/17/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.Schedule.ScheduleSelectorController', [
        '$scope',
        '$state',
        'Dashboard.Schedule.ScheduleService',
        'Dashboard.Schedule.ScheduleDataService',
        function ($scope, $state, scheduleService, scheduleDataService) {
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

            scheduleService.getStages()
                .then(function (data) {
                    $scope.stages = [];

                    var amount = 0;
                    var maxAmount = 0;
                    _.each(data, function (stage) {
                        if (maxAmount < stage.stage) {
                            maxAmount = stage.stage;
                        }
                    });

                    _.each(data, function (stage) {
                        _.each(_.range(maxAmount), function (index) {
                            if (stage.stage === index + 1) {
                                stage.filterName =  stage.stage + stage.suffix + ' ' + stage.stage + '-' + stage.suffix + ' ' + stage.formMaster.name;
                                $scope.stages.push(stage);
                            }
                        });
                    });
                });


            $scope.selectStage = function (id) {
                scheduleService.getStageBySuffix(id)
                    .then(function (data) {
                        $state.go('dashboard.settings.schedule.edit.stage', {stage: data.data.stage});
                    });
            };

            $scope.selectDay = function (day) {
                $state.go('dashboard.settings.schedule.edit.day', {day: day})
            };


            $scope.selectedPage = function (check) {
                $scope.showDaysTable = check;
            };
        }]);
});