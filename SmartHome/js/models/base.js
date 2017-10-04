function Base(type) {
    this.isOn = false;
    this.type = type;
}

Base.prototype = (function () {
    var listeners = [];

    return {
        turnOn: function () {
            this.isOn = true;
            this.raiseStateChangeEvent('turn');
        },
        turnOff: function () {
            this.isOn = false;
            this.raiseStateChangeEvent('turn');
        },
        getState: function () {
            return {
                isOn: this.isOn
            }
        },
        addStateChangeListener: function (property, listener) {
            listeners.push({
                property: property,
                callback: listener
            });
        },
        raiseStateChangeEvent: function (property) {
            var self = this;
            listeners.forEach(function (listener) {
                setTimeout(function () {
                        if(property === listener.property){
                            listener.callback.call(self);
                        }
                }, 0)
            });
        }
    }
})();
