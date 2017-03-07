var fs = require('fs')
var readline = require('readline');
var shelljs =require("shelljs");
var JFile = require('jfile');

var car =new JFile("./data/car.txt");
var finance =new JFile("./data/finance.txt");
var it =new JFile("./data/it.txt");
var health =new JFile("./data/health.txt");
var sport =new JFile("./data/sport.txt");
var travel =new JFile("./data/travel.txt");
var edu =new JFile("./data/edu.txt");
var hr =new JFile("./data/hr.txt");
var culture =new JFile("./data/culture.txt");
var military =new JFile("./data/military.txt");
var olympics =new JFile("./data/olympics.txt");
var social =new JFile("./data/social.txt");
var inboard =new JFile("./data/inboard.txt");
var outboard =new JFile("./data/outboard.txt");
var house =new JFile("./data/house.txt");
var ent =new JFile("./data/ent.txt");
var woman =new JFile("./data/woman.txt");
var school =new JFile("./data/school.txt");



function is1(url, title, content){
    var items = ["http://www.xinhuanet.com/auto/",
                "http://auto.sina.com.cn/",
                "http://auto.china.com/",
                "http://auto.163.com/",
                "http://auto.sohu.com/",
                "http://auto.qq.com/"]
                
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            car.text += '\n' + title
            car.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}


function is2(url, title, content){
    var items = ["http://www.xinhuanet.com/fortune",
                "http://finance.sina.com.cn/",
                "http://caifu.china.com/",
                "http://money.163.com/",
                "http://finance.qq.com/",
                "http://business.sohu.com/"]
                
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            finance.text += '\n' + title
            finance.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}

function is3(url, title, content){
    var items = ["http://www.xinhuanet.com/internet/",
                "http://tech.china.com/zh_cn/news/net/",
                "http://tech.sina.com.cn/it/",
                "http://it.sohu.com/",
                "http://tech.qq.com/tech_yejie.htm",
                "http://tech.163.com/it/"]
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            it.text += '\n' + title
            it.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}

function is4(url, title, content){
    var items = ["http://www.xinhuanet.com/health/",
                "http://health.china.com/",
                "http://sina.kangq.com/",
                "http://health.sohu.com/",
                "http://163.39.net/"]
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            health.text += '\n' + title
            health.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}

function is5(url, title, content){
    var items = ["http://www.xinhuanet.com/sports",
                "http://sports.china.com/",
                "http://sports.sina.com.cn/",
                "http://sports.sohu.com/",
                "http://sports.qq.com/",
                "http://sports.163.com/"]
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            sport.text += '\n' + title
            sport.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}

function is6(url, title, content){
    var items = ["http://www.xinhuanet.com/travel",
                "http://goo66.china.com/",
                "http://tour.sina.com.cn/",
                "http://travel.sohu.com/"]
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            travel.text += '\n' + title
            travel.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}

function is7(url, title, content){
    var items = ["http://www.xinhuanet.com/edu",
                "http://edu.533.com/",
                "http://edu.sina.com.cn/",
                "http://learning.sohu.com/",
                "http://edu.qq.com/"]
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            edu.text += '\n' + title
            edu.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}

function is8(url, title, content){
    var items = ["http://www.xinhuanet.com/employment",
                "http://edu.sina.com.cn/j/",
                "http://career.sohu.com/",
                "http://edu.qq.com/job/"]
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            hr.text += '\n' + title
            hr.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}

function is9(url, title, content){
    var items = ["http://www.xinhuanet.com/life",
                "http://culture.china.com/",
                "http://cul.book.sina.com.cn/",
                "http://cul.sohu.com/",
                "http://cul.qq.com/"]
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            culture.text += '\n' + title
            culture.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}

function is10(url, title, content){
    var items = ["http://www.xinhuanet.com/mil",
                "http://military.china.com/",
                "http://mil.news.sina.com.cn/",
                "http://mil.news.sohu.com/",
                "http://mil.qq.com/",
                "http://war.163.com/"]
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            military.text += '\n' + title
            military.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}

function is11(url, title, content){
    var items = ["http://www.xinhuanet.com/olympics/",
                "http://2008.china.com/",
                "http://2008.sina.com.cn/",
                "http://2008.sohu.com/",
                "http://2008.qq.com/",
                "http://2008.163.com/"]
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            olympics.text += '\n' + title
            olympics.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}

function is12(url, title, content){
    var items = ["http://www.xinhuanet.com/society",
                "http://news.china.com/zh_cn/social/",
                "http://news.sina.com.cn/society/",
                "http://news.sohu.com/",
                "http://news.qq.com/society_index.shtml",
                "http://news.163.com/shehui/"]
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            social.text += '\n' + title
            social.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}

function is13(url, title, content){
    var items = ["http://www.xinhuanet.com/local/",
                "http://news.china.com/zh_cn/domestic/",
                "http://news.sina.com.cn/china/",
                "http://news.sohu.com/",
                "http://news.qq.com/china_index.shtml",
                "http://news.163.com/domestic/"]
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            inboard.text += '\n' + title
            inboard.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}

function is14(url, title, content){
    var items = ["http://www.xinhuanet.com/world",
                "http://news.china.com/zh_cn/international/",
                "http://news.sina.com.cn/world/",
                "http://news.sohu.com/",
                "http://news.qq.com/world_index.shtml",
                "http://news.163.com/world/"]
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            outboard.text += '\n' + title
            outboard.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}

function is15(url, title, content){
    var items = ["http://www.xinhuanet.com/house",
                "http://china.soufun.com/",
                "http://house.sina.com.cn/",
                "http://house.sohu.com/",
                "http://house.qq.com/",
                "http://house.163.com/"]
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            house.text += '\n' + title
            house.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}

