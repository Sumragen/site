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
                    $scope.lesson.model = angular.copy(lesson.lesson);
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

            lessonService.getLessons($scope.selectedDay)
                .then(function (data) {
                    $scope.lessons = data.lessons;
                });


            $scope.listOfLessons = function () {
                var _lessons = [];
                _.each($scope.lessons, function (lesson) {
                    var _checkResult = true;
                    _.find(_lessons, function (checkLesson) {
                        if (checkLesson.stage === lesson.stage && checkLesson.suffix === lesson.suffix) {
                            _checkResult = false;
                        }
                    });
                    if (_checkResult) {
                        lesson.filterName = lesson.stage + lesson.suffix + ';'
                            + lesson.stage + '-' + lesson.suffix + ';'
                            + lesson.subject.name + ';'
                            + lesson.teacher.name;
                        _lessons.push(lesson);
                    } else {
                        _.find($scope.lessons, function (checkLesson) {
                            if (checkLesson.stage === lesson.stage && checkLesson.suffix === lesson.suffix) {
                                checkLesson.filterName += lesson.subject.name + ';' + lesson.teacher.name;
                            }
                        })
                    }
                });
                return _lessons;
            };

            $scope.checkOrder = function (stage, suffix, index) {
                var result = null;
                _.find($scope.lessons, function (lesson) {
                    if (lesson.stage === stage && lesson.suffix === suffix) {
                        _.find(lesson.order, function (order) {
                            if (order === index) {
                                result = lesson.subject.name;
                            }
                        })
                    }
                });
                return result;
            };

            $scope.updateLesson = function (form) {
                $scope.busy = false;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    lessonService.updateLesson($scope.lesson.model)
                        .then(function (data) {
                            $scope.lessons = data;
                            $scope.toggleShowEditForm();
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };

            $scope.lesson.schema = {
                "type": "object",
                "properties": {
                    'subject': {
                        type: 'number',
                        title: 'Subject'
                    },
                    'teacher': {
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
                    var _names = {subject: [], teacher: []};
                    _.each(data.names.subject, function (subject) {
                        _names.subject.push({value: subject.id, name: subject.name});
                    });
                    _.each(data.names.teacher, function (teacher) {
                        _names.teacher.push({value: teacher.id, name: teacher.name});
                    });
                    $scope.lesson.form = [
                        {
                            "key": "subject",
                            type: "select",
                            titleMap: _names.subject
                        },
                        {
                            "key": "teacher",
                            type: "select",
                            titleMap: _names.teacher
                        },
                        {
                            "key": "classroom",
                            "placeholder": "Classroom"
                        }
                    ]
                });

        }]);
});