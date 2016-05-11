/**
 * Created by trainee on 5/10/16.
 */
/**
 * Created by trainee on 5/10/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('PinterestProviderService', [
        '$http',
        '$q',
        'Endpoint',
        'Common.SecurityContext',
        function ($http, $q, Endpoint, securityContext) {
            var service = {};

            /**
             * This service in development.
             * Must be fixed.
             */
            window.pAsyncInit = function() {
                PDK.init({
                    appId: "4833916561725080693",
                    cookie: true
                });
            };

            (function(d, s, id){
                var js, pjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//assets.pinterest.com/sdk/sdk.js";
                pjs.parentNode.insertBefore(js, pjs);
            }(document, 'script', 'pinterest-jssdk'));

            service.authenticate = function () {
                var params = {
                    fields: 'id,note,link,image'
                };
                PDK.login({ scope : 'read_public' }, function(response){
                    if (!response || response.error) {
                        alert('Error occurred');
                    } else {
                        document.write(response);
                    }
                });
            };

            return service;
        }]);
});