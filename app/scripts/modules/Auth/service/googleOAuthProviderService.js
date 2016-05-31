/**
 * Created by trainee on 5/10/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('GoogleOAuthProviderService', [
        '$http',
        '$q',
        '$uibModal',
        'Endpoint',
        'Common.SecurityContext',
        function ($http, $q, $uibModal, Endpoint, securityContext) {
            var service = {};
            var clientId = '456173590406-2lp5n8d8vpd8jvi441oqa20h5kf8kq1v.apps.googleusercontent.com';
            var apiKey = 'AIzaSyBk8ONPQw_rEU68OAKhHdjw0xhM8YwyWWs';
            var scopes = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/plus.login'];

            service.initApiKey = function () {
                gapi.client.setApiKey(apiKey);
            };
            service.getContacts = function () {
                var deferred = $q.defer();
                gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, function () {
                    gapi.client.load('plus', 'v1', function () {
                            var request = gapi.client.plus.people.list({
                                'userId': 'me',
                                'collection': 'visible'
                            });

                            request.execute(function (resp) {
                                deferred.resolve(resp.items);
                            });
                        }
                    );
                });
                return deferred.promise;
            };

            service.authenticate = function () {
                var deferred = $q.defer();
                gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, function (credentials) {
                    var data = {};
                    data['accessToken'] = credentials.access_token;
                    data['expiresAt'] = credentials.expires_at;
                    data['expiresIn'] = credentials.expires_in;
                    gapi.client.load('plus', 'v1', function () {
                        var request = gapi.client.plus.people.get({
                            'userId': 'me'
                        });
                        request.execute(function (resp) {
                            $http(Endpoint.oauth.google(_.merge(angular.copy(data), resp.result)))
                                .then(function (user) {
                                    data['user'] = securityContext.setPrincipal(user.data.user);
                                    deferred.resolve(data);
                                })
                                .catch(function (err) {
                                    var user = err.data.user;
                                    deferred.reject({
                                        email: user.emails[0].value,
                                        avatar: _.replace(user.image.url, 'sz=50', 'sz=250'),
                                        first_name: user.name.givenName,
                                        last_name: user.name.familyName,
                                        username: user.displayName,
                                        passwordUndefined: true
                                    });
                                });
                        });
                    });
                });
                return deferred.promise;
            };
            return service;
        }])
    ;
})
;