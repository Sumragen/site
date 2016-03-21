/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Event.EventController', [
        'Dashboard.Event.EventService',
        '$scope',
        function (eventService, $scope) {
            var self = this;

            $scope.testLine = 'testLine';

            eventService.loadEvents().then(function (data) {
                $scope.eventList = data.data.events;
            }, function (err) {
                $scope.error = err.data.message
            });
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
        }
    ]);
});