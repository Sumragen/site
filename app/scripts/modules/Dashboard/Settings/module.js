/**
 * Created by trainee on 3/17/16.
 */
define(['angular', 'angular-animate'], function (module) {
    return module.module('Dashboard.Settings', [
            'Dashboard.Settings.Users',
            'Dashboard.Settings.ManageRoles'
        ])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.settings', {
                    url: "/settings",
                    abstract: true,
                    templateUrl: 'views/Dashboard/Settings/master.html',
                    controller: 'Dashboard.Settings.MasterController as controller',
                    data: {
                        //check user permissions
                        redirect: function (user) {
                            if (!user) {
                                return 'common.home';
                            }
                        }
                    }
                })
                .state('dashboard.settings.events', {
                    url: "/events",
                    templateUrl: 'views/Dashboard/Events/events.html',
                    controller: 'Dashboard.Event.EventController as controller',
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
                })
                .state('dashboard.settings.schedule', {
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
});