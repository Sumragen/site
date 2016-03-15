/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('CommonController', ['$scope', 'ModalService', '$http', 'AuthService', '$state', function ($scope, ModalService, $http, AuthService, $state) {
        var self = this;
        $scope.state = $state;
        self.getUserName = function () {
            var user = JSON.parse(localStorage.getItem("currentUserLS"));
            return user.login;
        };
        self.getSchoolName = function () {
            var user = JSON.parse(localStorage.getItem("currentUserLS"));
            return 'School ' + '24';//+ user.school;
        };
        self.isAuthenticated = function () {
            return (localStorage.getItem("currentUserLS"));
        };
        self.pathToView = 'home';
        $scope.customResult = null;

        self.showSignInModal = function (path) {
            ModalService.showModal({
                templateUrl: "./views/auth/logIn.html",
                controller: "AuthController as controller"
            }).then(function (modal) {
                modal.close.then(function (result) {
                    $scope.customResult = "All good!";
                });
            });
        };
        self.showSignUpModal = function (path) {
            ModalService.showModal({
                templateUrl: "./views/auth/logUp.html",
                controller: "AuthController as controller"
            }).then(function (modal) {
                modal.close.then(function (result) {
                    $scope.customResult = "All good!";
                });
            });
        };


        self.logOut = function () {
            localStorage.removeItem("currentUserLS");
        };
    }]);
});