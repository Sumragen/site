/**
 * Created by trainee on 3/30/16.
 */
define(['../module'], function (module) {
    module.directive('sSetImage', [
        function () {
            return {
                restrict: 'A',
                scope: {
                    typeImage: '@sSetImage',
                    imageUrl: '='
                },
                templateUrl: '/views/Common/setImage.html'
            }
        }
    ]);
});