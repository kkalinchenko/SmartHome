function appendTvToDom(tv) {
    
    function getClonedTvDomObject (){
        var tv = mainContainer.querySelector('.device_tv').cloneNode(true);
        return tv;
    }

    var domTV       = getClonedTvDomObject(),
    tvList          = document.querySelector('.tv_container'),
    btnTurn         = domTV.querySelector('.turn_btn'),
    btnIncrease     = domTV.querySelector('.increase'),
    btnDecrease     = domTV.querySelector('.decrease'),
    prevChannel     = domTV.querySelector('.prev_channel'),
    nextChannel     = domTV.querySelector('.next_channel'),
    removeBtn       = domTV.querySelector('.remove_device'),
    setTimerValue   = domTV.querySelector('.set_timer_value'); 

	function addTvEvents(tv) {
        btnTurn.addEventListener('click', turnDevice.bind(tv));

        /***Volume***/
        btnIncrease.addEventListener('click', increaseVolume.bind(tv, domTV));
        btnDecrease.addEventListener('click', decreaseVolume.bind(tv, domTV));

        /***Chanels***/
        prevChannel.addEventListener('click', switchChannelForward.bind(tv, domTV));
        nextChannel.addEventListener('click', switchChannelBack.bind(tv, domTV));
    
        /***removing***/
        removeBtn.addEventListener('click', removeObject.bind(tv));

        /***timer***/
        setTimerValue.addEventListener('click', setTvTimer.bind(tv, domTV));

        /***subcribers***/
        tv.addStateChangeListener('turn', subscriberTurnDevice);
        tv.addStateChangeListener('volume', subscriberVolumeDevice);
        tv.addStateChangeListener('channel', subscriberChannelDevice);
        tv.addStateChangeListener('timer', subcriberTvTimer);

        var state = tv.getState();
        domTV.querySelector('.qty_volume').value = state.volume;
        domTV.querySelector('.qty_channel').value = state.channel;

        disableEnableButtons(domTV, state);
	}

    addTvEvents(tv);
    domObjects.push(domTV);
    tvList.appendChild(domTV);
}
