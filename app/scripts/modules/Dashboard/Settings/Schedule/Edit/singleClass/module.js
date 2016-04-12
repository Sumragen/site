/**
 * Created by trainee on 3/17/16.
 */
define(['angular'], function (module) {
    return module.module('Dashboard.Settings.Schedule.Edit.SingleClass', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.settings.schedule.edit.singleClass', {
                    url: "/singleEdit",
                    templateUrl: 'views/Dashboard/Settings/Schedule/Edit/singleClass.html'
                });
        });
});