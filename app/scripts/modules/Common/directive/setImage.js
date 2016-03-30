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
                                    width: 'auto',
                                    height: '350px'
                                })
                            };
                            image.onerror = function () {
                                console.log('onerror');
                                element.css({
                                    backgroundImage: 'url(images/' + scope.typeImage + '-not-found.png)',
                                    width: 'auto',
                                    height: '100px'
                                });
                            };
                            image.src = scope.imageUrl;
                        }
                    }
                },
                link: function (scope, element, attrs) {


                },
                //templateUrl: '/views/Common/setImage.html'
            }
        }
    ]);
});