var server = function() {

    var start = function(port) {

        // Express configuration

        var express = require('express');
        var app = express();

        var checkHost = function(req) {
            var fromLocalhost   = req.host === 'localhost' || req.host === '127.0.0.1';
            var fromServer      = req.host === '192.168.0.101';
            if (!fromServer && !fromLocalhost) {
                console.log('Host not authorized: ', req.host);
                throw new Error();
            }
        };

        app.configure(function() {
            app.use(express.static(__dirname+'/../www/'));
            app.use(function(req, res, next){
                // Logging all incoming request
                console.log('< %s %s', req.method, req.url);
                checkHost(req);
                next();
            });
            app.use(app.router);
        });

        // Elevator

        var elevator = require('./elevator')();

        // APIs

        app.get('/', function(req, res) {
            res.send(200);
        });
        app.get('/nextCommand', function(req, res) {
            var state = elevator.nextCommand();
            console.log('>', state);
            res.send(state);
        });
        app.get('/go', function(req, res) {
            elevator.go(parseInt(req.query.floorToGo, 10));
            res.send(200);
        });
        app.get('/userHasEntered', function(req, res) {
            res.send(200);
        });
        app.get('/userHasExited', function(req, res) {
            res.send(200);
        });
        app.get('/reset', function(req, res) {
            elevator.reset();
            console.log('>>> RESET <<<'); 
            res.send(200);
        });
        app.get('/call', function(req, res) {
            elevator.call(parseInt(req.query.atFloor, 10), req.query.to);
            res.send(200);
        });

        // Debug/info URL
        app.get('/infos', function(req, res) {
            res.send(elevator.infos());
        });

        // If request wasn‘t handle before, returns a 404
        app.all('*', function(req, res) {
            checkHost(req);
            console.log('ERROR ', req.url);
            res.send(404);
        });

        app.listen(port);
        console.log('Server listening on '+port);
    };

    return {
        'start': start
    };
};
module.exports = server;
