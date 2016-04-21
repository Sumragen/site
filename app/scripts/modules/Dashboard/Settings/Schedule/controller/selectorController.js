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
        function ($scope, $state, statePreference, scheduleService, scheduleDataService) {
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