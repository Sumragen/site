/**
 * Created by trainee on 3/17/16.
 */
define(['angular', 'angular-animate'], function (module) {
    return module.module('Settings', [
            'Settings.Users',
            'Settings.Events',
            'Settings.ManageRoles',
            'Settings.Schedule'
    ])
        .config(function ($stateProvider) {
            $stateProvider
                .state('settings', {
                    url: "/settings",
                    abstract: true,
                    templateUrl: 'views/Settings/master.html',
                    controller: 'Settings.MasterController as controller',
                    data: {
                        redirect: function (user) {
                            if(!user) return 'settings.users';
                        }
                    }
                });
        });
});