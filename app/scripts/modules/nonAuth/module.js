/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('NonAuthModule',[])
        .config(function ($stateProvider) {
            $stateProvider
                .state('nonAuth', {
                    url: "/anonymous",
                    abstract: true,
                    templateUrl: './views/nonauth.html',
                    controller: 'NonAuthController as controller',
                    data: {
                        redirect: function (user) {
                            if(user) return 'dashboard.profile';
                        }
                    }
                })
                .state('nonAuth.home', {
                    url: "/home",
                    templateUrl: './views/tabs/home.html',
                    controller: 'CommonController as controller'

                });
        });

});