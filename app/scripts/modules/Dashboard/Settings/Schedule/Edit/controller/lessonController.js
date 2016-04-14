/**
 * Created by trainee on 4/14/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.Schedule.Edit.LessonController', [
        '$scope',
        '$uibModalInstance',
        'selectedLesson',
        function ($scope,$uibModalInstance, selectedLesson) {
            var self = this;

            $scope.lesson = selectedLesson;

            self.close = function () {
                $uibModalInstance.close();
            };

            $scope.resetChanges = function () {
                self.close();
            };

        }]);
});