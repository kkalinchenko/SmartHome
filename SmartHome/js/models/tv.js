function TV(volume, channels) {
    Media.call(this, 'tv', volume, channels);
    this.__currentTimerValue = 0;
}

TV.prototype = (function () {
    function isPositiveNumber(value){
        return !isNaN(parseInt(value)) && isFinite(value);
    }

    var __TV = Object.assign(Object.create(Media.prototype), {
        setTimer: function (value) {
            var self = this;
            this.__currentTimerValue = isPositiveNumber(value) && value > 0 ? value : 0;

            if(this.__currentTimerValue > 0){
                self.raiseStateChangeEvent('timer');
                setTimeout(function timerCountdown() {
                    self.__currentTimerValue--;
                    self.raiseStateChangeEvent('timer');
                    if(self.__currentTimerValue > 0){
                        setTimeout(timerCountdown, 1000);
                    } else {
                        self.turnOff();
                    }
                }, 1000);  
            }
        },

        getState: function () {
            var mediaState = Media.prototype.getState.call(this);
            var tvState = Object.assign({
                timerValue : this.__currentTimerValue
            }, mediaState);

            return tvState;
        }


    });

    return __TV;
}());