/**
 * Created by trainee on 5/26/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Common.RenderListController', [
        '$scope',
        function ($scope) {
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
            var key = $scope.controller.filter.key || null;
            $scope.filter = $scope.controller.filter.value || '';

            $scope.sort = function (value) {
                $scope.filter = value;
            };
            $scope.setFilterKey = function (value) {
                key = value || null;
            };
            $scope.getFilterValue = function () {
                if (key) {
                    var result = {};
                    result[key] = $scope.filter;
                    return result;
                } else {
                    return $scope.filter;
                }
            };
        }
    ])
});