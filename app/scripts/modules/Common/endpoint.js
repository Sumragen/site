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
                signUp: {
                    list: function (data) {
                        return {
                            method: METHODS.POST,
                            url: '/register',
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
                updateUser: {
                    user: function (userIn) {
                        return {
                            method: METHODS.POST,
                            url: '/updateUser',
                            isApiCall: true,
                            data: userIn
                        }
                    }
                },
                events: {
                    list: function () {
                        return {
                            method: METHODS.GET,
                            url: '/events',
                            isApiCall: true
                        }
                    }
                },
                schedule: {
                    list: function () {
                        return {
                            method: METHODS.GET,
                            url: '/schedule',
                            isApiCall: true
                        }
                    }
                }
            };
            return routes;
        }
    ]);
});