function is16(url, title, content){
    var items = ["http://www.xinhuanet.com/ent",
                "http://fun.china.com/zh_cn/star/",
                "http://ent.sina.com.cn/",
                "http://yule.sohu.com/",
                "http://ent.qq.com/",
                "http://ent.163.com/"]
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            ent.text += '\n' + title
            ent.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}

function is17(url, title, content){
    var items = ["http://www.xinhuanet.com/lady",
                "http://meirong.533.com/",
                "http://eladies.sina.com.cn/",
                "http://women.sohu.com/",
                "http://lady.qq.com/",
                "http://lady.163.com/"]
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            woman.text += '\n' + title
            woman.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}


function is18(url, title, content){
    var items = ["http://www.xinhuanet.com/school",
                "http://edu.533.com/news/xiaoyuan/",
                "http://edu.sina.com.cn/y/",
                "http://campus.qq.com/"]
                
    for (i = 0; i < items.length; i++){
        if (url.indexOf(items[i]) >= 0){
            school.text += '\n' + title
            school.text += '\n' + content.substring(0, 100)
            return true;
        }
    }
    return false;
}

var index = 0;

function doJob(files){
    
    console.log('doJob ./jsondata/', files[index]);
    
    var rd = readline.createInterface({
        input: fs.createReadStream('./jsondata/' + files[index]),
        console: false
    });

    rd.on('line', function(line) {
        var doc = JSON.parse(line);
        if (is1(doc.url, doc.contenttitle, doc.content)){
            //console.log(doc.url);    
        }else if (is2(doc.url, doc.contenttitle, doc.content)){
            //console.log(doc.url); 
        }else if (is3(doc.url, doc.contenttitle, doc.content)){
            //console.log(doc.url); 
        }else if (is4(doc.url, doc.contenttitle, doc.content)){
            //console.log(doc.url); 
        }else if (is5(doc.url, doc.contenttitle, doc.content)){
            
        }else if (is6(doc.url, doc.contenttitle, doc.content)){
            
        }else if (is7(doc.url, doc.contenttitle, doc.content)){
            
        }else if (is8(doc.url, doc.contenttitle, doc.content)){
            
        }else if (is9(doc.url, doc.contenttitle, doc.content)){
            
        }else if (is10(doc.url, doc.contenttitle, doc.content)){
            
        }else if (is11(doc.url, doc.contenttitle, doc.content)){
            
        }else if (is12(doc.url, doc.contenttitle, doc.content)){
            
        }else if (is13(doc.url, doc.contenttitle, doc.content)){
            
        }else if (is14(doc.url, doc.contenttitle, doc.content)){
            
        }else if (is15(doc.url, doc.contenttitle, doc.content)){
            
        }else if (is16(doc.url, doc.contenttitle, doc.content)){
            
        }else if (is17(doc.url, doc.contenttitle, doc.content)){
            
        }else if (is18(doc.url, doc.contenttitle, doc.content)){
        
        }

    });
    rd.on("close",function (){
   	    console.log('file end');
   	    index++;
   	    setTimeout(function () {
   	        doJob(files)    
   	    }, 0)
    });
}


function doJobBatch(files){
    
    for (index = 0; index < files.length; index ++){
        console.log('doJob ./jsondata/', files[index]);
        
        var rd = readline.createInterface({
            input: fs.createReadStream('./jsondata/' + files[index]),
            console: false
        });
    
        rd.on('line', function(line) {
            var doc = JSON.parse(line);
            is1(doc.url, doc.contenttitle, doc.content);
            is2(doc.url, doc.contenttitle, doc.content);
            is3(doc.url, doc.contenttitle, doc.content);
            is4(doc.url, doc.contenttitle, doc.content);
            is5(doc.url, doc.contenttitle, doc.content);
            is6(doc.url, doc.contenttitle, doc.content);
            is7(doc.url, doc.contenttitle, doc.content);
            is8(doc.url, doc.contenttitle, doc.content);
            is9(doc.url, doc.contenttitle, doc.content);
            is10(doc.url, doc.contenttitle, doc.content);
            is11(doc.url, doc.contenttitle, doc.content);
            is12(doc.url, doc.contenttitle, doc.content);
            is13(doc.url, doc.contenttitle, doc.content);
            is14(doc.url, doc.contenttitle, doc.content);
            is15(doc.url, doc.contenttitle, doc.content);
            is16(doc.url, doc.contenttitle, doc.content);
            is17(doc.url, doc.contenttitle, doc.content);
            is18(doc.url, doc.contenttitle, doc.content);
        });
        rd.on("close",function (){
       	    console.log('file end');
       	    //index++;
       	    //setTimeout(function () {
       	    //    doJob(files)    
       	    //}, 0)
        });
    }
}


/*
fs.readdir('./rawdata', function (err, files) {
    var index = 0;
    
    for (var i = 0; i < files.length; i++){
        var cmd = 'iconv -f GB18030 -t UTF-8//TRANSLIT ./rawdata/' + files[i] + ' -o ./encdata/' + files[i] 
        var out1 = shelljs.exec(cmd, {silent:true}).output;
        
        var cmd = "sed -i -- 's/&//g' ./encdata/" + files[i]
        var out2 = shelljs.exec(cmd, {silent:true}).output;
        
        var cmd = 'xml-json ./encdata/' + files[i] + ' doc > ./jsondata/' + files[i] 
        var out3 = shelljs.exec(cmd, {silent:true}).output;

        console.log('file', i, files[i], out1, out2, out3);
    }
});
*/


fs.readdir('./jsondata', function (err, files) {
    doJob(files);
});

