/**
 * Created by trainee on 5/13/16.
 */
define(['../module', 'lodash'], function (module, _) {
    'use strict';
    module.directive('sCheckPermissions', [
        '$parse',
        'Common.SecurityContext',
        'ScheduleConstants',
        function ($parse, securityContext, scheduleConstants) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var currentUser = securityContext.getPrincipal();
                    var listOfPermissions = attrs.sCheckPermissions.replace(/\s/g, '').split(',');
                    var confAction = $parse(attrs.sConfirmAction) || null;
                    var confArg = scope.$eval(attrs.sConfirmActionArg) || null;
                    var checkUser = scope.$eval(attrs.sCheckUser) || null;

                    function setEventOnClick(item) {
                        $(element).click(function () {
                            confAction(scope, {param : item || null});
                        });
                    }

                    function setElementDisabled() {
                        element.addClass('disabled');
                        element.css({
                            opacity: attrs.sDisabledOpacity || '0.3',
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