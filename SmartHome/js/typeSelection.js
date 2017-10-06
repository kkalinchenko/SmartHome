function selectType () {
    var devices = document.querySelector('.carousel_wrapper'),
    devicesList = devices.querySelector('.carousel_list').children,
    addBtn = document.querySelector('.add_btn');

    Array.prototype.forEach.call(devicesList, function(device, index, array){
        device.onclick = function(e) {
            var currentChoosed = Array.prototype.find.call(array, function(el) {
                return el.classList.contains('choosed');
            });
            currentChoosed.classList.remove('choosed');
            device.classList.add('choosed');
        };
    });

    function getType(){
        var type = document.querySelector('.choosed').getAttribute('data-type');
        return type;
    }

    addBtn.onclick = function () {
        var type = getType();
        constructors[type]();
    }
}