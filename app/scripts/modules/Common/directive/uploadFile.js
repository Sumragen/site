/**
 * Created by trainee on 3/29/16.
 */
define(['../module'], function (module) {
    module.directive('sUploadFile', [
        'Endpoint',
        function (endpoint) {
            return {
                restrict: 'A',
                require: '^ngModel',
                link: function ($scope, element, attrs, ngModelController) {
                    if (element.attr('type') === 'file') {
                        element.bind("change", function (changeEvent) {
                            if ($scope.form.fileType === 'dataUrl') {
                                var reader = new FileReader();
                                reader.onloadend = function () {
                                    if (typeof $scope.form.onFileSelect === 'function') {
                                        $scope.form.onFileSelect(reader.result);
                                    }
                                    ngModelController.$setViewValue(reader.result);
                                    ngModelController.$commitViewValue();
                                };
                                reader.readAsDataURL(changeEvent.target.files[0]);
                            } else {
                                if (typeof $scope.form.onFileSelect === 'function') {
                                    $scope.form.onFileSelect(changeEvent.target.files[0]);
                                }
                                ngModelController.$setViewValue(changeEvent.target.files[0]);
                                ngModelController.$commitViewValue();
                            }
                        });
                    }
                    $scope.$on('destroy', function () {
                        element.unbind();
                    })
                }
            }
        }
    ]);
});