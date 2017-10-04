 function managerInit() {
    // var devices = document.querySelector('.carousel_wrapper'),
    // devicesList = devices.querySelector('.carousel_list').children,
    var devicesContainer = document.querySelector('.device_container'),
    tvList = document.querySelector('.tv_container'),
    radioList = document.querySelector('.radio_container'),
    lampList = document.querySelector('.lamp_container'),
    addBtn = document.querySelector('.add_btn');


/***creating***/
    var objects = [];
    var domObjects = [];

    var constructors = {
        tv: createTV,
        radio: createRadio,
        lamp: createLamp
    };

    function createTV() {
        var tv = new TV(0, ['Muz TV', 'CNN', 'ICTV', 'SPORT']);
        objects.push(tv);
        appendTvToDom(tv);
    }

    function createRadio() {
        var radio = new Radio(0, ['rd1', 'rd2', 'rd3', 'rd4']);
        objects.push(radio);
        appendRadioToDom(radio);
    }

    function createLamp() {
        var lamp = new Lamp('lamp');
        objects.push(lamp);
        appendLampToDom(lamp);
    }
/***/

    addBtn.onclick = function () {
        var type = getType();
        constructors[type]();
    };

    function getClonedTvDomObject (){
        var tv = document.querySelector('.device_tv').cloneNode(true);
        return tv;
    }
    function getClonedRadioDomObject (){
        var radio = document.querySelector('.device_radio').cloneNode(true);
        return radio;
    }
    function getClonedLampDomObject (){
        var lamp = document.querySelector('.device_lamp').cloneNode(true);
        return lamp;
    }

/***Get type of device***/
    function getType(){
        var type = document.querySelector('.choosed').getAttribute('data-type');
        return type;
    }
/***/
    function getDomObjectByModel(model) {
        for (var i = 0; i < objects.length; i++) {
            if (model === objects[i]) {
                return domObjects[i];
            }
        }

        return null;
    }
/***removing***/
    function removeObjectFromDom(i) {
        var domObj = domObjects.splice(i, 1)[0];
        var parent = domObj.parentElement;
        parent.removeChild(domObj);
    }

    function removeTV() {
        for (var i = 0; i < objects.length; i++) {
            if (this === objects[i]) {
                objects.splice(i, 1);
                break;
            }
        }

        removeObjectFromDom(i);
    }

/***Work with object model****/
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


/***Append to DOM***/
    function appendTvToDom(tv) {
        var domTV = getClonedTvDomObject(); 

        domTV.querySelector('.turn_btn').addEventListener('click', turnDevice.bind(tv));
        /***Volume***/
        domTV.querySelector('.increase').addEventListener('click', increaseVolume.bind(tv, domTV));
        domTV.querySelector('.decrease').addEventListener('click', decreaseVolume.bind(tv, domTV));
        /***Chanels***/
        domTV.querySelector('.prev_channel').addEventListener('click', switchChannelForward.bind(tv, domTV));
        domTV.querySelector('.next_channel').addEventListener('click', switchChannelBack.bind(tv, domTV));
        
        /***removing***/
        domTV.querySelector('.remove_device').addEventListener('click', removeTV.bind(tv));
        /***timer***/
        domTV.querySelector('.set_timer_value').addEventListener('click', setTvTimer.bind(tv, domTV));

        domObjects.push(domTV);
        tvList.appendChild(domTV);
        /***subcribers***/
        tv.addStateChangeListener('turn', subscriberTurnDevice);
        tv.addStateChangeListener('volume', subscriberVolumeDevice);
        tv.addStateChangeListener('channel', subscriberChannelDevice);
        tv.addStateChangeListener('timer', timerSubcriber);

        var state = tv.getState();
        domTV.querySelector('.qty_volume').value = state.volume;
        domTV.querySelector('.qty_channel').value = state.channel;

        disableEnableButtons(domTV, state);
    }

    function appendRadioToDom(radio) {
        var domRadio = getClonedRadioDomObject(); 

        domRadio.querySelector('.turn_btn').addEventListener('click', turnDevice.bind(radio));
        /***Volume***/
        domRadio.querySelector('.increase').addEventListener('click', increaseVolume.bind(radio, domRadio));
        domRadio.querySelector('.decrease').addEventListener('click', decreaseVolume.bind(radio, domRadio));
        /***Chanels***/
        domRadio.querySelector('.prev_channel').addEventListener('click', switchChannelForward.bind(radio, domRadio));
        domRadio.querySelector('.next_channel').addEventListener('click', switchChannelBack.bind(radio, domRadio));
        
        /***removing***/
        domRadio.querySelector('.remove_device').addEventListener('click', removeTV.bind(radio));
        /***timer***/
        domObjects.push(domRadio);
        radioList.appendChild(domRadio);
        /***subcribers***/
        radio.addStateChangeListener('turn', subscriberTurnDevice);
        radio.addStateChangeListener('volume', subscriberVolumeDevice);
        radio.addStateChangeListener('channel', subscriberChannelDevice);

        var state = radio.getState();
        domRadio.querySelector('.qty_volume').value = state.volume;
        domRadio.querySelector('.qty_channel').value = state.channel;

        disableEnableButtons(domRadio, state);
    }

    function appendLampToDom(lamp) {
        var domLamp = getClonedLampDomObject();
        domLamp.querySelector('.turn_btn').addEventListener('click', turnDevice.bind(lamp));
     
        /***removing***/
        domLamp.querySelector('.remove_device').addEventListener('click', removeTV.bind(lamp));
        /***timer***/
        domObjects.push(domLamp);
        lampList.appendChild(domLamp);
        /***subcribers***/
        lamp.addStateChangeListener('turn', subscriberTurnDevice);
    }


    /****subcribers***/
    function getNotification (domElement) {
        var notification = domElement.querySelector('.notification');
        return notification;
    }

    function disableEnableButtons (domElement, state) {
        var buttons = domElement.querySelectorAll('.btn_disable');
        buttons.forEach(function (button) {
            if(state.isOn){
              button.removeAttribute("disabled");  
            } else{
               button.setAttribute("disabled", "disabled"); 
            }
        });
    }

    function redrawTurnButton (domElement, state) {
        var button = domElement.querySelector('.turn_btn');
        var notification = getNotification(domElement);

        if(state.isOn) {
            button.classList.remove('off');
            button.classList.add('on');
        } else{
            button.classList.remove('on');
            button.classList.add('off');
        }
        disableEnableButtons(domElement, state);
        notification.querySelector('.text').innerHTML = 'isON: ' + state.isOn;
    }

    function redrawVolumeState(domElement, state){
        var notification = getNotification(domElement);
        notification.querySelector('.text').innerHTML = 'VOLUME: ' + state.volume;
    }

    function redrawChannelState(domElement, state){
        var notification = getNotification(domElement);
        notification.querySelector('.text').innerHTML= 'CHANNEL: ' + state.channel;
    }

    function redrawTimerState (domElement, timerValue) {
        var notification = getNotification(domElement);
         notification.querySelector('.text').innerHTML = timerValue;
    }

    function subscriberTurnDevice(){
        var state = this.getState();
        var domElement = getDomObjectByModel(this);
        redrawTurnButton(domElement, state);
    }

    function subscriberVolumeDevice(){
        var state = this.getState();
        var domElement = getDomObjectByModel(this);
        redrawVolumeState(domElement, state);
    }

    function subscriberChannelDevice(){
        var state = this.getState();
        var domElement = getDomObjectByModel(this);
        redrawChannelState(domElement, state);
    }

    function timerSubcriber(){
        var state = this.getState();
        var timerValue = state.timerValue;
        var domElement = getDomObjectByModel(this);
        redrawTimerState(domElement, timerValue);
    }

}

