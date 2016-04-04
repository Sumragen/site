/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('Dashboard.Event',[])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.events', {
                    url: "/events",
                    templateUrl: '../../../../views/Dashboard/Events/events.html',
                    controller: 'Dashboard.Event.EventController as controller',
                    resolve: {
                        eventsData: function (Endpoint, $http, $q) {
                            return $http(Endpoint.events.list())
                                .then(function (data) {
                                    return data;
                                }, function (err) {
                                    return $q.reject(err);
                                });
                        }
                    }
                });
        });

});