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
                        growl.success(message || 'default success message', title || '');
                        break;
                    }
                    case 'warning' :
                    {
                        growl.warning(message || 'default warning message', title || '');
                        break;
                    }
                    case 'error' :
                    {
                        growl.error(message || 'default error message', title || '');
                        break;
                    }
                    case 'info' :
                    {
                        growl.info(message || 'default info message', title || '');
                        break;
                    }
                    default:
                    {
                        growl.info(message || "default block when type doesn't set", title || '');
                    }
                }
            };
            return service;
        }
    ]);
});