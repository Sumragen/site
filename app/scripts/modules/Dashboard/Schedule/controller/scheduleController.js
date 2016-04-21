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
            var _templateUrl = "views/Dashboard/Schedule/day.html";

            var isSettingsPage = $state.current.name.indexOf('settings') > -1;
            if (isSettingsPage) {
                _templateUrl = "views/Dashboard/Schedule/daySettings.html";
            }

            function showEditPanel() {

            }

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
                    templateUrl: _templateUrl,
                    controller: "Dashboard.Schedule.DayController as controller",
                    size: 'lg',
                    windowClass: 'custom-modal-day',
                    resolve: {
                        currentSchedule: function () {
                            return scheduleData || {};
                        },
                        date: date
                    }
                });

                modalInstance.result.then(function () {
                    //$state.go('dashboard.profile');
                }, function () {

                });
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
                }else{
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
                    dayClick: showDayModal
                }
            };
        }]);
});