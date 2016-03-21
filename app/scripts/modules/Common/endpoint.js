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
                    list: function (data) {
                        return {
                            method: METHODS.POST,
                            url: '/users',
                            isApiCall: true,
                            data: data
                        }
                    }
                },
                signIn: {
                    user: function (userIn) {
                        return {
                            method: METHODS.POST,
                            url: '/signIn',
                            isApiCall: true,
                            data: {
                                login: userIn.currentLogin,
                                password: userIn.currentPassword
                            }
                        }
                    }
                },
                logOut:{
                    user: function (user) {
                        return {
                            method: METHODS.POST,
                            url: '/logOut',
                            isApiCall: true
                        }
                    }
                },
                events: {
                    list: function () {
                        return {
                            method: METHODS.POST,
                            url: '/events',
                            isApiCall: true
                        }
                    }
                }
            };
            return routes;
        }
    ]);
});