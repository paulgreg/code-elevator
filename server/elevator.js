var elevator = function(_currentFloor, _to) {

    var MAX = 5;

    var open = false,
        currentFloor = _currentFloor || 0,
        to = _to || 'UP',
        calls = [ false, false, false, false, false ];

    var reset = function() {
        open = false;
        currentFloor = 0;
        to = 'UP';
        calls = [ false, false, false, false, false ];
    };

    var nextCommand = function() {
        var targetedFloor = nextStop();

        //console.log(open, currentFloor, to, calls, targetedFloor);

        if (open) {
            if (targetedFloor !== false) {
                open = false;
                return 'CLOSE';
            }
        } else if (!open) {
           if (targetedFloor !== false) {
               if (targetedFloor === currentFloor) {
                   open = true;
                   removeStop(currentFloor);
                   return 'OPEN';
               } else {
                   if (targetedFloor < currentFloor) {
                       currentFloor--;
                       to = 'DOWN';
                       return to;
                   } else {
                       currentFloor++;
                       to = 'UP';
                       return to;
                   }
               }
           }
        }

        return 'NOTHING';
    };

    var nextStop = function() {
        if (to === 'UP' && currentFloor === MAX) {
            to = 'DOWN';
        } else if (to === 'DOWN' && currentFloor === 0) {
            to = 'UP';
        }
        if (to === 'UP') {
            for(var i = currentFloor; i < calls.length; i++) {
                if (calls[i] === true) { 
                    return i;
                }
            }
        } else if (to === 'DOWN') {
            for(var j = currentFloor; j >= 0; j--) {
                if (calls[j] === true) { 
                    return j;
                }
            }

        }
        return false;
    };

    var addStop = function(floor) {
        calls[floor] = true;
    };

    var removeStop = function(floor) {
        calls[floor] = false;
    };

    var call = function(_atFloor, _to) {
        addStop(_atFloor);
    };

    var go = function(_floorToGo) {
        addStop(_floorToGo);
    };

    return {
        'reset': reset,
        'nextCommand': nextCommand,
        'call': call,
        'go': go,
        'infos': function() {
            return {
                'currentFloor': currentFloor,
                'doorsOpen': open,
                'calls': calls
            };
        }
    };
};

module.exports = elevator;
