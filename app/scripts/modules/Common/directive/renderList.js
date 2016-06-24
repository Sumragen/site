/**
 * Created by trainee on 5/26/16.
 */
define(['../module'], function (module) {
    module.directive('sRenderList', [
        function () {
            return {
                restrict: 'A',
                controller: 'Common.RenderListController as controller',
                templateUrl: 'views/Common/renderedTable.html',
                scope: {
                    items: '=sRenderList',
                    structure: '=sRenderStructure',
                    filter: '=sRenderFilter',
                    htmlClasses: '=sRenderHtmlClasses',
                    isSettingPage: '=sIsSettingPage',
                    toggleShowEditForm: '=sToggleShowEditForm',
                    removeEvent: '=sRemoveEvent'
                },
                bindToController: true,
                compile: function (tElement, tAttrs) {
                    return {
                        pre: function (scope, element, attrs) {

                        }
                    }
                }
            }
        }
    ])
});