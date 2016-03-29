/**
 * Created by sumragen on 2/27/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Event.EventController', [
        '$q',
        '$scope',
        '$timeout',
        'InfoWindow',
        'Dashboard.Event.EventService',
        function ($q, $scope, $timeout, InfoWindow, eventService) {
            var self = this;
            $scope.busy = true;

            function initMap(map) {
                $timeout(function () {
                    google.maps.event.trigger(map, 'resize');
                    map.setCenter(new google.maps.LatLng(46.6718272, 32.6118258));
                });
            }

            self.selectedPage = function (check) {
                if (check) {
                    $scope.showMap = true;
                    initMap($scope.map)
                } else {
                    $scope.showMap = false;
                }
            };

            //Map version
            $scope.markers = [];
            $scope.cssOpts = {width: '100%', height: '700px'};
            $scope.gmOpts = {zoom: 16};
            $scope.closeInfoWindow = function (infowindow) {
                infowindow.close();
            };

            $scope.checkIsStreetViewPossible = function (map, marker) {
                var defer = $q.defer();

                var STREETVIEW_MAX_DISTANCE = 100,
                    streetViewService = new google.maps.StreetViewService();
                //event.stop();
                streetViewService.getPanoramaByLocation(marker.position, STREETVIEW_MAX_DISTANCE, function (result, status) {
                    if (status === google.maps.StreetViewStatus.OK) {
                        defer.resolve(true);
                    } else {
                        defer.resolve(false);
                    }
                });
                return defer.promise;
            };
            $scope.ready = function (map) {

                $scope.map = map;


                var infowindow = new InfoWindow({templateUrl: './views/dashboard/nonauth/marker.html'}); //it's not infowindow now. (object like "javascript promise", but not a promise)
                function attach(marker) {
                    google.maps.event.addListener(marker, 'click', function (markerObj) { //on marker click
                        $scope.checkIsStreetViewPossible($scope.map, marker).then(function (result) {
                            marker.hasStreetView = result;
                        });
                        infowindow.$ready(function (wnd) { // pass infowindow object
                                wnd.open(map, marker); //open infowindow
                        });
                    });
                }

                self.panorama = map.getStreetView();

                map.setStreetView(self.panorama);

                $scope.toggleStreetView = function (marker) {
                    var toggle = self.panorama.getVisible();
                    if (toggle == false) {
                        self.panorama.setPosition(marker.position);
                        self.panorama.setVisible(true);
                    } else {
                        self.panorama.setVisible(false);
                    }
                };

                eventService.loadEvents().then(function (data) {
                    $scope.eventList = data.data.events;
                    _.each($scope.eventList, function (event) {
                        var marker = new google.maps.Marker({
                            id: event.id,
                            name: event.name,
                            position: new google.maps.LatLng(event.location.latitude, event.location.longitude),
                            map: map,
                            title: event.description
                        });
                        $scope.markers.push(marker);
                        marker.setDraggable(true);
                        attach(marker);
                    });
                }, function (err) {
                    $scope.error = err.data.message
                });


            };
        }
    ]);
});