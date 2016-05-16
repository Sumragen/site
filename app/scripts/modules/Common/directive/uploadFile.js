/**
 * Created by trainee on 3/29/16.
 */
define(['../module'], function (module) {
    module.directive('sUploadFile', [
        function () {
            return {
                restrict: 'A',
                require: '^ngModel',
                link: function ($scope, element, attrs, ngModelController) {
                    function createWatermark() {
                        $('<img>', {
                            src: $(".watermark-image").attr('src')
                        }).watermark({
                            text: 'School 24',
                            margin: 0,
                            done: function (imgURL) {
                                ngModelController.$setViewValue(imgURL);
                                ngModelController.$commitViewValue();
                            }
                        });
                    }

                    $scope.form.previewType === 'image' ? $scope.form.accept = $scope.form.accept || 'image/*' : $scope.form.accept = $scope.form.accept || '';
                    if (element.attr('type') === 'file') {
                        element.bind("change", function (changeEvent) {
                            if ($scope.form.fileType === 'dataUrl') {
                                var reader = new FileReader();
                                var fileMimeType = changeEvent.target.files[0].type;

                                $scope.form.accept.split(',').forEach(function (type) {
                                    if (fileMimeType.indexOf(type) > -1) {
                                        reader.onloadend = function () {
                                            if (typeof $scope.form.onFileSelect === 'function') {
                                                $scope.form.onFileSelect(reader.result);
                                            }
                                            ngModelController.$setViewValue(reader.result);
                                            ngModelController.$commitViewValue();
                                            createWatermark();
                                        };
                                        reader.readAsDataURL(changeEvent.target.files[0]);
                                    }
                                });
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