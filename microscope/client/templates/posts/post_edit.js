Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentPosId = this._id;

		var postProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		}

		Posts.update(currentPostId, {$set: postProperties}, function(error) {
			if(error) {
				alert(error.reason);
			} else {
				Router.go('postPage', {_id: currentPostId});
			}
		});
	},

	'click .delete': function(e) {
		e.preventDefault();

		if(confirm('Delete this post?')) {
			var currentPosId = this._id;

			Posts.remove(currentPostId);
			Router.go('postsList');
		}
	}
});