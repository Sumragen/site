/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Event.EventController', [
        'Dashboard.Event.EventService',
        '$scope',
        'InfoWindow',
        function (eventService, $scope, InfoWindow) {
            var self = this;
            eventService.loadEvents().then(function (data) {
                $scope.eventList = data.data.events;
            }, function (err) {
                $scope.error = err.data.message
            });
            self.views = [
                {
                    name: 'Table',
                    url: './views/dashboard/events/table.html'
                },
                {
                    name: 'Map',
                    url: './views/dashboard/events/map.html'
                }
            ];
            self.currentView = self.views[0];
            self.selectedPage = function (check) {
                if (check) {
                    self.currentView = self.views[1];
                } else {
                    self.currentView = self.views[0];
                }
            };


            //Map version
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


                for (i = 0; i < $scope.eventList.length; i++) {
                    var marker = new google.maps.Marker({
                        id: $scope.eventList[i].id,
                        name: $scope.eventList[i].name,
                        position: new google.maps.LatLng($scope.eventList[i].positionX, $scope.eventList[i].positionY),
                        map: map,
                        title: $scope.eventList[i].title
                    });
                    $scope.markers.push(marker);
                    attach(marker);
                }
                //var pos = new google.maps.LatLng(46.671627, 32.610014);
                //var marker = new google.maps.Marker({
                //    id: 'id_1',
                //    name: 'School',
                //    position: pos,
                //    map: map,
                //    title: 'School 24'
                //});
                //$scope.markers.push(marker);

                //attach(marker);//attach listener

            };
        }
    ]);
});