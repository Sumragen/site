/**
 * Created by trainee on 3/30/16.
 */
define(['../module'], function (module) {
    module.directive('sSetImage', [
        function () {
            return {
                restrict: 'A',
                compile: function compile(element, attrs) {
                    return {
                        post: function (scope, element, attrs) {
                            var errorClass = attrs['sClassOnError'];
                            var imageUrl = attrs['imageUrl'];

                            var image = new Image();

                            attrs.$observe('imageUrl', function(newUrl){
                                element.css({
                                    backgroundImage: 'url(' + newUrl + ')'
                                });
                            });
                            image.onload = function () {
                                element.addClass('avatar');
                                element.css({
                                    backgroundImage: 'url(' + imageUrl + ')'
                                });
                            };
                            image.onerror = function () {
                                element.addClass(errorClass || '');
                            };
                            image.src = imageUrl;
                        }
                    }
                }
            }
        }
    ]);
});