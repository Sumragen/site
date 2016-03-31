/**
 * Created by trainee on 3/30/16.
 */
define(['../module'], function (module) {
    module.directive('sSetImage', [
        function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var errorClass = attrs['sClassOnError'];
                    var image = new Image();
                    attrs.$observe('imageUrl', function (newUrl) {
                        image.onload = function () {
                            element.removeClass(errorClass);
                            element.addClass('avatar');
                            element.css({
                                backgroundImage: 'url(' + newUrl + ')'
                            });
                        };
                        image.onerror = function () {
                            element.removeClass('avatar');
                            element.addClass(errorClass || '');
                        };
                        if (typeof newUrl === 'string') {
                            image.src = newUrl;
                        }else{
                            image.onerror();
                        }
                    });
                }
            }
        }
    ]);
});