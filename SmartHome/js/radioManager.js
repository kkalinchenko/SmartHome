function appendRadioToDom (radio) {

    function getClonedRadioDomObject (){
        var radio = mainContainer.querySelector('.device_radio').cloneNode(true);
        return radio;
    }

    var domRadio    = getClonedRadioDomObject(),
    radioList       = document.querySelector('.radio_container'),
    btnTurn         = domRadio.querySelector('.turn_btn'),
    btnIncrease     = domRadio.querySelector('.increase'),
    btnDecrease     = domRadio.querySelector('.decrease'),
    prevChannel     = domRadio.querySelector('.prev_channel'),
    nextChannel     = domRadio.querySelector('.next_channel'),
    removeBtn       = domRadio.querySelector('.remove_device');

    function addRadioEvents (radio) {
        btnTurn.addEventListener('click', turnDevice.bind(radio));

        /***Volume***/
        btnIncrease.addEventListener('click', increaseVolume.bind(radio, domRadio));
        btnDecrease.addEventListener('click', decreaseVolume.bind(radio, domRadio));

        /***Channel***/
        prevChannel.addEventListener('click', switchChannelForward.bind(radio, domRadio));
        nextChannel.addEventListener('click', switchChannelBack.bind(radio, domRadio));
        
        /***removing***/
        removeBtn.addEventListener('click', removeObject.bind(radio));

        /***subcribers***/
        radio.addStateChangeListener('turn', subscriberTurnDevice);
        radio.addStateChangeListener('volume', subscriberVolumeDevice);
        radio.addStateChangeListener('channel', subscriberChannelDevice);

        var state = radio.getState();
        domRadio.querySelector('.qty_volume').value = state.volume;
        domRadio.querySelector('.qty_channel').value = state.channel;

        disableEnableButtons(domRadio, state);
    }

    addRadioEvents(radio);
    domObjects.push(domRadio);
    radioList.appendChild(domRadio);
}