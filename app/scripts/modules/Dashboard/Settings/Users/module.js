/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('Dashboard.Settings.Users',[])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.settings.users', {
                    url: "/users",
                    templateUrl: 'views/Dashboard/Settings/Users/users.html',
                    controller: 'Dashboard.Settings.Users.UsersController as controller',
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