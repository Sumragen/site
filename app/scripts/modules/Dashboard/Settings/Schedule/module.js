/**
 * Created by trainee on 3/17/16.
 */
define(['angular'], function (module) {
    return module.module('Dashboard.Settings.Schedule', [
            'Dashboard.Settings.Schedule.Stages',
            'Dashboard.Settings.Schedule.Days',
            'Dashboard.Settings.Schedule.Edit'
        ])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.settings.schedule', {
                    url: "/schedule",
                    abstract: true,
                    templateUrl: 'views/Dashboard/Settings/Schedule/master.html'
                });
        });
});