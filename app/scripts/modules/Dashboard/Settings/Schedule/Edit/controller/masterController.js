/**
 * Created by trainee on 3/17/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.Schedule.Edit.DayController', [
        '$scope',
        '$stateParams',
        '$uibModal',
        '$state',
        'Dashboard.Settings.Schedule.Edit.LessonService',
        'Dashboard.Schedule.ScheduleService',
        'Dashboard.Schedule.ScheduleDataService',
        function ($scope, $stateParams, $uibModal, $state, lessonService, scheduleService, scheduleDataService) {
            $stateParams.day ? $scope.selectedDay = $stateParams.day : $state.go('dashboard.settings.schedule.selector');

            $scope.showEditForm = false;
            $scope.lesson = {};
            $scope.toggleShowEditForm = function (lesson) {
                if (lesson) {
                    $scope.lesson.model = angular.copy(lesson);
                } else {
                    $scope.lesson.model = {};
                }
                $scope.showEditForm = !$scope.showEditForm;
            };

            $scope.createLesson = function (form) {
                $scope.busy = false;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    lessonService.addLesson($scope.lesson.model)
                        .then(function (data) {
                            $scope.lessons = data;
                            $scope.toggleShowEditForm();
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };

            lessonService.getLessons()
                .then(function (data) {
                    $scope.lessons = data.lessons;
                });

            $scope.updateLesson = function (form) {
                $scope.busy = false;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    lessonService.updateLesson($scope.event.model)
                        .then(function (data) {
                            $scope.lessons = data;
                            $scope.toggleShowEditForm();
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };

            scheduleService.getStages()
                .then(function (data) {
                    $scope.tempStages = [];

                    _.each(data, function (stage) {
                        $scope.tempStages.push({
                            stage: stage.stage,
                            suffix: stage.suffix,
                            schedule: scheduleDataService.parseLessons(stage.schedule)
                        });
                    });

                    $scope.stages = [];
                    _.each($scope.tempStages, function (stage) {
                        var tempDayLessons = [null, null, null, null, null, null, null, null, null];
                        _.each(stage.schedule, function (lesson) {
                            _.each(_.range(9), function (num) {
                                if (lesson.num === num && $scope.selectedDay.num === lesson.dow[0]) {
                                    tempDayLessons[num] = lesson;
                                }
                            });
                        });
                        stage.filterName = stage.stage + stage.suffix + ' ' + stage.stage + '-' + stage.suffix;
                        $scope.stages.push({
                            stage: stage.stage,
                            suffix: stage.suffix,
                            filterName: stage.filterName,
                            day: tempDayLessons
                        });
                    });
                });

            $scope.lesson.schema = {
                "type": "object",
                "properties": {
                    subject : {
                        type: 'number',
                        title: 'Subject'
                    },
                    teacher : {
                        type: 'number',
                        title: 'Teacher'
                    },
                    classroom: {
                        type: "number",
                        minLength: 3,
                        title: "Classroom"
                    }
                },
                "required": [
                    "subject",
                    "teacher",
                    "classroom"
                ]
            };

            lessonService.getNames()
                .then(function (data) {
                    $scope.lesson.form = [
                        {
                            "key": "subject",
                            type: "select",
                            titleMap: data.names.subject
                        },
                        {
                            "key": "teacher",
                            type: "select",
                            titleMap: data.names.teacher
                        },
                        {
                            "key": "classroom",
                            "placeholder": "Classroom"
                        }
                    ]
                });

        }]);
});