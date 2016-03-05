/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('AuthController', ['$scope', 'close', '$http', 'AuthService', function ($scope, close, $http, AuthService) {
        var self = this;

        self.close = close;


        self.update = function () {
            $http.get('/users').success(function (data) {
                $scope.users = data;
            });
        };
        self.addUser = function (newUser, newLogin, newPsw) {
            console.log('add user');
            $http.post('/users', {'name': newUser, 'login': newLogin, 'password': newPsw}).success(function () {
                self.update();
            });
        };

        self.signIn = function (currentLogin, currentPassword) {
            console.log('signIn');
            $http.get('/users').success(function (users) {
                var response = {};
                for (i = 0; i < users.length; i++) {
                    response = {success: currentLogin === users[i].login && currentPassword === users[i].password};
                    if (!response.success) {
                        $scope.error = "Username or password is incorrect";
                    } else {
                        localStorage.setItem("currentUserLS",JSON.stringify(users[i]));
                        $scope.error = null;
                        AuthService.role = true;
                        self.close();
                        break;
                    }
                }
            });
        };
        self.update();
    }]);
});