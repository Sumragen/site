/**
 * Created by trainee on 5/10/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('FacebookOAuthProviderService', [
        '$http',
        '$q',
        'Endpoint',
        'Common.SecurityContext',
        function ($http, $q, Endpoint, securityContext) {
            var service = {};

            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            service.authenticate = function () {
                var deferred = $q.defer();
                FB.init({
                    appId: '944392739008742',
                    cookie: true,  // enable cookies to allow the server to access
                                   // the session
                    xfbml: true,  // parse social plugins on this page
                    version: 'v2.2' // use version 2.2
                });
                FB.getLoginStatus(function (response) {
                    if (response.status === 'connected') {
                        var data = {};
                        data['accessToken'] = response.authResponse.accessToken;
                        data['expiresIn'] = response.authResponse.expiresIn;
                        FB.api('/me', {
                            fields: ['first_name', 'last_name', 'email', 'picture', 'name']
                        }, function (response) {
                            $http(Endpoint.oauth.facebook(_.merge(angular.copy(data), response)))
                                .then(function (data) {
                                    data['user'] = securityContext.setPrincipal(data.data.user);
                                    deferred.resolve(data);
                                })
                                .catch(function (err) {
                                    var user = err.data.user;
                                    deferred.reject({
                                        email: user.email,
                                        first_name: user.first_name,
                                        last_name: user.last_name,
                                        avatar: 'http://graph.facebook.com/' + user.id + '/picture?type=large',
                                        username: user.name,
                                        passwordUndefined : true
                                    });
                                });
                        });
                    }
                });
                return deferred.promise;
            };
            return service;
        }]);
});