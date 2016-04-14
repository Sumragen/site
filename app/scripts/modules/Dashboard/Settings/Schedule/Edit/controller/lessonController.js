/**
 * Created by trainee on 4/14/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.Schedule.Edit.LessonController', [
        '$scope',
        '$uibModalInstance',
        'Dashboard.Settings.Schedule.Edit.LessonService',
        'selectedLesson',
        function ($scope,$uibModalInstance, lessonService, selectedLesson) {
            var self = this;
            var lessonCopy = selectedLesson;
            $scope.lesson = angular.copy(selectedLesson);

            self.close = function () {
                $uibModalInstance.close();
            };

            $scope.resetChanges = function () {
                $scope.lesson = lessonCopy;
                self.close();
            };

            $scope.saveChanges = function () {
                lessonService.updateLesson($scope.lesson)
                    .then(function (data) {

                    })
                    .finally(function () {
                        self.close();
                    });
            }

        }]);
});