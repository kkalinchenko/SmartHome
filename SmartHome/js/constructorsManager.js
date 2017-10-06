var constructors = (function (){
	function createTV () {
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

	return {
		tv: createTV,
    radio: createRadio,
    lamp: createLamp
	}
}());