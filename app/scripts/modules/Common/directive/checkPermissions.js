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
                    sConfirmAction: '&',
                    sConfirmActionArg: '@',
                    sDisabledOpacity: '@'
                },
                link: function (scope, element, attrs) {
                    var currentUser = securityContext.getPrincipal();
                    var listOfPermissions = scope.sCheckPermissions.replace(/\s/g, '').split(',');
                    var confAction = scope.sConfirmAction() || null;
                    var confArg = scope.sConfirmActionArg || null;
                    var checkUser = angular.fromJson(scope.sCheckUser) || null;

                    function setEventOnClick(item) {
                        $(element).click(function () {
                            confAction(item || null)
                        });
                    }

                    function setElementDisabled() {
                        element.addClass('disabled');
                        element.css({
                            opacity: scope.sDisabledOpacity || '0.3',
                            cursor: 'default'
                        });
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
                        /**
                         * Current user has confirmed check permission
                         */
                        if (confAction) {
                            if (confArg) {
                                setEventOnClick(confArg);
                            } else {
                                if(checkUser){
                                    if(checkUser.id == currentUser.id || (checkUser.id != currentUser.id && currentUser.roles[0].id < checkUser.roles[0].id)){
                                        setEventOnClick(checkUser);
                                    }else{
                                        setElementDisabled();
                                    }
                                }else{
                                    setEventOnClick();
                                }
                            }
                        }
                    } else {
                        setElementDisabled();
                    }
                }
            }
        }
    ])
});