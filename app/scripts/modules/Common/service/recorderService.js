/**
 * Created by trainee on 5/18/16.
 */
define(['../module'], function (module) {
    module.service('Common.RecorderService', [
        function () {
            var service = {};
            var audio_context = new AudioContext;
            var recorder;
            service.startUserMedia = function(stream) {
                var input = audio_context.createMediaStreamSource(stream);
                recorder = new Recorder(input);
            };
            service.startRecording = function () {
                recorder && recorder.record();
            };
            service.stopRecording = function (url) {
                recorder && recorder.stop();
                service.createDownloadLink(url);
                recorder.clear();
            };
            service.createDownloadLink = function (url) {
                recorder && recorder.exportWAV(function(blob) {
                    url = URL.createObjectURL(blob);
                });
            };
            return service;
    }]);
});