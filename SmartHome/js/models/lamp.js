function Lamp() {
    Base.call(this, 'lamp');
}

Lamp.prototype = (function () {
    var __Lamp = Object.create(Base.prototype);

    return __Lamp;
})();
