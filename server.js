var express = require('express');
var app = express();

var request = require('request');
var apiUrl = "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=";
var stationName;
var afterStationName = "&dataTerm=month&pageNo=1&numOfRows=10&ServiceKey=";
var apiKey = "hAkyrmVgIwySVYQbyM36EpnB6R3ZOzxPkjakEQNbHEoGvsVn0X7dAmgo3DiQ/FPP11orgBEKRc5PLX8P4ZrURQ==";

app.get('/test', function(req, res){
    stationName = '월평동';

    postRequest();

    function postRequest(){
        var dest = apiUrl+stationName+afterStationName+apiKey;
        console.log(dest);
        request(apiUrl+stationName+afterStationName+apiKey, function(err, response, body){
            if(!err && response.statusCode == 200){
                console.log(body);
            }else   console.log(err);
        });
    }


});


var server = app.listen(3000, function(){
    console.log('listening on port %d', server.address().port);
});
