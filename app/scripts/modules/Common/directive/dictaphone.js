/**
 * Created by trainee on 5/17/16.
 */
define(['../module'], function (module) {
    module.directive('sDictaphone', [
        '$timeout',
        'moment',
        '$interval',
        'Common.RecorderService',
        'dateFilter',
        function ($timeout, moment, $interval, recorderService, dateFilter) {
            return {
                restrict: 'A',
                templateUrl: 'views/Common/dictaphone.html',
                link: function (scope, element, attrs) {
                    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
                    navigator.getUserMedia({audio: true}, recorderService.startUserMedia, function (e) {
                        console.log('No live audio input: ' + e);
                    });
                    scope.downloadLink = null;
                    function setDefaultData() {
                        scope.maxValue = moment.duration(attrs.sDictaphone || '00:01:00');
                        scope.currentValue = moment.duration('00:00:00');
                        scope.dictaphoneButton = 'fiber_manual_record';
                        scope.counter = 0;
                        scope.runClock = null;
                        scope.methodOnClick = 'start';
                        displayTime();
                    }

                    function displayTime() {
                        if (scope.currentValue < scope.maxValue) {
                            scope.time = moment().hour(0).minute(0).second(scope.counter++).format('HH:mm:ss');
                            scope.currentValue = moment.duration(scope.time);
                        } else {
                            scope.stop();
                        }
                    }

                    scope.start = function () {
                        if (scope.runClock == null) {
                            recorderService.startRecording();
                            scope.methodOnClick = scope.dictaphoneButton = 'stop';
                            scope.runClock = $interval(displayTime, 1000);
                        }
                    };

                    scope.stop = function () {
                        recorderService.stopRecording();
                        scope.dictaphoneButton = 'play_arrow';
                        scope.methodOnClick = 'play';
                        $interval.cancel(scope.runClock);
                        scope.runClock = null;
                    };

                    scope.play = function () {
                        if (scope.runClock == null) {
                            scope.counter = 0;
                            scope.currentValue = moment.duration('00:00:00');
                            scope.maxValue = moment.duration(scope.time);
                            displayTime();
                        }
                        scope.runClock = $interval(displayTime, 1000);
                        scope.methodOnClick = scope.dictaphoneButton = 'pause';
                    };

                    scope.pause = function () {
                        scope.dictaphoneButton = 'play_arrow';
                        scope.methodOnClick = 'play';
                        $interval.cancel(scope.runClock);
                    };

                    scope.download = function () {
                        recorderService.download();
                    };
                    scope.reset = function () {
                        $interval.cancel(scope.runClock);
                        setDefaultData();
                    };
                    setDefaultData();
                }

            }
        }]);
});