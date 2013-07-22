var server = function() {

    var start = function(port) {

        var checkHost = function(req) {
            console.log('request from ', req.host);
            var fromLocalhost   = req.host === 'localhost';
            var fromServer      = req.host === '10.1.2.86';
            if (fromServer || fromLocalhost) {
            } else {
                throw new Error();
            }
        };

        var express = require('express');
        var app = express();
        app.configure(function() {
            app.use(express.static( __dirname+'/../www/'));
            app.use(app.router);
        });
        app.configure('production', function() {
            app.use(express.cache(1000 * 60 * 60));
        });
        /* APIs */
        app.get('/api/test', function(req, res) {
            checkHost(req);
            console.log('Serving '+req.url);
            res.setHeader('content-type', 'application/json');
            res.send({'msg':'Hello'});
        });
        app.all('*', function(req, res) {
            checkHost(req);
            console.log('ERROR ', req.url);
            res.send(404);
        });
        app.listen(port);
        console.log('Server listening on '+port);
    };

    return {
        'start': start,
        'dummy': function() {
            return 'hello';
        }
    };
};
module.exports = server();
