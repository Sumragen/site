/**
 * Created by trainee on 4/1/16.
 */
define(['../module'], function (module) {
    module.directive('sHttpLoadingIndicator', [
        '$http',
        function ($http) {
            return {
                restrict: 'A',
                templateUrl: 'views/Common/httpLoadingIndicator.html',
                link: function (scope) {
                    scope.isLoading = function () {
                        return $http.pendingRequests.length !== 0;
                    };
                }

            }
        }
    ]);
});