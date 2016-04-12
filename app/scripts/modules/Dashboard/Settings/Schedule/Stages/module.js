/**
 * Created by trainee on 3/17/16.
 */
define(['angular'], function (module) {
    return module.module('Dashboard.Settings.Schedule.Stages', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.settings.schedule.stages', {
                    url: "/stages",
                    templateUrl: 'views/Dashboard/Settings/Schedule/stages.html'
                });
        });
});