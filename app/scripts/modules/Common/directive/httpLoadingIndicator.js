/**
 * Created by trainee on 4/1/16.
 */
define(['../module'], function (module) {
    module.directive('sLoadingFromServer', [
        function () {
            return {
                restrict: 'A',
                templateUrl: 'views/Common/httpLoadingIndicator.html'
            }
        }
    ]);
});