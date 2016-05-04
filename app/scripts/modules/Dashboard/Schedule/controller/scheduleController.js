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
            var templateUrl = "views/Dashboard/Schedule/day.html";
            var controller = 'Dashboard.Schedule.DayController';

            var isSettingsPage = $state.current.name.indexOf('settings') > -1;
            var overlappedEvents = [];
            $scope.eventSources = [];

            function addToOverlappedEvents(event) {
                if (_.every(overlappedEvents, function (oEvent) {
                        return !(oEvent === event);
                    })) {
                    overlappedEvents.push(event);
                }
            }

            function removeOverlappedEvent(id) {
                _.every(overlappedEvents, function (oEventId, ind) {
                    if (oEventId === id) {
                        overlappedEvents.splice(ind, 1);
                        return false;
                    }
                    return true;
                });
            }

            function checkOnOverlap(id, delta, order, dow) {
                return !_.every($scope.events, function (exEvent, index) {
                    if (exEvent.num === order
                        && !_.every(exEvent.dow, function (exDow) {
                            return _.every(dow, function (newDow) {
                                return !(exDow === newDow + delta);
                            });
                        })
                        && exEvent.id !== id) {
                        addToOverlappedEvents(exEvent.id);
                        $scope.events[index] = {
                            allDay: false,
                            lessonId: exEvent.lessonId,
                            num: exEvent.num,
                            id: exEvent.id,
                            title: exEvent.title + ' ',
                            dow: exEvent.dow,
                            start: exEvent.start,
                            end: exEvent.end,
                            backgroundColor: '#FF3F44',
                            borderColor: '#FF3F44'
                        };
                        return false;
                    }
                    return true;
                })
            }

            function addToEventChangedList(event, delta) {
                var myDelta = event.dow[0] + delta._days % 7;
                var myDow = myDelta >= 7
                    ? myDelta % 7
                    : myDelta < 0
                    ? 7 + myDelta
                    : myDelta;
                if (checkOnOverlap(event.id, delta._days % 7, event.num, event.dow)) {
                    _.every($scope.events, function (exEvent, index) {
                        if (exEvent.id === event.id) {
                            addToOverlappedEvents(exEvent.id);
                            $scope.events[index] = {
                                allDay: false,
                                lessonId: exEvent.lessonId,
                                num: exEvent.num,
                                id: exEvent.id,
                                title: exEvent.title + ' ',
                                dow: [myDow],
                                start: exEvent.start,
                                end: exEvent.end,
                                backgroundColor: '#FF3F44',
                                borderColor: '#FF3F44'
                            };
                            return false;
                        }
                        return true;
                    })
                } else {
                    _.every($scope.events, function (exEvent, index) {
                        if (event.id === exEvent.id) {
                            removeOverlappedEvent(event.lessonId);
                            $scope.events[index] = {
                                allDay: event.allDay,
                                lessonId: event.lessonId,
                                num: event.num,
                                id: event.id,
                                title: event.title + ' ',
                                dow: [myDow],
                                start: event.start,
                                end: event.end,
                                backgroundColor: '#55BBAA',
                                borderColor: '#3A87AD'
                            };
                            return false;
                        }
                        return true;
                    });
                }

                _.each($scope.events, function (exEvent, index) {
                    if (!checkOnOverlap(exEvent.id, 0, exEvent.num, exEvent.dow)) {
                        removeOverlappedEvent(exEvent.id);
                        $scope.events[index] = {
                            allDay: exEvent.allDay,
                            lessonId: exEvent.lessonId,
                            num: exEvent.num,
                            id: exEvent.id,
                            title: exEvent.title + ' ',
                            dow: exEvent.dow,
                            start: exEvent.start,
                            end: exEvent.end,
                            backgroundColor: '#55BBAA',
                            borderColor: '#3A87AD'
                        };
                    }
                });

                $scope.errorMsg = 'Changes are not saved';
            }

            function showDayModal(date) {
                scheduleDataService.showDayModal(templateUrl, controller, scheduleData, $scope.stage, date);
            }

            function editLesson(date) {
                if(!$scope.errorMsg){
                    showDayModal(date);
                }else{
                    $scope.errorMsg = 'Please, save your changes'
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
                    $scope.errorMsg = 'Please set correct lessons.'
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
                            $scope.errorMsg = null;
                        })
                        .catch(function (error) {
                            _.each(error.errorEvents, function (id) {
                                $scope.errorMsg = error.message;
                                addToOverlappedEvents(id);
                                _.every($scope.events, function (event, index) {
                                    if(event.lessonId === id){
                                        $scope.events[index] = {
                                            id: event.id,
                                            allDay: false,
                                            num: event.num,
                                            lessonId: event.lessonId,
                                            title: event.title + ' ',
                                            dow: event.dow,
                                            start: event.start,
                                            end: event.end,
                                            backgroundColor: '#FF3F44',
                                            borderColor: '#FF3F44'
                                        };
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