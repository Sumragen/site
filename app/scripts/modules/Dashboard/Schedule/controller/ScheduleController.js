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
            self.showDayModal = function (date) {
                var selectedDate = moment(date).format('dddd');
                var selectedDay = $filter('date')(selectedDate, 'dddd');

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: "./views/dashboard/schedule/day.html",
                    controller: "Dashboard.Schedule.DayController as controller",
                    size: 'lg',
                    windowClass: 'custom-modal-day',
                    resolve: {
                        selectedDayOfWeek: function () {
                            return selectedDay;
                        }
                    }
                });

                modalInstance.result
                    .then(function () {
                        //$state.go('dashboard.profile');
                    }, function () {
                        console.log('Modal dismissed');
                    });
            };

            $scope.eventSources = [];
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