/**
 * Created by trainee on 3/17/16.
 */
define(['angular', 'angular-animate'], function (module) {
    return module.module('Dashboard', [
            'Dashboard.Event',
            'Dashboard.Schedule',
            'Dashboard.Settings',
            'Dashboard.Profile'
    ])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard', {
                    url: "/dashboard",
                    abstract: true,
                    templateUrl: './views/dashboard/master.html',
                    controller: 'Dashboard.MasterController as controller',
                    data: {
                        redirect: function (user) {
                            if(!user) return 'common.home';
                        }
                    }
                });
        });
});