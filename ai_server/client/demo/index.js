var template = new ReactiveVar('demoIndex');
var urls = [
  {img: '/page1.png', url: 'http://cdn.tiegushi.com/posts/582ec6ac11aaf47be300006a'},
  {img: '/page2.png', url: 'http://cdn.tiegushi.com/posts/7Adiw3hHF8x9yqwxG'},
  {img: '/page3.png', url: 'http://cdn.tiegushi.com/posts/a6EfghMcgsR9kCByg'}
];
var url = new ReactiveVar(urls[0].url);
var counter = new ReactiveVar('');
var checkURL = function(value) {
  var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
  if (urlregex.test(value)) {
      return (true);
  }
  return (false);
};

Tracker.autorun(function(){
  if(url.get()){
    counter.set('processing, please waiting.');
    var find = Evals.findOne({'url':Session.get('url')})
    if (find){
      console.log('find ' + find.class_info);
      return counter.set(find.class_info);
    }else {
      console.log('find ' + 'error ' + Session.get('url'));
      counter.set('idle');
    }
  }
});

Template.demo.helpers({
  template: function(){
    return template.get();
  }
});

Template.demoIndex.helpers({
  urls: function(){
    var result = [];
    for(var i=0;i<urls.length;i++)
      result.push(urls[i]);
    return result;
  },
  curr_url: function(){
    return url.get();
  },
  is_selected: function(val){
    return url.get() === val;
  },
  counter: function(){
    return counter.get();
  }
});

Template.demoIndex.events({
  'click .urls-list li': function(e){
    var session_url = this.url;
    
    $.get( "/request/classify?url=" + this.url, function( data ) {
      console.log("performed " + session_url  + '  ' + JSON.stringify(data));
      Session.set('url', session_url);
    });

    url.set(this.url);
    
    console.log('set url:', this.url);
  },
  'click .footer .button': function(){
    template.set('demoInput');
  }
});

Template.demoInput.events({
  'click .go': function(){
    var text = $('.input-url').val();
    if(!checkURL(text))
      return alert('please input correct url');
    if (text.indexOf("tiegushi") < 0)
      return alert("please input the tiegushi's url, for example http://cdn.tiegushi.com/posts/582ec6ac11aaf47be300006a");
    
    url.set(text);
    
    /*
    $.get( "/request/classify?url=" + text, function( data ) {
      console.log("performed " + JSON.stringify(data));
      Session.set('url', text);
    });
    */
    
    template.set('demoIndex');
  },
  'click .button': function(){
    template.set('demoIndex');
  }
});