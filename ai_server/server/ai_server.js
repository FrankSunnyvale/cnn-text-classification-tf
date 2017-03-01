if (Meteor.isServer) {
    fs = Meteor.npmRequire('fs') ;
    path = Meteor.npmRequire('path') ;
    mkdirp = Meteor.npmRequire('mkdirp');
    http = Meteor.npmRequire('http');
    httprequest = Meteor.npmRequire('http-request');
    Fiber = Meteor.npmRequire('fibers');
    shelljs = Meteor.npmRequire('shelljs');
    import { CollectionAPI } from 'meteor/xcv58:collection-api';
    var work_directory = '/srv/my_tree/';
    var isDownloading = {};

    function getClassPath(url) {
          var url_array = url.split('/');
          url_array.shift();
          var dir = url_array.join('/');
          var new_class_path = dir + '.class';
          var new_class_file_path = path.join(work_directory, new_class_path);
          console.log("new_class_file_path = "+new_class_file_path);
          return new_class_file_path;
    }
  
    function generate_class_info(file_path, url){
      function commit(url, title, class_info){
        Fiber(function() {
            Evals.update({url:url},{
                url: url,
                title: title,
                class_info: class_info,
                createdAt: new Date()
            },{upsert:true});
        }).run();
      }
      
      fs.readFile(file_path, function (err, data) {
       if (err) return;
        var s = data.toString()
        console.log(data.toString());
        var title = s.match(/<h2\ id=\"wx-title\"\ class=\"title\">(.*?)<\/h2>/)[1]
        //<h2 id="wx-title" class="title">2017年的数据分析的趋势预测 &nbsp; Data Analytics Top Trends In 2017&nbsp;</h2>
        
        var class_info = shelljs.exec('./eval2.py ' + title, {silent:true}).output;
        commit(url, title, class_info);
      });
    }
  
    function download_all_files (urls, base_destination, cb) {
      var url = urls.shift();
      var url_array = url.split('/');
      url_array.shift();
      var dir = url_array.join('/');
      var file_path = path.join(base_destination, dir);
      var path_to_file_folder = path.dirname(file_path);

      console.log('file_path:'+ file_path);
      console.log('path_to_file_folder:' + path_to_file_folder);

      if(isDownloading[url]){
          console.log(file_path + ' is downloading, do nothing');
          return;
      }
      if (fs.existsSync(file_path)){
        console.log(file_path + ' does exist, do nothing');
        if(cb){
            cb(url, file_path);
        }
        return
      }
      isDownloading[url] = true;

      function download_url_to_fs () {
          var request = httprequest.get({url:url
          }, file_path, function(error, result) {
              Fiber(function() {
                isDownloading[url] = false;
                if(urls.length > 0){
                  download_all_files(urls, base_destination, cb);
                } else {
                  cb(url, file_path);
                }
              }).run();
          });
      }
      
      mkdirp(path_to_file_folder, 0777, download_url_to_fs);
  }

  var classify={
        methods: ['POST','GET','PUT','DELETE'],
        before: {  
            POST: undefined,    
            GET: function(objs, requestMetadata, returnObject) {
                console.log('requestMetadata2:' + JSON.stringify(requestMetadata));
                var url = decodeURIComponent(requestMetadata.query.url);
                
                var url_array = url.split('/');
                url_array.shift();
                var dir = url_array.join('/');
                var file_path = path.join(work_directory + '/', dir);

                var find = Evals.findOne({'url':url})
                console.log("url = "+url+", find = "+JSON.stringify(find));
                
                if (find) {
                    console.log("file_path="+file_path);
                    if (!fs.existsSync(file_path)) {
                        //Torrents.remove({'_id':find._id});
                        find = undefined;
                    }
                }

                if (find == undefined){
                    console.log('url does not exist, need pull');

                    Meteor.defer(function(){
                        var urls = [];
                        urls.push(url);

                        if (fs.existsSync(file_path)) {
                            console.log(file_path + ' does exist, do nothing');
                        } else {
                            download_all_files (urls, work_directory, function(url, file_path){
                                console.log('download finished ' + url + ' '+ file_path);
                                generate_class_info(file_path,url);
                            });
                        }
                    })
                    returnObject.success = true;
                    returnObject.statusCode = 200;
                    returnObject.body = {record: 'processing, please wait.'};
                    return true;
                }else {
                    var class_path = getClassPath(url);
                    if (!fs.existsSync(class_path)) {
                        console.log('class file missing, regenerate it...');
                        generate_class_info(file_path, url);
                    } 
                    returnObject.success = true;
                    returnObject.statusCode = 200;
                    returnObject.body = find;
                    return true;
                }
                return true;
            },
            PUT: undefined,     
            DELETE: undefined 
        },
    }

    Meteor.startup(function () {
        var requestApi = new CollectionAPI({apiPath: 'request',allowCORS:true});
        requestApi.addCollection(Torrents, 'classify',classify);
        requestApi.start();
	});
}
