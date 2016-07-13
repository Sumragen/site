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
        '$timeout',
        'Dashboard.Settings.Schedule.LessonService',
        'Dashboard.Schedule.ScheduleService',
        'Dashboard.Schedule.ScheduleDataService',
        'Common.Model.LessonService',
        'Common.Model.StageService',
        'Common.Model.SubjectService',
        'Common.Model.TeacherService',
        function ($scope, $stateParams, $uibModal, $uibModalStack, $state, $timeout, lessonServices, scheduleService, scheduleDataService, lessonService, stageService, subjectService, teacherService) {

            $scope.showEditForm = false;
            $scope.lesson = {};
            $scope.lessons = $stateParams.lessons || null;

            $scope.getSubjectsNames = function () {
                subjectService.getSubjects()
                    .then(function (data) {
                        $scope.lesson.form[0].titleMap = _.map(data, reformatObject);
                        $scope.$broadcast('schemaFormRedraw');
                    });
            };

            $scope.getTeachersNames = function () {
                teacherService.getTeachers()
                    .then(function (data) {
                        /**
                         * {
                        day: $scope.selectedDay.title,
                        order: $scope.lesson.order,
                        subjectId: $scope.lesson.model.subject,
                        lesson: {
                            stage: stage || $scope.lesson.stage,
                            suffix: suffix || $scope.lesson.suffix
                        }
                    }
                         */
                        var filteredListOfTeachers = _.filter(data, function (teacher) {
                            return !_.every(teacher.subject, function (teachSubject) {
                                return teachSubject.id != $scope.lesson.model.subject_id;
                            })
                        });
                        $scope.lesson.form[1].titleMap = _.map(filteredListOfTeachers, function (teacher) {
                            return {
                                value: teacher.id,
                                name: teacher.user.name || teacher.user.first_name + ' ' + teacher.user.last_name
                            };
                        });
                        if (_.every(filteredListOfTeachers, function (teacher) {
                                return !(teacher.id == $scope.lesson.model.teacher_id);
                            })) {
                            delete $scope.lesson.model.teacher_id;
                        }
                        $scope.$broadcast('schemaFormRedraw');
                    });
            };
            $scope.cancel = function () {
                goToScheduleEditStagePage();
                $scope.toggleShowEditForm();
            };
            $scope.toggleShowEditForm = function (stage, suffix, index, id) {
                $scope.lesson.stage = stage;
                $scope.lesson.suffix = suffix;
                $scope.lesson.order = index;
                if (_.every($scope.lessons, function (lesson) {
                        if (lesson.stage.stage == stage && lesson.stage.suffix == suffix) {
                            if (lesson.order == index) {
                                $scope.lesson.model = angular.copy(lesson);
                                $scope.lesson.model.stage_id = id;
                                $scope.lesson.model.teacher_id = $scope.lesson.model.teacher.id;
                                $scope.lesson.model.subject_id = $scope.lesson.model.subject.id;
                                $scope.lesson.model.order = index;
                                return false;
                            }
                            return true;
                        }
                        return true;
                    })) {
                    $scope.lesson.model = {
                        stage_id: id,
                        order: index,
                        day: $scope.selectedDay.title
                    };
                }
                $scope.getSubjectsNames();
                $scope.getTeachersNames();
                $scope.showEditForm = !$scope.showEditForm;
            };

            $scope.getLessonNameByOrder = function (stage, suffix, index) {
                var result = null;
                _.every($scope.lessons, function (lesson) {
                    if (lesson.stage.stage == stage && lesson.stage.suffix === suffix) {
                        if (lesson.order == index) {
                            result = lesson.subject.name;
                            return false;
                        }
                        return true;
                    }
                    return true;
                });
                return result;
            };
            $timeout(function () {
                if ($stateParams.day) {
                    $scope.selectedDay = $stateParams.day;
                    if ($stateParams.day.stage) {
                        $scope.lesson.stage = $stateParams.day.stage.stage;
                        $scope.lesson.suffix = $stateParams.day.stage.suffix;
                        $scope.toggleShowEditForm($stateParams.day.stage.stage, $stateParams.day.stage.suffix, $stateParams.day.stage.order, $stateParams.day.stage.id)
                    }
                } else {
                    $state.go('dashboard.settings.schedule.selector');
                }
            });


            stageService.getStages()
                .then(function (data) {
                    $scope.stages = data;
                });


            $scope.updateLesson = function (form) {
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    $scope.busy = true;
                    if (typeof $scope.lesson.model.stage == 'object') {
                        $scope.lesson.model.stage = $scope.lesson.model.stage.id;
                    }
                    lessonService.updateLesson($scope.lesson.model)
                        .then(function (data) {
                            goToScheduleEditStagePage();
                            _.every($scope.lessons, function (lesson, index) {
                                if (lesson.id == data.id) {
                                    $scope.lessons[index] = data;
                                    return false;
                                }
                                return true;
                            });
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
                                goToScheduleEditStagePage();
                            } else {
                                $timeout(function () {
                                    $scope.lessons.push(data);
                                });
                                $scope.toggleShowEditForm();
                            }
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };
            function goToScheduleEditStagePage() {
                if ($stateParams.day.stage) {
                    lessonService.getLessonsByStageId($stateParams.day.stage.id)
                        .then(function (res) {
                            $state.go('dashboard.settings.schedule.edit.stage',
                                {
                                    stage: {
                                        stage: res.stage,
                                        events: res.lessons ? scheduleDataService.parseNewLessons(res.lessons) : []
                                    }
                                });
                        });
                }
            }

            $scope.lesson.schema = {
                "type": "object",
                "properties": {
                    'subject_id': {
                        type: 'number',
                        title: 'Subject'
                    },
                    'teacher_id': {
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
                    "subject_id",
                    "teacher_id",
                    "classroom"
                ]
            };
            $scope.lesson.form = [
                {
                    "key": "subject_id",
                    type: "select",
                    onChange: "getTeachersNames()"
                },
                {
                    "key": "teacher_id",
                    type: "select",
                    //onChange: "getSubjectsNames()"
                },
                {
                    "key": "classroom",
                    "placeholder": "Classroom"
                }
            ];

            function reformatObject(item) {
                return {value: item.id, name: item.name}
            }
        }]);
});