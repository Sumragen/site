/**
 * Created by trainee on 5/18/16.
 */
define(['../module'], function (module) {
    module.service('Common.TimerService', [
        function () {
            var service = {};
            service.Timer = function (timeout, autostop) {
                this.timeout = timeout;
                this.endTime = null;
                this.inProgress = false;
                this.startTime = null;
                this.pauseTime = null;
                this.difference = 0;
                //in milliseconds
                this.autoStop = autostop || false;
                this.onUpdate = null;
            };

            service.Timer.prototype.start = function (autostop) {
                if (this.inProgress) {
                    throw new Error('Timer already in progress. You can\'t start it twice.');
                }
                var self = this;
                self.autoStop = autostop || self.autoStop;
                self.inProgress = true;
                self.duration = 0;
                self.difference = 0;
                self.endTime = null;
                self.pauseTime = null;
                self.startTime = new Date().getTime();
                if (self.autoStop) {
                    self.$timeOutAutostop = setTimeout(function () {
                        self.stop(new Date().getTime());
                        if (typeof self.onAutoStop === 'function') {
                            self.onAutoStop();
                        }
                    }, self.autoStop);
                }
                self.$interval = setInterval(function () {
                    if (typeof self.onUpdate === 'function') {
                        self.onUpdate();
                    }
                }, self.timeout);
            };
            service.Timer.prototype.stop = function (time) {
                if (!this.inProgress) {
                    return false;
                }
                this.inProgress = false;
                this.endTime = time || new Date().getTime();
                this.duration = this.endTime - this.startTime - this.difference;
                if (this.$interval) {
                    clearInterval(this.$interval);
                    delete this.$interval;
                }
                if (this.$timeOutAutostop) {
                    clearTimeout(this.$timeOutAutostop);
                    delete this.$timeOutAutostop;
                }
            };
            service.Timer.prototype.pause = function () {
                this.pauseTime = new Date().getTime();
            };
            service.Timer.prototype.resume = function () {
                this.difference += new Date().getTime() - this.pauseTime;
                delete this.pauseTime;
            };
            service.Timer.prototype.getSeconds = function () {
                if (!this.inProgress) {
                    return '00';
                }
                var seconds = null;
                if (this.pauseTime == null) {
                    seconds = Math.floor((new Date().getTime() - this.startTime - this.difference) / 1000);
                } else {
                    seconds = Math.floor((this.pauseTime - this.startTime - this.difference) / 1000);
                }
                if (seconds > 9) {
                    return seconds;
                } else {
                    return '0' + seconds;
                }
            };
            service.Timer.prototype.getMilliseconds = function () {
                if (!this.inProgress) {
                    return '00';
                }
                var ms = null;
                if (this.pauseTime == null) {
                    ms = Math.floor(((new Date().getTime() - this.startTime - this.difference) % 1000) / 10);
                } else {
                    ms = Math.floor(((this.pauseTime - this.startTime - this.difference) % 1000) / 10);
                }
                if (ms > 9) {
                    return ms;
                } else {
                    return '0' + ms;
                }
            };
            service.Timer.prototype.getElapsedTime = function () {
                if (!this.inProgress) {
                    return 0;
                }
                if (this.pauseTime == null) {
                    return new Date().getTime() - this.startTime - this.difference;
                } else {
                    return this.pauseTime - this.startTime - this.difference;
                }
            };
            return service;
        }
    ])
});