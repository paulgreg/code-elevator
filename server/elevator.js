var elevator = function(_atFloor, _to, _floorToGo, _open) {

    var atFloor = _atFloor || 0;
    var to = _to || '';
    var floorToGo = _floorToGo || 0;
    var open = _open === true;
    var state = 'NOTHING';

    var reset = function() {
        atFloor = 0;
        to = '';
        floorToGo = 0;
        isOpen = true;
        state = 'NOTHING';
    };

    var nextCommand = function() {
        if (!open) {
            if (to === 'UP')        state = 'UP';
            if (to === 'DOWN')      state = 'DOWN';
        }
        else {
            state = 'NOTHING';
        }
        return state;
    };

    return {
        'reset': reset,
        'nextCommand': nextCommand
    };
};

module.exports = elevator;
