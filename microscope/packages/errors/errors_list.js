Template.meteorErrors.helpers({
	errors: function() {
		return Errors.collection.find();
	}
});

Template.meteorError.rendered = function() {
	var errors = this.data;
	Meteor.setTimeout(function() {
		Errors.collection.remove(error._id);
	}, 3000);
};