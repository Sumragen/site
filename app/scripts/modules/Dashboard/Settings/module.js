/**
 * Created by trainee on 3/17/16.
 */
define(['angular', 'angular-animate'], function (module) {
    return module.module('Dashboard.Settings', [
            'Dashboard.Settings.Users',
            'Dashboard.Settings.Events',
            'Dashboard.Settings.ManageRoles',
            'Dashboard.Settings.Schedule'
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
                });
        });
});