/**
 * Created by trainee on 5/10/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('GoogleProviderService', [
        '$http',
        '$q',
        'Endpoint',
        'Common.SecurityContext',
        function ($http, $q, Endpoint, securityContext) {
            var service = {};
            var clientId = '456173590406-st0ma2n0silljsda4ejgedmonsin9umd.apps.googleusercontent.com';
            var apiKey = 'AIzaSyCyNMUmfPG_wu8H1z9ivgUZLZZ-D0tUeos';
            var scopes = 'https://www.googleapis.com/auth/plus.me';

            service.initApiKey = function () {
                gapi.client.setApiKey(apiKey);
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
                            $http(Endpoint.auth.google(_.merge(angular.copy(data), resp.result)))
                                .then(function (user) {
                                    data['user'] = securityContext.setPrincipal(user.data.user);
                                    deferred.resolve(data);
                                })
                                .catch(function (err) {
                                    deferred.reject({
                                        email: err.data.user.emails[0].value,
                                        avatar: err.data.user.image.url,
                                        first_name : err.data.user.name.givenName,
                                        last_name : err.data.user.name.familyName,
                                        username : err.data.user.displayName
                                    });
                                });
                        });
                    });
                });
                return deferred.promise;
            };
            service.logIn = function () {
                return 'user'
            };
            return service;
        }]);
});