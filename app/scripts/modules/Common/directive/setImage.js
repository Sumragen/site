/**
 * Created by trainee on 3/30/16.
 */
define(['../module'], function (module) {
    module.directive('sSetImage', [
        '$compile',
        function ($compile) {
            return {
                restrict: 'A',
                scope: {
                    typeImage: '@sSetImage',
                    imageUrl: '='
                },
                require: '^ngModel',
                compile: function compile(element, attrs) {
                    return {
                        pre: function (scope, element, attrs, ngModelController) {

                        },
                        post: function (scope, element, attrs, ngModelController) {
                            var image = new Image();
                            image.onload = function () {
                                console.log('onload');
                                element.css({
                                    backgroundImage: 'url(' + scope.imageUrl + ')',
                                    backgroundSize: 'cover',
                                    width: '300px',
                                    height: '350px'
                                });
                                ngModelController.$setViewValue(null);
                                ngModelController.$commitViewValue();
                            };
                            image.onerror = function () {
                                console.log('onerror');
                                element.addClass("material-icons image-not-found");
                                //$compile(element)(scope);
                                if (scope.typeImage === 'Avatar') {
                                    ngModelController.$setViewValue('person');
                                } else {
                                    ngModelController.$setViewValue('image');
                                }
                                ngModelController.$commitViewValue();
                            };
                            image.src = scope.imageUrl;
                        }
                    }
                },
                link: function (scope, element, attrs, ngModel) {

                }
            }
        }
    ]);
});