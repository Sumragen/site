/**
 * Created by trainee on 3/17/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.MasterController', [
        '$scope',
        '$rootScope',
        //'Common.ModalService',
        '$http',
        'AuthService',
        '$state',
        '$timeout',
        'InfoWindow',
        'Common.PermissionsService',
        function ($scope, $rootScope, $http, AuthService, $state, $timeout, InfoWindow, permServ) {
            var self = this;
            self.showSettingsPage = false;
            $scope.toggleShowSettingsPage = function () {
                return self.showSettingsPage = !self.showSettingsPage;
            };
        }]);
});