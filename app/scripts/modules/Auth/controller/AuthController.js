/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('AuthController', ['$scope', 'close', '$http', 'AuthService' ,function($scope, close, $http, AuthService) {
        var self = this;

        self.close = close;


        self.update = function() {
            $http.get('/users').success(function(data) {
                $scope.users = data;
            });
        };
        self.addUser = function(newUser,newLogin,newPsw){
            console.log('add user');
            $http.post('/users', {'name': newUser,'login':newLogin,'password':newPsw}).success(function() {
                self.update();
            });
        };

        self.signIn = function (currentLogin,currentPassword) {

        };
        self.update();
    }]);
});