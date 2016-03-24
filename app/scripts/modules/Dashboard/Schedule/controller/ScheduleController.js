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
                    var events = createEventList($scope.currentSchedule.objects.schedule, start, end);
                    callback(events);
                });
            };

            $scope.createEvent = function (lesson,step, start, end) {
                var startH = 8;
                var startM = 30;
                var endH = 9;
                var endM = 50;
                //var day = 'Monday';
                if (lesson.num === 2) {
                    startH = 10;
                    startM = 10;
                    endH = 11;
                    endM = 30;
                } else {
                    if (lesson.num === 3) {
                        startH = 11;
                        startM = 50;
                        endH = 13;
                        endM = 10;
                    }else{
                            startH = 8;
                            startM = 30;
                            endH = 9;
                            endM = 50;
                    }
                }
                var d = new Date(start).getDate();
                var m = new Date(start).getMonth();
                var y = new Date(start).getFullYear();

                //var currentDayOfWeek = $filter('date')(moment(start).format('dddd'), 'dddd');
                //var numDay = 0;
                //if( currentDayOfWeek === 'Monday'){
                //    step = 1;
                //}else{
                //    if( currentDayOfWeek === 'Tuesday'){
                //        numDay = 2;
                //    }else{
                //        if( currentDayOfWeek === 'Wednesday'){
                //            numDay = 3;
                //        }else{
                //            if( currentDayOfWeek === 'Thursday'){
                //                numDay = 4;
                //            }else{
                //                if( currentDayOfWeek === 'Friday'){
                //                    numDay = 5;
                //                }
                //            }
                //        }
                //    }
                //}

                var h = step;

                $scope.events.push({
                    title: lesson.lesson,
                    start: new Date(y, m, d + h, startH, startM),
                    end: new Date(y, m, d + h, endH, endM),
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
                            $scope.createEvent(lesson,step, start,end);
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