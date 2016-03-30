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
                                element.addClass('image-not-found');
                                ngModelController.$setViewValue(scope.typeImage);
                                ngModelController.$commitViewValue();
                            };
                            image.src = scope.imageUrl;
                        }
                    }
                },
                link: function (scope, element, attrs,ngModel) {
                    init();

                    function init() {
                        ngModel.$setViewValue('test');
                    }
                },
                //templateUrl: '/views/Common/setImage.html'
            }
        }
    ]);
});