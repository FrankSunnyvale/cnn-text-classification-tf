
var useElectron = false;

if (Meteor.isServer) {
    fs = Meteor.npmRequire('fs') ;
    path = Meteor.npmRequire('path') ;
    mkdirp = Meteor.npmRequire('mkdirp');
    http = Meteor.npmRequire('http');
    httprequest = Meteor.npmRequire('http-request');
    Fiber = Meteor.npmRequire('fibers');
    shelljs = Meteor.npmRequire('shelljs');
    parseTorrent = Meteor.npmRequire('parse-torrent');
    createTorrent = Meteor.npmRequire('create-raidtorrent');
    mqtt = new mqttClient();
    var server_domain = 'http://raidserver.youzhadahuo.com/';
    var work_directory = '/srv/my_tree/';
    var filesHashMap = {};
    var isDownloading = {};
    import { CollectionAPI } from 'meteor/xcv58:collection-api';

    Meteor.startup(function(){
        var user=Meteor.users.findOne({})
        console.log(user)
    })

    //given the urls of files to download, store them on the filesystem
    function download_all_files (urls, cb) {
      var url = urls.shift();
      
      console.log('url:', url);
      
      // the method to store a downloaded file to the fs
      // makes an http request and writes the response to a file
      function download_url_to_fs () {
          var request = httprequest.get({url:url, 
            progress: function (current, total) {}
          }, file_path, function(error, result) {
              Fiber(function() {
                isDownloading[url] = false;
                if(urls.length > 0){
                  download_all_files(urls, base_destination, usr_token, cb);
                } else {
                  cb(url, file_path);
                }
              }).run();
          });
      }

      console.log('path_to_file_folder:' + path_to_file_folder);

      if(isDownloading[url]){
          console.log(file_path + ' is downloading, do nothing');
          return;
      }
      if (fs.existsSync(url)){
        console.log(file_path + ' does exist, do nothing');
        return;
      }

      filesHashMap[url] = url;
      isDownloading[url] = true;
      download_url_to_fs();
    }


    

 

    var getAllTorrentHandle={
        methods: ['POST','GET','PUT','DELETE'],
        before: {  // This methods, if defined, will be called before the POST/GET/PUT/DELETE actions are performed on the collection.
            // If the function returns false the action will be canceled, if you return true the action will take place.
            POST: undefined,    // function(obj, requestMetadata, returnObject) {return true/false;},
            GET: function(objs, requestMetadata, returnObject) {
                console.log('requestMetadata1:' + JSON.stringify(requestMetadata));
                var token = requestMetadata.query.token;
                var limit = Number(requestMetadata.query.limit) || 0;
                var skip = Number(requestMetadata.query.skip) || 0;
                //if (Tokens.findOne({'_id':token}) == undefined){
                if (Tokens.findOne({'_id':token}) == undefined && Meteor.users.findOne({'_id':token}) == undefined){
                    console.log('token does not exist');
                    return false;
                }
                var find = Torrents.find({}, {fields: {url:1, torrent_path:1, createdAt:1}, skip: skip, limit: limit}).fetch();
                returnObject.success = true;
                returnObject.statusCode = 200;
                returnObject.body = find;
                return true;
            },
            PUT: undefined,     // function(obj, newValues, requestMetadata, returnObject) {return true/false;},
            DELETE: undefined   // function(obj, requestMetadata, returnObject) {return true/false;}
        },
    }
    Meteor.startup(function () {
        var requestApi = new CollectionAPI({apiPath: 'request',allowCORS:true});
        requestApi.addCollection(Torrents, 'allTorrents',getTorrentsHandle);
        requestApi.start();
	});
}




if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
