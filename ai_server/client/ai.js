if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('url', 'None');

    Template.portal.helpers({
        counter: function () {
            if (Session.get('url') == "None"){
                return "";
            }
            
            var find = Evals.findOne({'url':Session.get('url')})
            if (find){
                console.log('in ' + find.class_info)
                return find.class_info;
            }
            
            return "processing, please waiting. ";
        }
    });

    Template.portal.events({
        "submit .new-register": function (event) {
            // Prevent default browser form submit
            event.preventDefault();

            function checkURL(value) {
                var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
                if (urlregex.test(value)) {
                    return (true);
                }
                return (false);
            }


            // Get value from form element
            var text = event.target.text.value;
            if (text.length <= 1 || checkURL(text) == false){
                alert("please input correct url");
                return;
            }
            $.get( "/request/classify?url=" + text, function( data ) {
                console.log("performed " + JSON.stringify(data));
                Session.set('url', text);
                //alert( "Load was performed. " + JSON.stringify(data));
            });
        }
    });
}