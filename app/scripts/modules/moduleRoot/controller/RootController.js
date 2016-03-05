/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('RootController', ['$scope', 'ModalService', '$http', 'AuthService', function ($scope, ModalService, $http, AuthService) {
        var self = this;
        self.isAuthenticated = function () {
            return (localStorage.getItem("currentUserLS"));
        };
        self.pathToView = 'home';
        self.onTabSelect = function (tab) {
            self.pathToView = tab;
        };
        self.isTabSelect = function (tab) {
            return self.pathToView === tab;
        };
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

        self.update = function () {
            $http.get('/users').success(function (data) {
                $scope.users = data;
            });
        };

        self.addUser = function (newUser, newLogin, newPsw) {
            console.log('add user (with parametrs; RootCtrl)');
            $http.post('/users', {'name': newUser, 'login': newLogin, 'password': newPsw}).success(function () {
                self.update();
            });
        };
        self.logOut = function () {
            //localStorage.setItem("currentUserLS",JSON.stringify(null));
            localStorage.removeItem("currentUserLS");
            AuthService.role = false;
        };
        self.update();
    }])
    //Location
    .controller('myCtrl', ['$scope', '$timeout', 'InfoWindow', function ($scope, $timeout, InfoWindow) {
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
        }]);
});