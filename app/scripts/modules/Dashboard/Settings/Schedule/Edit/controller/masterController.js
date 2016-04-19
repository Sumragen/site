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
            $scope.toggleShowEditForm = function (stage, suffix, index) {
                if ($scope.lessons.every(function (lesson) {
                        if (lesson.stage === stage && lesson.suffix === suffix) {
                            return lesson.order.every(function (order) {
                                if (order === index) {
                                    $scope.lesson.model = angular.copy(lesson);
                                    $scope.lesson.model.teacher = $scope.lesson.model.teacher.id;
                                    $scope.lesson.model.subject = $scope.lesson.model.subject.id;
                                    $scope.lesson.model.order = index;
                                    return false;
                                }
                                return true;
                            })
                        }
                        return true;
                    })) {
                    $scope.lesson.model = {stage: stage, suffix: suffix, order: index, day: $scope.selectedDay.title};
                }
                $scope.showEditForm = !$scope.showEditForm;
            };

            $scope.createLesson = function (form) {
                $scope.busy = false;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    lessonService.createLesson($scope.lesson.model)
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
                    _lessons.every(function (checkLesson) {
                        if (checkLesson.stage === lesson.stage && checkLesson.suffix === lesson.suffix) {
                            _checkResult = false;
                            return false;
                        }
                        return true;
                    });
                    if (_checkResult) {
                        lesson.filterName = lesson.stage + lesson.suffix + ';'
                            + lesson.stage + '-' + lesson.suffix + ';'
                            + lesson.subject.name + ';'
                            + lesson.teacher.name;
                        _lessons.push(lesson);
                    } else {
                        $scope.lessons.every(function (checkLesson) {
                            if (checkLesson.stage === lesson.stage && checkLesson.suffix === lesson.suffix) {
                                checkLesson.filterName += lesson.subject.name + ';' + lesson.teacher.name;
                                return false;
                            }
                            return true;
                        })
                    }
                });
                return _lessons;
            };

            $scope.getLessonNameByOrder = function (stage, suffix, index) {
                var result = null;
                $scope.lessons.every(function (lesson) {
                    if (lesson.stage === stage && lesson.suffix === suffix) {
                        return lesson.order.every(function (order) {
                            if (order === index) {
                                result = lesson.subject.name;
                                return false;
                            }
                            return true;
                        })
                    }
                    return true;
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

            function reformatObject(item) {
                return {value: item.id, name: item.name}
            }

            lessonService.getNames()
                .then(function (data) {
                    $scope.lesson.form = [
                        {
                            "key": "subject",
                            type: "select",
                            titleMap: _.map(data.names.subject, reformatObject)
                        },
                        {
                            "key": "teacher",
                            type: "select",
                            titleMap: _.map(data.names.teacher, reformatObject)
                        },
                        {
                            "key": "classroom",
                            "placeholder": "Classroom"
                        }
                    ]
                });

        }]);
});