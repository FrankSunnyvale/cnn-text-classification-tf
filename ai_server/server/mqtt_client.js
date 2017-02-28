//module.exports = mqttClient
if(Meteor.isServer){
    var callbacksHashMap = {};
    var videoInfoHashMap = {};
    var MES_PREFIX = '';

    //var client = mqtt.connect(process.env.MQTT_BROKER_ADDRESS);
    var client;

    mqttClient = function() {
        console.log("mqttClient init...");
        //var options = {host: "mqtt://test.mosquitto.org", port: 8080};
        //client = mqtt.connect('mqtt://test.mosquitto.org');
        //client = mqtt.connect(options);
        client = mqtt.connect('mqtt://rpcserver.raidcdn.com');

        client.on('connect', function () {
            console.log('Client: Connect to mqtt server success!');
            client.subscribe(MES_PREFIX+'raid_cdn_update_download_info', {qos:1}, function(err, granted){
                if (err){
                    debug('subscribe raid_cdn_update_download_info err');
                    return;
                }
                console.log('subscribe raid_cdn_update_download_info granted ' + JSON.stringify(granted));
            });
            client.subscribe(MES_PREFIX+'raid_cdn_finish_downloading', {qos:1}, function(err, granted){
                if (err){
                    debug('subscribe raid_cdn_finish_downloading err');
                    return;
                }
                console.log('subscribe raid_cdn_finish_downloading granted ' + JSON.stringify(granted));
            });
            client.publish('presence', 'Hello mqtt');
        });

        client.on('message', function (topic, message) {
            // message is Buffer
            console.log('client topic '+topic.toString());
            console.log(message.toString());
            if (topic == MES_PREFIX+'raid_cdn_update_download_info') {
                console.log("Received update download info command.");
                var objMessage = JSON.parse(message);
                var url = objMessage.url;
                var downloadInfo = objMessage.downloadInfo;
                if (videoInfoHashMap[url]) {
                    videoInfoHashMap[url].downloadInfo = downloadInfo;
                    console.log("raid_cdn_update_download_info: "+JSON.stringify(videoInfoHashMap[url]));
                }
            } else if (topic == MES_PREFIX+'raid_cdn_finish_downloading'){
                var token = message.token;
                var url = message.url;
                console.log("Received finish downloading command.");
                finishDownloading(JSON.parse(message));
            }
        });
    };

    mqttClient.prototype.setCallback = function(callbacks) {
        callbacksHashMap.finish_downloading = callbacks.finish_downloading;
    };

    mqttClient.prototype.addTorrent = function(token, url, videoLength, file_path){
        var objMessage = {token:token, url:url, videoLength:parseInt(videoLength), file_path: file_path};
        if (videoInfoHashMap[url] == undefined) {
            console.log("mqttClient addTorrent, token="+token+", url="+url+", videoLength="+videoLength+", file_path="+file_path);
            videoInfoHashMap[url] = objMessage;
        }
        client.publish(MES_PREFIX+'raid_cdn_add_torrent', JSON.stringify(objMessage));
    };

    mqttClient.prototype.RTSeeding = function(token, url, videoLength, hashInfo, raidUrl, pieceLength, torrentURL){
        var objMessage = {token:token, url:url, videoLength:parseInt(videoLength), hashInfo:hashInfo};
        if(raidUrl && raidUrl !== ''){
            objMessage['raidURL'] = raidUrl;
        }
        if(pieceLength){
            objMessage['u'] = pieceLength;
        }
        if(torrentURL && torrentURL !==''){
            objMessage['turl'] = torrentURL;
        }
        console.log("mqttClient RTSeeding: "+JSON.stringify(objMessage));

        client.publish(MES_PREFIX+'rtseeding', JSON.stringify(objMessage));
    };

    mqttClient.prototype.deleteTorrent = function(token, url){
        client.publish(MES_PREFIX+'raid_cdn_delete_torrent', JSON.stringify({token:token, url:url}));
    };

    mqttClient.prototype.getDownloadInfo = function(token, url, videoLength){
        //console.log("getDownloadInfo, url="+url);
        if (videoInfoHashMap[url]) {
            console.log("getDownloadInfo: "+JSON.stringify(videoInfoHashMap[url]));
            return videoInfoHashMap[url].downloadInfo;
        }
    };

    mqttClient.prototype.notifyRaidCDNReady = function(token, torrentURL, hashInfo){
        var objMessage = {token:token, torrentURL:torrentURL, hashInfo: hashInfo};
        console.log("publish raid_cdn_video_ready message "+JSON.stringify(objMessage));
        client.publish(MES_PREFIX+'raid_cdn_video_ready', JSON.stringify(objMessage));
    };

    function finishDownloading(message){
        //client.publish(MES_PREFIX+'raid_cdn_finish_downloading', {token:token, url:url});
        var token = message.token;
        var url = message.url;
        var file_path = message.file_path;
        var urls = [];
        urls.push(url);
        videoInfoHashMap[url] = null;
        if (callbacksHashMap.finish_downloading) {
            callbacksHashMap.finish_downloading(token, urls);
        }
    }

}