Template.postPage.helpers({
	comments: function() {
		return Posts.find({postId: this._id});
	}
});