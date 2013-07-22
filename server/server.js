var server = function() {

    var start = function(port) {

        var express = require('express');
        var app = express();
        app.configure(function() {
            app.use(app.router);
            app.use(express.static( __dirname+'/../www/'));
        });
        app.configure('production', function() {
            app.use(express.cache(1000 * 60 * 60));
        });
        app.get('/api/test', function(req, res) {
            console.log('Serving '+req.url);
            res.setHeader('content-type', 'application/json');
            res.send({'msg':'Hello'});
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
