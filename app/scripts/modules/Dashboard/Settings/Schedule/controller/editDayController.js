/**
 * Created by trainee on 3/17/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.Schedule.DayController', [
        '$scope',
        '$stateParams',
        '$uibModal',
        '$state',
        'Dashboard.Settings.Schedule.LessonService',
        'Dashboard.Schedule.ScheduleService',
        'Dashboard.Schedule.ScheduleDataService',
        function ($scope, $stateParams, $uibModal, $state, lessonService, scheduleService, scheduleDataService) {
            $stateParams.day ? $scope.selectedDay = $stateParams.day : $state.go('dashboard.settings.schedule.selector');

            $scope.showEditForm = false;
            $scope.lesson = {};

            $scope.getSubjectsNames = function() {
                lessonService.getSubjectsNames($scope.lesson.model.teacher)
                    .then(function (data) {
                        $scope.subjectNames = data.names;
                        $scope.$broadcast('schemaFormRedraw');
                    });
            };

            $scope.getTeachersNames = function() {
                lessonService.getTeachersNames($scope.lesson.model.subject)
                    .then(function (data) {
                        $scope.teacherNames = data.names;
                        $scope.$broadcast('schemaFormRedraw');
                    });
            };

            $scope.toggleShowEditForm = function (stage, suffix, index) {
                lessonService.getNames({
                        day: $scope.selectedDay.title,
                        order: index,
                        lesson: {
                            stage: stage,
                            suffix: suffix
                        },
                        subject: ($scope.lesson.model) ? $scope.lesson.model.subject || null : null,
                        teacher: ($scope.lesson.model) ? $scope.lesson.model.teacher || null : null
                    })
                    .then(function (data) {

                        if ($scope.lessons.every(function (lesson) {
                                if (Number(lesson.stage) === stage && lesson.suffix === suffix) {
                                    return lesson.order.every(function (order) {
                                        if (order === index) {
                                            $scope.lesson.model = angular.copy(lesson);
                                            $scope.lesson.model.teacher = $scope.lesson.model.teacher.id;
                                            $scope.lesson.model.subject = $scope.lesson.model.subject.id;
                                            $scope.lesson.model.order = index;
                                            $scope.getSubjectsNames();
                                            $scope.getTeachersNames();
                                            return false;
                                        }
                                        return true;
                                    })
                                }
                                return true;
                            })) {
                            $scope.lesson.model = {
                                stage: stage,
                                suffix: suffix,
                                order: index,
                                day: $scope.selectedDay.title
                            };
                        }
                        $scope.lesson.form = [
                            {
                                "key": "subject",
                                type: "select",
                                onChange: "getTeachersNames()",
                                titleMap: _.map($scope.subjectNames || data.names.subject, reformatObject)
                            },
                            {
                                "key": "teacher",
                                type: "select",
                                onChange: "getSubjectsNames()",
                                titleMap: _.map($scope.teacherNames || data.names.teacher, reformatObject)
                            },
                            {
                                "key": "classroom",
                                "placeholder": "Classroom"
                            }
                        ];
                        $scope.showEditForm = !$scope.showEditForm;
                    });
            };

            scheduleDataService.getStages()
                .then(function (data) {
                    $scope.stages = data;
                });

            $scope.createLesson = function (form) {
                $scope.busy = true;
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

            lessonService.getLessonsByDay($scope.selectedDay)
                .then(function (data) {
                    $scope.lessons = data.lessons;
                    $scope.getLessonNameByOrder = function (stage, suffix, index) {
                        var result = null;
                        $scope.lessons.every(function (lesson) {
                            if (Number(lesson.stage) === stage && lesson.suffix === suffix) {
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
                });

            $scope.updateLesson = function (form) {
                $scope.busy = true;
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
        }]);
});