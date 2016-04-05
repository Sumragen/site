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
                        scheduleData: function (Endpoint, $http, $q) {
                            return $http(Endpoint.schedule.list())
                                .then(function (data) {
                                    return data.data.schedule;
                                }, function (err) {
                                    return $q.reject(err);
                                });
                        }
                    }
                });
            });
    }
);