/**
 * Created by sumragen on 2/29/16.
 */
define([
        'angular',
        'lodash',
        'angular-ui-router',
        'logicify-gmap',
        'twitter-bootstrap',
        'material',
        'ripples',
        'angular-strap',
        'angular-strap-tpl',
        'angular-animate',
        'angular-mocks',
        'angular-moment',
        'angular-touch',
        //'angular-schema-form',
        'bootstrap-decorator',
        'moment',
        'ui.bootstrap',
        'ui.bootstrap.tpls',
        'modules/Auth/index',
        'modules/Common/index',
        'modules/Dashboard/index'
    ],
    function (angular, _) {
        var deps = [
            'ui.router',
            'ngMockE2E',
            'ngTouch',
            'ngAnimate',
            'ngSanitize',
            'ui.bootstrap',
            'angularMoment',
            'AuthModule',
            'Common',
            'Dashboard'
        ];
        var validationInjector = null;
        var app = angular.module('MyApp', deps)
            .run([
                '$rootScope',
                '$state',
                '$stateParams',
                'Common.SecurityContext',
                '$uibModal',
                '$uibModalStack',
                'Common.ValidationMessagesBuilder',
                function ($rootScope, $state, $stateParams, SecurityContext, $uibModal, $uibModalStack, validationMessagesBuilder) {

                    /**
                     * This method is to-way binding function. It gets a form, set a validation message and give it back
                     */
                    validationInjector = function (form) {
                        //if no validation message and this field is not conditional

                        _.each(form, function (field) {
                            if (angular.isArray(field.items)) {
                                return validationInjector(field.items);
                            }
                            if (!field.validationMessage && !field.condition) {
                                field.validationMessage = validationMessagesBuilder.build(field.title || 'Field');
                            }
                        });
                        return form;
                    };
                    $rootScope.contextUser = SecurityContext.getPrincipal();
                    $rootScope.$on('securityContext:updated', function (e, user) {
                        $rootScope.contextUser = user;
                    });
                    $rootScope.getSchoolName = function () {
                        return 'School ' + '24';//+ user.school;
                    };

                    $rootScope.showSignInModal = function () {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: "./views/auth/logIn.html",
                            controller: "AuthController as controller"
                        });

                        modalInstance.result
                            .then(function () {
                                $state.go('dashboard.profile');
                            }, function () {
                                console.log('Modal dismissed');
                            });
                    };
                    $rootScope.showSignUpModal = function () {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: "../views/auth/signUp.html",
                            controller: "AuthController as controller"
                        });

                        modalInstance.result
                            .then(function () {
                                $state.go('dashboard.profile');
                            }, function () {
                                console.log('Modal dismissed');
                            });
                    };

                    $rootScope.logOut = function () {
                        SecurityContext.setPrincipal(null);
                        $state.go('common.home');
                    };

                    $rootScope.$on('$stateChangeStart', function (event, nextState, nextStateParams, curState, curStateParams) {
                        $uibModalStack.dismissAll();
                        $rootScope.currentState = nextState;
                        //Redirect handling
                        if (nextState.data && nextState.data.redirect) {
                            if (typeof nextState.data.redirect === 'function') {
                                var redirect = nextState.data.redirect(SecurityContext.getPrincipal());
                                if (redirect) {
                                    event.preventDefault();
                                    $state.go(redirect);
                                    return false;
                                }
                            } else {
                                event.preventDefault();
                                $state.go(nextState.data.redirect);
                                return false;
                            }
                        }
                        return true;
                    });
                    $rootScope.stateMatch = function (inState) {
                        return ($rootScope.currentState && $rootScope.currentState.name && $rootScope.currentState.name.indexOf(inState) >= 0)
                    };
                }
            ])
            .config([
                '$stateProvider',
                '$urlRouterProvider',
                'schemaFormProvider',
                'schemaFormDecoratorsProvider',
                function ($stateProvider, $urlRouterProvider, schemaFormProvider ,schemaFormDecoratorsProvider) {

                    schemaFormDecoratorsProvider.addMapping(
                        'bootstrapDecorator',
                        'fileinput',
                        'views/dashboard/profile/uploadFile.html'
                    );

                    schemaFormProvider.postProcess(function (form) {
                        if (typeof validationInjector == 'function') {
                            var form = validationInjector(form);
                            return form;
                        } else {
                            return form;
                        }
                    });
                    $urlRouterProvider.otherwise("/404");
                    $stateProvider
                        .state('root', {
                            url: '',
                            data: {
                                redirect: 'dashboard.profile'
                            }
                        })
                        .state('404', {
                            templateUrl: "./404.html"
                        })
                        .state('accessDenied', {
                            templateUrl: "./accessDenied.html"
                        });
                }]);
        return app;
    });