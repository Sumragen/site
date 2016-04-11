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
        'Dashboard.Schedule.ScheduleService',
        'Dashboard.Schedule.ScheduleDataService',
        'ScheduleConstants',
        'Common.SchedulingUtil',
        'scheduleData',
        function ($scope, $state, moment, $filter, $uibModal, $timeout, scheduleService, scheduleDataService, scheduleConst, schedulingUtil, scheduleData) {
            var self = this;
            var _templateUrl = "views/Dashboard/Schedule/day.html";

            if ($state.current.name.indexOf('settings') > -1) {
                _templateUrl = "views/Dashboard/Schedule/daySettings.html";
            }

            self.showDayModal = function (date) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: _templateUrl,
                    controller: "Dashboard.Schedule.DayController as controller",
                    size: 'lg',
                    windowClass: 'custom-modal-day',
                    resolve: {
                        currentSchedule: function () {
                            return scheduleData;
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
            scheduleData.objects.schedule.forEach(function (day) {
                step++;
                self.tempSchedule = scheduleDataService.parseLessons(day);
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