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
        'eventsData',
        function ($q, $scope, $timeout, InfoWindow, eventService, eventsData) {
            var self = this;

            function initMap(map) {
                $timeout(function () {
                    google.maps.event.trigger(map, 'resize');
                    map.setCenter(new google.maps.LatLng(46.6718272, 32.6118258));
                });
            }

            $scope.selectedEvent = {};
            $scope.showEditForm = false;
            $scope.toggleShowEditForm = function (event) {
                $timeout(function () {
                    initMap($scope.map);
                    $scope.selectedEvent = event;
                    $scope.showEditForm = !$scope.showEditForm;
                });
            };

            $scope.editEvent = function (form) {
                $scope.busy = false;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    eventService.updateEvent($scope.selectedEvent)
                        .then(function () {
                            $scope.toggleShowEditForm();
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };

            $scope.selectedPage = function (check) {
                $scope.busy = true;
                if (check) {
                    $scope.showMap = true;
                    initMap($scope.map);
                } else {
                    $scope.showMap = false;
                }
                $scope.busy = false;
            };

            //Map version
            $scope.markers = [];
            $scope.cssOpts = {width: '70%', height: '70%', position: 'absolute'};
            $scope.gmOpts = {zoom: 16, mapTypeControlOptions: google.maps.MapTypeControlStyle.HORIZONTAL_BAR};
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
                $scope.showMap = true;

                var infowindow = new InfoWindow({templateUrl: 'views/Dashboard/nonauth/marker.html'}); //it's not infowindow now. (object like "javascript promise", but not a promise)
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

                var panorama = map.getStreetView();

                map.setStreetView(panorama);

                $scope.toggleStreetView = function (marker) {
                    var toggle = panorama.getVisible();
                    if (toggle == false) {
                        panorama.setPosition(marker.position);
                        panorama.setVisible(true);
                    } else {
                        panorama.setVisible(false);
                    }
                };
                $scope.eventList = eventsData;
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
                    $scope.showMap = false;
                });
            };
            $scope.schema = {
                "type": "object",
                "properties": {
                    name: {
                        type: "string",
                        minLength: 1,
                        title: "Name"
                    },
                    description: {
                        type: "string",
                        minLength: 4,
                        title: "Description"
                    },
                    date: {
                        type: "string",
                        minLength: 4,
                        title: "date"
                    },
                    event_map: {
                        type: 'map'
                    }
                },
                "required": [
                    "name",
                    "description",
                    "date"
                ]
            };

            $scope.form = [
                {
                    "key": "name",
                    "placeholder": "Name"

                },
                {
                    "key": "description",
                    "placeholder": "Description"
                },
                {
                    "key": "date",
                    "placeholder": "Date"
                }
            ];
        }
    ]);
});