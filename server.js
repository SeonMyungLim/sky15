var express = require('express');
var app = express();

var request = require('request');
//http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=평리동&dataTerm=month&pageNo=1&numOfRows=10&ServiceKey=서비스키
//var apiUrl = "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=";
var apiUrl = "http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoIngireSvc/getMsrstnList?umdName=";
var stationName;
//var queryOption = "&dataTerm=month&pageNo=1&numOfRows=10&ServiceKey=";
var queryOption = "&pageNo=1&numOfRows=10&ServiceKey";
var apiKey = "hAkyrmVgIwySVYQbyM36EpnB6R3ZOzxPkjakEQNbHEoGvsVn0X7dAmgo3DiQ/FPP11orgBEKRc5PLX8P4ZrURQ==";

var tmX, tmY;

app.get('/test', function(req, res){
    stationName = '혜화동';
    postRequest();

    function postRequest(){
        var dest = apiUrl+stationName+queryOption+apiKey;
        console.log(dest);
        request(dest, function(err, response, body){
            if (!err && response.statusCode == 200){
                console.log(body);
            } else {
                cosole.log(response);
                console.log(err);
            }
        });
    }


});

//app.get('/test', function(req, res){
    //stationName = '평리동';

    //postRequest();

    //function postRequest(){
        //var dest = apiUrl+stationName+queryOption+apiKey;
        //console.log(dest);
        //request(dest, function(err, response, body){
            //if (!err && response.statusCode == 200){
                //console.log(body);
            //} else {
                //cosole.log(response);
                //console.log(err);
            //}
        //});
    //}


//});


var server = app.listen(3000, function(){
    console.log('listening on port %d', server.address().port);
});
