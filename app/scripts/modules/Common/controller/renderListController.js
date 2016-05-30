/**
 * Created by trainee on 5/26/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Common.RenderListController', [
        '$scope',
        '$element',
        '$attrs',
        function ($scope, $element, $attrs) {
            $scope.structure = $scope.controller.structure;
            /**
             * Generate array of items by structure.
             * @type {Array}
             */

            function parsePath(path, value) {
                var result = value;
                _.each(path.split('.'), function (elem) {
                    result[elem] = result[elem] || {};
                    result = result[elem];
                });
                return result;
            }

            $scope.renderedItems = [];
            _.each($scope.controller.items, function (item) {
                var newItem = {};
                _.each($scope.structure, function (param) {
                    var result = '';
                    if (param.value) {
                        _.each(param.value, function (val) {
                            result += parsePath(val, item) + ' ';
                        })
                    } else {
                        result = item[param.key]
                    }
                    if (param.sortable && param.sortBy) {
                        result = {value: result};
                        _.each(param.sortBy, function (val) {
                            if (!result['sortBy']) {
                                result = _.merge(result, {sortBy: parsePath(val, item) + ' '});
                            } else {
                                result['sortBy'] += parsePath(val, item) + ' ';
                            }
                        });
                    }
                    newItem[param.key] = result;
                });
                $scope.renderedItems.push(newItem)
            });


            /**
             * Sortable
             */
            $scope.predicate = 'name';
            $scope.reverse = true;
            $scope.order = function (predicate) {
                if (!_.every($scope.structure, function (param) {
                        return !(param.key == predicate && param.sortable)
                    })) {
                    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                    $scope.predicate = predicate
                }
            };


            /**
             * Filter
             * @type {*|string}
             */
            var key;
            $scope.setFilterKey = function (value) {
                key = value || null;
            };
            $scope.setFilterKey($scope.controller.filter.key);
            $scope.filter = $scope.controller.filter.value || '';

            $scope.sort = function (value) {
                $scope.filter = value;
            };
            $scope.getFilterValue = function () {
                if (key) {
                    var result = {};
                    if (_.every($scope.structure, function (param) {
                            if (param.key == key) {
                                if (param.sortBy) {
                                    result[key] = {sortBy: $scope.filter || ''};
                                } else {
                                    result[key] = $scope.filter || '';
                                }
                                return false;
                            }
                            return true;
                        })) {
                        result[key] = $scope.filter || '';
                    }
                    return result;
                } else {
                    return $scope.filter;
                }
            };

            /**
             * htmlClass
             */
            $scope.checkHtmlClass = function (item, key) {
                var value = $scope.getValue(item, key),
                    result = '';
                _.every($scope.controller.htmlClasses, function (htmlClassParam) {
                    if(htmlClassParam.key == key){
                        _.each(htmlClassParam.values, function (cell) {
                            if(cell.value == value){
                                result = cell.htmlClass || '';
                            }
                        });
                        return false;
                    }
                    return true;
                });
                return result;
            };
            /**
             * Common
             */
            $scope.getValue = function (item, key) {
                if (typeof item[key] == 'object') {
                    return item[key].value;
                } else {
                    return item[key];
                }
            }
        }
    ])
});