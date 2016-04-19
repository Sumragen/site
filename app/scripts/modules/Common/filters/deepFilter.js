/**
 * Created by trainee on 4/19/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module
        .filter('deepFilter', function () {
            return function (items, object) {
                function deepToObject(inputItem, object) {
                    var arr = Object.keys(object);
                    var hasNoValue = false;
                    var match = _.every(arr, function (itemKey) {
                        if(object[itemKey] == null){
                            hasNoValue = true;
                            return false;
                        }
                        if (!inputItem[itemKey]) {
                            return true;
                        }
                        if (typeof object[itemKey] == 'object') {
                            return !deepToObject(inputItem[itemKey], object[itemKey]);
                        } else {
                            return !((inputItem[itemKey]+'').toLowerCase().indexOf(object[itemKey].toLowerCase()) >-1);
                        }
                    });
                    return hasNoValue || !match;
                }

                if (items && typeof object == 'object') {
                    return _.filter(items, function (item) {
                        return deepToObject(item, object)
                    });
                }
            };
        })
});