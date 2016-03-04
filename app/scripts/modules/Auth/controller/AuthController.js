/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('AuthController', ['$scope', 'close', '$http', 'AuthService', function ($scope, close, $http) {
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
            $http.get('/users').success(function (data) {
                var response = {};
                for (i = 0; i < $scope.users.length; i++) {
                    response = {success: currentLogin === data[i].login && currentPassword === data[i].password};
                    if (!response.success) {
                        $scope.error = "Username or password is incorrect";
                    } else {
                        $scope.error = null;
                        $scope.isAuth = true;
                        self.close();
                        break;
                    }
                }
            });
        };
        self.update();
    }]);
});