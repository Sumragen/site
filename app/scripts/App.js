/**
 * Created by sumragen on 2/29/16.
 */
define([
        'angular',
        'angular-ui-router',
        'logicify-gmap',
        'twitter-bootstrap',
        'angular-strap',
        'angular-strap-tpl',
        'angular-animate',
        'angular-mocks',
        'modules/Auth/index',
        //'modules/moduleRoot/index',
        'modules/Common/index',
        'modules/Location/index',
        'modules/Settings/index',
        'modules/Profile/index'
    ],
    function(angular){
        var deps = [
            'ui.router',
            'ngMockE2E',
            'AuthModule',
            'LocationModule',
            'SettingsModule',
            'ProfileModule'
        ];
        var app = angular.module('MyApp', deps)
            //.run([
            //    '$rootScope',
            //    '$state',
            //    '$stateParams',
            //    '$uibModalStack',
            //    'growl',
            //    'DockerWebUI.Common.APIRoutes',
            //    'DockerWebUI.Common.HttpService',
            //    function ($rootScope, $state, $stateParams, $uibModalStack, growl, apiRoutes, httpService) {
            //        //get docker version
            //        httpService.request(apiRoutes.docker.version())
            //            .then(function (response) {
            //                $rootScope.$docker = response;
            //            })
            //            .catch(function (response) {
            //                growl.error(response);
            //            });
            //        $rootScope.$on('$stateChangeStart', function (event, nextState, nextStateParams, curState, curStateParams) {
            //            $uibModalStack.dismissAll();
            //            $rootScope.currentState = nextState;
            //            //Redirect handling
            //            if (nextState.data && nextState.data.redirect) {
            //                event.preventDefault();
            //                $state.go(nextState.data.redirect);
            //                return false;
            //            }
            //            return true;
            //        });
            //        $rootScope.stateMatch = function (inState) {
            //            if ($rootScope.currentState && $rootScope.currentState.name && $rootScope.currentState.name.indexOf(inState) >= 0) {
            //                return true;
            //            }
            //            return false;
            //        };
            //    }
            //])
            .config(function($stateProvider, $urlRouterProvider){
                $urlRouterProvider.otherwise("/404");
                $stateProvider
                    .state('root', {
                        url: "/",
                        templateUrl: "./views/master.html",
                        controller:'CommonController as controller'
                    })
                    .state('404', {
                        url: "/404",
                        templateUrl: "./views/404.html"
                    });
            });
        return app;
    });