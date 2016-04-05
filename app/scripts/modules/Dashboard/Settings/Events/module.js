/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('Dashboard.Settings.Events',[])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.settings.events', {
                    url: "/events",
                    templateUrl: 'views/Dashboard/Settings/Events/events.html',
                    controller: 'Dashboard.Settings.Events.EventsController as controller',
                    resolve: {
                        eventsData: function (Endpoint, $http, $q) {
                            return $http(Endpoint.events.list())
                                .then(function (data) {
                                    return data.data.events;
                                }, function (err) {
                                    return $q.reject(err);
                                });
                        }
                    }
                });
        });
});