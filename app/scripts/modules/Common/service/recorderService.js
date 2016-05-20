/**
 * Created by trainee on 5/18/16.
 */
define(['../module'], function (module) {
    module.service('Common.RecorderService', [
        function () {
            var service = {};
            var audioContext = new AudioContext;
            var recorder;
            var blob;
            service.startUserMedia = function (stream) {
                var input = audioContext.createMediaStreamSource(stream);
                recorder = new Recorder(input, {
                    workerPath: '/bower_components/recorderjs/recorderWorker.js'
                });
            };
            service.startRecording = function () {
                recorder && recorder.record();
            };
            service.stopRecording = function () {
                recorder && recorder.stop();
                recorder.exportWAV(function (file) {
                    blob = file;
                });
                recorder.clear();
            };
            service.download = function () {
                Recorder.forceDownload(blob, new Date().toISOString() + '.wav');
            };
            service.reset = function () {
                blob = null;
            };
            return service;
        }]);
});