/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('RootController', ['$scope', 'ModalService', '$http', 'AuthService','$state', function ($scope, ModalService, $http, AuthService,$state) {
        var self = this;
        $scope.state = $state;
        self.getName = function () {
                var user = JSON.parse(localStorage.getItem("currentUserLS"));
                return user.login;
            };
        self.isAuthenticated = function () {
            return (localStorage.getItem("currentUserLS"));
        };
        self.pathToView = 'home';
        $scope.customResult = null;
        $scope.showCustom = function (path) {
            ModalService.showModal({
                templateUrl: path + ".html",
                controller: "AuthController as auth"
            }).then(function (modal) {
                modal.close.then(function (result) {
                    $scope.customResult = "All good!";
                });
            });
        };

        self.logOut = function () {
            localStorage.removeItem("currentUserLS");
        };
    }])
    //Location
    .controller('LocateCtrl', ['$scope', '$timeout', 'InfoWindow', function ($scope, $timeout, InfoWindow) {
            $scope.markers = [];
            $scope.cssOpts = {width: '66.5%', height: '700px', 'min-width': '400px', 'min-height': '200px'};
            $scope.gmOpts = {zoom: 16, center: new google.maps.LatLng(46.671627, 32.610014)};
            $scope.closeInfoWindow = function (infowindow) {
                infowindow.close(true);
            };
            $scope.ready = function (map) {
                var infowindow = new InfoWindow({templateUrl: '../app/views/marker.html'}); //it's not infowindow now. (object like "javascript promise", but not a promise)
                function attach(marker) {
                    google.maps.event.addListener(marker, 'click', function (markerObj) { //on marker click
                        infowindow.$ready(function (wnd) { // pass infowindow object
                            wnd.open(map, marker); //open infowindow
                        });
                    });
                }


                var pos = new google.maps.LatLng(46.671627, 32.610014);
                var marker = new google.maps.Marker({
                    id: 'id_1',
                    name: 'School',
                    position: pos,
                    map: map,
                    title: 'School 24'
                });
                $scope.markers.push(marker);
                attach(marker);//attach listener

            };
        }])
    .controller('SettingsCtrl', [function () {
        var self = this;

        self.changeAvatar = function () {
            var selectedFile = new Image (document.getElementById('userImage').files[0]);
            var user = JSON.parse(localStorage.getItem("currentUserLS"));
            user.avatar = selectedFile;
            localStorage.removeItem("currentUserLS");
            localStorage.setItem("currentUserLS",JSON.stringify(user));
        };

        return self;
    }]);
});