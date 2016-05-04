/**
 * Created by sumragen on 2/27/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Schedule.ScheduleController', [
        '$scope',
        '$state',
        '$stateParams',
        'Dashboard.Schedule.ScheduleService',
        'Dashboard.Schedule.ScheduleDataService',
        'scheduleData',
        function ($scope, $state, $stateParams, scheduleService, scheduleDataService, scheduleData) {
            $scope.busy = false;

            var isSettingsPage = $state.current.name.indexOf('settings') > -1;
            var overlappedEvents = [];
            $scope.eventSources = [];

            function addToEventChangedList(event, delta) {
                var result = scheduleDataService.addToEventChangedList(event, delta, overlappedEvents, $scope.events);
                $scope.events = result.events;
                overlappedEvents = result.overlappedEvents;
                $scope.notification = 'Changes are not saved';
            }

            function showDayModal(date) {
                return scheduleDataService.showDayModal(scheduleData, $scope.stage, date);
            }

            function editLesson(date) {
                if (!$scope.notification) {
                    showDayModal(date);
                } else {
                    $scope.notification = 'Please, save your changes'
                }
            }

            $scope.eventSource = {
                className: 'gcal-event',
                currentTimezone: 'America/Chicago'
            };

            if ($stateParams.stage) {
                $scope.stage = $stateParams.stage.stage;
                $scope.events = $stateParams.stage.events;
                $scope.eventSources = [$scope.events, $scope.eventSource];
            } else {
                if (isSettingsPage) {
                    $state.go('dashboard.settings.schedule.selector');
                } else {
                    $scope.events = scheduleDataService.parseLessons(($stateParams.stage) ? $stateParams.stage.schedule : null || scheduleData.schedule);
                    $scope.eventSources = [$scope.events, $scope.eventSource];
                }
            }

            $scope.saveSchedule = function () {
                if (overlappedEvents.length > 0) {
                    $scope.notification = 'Please set correct lessons.'
                } else {
                    $scope.busy = true;
                    scheduleService.updateLessonList({
                            stage: $scope.stage,
                            objects: _.map($scope.events, function (event) {
                                return {
                                    id: event.lessonId,
                                    order: event.num,
                                    dow: event.dow[0]
                                }
                            })
                        })
                        .then(function (data) {
                            $scope.notification = null;
                        })
                        .catch(function (error) {
                            _.each(error.errorEvents, function (id) {
                                $scope.notification = error.message;
                                overlappedEvents = scheduleDataService.addToOverlappedEvents(overlappedEvents, id);
                                _.every($scope.events, function (event, index) {
                                    if (event.lessonId === id) {
                                        $scope.events[index] = scheduleDataService.highlight(event, '#FF3F44', '#FF3F44');
                                        return false;
                                    }
                                    return true;
                                })
                            });

                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
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