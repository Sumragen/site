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
                            return !_.every(teacher.subjects, function (teachSubject) {
                                return teachSubject != $scope.lesson.model.subject;
                            })
                        });
                        $scope.lesson.form[1].titleMap = _.map(filteredListOfTeachers, function (teacher) {
                            return {value: teacher._id, name: teacher.user.name};
                        });
                        //?
                        if (_.every(filteredListOfTeachers, function (teacher) {
                                return !(teacher._id == $scope.lesson.model.teacher);
                            })) {
                            delete $scope.lesson.model.teacher;
                        }
                        $scope.$broadcast('schemaFormRedraw');
                    });
            };
            $scope.cancel = function () {
                goToScheduleEditStagePage();
                $scope.toggleShowEditForm();
            };
            $scope.toggleShowEditForm = function (stage, suffix, index) {
                $scope.lesson.stage = stage;
                $scope.lesson.suffix = suffix;
                $scope.lesson.order = index;
                if (_.every($scope.lessons, function (lesson) {
                        if (lesson.stage.stage == stage && lesson.stage.suffix == suffix) {
                            if (lesson.order == index) {
                                $scope.lesson.model = angular.copy(lesson);
                                $scope.lesson.model.teacher = $scope.lesson.model.teacher._id;
                                $scope.lesson.model.subject = $scope.lesson.model.subject._id;
                                $scope.lesson.model.order = index;
                                return false;
                            }
                            return true;
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
            if ($stateParams.day) {
                $scope.selectedDay = $stateParams.day;
                lessonService.getLessonsByDay($scope.selectedDay.title)
                    .then(function (data) {
                        $scope.lessons = data;
                        if ($stateParams.day.stage) {
                            $scope.lesson.stage = $stateParams.day.stage.stage;
                            $scope.lesson.suffix = $stateParams.day.stage.suffix;
                            $scope.toggleShowEditForm($stateParams.day.stage.stage, $stateParams.day.stage.suffix, $stateParams.day.stage.order)
                        }
                    });

            } else {
                $state.go('dashboard.settings.schedule.selector');
            }


            stageService.getStages()
                .then(function (data) {
                    $scope.stages = data;
                });


            $scope.updateLesson = function (form) {
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    $scope.busy = true;
                    if (typeof $scope.lesson.model.stage == 'object') {
                        $scope.lesson.model.stage = $scope.lesson.model.stage._id;
                    }
                    lessonService.updateLesson($scope.lesson.model)
                        .then(function (data) {
                            goToScheduleEditStagePage();
                            _.every($scope.lessons, function (lesson, index) {
                                if (lesson._id == data._id) {
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
                    scheduleService.getLessonsByStageId($stateParams.day.stage.id)
                        .then(function (data) {
                            $state.go('dashboard.settings.schedule.edit.stage',
                                {
                                    stage: {
                                        stage: data.data.stage,
                                        events: scheduleDataService.parseNewLessons(data.data.lessons)
                                    }
                                });
                        });
                }
            }

            $scope.lesson.schema = {
                "type": "object",
                "properties": {
                    'subject': {
                        type: 'string',
                        title: 'Subject'
                    },
                    'teacher': {
                        type: 'string',
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
            $scope.lesson.form = [
                {
                    "key": "subject",
                    type: "select",
                    onChange: "getTeachersNames()"
                },
                {
                    "key": "teacher",
                    type: "select",
                    //onChange: "getSubjectsNames()"
                },
                {
                    "key": "classroom",
                    "placeholder": "Classroom"
                }
            ];

            function reformatObject(item) {
                return {value: item._id, name: item.name}
            }
        }]);
});