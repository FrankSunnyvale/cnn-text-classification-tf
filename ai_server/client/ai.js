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

            $.get( "/classify?url=" + text, function( data ) {
                $( ".result" ).html( data );
                alert( "Load was performed." );
            });
            // Clear form
            //event.target.text.value = "";

        }
    });
}