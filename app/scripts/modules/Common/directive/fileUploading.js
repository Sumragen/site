/**
 * Created by trainee on 5/25/16.
 */
define(['../module'], function (module) {
    module.directive('sFileUploading', [
        '$uibModal',
        function ($uibModal) {
            return {
                restrict: 'A',
                templateUrl: 'views/Common/fileUploading.html',
                link: function (scope, element, attrs) {
                    scope.openModal = function () {
                        $uibModal.open({
                            animation: true,
                            templateUrl: "views/Common/fileUploadingModal.html",
                            controller: "Common.FileUploadingController as controller"
                        })
                    };
                }
            };
        }]);
});