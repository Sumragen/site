/**
 * Created by trainee on 5/13/16.
 */
define(['../module', 'lodash'], function (module, _) {
    'use strict';
    module.directive('sCheckPermissions', [
        'Common.SecurityContext',
        'ScheduleConstants',
        function (securityContext, scheduleConstants) {
            return {
                restrict: 'A',
                scope: {
                    sCheckPermissions: '@',
                    sCheckUser: '@',
                    sConfirmAction: '&'
                },
                link: function (scope, element, attrs) {
                    var currentUser = securityContext.getPrincipal();
                    var listOfPermissions = scope.sCheckPermissions.replace(/\s/g, '').split(',');
                    function setEventOnClick(expressionHandler, user) {
                        if (expressionHandler) {
                            $(element).click(function (e) {
                                expressionHandler(user || null)
                            });
                        }
                    }
                    /**
                     * Check permissions of current user and specified permissions in directive
                     */
                    if (!_.every(listOfPermissions, function (checkPermission) {
                            if (_.every(currentUser.roles[0].permissions, function (permission) {
                                    return !(scheduleConstants.PERMISSION[checkPermission] === permission);
                                }))
                                return true;
                        })) {
                        var expressionHandler = scope.sConfirmAction() || null;
                        if (scope.sCheckUser) {
                            var user = angular.fromJson(scope.sCheckUser);
                            if (user.id === currentUser.id || (user.id !== currentUser.id && currentUser.roles[0].id < user.roles[0].id)) {
                                setEventOnClick(expressionHandler,user);
                            } else {
                                element.addClass('disabled');
                                element.css({
                                    opacity: '0.3'
                                });
                            }
                        } else {
                            setEventOnClick(expressionHandler)
                        }
                    } else {
                        element.addClass('disabled');
                    }
                }
            }
        }
    ])
});