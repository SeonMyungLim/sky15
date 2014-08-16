var express = require('express');
var app = express();
var request = require('request');


//variables for api request 
var apiUrl = "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=";
var stationName;
var queryOption = "&dataTerm=daily&pageNo=1&numOfRows=10&ServiceKey=";
var apiKey = "hAkyrmVgIwySVYQbyM36EpnB6R3ZOzxPkjakEQNbHEoGvsVn0X7dAmgo3DiQ/FPP11orgBEKRc5PLX8P4ZrURQ==";

app.get('/getAir/:station', function(req, res){
    console.log(stationName = req.param('station'));

    postRequest();

    function postRequest(){
        var dest = apiUrl+stationName+queryOption+apiKey;
        request(dest, function(err, response, body){
            if(!err && response.statusCode == 200){
                console.log(body);
		res.jsonp(body);
            }else {
                cosole.log(response);
                console.log(err);
            }
        });
    }


});


var server = app.listen(3000, function(){
    console.log('listening on port %d', server.address().port);
});
