var elevator = function(_currentFloor) {

    var open = false,
        currentFloor = _currentFloor || 0,
        calls = [ false, false, false, false, false ];

    var reset = function() {
        open = false;
        currentFloor = 0;
        calls = [ false, false, false, false, false ];
    };

    var nextCommand = function() {
        var targetedFloor = nextStop();

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
                       return 'DOWN';
                   } else {
                       currentFloor++;
                       return 'UP';
                   }
               }
           }
        }

        return 'NOTHING';
    };

    var nextStop = function() {
        for(var i = 0; i < calls.length; i++) {
            if (calls[i] === true) { 
                return i;
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
