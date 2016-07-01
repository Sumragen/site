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
        'Common.Model.EventService',
        'ScheduleConstants',
        'eventsData',
        function ($q, $scope, $state, $timeout, $window, InfoWindow, statePreference, eventService, scheduleConstants, eventsData) {
            var center = {lat: 46.6718272, lng: 32.6118258};

            function initMap(map) {
                $timeout(function () {
                    google.maps.event.trigger(map, 'resize');
                    map.setCenter(new google.maps.LatLng(center.lat, center.lng));
                });
            }

            $scope.eventList = eventsData;

            $scope.event = {};
            $scope.eventFilter = {key: 'date', value: ''};
            $scope.eventStructure = [
                {
                    key: "name",
                    sortable: true,
                    filtered: true
                }, {
                    key: "description",
                    filtered: true
                }, {
                    key: "date",
                    sortable: true
                }, {
                    key: "address",
                    value: ['address.country', 'address.city'],
                    sortable: true,
                    htmlClass: '',
                    htmlClassFn: function (that) {
                        if (that.value > 0) {
                            return 'may-class';
                        }
                    },
                    sortBy: ['address.city'],
                    filtered: true
                }

            ];
            $scope.eventHtmlClasses = [
                {
                    key: 'name',
                    values: [{
                        value: 'Rest',
                        htmlClass: 'red-colorize'
                    }, {
                        value: 'spring ball',
                        htmlClass: 'green-colorize'
                    }]
                },
                {
                    key: 'description',
                    values: [{
                        value: 'aIXEZLro050IJvpvxxmy',
                        htmlClass: 'yellow-colorize'
                    }]
                }
            ];

            $scope.isSettingPage = $state.current.name.indexOf('settings') > -1;
            $scope.showEditForm = false;
            $scope.showSetMarkerForm = false;
            var clickMapListener = null;

            $scope.toggleShowEditForm = function (event) {
                initMap($scope.map);
                if (event) {
                    $scope.event.model = angular.copy(event);
                } else {
                    $scope.event.model = {};
                }
                $scope.showEditForm = !$scope.showEditForm;
            };
            $scope.deleteMarker = function (marker) {
                if (!marker) {
                    $scope.markers[0].setMap(null);
                    $scope.markers[0].position = null;
                    $scope.event.model.location = null;
                } else {
                    marker.setMap(null);
                    marker.position = null;
                }
            };
            $scope.toggleShowSetMarkerForm = function (marker) {
                clickMapListener = $scope.map.addListener('click', function (event) {
                    $scope.markers[0].setMap($scope.map);
                    $scope.markers[0].position = event.latLng;
                    $scope.event.model.location = event ? {
                        latitude: event.latLng.lat(),
                        longitude: event.latLng.lng()
                    } : null;
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
            };

            $scope.editEvent = function (form) {
                $scope.busy = false;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    eventService.updateEvent($scope.event.model)
                        .then(function (data) {
                            _.every($scope.eventList, function (event, index) {
                                if (event._id == data._id) {
                                    $scope.eventList[index] = data;
                                    $scope.markers[index].name = data.name;
                                    $scope.markers[index].title = data.description;
                                    return false;
                                }
                                return true;
                            });
                            $scope.toggleShowEditForm();
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };

            $scope.toggleShowSecondStepOfEventCreate = function (form) {
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    var event = $scope.event.model;
                    var marker = new google.maps.Marker({
                        name: event.name,
                        position: null,
                        map: null,
                        title: event.description
                    });
                    $scope.toggleShowEditForm(event);
                    $scope.toggleShowSetMarkerForm(marker);
                }
            };
            $scope.resetMarkers = function () {
                createMarkerList();
            };
            $scope.removeEvent = function (event) {
                $scope.busy = true;
                event = event || $scope.eventList[$scope.eventList.length - 1];
                eventService.deleteEvent(event)
                    .then(function (data) {
                        if ($scope.markers.length > 1) {
                            _.every($scope.eventList, function (oldEvent, index) {
                                if (oldEvent._id == data._id) {
                                    $scope.markers[index].setMap(null);
                                    $scope.markers.splice(index, 1);
                                    $scope.eventList.splice(index, 1);
                                    return false;
                                }
                                return true;
                            });
                        } else {
                            if ($scope.markers[0]) {
                                $scope.deleteMarker();
                            }
                        }
                    })
                    .finally(function () {
                        if ($scope.showSetMarkerForm) {
                            google.maps.event.clearListeners($scope.map, 'click');
                            $scope.markers[0].setMap(null);
                            $scope.toggleShowSetMarkerForm();
                        } else {
                            $scope.toggleShowEditForm();
                        }
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
                    eventService.updateEventList($scope.eventList);
                } else {
                    $scope.busy = true;
                    eventService.createEvent($scope.event.model)
                        .then(function (event) {
                            $scope.eventList.push(event);
                            google.maps.event.clearListeners($scope.map, 'click');
                            $scope.markers[0].setMap(null);
                            createMarkerList();
                        })
                        .finally(function () {
                            $scope.busy = false;
                            $scope.toggleShowSetMarkerForm();
                        });
                }
            };

            $scope.markers = [];
            $scope.cssOpts = {width: '100%', height: '70%', position: 'absolute'};
            $scope.gmOpts = {zoom: 16, mapTypeControlOptions: google.maps.MapTypeControlStyle.HORIZONTAL_BAR};
            $scope.closeInfoWindow = function (infowindow) {
                infowindow.close();
            };

            $scope.checkIsStreetViewPossible = function (map, marker) {
                var defer = $q.defer();
                var streetViewService = new google.maps.StreetViewService();
                //event.stop();
                streetViewService.getPanoramaByLocation(marker.position, scheduleConstants.STREETVIEW_MAX_DISTANCE, function (result, status) {
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
                _.each($scope.markers, function (marker) {
                    $scope.deleteMarker(marker);
                });
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
                if (!$scope.placesInfoWindow) {
                    $scope.placesInfoWindow = new InfoWindow(null);
                }
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
                            angular.isNumber(latitude) && !angular.isNumber(longitude) && !isNaN(latitude) && !isNaN(longitude)) {
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