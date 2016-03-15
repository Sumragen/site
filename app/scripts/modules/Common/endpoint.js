/**
 * Created by trainee on 3/15/16.
 */
define(['./module'], function (module) {
    module.factory('Endpoint',[
        function () {
            var METHODS = {
                GET: 'GET',
                POST: 'POST',
                PUT: 'PUT',
                DELETE: 'DELETE',
                PATCH: 'PATCH'
            };

            var routes = {
                users: {
                    list: function () {
                        return {
                            method: METHODS.GET,
                            url: '/users'
                        }
                    }
                },
                currentUser: {
                    user: function () {
                        return {
                            method: METHODS.GET,
                            url: '/userProfile'
                        }
                    }
                }
            };
            return routes;
        }
    ]);
});