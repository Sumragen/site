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
                            return $http(Endpoint.user.list(0, 6))
                                .then(function (res) {
                                    return res.data;
                                }, function (err) {
                                    return $q.reject(err);
                                });
                        }
                    }
                });
        });
});