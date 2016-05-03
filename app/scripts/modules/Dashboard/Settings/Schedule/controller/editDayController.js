/**
 * Created by trainee on 3/17/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.Schedule.DayController', [
        '$scope',
        '$stateParams',
        '$uibModal',
        '$uibModalStack',
        '$state',
        'Dashboard.Settings.Schedule.LessonService',
        'Dashboard.Schedule.ScheduleService',
        'Dashboard.Schedule.ScheduleDataService',
        function ($scope, $stateParams, $uibModal, $uibModalStack, $state, lessonService, scheduleService, scheduleDataService) {

            $scope.showEditForm = false;
            $scope.lesson = {};

            $scope.getSubjectsNames = function () {
                lessonService.getSubjectsNames()
                    .then(function (data) {
                        $scope.lesson.form[0].titleMap = _.map(data, reformatObject);
                        $scope.$broadcast('schemaFormRedraw');
                    });
            };

            $scope.getTeachersNames = function (stage, suffix) {
                lessonService.getTeachersNames({
                        day: $scope.selectedDay.title,
                        order: $scope.lesson.order,
                        subjectId: $scope.lesson.model.subject,
                        lesson: {
                            stage: stage || $scope.lesson.stage,
                            suffix: suffix || $scope.lesson.suffix
                        }
                    })
                    .then(function (data) {
                        $scope.lesson.form[1].titleMap = _.map(data.names, reformatObject);
                        if (_.every(data.names, function (name) {
                                return !(name.id === $scope.lesson.model.teacher);
                            })) {
                            delete $scope.lesson.model.teacher;
                        }
                        $scope.$broadcast('schemaFormRedraw');
                    });
            };
            $scope.cancel = function () {
                checkIsStageEdit();
                $scope.toggleShowEditForm();
            };
            $scope.toggleShowEditForm = function (stage, suffix, index) {
                $scope.lesson.stage = stage;
                $scope.lesson.suffix = suffix;
                $scope.lesson.order = index;
                if ($scope.lessons.every(function (lesson) {
                        if (Number(lesson.stage) === stage && lesson.suffix === suffix) {
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
                        onChange: "getTeachersNames()"
                    },
                    {
                        "key": "teacher",
                        type: "select",
                        onChange: "getSubjectsNames()"
                    },
                    {
                        "key": "classroom",
                        "placeholder": "Classroom"
                    }
                ];
                $scope.getSubjectsNames();
                $scope.getTeachersNames();
                $scope.showEditForm = !$scope.showEditForm;
            };

            if ($stateParams.day) {
                $scope.selectedDay = $stateParams.day;
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
                        if ($stateParams.day.stage) {
                            $scope.lesson.stage = $stateParams.day.stage.stage;
                            $scope.lesson.suffix = $stateParams.day.stage.suffix;
                            $scope.toggleShowEditForm($stateParams.day.stage.stage, $stateParams.day.stage.suffix, $stateParams.day.stage.order)
                        }
                    });

            } else {
                $state.go('dashboard.settings.schedule.selector');
            }


            scheduleDataService.getStages()
                .then(function (data) {
                    $scope.stages = data;
                });


            $scope.updateLesson = function (form) {
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    $scope.busy = true;
                    lessonService.updateLesson($scope.lesson.model)
                        .then(function (data) {
                            checkIsStageEdit();
                            $scope.lessons = data;
                            $scope.toggleShowEditForm();
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };

            $scope.createLesson = function (form) {
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    $scope.busy = true;
                    lessonService.createLesson($scope.lesson.model)
                        .then(function (data) {
                            if ($stateParams.day.stage) {
                                checkIsStageEdit();
                            } else {
                                $scope.lessons = data;
                                $scope.toggleShowEditForm();
                            }
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };
            function checkIsStageEdit() {
                if ($stateParams.day.stage) {
                    scheduleService.getStageBySuffix($stateParams.day.stage.id)
                        .then(function (data) {
                            scheduleService.getLessonsByStage(data.data.stage)
                                .then(function (stage) {
                                    $state.go('dashboard.settings.schedule.edit.stage',
                                        {
                                            stage : {
                                                stage : data.data.stage,
                                                events: scheduleDataService.parseNewLessons(stage)
                                            }
                                        });
                                });
                        });
                }
            }

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
                        minimum: 0,
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