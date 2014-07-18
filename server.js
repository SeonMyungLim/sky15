var express = require('express');
var app = express();

app.get('/test', function(req, res){
    console.log('test');
});


var server = app.listen(3000, function(){
    console.log('listening on port %d', server.address().port);
});
