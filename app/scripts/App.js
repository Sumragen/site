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
        'angular-strap',
        'angular-strap-tpl',
        'angular-animate',
        'angular-mocks',
        'angular-moment',
        'angular-touch',
        'angular-ui-select',
        'angular-growl-v2',
        'infiniteScroll',
        'bootstrapDateTimePicker',
        'bootstrap-decorator',
        'moment',
        'googleApi',
        'microsoftApi',
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
            'ui.select',
            'ngSanitize',
            'ui.bootstrap',
            'angularMoment',
            'angular-growl',
            'AuthModule',
            'infinite-scroll',
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
                'Common.PermissionsService',
                function ($rootScope, $state, $stateParams, SecurityContext, $uibModal, $uibModalStack, validationMessagesBuilder, permissionsService) {

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
                        return 'School 24';
                    };


                    $rootScope.showSignInModal = function () {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: "../views/Auth/logIn.html",
                            controller: "AuthController as controller",
                            resolve: {
                                userData: null
                            }
                        });

                        modalInstance.result
                            .then(function () {
                                $state.go('dashboard.profile');
                            }, function () {
                                //catch some errors
                            });
                    };
                    $rootScope.showSignUpModal = function () {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: "../views/Auth/signUp.html",
                            controller: "AuthController as controller",
                            resolve: {
                                userData: null
                            }
                        });

                        modalInstance.result
                            .then(function () {
                                $state.go('dashboard.profile');
                            }, function () {
                                //catch some errors
                            });
                    };

                    $rootScope.logOut = function () {
                        SecurityContext.setPrincipal(null);
                        $state.go('common.home');
                    };

                    $rootScope.$on('$stateChangeStart', function (event, nextState, nextStateParams, curState, curStateParams) {
                        $uibModalStack.dismissAll();
                        $rootScope.currentState = nextState;
                        $rootScope.globalButtons = (nextState.data || {}).buttons || $rootScope.globalButtons;
                        //Redirect handling
                        if (nextState.data && nextState.data.redirect) {
                            if (typeof nextState.data.redirect === 'function') {
                                var redirect = nextState.data.redirect(SecurityContext.getPrincipal(), permissionsService);
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
                '$provide',
                'growlProvider',
                'schemaFormProvider',
                'schemaFormDecoratorsProvider',
                function ($stateProvider, $urlRouterProvider, $provide, growlProvider, schemaFormProvider, schemaFormDecoratorsProvider) {

                    growlProvider.globalTimeToLive(3000);
                    growlProvider.globalReversedOrder(true);
                    growlProvider.onlyUniqueMessages(false);
                    growlProvider.globalPosition('top-right');


                    $provide.decorator('$httpBackend', function ($delegate) {
                        var proxy = function (method, url, data, callback, headers) {
                            var interceptor = function () {
                                var _this = this,
                                    _argumenrs = arguments;
                                setTimeout(function () {
                                    callback.apply(_this, _argumenrs);
                                }, 100);
                            };
                            return $delegate.call(this, method, url, data, interceptor, headers);
                        };
                        for (var key in $delegate) {
                            proxy[key] = $delegate[key];
                        }
                        return proxy;
                    });

                    schemaFormDecoratorsProvider.addMapping(
                        'bootstrapDecorator',
                        'fileinput',
                        'views/Common/uploadFile.html'
                    );

                    schemaFormDecoratorsProvider.addMapping(
                        'bootstrapDecorator',
                        'datetimepicker',
                        'views/Common/datetimepicker.html'
                    );

                    schemaFormDecoratorsProvider.addMapping(
                        'bootstrapDecorator',
                        'multiselect',
                        'views/Common/multiselect.html'
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