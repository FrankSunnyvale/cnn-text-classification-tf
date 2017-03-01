if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('url', '');

    Template.portal.helpers({
        counter: function () {
            var find = Evals.findOne({'url':Session.get('url')})
            return find.class_info;
        }
    });

    Template.portal.events({
        "submit .new-register": function (event) {
            // Prevent default browser form submit
            event.preventDefault();

            // Get value from form element
            var text = event.target.text.value;

            $.get( "http://localhost:3000/request/classify?url=" + text, function( data ) {
                
                alert( "Load was performed. " + JSON.stringify(data));
            });
            // Clear form
            //event.target.text.value = "";

        }
    });
}