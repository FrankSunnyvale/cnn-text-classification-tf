/**
 * Created by simba on 12/6/16.
 */
Evals = new Meteor.Collection("eval");

if(Meteor.isServer){
    Evals.allow({
        insert: function (userId, doc) {
            return true;
        }
    });
}