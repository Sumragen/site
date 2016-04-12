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
                    name: 'Mon',
                    title: 'Monday'
                }, {
                    num: 2,
                    name: 'Tue',
                    title: 'Tuesday'
                }, {
                    num: 3,
                    name: 'Wed',
                    title: 'Wednesday'
                }, {
                    num: 4,
                    name: 'Thu',
                    title: 'Thursday'
                }, {
                    num: 5,
                    name: 'Fri',
                    title: 'Friday'
                }, {
                    num: 6,
                    name: 'Sat',
                    title: 'Saturday'
                }, {
                    num: 7,
                    name: 'Sun',
                    title: 'Sunday'
                }
            ];

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

                    _.each(data, function (stage) {
                        _.each(_.range(maxAmount), function (index) {
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