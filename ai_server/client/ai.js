if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', '');

    Template.portal.helpers({
        counter: function () {
            return Session.get('counter');
        }
    });

    Template.portal.events({
        "submit .new-register": function (event) {
            // Prevent default browser form submit
            event.preventDefault();

            // Get value from form element
            var text = event.target.text.value;

            // Insert a task into the collection
            Tokens.insert({
                mail: text,
                createdAt: new Date() // current time
            });

            // Clear form
            event.target.text.value = "";
            record = Tokens.findOne({'mail':text});
            Session.set('counter', record._id);
        }
    });
}