/**
 * Created by sumragen on 2/27/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Schedule.ScheduleController', [
        '$scope',
        '$rootScope',
        'moment',
        '$filter',
        '$uibModal',
        'Dashboard.Schedule.ScheduleService',
        'ScheduleConstants',
        'Common.SchedulingUtil',
        //'Common.ModalService',
        function ($scope, $rootScope, moment, $filter, $uibModal, scheduleService, scheduleConst, schedulingUtil) {
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


            //schedulingUtil.setTimeBreaks([1,2,3,4,5,6,7,8]);
            console.log(schedulingUtil.getCache());

            $scope.eventSource = {
                className: 'gcal-event',
                currentTimezone: 'America/Chicago'
            };

            $scope.events = [];

            $scope.eventsF = function (start, end) {
                scheduleService.loadSchedule().then(function (data) {
                    $scope.currentSchedule = data.data.schedule;
                    createEventList($scope.currentSchedule.objects.schedule, start, end);
                });
            };

            $scope.createEvent = function (lesson, step) {
                var lessonTime = schedulingUtil.getLessonsScheduling(lesson.num);

                $scope.events.push({
                    title: lesson.lesson,
                    start: lessonTime.from.hours() + ':' + lessonTime.from.minutes(),
                    end: lessonTime.to.hours() + ':' +  lessonTime.to.minutes(),
                    allDay: false,
                    dow: [step]
                });
            };

            function createEventList(schedule, start, end) {
                var step = 0;
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