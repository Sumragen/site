/**
 * Created by sumragen on 2/27/16.
 */
define(['angular', 'angular-ui-calendar'], function (module) {
        return module.module('Dashboard.Schedule', ['ui.calendar'])
            .config(function ($stateProvider) {
                $stateProvider.state('dashboard.schedule', {
                    url: "/schedule",
                    templateUrl: 'views/Dashboard/Schedule/schedule.html',
                    controller: 'Dashboard.Schedule.ScheduleController as controller',
                    resolve: {
                        scheduleData: function(Endpoint, $http, $q, $timeout) {
                            //fake delay
                            return $timeout(function () {
                                return $http(Endpoint.schedule.list())
                                    .then(function (data) {
                                        return data;
                                    }, function (err) {
                                        return $q.reject(err);
                                    });
                            },1000);
                        }
                    }
                });
            });
    }
);