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
        '$timeout',
        'Dashboard.Schedule.ScheduleService',
        'ScheduleConstants',
        'Common.SchedulingUtil',
        'scheduleData',
        function ($scope, $rootScope, moment, $filter, $uibModal, $timeout, scheduleService, scheduleConst, schedulingUtil, scheduleData) {
            var self = this;
            self.showDayModal = function (date) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: "views/Dashboard/Schedule/day.html",
                    controller: "Dashboard.Schedule.DayController as controller",
                    size: 'lg',
                    windowClass: 'custom-modal-day',
                    resolve: {
                        currentSchedule: function () {
                            return scheduleData.data.schedule;
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
            var step = 0;
            scheduleData.data.schedule.objects.schedule.forEach(function (day) {
                step++;
                self.tempSchedule = scheduleService.parseLessons(day);
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