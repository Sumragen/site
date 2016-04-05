/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('Settings.Schedule',[])
        .config(function ($stateProvider) {
            $stateProvider
                .state('settings.schedule', {
                    url: "/schedule",
                    templateUrl: 'views/Settings/Schedule/schedule.html',
                    controller: 'Settings.Schedule.ScheduleController as controller',
                    //resolve: {
                    //    eventsData: function (Endpoint, $http, $q) {
                    //        return $http(Endpoint.events.list())
                    //            .then(function (data) {
                    //                return data;
                    //            }, function (err) {
                    //                return $q.reject(err);
                    //            });
                    //    }
                    //}
                });
        });
});