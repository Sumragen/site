/**
 * Created by trainee on 5/10/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('MicrosoftOAuthProviderService', [
        '$http',
        '$q',
        'Endpoint',
        'Common.SecurityContext',
        function ($http, $q, Endpoint, securityContext) {
            var service = {};
            service.authenticate = function () {
                var deferred = $q.defer();
                WL.init({
                    client_id: '8a9c721d-2572-488f-a57d-7e143d8544b0',
                    redirect_uri: 'http://localhost:9002/',
                    scope: "wl.signin",
                    response_type: "token"
                });
                WL.login({
                    scope: ["wl.signin", "wl.basic", "wl.birthday", "wl.emails"]
                }).then(
                    function (credentials) {
                        var data = {};
                        data['accessToken'] = credentials.session.access_token;
                        data['expiresAt'] = credentials.session.expires;
                        data['expiresIn'] = credentials.session.expires_in;
                        WL.api({
                            path: "me",
                            method: "GET"
                        }).then(
                            function (response) {
                                $http(Endpoint.oauth.microsoft(_.merge(angular.copy(data), response)))
                                    .then(function (user) {
                                        data['user'] = securityContext.setPrincipal(user.data.user);
                                        deferred.resolve(data);
                                    })
                                    .catch(function (err) {
                                        var user = err.data.user;
                                        deferred.reject({
                                            email: user.emails.account,
                                            avatar: 'https://apis.live.net/v5.0/' + user.id + '/picture?type=large',
                                            first_name : user.first_name,
                                            last_name : user.last_name,
                                            username : user.name,
                                            passwordUndefined : true
                                        });
                                    });
                            },
                            function (responseFailed) {
                                deferred.reject(responseFailed);
                            }
                        );
                    },
                    function (responseFailed){
                        deferred.reject(responseFailed);
                    }
                );
                return deferred.promise;
            };
            return service;
        }]);
});