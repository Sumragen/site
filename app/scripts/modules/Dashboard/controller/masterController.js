/**
 * Created by trainee on 3/17/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.MasterController', [
        '$state',
        '$scope',
        '$rootScope',
        function ($state, $scope, $rootScope) {
            $rootScope.$on('$stateChangeSuccess', function () {
                $scope.isSettings = $state.current.name.indexOf('settings') > -1;
                return true;
            });
        }]);
});