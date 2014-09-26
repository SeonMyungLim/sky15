var express = require('express');
var app = express();
var request = require('request');
var parseString = require('xml2js').parseString;


var apiUrlForTM = "http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getTMStdrCrdnt?umdName=";
var queryOptionForTM = "&pageNo=1&numOfRows=10&ServiceKey=";

var apiUrlForStation = "http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?";
var queryOptionForStation = "&pageNo=1&numOfRows=10&ServiceKey=";

var apiUrlForCond = "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=";
var queryOptionForCond = "&dataTerm=month&pageNo=1&numOfRows=10&ServiceKey=";

var apiKey = "hAkyrmVgIwySVYQbyM36EpnB6R3ZOzxPkjakEQNbHEoGvsVn0X7dAmgo3DiQ/FPP11orgBEKRc5PLX8P4ZrURQ==";

var stationName = '혜화동';
var tmX = 0, tmY = 0;



app.get('/getAirCond', function(req, res, next){
    var conds = req.query;
    var sidong = conds.sidong || '혜화동';

    postRequest();
    function postRequest(){
        console.log(sidong);
        var dest = apiUrlForTM+sidong+queryOptionForTM+apiKey;

        request(dest, function(err, response, body){
            if (!err && response.statusCode == 200){
                var xml_x = new RegExp("<tmX>(.+?)<\/tmX>", "m");
                var xml_y = new RegExp("<tmY>(.+?)<\/tmY>", "m");
                var tmXTemp = body.match(xml_x);
                var tmYTemp = body.match(xml_y);
                tmX = tmXTemp[1];
                tmY = tmYTemp[1];
                next();
            } else {
                cosole.log(response);
                console.log(err);
            }
        });
    }


});

app.get('/getAirCond', function(req, res, next){
    postRequest();

    function postRequest(){
        var dest = apiUrlForStation+'tmX='+tmX+'&tmY='+tmY+queryOptionForStation+apiKey;

        request(dest, function(err, response, body){
            if (!err && response.statusCode == 200){
                var xml_station = new RegExp("<stationName>(.+?)<\/stationName>", "m");
                stationName = body.match(xml_station)[1];
                next();
            } else {
                cosole.log(response);
                console.log(err);
            }
        });
    }
});

app.get('/getAirCond', function(req, res, next){
    postRequest();

    function postRequest(){
        var dest = apiUrlForCond + stationName + queryOptionForCond + apiKey;
        var output = {};

        request(dest, function(err, response, body){
            if (!err && response.statusCode == 200){
		parseString(body, function (err, result) {
			var recentItem = result.response.body[0].items[0].item[0];
            for (var key in recentItem) {
                output[key] = recentItem[key][0];
            }
            console.log(output);
		});
                res.send(output);
            } else {
                cosole.log(response);
                console.log(err);
            }
        });
    }

});

var server = app.listen(3000, function(){
    console.log('listening on port %d', server.address().port);
});
