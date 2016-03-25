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
        'ScheduleConstants',
        //'Common.ModalService',
        function ($scope, $rootScope, moment, $filter, $uibModal, scheduleService, scheduleConst) {
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

                lessonTime = scheduleConst.TimeSchedule[lesson.num];

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
                            start: new Date(tempYear, tempMonth, tempDay + step, lessonTime.startH, lessonTime.startM),
                            end: new Date(tempYear, tempMonth, tempDay + step, lessonTime.endH, lessonTime.endM),
                            allDay: false
                        });
                    }
                }
                $scope.events.push({
                    title: lesson.lesson,
                    start: new Date(y, m, d + step, lessonTime.startH, lessonTime.startM),
                    end: new Date(y, m, d + step, lessonTime.endH, lessonTime.endM),
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