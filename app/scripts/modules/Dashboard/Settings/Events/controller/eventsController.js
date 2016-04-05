/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Settings.Events.EventsController', [
        '$q',
        '$scope',
        '$timeout',
        'InfoWindow',
        'Dashboard.Settings.Events.EventsService',
        'eventsData',
        function ($q, $scope, $timeout, InfoWindow, eventsService, eventsData) {
            var self = this;
            $scope.events = eventsData;


            $scope.selectedEvent = {};
            self.showSchemaForm = false;
            self.toggleShowSchemaForm = function (event) {
                $timeout(function () {
                    initMap($scope.map);
                    $scope.selectedEvent = event;
                    self.showSchemaForm = !self.showSchemaForm;
                });
            };

            self.editEvent = function (form) {
                $scope.busy = true;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    eventsService.updateEvent($scope.selectedEvent)
                        .then(function () {
                            self.toggleShowSchemaForm($scope.selectedEvent);
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };

            function initMap(map) {
                $timeout(function () {
                    google.maps.event.trigger(map, 'resize');
                    map.setCenter(new google.maps.LatLng(46.6718272, 32.6118258));
                });
            }

            $scope.markers = [];
            $scope.cssOpts = {width: '100%', height: '97%', position: 'absolute'};
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
                var marker = new google.maps.Marker({
                    id: event.id,
                    name: event.name,
                    position: new google.maps.LatLng($scope.selectedEvent.location.latitude, $scope.selectedEvent.location.longitude),
                    map: map,
                    title: event.description
                });
                $scope.markers.push(marker);
                marker.setDraggable(true);
                attach(marker);
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
                //{
                //    key: 'event_map',
                //    gmOpts: $scope.gmOpts,
                //    cssOpts: $scope.cssOpts,
                //    ready: $scope.ready,
                //    type: 'eventmap'
                //},
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