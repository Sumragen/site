/**
 * Created by trainee on 5/12/16.
 */
define(['../module'], function (module) {
    module.service('Common.NotificationService', [
        'growl',
        function (growl) {
            var service = {};
            service.showMessage = function (message, type, title) {
                switch (type ? type.toLowerCase() : null) {
                    case 'success' :
                    {
                        growl.success(message || 'default success message', title ? {title: 'default success title'} : {});
                        break;
                    }
                    case 'warning' :
                    {
                        growl.warning(message || 'default warning message', title ? {title: 'default warning title'} : {});
                        break;
                    }
                    case 'error' :
                    {
                        growl.error(message || 'default error message', title ? {title: 'default error title'} : {});
                        break;
                    }
                    case 'info' :
                    {
                        growl.info(message || 'default info message', title ? {title: 'default info title'} : {});
                        break;
                    }
                    default:
                    {
                        growl.info(message || "default block when type doesn't set", title ? {title: 'default title'} : {});
                    }
                }
            };
            return service;
        }
    ]);
});