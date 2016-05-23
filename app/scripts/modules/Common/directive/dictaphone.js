/**
 * Created by trainee on 5/17/16.
 */
define(['../module'], function (module) {
    module.directive('sDictaphone', [
        '$timeout',
        'moment',
        '$interval',
        '$sce',
        'Common.RecorderService',
        'Common.TimerService',
        'dateFilter',
        function ($timeout, moment, $interval, $sce, recorderService, timerService, dateFilter) {
            return {
                restrict: 'A',
                templateUrl: 'views/Common/dictaphone.html',
                link: function (scope, element, attrs) {
                    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
                    navigator.getUserMedia({audio: true}, recorderService.startUserMedia, function (e) {
                        console.log('No live audio input: ' + e);
                    });
                    var music = $('audio.music-player')[0];
                    function setDefaultData() {
                        scope.maxValue = new Date(moment.duration(attrs.sDictaphone || '00:01:00')).getTime();
                        scope.currentValue = 0;
                        scope.dictaphoneButton = 'fiber_manual_record';
                        scope.counter = 0;
                        scope.runClock = null;
                        scope.musicSourceUrl = '';
                        scope.methodOnClick = 'start';
                        timerService.Timer.prototype.stop();
                        timerService.Timer(new Date().getTime() + scope.maxValue);
                        displayTime();
                    }

                    function displayTime() {
                        if (scope.currentValue < scope.maxValue) {
                            scope.currentValue = timerService.Timer.prototype.getElapsedTime();
                            scope.time = moment().hour(0).minute(0).second(Math.floor(scope.currentValue / 1000)).format('HH:mm:ss');
                        } else {
                            scope.stop();
                        }
                    }

                    scope.start = function () {
                        if (scope.runClock == null) {
                            timerService.Timer.prototype.start();
                            recorderService.startRecording();
                            scope.methodOnClick = scope.dictaphoneButton = 'stop';
                            scope.runClock = $interval(displayTime, 50);
                        }
                    };

                    scope.stop = function () {
                        recorderService.stopRecording()
                            .then(function (data) {
                                scope.musicSourceUrl = $sce.trustAsResourceUrl(data);
                            })
                            .catch(function (error) {
                                //catch error
                            });
                        timerService.Timer.prototype.stop();
                        music.load();
                        scope.dictaphoneButton = 'play_arrow';
                        scope.methodOnClick = 'play';
                        $interval.cancel(scope.runClock);
                        scope.runClock = null;
                    };

                    scope.play = function () {
                        if (scope.runClock == null) {
                            scope.counter = 0;
                            scope.maxValue = scope.currentValue;
                            scope.currentValue = 0;
                            displayTime();
                        }
                        if(timerService.Timer.prototype.getElapsedTime() > 0){
                            timerService.Timer.prototype.resume();
                        }else{
                            timerService.Timer.prototype.start();
                        }
                        music.play();
                        scope.runClock = $interval(displayTime, 50);
                        scope.methodOnClick = scope.dictaphoneButton = 'pause';
                    };

                    scope.pause = function () {
                        music.pause();
                        timerService.Timer.prototype.pause();
                        scope.dictaphoneButton = 'play_arrow';
                        scope.methodOnClick = 'play';
                        $interval.cancel(scope.runClock);
                    };

                    scope.download = function () {
                        recorderService.download();
                    };
                    scope.reset = function () {
                        $interval.cancel(scope.runClock);
                        recorderService.stopRecording();
                        setDefaultData();
                    };
                    setDefaultData();
                }
            }
        }]);
});