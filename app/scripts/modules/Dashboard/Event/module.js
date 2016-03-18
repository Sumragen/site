/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('Dashboard.Event',[])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.events', {
                    url: "/events",
                    templateUrl: './views/dashboard/events/events.html',
                    controller: 'Dashboard.Event.EventController as controller'
                });
        });

});