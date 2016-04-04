/**
 * Created by trainee on 4/1/16.
 */
define(['../module'], function (module) {
    module.directive('sLoadingIndicator', [
        '$rootScope',
        '$timeout',
        function ($rootScope, $timeout) {
            return {
                restrict: 'A',
                templateUrl: 'views/Common/loadingIndicator.html'
            }
        }
    ]);
});