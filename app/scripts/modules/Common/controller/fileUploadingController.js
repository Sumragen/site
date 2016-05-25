/**
 * Created by trainee on 5/25/16.
 */
define(['../module'], function (module) {
    module.controller('Common.FileUploadingController', [
        '$scope',
        'Upload',
        '$timeout',
        function ($scope, Upload, $timeout) {
            $scope.$watch('files', function () {
                $scope.upload($scope.files);
            });

            $scope.upload = function (files) {
                files = files || $scope.files || [];
                $scope.$emit('onFileChanges', files); //must be something else
            };

        }]);
});