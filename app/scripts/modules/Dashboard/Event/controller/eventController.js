/**
 * Created by sumragen on 2/27/16.
 */
define(['../module', 'lodash', 'jquery'], function (module, _) {
    module.controller('Dashboard.Event.EventController', [
        '$q',
        '$scope',
        '$state',
        '$timeout',
        'InfoWindow',
        'Common.StatePreference',
        'Dashboard.Event.EventService',
        'eventsData',
        function ($q, $scope, $state, $timeout, InfoWindow,statePreference, eventService, eventsData) {
            function initMap(map) {
                $timeout(function () {
                    google.maps.event.trigger(map, 'resize');
                    map.setCenter(new google.maps.LatLng(46.6718272, 32.6118258));
                });
            }

            $scope.eventList = eventsData;

            $scope.event = {};
            $scope.isSettingPage = $state.current.name.indexOf('settings') > -1;
            $scope.showEditForm = false;
            if ($scope.isSettingPage) {
                $scope.toggleShowEditForm = function (event) {
                    initMap($scope.map);
                    if (event) {
                        $scope.event.model = angular.copy(event);
                    }else{
                        $scope.event.model = {};
                    }
                    $scope.showEditForm = !$scope.showEditForm;
                };
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
            $scope.addEvent = function (form) {
                $scope.busy = false;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    eventService.addEvent($scope.event.model)
                        .then(function (data) {
                            $scope.eventList = data;
                            $scope.toggleShowEditForm();
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
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
                if(check){
                    initMap($scope.map);
                }
            };

            $scope.saveMarkers = function () {
                _.each($scope.markers, function (marker,index) {
                    $scope.eventList[index].location.latitude = marker.position.lat();
                    $scope.eventList[index].location.longitude = marker.position.lng();
                });
                eventService.updateEventList($scope.eventList);
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
            $scope.ready = function (map) {
                $scope.map = map;

                var infowindow = new InfoWindow({templateUrl: 'views/Dashboard/nonauth/marker.html'}); //it's not infowindow now. (object like "javascript promise", but not a promise)
                function attach(marker) {
                    google.maps.event.addListener(marker, 'click', function () { //on marker click
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
                _.each($scope.eventList, function (event) {
                    var marker = new google.maps.Marker({
                        id: event.id,
                        name: event.name,
                        position: new google.maps.LatLng(event.location.latitude, event.location.longitude),
                        map: map,
                        title: event.description
                    });
                    $scope.markers.push(marker);
                    marker.setDraggable($scope.isSettingPage);
                    attach(marker);
                });
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
            ]
        }
    ]);
});