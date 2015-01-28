Items = new Mongo.Collection('items');

if (Meteor.isClient) {
  Meteor.subscribe('items');
  // This code only runs on the client
  Template.itemList.helpers({
    'items': function(){
       return Items.find({});
    },
  });
  Template.addProductForm.events({
    "submit form": function (event) {
      // This function is called when the new task form is submitted

      var name = event.target.name.value;
      var price = event.target.price.value;
      var url = event.target.url.value;


     Items.insert({
        name: name,
        price: price,
        url: url
      });

      // Clear form
      event.target.name.value = "";
      event.target.price.value = "";
      event.target.url.value = "";

      // Prevent default form submit
      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("items", function(){
    return Items.find()
  });
}