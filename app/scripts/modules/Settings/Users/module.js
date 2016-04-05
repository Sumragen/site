/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('Settings.Users',[])
        .config(function ($stateProvider) {
            $stateProvider
                .state('settings.users', {
                    url: "/users",
                    templateUrl: 'views/Settings/Users/users.html',
                    controller: 'Settings.Users.UsersController as controller',
                    resolve: {
                        usersData: function (Endpoint, $http, $q) {
                            return $http(Endpoint.user.list())
                                .then(function (data) {
                                    return data.data.users;
                                }, function (err) {
                                    return $q.reject(err);
                                });
                        }
                    }
                });
        });
});