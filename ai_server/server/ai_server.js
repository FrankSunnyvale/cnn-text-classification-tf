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

    function getClass(num){
        var classes = ["artist", "emotion", "extend", "foods", "goplaces", "hotnews", "human", "nature", "news", "poets", "programmer", "scene", "talk", "travel"];
        var chclasses = ["艺术", "情感", "扩展", "美食", "去的地方", "热点新闻", "人物", "自然", "新闻", "歪诗几首", "程序猿日常", "美景", "杂谈", "旅游"];
        var sogoclasses = ["汽车", "财经", "IT", "健康", "体育", "旅游","教育", "招聘", "文化", "军事","奥运", "社会", "国内", "国际","房产", "娱乐", "女性", "校园"];
        
        return sogoclasses[parseInt(num)];
    }
    
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
        var title = s.match(/<meta property=\"og:title\" content=\"(.*?)- 故事贴\"\/>/)[1]
        console.log('title ' + title)

        var cmd = '/mnt/cnn-text-classification-tf/eval2.py --checkpoint_dir="/mnt/cnn-text-classification-tf/runs/1488570471/checkpoints/" --eval_title="' + title + '"'

        console.log('cmd' + cmd);
        
        var class_info = shelljs.exec(cmd, {silent:true}).output;
        console.log('class_info' + class_info);
        
        var info = JSON.parse(class_info)
        var infos = info[0] + ', ' + info[1] + ', ' + getClass(info[1])
        console.log(infos);
        commit(url, title, infos);
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
        //console.log(file_path + ' does exist, do nothing');
        //if(cb){
        //    cb(url, file_path);
        //}
        //return
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
                
                if(!requestMetadata.query.url){
                    returnObject.success = true;
                    returnObject.statusCode = 200;
                    returnObject.body = {record: 'url is not correct.'};
                    console.log("url is not correct " + url)
                    return true;
                }
                
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
        requestApi.addCollection(Evals, 'classify',classify);
        requestApi.start();
	});
}
