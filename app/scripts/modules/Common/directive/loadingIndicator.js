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
                templateUrl: 'views/Common/loadingIndicator.html',
                link: function (scope, element, attrs) {
                    scope.busy = false;

                    $rootScope.$on('$stateChangeStart', function () {
                        scope.busy = true;
                    });

                    $rootScope.$on('$stateChangeSuccess', function () {
                        scope.busy = false;
                    });

                    $rootScope.$on('$stateChangeError', function () {
                        scope.busy = false;
                    });
                }
            }
        }
    ]);
});