/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Settings.Events.EventsController', [
        '$scope',
        'eventsData',
        function ($scope, eventsData) {
            var self = this;
            $scope.events = eventsData;
        }
    ]);
});