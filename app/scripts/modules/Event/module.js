/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('EventModule',[])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.events', {
                    url: "/events",
                    templateUrl: './views/tabs/events.html',
                    controller: 'EventController as controller'
                });
        });

});