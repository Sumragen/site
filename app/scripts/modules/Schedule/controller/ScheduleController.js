/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('ScheduleController', ['$scope', 'ModalService', function ($scope, ModalService) {
        var self = this;
        $scope.eventSources = [];
        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: true,
                header: {
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                dayClick: function () {
                    console.log('click');
                    self.showDayModal();
                }
            }
        };
        self.showDayModal = function () {
            ModalService.showModal({
                templateUrl: "./views/tabs/schedule/day.html",
                controller: "AuthController as controller"
            });

        }
    }]);
});