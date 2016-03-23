/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Common.MasterController', [
        '$scope',
        '$rootScope',
        //'Common.ModalService',
        '$http',
        'AuthService',
        '$state',
        '$timeout',
        'InfoWindow',
        function ($scope, $rootScope,  $http, AuthService, $state, $timeout, InfoWindow) {
            var self = this;

            //NonAuthController methods
            $scope.tabs = [
                {
                    name: 'Home',
                    url: './views/dashboard/home.html'
                },
                {
                    name: 'Location',
                    url: './views/dashboard/nonauth/location.html'
                },
                {
                    name: 'Contacts',
                    url: './views/dashboard/nonauth/contacts.html'
                }
            ];
            self.currentTab = {
                name: 'Home',
                url: './views/dashboard/home.html'
            };


            self.selectTab = function (tab) {
                self.currentTab = tab;
            };

            self.isSelected = function (tab) {
                return self.currentTab.name === tab.name;
            };

            //LocateCtrl
            $scope.markers = [];
            $scope.cssOpts = {width: '69%', height: '700px', 'min-width': '400px', 'min-height': '200px'};
            $scope.gmOpts = {zoom: 16, center: new google.maps.LatLng(46.671627, 32.610014)};
            $scope.closeInfoWindow = function (infowindow) {
                infowindow.close(true);
            };
            $scope.ready = function (map) {
                var infowindow = new InfoWindow({templateUrl: './views/dashboard/nonauth/marker.html'}); //it's not infowindow now. (object like "javascript promise", but not a promise)
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
                    name: 'Школа 24',
                    position: pos,
                    map: map,
                    title: 'Херсон, 73039, вул. Карбишева, 32.'
                });
                $scope.markers.push(marker);
                attach(marker);

            };
        }]);
});