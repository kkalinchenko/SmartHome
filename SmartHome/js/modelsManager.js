var objects = [];

function turnDevice() {
    if(!this.isOn){
        this.turnOn();
    } else{
        this.turnOff();
    }
}
function increaseVolume(mediaDevice){
    var input = mediaDevice.querySelector('.qty_volume');
    this.increaseVolume();
    var volume = this.getState();
    input.value = volume.volume;
}
function decreaseVolume(mediaDevice){
    var input = mediaDevice.querySelector('.qty_volume');
    this.decreaseVolume();
    var volume = this.getState();
    input.value = volume.volume;
}

function switchChannelForward(mediaDevice) {
    var input = mediaDevice.querySelector('.qty_channel');
    this.switchChannelForward();
    var currentChannel = this.getState();
    input.value = currentChannel.channel;
}
function switchChannelBack(mediaDevice) {
    var input = mediaDevice.querySelector('.qty_channel');
    this.switchChannelBack();
    var currentChannel = this.getState();
    input.value = currentChannel.channel;   
}
function getTimerValue(domTv) {
    var timerValue= domTv.querySelector('.setted_value').value;
    return timerValue;
}
function setTvTimer(domTv) {
    var timerValue = getTimerValue(domTv);
    this.setTimer(timerValue);
}

/****subcribers***/

function subscriberTurnDevice() {
    var state = this.getState();
    var domElement = getDomObjectByModel(this);
    redrawTurnButton(domElement, state);
}

function subscriberVolumeDevice () {
    var state = this.getState();
    var domElement = getDomObjectByModel(this);
    redrawVolumeState(domElement, state);
}

function subscriberChannelDevice () {
    var state = this.getState();
    var domElement = getDomObjectByModel(this);
    redrawChannelState(domElement, state);
}

function subcriberTvTimer () {
    var state = this.getState();
    var timerValue = state.timerValue;
    var domElement = getDomObjectByModel(this);
    redrawTimerState(domElement, timerValue);
}

function removeObject () {
    for (var i = 0; i < objects.length; i++) {
        if (this === objects[i]) {
            objects.splice(i, 1);
            break;
        }
    }

    removeObjectFromDom(i);
}

