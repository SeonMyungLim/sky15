var express = require('express');
var app = express();
var request = require('request');


//variables for api request
//http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=평리동&dataTerm=month&pageNo=1&numOfRows=10&ServiceKey=서비스키
//var apiUrl = "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=";
//var queryOption = "&dataTerm=month&pageNo=1&numOfRows=10&ServiceKey=";
var apiUrl = "http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getTMStdrCrdnt?umdName=";
var queryOption = "&pageNo=1&numOfRows=10&ServiceKey=";
var apiKey = "hAkyrmVgIwySVYQbyM36EpnB6R3ZOzxPkjakEQNbHEoGvsVn0X7dAmgo3DiQ/FPP11orgBEKRc5PLX8P4ZrURQ==";

var stationName;
var tmX, tmY;

app.get('/getAirCond', function(req, res){
    stationName = '신성동';
    postRequest();
    console.log(req.query);

    function postRequest(){
        var dest = apiUrl+stationName+queryOption+apiKey;

        request(dest, function(err, response, body){
            if (!err && response.statusCode == 200){
                var items = body.children[0];
                var firstItem = items.children[0];
                tmX = firstItem.tmX;
                tmY = firstItem.tmY;
                console.log(tmX);
                res.jsonp(body);
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
