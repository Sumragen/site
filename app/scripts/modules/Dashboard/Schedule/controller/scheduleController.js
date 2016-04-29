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
        '$stateParams',
        'Dashboard.Schedule.ScheduleService',
        'Dashboard.Schedule.ScheduleDataService',
        'ScheduleConstants',
        'Common.SchedulingUtil',
        'scheduleData',
        function ($scope, $state, moment, $filter, $uibModal, $timeout, $stateParams, scheduleService, scheduleDataService, scheduleConst, schedulingUtil, scheduleData) {
            var self = this;
            $scope.busy = false;
            var templateUrl = "views/Dashboard/Schedule/day.html";
            var controller = 'Dashboard.Schedule.DayController';

            var isSettingsPage = $state.current.name.indexOf('settings') > -1;
            //if (isSettingsPage) {
            //    templateUrl = "views/Dashboard/Settings/Schedule/day.html";
            //    controller = 'Dashboard.Schedule.ScheduleController';
            //}

            function saveOnEventDrop(event, delta) {
                scheduleService.updateLessonById({
                    id: event.lessonId,
                    order: event.num,
                    dow: event.dow[0] + delta._days % 7
                })
            }

            function showDayModal(date) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: templateUrl,
                    controller: controller + " as controller",
                    size: 'lg',
                    windowClass: 'custom-modal-day',
                    resolve: {
                        currentSchedule: function () {
                            return scheduleData || {};
                        },
                        currentStage : $scope.stage,
                        date: date
                    }
                });

                modalInstance.result.then(function () {
                    //$state.go('dashboard.profile');
                }, function () {

                });
            }

            function editLesson(date, jsEvent, view) {
                showDayModal(date);
            }

            $scope.eventSource = {
                className: 'gcal-event',
                currentTimezone: 'America/Chicago'
            };

            if ($stateParams.stage) {
                $scope.events = [];
                $scope.stage = $stateParams.stage;
                $scope.eventsF = function (start, end, timezone, callback) {
                    scheduleService.getLessonsByStage($stateParams.stage)
                        .then(function (data) {
                            callback(scheduleDataService.parseNewLessons(data));
                        });
                };
                $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
            } else {
                if (isSettingsPage) {
                    $state.go('dashboard.settings.schedule.selector');
                } else {
                    $scope.events = scheduleDataService.parseLessons(($stateParams.stage) ? $stateParams.stage.schedule : null || scheduleData.schedule);
                    $scope.eventSources = [$scope.events, $scope.eventSource];
                }
            }

            $scope.uiConfig = {
                calendar: {
                    firstDay: 1,
                    height: 'auto',
                    editable: isSettingsPage,
                    header: {
                        left: 'month basicWeek basicDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    eventDrop: saveOnEventDrop,
                    dayClick: editLesson
                }
            };
        }]);
});