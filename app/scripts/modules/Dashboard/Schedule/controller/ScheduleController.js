/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Schedule.ScheduleController', [
        '$scope',
        '$rootScope',
        'moment',
        '$filter',
        'Common.ModalService',
        function ($scope, $rootScope, moment, $filter, ModalService) {
            var self = this;
            self.showDayModal = function (date) {
                var selectedDate = moment(date).format('dddd');
                $rootScope.selectedDate = $filter('date')(selectedDate, 'dddd');
                ModalService.showModal({
                    templateUrl: "./views/dashboard/schedule/day.html",
                    controller: "Dashboard.Schedule.DayController as controller"
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