/**
 * Created by trainee on 3/17/16.
 */
define(['angular'], function (module) {
    return module.module('Dashboard.Settings.Schedule.Days', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.settings.schedule.days', {
                    url: "/days",
                    templateUrl: 'views/Dashboard/Settings/Schedule/days.html'
                });
        });
});