/**
 * Created by sumragen on 2/27/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Schedule.ScheduleController', [
        '$scope',
        '$state',
        'moment',
        '$filter',
        '$uibModal',
        '$timeout',
        'Dashboard.Schedule.ScheduleService',
        'Dashboard.Schedule.ScheduleDataService',
        'ScheduleConstants',
        'Common.SchedulingUtil',
        'scheduleData',
        function ($scope, $state, moment, $filter, $uibModal, $timeout, scheduleService, scheduleDataService, scheduleConst, schedulingUtil, scheduleData) {
            var self = this;
            $scope.busy = false;
            var _templateUrl = "views/Dashboard/Schedule/day.html";

            if ($state.current.name.indexOf('settings') > -1) {
                _templateUrl = "views/Dashboard/Schedule/daySettings.html";

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
                            parseLessons(data.data.stage.schedule);
                            $scope.busy = false;
                        });
                };
            }

            self.showDayModal = function (date) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: _templateUrl,
                    controller: "Dashboard.Schedule.DayController as controller",
                    size: 'lg',
                    windowClass: 'custom-modal-day',
                    resolve: {
                        currentSchedule: function () {
                            return scheduleData;
                        },
                        date: date
                    }
                });

                modalInstance.result.then(function () {
                    //$state.go('dashboard.profile');
                }, function () {

                });
            };

            $scope.eventSource = {
                className: 'gcal-event',
                currentTimezone: 'America/Chicago'
            };

            $scope.events = [];

            function parseLessons(schedule) {
                var step = 0;
                schedule.forEach(function (day) {
                    step++;
                    self.tempSchedule = scheduleDataService.parseLessons(day);
                    self.tempSchedule.forEach(function (lesson) {
                        if (lesson) {
                            var lessonTime = schedulingUtil.getLesson(lesson.num);
                            $scope.events.push({
                                title: lesson.lesson,
                                start: lessonTime.from.hours() + ':' + lessonTime.from.minutes(),
                                end: lessonTime.to.hours() + ':' + lessonTime.to.minutes(),
                                allDay: false,
                                dow: [step]
                            });
                        }
                    });
                });
            }

            parseLessons(scheduleData.schedule);

            $scope.eventSources = [$scope.events, $scope.eventSource];

            $scope.uiConfig = {
                calendar: {
                    firstDay: 1,
                    height: 700,
                    editable: true,
                    header: {
                        left: 'month basicWeek basicDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    dayClick: self.showDayModal
                }
            };
        }]);
});