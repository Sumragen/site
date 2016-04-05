/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('Settings.Events',[])
        .config(function ($stateProvider) {
            $stateProvider
                .state('settings.events', {
                    url: "/events",
                    templateUrl: 'views/Settings/Events/events.html',
                    controller: 'Settings.Events.EventsController as controller',
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