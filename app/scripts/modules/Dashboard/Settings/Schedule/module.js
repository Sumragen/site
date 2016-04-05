/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('Dashboard.Settings.Schedule',[])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.settings.schedule', {
                    url: "/schedule",
                    templateUrl: 'views/Dashboard/Settings/Schedule/schedule.html',
                    controller: 'Dashboard.Settings.Schedule.ScheduleController as controller',
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