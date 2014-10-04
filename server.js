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
    var sido, sidong;
    if (!conds.sido || !conds.sidong) {
        sido = '서울특별시';
        sidong = '혜화동';
    } else {
        sido = conds.sido;
        sidong = conds.sidong;
    }

    postRequest();
    function postRequest(){
        var dest = apiUrlForTM+sidong+queryOptionForTM+apiKey;

        request(dest, function(err, response, body){
            if (!err && response.statusCode == 200){
                parseString(body, function (err, result) {
                    var recentItems = result.response.body[0].items[0].item;

                    if (recentItems.length != 1) {
                        for (var i = 0; i < recentItems.length; i++) {
                            var t = recentItems[i];
                            if (sido == t.sidoName[0]) {
                                tmX = t.tmX[0];
                                tmY = t.tmY[0];
                                break;
                            }
                        }
                    } else {
                        var t = recentItems[0];
                        tmX = t.tmX[0];
                        tmY = t.tmY[0];
                        console.log(t);
                    }

                    if (!tmX || !tmY) {
                        var t = recentItems[0];
                        tmX = t.tmX[0];
                        tmY = t.tmY[0];
                    }
                });
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

                    if (!result.response.body) {
                        res.jsonp("error occured");
                        return;
                    }
                    var recentItem = result.response.body[0].items[0].item[0];
                    output['관측소'] = stationName;
                    for (var key in recentItem) {
                        output[key] = recentItem[key][0];
                    }
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
