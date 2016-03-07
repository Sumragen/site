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
            AuthService.addUser(newUser,newLogin,newPsw);
        };

        self.signIn = function (currentLogin, currentPassword) {
            AuthService.signIn(currentLogin,currentPassword, function () {
                if(!AuthService.error) {
                    $scope.error = null;
                    self.close();
                }else{
                    $scope.error = AuthService.error;
                }
            });
        };
        self.update();
    }]);
});