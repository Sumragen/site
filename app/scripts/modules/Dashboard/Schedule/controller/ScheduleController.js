/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Schedule.ScheduleController', [
        '$scope',
        '$rootScope',
        'moment',
        '$filter',
        '$uibModal',
        'Dashboard.Schedule.ScheduleService',
        //'Common.ModalService',
        function ($scope, $rootScope, moment, $filter, $uibModal, scheduleService) {
            var self = this;
            self.showDayModal = function (date) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: "./views/dashboard/schedule/day.html",
                    controller: "Dashboard.Schedule.DayController as controller",
                    size: 'lg',
                    windowClass: 'custom-modal-day',
                    resolve: {
                        currentSchedule: function () {
                            return $scope.currentSchedule;
                        },
                        date: date
                    }
                });

                modalInstance.result
                    .then(function () {
                        //$state.go('dashboard.profile');
                    }, function () {
                        console.log('Modal dismissed');
                    });
            };
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            $scope.eventSource = {
                url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
                className: 'gcal-event',
                currentTimezone: 'America/Chicago'
            };

            $scope.events = [];

            $scope.eventsF = function (start, end, timezone, callback) {
                var s = new Date(start).getTime() / 1000;
                var e = new Date(end).getTime() / 1000;
                var m = new Date(start).getMonth();
                scheduleService.loadSchedule().then(function (data) {
                    $scope.currentSchedule = data.data.schedule;
                    createEventList($scope.currentSchedule.objects.schedule, start, end);
                    callback();
                });
            };

            $scope.createEvent = function (lesson, step, start, end) {
                var startH = 7;
                var startM = 30;
                var endH = 8;
                var endM = 15;
                //var day = 'Monday';
                if (lesson.num === 1) {
                    startH = 8;
                    startM = 30;
                    endH = 9;
                    endM = 15;
                } else {
                    if (lesson.num === 2) {
                        startH = 9;
                        startM = 30;
                        endH = 10;
                        endM = 15;
                    } else {
                        if (lesson.num === 3) {
                            startH = 10;
                            startM = 30;
                            endH = 11;
                            endM = 15;
                        } else {
                            if (lesson.num === 4) {
                                startH = 11;
                                startM = 30;
                                endH = 12;
                                endM = 15;
                            } else {
                                if (lesson.num === 5) {
                                    startH = 12;
                                    startM = 30;
                                    endH = 13;
                                    endM = 15;
                                } else {
                                    if (lesson.num === 6) {
                                        startH = 13;
                                        startM = 30;
                                        endH = 14;
                                        endM = 15;
                                    } else {
                                        if (lesson.num === 7) {
                                            startH = 14;
                                            startM = 30;
                                            endH = 15;
                                            endM = 15;
                                        } else {
                                            if (lesson.num === 8) {
                                                startH = 15;
                                                startM = 30;
                                                endH = 16;
                                                endM = 15;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                var d = new Date(start).getDate();
                var m = new Date(start).getMonth();
                var y = new Date(start).getFullYear();

                if((d > new Date(end).getDate() && new Date(end).getDate() > 10) || (d < new Date(end).getDate() && new Date(end).getDate() - d > 10)){
                    for (i = 1; i < 6;i++){
                        tempDay = new Date(start+i*7*24*3600*1000).getDate();
                        tempMonth = new Date(start+i*7*24*3600*1000).getMonth();
                        tempYear = new Date(start+i*7*24*3600*1000).getFullYear();
                        $scope.events.push({
                            title: lesson.lesson,
                            start: new Date(tempYear, tempMonth, tempDay + step, startH, startM),
                            end: new Date(tempYear, tempMonth, tempDay + step, endH, endM),
                            allDay: false
                        });
                    }
                }
                $scope.events.push({
                    title: lesson.lesson,
                    start: new Date(y, m, d + step, startH, startM),
                    end: new Date(y, m, d + step, endH, endM),
                    allDay: false
                });
            };

            function createEventList(schedule, start, end) {
                var step = -1;
                schedule.forEach(function (day) {
                    step++;
                    self.tempSchedule = scheduleService.parseLessons(day);
                    self.tempSchedule.forEach(function (lesson) {
                        if (lesson) {
                            $scope.createEvent(lesson, step, start, end);
                        }
                    });
                });
                return $scope.events;
            }

            $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];

            $scope.uiConfig = {
                calendar: {
                    firstDay: 1,
                    height: 450,
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