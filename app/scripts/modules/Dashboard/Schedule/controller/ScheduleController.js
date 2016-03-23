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
        //'Common.ModalService',
        function ($scope, $rootScope, moment, $filter, $uibModal) {
            var self = this;
            scheduleService.loadSchedule().then(function (data) {
                $scope.currentSchedule = data.data.schedule;
            });
            self.showDayModal = function (date) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: "./views/dashboard/schedule/day.html",
                    controller: "Dashboard.Schedule.DayController as controller",
                    size: 'lg',
                    windowClass: 'custom-modal-day',
                    resolve: {
                        currentSchedule: function () {
                            return $scope.currentSchedule.data.schedule;
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

            $scope.events = [
                {title: 'Biology',start: new Date(y, m, d + 1, 8, 30),end: new Date(y, m, d + 1, 9, 50),allDay: false},
                {title: 'History',start: new Date(y, m, d + 1, 10, 10),end: new Date(y, m, d + 1, 11, 30),allDay: false},
                {title: 'Mathematics',start: new Date(y, m, d + 1, 11, 50),end: new Date(y, m, d + 1, 13, 10),allDay: false},
            ];
            $scope.eventSources = [$scope.events];

            $scope.uiConfig = {
                calendar: {
                    firstDay:1,
                    height: 450,
                    editable: true,
                    header: {
                        left: 'month basicWeek basicDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    dayClick : self.showDayModal
                }
            };
        }]);
});