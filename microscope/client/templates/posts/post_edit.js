Template.postEdit.onCreated(function() {
	Session.set('postEditerrors', {});
});

Template.postEdit.helpers({
	errorMessage: function(field) {
		return Session.get('postEditErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
	}
});

Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentPosId = this._id;

		var postProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		}

		var errors = validatePost(postProperties);
		if(errors.title || errors.url)
			return Session.set('postEditErrors', errors);

		Posts.update(currentPostId, {$set: postProperties}, function(error) {
			if(error) {
				Errors.throw(error.reason);

			if(result.postExists)
				Errors.throw('This link has already been posted');

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