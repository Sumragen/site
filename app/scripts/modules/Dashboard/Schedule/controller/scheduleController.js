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
        'uiCalendarConfig',
        'Dashboard.Schedule.ScheduleService',
        'Dashboard.Schedule.ScheduleDataService',
        'ScheduleConstants',
        'Common.SchedulingUtil',
        'scheduleData',
        function ($scope, $state, moment, $filter, $uibModal, $timeout, $stateParams, uiCalendarConfig, scheduleService, scheduleDataService, scheduleConst, schedulingUtil, scheduleData) {
            $scope.busy = false;
            var templateUrl = "views/Dashboard/Schedule/day.html";
            var controller = 'Dashboard.Schedule.DayController';

            var isSettingsPage = $state.current.name.indexOf('settings') > -1;
            var changedEvents = [];

            function addToEventChangedList(event, delta) {
                if (_.every(changedEvents, function (exEvent, index) {
                        if (exEvent.id === event.lessonId) {
                            changedEvents[index] = {
                                id: event.lessonId,
                                order: event.num,
                                dow: event.dow[0] + delta._days % 7
                            };
                            return false;
                        }
                        return true;
                    })) {
                    changedEvents.push({
                        id: event.lessonId,
                        order: event.num,
                        dow: event.dow[0] + delta._days % 7
                    })
                }
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
                        currentStage: $scope.stage,
                        date: date
                    }
                });

                modalInstance.result.then(function () {
                    //$state.go('dashboard.profile');
                }, function () {

                });
            }

            function editLesson(date) {
                showDayModal(date);
            }

            $scope.eventSource = {
                className: 'gcal-event',
                currentTimezone: 'America/Chicago'
            };

            if ($stateParams.stage) {
                $scope.events = [{title: 'All Day Event', start: new Date(), allDay: false}];
                $scope.stage = $stateParams.stage;
                $scope.eventsF = function (start, end, timezone, callback) {
                    scheduleService.getLessonsByStage($stateParams.stage)
                        .then(function (data) {
                            $scope.eventSources[0] = scheduleDataService.parseNewLessons(data);
                            callback(null);
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

            $scope.saveSchedule = function () {
                var errorEvents = [];
                _.merge($scope.eventSources[0][0], {
                    backgroundColor: '#FF3F44',
                    borderColor: '#FF3F44',
                    title: $scope.eventSources[0][0].title + ' '
                });
                _.each(changedEvents, function (oldEvent) {
                    _.each(changedEvents, function (changedEvent) {
                        if (oldEvent.dow === changedEvent.dow && oldEvent.order === changedEvent.order && changedEvent.id !== oldEvent.id) {
                            if (_.every(errorEvents, function (errorEvent) {
                                    return !(errorEvent.id === changedEvent.id)
                                })) {
                                errorEvents.push(changedEvent);
                            }
                        }
                    })
                });
                if (errorEvents.length === 0) {
                    scheduleService.updateLessonList(changedEvents);
                } else {
                    _.each($scope.eventSources[0], function (event, index) {
                        if (!_.every(changedEvents, function (changedEvent) {
                                return !(event.lessonId === changedEvent.id)
                            })) {
                            $scope.eventSources[0][index] = _.merge($scope.eventSources[0][index], {
                                backgroundColor: '#FF3F44',
                                borderColor: '#FF3F44',
                                title: event.title + ' '
                            })
                        }
                    });
                    window.alert('error');
                }
            };

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
                    eventDrop: addToEventChangedList,
                    dayClick: editLesson
                }
            };
        }]);
});