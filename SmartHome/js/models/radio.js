function Radio(volume, channels) {
    Media.call(this, 'radio', volume, channels);
}


Radio.prototype = (function () {
    var __Radio = Object.create(Media.prototype);

    return __Radio;
}());
