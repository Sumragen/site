/**
 * Created by sumragen on 2/27/16.
 */
define(['../module', 'lodash', 'jquery'], function (module, _) {
    module.controller('Dashboard.Event.EventController', [
        '$q',
        '$scope',
        '$state',
        '$timeout',
        '$window',
        'InfoWindow',
        'Common.StatePreference',
        'Dashboard.Event.EventService',
        'eventsData',
        function ($q, $scope, $state, $timeout, $window, InfoWindow, statePreference, eventService, eventsData) {
            var center = {lat: 46.6718272, lng: 32.6118258};

            function initMap(map) {
                $timeout(function () {
                    google.maps.event.trigger(map, 'resize');
                    map.setCenter(new google.maps.LatLng(center.lat, center.lng));
                });
            }

            $scope.eventList = eventsData;

            $scope.event = {};
            $scope.isSettingPage = $state.current.name.indexOf('settings') > -1;
            $scope.showEditForm = false;
            $scope.showSetMarkerForm = false;
            var clickMapListener = null;

            if ($scope.isSettingPage) {
                $scope.toggleShowEditForm = function (event) {
                    initMap($scope.map);
                    if (event) {
                        $scope.event.model = angular.copy(event);
                    } else {
                        $scope.event.model = {};
                    }
                    $scope.showEditForm = !$scope.showEditForm;
                };
                $scope.toggleShowSetMarkerForm = function (marker) {
                    $scope.deleteMarker = function () {
                        $scope.markers[0].setMap(null);
                        $scope.markers[0].position = null;
                        $scope.event.copyModel.location = null;
                    };
                    clickMapListener = $scope.map.addListener('click', function (event) {
                        $scope.markers[0].setMap($scope.map);
                        $scope.markers[0].position = event.latLng;
                        $scope.event.copyModel.location = event ? {
                            latitude: event.latLng.lat(),
                            longitude: event.latLng.lng()
                        } : null
                    });

                    if (marker) {
                        _.each($scope.markers, function (item, index) {
                            $scope.markers[index].setMap(null);
                        });
                        marker.setDraggable($scope.isSettingPage);
                        $scope.markers = [marker];
                        attach(marker);
                    }
                    $scope.showSetMarkerForm = !$scope.showSetMarkerForm;
                }
            }

            $scope.editEvent = function (form) {
                $scope.busy = false;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    eventService.updateEvent($scope.event.model)
                        .then(function (data) {
                            $scope.eventList = data;
                            $scope.toggleShowEditForm();
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };
            $scope.createEvent = function (form) {
                $scope.busy = false;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    eventService.createEvent($scope.event.model)
                        .then(function (event) {
                            $scope.event.copyModel = event;
                            $scope.eventList.push(event);
                            var marker = new google.maps.Marker({
                                id: event.id,
                                name: event.name,
                                position: null,
                                map: null,
                                title: event.description
                            });
                            $scope.toggleShowEditForm();
                            $scope.toggleShowSetMarkerForm(marker);
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };
            $scope.removeEvent = function (event) {
                $scope.busy = true;
                eventService.removeEvent(event)
                    .then(function (data) {
                        _.every($scope.eventList, function (oldEvent, index) {
                            if ((data[index]) ? data[index].id !== oldEvent.id : true) {
                                $scope.markers[index].setMap(null);
                                $scope.markers.splice(index, 1);
                                return false;
                            }
                            return true;
                        });
                        $scope.eventList = data;
                    })
                    .finally(function () {
                        $scope.toggleShowEditForm();
                        $scope.busy = false;
                    });
            };


            var stateName = 'dashboard.events';
            $scope.showMap = $scope.toggleViews = $scope.map ? statePreference.getStateData(stateName) : false;

            $scope.selectedPage = function (check) {
                var state = {
                    name: stateName,
                    preference: check
                };
                statePreference.setStateData(state);
                $scope.showMap = check;
                if (check) {
                    initMap($scope.map);
                }
            };

            $scope.saveMarkers = function () {
                if (!$scope.showSetMarkerForm) {
                    _.each($scope.markers, function (marker, index) {
                        $scope.eventList[index].location = (marker.position) ? {
                            latitude: marker.position.lat(),
                            longitude: marker.position.lng()
                        } : null;
                    });
                    eventService.updateEventList($scope.eventList)
                        .then(function () {
                            //$window.alert('Done!');
                        })
                        .catch(function (err) {
                            $window.alert(err);
                        });
                } else {
                    $scope.busy = true;
                    eventService.updateEvent($scope.event.copyModel)
                        .then(function (data) {
                            google.maps.event.clearListeners($scope.map, 'click');
                            $scope.eventList = data;
                            $scope.markers[0].setMap(null);
                            createMarkerList()
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                    $scope.toggleShowSetMarkerForm();
                }
            };

            //Map version
            $scope.markers = [];
            $scope.cssOpts = {width: '100%', height: '70%', position: 'absolute'};
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
            var infowindow = new InfoWindow({templateUrl: 'views/Dashboard/nonauth/marker.html'}); //it's not infowindow now. (object like "javascript promise", but not a promise)
            function attach(marker) {
                google.maps.event.addListener(marker, 'click', function () { //on marker click
                    $scope.checkIsStreetViewPossible($scope.map, marker).then(function (result) {
                        marker.hasStreetView = result;
                    });
                    infowindow.$ready(function (wnd) { // pass infowindow object
                        wnd.open($scope.map, marker); //open infowindow
                    });
                });
            }

            function createMarkerList() {
                $scope.markers = [];
                _.each($scope.eventList, function (event) {
                    var marker = new google.maps.Marker({
                        id: event.id,
                        name: event.name,
                        position: event.location ? new google.maps.LatLng(event.location.latitude, event.location.longitude) : null,
                        map: event.location ? $scope.map : null,
                        title: event.description
                    });
                    $scope.markers.push(marker);
                    marker.setDraggable($scope.isSettingPage);
                    attach(marker);
                });
            }

            $scope.ready = function (map) {
                $scope.map = map;

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
                createMarkerList();
            };
            $scope.event.schema = {
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
                        type: "date"
                    }
                },
                "required": [
                    "name",
                    "description",
                    "date"
                ]
            };
            $scope.event.form = [
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
                    "type": "datetimepicker",
                    "$options": {
                        format: 'LLL'
                    },
                    "placeholder": "Date"
                }
            ];
            $scope.autoCompleteControlPosition = google.maps.ControlPosition.TOP_CENTER;
            $scope.placeHolder = 'Enter location';
            $scope.enableDefaultMarker = false;
            $scope.onReverseAddressComplete = function (searchResults) {
                return searchResults[0].formatted_address.split(',').splice(0, 1).join(',');
            };
            $scope.onPlaceChanged = function (map, place, inputValue) {
                if (!$scope.placeMarker) {
                    $scope.placeMarker = new google.maps.Marker({
                        id: 'places_marker',
                        map: null
                    });
                    $scope.placeMarker.setDraggable(true);
                    google.maps.event.addListener($scope.placeMarker, 'dragend', function () {
                        $scope.$broadcast('gmap-auto-complete:reverse', this.position);
                    });
                }
                var position = null;
                if (!place.geometry) {
                    var searchFor = inputValue;
                    if (typeof searchFor === 'string' && searchFor.length > 0) {
                        var splitLatLon = searchFor.split(','),
                            latitude = splitLatLon[0] * 1,
                            longitude = splitLatLon[1] * 1;
                        if (splitLatLon.length == 2 &&
                            angular.isNumber(latitude) &&
                            !angular.isNumber(longitude) &&
                            !isNaN(latitude) && !isNaN(longitude)) {
                            position = {lat: latitude, lng: longitude};
                            map.setCenter(position);
                        }
                    }
                    if (!position) {
                        $scope.placeMarker.setVisible(false);
                        $scope.placesInfoWindow.$ready(function (wnd) {
                            wnd.close();
                        });
                        return;
                    }
                } else {
                    position = place.geometry.location;
                }
                $scope.placeMarker.setPosition(position);
                $scope.placeMarker.setVisible(true);
                $scope.placesInfoWindow.$ready(function (wnd) {
                    wnd.place = place;
                    wnd.open(map, $scope.placeMarker);
                });
            };
        }
    ]);
});